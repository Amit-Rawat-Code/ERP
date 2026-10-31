app.InventoryCommodityMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtHSNCode');

/*Save Button Click Event*/
    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.CommodityCode = $scope.HSNCode;
            collectionobj.HSNName = $scope.HSNName;
            collectionobj.GSTPercentage = $scope.GSTPercentage;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
           
            if ($scope.Save == "Save") {
                collectionobj.Action = '1';
                collectionobj.CreatedBy = userid;
            }
            else {
                collectionobj.Action = '2';
                collectionobj.Code = $scope.hfId;
                collectionobj.UpdatedBy = userid;
            }
            var getData = myService.methode('POST', "../Api/InventoryMasterApi/InsertUpdateDeleteCommodityMaster", collectionobj);
            getData.then(function (response) {
                debugger;
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
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

/*REset Button On Click Event*/
    $scope.ResetControl = function (flag) {
        
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.HSNCode = "";
        $scope.HSNName = "";
        $scope.GSTPercentage = "";
        $scope.SetFocus('#txtHSNCode');
        $scope.IsActive = "true";
        $scope.hfId = "";
        $scope.CommodityMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    }
    $scope.CommodityMasterList = [];

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
       var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetCommodityMaster", collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "HSN Code", "HeaderValue": "CommodityCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "HSN Name", "HeaderValue": "HSNName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "GST %", "HeaderValue": "GSTPercentage", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
           
            $scope.CommodityMaster = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.CommodityMaster = $filter('filter')($scope.CommodityMaster, { 'Code': $scope.hfId });
                $scope.HSNCode = $scope.CommodityMaster[0].CommodityCode;
                $scope.HSNName = $scope.CommodityMaster[0].HSNName;
                $scope.GSTPercentage = $scope.CommodityMaster[0].GSTPercentage;
                $scope.IsActive = $scope.CommodityMaster[0].IsActive.toString();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtHSNCode', true);
                $scope.hideLoader();


            });
        });
    };

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {

        debugger;
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.Code = $scope.hfId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/InsertUpdateDeleteUnitMaster", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
        var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
        var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
        var loadingAnim = panelToRefresh.find('.loading-progress');
        panelToRefresh.show();
        setTimeout(function () {
            loadingAnim.addClass('la-animate');
        }, 100);
        $scope.started();
        return false;
    });

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Sr", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "HSN Code", "HeaderValue": "CommodityCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "HSN Name", "HeaderValue": "HSNName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "GST %", "HeaderValue": "GSTPercentage", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.CommodityMaster, window.document.title);
    };
}