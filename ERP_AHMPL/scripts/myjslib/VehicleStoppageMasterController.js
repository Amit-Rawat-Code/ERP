app.VehicleStoppageMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtSearch');

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.Stoppage = $scope.Stoppage;
            collectionobj.Lattitude = $scope.Lattitude;
            collectionobj.Longitude = $scope.Longitude;
            collectionobj.Radius = $scope.Radius;
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
            var getData = myService.methode('POST', '../Api/TransportMasterApi/InsertUpdateDeleteVehicleStoppageMaster', collectionobj);
            getData.then(function (response) {

                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.VehicleStoppageList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
       
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleStoppageMaster', collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "5%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Stoppage", "HeaderValue": "Stoppage", "Width": "80%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Lattitude", "HeaderValue": "Lattitude", "Width": "80%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Longitude", "HeaderValue": "Longitude", "Width": "80%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Radius", "HeaderValue": "Radius", "Width": "80%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "15%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.VehicleStoppageList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                debugger
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.VehicleStoppageList = $filter('filter')($scope.VehicleStoppageList, { Code: $scope.hfId }, true);
                $scope.Stoppage = $scope.VehicleStoppageList[0].Stoppage;
                $scope.Longitude = $scope.VehicleStoppageList[0].Longitude;
                $scope.Lattitude = $scope.VehicleStoppageList[0].Lattitude;
                $scope.Radius = $scope.VehicleStoppageList[0].Radius;
                $scope.IsActive = $scope.VehicleStoppageList[0].IsActive.toString();
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
        debugger
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UpdatedBy = $scope.userid;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/InsertUpdateDeleteVehicleStoppageMaster', collectionobj);
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
        $scope.Stoppage = "";
        $scope.Lattitude = "";
        $scope.Longitude = "";
        $scope.Radius = "";
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
                { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "5%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Stoppage", "HeaderValue": "Stoppage", "Width": "80%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Longitude", "HeaderValue": "Longitude", "Width": "80%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Lattitude", "HeaderValue": "Lattitude", "Width": "80%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Radius", "HeaderValue": "Radius", "Width": "80%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "15%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.VehicleStoppageList, window.document.title);
    };

}