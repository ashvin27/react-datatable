import ReactDatatable from '../index';
import users from '../../example/data/data.json';

const meta = {
  title: 'Example/ReactDatatable',
  component: ReactDatatable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};



const columns = [
    {
        key: "name",
        text: "Name",
        className: "name",
        TrOnlyClassName:"aClass",
        align: "left",
        sortable: true,
    },
    {
        key: "address",
        text: "Address",
        className: "address",
        align: "left",
        sortable: true
    },
    {
        key: "postcode",
        text: "Postcode",
        className: "postcode",
        sortable: true
    },
    {
        key: "rating",
        text: "Rating",
        className: "rating",
        align: "left",
        sortable: true,
        cell: record => {
            return <span>{record.rating} {record.type_of_food}</span>
        }
    },
    {
        key: "type_of_food",
        text: "Type of Food",
        className: "type_of_food",
        sortable: true,
        align: "left"
    },
    {
        key: "action",
        text: "Action",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        cell: record => {
            return (
                <>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => this.editUser(record)}
                        style={{marginRight: '5px'}}>
                        <i className="glyphicon glyphicon-edit fa fa-edit"></i>
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => this.deleteUser(record)}>
                        <i className="glyphicon glyphicon-trash fa fa-trash"></i>
                    </button>
                    
                </>
            );
        }
    }
];

const config = {
    key_column: '_id', 
    page_size: 10,
    length_menu: [ 10, 20, 50 ],
    filename: "Users",
    no_data_text: 'No data available!',
    button: {
        excel: true,
        print: true,
        csv: true,
        extra: false,
    },
    language: {
        length_menu: "Show _MENU_ result per page",
        filter: "Filter in records...",
        info: "Showing _START_ to _END_ of _TOTAL_ records",
        pagination: {
            first: "First",
            previous: <span>&#9668;</span>,
            next: <span>&#9658;</span>,
            last: "Last"
        }
    },
    pagination: "advance", //advance
    show_length_menu: true,
    show_filter: true,
    show_pagination: true,
    show_info: true,
};

const extraButtons =[
    {
      className:"btn btn-primary buttons-pdf",
      title:"Export TEst",
      children:[
          <span>
            <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
          </span>
      ],
      onClick:(event)=>{
          console.log(event);
      },
    },
    {
        className:"btn btn-primary buttons-pdf",
        title:"Export TEst",
        children:[
          <span>
            <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
          </span>
        ],
        onClick:(event)=>{
            console.log(event);
        },
        onDoubleClick:(event)=>{
            console.log("doubleClick")
        }
    },
]

export const Default = {
  component: ReactDatatable,
  args: {
    id: "data-table",
    className: "table table-bordered table-striped custom-class",
    config,
    records: users,
    columns,
    extraButtons,
  },
};

export default meta;


