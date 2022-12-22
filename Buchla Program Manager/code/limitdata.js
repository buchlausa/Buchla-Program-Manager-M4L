autowatch = 1;








var Util = {};

Util.minimumSpeedLimit = 1; // 1 millisecond

Util.Speedlimit = function(outputCallback, queueSizeCallback, limit) {
  var that = this;

  that.queue = [];
  that.outputCallback = outputCallback;
  that.queueSizeCallback = queueSizeCallback;

  function Callback() {
    that.queue.shift();
    that.queueSizeCallback(that.queue.length);
    if (that.queue.length) {
      that.outputCallback(that.queue[0]);
      that.task.schedule(that.limit);
    };
  };

  that.task = new Task(Callback, that);
  that.task['function']();

  that.SetLimit = function(limit) {
    that.limit = Math.max(limit || 0, Util.minimumSpeedLimit);
  };

  that.Clear = function() {
    that.queue = [];
  };

  that.Output = function(input) {
    that.queue.push(input);
    that.queueSizeCallback(that.queue.length);
    if (that.queue.length == 1) {
      that.outputCallback(input);
      that.task.schedule(that.limit);
    }
  };

  that.SetLimit(limit);
};




var MAX_DEPTH = 10;

function Print(item, depth) {
  depth = depth || 0;
  if (depth > MAX_DEPTH)
    return 'MAX_DEPTH';

  if (item == null)
    return 'null';

  if (item == 'undefined')
    return 'undefined';

  var t = typeof(item);
  if (t == 'string')
    return '"' + item + '"';

  if (t == 'function')
    return (item.name || 'unknown') + '()';

  if (t != 'object')
    return item + '';

  var is_array = item instanceof Array;
  var result = [is_array ? '[' : '{'];

  for (var index in item) {
    if (result.length > 1)
      result[result.length - 1] += ', ';
    var value = Print(item[index], depth + 1);
    result.push(is_array ? value : '"' + index + '": ' + value);
  }
  result.push(is_array ? ']' : '}');
  return result.join('');
}

function PrintJoin(_) {
  var res = [];
  for (var i = 0; i < arguments.length; ++i)
    res.push(Print(arguments[i]));
  return res.join(' ');
}

// This is a VERY useful function - it converts Javascript objects into a
// human-readable form, prints them on one line and then adds a trailing \n.
function Postln(_) {
  for (var i = 0; i < arguments.length; ++i)
    post(Print(arguments[i]));

  post('\n');
}

function print(_) {
    if (arguments.length) {
        for (var i = 0; i < arguments.length; ++i)
            post(arguments[i]);
    } else {
        post(' ');
    }
    post();
}

function printable(x) {
    if (x === null)
        return '<null>';

    if (x === undefined)
        return '<undefined>';

    if (typeof(x) == 'object')
        return JSON.stringify(x);

    return String(x);
}

function maxLog(_) {
    for (var i = 0; i < arguments.length; i++)
        post(printable(arguments[i]));
}

var Logging = {};

Logging.setLogging = function(on) {
  Logging.Log = on ? Postln : function() {};
};

Logging.setLogging(false);





var Max = new Object();
Max.patcher = this.patcher;









Util.ArrayToString = function(s) {
  return Util.IsString(s) ? s : s[0];
};

Util.RemoveQuotes = function(s) {
  var begin = 0, end = s.length;
  if (end && s[begin] == '"')
    ++begin;
  if (end > begin && s[end - 1] == '"')
    --end;
  return s.substring(begin, end);
};

Util.LiveStringToString = function(s) {
  return Util.RemoveQuotes(Util.ArrayToString(s));
};

Util.endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

Util.addSuffix = function(str, suffix) {
    return Util.endsWith(str, suffix) ? str : str + suffix;
};

function isString(s) {
    return (s.constructor === String);
}

function forEachSorted(coll, f) {
    var keys = Object.keys(coll);
    keys.sort();
    keys.forEach(function(key) {
        f(coll[key], key);
    });
};

function applyEachArray(coll, f) {
    var result = [];
    coll.forEach(function() {
        result.push(f.apply(this, arguments));
    });
    return result;
}

function applyEachObj(coll, f) {
    var result = {};
    for (var i in coll)
        result[i] = f(coll[i], i, coll);
    return result;
}

function appendEachObj(coll, f) {
    var result = [];
    for (var i in coll)
        result.push(f(coll[i], i, coll));
    return result;
}

