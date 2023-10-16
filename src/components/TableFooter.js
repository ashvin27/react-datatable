import React from "react";
import Pagination from "./Pagination";
import ADPagination from "./ADPagination";

const TableFooter = ({
  id,
  isFirst,
  isLast,
  paginationInfo,
  pages,
  page_number,
  is_temp_page,
  temp_page_number,
  previousPage,
  firstPage,
  nextPage,
  lastPage,
  goToPage,
  onPageChange,
  onPageBlur,
}) => {
  props.config.show_info && props.config.show_pagination ? (
    <div
      className="row table-foot asrt-table-foot"
      id={id ? id + "-table-foot" : ""}
    >
      <div className="col-md-6">
        {props.config.show_info ? paginationInfo : null}
      </div>
      <div className="col-md-6 pull-right text-right">
        {props.config.show_pagination ? (
          <nav aria-label="Page navigation" className="pull-right">
            <ul className="pagination justify-content-end asrt-pagination">
              {props.config.pagination == "basic" ? (
                <Pagination
                  config={config}
                  isFirst={isFirst}
                  isLast={isLast}
                  pages={pages}
                  page_number={page_number}
                  is_temp_page={is_temp_page}
                  temp_page_number={temp_page_number}
                  previousPage={previousPage}
                  firstPage={firstPage}
                  nextPage={nextPage}
                  lastPage={lastPage}
                  goToPage={goToPage}
                  onPageChange={onPageChange}
                  onPageBlur={onPageBlur}
                />
              ) : (
                <ADPagination
                  language={config.language}
                  isFirst={isFirst}
                  isLast={isLast}
                  pages={pages}
                  page_number={page_number}
                  previousPage={previousPage}
                  nextPage={nextPage}
                  goToPage={goToPage}
                />
              )}
            </ul>
          </nav>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default TableFooter;
