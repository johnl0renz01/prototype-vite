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
    //FOR LOGIN
     case "/Prototype-Vite/my-project/api/loginAdmin":
        include('loginAdmin.php');
    break;
    case "/Prototype-Vite/my-project/api/loginStudent":
        include('loginStudent.php');
    break;

    //===========STUDENT=============
     //FOR SELECT DIFFICULTY
     case "/Prototype-Vite/my-project/api/selectDifficulty":
        include('selectDifficulty.php');
    break;
    case "/Prototype-Vite/my-project/api/getEquation":
        include('getEquation.php');
    break;

    //FOR WHITEBOARD
    case "/Prototype-Vite/my-project/api/whiteboardLog":
        include('whiteboardLog.php');
        break;
    case "/Prototype-Vite/my-project/api/whiteboardClick":
        include('whiteboardClick.php');
    break;
    case "/Prototype-Vite/my-project/api/endSession":
        include('endSession.php');
    break;
    case "/Prototype-Vite/my-project/api/getTimeSpent":
        include('getTimeSpent.php');
    break;

    //===========ADMIN=============
    //FOR REGISTRATION
    case "/Prototype-Vite/my-project/api/registerAccount":
    include('registerAccount.php');
    break;

    //FOR SECTION
    case "/Prototype-Vite/my-project/api/sectionTotal":
        include('sectionTotal.php');
        break;
    case "/Prototype-Vite/my-project/api/sectionName":
        include('sectionName.php');
        break;
    case "/Prototype-Vite/my-project/api/sectionList":
        include('sectionList.php');
        break;
    case "/Prototype-Vite/my-project/api/sectionTotalStudents":
        include('sectionTotalStudents.php');
        break;
    case "/Prototype-Vite/my-project/api/sectionAdviser":
        include('sectionAdviser.php');
        break;

    //FOR CLASS LIST
    case "/Prototype-Vite/my-project/api/classList":
        include('classList.php');
        break;

    //FOR STUDENT DETAIL
    case "/Prototype-Vite/my-project/api/studentDetail":
        include('studentDetail.php');
        break;
    case "/Prototype-Vite/my-project/api/studentHistory":
        include('studentHistory.php');
    break;
   
    //FOR CUSTOMIZATION
    case "/Prototype-Vite/my-project/api/editAccount":
        include('editAccount.php');
    break;
    case "/Prototype-Vite/my-project/api/editAccountPassword":
        include('editAccountPassword.php');
    break;
    case "/Prototype-Vite/my-project/api/removeEquation":
        include('removeEquation.php');
    break;
    case "/Prototype-Vite/my-project/api/verifyEquation":
        include('verifyEquation.php');
    break;
    case "/Prototype-Vite/my-project/api/addEquation":
        include('addEquation.php');
    break;
    case "/Prototype-Vite/my-project/api/getEquationList":
        include('getEquationList.php');
    break;

    case "/Prototype-Vite/my-project/api/getAccountSection":
        include('getAccountSection.php');
        break;
    case "/Prototype-Vite/my-project/api/sectionDetails":
        include('sectionDetails.php');
        break;
    case "/Prototype-Vite/my-project/api/addSection":
        include('addSection.php');
    break;
    
   

    case "/Prototype-Vite/my-project/api/upload":
        include('upload.php');
    break;
}

