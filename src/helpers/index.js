const strip = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

const getExportHtml = (records,columns,filter_value,sortRecords,filterData) => {
  let tableHtml = "<table>";
  tableHtml += "<thead>";
  tableHtml += "<tr>";
  for (let column of columns) {
    tableHtml += "<th>" + column.text + "</th>";
  }
  tableHtml += "</tr>";
  tableHtml += "</thead>";
  tableHtml += "<tbody>";

  // Filter records before export
  let filterRecords = records;
  if(!dynamic){
    let records = sortRecords(),
      filterValue = filter_value;
      filterRecords = records;

    if (filterValue) {
      filterRecords = filterData(records);
    }
  }

  for (let i in filterRecords) {
    let record = filterRecords[i];
    tableHtml += "<tr>";
    for (let column of columns) {
      if (column.cell && typeof column.cell === "function") {
        let cellData =  ReactDOMServer.renderToStaticMarkup(column.cell(record, i));
            cellData = strip(cellData);
        tableHtml += "<td>" + cellData + "</td>";
      }else if (record[column.key]) {
        tableHtml += "<td>" + record[column.key] + "</td>";
      } else {
        tableHtml += "<td></td>";
      }
    }
    tableHtml += "</tr>";
  }
  tableHtml += "</tbody>";
  tableHtml += "</table>";

  return tableHtml;
}

const exportToExcel = (records,columns,config,filter_value,sortRecords,filterData) => {
  let downloadLink, dataType = 'application/vnd.ms-excel';

  let tableHtml = getExportHtml(records,columns,filter_value,sortRecords,filterData);
  
  // Specify file name
  let filename = config.filename ? config.filename + '.xls':'table.xls';
  // Create download link element
  downloadLink = document.createElement("a");
  if(navigator.msSaveOrOpenBlob){
    let blob = new Blob(['\ufeff', tableHtml], {
        type: dataType
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  }else{
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHtml;
    // Setting the file name
    downloadLink.download = filename;
    //triggering the function
    downloadLink.click();
  }
}

const exportToPDF = (records, columns,config) => {
  let tableHtml = getExportHtml(records, columns);

  let style = "<style>";
  style = style + "table {width: 100%;font: 17px Calibri;}";
  style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
  style = style + "padding: 2px 3px;text-align:left;}";
  style = style + "</style>";

  let win = window.open('', '_blank');
  win.document.write('<html><head>');
  win.document.write('<title>' + config.filename + '</title>');
  win.document.write(style);
  win.document.write('</head>');
  win.document.write('<body>');
  win.document.write('<h1>' + config.filename + '</h1>');
  win.document.write(tableHtml);
  win.document.write('</body></html>');
  win.print();
  win.close();
}

const convertToCSV = (objArray) => {
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (let index in array[i]) {
      if (line != '') line += ','
      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
}

const exportToCSV = (records,columns,dynamic,sort,filter_value,callBack) => {
  let headers = {};
  // add columns in sheet array
  for (let column of columns) {
    headers[column.key] = '"' + column.text + '"';
  }

  // Filter records before export
  let filterRecords = records;
  if(!dynamic){
    let records = sort(),
      filterValue = filter_value;
      filterRecords = records;

    if (filterValue) {
      filterRecords = callBack(records);
    }
  }

  let records = [];
  // add data rows in sheet array
  for (let i in filterRecords) {
    let record = filterRecords[i],
      newRecord = {};
    for (let column of columns) {
      if (column.cell && typeof column.cell === "function") {
        let cellData =  ReactDOMServer.renderToStaticMarkup(column.cell(record, i));
            cellData = strip(cellData);
        newRecord[column.key] = cellData;
      } else if (record[column.key]) {
        let colValue  = record[column.key];
        colValue = (typeof colValue === "string") ? colValue.replace(/"/g, '""') : colValue;
        newRecord[column.key] = '"' + colValue + '"';
      } else {
        newRecord[column.key] = "";
      }
    }
    records.push(newRecord);
  }
  if (headers) {
    records.unshift(headers);
  }
  // Convert Object to JSON
  let jsonObject = JSON.stringify(records);
  let csv = convertToCSV(jsonObject);
  let exportedFilename = config.filename + '.csv' || 'export.csv';
  let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, exportedFilename);
  } else {
    let link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      let url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
}


const isLast = (pages,page_number) => {
  // because for empty records page_number will still be 1
  if(pages === 0){
    return true;
  }
  if (page_number == pages) {
    return true
  } else {
    return false;
  }
}

const isFirst = (page_number) => {
  if (page_number === 1) {
    return true;
  } 
  return false
}

const goToPage = (e, pageNumber,page_number,callBack,onPageChange) => {
  e.preventDefault();
  if(page_number === pageNumber){
    return;
  }
  let pageState = {
    previous_page: page_number,
    current_page: pageNumber
  };
  callBack({
    is_temp_page: false,
    page_number: pageNumber
  });
  onPageChange(pageState);
}

const firstPage=(e) => {
  e.preventDefault();
  if(isFirst()) return;
  goToPage(e, 1);
}

const lastPage = (e,pages) => {
  e.preventDefault();
  if(isLast()) return;
  goToPage(e, pages);
}

const previousPage = (e,page_number) => {
  e.preventDefault();
  if(isFirst()) return false;
  goToPage(e, page_number - 1);
}

const nextPage = (e, page_number) => {
  e.preventDefault();
  if(isLast()) return;
  goToPage(e, parseInt(page_number) + 1);
}

const onPageChange = (e, isInputChange = false, callBack) => {
  if(isInputChange){
    stateUpdate({
      is_temp_page : true,
      temp_page_number: e.target.value
    });
  } else {
    if (e.key === 'Enter') {
      let pageNumber = e.target.value;
      goToPage(e, pageNumber);
    }
  }
}

const onPageBlur = (e) => {
  let pageNumber = e.target.value;
  goToPage(event, pageNumber);
}


