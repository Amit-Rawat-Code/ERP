app.VehicleTypeMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtSearch');
    $scope.SessionId = sessionId;
 
    $scope.ClearItems = function () {
        $scope.items = [];
    }

    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.VehicleType = $scope.VehicleType;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/TransportMasterApi/InsertUpdateDeleteVehicleTypeMaster', collectionobj);
            getData.then(function (response) {
                debugger
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.VehicleTypeList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleTypeMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Vehicle Type.", "HeaderValue": "VehicleType", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.VehicleTypeList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                debugger
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.VehicleTypeList = $filter('filter')($scope.VehicleTypeList, { Code: $scope.hfId }, true);
                $scope.VehicleType = $scope.VehicleTypeList[0].VehicleType;
                $scope.IsActive = $scope.VehicleTypeList[0].IsActive.toString();
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableAdd = false;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlCourse', true);
            });
        });
    };
   
    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UpdatedBy = $scope.userid;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/InsertUpdateDeleteVehicleTypeMaster', collectionobj);
        getData.then(function (response) {
            debugger
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
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };
    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.hfId = "";
        $scope.VehicleType = "";
        $scope.Searchdisabled = false;
        $scope.IsActive = "true";
        $scope.SetFocus('#txtSearch');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {

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
                { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Reg. No.", "HeaderValue": "RegNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Form Sale Type", "HeaderValue": "FormSaleType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.RegistrationFormSaleEntryOffline, window.document.title);
    };

}