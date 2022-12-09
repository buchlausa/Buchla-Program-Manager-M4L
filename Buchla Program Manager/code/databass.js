
outlets = 4;
//outlet 0 is for program name menu
//outlet 1 goes to pattrstorage to feed the sliders and knobs
//outlet 2 goes to patchbay
//outlet 3 goes to a cellblock for viewing data

autowatch = 1;
var sqlite = new SQLite;
var result = new SQLResult;
var memstr;
var mem = new Object();
var sysex_vars = new Object();

var dbmac = "~/Library/Application Support/Buchla Program Manager/pm.db"
var dbwin = ""

function readTrans(){
  var path = "sysex_vars.json";
	memstr = "";
	var data = "";
	var maxchars = 800;
  var f = new File(path,"read");

  f.open();
	if (f.isopen) {
		while(f.position<f.eof) {
			memstr+=f.readstring(maxchars);
		}
		f.close();
	} else {
		post("Error\n");
	}
	sysex_vars = JSON.parse(memstr);
	//UI = eval("("+memstr+")"); //much less secure, but could work
	post("\nJSON Read",path);
  // for (i in sysex_vars["translate"]){
  //   post("\ndata - "+i);
  // }
}

function opendb()
{
    sqlite.open(dbmac,1); //open a file-based DB
	if(sqlite){
		post("\ndatabase opened: "+dbmac);
	}else{
		post("\ndatabase failed to open");
	}
}


function closedb()
{
	sqlite.close();
}


function exec(arg)
{
	// execute the SQL statement in arg, returning results in the 'result' object
	sqlite.exec(arg, result);

	// access information about the returned records by calling functions on the result object
	formatResultForCellblock();
}


function getversion()
{
	post("SQLite Version: " + sqlite.getversion() + "\n");
}

var idtable = [];
//link id to umenu index
function makeidtable(){
  sqlite.exec("SELECT id FROM programs", result);
  idtable = [];
  for(var i=0; i<result.numrecords(); i++){
    for(var j=0; j<result.numfields(); j++){
      idtable[i] = result.value(j,i);
      post("-"+i+" "+idtable[i]  + "\n")
    }
  }
}

function getprograms(){
  makeidtable();
  sqlite.exec("SELECT name FROM programs", result);
  outlet(0,"clear");
  for(var i=0; i<result.numrecords(); i++){
    for(var j=0; j<result.numfields(); j++){
      // var programname = result.value(j,i).replace(/%20/g, " ");
      var programname = decodeURIComponent(result.value(j,i))
      // post(programname + "\n")
      outlet(0,"append",programname);
    }
  }
}

function selectprogram(v){
  var i,j;
  var theid = idtable[v];
  sqlite.exec("SELECT programdata FROM programs WHERE id = "+theid, result);
  var thepgm = result.value(0,0);
  // post("\n pgm "+thepgm);
  var pgmdata = JSON.parse(thepgm);
  // for (i in pgmdata){
  // 	post("\n - "+i+" : "+pgmdata[i]);
  // 	for (j in pgmdata[i]){
  // 	  post("\n -- "+i+" : "+pgmdata[i][j]);
  // 	}
  // }

  //clear the patch bay:
  outlet(2,"clear");

  for (i in pgmdata["patchdata"]){
    // post("\n patchdata "+i+" : "+pgmdata["patchdata"][i]);
    var o_param = pgmdata["patchdata"][i]["p"];
    var val = pgmdata["patchdata"][i]["v"];
     post("\n -- "+"i: "+i+" p: "+o_param+" v: "+val);
    var param = sysex_vars["translate"][o_param];
    // post("\n *** "+param);
    if (param != "connection"){
      //sliders need special treatment. check if we are dealing with a slider first:
      if(sysex_vars["slider_vars"][param]){
        var length = sysex_vars["slider_vars"][param][1];
        // post("\n"+param+" "+val);
        // send out to pattrstorage
        if(length == 2){
          //needs horiz, veritcal list for pictslider. only using vertical, so horiz is 0
          outlet(1,param,0,val);
        }
        if(length == 1){
          outlet(1,param,val);
        }
      } else {
        //toggles and stuff
        outlet(1,param,val);
      }

    } else {
      //connection logic
      // {
      //   "p": "connectCV",
      //   "o": "02",
      //   "i": "07",
      //   "v": 1,
      //   "ido": 25,
      //   "idi": 24,
      //   "c": "#ffea00"
      // }
      var cnxn_source_id = parseInt( pgmdata["patchdata"][i]["o"] ,16);
      var cnxn_dest_id = parseInt( pgmdata["patchdata"][i]["i"], 16);
      var cnxn_depth = ( pgmdata["patchdata"][i]["v"] + 1 )/2; //scale -1 to 1 -> 0. to 1.
      outlet(2,cnxn_source_id,cnxn_dest_id,cnxn_depth);

    }
    // for (j in pgmdata["patchdata"][i]){
    //   post("\n --data "+j+" : "+pgmdata["patchdata"][i][j]);
    // }
  }
}

function formatResultForCellblock()
{
    var numfields = result.numfields();
    var numrecords = result.numrecords();
    var fieldnames = new Array(numfields);
    var values = new Array(numfields);

	outlet(3, "clear", "all");
	outlet(3, "cols", numfields);
	outlet(3, "rows", numrecords + 1);    // rows +1 so we can create a header row

	for(var i=0; i<numfields; i++)
		outlet(3, "set", i, 0, result.fieldname(i));

	for(var i=0; i<numrecords; i++){
		for(var j=0; j<numfields; j++)
			outlet(3, "set", j, i+1, result.value(j, i));
	}
}
