<?php

$page = $_GET['page'] ?? 'dashboard';

$allowedPages = [
    'dashboard',
    'chart-of-accounts',
    'journals',
    'invoices',
    'payments',
    'closing-periods',
];

if (!in_array($page, $allowedPages)) {
    $page = 'dashboard';
}

ob_start();
include __DIR__ . "/pages/$page.php";
$content = ob_get_clean();

$title = ucfirst($page);

include __DIR__ . "/layouts/default.php";
