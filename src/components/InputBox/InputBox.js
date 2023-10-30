import React from "react";

export const InputBox = ({ theme, ...inputProps }) => {
    return (
        <input
            className={`${theme}_asrt-input-box`}
            {...inputProps}
        />
    );
};

export default InputBox;