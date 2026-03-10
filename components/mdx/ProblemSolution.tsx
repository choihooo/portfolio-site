import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ProblemSolutionProps {
  children: React.ReactNode;
}

export function ProblemSolution({ children }: ProblemSolutionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {children}
    </div>
  );
}

interface ProblemProps {
  title?: string;
  children: React.ReactNode;
}

export function Problem({ title = "문제", children }: ProblemProps) {
  return (
    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="text-red-400" size={20} />
        <h4 className="font-syne font-bold text-lg text-red-400">{title}</h4>
      </div>
      <div className="text-text/80 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

interface SolutionProps {
  title?: string;
  children: React.ReactNode;
}

export function Solution({ title = "해결책", children }: SolutionProps) {
  return (
    <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle2 className="text-green-400" size={20} />
        <h4 className="font-syne font-bold text-lg text-green-400">{title}</h4>
      </div>
      <div className="text-text/80 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
