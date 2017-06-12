"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require("preact");

function TagArticles(_ref) {
  var articles = _ref.articles;

  return (0, _preact.h)(
    "div",
    { className: "TagArticles-wrapper" },
    (0, _preact.h)(
      "table",
      { className: "TagArticles-table" },
      (0, _preact.h)(
        "thead",
        null,
        (0, _preact.h)(
          "tr",
          null,
          (0, _preact.h)(
            "th",
            null,
            "published"
          ),
          (0, _preact.h)(
            "th",
            null,
            "title"
          ),
          (0, _preact.h)(
            "th",
            null,
            "author"
          ),
          (0, _preact.h)(
            "th",
            null,
            "reads"
          ),
          (0, _preact.h)(
            "th",
            null,
            "recommended"
          )
        )
      ),
      (0, _preact.h)(
        "tbody",
        null,
        articles.map(function (article, index) {
          return (0, _preact.h)(
            "tr",
            { key: index },
            (0, _preact.h)(
              "td",
              { className: "TagArticles-datetime" },
              new Date(article.datetime).toUTCString().split(' ').slice(0, 3).join(' ')
            ),
            (0, _preact.h)(
              "td",
              { className: "TagArticles-title" },
              (0, _preact.h)(
                "a",
                { href: article.href },
                article.title
              )
            ),
            (0, _preact.h)(
              "td",
              { className: "TagArticles-author" },
              article.author
            ),
            (0, _preact.h)(
              "td",
              { className: "TagArticles-readCount" },
              article.readCount
            ),
            (0, _preact.h)(
              "td",
              { className: "TagArticles-recommendedCount" },
              article.recommendedCount
            )
          );
        })
      )
    )
  );
} /** @jsx h */
exports.default = TagArticles;