app.VehicleRouteMappingMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlVehicles');
    $scope.selectedRouteCount = 0;

    $scope.AllRoute = function () {
        angular.forEach($scope.RouteName, function (BI) {
            BI.IsActive = $scope.chkAllModule;
        });
    }

    $scope.onChange = function (flag, obj) {
        obj.Chk = flag;
        obj.IsMon = flag;
        obj.IsTue = flag;
        obj.IsWed = flag;
        obj.IsThu = flag;
        obj.IsFri = flag;
        obj.IsSat = flag;
        if (flag == false) {
            $scope.chkSelectAll = flag;
        }
    }

    $scope.CheckAll = function (flag) {
        $.each($scope.StoppageNames, function (index, obj) {
            $scope.onChange(flag, obj);
        });
    }

    $scope.CheckUnCheckAll = function (val, flag) {
        $.each($scope.StoppageNames, function (index, obj) {
            obj[val] = flag;
        });
        $scope.chkChange();
    }

    $scope.chkChange = function () {
        if ($scope.StoppageNames.length > 0) {
            $scope.chkSelectAll = true;
            $scope.chkMon = true;
            $scope.chkTue = true;
            $scope.chkWed = true;
            $scope.chkThu = true;
            $scope.chkFri = true;
            $scope.chkSat = true;
        }
        $.each($scope.StoppageNames, function (index, obj) {
            if (!obj.Chk)
                $scope.chkSelectAll = false;
            
            if (!obj.IsMon)
                $scope.chkMon = false;
            if (!obj.IsTue)
                $scope.chkTue = false;
            if (!obj.IsWed)
                $scope.chkWed = false;
            if (!obj.IsThu)
                $scope.chkThu = false;
            if (!obj.IsFri)
                $scope.chkFri = false;
            if (!obj.IsSat)
                $scope.chkSat = false;

            if (obj.IsMon || obj.IsTue || obj.IsWed || obj.IsThu || obj.IsFri || obj.IsSat) {
                obj.Chk = true;
            }
        });
    };
    $scope.SaveRecord = function () {
        if (isValidate()) {
          
            var collectionobj = {};
            collectionobj.TransId = $scope.hfId;
            collectionobj.RouteCode = $filter('filter')($scope.RouteName, {chk:true})[0].RouteCode;
            collectionobj.VehicleNumber = $scope.ddlVehicleNumber;
            collectionobj.DriverCode = $scope.DrvrName;
            collectionobj.Contact = $scope.DriverContact;
            collectionobj.StoppageNames = JSON.stringify($filter('filter')($scope.StoppageNames, { Chk: true }));
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = JSON.parse(userid);
            collectionobj.UpdatedBy = JSON.parse(userid);

          
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
                var getData = myService.methode('POST', "../Api/TransportTransactionApi/InsertUpdateDeleteVehicleRouteMapping", collectionobj);
                getData.then(function (response) {
                    
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                collectionobj.Action = 2;
                var getData = myService.methode('POST', "../Api/TransportTransactionApi/InsertUpdateDeleteVehicleRouteMapping", collectionobj);
                getData.then(function (response) {
                   
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

       
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.TransId = $scope.hfId;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.UpdatedBy = JSON.parse(userid);

        var getData = myService.methode('POST', "../Api/TransportTransactionApi/InsertUpdateDeleteVehicleRouteMapping", collectionobj);
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
        $scope.SetFocus('#ddlVehicles');
        $scope.IsActive = "";
        $scope.ddlRouteName = '';
        $scope.ddlVehicleNumber = '';
        $scope.DriverContact = '';
        $scope.DrvrName = '';
        $scope.hfId = "";
        $scope.RouteId = "";
        $scope.VehicleId = "";
        $scope.StoppageNames = '';
        $scope.SelectRouteName();
        $scope.chkAllRoute = false;
        $scope.RouteVehicleMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    }


    /*Search Button Click Event*/
    $scope.RouteVehicleMasterList = [];

    $scope.SelectVehicleNumber = function () {
        
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;

        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleMaster', collectionobj);
        getData.then(function (response) {
           
            $scope.VehicleNumber = response.data;

        });
     }

    $scope.SelectDriverName = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;

        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetDriverDetailMaster', collectionobj);
        getData.then(function (response)
        {
            $scope.DriversName = response.data;
        });
    }

    $scope.SelectDriversContact = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.DriverCode = $scope.DrvrName;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;

        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetDriverDetailMaster', collectionobj);
        getData.then(function (response) {
            
            $scope.DriversContact = response.data;

            if ($scope.DriversContact.length > 0)
            {
                $scope.DriverContact = $scope.DriversContact[0].DriverCode.toString();
               
            }

    });
    }

    $scope.SelectRouteName = function () {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleRouteMaster', collectionobj);
        getData.then(function (response) {
          
            $scope.RouteName = response.data;
        });

    }
    $scope.ddlRouteName_Change = function (ddl_option_no) {
        angular.forEach($scope.RouteName, function (route, index) {
            if (index != ddl_option_no) {
                route.chk = false;
            }
        })
        $scope.GetStoppageName();
    }
    $scope.GetStoppageName = function ()
    {
       
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.RouteCode = JSON.stringify($filter('filter')($scope.RouteName, { chk: true }));
        var getData = myService.methode('POST', '../Api/TransportTransactionApi/GetVehicleRouteMapping', collectionobj);
        getData.then(function (response) {
           
            $scope.StoppageNames = response.data;
        });
    }

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
 
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId=relationshipId;
        var getData = myService.methode('POST', "../Api/TransportTransactionApi/GetVehicleRouteMapping", collectionobj);
        getData.then(function (response) {       
            var tblheader =   
                [
                    { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Value": "TransId", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Vehicle", "HeaderValue": "VehicleNumber", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Route", "HeaderValue": "RouteName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Driver Name", "HeaderValue": "DriverName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Driver Contact", "HeaderValue": "Contact", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            $scope.RouteVehicleMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function ()
            {
                $scope.showLoader();  
                $scope.SelectDriverName();
                
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                
                $scope.RouteVehicleMasterList = $filter('filter')($scope.RouteVehicleMasterList, { TransId: $scope.hfId }, true);
                $scope.ddlRouteName = $scope.RouteVehicleMasterList[0].RouteCode;
                angular.forEach($scope.RouteName, function (route) {
                    route.chk = false;
                })
                angular.forEach($scope.RouteName, function (route) {
                    if (route.RouteCode == $scope.ddlRouteName) {
                        route.chk = true;
                    }
                })
                
                $scope.ddlVehicleNumber = $scope.RouteVehicleMasterList[0].Code;
                $scope.DrvrName = $scope.RouteVehicleMasterList[0].DriverCode;

                $scope.DriverContact = $scope.RouteVehicleMasterList[0].DriverCode.toString();
                $scope.SelectDriversContact();
                $scope.GetStoppageName($scope.RouteName);

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlVehicles', true);
                $scope.hideLoader();


            });
        });
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
                { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Value": "VehicleRouteMappingId", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Route", "HeaderValue": "RouteName", "Value": "RouteId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Vehicle", "HeaderValue": "VEHINUMBER", "Value": "VehicleId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Trip", "HeaderValue": "TripMode", "Value": "RouteDirectionId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
          ];
        $scope.PrintMaster(tblheader, $scope.RouteVehicleMasterList, window.document.title);
    };

}