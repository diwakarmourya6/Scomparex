import React from 'react';
import { Smartphone } from '../types/smartphone';
import { generateComparisonSummary, formatPrice } from '../utils/comparator';
import { Trophy, Cpu, Camera, Battery, Tag, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface ComparisonSummaryProps {
  phones: Smartphone[];
  onViewDetails: (id: string) => void;
}

export const ComparisonSummary: React.FC<ComparisonSummaryProps> = ({ phones, onViewDetails }) => {
  const summary = generateComparisonSummary(phones);

  if (!summary || phones.length < 2) return null;

  const {
    overallWinner,
    overallReason,
    bestPerformance,
    bestPerformanceReason,
    bestCamera,
    bestCameraReason,
    bestBattery,
    bestBatteryReason,
    bestValue,
    bestValueReason
  } = summary;

  const categories = [
    {
      title: 'Best Performance',
      icon: Cpu,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50/80',
      borderColor: 'border-indigo-200',
      winner: bestPerformance,
      reason: bestPerformanceReason
    },
    {
      title: 'Best Camera',
      icon: Camera,
      iconColor: 'text-rose-600',
      bgColor: 'bg-rose-50/80',
      borderColor: 'border-rose-200',
      winner: bestCamera,
      reason: bestCameraReason
    },
    {
      title: 'Best Battery Life',
      icon: Battery,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/80',
      borderColor: 'border-emerald-200',
      winner: bestBattery,
      reason: bestBatteryReason
    },
    {
      title: 'Best Value for Money',
      icon: Tag,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50/80',
      borderColor: 'border-amber-200',
      winner: bestValue,
      reason: bestValueReason
    }
  ];

  return (
    <section id="comparison-verdict-section" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Data-Driven Specification Verdict</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Which smartphone should you buy?
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Automated verdict computed by analyzing {phones.length} devices across benchmarks, cameras, batteries, and value.
          </p>
        </div>
      </div>

      {/* 1. Overall Winner Showcase Card */}
      <div className="bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-slate-50 border-2 border-amber-400/40 rounded-2xl p-6 sm:p-7 relative overflow-hidden">
        <div className="absolute top-4 right-4 text-amber-500/20 pointer-events-none">
          <Trophy className="w-32 h-32 -rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl p-3 border border-amber-200/80 shadow-md flex items-center justify-center shrink-0">
            <img
              src={overallWinner.image}
              alt={overallWinner.name}
              className="h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=200&q=80';
              }}
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white font-extrabold text-xs tracking-wider uppercase shadow-xs">
                <Trophy className="w-3.5 h-3.5" />
                Overall Winner
              </span>
              <span className="text-xs font-bold text-slate-500">
                Score: {overallWinner.scores.overall}/100
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {overallWinner.name}
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {overallReason}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <span className="text-lg font-bold text-slate-900">
                {formatPrice(overallWinner.price)}
              </span>
              <button
                id={`verdict-view-details-${overallWinner.id}`}
                onClick={() => onViewDetails(overallWinner.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                <span>View Full Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category Breakdown Grid */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Category Highlights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border ${cat.borderColor} ${cat.bgColor} flex flex-col justify-between space-y-3`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 bg-white rounded-xl shadow-2xs ${cat.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        {cat.title}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {cat.winner.name}
                      </h4>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-slate-800 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">
                    {formatPrice(cat.winner.price)}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {cat.reason}
                </p>

                {cat.title === 'Best Performance' && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/90 rounded-xl border border-indigo-200/80 text-[11px] font-semibold text-indigo-900">
                    <Cpu className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Processor: {cat.winner.performance.processor}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end">
                  <button
                    onClick={() => onViewDetails(cat.winner.id)}
                    className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
                  >
                    <span>View phone</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
