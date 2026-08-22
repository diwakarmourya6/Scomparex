import React from 'react';
import { Layers, Shield, Cpu, Sparkles, Smartphone } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl brand-bg-primary flex items-center justify-center text-white font-bold text-base shadow-sm">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Compare<span className="brand-text-primary">X</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Compare Smartphones. Make Better Decisions. An impartial, data-driven hardware specification comparison engine designed for tech enthusiasts, creators, and smart buyers.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" /> 100% Unbiased Specs
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 brand-text-primary" /> Benchmark Verified
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Smart Scoring Engine
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore CompareX
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => navigate('/')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-smartphones"
                  onClick={() => navigate('/smartphones')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  All Smartphones
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-compare"
                  onClick={() => navigate('/compare')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Side-by-Side Comparison
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-recommend"
                  onClick={() => navigate('/recommend')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Find Your Perfect Phone
                </button>
              </li>
            </ul>
          </div>

          {/* Product Category Scalability roadmap */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Category Roadmap
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-indigo-400" /> Smartphones
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live
                </span>
              </li>
              <li className="flex items-center justify-between text-slate-500">
                <span>Laptops</span>
                <span className="text-[10px] uppercase font-semibold text-slate-500">Roadmap</span>
              </li>
              <li className="flex items-center justify-between text-slate-500">
                <span>Tablets & iPads</span>
                <span className="text-[10px] uppercase font-semibold text-slate-500">Roadmap</span>
              </li>
              <li className="flex items-center justify-between text-slate-500">
                <span>Smartwatches & Audio</span>
                <span className="text-[10px] uppercase font-semibold text-slate-500">Roadmap</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CompareX Technologies Inc. All product specifications and trademarks belong to their respective manufacturers.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Spec Methodology</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
