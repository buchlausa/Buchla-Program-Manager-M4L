
//https://stackoverflow.com/questions/65538406/convert-javascript-number-to-float-single-precision-ieee-754-and-receive-integ
function msg_float(double) {
	var integerBitsHex;
	var test = double != 1 || double != 0 || double != -1;
	if(test == true){
	  // float / f32 has 32 bit => 4 bytes
	  var BYTES = 4;
	  // Buffer is like a raw view into memory
	  var buffer = new ArrayBuffer(BYTES);
	  // Float32Array: interpret bytes in the memory as f32 (IEEE-754) bits
	  var float32Arr = new Float32Array(buffer);
	  // UInt32Array: interpret bytes in the memory as unsigned integer bits.
	  // Important that we use unsigned here, otherwise the MSB would be interpreted as sign
	  var uint32Array = new Uint32Array(buffer);
	  var uint8Array = new Uint8Array(buffer);
	  // will convert double to float during assignment
	  float32Arr[0] = double;
	  // now read the same memory as unsigned integer value
	  var integerValue = uint32Array[0];
	  // to hex string
	  integerBitsHex = integerValue.toString(16);
	} else {
		if(double == 1){
			integerBitsHex = "00000001";
		}
		if(double == -1){
			integerBitsHex = "FFFFFFFF";
		}
		if(double == 0){
			integerBitsHex = "00000000";
		}
	}

  splithex(integerBitsHex);
}


function splithex(str){
	var chunks = [];
	var chunksize = 2;
	for (var i = 0, charsLength = str.length; i < charsLength; i += chunksize) {
	    chunks.push(str.substring(i, i + chunksize));
	}
	var sysexvals = [];
	for (var i in chunks){
		todec = parseInt( "0x"+chunks[i], 16 ) ;
		//post("\n i: "+i);
		//post(", hex: "+chunks[i]);
		//post(", int: "+todec );
		sysexvals[i] = todec & 0x7F;
		//post(",  to sysex: "+sysexvals[i]);
	}
  sysexvals[4] = 0;
  // post("\n--")
  //make the fifth byte with the MSbits:
	for (var i in chunks){
	    todec = parseInt( "0x"+chunks[i], 16 ) ;
		//post("\n int: "+i+" "+todec+" to MSB "+(todec & 0x80) );
	    sysexvals[4] |= (todec & 0x80) >> (7-i);
		//post(",  fifth: "+sysexvals[4] );
	}
	sysexvals[4] |= 0x70;


	//post("\n hex vals "+chunks);
	//post("\n sysex vals "+sysexvals);
	var sysexhex = [];
	for(i in sysexvals){
		sysexhex[i] = sysexvals[i].toString(16);
	}
	//post("\n sysex hex "+sysexhex);
  outlet(0,sysexvals);
}
