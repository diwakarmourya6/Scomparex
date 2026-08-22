import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiClient, API_BASE_URL } from '../api/client';
import { motion } from 'motion/react';
import { Trash2, Smartphone, LayoutGrid, Plus } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

export const AdminDashboard: React.FC = () => {
  const { isAdmin, token } = useAuth();
  const { showToast } = useCompare();
  
  const [activeTab, setActiveTab] = useState<'smartphones' | 'brands'>('smartphones');
  const [smartphones, setSmartphones] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === 'smartphones') {
          const data = await apiClient.getSmartphones();
          setSmartphones(data);
        } else {
          const data = await apiClient.getBrands();
          setBrands(data);
        }
      } catch (error) {
        showToast('Failed to load data', 'warning');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAdmin) {
      fetchData();
    }
  }, [activeTab, isAdmin]);

  const handleDeleteSmartphone = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this smartphone?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/smartphones/${slug}`, {
        method: 'DELETE',
        headers: apiClient.getHeaders(token || undefined)
      });
      
      if (!response.ok) throw new Error('Delete failed');
      
      setSmartphones(prev => prev.filter(p => p.id !== slug));
      showToast('Smartphone deleted', 'success');
    } catch (error) {
      showToast('Failed to delete smartphone', 'warning');
    }
  };

  const handleDeleteBrand = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/brands/${slug}`, {
        method: 'DELETE',
        headers: apiClient.getHeaders(token || undefined)
      });
      
      if (!response.ok) throw new Error('Delete failed');
      
      setBrands(prev => prev.filter(b => b.slug !== slug));
      showToast('Brand deleted', 'success');
    } catch (error) {
      showToast('Failed to delete brand', 'warning');
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Access Denied</h2>
          <p className="text-slate-500">You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Manage smartphones and brands</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add New {activeTab === 'smartphones' ? 'Phone' : 'Brand'}
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('smartphones')}
          className={`pb-3 flex items-center gap-2 px-2 text-sm font-semibold transition-colors ${
            activeTab === 'smartphones' 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          Smartphones
        </button>
        <button
          onClick={() => setActiveTab('brands')}
          className={`pb-3 flex items-center gap-2 px-2 text-sm font-semibold transition-colors ${
            activeTab === 'brands' 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          Brands
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading data...</div>
        ) : activeTab === 'smartphones' ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {smartphones.map(phone => (
                <tr key={phone.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{phone.name}</td>
                  <td className="px-6 py-4 text-slate-600">{phone.brand}</td>
                  <td className="px-6 py-4 text-slate-600">${phone.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeleteSmartphone(phone.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Brand Name</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Phones</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {brands.map(brand => (
                <tr key={brand.slug} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{brand.name}</td>
                  <td className="px-6 py-4 text-slate-600">{brand.country}</td>
                  <td className="px-6 py-4 text-slate-600">{brand.count}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeleteBrand(brand.slug)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
