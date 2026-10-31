app.HOSOLedgerMappingController= function ($scope, $element, $filter, myService) {
    $scope.HOSOMapingData = [];

    $scope.GetHOLedger = function () {
        debugger;
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.RelationshipId = relationshipId;
        
        
        collectionobj.SiteCode = siteCode;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetHOSOLedger', collectionobj);
        getData.then(function (response) {
            $scope.HOLedgerList = response.data;
        });
    };
    $scope.GetSOLedger = function (SOSite, index) {
        debugger;
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.BranchCode = SOSite;
        
        collectionobj.SiteCode = siteCode;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetHOSOLedger', collectionobj);
        getData.then(function (response) {
            $scope.HOSOMapingData[index].SOLedgerList = response.data;
        });
    };


    $scope.AddHOSOMapingData = function () {
        $scope.HOSOMapingData.push({
            Srno: "",
            HOLedger: "",
            SOSite: "",
            SOLedger: "",
        });
        var $index = $scope.HOSOMapingData.length - 1;
    };

    $scope.RemoveHOSOMapingData = function (index) {
        $scope.HOSOMapingData.splice(index, 1)
    };

    $scope.resetRow = function (index) {
        $scope.HOSOMapingData[index].HOLedger = "";
        $scope.HOSOMapingData[index].SOSite = ""
        $scope.HOSOMapingData[index].SOLedger = "";
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            debugger;
           
            collectionobj.HOSOMapingData = JSON.stringify($scope.HOSOMapingData);
            collectionobj.IPAddress = myService.getip();
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            
            


            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
                collectionobj.CreatedBy = JSON.parse(userid);
                var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteHOSOLedgerMapping", collectionobj);
                getData.then(function (response) {
                    debugger;
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                collectionobj.Action = 2;
                collectionobj.TransID = $scope.hfId;
                collectionobj.UpdatedBy = JSON.parse(userid);
                var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteHOSOLedgerMapping", collectionobj);
                getData.then(function (response) {
                    debugger;
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }

        }
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
        debugger;
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.hfId = "";

        $scope.HOSOMapingData = [];
        $scope.HOSOMapingDataList = [];

        if (flag == 0) {
            showMsgBox('4');
        };

    }

    $scope.HOSOMapingDataList = [];

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
   
    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        
        
        collectionobj.SiteCode = siteCode;
        debugger;
        var getData = myService.methode('POST', "../Api/AccountMasterApi/GetHOSOLedger", collectionobj);
        getData.then(function (response) {

            var tblheader =
            [
                { "HeaderText": "Srno", "HeaderValue": "TransId", "Width": "50px", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "HO Ledger", "Value": "HOLedger", "HeaderValue": "HO_Ledger", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Site Name", "Value": "SOSite", "HeaderValue": "Branch_Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "SO Ledger", "Value": "SOLedger", "HeaderValue": "SO_Ledger", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

            $scope.HOSOMapingDataList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(FindHtml(row[10])).val();
                debugger;
                $scope.HOSOMapingDataList = $filter('filter')($scope.HOSOMapingDataList, { 'TransId': $scope.hfId });
                $scope.HOSOMapingData = response.data;
                for (var i = 0; i < $scope.HOSOMapingData.length; i++) {
                    $scope.GetSOLedger($scope.HOSOMapingData[i].SOSite, i);
                    $scope.HOSOMapingData[i].SOLedger = $scope.HOSOMapingData[i].SOLedger;
                }

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.hideLoader();


            });
        });
    };
}