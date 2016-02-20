function scoreEachTurn(){
	keys = Array("countU" , "countC", "countD", "countB", "countS", "countAntiU", "countAntiC", "countAntiD", "countAntiB", "countAntiS");
	waargenomenHadronen = Array({countU:3, countC:0, countD:0, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0}, 
	{countU:2, countC:1, countD:0, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0}, 
	{countU:1, countC:2, countD:0, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:3, countD:0, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:2, countC:0, countD:1, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:1, countC:1, countD:1, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:2, countC:0, countD:0, countB:0, countS:1, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:1, countC:1, countD:0, countB:0, countS:1, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:2, countD:1, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:2, countD:0, countB:0, countS:1, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:1, countC:0, countD:2, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:1, countC:0, countD:1, countB:0, countS:1, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:1, countC:0, countD:1, countB:1, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:1, countC:0, countD:0, countB:0, countS:2, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:1, countC:0, countD:0, countB:1, countS:1, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:1, countD:2, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:1, countD:1, countB:0, countS:1, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:0, countB:0, countS:2, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:3, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:2, countB:0, countS:1, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:1, countB:0, countS:2, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:1, countC:0, countD:0, countB:1, countS:1, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:0, countB:0, countS:3, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	
	{countAntiU:3, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0, countU: 0, countC:0, countD:0, countB:0, countS:0}, 
	{countAntiU:2, countAntiC:1, countAntiD:0, countAntiB:0, countAntiS:0, countU: 0, countC:0, countD:0, countB:0, countS:0}, 
	{countAntiU:1, countAntiC:2, countAntiD:0, countAntiB:0, countAntiS:0, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:0, countAntiC:3, countAntiD:0, countAntiB:0, countAntiS:0, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:2, countAntiC:0, countAntiD:1, countAntiB:0, countAntiS:0, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:1, countAntiC:1, countAntiD:1, countAntiB:0, countAntiS:0, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:2, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:1, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:1, countAntiC:1, countAntiD:0, countAntiB:0, countAntiS:1, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:0, countAntiC:2, countAntiD:1, countAntiB:0, countAntiS:0, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:0, countAntiC:2, countAntiD:0, countAntiB:0, countAntiS:1, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:1, countAntiC:0, countAntiD:2, countAntiB:0, countAntiS:0, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:1, countAntiC:0, countAntiD:1, countAntiB:0, countAntiS:1, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:1, countAntiC:0, countAntiD:1, countAntiB:1, countAntiS:0, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:1, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:2, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:1, countAntiC:0, countAntiD:0, countAntiB:1, countAntiS:1, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:0, countAntiC:1, countAntiD:2, countAntiB:0, countAntiS:0, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:0, countAntiC:1, countAntiD:1, countAntiB:0, countAntiS:1, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:2, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:0, countAntiC:0, countAntiD:3, countAntiB:0, countAntiS:0, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:0, countAntiC:0, countAntiD:2, countAntiB:0, countAntiS:1, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:0, countAntiC:0, countAntiD:1, countAntiB:0, countAntiS:2, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:1, countAntiC:0, countAntiD:0, countAntiB:1, countAntiS:1, countU: 0, countC:0, countD:0, countB:0, countS:0},
	{countAntiU:0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:3, countU: 0, countC:0, countD:0, countB:0, countS:0},
	
	{countU:1, countC:0, countD:0, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:1, countAntiB:0, countAntiS:0},
	{countU:1, countC:0, countD:0, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:1},
	{countU:1, countC:0, countD:0, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:1, countAntiS:0},
	{countU:0, countC:1, countD:0, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:1, countAntiB:0, countAntiS:0},
	{countU:0, countC:1, countD:0, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:1},
	{countU:0, countC:1, countD:0, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:1, countAntiS:0},
	{countU:1, countC:0, countD:0, countB:0, countS:0, countAntiU: 1, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:1, countD:0, countB:0, countS:0, countAntiU: 1, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:1, countD:0, countB:0, countS:0, countAntiU: 0, countAntiC:1, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:1, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:1, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:1, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:1},
	{countU:0, countC:0, countD:1, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:1, countAntiS:0},
	{countU:0, countC:0, countD:0, countB:0, countS:1, countAntiU: 0, countAntiC:0, countAntiD:1, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:0, countB:0, countS:1, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:1},
	{countU:0, countC:0, countD:0, countB:0, countS:1, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:1, countAntiS:0},
	{countU:0, countC:0, countD:1, countB:0, countS:0, countAntiU: 0, countAntiC:0, countAntiD:1, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:0, countB:1, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:1},
	{countU:0, countC:0, countD:0, countB:1, countS:0, countAntiU: 0, countAntiC:0, countAntiD:0, countAntiB:1, countAntiS:0},
	{countU:0, countC:0, countD:1, countB:0, countS:0, countAntiU: 1, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:0, countB:0, countS:1, countAntiU: 1, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:0, countB:1, countS:0, countAntiU: 1, countAntiC:0, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:1, countB:0, countS:0, countAntiU: 0, countAntiC:1, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:0, countB:0, countS:1, countAntiU: 0, countAntiC:1, countAntiD:0, countAntiB:0, countAntiS:0},
	{countU:0, countC:0, countD:0, countB:1, countS:0, countAntiU: 0, countAntiC:1, countAntiD:0, countAntiB:0, countAntiS:0}
	);
	score={};
	$.each(gameObject.combinations, function(player, combinations){
		score[player]=0;
		$.each(combinations, function(unused, combination){
			Ucount=0;
			Ccount=0;
			Dcount=0;
			Scount=0;
			Bcount=0;
			antiUcount=0;
			antiCcount=0;
			antiDcount=0;
			antiScount=0;
			antiBcount=0;
			$.each(combination, function(unused, card){
				if (!card.anti){
					switch(card.name) {
						case'u':
							Ucount++;
							break;
						case'c':
							Ccount++;
							break;
						case'd':
							Dcount++;
							break;	
						case'b':
							Bcount++;
							break;
						case's':
							Scount++;
							break;		
					}
				}
				else { 
					switch(card.name) {
						case'u':
							antiUcount++;
							break;
						case'c':
							antiCcount++;
							break;
						case'd':
							antiDcount++;
							break;	
						case'b':
							antiBcount++;
							break;
						case's':
							antiScount++;
							break;		
					}
				}
			});
			counts={countU:Ucount,countD:Dcount,countC:Ccount,countS:Scount,countB:Bcount, countAntiU:antiUcount, countAntiC:antiCcount, countAntiB:antiBcount, countAntiD:antiDcount, countAntiS:antiScount};
			$.each(waargenomenHadronen,function(unused, waargenomenHadron){
				equal = true; 
				$.each(keys, function(unused, key){
					if(waargenomenHadron[key]!== counts[key]){
						equal = false;
					}
				
				});
				
				if (equal){
					score[player]++;
				}
				
			});
		});
	});
	
	
	//+1 score per kaart
    $.each(gameObject.combinations, function (player, combinations) {
        $.each(combinations, function (unused, combination) {
            $.each(combination, function (unused, card) {
                score[player]++;
            });
        });
    });
    $.each(score, function(player, points){
        gameObject.points[player] = points;
    });
};