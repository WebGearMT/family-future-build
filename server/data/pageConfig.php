<?php
// Handle CORS
header("Access-Control-Allow-Origin: https://app.gottabenc.com, http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// api/pages/home-config.php

function getHomePageConfig() {
    return [
        'styling' => [
            'root' => 'relative w-full bg-indigo-50 min-h-[973px] max-sm:h-screen',
            'container' => 'flex flex-col gap-8 items-center px-12 pt-24 pb-12 max-md:gap-6 max-md:px-6 max-md:pt-16 max-md:pb-6 max-sm:gap-5 max-sm:px-4 max-sm:pt-10 max-sm:pb-6'
        ],
        'title' => [
            'text' => 'Get the Assistance You Need for the Big Move!',
            'styling' => 'text-3xl font-bold text-center text-black h-[38px] w-[643px] max-md:w-auto max-md:h-auto max-md:text-3xl max-sm:text-2xl max-sm:leading-tight'
        ],
        'subtitle' => [
            'text' => 'Whether it means asking for help, getting a cost-saving voucher, or just information,<br />we got you covered!',
            'styling' => 'h-12 text-xl font-bold text-center text-slate-600 w-[739px] max-md:w-auto max-md:h-auto max-md:text-lg max-sm:text-base max-sm:leading-tight'
        ],
        'mobileCta' => [
            'text' => 'Get Started Today!',
            'styling' => [
                'container' => 'sm:hidden flex shrink-0 gap-2.5 justify-center items-center px-8 py-4 h-12 bg-blue-600 rounded-md cursor-pointer w-full max-w-[280px]',
                'text' => 'text-xl font-bold text-center text-white'
            ]
        ],
        'featuredCard' => [
            'title' => 'Getting Started',
            'description' => 'Your first steps to take to prepare for the move',
            'icon' => 'Luggage',
            'link' => '/GettingStarted',
            'styling' => [
                'card' => 'flex flex-col shrink-0 gap-2.5 items-start px-3.5 py-5 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow',
                'inner' => 'flex flex-col gap-1.5 items-center w-52 max-sm:w-full',
                'icon' => 'w-6 h-6 text-blue-600',
                'title' => 'self-stretch text-xl font-extrabold text-center text-blue-600',
                'description' => 'self-stretch text-base font-medium text-center text-blue-600 max-sm:w-full'
            ]
        ],
        'cardGrid' => [
            'styling' => [
                'container' => 'flex flex-col gap-8 items-start h-[318px] w-[762px] max-md:w-full max-md:max-w-[762px]',
                'row' => 'flex gap-8 items-center self-stretch max-md:flex-wrap max-md:gap-5 max-md:justify-center max-sm:flex-col max-sm:gap-4 max-sm:items-center'
            ],
            'row1' => [
                [
                    'title' => 'Notice Boards',
                    'description' => 'Find an agent, a job, or even a place to sell!',
                    'icon' => 'MessageSquare',
                    'link' => '/notice-boards',
                    'styling' => [
                        'card' => 'flex flex-col gap-2.5 items-start px-8 py-6 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow',
                        'inner' => 'flex flex-col gap-1.5 items-center w-[171px] max-sm:w-full',
                        'icon' => 'w-6 h-6 text-blue-600',
                        'title' => 'self-stretch text-xl font-extrabold text-center text-blue-600',
                        'description' => 'self-stretch text-base font-medium text-center text-blue-600 max-sm:w-full'
                    ]
                ],
                [
                    'title' => 'Community Chat',
                    'description' => 'Need more help? talk to the community.',
                    'icon' => 'MessageCircle',
                    'link' => '/ChatRoomDashboard',
                    'styling' => [
                        'card' => 'flex flex-col gap-2.5 items-start px-8 py-6 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow',
                        'inner' => 'flex flex-col gap-1.5 items-center w-[171px] max-sm:w-full',
                        'icon' => 'w-6 h-6 text-blue-600',
                        'title' => 'self-stretch text-xl font-extrabold text-center text-blue-600',
                        'description' => 'self-stretch text-base font-medium text-center text-blue-600 max-sm:w-full'
                    ]
                ],
                [
                    'title' => 'Coupons & Vouchers',
                    'description' => 'Need a discount? Look no further!',
                    'icon' => 'Ticket',
                    'link' => '/vouchers-coupons-page',
                    'styling' => [
                        'card' => 'flex flex-col gap-2.5 items-center px-8 py-6 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow',
                        'inner' => 'flex flex-col gap-1.5 items-center w-52 max-sm:w-full',
                        'icon' => 'w-8 h-8 text-blue-600',
                        'title' => 'self-stretch text-xl font-extrabold text-center text-blue-600',
                        'description' => 'self-stretch text-base font-medium text-center text-blue-600'
                    ]
                ]
            ],
            'row2' => [
                [
                    'title' => 'FAQ',
                    'description' => 'Got a question? The answer might be here.',
                    'icon' => 'HelpCircle',
                    'link' => '/FAQ',
                    'styling' => [
                        'card' => 'flex flex-col gap-2.5 items-start px-8 py-6 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow',
                        'inner' => 'flex flex-col gap-1.5 items-center w-[171px] max-sm:w-full',
                        'icon' => 'w-[18px] h-[18px] text-blue-600',
                        'title' => 'self-stretch text-xl font-extrabold text-center text-blue-600',
                        'description' => 'self-stretch text-base font-medium text-center text-blue-600 max-sm:w-full'
                    ]
                ],
                [
                    'title' => 'Resources',
                    'description' => 'All the info you need about NC in one place.',
                    'icon' => 'BookOpen',
                    'link' => '/resources',
                    'styling' => [
                        'card' => 'flex flex-col gap-2.5 items-start px-8 py-6 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow',
                        'inner' => 'flex flex-col gap-1.5 items-center w-[171px] max-sm:w-full',
                        'icon' => 'w-6 h-6 text-blue-600',
                        'title' => 'self-stretch text-xl font-extrabold text-center text-blue-600',
                        'description' => 'self-stretch text-base font-medium text-center text-blue-600 max-sm:w-full'
                    ]
                ],
                [
                    'title' => 'Shipping',
                    'description' => 'Get what you need to get your possessions to NC.',
                    'icon' => 'Ship',
                    'link' => '/shipping',
                    'styling' => [
                        'card' => 'flex flex-col gap-2.5 items-center px-3.5 py-5 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow',
                        'inner' => 'flex flex-col gap-1.5 items-center w-52 max-sm:w-full',
                        'icon' => 'w-6 h-6 text-blue-600',
                        'title' => 'self-stretch text-xl font-extrabold text-center text-blue-600',
                        'description' => 'self-stretch text-base font-medium text-center text-blue-600'
                    ]
                ]
            ]
        ],
        'desktopCta' => [
            'text' => 'Get Started Today!',
            'styling' => [
                'container' => 'hidden sm:flex shrink-0 gap-2.5 justify-center items-center px-8 py-4 h-12 bg-blue-600 rounded-md cursor-pointer w-[240px]',
                'text' => 'text-xl font-bold text-center text-white'
            ]
        ]
    ];
}


function getGettingStartedPageConfig() {
    return [
        'styling' => [
            'background' => 'min-h-screen bg-background'
        ],
        'header' => [
            'showMenu' => false
        ],
        'title' => [
            'text' => 'Getting Started',
            'styling' => [
                'container' => 'bg-white px-4 py-3 border-b border-border shadow-sm',
                'heading' => 'text-lg font-semibold text-foreground'
            ]
        ],
        'tabs' => [
            [
                'id' => 'preparation',
                'label' => 'Preparation',
                'content' => [
                    'type' => 'checklist',
                    'items' => [
                        'Research housing options',
                        'Create a relocation budget',
                        'Visit potential neighborhoods'
                    ]
                ]
            ],
            [
                'id' => 'documents',
                'label' => 'Documents',
                'content' => [
                    'type' => 'resource-list',
                    'title' => 'Essential Documents',
                    'items' => [
                        [
                            'title' => 'Identification Records',
                            'description' => 'Driver\'s license, birth certificates'
                        ],
                        [
                            'title' => 'Financial Documents',
                            'description' => 'Tax returns, bank statements'
                        ]
                    ]
                ]
            ],
            [
                'id' => 'settling',
                'label' => 'Settling In',
                'content' => [
                    'type' => 'guide',
                    'sections' => [
                        [
                            'title' => 'DMV Registration',
                            'content' => 'Complete within 60 days of residency'
                        ],
                        [
                            'title' => 'Voter Registration',
                            'content' => 'Update your voting information'
                        ]
                    ]
                ]
            ]
        ],
        'main' => [
            'styling' => [
                'container' => 'p-4 max-w-4xl mx-auto',
                'card' => 'bg-card rounded-lg border border-border p-6 shadow-sm'
            ]
        ]
    ];
}


