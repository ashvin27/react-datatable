export const DEFAULT_CONFIG = { 
  button: {
  excel: false,
  print:   false,
  csv:  false,
  extra :  false,
},
filename:  "table",
key_column: "id",
language: {
  length_menu: "Show _MENU_ records per page",
  filter:  "Search in records...",
  info:   "Showing _START_ to _END_ of _TOTAL_ entries",
  pagination: {
    first:  "First",
    previous:"Previous",
    next:  "Next",
    last:  "Last"
  },
  no_data_text: 'No rows found',
  loading_text:  "Loading..."
},
length_menu:  [10, 25, 50, 75, 100],
show_length_menu:  true,
show_filter:  true,
show_pagination: true,
show_info: true,
show_first: true,
show_last:  true,
pagination: 'basic'
};