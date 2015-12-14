<!DOCTYPE HTML>
<html>
	<head>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script>		
		$(function(){
			hostName=$("#hostName").html();
			username=$("#username").html();
			gameName=$("#gameId").html();
		});
		
		function createGame(){
			$.ajax({
				url: "startGame.php",
				method: "POST",
				data: {"gameName":$("input[name=gameName]").val(),"gameType":$("input[name=gameType]:radio:checked").val(),"hostName":$("input[name=hostName]").val()}
			}).done(function(data) {
                            // For some reason this error might occur when putting something around here: Warning: session_start(): Cannot send session cache limiter - headers already sent
                                if(data=="succes"){
					$("#createGame").css("display","none");
					$("#username2").css("display","none");
					$("#games").css("display","none");
					$("#wait").css("display","block");
				}
				else if(data=="gameName"){
					alert("spelnaam is al in gebruik");
				}
				else if(data=="hostName"){
					alert("gebruikersnaam is al in gebruik");
				}
				hostName=$("input[name=hostName]").val();
				username=$("input[name=username]").val();
			});
		}
		
		function destroyGame(){
			if(hostName!=""){ // If you're host you destroy the game
				$.ajax({
					url: "destroyGame.php"
				}).done(function(data) {
					$("#createGame").css("display","block");
					$("#username2").css("display","block");
					$("#games").css("display","block");
					$("#wait").css("display","none");
				});
				hostName="";
			}
			else{ // If you're just someone joining in you leave the game
				$.ajax({
					url: "leaveGame.php"
				}).done(function(data) {
					console.log(data);
					$("#createGame").css("display","block");
					$("#username2").css("display","block");
					$("#games").css("display","block");
					$("#wait").css("display","none");
				});
				username="";
			}
		}
		
		storage = setInterval(function(){
			$.ajax({
				url: "callDatabase.php"
			}).done(function(data) {
				data = jQuery.parseJSON(data);
				games={};
				jQuery.each(data, function(index, item) {
					games[item['id']]=item;
					guests = item["guests"].split(",");
					if(guests[0]!=""){
						playerCount = (guests.length)+1;
					}
					else{
						playerCount = 1;
					}
					if(item['hostName']==hostName){ // Show playercount if you're the host
						$("#playerCount").html(playerCount);
					}
					else{
						guestList=item['guests'].split(",");
						if(jQuery.inArray(username,guestList)!=-1){
							$("#playerCount").html(playerCount);
						}
					}
					if($("#gameInstance"+item["id"]).length==0){
						$("#games").append($("<div id='gameInstance"+item['id']+"'>").append("<span id='gameName"+item['id']+"'>"+item['gameName']+"</span></br><span id='hostName"+item['id']+"'>"+item['hostName']+"</span></br><span id='playerCount"+item['id']+"'>"+playerCount+"</span></br><button onclick='join("+item['id']+")'>join</button></br></br>"));
					}
					else{
						$("#gameName"+item["id"]).html(item['gameName']);
						$("#hostName"+item["id"]).html(item['hostName']);
						$("#playerCount"+item["id"]).html(playerCount);
					}
                                        
                                       if(item['hostName']==hostName){
                                            if(playerCount >= 3){
                                                $("#startGame").css("display","block");
                                            }
                                        }
				});
			});
		},500);
		
		function join(id){
			username=$("input[name=hostName]").val();
			$.ajax({
				url: "joinGame.php",
				method:"POST",
				data:{"username":username,"gameId":id}
			}).done(function(data) {
				console.log(data);
				$("#createGame").css("display","none");
				$("#username2").css("display","none");
				$("#games").css("display","none");
				$("#wait").css("display","block");
			});
		}
                
                function redirect(){
                    window.location.replace("PATH_TO_GAME_FILE");
                }
		</script>
	</head>
	<body>
		<?php
			session_start();
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
				echo "<span id='gameId'>$gameId</span>";
			}
			else{
				echo "<span id='gameId'></span>";
			}
		?>	
		<div id="username2">
			gebruikersnaam:<input type="text" name="hostName" required></input></br></br>
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
                </div>
            
	</body>
</html>