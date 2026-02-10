import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPostMetadata } from "@/lib/mdx";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { GridBackground } from "@/components/ui/GridBackground";

export const metadata = {
  title: "Blog",
  description: "Insights on data engineering, FinOps, and cloud cost optimization.",
};

export default function BlogPage() {
  // Get all blog posts from MDX files
  const posts = getPostMetadata("blog");

  return (
    <div className="relative">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0">
        <GridBackground
          dotSize={1}
          dotSpacing={20}
          dotColor="rgba(148, 163, 184, 0.25)"
          highlightColor="rgba(56, 189, 248, 0.5)"
          highlightRadius={100}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <MotionWrapper className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Blog
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Thoughts & Updates
          </h1>
          <p className="text-lg text-muted-foreground">
            Insights on data engineering, FinOps, and cloud cost optimization.
          </p>
        </MotionWrapper>

        {/* Posts List */}
        <StaggerContainer className="space-y-6">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className={cn(
                  "group block overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-6",
                  "transition-all duration-300",
                  "hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readingTime} min read
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-cyan-500 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground mb-4">
                      {post.summary}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-cyan-500 group-hover:gap-3 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No posts found. Add MDX files to the{" "}
              <code className="px-2 py-1 bg-secondary rounded text-sm">
                content/blog
              </code>{" "}
              directory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
