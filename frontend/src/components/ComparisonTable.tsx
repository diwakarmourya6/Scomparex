import React, { useState } from 'react';
import { Smartphone } from '../types/smartphone';
import { useCompare } from '../context/CompareContext';
import { formatPrice, getBestValues } from '../utils/comparator';
import { 
  X, 
  Plus, 
  ArrowLeftRight, 
  Star, 
  Check, 
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Cpu,
  Zap
} from 'lucide-react';

interface ComparisonTableProps {
  phones: Smartphone[];
  onViewDetails: (id: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ phones, onViewDetails }) => {
  const { removeFromCompare, openQuickPicker } = useCompare();
  const [highlightDiffsOnly, setHighlightDiffsOnly] = useState(false);

  const bestValues = getBestValues(phones);

  interface TableRowSpec {
    key: string;
    label: string;
    getValue: (p: Smartphone) => string | number | React.ReactNode;
    isBest?: (p: Smartphone) => boolean;
    getRawValue?: (p: Smartphone) => string | number | boolean;
  }

  interface TableCategory {
    name: string;
    rows: TableRowSpec[];
  }

  const specCategories: TableCategory[] = [
    {
      name: 'General & Pricing',
      rows: [
        {
          key: 'price',
          label: 'Price (INR)',
          getValue: (p) => formatPrice(p.price),
          isBest: (p) => p.price === bestValues.price && phones.length > 1,
          getRawValue: (p) => p.price
        },
        {
          key: 'rating',
          label: 'User Rating',
          getValue: (p) => (
            <span className="inline-flex items-center gap-1 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {p.rating.toFixed(1)} / 5.0
            </span>
          ),
          isBest: (p) => p.rating === bestValues.rating && phones.length > 1,
          getRawValue: (p) => p.rating
        },
        {
          key: 'availability',
          label: 'Availability',
          getValue: (p) => p.availability,
          getRawValue: (p) => p.availability
        },
        {
          key: 'releaseDate',
          label: 'Release Date',
          getValue: (p) => p.releaseDate,
          getRawValue: (p) => p.releaseDate
        }
      ]
    },
    {
      name: 'Display',
      rows: [
        {
          key: 'displaySize',
          label: 'Screen Size',
          getValue: (p) => p.display.size,
          getRawValue: (p) => p.display.sizeNumber
        },
        {
          key: 'displayType',
          label: 'Display Technology',
          getValue: (p) => p.display.type,
          getRawValue: (p) => p.display.type
        },
        {
          key: 'resolution',
          label: 'Resolution',
          getValue: (p) => p.display.resolution,
          getRawValue: (p) => p.display.resolution
        },
        {
          key: 'refreshRate',
          label: 'Refresh Rate',
          getValue: (p) => `${p.display.refreshRate} Hz`,
          isBest: (p) => p.display.refreshRate === bestValues.refreshRate && phones.length > 1,
          getRawValue: (p) => p.display.refreshRate
        },
        {
          key: 'brightness',
          label: 'Peak Brightness',
          getValue: (p) => `${p.display.peakBrightness} nits`,
          isBest: (p) => p.display.peakBrightness === bestValues.peakBrightness && phones.length > 1,
          getRawValue: (p) => p.display.peakBrightness
        },
        {
          key: 'protection',
          label: 'Screen Glass',
          getValue: (p) => p.display.protection,
          getRawValue: (p) => p.display.protection
        }
      ]
    },
    {
      name: 'Performance & Hardware',
      rows: [
        {
          key: 'processor',
          label: 'Processor / SoC',
          getValue: (p) => (
            <div className="space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                {p.performance.processor}
              </span>
            </div>
          ),
          getRawValue: (p) => p.performance.processor
        },
        {
          key: 'cpu',
          label: 'CPU Cores & Architecture',
          getValue: (p) => (
            <span className="text-xs text-slate-700 font-medium leading-relaxed">
              {p.performance.cpu}
            </span>
          ),
          getRawValue: (p) => p.performance.cpu
        },
        {
          key: 'gpu',
          label: 'Graphics (GPU)',
          getValue: (p) => p.performance.gpu,
          getRawValue: (p) => p.performance.gpu
        },
        {
          key: 'antutuScore',
          label: 'AnTuTu Benchmark (v10)',
          getValue: (p) => (
            <div className="space-y-1">
              <span className="font-extrabold text-slate-900">
                ~{(p.performance.antutuScore / 1000000).toFixed(2)}M pts
              </span>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full" 
                  style={{ width: `${Math.min(100, (p.performance.antutuScore / 3000000) * 100)}%` }} 
                />
              </div>
            </div>
          ),
          isBest: (p) => p.performance.antutuScore === bestValues.antutuScore && phones.length > 1,
          getRawValue: (p) => p.performance.antutuScore
        },
        {
          key: 'perfScore',
          label: 'Performance Score',
          getValue: (p) => (
            <span className="inline-flex items-center gap-1 font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md text-xs">
              <Zap className="w-3 h-3 fill-indigo-600 text-indigo-600" />
              {p.scores.performance} / 100
            </span>
          ),
          isBest: (p) => p.scores.performance === Math.max(...phones.map(x => x.scores.performance)) && phones.length > 1,
          getRawValue: (p) => p.scores.performance
        },
        {
          key: 'ram',
          label: 'RAM Capacity',
          getValue: (p) => `${p.performance.ram} GB ${p.performance.ramType}`,
          isBest: (p) => p.performance.ram === bestValues.ram && phones.length > 1,
          getRawValue: (p) => p.performance.ram
        },
        {
          key: 'storage',
          label: 'Internal Storage',
          getValue: (p) => `${p.performance.storage} GB ${p.performance.storageType}`,
          isBest: (p) => p.performance.storage === bestValues.storage && phones.length > 1,
          getRawValue: (p) => p.performance.storage
        },
        {
          key: 'expandable',
          label: 'MicroSD Card Slot',
          getValue: (p) => (p.performance.expandableStorage ? 'Yes' : 'No'),
          getRawValue: (p) => p.performance.expandableStorage
        }
      ]
    },
    {
      name: 'Camera System',
      rows: [
        {
          key: 'mainCamera',
          label: 'Main Rear Camera',
          getValue: (p) => p.camera.mainCamera,
          isBest: (p) => p.camera.mainSensorMP === bestValues.mainCamera && phones.length > 1,
          getRawValue: (p) => p.camera.mainSensorMP
        },
        {
          key: 'ultrawide',
          label: 'Ultra-wide Lens',
          getValue: (p) => p.camera.ultrawide,
          getRawValue: (p) => p.camera.ultrawide
        },
        {
          key: 'telephoto',
          label: 'Telephoto / Zoom',
          getValue: (p) => p.camera.telephoto || 'None (Digital zoom)',
          getRawValue: (p) => Boolean(p.camera.telephoto)
        },
        {
          key: 'selfie',
          label: 'Front Selfie Camera',
          getValue: (p) => p.camera.frontCamera,
          getRawValue: (p) => p.camera.frontCameraMP
        },
        {
          key: 'ois',
          label: 'Optical Stabilization (OIS)',
          getValue: (p) => (p.camera.ois ? 'Yes' : 'No'),
          getRawValue: (p) => p.camera.ois
        },
        {
          key: 'video',
          label: 'Video Capabilities',
          getValue: (p) => p.camera.video,
          getRawValue: (p) => p.camera.video
        }
      ]
    },
    {
      name: 'Battery & Charging',
      rows: [
        {
          key: 'batteryCapacity',
          label: 'Battery Capacity',
          getValue: (p) => `${p.battery.capacity} mAh`,
          isBest: (p) => p.battery.capacity === bestValues.battery && phones.length > 1,
          getRawValue: (p) => p.battery.capacity
        },
        {
          key: 'chargingSpeed',
          label: 'Wired Fast Charging',
          getValue: (p) => `${p.battery.chargingSpeed}W`,
          isBest: (p) => p.battery.chargingSpeed === bestValues.charging && phones.length > 1,
          getRawValue: (p) => p.battery.chargingSpeed
        },
        {
          key: 'wirelessCharging',
          label: 'Wireless Charging',
          getValue: (p) =>
            p.battery.wirelessCharging
              ? `Yes (${p.battery.wirelessChargingSpeed || 15}W)`
              : 'No',
          getRawValue: (p) => p.battery.wirelessCharging
        },
        {
          key: 'batteryLifeHours',
          label: 'Est. Battery Life',
          getValue: (p) => `~${p.battery.batteryLifeHours} Hours`,
          getRawValue: (p) => p.battery.batteryLifeHours
        }
      ]
    },
    {
      name: 'Connectivity & OS',
      rows: [
        {
          key: 'fiveG',
          label: '5G Connectivity',
          getValue: (p) => (p.connectivity.fiveG ? 'Yes' : 'No'),
          getRawValue: (p) => p.connectivity.fiveG
        },
        {
          key: 'wifi',
          label: 'Wi-Fi Version',
          getValue: (p) => p.connectivity.wifi,
          getRawValue: (p) => p.connectivity.wifi
        },
        {
          key: 'nfc',
          label: 'NFC Support',
          getValue: (p) => (p.connectivity.nfc ? 'Yes' : 'No'),
          getRawValue: (p) => p.connectivity.nfc
        },
        {
          key: 'os',
          label: 'Operating System',
          getValue: (p) => p.software.osVersion,
          getRawValue: (p) => p.software.os
        },
        {
          key: 'updateSupportYears',
          label: 'Software Support',
          getValue: (p) => `${p.software.updateSupportYears} Years`,
          isBest: (p) => p.software.updateSupportYears === bestValues.updateYears && phones.length > 1,
          getRawValue: (p) => p.software.updateSupportYears
        }
      ]
    },
    {
      name: 'Design & Build',
      rows: [
        {
          key: 'weight',
          label: 'Weight',
          getValue: (p) => `${p.physical.weight} g`,
          isBest: (p) => p.physical.weight === bestValues.weight && phones.length > 1,
          getRawValue: (p) => p.physical.weight
        },
        {
          key: 'dimensions',
          label: 'Dimensions',
          getValue: (p) => p.physical.dimensions,
          getRawValue: (p) => p.physical.dimensions
        },
        {
          key: 'ipRating',
          label: 'Water / Dust Protection',
          getValue: (p) => p.physical.ipRating,
          getRawValue: (p) => p.physical.ipRating
        },
        {
          key: 'materials',
          label: 'Build Materials',
          getValue: (p) => p.physical.buildMaterials,
          getRawValue: (p) => p.physical.buildMaterials
        }
      ]
    }
  ];

  // Helper to test if all devices have the exact same value for a row
  const isRowIdentical = (row: TableRowSpec) => {
    if (phones.length <= 1) return false;
    const firstVal = row.getRawValue ? row.getRawValue(phones[0]) : row.getValue(phones[0]);
    return phones.every(p => {
      const val = row.getRawValue ? row.getRawValue(p) : row.getValue(p);
      return val === firstVal;
    });
  };

  return (
    <div className="space-y-4">
      {/* Table controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Comparing {phones.length} of 4 Smartphones
          </span>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={highlightDiffsOnly}
              onChange={e => setHighlightDiffsOnly(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
            />
            <span>Highlight differences only</span>
          </label>
        </div>
      </div>

      {/* Side-by-side Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[640px]">
          {/* Header row with devices */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="p-4 w-48 sm:w-56 sticky left-0 z-20 bg-slate-50/95 backdrop-blur-xs font-bold text-slate-700 text-xs uppercase tracking-wider border-r border-slate-200">
                Specifications
              </th>

              {phones.map((phone, idx) => (
                <th
                  key={phone.id}
                  className="p-4 align-top w-64 min-w-[220px] max-w-[280px] border-r border-slate-100 last:border-r-0"
                >
                  <div className="flex flex-col h-full justify-between space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                        {phone.brand}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          id={`swap-phone-btn-${phone.id}`}
                          onClick={() => openQuickPicker(idx)}
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors text-xs"
                          title="Swap smartphone"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`remove-table-phone-${phone.id}`}
                          onClick={() => removeFromCompare(phone.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div 
                      onClick={() => onViewDetails(phone.id)}
                      className="h-32 bg-white rounded-xl p-2 flex items-center justify-center cursor-pointer border border-slate-100 group"
                    >
                      <img
                        src={phone.image}
                        alt={phone.name}
                        className="h-full object-contain group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                    </div>

                    <div>
                      <h3
                        onClick={() => onViewDetails(phone.id)}
                        className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2"
                      >
                        {phone.name}
                      </h3>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-slate-900">
                          {formatPrice(phone.price)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 px-2 py-1 bg-indigo-50/80 border border-indigo-100 rounded-lg text-[11px] font-semibold text-indigo-900">
                        <Cpu className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate" title={phone.performance.processor}>
                          {phone.performance.processor}
                        </span>
                      </div>
                    </div>

                    <button
                      id={`table-details-btn-${phone.id}`}
                      onClick={() => onViewDetails(phone.id)}
                      className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-indigo-600 text-white transition-colors text-center"
                    >
                      View Details
                    </button>
                  </div>
                </th>
              ))}

              {/* Add slot column if < 4 */}
              {phones.length < 4 && (
                <th className="p-4 align-top w-56 border-r border-slate-100 last:border-r-0 bg-slate-50/40">
                  <div className="h-full min-h-[220px] border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl flex flex-col items-center justify-center p-4 text-center group cursor-pointer transition-colors"
                    onClick={() => openQuickPicker()}
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 flex items-center justify-center mb-2 transition-colors">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-600">
                      Add Smartphone
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      Compare up to 4 devices
                    </span>
                  </div>
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body Groups */}
          <tbody className="divide-y divide-slate-100 text-xs">
            {specCategories.map(category => {
              // If filtering by differences, check if this category has visible rows
              const visibleRows = highlightDiffsOnly
                ? category.rows.filter(r => !isRowIdentical(r))
                : category.rows;

              if (visibleRows.length === 0) return null;

              return (
                <React.Fragment key={category.name}>
                  {/* Category Header Row */}
                  <tr className="bg-slate-100/70">
                    <td
                      colSpan={phones.length + (phones.length < 4 ? 2 : 1)}
                      className="py-2.5 px-4 font-bold text-slate-800 text-xs uppercase tracking-wider bg-slate-100/90"
                    >
                      {category.name}
                    </td>
                  </tr>

                  {/* Category Spec Rows */}
                  {visibleRows.map(row => (
                    <tr key={row.key} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-500 sticky left-0 z-10 bg-white border-r border-slate-200">
                        {row.label}
                      </td>

                      {phones.map(phone => {
                        const isBestValue = row.isBest ? row.isBest(phone) : false;
                        return (
                          <td
                            key={phone.id}
                            className={`py-3 px-4 text-slate-900 border-r border-slate-100 last:border-r-0 ${
                              isBestValue ? 'bg-emerald-50/60 font-semibold' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span>{row.getValue(phone)}</span>
                              {isBestValue && (
                                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 text-emerald-800 shrink-0 flex items-center gap-0.5 shadow-2xs">
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  Best
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}

                      {phones.length < 4 && <td className="py-3 px-4 bg-slate-50/20" />}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
