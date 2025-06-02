import React from 'react';
import { Button } from '../ui/Button';
import { X, MapPin, AlertCircle, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { Issue } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { StatusBadge } from '../ui/StatusBadge';

type IssueDetailsModalProps = {
  issue: Issue;
  onClose: () => void;
  onStatusChange: (newStatus: 'کراوەیە' | 'چارەسەرکراو' | 'داخراو') => void;
};

export function IssueDetailsModal({ issue, onClose, onStatusChange }: IssueDetailsModalProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'نزم': return 'bg-gray-100 text-gray-800';
      case 'ناوەند': return 'bg-warning-100 text-warning-800';
      case 'بەرز': return 'bg-orange-100 text-orange-800';
      case 'فریاکەوتن': return 'bg-danger-100 text-danger-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">وردەکاری کێشە</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                کۆدی کێشە: {issue.id}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {/* Status and Priority */}
            <div className="flex justify-between items-center">
              <StatusBadge status={issue.status} />
              <span className={`text-sm px-3 py-1 rounded-full ${getPriorityColor(issue.priority)}`}>
                {issue.priority}
              </span>
            </div>

            {/* Title and Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {issue.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {issue.description}
              </p>
            </div>

            {/* Related Information */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <AlertCircle size={16} className="ml-2" />
                <span className="font-medium">جۆری کێشە:</span>
                <span className="mr-2">{issue.relatedType}</span>
              </div>
              {issue.relatedId && (
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  کۆدی پەیوەندیدار: {issue.relatedId}
                </div>
              )}
            </div>

            {/* Location Information */}
            <div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <MapPin size={16} className="ml-2" />
                شوێن
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">شار</div>
                    <div className="font-medium text-gray-900 dark:text-white">{issue.city}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">ناوچە</div>
                    <div className="font-medium text-gray-900 dark:text-white">{issue.district}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">ئۆفیس</div>
                    <div className="font-medium text-gray-900 dark:text-white">{issue.office}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <Clock size={16} className="ml-2" />
                کات
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MessageSquare size={14} className="ml-2" />
                  ڕاپۆرتکراو: {formatDate(issue.createdAt)}
                </div>
                {issue.resolvedAt && (
                  <div className="flex items-center text-success-600 dark:text-success-400">
                    <CheckCircle size={14} className="ml-2" />
                    چارەسەرکراو: {formatDate(issue.resolvedAt)}
                  </div>
                )}
                {issue.closedAt && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <X size={14} className="ml-2" />
                    داخراو: {formatDate(issue.closedAt)}
                  </div>
                )}
              </div>
            
            </div>

            {/* Actions */}
            {issue.status !== 'داخراو' && (
              <div className="flex justify-end gap-2 pt-4 border-t dark:border-gray-700">
                {issue.status === 'کراوەیە' && (
                  <Button 
                    variant="success"
                    onClick={() => onStatusChange('چارەسەرکراو')}
                  >
                    چارەسەرکردن
                  </Button>
                )}
                {issue.status === 'چارەسەرکراو' && (
                  <Button 
                    variant="outline"
                    onClick={() => onStatusChange('داخراو')}
                  >
                    داخستن
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>داخستن</Button>
          </div>
        </div>
      </div>
    </div>
  );
}