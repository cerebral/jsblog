"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require("preact");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /** @jsx h */


var fontSizeConverter = function fontSizeConverter(count, min, max, minSize, maxSize) {
  return Math.round((count - min) * (maxSize - minSize) / (max - min) + minSize);
};

function Tags(_ref) {
  var tags = _ref.tags;

  var counts = tags.map(function (tag) {
    return tag.count;
  }),
      min = Math.min.apply(Math, _toConsumableArray(counts)),
      max = Math.max.apply(Math, _toConsumableArray(counts));
  var data = tags.map(function (tag) {
    return {
      tag: tag,
      fontSize: fontSizeConverter(tag.count, min, max, 12, 35)
    };
  });

  return (0, _preact.h)(
    "div",
    { className: "Tags-wrapper" },
    data.map(function (tagData) {
      return (0, _preact.h)(
        "a",
        {
          href: "/tags/" + tagData.tag.value,
          key: tagData.tag.value,
          className: "Tags-tag",
          style: { fontSize: tagData.fontSize + "px" }
        },
        tagData.tag.value
      );
    })
  );
}

exports.default = Tags;