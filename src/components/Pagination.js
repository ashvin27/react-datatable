import React, { Fragment } from "react";

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
  return (
    <Fragment>
      {props.config.show_first ? (
        <li className={(isFirst ? "disabled " : "") + "page-item"}>
          <a
            href="#"
            className="page-link"
            tabIndex="-1"
            onClick={firstPage}
          >
            {props.config.language.pagination.first}
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
          {props.config.language.pagination.previous}
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
          {props.config.language.pagination.next}
        </a>
      </li>
      {props.config.show_last ? (
        <li className={(isLast ? "disabled " : "") + "page-item"}>
          <a
            href="#"
            className="page-link"
            tabIndex="-1"
            onClick={lastPage}
          >
            {props.config.language.pagination.last}
          </a>
        </li>
      ) : null}
    </Fragment>
  );
};

export default InitialPagination