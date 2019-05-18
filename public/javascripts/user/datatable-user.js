$(document).ready(function () {
    
    Showdata();
});

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

function ShowModal(name){
    $("#addModal").modal();
}

function ShowModalDel(name){
    console.log('del name: '+name);
}

function SaveUser(){
    //var datapost = $('#userform').serializeFiles();
    var form = $("#userform");
    // you can't pass Jquery form it has to be javascript form object
    var formData = new FormData(form[0]);
    console.log(formData);


    // var datapost = $('#userform').serialize();
    // console.log(datapost);


    $.ajax({
        url: '/user/save',
        type: 'POST',
        data: formData,
        success: function (data) {
            console.log(data);
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function UploadFile(input) {
    var formData = new FormData();
    formData.append("input", input);
    console.log(formData);
    $.ajax({
        url: '/uploadfile/single',
        type: 'POST',
        data: formData,
        success: function (data) {
            alert(data)
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

var socket = io('http://localhost:3002');
socket.on('connect', function () { });
socket.on('event', function (data) { });

socket.on('push-notify', function (msg) {
    console.log(msg);
});

socket.on('newclientconnect', function (data) {
    console.log(data);
});

socket.on('disconnect', function () { });