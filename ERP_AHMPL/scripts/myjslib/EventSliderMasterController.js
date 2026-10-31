app.BannerMasterController = function ($scope, $element, $filter, myService) {
    debugger;
    var userid = sessionStorage.getItem("userid");
    $scope.hfUnitId = (sessionStorage.getItem("MenuDetailUnitId"));
    $scope.hfLayoutId = (sessionStorage.getItem("MenuDetailLayoutId"));
    $scope.hfLayoutPartId = (sessionStorage.getItem("MenuDetailLayoutPartId"));
    $scope.hfTabId = (sessionStorage.getItem("MenuDetailTabId"));
    $scope.hfMenuId = (sessionStorage.getItem("MenuDetailMenuId"));
    $scope.hfSubMenuId = (sessionStorage.getItem("MenuDetailSubMenuId"));

    $scope.GetRecommedSize = function () {
        debugger
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

    $scope.SetAlbumn = function ()
    {
        debugger;
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
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;    
        var sdfsdf = $("#fileInput").get(0).files.length;
        var HeadImgSrc = $('#imgfileInput').attr('src');
        var tarr = HeadImgSrc.split('/');
        var file43 = tarr[tarr.length - 1];
        if ((sdfsdf != 0))
        {
            collectionobj.ImageName = $scope.imgfileInput;
        }
        else if (file43 != "noimage.png") {
            collectionobj.BannerImagePath = $scope.imgfileInput;
        }


        
        collectionobj.RelationshipId = relationshipId;
        collectionobj.BannerDescription1 = $scope.BannerDescription1;
        collectionobj.BannerDescription2 = CKEDITOR.instances.EnglishEditor.getData();
        collectionobj.DisplayCode = displayCode;
        collectionobj.PageBannerCategoryCode = $scope.PageBannerCategoryCode;
        collectionobj.EventFromDate = $scope.EventFromDate;
        collectionobj.EventToDate = $scope.EventToDate;
        collectionobj.ImageHeight = $scope.ImageHeight;
        collectionobj.ImageObjectFit = $scope.ImageObjectFit;

        debugger;
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
            if (files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    fileData.append("fileInput", files[i]);
                }

                var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/EventSlider', collectionobj);
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
            var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/EventSlider', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }


    };
    $scope.SaveRecord = function ()
    {
        debugger;
        $scope.SetAlbumn();
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
        debugger;
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.fnApproved($scope.UnitId);
        $scope.BannerTitle = "";
        $scope.BannerType = "";
        $scope.Summary = "";
        $scope.BannerImageName = "";
        $scope.BannerImagePath = "";
        $scope.ImageExt = "";
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
    $scope.SearchRecord = function () {
        debugger
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        debugger
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 13;
        collectionobj.UnitId = $scope.hfUnitId;
        collectionobj.TabId = $scope.hfTabId;
        collectionobj.RelationshipId = relationshipId;
        if ($scope.hfMenuId != 'undefined') {
            collectionobj.MenuId = $scope.hfMenuId;
        }
        if ($scope.hfSubMenuId != 'undefined') {
            collectionobj.SubMenuId = $scope.hfSubMenuId;
        }
        var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/GetEventSlider', collectionobj);
        getData.then(function (response) {
            debugger;
            var tblheader =
                [
                    { "HeaderText": "Id", "Value": "Code", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Tab Name", "HeaderValue": "TabName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Menu Name", "Value": "MenuId", "HeaderValue": "MenuName", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "SubMenu Name", "Value": "SubMenuId", "HeaderValue": "SubMenuName", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },                    
                    { "HeaderText": "Slider Image", "Value": "DupBannerImagePath", "HeaderValue": "DupBannerImagePath", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "Yes" },
                    { "HeaderText": "Slider Alternate Text", "HeaderValue": "BannerAltText", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },                
                    { "HeaderText": "Type", "HeaderValue": "BannerType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Slider Description1", "HeaderValue": "BannerDescription1", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Slider Description2", "HeaderValue": "BannerDescription2", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            debugger
            $scope.BannerMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            debugger
            $('tbody').on('dblclick', 'tr', function () {
                debugger
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.BannerMasterList = $filter('filter')($scope.BannerMasterList, { 'Code': $scope.hfId });
                $scope.hfMenuId = $(FindHtml(row[2])).val();
                $scope.hfSubMenuId = $(FindHtml(row[3])).val();
                $scope.BannerTitle = row[4];
                $scope.BannerImageName = row[5];
                $scope.imgfileInput = $scope.BannerMasterList[0].BannerImagePath;
                $scope.BanneraltText = $scope.BannerMasterList[0].BannerAltText;
                $scope.Slogan = row[8];
                $scope.imgSloganImage = $(FindHtml(row[9])).attr('src');
                $scope.BannerType = $scope.BannerMasterList[0].BannerType;
                $scope.IsApproved = $(FindHtml(row[11])).val();
                $scope.IsActive = (row[12] == "Yes" ? "1" : "0");
                $scope.BannerDescription1 = $scope.BannerMasterList[0].BannerDescription1;              
                $scope.PageBannerCategoryCode = $scope.BannerMasterList[0].PageBannerCategoryCode; 
                CKEDITOR.instances.EnglishEditor.setData($scope.BannerMasterList[0].BannerDescription2);
                $scope.EventFromDate = $scope.ConverDate($scope.BannerMasterList[0].EventFromDate);
                $scope.EventToDate = $scope.ConverDate($scope.BannerMasterList[0].EventToDate);

                $scope.ImageHeight = $scope.BannerMasterList[0].ImageHeight;
                $scope.ImageObjectFit = $scope.BannerMasterList[0].ImageObjectFit;

                $scope.Save = "Update";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
            });
        });
    };
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do u want to delete this record!", function () {
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.Action = "3";
            collectionobj.RelationshipId = relationshipId;

            var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/EventSlider", collectionobj);

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        });
    };

    $scope.OpenFileUploadBanner = function () {
        $('#fileInput').click();
    }
    $scope.fuBannerImageChange = function (input) {
        readBannerURL(input);
    };
    function readBannerURL(input)
    {
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