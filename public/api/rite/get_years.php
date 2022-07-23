<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once '../../../database/config.php';
    
    $sql = "SELECT * FROM years";

    try{
        $database = new Database();
        $db = $database->getConnection();

        $stmt = $db->query($sql);
        $items = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($items);

    }catch(PDOException $e){
        echo json_encode(array("message"=>$e->getMessage()));
    }
  
?>