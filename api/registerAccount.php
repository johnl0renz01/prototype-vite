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
        $sql = "INSERT INTO accounts(AccountID, GivenName, MiddleName, LastName, Birthdate, Age, Gender, GradeLevel, Section, GroupType, Email, Password) 
                VALUES(null, :firstName, :middleName, :lastName, :birthDay, :age, :sex, :gradeLevel, :section, :groupType, :email, :password)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':firstName', $user->firstName);
        $stmt->bindParam(':middleName', $user->middleName);
        $stmt->bindParam(':lastName', $user->lastName);

        $stmt->bindParam(':birthDay', $user->birthDay);
        $stmt->bindParam(':age', $user->age);
        $stmt->bindParam(':sex', $user->sex);

        $stmt->bindParam(':gradeLevel', $user->gradeLevel);
        $stmt->bindParam(':section', $user->section);
        $stmt->bindParam(':groupType', $user->groupType);

        $stmt->bindParam(':email', $user->email);
        
        //WITH HASH SECURITY
        $hashedPassword = password_hash($user->password, PASSWORD_DEFAULT);
        $stmt->bindParam(':password', $hashedPassword);

        //WITHOUT HASH SECURITY
        //$stmt->bindParam(':password', $user->password);
        
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE users SET name= :name, email =:email, mobile =:mobile, updated_at =:updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;
        
    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}



?>