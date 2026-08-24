import React, { createContext, useContext, useState, useEffect } from 'react';
import { Smartphone } from '../types/smartphone';
import { apiClient } from '../api/client';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface CompareContextType {
  allPhones: Smartphone[];
  compareIds: string[];
  comparePhones: Smartphone[];
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  isQuickPickerOpen: boolean;
  openQuickPicker: (replaceIndex?: number) => void;
  closeQuickPicker: () => void;
  replaceSlotIndex: number | null;
  replaceCompareSlot: (index: number, newId: string) => void;
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const STORAGE_KEY = 'comparex_compare_ids';

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.slice(0, 4);
        }
      }
    } catch {
      // ignore
    }
    // Default initial phones empty so user can pick from the actual seeded DB
    return [];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isQuickPickerOpen, setIsQuickPickerOpen] = useState(false);
  const [replaceSlotIndex, setReplaceSlotIndex] = useState<number | null>(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const [allPhones, setAllPhones] = useState<Smartphone[]>([]);

  useEffect(() => {
    apiClient.getSmartphones().then(setAllPhones).catch(console.error);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
    } catch {
      // ignore
    }
  }, [compareIds]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev.slice(-3), { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCompare = (id: string): boolean => {
    const phone = allPhones.find(p => p.id === id);
    const phoneName = phone ? phone.name : 'Smartphone';

    if (compareIds.includes(id)) {
      showToast(`${phoneName} is already in your comparison.`, 'info');
      return false;
    }

    if (compareIds.length >= 4) {
      showToast('Maximum 4 smartphones can be compared side-by-side.', 'warning');
      return false;
    }

    setCompareIds(prev => [...prev, id]);
    showToast(`${phoneName} added to comparison.`, 'success');
    return true;
  };

  const removeFromCompare = (id: string) => {
    const phone = allPhones.find(p => p.id === id);
    const phoneName = phone ? phone.name : 'Smartphone';
    setCompareIds(prev => prev.filter(item => item !== id));
    showToast(`${phoneName} removed from comparison.`, 'info');
  };

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      removeFromCompare(id);
    } else {
      addToCompare(id);
    }
  };

  const clearCompare = () => {
    setCompareIds([]);
    showToast('Comparison list cleared.', 'info');
  };

  const isInCompare = (id: string) => compareIds.includes(id);

  const openQuickPicker = (slotIndex?: number) => {
    setReplaceSlotIndex(slotIndex ?? null);
    setIsQuickPickerOpen(true);
  };

  const closeQuickPicker = () => {
    setIsQuickPickerOpen(false);
    setReplaceSlotIndex(null);
  };

  const replaceCompareSlot = (index: number, newId: string) => {
    if (index >= 0 && index < 4) {
      setCompareIds(prev => {
        const next = [...prev];
        next[index] = newId;
        return next;
      });
      const phone = allPhones.find(p => p.id === newId);
      showToast(`Added ${phone?.name || 'phone'} to comparison.`, 'success');
    }
    closeQuickPicker();
  };

  const [comparePhones, setComparePhones] = useState<Smartphone[]>([]);

  useEffect(() => {
    if (compareIds.length > 0) {
      apiClient.compareSmartphones(compareIds)
        .then(setComparePhones)
        .catch(console.error);
    } else {
      setComparePhones([]);
    }
  }, [compareIds]);

  return (
    <CompareContext.Provider
      value={{
        allPhones,
        compareIds,
        comparePhones,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        toggleCompare,
        toasts,
        showToast,
        removeToast,
        isQuickPickerOpen,
        openQuickPicker,
        closeQuickPicker,
        replaceSlotIndex,
        replaceCompareSlot,
        isSignInModalOpen,
        setIsSignInModalOpen
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = (): CompareContextType => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
