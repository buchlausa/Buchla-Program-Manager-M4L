{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 5,
			"revision" : 2,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 202.0, 467.0, 1039.0, 843.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
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
					"id" : "obj-23",
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 614.400009155273438, 304.000004529953003, 20.0, 140.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "slider",
							"parameter_shortname" : "slider",
							"parameter_type" : 0
						}

					}
,
					"varname" : "slider"
				}

			}
, 			{
				"box" : 				{
					"filename" : "jsui_simpleslider.js",
					"id" : "obj-53",
					"maxclass" : "jsui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 548.0, 324.000004827976227, 24.0, 116.0 ],
					"varname" : "jsui"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-22",
					"maxclass" : "jsui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 399.200005948543549, 304.000004529953003, 64.0, 64.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 264.000003933906555, 324.000004827976227, 58.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_object_attributes" : 					{
						"parameter_enable" : 0,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr junk",
					"varname" : "junk"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-20",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 131.200001955032349, 89.600001335144043, 41.0, 22.0 ],
					"text" : "set 89"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-18",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 106.400001585483551, 549.600008189678192, 50.0, 22.0 ],
					"text" : "0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 25.0, 33.0, 29.5, 22.0 ],
					"text" : "0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 95.0, 27.0, 29.5, 22.0 ],
					"text" : "127"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 52.0, 31.0, 32.0, 22.0 ],
					"text" : "62.5"
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-9",
					"maxclass" : "flonum",
					"maximum" : 127.0,
					"minimum" : 0.0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 59.0, 80.0, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"filename" : "imgslider.js",
					"id" : "obj-2",
					"maxclass" : "jsui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 96.75, 232.400000989437103, 16.399999856948853, 98.199996948242188 ],
					"varname" : "junk_"
				}

			}
, 			{
				"box" : 				{
					"bkgndpict" : "slider_bg.png",
					"bkgndsize" : 1,
					"clickedimage" : 0,
					"id" : "obj-777",
					"inactiveimage" : 0,
					"knobpict" : "cap_yel.png",
					"leftmargin" : 4,
					"maxclass" : "pictslider",
					"movehorizontal" : 0,
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "int", "int" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 674.600006818771362, 314.000004529953003, 15.0, 120.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 702.0, 55.536632418632507, 15.0, 120.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "pulser_period_",
							"parameter_shortname" : "pulser_period_",
							"parameter_type" : 0
						}

					}
,
					"topvalue" : 4095,
					"varname" : "pulser_period_",
					"verticaltracking" : 4.0
				}

			}
, 			{
				"box" : 				{
					"bkgndsize" : 1,
					"clickedimage" : 0,
					"id" : "obj-779",
					"inactiveimage" : 0,
					"leftmargin" : 4,
					"maxclass" : "pictslider",
					"movehorizontal" : 0,
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "int", "int" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 472.0, 119.0, 100.0, 100.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 672.0, 55.536632418632507, 100.0, 100.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_invisible" : 1,
							"parameter_linknames" : 1,
							"parameter_longname" : "pulser_cv_",
							"parameter_shortname" : "pulser_cv_",
							"parameter_type" : 3
						}

					}
,
					"topvalue" : 4095,
					"varname" : "pulser_cv_",
					"verticaltracking" : 4.0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-32",
					"maxclass" : "live.slider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 273.0, 119.0, 39.0, 95.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "live.slider",
							"parameter_shortname" : "live.slider",
							"parameter_type" : 0,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "live.slider"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 1.0, 0.898039215686275, 0.0, 1.0 ],
					"id" : "obj-16",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 75.200001120567322, 354.400005280971527, 128.0, 128.0 ],
					"proportion" : 0.5
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 1 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-2" : [ "junk_", "junk_", 0 ],
			"obj-23" : [ "slider", "slider", 0 ],
			"obj-32" : [ "live.slider", "live.slider", 0 ],
			"obj-53" : [ "jsui", "jsui", 0 ],
			"obj-777" : [ "pulser_period_", "pulser_period_", 0 ],
			"obj-779" : [ "pulser_cv_", "pulser_cv_", 0 ],
			"parameterbanks" : 			{
				"0" : 				{
					"index" : 0,
					"name" : "",
					"parameters" : [ "-", "-", "-", "-", "-", "-", "-", "-" ]
				}

			}
,
			"inherited_shortname" : 1
		}
,
		"dependency_cache" : [ 			{
				"name" : "cap_yel.png",
				"bootpath" : "~/Documents/Max 8/Projects/Buchla Program Manager/Buchla-Program-Manager-M4L/Buchla Program Manager/media",
				"patcherrelativepath" : "../media",
				"type" : "PNG",
				"implicit" : 1
			}
, 			{
				"name" : "imgslider.js",
				"bootpath" : "~/Documents/Max 8/Projects/Buchla Program Manager/Buchla-Program-Manager-M4L/Buchla Program Manager/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "jsui_default.js",
				"bootpath" : "C74:/jsui",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "jsui_simpleslider.js",
				"bootpath" : "C74:/jsui",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "slider_bg.png",
				"bootpath" : "~/Documents/Max 8/Projects/Buchla Program Manager/Buchla-Program-Manager-M4L/Buchla Program Manager/media",
				"patcherrelativepath" : "../media",
				"type" : "PNG",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
