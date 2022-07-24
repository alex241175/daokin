<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../../../database/config.php';
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;

    $sql = "DELETE FROM daokins WHERE id = '$id'";

    try{
        $database = new Database();
        $db = $database->getConnection();

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo json_encode(array("message"=>"刪除完成。"));
    } catch(PDOException $e){
        echo json_encode(array("message"=>$e->getMessage()));
    }
?>