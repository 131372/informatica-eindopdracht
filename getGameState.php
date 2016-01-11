<?php
session_start();
require_once "php/DatabaseConnection.php";

$db = new DatabaseConnection();

$result=$db->get("SELECT * FROM gamedata WHERE gameId=:gameId",array(":gameId"=>$_SESSION['gameId']));
if(count($result)>0){
	echo $result[count($result)-1]['gamedata'];
}
?>