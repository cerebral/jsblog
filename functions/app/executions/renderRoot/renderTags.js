'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var _Tags = require('../../../client/components/Tags');

var _Tags2 = _interopRequireDefault(_Tags);

var _styles = require('../../../client/components/Tags/styles.js');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderTagsFactory(forceRender) {
  function renderTags(_ref) {
    var props = _ref.props,
        render = _ref.render;

    if (props.cache && !forceRender) {
      return { tagsContent: props.cache };
    }

    var tags = Object.keys(props.tags || []).reduce(function (allTags, tag) {
      return allTags.concat({
        value: tag,
        count: props.tags[tag].readCount + props.tags[tag].recommendedCount
      });
    }, []);

    return {
      tagsContent: {
        html: render.component((0, _preact.h)(_Tags2.default, { tags: tags })),
        style: _styles2.default
      }
    };
  }

  return renderTags;
} /** @jsx h */
exports.default = renderTagsFactory;