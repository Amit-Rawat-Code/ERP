app.SideBarOnHomePageController = function ($scope, $element, $filter, myService) {

    $scope.GetLayoutMaster = function () {

        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutMaster', collectionobj);
        getData.then(function (response) {
            $scope.GetLayouts = response.data;
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
        collectionobj.UnitTypeCode = $scope.UnitTypeId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitMaster", collectionobj);
        getData.then(function (response) {
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

    $scope.files = [];

    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
    });
    

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        debugger
        var collectionobj = {};
        collectionobj.Code = $scope.Code;
        collectionobj.UnitId = $scope.UnitId;
        collectionobj.UnitTypeCode = $scope.UnitTypeCode;
        collectionobj.CaptionName = $scope.TabName;
        collectionobj.URLType = $scope.URLType;
        collectionobj.TargetUnitId = $scope.TargetUnitId;
        collectionobj.CaptionLink = $scope.URL;
        collectionobj.Attachment = $scope.Attachment;
        collectionobj.Alignment = $scope.TabAlignment;
        collectionobj.LayoutCode = $scope.LayoutCode;
        collectionobj.SeqNo = $scope.SeqNo; 
        collectionobj.IsApproved = $scope.IsApproved;
        collectionobj.IsActive = $scope.IsActive;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.TabAlignment = $scope.TabAlignment;
        collectionobj.DisplayCode = displayCode;
        var files = $("#fileInput").get(0).files;

        //var sdfsdf = $("#fileInputs").get(0).files.length;

        //var HeadImgSrc = $('#imgfileInputs').attr('src');
        //var tarr = HeadImgSrc.split('/');
        //var file43 = tarr[tarr.length - 1];

        //if ((sdfsdf != 0)) {
        //    collectionobj.fileInput = $("#fileInputs").get(0).files[0].name;
        //}
        //else if (file43 != "noimage.png") {
        //    collectionobj.TabImage = $scope.imgfileInputs;
        //}
        if ($scope.Save == "Save") {
            collectionobj.Action = 1;
        }
        else {
            collectionobj.Action = 2;
        }
        //var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/SetValues', collectionobj);
        //getData.then(function (response)
        //{
        if ($scope.URLType == "A") {

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

            if (files.length > 1) {
                alert("Oops!, You can Upload only one document");
            }
            else {
                fileData.append("fileInput", files[0]);
                $.ajax({
                    type: "POST",
                    url: "../Api/DynamicWebsiteApi/UploadAttachmentSideTab",
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
            var getData = myService.postmethode('POST', '../Api/DynamicWebsiteApi/UploadAttachmentSideTab', collectionobj, $scope.files);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
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

    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.UnitTypeCode = "";
        $scope.TabName = "";
        $scope.UnitId = "";
        $scope.URLType = "";
        $scope.LayoutCode = "";
        $scope.SeqNo = "";
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
        collectionobj.Action = "4";
        collectionobj.UnitId = $scope.GetUnitTypePerms[0].Code;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetSideBarContent', collectionobj);
        getData.then(function (response) {
            debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Unit Type Code", "HeaderValue": "UnitTypeCode", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Type Name", "HeaderValue": "UnitType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Id", "HeaderValue": "UnitId", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Name", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Alignment", "HeaderValue": "TabAlignment", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Target UnitId", "HeaderValue": "TargetUnitId", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "CaptionName", "HeaderValue": "CaptionName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "CaptionLink", "HeaderValue": "CaptionLink", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.TabMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                debugger
                var row = $('#example').DataTable().row(this).data();
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.UnitTypeCode = $scope.TabMasterList[0].UnitTypeCode.toString();
                $scope.UnitId = $scope.TabMasterList[0].UnitTypeCode.toString();
                $scope.Alignment = $scope.TabMasterList[0].Alignment;
                $scope.TabName = $scope.TabMasterList[0].CaptionName;
                $scope.URLType = $scope.TabMasterList[0].URLType;
                $scope.LayoutCode = $scope.TabMasterList[0].LayoutCode;
                $scope.URL = $scope.TabMasterList[0].CaptionLink;
                $scope.IsActive = $scope.TabMasterList[0].IsActive;
                $scope.IsApproved = $scope.TabMasterList[0].IsApproved;
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                $scope.SetURLType();
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
}

