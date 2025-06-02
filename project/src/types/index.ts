// Full updated Store interface with KYC fields
export interface Store {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  status: 'چالاک' | 'ناچالاک' | 'پەسەندکراو' | 'ڕەتکراوە' | 'هەڵپەسێردراو';
  balance: number;
  createdAt: Date;
  verifiedAt?: Date;
  verifiedBy?: string;
  verificationNotes?: string;
  products?: Product[];
  // Add order and payment statistics
  deliveredOrders: number;
  undeliveredOrders: number;
  receivedPayments: number;
  pendingPayments: number;
  // Add verification documents
  documents?: {
    businessLicense?: string;
    taxRegistration?: string;
    ownerIdCard?: string;
  };
}