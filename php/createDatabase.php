<?php
//code to automatically create the database and tables
try {
    $dbh = new PDO('mysql:host=localhost');
	$dbh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	$dbh->query("DROP DATABASE IF EXISTS test");
	$dbh->query("CREATE DATABASE test");
	$dbh->query("USE test");
	$dbh->exec("CREATE TABLE games(
		id INT(255) AUTO_INCREMENT PRIMARY KEY,
		gameName VARCHAR(255),
		hostName VARCHAR(255),
		guests VARCHAR(255),
		gameType VARCHAR(255)
	)");
} catch (PDOException $e) {
    echo $e->getMessage();
}


