import { portfolioData } from "@/data/portfolio";
import { CopyEmail } from "@/components/copy-email";
import { ProjectItem } from "@/components/project-item";
import { Timeline } from "@/components/timeline";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  const { personal, socials, projects, career } = portfolioData;

  return (
    <div className="relative z-40 flex flex-col min-h-screen">
      {/* Top spacing matching kshv.me */}
      <div className="min-h-28 md:min-h-40 w-full" aria-hidden="true" />

      <main className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col gap-9 px-6 pb-20">
        {/* Header matching kshv.me format */}
        <header className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2 text-base font-medium tracking-tight text-foreground">
              <h1 className="font-semibold text-foreground">{personal.name}</h1>
              {socials.twitter && (
                <>
                  <span className="text-muted-foreground/40 font-mono text-xs">/</span>
                  <a
                    href={socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground underline decoration-border hover:decoration-foreground/50 underline-offset-4"
                  >
                    twitter
                  </a>
                </>
              )}
              {socials.linkedin && (
                <>
                  <span className="text-muted-foreground/40 font-mono text-xs">/</span>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground underline decoration-border hover:decoration-foreground/50 underline-offset-4"
                  >
                    linkedin
                  </a>
                </>
              )}
              {socials.github && (
                <>
                  <span className="text-muted-foreground/40 font-mono text-xs">/</span>
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground underline decoration-border hover:decoration-foreground/50 underline-offset-4"
                  >
                    github
                  </a>
                </>
              )}
            </div>

            <p className="text-xs font-mono text-muted-foreground">
              {personal.subheading || personal.role}
            </p>
          </div>

          {/* Bio Narrative */}
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground pt-1">
            {personal.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p>
              You can find me sharing design work on{" "}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-border hover:decoration-foreground/60 underline-offset-4 transition-colors"
                >
                  X
                </a>
              )}
              {socials.twitter && socials.linkedin && " or "}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-border hover:decoration-foreground/60 underline-offset-4 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              , or reach me at <CopyEmail email={personal.email} />.
            </p>
          </div>
        </header>

        {/* Projects Section */}
        <section className="flex flex-col gap-3.5">
          <h2 className="text-base font-medium tracking-tight text-foreground">
            Projects
          </h2>
          <div className="flex flex-col gap-3">
            {projects.map((project, idx) => (
              <ProjectItem key={idx} project={project} />
            ))}
          </div>
        </section>

        {/* Career Section */}
        <section className="flex flex-col gap-3.5">
          <h2 className="text-base font-medium tracking-tight text-foreground">
            Career
          </h2>
          <Timeline items={career} />
        </section>

      </main>

      {/* Footer with Lamp Pull Cord theme switch and navigation */}
      <SiteFooter footerName={personal.footerName} />
    </div>
  );
}
