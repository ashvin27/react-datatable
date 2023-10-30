import React from 'react';
import includes from 'lodash/includes';
import style from '../../style';
import "./style.scss";
import TableToolButtons from './TableToolButtons';
import TableHeaderSearch from './TableHeaderSearch/TableHeaderSearch';



export const TableHeader = ({ config, id, lengthMenuText, changePageSize, recordLength, exportToExcel, exportToCSV, exportToPDF, extraButtons, filterRecords }) => {
  const { theme = "primary" } = config;
  const baseClass = `${theme}_asrt-table-head`;

  const defaultButtons = [
    {
      className: `asrt_buttons-excel`,
      title:"Export to Excel",
      text: "Excel",
      render: ({ text }) => text,
      // onClick: exportToExcel,
      shouldRender: config?.button?.excel
    },
    {
      className: `asrt_buttons-csv`,
      title:"Export to CSV",
      text: "CSV",
      render: ({ text }) => text,
      // onClick: exportToCSV,
      shouldRender: config?.button?.csv
    },
    {
      className: `asrt_buttons-pdf`,
      title:"Export to PDF",
      text: "Print",
      render: ({ text }) => text,
      // onClick: exportToPDF,
      shouldRender: config?.button?.print
    }
  ];
  const tableToolButtons = config.button.extra ? [...defaultButtons, ...extraButtons] : [...defaultButtons];
  return (
    <div className={`table-head ${baseClass}`} id={id ? `${id}-table-head` : ""}>
      <div>
        {config?.show_length_menu && (
          <div className="input-group asrt-page-length">
            <div className="input-group-addon input-group-prepend">
              <span className="input-group-text" style={style.table_size}>
                {(lengthMenuText[0]) ? lengthMenuText[0] : ''}
              </span>
            </div>
            {(includes(config.language.length_menu, '_MENU_')) ? (
              <select type="text" className="form-control" style={style.table_size_dropdown}
                onChange={changePageSize}>
                {config.length_menu.map((value, key) => {
                  return (<option key={value}>{value}</option>);
                })}
                <option value={recordLength}>All</option>
              </select>
            ) : null}
            <div className="input-group-addon input-group-prepend">
              <span className="input-group-text" style={style.table_size}>
                {(lengthMenuText[1]) ? lengthMenuText[1] : ''}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className={`${baseClass}__tool_filter`}>
        {config.show_filter && <TableHeaderSearch
          theme={theme}
          config={config}
          filterRecords={filterRecords}
        />}
        <div className={`${baseClass}__table_tools`}>
          <TableToolButtons theme={theme} buttons={tableToolButtons} />
        </div>
      </div>
    </div>
  );
}

export default TableHeader;