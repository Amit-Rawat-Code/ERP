app.FareMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtFareAmount');
    $scope.SaveRecord = function () {

        if (isValidate()) {

           
            var collectionobj = {};
            collectionobj.FareCode = $scope.hfId;
            collectionobj.FareAmount = $scope.FareAmount;
            collectionobj.DistanceFrom = $scope.DistanceFrom;
            collectionobj.DistanceTo = $scope.DistanceTo;
            collectionobj.SessionId = sessionId;
            collectionobj.FyId = fyId;
            collectionobj.RelationshipId =relationshipId;
            collectionobj.CreatedBy = JSON.parse(userid);
            collectionobj.UpdatedBy = JSON.parse(userid);

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
                var getData = myService.methode('POST', "../Api/TransportMasterApi/InsertUpdateDeleteVehicleFareMaster", collectionobj);
                getData.then(function (response) {
                   
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                collectionobj.Action = 2;
                var getData = myService.methode('POST', "../Api/TransportMasterApi/InsertUpdateDeleteVehicleFareMaster", collectionobj);
                getData.then(function (response) {
                    debugger;
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }

        }
    };
    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        debugger;
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.FareCode = $scope.hfId;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.UpdatedBy = JSON.parse(userid);

        var getData = myService.methode('POST', "../Api/TransportMasterApi/InsertUpdateDeleteVehicleFareMaster", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    /*Reset Button Click Event*/
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
        $scope.SetFocus('#txtFareAmount');
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.FareMasterList = [];
        $scope.FareAmount = "";
        $scope.DistanceFrom = "";
        $scope.DistanceTo = "";
        if (flag == 0) {
            showMsgBox('4');
        };
    }


    /*Search Button Click Event*/
    $scope.FareMasterList = [];

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', "../Api/TransportMasterApi/GetVehicleFareMaster", collectionobj);
        getData.then(function (response) {
                
            var tblheader =
                [
                    {
                        "HeaderText": "Sr.No.", "Value": "FareCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno"
                    },
                    
                    { "HeaderText": "Distance From", "HeaderValue": "DistanceFrom", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Distance To", "HeaderValue": "DistanceTo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Fare", "HeaderValue": "FareAmount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
                ];
            $scope.FareMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.FareMasterList = $filter('filter')($scope.FareMasterList, { 'FareCode': $scope.hfId });
                $scope.DistanceFrom = row[1];
                $scope.DistanceTo = row[2];
                $scope.FareAmount = row[3];
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtFareAmount', true);
                $scope.hideLoader();


            });
        });
    };


    /*Refresh Search Table Record*/
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
                {
                    "HeaderText": "Sr.No.", "Value": "FareId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno"
                },
                { "HeaderText": "Fare", "HeaderValue": "FareAmount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "AppliedOn", "HeaderValue": "FareAppliedOn", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }

            ];
        $scope.PrintMaster(tblheader, $scope.FareMasterList, window.document.title);
    };

};