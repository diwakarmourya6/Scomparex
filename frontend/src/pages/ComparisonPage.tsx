import React from 'react';
import { Smartphone } from '../types/smartphone';
import { useCompare } from '../context/CompareContext';
import { ComparisonTable } from '../components/ComparisonTable';
import { ComparisonSummary } from '../components/ComparisonSummary';
import { 
  ArrowLeftRight, 
  Plus, 
  Trash2, 
  Share2, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface ComparisonPageProps {
  onViewDetails: (id: string) => void;
  navigate: (path: string) => void;
}

export const ComparisonPage: React.FC<ComparisonPageProps> = ({ onViewDetails, navigate }) => {
  const { allPhones, compareIds, comparePhones, removeFromCompare, clearCompare, openQuickPicker, addToCompare, showToast } = useCompare();

  const comparedPhones: Smartphone[] = comparePhones;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Comparison link copied to clipboard!');
    }
  };

  const starterPresets = allPhones.length >= 4 ? [
    {
      name: `${allPhones[0].name.split(' ')[0]} ${allPhones[0].name.split(' ')[1]} vs ${allPhones[1].name.split(' ')[0]} ${allPhones[1].name.split(' ')[1]}`,
      ids: [allPhones[0].id, allPhones[1].id]
    },
    {
      name: `${allPhones[2].name.split(' ')[0]} ${allPhones[2].name.split(' ')[1]} vs ${allPhones[3].name.split(' ')[0]} ${allPhones[3].name.split(' ')[1]}`,
      ids: [allPhones[2].id, allPhones[3].id]
    }
  ] : [];

  const handleLoadPreset = (ids: string[]) => {
    clearCompare();
    ids.forEach(id => addToCompare(id));
  };

  return (
    <div className="space-y-10 pb-24 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 brand-text-primary text-xs font-bold uppercase tracking-wider mb-1">
            <ArrowLeftRight className="w-4 h-4" />
            <span>Side-by-Side Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Compare Smartphones
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-2xl">
            Compare technical specifications, performance benchmarks, camera sensor sizes, and battery life of 2 to 4 devices.
          </p>
        </div>

        {comparedPhones.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              id="share-comparison-btn"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Comparison</span>
            </button>

            <button
              id="clear-all-comparison-btn"
              onClick={clearCompare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* STATE 1: Less than 2 phones selected */}
      {comparedPhones.length < 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8 text-center">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-14 h-14 brand-bg-light brand-text-primary rounded-2xl flex items-center justify-center mx-auto">
              <ArrowLeftRight className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {comparedPhones.length === 1 ? 'Add at least 1 more phone' : 'Select smartphones to compare'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {comparedPhones.length === 1
                ? `You have selected ${comparedPhones[0].name}. Pick another phone to unlock the automated verdict and spec comparison.`
                : 'Select 2 to 4 smartphones from our catalogue to compare specifications, ratings, benchmarks, and category winners.'}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="empty-open-picker-btn"
                onClick={() => openQuickPicker()}
                className="w-full sm:w-auto px-6 py-3 brand-bg-primary text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Choose Smartphones to Compare</span>
              </button>

              <button
                id="empty-explore-btn"
                onClick={() => navigate('/smartphones')}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-colors"
              >
                Browse Full Catalogue
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="pt-6 border-t border-slate-100 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Or Try One of These Popular Comparisons:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {starterPresets.map((preset, idx) => (
                <button
                  key={idx}
                  id={`load-preset-btn-${idx}`}
                  onClick={() => handleLoadPreset(preset.ids)}
                  className="p-4 text-left rounded-2xl border border-slate-200 hover:brand-border-primary hover:brand-bg-light transition-all space-y-1 group"
                >
                  <span className="text-xs font-bold text-slate-900 group-hover:brand-text-primary block">
                    {preset.name}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <span>Load comparison</span>
                    <ArrowRight className="w-3 h-3 brand-text-primary" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STATE 2: 2 to 4 phones selected */}
      {comparedPhones.length >= 2 && (
        <div className="space-y-10">
          {/* Comparison Summary / Automated Verdict */}
          <ComparisonSummary
            phones={comparedPhones}
            onViewDetails={onViewDetails}
          />

          {/* Full Side-by-side Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Full Side-by-Side Comparison Matrix
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Green highlights indicate superior technical specifications.
                </p>
              </div>

              {comparedPhones.length < 4 && (
                <button
                  id="table-add-more-btn"
                  onClick={() => openQuickPicker()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 brand-bg-light hover:opacity-90 brand-text-primary font-bold text-xs rounded-xl border brand-border-light transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Device ({comparedPhones.length}/4)</span>
                </button>
              )}
            </div>

            <ComparisonTable
              phones={comparedPhones}
              onViewDetails={onViewDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};
