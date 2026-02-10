"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MotionWrapper } from "./MotionWrapper";
import { ProjectModal, projectDetails, type ProjectDetails } from "./ProjectModal";

function ProjectCard({ 
  project, 
  index, 
  onClick 
}: { 
  project: ProjectDetails; 
  index: number;
  onClick: () => void;
}) {
  return (
    <MotionWrapper delay={index * 0.1}>
      <button 
        onClick={onClick}
        className="group block h-full w-full text-left"
      >
        <div className={cn(
          "h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden",
          "shadow-sm hover:shadow-lg dark:shadow-black/30 transition-all duration-300",
          "hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1"
        )}>
          {/* Gradient Header */}
          <div 
            className={cn(
              "h-48 relative overflow-hidden",
              `bg-gradient-to-br ${project.gradient}`
            )}
          >
            {/* Data Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-60"
              style={{ 
                backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.12) 0%, transparent 45%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)`
              }}
            />
            
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />
            
            {/* Floating Data Points */}
            <div className="absolute inset-0">
              <div className="absolute top-6 left-6 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
              <div className="absolute top-12 right-10 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-16 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            
            {/* Hover Arrow */}
            <div className={cn(
              "absolute top-4 right-4 w-10 h-10 rounded-full",
              "bg-white/10 backdrop-blur-sm border border-white/20",
              "flex items-center justify-center",
              "opacity-0 group-hover:opacity-100 transition-all duration-300",
              "group-hover:rotate-45"
            )}>
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>

            {/* Status Badge */}
            <div className="absolute bottom-4 left-4">
              <span className={cn(
                "px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide",
                "bg-white/20 backdrop-blur-sm text-white border border-white/30"
              )}>
                {project.status}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              {project.title}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>
            
            {/* Metric */}
            <div className="flex items-center gap-2 mb-4 py-2 px-3 bg-zinc-50 dark:bg-white/5 rounded-lg w-fit">
              <span className="text-base">{project.metricIcon}</span>
              <span className={cn("font-bold", project.metricColor, "dark:brightness-125")}>
                {project.metric}
              </span>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Click hint */}
            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 group-hover:text-blue-500 transition-colors">
                Click to view details →
              </span>
            </div>
          </div>
        </div>
      </button>
    </MotionWrapper>
  );
}

export function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: ProjectDetails) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing the project to allow exit animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectDetails.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
