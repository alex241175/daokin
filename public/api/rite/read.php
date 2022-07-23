<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once '../../../database/config.php';

    $year = isset($_GET['year']) ? $_GET['year'] : '';    // 1990
    $temple = isset($_GET['temple']) ? $_GET['temple'] : '';  // temple_id

    
    $sql = "SELECT rites.*, temples.name AS 'temple' FROM rites INNER JOIN temples WHERE rites.temple_id = temples.id AND ";
    
    if ($year) {
        $sql .= "LEFT(rites.id,4) = '$year' AND ";
    }
    if ($temple) {
        $sql .= "rites.temple_id = '$temple' AND ";
    }
    // remove ending AND
    $sql = substr($sql, 0, -4);
    $sql .= " ORDER BY rites.id DESC";

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