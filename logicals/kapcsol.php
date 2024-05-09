<?php
if(isset($_POST['email']) && isset($_POST['targy']) && isset($_POST['szoveg'])) 
{
    if(!empty($_POST['email']) && !empty($_POST['targy']) && !empty($_POST['szoveg']) && strpos($_POST['email'], '@') !== false)
    {
        try 
        {
            $dbh = new PDO('mysql:host=localhost;dbname=labor7', 'root', '',
                            array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
            $dbh->query('SET NAMES utf8 COLLATE utf8_hungarian_ci');
            
            $sqlInsert = "insert into email(id, email, targy, szoveg)
                            values(0, :email, :targy, :szoveg)";
            $stmt = $dbh->prepare($sqlInsert); 
            $stmt->execute(array(':email' => $_POST['email'], ':targy' => $_POST['targy'],
                                    ':szoveg' => $_POST['szoveg'])); 
            if($count = $stmt->rowCount()) {
                $newid = $dbh->lastInsertId();
                $uzenet = "Email: ". $_POST["email"]."<br>Tárgy: ".$_POST["targy"]."<br>Szöveg:<br>".$_POST["szoveg"];                     
                $ujra = false;
            }
            else {
                $uzenet = "Az email küldés sikerestelen.";  
                $ujra = true;
            }
            
        }
        catch (PDOException $e) {
            $uzenet = "Hiba: ".$e->getMessage();
            $ujra = true;
        }   
    }
    else
    {
        $uzenet = "Hiba: Nem megfelelően töltötted ki a mezőket";
        $ujra = true;
    }   
}
?>

