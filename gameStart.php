<?php
require_once "php/DatabaseConnection.php";
session_start();
$db = new DatabaseConnection();
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$_SESSION['gameInProgress'] = true;

$db->change("UPDATE gamedata SET gamedata=:gamedata WHERE gameid=:gameId", array(":gamedata"=>$_POST['gameObject'], ":gameId"=>$_POST['gameId']));