'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _upArrow = require('../assets/img/up-arrow.png');

var _upArrow2 = _interopRequireDefault(_upArrow);

var _downArrow = require('../assets/img/down-arrow.png');

var _downArrow2 = _interopRequireDefault(_downArrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  table_body: {
    marginTop: '16px'
  },
  table_size: {
    background: 'none',
    border: 'none',
    padding: 0
  },
  table_size_dropdown: {
    width: '70px',
    flex: 'none',
    margin: '0px 10px',
    display: 'inline-block',
    float: 'none'
  },
  table_filter: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginRight: '5px',
    width: '250px'
  },
  table_tool: {
    display: 'inline-block',
    verticalAlign: 'top'
  },
  table_tool_btn: {
    marginRight: '5px'
  },
  sort_asc: {
    backgroundImage: 'url(' + _upArrow2.default + ')'
  },
  sort_desc: {
    backgroundImage: 'url(' + _downArrow2.default + ')'
  }
};