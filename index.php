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
	</head>
	<body>
		<?php
			if(isset($_SESSION['hostName'])){
				$hostName=$_SESSION['hostName'];
				echo "<span style='display:none' id='hostName'>$hostName</span>";
				echo "<span style='display:none' id='username'></span>";
			}
			else if(isset($_SESSION['username'])){
				$username=$_SESSION['username'];
				echo "<span style='display:none' id='username'>$username</span>";
				echo "<span style='display:none' id='hostName'></span>";
			}
			else{
				echo "<span style='display:none' id='username'></span>";
				echo "<span style='display:none' id='hostName'></span>";
			}
			if(isset($_SESSION['gameId'])){
				$gameId=$_SESSION['gameId'];
				echo "<span id='gameId' style='display:none'>$gameId</span>";
			}
			else{
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
		<div id="mainGame" style="display:block">	
			<div id="Leave" >

			<button id="Leave" onclick="myFunction()">Leave</p>

			<script>
				//function myFunction() {
				//document.getElementById("Leave").innerHTML = "LEAVE!";
				//}
			</script>

			</div> 

			<div id="Help" >
			<p>Help</p>
			</div> 

			<div id="TurnOrder" >
			<p>Turn order</p>
			</div> 

			<div id="Deck" >
			<p>Deck</p>
			</div> 

			<div id="Combination" >
			<p>Your combinations:</p>
			</div> 

			<div id="Cards" ondragover="ev.preventDefault()" ondrop="drop()">
                            <p>Current cards played for combination</p> </br>
			</div> 

			<div id="Hand" ></div> 

			<div id="Hint" >
			<p>Hint?</p>
			</div> 

			<div id="Combinationsoff" >
			<p>Combinations off:</p>
			</div> 

			<div id="Player2" ></div> 

			<div id="Player3" ></div> 

			<div id="Player4" ></div> 

			<div id="Player5" ></div> 

			<div id="Player6" ></div> 

			<div id="Clear" >
			<p>Clear field</p>
			</div> 

			<div id="Play" >
			<p>Play combination</p>
			</div> 

			<div id="Undo" >
			<p>Undo steal</p>
			</div> 

			<div id="End" >
			<p>End turn</p>
			</div>
		</div>
		
	</body>
</html>