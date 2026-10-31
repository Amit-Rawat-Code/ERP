app.AdminMediaGalleryController = function ($scope, $element, $filter, myService) {

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

    $scope.AlbumName = function () {
        
        $('#dvpanel1').attr("style", "display:block");
        $('#dvpanel2').attr("style", "display:none");
        var collectionobj = {};
        collectionobj.Action = 15;
        collectionobj.UnitId = $scope.UnitId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.PhotoGalleryType = 3;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetPhotoAlbumList", collectionobj);
        getData.then(function (response) {

            $scope.rec = response.data;
        });
    };

    //$scope.AlbumIcon1 = [];
    $scope.showPdf = function (input) {
     
        $scope.AlbumIcon1 = [];
        var d = 'data:application/pdf/[a-z]+; base64,/'
        $scope.getPdfFiledetails();
        for (var i = 0; i < input.files.length; i++) {
            if (input.files[i]) {
                if (input.files[i].size < 5242880) {
                    var filerdr = new FileReader();
                    filerdr.onload = function (e) {
                        $scope.AlbumIcon1 = e.target.result;
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
                    if (input.files[0].size >= 5242880) {
                        alert("File is more than 5 mb");
                        $('#file').val() = "";
                        $scope.AlbumIcon1 = "";
                        return;
                    }
                    else if (sizes.width > 640 || sizes.height > 480) {
                        alert("File width is more than 640 px Or height is more than 480 px");
                        $('#file').val("");
                        $scope.AlbumIcon1 = "";
                        return;
                    }
                }
            }
        };
    };

    $scope.showImg = function (input) {
        debugger
        $scope.AlbumIcon = [];
        $scope.getImageFiledetails();

        for (var i = 0; i < input.files.length; i++) {
            if (input.files[i]) {
                if (input.files[i].size < 1048576) {
                    var filerdr = new FileReader();
                    filerdr.onload = function (e) {
                        $scope.AlbumIcon = (e.target.result).replace(/^data:image\/[a-z]+;base64,/, "");
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
                    if (input.files[0].size >= 2097152) {
                        alert("File is more than 2 mb");
                        $('#file').val() = "";
                        $scope.AlbumIcon = "";
                        return;
                    }
                    else if (sizes.width > 1280 || sizes.height > 960) {
                        alert("File width is more than 640 px Or height is more than 480 px");
                        $('#file').val("");
                        $scope.AlbumIcon = "";
                        return;
                    }
                }
            }
        };
    };


    $scope.getPdfFiledetails = function () {
        
        var x = document.getElementById("AlbumIcon1");
        var txt = "";
        var files = $('#AlbumIcon1')[0].files;
        var len = $('#AlbumIcon1').get(0).files.length;

        for (var i = 0; i < len; i++) {

            f = files[i];
            var ext = f.name.split('.').pop().toLowerCase();

            if ($.inArray(ext, ['pdf']) == -1) {
                showMsgBox("Oops! Please Select Pdf Files Only");
                return;
            }
        }

        if ('files' in x) {
            if (x.files.length == 0) {
                showMsgBox("Select A Pdf File.");
            }
         else {
                var totalSize = 0;
                var MaxSize = 5242880;
                for (var i = 0; i < x.files.length; i++) {
                    var file = x.files[i];
                    if ('name' in file) {
                        totalSize += file.size
                    }
                    //-------------5 mb 
                }
                if (totalSize >= MaxSize) {
                    showMsgBox("Oops! Max Size of File is:5 MB");
                    $('#dvdata').attr('Style', 'DISPLAY:NONE');
                    $('#AlbumIcon1').val('');
                    return;
                }
                $('#dvdata').attr('Style', 'DISPLAY:block');
                var MaxSizePdf = 0;
                var a = 0;
                txt = "<table id='thetable' class='table compact table-hover table-striped table-bordered'><thead><tr><th>Sr.No.</th><th>Image Name</th><th>Image Size</th><th>Status</th></tr></thead><tbody>"
                for (var i = 0; i < x.files.length; i++) {

                    var a = a + 1;
                    txt += "<tr class='tab-tr" + a + "'>";
                    var file = x.files[i];

                    if ('name' in file) {
                        MaxSizePdf += file.size
                        var pdfinmb = (file.size / (1024 * 1024)).toFixed(2)
                        var color = pdfinmb > 1 ? '#f78989' : '#95e695';
                        var stat = pdfinmb > 1 ? 'Not Approved' : 'Approved';
                        var s = i + 1;
                        txt += "<td class='tab-td1' name='record' style='background-color:" + color + "'>" + (i + 1) + ". </td><td class='tab-td2' style='background-color:" + color + "'>" + file.name + "</td> <td class='tab-td3' style='background-color:" + color + "'> " + pdfinmb + " mb</td><td style='background-color:" + color + "'>" + stat + "</td> </tr>";
                        if (MaxSizePdf > 5242880) {
                            showMsgBox("Oops! Max Size of Photo:5 MB");
                        }
                    }
                }
                txt += "</tbody></table>"
            }
        }
        else {
            if (x.value == "") {
                showMsgBox("Select a Pdf File.");
            }
            else {
                txt += "The files property is not supported by your browser!";
                txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property.
            }
        }
  }
    $scope.getImageFiledetails = function () {
        debugger
        var len;
        var x = document.getElementById("AlbumIcon");
        var txt = "";

        if ($('#AlbumIcon').files > 0) {
            var files = $('#AlbumIcon').files;
            len = $('#AlbumIcon').get(0).files.length;
        }


        for (var i = 0; i < len; i++) {

            f = files[i];
            var ext = f.name.split('.').pop().toLowerCase();


            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                showMsgBox("Oops! Please Select Images(Best : .Jpeg or jpg Images)");
                return;
            }
            else
                showMsgBox("Oops! Please Select Jpg/Jpeg/Png/gif Files Only");
            return;
        }

        if ('files' in x) {
            if (x.files.length == 0) {
                showMsgBox("Select A Jpg/Jpeg/Png/gif File.");
            }
            else {
                var totalSize = 0;
                var MaxSize = 2097152;
                for (var i = 0; i < x.files.length; i++) {
                    var file = x.files[i];
                    if ('name' in file) {
                        totalSize += file.size
                    }
                    //-------------5 mb 
                }
                if (totalSize >= MaxSize) {
                    showMsgBox("Oops! Max Size of Image File is:2 MB");
                    $('#dvdata').attr('Style', 'DISPLAY:NONE');
                    $('#fileInput').val('');
                    return;
                }
                $('#dvdata').attr('Style', 'DISPLAY:block');
                var MaxSizePdf = 0;
                var a = 0;
                txt = "<table id='thetable' class='table compact table-hover table-striped table-bordered'><thead><tr><th>Sr.No.</th><th>Image Name</th><th>Image Size</th><th>Status</th></tr></thead><tbody>"
                for (var i = 0; i < x.files.length; i++) {

                    var a = a + 1;
                    txt += "<tr class='tab-tr" + a + "'>";
                    var file = x.files[i];

                    if ('name' in file) {
                        MaxSizePdf += file.size
                        var ImgInmb = (file.size / (1024 * 2048)).toFixed(2)
                        var color = ImgInmb > 1 ? '#f78989' : '#95e695';
                        var stat = ImgInmb > 1 ? 'Not Approved' : 'Approved';
                        var s = i + 1;
                        txt += "<td class='tab-td1' name='record' style='background-color:" + color + "'>" + (i + 1) + ". </td><td class='tab-td2' style='background-color:" + color + "'>" + file.name + "</td> <td class='tab-td3' style='background-color:" + color + "'> " + ImgInmb + " mb</td><td style='background-color:" + color + "'>" + stat + "</td> </tr>";
                        if (MaxSizePdf > 2097152) {
                            showMsgBox("Oops! Max Size of Image:1 MB");
                        }
                    }
                }
                txt += "</tbody></table>"
            }
        }
        else {
            if (x.value == "") {
                showMsgBox("Select a Image File.");
            }
            else {
                txt += "The files property is not supported by your browser!";
                txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property.
            }
        }
       
    }

    $scope.SaveRecord = function () {
    debugger
        $scope.showLoader();
        if ($scope.MediaAlbumId != null) {
            var collectionobj = {};
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            collectionobj.UnitId = $scope.UnitId;
            var PGTransId = $scope.MediaAlbumId;
            collectionobj.AlbumName = $scope.Title;
            collectionobj.TransId = $scope.hdnMediaTransId;
            collectionobj.MediafileUrl = $scope.AlbumIcon1;
            collectionobj.EventDate = moment($scope.EventDate).format('DD-MMM-YYYY');
            collectionobj.Description = $scope.Description;
            collectionobj.UnitTitle = $scope.Title;
            collectionobj.Location = $scope.Venue;
            collectionobj.thumbImgInput = $scope.AlbumIcon;
            collectionobj.PGTransId = PGTransId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.DisplayCode = displayCode;
            collectionobj.PhotoGalleryType = 3;
            var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/InsertUpdateDeleteMediaGalleryFile", collectionobj);
            getData.then(function (response) {
                debugger
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
        console.log($scope.fileInput);
    }

    $scope.SearchPhotoList = [];
    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    }
    $scope.started = function () {
      
        $scope.hdnMediaTransId = "";
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.UnitId = (sessionStorage.getItem("UnitId"));
        collectionobj.RelationshipId = relationshipId;
        collectionobj.PhotoGalleryType = 3;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetMedaiFiles", collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr NO", "Value": "TransId", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Type", "Value": "UnitTypeId", "HeaderValue": "UnitType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Name", "Value": "UnitId", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Title", "HeaderValue": "Title", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Venue", "HeaderValue": "Venue", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Description", "HeaderValue": "Description", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Event Date", "HeaderValue": "EventDate", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                   
                ];

            $scope.SearchMediaList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('tbody').on('dblclick', 'tr', function () {
                debugger
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hdnMediaTransId = $(this).find('input[type="hidden"]').val();
                $scope.SearchMediaData = $filter('filter')($scope.SearchMediaList, { 'TransId': $scope.hdnMediaTransId });
                $scope.UnitTypeCode = $scope.SearchMediaList[0].UnitTypeId;
                $scope.GetUnitPerm();
                $scope.UnitId = $scope.SearchMediaData[0].UnitId;
                $scope.MediaAlbumId = $scope.SearchMediaData[0].AlbumId.toString();
                $scope.Title = $scope.SearchMediaData[0].Title;
                $scope.fileInput = $scope.SearchMediaData[0].MediaFilePath;
                $scope.Venue = $scope.SearchMediaData[0].Venue;
                $scope.Description = $scope.SearchMediaData[0].Description;
                $scope.EventDate = $scope.SearchMediaData[0].EventDate;
                $scope.Save = "Update";
                $scope.disableDelete = false;
                $scope.$applyAsync();
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
        debugger
        var collectionobj = {};
        collectionobj.UnitId = $scope.UnitId;
        $scope.TransAndTitle = $scope.MediaAlbumId.split('|');
        var PGTransId = $scope.TransAndTitle[0];
        collectionobj.PGTransId = PGTransId;
        collectionobj.UpdatedBy = userid;
        collectionobj.TransId = $scope.hdnMediaTransId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.Action = 9;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/InsertUpdateDeleteMediaGalleryFile", collectionobj);
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
        $scope.MediaAlbumId = "";
        $scope.Title = '';
        $scope.EventDate = '';
        $scope.Description = '';
        $scope.fileInput.value = '';
        $scope.Venue = '';
        $scope.GetUnitTypePerm();
        $scope.GetUnitPerm();
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.hdnMediaTransId = '';
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




