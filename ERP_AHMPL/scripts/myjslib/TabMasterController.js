app.TabMasterController = function ($scope, $element, $filter, myService) {

    $scope.GetLayoutMaster = function () {

        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;       
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
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            splitsidsLast = splitsids[0].split('-');
            $scope.UnitId = splitsidsLast[0];
        }
        //collectionobj.UnitId = sessionStorage.getItem("UnitId");
        collectionobj.UnitTypeCode = $scope.UnitTypeId;
        collectionobj.RelationshipId = relationshipId; 
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitMaster", collectionobj );
        getData.then(function (response)
        {
            $scope.GetAllUnits = response.data;
        });
    };
    $scope.GetUnitTypePerm = function ()
    {
        
        var collectionobj = {};
        if (loginTypeId == '1')
            collectionobj.Action = 4;
        else
            collectionobj.Action = 5;

        collectionobj.UserId = userid;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitTypeMaster", collectionobj);
        getData.then(function (response)
        {
            
            $scope.GetUnitTypePerms = response.data;
            if ($scope.GetUnitTypePerms.length > 0)
                if (loginTypeId == '1')
                {
                    $scope.UnitTypeId = $scope.GetUnitTypePerms[0].UnitTypeId.toString();
                    $scope.GetUnitPerm(loginTypeId);
                }
                else
                {
                    $scope.UnitTypeId = $scope.GetUnitTypePerms[0].UnitTypeId.toString();
                    $scope.GetUnitPerm(loginTypeId);
                }
        });
    };
    $scope.GetUnitPerm = function (defaultselection)
    {
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
            {
                    $scope.UnitId = $scope.GetUnitPerms[0].Code.toString();
                    //if (IsFunctionDefined('GetTab'))
                    $scope.GetTab($scope.UnitId);
                    //if (IsFunctionDefined('fnApproved'))
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
    $scope.SaveRecord = function ()
    {
        
        var collectionobj = {};        
        if (isValidate())
        {
            debugger
            collectionobj.Code = $scope.Code;
            collectionobj.UnitId = $scope.UnitId;
            collectionobj.UnitTypeCode = $scope.UnitTypeCode;
            collectionobj.TabName = $scope.TabName;
            collectionobj.URLType = $scope.URLType;
            collectionobj.TargetUnitId = $scope.TargetUnitId;
            collectionobj.URL = $scope.URL;
            collectionobj.Attachment = $scope.Attachment;
            collectionobj.LayoutCode = $scope.LayoutCode;
            collectionobj.SeqNo = $scope.SeqNo;            
            collectionobj.RelationshipId = relationshipId;            
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.TabAlignment = $scope.TabAlignment;  
            collectionobj.DisplayCode = displayCode; 
            var files = $("#fileInput").get(0).files;

            var sdfsdf = $("#fileInputs").get(0).files.length;

            var HeadImgSrc = $('#imgfileInputs').attr('src');
            var tarr = HeadImgSrc.split('/');
            var file43 = tarr[tarr.length - 1];

            if ((sdfsdf != 0)) {
                collectionobj.fileInput = $("#fileInputs").get(0).files[0].name;
            }
            else if (file43 != "noimage.png") {
                collectionobj.TabImage = $scope.imgfileInputs;
            }



            if ($scope.Save == "Save")
            {
                collectionobj.Action = 1;
            }
            else
            {
                collectionobj.Action = 2;
            }
            //var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/SetValues', collectionobj);
            //getData.then(function (response)
            //{
                if ($scope.URLType == "A")
                {
                    
                    var fileData = new FormData();
                    if ($scope.fileInput == "" || $scope.fileInput == 'undefined')
                    {
                        if (files.length == 0) {
                            alert("Oops!, Please drop a document.");
                        }
                        else if ($("#fileInput").get(0).files.length == 0)
                        {
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
                            url: "../Api/DynamicWebsiteApi/UploadAttachmentTab",
                            dataType: "json",
                            contentType: 'application/json; charset=UTF-8', // Not to set any content header
                            processData: false, // Not to process data 
                            data: JSON.stringify(collectionobj),
                            success: function (response)
                            {
                                
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
                    var getData = myService.postmethode('POST', '../Api/DynamicWebsiteApi/UploadAttachmentTab', collectionobj, $scope.files);
                    getData.then(function (response)
                    {
                        if (showMsgBox(response.data))
                        {
                            $scope.ClearControl(1);
                        }
                    });
                    //$.ajax({
                    //    type: "POST",
                    //    url: "../Api/DynamicWebsiteApi/UploadAttachmentTab",
                    //    dataType: "json",
                    //    contentType: 'application/json; charset=UTF-8', // Not to set any content header
                    //    processData: false, // Not to process data 
                    //    data: JSON.stringify(collectionobj),
                    //    success: function (response) {

                    //        $scope.UploadPhoto = [];
                    //        $scope.photo = [];
                    //        $('#fileInput').val('');

                    //        if (showMsgBox(JSON.stringify(response))) {
                    //            $scope.ClearControl(1);
                    //        }
                    //    }
                    //});
                }
            //});

            //if ($scope.Save == "Save") {
            //    collectionobj.Action = 1;
            //}
            //else {
            //    collectionobj.Action = 2;
            //}
            //var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/InsertUpdateDeleteTabMaster', collectionobj);
            //getData.then(function (response) {
              
            //    if (showMsgBox(response.data)) {
            //        $scope.ClearControl(1);
            //    }
            //});
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


    $scope.TabMasterList = [];
    $scope.ResetControl = function (flag)
    {
       
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
    $scope.SearchRecord = function ()
    {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function ()
    {
        $scope.disable = true;
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;  
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetTabMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Unit Type Code", "Value": "UnitTypeCode", "HeaderValue": "UnitTypeCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Unit Type Name", "Value": "UnitTypeName", "HeaderValue": "UnitType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Code", "HeaderValue": "UnitCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Unit Name", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "TabName", "HeaderValue": "TabName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "URL Type", "HeaderValue": "URLType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Target Layout Code", "HeaderValue": "TargetLayoutCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Target Layout", "HeaderValue": "LayoutName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Target Unit", "Value": "TargetUnitId", "HeaderValue": "TargetUnitId", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "URL", "HeaderValue": "URL", "Width": "100px", "ShowColumn": "Yes" },
                    { "HeaderText": "Attachment", "HeaderValue": "Attachment", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "SeqNo", "HeaderValue": "SeqNo", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },  
                    { "HeaderText": "Tab Alignment", "HeaderValue": "TabAlignment", "Width": "100px", "ShowColumn": "Yes" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            
            $scope.TabMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            
            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                var row = $('#example').DataTable().row(this).data();
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.TabMasterList = $filter('filter')($scope.TabMasterList, { 'Code': $scope.Code });
                $scope.UnitTypeCode = $(FindHtml(row[1])).val();
                $scope.GetUnitPerm($scope.UnitTypeCode);
                $scope.UnitId = row[3];
                $scope.TabName = row[5];
                $scope.URLType = row[6];
                $scope.URL = row[10];
                $scope.TargetUnitId = $scope.TabMasterList[0].TargetUnitId.toString();
                $scope.imgfileInputs = $scope.TabMasterList[0].TabImagePath;
                $scope.LayoutCode = row[7];
                $scope.SeqNo = row[12];         
                $scope.TabAlignment = row[13]; 
                $scope.IsApproved = row[14];
                $scope.IsActive = (row[15] == "Yes" ? "true" : "0");               
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
            var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/InsertUpdateDeleteTabMaster", collectionobj);
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