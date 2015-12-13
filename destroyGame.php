<?php
session_start();
require_once "php/DatabaseConnection.php";

$db = new DatabaseConnection();

$db->change("DELETE FROM games WHERE gameName=:gameName",array(":gameName"=>$_SESSION['gameName']));

unset($_SESSION['hostName']);
unset($_SESSION['gameId']);
?>