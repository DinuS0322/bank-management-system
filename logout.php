<?php
require 'config.php';
$clientIP = $_SERVER['REMOTE_ADDR'];
$currentDateTime = date("Y-m-d H:i:s");
$stmt = $db->prepare('INSERT INTO tbl_activity_log(userId,userName,UserType,status,ipAddress,userEmail,dateTime) 
						VALUES(?,?,?,?,?,?,?)');

$status = 'logout';
$stmt->bindParam(1, $_SESSION['SESS_USER_ID']);
$stmt->bindParam(2, $_SESSION['SESS_USER_NAME']);
$stmt->bindParam(3, $_SESSION['SESS_USER_TYPE']);
$stmt->bindParam(4, $status);
$stmt->bindParam(5, $clientIP);
$stmt->bindParam(6, $_SESSION['SESS_USER_EMAIL']);
$stmt->bindParam(7, $currentDateTime);
$stmt->execute();

session_start();



unset($_SESSION);
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
}
session_destroy();
header('Location:/login.php');