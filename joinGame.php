<?php
session_start();
require_once "php/DatabaseConnection.php";

$db = new DatabaseConnection();

$_SESSION['username']=$_POST['username'];
$_SESSION['gameId']=$_POST['gameId'];

$result = $db->get("SELECT * FROM games WHERE id=:id",array(":id"=>$_POST['gameId']));
if($result[0]['guests']==""){
	$guests = $_POST['username'];
}
else{
	$guestList=explode(",",$result[0]['guests']);
	foreach($guestList as $guest){
		if($guest==$_POST['username']){
			$_POST['username'];
			echo "fail";
			exit;
		}
	}
	$guests = $result[0]['guests'].",".$_POST['username'];
}
$db->change("UPDATE games SET guests=:guests WHERE id=:id",array(":id"=>$_POST['gameId'],":guests"=>$guests));
?>