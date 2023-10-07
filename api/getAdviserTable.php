<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$section = $_SERVER['REQUEST_URI'];

for ($i = strlen($section) - 1; $i > 0; $i--) {
    if ($section[$i] == "/") {
        $section = substr($section, ($i + 1));
        $section = str_replace("_"," ", $section);
        break;
    }
}

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        //GET FULL NAME OF TEACHER
        $teacherName = "SELECT AdviserName FROM section_list WHERE SectionName = '$section'";
        $tn = $conn->prepare($teacherName);
        $tn->execute();
        $t_name = $tn->fetchColumn();

        if ($t_name == "") {
            echo json_encode("No-Section");
            break;
        } 
    
        $teacher_email = "";
        //GET EMAIL
        $t_email = "SELECT Email FROM accounts WHERE concat(GivenName, ' ', MiddleName, ' ', LastName) = '$t_name'";
        $t_e = $conn->prepare($t_email);
        $t_e->execute();
        $teacher_email = $t_e->fetchColumn();

        //
        if ($teacher_email != '' && $teacher_email != false) {
        } else {
            $t_email2 = "SELECT Email FROM accounts WHERE concat(GivenName, ' ', LastName) = '$t_name'";
            $t_e2 = $conn->prepare($t_email2);
            $t_e2->execute();
            $teacher_email = $t_e2->fetchColumn();
        }

        $teacher_table = $teacher_email;
        $atSign = strpos($teacher_table, "@");
        $teacher_table = substr($teacher_table, 0, $atSign);
        $teacher_table = str_replace(".", "_", $teacher_table);

        echo json_encode($teacher_table);
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>