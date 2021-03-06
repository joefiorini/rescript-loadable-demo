// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Button = require("./Button.js");
var GhibliList = require("./GhibliList.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var LazyComponentMod = require("./LazyComponentMod.js");

function Main(Props) {
  var data = Props.data;
  var match = React.useState(function () {
        return 0;
      });
  var setCount = match[1];
  var tmp = {};
  if (data !== undefined) {
    tmp.films = Caml_option.valFromOption(data);
  }
  return React.createElement("div", undefined, React.createElement(Button.make, {
                  label: "Hello World" + String(match[0]),
                  onClick: (function (param) {
                      return Curry._1(setCount, (function (prev) {
                                    return prev + 1 | 0;
                                  }));
                    })
                }), React.createElement(LazyComponentMod.make, {
                  path: "./GhibliList"
                }), React.createElement(GhibliList.make, tmp));
}

var make = Main;

exports.make = make;
/* react Not a pure module */
