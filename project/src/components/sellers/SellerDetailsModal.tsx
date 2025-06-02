import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { X, MapPin, Phone, Mail, Package, Calendar, Wallet, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Store } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { StatusBadge } from '../ui/StatusBadge';

type SellerDetailsModalProps = {
  seller: Store;
  onClose: () => void;
  onApprove?: (notes: string) => void;
  onReject?: (reason: string) => void;
};

export function SellerDetailsModal({ seller, onClose, onApprove, onReject }: SellerDetailsModalProps) {
  const [verificationNotes, setVerificationNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">وردەکاری فرۆشیار</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                کۆدی فرۆشیار: {seller.id}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          {/* Show verification banner for pending sellers */}
          {seller.status === 'هەڵپەسێردراو' && (
            <div className="mt-4 bg-warning-50 border border-warning-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="text-warning-500 w-5 h-5 ml-2" />
                  <div>
                    <p className="text-warning-700 font-medium">چاوەڕوانی پەسەندکردن</p>
                    <p className="text-warning-600 text-sm">تکایە زانیاریەکانی فرۆشیار بپشکنە پێش پەسەندکردن</p>
                  </div>
                </div>
              </div>

              {/* Verification Form */}
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    تێبینی پشکنین
                  </label>
                  <textarea
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                    placeholder="تێبینیەکانت بنووسە سەبارەت بە پشکنینی زانیاریەکان..."
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onApprove?.(verificationNotes)}
                    leftIcon={<CheckCircle size={16} />}
                    className="flex-1 bg-success-500 hover:bg-success-600 text-white"
                  >
                    پەسەندکردن
                  </Button>
                  <Button
                    onClick={() => setShowRejectForm(true)}
                    variant="danger"
                    className="flex-1"
                  >
                    ڕەتکردنەوە
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Rejection Form */}
          {showRejectForm && (
            <div className="mt-4 bg-danger-50 border border-danger-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-danger-800 mb-2">ڕەتکردنەوەی داواکاری</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    هۆکاری ڕەتکردنەوە
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-danger-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                    placeholder="هۆکاری ڕەتکردنەوەی داواکاری بنووسە..."
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onReject?.(rejectionReason)}
                    variant="danger"
                    className="flex-1"
                  >
                    ڕەتکردنەوە
                  </Button>
                  <Button
                    onClick={() => setShowRejectForm(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    هەڵوەشاندنەوە
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Verification Status */}
          {seller.verifiedAt && (
            <div className="mt-4 bg-success-50 border border-success-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="text-success-500 w-5 h-5 ml-2" />
                <div>
                  <p className="text-success-700 font-medium">پەسەندکراوە</p>
                  <p className="text-success-600 text-sm">
                    لە {formatDate(seller.verifiedAt)} پەسەندکراوە
                    {seller.verifiedBy && ` لەلایەن ${seller.verifiedBy}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">زانیاری سەرەکی</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="font-medium ml-2">ناو:</span>
                    {seller.name}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Phone size={16} className="ml-2" />
                    {seller.phone}
                  </div>
                  {seller.email && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Mail size={16} className="ml-2" />
                      {seller.email}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="ml-2" />
                    {seller.city}, {seller.district}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="font-medium ml-2">ناونیشان:</span>
                    {seller.address}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar size={16} className="ml-2" />
                    {formatDate(seller.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Documents */}
            {seller.documents && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">بەڵگەنامەکان</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {seller.documents.businessLicense && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FileText size={16} className="ml-2 text-primary-500" />
                        <span className="text-sm font-medium">مۆڵەتی کار</span>
                      </div>
                      <a 
                        href={seller.documents.businessLicense}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        بینینی بەڵگەنامە
                      </a>
                    </div>
                  )}

                  {seller.documents.taxRegistration && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FileText size={16} className="ml-2 text-primary-500" />
                        <span className="text-sm font-medium">تۆماری باج</span>
                      </div>
                      <a 
                        href={seller.documents.taxRegistration}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        بینینی بەڵگەنامە
                      </a>
                    </div>
                  )}

                  {seller.documents.ownerIdCard && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FileText size={16} className="ml-2 text-primary-500" />
                        <span className="text-sm font-medium">ناسنامەی خاوەن</span>
                      </div>
                      <a 
                        href={seller.documents.ownerIdCard}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        بینینی بەڵگەنامە
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Order Statistics */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">ئاماری ئۆردەرەکان</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center text-success-600 dark:text-success-400 mb-2">
                    <CheckCircle size={16} className="ml-2" />
                    گەیشتوو
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {seller.deliveredOrders}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center text-danger-600 dark:text-danger-400 mb-2">
                    <Package size={16} className="ml-2" />
                    نەگەیشتوو
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {seller.undeliveredOrders}
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">زانیاری دارایی</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center text-success-600 dark:text-success-400 mb-2">
                    <Wallet size={16} className="ml-2" />
                    پارەی وەرگیراو
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {seller.receivedPayments.toLocaleString()} د.ع
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center text-warning-600 dark:text-warning-400 mb-2">
                    <Wallet size={16} className="ml-2" />
                    پارەی ماوە
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {seller.pendingPayments.toLocaleString()} د.ع
                  </div>
                </div>
              </div>
            </div>

            {/* Current Balance */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">باڵانسی ئێستا</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {seller.balance.toLocaleString()} د.ع
                  </div>
                </div>
                <StatusBadge status={seller.status} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>داخستن</Button>
          </div>
        </div>
      </div>
    </div>
  );
}