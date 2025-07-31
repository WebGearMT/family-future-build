<?php
// Handle CORS
header("Access-Control-Allow-Origin: https://app.gottabenc.com, http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function getUserProfilePageConfig() {
  return [
    'title' => 'User Profile',
    'description' => 'Complete your profile information',
    'styling' => [
      'container' => 'relative w-full bg-gray-50 min-h-screen',
      'innerContainer' => 'max-w-2xl mx-auto p-6 pt-24 bg-gray-50 min-h-screen',
      'card' => 'bg-white rounded-lg shadow-lg p-6',
      'header' => 'mb-8',
      'title' => 'text-3xl font-bold text-gray-900 mb-2',
      'description' => 'text-gray-600',
      'form' => 'space-y-6',
      'errorMessage' => 'p-4 bg-red-50 border border-red-200 rounded-lg',
      'errorMessageText' => 'text-red-700 text-sm',
      'successMessage' => 'p-4 bg-green-50 border border-green-200 rounded-lg',
      'successMessageText' => 'text-green-700 text-sm',
      'buttonContainer' => 'flex justify-end space-x-4 pt-6',
      'cancelButton' => 'px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors',
      'submitButton' => 'px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed',
      'debugInfo' => 'mt-8 p-4 bg-gray-50 rounded-lg',
      'debugInfoTitle' => 'text-sm font-medium text-gray-700 mb-2',
      'debugInfoContent' => 'text-xs text-gray-600 overflow-x-auto'
    ],
    'fields' => [
      [
        'label' => 'First Name',
        'name' => 'firstName',
        'type' => 'text',
        'placeholder' => 'Enter your first name',
        'required' => true,
        'styling' => [
          'container' => 'grid grid-cols-1 md:grid-cols-2 gap-4',
          'label' => 'block text-sm font-medium text-gray-700 mb-2',
          'input' => 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
        ]
      ],
      [
        'label' => 'Last Name',
        'name' => 'lastName',
        'type' => 'text',
        'placeholder' => 'Enter your last name',
        'required' => true,
        'styling' => [
          'container' => '',
          'label' => 'block text-sm font-medium text-gray-700 mb-2',
          'input' => 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
        ]
      ],
      [
        'label' => 'Username (optional)',
        'name' => 'username',
        'type' => 'text',
        'placeholder' => 'Choose a username',
        'required' => false,
        'icon' => 'AtSign',
        'styling' => [
          'container' => '',
          'label' => 'block text-sm font-medium text-gray-700 mb-2',
          'iconContainer' => 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
          'icon' => 'h-5 w-5 text-gray-400',
          'input' => 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
        ]
      ],
      [
        'label' => 'Email (optional)',
        'name' => 'email',
        'type' => 'email',
        'placeholder' => 'Enter your email address',
        'required' => true,
        'icon' => 'Mail',
        'styling' => [
          'container' => '',
          'label' => 'block text-sm font-medium text-gray-700 mb-2',
          'iconContainer' => 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
          'icon' => 'h-5 w-5 text-gray-400',
          'input' => 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
        ]
      ],
      [
        'label' => 'Phone Number (optional)',
        'name' => 'phoneNumber',
        'type' => 'tel',
        'placeholder' => 'Enter your phone number',
        'required' => false,
        'icon' => 'Phone',
        'styling' => [
          'container' => '',
          'label' => 'block text-sm font-medium text-gray-700 mb-2',
          'iconContainer' => 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
          'icon' => 'h-5 w-5 text-gray-400',
          'input' => 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
        ]
      ]
    ],
    'buttons' => [
      'cancel' => [
        'text' => 'Cancel'
      ],
      'submit' => [
        'text' => 'Save Profile',
        'loadingText' => 'Saving...'
      ]
    ],
    'debugInfo' => [
      'title' => 'Current Profile Data:'
    ]
  ];
}
