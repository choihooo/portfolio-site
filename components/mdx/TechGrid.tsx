interface TechGridProps {
  children: React.ReactNode;
  compact?: boolean;
}

export function TechGrid({ children, compact = false }: TechGridProps) {
  return (
    <div className={`grid gap-3 my-6 ${
      compact
        ? 'grid-cols-2'
        : 'grid-cols-2 sm:grid-cols-3'
    }`}>
      {children}
    </div>
  );
}

interface TechItemProps {
  name: string;
  icon?: string;
  description?: string;
  color?: string;
}

export function TechItem({ name, icon, description, color = "gray" }: TechItemProps) {
  const colorMap: { [key: string]: string } = {
    gray: 'from-gray-600 to-gray-800',
    blue: 'from-blue-600 to-blue-800',
    cyan: 'from-cyan-500 to-cyan-700',
    green: 'from-green-600 to-green-800',
    red: 'from-red-600 to-red-800',
    yellow: 'from-yellow-500 to-yellow-700',
    purple: 'from-purple-600 to-purple-800',
    pink: 'from-pink-600 to-pink-800',
    orange: 'from-orange-500 to-orange-700',
  };

  const gradientClass = colorMap[color] || colorMap.gray;

  return (
    <div className="group">
      <div className={`bg-gradient-to-br ${gradientClass} rounded-lg p-3 h-full hover:scale-105 transition-transform cursor-default`}>
        <div className="flex items-center gap-2 mb-1">
          {icon && (
            <div className="w-7 h-7 bg-white/20 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {icon}
            </div>
          )}
          <h4 className="font-syne font-bold text-white text-sm leading-tight">{name}</h4>
        </div>
        {description && (
          <p className="text-white/70 text-xs leading-tight">{description}</p>
        )}
      </div>
    </div>
  );
}
