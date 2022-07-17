<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once '../../../database/config.php';

    $sql = "SELECT * FROM User";

    try{
        $database = new Database();
        $db = $database->getConnection();

        $stmt = $db->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($users);

    }catch(PDOException $e){
        $rtn = array("id", "3", "error", $e->getMessage());
        http_response_code(500);
        echo json_encode($rtn);
    }
  
?>