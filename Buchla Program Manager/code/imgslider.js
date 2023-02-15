/*

a simple slider

arguments: fgred fggreen fgblue bgred bggreen bgblue linered linegreen lineblue mode

*/

autowatch = 1;



sketch.default2d();
var val = 0;
var vbrgb = [1.,1.,1.,1.];
var vfrgb = [0.2,0.2,0.2,1.];
var vrgb2 = [0.5,0.5,0.5,1.];
var vmode = 0;
var voutline = 1;

// // process arguments
// if (jsarguments.length>1)
// 	vfrgb[0] = jsarguments[1]/255.;
// if (jsarguments.length>2)
// 	vfrgb[1] = jsarguments[2]/255.;
// if (jsarguments.length>3)
// 	vfrgb[2] = jsarguments[3]/255.;
// if (jsarguments.length>4)
// 	vbrgb[0] = jsarguments[4]/255.;
// if (jsarguments.length>5)
// 	vbrgb[1] = jsarguments[5]/255.;
// if (jsarguments.length>6)
// 	vbrgb[2] = jsarguments[6]/255.;
// if (jsarguments.length>7)
// 	vrgb2[0] = jsarguments[7]/255.;
// if (jsarguments.length>8)
// 	vrgb2[1] = jsarguments[8]/255.;
// if (jsarguments.length>9)
// 	vrgb2[2] = jsarguments[9]/255.;
// if (jsarguments.length>10)
// 	vmode = jsarguments[10];
// if (jsarguments.length>11)
// 	voutline = jsarguments[11];


mgraphics.init();
mgraphics.relative_coords = 1;
mgraphics.autofill = 0;
var svg_w = 15;
var svg_h = 28;


function paint() {
  var width = this.box.rect[2] - this.box.rect[0];
  var height = this.box.rect[3] - this.box.rect[1];
	var aspect = width/height;
	var offset_x = (svg_w/width)*aspect;
	var offset_y = (svg_h/width)*aspect;
  with (mgraphics) {
		var rx = -0.25*aspect;
		var ry = 0.95;
		set_source_rgba(0.2,0.2,0.2,1)
		rectangle(rx, ry, 0.5*aspect, 1.9);
		fill();
		var pos = offset_y+( ((1-val)*(2 - 2*offset_y )) ) ;
		translate( aspect-offset_x, pos-offset_y);
		svg_render("cap_yelx.svg");
		restore();
  }
}


function bang()
{
	mgraphics.redraw();
	//refresh();
	outlet(0,127*val);
}

//expecting values 0-127
function msg_float(v)
{
	val = Math.min(Math.max(0,v/127.0),1);
	notifyclients();
	bang();
}

function set(v)
{
	val = Math.min(Math.max(0,v/127.0),1);
	notifyclients();
	mgraphics.redraw();
	refresh();
}

function frgb(r,g,b)
{
	vfrgb[0] = r/255.;
	vfrgb[1] = g/255.;
	vfrgb[2] = b/255.;
	mgraphics.redraw();
	refresh();
}

function rgb2(r,g,b)
{
	vrgb2[0] = r/255.;
	vrgb2[1] = g/255.;
	vrgb2[2] = b/255.;
	mgraphics.redraw();
	refresh();
}

function brgb(r,g,b)
{
	vbrgb[0] = r/255.;
	vbrgb[1] = g/255.;
	vbrgb[2] = b/255.;
	mgraphics.redraw();
	refresh();
}

function outline(v)
{
	voutline = v;
	paint();
	refresh();
}

function setvalueof(v)
{
	msg_float(v);
}

function getvalueof()
{
	return 127*val;
}

function onclick(x,y,but,cmd,shift,capslock,option,ctrl)
{
	ondrag(x,y,but,cmd,shift,capslock,option,ctrl)
}
onclick.local = 1; //private. could be left public to permit "synthetic" events

function ondrag(x,y,but,cmd,shift,capslock,option,ctrl)
{
	var f,a;

	a = sketch.screentoworld(x,y);
	f = 127.0*(a[1]+0.8)/1.6; //on screen in range -0.8 to 0.8
	msg_float(f); //set new value with clipping + refresh
}
ondrag.local = 1; //private. could be left public to permit "synthetic" events

function onresize(w,h)
{
	paint();
	refresh();
}
onresize.local = 1; //private
