type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

/**
 * Unified page header band for internal pages — blue gradient with
 * the same dotted pattern and accent bars used in the home Slogan section.
 */
export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark py-14 sm:py-16">
      {/* Subtle dotted pattern overlay */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Symmetric decorative stripes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -start-1/4 h-[200%] w-1/3 bg-white/[0.03] rotate-12" />
        <div className="absolute -top-1/2 -end-1/4 h-[200%] w-1/3 bg-white/[0.03] -rotate-12" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-base sm:text-lg text-white/80">{subtitle}</p>
        )}
        <div className="mt-5 flex justify-center gap-3">
          <span className="inline-block h-1 w-12 rounded-full bg-accent" />
          <span className="inline-block h-1 w-6 rounded-full bg-white/30" />
          <span className="inline-block h-1 w-12 rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}
