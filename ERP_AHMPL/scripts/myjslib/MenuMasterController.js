app.MenuMasterController = function ($scope, $element, $filter, myService) {

    $scope.GetLayoutMaster = function () {

        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutMaster', collectionobj);
        getData.then(function (response) {
            $scope.GetLayouts = response.data;
        });
    };
    $scope.GetAllUnit = function ()
    {
        
        var collectionobj = {};
        collectionobj.Action = 8;
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        var splitsidsLast = [];
        if (splits.length > 3)
        {
            splitsids = splits[3].split('_');
            splitsidsLast = splitsids[0].split('-');
            $scope.UnitId = splitsidsLast[0];
        }
        //collectionobj.UnitId = sessionStorage.getItem("UnitId");
        collectionobj.UnitId = $scope.Code;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitMaster", collectionobj);
        getData.then(function (response)
        {
            $scope.GetAllUnits = response.data;
        });
    };
    $scope.GetTab = function (UnitId)
    {
        
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3)
        {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.Action = 8;
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : UnitId);
        collectionobj.RelationshipId = sessionStorage.getItem('relationshipId');
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetTabMaster", collectionobj);
        getData.then(function (response) {
            $scope.Tabs = response.data;
            if (response.data.length > 0) {
                $scope.FacebookLink = response.data[0]['FacebookLink'];
                $scope.TwitterLink = response.data[0]['TwitterLink'];
                $scope.YoutubeLink = response.data[0]['YoutubeLink'];
                $scope.HomeVideoLink = response.data[0]['VideoLink'];
            }
        });
    };
    $scope.SetURLType = function ()
    {
        if ($scope.URLType == "T")
        {
            $scope.TargetUnitDiv = false;
            $scope.URLDiv = true;
            $scope.fileInputDiv = true;
        }
        else if ($scope.URLType == "U") {
            $scope.URLDiv = false;
            $scope.TargetUnitDiv = true;
            $scope.fileInputDiv = true;
        }
        else if ($scope.URLType == "A") {
            $scope.fileInputDiv = false;
            $scope.TargetUnitDiv = true;
            $scope.URLDiv = true;

        }
        else {
            $scope.URLDiv = true;
            $scope.TargetUnitDiv = true;
            $scope.fileInputDiv = true;
        }
    }

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
                    $scope.UnitTypeCode = $scope.GetUnitTypePerms[0].UnitTypeCode.toString();
                    $scope.GetUnitPerm(loginTypeId);
                }
                else {
                    $scope.UnitTypeCode = $scope.GetUnitTypePerms[0].UnitTypeCode.toString();
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
            if ($scope.GetUnitPerms.length > 0)
                if (loginTypeId == '1') {
                    if (defaultselection == '1')
                        $scope.UnitId = $scope.GetUnitPerms[0].Code.toString();
                    //if (IsFunctionDefined('GetTab'))
                    $scope.GetTab($scope.UnitId);
                    //if (IsFunctionDefined('fnApproved'))
                    if ($scope.fnApproved != undefined)
                        $scope.fnApproved($scope.UnitId);
                }
                else {
                    $scope.UnitId = $scope.GetUnitPerms[0].Code.toString();
                    //if (IsFunctionDefined('GetTab'))
                    $scope.GetTab($scope.UnitId);
                    //if (IsFunctionDefined('fnApproved'))
                    if ($scope.fnApproved != undefined)
                        $scope.fnApproved($scope.UnitId);
                }
        });
    };

    $scope.AlbumIcon = [];
    $scope.showPdf = function (input) {
        debugger
        $scope.AlbumIcon = [];
        $scope.getPdfFiledetails();
        for (var i = 0; i < input.files.length; i++) {
            if (input.files[i]) {
                if (input.files[i].size < 5242880) {
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
                    if (input.files[0].size >= 5242880) {
                        alert("File is more than 5 mb");
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


    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            var collectionobj = {};
            collectionobj.Code = $scope.Code;            
            collectionobj.UnitTypeCode = $scope.UnitTypeCode;
            collectionobj.UnitId = $scope.UnitId;
            collectionobj.TabId = $scope.TabId;
            collectionobj.MenuName = $scope.MenuName;
            collectionobj.URLType = $scope.URLType;
            collectionobj.TargetUnitId = $scope.TargetUnitId;
            collectionobj.URL = $scope.URL;
           
            collectionobj.DisplayCode = displayCode;
            collectionobj.LayoutCode = $scope.LayoutCode;
            collectionobj.SeqNo = $scope.SeqNo;
            collectionobj.RelationshipId = relationshipId;            
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            var files = $("#fileInput").get(0).files;
            if ($scope.Save == "Save")
            {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            //var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/SetValues', collectionobj);
            //getData.then(function (response)
            //{
            if ($scope.URLType == "A")
            {
                collectionobj.Attachment = $scope.AlbumIcon;
                var fileData = new FormData();
                if ($scope.fileInput == "" || $scope.fileInput == 'undefined')
                {
                    if (files.length == 0)
                    {
                        alert("Oops!, Please drop a document.");
                    }
                    else if ($("#fileInput").get(0).files.length == 0) {
                        alert("Oops! Please select a document.");
                        return;
                    }
                }

                if (files.length > 1) {
                    alert("Oops!, You can Upload only one document");
                }
                else {
                    fileData.append("fileInput", files[0]);
                    //collectionobj.fileInput = fileData;
                    //collectionobj.Attachment = fileData;
                    $.ajax({
                        type: "POST",
                        url: "../Api/DynamicWebsiteApi/UploadAttachmentMenu",
                        dataType: "json",
                        contentType: 'application/json; charset=UTF-8', // Not to set any content header
                        processData: false, // Not to process data 
                        data: JSON.stringify(collectionobj),
                        success: function (response) {

                            $scope.UploadPhoto = [];
                            $scope.photo = [];
                            $('#fileInput').val('');

                            if (showMsgBox(JSON.stringify(response))) {
                                $scope.ClearControl(1);
                            }
                        }
                    });
                }
            }
            else
            {
                //if (collectionobj.length > 0)
                //{
                var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/UploadAttachmentMenu', collectionobj);
                getData.then(function (response)
                {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);

                    }
                });
                //}
                //$.ajax({
                //    type: "POST",
                //    url: "../Api/DynamicWebsiteApi/UploadAttachmentMenu",
                //    dataType: "json",
                //    contentType: 'application/json; charset=UTF-8', // Not to set any content header
                //    processData: false, // Not to process data 
                //    data: JSON.stringify(collectionobj),
                //    success: function (response) {
                //        debugger
                //        $scope.UploadPhoto = [];
                //        $scope.photo = [];
                //        $('#fileInput').val('');

                //        if (showMsgBox(JSON.stringify(response))) {
                //            $scope.ClearControl(1);
                //        }
                //    }
                //});
               
            }
        }
    }
    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("do u want to clear field?", function () { $scope.ResetControl(0); });
        }
    };


    $scope.MenuMasterList = [];
    $scope.ResetControl = function (flag) {
       
        $scope.Save = "Save";
        $scope.UnitTypeCode = "";
        $scope.TabId = "";
        $scope.UnitId = "";
        $scope.URLType = "";
        $scope.MenuName = "";
        $scope.LayoutCode = "";
        $scope.SeqNo = "";
        $scope.IsApproved = "";
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.TargetUnitId="";
        $scope.UnitMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.$applyAsync();
    }


    /*Search Button Click Event*/
    $scope.MenuMasterList = [];
    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/GetMenuMaster', collectionobj);
        getData.then(function (response)
        {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Unit Type Code", "Value": "UnitTypeCode", "HeaderValue": "UnitTypeCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Unit Type Name", "Value": "UnitTypeName", "HeaderValue": "UnitType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Code", "HeaderValue": "UnitCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Unit Name", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Tab Code", "HeaderValue": "TabId", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Tab Name", "HeaderValue": "TabName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Menu Name", "HeaderValue": "MenuName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "URL Type", "HeaderValue": "URLType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Target Unit", "Value": "TargetUnitId", "HeaderValue": "TargetUnitId", "Width": "100px", "ShowColumn": "Yes" },
                    { "HeaderText": "URL", "HeaderValue": "URL", "Width": "100px", "ShowColumn": "Yes" },
                    { "HeaderText": "Attachment", "HeaderValue": "Attachment", "Width": "100px", "ShowColumn": "Yes" },
                    { "HeaderText": "Target Layout Code", "HeaderValue": "LayoutCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Target Layout", "HeaderValue": "LayoutName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "SeqNo", "HeaderValue": "SeqNo", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];            
            $scope.MenuMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            
            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                //debugger
                var row = $('#example').DataTable().row(this).data();                   
                $scope.GetTab();
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.MenuMasterList = $filter('filter')($scope.MenuMasterList, { 'Code': $scope.Code });
                $scope.UnitTypeCode = $(FindHtml(row[1])).val();
                $scope.GetUnitPerm($scope.UnitTypeCode);                
                $scope.UnitId = $scope.MenuMasterList[0].UnitCode;
                $scope.TabId = $scope.MenuMasterList[0].TabCode.toString();
                $scope.TargetUnitId=$scope.MenuMasterList[0].TargetUnitId.toString();
                $scope.MenuName = row[7];
                $scope.URLType = row[8];
                $scope.LayoutCode = row[12];
                $scope.SeqNo = row[14];
                $scope.IsApproved = row[15];
                $scope.IsActive = (row[16] == "Yes" ? "true" : "0");  
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                $scope.SetURLType();
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
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/UploadAttachmentMenu", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        });
    };
}