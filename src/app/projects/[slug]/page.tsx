import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// This is a placeholder - will be replaced with actual MDX content loading
export default function ProjectPage({ params }: { params: { slug: string } }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Link
          href="/projects"
          className={cn(
            "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1>Project: {params.slug}</h1>
          <p className="lead">
            This is a placeholder page for the project detail view. 
            MDX content will be loaded here based on the slug.
          </p>
          <p>
            To implement full MDX support, you&apos;ll need to add packages like 
            <code>@next/mdx</code> or <code>contentlayer</code> to parse and render 
            the MDX files from the <code>content/projects</code> directory.
          </p>
        </article>
      </div>
    </div>
  );
}
