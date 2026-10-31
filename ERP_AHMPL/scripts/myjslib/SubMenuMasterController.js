app.SubMenuMasterController = function ($scope, $element, $filter, myService) {

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
    $scope.GetTab = function (UnitId)
    {
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.Action = 8;
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : UnitId);
        collectionobj.RelationShipId = relationshipId;
        collectionobj.SessionId = sessionId;
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

    $scope.GetUnitTypePerm = function () {
       var collectionobj = {};
        if (loginTypeId == '1')
            collectionobj.Action = 4;
        else
            collectionobj.Action = 5;

        collectionobj.UserId = userid;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
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
    $scope.GetAllUnit = function () {
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
        collectionobj.UnitId = $scope.Code;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitMaster", collectionobj);
        getData.then(function (response) {
            $scope.GetAllUnits = response.data;
        });
    };
    $scope.SetURLType = function () {
        if ($scope.URLType == "T") {
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
    $scope.GetUnitPerm = function (defaultselection) {
     
        var collectionobj = {};
        if (loginTypeId == '1')
            collectionobj.Action = 4;
        else
            collectionobj.Action = 5;
        collectionobj.UnitTypeCode = $scope.UnitTypeCode;
        collectionobj.UserId = userid;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
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

    $scope.GetMenu = function (TabId, index)
    {
        var url = window.location.pathname;
        var splits = url.split('/');
        var collectionobj = {};
        if (splits.length > 3) {
            var laststring = splits[3];
            var splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                debugger
                collectionobj.Language = splitsids[0];
        }

        collectionobj.Action = 5;
        collectionobj.TabId = JSON.stringify(TabId);
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetMenuMaster", collectionobj);
        getData.then(function (response) {
            $scope.Menus[index] = response.data;
        });
    };

    $scope.GetddlMenu = function (TabId) {
       
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.TabId = TabId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetMenuMaster", collectionobj);
        getData.then(function (response) {
            $scope.Menus = response.data;
        });
    };


    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function ()
    {
        //debugger
        if (isValidate())
        {
            //$scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.UnitTypeCode = $scope.UnitTypeCode;
            collectionobj.UnitId = $scope.UnitId;
            collectionobj.TabId = $scope.TabId;
            collectionobj.MenuId = $scope.MenuId;
            collectionobj.SubMenuName = $scope.SubMenuName;
            collectionobj.URLType = $scope.URLType;
            collectionobj.LayoutCode = $scope.LayoutCode;
            collectionobj.SeqNo = $scope.SeqNo;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.TargetUnitId = $scope.TargetUnitId;
            collectionobj.URL = $scope.URL;
            collectionobj.Attachment = $scope.Attachment;
            var files = $("#fileInput").get(0).files;
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = 2;
            }
            //var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/SetValues', collectionobj);
            //getData.then(function (response)
            //{
            if ($scope.URLType == "A")
            {
                var fileData = new FormData();
                if ($scope.fileInput == "" || $scope.fileInput == 'undefined') {
                    if (files.length == 0) {
                        alert("Oops!, Please drop a document.");
                    }
                    else if ($("#fileInput").get(0).files.length == 0) {
                        alert("Oops! Please select a document.");
                        return;
                    }
                }

                if (files.length > 1)
                {
                    alert("Oops!, You can Upload only one document");
                }
                else
                {
                    fileData.append("fileInput", files[0]);
                    //collectionobj.fileInput = fileData;
                    //collectionobj.Attachment = fileData;
                    $.ajax({
                        type: "POST",
                        url: "../Api/DynamicWebsiteApi/UploadAttachmentSubMenu",
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
            else {
                $.ajax({
                    type: "POST",
                    url: "../Api/DynamicWebsiteApi/UploadAttachmentSubMenu",
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
        $scope.URLType = "";
        $scope.TabId = "";
        $scope.UnitId = "";
        $scope.URLType = "";
        $scope.MenuId = "";
        $scope.SubMenuName = "";
        $scope.LayoutCode = "";
        $scope.SeqNo = "";
        $scope.IsApproved = "";
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.UnitMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.$applyAsync();
    }


    /*Search Button Click Event*/
    $scope.SubMenuMasterList = [];
    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {

        
        $scope.disable = true;
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetWebSubMenuMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Unit Type Code", "Value": "UnitTypeCode", "HeaderValue": "UnitTypeCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Unit Type Name", "Value": "UnitTypeName", "HeaderValue": "UnitType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Code", "HeaderValue": "UnitCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Unit Name", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Tab Code", "HeaderValue": "TabCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Tab Name", "HeaderValue": "TabName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Menu Code", "HeaderValue": "MenuCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Menu Name", "HeaderValue": "MenuName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Sub Menu Name", "HeaderValue": "SubMenuName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "URL Type", "HeaderValue": "URLType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Target Layout Code", "HeaderValue": "LayoutCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Target Layout", "HeaderValue": "LayoutName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Target Unit", "Value": "TargetUnitId", "HeaderValue": "TargetUnitId", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "URL", "HeaderValue": "URL", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Attachment", "HeaderValue": "Attachment", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "SeqNo", "HeaderValue": "SeqNo", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.SubMenuMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            
            $('#example tbody').on('dblclick', 'tr', function (event)
            {

                //debugger
                
                $scope.GetUnitTypePerm();
              
                var row = $('#example').DataTable().row(this).data();
                $scope.GetTab(row[3]);
                $scope.GetMenu(row[5],1);
                $scope.GetddlMenu(row[5]);
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.UnitTypeCode = $(FindHtml(row[1])).val();
                $scope.GetUnitPerm($scope.UnitTypeCode);
                $scope.UnitId = $scope.SubMenuMasterList[0].UnitCode;
                $scope.TabId = $scope.SubMenuMasterList[0].TabCode.toString();
                $scope.TargetUnitId = $scope.SubMenuMasterList[0].TargetUnitId.toString();
                $scope.URL = row[14];
                $scope.Attachment = row[15];
                //$scope.MenuId = row[6];
                $scope.MenuId = row[7];
                $scope.SubMenuName = row[9];
                $scope.URLType = row[10];
                $scope.LayoutCode = row[11];
                $scope.SeqNo = row[16];
                $scope.IsApproved = row[17];
                $scope.IsActive = (row[18] == "Yes" ? "true" : "0");
                $scope.SubMenuMasterList = response.data;
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
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
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/InsertUpdateDeleteWebSubMenuMaster", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        });
    };
}