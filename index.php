<?php
session_start();
?>
<!DOCTYPE HTML>
<html>
	<head>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script>	
		//
		
		$(function(){
			hostName=$("#hostName").html();
			username=$("#username").html();
			gameId=$("#gameId").html();
			if(hostName!=""){
				$("#createGame").css("display","none");
				$("#username2").css("display","none");
				$("#games").css("display","none");
				$("#wait").css("display","block");
			}
			else if(username!=""){
				$("#createGame").css("display","none");
				$("#username2").css("display","none");
				$("#games").css("display","none");
				$("#wait").css("display","block");
			}
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
				console.log("destroy");
				$.ajax({
					url: "destroyGame.php"
				}).done(function(data) {
					console.log(data);
					$("#createGame").css("display","block");
					$("#username2").css("display","block");
					$("#games").css("display","block");
					$("#wait").css("display","none");
				});
				hostName="";
			}
			else{ // If you're just someone joining in you leave the game
				console.log("join");
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
		
		gameList=[];
		
		storage = setInterval(function(){
			$.ajax({
				url: "callDatabase.php"
			}).done(function(data) {
				console.log("reload");
				data = jQuery.parseJSON(data);
				currentGameList=[];
				jQuery.each(data, function(index, item) {
					currentGameList.push(item["id"]);
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
							playerHTML="";
						for(i=0;i<playerCount-1;i++){
							playerHTML+=guests[i]+"<button onclick='kick(\""+guests[i]+"\")'>kick</button></br>";		//why doesn't it work?? :(
						}
						$("#players").html("spelers:</br>"+item['hostName']+"</br>"+playerHTML);
					}
					else if(gameId==item['id']){
						guestList=item['guests'].split(",");
						if(jQuery.inArray(username,guestList)!=-1){
							$("#playerCount").html(playerCount);
							playerHTML="";
							for(i=0;i<playerCount-1;i++){
								playerHTML+=guests[i]+"</br>"
							}
							$("#players").html("spelers:</br>"+item['hostName']+"</br>"+playerHTML);
						}
						else{
							alert("je bent gekicked");
							//still need to add ajax to remove sessions
							hostName="";
							username="";
							gameId="";
							$("#createGame").css("display","block");
							$("#username2").css("display","block");
							$("#games").css("display","block");
							$("#wait").css("display","none");
						}
					}
					if($("#gameInstance"+item["id"]).length==0){
						$("#games").append($("<div id='gameInstance"+item['id']+"'>")
						.append("<span id='gameName"+item['id']+"'>"+item['gameName']
						+"</span></br><span id='hostName"+item['id']+"'>"+item['hostName']
						+"</span></br><span id='playerCount"+item['id']+"'>"+playerCount
						+"</span></br><button onclick='join("+item['id']+")'>join</button></br></br>"));
						if($.inArray(item["id"],gameList)==-1){
							gameList.push(item["id"]);
						}
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
				console.log(currentGameList+"/"+gameList);
				$.each(gameList,function(key, value){
					if($.inArray(value,currentGameList)==-1){
						$("#gameInstance"+value).remove();
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
				if(data=="fail"){
					alert("gebruikersnaam is al in gebruik");
				}
				else{
					$("#createGame").css("display","none");
					$("#username2").css("display","none");
					$("#games").css("display","none");
					$("#wait").css("display","block");
				}
			});
		}
				
		function kick(player){
			console.log(player);
			$.ajax({
				url: "kickPlayer.php",
				method:"POST",
				data:{"player":player,"gameId":gameId}
			}).done(function(data) {
				console.log(data);
			});
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
			<div id="players">
				spelers:</br>
			</div>
        </div>
            
	</body>
</html>