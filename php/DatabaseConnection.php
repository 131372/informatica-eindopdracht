<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DatabaseConnection
 * Makes a connection with the database on creation of instance.
 * @author Ryan Schoop
 */
class DatabaseConnection {
    protected $dbh;

    public function __construct() {
        try {
            $this->dbh = new PDO('mysql:dbname=test;host=localhost');
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    /*
     * returns dbh
     */

    public function getDBH() {
        return $this->dbh;
    }
	
	/*
	 * makes select queries a bit easier and returns the result
	 */
	
	public function get($query,$binds=array()){
		$get = $this->dbh->prepare($query);
		foreach($binds as $key=>$value){
			$get->bindValue($key,$value,PDO::PARAM_STR);
		}
		$get->execute();
		return $get->fetchAll();
	}
	
	/*
	 * makes all other queries a bit easier
	 */
	
	public function change($query,$binds=array()){
		$get = $this->dbh->prepare($query);
		print_r($binds);
		foreach($binds as $key=>$value){
			echo $key."/".$value."</br>";
			$get->bindValue($key,$value,PDO::PARAM_STR); 
		}
		$get->execute();
	}
	
    /*
     * closes db connection.
     * Isn't a destructor usefull too?
     */

    public function closeConnection() {
        $this->dbh = null;
    }
    
    
    
}
