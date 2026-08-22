import React, { useState } from 'react';
import { QuizPreferences, RecommendationMatch, Brand } from '../types/smartphone';
import { calculateRecommendations } from '../utils/recommendationEngine';
import { formatPrice } from '../utils/comparator';
import { useCompare } from '../context/CompareContext';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Star, 
  Camera, 
  Gamepad2, 
  Battery, 
  Cpu, 
  Tv, 
  Coins, 
  Smartphone as PhoneIcon,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecommendationQuizProps {
  onViewDetails: (id: string) => void;
  navigate: (path: string) => void;
}

export const RecommendationQuiz: React.FC<RecommendationQuizProps> = ({ onViewDetails, navigate }) => {
  const { allPhones, addToCompare, clearCompare } = useCompare();

  const [step, setStep] = useState<number>(1);
  const [preferences, setPreferences] = useState<QuizPreferences>({
    budget: '25000-40000',
    priority: 'Camera',
    batteryImportance: 'High',
    displayPreference: 'No preference',
    preferredBrand: 'Any'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<RecommendationMatch[] | null>(null);

  const budgetOptions: { id: QuizPreferences['budget']; label: string; desc: string }[] = [
    { id: 'under-15000', label: 'Under ₹15,000', desc: 'Essential daily apps, good battery, standard display' },
    { id: '15000-25000', label: '₹15,000–₹25,000', desc: 'Popular budget sweet spot with 5G & 120Hz screens' },
    { id: '25000-40000', label: '₹25,000–₹40,000', desc: 'Flagship killers, 50MP OIS cameras & fast charging' },
    { id: '40000-60000', label: '₹40,000–₹60,000', desc: 'Premium mid-range with top tier chipsets & 4K video' },
    { id: 'above-60000', label: 'Above ₹60,000', desc: 'Ultra flagships with periscope zoom, titanium & top specs' }
  ];

  const priorityOptions: { id: QuizPreferences['priority']; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { id: 'Camera', label: 'Pro Photography', icon: Camera, desc: 'High-res sensors, portrait bokeh, OIS & zoom' },
    { id: 'Gaming', label: 'Gaming & Speed', icon: Gamepad2, desc: 'High frame rates, liquid cooling & high RAM' },
    { id: 'Battery', label: 'Long Battery Life', icon: Battery, desc: '5500mAh+ capacity, 80W+ fast charging' },
    { id: 'Performance', label: 'Multitasking & Power', icon: Cpu, desc: 'Flagship Snapdragon/Apple chips with 12GB+ RAM' },
    { id: 'Display', label: 'Vivid Display & Media', icon: Tv, desc: '120Hz/144Hz AMOLED, HDR10+, 2000+ nits brightness' },
    { id: 'Value for Money', label: 'Maximum Value', icon: Coins, desc: 'Highest hardware specifications for every rupee' }
  ];

  const handleFinishQuiz = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const matches = calculateRecommendations(preferences, allPhones);
      setResults(matches);
      setIsAnalyzing(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 750);
  };

  const handleResetQuiz = () => {
    setResults(null);
    setStep(1);
  };

  const handleCompareMatches = (matches: RecommendationMatch[]) => {
    clearCompare();
    matches.slice(0, 3).forEach(m => addToCompare(m.phone.id));
    navigate('/compare');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full brand-bg-light border brand-border-light brand-text-primary text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Phone Matchmaker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find Your Perfect Smartphone
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
          Answer 4 quick questions about your budget and usage habits to discover the ideal phone for your needs.
        </p>
      </div>

      {!results && !isAnalyzing && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          {/* Step Progress bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider brand-text-primary">
              Question {step} of 4
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map(s => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step
                      ? 'w-8 brand-bg-primary'
                      : s < step
                      ? 'w-4 opacity-50 brand-bg-primary'
                      : 'w-4 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: BUDGET */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  1. What is your target budget?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  We will prioritize devices that give you the highest value within this price bracket.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {budgetOptions.map(opt => {
                  const isSelected = preferences.budget === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPreferences({ ...preferences, budget: opt.id })}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'brand-border-primary brand-bg-light shadow-xs ring-1 brand-ring'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 text-sm block">
                          {opt.label}
                        </span>
                        <span className="text-xs text-slate-500">
                          {opt.desc}
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'brand-bg-primary text-white border-transparent' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  id="quiz-step-1-next"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 brand-bg-primary text-white font-bold text-sm rounded-xl shadow-md transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PRIORITY */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  2. What matters most in your next phone?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select the primary attribute that you value most in daily usage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {priorityOptions.map(opt => {
                  const Icon = opt.icon;
                  const isSelected = preferences.priority === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPreferences({ ...preferences, priority: opt.id })}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 shadow-xs ring-1 ring-indigo-600'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{opt.label}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  id="quiz-step-2-next"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: BATTERY IMPORTANCE */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  3. How important is battery longevity to you?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  How many hours or days away from an electric socket do you anticipate?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Low', title: 'Standard', desc: 'Standard 4000mAh+, near charger most of the day' },
                  { id: 'Medium', title: 'Moderate', desc: 'Full 1-day endurance under social media & calls' },
                  { id: 'High', title: 'Critical (Heavy Duty)', desc: '5500mAh+ monster battery with ultra-fast charging' }
                ].map(item => {
                  const isSelected = preferences.batteryImportance === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setPreferences({ ...preferences, batteryImportance: item.id as any })}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-4 text-center ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                      <span className="text-xs text-slate-500">{item.desc}</span>
                      <div className={`w-5 h-5 mx-auto rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  id="quiz-step-3-next"
                  onClick={() => setStep(4)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: DISPLAY SIZE & ECOSYSTEM */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  4. What phone size do you prefer?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Choose your comfort preference for ergonomics and screen real estate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Compact phone', title: 'Compact & Lightweight', desc: '≤ 6.3-inch screen, easy one-handed pocketable grip' },
                  { id: 'Large display', title: 'Large & Immersive', desc: '≥ 6.7-inch screen for movies, gaming & multi-window' },
                  { id: 'No preference', title: 'No Preference', desc: 'Open to standard sizes and whatever delivers best value' }
                ].map(item => {
                  const isSelected = preferences.displayPreference === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setPreferences({ ...preferences, displayPreference: item.id as any })}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-4 text-center ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                      <span className="text-xs text-slate-500">{item.desc}</span>
                      <div className={`w-5 h-5 mx-auto rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  id="quiz-find-matches-btn"
                  onClick={handleFinishQuiz}
                  className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal My Best Smartphone</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Loading state */}
      {isAnalyzing && (
        <div className="py-24 text-center space-y-4 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">
            Analyzing 14+ Smartphone Specifications...
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Cross-referencing benchmarks, display refresh rates, cameras, and budget parameters to find your optimal match.
          </p>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      {results && results.length > 0 && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Top 1 Match Highlight Card */}
          {(() => {
            const topMatch = results[0];
            const topPhone = topMatch.phone;
            return (
              <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-indigo-800/60 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-md">
                        {topMatch.matchScore}% Match
                      </span>
                      <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                        #1 Top Recommended Smartphone
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {topPhone.name}
                    </h2>

                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-white">
                        {formatPrice(topPhone.price)}
                      </span>
                      {topPhone.originalPrice > topPhone.price && (
                        <span className="text-sm text-slate-400 line-through">
                          {formatPrice(topPhone.originalPrice)}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {topPhone.shortDescription}
                    </p>

                    {/* Why we recommend it */}
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2.5">
                        Why We Recommend It for You:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-200">
                        {topMatch.reasons.map((r, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <button
                        id={`rec-view-details-${topPhone.id}`}
                        onClick={() => onViewDetails(topPhone.id)}
                        className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md"
                      >
                        View Full Specs & Offers
                      </button>

                      <button
                        id={`rec-add-compare-${topPhone.id}`}
                        onClick={() => addToCompare(topPhone.id)}
                        className="px-5 py-3 bg-indigo-800/80 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl border border-indigo-600 transition-colors"
                      >
                        Add to Comparison Queue
                      </button>
                    </div>
                  </div>

                  {/* Top Phone Image */}
                  <div className="w-full md:w-64 h-64 bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center justify-center border border-white/10 shrink-0 shadow-inner">
                    <img
                      src={topPhone.image}
                      alt={topPhone.name}
                      className="max-h-full max-w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Runners up matches (Next 2) */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">
                Alternative Recommendations
              </h3>
              <button
                id="compare-top-matches-btn"
                onClick={() => handleCompareMatches(results)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 rounded-xl"
              >
                <span>Compare Top 3 Side-by-Side</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.slice(1, 3).map((match, idx) => {
                const phone = match.phone;
                return (
                  <div
                    key={phone.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-xl p-2 flex items-center justify-center shrink-0 border border-slate-100">
                        <img
                          src={phone.image}
                          alt={phone.name}
                          className="h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=150&q=80';
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                            {phone.brand}
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.2 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200/60">
                            {match.matchScore}% Match
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base">{phone.name}</h4>
                        <span className="text-sm font-extrabold text-slate-900 block">
                          {formatPrice(phone.price)}
                        </span>
                      </div>
                    </div>

                    {/* Bullet reasons */}
                    <div className="space-y-1 text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl">
                      {match.reasons.slice(0, 2).map((r, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <button
                        id={`rec-runnerup-details-${phone.id}`}
                        onClick={() => onViewDetails(phone.id)}
                        className="font-bold text-slate-900 hover:text-indigo-600"
                      >
                        View Details
                      </button>
                      <button
                        id={`rec-runnerup-add-compare-${phone.id}`}
                        onClick={() => addToCompare(phone.id)}
                        className="font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Add to Compare
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Retake quiz button */}
          <div className="text-center pt-6">
            <button
              id="retake-quiz-btn"
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz with Different Preferences</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
