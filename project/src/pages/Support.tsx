import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Globe, Facebook, Instagram, Youtube, ChevronDown, ChevronUp, Plus, Settings, Image, Link } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { contactInfo, faqs, socialMedia, addFaq, updateContactInfo } from '../config/support';

export function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    imageUrl: '',
    link: ''
  });

  const [newFaq, setNewFaq] = useState({
    question: '',
    answer: ''
  });

  const [contactSettings, setContactSettings] = useState({
    phones: [...contactInfo.phones],
    email: contactInfo.email,
    website: contactInfo.website,
    address: {
      street: contactInfo.address.street,
      city: contactInfo.address.city,
      region: contactInfo.address.region,
    },
    hours: contactInfo.hours
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', contactForm);
    setContactForm({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
      imageUrl: '',
      link: ''
    });
  };

  const handleFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFaq(newFaq.question, newFaq.answer);
    setNewFaq({ question: '', answer: '' });
    setShowFaqModal(false);
  };

  const handleContactSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(contactSettings);
    setShowContactModal(false);
  };

  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case 'facebook':
        return Facebook;
      case 'instagram':
        return Instagram;
      case 'youtube':
        return Youtube;
      default:
        return Facebook;
    }
  };

  const activeMediaLinks = socialMedia.filter(media => media.isActive);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">پشتگیری کڕیاران</h1>
          <Button
            variant="outline"
            onClick={() => setShowContactModal(true)}
            leftIcon={<Settings size={16} />}
          >
            ڕێکخستنی زانیاری پەیوەندی
          </Button>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          ئێمە ئامادەین بۆ وەڵامدانەوەی هەر پرسیارێک و یارمەتیدانت
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <Globe className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">ناونیشان</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">{contactInfo.address.street}</p>
          <p className="text-gray-600 dark:text-gray-400">{contactInfo.address.city}</p>
          <p className="text-gray-600 dark:text-gray-400">{contactInfo.address.region}</p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{contactInfo.hours}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <Mail className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">ئیمەیڵ</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">{contactInfo.email}</p>
          <p className="text-gray-600 dark:text-gray-400">{contactInfo.website}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <Phone className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">پەیوەندی</h3>
          {contactInfo.phones.map((phone, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-400 mb-2">{phone}</p>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-2xl font-bold mb-6">پەیوەندیمان پێوە بکە</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ناو
              </label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ژمارەی مۆبایل
              </label>
              <input
                type="tel"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ئیمەیڵ
            </label>
            <input
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              بابەت
            </label>
            <input
              type="text"
              value={contactForm.subject}
              onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              نامە
            </label>
            <textarea
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Image size={16} className="inline-block ml-1" />
              بەستەری وێنە
            </label>
            <input
              type="url"
              value={contactForm.imageUrl}
              onChange={(e) => setContactForm({ ...contactForm, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Link size={16} className="inline-block ml-1" />
              لینک
            </label>
            <input
              type="url"
              value={contactForm.link}
              onChange={(e) => setContactForm({ ...contactForm, link: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              ناردن
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">پرسیارە باوەکان</h2>
          <Button 
            onClick={() => setShowFaqModal(true)}
            leftIcon={<Plus size={16} />}
          >
            زیادکردنی پرسیار
          </Button>
        </div>
        
        <div className="space-y-4">
          {faqs.filter(faq => faq.isActive !== false).map((faq, index) => (
            <div key={faq.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <button
                className="flex justify-between items-center w-full text-right"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openFaq === index && (
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {activeMediaLinks.length > 0 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">سۆشیال میدیا</h2>
          <div className="flex justify-center space-x-6 rtl:space-x-reverse">
            {activeMediaLinks.map((social) => {
              const Icon = getSocialIcon(social.icon);
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <Icon className="w-8 h-8" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {showFaqModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                زیادکردنی پرسیاری نوێ
              </h2>

              <form onSubmit={handleFaqSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    پرسیار
                  </label>
                  <input
                    type="text"
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    وەڵام
                  </label>
                  <textarea
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowFaqModal(false)}
                  >
                    هەڵوەشاندنەوە
                  </Button>
                  <Button type="submit">
                    زیادکردن
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                ڕێکخستنی زانیاری پەیوەندی
              </h2>

              <form onSubmit={handleContactSettingsSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ژمارەکانی تەلەفۆن
                  </label>
                  {contactSettings.phones.map((phone, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          const newPhones = [...contactSettings.phones];
                          newPhones[index] = e.target.value;
                          setContactSettings({ ...contactSettings, phones: newPhones });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => {
                          const newPhones = contactSettings.phones.filter((_, i) => i !== index);
                          setContactSettings({ ...contactSettings, phones: newPhones });
                        }}
                      >
                        سڕینەوە
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setContactSettings({
                        ...contactSettings,
                        phones: [...contactSettings.phones, '']
                      });
                    }}
                  >
                    زیادکردنی ژمارە
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ئیمەیڵ
                    </label>
                    <input
                      type="email"
                      value={contactSettings.email}
                      onChange={(e) => setContactSettings({ ...contactSettings, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      وێبسایت
                    </label>
                    <input
                      type="url"
                      value={contactSettings.website}
                      onChange={(e) => setContactSettings({ ...contactSettings, website: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ناونیشان
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={contactSettings.address.street}
                      onChange={(e) => setContactSettings({
                        ...contactSettings,
                        address: { ...contactSettings.address, street: e.target.value }
                      })}
                      placeholder="شەقام"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <input
                      type="text"
                      value={contactSettings.address.city}
                      onChange={(e) => setContactSettings({
                        ...contactSettings,
                        address: { ...contactSettings.address, city: e.target.value }
                      })}
                      placeholder="شار"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <input
                      type="text"
                      value={contactSettings.address.region}
                      onChange={(e) => setContactSettings({
                        ...contactSettings,
                        address: { ...contactSettings.address, region: e.target.value }
                      })}
                      placeholder="هەرێم"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    کاتەکانی کارکردن
                  </label>
                  <input
                    type="text"
                    value={contactSettings.hours}
                    onChange={(e) => setContactSettings({ ...contactSettings, hours: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowContactModal(false)}
                  >
                    هەڵوەشاندنەوە
                  </Button>
                  <Button type="submit">
                    پاشەکەوتکردن
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}