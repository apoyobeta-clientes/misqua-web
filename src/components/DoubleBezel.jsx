export function DoubleBezel({ children, className = "", innerClassName = "" }) {
  return (
    <div className={`p-1.5 ring-1 ring-black/5 bg-black/5 rounded-[2rem] ${className}`}>
      <div
        className={`relative h-full w-full overflow-hidden rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
