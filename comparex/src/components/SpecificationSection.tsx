import React, { useState } from 'react';
import { Smartphone } from '../types/smartphone';
import { 
  Tv, 
  Cpu, 
  Camera, 
  BatteryCharging, 
  Wifi, 
  Layers, 
  ShieldCheck, 
  ChevronDown, 
  Check, 
  X as XIcon,
  Sparkles
} from 'lucide-react';

interface SpecificationSectionProps {
  phone: Smartphone;
}

export const SpecificationSection: React.FC<SpecificationSectionProps> = ({ phone }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Specifications', icon: Layers },
    { id: 'display', label: 'Display', icon: Tv },
    { id: 'performance', label: 'Performance', icon: Cpu },
    { id: 'camera', label: 'Camera', icon: Camera },
    { id: 'battery', label: 'Battery', icon: BatteryCharging },
    { id: 'connectivity', label: 'Connectivity', icon: Wifi },
    { id: 'software', label: 'Software & OS', icon: Sparkles },
    { id: 'physical', label: 'Physical & Build', icon: ShieldCheck }
  ];

  const SpecRow: React.FC<{ label: string; value: string | React.ReactNode; sub?: string }> = ({ label, value, sub }) => (
    <div className="py-3 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 hover:bg-slate-50/60 transition-colors border-b border-slate-100 last:border-b-0 text-sm">
      <span className="font-medium text-slate-500">{label}</span>
      <div className="sm:col-span-2 text-slate-900 font-semibold">
        {value}
        {sub && <span className="block text-xs font-normal text-slate-500 mt-0.5">{sub}</span>}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Category Tab Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              id={`spec-tab-${cat.id}`}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {/* 1. DISPLAY */}
        {(activeTab === 'all' || activeTab === 'display') && (
          <div id="spec-group-display" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-200/80 flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-700">
                <Tv className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Display Specifications</h3>
            </div>
            <div className="divide-y divide-slate-100">
              <SpecRow label="Screen Size" value={phone.display.size} />
              <SpecRow label="Display Type" value={phone.display.type} />
              <SpecRow label="Resolution" value={phone.display.resolution} />
              <SpecRow label="Refresh Rate" value={`${phone.display.refreshRate} Hz`} sub="Adaptive dynamic refresh rate" />
              <SpecRow label="Peak Brightness" value={`${phone.display.peakBrightness} nits`} sub="Direct sunlight outdoor clarity" />
              <SpecRow label="Screen Protection" value={phone.display.protection} />
              {phone.display.hdrSupport && (
                <SpecRow label="HDR Standards" value={phone.display.hdrSupport} />
              )}
            </div>
          </div>
        )}

        {/* 2. PERFORMANCE */}
        {(activeTab === 'all' || activeTab === 'performance') && (
          <div id="spec-group-performance" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-200/80 flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-700">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Processor & Performance</h3>
            </div>
            <div className="divide-y divide-slate-100">
              <SpecRow label="Chipset" value={phone.performance.processor} />
              <SpecRow label="CPU Architecture" value={phone.performance.cpu} />
              <SpecRow label="Graphics (GPU)" value={phone.performance.gpu} />
              <SpecRow label="RAM Capacity" value={`${phone.performance.ram} GB ${phone.performance.ramType}`} />
              <SpecRow label="Storage Capacity" value={`${phone.performance.storage} GB ${phone.performance.storageType}`} />
              <SpecRow 
                label="Expandable Storage" 
                value={phone.performance.expandableStorage ? 'Yes, via dedicated/hybrid microSD card' : 'No'} 
              />
              <SpecRow 
                label="AnTuTu Benchmark (v10)" 
                value={`~${(phone.performance.antutuScore / 1000000).toFixed(2)} Million Points`}
                sub="Synthetic score indicating high sustained gaming & computational capability"
              />
            </div>
          </div>
        )}

        {/* 3. CAMERA */}
        {(activeTab === 'all' || activeTab === 'camera') && (
          <div id="spec-group-camera" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-200/80 flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-700">
                <Camera className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Camera System</h3>
            </div>
            <div className="divide-y divide-slate-100">
              <SpecRow label="Primary Rear Camera" value={phone.camera.mainCamera} />
              <SpecRow label="Ultra-wide Camera" value={phone.camera.ultrawide} />
              <SpecRow 
                label="Telephoto / Zoom" 
                value={phone.camera.telephoto || 'Not Available (Digital Zoom)'} 
              />
              <SpecRow label="Front Selfie Camera" value={phone.camera.frontCamera} />
              <SpecRow label="Optical Stabilization (OIS)" value={phone.camera.ois ? 'Yes (Hardware OIS)' : 'No'} />
              <SpecRow label="Video Recording" value={phone.camera.video} />
              <SpecRow 
                label="Camera Features" 
                value={
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {phone.camera.features.map((feat, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md">
                        {feat}
                      </span>
                    ))}
                  </div>
                } 
              />
            </div>
          </div>
        )}

        {/* 4. BATTERY */}
        {(activeTab === 'all' || activeTab === 'battery') && (
          <div id="spec-group-battery" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-200/80 flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-700">
                <BatteryCharging className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Battery & Charging</h3>
            </div>
            <div className="divide-y divide-slate-100">
              <SpecRow label="Battery Capacity" value={`${phone.battery.capacity} mAh`} />
              <SpecRow label="Wired Charging Speed" value={`${phone.battery.chargingSpeed}W Fast Charging`} />
              <SpecRow 
                label="Wireless Charging" 
                value={phone.battery.wirelessCharging ? `Yes (${phone.battery.wirelessChargingSpeed || 15}W)` : 'No'} 
              />
              <SpecRow 
                label="Reverse Wireless Charging" 
                value={phone.battery.reverseCharging ? 'Yes (Powers earbuds & smartwatches)' : 'No'} 
              />
              <SpecRow 
                label="Estimated Battery Life" 
                value={`~${phone.battery.batteryLifeHours} Hours continuous active use`} 
              />
            </div>
          </div>
        )}

        {/* 5. CONNECTIVITY */}
        {(activeTab === 'all' || activeTab === 'connectivity') && (
          <div id="spec-group-connectivity" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-200/80 flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-700">
                <Wifi className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Connectivity & Network</h3>
            </div>
            <div className="divide-y divide-slate-100">
              <SpecRow label="5G Capability" value={phone.connectivity.fiveG ? 'Yes (Multiple Sub-6GHz bands)' : 'No'} />
              <SpecRow label="Wi-Fi Standard" value={phone.connectivity.wifi} />
              <SpecRow label="Bluetooth" value={phone.connectivity.bluetooth} />
              <SpecRow label="NFC Support" value={phone.connectivity.nfc ? 'Yes (Contactless payments)' : 'No'} />
              <SpecRow label="USB Port" value={phone.connectivity.usb} />
              <SpecRow label="SIM Configuration" value={phone.connectivity.sim} />
            </div>
          </div>
        )}

        {/* 6. SOFTWARE */}
        {(activeTab === 'all' || activeTab === 'software') && (
          <div id="spec-group-software" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-200/80 flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Software & Updates</h3>
            </div>
            <div className="divide-y divide-slate-100">
              <SpecRow label="Operating System" value={phone.software.os} />
              <SpecRow label="Current OS Version" value={phone.software.osVersion} />
              <SpecRow 
                label="Guaranteed OS & Security Updates" 
                value={`${phone.software.updateSupportYears} Years`} 
                sub="Peace of mind long term software support"
              />
            </div>
          </div>
        )}

        {/* 7. PHYSICAL */}
        {(activeTab === 'all' || activeTab === 'physical') && (
          <div id="spec-group-physical" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-200/80 flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Physical & Build Quality</h3>
            </div>
            <div className="divide-y divide-slate-100">
              <SpecRow label="Weight" value={`${phone.physical.weight} grams`} />
              <SpecRow label="Dimensions" value={phone.physical.dimensions} />
              <SpecRow label="Water / Dust Ingress Protection" value={phone.physical.ipRating} />
              <SpecRow label="Materials" value={phone.physical.buildMaterials} />
              <SpecRow 
                label="Available Colorways" 
                value={
                  <div className="flex flex-wrap gap-2 mt-1">
                    {phone.physical.colors.map(color => (
                      <span key={color} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-800 text-xs rounded-lg font-medium">
                        {color}
                      </span>
                    ))}
                  </div>
                } 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
