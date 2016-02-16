<?php
session_start();
?>
<!DOCTYPE HTML>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="cssinterface.css">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script src="js/cardInteraction.js"></script>
        <script src="js/playCombination.js"></script>
        <script src="js/turnProcessing.js"></script>
        <script src="js/updateUI.js"></script>
        <script src="js/indexHelper.js"></script>
        <script src="js/listofcombination.js"></script>
		<script src="js/scoreEachTurn.js"></script>
    </head>
    <body>
        <?php
        if (isset($_SESSION['hostName'])) {
            $hostName = $_SESSION['hostName'];
            echo "<span style='display:none' id='hostName'>$hostName</span>";
            echo "<span style='display:none' id='username'></span>";
        } else if (isset($_SESSION['username'])) {
            $username = $_SESSION['username'];
            echo "<span style='display:none' id='username'>$username</span>";
            echo "<span style='display:none' id='hostName'></span>";
        } else {
            echo "<span style='display:none' id='username'></span>";
            echo "<span style='display:none' id='hostName'></span>";
        }
        if (isset($_SESSION['gameId'])) {
            $gameId = $_SESSION['gameId'];
            echo "<span id='gameId' style='display:none'>$gameId</span>";
        } else {
            echo "<span id='gameId' style='display:none'></span>";
        }
        ?>	
        <div id="username2">
            gebruikersnaam:<input type="text" name="username" required></input></br></br>
        </div>

        <div id="createGame">
            spelnaam:<input type="text" name="gameName" required></input></br>
            speltype:</br>
            1:<input type="radio" name="gameType" value="1" required></input></br>
            2:<input type="radio" name="gameType" value="2" required></input></br>
            3:<input type="radio" name="gameType" value="3" required></input></br>
            4:<input type="radio" name="gameType" value="4" required></input></br>
            <button onclick="createGame()">maak spel</button></br></br>
        </div>

        <div id="games">

        </div>

        <div id="wait" style="display:none">
            wacht totdat er minimaal 3 spelers zijn, nu zijn er:<span id="playerCount">1</span>
            <button onclick="destroyGame()">verlaat spel</button>
            <button id="startGame" style="display:none" onclick="startGame()">start spel</button>
            <div id="players">
                spelers:</br>
            </div>
        </div>
        <div id="mainGame" style="display:none">
            <div id="Leave" >

                <button id="Leave" onclick="myFunction()">Leave</p>

                    <script>
                        //function myFunction() {
                        //document.getElementById("Leave").innerHTML = "LEAVE!";
                        //}
                    </script>

            </div> 

            <div id="Help" >
                <p><b>Help</b></p>
            </div> 

            <div id="TurnOrder" >
                <p><b>Turn order</b></p>
            </div> 

            <div id="Deck" >
                <p><b>Deck</b></p>
            </div> 

            <div id="Combination" >
                <p><b>Your combinations:</b></p>
            </div> 

            <div id="Cards" ondragover="allowDrop(event)" ondrop="dropInCards(event)">
                <p><b>Current cards played for combination</b></p> </br>
            </div> 

            <div id="Hand" ondragover="allowDrop(event)" ondrop="dropInHand(event)"></div> 

            <div id="Hint" >
                <p><b>Hint?</b></p>
            </div> 

            <div id="Combinationsoff" >
                <button onclick="showCombinations(1)">show combination of player 1</button>
                <button onclick="showCombinations(2)">show combination of player 2</button>
                <button onclick="showCombinations(3)">show combination of player 3</button>
            </div> 

            <div id="OtherCombinations"></div>

            <div id="Clear" >
                <p><b>Clear field</b></p>
            </div> 

            <div id="Play" >
            <!--<p>Play combination</p>-->
                <button onclick="playCombination()"><b>speel combinatie</b></button>
            </div> 

            <div id="Undo" >
                <button onclick="undoSteal()"><b>undo steal</b></button>
            </div> 

            <div id="End" >
                <p><b>End turn</b></p>
            </div>
            
            <div id="divlist">
                <button style="position:absolute" onclick="listOfCombinations()" id="listclick"><b>List of possible combinations</b></button>
                <div id="list" style="display:none">
                    The seen baryons and mesons have a symbol. The list of anti-baryons is symmetric to the list of seen baryons. <br>
                    Then, each quark is replaced with it's anti-version and the charge is reversed. 
                    <br>
                    <img src="images/Lijst met waargenomen baryonen goed.png" alt=""/>
                    <img src="images/Lijst met waargenomen mesonen goed.png" alt=""/>
            </div>

            </div>
        </div>
		<button id="Buycard" onclick="Getacard()"<p>Buy an extra card<p>
</body>
</html>