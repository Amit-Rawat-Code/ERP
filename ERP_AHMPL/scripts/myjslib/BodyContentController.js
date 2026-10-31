app.BodyContentController = function ($scope, $element, $filter, myService)
{

    $scope.disableDelete = true;
    $scope.disablePrint = true;
    var userid = sessionStorage.getItem("userid");
    $scope.hfUnitId = (sessionStorage.getItem("MenuDetailUnitId"));
    $scope.hfLayoutId = (sessionStorage.getItem("MenuDetailLayoutId"));
    $scope.hfLayoutPartId = (sessionStorage.getItem("MenuDetailLayoutPartId"));
    $scope.hfLayoutPartAbbreviationName = (sessionStorage.getItem("MenuDetailLayoutPartAbbreviationName"));
    $scope.hfTabId = (sessionStorage.getItem("MenuDetailTabId"));
    $scope.hfMenuId = (sessionStorage.getItem("MenuDetailMenuId"));
    $scope.hfSubMenuId = (sessionStorage.getItem("MenuDetailSubMenuId"));
    /*Save-Edit Button Click Event*/


    $scope.Ischk = {};
    $scope.files = [];

    //$scope.SetValidation = function (element1, element2)
    //{
    //    $(element1).addClass('ck-validate');
    //    $(element2).removeClass('ck-validate');
    //}

    $scope.$on("seletedFile", function (event, args)
    {
        $scope.$apply(function ()
        {
            $scope.files.push(args.file);
        });
    });
    $scope.GetRecommedSize = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 17;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.LayoutCode = $scope.hfLayoutId;
        collectionobj.LayoutPartId = $scope.hfLayoutPartId;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetBodyContent", collectionobj);
        getData.then(function (response)
        {
            $scope.RecommedSizeImageData = response.data;
        });

    };

    $scope.SaveRecord = function ()
    {
        if ($scope.hfTabId == 'undefined')
            $scope.hfTabId = null;
        if ($scope.hfMenuId == 'undefined')
            $scope.hfMenuId = null;
        if ($scope.hfSubMenuId == 'undefined')
            $scope.hfSubMenuId = null;

        var collectionobj = {};
        collectionobj.Code = $scope.Code;
        collectionobj.UnitId = $scope.hfUnitId;
        collectionobj.LayoutCode = $scope.hfLayoutId;
        collectionobj.LayoutPartId = $scope.hfLayoutPartId;
        collectionobj.LayoutPartAbbreviationName = $scope.hfLayoutPartAbbreviationName;
        collectionobj.TabId = $scope.hfTabId;
        collectionobj.MenuId = $scope.hfMenuId;
        collectionobj.SubMenuId = $scope.hfSubMenuId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.IsApproved = 1;
        collectionobj.BodyContent = CKEDITOR.instances.EnglishEditor.getData();
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.BodyContentHeadingText = $scope.HeadingText;  
        collectionobj.HeadingImageHeight = $scope.HeadingImageHeight;  
        collectionobj.ImageHeight = $scope.ImageHeight;  
        collectionobj.DisplayCode = displayCode;
        collectionobj.ImageWidth = $scope.ImgWidth; 
        collectionobj.ImageObjectFit = $scope.ImgObjectFits; 
        collectionobj.ImageBorder = $scope.ImgBorder;
        collectionobj.ImageBorderRadius = $scope.ImgBorderRadius;
        collectionobj.OrderBy = $scope.OrderBy;
        var sdfsdf = $("#fileInput").get(0).files.length;
        var dfas = $("#fileInput1").get(0).files.length;
        var HeadImgSrc = $('#imgfileInput').attr('src');
        var tarr = HeadImgSrc.split('/');
        var file43 = tarr[tarr.length - 1];

        var ImgSrc = $('#imgfileInput1').attr('src');
        var tarr1 = ImgSrc.split('/');
        var file12 = tarr1[tarr1.length - 1];

        if ((sdfsdf != 0))
        {
            collectionobj.fileInput = $("#fileInput").get(0).files[0].name;
        }
        else if (file43 !="noimage.png")
        {
            collectionobj.BodyContentHeadingImgPath = $scope.imgfileInput;
        }
        if ((dfas != 0))
        {
            collectionobj.fileInput1 = $("#fileInput1").get(0).files[0].name;
        }
        else if (file12 != "noimage.png")
        {
            collectionobj.ImgPath = $scope.imgfileInput1;
        }

        if ($scope.Save == "Save")
        {
            collectionobj.Action = 1;
        }
        else
        {
            collectionobj.Action = 2;
        }
        var getData = myService.postmethode('POST', "/Api/DynamicWebsiteApi/InsertUpdateDeleteBodyContent", collectionobj, $scope.files);
        getData.then(function (response)
        {
            if (showMsgBox(response.data))
            {
                $scope.ClearControl(1);
            }
        });

    };

    $scope.fnApproved = function (UnitId) {

        var collectionobj = {};
        collectionobj.Action = 6;
        if (UnitId == "" || UnitId == undefined)
            collectionobj.UnitId = $scope.UnitId;
        else
            collectionobj.UnitId = UnitId;
        debugger;
        var getData = myService.methode('POST', "/Masters/GetBodyContent", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.PendingBodyContentList = response.data;
        });
    };

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

            collectionobj.BodyContentIds = ids;
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.Remarks = $scope.Remarks;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.Action = 4;
            var getData = myService.methode('POST', "/Masters/InsertUpdateDeleteBodyContent", '{obj:' + JSON.stringify(collectionobj) + '}');
            getData.then(function (response) {

                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    }

    $scope.FinalizeRecord = function (BodyContentId) {

        var collectionobj = {};
        collectionobj.BodyContentId = BodyContentId;
        collectionobj.IsApproved = 4;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.Action = 5;

        var getData = myService.methode('POST', "/Masters/InsertUpdateDeleteBodyContent", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {

            if (showMsgBox(response.data, 'Finalize', "Finalized successfully.", 'success', 'btn-success')) {
                $scope.BodyContentId = "";
                $scope.ClearControl(1);
            }
        });
    }
    $scope.SuspendRecord = function (BodyContentId) {

        var collectionobj = {};
        collectionobj.BodyContentId = BodyContentId;
        collectionobj.IsApproved = 5;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.Action = 6;

        var getData = myService.methode('POST', "/Masters/InsertUpdateDeleteBodyContent", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            debugger;
            submitConfirmbox("do u want to Suspend this record!", function () {
                if (showMsgBox(response.data, 'Suspend', "Suspended successfully.", 'success', 'btn-success')) {
                    $scope.BodyContentId = "";
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

    $scope.BodyContentList = [];
    $scope.ResetControl = function (flag)
    {
        
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.hfId = "";
        $scope.imgfileInput = "/Content/noimage.png";
        $scope.imgfileInput1 = "/Content/noimage.png";
        $scope.HeadingText = "";
        $scope.OrderBy = "";
        //$('#imgfileInput1').attr("src","~/Content/noimage.png");
        //$('#imgfileInput').src("~/Content/noimage.png");

        if (typeof (CKEDITOR) !== 'undefined')
            CKEDITOR.instances['EnglishEditor'].setData("");

        $scope.EnglishEditor = "";
        $scope.BodyContentList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.$applyAsync();
    }

    $scope.BodyContentList = [];
    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.Search();
    };

    $scope.Search = function ()
    {
        $scope.showLoader();
        if ($scope.hfTabId == 'undefined')
            $scope.hfTabId = null;
        if ($scope.hfMenuId == 'undefined')
            $scope.hfMenuId = null;
        if ($scope.hfSubMenuId == 'undefined')
            $scope.hfSubMenuId = null;
        var collectionobj = {};
        collectionobj.Action = 11;
        collectionobj.UnitId = $scope.hfUnitId;
        collectionobj.TabId = $scope.hfTabId;
        collectionobj.MenuId = $scope.hfMenuId;
        collectionobj.SubMenuId = $scope.hfSubMenuId;
        collectionobj.LayoutPartId = $scope.hfLayoutPartId;
        collectionobj.LayoutPartAbbreviationName = $scope.hfLayoutPartAbbreviationName;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetBodyContent", collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "UnitType", "HeaderValue": "UnitType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "UnitName", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Tab Name", "HeaderValue": "TabName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Menu Name", "HeaderValue": "MenuName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },  

                    { "HeaderText": "Heading Image", "HeaderValue": "DupBodyContentHeadingImgPath", "Width": "100px", "ShowColumn": "No", "ImageColumn": "Yes" },
                    { "HeaderText": "Body Content Heading", "HeaderValue": "BodyContentHeading", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Image Path", "HeaderValue": "DupImgPath", "Width": "100px", "ShowColumn": "No", "ImageColumn": "Yes" },
                    { "HeaderText": "Body Content", "HeaderValue": "BodyContent", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Layout Part Abbreviation Name", "HeaderValue": "LayoutPartAbbreviationName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.BodyContentList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            //debugger
            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                
                var row = $('#example').DataTable().row(this).data();
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.BodyContentList = $filter('filter')($scope.BodyContentList, { 'Code': $scope.Code });
                CKEDITOR.instances.EnglishEditor.setData($scope.BodyContentList[0].BodyContent);
                $scope.HeadingText = $scope.BodyContentList[0].BodyContentHeading; 
                $scope.imgfileInput = $scope.BodyContentList[0].BodyContentHeadingImgPath; 
                $scope.imgfileInput1 = $scope.BodyContentList[0].ImgPath;


                $scope.HeadingImageHeight = $scope.BodyContentList[0].HeadingImageHeight; 
                $scope.ImageHeight = $scope.BodyContentList[0].ImageHeight; 
                $scope.ImgWidth = $scope.BodyContentList[0].ImageWidth; 
                $scope.ImgObjectFits = $scope.BodyContentList[0].ImageObjectFit; 
                $scope.ImgBorder = $scope.BodyContentList[0].ImageBorder; 
                $scope.ImgBorderRadius = $scope.BodyContentList[0].ImageBorderRadius;
                $scope.OrderBy = $scope.BodyContentList[0].OrderBy;

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
            $scope.files = [];
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.Action = "3";
            collectionobj.RelationshipId = relationshipId;
            collectionobj.LayoutPartAbbreviationName = $scope.hfLayoutPartAbbreviationName;
            var getData = myService.postmethode('POST', "/Api/DynamicWebsiteApi/InsertUpdateDeleteBodyContent", collectionobj, $scope.files);

            getData.then(function (response)
            {
                if (showMsgBox(response.data))
                {
                    $scope.ClearControl(1);
                }
            });
        });
    };

    //$scope.chkAll_change = function () {
    //    $.each($scope.PendingBodyContentList, function (index, val) {
    //        if (val.status === 'Finalize') {
    //            $scope.Ischk[val.BodyContentId] = false;
    //        }
    //        else {
    //            $scope.Ischk[val.BodyContentId] = $scope.chkAll;
    //        }
    //    });
    //}
    //$scope.chk_change = function () {
    //    var flag = false;
    //    $.each($scope.Ischk, function (BodyContentId, value) {
    //        if (value === true) {
    //            flag = true;
    //            return;
    //        }
    //    });
    //    $scope.chkAll = flag;
    //}

    $scope.OpenFileUpload = function () {
        $('#fileInput').click();
    }
    $scope.fuImageChange = function (input) {
        readURL(input);
    };
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.imgfileInput = e.target.result;
                $scope.$applyAsync();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $scope.OpenFileUpload1 = function ()
    {
        $('#fileInput1').click();
    }
    $scope.fuImageChange1 = function (input)
    {
        readURL1(input);
    };
    function readURL1(input)
    {
        if (input.files && input.files[0])
        {
            var reader = new FileReader();
            reader.onload = function (e)
            {
                $scope.imgfileInput1 = e.target.result;
                $scope.$applyAsync();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
}