$(document).ready(function () {
    Showdata();
    $("#dtBox").DateTimePicker({
        titleContentDateTime:'Lựa chọn thời gian',
    });


    $("#file-image-todo").change(function() {
        var file = $(this)[0].files[0];
        var upload = new Upload(file);
        upload.doUpload(function(resultData){
            console.log(resultData);
            $("input[name=image]").val(resultData.data.image);
        });

    });

});


function ShowModal(name){
    $("#addModal").modal();
}

function ShowModalDel(_id){
    console.log(_id);
    modalConfirm(function(confirm){
        if(confirm){
          console.log('yes');
          console.log(_id);

          $.ajax({
            url: '/todo/delete/'+_id,
            type: 'GET',
            data: {},
            success: function (data) {
                location.reload();
            },
            cache: false,
            contentType: false,
            processData: false
        });
        }else{
        }
      });
}

function Showdata() {
    $('#example').DataTable({
        ajax: "/todo/getlist",
        columns: [
            { data: "title" },
            { data: "value" },
            
            {
                data: null,
                "bSortable": false,
                "mRender": function (o) { return '<img style="width:100px" src=\''+o.image+'\'>'; }
            },
            { data: "datetime" },
            {
                data: null,
                "bSortable": false,
                "mRender": function (o) { return '<button type="button" class="btn btn-warning" onclick="ShowModal(\'' + o._id + '\')">' + 'Edit' + '</button> <button type="button" class="btn btn-danger" onclick="ShowModalDel(\'' + o._id + '\')">' + 'Del' + '</button>'; }
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
