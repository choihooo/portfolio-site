export function TwoColumn({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 ${className}`}>
      {children}
    </div>
  );
}

export function TwoColumnLeft({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex-1 ${className}`}>
      {children}
    </div>
  );
}

export function TwoColumnRight({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex-1 ${className}`}>
      {children}
    </div>
  );
}
