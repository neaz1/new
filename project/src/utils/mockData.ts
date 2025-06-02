import { 
  Delivery, 
  DeliveryStatus, 
  Driver, 
  Store,
  Issue,
  User,
  UserRole
} from '../types';

// Generate mock delivery data
export const generateMockDeliveries = (count: number): Delivery[] => {
  const statuses: DeliveryStatus[] = ['تەواوبوو', 'بەردەوامە', 'چاوەڕوانە', 'کێشەی هەیە', 'نەگیشتوە'];
  const cities = ['هەولێر', 'سلێمانی', 'دهۆک', 'کەرکوک', 'هەڵەبجە'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `del-${i + 1}`,
    trackingNumber: `TK${1000 + i}`,
    storeId: `store-${Math.floor(Math.random() * 20) + 1}`,
    customerId: `cust-${Math.floor(Math.random() * 50) + 1}`,
    driverId: Math.random() > 0.2 ? `driver-${Math.floor(Math.random() * 15) + 1}` : undefined,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    origin: `${cities[Math.floor(Math.random() * cities.length)]}, ناونیشان ${i + 1}`,
    destination: `${cities[Math.floor(Math.random() * cities.length)]}, ناونیشان ${i + 100}`,
    items: [
      {
        productId: `prod-${Math.floor(Math.random() * 100) + 1}`,
        quantity: Math.floor(Math.random() * 5) + 1,
        price: Math.floor(Math.random() * 100) + 10
      }
    ],
    totalPrice: Math.floor(Math.random() * 500) + 50,
    deliveryFee: Math.floor(Math.random() * 30) + 5,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    assignedAt: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 20) * 24 * 60 * 60 * 1000) : undefined,
    pickedUpAt: Math.random() > 0.5 ? new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000) : undefined,
    deliveredAt: Math.random() > 0.7 ? new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000) : undefined,
    notes: Math.random() > 0.7 ? 'تێبینی بۆ گەیاندنەکە' : undefined,
    recipientName: `وەرگر ${i + 1}`,
    phone1: `075${Math.floor(1000000 + Math.random() * 9000000)}`,
    phone2: Math.random() > 0.5 ? `075${Math.floor(1000000 + Math.random() * 9000000)}` : undefined,
    city: cities[Math.floor(Math.random() * cities.length)],
    district: `ناوچەی ${i + 1}`,
    neighborhood: `گەڕەکی ${i + 1}`,
    fullAddress: `ناونیشانی تەواو ${i + 1}`,
    hasBreakageRisk: Math.random() > 0.8,
    deliveryType: Math.random() > 0.7 ? 'گەڕاوە' : Math.random() > 0.5 ? 'گۆڕین' : 'فرۆشتن',
  }));
};

// Generate mock driver data
export const generateMockDrivers = (count: number): Driver[] => {
  const statuses: DriverStatus[] = ['سەرهێڵ', 'بەردەست', 'نەبەردەست'];
  const vehicleTypes = ['ماتۆڕ', 'ئۆتۆمبێل', 'ڤان'];
  const cities = ['هەولێر', 'سلێمانی', 'دهۆک'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `driver-${i + 1}`,
    name: `شۆفێر ${i + 1}`,
    phone: `075${Math.floor(1000000 + Math.random() * 9000000)}`,
    email: Math.random() > 0.5 ? `driver${i + 1}@example.com` : undefined,
    role: 'شۆفێر',
    status: statuses[Math.floor(Math.random() * statuses.length)] as DriverStatus,
    image: Math.random() > 0.5 ? `https://randomuser.me/api/portraits/men/${i % 100}.jpg` : undefined,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
    lastActive: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 24) * 60 * 60 * 1000) : undefined,
    vehicleType: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
    vehiclePlate: `${cities[Math.floor(Math.random() * cities.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(1000 + Math.random() * 9000)}`,
    currentLocation: Math.random() > 0.5 ? {
      lat: 36 + Math.random(),
      lng: 43 + Math.random()
    } : undefined,
    deliveriesCompleted: Math.floor(Math.random() * 1000),
    rating: Math.floor(Math.random() * 5) + 1
  }));
};

// Generate mock store data
export const generateMockStores = (count: number): Store[] => {
  const statuses = ['چالاک', 'ناچالاک', 'پەسەندکراو', 'ڕەتکراوە', 'هەڵپەسێردراو'];
  const cities = ['هەولێر', 'سلێمانی', 'دهۆک', 'کەرکوک', 'هەڵەبجە'];
  const districts = ['شارەوانی', 'ئازادی', 'گەڕەک 1', 'گەڕەک 2', 'ناوەندی شار'];
  
  return Array.from({ length: count }, (_, i) => {
    // Generate undelivered orders first
    const undeliveredOrders = Math.floor(Math.random() * 20);
    
    return {
      id: `store-${i + 1}`,
      name: `فرۆشگای ${i + 1}`,
      ownerName: `خاوەن ${i + 1}`,
      phone: `075${Math.floor(1000000 + Math.random() * 9000000)}`,
      address: `ئەدرس ${i + 1}`,
      city: cities[Math.floor(Math.random() * cities.length)],
      district: districts[Math.floor(Math.random() * districts.length)],
      coordinates: Math.random() > 0.7 ? {
        lat: 36 + Math.random(),
        lng: 43 + Math.random()
      } : undefined,
      status: statuses[Math.floor(Math.random() * statuses.length)] as any,
      balance: Math.floor(Math.random() * 10000),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
      verifiedAt: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 300) * 24 * 60 * 60 * 1000) : undefined,
      // Add mock data for order and payment statistics
      deliveredOrders: Math.floor(Math.random() * 100),
      undeliveredOrders,
      receivedPayments: Math.floor(Math.random() * 1000000),
      // If undelivered orders is 0, pending payments should also be 0
      pendingPayments: undeliveredOrders === 0 ? 0 : Math.floor(Math.random() * 200000),
    };
  });
};

