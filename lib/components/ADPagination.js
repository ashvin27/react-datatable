"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ADPagination;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ADPagination(props) {
  var size = props.pages;
  var page = props.page_number;
  var step = 2;
  var tags = [];
  var pagination = props.language.pagination;


  var Item = function Item(props) {
    var className = props.className || "";
    return _react2.default.createElement(
      "li",
      { className: "page-item " + className },
      _react2.default.createElement(
        "a",
        { href: "#", className: "page-link", tabIndex: "-1",
          onClick: function onClick(e) {
            e.preventDefault();props.onClick(e);
          } },
        props.children
      )
    );
  };

  var Add = function Add(s, f) {
    var _loop = function _loop(i) {
      tags.push(_react2.default.createElement(
        Item,
        {
          key: i,
          className: page == i ? "active" : "",
          onClick: function onClick(e) {
            return props.goToPage(e, i);
          } },
        i
      ));
    };

    for (var i = s; i < f; i++) {
      _loop(i);
    }
  };

  var Last = function Last() {
    tags.push(_react2.default.createElement(
      Item,
      { key: "l..." },
      "..."
    ));
    tags.push(_react2.default.createElement(
      Item,
      { key: size,
        className: page == size ? "active" : "",
        onClick: function onClick(e) {
          return props.goToPage(e, size);
        } },
      size
    ));
  };

  var First = function First() {
    tags.push(_react2.default.createElement(
      Item,
      {
        key: "1",
        className: page == 1 ? "active" : "",
        onClick: function onClick(e) {
          return props.goToPage(e, 1);
        } },
      "1"
    ));
    tags.push(_react2.default.createElement(
      Item,
      { key: "f..." },
      "..."
    ));
  };

  tags.push(_react2.default.createElement(
    Item,
    {
      key: "p0",
      className: props.isFirst ? "disabled " : "",
      onClick: props.previousPage },
    pagination.previous ? pagination.previous : _react2.default.createElement(
      "span",
      null,
      "\u25C4"
    )
  ));

  if (size < step * 2 + 6) {
    Add(1, size + 1);
  } else if (page < step * 2 + 1) {
    Add(1, step * 2 + 4);
    Last();
  } else if (page > size - step * 2) {
    First();
    Add(size - step * 2 - 2, size + 1);
  } else {
    First();
    Add(page - step, page + step + 1);
    Last();
  }

  tags.push(_react2.default.createElement(
    Item,
    {
      key: "n0",
      className: props.isLast ? "disabled " : "",
      onClick: props.nextPage },
    pagination.next ? pagination.next : _react2.default.createElement(
      "span",
      null,
      "\u25BA"
    )
  ));

  return tags;
}