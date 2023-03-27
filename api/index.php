<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

ob_start();
session_start();

$requestLink = $_SERVER['REQUEST_URI'];


for ($i = strlen($requestLink) - 1; $i > 0; $i--) {
    if ($requestLink[$i] == "/") {
        $requestLink = substr($requestLink, 0, $i);
        break;
    }
}

//echo $requestLink;
$_SESSION['method'] = $_SERVER['REQUEST_METHOD'];
//echo $_SESSION['method'];

switch($requestLink) {
    case "/Prototype-Vite/my-project/api/registerAccount":
        include('registerAccount.php');
        break;
    case "/Prototype-Vite/my-project/api/whiteboardLogs":
        include('whiteboardLogs.php');
        break;
    case "/Prototype-Vite/my-project/api/sectionList":
        include('sectionList.php');
        break;
    case "/Prototype-Vite/my-project/api/classList":
        include('classList.php');
        break;
    case "/Prototype-Vite/my-project/api/studentDetail":
        include('studentDetail.php');
        break;
    case "/Prototype-Vite/my-project/api/studentHistory":
        include('studentHistory.php');
    break;
    case "/Prototype-Vite/my-project/api/loginAdmin":
        include('loginAdmin.php');
    break;
    case "/Prototype-Vite/my-project/api/loginStudent":
        include('loginStudent.php');
    break;
}

