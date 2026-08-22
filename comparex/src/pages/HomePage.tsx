import React, { useState, useEffect } from 'react';
import { Smartphone } from '../types/smartphone';
import { apiClient } from '../api/client';
import { SmartphoneCard } from '../components/SmartphoneCard';
import { useCompare } from '../context/CompareContext';
import { 
  Search, 
  ArrowRight, 
  ArrowLeftRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Flame, 
  SlidersHorizontal,
  Layers,
  Camera,
  Battery,
  Award,
  Smartphone as PhoneIcon,
  CheckCircle2,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  navigate: (path: string) => void;
  onViewDetails: (id: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  navigate,
  onViewDetails,
  onSearchSubmit
}) => {
  const { clearCompare, addToCompare } = useCompare();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [allPhones, setAllPhones] = useState<Smartphone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setIsLoading(true);
        const phones = await apiClient.getSmartphones();
        setAllPhones(phones);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch smartphones');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhones();
  }, []);

  const categories = [
    { id: 'all', label: 'All Smartphones', icon: PhoneIcon },
    { id: 'flagships', label: 'Ultra Flagships', icon: Award },
    { id: 'camera', label: 'Camera Monsters', icon: Camera },
    { id: 'performance', label: 'Snapdragon 8 Elite', icon: Cpu },
    { id: 'battery', label: 'Battery Kings (5000+ mAh)', icon: Battery },
    { id: 'value', label: 'Value under ₹40,000', icon: TrendingUp }
  ];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-24 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
        <p className="text-slate-500 font-medium">Loading smartphones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-24 flex flex-col items-center justify-center space-y-4 text-center">
        <XCircle className="w-16 h-16 text-rose-500" />
        <h2 className="text-2xl font-bold text-slate-900">Failed to load data</h2>
        <p className="text-slate-500 max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  const filteredPhones = allPhones.filter(phone => {
    if (selectedFilter === 'flagships') return phone.price >= 80000;
    if (selectedFilter === 'camera') return phone.scores.camera >= 93 || phone.camera.mainSensorMP >= 50;
    if (selectedFilter === 'performance') return phone.performance.processor.includes('Snapdragon 8 Elite') || phone.performance.processor.includes('A18 Pro');
    if (selectedFilter === 'battery') return phone.battery.capacity >= 5500 || phone.battery.chargingSpeed >= 90;
    if (selectedFilter === 'value') return phone.price <= 40000;
    return true;
  }).slice(0, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  const handleLaunchComparison = (phoneId1: string, phoneId2: string) => {
    clearCompare();
    addToCompare(phoneId1);
    addToCompare(phoneId2);
    navigate('/compare');
  };

  const popularBattles = [
    {
      title: 'Titanium Flagship Clash',
      tag: 'Ultra Premium',
      subtitle: 'Apple A18 Pro vs Snapdragon 8 Elite',
      phone1: allPhones.find(p => p.id === 'iphone-16-pro-max')!,
      phone2: allPhones.find(p => p.id === 'samsung-galaxy-s25-ultra')!
    },
    {
      title: 'Flagship Killer Showdown',
      tag: 'Speed & Charging',
      subtitle: '100W vs 90W HyperCharge',
      phone1: allPhones.find(p => p.id === 'oneplus-13')!,
      phone2: allPhones.find(p => p.id === 'xiaomi-15-pro')!
    },
    {
      title: 'Computational Camera Battle',
      tag: 'Best Imaging',
      subtitle: 'Google Tensor G4 vs Zeiss Optics',
      phone1: allPhones.find(p => p.id === 'google-pixel-9-pro')!,
      phone2: allPhones.find(p => p.id === 'vivo-x100-pro')!
    },
    {
      title: 'Midrange Value Face-Off',
      tag: 'Under ₹40,000',
      subtitle: 'Snapdragon 7+ Gen 3 vs Dimensity 7350 Pro',
      phone1: allPhones.find(p => p.id === 'realme-gt-6')!,
      phone2: allPhones.find(p => p.id === 'nothing-phone-2a-plus')!
    }
  ].filter(b => Boolean(b.phone1 && b.phone2));

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-6 text-center max-w-5xl mx-auto px-4">
        {/* Subtle decorative background aura */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full brand-bg-light border brand-border-light text-slate-900 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 brand-text-primary" />
            <span>Hardware-Accurate Smartphone Comparison • 2025 Flagships & Value Champions</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.12] max-w-4xl mx-auto">
            Compare Smartphones. <br className="hidden sm:inline" />
            <span className="brand-text-primary">
              Make Better Decisions.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Side-by-side technical specs, verified processor benchmarks, camera optics, battery speeds, and automated winner verdicts to help you buy with confidence.
          </p>

          {/* Large Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <form
              onSubmit={handleSearch}
              className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-300/90 p-2 focus-within:ring-2 brand-ring transition-all"
            >
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search phone name, Snapdragon 8 Elite, 200MP camera, 120Hz..."
                className="w-full px-3 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              <button
                id="hero-search-submit-btn"
                type="submit"
                className="px-6 py-3 brand-bg-primary text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all hover:shadow-lg shrink-0"
              >
                Search
              </button>
            </form>

            {/* Quick Search Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Popular:</span>
              {['iPhone 16 Pro Max', 'Galaxy S25 Ultra', 'OnePlus 13', 'Pixel 9 Pro', 'Xiaomi 15 Pro'].map(term => (
                <button
                  key={term}
                  id={`example-search-${term.toLowerCase().replace(/\s+/g, '-')}`}
                  type="button"
                  onClick={() => onSearchSubmit(term)}
                  className="px-3 py-1 bg-white hover:brand-bg-light hover:brand-text-primary text-slate-700 border border-slate-200 rounded-lg transition-colors font-medium text-xs shadow-2xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              id="hero-explore-cta"
              onClick={() => navigate('/smartphones')}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>Explore All Smartphones</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-compare-cta"
              onClick={() => navigate('/compare')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 hover:border-slate-400"
            >
              <ArrowLeftRight className="w-4 h-4 brand-text-primary" />
              <span>Launch 4-Way Comparison</span>
            </button>

            <button
              id="hero-quiz-cta"
              onClick={() => navigate('/recommend')}
              className="w-full sm:w-auto px-7 py-3.5 brand-bg-light hover:opacity-90 brand-text-primary border brand-border-light font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 brand-text-primary" />
              <span>Take Phone Finder Quiz</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. POPULAR BATTLES (Head to Head Presets) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold brand-text-primary uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Curated Showdowns</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Head-to-Head Battles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pre-configured rival comparisons analyzing processors, cameras, displays, and value.
            </p>
          </div>

          <button
            onClick={() => navigate('/compare')}
            className="text-xs font-bold brand-text-primary flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-2 brand-bg-light rounded-xl border brand-border-light hover:opacity-90 transition-colors"
          >
            <span>Build Custom Battle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularBattles.map((battle, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md brand-bg-light brand-text-primary border brand-border-light">
                    {battle.tag}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">1v1 Clash</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{battle.title}</h3>
                  <p className="text-[11px] text-slate-500 font-normal">{battle.subtitle}</p>
                </div>

                {/* Faceoff images */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50/80 rounded-xl p-3 relative border border-slate-100">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-900 text-white font-extrabold text-[10px] flex items-center justify-center shadow-md border-2 border-white">
                    VS
                  </div>

                  <div className="text-center space-y-1">
                    <div className="h-20 flex items-center justify-center">
                      <img
                        src={battle.phone1.image}
                        alt={battle.phone1.name}
                        className="max-h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-[11px] font-bold text-slate-900 truncate">
                      {battle.phone1.name.replace('Apple ', '').replace('Samsung ', '')}
                    </p>
                    <span className="text-[10px] brand-text-primary font-medium block">
                      {battle.phone1.performance.processor.split('(')[0].trim()}
                    </span>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="h-20 flex items-center justify-center">
                      <img
                        src={battle.phone2.image}
                        alt={battle.phone2.name}
                        className="max-h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-[11px] font-bold text-slate-900 truncate">
                      {battle.phone2.name.replace('Apple ', '').replace('Samsung ', '')}
                    </p>
                    <span className="text-[10px] brand-text-primary font-medium block">
                      {battle.phone2.performance.processor.split('(')[0].trim()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                id={`launch-battle-btn-${idx}`}
                onClick={() => handleLaunchComparison(battle.phone1.id, battle.phone2.id)}
                className="mt-4 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 group-hover:brand-bg-primary text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Compare Specs</span>
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. POPULAR SMARTPHONES WITH FILTER PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold brand-text-primary uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 brand-text-primary" />
              <span>Smart Device Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Smartphones
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore devices by category with verified AnTuTu scores, chipsets, and optical cameras.
            </p>
          </div>

          <button
            id="view-all-smartphones-link"
            onClick={() => navigate('/smartphones')}
            className="text-xs font-bold brand-text-primary flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-2 brand-bg-light rounded-xl border brand-border-light hover:opacity-90 transition-colors"
          >
            <span>View All {allPhones.length} Phones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                id={`home-filter-tab-${cat.id}`}
                onClick={() => setSelectedFilter(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'brand-text-primary' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhones.map(phone => (
            <SmartphoneCard
              key={phone.id}
              phone={phone}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE FINDER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Smart Recommendation Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Can&apos;t decide which smartphone to buy?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Take our 60-second interactive matching quiz. Tell us your budget, preferred camera, processor, and battery priorities, and we&apos;ll calculate your #1 top match with percentage compatibility.
            </p>
            <div className="pt-2">
              <button
                id="banner-start-quiz-btn"
                onClick={() => navigate('/recommend')}
                className="px-6 py-3.5 brand-bg-primary text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <span>Find My Best Smartphone</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 w-full sm:w-auto">
            <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xs border border-white/10 space-y-1">
              <span className="font-extrabold text-white block text-base">4 Steps</span>
              <span className="text-[11px] text-slate-400">Budget, camera, battery & size</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xs border border-white/10 space-y-1">
              <span className="font-extrabold text-white block text-base">100% Impartial</span>
              <span className="text-[11px] text-slate-400">Calculated on real specs</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xs border border-white/10 space-y-1">
              <span className="font-extrabold text-white block text-base">Match Score</span>
              <span className="text-[11px] text-slate-400">60% to 99% accuracy score</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xs border border-white/10 space-y-1">
              <span className="font-extrabold text-white block text-base">1-Click Compare</span>
              <span className="text-[11px] text-slate-400">Side-by-side with alternatives</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY COMPAREX PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold brand-text-primary uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>The CompareX Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Compare Smartphones with CompareX?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Engineered for clarity, accuracy, and helping you invest your hard-earned money into the right hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl brand-bg-light brand-text-primary flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Benchmark & SoC Accuracy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We catalog raw hardware specs, actual battery endurance ratings, peak brightness measurements, and real AnTuTu v10 benchmark scores.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Impartial Automated Scoring</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our automated verdict engine evaluates spec differentials mathematically, highlighting the real best performer without sponsor bias.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl brand-bg-light brand-text-primary flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">4-Way Side-by-Side Matrix</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compare up to 4 devices simultaneously across cameras, display, battery, processor, and software update lifespans on one unified table.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
