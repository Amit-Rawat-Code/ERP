app.ImageController = function ($scope, $element, $filter, myService) {

    $scope.disableDelete = true;
    $scope.disablePrint = true;
    var userid = sessionStorage.getItem("userid");
    $scope.hfUnitId = (sessionStorage.getItem("MenuDetailUnitId"));
    $scope.hfLayoutId = (sessionStorage.getItem("MenuDetailLayoutId"));
    $scope.hfLayoutPartId = (sessionStorage.getItem("MenuDetailLayoutPartId"));
    $scope.hfTabId = (sessionStorage.getItem("MenuDetailTabId"));
    $scope.hfMenuId = (sessionStorage.getItem("MenuDetailMenuId"));
    $scope.hfSubMenuId = (sessionStorage.getItem("MenuDetailSubMenuId"));
    $scope.files = [];
    $scope.SetValidation = function (element1, element2) {
        $(element1).addClass('ck-validate');
        $(element2).removeClass('ck-validate');
    }

    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
    });

    $scope.SaveRecord = function ()
    {
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
        collectionobj.RelationshipId = relationshipId;
        collectionobj.IsApproved = 1;
        collectionobj.DisplayCode = displayCode;
        collectionobj.ImgAlign = $scope.ImgAlign;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;

        if ($scope.Save == "Save") {
            collectionobj.Action = 1;
        }
        else {
            collectionobj.Action = 2;
        }
        debugger
        var getData = myService.postmethode('POST', "/Api/DynamicWebsiteApi/InsertUpdateDeleteImageContent", collectionobj, $scope.files);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
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
    $scope.ResetControl = function (flag)
    {
        $scope.Save = "Save";
        $scope.UnitTypeCode = "";
        $scope.TabId = "";
        $scope.UnitId = "";
        $scope.URLType = "";
        $scope.MenuName = "";
        $scope.LayoutCode = "";
        $scope.hfId = "";
        collectionobj.ImgPath = "";
        collectionobj.ImgAlign = "";
        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.$applyAsync();
    }

    $scope.OpenFileUpload = function () {
        $('#fileInput').click();
    }
    $scope.fuImageChange = function (input) {
        debugger
        readURL(input);
    };
    function readURL(input)
    {
        if (input.files && input.files[0])
        {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.imgfileInput = e.target.result;
                $scope.$applyAsync();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
}