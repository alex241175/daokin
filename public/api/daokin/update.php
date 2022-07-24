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
    $rite_id = $data->rite_id;
    $name = $data->name;
    $gender = $data->gender;
    $age = $data->age;
    $occupation = $data->occupation;
    $religion = $data->religion;
    $introducer = $data->introducer;
    $mentor = $data->mentor;
    $contact = $data->contact;
    $remark = $data->remark;
    $temple_id = $data->temple_id;

    $sql = "UPDATE daokins SET id = :id, rite_id = :rite_id, name = :name, gender = :gender, 
    age = :age, occupation = :occupation, religion = :religion, introducer = :introducer, mentor = :mentor,
    contact = :contact, remark = :remark, temple_id = :temple_id WHERE id = '$id'";

    try {
        $database = new Database();
        $db = $database->getConnection();
        $stmt = $db->prepare($sql);

        // bind data
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":rite_id", $rite_id);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":gender", $gender);
        $stmt->bindParam(":age", $age);
        $stmt->bindParam(":occupation", $occupation);
        $stmt->bindParam(":religion", $religion);
        $stmt->bindParam(":introducer", $introducer);
        $stmt->bindParam(":mentor", $mentor);
        $stmt->bindParam(":contact", $contact);
        $stmt->bindParam(":remark", $remark);
        $stmt->bindParam(":temple_id", $temple_id);

        $stmt->execute();
        echo json_encode(array("message"=>"更新完成。"));

    } catch (PDOException $e){

        echo json_encode(array("message"=>$e->getMessage()));
    }
?>