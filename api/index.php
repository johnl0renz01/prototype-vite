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
     case "/api/loginAdmin":
        include('loginAdmin.php');
    break;
    case "/api/loginStudent":
        include('loginStudent.php');
    break;

    case "/api/loginSession":
        include('loginSession.php');
    break;

    case "/api/getSessionEmail":
        include('getSessionEmail.php');
    break;

    case "/api/getSessionLogged":
        include('getSessionLogged.php');
    break;

    //LOGOUT
    case "/api/logout":
        include('logout.php');
    break;

    //===========STUDENT=============
     //FOR SELECT DIFFICULTY
     case "/api/selectDifficulty":
        include('selectDifficulty.php');
    break;
    case "/api/getEquation":
        include('getEquation.php');
    break;

    case "/api/studentSessionCreate":
        include('studentSessionCreate.php');
    break;
    case "/api/studentSessionUpdate":
        include('studentSessionUpdate.php');
    break;

    //FOR WHITEBOARD
    case "/api/whiteboardLog":
        include('whiteboardLog.php');
        break;
    case "/api/whiteboardClick":
        include('whiteboardClick.php');
    break;
    case "/api/endSession":
        include('endSession.php');
    break;
    case "/api/getTimeSpent":
        include('getTimeSpent.php');
    break;

    //===========ADMIN=============
    //FOR REGISTRATION
    case "/api/registerAccount":
    include('registerAccount.php');
    case "/api/verifyEmail":
        include('verifyEmail.php');
    break;
    case "/api/registerBulk":
        include('registerBulk.php');
    case "/api/verifyEmailBulk":
        include('verifyEmailBulk.php');
    break;


    //FOR MANAGE SECTION
    case "/api/sectionCode":
        include('sectionCode.php');
        break;
    case "/api/sectionTotal":
        include('sectionTotal.php');
        break;
    case "/api/sectionName":
        include('sectionName.php');
        break;
    case "/api/sectionList":
        include('sectionList.php');
        break;
    case "/api/sectionTotalStudents":
        include('sectionTotalStudents.php');
        break;
    case "/api/sectionAdviser":
        include('sectionAdviser.php');
        break;

    case "/api/adviserList":
        include('adviserList.php');
        break;
        

    case "/api/addSection":
        include('addSection.php');
    break;
    case "/api/editSection":
        include('editSection.php');
        break;

    case "/api/verifySection":
        include('verifySection.php');
    break;

    case "/api/sectionHandled":
        include('sectionHandled.php');
        break;

    case "/api/sectionTotalv2":
        include('sectionTotalv2.php');
        break;
    case "/api/sectionNamev2":
        include('sectionNamev2.php');
        break;

    case "/api/getAssignedStudent":
        include('getAssignedStudent.php');
        break;

    case "/api/getAssignedTeacher":
        include('getAssignedTeacher.php');
        break;

    case "/api/removeSection":
        include('removeSection.php');
        break;

    case "/api/removeSectionAccounts":
        include('removeSectionAccounts.php');
        break;



    //FOR CLASS LIST
    case "/api/classList":
        include('classList.php');
        break;

    //FOR STUDENT DETAIL
    case "/api/studentDetail":
        include('studentDetail.php');
        break;
    case "/api/studentHistory":
        include('studentHistory.php');
    break;

    case "/api/exportRow":
        include('exportRow.php');
    break;

    case "/api/exportAll":
        include('exportAll.php');
    break;


   
    //FOR CUSTOMIZATION
    case "/api/editAccount":
        include('editAccount.php');
    break;
    case "/api/editAccountPassword":
        include('editAccountPassword.php');
    break;

    //EQUATIONS
    case "/api/removeEquation":
        include('removeEquation.php');
    break;
    case "/api/verifyEquation":
        include('verifyEquation.php');
    break;
    case "/api/addEquation":
        include('addEquation.php');
    break;
    case "/api/getEquationList":
        include('getEquationList.php');
    break;
    case "/api/equationsEasy":
        include('equationsEasy.php');
    break;
    case "/api/equationsAverage":
        include('equationsAverage.php');
    break;
    case "/api/equationsDifficult":
        include('equationsDifficult.php');
    break;

    case "/api/editEquationType":
        include('editEquationType.php');
    break;

    case "/api/equationSettingsDetails":
        include('equationSettingsDetails.php');
    break;


    //// 


    case "/api/getAccountSection":
        include('getAccountSection.php');
        break;
    case "/api/sectionDetails":
        include('sectionDetails.php');
        break;
    
    
   

    case "/api/upload":
        include('upload.php');
    break;

    //FOR LOGIN
    case "/api/validateLogin":
        include('validateLogin.php');
    break;

    case "/api/teacherLoginSection":
        include('teacherLoginSection.php');
    break;

    case "/api/getAdviserTable":
        include('getAdviserTable.php');
    break;

    //FOR MANAGE ACCOUNTS
    case "/api/accountList":
        include('accountList.php');
    break;

    case "/api/accountDetails":
        include('accountDetails.php');
    break;

    case "/api/accountType":
        include('accountType.php');
    break;

    case "/api/getSectionAssigned":
        include('getSectionAssigned.php');
    break;

    case "/api/removeAccount":
        include('removeAccount.php');
    break;

    //RESET REQUESTS
    case "/api/resetPasswordList":
        include('resetPasswordList.php');
    break;
    case "/api/resetPassword":
        include('resetPassword.php');
    break;
    case "/api/removeResetRequest":
        include('removeResetRequest.php');
    break;


    //CONTACT ADMIN
    case "/api/requestSend":
        include('requestSend.php');
    break;

    //USER REQUESTS
    case "/api/requestList":
        include('requestList.php');
    break;

    case "/api/requestDetails":
        include('requestDetails.php');
    break;

    case "/api/requestSolved":
        include('requestSolved.php');
    break;

    case "/api/requestTotal":
        include('requestTotal.php');
    break;

    case "/api/requestStatus":
        include('requestStatus.php');
    break;

    case "/api/requestMessages":
        include('requestMessages.php');
    break;

    case "/api/requestReply":
        include('requestReply.php');
    break;

    case "/api/myRequestList":
        include('myRequestList.php');
    break;

    case "/api/requestNotificationAdmin":
        include('requestNotificationAdmin.php');
    break;
    case "/api/requestNotificationUser":
        include('requestNotificationUser.php');
    break;

    case "/api/requestSeen":
        include('requestSeen.php');
    break;

    // SET NEW PASSWORD
    case "/api/setNewPassword":
        include('setNewPassword.php');
    break;

    // EDIT PASSWORD
    case "/Prototype-Vite/my-project/api/editPassword":
        include('editPassword.php');
    break;

    // FORGOT PASSWORD
    case "/api/forgotPassEmail":
        include('forgotPassEmail.php');
    break;

    case "/api/forgotPassCode":
        include('forgotPassCode.php');
    break;

    case "/api/resetPasswordCode":
        include('resetPasswordCode.php');
    break;

}