function applyEach(coll, f) {
    var iterator = (coll instanceof Array) ? applyEachArray : applyEachObj;
    return iterator(coll, f);
}

function sequenceEach(functions) {
    return function(_) {
        var args = arguments;
        forEach(functions, function(func) {
            func.apply(this, args);
        });
    };
};

Max.inlets = {};
Max.scalarMessages = {msg_int: 1, msg_float: 1};
Max.applyEntry = true;

// Name each inlet and set a callback function
// Usage:
//   Max.SetInlets(['inletName', callbackFn, 'help'],
//                 ['nextInletName', callbackFn2, 'more help']);
// If there is no help entry, it defaults to the name of the inlet.
Max.SetInlets = function(_) {
    inlets = arguments.length;
    for (var i = 0; i < arguments.length; ++i) {
        var entry = arguments[i];
        Max.inlets[i] = {name: entry[0], func: entry[1]};
        var help = entry[2] ? (entry[0] + ': ' + entry[2]) : entry[0];
        setinletassist(i, help);
    }
};

/** New-style, with objects! */
Max.setInletsJson = function(json) {
    inlets = json.length;
    forEach(json, function(desc, i) {
        Max.inlets[i] = {name: desc.name, func: desc.delegate};
        var help = desc.name;
        if (desc.help)
            help += ': ' + desc.help;
        setinletassist(i, help);
    });
};

Max.ObjectInlets = function(object, names, methods) {
    var results = [];

    methods = methods || object._methods;
    if (methods) {
        for (var i in methods) {
            var method = methods[i],
                name = method[0],
                help = method[1] || name,
                func = method[2] || object[name];
            if (!func)
                print('ERROR! no function for', name);
            results.push([name, func, help]);
        }
    } else {
        names = names || object.names;
        for (var i = 0; i < names.length; ++i) {
            var name = names[i], help = name;
            if (name instanceof Array) {
                name = name[0];
                help = help[1];
            }

            results.push([name, object[name], help]);
        }
    }
    Max.SetInlets.apply(this, results);
};

Max.objectInlets = function(object, _) {
    var args = arrayfromargs(arguments);
    args.shift();
    Max.ObjectInlets(object, args);
    return object;
};

Max.SetterInlets = function(item) {
    Max.setterItem = item;
    var names = item.names;
    inlets = names.length;
    for (var i = 0; i < names.length; ++i)
        setinletassist(i, names[i]);
}

// Return the name of the current inlet, or the numeric name if you haven't set
// the names.
Max.Inlet = function() {
    return (inlet in Max.inlets) ? Max.inlets[inlet] : inlet;
};

function anything(_) {
    var item = Max.setterItem;
    if (item) {
        var name = item.names[inlet];
        if (arguments.length == 0)
            item[name] = messagename;
        else if (arguments.length == 1 && Max.scalarMessages[messagename])
            item[name] = arguments[0];
        else
            item[name] = arrayfromargs(arguments);

        item.lastUpdated = name;
        item.update();
    } else {
        var entry = Max.inlets[inlet];
        if (entry && entry.func) {
            var args = arrayfromargs(arguments);
            if (!(messagename == 'list' || Max.scalarMessages[messagename]))
                args = [messagename].concat(args);
            if (Max.applyEntry)
                entry.func.apply(this, args);
            else
                entry.func(args);
        } else {
            print('ERROR: anything didn\'t understand input for', inlet,
                  Max.Inlet());
        }
    }
};





