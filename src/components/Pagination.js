import React, { Fragment, useContext } from "react";
import { ConfigContext } from "..";

const InitialPagination = ({
  isFirst,
  firstPage,
  previousPage,
  is_temp_page,
  temp_page_number,
  page_number,
  onPageBlur,
  onPageChange,
  nextPage,
  isLast,
}) => {

  const config = useContext(ConfigContext);

  return (
    <Fragment>
      {config.show_first ? (
        <li className={(isFirst ? "disabled " : "") + "page-item"}>
          <a
            href="#"
            className="page-link"
            tabIndex="-1"
            onClick={firstPage}
          >
            {config.language.pagination.first}
          </a>
        </li>
      ) : null}
      <li className={(isFirst ? "disabled " : "") + "page-item"}>
        <a
          href="#"
          className="page-link"
          tabIndex="-1"
          onClick={previousPage}
        >
          {config.language.pagination.previous}
        </a>
      </li>
      <li className="page-item">
        <a className="page-link">
          <input
            style={{
              border: "none",
              padding: "0",
              maxWidth: "30px",
              textAlign: "center",
              display: "inline-block",
            }}
            type="text"
            value={
              is_temp_page ? temp_page_number : page_number
            }
            onChange={(e) => onPageChange(e, true)}
            onBlur={onPageBlur}
            onKeyDown={onPageChange}
          />
        </a>
      </li>
      <li className={(isLast ? "disabled " : "") + "page-item"}>
        <a href="#" className="page-link" onClick={nextPage}>
          {config.language.pagination.next}
        </a>
      </li>
      {config.show_last ? (
        <li className={(isLast ? "disabled " : "") + "page-item"}>
          <a
            href="#"
            className="page-link"
            tabIndex="-1"
            onClick={lastPage}
          >
            {config.language.pagination.last}
          </a>
        </li>
      ) : null}
    </Fragment>
  );
};

export default InitialPagination