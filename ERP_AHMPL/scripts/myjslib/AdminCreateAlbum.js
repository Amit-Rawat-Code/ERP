function showLoader() {
    $('#cover-spin').show(0);
};

function hideLoader() {
    $('#cover-spin').hide();
};

function PhotoAlbumUpload() {
    debugger
    showLoader();
    var collectionobj = {};
    collectionobj.AlbumName = $('#txttitle').val();
    collectionobj.Description = $('#txtdescription').val();
    collectionobj.EventDate = $('#txtdate').val();

    var files = $('#AlbumIcon').attr('value').replace(/^data:image\/[a-z]+;base64,/, "");
    var fileData = new FormData();
    debugger;
    if (files.length == 0) {
        alert("Oops!, Please drop some Images.");
    }
    else {

        if (files.size >= 1048576) {
            alert(i + 1 + " file is more than 1 mb");
            return;
        }
        fileData.append("fileInput", files);
        collectionobj.AlbumIcon = $('#AlbumIcon').attr('value').replace(/^data:image\/[a-z]+;base64,/, "");
    }

    $.ajax({
        type: "POST",
        //url: "../Admin/AdminPhotoAlbum.aspx/SavePhotoAlbum",
        data: '{obj:' + JSON.stringify(collectionobj) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        failure: function (response) {
            hideLoader();
        }
    });
}

function show(input, imgfileid) {
    debugger;
    if (input.files && input.files[0]) {
        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            $('#AlbumIcon').val(e.target.result);
            $(imgfileid).attr('value', e.target.result);
        }
        filerdr.readAsDataURL(input.files[0]);
    };
};
function clearControl(flag) {
    debugger;
    $('#txtfirstName').val('');
    $('#txtMiddleName').val('');
    $('#txtLastName').val('');
    $('#txtDesignation').val('');
    $('#txtContactNo').val('');
    $('#txtAlternateNo').val('');
    $('#txtSchoolName').val('');
    $('#txtStudentStrength').val('');
    $('#txtCity').val('');
    $('#txtAddress').val('');
    $('#txtEmailId').val('');
    $('#txtMessage').val('');
    if (flag != null) {
        showMsgBox('4')
    }
}
function responsemsg(response) {
    debugger;

    hideLoader();
    clearControl();
    swal("Thanks for showing interest,Soon Our representative connect with you, your Enquiry No :" + response)
    if (window.location.href.split('?')[1] == '1')
        setTimeout(function () { window.location.href = "RequestDemo.aspx"; }, 3000);
}
function OnSuccess(response) {
    debugger;
    responsemsg(response.d)
}