$(document).ready(function () {
    Showdata();
    $("#dtBox").DateTimePicker({
        titleContentDateTime:'Lựa chọn thời gian',
    });
});


function ShowModal(name){
    $("#addModal").modal();
}

function Showdata() {
    $('#example').DataTable({
        ajax: "data/orthogonal.txt",
        columns: [
            { data: "name" },
            { data: "position" },
            { data: "office" },
            { data: "extn" },
            {
                data: {
                    _: "start_date.display",
                    sort: "start_date.timestamp"
                }
            },
            { data: "salary" },
            {
                data: null,
                "bSortable": false,
                "mRender": function (o) { return '<button type="button" class="btn btn-warning" onclick="ShowModal(\'' + o.name + '\')">' + 'Edit' + '</button> <button type="button" class="btn btn-danger" onclick="ShowModalDel(\'' + o.name + '\')">' + 'Del' + '</button>'; }
            }
        ], 
        dom: 'l<"toolbar">frtip',
        initComplete: function () {
            $("div.toolbar")
                .html('<button type="button" id="any_button" class="btn btn-success" data-toggle="modal" data-target="#addModal"> add </button>');
        }
            
    });
}

function SaveTodo(){
    console.log('SaveTodo');
    var form = $("#todoform");
    var formData = new FormData(form[0]);
    console.log(formData);
    $.ajax({
        url: '/todo/save',
        type: 'POST',
        data: formData,
        success: function (data) {
            console.log(data);
            $('#addModal').modal('hide');
        },
        cache: false,
        contentType: false,
        processData: false
    });
}