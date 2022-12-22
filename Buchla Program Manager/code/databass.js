
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

//translation table for converting from pm.db format to pattrstorage format
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

function dbout(){
  exec("SELECT * FROM programs");
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
  exec("SELECT id FROM programs");
  idtable = [];
  for(var i=0; i<result.numrecords(); i++){
    for(var j=0; j<result.numfields(); j++){
      idtable[i] = result.value(j,i);
      // post("make id table -"+i+" "+idtable[i]  + "\n")
    }
  }
}

//create menu of program names
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

//save-as
var pgmcounter = 0;
function addprogram(){
  var newDate = "12/21/22"
  var newName = "M4L-name"+pgmcounter;
  pgmcounter++;
  var newProgramData = JSON.stringify(patchdata);
  var newTags = ['m4l'];
  var newAuthor = 'MAX';
  var newModby = 'M4L';
  if(patchdata){
    sqlite.exec("INSERT INTO programs ('name', 'date', 'programdata', 'deleted', 'datemod', 'tags', 'author', 'modby') VALUES('"+newName+"','"+newDate+"','"+newProgramData+"','"+0+"','"+newDate+"','"+newTags+"','"+newAuthor+"','"+newModby+"')",result);
  } else {
    post("no patchdata to add")
  }
  getprograms();
}
function write(thedata,p){
	var jase = JSON.stringify(thedata,null,'\t');
	var path = p;
	var fout = new File(path,"write","TEXT");
	if (fout.isopen) {
			fout.writeline(jase);
			fout.close();
			post("\nJSON Write",path);
		} else {
			post("\ncould not create json file: " + path);
		}
}
//save current
function updateprogram(){

  // var theid = idtable[v];
  var theid = currentprogram;
  var newDate = makedate();
  var newName = currentname+"-"+Date.parse( new Date() );
  var newTags = "";
  var newAuthor = "Max";
  var newNotes = "made in Max For Live patch"
  var newModby = "M4L";
  programblob.name = newName;
  programblob.date = newDate;
  programblob.tags = newTags;
  programblob.author = newAuthor;
  programblob.notes = newNotes;
  programblob.modifiedby = newModby;
  programblob.patchdata = patchdata;
  var newProgramData = JSON.stringify(programblob);
  write(newProgramData,"/Users/nyboer/progblob.json")
  if(patchdata){

    post("\n - update id: "+theid);
    post("\n *****BEFORE*******");
    exec("SELECT programdata FROM programs WHERE id = "+theid);
    sqlite.exec("SELECT name FROM programs WHERE id = "+theid, result);
    post("\n name check: "+result.value(0,0));
    sqlite.exec("SELECT date FROM programs WHERE id = "+theid, result);
    post("\n date check: "+result.value(0,0));

    var sqlcmd = "UPDATE programs SET name='"+newName+"', date='"+newDate+"', programdata='"+newProgramData+"', author='"+newAuthor+"', modby='"+newModby+"' WHERE id = " + theid;

    post("\n sql: "+sqlcmd);
    sqlite.exec(sqlcmd,result);
    post("\n *****AFTER*******");
    exec("SELECT programdata FROM programs WHERE id = "+theid);
    sqlite.exec("SELECT name FROM programs WHERE id = "+theid, result);
    post("\n namech eck: "+result.value(0,0));
    sqlite.exec("SELECT date FROM programs WHERE id = "+theid, result);
    post("\n date check: "+result.value(0,0));


  } else {
    post("no patchdata to update")
  }
}

