<?php
// Handle CORS
header("Access-Control-Allow-Origin: https://app.gottabenc.com, http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function getChatroomPageConfig() {
  return [
    'headerMode' => 'simple',
    'showMenu' => true,
    'styling' => [
      'container' => 'relative w-full bg-indigo-50 min-h-[973px]',
      'headerText' => 'absolute text-3xl font-bold text-center text-black h-[76px] left-[298px] top-[175px] w-[685px] max-md:static max-md:px-6 max-md:pt-10 max-md:pb-5 max-md:w-full max-md:text-3xl max-sm:px-4 max-sm:pt-8 max-sm:pb-5 max-sm:text-2xl max-sm:leading-tight',
      'createButton' => 'flex absolute gap-2.5 justify-center items-center px-8 py-4 h-12 bg-blue-600 rounded-md cursor-pointer left-[526px] top-[311px] w-[260px] max-md:flex max-md:static max-md:mx-auto max-md:mt-0 max-md:mb-10 max-sm:mx-4 max-sm:mt-0 max-sm:mb-6 max-sm:w-[calc(100%_-_32px)] hover:bg-blue-700 transition-colors',
      'createButtonText' => 'text-xl font-bold text-center text-white max-sm:text-lg whitespace-nowrap',
      'cardsContainer' => 'flex absolute flex-col gap-8 items-start h-[318px] left-[259px] top-[415px] w-[762px] max-md:static max-md:gap-5 max-md:px-6 max-md:py-0 max-md:w-full max-sm:gap-6 max-sm:px-4 max-sm:py-0',
      'card' => 'h-36 bg-white border-slate-300 shadow-sm transition-all cursor-pointer duration-[0.2s] ease-[ease] w-[234px] max-md:min-w-[280px] max-md:w-[calc(50%_-_10px)] max-sm:w-full max-sm:min-w-[auto] hover:shadow-lg hover:border-blue-300 hover:bg-blue-50',
      'cardHeader' => 'flex flex-col gap-1.5 items-center justify-center h-full p-8 max-sm:p-5',
      'cardTitle' => 'text-xl font-bold text-center text-blue-600 max-sm:text-lg',
      'cardDescription' => 'text-base text-center text-blue-600 max-sm:text-sm'
    ],
    'headerText' => 'Find the chatroom where your issue is discussed, or start a new one!',
    'createButtonText' => '+ Create New Chatroom',
    'cards' => [
      [
        'title' => 'All things Shipping',
        'description' => 'Where shipping is discussed',
        'tab' => 'shipping'
      ],
      [
        'title' => 'All things schools',
        'description' => 'Where school enrollment is discussed',
        'tab' => 'schools'
      ],
      [
        'title' => 'Financial Advice',
        'description' => 'Where we discuss finances',
        'tab' => 'financial'
      ],
      [
        'title' => 'Legal tips',
        'description' => 'Where we share legal advice',
        'tab' => 'legal'
      ],
      [
        'title' => 'Aeroports',
        'description' => 'Tips for when you arrive at the aeroport',
        'tab' => 'airports'
      ],
      [
        'title' => 'Interview tips',
        'description' => 'Where we discuss best ideas for interviews',
        'tab' => 'interviews'
      ]
    ]
  ];
}
