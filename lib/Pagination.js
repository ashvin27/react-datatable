"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InitialPagination;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InitialPagination(props) {
  return _react2.default.createElement(
    _react.Fragment,
    null,
    props.config.show_first ? _react2.default.createElement(
      "li",
      { className: (props.isFirst ? "disabled " : "") + "page-item" },
      _react2.default.createElement(
        "a",
        { href: "#", className: "page-link", tabIndex: "-1",
          onClick: props.firstPage },
        props.config.language.pagination.first
      )
    ) : null,
    _react2.default.createElement(
      "li",
      { className: (props.isFirst ? "disabled " : "") + "page-item" },
      _react2.default.createElement(
        "a",
        { href: "#", className: "page-link", tabIndex: "-1",
          onClick: props.previousPage },
        props.config.language.pagination.previous
      )
    ),
    _react2.default.createElement(
      "li",
      { className: "page-item" },
      _react2.default.createElement(
        "a",
        { className: "page-link" },
        _react2.default.createElement("input", { style: {
            border: 'none',
            padding: '0',
            maxWidth: '30px',
            textAlign: 'center',
            display: 'inline-block'
          },
          type: "text",
          value: props.is_temp_page ? props.temp_page_number : props.page_number,
          onChange: function onChange(e) {
            return props.onPageChange(e, true);
          },
          onBlur: props.onPageBlur,
          onKeyDown: props.onPageChange })
      )
    ),
    _react2.default.createElement(
      "li",
      { className: (props.isLast ? "disabled " : "") + "page-item" },
      _react2.default.createElement(
        "a",
        { href: "#", className: "page-link",
          onClick: props.nextPage },
        props.config.language.pagination.next
      )
    ),
    props.config.show_last ? _react2.default.createElement(
      "li",
      { className: (props.isLast ? "disabled " : "") + "page-item" },
      _react2.default.createElement(
        "a",
        { href: "#", className: "page-link", tabIndex: "-1",
          onClick: props.lastPage },
        props.config.language.pagination.last
      )
    ) : null
  );
}