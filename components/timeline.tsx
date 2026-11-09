import { ArrowUpRight } from "lucide-react";
import type { CareerItem } from "@/data/portfolio";

interface TimelineProps {
  items: CareerItem[];
}

export function Timeline({ items }: TimelineProps) {
  // Group career items by company while preserving order
  const companyGroups = items.reduce<
    Array<{ company: string; companyUrl?: string; roles: CareerItem[] }>
  >((groups, item) => {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.company === item.company) {
      lastGroup.roles.push(item);
    } else {
      groups.push({
        company: item.company,
        companyUrl:
          item.companyUrl ||
          (item.company.toLowerCase().includes("webqraft")
            ? "https://webqraft.in/"
            : undefined),
        roles: [item],
      });
    }
    return groups;
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {companyGroups.map((group, groupIdx) => (
        <div key={groupIdx} className="flex flex-col gap-4">
          {/* Company Link Header */}
          {group.companyUrl ? (
            <a
              href={group.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/company inline-flex items-center gap-1.5 text-sm font-normal text-foreground underline decoration-border hover:decoration-foreground underline-offset-4 transition-colors w-fit"
            >
              <span>{group.company}</span>
              <ArrowUpRight className="size-3.5 text-foreground/80 transition-transform duration-150 group-hover/company:-translate-y-0.5 group-hover/company:translate-x-0.5" />
            </a>
          ) : (
            <span className="text-sm font-normal text-foreground">
              {group.company}
            </span>
          )}

          {/* Timeline of roles under this company */}
          <div className="flex flex-col">
            {group.roles.map((item, index) => {
              const isLast = index === group.roles.length - 1;
              return (
                <div key={index} className="relative flex gap-3.5">
                  {/* Timeline square node & blue dotted line rail */}
                  <div className="relative flex w-3 shrink-0 flex-col items-center">
                    {/* Sharp square node in #0066FF with 50% opacity */}
                    <span className="relative z-10 size-2.5 rounded-none bg-[#0066FF]/50 shrink-0 mt-1" />

                    {/* Vertical blue dashed line (#0066FF at 50% opacity) connecting nodes: dash 4, gap 6 */}
                    {!isLast && (
                      <div
                        className="absolute top-3.5 bottom-[-4px] left-1/2 -translate-x-1/2 w-[2px] z-0"
                        style={{
                          background:
                            "repeating-linear-gradient(to bottom, rgba(0, 102, 255, 0.5) 0px, rgba(0, 102, 255, 0.5) 4px, transparent 4px, transparent 10px)",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Role Details */}
                  <div
                    className={`flex flex-1 flex-col gap-1 ${
                      isLast ? "pb-0" : "pb-7"
                    }`}
                  >
                    <h3 className="font-medium text-foreground tracking-tight text-sm">
                      {item.role}
                    </h3>

                    <span className="text-xs text-muted-foreground/80 font-normal">
                      {item.period}
                    </span>

                    <p className="text-sm leading-relaxed text-muted-foreground pt-0.5">
                      {item.description}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="flex flex-col gap-1.5 pt-1 pl-4 text-xs text-muted-foreground/85">
                        {item.highlights.map((bullet, bIdx) => (
                          <p key={bIdx} className="leading-relaxed">
                            {bullet}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
