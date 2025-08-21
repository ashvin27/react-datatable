import React, { Fragment } from 'react';

export interface BasicPaginationProps {
  config: {
    show_first?: boolean;
    show_last?: boolean;
    language: {
      pagination: {
        first: string;
        previous: string;
        next: string;
        last: string;
      };
    };
  };
  isFirst: boolean;
  isLast: boolean;
  firstPage: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  previousPage: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  nextPage: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  lastPage: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  page_number: number;
  temp_page_number?: number;
  is_temp_page?: boolean;
  onPageChange: (e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>, isInput?: boolean) => void;
  onPageBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const BasicPagination: React.FC<BasicPaginationProps> = (props) => {
  return (
    <Fragment>
      {props.config.show_first ? (
        <li className={(props.isFirst ? 'disabled ' : '') + 'page-item'}>
          <a href="#" className="page-link" tabIndex={-1}
            onClick={props.firstPage}>
            {props.config.language.pagination.first}
          </a>
        </li>
      ) : null}
      <li className={(props.isFirst ? 'disabled ' : '') + 'page-item'}>
        <a href="#" className="page-link" tabIndex={-1}
          onClick={props.previousPage}>
          {props.config.language.pagination.previous}
        </a>
      </li>
      <li className="page-item">
        <a className="page-link">
          <input
            style={{
              border: 'none',
              padding: '0',
              maxWidth: '30px',
              textAlign: 'center',
              display: 'inline-block',
            }}
            type="text"
            value={props.is_temp_page ? props.temp_page_number : props.page_number}
            onChange={(e) => props.onPageChange(e, true)}
            onBlur={props.onPageBlur}
            onKeyDown={props.onPageChange}
          />
        </a>
      </li>
      <li className={(props.isLast ? 'disabled ' : '') + 'page-item'}>
        <a href="#" className="page-link"
          onClick={props.nextPage}>
          {props.config.language.pagination.next}
        </a>
      </li>
      {props.config.show_last ? (
        <li className={(props.isLast ? 'disabled ' : '') + 'page-item'}>
          <a href="#" className="page-link" tabIndex={-1}
            onClick={props.lastPage}>
            {props.config.language.pagination.last}
          </a>
        </li>
      ) : null}
    </Fragment>
  );
};

export default BasicPagination;
