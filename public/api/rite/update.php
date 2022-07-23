<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../../../database/config.php';
    
    // get data from http request body
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;
    $temple_id = $data->temple_id;
    $year_e = $data->year_e;
    $year_c = $data->year_c;
    $month_c = $data->month_c;
    $day_c = $data->day_c;
    $hour_c = $data->hour_c;
    $date_e = $data->date_e;
    $master = $data->master;
    $guarantor = $data->guarantor;
    $upline = $data->upline;
    $downline = $data->downline;
    $three_treasure = $data->three_treasure;
    $introduction = $data->introduction;
    $total = $data->total;
    $address_c = $data->address_c;

    $sql = "UPDATE rites SET id = :id, temple_id = :temple_id, year_e = :year_e, year_c = :year_c, 
    month_c = :month_c, day_c = :day_c, hour_c = :hour_c, date_e = :date_e, master = :master,
    guarantor = :guarantor, upline = :upline, downline = :downline, three_treasure = :three_treasure, 
    introduction = :introduction, total = :total, address_c = :address_c WHERE id = '$id'";

    try {
        $database = new Database();
        $db = $database->getConnection();
        $stmt = $db->prepare($sql);

        // bind data
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":temple_id", $temple_id);
        $stmt->bindParam(":year_e", $year_e);
        $stmt->bindParam(":year_c", $year_c);
        $stmt->bindParam(":month_c", $month_c);
        $stmt->bindParam(":day_c", $day_c);
        $stmt->bindParam(":hour_c", $hour_c);
        $stmt->bindParam(":date_e", $date_e);
        $stmt->bindParam(":master", $master);
        $stmt->bindParam(":guarantor", $guarantor);
        $stmt->bindParam(":upline", $upline);
        $stmt->bindParam(":downline", $downline);
        $stmt->bindParam(":three_treasure", $three_treasure);
        $stmt->bindParam(":introduction", $introduction);
        $stmt->bindParam(":total", $total);
        $stmt->bindParam(":address_c", $address_c);

        $stmt->execute();
        echo json_encode(array("message"=>"更新完成。"));

    } catch (PDOException $e){

        echo json_encode(array("message"=>$e->getMessage()));
    }
?>