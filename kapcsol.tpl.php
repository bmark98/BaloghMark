<?php
$host = 'mysql.nethely.hu';
$dbname = 'nezok';
$username = 'nezok';
$password = 'muokrzhallgatonje';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>