<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

switch($_SESSION['method']) {
    case "GET":
        break;
        case "POST":
            $sad = 0;
            $surprised = 0;
            $motivation = 0;
    
            $score = rand(3,14);
            $angry = rand(0,5);
            $happy = rand((($score * 2) - rand(($score-1),($score))), (($score * 3) - ($score)));
            if ($happy > 25 || $score >= 10) {
                $score = 20;
                $sad = rand(2,5);
                $surprised = rand(1 , $sad);
            } else if ($happy > 17) {
                $sad = rand(4, 15);
                $surprised = rand(1 , 5);
            } else if ($happy > 10) {
                $sad = rand(9, 20);
                $surprised = rand(1 , 4);
            } else if ($happy > 5) {
                $sad = rand(15, 35);
                $surprised = rand(0 , 3);
            } else if ($happy > 3) {
                $sad = rand(20, 40);
                $surprised = rand(0 , 1);
            } else {
                $sad = rand(25, 50);
                $surprised = 0;
            }
        
            if ($sad < 3) {
                $motivation = 0;
            } else if ($sad < 9) {
                $motivation = rand(1, ((rand(($sad-1), $sad) / 2)));
            } else if ($sad < 15) {
                $motivation = rand(3, (rand(($sad-1), $sad) / 2));
            } else if ($sad < 21) {
                $motivation = rand(4, (rand(($sad-1), $sad) / 2));
            } else if ($sad < 30) {
                $motivation = rand(6, (rand(($sad-1), $sad) / 2));
            } else {
                $motivation = rand(7, (rand(($sad-1), $sad) / 2));
            }
    
            $user = json_decode( file_get_contents('php://input') );
            $tablename = $user->tablename;
    
            $sql = "INSERT INTO $tablename (SessionID, SessionType, Score, TimeSpent, TimeStamp, TimeStart, ExpressionAngry, ExpressionHappy, ExpressionSad, ExpressionSurprised, ExpressionMotivation) 
                                VALUES(null, 'Easy', '$score', '0', :timestamp, :start_time, '$angry', '$happy', '$sad', '$surprised', '$motivation')";
    
            $stmt = $conn->prepare($sql);
            date_default_timezone_set('Asia/Singapore');
            $timestamp = date('M d, Y - h:i A');
            $stmt->bindParam(':timestamp', $timestamp);
            $start_time = date('d-m-Y H:i:s');
            $stmt->bindParam(':start_time', $start_time);
            
            if($stmt->execute()) {
                echo "SUCCESS";
            } else {
                echo "FAILED";
            }
            break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>