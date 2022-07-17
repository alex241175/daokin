<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include_once '../../../database/config.php';

    $id = isset($_GET['id']) ? $_GET['id'] : die();
  
    $sql = "SELECT * FROM User WHERE id = $id";

    try{
        $database = new Database();
        $db = $database->getConnection();

        $stmt = $db->query($sql);
        $user = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($user);
    } catch(PDOException $e){
        echo json_encode(array("message"=>$e->getMessage()));
    }
?>