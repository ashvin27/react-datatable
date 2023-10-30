import React from "react";

export const TableToolButtons = ({ theme, buttons }) => {
    const visibleButtons = buttons.filter(button => (button.shouldRender || typeof button.shouldRender === "undefined"));
    return visibleButtons.map(({
        children = [],
        render,
        shouldRender,
        text,
        className,
        ...restProps
    }, index) => {
        return (
            <button
                key={index}
                type="button"
                className={`${theme}_asrt-button ${className}`}
                {...restProps}
            >
                {render?.({ text })}
                {children}
            </button>
        );
    });
};

export default TableToolButtons;
