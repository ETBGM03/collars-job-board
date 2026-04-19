interface PageHeadingProps {
  title: string;
  description: string;
}

export function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
    </div>
  );
}
