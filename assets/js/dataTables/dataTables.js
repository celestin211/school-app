
import 'datatables.net-responsive/js/dataTables.responsive.min';

import $ from "jquery";

$.extend( true, $.fn.dataTable.defaults, {
    'paging'      : true,
    'lengthChange': false,
    'searching'   : true,
    'ordering'    : true,
    'info'        : true,
    'autoWidth'   : true,
    'responsive': true,
} );

