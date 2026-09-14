type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionEyebrow({ children, className = "" }: SectionEyebrowProps) {
  return (
    <p
      className={`text-[10px] font-normal uppercase tracking-[0.22em] text-ory-accent ${className}`}
    >
      {children}
    </p>
  );
}
