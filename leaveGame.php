<?php
session_start();
require_once "php/DatabaseConnection.php";

$db = new DatabaseConnection();

$result = $db->get("SELECT * FROM games WHERE id=:id",array(":id"=>$_SESSION['gameId']));
$result = $result[0]['guests'];
$result = explode(",",$result);
foreach($result as $key=>$guest){
	if($guest==$_SESSION['username']){
		unset($result[$key]);
	}
}
$result=array_values($result);
$guests=$result[0];
for($i=1;$i<count($result);$i++){
	$guests.=",".$result[$i];
}
$db->change("UPDATE games SET guests=:guests WHERE id=:id",array(":id"=>$_SESSION['gameId'],":guests"=>$guests));

unset($_SESSION['username']);
unset($_SESSION['gameId']);
?>