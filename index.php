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
		<script>	
		
		gameInProgress=false;
		gameObject={
			currentPlayer:2,
			playerAmount:3,
			combinations:{},
			players:{1:"host",2:"guest1",3:"guest2"},
			hands:{1:{1:1,2:2},2:{1:1,2:2},3:{1:1,2:2}},
			points:{1:10,2:15,3:13}
		};
		
		function isTurn(){
			name=gameObject['players'][gameObject['currentPlayer']];
			if(name==username || name==hostName){
				return true;
			}
			return false;
		}
		
		$(function(){
			storage=setInterval(function(){
				if(gameInProgress){
					//if(gameObject['turn']==gameObject['player']){
						$.ajax({
							url: "getGameState.php"
						}).done(function(data){
							console.log(data);
							//gameObject=JSON.parse(data);
						});
					//}
				}
			},1000);
		});
		
		$(function(){
			hostName=$("#hostName").html();
			username=$("#username").html();			//get the host or username (can be empty if none exist)
			gameId=$("#gameId").html();				//get the game ID	(can be empty if none exist)
			if(hostName!="" || username!=""){
				$("#createGame").css("display","none");
				$("#username2").css("display","none");
				$("#games").css("display","none");
				$("#wait").css("display","block");
			}					//if the user is currently a host or a guest show the proper interface
		});
		
		function uploadGameData(gamedata){
			$.ajax({
				url: "uploadGameState.php",
				method: "POST",
				data: {"gameObject":gamedata}
			}).done(function(data) {
				console.log(data);
			});
		}
		
		function createGame(){
			$.ajax({
				url: "startGame.php",
				method: "POST",
				data: {"gameName":$("input[name=gameName]").val(),"gameType":$("input[name=gameType]:radio:checked").val(),"hostName":$("input[name=username]").val()}
			}).done(function(data) {			//after putting the new game in the database...
				if(data=="gameName"){
					alert("spelnaam is al in gebruik");
				}
				else if(data=="hostName"){
					alert("gebruikersnaam is al in gebruik");
				}					//show proper error messages if necessary
				else{
					$("#createGame").css("display","none");
					$("#username2").css("display","none");
					$("#games").css("display","none");
					$("#wait").css("display","block");				//hide and show the proper interfaces
					hostName=$("input[name=username]").val();			
					gameId=data;							//store the host name and the game id
					gameInProgress=true;					//!!!!!!!!!!!!!!!!!!!!!!!!!!!
				}
				
			});
		}
		
		function destroyGame(){			//destroy the game you're hosting or leave the game in which you are a guest
			if(hostName!=""){
				$.ajax({
					url: "destroyGame.php"
				}).done(function(data) {			//after deleting the game in the database...
					$("#createGame").css("display","block");
					$("#username2").css("display","block");
					$("#games").css("display","block");
					$("#wait").css("display","none");
				});				//show and hide the proper interfaces
				hostName="";				//remove the stored host name
			}
			else{
				$.ajax({
					url: "leaveGame.php"
				}).done(function(data) {			//after leaving the game in the database...
					$("#createGame").css("display","block");
					$("#username2").css("display","block");
					$("#games").css("display","block");
					$("#wait").css("display","none");
				});					//show and hide the proper interfaces
				username="";		
				gameId="";				//remove the stored username and gameId
			}
		}
		
		gameList=[];				//used to store all the games visually so as to be able to delete them if they get removed from the database
		
		storage = setInterval(function(){
			$.ajax({
				url: "callDatabase.php"
			}).done(function(data) {			//after receiving all games from the database...
				data = jQuery.parseJSON(data);		//decode the data
				currentGameList=[];					//used to store all games currently in the database so as to be able to remove all games that are no longer in the database
				jQuery.each(data, function(index, item) {
					currentGameList.push(item["id"]);				//add this game to all games currently in the database
					guests = item["guests"].split(",");
					if(guests[0]!=""){
						playerCount = (guests.length)+1;
					}
					else{
						playerCount = 1;
					}					//determine how many players are in the game (including the host)
					if(item['hostName']==hostName){ //if you're the host... of some game.
						$("#playerCount").html(playerCount);				//show player count
						playerHTML="";
						for(i=0;i<playerCount-1;i++){
							playerHTML+=guests[i]+"<button onclick='kick(\""+guests[i]+"\")'>kick</button></br>";		
						}
						$("#players").html("spelers:</br>"+item['hostName']+"</br>"+playerHTML);			//show all players and add a kick button to each one of them
					}
					else if(gameId==item['id']){				//if the user is a guest
						if(jQuery.inArray(username,guests)!=-1){			//if the user has not been kicked from the game...
							$("#playerCount").html(playerCount);			//show the player count
							playerHTML="";
							for(i=0;i<playerCount-1;i++){
								playerHTML+=guests[i]+"</br>"
							}
							$("#players").html("spelers:</br>"+item['hostName']+"</br>"+playerHTML);				//show all players
						}
						else{				//if the user has been kicked
							alert("je bent gekicked");
							$.ajax({
								url: "kick.php"
							}).done(function(data){
							
							});//still need to add ajax to remove sessions
							hostName="";
							username="";
							gameId="";				//reset stored data
							$("#createGame").css("display","block");
							$("#username2").css("display","block");
							$("#games").css("display","block");
							$("#wait").css("display","none");				//show and hide all the proper interfaces
						}
					}
					if($("#gameInstance"+item["id"]).length==0){			//if the game (option to select) is not yet visually present...
						$("#games").append($("<div id='gameInstance"+item['id']+"'>")
						.append("<span id='gameName"+item['id']+"'>"+item['gameName']
						+"</span></br><span id='hostName"+item['id']+"'>"+item['hostName']
						+"</span></br><span id='playerCount"+item['id']+"'>"+playerCount
						+"</span></br><button onclick='join("+item['id']+")'>join</button></br></br>"));		//create the game in the lobby
						if($.inArray(item["id"],gameList)==-1){
							gameList.push(item["id"]);
						}				//add the game to all games that were visually present at some point if it isn't there already
					}
					else{
						$("#gameName"+item["id"]).html(item['gameName']); 
						$("#hostName"+item["id"]).html(item['hostName']);
						$("#playerCount"+item["id"]).html(playerCount);
					}					//update the game information     , why no item['id'] in the update?             
                    if(item['hostName']==hostName){
                        if(playerCount >= 3){
                            $("#startGame").css("display","block");
                        }
                    }				//display start game button if enough players are present
				});
				$.each(gameList,function(key, value){
					if($.inArray(value,currentGameList)==-1){
						$("#gameInstance"+value).remove();
						gameList.splice(key,1);
					}
				});				//for each game that was created at some point remove it visually and remove it from memory (second part is untested)
			});
		},500);
		
		function join(id){
			username=$("input[name=username]").val();
			$.ajax({
				url: "joinGame.php",
				method:"POST",
				data:{"username":username,"gameId":id}
			}).done(function(data) {
				if(data=="fail"){
					alert("gebruikersnaam is al in gebruik");
				}
				else{
					gameId=data;
					$("#createGame").css("display","none");
					$("#username2").css("display","none");
					$("#games").css("display","none");
					$("#wait").css("display","block");
				}
			});
		}
				
		function kick(player){
			console.log(gameId);
			$.ajax({
				url: "kickPlayer.php",
				method:"POST",
				data:{"player":player,"gameId":gameId}
			}).done(function(data) {
				console.log(data);
			});
		}
		
		function endTurn(){
			if(gameObject['currentPlayer']!=gameObject['playerAmount']){
				gameObject['currentPlayer']++;
			}
			else{
				gameObject['currentPlayer']=1;
			}
			//code to update UI
		}
		</script>
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
            <button id="startGame" style="display:none" onclick="redirect()">start spel</button>
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

			<div id="Cards" >
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