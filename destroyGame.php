<?php
session_start();
require_once "php/DatabaseConnection.php";

$db = new DatabaseConnection();

$db->change("DELETE FROM games WHERE id=:id",array(":id"=>$_SESSION['gameId']));

unset($_SESSION['hostName']);
unset($_SESSION['gameId']);
?>