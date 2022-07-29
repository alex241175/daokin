<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include_once '../../../database/config.php';
  
    // get data from request
    $data = json_decode(file_get_contents("php://input"));
    $username = $data->username;
    $password = $data->password;

    try {
        $sql = "SELECT * FROM users WHERE name = :username";
        $database = new Database();
        $db = $database->getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(":username", $username);
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_OBJ);

        if (count($items) == 0 ){
            echo json_encode(array("message"=>"user name not exist"));
        } else {
            $sql = "SELECT * FROM users WHERE name = :username AND password = :password ";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(":username", $username);
            $stmt->bindParam(":password", $password);
            $stmt->execute();

            $items = $stmt->fetchAll(PDO::FETCH_OBJ);
            if (count($items) == 0 ){
                echo json_encode(array("message"=>"password incorrect"));
            }else{
                echo json_encode(array("message"=>"success"));
            }
        }

    } catch (PDOException $e){

        echo json_encode(array("message"=>$e->getMessage()));
    }
?>