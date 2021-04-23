// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";

function Button(Props) {
  var label = Props.label;
  var onClick = Props.onClick;
  return React.createElement("button", {
              onClick: (function (_e) {
                  return Curry._1(onClick, undefined);
                })
            }, label);
}

var make = Button;

export {
  make ,
  
}
/* react Not a pure module */