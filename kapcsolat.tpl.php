<?php
header("Content-Type: application/json");
include_once '../database.tpl.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = $data->id;

    $sql = "DELETE FROM nezo WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Sikeres törlés"]);
    } else {
        echo json_encode(["message" => "Sikertelen törlés"]);
    }
} else {
    echo json_encode(["message" => "Rossz adat"]);
}
?>