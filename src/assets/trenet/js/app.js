$( document ).ready(function() {

    
    setInterval(function(){ 
        var datatable_row_let = $('ngx-datatable').find('.datatable-row-left');
        if(datatable_row_let && datatable_row_let.width() == 0) $('.datatable-row-left').addClass('border-left-none');

        $('.empty-row').text('Chưa có dữ liệu');
    }, 100);

 
});