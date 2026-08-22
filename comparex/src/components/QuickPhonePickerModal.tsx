import React, { useState, useMemo } from 'react';
import { useCompare } from '../context/CompareContext';
import { formatPrice } from '../utils/comparator';
import { X, Search, Plus, Check, Star, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickPhonePickerModal: React.FC = () => {
  const {
    allPhones,
    isQuickPickerOpen,
    closeQuickPicker,
    compareIds,
    addToCompare,
    replaceSlotIndex,
    replaceCompareSlot
  } = useCompare();

  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  const filteredPhones = useMemo(() => {
    return allPhones.filter(phone => {
      const matchesBrand = selectedBrand === 'All' || phone.brand === selectedBrand;
      const matchesQuery =
        phone.name.toLowerCase().includes(query.toLowerCase()) ||
        phone.brand.toLowerCase().includes(query.toLowerCase()) ||
        phone.performance.processor.toLowerCase().includes(query.toLowerCase());
      return matchesBrand && matchesQuery;
    });
  }, [query, selectedBrand]);

  if (!isQuickPickerOpen) return null;

  const brands = ['All', 'Apple', 'Samsung', 'OnePlus', 'Google', 'Xiaomi', 'Nothing', 'Motorola', 'Vivo', 'Realme', 'Oppo'];

  const handleSelect = (phoneId: string) => {
    if (replaceSlotIndex !== null) {
      replaceCompareSlot(replaceSlotIndex, phoneId);
    } else {
      addToCompare(phoneId);
      closeQuickPicker();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickPicker}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                {replaceSlotIndex !== null ? `Replace Slot #${replaceSlotIndex + 1}` : 'Select Smartphone to Compare'}
              </h3>
              <p className="text-xs text-slate-500">Choose a device from our verified specifications catalogue</p>
            </div>
            <button
              id="close-picker-modal"
              onClick={closeQuickPicker}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search and Brand Tabs */}
          <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="phone-picker-search-input"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search smartphone name, brand, processor..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
                autoFocus
              />
            </div>

            {/* Brand Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedBrand === brand
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Phone List */}
          <div className="p-4 overflow-y-auto max-h-[50vh] divide-y divide-slate-100">
            {filteredPhones.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No smartphones found matching &ldquo;{query}&rdquo;
              </div>
            ) : (
              filteredPhones.map(phone => {
                const isSelected = compareIds.includes(phone.id);
                return (
                  <div
                    key={phone.id}
                    className="py-3 px-2 flex items-center justify-between gap-4 hover:bg-slate-50/80 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={phone.image}
                          alt={phone.name}
                          className="h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=100&q=80';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                            {phone.brand}
                          </span>
                          <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {phone.rating}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-900 text-sm truncate">
                          {phone.name}
                        </h4>
                        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                          <span className="font-bold text-slate-800">{formatPrice(phone.price)}</span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded text-[11px]">
                            <Cpu className="w-3 h-3 text-indigo-600" />
                            {phone.performance.processor}
                          </span>
                          <span>•</span>
                          <span>{phone.performance.ram}GB / {phone.performance.storage}GB</span>
                        </div>
                      </div>
                    </div>

                    <button
                      id={`select-phone-btn-${phone.id}`}
                      onClick={() => handleSelect(phone.id)}
                      disabled={isSelected && replaceSlotIndex === null}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
                        isSelected && replaceSlotIndex === null
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      }`}
                    >
                      {isSelected && replaceSlotIndex === null ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Already In</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{replaceSlotIndex !== null ? 'Swap In' : 'Select'}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
