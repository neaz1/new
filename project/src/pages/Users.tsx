import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { Filter, Plus, User, Mail, Phone, Calendar, Shield, CheckCircle, XCircle, Edit, Trash2, MoreVertical } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { UserRole } from '../types';

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: 'چالاک' | 'ناچالاک';
  permissions: string[];
  createdAt: Date;
  lastActive?: Date;
  image?: string;
};

// Mock data for users
const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `بەکارهێنەر ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `075${Math.floor(1000000 + Math.random() * 9000000)}`,
  role: ['بەڕێوەبەر', 'سوپەڤایزەر', 'کارمەند', 'شۆفێر', 'فرۆشگا', 'کاشێر'][Math.floor(Math.random() * 6)] as UserRole,
  status: Math.random() > 0.2 ? 'چالاک' : 'ناچالاک',
  permissions: [
    'بینینی داشبۆرد',
    'بەڕێوەبردنی بەکارهێنەران',
    'بەڕێوەبردنی گەیاندنەکان',
    'بەڕێوەبردنی شۆفێرەکان',
  ].slice(0, Math.floor(Math.random() * 4) + 1),
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
  lastActive: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 24) * 60 * 60 * 1000) : undefined,
  image: Math.random() > 0.5 ? `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${i + 1}.jpg` : undefined,
}));

export function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete' | 'permissions' | null>(null);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    dateRange: {
      from: '',
      to: '',
    },
  });

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchFields = [
        user.name.toLowerCase(),
        user.email.toLowerCase(),
        user.phone.toLowerCase(),
        user.role.toLowerCase(),
      ];
      
      if (!searchFields.some(field => field.includes(query))) {
        return false;
      }
    }

    if (filters.role && user.role !== filters.role) {
      return false;
    }

    if (filters.status && user.status !== filters.status) {
      return false;
    }

    if (filters.dateRange.from) {
      const fromDate = new Date(filters.dateRange.from);
      if (user.createdAt < fromDate) {
        return false;
      }
    }

    if (filters.dateRange.to) {
      const toDate = new Date(filters.dateRange.to);
      if (user.createdAt > toDate) {
        return false;
      }
    }

    return true;
  });

  const handleAddUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: `user-${users.length + 1}`,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'کارمەند',
      status: 'چالاک',
      permissions: userData.permissions || [],
      createdAt: new Date(),
      ...userData,
    };

    setUsers([newUser, ...users]);
    setShowAddModal(false);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setSelectedUser(null);
    setModalType(null);
  };

  const handleDeleteUser = (user: User) => {
    setUsers(users.filter(u => u.id !== user.id));
    setSelectedUser(null);
    setModalType(null);
  };

  const handleUpdatePermissions = (user: User, permissions: string[]) => {
    setUsers(users.map(u => 
      u.id === user.id 
        ? { ...u, permissions }
        : u
    ));
    setSelectedUser(null);
    setModalType(null);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">بەکارهێنەران</h1>
          <p className="text-gray-600 dark:text-gray-400">بەڕێوەبردنی بەکارهێنەران و دەسەڵاتەکانیان</p>
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
            placeholder="گەڕان بۆ ناو، ئیمەیڵ..."
            onSearch={(query) => setSearchQuery(query)}
            className="w-full sm:w-64"
          />
          <Button 
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddModal(true)}
          >
            بەکارهێنەری نوێ
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
              {filters.role && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  ڕۆڵ: {filters.role}
                </span>
              )}
              {filters.status && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  دۆخ: {filters.status}
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
                role: '',
                status: '',
                dateRange: { from: '', to: '' },
              })}
            >
              پاککردنەوەی فلتەرەکان
            </Button>
          </div>
        </div>
      )}

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div 
            key={user.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-start gap-4">
              {user.image ? (
                <img 
                  src={user.image} 
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'چالاک'
                      ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {user.status}
                  </span>
                </div>

                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Mail size={14} className="ml-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Phone size={14} className="ml-2" />
                    {user.phone}
                  </div>
                </div>

                {user.permissions.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">دەسەڵاتەکان:</div>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.map((permission, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(user.createdAt)}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setModalType('edit');
                        }}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setModalType('permissions');
                        }}
                      >
                        <Shield size={14} />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setModalType('delete');
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                فلتەرکردنی بەکارهێنەران
              </h2>

              <form className="space-y-4">
                {/* Role Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ڕۆڵ
                  </label>
                  <select
                    value={filters.role}
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">هەموو</option>
                    <option value="بەڕێوەبەر">بەڕێوەبەر</option>
                    <option value="سوپەڤایزەر">سوپەڤایزەر</option>
                    <option value="کارمەند">کارمەند</option>
                    <option value="شۆفێر">شۆفێر</option>
                    <option value="فرۆشگا">فرۆشگا</option>
                    <option value="کاشێر">کاشێر</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    دۆخ
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">هەموو</option>
                    <option value="چالاک">چالاک</option>
                    <option value="ناچالاک">ناچالاک</option>
                  </select>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      لە بەرواری
                    </label>
                    <input
                      type="date"
                      value={filters.dateRange.from}
                      onChange={(e) => setFilters({
                        ...filters,
                        dateRange: { ...filters.dateRange, from: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      بۆ بەرواری
                    </label>
                    <input
                      type="date"
                      value={filters.dateRange.to}
                      onChange={(e) => setFilters({
                        ...filters,
                        dateRange: { ...filters.dateRange, to: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilterModal(false)}
                  >
                    هەڵوەشاندنەوە
                  </Button>
                  <Button
                    onClick={() => setShowFilterModal(false)}
                  >
                    جێبەجێکردن
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit User Modal */}
      {(showAddModal || (selectedUser && modalType === 'edit')) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedUser ? 'دەستکاری بەکارهێنەر' : 'زیادکردنی بەکارهێنەری نوێ'}
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ناو
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedUser?.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ئیمەیڵ
                  </label>
                  <input
                    type="email"
                    defaultValue={selectedUser?.email}
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
                    defaultValue={selectedUser?.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ڕۆڵ
                  </label>
                  <select
                    defaultValue={selectedUser?.role}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="بەڕێوەبەر">بەڕێوەبەر</option>
                    <option value="سوپەڤایزەر">سوپەڤایزەر</option>
                    <option value="کارمەند">کارمەند</option>
                    <option value="شۆفێر">شۆفێر</option>
                    <option value="فرۆشگا">فرۆشگا</option>
                    <option value="کاشێر">کاشێر</option>
                  </select>
                </div>

                {selectedUser && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      دۆخ
                    </label>
                    <select
                      defaultValue={selectedUser.status}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    >
                      <option value="چالاک">چالاک</option>
                      <option value="ناچالاک">ناچالاک</option>
                    </select>
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedUser(null);
                      setModalType(null);
                    }}
                  >
                    هەڵوەشاندنەوە
                  </Button>
                  <Button type="submit">
                    {selectedUser ? 'پاشەکەوتکردن' : 'زیادکردن'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {selectedUser && modalType === 'delete' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              دڵنیای لە سڕینەوەی ئەم بەکارهێنەرە؟
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ئەم کردارە ناگەڕێتەوە و هەموو داتاکانی ئەم بەکارهێنەرە دەسڕێتەوە.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedUser(null);
                  setModalType(null);
                }}
              >
                هەڵوەشاندنەوە
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteUser(selectedUser)}
              >
                سڕینەوە
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {selectedUser && modalType === 'permissions' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                دەسەڵاتەکانی {selectedUser.name}
              </h2>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="dashboard"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked={selectedUser.permissions.includes('بینینی داشبۆرد')}
                  />
                  <label htmlFor="dashboard" className="mr-2 block text-sm text-gray-700 dark:text-gray-300">
                    بینینی داشبۆرد
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="users"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked={selectedUser.permissions.includes('بەڕێوەبردنی بەکارهێنەران')}
                  />
                  <label htmlFor="users" className="mr-2 block text-sm text-gray-700 dark:text-gray-300">
                    بەڕێوەبردنی بەکارهێنەران
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="deliveries"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked={selectedUser.permissions.includes('بەڕێوەبردنی گەیاندنەکان')}
                  />
                  <label htmlFor="deliveries" className="mr-2 block text-sm text-gray-700 dark:text-gray-300">
                    بەڕێوەبردنی گەیاندنەکان
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="drivers"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked={selectedUser.permissions.includes('بەڕێوەبردنی شۆفێرەکان')}
                  />
                  <label htmlFor="drivers" className="mr-2 block text-sm text-gray-700 dark:text-gray-300">
                    بەڕێوەبردنی شۆفێرەکان
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedUser(null);
                    setModalType(null);
                  }}
                >
                  هەڵوەشاندنەوە
                </Button>
                <Button
                  onClick={() => {
                    const permissions = [
                      'بینینی داشبۆرد',
                      'بەڕێوەبردنی بەکارهێنەران',
                      'بەڕێوەبردنی گەیاندنەکان',
                      'بەڕێوەبردنی شۆفێرەکان'
                    ].filter((_, i) => (document.getElementById(['dashboard', 'users', 'deliveries', 'drivers'][i]) as HTMLInputElement).checked);
                    
                    handleUpdatePermissions(selectedUser, permissions);
                  }}
                >
                  پاشەکەوتکردن
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}