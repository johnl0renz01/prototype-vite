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
        $sql = "SELECT AdviserName FROM section_list WHERE SectionName = '$section'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $adviser_name = $stmt->fetchColumn();

        $sql2 = "SELECT Email FROM accounts WHERE CONCAT(GivenName, ' ', LastName) = '$adviser_name'";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute();
        $email = $stmt2->fetchColumn();

        if ($email == "") {
            $sql3 = "SELECT Email FROM accounts WHERE CONCAT(GivenName, ' ', MiddleName, ' ', LastName) = '$adviser_name'";
            $stmt3 = $conn->prepare($sql3);
            $stmt3->execute();
            $email = $stmt3->fetchColumn();
        }

        $sql4 = "SELECT SubscriptionType FROM accounts WHERE Email = '$email'";
        $stmt4 = $conn->prepare($sql4);
        $stmt4->execute();
        $subscribed = $stmt4->fetchColumn();
        echo json_encode($subscribed);

        break;

    case "POST":
        $sql = "SELECT AdviserName FROM section_list WHERE SectionName = '$section'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $adviser_name = $stmt->fetchColumn();

        $sql2 = "SELECT Email FROM accounts WHERE CONCAT(GivenName, ' ', LastName) = '$adviser_name'";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute();
        $email = $stmt2->fetchColumn();

        if ($email == "") {
            $sql3 = "SELECT Email FROM accounts WHERE CONCAT(GivenName, ' ', MiddleName, ' ', LastName) = '$adviser_name'";
            $stmt3 = $conn->prepare($sql3);
            $stmt3->execute();
            $email = $stmt3->fetchColumn();
        }

        $sql4 = "SELECT Subscribed FROM accounts WHERE Email = '$email'";
        $stmt4 = $conn->prepare($sql4);
        $stmt4->execute();
        $subscribed = $stmt4->fetchColumn();

        if ($subscribed == "") {
            echo json_encode("NOT-SUBSCRIBED");
        } else {
            $sql5 = "SELECT DueDate FROM accounts WHERE Email = '$email'";
            $stmt5 = $conn->prepare($sql5);
            $stmt5->execute();
            $date = $stmt5->fetchColumn();

            echo json_encode($date);
        }

        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>