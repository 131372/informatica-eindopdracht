<?php
session_start();
require_once "php/DatabaseConnection.php";

$db = new DatabaseConnection();

$results1 = $db->get("SELECT * FROM games WHERE gameName=:gameName",array(":gameName"=>$_POST['gameName']));
$results2 = $db->get("SELECT * FROM games WHERE hostName=:hostName",array(":hostName"=>$_POST['hostName']));
if(count($results1)>0){
	echo "gameName";//JSON_encode(array("status"=>"gameName"));
}
else if(count($results2)>0){
	echo "hostName";//JSON_encode(array("status"=>"hostName"));
}
else{
	$db->change("INSERT INTO games (gameName,hostName,gameType,guests) VALUES (:gameName,:hostName,:gameType,'')",array(":hostName"=>$_POST['hostName'],":gameName"=>$_POST['gameName'],":gameType"=>$_POST['gameType']));
	$_SESSION['hostName']=$_POST['hostName'];
	$result = $db->get("SELECT * FROM games WHERE hostName=:hostName",array(":hostName"=>$_POST['hostName']));
	$_SESSION['gameId']=$result[0]['id'];
	echo $_SESSION['gameId'];
}
?>