<?php
header("Content-Type: application/json; charset=UTF-8");
$searchInput =  $_POST['userInput'];
$obj = json_decode($_GET["x"], false);
$conn = 'sqlite:/[PATH]/';
$dbh  = new PDO($conn) or die("cannot open the database");
$result = $dbh->prepare("SELECT filename, mimeID, isMalicious, scanDate FROM ".$obj->table WHERE md5= $searchInput);
$result->execute();
$outp = array();
/*FETCH_ASSOC returns all rows as an array indexed by column name*/
$outp = $result->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($outp);
?>