autowatch = 1;
outlets = 2;

//definitely some extra code in here that really isn't needed. Kept for reference to original.
function patchname(v){
	var str=v;
	var hexresult = "";
	var result = [];
	var maxLength=13;
	var letters=str.length;
	if(stringLen>maxLength){
		letters = maxLength
	}
	for (i=0; i<letters; i++) {

			var hextrabit="";
			if(i==4 || i==8 || i==12){
				hextrabit=" 70";
			}
			result[i] = str.charCodeAt(i);
			hex = str.charCodeAt(i).toString(16);
			hexresult += hextrabit+" "+(hex).slice(-4);

	}
	post("char code: "+result);
	//for reasons lost to obscure buchla sysex

	result.splice(letters, 0,0,0,112); //aapend 0 0 112
// result.splice(4, 0,112);
//	result.splice(8, 0, 112);//
//	result.splice(12, 0, 112);
	outlet(1,hexresult);
	outlet(0,result);
}
