import upArrow from '../assets/img/up-arrow.png';
import downArrow from '../assets/img/down-arrow.png';

export default {
    table_body: {
      marginTop: '16px'
    },
    table_size: {
      background: 'none',
      border: 'none',
      padding: 0
    },
    table_size_dropdown: {
      width: '70px',
      flex: 'none',
      margin: '0px 10px',
      display: 'inline-block',
      float: 'none'
    },
    table_filter: {
      display: 'inline-block',
      verticalAlign: 'top',
      marginRight: '5px',
      width: '250px'
    },
    table_tool: {
      display: 'inline-block',
      verticalAlign: 'top'
    },
    table_tool_btn: {
      marginRight: '5px'
    },
    sort_asc: {
      backgroundImage: `url(${upArrow})`
    },
    sort_desc: {
      backgroundImage: `url(${downArrow})`
    }
  }