<?php
header("Content-Type: application/json");
include_once 'database.tpl.php';

$sql = "SELECT * FROM nezo";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$nev = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($nev);
?>