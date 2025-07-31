<?php
// Handle CORS
header("Access-Control-Allow-Origin: https://app.gottabenc.com, http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function getResourcesPageConfig() {
  return [
    'title' => 'North Carolina Resources',
    'styling' => [
      'container' => 'min-h-screen bg-gradient-to-br from-blue-100 to-sky-200',
      'header' => 'bg-white shadow-sm border-b',
      'headerInner' => 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      'headerContent' => 'flex justify-between items-center h-16',
      'title' => 'text-2xl font-bold text-blue-900',
      'main' => 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
      'intro' => 'mb-8',
      'introTitle' => 'text-3xl font-bold text-blue-900 mb-2',
      'introDescription' => 'text-blue-800',
      'resourcesGrid' => 'grid md:grid-cols-2 gap-6',
      'resourceCard' => 'hover:shadow-lg transition-shadow duration-300',
      'resourceHeader' => 'flex items-center space-x-3',
      'resourceIcon' => 'h-6 w-6 text-sky-600',
      'resourceTitle' => 'text-xl',
      'resourceDescription' => 'text-sm',
      'resourceItems' => 'space-y-2 mb-4',
      'resourceItem' => 'flex items-start space-x-2 text-sm text-gray-700',
      'resourceItemBullet' => 'w-1.5 h-1.5 bg-sky-600 rounded-full mt-2 flex-shrink-0',
      'resourceLinkButton' => 'w-full flex items-center justify-center space-x-2 hover:bg-blue-50 border-blue-300',
      'externalLinkIcon' => 'h-4 w-4',
      'importantNumbers' => 'mt-12 bg-white rounded-lg shadow-sm border p-6',
      'importantNumbersTitle' => 'text-xl font-semibold text-blue-900 mb-4',
      'importantNumbersGrid' => 'grid md:grid-cols-2 gap-4 text-sm',
      'importantNumbersCategory' => 'font-medium text-blue-900 mb-2'
    ],
    'introTitle' => 'Essential Services Guide',
    'introDescription' => 'Everything you need to know about getting started in North Carolina.',
    'resources' => [
      // ... resource items ...
    ],
    'importantNumbersTitle' => 'Important Phone Numbers',
    'importantNumbers' => [
      [
        'category' => 'Emergency Services',
        'items' => [
          'Emergency: 911',
          'Non-Emergency Police: 311'
        ]
      ],
      [
        'category' => 'General Resources',
        'items' => [
          'NC 211 (Information & Referral): 2-1-1',
          'NC DMV: (919) 715-7000'
        ]
      ]
    ]
  ];
}
