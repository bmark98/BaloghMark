<?php
    try {
        
        $dbh = new PDO('mysql:host=localhost;dbname=labor7', 'root', '',
                        array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
        $dbh->query('SET NAMES utf8 COLLATE utf8_hungarian_ci');
        
       
        $sqlSelect = "select * from email";
        $sth = $dbh->prepare($sqlSelect);
        $sth->execute();
        
        while($row = $sth->fetch(PDO::FETCH_ASSOC)) {
            echo "Email: ".$row["email"] . "<br>" . "Tárgy: ". $row["targy"] . "<br>". "Szöveg: <br>" . $row["szoveg"] . "<br><hr>";
        }
    }
    catch (PDOException $e) {
        $errormessage = "Hiba: ".$e->getMessage();
    }      
?>