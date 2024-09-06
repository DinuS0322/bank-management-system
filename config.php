<?php
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$cashClear = date('s');

ob_start();
session_start();

require_once 'dbconfig.php';
require_once 'vendor/autoload.php';
require_once 'include/functions.php';
date_default_timezone_set('Asia/Colombo');

$allowedIps = ['127.0.0.1'];

if (in_array($_SERVER['REMOTE_ADDR'], $allowedIps) && isset($_GET['debug'])) {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
}

//Check the request IP address.
if (in_array($_SERVER['REMOTE_ADDR'], $allowedIps)) {
    $config = $localConfig;
} else {
    $config = $localConfig;
}
//Check the request IP address.

$dbconnect = false;
// $db = null;
try {
    $db = new PDO('mysql:host=' . $config['host'] . ';port=' . $config['port'] . ';dbname=' . $config['dbname'], $config['username'], $config['password']);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, 1);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $ex) {
    echo $ex->getMessage();
    echo "<div class='alert alert-danger container'>";
    echo "<i class='fas fa-exclamation-triangle'></i> Unable to connect to database, <strong> please check your internet connection</strong> ";
    echo "</div>";
}
