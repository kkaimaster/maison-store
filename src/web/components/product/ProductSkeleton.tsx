interface ProductSkeletonProps {
  count?: number;
  cols?: 2 | 3 | 4;
}

/**
 * Editorial-feel skeleton card. Uses the brand's gold accent in the
 * shimmer to stay on-language rather than a generic gray spinner.
 */
export default function ProductSkeleton({ count = 4, cols = 4 }: ProductSkeletonProps) {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4',
  }[cols];

  return (
    <div className={`grid ${colClass} gap-4 md:gap-6`} aria-busy="true" aria-live="polite">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="group">
          <div
            className="relative overflow-hidden bg-[#EEEAE1] border border-[#E8E4DC]"
            style={{ aspectRatio: '3/4' }}
          >
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                background:
                  'linear-gradient(110deg, rgba(232,228,220,0) 30%, rgba(201,169,110,0.18) 50%, rgba(232,228,220,0) 70%)',
                backgroundSize: '200% 100%',
                animation: 'maison-shimmer 1.6s ease-in-out infinite',
              }}
            />
            <div
              className="absolute top-3 left-3 w-16 h-3 bg-[#1A1A18]/10"
              style={{ background: 'rgba(26,26,24,0.10)' }}
            />
          </div>
          <div className="mt-4 px-1 space-y-2">
            <div className="h-4 bg-[#E8E4DC] w-3/4" />
            <div className="h-3 bg-[#E8E4DC] w-1/3" />
            <div className="flex gap-1.5 pt-1">
              <div className="w-4 h-4 bg-[#E8E4DC]" />
              <div className="w-4 h-4 bg-[#E8E4DC]" />
              <div className="w-4 h-4 bg-[#E8E4DC]" />
            </div>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes maison-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
