<?php 
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
 

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$requestID = $_SERVER['REQUEST_URI'];

for ($i = strlen($requestID) - 1; $i > 0; $i--) {
    if ($requestID[$i] == "/") {
        $requestID = substr($requestID, ($i + 1));
        break;
    }
}

$response = array();
$upload_dir = 'uploads/';
$server_url = 'http://localhost:80/Prototype-Vite/my-project/';
 
if($_FILES['avatar'])
{
    $avatar_name = $_FILES["avatar"]["name"];
    $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
    $error = $_FILES["avatar"]["error"];
 
    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }else
    {
        $random_name = rand(1000,1000000)."-".$avatar_name;
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
     
        if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
                "url" => $server_url."/".$upload_name
              );
               
            $host = "localhost"; 
            $user = "root"; 
            $password = ""; 
            $dbname = "prototype_sfe"; 
               
            $con = mysqli_connect($host, $user, $password,$dbname);  
 
            if (!$con) {
                die("Connection failed: " . mysqli_connect_error());
            }

            $query = "SELECT MessageID FROM ".$requestID." ORDER BY MessageID DESC LIMIT 1 ";    
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $last = $stmt->fetchColumn();

            $sql = "UPDATE ".$requestID." SET File = '$upload_name' WHERE MessageID = '$last'";

            //$sql = "insert into users (id, username, name, photo) values (null, 'cairocoders', 'cairocoders Ednalan', '$upload_name')"; 
            mysqli_query($con,$sql);
        }else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    }
 
}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}
 
echo json_encode($response);
?>