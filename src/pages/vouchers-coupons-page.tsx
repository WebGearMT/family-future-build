import React, { useState, useEffect } from 'react';
import { Tag, Clock, Percent, Gift, Star, Search, Filter, AlertCircle, RefreshCw } from 'lucide-react';
//import AppHeader from "@/components/ui/app-header";
import EmptySearchComponent from "@/components/ui/empty-search-component";
//import { useAuth } from "@/contexts/AuthContext";
import NoVouchersAvailableComponent from "@/components/ui/no-vouchers-available-component";


// Types
interface Voucher {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  expiryDate: string;
  category: string;
  brand: string;
  terms: string;
  isPopular?: boolean;
  minSpend?: string;
  type: 'percentage' | 'fixed' | 'freeShipping' | 'bogo';
}

interface ApiResponse {
  success: boolean;
  data: Voucher[];
  message?: string;
  total?: number;
}

interface FetchState {
  loading: boolean;
  error: string | null;
  lastFetch: Date | null;
}

// Fallback data (same as previous vouchersData for offline/error scenarios)
const fallbackVouchersData: Voucher[] = [
  {
    "id": "1",
    "title": "50% Off Electronics",
    "description": "Get 50% discount on all electronic items including smartphones, laptops, and accessories.",
    "discount": "50%",
    "code": "TECH50",
    "expiryDate": "2025-08-15",
    "category": "Electronics",
    "brand": "TechStore",
    "terms": "Valid on orders above $100. Cannot be combined with other offers.",
    "isPopular": true,
    "minSpend": "$100",
    "type": "percentage"
  },
  {
    "id": "2",
    "title": "Free Shipping",
    "description": "Enjoy free shipping on all orders, no minimum purchase required.",
    "discount": "FREE",
    "code": "FREESHIP",
    "expiryDate": "2025-09-30",
    "category": "Shipping",
    "brand": "All Stores",
    "terms": "Valid for all products. Excludes express delivery.",
    "type": "freeShipping"
  },
  {
    "id": "3",
    "title": "$25 Off Fashion",
    "description": "Save $25 on your favorite fashion items from top brands.",
    "discount": "$25",
    "code": "FASHION25",
    "expiryDate": "2025-08-30",
    "category": "Fashion",
    "brand": "StyleHub",
    "terms": "Minimum spend $75. Valid on regular priced items only.",
    "minSpend": "$75",
    "type": "fixed"
  },
  {
    "id": "4",
    "title": "Buy 1 Get 1 Free",
    "description": "Buy any book and get another one absolutely free.",
    "discount": "BOGO",
    "code": "BOOKBOGO",
    "expiryDate": "2025-08-20",
    "category": "Books",
    "brand": "BookWorld",
    "terms": "Free book must be of equal or lesser value.",
    "isPopular": true,
    "type": "bogo"
  },
  {
    "id": "5",
    "title": "30% Off Home & Garden",
    "description": "Transform your space with 30% off on home and garden essentials.",
    "discount": "30%",
    "code": "HOME30",
    "expiryDate": "2025-09-15",
    "category": "Home & Garden",
    "brand": "HomeStore",
    "terms": "Valid on selected items. Excludes furniture.",
    "minSpend": "$50",
    "type": "percentage"
  },
  {
    "id": "6",
    "title": "$10 Off Groceries",
    "description": "Save $10 on your weekly grocery shopping.",
    "discount": "$10",
    "code": "GROCERY10",
    "expiryDate": "2025-08-10",
    "category": "Groceries",
    "brand": "FreshMart",
    "terms": "Minimum spend $60. Valid once per customer.",
    "minSpend": "$60",
    "type": "fixed"
  }
];

