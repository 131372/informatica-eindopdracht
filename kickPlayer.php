<?php
require_once "php/DatabaseConnection.php";

$db = new DatabaseConnection();

$result = $db->get("SELECT * FROM games WHERE id=:id",array(":id"=>$_POST['gameId']));
if($result[0]['guests']==""){
	$guests = "";
}
else{
	$guests=explode(",",$result[0]['guests']);
	foreach($guests as $key=>$guest){
		if($guest==$_POST['player']){
			unset($guests[$key]);
		}
	}
	$guests=array_values($guests);
	$guestList=$guests[0];
	for($i=1;$i<count($guests);$i++){
		$guestList.=",".$guests[$i];
	}
}
$db->change("UPDATE games SET guests=:guests WHERE id=:id",array(":id"=>$_POST['gameId'],":guests"=>$guestList));
?>