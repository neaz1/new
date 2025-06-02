import React, { useState } from 'react';
import { mockData } from '../utils/mockData';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { Filter, Plus, AlertCircle, Clock, CheckCircle, MapPin, MessageSquare } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { StatusBadge } from '../components/ui/StatusBadge';
import { IssueAddModal } from '../components/issues/IssueAddModal';
import { IssueDetailsModal } from '../components/issues/IssueDetailsModal';
import { IssueFilterModal } from '../components/issues/IssueFilterModal';
import { Issue } from '../types';

type FilterOptions = {
  status: 'کراوەیە' | 'چارەسەرکراو' | 'داخراو' | '';
  priority: 'نزم' | 'ناوەند' | 'بەرز' | 'فریاکەوتن' | '';
  type: 'گەیاندن' | 'شۆفێر' | 'فرۆشگا' | 'سیستەم' | '';
  city: string;
  office: string;
  assignedTo: string;
  dateRange: {
    from: string;
    to: string;
  };
};

export function Issues() {
  const [issues, setIssues] = useState(mockData.issues);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    priority: '',
    type: '',
    city: '',
    office: '',
    assignedTo: '',
    dateRange: {
      from: '',
      to: '',
    },
  });

  const [activeTab, setActiveTab] = useState<'هەموو' | 'کراوەیە' | 'چارەسەرکراو' | 'داخراو'>('هەموو');

  // Filter issues based on all criteria
  const filteredIssues = issues.filter(issue => {
    // Tab filter
    if (activeTab !== 'هەموو' && issue.status !== activeTab) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchFields = [
        issue.title.toLowerCase(),
        issue.description.toLowerCase(),
        issue.city.toLowerCase(),
        issue.district.toLowerCase(),
        issue.office.toLowerCase(),
        issue.reportedBy.toLowerCase(),
        issue.assignedTo?.toLowerCase() || '',
      ];
      
      if (!searchFields.some(field => field.includes(query))) {
        return false;
      }
    }

    // Applied filters
    if (filters.status && issue.status !== filters.status) {
      return false;
    }
    
    if (filters.priority && issue.priority !== filters.priority) {
      return false;
    }
    
    if (filters.type && issue.relatedType !== filters.type) {
      return false;
    }
    
    if (filters.city && issue.city !== filters.city) {
      return false;
    }
    
    if (filters.office && issue.office !== filters.office) {
      return false;
    }
    
    if (filters.assignedTo && issue.assignedTo !== filters.assignedTo) {
      return false;
    }
    
    if (filters.dateRange.from) {
      const fromDate = new Date(filters.dateRange.from);
      if (issue.createdAt < fromDate) {
        return false;
      }
    }
    
    if (filters.dateRange.to) {
      const toDate = new Date(filters.dateRange.to);
      if (issue.createdAt > toDate) {
        return false;
      }
    }

    return true;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddIssue = (issueData: Partial<Issue>) => {
    const newIssue: Issue = {
      id: `issue-${issues.length + 1}`,
      createdAt: new Date(),
      status: 'کراوەیە',
      ...issueData as any
    };

    setIssues([newIssue, ...issues]);
    setShowAddModal(false);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

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
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">کێشەکان</h1>
          <p className="text-gray-600 dark:text-gray-400">بەڕێوەبردنی کێشەکان و چارەسەرکردنیان</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            leftIcon={<Filter size={16} />}
            onClick={() => setShowFilterModal(true)}
          >
            فلتەرکردن
          </Button>
          <SearchInput 
            placeholder="گەڕان بۆ ناونیشان، وەسف..."
            onSearch={handleSearch}
            className="w-full sm:w-64"
          />
          <Button 
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddModal(true)}
          >
            کێشەی نوێ
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {Object.values(filters).some(value => 
        typeof value === 'string' ? value !== '' : 
        Object.values(value).some(v => v !== '')
      ) && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">فلتەرە چالاکەکان:</span>
              {filters.status && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  دۆخ: {filters.status}
                </span>
              )}
              {filters.priority && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  گرنگی: {filters.priority}
                </span>
              )}
              {filters.type && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  جۆر: {filters.type}
                </span>
              )}
              {filters.city && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  شار: {filters.city}
                </span>
              )}
              {filters.office && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  ئۆفیس: {filters.office}
                </span>
              )}
              {(filters.dateRange.from || filters.dateRange.to) && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  بەروار: {filters.dateRange.from || '*'} - {filters.dateRange.to || '*'}
                </span>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFilters({
                status: '',
                priority: '',
                type: '',
                city: '',
                office: '',
                assignedTo: '',
                dateRange: {
                  from: '',
                  to: '',
                },
              })}
            >
              پاککردنەوەی فلتەرەکان
            </Button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex flex-wrap -mb-px">
          {(['هەموو', 'کراوەیە', 'چارەسەرکراو', 'داخراو'] as const).map((tab) => (
            <button
              key={tab}
              className={`inline-block py-3 px-4 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {tab !== 'هەموو' && (
                <span className="ms-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-800 bg-primary-100 rounded-full dark:bg-primary-900 dark:text-primary-300">
                  {filteredIssues.filter(i => i.status === tab).length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIssues.map((issue) => (
          <div 
            key={issue.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{issue.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {issue.description}
                </p>
              </div>
              <StatusBadge status={issue.status} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <AlertCircle size={14} className="ml-2" />
                  {issue.relatedType}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(issue.priority)}`}>
                  {issue.priority}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={14} className="ml-2" />
                {issue.city} - {issue.office}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock size={14} className="ml-2" />
                  {formatDate(issue.createdAt)}
                </div>
                {issue.resolvedAt && (
                  <div className="flex items-center text-success-600 dark:text-success-400">
                    <CheckCircle size={14} className="ml-2" />
                    {formatDate(issue.resolvedAt)}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t dark:border-gray-700">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  leftIcon={<MessageSquare size={14} />}
                  onClick={() => setSelectedIssue(issue)}
                >
                  بینینی وردەکاری
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showAddModal && (
        <IssueAddModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddIssue}
        />
      )}

      {showFilterModal && (
        <IssueFilterModal
          onClose={() => setShowFilterModal(false)}
          onApply={handleApplyFilters}
          currentFilters={filters}
        />
      )}

      {selectedIssue && (
        <IssueDetailsModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onStatusChange={(newStatus) => {
            setIssues(issues.map(i => 
              i.id === selectedIssue.id 
                ? { 
                    ...i, 
                    status: newStatus,
                    resolvedAt: newStatus === 'چارەسەرکراو' ? new Date() : i.resolvedAt,
                    closedAt: newStatus === 'داخراو' ? new Date() : i.closedAt
                  }
                : i
            ));
            setSelectedIssue(null);
          }}
        />
      )}
    </div>
  );
}