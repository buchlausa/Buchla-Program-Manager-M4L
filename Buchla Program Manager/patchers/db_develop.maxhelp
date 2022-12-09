{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 5,
			"revision" : 1,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 1441.0, 181.0, 610.0, 662.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 9.873844999999999,
		"default_fontface" : 0,
		"default_fontname" : "Verdana",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 145.0, 395.0, 72.0, 20.0 ],
					"text" : "s topatchbay"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 77.0, 13.0, 54.0, 20.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 576.5, 35.0, 153.0, 42.0 ],
					"text" : "{\"p\":\"connectCV\", \"o\":\"06\", \"i\":\"0B\", \"v\":-0.34, \"ido\": 5, \"idi\":37, \"c\":\"#ffea00\"}"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 422.0, 35.0, 151.0, 42.0 ],
					"text" : "{\"p\":\"connectCV\", \"o\":\"00\", \"i\":\"03\", \"v\":1, \"ido\": 13, \"idi\":15, \"c\":\"#ff0000\"}"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 76.0, 47.0, 171.0, 20.0 ],
					"text" : "opendb, readTrans, getprograms"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 291.5, 97.0, 95.0, 20.0 ],
					"text" : "selectprogram $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"items" : [ "Quick Start", ",", "Bongos", ",", "Random", ",", "Aleatoric", ",", "Krellmuse", ",", "It&apos;s Alive", ",", "Bongos", ",", "It&apos;s Alive", ",", "Bongos Lo", ",", "Bloos Jargen 1", ",", "Shifting", ",", "Krellmuse", ",", "Random", ",", "Pkkksm +", ",", "Warm Pulse Seq", ",", "Basic Keyb", ",", "Woodpluck 1", ",", "Wood 5", ",", "Bass Pizz P", ",", "Key 80", ",", "zrppi", ",", "electric glitch", ",", "ebbflow", ",", "timbreSweep", ",", "Drogn-k", ",", "Bouncy bird", ",", "Drops 1", ",", "WP Seq 1", ",", "WhP Cycle 1", ",", "Lzy Mpulse", ",", "sw33ps 1", ",", "Drowning 1", ",", "Electro Aviary", ",", "Computer Room +", ",", "Aleatoric +", ",", "Tippin K", ",", "Fenfr ky", ",", "tremolo organ 2", ",", "WhP Keys 2", ",", "Drone key", ",", "metal cans", ",", "Reptile", ",", "Erratic", ",", "Accent Sequence +", ",", "Dwn To Hppy", ",", "Krellish", ",", "click texture +", ",", "Streetwalking", ",", "Wait For  It", ",", "Anxiety", ",", "Osc Range match" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 291.5, 68.0, 100.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-32",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 123.0, 353.0, 51.0, 20.0 ],
					"text" : "s topattr"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Verdana",
					"fontsize" : 9.873844999999999,
					"id" : "obj-31",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 534.0, 195.0, 304.0, 20.0 ],
					"text" : "exec \"SELECT id FROM programs WHERE name = 'Bongos'\""
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Verdana",
					"fontsize" : 9.873844999999999,
					"id" : "obj-30",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 534.0, 238.0, 302.0, 32.0 ],
					"text" : "exec \"SELECT programdata FROM programs WHERE name = 'Bongos'\""
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Verdana",
					"fontsize" : 9.873844999999999,
					"id" : "obj-29",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 252.0, 327.0, 195.0, 20.0 ],
					"text" : "exec \"SELECT name FROM programs\""
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Verdana",
					"fontsize" : 9.873844999999999,
					"id" : "obj-28",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 243.0, 300.0, 174.0, 20.0 ],
					"text" : "exec \"SELECT * FROM programs\""
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Verdana",
					"fontsize" : 9.873844999999999,
					"id" : "obj-16",
					"linecount" : 4,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 333.0, 199.0, 144.0, 56.0 ],
					"text" : "exec \"CREATE TABLE namedValues(name\tVARCHAR(256), value VARCHAR(512))\""
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Verdana",
					"fontsize" : 9.873844999999999,
					"id" : "obj-15",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 329.0, 166.0, 154.0, 30.0 ],
					"text" : "2. Create a table in the database to hold values"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Verdana",
					"fontsize" : 9.873844999999999,
					"id" : "obj-14",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 161.0, 219.0, 150.0, 30.0 ],
					"text" : "later we can close the database with this"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Verdana",
					"fontsize" : 9.873844999999999,
					"id" : "obj-12",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 113.0, 220.0, 48.0, 20.0 ],
					"text" : "closedb"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Verdana",
					"fontsize" : 9.873844999999999,
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 97.0, 283.0, 77.0, 20.0 ],
					"saved_object_attributes" : 					{
						"filename" : "databass.js",
						"parameter_enable" : 0
					}
,
					"text" : "js databass.js"
				}

			}
, 			{
				"box" : 				{
					"colhead" : 1,
					"cols" : 7,
					"fontface" : 0,
					"fontname" : "Verdana",
					"fontsize" : 9.873844999999999,
					"id" : "obj-27",
					"maxclass" : "jit.cellblock",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "list", "", "", "" ],
					"patching_rect" : [ 243.0, 366.0, 553.0, 261.0 ],
					"rows" : 52
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"midpoints" : [ 122.5, 241.0, 106.5, 241.0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"midpoints" : [ 342.5, 258.0, 106.5, 258.0 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-28", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-30", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"hidden" : 1,
					"source" : [ "obj-9", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 0 ],
					"source" : [ "obj-9", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-9", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "databass.js",
				"bootpath" : "~/Documents/Max 8/Projects/Buchla Program Manager/Buchla-Program-Manager-M4L/Buchla Program Manager/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
