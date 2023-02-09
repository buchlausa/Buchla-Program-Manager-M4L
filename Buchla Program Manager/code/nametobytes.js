autowatch = 1;
outlets = 2;

function setName(v){
	var str=v;
	var decresult = [];
	var maxLenth=13;
	var hex,dec;
	stringLen=str.length;
	for (i=0; i<maxLenth; i++) {
		if(i<stringLen){
			decresult.push(str.charCodeAt(i));
		}else{
			 decresult.push(32);
		}
	}
	decresult.push(0,0,0,112);
	post("-- "+decresult);
	decresult.splice(4, 0,112);
	decresult.splice(9, 0, 112);
	decresult.splice(14, 0, 112);
	post("++ "+decresult);
	outlet(0,decresult);
}
