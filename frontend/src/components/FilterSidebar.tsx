import React from 'react';
import { FilterState, Brand, PriceRange } from '../types/smartphone';
import { RotateCcw, Check, Sparkles, Star } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults
}) => {
  const brands: Brand[] = ['Apple', 'Samsung', 'OnePlus', 'Google', 'Xiaomi', 'Nothing', 'Motorola', 'Realme', 'Vivo', 'Oppo'];
  const priceRanges: { id: PriceRange; label: string }[] = [
    { id: 'under-15000', label: 'Under ₹15,000' },
    { id: '15000-25000', label: '₹15,000–₹25,000' },
    { id: '25000-40000', label: '₹25,000–₹40,000' },
    { id: '40000-60000', label: '₹40,000–₹60,000' },
    { id: 'above-60000', label: 'Above ₹60,000' }
  ];
  const ramOptions = [4, 6, 8, 12, 16];
  const storageOptions = [64, 128, 256, 512];
  const refreshRateOptions = [60, 90, 120, 144];
  const batteryRanges = [
    { min: 4000, label: '4000–5000 mAh' },
    { min: 5000, label: '5000–6000 mAh' },
    { min: 6000, label: '6000+ mAh' }
  ];
  const cameraOptions = [
    { min: 50, label: '50 MP & above' },
    { min: 100, label: '100 MP & above' },
    { min: 200, label: '200 MP+' }
  ];

  const toggleBrand = (brand: Brand) => {
    const updated = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: updated });
  };

  const togglePriceRange = (range: PriceRange) => {
    const updated = filters.priceRange.includes(range)
      ? filters.priceRange.filter(r => r !== range)
      : [...filters.priceRange, range];
    onFilterChange({ ...filters, priceRange: updated });
  };

  const toggleRam = (ram: number) => {
    const updated = filters.ram.includes(ram)
      ? filters.ram.filter(r => r !== ram)
      : [...filters.ram, ram];
    onFilterChange({ ...filters, ram: updated });
  };

  const toggleStorage = (storage: number) => {
    const updated = filters.storage.includes(storage)
      ? filters.storage.filter(s => s !== storage)
      : [...filters.storage, storage];
    onFilterChange({ ...filters, storage: updated });
  };

  const toggleRefreshRate = (hz: number) => {
    const updated = filters.refreshRates.includes(hz)
      ? filters.refreshRates.filter(r => r !== hz)
      : [...filters.refreshRates, hz];
    onFilterChange({ ...filters, refreshRates: updated });
  };

  const activeFiltersCount = 
    filters.priceRange.length +
    filters.brands.length +
    filters.ram.length +
    filters.storage.length +
    filters.refreshRates.length +
    (filters.batteryMin ? 1 : 0) +
    (filters.cameraMinMP ? 1 : 0) +
    (filters.fiveGOnly ? 1 : 0) +
    (filters.minRating ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            Filters
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-600 text-white">
                {activeFiltersCount}
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-500">{totalResults} smartphones match</p>
        </div>

        {activeFiltersCount > 0 && (
          <button
            id="reset-filters-btn"
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All
          </button>
        )}
      </div>

      {/* 1. Price Range */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Price
        </h4>
        <div className="space-y-1.5">
          {priceRanges.map(range => {
            const checked = filters.priceRange.includes(range.id);
            return (
              <label
                key={range.id}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none py-0.5"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => togglePriceRange(range.id)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span>{range.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Brand */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Brand
        </h4>
        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
          {brands.map(brand => {
            const checked = filters.brands.includes(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => toggleBrand(brand)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors text-left ${
                  checked
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                    : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{brand}</span>
                {checked && <Check className="w-3 h-3 text-indigo-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. RAM */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          RAM
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {ramOptions.map(ram => {
            const checked = filters.ram.includes(ram);
            return (
              <button
                key={ram}
                type="button"
                onClick={() => toggleRam(ram)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  checked
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {ram} GB
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Storage */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Storage
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {storageOptions.map(storage => {
            const checked = filters.storage.includes(storage);
            return (
              <button
                key={storage}
                type="button"
                onClick={() => toggleStorage(storage)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  checked
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {storage >= 1024 ? '1 TB' : `${storage} GB`}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Display Refresh Rate */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Refresh Rate
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {refreshRateOptions.map(hz => {
            const checked = filters.refreshRates.includes(hz);
            return (
              <button
                key={hz}
                type="button"
                onClick={() => toggleRefreshRate(hz)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors text-center ${
                  checked
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {hz} Hz
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Battery Capacity */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Battery
        </h4>
        <div className="space-y-1.5 text-xs">
          {batteryRanges.map(b => {
            const checked = filters.batteryMin === b.min;
            return (
              <label
                key={b.min}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="battery"
                  checked={checked}
                  onChange={() =>
                    onFilterChange({
                      ...filters,
                      batteryMin: checked ? null : b.min
                    })
                  }
                  onClick={() => {
                    if (checked) {
                      onFilterChange({ ...filters, batteryMin: null });
                    }
                  }}
                  className="text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span>{b.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 7. Camera */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Main Camera
        </h4>
        <div className="space-y-1.5 text-xs">
          {cameraOptions.map(c => {
            const checked = filters.cameraMinMP === c.min;
            return (
              <label
                key={c.min}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="camera"
                  checked={checked}
                  onChange={() =>
                    onFilterChange({
                      ...filters,
                      cameraMinMP: checked ? null : c.min
                    })
                  }
                  onClick={() => {
                    if (checked) {
                      onFilterChange({ ...filters, cameraMinMP: null });
                    }
                  }}
                  className="text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span>{c.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 8. 5G Only Toggle */}
      <div className="pt-4 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer select-none">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            5G Support
          </span>
          <input
            type="checkbox"
            checked={filters.fiveGOnly}
            onChange={e => onFilterChange({ ...filters, fiveGOnly: e.target.checked })}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
          />
        </label>
      </div>

      {/* 9. Minimum Rating */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Customer Rating
        </h4>
        <div className="flex gap-2">
          {[4, 4.5].map(rating => {
            const checked = filters.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    minRating: checked ? null : rating
                  })
                }
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border flex items-center justify-center gap-1 transition-colors ${
                  checked
                    ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{rating}★ & up</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
