import React, { Fragment } from 'react';

export default function InitialPagination(props) {
    return (
      <Fragment>
        {(props.config.show_first) ? (
          <li className={(props.isFirst ? "disabled " : "") + "page-item"}>
            <a href='#' className="page-link" tabIndex="-1"
              onClick={props.firstPage}>
              {props.config.language.pagination.first}
            </a>
          </li>
        ) : null}
        <li className={(props.isFirst ? "disabled " : "") + "page-item"}>
          <a href='#' className="page-link" tabIndex="-1"
            onClick={props.previousPage}>
            {props.config.language.pagination.previous}
          </a>
        </li>
        <li className="page-item">
          <a className="page-link">
            <input style={{
                  border: 'none',
                  padding: '0',
                  maxWidth: '30px',
                  textAlign: 'center',
                  display: 'inline-block'
            }}
              type="text"
              value={(props.is_temp_page) ? props.temp_page_number : props.page_number}
              onChange={(e) => props.onPageChange(e, true)}
              onBlur={props.onPageBlur}
              onKeyDown={props.onPageChange}/>
          </a>
        </li>
        <li className={(props.isLast ? "disabled " : "") + "page-item"}>
          <a href='#' className="page-link"
            onClick={props.nextPage}>
            {props.config.language.pagination.next}
          </a>
        </li>
        {(props.config.show_last) ? (
          <li className={(props.isLast ? "disabled " : "") + "page-item"}>
            <a href='#' className="page-link" tabIndex="-1"
              onClick={props.lastPage}>
              {props.config.language.pagination.last}
            </a>
          </li>
        ) : null}
      </Fragment>
    )
}