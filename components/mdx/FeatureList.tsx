import { CheckCircle2, Zap, Shield, Rocket, Code2, Users, Settings, Lock, Globe, Smartphone, Share2 } from 'lucide-react';

interface FeatureListProps {
  children: React.ReactNode;
  icon?: 'check' | 'zap' | 'shield' | 'rocket' | 'code' | 'users' | 'settings' | 'lock' | 'globe' | 'mobile' | 'share';
}

const iconMap: { [key: string]: any } = {
  check: CheckCircle2,
  zap: Zap,
  shield: Shield,
  rocket: Rocket,
  code: Code2,
  users: Users,
  settings: Settings,
  lock: Lock,
  globe: Globe,
  mobile: Smartphone,
  share: Share2,
};

export function FeatureList({ children, icon = 'check' }: FeatureListProps) {
  const IconComponent = iconMap[icon];

  return (
    <div className="space-y-3 my-6">
      {children}
    </div>
  );
}

interface FeatureItemProps {
  children: React.ReactNode;
  icon?: 'check' | 'zap' | 'shield' | 'rocket' | 'code' | 'users' | 'settings' | 'lock' | 'globe' | 'mobile' | 'share';
}

export function FeatureItem({ children, icon }: FeatureItemProps) {
  const IconComponent = icon && iconMap[icon] ? iconMap[icon] : CheckCircle2;

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg2/50 transition-colors group">
      <IconComponent className="text-accent mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" size={18} />
      <span className="text-text/80 leading-relaxed">{children}</span>
    </div>
  );
}
