import { ExternalLink } from "lucide-react";
import { useSectionItems } from "@/hooks/useSectionItems";

type SectionItemsGridProps = {
  section: string;
  emptyMessage?: string;
};

const SectionItemsGrid = ({ section, emptyMessage = "No items found." }: SectionItemsGridProps) => {
  const { items, loading, error } = useSectionItems(section);

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading items...</p>;
  }

  if (error) {
    return <p className="text-center text-destructive">{error}</p>;
  }

  if (items.length === 0) {
    return <p className="text-center text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item._id} className="rounded-2xl border bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
          {item.subtitle ? <p className="mt-1 text-sm text-primary">{item.subtitle}</p> : null}
          {item.description ? (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          ) : null}

          {(item.startDate || item.endDate) ? (
            <p className="mt-3 text-xs text-muted-foreground">
              {item.startDate || ""}
              {item.startDate && item.endDate ? " - " : ""}
              {item.endDate || ""}
            </p>
          ) : null}

          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Open link
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
};

export default SectionItemsGrid;
