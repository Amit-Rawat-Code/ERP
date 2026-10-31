app.DocsAndInformationController = function ($scope, $element, $filter, myService) {

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

    $scope.GetTab = function (UnitId) {
        
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');//sac
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.Action = 8;
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : UnitId);
        collectionobj.RelationshipId = sessionStorage.getItem('relationshipId');
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetTabMaster", collectionobj);
        getData.then(function (response) {
            
            $scope.Tabs = response.data;
            //if (response.data.length > 0) {
            //    //$scope.FacebookLink = response.data[0]['FacebookLink'];
            //    //$scope.TwitterLink = response.data[0]['TwitterLink'];
            //    //$scope.YoutubeLink = response.data[0]['YoutubeLink'];
            //    //$scope.HomeVideoLink = response.data[0]['VideoLink'];
            //}
        });
    };
    //$scope.GetMenu = function (TabId, index) {
    //    debugger
    //    var url = window.location.pathname;
    //    var splits = url.split('/');
    //    var collectionobj = {};
    //    if (splits.length > 3) {
    //        var laststring = splits[3];
    //        var splitsids = splits[3].split('_');
    //        if (splitsids.length > 0)
    //            collectionobj.Language = splitsids[0];
    //    }

    //    collectionobj.Action = 5;
    //    collectionobj.TabId = JSON.stringify(TabId);
    //    collectionobj.RelationshipId = sessionStorage.getItem('relationshipId');
    //    var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetMenuMaster", collectionobj);
    //    getData.then(function (response) {
    //        debugger
    //        $scope.Menus[index] = response.data;
    //    });
    //};

    $scope.GetddlMenu = function (TabId) {
        debugger
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.TabId = TabId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetMenuMaster", collectionobj);
        getData.then(function (response) {
            debugger
            $scope.Menus = response.data;
        });
    };

    $scope.GetddlSubMenu = function (MenuId) {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.MenuId = MenuId;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetWebSubMenuMaster", collectionobj);
        getData.then(function (response) {
            $scope.SubMenus = response.data;
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

    $scope.SetURLType = function () {
    
        if ($scope.URLType == 'U') {
            $scope.URLDiv = false;
            $scope.TargetUnitDiv = true;
            $scope.fileInputDiv = true;
            $scope.RemarksDiv = true;
        }
        else if ($scope.URLType == 'A') {
            $scope.fileInputDiv = false;
            $scope.TargetUnitDiv = true;
            $scope.URLDiv = true;
            $scope.RemarksDiv = true;
        }
        else if ($scope.URLType=='T'){
            $scope.URLDiv = true;
            $scope.InputTextDiv = true;
            $scope.fileInputDiv = true;
            $scope.RemarksDiv = false;
        }
        else {
            $scope.URLDiv = true;
            $scope.TargetUnitDiv = true;
            $scope.fileInputDiv = true;
            $scope.RemarksDiv = true;
        }
    }
    //InputTextDiv


  
    $scope.showPdf = function (input) {
        debugger
        $scope.AlbumIcon = [];
        $scope.getPdfFiledetails();
        for (var i = 0; i < input.files.length; i++) {
            if (input.files[i]) {
                if (input.files[i].size < 5242880) {
                    var filerdr = new FileReader();
                    filerdr.onload = function (e) {
                        $scope.AlbumIcon = e.target.result;
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

    
    $scope.getPdfFiledetails = function () {

        var x = document.getElementById("fileInput");
        var txt = "";
        var files = $('#fileInput')[0].files;
        var len = $('#fileInput').get(0).files.length;

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
   
    $scope.SaveRecord = function () {
        debugger
        $scope.showLoader();
            var collectionobj = {};
            
            collectionobj.UnitId = $scope.UnitId;
            collectionobj.Code = $scope.hdnMediaTransId;
            collectionobj.MediafileUrl = $scope.AlbumIcon;
            collectionobj.Description = $scope.Description;
            collectionobj.UnitTypeCode = $scope.UnitTypeCode;
            collectionobj.MenuId = $scope.MenuId;
            collectionobj.SubMenuId = $scope.SubMenuId;
            collectionobj.TabId = $scope.TabId;
            collectionobj.URLType = $scope.URLType;
            collectionobj.URL = $scope.URL;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.Remarks = $scope.Remarks;
            collectionobj.AlbumName = $scope.Title;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.DisplayCode = displayCode;
            if ($scope.Save == "Save") 
            {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/InsertUpdateDeleteDocsAndInfo", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.Save = "Save";
                    $('#dvpanel1').attr("style", "display:block");
                    $('#dvpanel2').attr("style", "display:none");
                    $scope.ClearControl(1);
                };
            });

    }

  
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
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetDocsAndInfo", collectionobj);
        getData.then(function (response) {
           debugger
            var tblheader =
                [
                    { "HeaderText": "Sr NO", "Value": "TransId", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Name", "Value": "UnitCode", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Type Name", "Value": "UnitTypeCode", "HeaderValue": "UnitTypeName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Menu Name", "Value": "MenuName", "HeaderValue": "MenuName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Sub Menu Name", "Value": "SubMenuName", "HeaderValue": "SubMenuName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Description", "HeaderValue": "Discription", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Url Type", "HeaderValue": "URLType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Text Value", "HeaderValue": "TextValue", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Url", "HeaderValue": "Url", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Pdf File Url", "HeaderValue": "PdfFilePath", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                  
                ];

            $scope.SearchDocsList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('tbody').on('dblclick', 'tr', function () {
                debugger
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hdnMediaTransId = $(this).find('input[type="hidden"]').val();
                $scope.SearchDocsList = $filter('filter')($scope.SearchDocsList, { 'TransId': $scope.hdnMediaTransId });
                $scope.UnitTypeCode = $scope.SearchDocsList[0].UnitTypeCode
                $scope.GetUnitPerm();
                $scope.Title = $scope.SearchDocsList[0].Title;
                $scope.UnitId = $scope.SearchDocsList[0].UnitCode;
                $scope.Description = $scope.SearchDocsList[0].Discription;
                $scope.URLType = $scope.SearchDocsList[0].URLType;
                $scope.SetURLType();
                $scope.TabId = $scope.SearchDocsList[0].TabCode;
                $scope.GetTab($scope.UnitId);
                $scope.MenuId = $scope.SearchDocsList[0].MenuCode;
                $scope.GetddlMenu($scope.TabId);
                $scope.SubMenuId = $scope.SearchDocsList[0].SubMenuCode;
                $scope.URL = $scope.SearchDocsList[0].Url;
                $scope.IsActive = $scope.SearchDocsList[0].IsActive = 1 ? 'true' : 'false';
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
        collectionobj.UpdatedBy = userid;
        collectionobj.TransId = $scope.hdnMediaTransId;
        collectionobj.MediafileUrl = $scope.fileInput.replace(/^.*[\\\/]/, '');
        collectionobj.RelationshipId = relationshipId;
        collectionobj.Action = 9;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/InsertUpdateDeleteDocsAndInfo", collectionobj);
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
        $scope.Title = "";
        $scope.Description = '';
        fileInput.value = '';
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




