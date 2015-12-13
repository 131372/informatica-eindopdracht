<?php
session_start();
require_once "php/DatabaseConnection.php";

$db = new DatabaseConnection();

$result = $db->get("SELECT * FROM games");
echo JSON_encode($result);
?>