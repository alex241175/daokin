<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once '../../../database/config.php';

    $rite_id = isset($_GET['rite_id']) ? $_GET['rite_id'] : '';    // 1990
    
    $sql = "SELECT * FROM daokins WHERE rite_id = '$rite_id'";
 
    $sql .= " ORDER BY id";

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