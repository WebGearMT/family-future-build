<?php
// Handle CORS
header("Access-Control-Allow-Origin: https://app.gottabenc.com, http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function getChatroomDetailPageConfig() {
  return [
    'styling' => [
      'container' => 'bg-background border-b border-border px-6 py-4',
      'header' => 'flex items-center gap-4',
      'backButton' => 'flex items-center gap-2 text-muted-foreground hover:text-foreground',
      'backButtonIcon' => 'h-4 w-4',
      'title' => 'text-2xl font-bold text-foreground mt-2'
    ],
    'backButton' => [
      'variant' => 'ghost',
      'size' => 'sm',
      'text' => 'Back to Chatrooms',
      'onClick' => 'onBackToChatrooms'
    ],
    'title' => '{chatroomName}'
  ];
}
