app.TopSocialMedaiLinkController = function ($scope, $element, $filter, myService) {

    //$scope.GetLayoutMaster = function () {

    //    var collectionobj = {};
    //    collectionobj.Action = 5;
    //    collectionobj.RelationshipId = relationshipId;
    //    var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutMaster', collectionobj);
    //    getData.then(function (response) {
    //        $scope.GetLayouts = response.data;
    //    });
    //};
    $scope.GetAllUnit = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = 8;
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        var splitsidsLast = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            splitsidsLast = splitsids[0].split('-');
            $scope.UnitId = splitsidsLast[0];
        }
        //collectionobj.UnitId = sessionStorage.getItem("UnitId");
        collectionobj.UnitTypeCode = $scope.UnitTypeId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitMaster", collectionobj);
        getData.then(function (response) {
            deb
            $scope.GetAllUnits = response.data;
        });
    };
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
            if ($scope.GetUnitTypePerms.length > 0)
                if (loginTypeId == '1') {
                    $scope.UnitTypeId = $scope.GetUnitTypePerms[0].UnitTypeId.toString();
                    $scope.GetUnitPerm(loginTypeId);
                }
                else {
                    $scope.UnitTypeId = $scope.GetUnitTypePerms[0].UnitTypeId.toString();
                    $scope.GetUnitPerm(loginTypeId);
                }
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
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitMaster", collectionobj);
        getData.then(function (response) {

            $scope.GetUnitPerms = response.data;
            if ($scope.GetUnitPerms.length > 0) {
                $scope.UnitId = $scope.GetUnitPerms[0].Code.toString();
                $scope.GetTab($scope.UnitId);
                if ($scope.fnApproved != undefined)
                    $scope.fnApproved($scope.UnitId);
            }

        });
    };
    $scope.photo = [];
    $scope.showLoader = function () {
        $('#cover-spin').show(0);
    };

    $scope.hideLoader = function () {
        $('#cover-spin').hide();
    };
    $scope.AlbumIcon = [];
    $scope.show = function (input) {
        debugger
        $scope.AlbumIcon = [];
        $scope.getFiledetails();
        for (var i = 0; i < input.files.length; i++) {
            if (input.files[i]) {
                if (input.files[i].size < '512000') {
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
                    if (input.files[0].size >= 512000) {
                        alert("File is more than 500 KB");
                        $('#file').val() = "";
                        $scope.AlbumIcon = "";
                        return;
                    }
                    else if (sizes.width > 640 || sizes.height > 640) {
                        alert("File width is more than 640 px Or height is more than 640 px");
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
                var MaxSize = 512000;
                for (var i = 0; i < x.files.length; i++) {
                    var file = x.files[i];
                    if ('name' in file) {
                        totalSize += file.size
                    }
                    //-------------20 mb 
                }
                if (totalSize >= MaxSize) {
                    showMsgBox("Oops! Max Size of All Photo:500 KB");
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
                        if (MaxSizePhoto > '512000') {
                            showMsgBox("Oops! Max Size of Photo:500 KB");
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
    
    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
            var collectionobj = {};
            var files = $("#fileInput").get(0).files;
            var fileData = new FormData();
            //if (files.length == 0) {
            //    showMsgBox("Oops!, Please drop some Images.");
            //    return;
            //}
            //else
                if (files.length > 1) {
                showMsgBox("Oops!, You can't Upload image more than 1");
                $("#fileInput").val("");
                return;
            }
            else if ($scope.Save == "Save") {
                
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            
            collectionobj.Code = $scope.Code;
            collectionobj.UnitId = $scope.UnitId;
            collectionobj.UnitTypeCode = $scope.UnitTypeCode;
            collectionobj.Alignment = $scope.Alignment;
            collectionobj.DisplayCode = displayCode;
            collectionobj.PhotoIdList = $scope.AlbumIcon;
            collectionobj.CaptionName = $scope.CaptionName;
            collectionobj.CaptionLink = $scope.CaptionLink;
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/InsertUpdateDeleteTopSocialMediaLink', collectionobj);
            getData.then(function (response) {
                getData.then(function (response) {
                    //$('#fileInput').val('');
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            });
        
    }

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
        $scope.TabName = "";
        $scope.UnitId = "";
        $scope.URLType = "";
        $scope.LayoutCode = "";
        $scope.SeqNo = "";
        $scope.Alignment = "";
        $scope.CaptionName = "";
        $scope.CaptionLink = "";
        $scope.IsApproved = "";
        $scope.TargetUnitId = "";
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.UnitMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.$applyAsync();
    }


    /*Search Button Click Event*/
    $scope.TabMasterList = [];
    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {
       
        $scope.disable = true;
        var collectionobj = {};
        collectionobj.Action = '12';
        collectionobj.UnitId = $scope.UnitId;
        collectionobj.UnitTypeCode = $scope.UnitTypeCode;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetTopSocialMediaLink', collectionobj);
        getData.then(function (response) {
            debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Unit Type Code", "HeaderValue": "UnitTypeCode", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Type Name", "HeaderValue": "UnitType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Id", "HeaderValue": "UnitId", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Name", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Alignment", "HeaderValue": "Alignment", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "CaptionName", "HeaderValue": "CaptionName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "CaptionLink", "HeaderValue": "CaptionLink", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "CaptionIcon", "HeaderValue": "CaptionIcon", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.TabMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                var tbl = $('#example').DataTable();
                var i = tbl.row(this).index();
                var row = $('#example').DataTable().row(this).data();                
                $scope.Code = $(this).find('input[type="hidden"]').val();                
                $scope.UnitTypeCode = $scope.TabMasterList[i].UnitTypeCode.toString();
                $scope.GetUnitPerm();
                $scope.UnitId = $scope.TabMasterList[i].UnitId.toString();
                $scope.Alignment = $scope.TabMasterList[i].Alignment;
                $scope.CaptionName = $scope.TabMasterList[i].CaptionName;
                $scope.CaptionLink = $scope.TabMasterList[i].CaptionLink;
                $scope.CaptionIcon = $scope.TabMasterList[i].CaptionIcon;
                $scope.IsActive = ($scope.TabMasterList[i].IsActive == true ? "true" : "false");
                $scope.IsApproved = $scope.TabMasterList[i].IsApproved;
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //$scope.SetURLType();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

            });
        });
    };



    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do u want to delete this record!", function () {

            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.Action = "3";
            collectionobj.RelationshipId = relationshipId;
            var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/InsertUpdateDeleteTopSocialMediaLink", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        });
    };
    $scope.OpenFileUpload = function () {
        $('#fileInputs').click();
    }
    $scope.fuImageChange = function (input) {
        readURL(input);
    };
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.imgfileInputs = e.target.result;
                $scope.$applyAsync();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
}