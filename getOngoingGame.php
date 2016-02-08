<?php
session_start();
require_once "php/DatabaseConnection.php";

$db = new DatabaseConnection();

//print_r($_POST);

if(isset($_SESSION['gameInProgress'])){
    if($_SESSION['gameInProgress']){
        echo true; // or should I echo string version?
    } else {
        echo false;
    }
} else {
    $result = $db->get("SELECT * FROM gamedata WHERE gameId=:gameId", array(":gameId" => $_POST['gameId']));
    echo $result[0]['gamedata'];
}