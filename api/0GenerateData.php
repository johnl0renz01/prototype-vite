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
            $levelup = rand(0,1);// 50% chance level up   '0' true;  '1' false;
            $levelup_status = "";

            $answered = 0;
            $abandoned = 0;

            if ($levelup == 0) {
                $levelup_status = "TRUE";
            } else {
                $levelup_status = "FALSE";
            }

            $sad = 0;
            $surprised = 0;
            $motivation = 0;

            $score = rand(1,20); //PREVIOUS VALUE = 3
            $angry = rand(0,5);
            $happy = rand((($score * 2) - rand(($score-1),($score))), (($score * 3) - ($score)));
            
            if ($score < 10) {
                $levelup_status = "FALSE";
                $levelup = 1;
            }
            if ($happy > 25 || $score >= 10) {
                if ($score == 20) {
                    $sad = rand(1,6);
                    if ($sad == 1) {
                        $surprised = 0;
                    } else {
                        $surprised = rand(1 , floor($sad / 2));
                    }
                    
                } else {
                    if ($levelup == 0) {
                        $answered = $score;
                        $score = 20;
                        $sad = rand(1,6);
                        if ($sad == 1) {
                            $surprised = 0;
                        } else {
                            $surprised = rand(1 , floor($sad / 2));
                        }
                    } else {
                        if ($score >= 12 && $score <= 14) {
                            $abandoned = rand(0, 2);
                            $score = $score - $abandoned;
                            $sad = rand(2,8);
                        } else if ($score >= 15 && $score < 20) {
                            $abandoned = rand(0, 4);
                            $score = $score - $abandoned;
                            $sad = rand(3,8);
                        } 
                        $answered = $score;
                        $surprised = rand(1 , floor($sad / 2));
                    }
                }

            } else if ($happy > 17) {
                $abandoned = rand(2, 4);
                $sad = rand(6, 15);
                $surprised = rand(1 , 5);
            } else if ($happy > 10) {
                $abandoned = rand(3, 5);
                $sad = rand(9, 20);
                $surprised = rand(1 , 4);
            } else if ($happy > 5) {
                $abandoned = rand(3, 5);
                $sad = rand(15, 35);
                $surprised = rand(0 , 3);
            } else if ($happy > 3) {
                $abandoned = rand(3, 5);
                $sad = rand(20, 40);
                $surprised = rand(0 , 1);
            } else {
                $abandoned = rand(4, 6);
                $sad = rand(25, 50);
                $surprised = 0;
            }
        
            if ($sad < 3) {
                $motivation = 0;
            } else if ($sad < 9) {
                $motivation = rand(1, (floor(rand(($sad-1), $sad) / 2)));
            } else if ($sad < 15) {
                $motivation = rand(3, (floor(rand(($sad-1), $sad) / 2)));
            } else if ($sad < 21) {
                $motivation = rand(4, (floor(rand(($sad-1), $sad) / 2)));
            } else if ($sad < 30) {
                $motivation = rand(6, (floor(rand(($sad-1), $sad) / 2)));
            } else {
                $motivation = rand(7, (floor(rand(($sad-1), $sad) / 2)));
            }

            if ($answered == 0) {
                $answered = $score;
            }
            
    
            $user = json_decode( file_get_contents('php://input') );
            $tablename = $user->tablename;
    
            $sql = "INSERT INTO $tablename (SessionID, SessionType, Score, TimeSpent, TimeStamp, TimeStart, ExpressionAngry, ExpressionHappy, ExpressionSad, ExpressionSurprised, ExpressionMotivation, Answered, Abandoned, LevelUp) 
                                VALUES(null, 'Easy', '$score', '0', :timestamp, :start_time, '$angry', '$happy', '$sad', '$surprised', '$motivation', '$answered', '$abandoned', '$levelup_status')";
    
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