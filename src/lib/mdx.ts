import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Base content directory
const contentDirectory = path.join(process.cwd(), "content");

export interface PostMetadata {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  featured?: boolean;
  image?: string;
  author?: string;
  readingTime?: number;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}

/**
 * Get all post metadata from a specific content type (projects or blog)
 */
export function getPostMetadata(contentType: "projects" | "blog"): PostMetadata[] {
  const directory = path.join(contentDirectory, contentType);
  
  // Check if directory exists
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs.readdirSync(directory);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts: PostMetadata[] = mdxFiles.map((filename) => {
    const filePath = path.join(directory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);

    return {
      slug: filename.replace(/\.mdx?$/, ""),
      title: data.title || "Untitled",
      summary: data.summary || "",
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      featured: data.featured || false,
      image: data.image || null,
      author: data.author || null,
      readingTime,
      metrics: data.metrics || null,
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single post's content and metadata by slug
 */
export function getPostContent(contentType: "projects" | "blog", slug: string): Post | null {
  const directory = path.join(contentDirectory, contentType);
  
  // Try .mdx first, then .md
  let filePath = path.join(directory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(directory, `${slug}.md`);
  }

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Calculate reading time
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);

  return {
    metadata: {
      slug,
      title: data.title || "Untitled",
      summary: data.summary || "",
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      featured: data.featured || false,
      image: data.image || null,
      author: data.author || null,
      readingTime,
      metrics: data.metrics || null,
    },
    content,
  };
}

/**
 * Get all slugs for a content type (for generateStaticParams)
 */
export function getAllSlugs(contentType: "projects" | "blog"): string[] {
  const directory = path.join(contentDirectory, contentType);
  
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs.readdirSync(directory);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(contentType: "projects" | "blog", limit?: number): PostMetadata[] {
  const posts = getPostMetadata(contentType);
  const featured = posts.filter((post) => post.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get latest posts
 */
export function getLatestPosts(contentType: "projects" | "blog", limit: number): PostMetadata[] {
  const posts = getPostMetadata(contentType);
  return posts.slice(0, limit);
}
