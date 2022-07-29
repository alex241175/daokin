<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once '../../../database/config.php';

    $daokin = isset($_GET['daokin']) ? $_GET['daokin'] : '';    // 戴俊棋
    $introducer = isset($_GET['introducer']) ? $_GET['introducer'] : '';    // 戴俊棋
    
    $sql = "SELECT * FROM daokins WHERE ";
    
    if ($daokin) {
        $sql .= " name LIKE '%$daokin%' AND ";
    }
    if ($introducer) {
        $sql .= " introducer LIKE '%$introducer%' AND ";
    }
    // remove ending AND
    $sql = substr($sql, 0, -4);
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