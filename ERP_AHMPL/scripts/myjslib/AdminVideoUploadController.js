app.AdminVideoUploadController = function ($scope, $element, $filter, myService) {
    $scope.GetUnitTypePerm = function () {
     
        var collectionobj = {};
        if (loginTypeId == '1')
            collectionobj.Action = 4;
        else
            collectionobj.Action = 5;

        collectionobj.UserId = userid;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetUnitTypeMaster", collectionobj);
        getData.then(function (response) {
            $scope.GetUnitTypePerms = response.data;
        });
    };
    $scope.GetUnitPerm = function (defaultselection) {
       
        var collectionobj = {};
        if (loginTypeId == '1')
            collectionobj.Action = 4;
        else
            collectionobj.Action = 5;
        collectionobj.UnitTypeCode = $scope.UnitTypeCode;
        collectionobj.UserId = userid;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetUnitMaster", collectionobj);
        getData.then(function (response) {
          
            $scope.GetUnitPerms = response.data;

        });
    };

    $scope.hfUnitId = (sessionStorage.getItem("UnitId"));
    $scope.photo = [];
    $scope.showLoader = function () {
        $('#cover-spin').show(0);
    };

    $scope.hideLoader = function () {
        $('#cover-spin').hide();
    };

    $scope.SetUploadedPhotoTransId = function () {
        debugger;
        var collectionobj = {};
        collectionobj.TransId = $scope.hdnVideoTransId;
        collectionobj.UnitId = $scope.UnitId;
        var getData = myService.methode('POST', "../Masters/GetUploadPhotoWithTransId", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.UploadPhoto = (response.data);
        });
    };

    $scope.AlbumName = function () {
        
        $('#dvpanel1').attr("style", "display:block");
        $('#dvpanel2').attr("style", "display:none");
        var collectionobj = {};
        collectionobj.Action = 15;
        collectionobj.UnitId = $scope.UnitId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.PhotoGalleryType = 2;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetPhotoAlbumList", collectionobj);
        getData.then(function (response) {
        $scope.rec = response.data;
        });
    };

    $scope.getVideoUrl = function () {
        var vidUrl = $scope.vdoUrl;
        $("iframe").attr("src", vidUrl);

    }

    $scope.AlbumIcon = [];
    $scope.show = function (input) {

        $scope.AlbumIcon = [];
        $scope.getFiledetails();
        for (var i = 0; i < input.files.length; i++) {
            if (input.files[i]) {
                if (input.files[i].size < '1048576') {
                    var filerdr = new FileReader();
                    filerdr.onload = function (e) {
                        $scope.AlbumIcon.push((e.target.result).replace(/^data:image\/[a-z]+;base64,/, ""));
                    }
                    filerdr.readAsDataURL(input.files[i]);
                }

            };
        }
        if (input.files && input.files[0]) {
            var filerdr = new FileReader();
            filerdr.readAsDataURL(input.files[0]);
            filerdr.onload = function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    var sizes = {
                        width: this.width,
                        height: this.height
                    };
                    if (input.files[0].size >= 1048576) {
                        alert("File is more than 1 mb");
                        $('#file').val() = "";
                        $scope.AlbumIcon = "";
                        return;
                    }
                    else if (sizes.width > 640 || sizes.height > 480) {
                        alert("File width is more than 640 px Or height is more than 480 px");
                        $('#file').val("");
                        $scope.AlbumIcon = "";
                        return;
                    }
                }
            }
        };
    };

    $scope.getFiledetails = function () {
        var x = document.getElementById("fileInput");
        var txt = "";
        var files = $('#fileInput')[0].files;
        var len = $('#fileInput').get(0).files.length;

        for (var i = 0; i < len; i++) {

            f = files[i];
            var ext = f.name.split('.').pop().toLowerCase();

            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                showMsgBox("Oops! Please Select Images(Best : .Jpeg or jpg Images)");
                return;
            }
        }

        if ('files' in x) {
            if (x.files.length == 0) {
                showMsgBox("Select one or more Images.");
            }
            else if (x.files.length > 30) {
                showMsgBox("Oops! 30 Photos maximum allowed.");
                $('#dvdata').attr('Style', 'DISPLAY:NONE');
                $('#fileInput').val('');
                return;
            }
            else {
                var totalSize = 0;
                var MaxSize = 20971520;
                for (var i = 0; i < x.files.length; i++) {
                    var file = x.files[i];
                    if ('name' in file) {
                        totalSize += file.size
                    }
                    //-------------20 mb 
                }
                if (totalSize >= MaxSize) {
                    showMsgBox("Oops! Max Size of All Photo:20 MB");
                    $('#dvdata').attr('Style', 'DISPLAY:NONE');
                    $('#fileInput').val('');
                    return;
                }
                $('#dvdata').attr('Style', 'DISPLAY:block');
                var MaxSizePhoto = 0;
                var a = 0;
                txt = "<table id='thetable' class='table compact table-hover table-striped table-bordered'><thead><tr><th>Sr.No.</th><th>Image Name</th><th>Image Size</th><th>Status</th></tr></thead><tbody>"
                for (var i = 0; i < x.files.length; i++) {

                    var a = a + 1;
                    txt += "<tr class='tab-tr" + a + "'>";
                    var file = x.files[i];

                    if ('name' in file) {
                        MaxSizePhoto += file.size
                        var photoinmb = (file.size / (1024 * 1024)).toFixed(2)
                        var color = photoinmb > 1 ? '#f78989' : '#95e695';
                        var stat = photoinmb > 1 ? 'Not Approved' : 'Approved';
                        var s = i + 1;
                        txt += "<td class='tab-td1' name='record' style='background-color:" + color + "'>" + (i + 1) + ". </td><td class='tab-td2' style='background-color:" + color + "'>" + file.name + "</td> <td class='tab-td3' style='background-color:" + color + "'> " + photoinmb + " mb</td><td style='background-color:" + color + "'>" + stat + "</td> </tr>";
                        if (MaxSizePhoto > '1048576') {
                            showMsgBox("Oops! Max Size of Photo:1 MB");
                        }
                    }
                }
                txt += "</tbody></table>"
            }
        }
        else {
            if (x.value == "") {
                showMsgBox("Select one or more Images.");
            }
            else {
                txt += "The files property is not supported by your browser!";
                txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property.
            }
        }
        //document.getElementById("dvdata").innerHTML = txt;
    }

    $scope.SaveRecord = function () {
        $scope.showLoader();
        if ($scope.VideoAlbumId != null) {
            //var files = $("#fileInput").get(0).files;
            
            //var fileData = new FormData();
            //if (files.length == 0) {
            //    showMsgBox("Oops!, Please drop some Images.");
            //    return;
            //}
            //else if (files.length > 5) {
            //    showMsgBox("Oops!, You can't Upload image more than 5");
            //    $("#fileInput").val("");
            //    return;
            //}
            //else {
                var collectionobj = {};
                if ($scope.Save == "Save") {
                    collectionobj.Action = 1;
                }
                else {
                    collectionobj.Action = 2;
                }
                collectionobj.UnitId = $scope.UnitId;
                $scope.TransAndTitle = $scope.VideoAlbumId.split('|');
                var PGTransId = $scope.TransAndTitle[0];
            var AName = $scope.TransAndTitle[1];
            collectionobj
            collectionobj.AlbumName = $scope.VdoDiscription;
            collectionobj.VideoUrl = $scope.vdoUrl;
                collectionobj.PGTransId = PGTransId;
            //collectionobj.VideoIdList = $scope.AlbumIcon;
            collectionobj.TransId = $scope.hdnVideoTransId;
                collectionobj.CreatedBy = userid;
            collectionobj.PhotoIdList = $scope.AlbumIcon;
                collectionobj.UpdatedBy = userid;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.DisplayCode = displayCode;
            var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/UploadVideoUrl", collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.UploadPhoto = [];
                        $scope.Save = "Save";
                        $scope.photo = [];
                        $('#dvpanel1').attr("style", "display:block");
                        $('#dvpanel2').attr("style", "display:none");
                        $scope.ClearControl(1);
                    };
                });
            //}
        }
        else {
            showMsgBox("Oops! Please select Album  ..");
            $scope.hideLoader();
        }
        console.log(fileInput.value);
    }

    $scope.SearchPhotoList = [];
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    }
    $scope.started = function () {
        $scope.hdnVideoTransId = "";
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.UnitId=$scope.UnitId;
        /*collectionobj.UnitId = (sessionStorage.getItem("UnitId"));*/
        collectionobj.RelationshipId = relationshipId;
        collectionobj.PhotoGalleryType = 2;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetUploadedVideoList", collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr NO", "Value": "Code", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Album Title", "Value": "AlbumTitle", "HeaderValue": "AlbumTitle", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Type", "Value": "UnitTypeId", "HeaderValue": "UnitType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Name", "Value": "UnitId", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Headline", "HeaderValue": "Headline", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Updated Date", "HeaderValue": "UpdatedDate", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Updated Time", "HeaderValue": "UpdatedTime", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "TotalPhoto", "HeaderValue": "TotalPhoto", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" }

                ];

            $scope.SearchVideoList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hdnVideoTransId = $(this).find('input[type="hidden"]').val();
                $scope.SearchVideoList = $filter('filter')($scope.SearchVideoList, { 'Code': $scope.hdnVideoTransId });
                $scope.UnitTypeCode = $scope.SearchVideoList[0].UnitTypeId;
                $scope.GetUnitPerm();
                $scope.UnitId = $scope.SearchVideoList[0].UnitId;
                $scope.VideoAlbumId = $scope.SearchVideoList[0].AlbumId.toString();
                $scope.vdoUrl = $scope.SearchVideoList[0].VideoUrl;
                $scope.AlbumIcon = $scope.SearchVideoList[0].AlbumIcon;
                $scope.VdoDiscription = $scope.SearchVideoList[0].Headline;
                $scope.getVideoUrl();
                $scope.Save = "Update";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //$scope.SetUploadedPhotoTransId();
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.hideLoader();
            });
        });
    };


    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("do u want to delete this record!", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.UnitId = $scope.UnitId;
        $scope.TransAndTitle = $scope.PhotoAlbumId;
        //var PGTransId = $scope.TransAndTitle[0];
        //collectionobj.PGTransId = PGTransId;
        collectionobj.UpdatedBy = userid;
        collectionobj.TransId = $scope.hdnVideoTransId;
        collectionobj.PhotoIdList = $scope.AlbumIcon;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.Action = 3;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/UploadVideoUrl", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
                $scope.Save = "Save";
                $('#dvpanel1').attr("style", "display:block");
                $('#dvpanel2').attr("style", "display:none");
            }
        });
    };

    $scope.ClearControl = function (flag) {

        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("do u want to clear field?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.UnitTypeCode = "";
        $scope.UnitId = "";
        $scope.VideoAlbumId = "";
        $scope.vdoUrl = "";
        $scope.GetUnitTypePerm();
        $scope.GetUnitPerm();
        $scope.VdoDiscription = "";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.hdnVideoTransId = '';
        $('#dvdata').attr('Style', 'DISPLAY:NONE');
        $('#vdoUrl').val('');
        $("iframe").attr("src", "");

        $('#dvpanel1').attr("style", "display:block");
        $('#dvpanel2').attr("style", "display:none");
        $('.dropify-clear').click();
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    }


    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
        var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
        var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
        var loadingAnim = panelToRefresh.find('.loading-progress');
        panelToRefresh.show();
        setTimeout(function () {
            loadingAnim.addClass('la-animate');
        }, 100);
        $scope.started();
        return false;
    });

    $scope.CopyDiscriptionAll = function () {
        debugger;

        for (var i = 0; i < $scope.photo.length; i++) {
            $scope.photo[i].Discription = $scope.DescriptionAll
        }

    }

    $scope.CopyShareAll = function () {
        debugger;

        for (var i = 0; i < $scope.photo.length; i++) {
            $scope.photo[i].Share = $scope.AllShare
        }

    }

    $scope.CopyCheckAll = function () {
        debugger;

        for (var i = 0; i < $scope.photo.length; i++) {
            $scope.photo[i].IsDownload = $scope.checkAll
        }

    }

    $scope.CopyLFDAll = function () {
        if (event.target.checked == true) { $scope.disableLfd = false; }
        else { $scope.disableLfd = true; }

        for (var i = 0; i < $scope.photo.length; i++) {

            $scope.photo[i].IsLfd = $scope.LfdAll
        }

    }

    $scope.CopyDeleteAll = function () {
        debugger;
        if (event.target.checked == true) { $scope.disableDelete = false; }
        else { $scope.disableDelete = true; }

        for (var i = 0; i < $scope.photo.length; i++) {
            $scope.photo[i].IsDelete = $scope.DeleteAll
        }

    }

    $scope.Delete = function (isChecked) {
        debugger;

        var flag = false;
        $.each($scope.photo, function (i, val) {
            if (val.IsDelete === true) {
                flag = true;
                return;
            };
        });
        var flag1 = true;
        $.each($scope.photo, function (i, val) {
            if (val.IsDelete === false || val.IsDelete == 'undefined') {
                flag1 = false;
            };
        });

        if (flag) { $scope.disableDelete = false; }
        else { $scope.disableDelete = true; }

    }

    $('#dvpanel1').attr("style", "display:block");
    $('#dvpanel2').attr("style", "display:none");
    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "SR.No.", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "PhotoName", "HeaderValue": "PhotoName", "Width": "140px", "ShowColumn": "Yes", "ImageColumn": "Yes" },
                { "HeaderText": "Headline", "HeaderValue": "Headline", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Description", "HeaderValue": "Description", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Share", "HeaderValue": "Share", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Download", "HeaderValue": "IsDownload", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];
        $scope.PrintMaster(tblheader, $scope.UploadPhoto, window.document.title);
    };
}