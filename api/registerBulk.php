<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$accounts = $_SERVER['REQUEST_URI'];

for ($i = strlen($accounts) - 1; $i > 0; $i--) {
    if ($accounts[$i] == "/") {
        $accounts = substr($accounts, ($i + 1));
        break;
    }
}

$accounts_str = "";
$accounts_str = strval($accounts);
$all_accounts = explode(',', $accounts_str);


$password = "default";

function random_str(
    int $length = 64,
    string $keyspace = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
): string {
    if ($length < 1) {
        throw new \RangeException("Length must be a positive integer");
    }
    $pieces = [];
    $max = mb_strlen($keyspace, '8bit') - 1;
    for ($i = 0; $i < $length; ++$i) {
        $pieces []= $keyspace[random_int(0, $max)];
    }
    return implode('', $pieces);
}

switch($_SESSION['method']) {
    case "GET":
        
        break;
    case "POST":
        $response = "";
        for ($index = 0; $index < count($all_accounts); $index ++) {
            $first_name = $all_accounts[$index];

            for ($i = strlen($first_name) - 1; $i > 0; $i--) {
                if ($first_name[$i] == "/") {
                    $first_name = substr($first_name, ($i + 1));
                    break;
                }
            }

            $section_name = "";
            $grade_level = "";
            $role = "";
            $gender = "";
            $last_name = "";
            $middle_name = "";

            //FOR SECTION NAME
            for ($i = strlen($first_name) - 1; $i > 0; $i--) {
                if ($first_name[$i] == "@") {
                    $section_name = substr($first_name, ($i + 1));
                    $section_name = str_replace("_"," ", $section_name);
                    $first_name = substr($first_name, 0, $i);
                    break;
                }
            }

            //FOR GRADE LEVEL
            for ($i = strlen($first_name) - 1; $i > 0; $i--) {
                if ($first_name[$i] == "@") {
                    $grade_level = substr($first_name, ($i + 1));
                    $first_name = substr($first_name, 0, $i);
                    break;
                }
            }

            //FOR ROLE
            for ($i = strlen($first_name) - 1; $i > 0; $i--) {
                if ($first_name[$i] == "@") {
                    $role = substr($first_name, ($i + 1));
                    $first_name = substr($first_name, 0, $i);
                    break;
                }
            }

            //FOR GENDER
            for ($i = strlen($first_name) - 1; $i > 0; $i--) {
                if ($first_name[$i] == "@") {
                    $gender = substr($first_name, ($i + 1));
                    $first_name = substr($first_name, 0, $i);
                    break;
                }
            }

            //FOR LAST NAME
            for ($i = strlen($first_name) - 1; $i > 0; $i--) {
                if ($first_name[$i] == "@") {
                    $last_name = substr($first_name, ($i + 1));
                    $last_name = str_replace("_"," ", $last_name);
                    $first_name = substr($first_name, 0, $i);
                    break;
                }
            }


            //FOR MIDDLE NAME
            for ($i = strlen($first_name) - 1; $i > 0; $i--) {
                if ($first_name[$i] == "@") {
                    $middle_name = substr($first_name, ($i + 1));
                    $middle_name = str_replace("_"," ", $middle_name);
                    $first_name = substr($first_name, 0, $i);
                    $first_name = str_replace("_"," ", $first_name);
                    break;
                }
            }

            /*
            if ($role == "Teacher") {
                $section_name = "NA";
            }
            */

            $code = random_str(8);
            $false = "FALSE";

            echo "\n".json_encode($first_name." ".$middle_name." ".$last_name." ".$grade_level." ".$section_name." ".$gender." ".$role." ");

            //START HERE
            $user = json_decode( file_get_contents('php://input') );
            
            $group_type = "";
        
            //MIDDLE NAME BLANK
            if ($middle_name == "Blank") {
                $middle_name = "";
            }

            //FOR EMAIL
            $lower_fname = strtolower($first_name);
            $lower_fname = str_replace(' ', '', $lower_fname);

            $lower_lname = strtolower($last_name);
            $lower_lname = str_replace(' ', '', $lower_lname);

            $email = $lower_lname . "." . $lower_fname . "@sfe.edu.ph" ;

            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            ///

            $grade_level_string = "";
            
            $section_string = "";
            $section_string = $section_name;

            $adviser_name = "";

            $registered = false;

            if ($role == "Student") {
                $group_type = "Facial Group";
                $grade_level_string = "Grade " . $grade_level;
                
            } else {
                $gender = "";
                // FOR SECTION
                if ($middle_name == "") {
                    $adviser_name = $first_name . " " . $last_name;
                } else {
                    $adviser_name = $first_name . " " . $middle_name . " " . $last_name;
                }
                

                $sqlSection = "INSERT INTO section_list(SectionID, GradeLevel, SectionName, AdviserName, Code, Seen) 
                VALUES(null, '$grade_level', '$section_name', '$adviser_name', '$code', '$false')";
                $stmtSection = $conn->prepare($sqlSection);
                $stmtSection->execute();

                $sqlVerify = "SELECT * FROM accounts WHERE Email = '$email'";
                $stmtVerify = $conn->prepare($sqlVerify);

                $stmtVerify->execute();
                $account = $stmtVerify->fetchAll(PDO::FETCH_ASSOC);
                

                if (count($account) > 0) {
                    $registered = true;
                    continue;
                } else {
                    $registered = false;
                }
            }

            // FOR REGISTER

            if ($registered == false) {
                if ($role == "Teacher") {
                    $sql = "INSERT INTO accounts(AccountID, GivenName, MiddleName, LastName, Gender, GradeLevel, Section, GroupType, Email, Password, Role) 
                    VALUES(null, '$first_name', '$middle_name', '$last_name', '$gender', '$grade_level_string', 'NA', '$group_type', '$email', '$hashedPassword', '$role')";
                    $stmt = $conn->prepare($sql);
                    $stmt->execute();
                } else {
                    $sql = "INSERT INTO accounts(AccountID, GivenName, MiddleName, LastName, Gender, GradeLevel, Section, GroupType, Email, Password, Role) 
                    VALUES(null, '$first_name', '$middle_name', '$last_name', '$gender', '$grade_level_string', '$section_string', '$group_type', '$email', '$hashedPassword', '$role')";
                    $stmt = $conn->prepare($sql);
                    $stmt->execute();
                }
              
            
            } else {
                $registered = false;
            }

            $userTable = $email;
            echo "\n".$userTable;
            $atSign = strpos($userTable, "@");
            echo "\n".$atSign;
            $userTable = substr($userTable, 0, $atSign);
            echo "\n".$userTable;
            $userTable = str_replace(".", "_", $userTable);
            echo "\n".$userTable;

            if($role == "Student") {
                try {
                    $connect = new mysqli('localhost','root','','prototype_sfe');
                    $create = "CREATE TABLE ".$userTable." (
                        SessionID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY   , 
                        SessionType VARCHAR(255) NOT NULL , 
                        Score INT NOT NULL , 
                        TimeSpent VARCHAR(255) NOT NULL , 
                        TimeStamp VARCHAR(255) NOT NULL ,
                        TimeStart VARCHAR(255) NOT NULL ,
                        ExpressionAngry VARCHAR(255) NOT NULL ,
                        ExpressionHappy VARCHAR(255) NOT NULL ,
                        ExpressionSad VARCHAR(255) NOT NULL ,
                        ExpressionSurprised VARCHAR(255) NOT NULL ,
                        ExpressionMotivation VARCHAR(255) NOT NULL ,
                        Sequence TEXT NOT NULL ,
                        Answered VARCHAR(255) NOT NULL ,
                        Abandoned VARCHAR(255) NOT NULL ,
                        LevelUp VARCHAR(255) NOT NULL ,
                        LevelDown VARCHAR(255) NOT NULL
                        )";

                    $conn->exec($create);
                    echo "\nTable created successfully";
                } catch (Exception $e) {
                 
                }
            } else {
                try {
                    $connect = new mysqli('localhost','root','','prototype_sfe');

                    $teacherTable = $userTable."_equation_list";
                    $create = "CREATE TABLE ".$teacherTable." (
                        EquationID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY   , 
                        EquationType VARCHAR(255) NOT NULL , 
                        EquationString VARCHAR(255) NOT NULL
                        )";

                    $conn->exec($create);

                    $connect = new mysqli('localhost','root','','prototype_sfe');
                    $teacherTable2 = $userTable."_equation_settings";
                    $create2 = "CREATE TABLE ".$teacherTable2." (
                        SettingID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY   , 
                        OccurrenceValue VARCHAR(255) NOT NULL , 
                        PrioritizeEquation VARCHAR(255) NOT NULL ,
                        FractionEquation VARCHAR(255) NOT NULL ,
                        MinimumValue VARCHAR(255) NOT NULL ,
                        MaximumValue VARCHAR(255) NOT NULL ,
                        DifferentVariables VARCHAR(255) NOT NULL
                        )";

                    $conn->exec($create2);
                    echo "\nTable created successfully";

                    $settings = "INSERT INTO ".$teacherTable2."(SettingID, OccurrenceValue, PrioritizeEquation, FractionEquation, MinimumValue, MaximumValue, DifferentVariables) 
                            VALUES(null, '50', 'FALSE', 'FALSE', '1', '10', 'FALSE')";
                    $stmtSettings = $conn->prepare($settings);
                    $stmtSettings->execute();
                } catch (Exception $e) {
                }
            }
           
        }
        echo "\n".json_encode($response);
        break;
    case "PUT":
        break; 
    case "DELETE":
        break;
}



?>