app.UnitMasterController = function ($scope, $element, $filter, myService)
{

    $scope.HomeVideoLink = "";
    $scope.GetUnitType1 = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;    
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitTypeMaster", collectionobj);
        getData.then(function (response)
        {
            $scope.GetUnitTypes = response.data;
        });
    };

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.UnitTypeCode = $scope.UnitTypeCode;
            collectionobj.UnitName = $scope.UnitName;//
            collectionobj.UnitTitle = $scope.UnitTitle;
            collectionobj.FacebookLink = $scope.FacebookLink;
            collectionobj.TwitterLink = $scope.TwitterLink;
            collectionobj.YoutubeLink = $scope.YoutubeLink;
            collectionobj.HomeVideoLink = $scope.HomeVideoLink;
            collectionobj.YoutubeFeed = $scope.YoutubeFeed;
            collectionobj.FacebookFeed = $scope.FacebookFeed;
            collectionobj.SiteLocation = $scope.SiteLocation;
            collectionobj.MaintainedBy = $scope.MaintainedBy;
            collectionobj.DisplayCode = displayCode;
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.RelationshipId = relationshipId;            
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.UserId = userid;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            var files = $("#fileInput").get(0).files;

            var fileData = new FormData();
            if (files.length == 0)
            {
                collectionobj.logopath = $scope.hflogopath;
            }
            if ($scope.Save == "Save")
            {
                collectionobj.Action = 1;
                var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/SetValues', collectionobj);
            
                getData.then(function (response)
                {
                    if (files.length > 1)
                    {
                        alert("Oops!, You can't Upload logo more than 1");
                    }
                    else
                    {
                        for (var i = 0; i < files.length; i++) {
                            fileData.append("fileInput", files[i]);
                        }
                        var collectionobj = {};

                        collectionobj.logopath = fileData;
                        $.ajax({
                            type: "POST",
                            url: "../Api/DynamicWebsiteApi/UploadAttachmentUnitLogo",
                            dataType: "json",
                            contentType: false, // Not to set any content header
                            processData: false, // Not to process data 
                            data: fileData,
                            success: function (response)
                            {
                                $('#fileInput').val('');
                                if (showMsgBox(JSON.stringify(response))) {
                                    $scope.ClearControl(1);
                                }
                            }
                        });
                    }

                });
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = 2;
                var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/SetValues", collectionobj);
                getData.then(function (response)
                {
                   
                    if (files.length > 1) {
                        alert("Oops!, You can't Upload logo more than 1");
                    }
                    else {
                        fileData.append("fileInput", files[0]);
                        collectionobj.logopath = fileData;
                    }

                    $.ajax({
                        type: "POST",
                        url: "../Api/DynamicWebsiteApi/UploadAttachmentUnitLogo",
                        dataType: "json",
                        contentType: false, // Not to set any content header
                        processData: false, // Not to process data 
                        data: fileData,
                        success: function (response) {
                            $('#fileInput').val('');
                            if (showMsgBox(JSON.stringify(response))) {
                                $scope.ClearControl(1);
                            }
                        }
                    });

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
    $scope.UnitMasterList = [];
    $scope.ResetControl = function (flag) {
      
        $scope.Save = "Save";
        $scope.FacebookLink = "";
        $scope.TwitterLink = "";
        $scope.YoutubeLink = "";
        $scope.HomeVideoLink = "";
        $("#ddlUnitType").val("");
        $scope.UnitName = "";
        $scope.UnitTitle = "";
        $scope.IsApproved = "";
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.FacebookFeed = "";
        $scope.YoutubeFeed = "";
        $scope.SiteLocation = "";
        $scope.MaintainedBy = "";
        $scope.UnitMasterList = [];

        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.$applyAsync();
    }

    /*Search Button Click Event*/
    $scope.UnitMasterList = [];
    $scope.SearchRecord = function () {

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
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetUnitMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Unit Type", "Value": "UnitType", "HeaderValue": "UnitType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Name", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unit Title", "HeaderValue": "UnitTitle", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Facebook Link", "HeaderValue": "FacebookLink", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Twitter Link", "HeaderValue": "TwitterLink", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "YouTube Link", "HeaderValue": "YoutubeLink", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Video Link", "HeaderValue": "VideoLink", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.UnitMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                var row = $('#example').DataTable().row(this).data();
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.BodyContentList = $filter('filter')($scope.BodyContentList, { 'Code': $scope.Code });
                $("#ddlUnitType").val($scope.UnitMasterList[0].UnitTypeCode); 
                $scope.UnitTypeCode = $scope.UnitMasterList[0].UnitTypeCode;
                $scope.UnitName = row[2];
                $scope.UnitTitle = row[3];
                $scope.FacebookLink = row[4];
                $scope.TwitterLink = row[5];
                $scope.YoutubeLink = row[6];
                $scope.HomeVideoLink = row[7];
                $scope.FacebookFeed = $scope.UnitMasterList[0].FacebookFeed;
                $scope.YoutubeFeed = $scope.UnitMasterList[0].YoutubeFeed;
                $scope.SiteLocation = $scope.UnitMasterList[0].SiteLocation;
                $scope.MaintainedBy = $scope.UnitMasterList[0].MaintainedBy;
                $scope.hflogopath = $(FindHtml(row[8])).val();
                $scope.IsApproved =row[8];
                $scope.IsActive = (row[9] == "Yes" ? "true" : "0");
                $scope.UnitMasterList = response.data;
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();                
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                
            });
        });
    };



    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do u want to delete this record!", function ()
        {
            
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.Action = "3";
            collectionobj.RelationshipId = relationshipId;            
            var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/InsertUpdateDeleteUnitMaster", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        });
    };
}