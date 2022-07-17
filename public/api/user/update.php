<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../../../database/config.php';
    
    // get data from http request body
    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;
    $password = $data->password;
    $role = $data->role;
    $id = $data->id;

    $sql = "UPDATE User SET name = :name, password = :password, role = :role WHERE id = $id";

    try {
        $database = new Database();
        $db = $database->getConnection();
        $stmt = $db->prepare($sql);

        // bind data
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":password", $password);
        $stmt->bindParam(":role", $role);

        $stmt->execute();
        echo json_encode(array("message"=>"user updated"));

    } catch (PDOException $e){

        echo json_encode(array("message"=>$e->getMessage()));
    }
?>