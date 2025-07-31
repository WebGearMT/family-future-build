<?php
// Handle CORS
header("Access-Control-Allow-Origin: https://app.gottabenc.com, http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function getNoticeBoardsPageConfig() {
    return [
        'styling' => [
            'root' => 'relative bg-gray-50 h-[868px] w-full max-md:h-auto'
        ],
        'header' => [
            'title' => 'Notice Boards',
            'styling' => [
                'container' => 'flex absolute left-0 top-16 flex-col gap-2.5 items-center px-6 py-5 bg-zinc-100 h-[97px] w-full max-md:p-5 max-md:h-auto',
                'inner' => 'flex justify-center items-center w-[1208px] max-md:w-[calc(100%_-_50px)]',
                'title' => 'text-4xl font-bold text-black max-md:text-3xl max-sm:text-2xl'
            ]
        ],
        'main' => [
            'styling' => [
                'container' => 'inline-flex absolute gap-24 items-start h-[609px] left-[138px] top-[192px] w-[1004px] max-md:left-5 max-md:flex-col max-md:gap-10 max-md:h-auto max-md:top-[184px] max-md:w-[calc(100%_-_40px)] max-sm:left-2.5 max-sm:top-44 max-sm:gap-5 max-sm:w-[calc(100%_-_20px)]'
            ]
        ],
        'noticeBoard' => [
            'styling' => [
                'container' => 'flex flex-col gap-9 items-start w-[517px] max-md:w-full'
            ],
            'items' => [
                [
                    'title' => 'Reputable Agents',
                    'description' => 'Get the service you need from these highly reputable agents.',
                    'link' => '/notice-boards/reputable-agents',
                    'showCount' => false,
                    'styling' => [
                        'link' => 'flex relative gap-14 items-center px-8 py-3 h-[93px] w-[517px] max-md:gap-5 max-md:px-5 max-md:py-3 max-md:w-full max-sm:flex-col max-sm:gap-3 max-sm:items-stretch max-sm:p-4 max-sm:h-auto hover:bg-gray-100 transition-colors duration-200 cursor-pointer',
                        'background' => 'flex absolute top-0 left-0 items-center w-[517px] max-md:w-full',
                        'backgroundInner' => 'shrink-0 bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full',
                        'content' => 'flex relative flex-col shrink-0 gap-1.5 items-start w-72 z-[1] max-md:flex-1 max-md:w-auto max-sm:w-full',
                        'title' => 'text-xl font-bold text-black',
                        'description' => 'text-base text-black',
                        'count' => 'text-green-600 font-medium'
                    ]
                ],
                [
                    'title' => 'Reputable Companies',
                    'description' => 'Get the products/services you need from these well respected companies.',
                    'link' => '/notice-boards/reputable-companies',
                    'showCount' => true,
                    'styling' => [
                        'link' => 'flex relative gap-14 items-center px-8 py-3 h-[93px] w-[517px] max-md:gap-5 max-md:px-5 max-md:py-3 max-md:w-full max-sm:flex-col max-sm:gap-3 max-sm:items-stretch max-sm:p-4 max-sm:h-auto hover:bg-gray-100 transition-colors duration-200 cursor-pointer',
                        'background' => 'flex absolute top-0 left-0 items-center w-[517px] max-md:w-full',
                        'backgroundInner' => 'shrink-0 bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full',
                        'content' => 'flex relative flex-col shrink-0 gap-1.5 items-start w-72 z-[1] max-md:flex-1 max-md:w-auto max-sm:w-full',
                        'title' => 'text-xl font-bold text-black',
                        'description' => 'text-base text-black',
                        'count' => 'text-green-600 font-medium'
                    ]
                ],
                [
                    'title' => 'Classified ADs',
                    'description' => 'Find your next bargain by browsing this catalog of deals.',
                    'link' => '/notice-boards/classified-ads',
                    'showCount' => true,
                    'styling' => [
                        'link' => 'flex relative gap-14 items-center px-8 py-3 h-[93px] w-[517px] max-md:gap-5 max-md:px-5 max-md:py-3 max-md:w-full max-sm:flex-col max-sm:gap-3 max-sm:items-stretch max-sm:p-4 max-sm:h-auto hover:bg-gray-100 transition-colors duration-200 cursor-pointer',
                        'background' => 'flex absolute top-0 left-0 items-center w-[517px] max-md:w-full',
                        'backgroundInner' => 'shrink-0 bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full',
                        'content' => 'flex relative flex-col shrink-0 gap-1.5 items-start w-72 z-[1] max-md:flex-1 max-md:w-auto max-sm:w-full',
                        'title' => 'text-xl font-bold text-black',
                        'description' => 'text-base text-black',
                        'count' => 'text-green-600 font-medium'
                    ]
                ],
                [
                    'title' => 'Service Providers',
                    'description' => 'Find your first job in NC by exploring the opportunities listed.',
                    'link' => '/notice-boards/service-providers',
                    'showCount' => true,
                    'styling' => [
                        'link' => 'flex relative gap-14 items-center px-8 py-3 h-[93px] w-[517px] max-md:gap-5 max-md:px-5 max-md:py-3 max-md:w-full max-sm:flex-col max-sm:gap-3 max-sm:items-stretch max-sm:p-4 max-sm:h-auto hover:bg-gray-100 transition-colors duration-200 cursor-pointer',
                        'background' => 'flex absolute top-0 left-0 gap-2.5 items-center bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full',
                        'backgroundInner' => 'absolute top-0 left-0 shrink-0 bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full',
                        'content' => 'flex relative flex-col shrink-0 gap-1.5 items-start w-72 z-[1] max-md:flex-1 max-md:w-auto max-sm:w-full',
                        'title' => 'text-xl font-bold text-black',
                        'description' => 'text-base text-black',
                        'count' => 'text-green-600 font-medium'
                    ]
                ],
                [
                    'title' => 'Tips & Tricks',
                    'description' => 'Make your journey to NC easier with these unforgettable hacks and tips!',
                    'link' => '/notice-boards/tips-tricks',
                    'showCount' => true,
                    'styling' => [
                        'link' => 'flex relative gap-14 items-center px-8 py-3 h-[93px] w-[517px] max-md:gap-5 max-md:px-5 max-md:py-3 max-md:w-full max-sm:flex-col max-sm:gap-3 max-sm:items-stretch max-sm:p-4 max-sm:h-auto hover:bg-gray-100 transition-colors duration-200 cursor-pointer',
                        'background' => 'flex absolute top-0 left-0 gap-2.5 items-center bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full',
                        'backgroundInner' => 'absolute top-0 left-0 shrink-0 bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full',
                        'content' => 'flex relative flex-col shrink-0 gap-1.5 items-start w-72 z-[1] max-md:flex-1 max-md:w-auto max-sm:w-full',
                        'title' => 'text-xl font-bold text-black',
                        'description' => 'text-base text-black',
                        'count' => 'text-green-600 font-medium'
                    ]
                ]
            ]
        ],
        'divider' => [
            'styling' => 'bg-zinc-300 h-[609px] w-[3px] max-sm:hidden'
        ],
        'featured' => [
            'title' => 'Featured Notices',
            'styling' => [
                'container' => 'flex gap-2.5 items-center px-8 py-10 bg-gray-50 h-[609px] w-[303px] border-l border-gray-300 max-md:p-5 max-md:w-full max-md:border-l-0 max-sm:p-4',
                'inner' => 'flex flex-col shrink-0 gap-10 justify-center items-center w-[241px] max-md:w-full',
                'title' => 'self-stretch text-xl font-bold text-black'
            ]
        ]
    ];
}



