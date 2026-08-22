import React, { useState, useEffect } from 'react';
import { Smartphone } from '../types/smartphone';
import { apiClient } from '../api/client';
import { useCompare } from '../context/CompareContext';
import { formatPrice } from '../utils/comparator';
import { SpecificationSection } from '../components/SpecificationSection';
import { 
  Star, 
  ArrowLeftRight, 
  Check, 
  X, 
  ExternalLink, 
  ShoppingBag, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Share2
} from 'lucide-react';
import { motion } from 'motion/react';

interface SmartphoneDetailsPageProps {
  phoneId: string;
  onBack: () => void;
  onViewDetails: (id: string) => void;
  navigate: (path: string) => void;
}

export const SmartphoneDetailsPage: React.FC<SmartphoneDetailsPageProps> = ({
  phoneId,
  onBack,
  onViewDetails,
  navigate
}) => {
  const { compareIds, addToCompare, removeFromCompare, showToast } = useCompare();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);

  const [phone, setPhone] = useState<Smartphone | null>(null);
  const [similarPhones, setSimilarPhones] = useState<Smartphone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch the specific phone
        const fetchedPhone = await apiClient.getSmartphone(phoneId);
        setPhone(fetchedPhone);

        // Fetch all phones to find similar ones
        const allPhones = await apiClient.getSmartphones();
        const similar = allPhones.filter(
          (p: Smartphone) => p.id !== fetchedPhone.id && (Math.abs(p.price - fetchedPhone.price) <= 25000 || p.brand === fetchedPhone.brand)
        ).slice(0, 3);
        setSimilarPhones(similar);
      } catch (err: any) {
        setError(err.message || 'Failed to load smartphone details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [phoneId]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-20 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
        <p className="text-slate-500 font-medium text-sm">Loading phone details...</p>
      </div>
    );
  }

  if (error || !phone) {
    return (
      <div className="max-w-7xl mx-auto py-20 flex flex-col items-center justify-center space-y-4">
        <XCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-bold text-slate-900">Oops!</h2>
        <p className="text-slate-500 text-sm">{error || 'Smartphone not found'}</p>
        <button onClick={onBack} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs">
          Go Back
        </button>
      </div>
    );
  }

  const isCompared = compareIds.includes(phone.id);

  const discountPercent = Math.round(
    ((phone.originalPrice - phone.price) / phone.originalPrice) * 100
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  const handleLaunchDirectCompare = (otherId: string) => {
    if (!compareIds.includes(phone.id)) {
      addToCompare(phone.id);
    }
    if (!compareIds.includes(otherId)) {
      addToCompare(otherId);
    }
    navigate('/compare');
  };

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto">
      {/* Top Breadcrumb / Back button */}
      <div className="flex items-center justify-between">
        <button
          id="details-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Smartphones</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="share-phone-btn"
            onClick={handleShare}
            className="p-2 text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            title="Share phone link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. HERO PRODUCT OVERVIEW */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Product Image Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
          <div className="w-full h-80 sm:h-96 bg-slate-50/80 rounded-2xl p-6 border border-slate-100 flex items-center justify-center relative overflow-hidden group">
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-extrabold text-xs shadow-xs">
                {discountPercent}% OFF
              </span>
            )}

            <img
              src={phone.image}
              alt={phone.name}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80';
              }}
            />
          </div>

          {/* Color choices */}
          <div className="w-full space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Available Colors
            </span>
            <div className="flex flex-wrap gap-2">
              {phone.physical.colors.map(color => {
                const isSelected = selectedColor === color || (!selectedColor && color === phone.physical.colors[0]);
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Brand and rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                {phone.brand} Smartphones
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-lg border border-amber-200/60">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="text-xs font-extrabold text-amber-900">
                  {phone.rating.toFixed(1)}
                </span>
                <span className="text-[11px] text-slate-400">
                  ({phone.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {phone.name}
            </h1>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-950">
                {formatPrice(phone.price)}
              </span>
              {phone.originalPrice > phone.price && (
                <span className="text-base text-slate-400 line-through font-medium">
                  {formatPrice(phone.originalPrice)}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Inclusive of all taxes
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {phone.shortDescription}
            </p>

            {/* Highlights Chips */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Key Highlights
              </span>
              <div className="flex flex-wrap gap-2">
                {phone.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg"
                  >
                    <Check className="w-3.5 h-3.5 text-indigo-600" />
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Specs Quick-View Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block">Processor</span>
                <span className="text-xs font-bold text-slate-900 line-clamp-1">{phone.performance.processor}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block">Camera</span>
                <span className="text-xs font-bold text-slate-900">{phone.camera.mainCamera}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block">Battery</span>
                <span className="text-xs font-bold text-slate-900">{phone.battery.capacity} mAh ({phone.battery.chargingSpeed}W)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block">Display</span>
                <span className="text-xs font-bold text-slate-900">{phone.display.refreshRate}Hz {phone.display.type}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3.5">
            <button
              id="details-toggle-compare-btn"
              onClick={() => {
                if (isCompared) {
                  removeFromCompare(phone.id);
                } else {
                  addToCompare(phone.id);
                }
              }}
              className={`w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                isCompared
                  ? 'bg-indigo-600 text-white shadow-indigo-600/20'
                  : 'bg-slate-950 hover:bg-slate-800 text-white'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>{isCompared ? 'Added to Comparison Queue' : 'Add to Compare'}</span>
            </button>

            <button
              id="details-view-offers-btn"
              onClick={() => setIsOffersModalOpen(true)}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>Check Best Offers & Retailers</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SPECIFICATION SCORES BREAKDOWN */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              Performance Benchmark & Category Scores
            </h3>
            <p className="text-xs text-slate-500">
              Normalized out of 100 based on hardware benchmarks and verified lab tests
            </p>
          </div>
          <div className="px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-indigo-600 block">Overall Score</span>
            <span className="text-xl font-black text-indigo-900">{phone.scores.overall}/100</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: 'Performance', score: phone.scores.performance, color: 'bg-indigo-600' },
            { label: 'Camera', score: phone.scores.camera, color: 'bg-rose-500' },
            { label: 'Battery Life', score: phone.scores.battery, color: 'bg-emerald-500' },
            { label: 'Display Quality', score: phone.scores.display, color: 'bg-amber-500' },
            { label: 'Value for Money', score: phone.scores.value, color: 'bg-purple-600' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-slate-600">{item.label}</span>
                <span className="text-sm font-extrabold text-slate-900">{item.score}</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PROS & CONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="bg-emerald-50/40 rounded-3xl border border-emerald-200/80 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-lg">Reasons to Buy (Pros)</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {phone.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-rose-50/40 rounded-3xl border border-rose-200/80 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-rose-800">
            <XCircle className="w-5 h-5 text-rose-600" />
            <h3 className="font-extrabold text-lg">Reasons to Consider Alternatives (Cons)</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {phone.cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. FULL SPECIFICATIONS SECTION */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Detailed Technical Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Comprehensive breakdown of internal architecture, sensor modules, and build components.
          </p>
        </div>

        <SpecificationSection phone={phone} />
      </div>

      {/* 5. FREQUENTLY COMPARED WITH (SIMILAR ALTERNATIVES) */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Frequently Compared With
            </h2>
            <p className="text-xs text-slate-500">
              Top rivals in this price bracket
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {similarPhones.map(rival => (
            <div
              key={rival.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-slate-50 rounded-xl p-2 flex items-center justify-center shrink-0 border border-slate-100">
                  <img
                    src={rival.image}
                    alt={rival.name}
                    className="h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase">
                    {rival.brand}
                  </span>
                  <h4
                    onClick={() => onViewDetails(rival.id)}
                    className="font-bold text-slate-900 text-sm hover:text-indigo-600 cursor-pointer line-clamp-1"
                  >
                    {rival.name}
                  </h4>
                  <span className="text-xs font-extrabold text-slate-800 block">
                    {formatPrice(rival.price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id={`compare-rival-btn-${rival.id}`}
                  onClick={() => handleLaunchDirectCompare(rival.id)}
                  className="w-full py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>Compare vs {rival.brand}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RETAILER OFFERS MODAL */}
      {isOffersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsOffersModalOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-6 z-10"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Current Store Offers</h3>
                  <p className="text-xs text-slate-500">{phone.name}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOffersModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { store: 'Official Brand Store', price: phone.price, delivery: 'Free 24hr delivery + Extra 1-Yr Warranty', tag: 'Official' },
                { store: 'Amazon India', price: phone.price - 500, delivery: 'Prime delivery available', tag: 'Best Price' },
                { store: 'Flipkart Electronics', price: phone.price, delivery: 'Instant bank card discount ₹1,500', tag: 'Bank Offer' },
                { store: 'Croma Retail', price: phone.price, delivery: 'In-store pickup available today', tag: 'Store' }
              ].map((deal, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">{deal.store}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded">
                        {deal.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{deal.delivery}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-extrabold text-slate-900 text-sm block">
                      {formatPrice(deal.price)}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">In Stock</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsOffersModalOpen(false)}
              className="w-full py-3 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
