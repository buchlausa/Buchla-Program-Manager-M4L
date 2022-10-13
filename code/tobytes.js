function tobytes(val){
	var d=256;
	var v1 = Math.floor(val/d);
	var v2 = val%d;

	if(v2>128){	
		v3 = 120;
		v2 = v2%128;
	}else{
		v3 = 112;
	}
		  
//	v1Hex = convertNumToHex(v1);
//	v2Hex = convertNumToHex(v2);
//	v3Hex = v3;
			
//	arr=[v1Hex,v2Hex,v3Hex];
	arr=[v1,v2,v3];
	outlet(0, arr);
}

function convertNumToHex(v){
 	var number = v;
	var hexStr = v.toString(16);  
	 return hexStr;
 }
