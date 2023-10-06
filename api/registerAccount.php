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
        $sql = "SELECT * FROM accounts";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        
        if(isset($path[5]) && is_numeric($path[5])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[5]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $role = $user->role;

        $sql = "INSERT INTO accounts(AccountID, GivenName, MiddleName, LastName, Gender, GradeLevel, Section, GroupType, Email, Password, Role) 
                VALUES(null, :firstName, :middleName, :lastName, :sex, :gradeLevel, :section, :groupType, :email, :password, :role)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':firstName', $user->firstName);
        $stmt->bindParam(':middleName', $user->middleName);
        $stmt->bindParam(':lastName', $user->lastName);

        
        //$stmt->bindParam(':birthDay', $user->birthDay);
        //$stmt->bindParam(':age', $user->age);
        $stmt->bindParam(':sex', $user->sex);

        $stmt->bindParam(':gradeLevel', $user->gradeLevel);
        $stmt->bindParam(':section', $user->section);
        $stmt->bindParam(':groupType', $user->groupType);

        $stmt->bindParam(':email', $user->email);
        
        //WITH HASH SECURITY
        
        $hashedPassword = password_hash($user->password, PASSWORD_DEFAULT);
        $stmt->bindParam(':password', $hashedPassword);

        $stmt->bindParam(':role', $user->role);

        //WITHOUT HASH SECURITY
        //$stmt->bindParam(':password', $user->password);
        
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }

        
        $userTable = $user->email;
        echo "\n".$userTable;
        $atSign = strpos($userTable, "@");
        echo "\n".$atSign;
        $userTable = substr($userTable, 0, $atSign);
        echo "\n".$userTable;
        $userTable = str_replace(".", "_", $userTable);
        echo "\n".$userTable;

        if($role == "Student") {
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
                LevelUp VARCHAR(255) NOT NULL
                )";

            $conn->exec($create);
            echo "\nTable created successfully";
        } else {
            $teacherTable = $userTable."_equation_list";
            $create = "CREATE TABLE ".$teacherTable." (
                EquationID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY   , 
                EquationType VARCHAR(255) NOT NULL , 
                EquationString VARCHAR(255) NOT NULL
                )";

            $conn->exec($create);

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
        }

        echo "\n".json_encode($response);
        break;

    case "PUT":
        break;
        
    case "DELETE":
        break;
}



?>