var currentprogram = 0;
var currentname = "M4Ldefault";
function selectprogram(v){
  var i,j;
  var theid = idtable[v];
  post("selecting id: "+theid+" from menu: "+v);
  currentprogram = theid;
  exec("SELECT programdata FROM programs WHERE id = "+theid);
  var thepgm = result.value(0,0);
  sqlite.exec("SELECT name FROM programs WHERE id = "+theid, result);
  currentname = result.value(0,0);
  // write(thepgm,"/Users/nyboer/aprogram.json")
   post("\n ## pgm: "+theid+" name: "+currentname);
  var pgmdata = JSON.parse(thepgm);
  write(JSON.stringify(pgmdata),"/Users/nyboer/originalblob.json");
  // for (i in pgmdata){
  // 	post("\n +- "+i+" : "+pgmdata[i]);
  // 	for (j in pgmdata[i]){
  // 	  post("\n + -- "+j+" : "+pgmdata[i][j]);
  //     for (k in pgmdata[i][j]){
  //       post("\n +  --> "+k+" : "+pgmdata[i][j]);
  //       for (l in pgmdata[i][j][k]){
  //         post("\n //  --> "+l+" : "+pgmdata[i][j][k][l]);
  //       }
  //     }
  // 	}
  // }

  //clear the patch bay:
  outlet(2,"clear");

//translate the data stored in the databse to pattrstorage format
  for (i in pgmdata["patchdata"]){
    // post("\n      patchdata "+i+" : "+pgmdata["patchdata"][i]);
    //o_param is original parameter name as used in database.
    var o_param = pgmdata["patchdata"][i]["p"];
    var val = pgmdata["patchdata"][i]["v"];
    // post("\n == "+"i: "+i+" p: "+o_param+" v: "+val);
    var param = sysex_vars["translate"][o_param];
    // post("\n *** "+param);
    if (param != "connection"){
      //sliders need special treatment. check if we are dealing with a slider first:
      if(sysex_vars["slider_vars"][param]){
        var length = sysex_vars["slider_vars"][param][1];
        // post("\n ==> "+param+" "+val);
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

var pattrcount = 0;
var patchdata = [];
var programblob = {"name":"","date":"","tags":"","author":"","modifiedby":"M4L","notes":"Max for Live","patchdata":patchdata};
function startPattrDump(){
  pattrcount = 0;
  patchdata = [];
  patchbay();
}

function ingestPattr(pattr_param,value){
  patchdata[pattrcount]={};
  var pma_param = sysex_vars["etalsnart"][pattr_param];
  patchdata[pattrcount]["p"] = pma_param;
  patchdata[pattrcount]["v"] = value;
  post("\n ||| "+pattrcount+" max p:"+ pattr_param+" p: "+pma_param+" v: "+value);
  pattrcount++;
}
//link to dictionary in max patch that describes the crosspatch connections
var pbay = new Dict('patchbay');
function patchbay(){
//to get hex value: source_id.toString(16);
  //map the indices for crosspatch inputs to the ido values
  //refer to graphic https://drive.google.com/drive/folders/1xc5BoitCRI1krfbVipkLiRLOVOqSUqrq
  //e.g. crosspatch has "Sequencer" as the first item (item #0), so that returns "4" which is the ID for the blue sequncer output on the Easel
  var translate_idos = [4,7,10,1,2,3, 5,11,17,23, 32,27,12,29,30];
  var translate_idis = [6,9,12,15, 18,34,21,24, 28,35,36,37];
  var cnx = pbay.get("connections");
  for (i in cnx ){
    patchdata[pattrcount] = {};
    var in_index = cnx[i].get("in");
    var out_index = cnx[i].get("out");
    patchdata[pattrcount]["p"] = "connectCV";
    patchdata[pattrcount]["o"] = d2h(in_index);
    patchdata[pattrcount]["i"] = d2h(out_index);
    var depthvalue = ( cnx[i].get("gain")*2 ) - 1; //scale to -1 to 1 range
    patchdata[pattrcount]["v"] = depthvalue;
    patchdata[pattrcount]["ido"] = translate_idos[in_index];
    patchdata[pattrcount]["idi"] = translate_idis[out_index]; //.toString(16) - not hex?
    patchdata[pattrcount]["c"] = "#B2CF4C";
    pattrcount++;
  }
}

function makedate(){
	var thedate = new Date();
	var mo = thedate.getMonth()+1;
	var da = thedate.getDate();
	var yr = thedate.getFullYear();
	datestr = mo+"/"+ da+"/"+ yr;
  return datestr;
}

function d2h(d) {
    var h = d.toString(16);
    return h.length % 2 ? '0' + h : h;
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