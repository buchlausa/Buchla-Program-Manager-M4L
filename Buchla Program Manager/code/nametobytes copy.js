autowatch = 1;
outlets = 2;

//definitely some extra code in here that really isn't needed. Kept for reference to original.
function patchname(v){
	var str=v;
	var hexresult = "";
	var result = [];
	maxLenth=13;
	stringLen=str.length;
	for (i=0; i<maxLenth; i++) {
		if(i<stringLen){
			var hextrabit="";
			if(i==4 || i==8 || i==12){
				hextrabit=" 70";
			}
			result[i] = str.charCodeAt(i);
			hex = str.charCodeAt(i).toString(16);
			hexresult += hextrabit+" "+(hex).slice(-4);
		}else{
			hexresult += " 00";
			result[i] = 0;
		}
	}
	post("char code: "+result);
	//don't know why, but need to:
	result.splice(4, 0,112);
//	result.splice(8, 0, 112);//
//	result.splice(12, 0, 112);
	outlet(1,hexresult);
	outlet(0,result);
}
