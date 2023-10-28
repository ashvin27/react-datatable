import React, { useContext } from "react";
import includes from "lodash/includes";
import style from "../style";

const TableHeader = ({
  id,
  filterRecords,
  exportToExcel,
  extraButtons,
  changePageSize,
  recordLength,
  lengthMenuText,
  exportToCSV,
  exportToPDF
}) => {
  const config = useContext(ConfigContext);

  config.show_length_menu ||
  config.show_filter ||
  config.button.excel ||
  config.button.csv ||
  config.button.print ? (
    <div
      className="row table-head asrt-table-head"
      id={id ? id + "-table-head" : ""}
    >
      <div className="col-md-6">
        {config.show_length_menu ? (
          <div className="input-group asrt-page-length">
            <div className="input-group-addon input-group-prepend">
              <span className="input-group-text" style={style.table_size}>
                {lengthMenuText[0] ?? ""}
              </span>
            </div>
            {includes(config.language.length_menu, "_MENU_") ? (
              <select
                type="text"
                className="form-control"
                style={style.table_size_dropdown}
                onChange={changePageSize}
              >
                {config.length_menu.map((value) => {
                  return <option key={value}>{value}</option>;
                })}
                <option value={recordLength}>All</option>
              </select>
            ) : null}
            <div className="input-group-addon input-group-prepend">
              <span className="input-group-text" style={style.table_size}>
                {lengthMenuText[1] ?? ""}
              </span>
            </div>
          </div>
        ) : null}
      </div>
      <div className="col-md-6 float-right text-right">
        {config.show_filter ? (
          <div className="table_filter" style={style.table_filter}>
            <input
              type="search"
              className="form-control"
              placeholder={config.language.filter}
              onChange={filterRecords}
            />
          </div>
        ) : null}
        <div className="table_tools" style={style.table_tool}>
          {config.button.excel ? (
            <button
              className="btn btn-primary buttons-excel"
              tabIndex="0"
              aria-controls="configuration_tbl"
              title="Export to Excel"
              style={style.table_tool_btn}
              onClick={exportToExcel}
            >
              <span>
                <i className="fa fa-file-excel-o" aria-hidden="true"></i>
              </span>
            </button>
          ) : null}
          {config.button.csv ? (
            <button
              className="btn btn-primary buttons-csv"
              tabIndex="0"
              aria-controls="configuration_tbl"
              title="Export to CSV"
              style={style.table_tool_btn}
              onClick={exportToCSV}
            >
              <span>
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
              </span>
            </button>
          ) : null}
          {config.button.print ? (
            <button
              className="btn btn-primary buttons-pdf"
              tabIndex="0"
              aria-controls="configuration_tbl"
              title="Export to PDF"
              style={style.table_tool_btn}
              onClick={exportToPDF}
            >
              <span>
                <i
                  className="glyphicon glyphicon-print fa fa-print"
                  aria-hidden="true"
                ></i>
              </span>
            </button>
          ) : null}
          {config.button.extra
            ? extraButtons.map((elem, index) => {
                elem.clickCount = 0;
                elem.singleClickTimer = "";
                return (
                  <button
                    className={
                      elem.className
                        ? elem.className
                        : "btn btn-primary buttons-pdf"
                    }
                    tabIndex="0"
                    aria-controls="configuration_tbl"
                    title={elem.title ? elem.title : "Export to PDF"}
                    style={style.table_tool_btn}
                    onClick={(event) => {
                      elem.onClick(event);
                    }}
                    key={index}
                  >
                    {elem.children}
                  </button>
                );
              })
            : null}
        </div>
      </div>
    </div>
  ) : null;
};

export default TableHeader;
