import { Folder } from "lucide-react";
import { getPostMetadata } from "@/lib/mdx";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { GridBackground } from "@/components/ui/GridBackground";

export const metadata = {
  title: "Projects",
  description: "A collection of data engineering and FinOps projects showcasing scalable solutions.",
};

export default function ProjectsPage() {
  // Get all projects from MDX files
  const projects = getPostMetadata("projects");

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

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <MotionWrapper className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Folder className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Portfolio
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of data engineering and FinOps projects I&apos;ve built.
            Each project showcases different aspects of building scalable data solutions
            with measurable business impact.
          </p>
        </MotionWrapper>

        {/* Stats Bar */}
        <MotionWrapper delay={0.1} className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card/70 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold text-emerald-500">$2M+</p>
              <p className="text-sm text-muted-foreground">Total Cost Savings</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/70 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold text-emerald-500">99.9%</p>
              <p className="text-sm text-muted-foreground">Avg. Uptime</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/70 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold text-emerald-500">50TB+</p>
              <p className="text-sm text-muted-foreground">Data Processed Daily</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/70 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold text-emerald-500">{projects.length}</p>
              <p className="text-sm text-muted-foreground">Case Studies</p>
            </div>
          </div>
        </MotionWrapper>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No projects found. Add MDX files to the{" "}
              <code className="px-2 py-1 bg-secondary rounded text-sm">
                content/projects
              </code>{" "}
              directory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
