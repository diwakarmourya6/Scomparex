import React, { useState, useMemo, useEffect } from 'react';
import { Smartphone, FilterState, SortOption, Brand, PriceRange } from '../types/smartphone';
import { apiClient } from '../api/client';
import { SmartphoneCard } from '../components/SmartphoneCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { FilterDrawer } from '../components/FilterDrawer';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  X, 
  RotateCcw,
  Sparkles,
  Smartphone as PhoneIcon
} from 'lucide-react';

interface SmartphonesPageProps {
  onViewDetails: (id: string) => void;
  initialSearchQuery?: string;
  initialBrand?: Brand;
}

const initialFilters: FilterState = {
  searchQuery: '',
  priceRange: [],
  brands: [],
  ram: [],
  storage: [],
  refreshRates: [],
  batteryMin: null,
  cameraMinMP: null,
  fiveGOnly: false,
  minRating: null
};

export const SmartphonesPage: React.FC<SmartphonesPageProps> = ({
  onViewDetails,
  initialSearchQuery = '',
  initialBrand
}) => {
  const [filters, setFilters] = useState<FilterState>({
    ...initialFilters,
    searchQuery: initialSearchQuery,
    brands: initialBrand ? [initialBrand] : []
  });

  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const [smartphones, setSmartphones] = useState<Smartphone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSmartphones = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.getSmartphones();
        setSmartphones(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load smartphones');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSmartphones();
  }, []);

  const checkPriceMatch = (price: number, ranges: PriceRange[]): boolean => {
    if (ranges.length === 0) return true;
    return ranges.some(range => {
      switch (range) {
        case 'under-15000':
          return price < 15000;
        case '15000-25000':
          return price >= 15000 && price <= 25000;
        case '25000-40000':
          return price >= 25000 && price <= 40000;
        case '40000-60000':
          return price >= 40000 && price <= 60000;
        case 'above-60000':
          return price > 60000;
        default:
          return true;
      }
    });
  };

  const filteredSmartphones = useMemo(() => {
    return smartphones.filter(phone => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = phone.name.toLowerCase().includes(q);
        const matchesBrand = phone.brand.toLowerCase().includes(q);
        const matchesProcessor = phone.performance.processor.toLowerCase().includes(q);
        const matchesCamera = phone.camera.mainCamera.toLowerCase().includes(q);
        const matchesFeatures = phone.highlights.some(h => h.toLowerCase().includes(q));

        if (!matchesName && !matchesBrand && !matchesProcessor && !matchesCamera && !matchesFeatures) {
          return false;
        }
      }

      // 2. Price Range
      if (!checkPriceMatch(phone.price, filters.priceRange)) {
        return false;
      }

      // 3. Brands
      if (filters.brands.length > 0 && !filters.brands.includes(phone.brand)) {
        return false;
      }

      // 4. RAM
      if (filters.ram.length > 0 && !filters.ram.includes(phone.performance.ram)) {
        return false;
      }

      // 5. Storage
      if (filters.storage.length > 0 && !filters.storage.includes(phone.performance.storage)) {
        return false;
      }

      // 6. Refresh Rate
      if (filters.refreshRates.length > 0 && !filters.refreshRates.includes(phone.display.refreshRate)) {
        return false;
      }

      // 7. Battery Min
      if (filters.batteryMin !== null) {
        if (filters.batteryMin === 6000 && phone.battery.capacity < 6000) return false;
        if (filters.batteryMin === 5000 && (phone.battery.capacity < 5000 || phone.battery.capacity >= 6000)) return false;
        if (filters.batteryMin === 4000 && (phone.battery.capacity < 4000 || phone.battery.capacity >= 5000)) return false;
      }

      // 8. Camera Min MP
      if (filters.cameraMinMP !== null && phone.camera.mainSensorMP < filters.cameraMinMP) {
        return false;
      }

      // 9. 5G only
      if (filters.fiveGOnly && !phone.connectivity.fiveG) {
        return false;
      }

      // 10. Rating
      if (filters.minRating !== null && phone.rating < filters.minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'newest':
          return b.scores.overall - a.scores.overall;
        case 'popular':
          return b.reviewCount - a.reviewCount;
        case 'relevance':
        default:
          return b.scores.overall - a.scores.overall;
      }
    });
  }, [filters, sortOption]);

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const removeFilterChip = (type: keyof FilterState, val?: any) => {
    if (type === 'searchQuery') {
      setFilters(prev => ({ ...prev, searchQuery: '' }));
    } else if (type === 'brands' && val) {
      setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== val) }));
    } else if (type === 'priceRange' && val) {
      setFilters(prev => ({ ...prev, priceRange: prev.priceRange.filter(r => r !== val) }));
    } else if (type === 'ram' && val) {
      setFilters(prev => ({ ...prev, ram: prev.ram.filter(r => r !== val) }));
    } else if (type === 'storage' && val) {
      setFilters(prev => ({ ...prev, storage: prev.storage.filter(s => s !== val) }));
    } else if (type === 'refreshRates' && val) {
      setFilters(prev => ({ ...prev, refreshRates: prev.refreshRates.filter(r => r !== val) }));
    } else if (type === 'batteryMin') {
      setFilters(prev => ({ ...prev, batteryMin: null }));
    } else if (type === 'cameraMinMP') {
      setFilters(prev => ({ ...prev, cameraMinMP: null }));
    } else if (type === 'fiveGOnly') {
      setFilters(prev => ({ ...prev, fiveGOnly: false }));
    } else if (type === 'minRating') {
      setFilters(prev => ({ ...prev, minRating: null }));
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Smartphones
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
          Find the best smartphone based on your budget and requirements with side-by-side spec filters.
        </p>
      </div>

      {/* Main Container with Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar (1 Col) */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            totalResults={filteredSmartphones.length}
          />
        </aside>

        {/* Mobile Filter Drawer */}
        <FilterDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          totalResults={filteredSmartphones.length}
        />

        {/* Content Area (3 Cols) */}
        <main className="lg:col-span-3 space-y-5">
          {/* Top Search & Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="smartphones-search-input"
                  type="text"
                  value={filters.searchQuery}
                  onChange={e => setFilters({ ...filters, searchQuery: e.target.value })}
                  placeholder="Search by model, brand, processor, camera..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
                />
                {filters.searchQuery && (
                  <button
                    onClick={() => setFilters({ ...filters, searchQuery: '' })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Mobile Filter Button + Sort selector */}
              <div className="flex items-center gap-2">
                <button
                  id="open-mobile-filter-btn"
                  onClick={() => setIsMobileDrawerOpen(true)}
                  className="lg:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                {/* Sort dropdown */}
                <div className="relative flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline text-slate-500 font-normal">Sort:</span>
                  <select
                    id="sort-select-dropdown"
                    value={sortOption}
                    onChange={e => setSortOption(e.target.value as SortOption)}
                    className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Highest Overall Score</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filter Chips bar */}
            {(filters.searchQuery ||
              filters.brands.length > 0 ||
              filters.priceRange.length > 0 ||
              filters.ram.length > 0 ||
              filters.storage.length > 0 ||
              filters.refreshRates.length > 0 ||
              filters.batteryMin !== null ||
              filters.cameraMinMP !== null ||
              filters.fiveGOnly ||
              filters.minRating !== null) && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400 font-medium mr-1">Active:</span>

                {filters.searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                    &ldquo;{filters.searchQuery}&rdquo;
                    <button onClick={() => removeFilterChip('searchQuery')} className="hover:text-indigo-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.brands.map(b => (
                  <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                    {b}
                    <button onClick={() => removeFilterChip('brands', b)} className="hover:text-indigo-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {filters.priceRange.map(r => (
                  <span key={r} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                    {r.replace('-', ' to ₹')}
                    <button onClick={() => removeFilterChip('priceRange', r)} className="hover:text-indigo-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {filters.ram.map(ram => (
                  <span key={ram} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                    {ram}GB RAM
                    <button onClick={() => removeFilterChip('ram', ram)} className="hover:text-indigo-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {filters.refreshRates.map(hz => (
                  <span key={hz} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                    {hz}Hz
                    <button onClick={() => removeFilterChip('refreshRates', hz)} className="hover:text-indigo-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {filters.batteryMin && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                    {filters.batteryMin}+ mAh
                    <button onClick={() => removeFilterChip('batteryMin')} className="hover:text-indigo-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.cameraMinMP && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                    {filters.cameraMinMP}MP+ Camera
                    <button onClick={() => removeFilterChip('cameraMinMP')} className="hover:text-indigo-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.fiveGOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                    5G Only
                    <button onClick={() => removeFilterChip('fiveGOnly')} className="hover:text-indigo-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.minRating && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                    {filters.minRating}★ & above
                    <button onClick={() => removeFilterChip('minRating')} className="hover:text-indigo-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Results Count Summary */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 px-1">
            <span>
              Showing <strong className="text-slate-900">{filteredSmartphones.length}</strong> smartphones
            </span>
          </div>

          {/* Product Cards Grid */}
          {isLoading ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
              <h3 className="text-lg font-bold text-slate-900">Loading smartphones...</h3>
            </div>
          ) : error ? (
            <div className="bg-white rounded-3xl border border-red-200 p-12 text-center space-y-4">
              <h3 className="text-lg font-bold text-red-600">Error</h3>
              <p className="text-sm text-slate-500">{error}</p>
            </div>
          ) : filteredSmartphones.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <PhoneIcon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No smartphones found matching your filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your budget, clearing specific brand filters, or broadening your camera MP criteria.
              </p>
              <button
                id="empty-reset-filters-btn"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSmartphones.map(phone => (
                <SmartphoneCard
                  key={phone.id}
                  phone={phone}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
