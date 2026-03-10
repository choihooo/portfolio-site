interface StatsProps {
  children: React.ReactNode;
}

export function Stats({ children }: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
      {children}
    </div>
  );
}

interface StatItemProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

export function StatItem({ value, label, icon }: StatItemProps) {
  return (
    <div className="text-center p-6 bg-gradient-to-br from-bg2 to-bg border border-border rounded-xl hover:border-accent/50 transition-all group">
      {icon && (
        <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      )}
      <div className="font-syne font-bold text-3xl md:text-4xl text-accent mb-2">
        {value}
      </div>
      <div className="font-mono text-sm text-text/60">{label}</div>
    </div>
  );
}
