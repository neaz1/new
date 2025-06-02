import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Settings as SettingsIcon, Moon, Sun, Globe, Lock, Shield, Palette, Mail, Phone, Building2, Upload } from 'lucide-react';
import { useAtom } from 'jotai';
import { themeAtom, languageAtom } from '../components/layout/Layout';

type CompanySettings = {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxNumber: string;
  logo?: string;
};

export function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'company'>('general');
  const [theme, setTheme] = useAtom(themeAtom);
  const [language, setLanguage] = useAtom(languageAtom);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordExpiration, setPasswordExpiration] = useState('30');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [company, setCompany] = useState<CompanySettings>({
    name: 'گەیاندنی خێرا',
    email: 'info@delivery.com',
    phone: '٠٧٥٠ ١٢٣ ٤٥٦٧',
    address: 'شەقامی ١٠٠ مەتری، هەولێر',
    taxNumber: '12345678',
  });

  // Load saved settings on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    const savedTwoFactor = localStorage.getItem('twoFactorEnabled');
    const savedPasswordExp = localStorage.getItem('passwordExpiration');
    const savedCompany = localStorage.getItem('companySettings');

    if (savedTheme) setTheme(savedTheme as 'light' | 'dark' | 'system');
    if (savedLanguage) setLanguage(savedLanguage as 'ckb' | 'en' | 'ar');
    if (savedTwoFactor) setTwoFactorEnabled(savedTwoFactor === 'true');
    if (savedPasswordExp) setPasswordExpiration(savedPasswordExp);
    if (savedCompany) setCompany(JSON.parse(savedCompany));
  }, []);

  const handleCompanyChange = (key: keyof CompanySettings, value: string) => {
    setCompany(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the uploaded file
      const imageUrl = URL.createObjectURL(file);
      handleCompanyChange('logo', imageUrl);
    }
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveSettings = async () => {
    try {
      setSaveStatus('saving');

      // Save theme preference
      localStorage.setItem('theme', theme);
      
      // Save language preference
      localStorage.setItem('language', language);
      
      // Save security settings
      localStorage.setItem('twoFactorEnabled', String(twoFactorEnabled));
      localStorage.setItem('passwordExpiration', passwordExpiration);
      
      // Save company settings
      localStorage.setItem('companySettings', JSON.stringify(company));

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSaveStatus('success');

      // Reset status after 2 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } catch (error) {
      setSaveStatus('error');
      
      // Reset status after 2 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ڕێکخستنەکان</h1>
        <p className="text-gray-600 dark:text-gray-400">ڕێکخستنی سیستەم و تایبەتمەندیەکان</p>
      </div>

      {/* Settings Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'general'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('general')}
        >
          <SettingsIcon size={16} className="ml-2" />
          گشتی
        </button>

        <button
          className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'security'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('security')}
        >
          <Shield size={16} className="ml-2" />
          پاراستن
        </button>

        <button
          className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'company'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('company')}
        >
          <Building2 size={16} className="ml-2" />
          کۆمپانیا
        </button>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">ڕووکار</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Palette size={16} className="inline-block ml-2" />
                  ڕووکار
                </label>
                <div className="flex gap-4">
                  <button
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      theme === 'light'
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setTheme('light')}
                  >
                    <Sun size={16} className="mx-auto mb-2" />
                    ڕووناک
                  </button>
                  <button
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon size={16} className="mx-auto mb-2" />
                    تاریک
                  </button>
                  <button
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      theme === 'system'
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setTheme('system')}
                  >
                    <SettingsIcon size={16} className="mx-auto mb-2" />
                    سیستەم
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Globe size={16} className="inline-block ml-2" />
                  زمان
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'ckb' | 'en' | 'ar')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="ckb">کوردی</option>
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">پاراستن</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Lock size={16} className="inline-block ml-2" />
                    دووفاکتەری پشتڕاستکردنەوە
                  </label>
                  <p className="text-sm text-gray-500">پشتڕاستکردنەوەی دوو قۆناغی بۆ چوونەژوورەوە</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  بەسەرچوونی وشەی نهێنی
                </label>
                <select
                  value={passwordExpiration}
                  onChange={(e) => setPasswordExpiration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="30">٣٠ ڕۆژ</option>
                  <option value="60">٦٠ ڕۆژ</option>
                  <option value="90">٩٠ ڕۆژ</option>
                  <option value="180">١٨٠ ڕۆژ</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Settings */}
      {activeTab === 'company' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">زانیاری کۆمپانیا</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ناوی کۆمپانیا
                </label>
                <input
                  type="text"
                  value={company.name}
                  onChange={(e) => handleCompanyChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ئیمەیڵ
                </label>
                <input
                  type="email"
                  value={company.email}
                  onChange={(e) => handleCompanyChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ژمارەی تەلەفۆن
                </label>
                <input
                  type="tel"
                  value={company.phone}
                  onChange={(e) => handleCompanyChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ناونیشان
                </label>
                <textarea
                  value={company.address}
                  onChange={(e) => handleCompanyChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ژمارەی باج
                </label>
                <input
                  type="text"
                  value={company.taxNumber}
                  onChange={(e) => handleCompanyChange('taxNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  لۆگۆ
                </label>
                <div className="flex items-center">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt="Company Logo"
                      className="w-16 h-16 object-contain rounded border border-gray-200 dark:border-gray-700"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  <Button 
                    variant="outline" 
                    className="mr-4"
                    onClick={handleLogoClick}
                    leftIcon={<Upload size={16} />}
                  >
                    گۆڕینی لۆگۆ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleSaveSettings}
          isLoading={saveStatus === 'saving'}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' && 'پاشەکەوتکردن...'}
          {saveStatus === 'success' && 'پاشەکەوتکرا'}
          {saveStatus === 'error' && 'هەڵە ڕوویدا'}
          {saveStatus === 'idle' && 'پاشەکەوتکردنی گۆڕانکاریەکان'}
        </Button>
      </div>
    </div>
  );
}