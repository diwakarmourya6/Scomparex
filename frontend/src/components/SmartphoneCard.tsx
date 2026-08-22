import React from 'react';
import { Smartphone } from '../types/smartphone';
import { useCompare } from '../context/CompareContext';
import { formatPrice } from '../utils/comparator';
import { Star, Check, Plus, Cpu, HardDrive, Camera, Battery, ArrowRight } from 'lucide-react';

interface SmartphoneCardProps {
  phone: Smartphone;
  onViewDetails: (id: string) => void;
  compact?: boolean;
}

export const SmartphoneCard: React.FC<SmartphoneCardProps> = ({ phone, onViewDetails, compact = false }) => {
  const { isInCompare, toggleCompare } = useCompare();
  const inCompare = isInCompare(phone.id);

  return (
    <div
      id={`phone-card-${phone.id}`}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-lg bg-slate-900/80 backdrop-blur-md text-white shadow-xs">
          {phone.brand}
        </span>
        {phone.scores.overall >= 95 && (
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-500/90 backdrop-blur-md text-white shadow-xs">
            Top Tier
          </span>
        )}
      </div>

      <div>
        {/* Product Image Area */}
        <div 
          onClick={() => onViewDetails(phone.id)}
          className="relative h-52 sm:h-56 bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 flex items-center justify-center cursor-pointer overflow-hidden"
        >
          <img
            src={phone.image}
            alt={phone.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full max-w-[85%] object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback image if unsplash load is interrupted
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 rounded-md border border-amber-200/60 text-xs font-bold text-amber-900">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{phone.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal text-[11px]">({phone.reviewCount})</span>
            </div>
            <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
              {phone.availability}
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onViewDetails(phone.id)}
            className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-indigo-600 transition-colors cursor-pointer"
            title={phone.name}
          >
            {phone.name}
          </h3>

          {/* Price */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              {formatPrice(phone.price)}
            </span>
            {phone.originalPrice > phone.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(phone.originalPrice)}
              </span>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            {/* Processor highlight pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 brand-bg-light border brand-border-light rounded-lg text-slate-900 font-semibold" title={`Processor: ${phone.performance.processor}`}>
              <Cpu className="w-3.5 h-3.5 brand-text-primary shrink-0" />
              <span className="truncate text-[11px]">{phone.performance.processor}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg" title="RAM & Storage">
                <span className="truncate font-medium">{phone.performance.ram}GB / {phone.performance.storage}GB</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg" title="Main Camera">
                <Camera className="w-3.5 h-3.5 brand-text-primary shrink-0" />
                <span className="truncate font-medium">{phone.camera.mainSensorMP} MP OIS</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg" title="Battery & Charging">
                <Battery className="w-3.5 h-3.5 brand-text-primary shrink-0" />
                <span className="truncate font-medium">{phone.battery.capacity} mAh ({phone.battery.chargingSpeed}W)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg" title="Display">
                <HardDrive className="w-3.5 h-3.5 brand-text-primary shrink-0" />
                <span className="truncate font-medium">{phone.display.refreshRate}Hz {phone.display.size}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          id={`compare-btn-${phone.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(phone.id);
          }}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
            inCompare
              ? 'brand-bg-primary text-white shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:brand-border-light hover:brand-bg-light hover:brand-text-primary'
          }`}
        >
          {inCompare ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>In Compare</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Compare</span>
            </>
          )}
        </button>

        <button
          id={`view-details-btn-${phone.id}`}
          onClick={() => onViewDetails(phone.id)}
          className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 text-white hover:brand-bg-primary transition-colors shadow-xs"
        >
          <span>View Specs</span>
          <ArrowRight className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
