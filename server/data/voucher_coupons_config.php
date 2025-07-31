<?php
// Handle CORS
header("Access-Control-Allow-Origin: https://app.gottabenc.com, http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// api/pages/vouchers-config.php
function getVouchersPageConfig() {
    return [
        'rootClass' => 'min-h-screen bg-gray-50 py-6 px-4',
        'containerClass' => 'max-w-7xl mx-auto',
        'header' => [
            'title' => 'Vouchers & Coupons',
            'subtitle' => 'Save money with our exclusive deals and discounts',
            'titleClass' => 'text-3xl font-bold text-gray-900',
            'subtitleClass' => 'text-gray-600',
            'lastUpdatedPrefix' => 'Last updated: ',
            'lastUpdatedClass' => 'text-xs text-gray-400 mt-1',
            'containerClass' => 'text-center mb-8',
            'titleContainerClass' => 'flex items-center justify-center gap-2 mb-2'
        ],
        'filter' => [
            'containerClass' => 'mb-6 flex flex-col sm:flex-row gap-4',
            'searchContainerClass' => 'relative flex-1',
            'searchIconClass' => 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5',
            'searchPlaceholder' => 'Search vouchers...',
            'searchInputClass' => 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'selectContainerClass' => 'relative',
            'filterIconClass' => 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5',
            'selectClass' => 'pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]'
        ],
        'card' => [
            'rootClass' => 'bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 aspect-[2/1] flex',
            'discountLabel' => 'OFF',
            'discountLabelClass' => 'text-xs opacity-90',
            'discountValueClass' => 'text-2xl font-bold mt-1',
            'popularIconClass' => 'absolute top-2 right-2',
            'popularIconSize' => 'w-4 h-4 fill-yellow-300 text-yellow-300',
            'detailsClass' => 'flex-1 p-4 flex flex-col justify-between',
            'titleContainerClass' => 'flex justify-between items-start mb-2',
            'titleClass' => 'font-semibold text-gray-900 text-sm leading-tight',
            'categoryClass' => 'text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2 whitespace-nowrap',
            'descriptionClass' => 'text-xs text-gray-600 mb-2 line-clamp-2',
            'metaClass' => 'text-xs text-gray-500 mb-2',
            'expiryContainerClass' => 'flex items-center gap-1 mb-1',
            'expiryIconSize' => 'w-3 h-3',
            'expiryLabel' => 'Expires:',
            'expiryWarningClass' => 'text-red-500 font-medium',
            'daysLeftLabel' => 'days left',
            'minSpendLabel' => 'Min spend:',
            'minSpendClass' => 'text-xs text-gray-500',
            'codeContainerClass' => 'flex items-center justify-between',
            'codeWrapperClass' => 'flex-1 mr-2',
            'codeDisplayClass' => 'bg-gray-50 border border-gray-200 rounded px-2 py-1 text-center',
            'codeTextClass' => 'text-xs font-mono font-semibold text-gray-700',
            'copyButtonText' => 'Copy Code',
            'copyButtonClass' => 'bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded transition-colors duration-200 whitespace-nowrap'
        ],
        'grid' => [
            'containerClass' => 'grid grid-cols-1 xl:grid-cols-2 gap-6'
        ],
        'messages' => [
            'copiedClass' => 'mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center',
            'copiedTemplate' => 'Code "{code}" copied to clipboard!',
            'errorClass' => 'mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-700 text-center',
            'errorTemplate' => 'Unable to refresh vouchers: {error}'
        ],
        'stats' => [
            'containerClass' => 'mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6',
            'gridClass' => 'grid grid-cols-1 md:grid-cols-3 gap-4 text-center',
            'valueClass' => 'text-2xl font-bold',
            'labelClass' => 'text-sm text-gray-600',
            'totalLabel' => 'Total Vouchers',
            'categoriesLabel' => 'Categories',
            'popularLabel' => 'Popular Deals'
        ],
        'error' => [
            'containerClass' => 'flex flex-col items-center justify-center py-12',
            'iconClass' => 'w-16 h-16 text-red-400 mb-4',
            'title' => 'Failed to Load Vouchers',
            'titleClass' => 'text-lg font-medium text-gray-900 mb-2',
            'descriptionClass' => 'text-gray-500 mb-4 text-center',
            'buttonText' => 'Try Again',
            'buttonClass' => 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200'
        ]
    ];
}

