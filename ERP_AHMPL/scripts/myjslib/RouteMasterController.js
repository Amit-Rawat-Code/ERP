app.RouteMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlRouteType');
    var response = [];
    $scope.RouteCovered = "0";
    $scope.RouteFare = "0";
    $scope.InitialFareValue = "0";
    $scope.listofstopages = [];

    $scope.GetStoppage = function () {
        var collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.SessionId = sessionId;
        collectionobj.FyId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleStoppageMaster', collectionobj);
        getData.then(function (response) {

            $scope.RStoppages = response.data;
        });
    }

    $scope.AddStopage = function () {

        if (isValidate()) {

            var VstopageCode = $scope.ddlRouteStoppages;
            if ($scope.Save === "Edit") {
                response = $scope.listofstopages;
            }
            var responselength = response.length;
            var recordexist = 0;
            if (responselength != 0) {
                $scope.listofstopages = response;
                var index = $scope.listofstopages.findIndex(record => record.StopId === VstopageCode);

                if (index == '-1') { recordexist = 0; } else { recordexist = 1; }
            }

            if (recordexist == 0) {

                var VstopageName = $filter('filter')($scope.RStoppages, { code: $scope.ddlRouteStoppages })[0].Stoppage;
                var VstopageDistance = $scope.DistanceFromSchool;
                var VstopageArrival = $scope.ArrivalTime;
                var VstopageFare = $scope.RoundTripAmount;
                var VUpDownstopageFare = $scope.Up_DownTripAmount;
                $scope.RouteCovered = parseFloat($scope.RouteCovered) + parseFloat($scope.Distance);
                $scope.RouteFare = parseFloat($scope.RouteFare) + parseFloat($scope.StopageFareAmount);

                var data = {
                    StoppageId: VstopageCode,
                    Stoppage: VstopageName,
                    Distance: VstopageDistance,
                    Arrival: VstopageArrival,
                    RoundTripAmount: VstopageFare,
                    UpDownTripAmount: VUpDownstopageFare,
                    //Action: '<input id="btnremove" type="button" value="Remove" class="button2" onclick="angular.element(document).scope().RemoveStopage(\'' + VstopageCode + '\')">'
                };

                $scope.listofstopages.push(data);
                $scope.ddlRouteStoppages = '';
                $scope.DistanceFromSchool = '';
                $scope.RoundTripAmount = '';
                $scope.Up_DownTripAmount = '';
                $scope.ArrivalTime = '';
            }
            else {
                if (showMsgBox('-1')) {

                }
            }
        }
    };
    //$scope.RemoveStopage = function (VstopageCode) {
    //   debugger
    //    if ($scope.Save == "Edit") { response = $scope.listofstopages; }
    //    var responselength = response;
    //    if (responselength != 0) {
    //        $scope.listofstopages = response;
    //        var index = $scope.listofstopages.findIndex(record => record.StopId === VstopageCode);
    //        if (index > -1) {
    //            var distance = $filter('filter')($scope.listofstopages, { StopId: VstopageCode })[0].Distance;
    //            var fare = $filter('filter')($scope.listofstopages, { StopId: VstopageCode })[0].RoundTrip;

    //            $scope.RouteCovered = parseFloat($scope.RouteCovered) - parseFloat(distance);
    //            $scope.RouteFare = parseFloat($scope.RouteFare) - parseFloat(fare);

    //            response.splice(index, 1);
    //            loadVirtualDataTablesUsingPreDefinedColumnOnPage(tblheader, response);
    //            $scope.$applyAsync();

    //        }
    //    }

    //};
    $scope.RemoveStopage = function (srno) {
        $scope.listofstopages = $filter('filter')($scope.listofstopages, { Srno: '!' + srno });
    };

    $scope.ClearRecord = function () {
        $scope.Distance = 0;
        $scope.StopageTime = 0;
        $scope.StopageFareAmount = 0;
        $scope.listofstopages = [];
        ddlRouteStoppages
        if (typeof ($scope.Transtopages) !== 'undefined')
            $scope.Transtopages.StoppageId = "";
        $scope.UpDownStopageFareAmount = 0;
        var responselength = response.length;
        if (responselength = 0) {

        }
    }



    $scope.SaveRecord = function () {
        debugger
        $('#ddlRouteStoppages').removeClass('validate')
        if (isValidate()) {
            //if (response.length > 0) {

            //$scope.listofstopages = response;
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;

            collectionobj.RouteName = $scope.RouteName;
            collectionobj.RouteDistance = $scope.RouteDistance;
            collectionobj.Route_stopages = JSON.stringify($scope.listofstopages);

            collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.FyId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
                var getData = myService.methode('POST', "../Api/TransportMasterApi/InsertUpdateDeleteVehicleRouteMaster", collectionobj);
                getData.then(function (response) {

                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                collectionobj.Action = 2;
                var getData = myService.methode('POST', "../Api/TransportMasterApi/InsertUpdateDeleteVehicleRouteMaster", collectionobj);
                getData.then(function (response) {

                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
        }

        //}
    };
    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        debugger;
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.Code = $scope.hfId;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.UpdatedBy = JSON.parse(userid);

        var getData = myService.methode('POST', "../Api/TransportMasterApi/InsertUpdateDeleteVehicleRouteMaster", collectionobj);
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
        $scope.SetFocus('#ddlRouteType');
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.RouteName = "";
        $scope.DepartureTime = "";
        $scope.ArrivalTime = '';
        $scope.RouteDistance = '';
        $scope.ddlRouteStoppages = '';
        $scope.DistanceFromSchool = '';
        $scope.RoundTripAmount = '';
        $scope.Up_DownTripAmount = '';
        $scope.RouteMasterList = [];
        $scope.listofstopages = [];
        $scope.ClearRecord();
        var table = $('#vitual').DataTable();
        table.clear().draw();

        if (flag == 0) {
            showMsgBox('4');
        };
    }


    /*Search Button Click Event*/
    $scope.RouteMasterList = [];

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    //$scope.SelectRouteType = function (routetypeid) {
    //    debugger;
    //    $scope.GetRouteTypes();
    //    return routetypeid;
    //}
    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;

        var getData = myService.methode('POST', "../Api/TransportMasterApi/GetVehicleRouteMaster", collectionobj);
        getData.then(function (response) {

            $scope.RouteMasterList = response.data;
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Value": "Code", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    //{ "HeaderText": "Route Type", "HeaderValue": "RouteType", "Value": "RouteTypeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Route Name", "HeaderValue": "RouteName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Route Covered", "HeaderValue": "RouteCovered", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Route Fare", "HeaderValue": "UpDowntripAmount", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
                ];

            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                debugger
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.RouteMasterList = $filter('filter')($scope.RouteMasterList, { 'Code': $scope.hfId });
                //$scope.RouteTypes = { RouteTypeId: $scope.SelectRouteType($(this).find('input[type="hidden"]#hdRouteType').val()) };

                $scope.RouteName = $scope.RouteMasterList[0].RouteName;
                $scope.RouteDistance = $scope.RouteMasterList[0].RouteCovered;
                $scope.IsActive = $scope.RouteMasterList[0].IsActive;
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                var collectionobj = {};
                collectionobj.Action = 6;
                collectionobj.SessionId = sessionId;
                collectionobj.RouteCode = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                debugger

                var getData = myService.methode('POST', "../Api/TransportMasterApi/GetVehicleStoppageMaster", collectionobj);
                getData.then(function (response) {
                    debugger;
                    $scope.listofstopages = response.data;
                    var tblheader =
                        [
                            { "HeaderText": "Id", "Value": "MapingId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Stoppage", "Value": "Stoppage", "HeaderValue": "Stoppage", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Distance From School (In Km.)", "Value": "Distance", "HeaderValue": "Distance", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Round Trip Amount", "Value": "RoundTripAmount", "HeaderValue": "RoundTripAmount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Up/Down Trip Amount", "Value": "UpDownTripAmount", "HeaderValue": "UpDownTripAmount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Arrival Time(In Min.)", "Value": "Arrival", "HeaderValue": "Arrival", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Action", "Value": "StopId", "HeaderValue": "Action", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                        ];

                    loadVirtualDataTablesUsingPreDefinedColumnOnPage(tblheader, response.data);

                    $scope.$apply();

                });
                ////$scope.SetFocus('#ddlRouteType', true);
                //$('#ddlStopages').removeClass('validate')
                //$('#txtdistance').removeClass('validate')
                //$('#txtstopagetime').removeClass('validate')
                //$('#txtstopagefareamount').removeClass('validate')
                //$('#txtupdownstopagefareamount').removeClass('validate')

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
                { "HeaderText": "Id", "HeaderValue": "Id", "Value": "RouteId", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                //{ "HeaderText": "Route Type", "HeaderValue": "RouteType", "Value": "RouteTypeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Route Name", "HeaderValue": "RouteName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Route Covered", "HeaderValue": "RouteCovered", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                //{ "HeaderText": "Route Fare", "HeaderValue": "RouteFare", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                //{ "HeaderText": "Departure Time", "HeaderValue": "DepartureTime", "Value": "VechileOwnerId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                //{ "HeaderText": "Arrival Time", "HeaderValue": "ArrivalTime", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];
        $scope.PrintMaster(tblheader, $scope.RouteMasterList, window.document.title);
    };

};