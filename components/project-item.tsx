import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";

interface ProjectItemProps {
  project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div className="entry-card flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-3">
        <a
          href={project.url || "#"}
          target={project.url ? "_blank" : undefined}
          rel={project.url ? "noopener noreferrer" : undefined}
          className="group/link inline-flex items-center gap-1.5 font-medium tracking-tight text-foreground hover:underline decoration-border hover:decoration-foreground/50 underline-offset-4"
        >
          <span>{project.title}</span>
          <ArrowUpRight className="size-3.5 text-muted-foreground/80 transition-transform duration-150 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>

        {project.tag && (
          <span className="font-mono text-[13px] text-muted-foreground/80 px-2 py-0.5 rounded-md bg-background/60 border border-border/50">
            {project.tag}
          </span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {project.highlights && project.highlights.length > 0 && (
        <ul className="flex flex-col gap-1 pt-1 text-xs text-muted-foreground/90 pl-3">
          {project.highlights.map((highlight, idx) => (
            <li
              key={idx}
              className="relative pl-3 before:absolute before:left-0 before:text-muted-foreground/60 before:content-['–']"
            >
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
