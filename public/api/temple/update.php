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
    $host = $data->host;
    $school = $data->school;
    $address_c = $data->address_c;
    $id = $data->id;

    $sql = "UPDATE temples SET name = :name, host = :host, school = :school, address_c = :address_c WHERE id = '$id'";

    try {
        $database = new Database();
        $db = $database->getConnection();
        $stmt = $db->prepare($sql);

        // bind data
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":host", $host);
        $stmt->bindParam(":school", $school);
        $stmt->bindParam(":address_c", $address_c);

        $stmt->execute();
        echo json_encode(array("message"=>"更新完成。"));

    } catch (PDOException $e){

        echo json_encode(array("message"=>$e->getMessage()));
    }
?>