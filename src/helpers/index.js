export const renderTableHeader = (config) =>  {
    return (
        config?.show_length_menu
        || config?.show_filter
        || config?.button?.excel
        || config?.button?.csv
        || config?.button?.print
    );
}