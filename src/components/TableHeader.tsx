import React from 'react';
import includes from 'lodash/includes';

export interface TableHeaderProps {
  config: any;
  id?: string;
  lengthMenuText: string[];
  recordLength: number;
  filterRecords: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changePageSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  exportToExcel: () => void;
  exportToCSV: () => void;
  exportToPDF: () => void;
  extraButtons?: Array<any>;
}

const TableHeader: React.FC<TableHeaderProps> = (props) => {
  if (
    props.config.show_length_menu === true ||
    props.config.show_filter === true ||
    props.config.button.excel === true ||
    props.config.button.csv === true ||
    props.config.button.print === true
  ) {
    return (
      <div className="row table-head asrt-table-head" id={props.id ? props.id + "-table-head" : ""}>
        <div className="col-md-6">
          {props.config.show_length_menu ? (
            <div className="input-group asrt-page-length">
              <div className="input-group-addon input-group-prepend">
                <span className="input-group-text">
                  {props.lengthMenuText[0] ? props.lengthMenuText[0] : ''}
                </span>
              </div>
              {includes(props.config.language.length_menu, '_MENU_') ? (
                <select className="form-control" onChange={props.changePageSize}>
                  {props.config.length_menu.map((value: number, key: number) => (
                    <option key={value}>{value}</option>
                  ))}
                  <option value={props.recordLength}>All</option>
                </select>
              ) : null}
              <div className="input-group-addon input-group-prepend">
                <span className="input-group-text" >
                  {props.lengthMenuText[1] ? props.lengthMenuText[1] : ''}
                </span>
              </div>
            </div>
          ) : null}
        </div>
        <div className="col-md-6 float-right text-right">
          {props.config.show_filter ? (
            <div className="table_filter">
              <input
                type="search"
                className="form-control"
                placeholder={props.config.language.filter}
                onChange={props.filterRecords}
              />
            </div>
          ) : null}
          <div className="table_tools">
            {props.config.button.excel ? (
              <button className="btn btn-primary buttons-excel" tabIndex={0} aria-controls="configuration_tbl" title="Export to Excel" onClick={props.exportToExcel}>
                <span>
                  <i className="fa fa-file-excel-o" aria-hidden="true"></i>
                </span>
              </button>
            ) : null}
            {props.config.button.csv ? (
              <button className="btn btn-primary buttons-csv" tabIndex={0} aria-controls="configuration_tbl" title="Export to CSV" onClick={props.exportToCSV}>
                <span>
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                </span>
              </button>
            ) : null}
            {props.config.button.print ? (
              <button className="btn btn-primary buttons-pdf" tabIndex={0} aria-controls="configuration_tbl" title="Export to PDF" onClick={props.exportToPDF}>
                <span>
                  <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
                </span>
              </button>
            ) : null}
            {props.config.button.extra === true && props.extraButtons ? (
              props.extraButtons.map((elem: any, index: number) => {
                return (
                  <button
                    className={elem.className ? elem.className : "btn btn-primary buttons-pdf"}
                    tabIndex={0}
                    aria-controls="configuration_tbl"
                    title={elem.title ? elem.title : "Export to PDF"}
                  
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      elem.onClick(event);
                    }}
                    key={index}
                  >
                    {elem.children}
                  </button>
                );
              })
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default TableHeader;
