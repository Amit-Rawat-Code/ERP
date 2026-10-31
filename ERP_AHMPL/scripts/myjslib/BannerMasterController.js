app.BannerMasterController = function ($scope, $element, $filter, myService) {
   

    var userid = sessionStorage.getItem("userid");
    $scope.hfUnitId = (sessionStorage.getItem("MenuDetailUnitId"));
    $scope.hfLayoutId = (sessionStorage.getItem("MenuDetailLayoutId"));
    $scope.hfLayoutPartId = (sessionStorage.getItem("MenuDetailLayoutPartId"));
    $scope.hfTabId = (sessionStorage.getItem("MenuDetailTabId"));
    $scope.hfMenuId = (sessionStorage.getItem("MenuDetailMenuId"));
    $scope.hfSubMenuId = (sessionStorage.getItem("MenuDetailSubMenuId"));

    $scope.GetRecommedSize = function () {
        var collectionobj = {};
        collectionobj.Action = 17;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.LayoutCode = $scope.hfLayoutId;
        collectionobj.LayoutPartId = $scope.hfLayoutPartId;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetBodyContent", collectionobj);
        getData.then(function (response) {
            $scope.RecommedSizeImageData = response.data;
        });

    };


    $scope.GetPageCategoryCode = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 29;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetBanner", collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.PageCategoryCodeList = response.data;
        });

    };

    $scope.SetAlbumn = function () {
        debugger
        if ($scope.hfTabId == 'undefined')
            $scope.hfTabId = null;
        if ($scope.hfMenuId == 'undefined')
            $scope.hfMenuId = null;
        if ($scope.hfSubMenuId == 'undefined')
            $scope.hfSubMenuId = null;

        var collectionobj = {};
        collectionobj.Code = $scope.hfId;
        collectionobj.UnitId = $scope.hfUnitId;
        collectionobj.LayoutCode = $scope.hfLayoutId;
        collectionobj.LayoutPartId = $scope.hfLayoutPartId;
        collectionobj.TabId = $scope.hfTabId;
        collectionobj.MenuId = $scope.hfMenuId;
        collectionobj.SubMenuId = $scope.hfSubMenuId;
        collectionobj.BannerTitle = $scope.BannerTitle;
        collectionobj.BannerType = $scope.BannerType;
        collectionobj.BannerImageName = $scope.BannerImageName;
        collectionobj.BanneraltText = $scope.BanneraltText;
        collectionobj.Slogan = $scope.Slogan;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.SloganImagePath = $scope.imgSloganImage;
        collectionobj.ImageName = $scope.imgfileInput;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.BannerDescription1 = $scope.BannerDescription1;
        collectionobj.BannerDescription2 = $scope.BannerDescription2;
        collectionobj.DisplayCode = displayCode;
        collectionobj.PageBannerCategoryCode = $scope.PageBannerCategoryCode;
        collectionobj.EventDate = $scope.EventDate;
        collectionobj.Location = $scope.Venue;
        collectionobj.ImageHeight = $scope.ImageHeight;
        collectionobj.ImageObjectFit = $scope.ImageObjectFit;
        if ($scope.BannerType == 'Banner')
        {
            debugger;
            if ($scope.Save == "Save")
            {
                if ($("#fileInput").get(0).files.length == 0) {
                    alert("Oops! Please Drop atleast one Image.");
                    return;
                }
                var files = $("#fileInput").get(0).files;
                var fileData = new FormData();

                if ($("#fileInput").get(0).files.length > 1) {
                    alert("Only one Image can be select for banner.");
                    return;
                }
                else if (files[0].size >= 4194304) {
                    alert("not more than 4 mb");
                    return;
                }
                collectionobj.Action = 1;
                if (files.length > 5) {
                    alert("Oops!, You can't Upload image more than 5");
                }
                if (files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                        fileData.append("fileInput", files[i]);
                    }


                    collectionobj.BannerImageName = $scope.BannerImageName;

                    var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/UploadFiles', collectionobj);
                    getData.then(function (response) {
                        debugger
                        if (showMsgBox(response.data)) {
                            $scope.ClearControl(1);
                        }
                    });
                }
            }
            else
            {
                debugger;
                collectionobj.Action = 2;
                var files = $("#fileInput").get(0).files;
                var fileData = new FormData();

                for (var i = 0; i < files.length; i++) {
                    fileData.append("fileInput", files[i]);
                }
                
                var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/UploadFiles', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
        }
        else if ($scope.BannerType == 'Slider')
        {
            
            if ($scope.Save == "Save")
            {
                collectionobj.Action = 1;

                if ($("#fileInput").get(0).files.length == 0) {
                    alert("Oops! Please Drop atleast one Image.");
                    return;
                }
                var files = $("#fileInput").get(0).files;
                var fileData = new FormData();
                if (files.length == 0) {
                    alert("Oops!, Please drop some Images.");
                }
                else if (files.length > 5) {
                    alert("Oops!, You can't Upload image more than 5");
                }
                if (files.length > 0)
                {
                    for (var i = 0; i < files.length; i++) {
                        fileData.append("fileInput", files[i]);
                    }

                    var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/UploadFiles', collectionobj);
                    getData.then(function (response) {
                        if (showMsgBox(response.data)) {
                            $scope.ClearControl(1);
                        }
                    });
                }
            }
            else
            {
                debugger;
                collectionobj.Action = 2;
                var files = $("#fileInput").get(0).files;
                var fileData = new FormData();

                for (var i = 0; i < files.length; i++) {
                    fileData.append("fileInput", files[i]);
                }
                collectionobj.URL=$scope.SliderUrl
                var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/UploadFiles', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
        }

    };
    $scope.SaveRecord = function () {
        debugger
        $scope.SetAlbumn();
    }

    $scope.HidePageSliderCategoryddl = function ()
    {
        var cont = $("#BannerType").val();
        if (cont == 'Banner')
        {
            $scope.CategoryCode = true;
        }
        else
        {
            $scope.CategoryCode =false ;
        }
    }
    $scope.fnApproved = function (UnitId) {
        var collectionobj = {};
        collectionobj.Action = 5;
        if (UnitId == "" || UnitId == undefined)
            collectionobj.UnitId = 0;
        else
            collectionobj.UnitId = UnitId;

        var getData = myService.methode('POST', "/Masters/GetBanner", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            debugger;
            $scope.PendingBannerList = response.data;
        });
    };
    $scope.Ischk = [];
    $scope.ApproveRecord = function () {
        debugger;
        var flag = false;
        if ($scope.isValidate()) {
            var collectionobj = {};
            var ids = "";
            var separate = "";
            $.each($scope.Ischk, function (key, val) {
                if (val === true) {
                    ids = ids + separate;
                    ids = ids + key;
                    separate = ',';
                }
            });
            collectionobj.ImageIds = ids;
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.Remarks = $scope.Remarks;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.Action = 4;
            var getData = myService.methode('POST', "/Masters/InsertUpdateDeleteBannerMaster", '{obj:' + JSON.stringify(collectionobj) + '}');
            getData.then(function (response) {
                debugger;
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    }
    $scope.FinalizeRecord = function (ImageId) {

        var collectionobj = {};
        collectionobj.ImageId = ImageId;
        collectionobj.IsApproved = 4;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.Action = 5;

        var getData = myService.methode('POST', "/Masters/InsertUpdateDeleteBannerMaster", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            debugger;
            if (showMsgBox(response.data, 'Finalize', "Finalized successfully.", 'success', 'btn-success')) {
                $scope.ImageId = "";
                $scope.fnApproved($scope.UnitId);
            }
        });
    }
    $scope.SuspendRecord = function (ImageId) {

        var collectionobj = {};
        collectionobj.ImageId = ImageId;
        collectionobj.IsApproved = 5;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.Action = 6;

        var getData = myService.methode('POST', "/Masters/InsertUpdateDeleteBannerMaster", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            debugger;
            submitConfirmbox("do u want to Suspend this record!", function () {
                if (showMsgBox(response.data, 'Suspend', "Suspended successfully.", 'success', 'btn-success')) {
                    $scope.ImageId = "";
                    $scope.fnApproved($scope.UnitId);
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
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.fnApproved($scope.UnitId);
        $scope.BannerTitle = "";
        $scope.BannerType = "";
        $scope.Summary = "";
        $scope.BannerDescription1 = "";
        $scope.BannerDescription2 = "";
        $scope.BannerImageName = "";
        $scope.BannerImagePath = "";
        $scope.imgfileInput = "";
        $scope.ImageExt = "";
        $scope.ImageObjectFit = "";
        $scope.ImageHeight = "";
        $scope.PageBannerCategoryCode = "";
        $scope.ImagePath = "";
        $scope.BanneraltText = "";
        $scope.Slogan = "";
        $scope.SloganImagePath = "";
        $scope.imgSloganImage = "../../Content/noimage.png";
        $scope.IsApproved = "";
        $scope.Remarks = "";
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.chkAll = false;
        $scope.Ischk = {};
        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.applyAsync();
    }

    $scope.BannerMasterList = [];
    $scope.SearchRecord = function ()
    {
     
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function ()
    {
        
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.UnitId = $scope.hfUnitId;
        collectionobj.TabId = $scope.hfTabId;
        collectionobj.RelationshipId = relationshipId;
        if ($scope.hfMenuId != 'undefined')
        {
            collectionobj.MenuId = $scope.hfMenuId;
        }
        if ($scope.hfSubMenuId != 'undefined')
        {
            collectionobj.SubMenuId = $scope.hfSubMenuId;
        }
        var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/GetBanner', collectionobj); 
        getData.then(function (response)
        {
      
            var tblheader =
                [
                    { "HeaderText": "Id", "Value": "Code", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Tab Name", "HeaderValue": "TabName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Menu Name", "Value": "MenuId", "HeaderValue": "MenuName", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "SubMenu Name", "Value": "SubMenuId", "HeaderValue": "SubMenuName", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Banner Title", "HeaderValue": "BannerTitle", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Banner Image Name", "HeaderValue": "BannerImageName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Banner Image", "Value": "DupBannerImagePath", "HeaderValue": "DupBannerImagePath", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "Yes" },
                    { "HeaderText": "Banner Alternate Text", "HeaderValue": "BannerAltText", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Slogan", "HeaderValue": "Slogan", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Slogan Image Path", "Value": "SloganImagePath", "HeaderValue": "SloganImagePath", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "Yes" },
                    { "HeaderText": "BannerType", "HeaderValue": "BannerType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Banner Description1", "HeaderValue": "BannerDescription1", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Banner Description2", "HeaderValue": "BannerDescription2", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
          
            $scope.BannerMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
           
            $('tbody').on('dblclick', 'tr', function ()
            {
                             
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.BannerMasterList = $filter('filter')($scope.BannerMasterList, { 'Code': $scope.hfId });
                $scope.hfMenuId = $(FindHtml(row[2])).val();
                $scope.hfSubMenuId = $(FindHtml(row[3])).val();
                $scope.BannerTitle = row[4];
                $scope.BannerImageName = row[5];
                $scope.imgfileInput = $(FindHtml(row[6])).attr('src');
                $scope.BanneraltText = row[7];
                $scope.Slogan = row[8];
                $scope.imgSloganImage = $(FindHtml(row[9])).attr('src');              
                $scope.BannerType = row[10];
                $scope.IsApproved = $(FindHtml(row[11])).val();
                $scope.IsActive = (row[12] == "Yes" ? "1" : "0");
                $scope.BannerDescription1 = row[13];
                $scope.BannerDescription2 = row[14];
                $scope.Save = "Update";
                $scope.disableDelete = false;

                
                $scope.ImageHeight = $scope.BannerMasterList[0].ImageHeight;               
                $scope.ImageObjectFit = $scope.BannerMasterList[0].ImageObjectFit;
                $scope.PageBannerCategoryCode = $scope.BannerMasterList[0].PageBannerCategoryCode;
                var cont = $scope.BannerType;
                if (cont == 'Banner') {
                    $scope.CategoryCode = true;
                }
                else {
                    $scope.CategoryCode = false;
                }
               
            
                $scope.$applyAsync();
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
            });
        });
    };
    $scope.DeleteRecord = function ()
    {
        deleteConfirmbox("Do u want to delete this record!", function ()
        {
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.Action = "3";
            collectionobj.RelationshipId = relationshipId;

            var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/UploadFiles", collectionobj);

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        });
    };


    $scope.chkAll_change = function () {
        $.each($scope.PendingBannerList, function (index, val) {
            if (val.status === 'Finalize') {
                $scope.Ischk[val.ImageId] = false;
            }
            else {
                $scope.Ischk[val.ImageId] = $scope.chkAll;
            }
        });
    }
    $scope.chk_change = function () {
        var flag = false;
        $.each($scope.Ischk, function (ImageId, value) {
            if (value === true) {
                flag = true;
                return;
            }
        });
        $scope.chkAll = flag;
    };


    $scope.OpenFileUpload = function () {
        $('#SloganfileInput').click();
    }
    $scope.OpenFileUploadBanner = function () {
        $('#fileInput').click();
    }
    $scope.fuSloganImageChange = function (input) {
        readURL(input);
    };
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.imgSloganImage = e.target.result;
                $scope.$applyAsync();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $scope.fuBannerImageChange = function (input) {
        readBannerURL(input);
    };
    function readBannerURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.imgfileInput = e.target.result;
                $scope.$applyAsync();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }


}