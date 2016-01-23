<?php
session_start();
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if(isset($_SESSION['gameInProgress'])){
    if($_SESSION['gameInProgress']){
        echo true; // or should I echo string version?
    } else {
        echo false;
    }
} else {
    echo false;
}