// Max.SetOutlets sets the names and thus the number of outlets for your Max js
// box.
//
// A sample call looks like:
//
//    Max.SetOutlets('midi',
//                   ['synth', 'Messages to the synthesis subpatcher.'],
//                   ['finished', 'Outlets a bang when the song is finished.']);
//
// or more generally, like this:
//
//    Max.SetOutlets(out1, out2, ...);
//
// Each name argument can either be a string, or a list of two strings.  For
// each argument, the name of the corresponding outlet is the first string, and
// the help text is the second string, if there is one, or else the name of the
// outlet.
//
//    You should only call this function once, and you have to call it during
// the "top-level phase" when the Javascript is first being executed and before
// the box is actually created - if you try to call this later, nothing will
// fail, but you won't get the right number of outlets from the js box.
//
// Once you've called
// If you start with:
//
//   Max.SetOutlets('foo', 'bar', 'baz');
//
// then the following code blocks have identical meaning, and all send the
// message ['hello', 'world'] out the first outlet, named foo, and the message
// ['hello', 'there!'] and ['goodbye!' out the second Max outlet, named bar:
//
//   {
//     Max.Out('foo', 'hello', 'world');
//     Max.Out('bar', 'hello', 'there!');
//     Max.Out('bar', 'goodbye!');
//   }
//
//   {
//     Max.Out.foo('hello', 'world');
//     Max.Out.bar('hello', 'there!');
//     Max.Out.bar('goodbye!');
//   }
//
//   {
//     Max.ListOut(['foo', 'hello', 'world'],
//                 ['bar', 'hello', 'there!'],
//                 ['bar', 'goodbye!']);
//   }
//
//   {
//     Max.ListOut.foo(['hello', 'world']);
//     Max.ListOut.bar(['hello', 'there!'], ['goodbye!']);
//   }
//
//   {
//     var func = Max.Outer(['foo', 'hello', 'world'],
//                          ['bar', 'hello', 'there!'],
//                          ['bar', 'goodbye!']);
//     func();
//   }
//
//   {
//     var func1 = Max.Outer.foo(['hello', 'world']);
//     var func2 = Max.Outer.bar(['hello', 'there!'], ['goodbye!']);
//
//     func1();
//     func2();
//   }
//

Max._outlets = {};

// Outlet to a named outlet.  You can still use the numbered outlets, too.
// You can override this in tests if you want to capture the MIDI output.
//
Max.Outlet = function(outletNumber, data) {
  if (Max._outlets && outletNumber in Max._outlets)
    outletNumber = Max._outlets[outletNumber];
  outlet(outletNumber || 0, data);
};

Max.Out = function(out, _) {
  Max.Outlet(out, arrayfromargs(arguments).slice(1));
};

Max.ListOut = function(args) {
  for (var i = 0; i < args.length; ++i)
    Max.Outlet(args[i][0], args[i].slice(1));
};

Max.Outer = function(_) {
  var args = arguments;
  return function() {
    for (var i = 0; i < arguments.length; ++i)
      Max.Outlet(arguments[i][0], arguments[i].slice(1));
  };
};

Max.SetOutlets = function(_) {
  outlets = arguments.length;
  Max._outlets = {};
  for (var i = 0; i < arguments.length; i++) {
    var name = arguments[i], help = name;
      if (!isString(name)) {
      help = name[1] || name;
      name = name[0];
    }

    Max._outlets[name] = i;
    setoutletassist(i, help);
    var f = Max.OutletFunction(i);
    f.Partial = function(_) {
      var args = arrayfromargs(arguments);
      return function(_) {
        var a = args.concat(arrayfromargs(arguments));
        return f.apply(this, a);
      };
    };
    Max.Out[name] = f;

    Max.ListOut[name] = Max.OutletListFunction(i);
    Max.Outer[name] = Max.OutletFunctionMaker(i);
  }
};

//
// Implementation details below here!
//

// Returns a function that sends its arguments as a message to a given outlet.
Max.OutletFunction = function(out) {
  return function(_) {
    outlet(out, arrayfromargs(arguments));
  };
};

// Returns a function that sends its arguments as separate messages to a given
// outlet.
Max.OutletListFunction = function(out) {
  return function(_) {
    for (var i = 0; i < arguments.length; ++i)
      outlet(out, arguments[i]);
  };
};

// Returns a function that sends its arguments as separate messages to a given
// outlet.
Max.OutletFunctionMaker = function(out) {
  return function(messages) {
    return function() {
      for (var i = 0; i < messages.length; ++i)
        outlet(out, messages[i]);
    }
  };
};

Max.SetOutlets(
    ['output', 'Inputs to the left inlet appear here, speed limited.'],
    ['queuesize', 'The current size of the speedlimit queue.']);

var _speedlim = new Util.Speedlimit(Max.ListOut.output, Max.ListOut.queuesize,
                                    jsarguments[1]);

Max.SetInlets(['queue', _speedlim.Output,
               'Inputs to here appear at the left outlet, speed limited.'],

              ['speed', _speedlim.SetLimit,
               'Set the minimum time between inputs, in millseconds'],

              ['clear', _speedlim.Clear,
               'Any input here clears the speedlimit queue.']);

post('Speedlimit set to ' + _speedlim.limit + 'ms\n');
print('\nOriginal source:', "js/max/speedlimit.js", ' Compile date:', 'Mon Nov 14 16:36:25 PST 2022');