// Generate mock issue data
export const generateMockIssues = (count: number): Issue[] => {
  const statuses = ['کراوەیە', 'چارەسەرکراو', 'داخراو'];
  const priorities = ['نزم', 'ناوەند', 'بەرز', 'فریاکەوتن'];
  const types = ['گەیاندن', 'شۆفێر', 'فرۆشگا', 'سیستەم'];
  const cities = ['هەولێر', 'سلێمانی', 'دهۆک', 'کەرکوک', 'هەڵەبجە'];
  const districts = ['شارەوانی', 'ئازادی', 'گەڕەک 1', 'گەڕەک 2', 'ناوەندی شار'];
  const offices = ['ئۆفیسی سەرەکی', 'ئۆفیسی 1', 'ئۆفیسی 2', 'ئۆفیسی 3'];
  
  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)] as 'گەیاندن' | 'شۆفێر' | 'فرۆشگا' | 'سیستەم';
    let relatedId = '';
    
    switch(type) {
      case 'گەیاندن':
        relatedId = `del-${Math.floor(Math.random() * 100) + 1}`;
        break;
      case 'شۆفێر':
        relatedId = `driver-${Math.floor(Math.random() * 15) + 1}`;
        break;
      case 'فرۆشگا':
        relatedId = `store-${Math.floor(Math.random() * 20) + 1}`;
        break;
      case 'سیستەم':
        relatedId = `system-${Math.floor(Math.random() * 5) + 1}`;
        break;
    }
    
    return {
      id: `issue-${i + 1}`,
      relatedId,
      relatedType: type,
      title: `کێشەی ${i + 1}`,
      description: `وەسفی کێشە ${i + 1} - ${Math.random().toString(36).substring(2, 15)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)] as any,
      priority: priorities[Math.floor(Math.random() * priorities.length)] as any,
      reportedBy: `user-${Math.floor(Math.random() * 10) + 1}`,
      assignedTo: Math.random() > 0.3 ? `user-${Math.floor(Math.random() * 5) + 1}` : undefined,
      city: cities[Math.floor(Math.random() * cities.length)],
      district: districts[Math.floor(Math.random() * districts.length)],
      office: offices[Math.floor(Math.random() * offices.length)],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      resolvedAt: Math.random() > 0.6 ? new Date(Date.now() - Math.floor(Math.random() * 25) * 24 * 60 * 60 * 1000) : undefined,
      closedAt: Math.random() > 0.7 ? new Date(Date.now() - Math.floor(Math.random() * 20) * 24 * 60 * 60 * 1000) : undefined,
    };
  });
};

// Generate mock users
export const generateMockUsers = (count: number): User[] => {
  const roles: UserRole[] = ['بەڕێوەبەر', 'سوپەڤایزەر', 'کارمەند', 'شۆفێر', 'فرۆشگا'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `بەکارهێنەر ${i + 1}`,
    phone: `075${Math.floor(1000000 + Math.random() * 9000000)}`,
    email: `user${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: Math.random() > 0.2 ? 'چالاک' : 'ناچالاک',
    image: Math.random() > 0.5 ? `https://randomuser.me/api/portraits/men/${i % 100}.jpg` : undefined,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
    lastActive: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 24) * 60 * 60 * 1000) : undefined,
  }));
};

// Create initial mock data
export const mockData = {
  deliveries: generateMockDeliveries(100),
  drivers: generateMockDrivers(15),
  stores: generateMockStores(20),
  issues: generateMockIssues(30),
  users: generateMockUsers(25)
};

// Helper function to get counts for dashboard
export const getDashboardCounts = () => {
  const stores = generateMockStores(50);
  
  return {
    deliveryCounts: {
      total: stores.reduce((acc, store) => acc + store.deliveredOrders + store.undeliveredOrders, 0),
      completed: stores.reduce((acc, store) => acc + store.deliveredOrders, 0),
      pending: stores.reduce((acc, store) => acc + store.undeliveredOrders, 0),
    },
    driverCounts: {
      total: 45,
      active: 32,
      inactive: 13,
    },
    storesCounts: {
      total: stores.length,
      active: stores.filter(store => store.status === 'چالاک').length,
      pending: stores.filter(store => store.status === 'هەڵپەسێردراو').length,
    },
    issuesCounts: {
      total: 24,
      resolved: 18,
      pending: 6,
    },
  };
};