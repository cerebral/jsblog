"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require("preact");

function Logo(props) {
  return (0, _preact.h)(
    "a",
    { href: "/", className: "Logo-wrapper" },
    (0, _preact.h)(
      "div",
      { className: "Logo-js" },
      "JS"
    ),
    (0, _preact.h)(
      "div",
      { className: "Logo-blog" },
      "BLOG"
    )
  );
} /** @jsx h */
exports.default = Logo;