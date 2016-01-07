<?php
session_start();
require_once "php/DatabaseConnection.php";

$db = new DatabaseConnection();

$result=$db->get("SELECT * FROM gamedata WHERE gameId=:gameId",array(":gameId"=>$_SESSION['gameId']));
if(isset($result[0])){
	echo $result[0]['gamedata'];
}
?>