// DiscountCard Component
const DiscountCard: React.FC<{ voucher: Voucher; onCopy: (code: string) => void }> = ({ voucher, onCopy }) => {
  const getDiscountIcon = () => {
    switch (voucher.type) {
      case 'percentage':
        return <Percent className="w-5 h-5" />;
      case 'fixed':
        return <Tag className="w-5 h-5" />;
      case 'freeShipping':
        return <Gift className="w-5 h-5" />;
      case 'bogo':
        return <Gift className="w-5 h-5" />;
      default:
        return <Tag className="w-5 h-5" />;
    }
  };

  const getDiscountColor = () => {
    switch (voucher.type) {
      case 'percentage':
        return 'bg-red-500';
      case 'fixed':
        return 'bg-green-500';
      case 'freeShipping':
        return 'bg-blue-500';
      case 'bogo':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const daysUntilExpiry = Math.ceil((new Date(voucher.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 aspect-[2/1] flex">
      {/* Left Section - Discount Display */}
      <div className={`${getDiscountColor()} text-white p-4 flex flex-col justify-center items-center min-w-[120px] relative`}>
        {voucher.isPopular && (
          <div className="absolute top-2 right-2">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
          </div>
        )}
        <div className="text-center">
          {getDiscountIcon()}
          <div className="text-2xl font-bold mt-1">{voucher.discount}</div>
          <div className="text-xs opacity-90">OFF</div>
        </div>
      </div>

      {/* Right Section - Details */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{voucher.title}</h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
              {voucher.category}
            </span>
          </div>
          
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{voucher.description}</p>
          
          <div className="text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3" />
              <span>Expires: {new Date(voucher.expiryDate).toLocaleDateString()}</span>
              {daysUntilExpiry <= 7 && (
                <span className="text-red-500 font-medium">({daysUntilExpiry} days left)</span>
              )}
            </div>
            {voucher.minSpend && (
              <div className="text-xs text-gray-500">Min spend: {voucher.minSpend}</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 mr-2">
            <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-center">
              <span className="text-xs font-mono font-semibold text-gray-700">{voucher.code}</span>
            </div>
          </div>
          <button
            onClick={() => onCopy(voucher.code)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded transition-colors duration-200 whitespace-nowrap"
          >
            Copy Code
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const VouchersAndCouponsPage: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>({
    loading: true,
    error: null,
    lastFetch: null
  });
  
  //const { user, isAuthenticated, signOut } = useAuth();

  // Fetch vouchers from database
  const fetchVouchers = async (showLoading = true) => {
    try {
      if (showLoading) {
        setFetchState(prev => ({ ...prev, loading: true, error: null }));
      }

      const response = await fetch('../../server/api.php?table=vouchersCoupons', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
        // Add credentials if your PHP backend uses sessions
        credentials: 'include',
      });

      if (!response.ok) {
        // Handle specific HTTP status codes from PHP
        let errorMessage = `HTTP error! status: ${response.status}`;
        if (response.status === 404) {
          errorMessage = 'API endpoint not found. Check your PHP file path.';
        } else if (response.status === 500) {
          errorMessage = 'Server error. Check your PHP backend logs.';
        }
        throw new Error(errorMessage);
      }

      const responseText = await response.text();
      
      // Handle cases where PHP returns non-JSON (like HTML error pages)
      let apiResponse: ApiResponse;
      try {
        apiResponse = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Invalid JSON response:', responseText);
        throw new Error('Server returned invalid JSON. Check your PHP backend.');
      }
      
      if (apiResponse.success && apiResponse.data) {
        setVouchers(apiResponse.data);
        setFetchState({
          loading: false,
          error: null,
          lastFetch: new Date()
        });
      } else {
        throw new Error(apiResponse.message || 'Failed to fetch vouchers');
      }
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      setFetchState({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load vouchers',
        lastFetch: null
      });
      
      // Fallback to sample data in case of error (optional)
      if (vouchers.length === 0) {
        setVouchers(fallbackVouchersData);
      }
    }
  };

  // Fetch vouchers on component mount
  useEffect(() => {
    fetchVouchers();
  }, []);


  // Retry fetching vouchers
  const handleRetry = () => {
    fetchVouchers(true);
  };

  const categories = ['All', ...Array.from(new Set(vouchers.map(v => v.category)))];

  const filteredVouchers = vouchers.filter(voucher => {
    const matchesSearch = voucher.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voucher.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voucher.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || voucher.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };



  // Error Component
  const ErrorComponent = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Vouchers</h3>
      <p className="text-gray-500 mb-4 text-center">{fetchState.error}</p>
      <button
        onClick={handleRetry}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
      
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Vouchers & Coupons</h1>
           
          </div>
          <p className="text-gray-600">Save money with our exclusive deals and discounts</p>
          {fetchState.lastFetch && (
            <p className="text-xs text-gray-400 mt-1">
              Last updated: {fetchState.lastFetch.toLocaleTimeString()}
            </p>
          )}
        </div>
        
        {/* Show error state */}
        {fetchState.error && vouchers.length === 0 && <ErrorComponent />}
        
        {/* Show content when vouchers are available */}
        {vouchers.length > 0 && (
          <>
            {/* Search and Filter */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search vouchers..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Success Message */}
            {copiedCode && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center">
                Code "{copiedCode}" copied to clipboard!
              </div>
            )}

            {/* Error banner for failed refresh */}
            {fetchState.error && vouchers.length > 0 && (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-700 text-center">
                Unable to refresh vouchers: {fetchState.error}
              </div>
            )}

            {/* Vouchers Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredVouchers.length > 0 ? (
                filteredVouchers.map(voucher => (
                  <DiscountCard
                    key={voucher.id}
                    voucher={voucher}
                    onCopy={handleCopyCode}
                  />
                ))
              ) : (
                <EmptySearchComponent />
              )}
            </div>

            {/* Stats */}
            <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{vouchers.length}</div>
                  <div className="text-sm text-gray-600">Total Vouchers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{vouchers.filter(v => v.isPopular).length}</div>
                  <div className="text-sm text-gray-600">Popular Deals</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Show no vouchers available state when API returns empty data */}
        {!fetchState.loading && !fetchState.error && vouchers.length === 0 && (
          <NoVouchersAvailableComponent />
        )}
      </div>
    </div>
  );
};

export default VouchersAndCouponsPage;
