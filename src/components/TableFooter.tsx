import React from 'react';
import Pagination from './BasicPagination';
import AdvancePagination from './AdvancePagination';

export interface TableFooterProps {
  config: any;
  id?: string;
  paginationInfo: React.ReactNode;
  isFirst: boolean;
  isLast: boolean;
  pages: number;
  page_number: number;
  is_temp_page: boolean;
  temp_page_number?: number;
  previousPage: (e: React.MouseEvent) => void;
  firstPage: (e: React.MouseEvent) => void;
  nextPage: (e: React.MouseEvent) => void;
  lastPage: (e: React.MouseEvent) => void;
  goToPage: (e: React.MouseEvent, pageNumber: number) => void;
  onPageChange: (e: any, isInputChange?: boolean) => void;
  onPageBlur: (e: any) => void;
}

const TableFooter: React.FC<TableFooterProps> = (props) => {
  if (props.config.show_info === true || props.config.show_pagination === true) {
    return (
      <div className="row table-foot asrt-table-foot" id={props.id ? props.id + "-table-foot" : ""}>
        <div className="col-md-6">
          {props.config.show_info ? props.paginationInfo : null}
        </div>
        <div className="col-md-6 pull-right text-right">
          {props.config.show_pagination ? (
            <nav aria-label="Page navigation" className="pull-right">
              <ul className="pagination justify-content-end asrt-pagination">
                {props.config.pagination === "basic" ? (
                  <Pagination
                    config={props.config}
                    isFirst={props.isFirst}
                    isLast={props.isLast}
                    page_number={props.page_number}
                    is_temp_page={props.is_temp_page}
                    temp_page_number={props.temp_page_number}
                    previousPage={props.previousPage}
                    firstPage={props.firstPage}
                    nextPage={props.nextPage}
                    lastPage={props.lastPage}
                    onPageChange={props.onPageChange}
                    onPageBlur={props.onPageBlur}
                  />
                ) : (
                  <AdvancePagination
                    language={props.config.language}
                    isFirst={props.isFirst}
                    isLast={props.isLast}
                    pages={props.pages}
                    page_number={props.page_number}
                    previousPage={props.previousPage}
                    nextPage={props.nextPage}
                    goToPage={props.goToPage}
                  />
                )}
              </ul>
            </nav>
          ) : null}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default TableFooter;
