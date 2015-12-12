<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of customException
 *
 * @author Ryan Schoop
 */
class CustomException extends Exception {

    public function printErrorMessage() {
        echo '<pre>';
        echo 'Regel: ' . $this->getLine() . '<br>';
        echo 'Bestand: ' . $this->getFile() . '<br>';
        echo 'Foutmelding: ' . $this->getMessage();
        echo '</pre>';
    }

}
