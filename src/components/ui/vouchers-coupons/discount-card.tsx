import React, { useState, useEffect } from 'react';
import { Tag, Clock, Percent, Gift, Star, Search, Filter, AlertCircle, RefreshCw } from 'lucide-react';



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

export default DiscountCard;
