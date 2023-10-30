import React from "react";
import InputBox from "../../InputBox/InputBox";

export const TableHeaderSearch = ({ theme, config, filterRecords }) => {
    return (
        <div className={`${theme}_asrt-table-filter`}>
            <InputBox
                theme={theme}
                type="search"
                placeholder={config?.language?.filter}
                // onChange={filterRecords}
            />
        </div>
    );
}

export default TableHeaderSearch;