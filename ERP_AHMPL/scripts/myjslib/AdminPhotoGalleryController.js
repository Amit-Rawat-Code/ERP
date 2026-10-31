app.AdminPhotoGalleryController = function ($scope, $element, $filter, myService) {

    $scope.GetUnitTypePerm = function () {
        var collectionobj = {};
        if (loginTypeId == '1')
            collectionobj.Action = 4;
        else
            collectionobj.Action = 5;

        collectionobj.UserId = userid;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitTypeMaster", collectionobj);
        getData.then(function (response) {
            $scope.GetUnitTypePerms = response.data;
          
        });
    };
    $scope.GetUnitPerm = function (defaultselection) {
        //debugger
        var collectionobj = {};
        var loginTypeId = defaultselection;
        if (loginTypeId == '1') {
            collectionobj.Action = 4;
            collectionobj.UnitTypeCode = $scope.UnitTypeCode;
        }
        else {
            collectionobj.Action = 5;
            collectionobj.UnitTypeCode = defaultselection;
        }
        collectionobj.UserId = userid;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitMaster", collectionobj);
        getData.then(function (response) {
            
            $scope.GetUnitPerms = response.data;

        });
    };
    //var userid = sessionStorage.getItem("userid");
    var UploadedAlbumIcon = '';
    $scope.SaveRecord = function () {
        if (isValidate()) {
            debugger
            var collectionobj = {};
            if (($scope.AlbumIcon != "") && ($scope.AlbumIcon != null)) {
                if (UploadedAlbumIcon == $scope.AlbumIcon) {
                    collectionobj.AlbumIcon = $scope.AlbumIcon
                    collectionobj.Name = "preview"
                }
                else {
                    collectionobj.AlbumIcon = $(AlbumIcon).attr('value').replace(/^data:image\/[a-z]+;base64,/, "");
                    collectionobj.Name = ""
                }
            }
            else {
                alert("Please Attach Album Icon."); return
            }
            collectionobj.Code = $scope.Code;
            collectionobj.PhotoGalleryType = $scope.GalleryId;
            collectionobj.ShownOn = 2;
            collectionobj.UnitId = $scope.UnitId;
            collectionobj.AlbumName = $scope.Title;
            collectionobj.Description = $scope.Description;
            collectionobj.OriginalFolder = $scope.OriginalFolder;
            collectionobj.EventDate = moment($scope.EventDate, "DD-MMM-YYYY").format('YYYY/MM/DD');
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.UnitId = $scope.UnitId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.DisplayCode = displayCode;
            if ($scope.Save != "Save") {
                collectionobj.TransId = $scope.hdnAlbumId;
                collectionobj.Action = 2;
            }
            else {
                collectionobj.TransId = '';
                collectionobj.Action = 1;
            }
            // if ($scope.GalleryId == 'PhotoGallery')
            var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/SavePhotoAlbum", collectionobj);
            // else if ($scope.GalleryId == 'VideoGallery')
            //   var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/SaveVideoFiles", collectionobj);

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    }
    $scope.show = function (input, imgfileid) {
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
                    else {
                        $scope.AlbumIcon = e.target.result;
                        $(imgfileid).attr('value', e.target.result);
                    }
                }
            };
        };
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
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $('#file').val('');
        $scope.GetUnitTypePerms = "";
        $scope.GetUnitPerm("1");
        $scope.showfile = "";
        $scope.IsActive = "";
        $scope.hdnEmpId = "";
        $scope.GalleryId = "";
        $scope.ShownOn = "";
        $scope.Title = "";
        $scope.Description = "";
        $scope.OriginalFolder = "";
        $scope.EventDate = "";
        $scope.IsActive = "";
        $('.dropify-clear').click();
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };

    }


    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("do u want to delete this record!", function () {
            var collectionobj = {};
            collectionobj.UnitId = $scope.UnitId;
            collectionobj.TransId = $scope.hdnAlbumId;
            collectionobj.UpdatedBy = userid;
            var getData = myService.methode('POST', "../Masters/DeletePhotoGallery", '{obj:' + JSON.stringify(collectionobj) + '}');
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        });
    };

    $scope.SearchPhotoAlbumList = [];
    $scope.SearchRecord = function ()
    {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');     
        $scope.started();
    };
    $scope.started = function ()
    {
        debugger
        $scope.hdnAlbumId = "";
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.UnitId = $scope.UnitId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.PhotoGalleryType = 2;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetPhotoAlbumList", collectionobj);
        getData.then(function (response)
        {
            debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Type", "Value": "UnitTypeId", "HeaderValue": "UnitType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Name", "Value": "UnitId", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Gallery Type", "HeaderValue": "PhotoGalleryType", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Title", "HeaderValue": "Title", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Description", "HeaderValue": "Description", "CssClass": "overcontent-m", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Event Date", "HeaderValue": "EventDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "AlbumIcon", "Value": "AlbumIcon", "HeaderValue": "AlbumIcon", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "Yes" },
                ];
           
            $scope.SearchPhotoAlbumList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
           
            $('#example tbody').on('dblclick', 'tr', function ()
            {
                debugger
                var row = $('#example').DataTable().row(this).data();
                //$scope.hdnAlbumId = $(this).find('input[type="hidden"]').val();     
                $scope.Code = $(this).find('input[type="hidden"]').val(); 
                $scope.UnitTypeCode = $(FindHtml(row[1])).val();
                $scope.GetUnitTypePerms = $scope.UnitTypeCode;
                $scope.GetUnitPerm($scope.UnitTypeCode);
                $scope.UnitId = $(FindHtml(row[2])).val();
                $scope.AlbumIcon = $(FindHtml(row[3])).val();

                $scope.GalleryId = row[3];
                $scope.Title = row[4];
                $scope.Description = row[5];
                $scope.EventDate = new Date(row[6])
                $scope.IsActive = row[7] == "Yes" ? "1" : "0";
                $scope.Save = "Update";
                $scope.disableDelete = false; 
                $scope.showfile = $scope.AlbumIcon
                UploadedAlbumIcon = $scope.AlbumIcon;
                $scope.SearchPhotoAlbumList = response.data;
                $scope.$applyAsync();
                $scope.hideLoader();
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
            });
        });
    };

    /*Refresh Search Table Record*/
    //$(document).on("click", ".RefreshSearchTable", function (e) {
    //    debugger;
    //    var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
    //    var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
    //    var loadingAnim = panelToRefresh.find('.loading-progress');
    //    panelToRefresh.show();
    //    setTimeout(function () {
    //        loadingAnim.addClass('la-animate');
    //    }, 100);
    //    $scope.started();
    //    return false;
    //});

    //$scope.PrintRecord = function () {
    //    var print = '<div class="col-lg-12">Gallery Type:' + $scope.SearchPhotoAlbumList[0]["GalleryType"] + '</br>Photo GalleryType:' + $scope.SearchPhotoAlbumList[0]["PhotoGalleryType"] + '</br>Show For:' + $scope.SearchPhotoAlbumList[0]["ShowFor"] + '</br>Title:' + $scope.SearchPhotoAlbumList[0]["Title"] + '</br>Description:' + $scope.SearchPhotoAlbumList[0]["Description"] + '</br>OriginalFolder:' + $scope.SearchPhotoAlbumList[0]["OriginalFolder"] + '</br>EventDate:' + $scope.SearchPhotoAlbumList[0]["EventDate"] + '</br> UpdatedOn:' + $scope.SearchPhotoAlbumList[0]["UpdatedOn"] + '</br> </div>';
    //    $scope.PrintForm(print);
    //};
}




