app.VehicleMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtSearch');
   
    $scope.SaveRecord = function () {
        if (isValidate()) {
            debugger
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.VehicleTypeCode = $scope.VehicleType;
            collectionobj.VehicleUniqueID = $scope.UniqueId;
            collectionobj.VehicleNumber = $scope.VehicleNumber;
            collectionobj.VehicleRegDate = moment(($scope.VehicleRegDate)).format('DD-MMM-YYYY');
            collectionobj.VehicleCategory = $scope.VehicleCategory;
            collectionobj.VehicleOwnerCode = $scope.VehicleOwnerCode;
            collectionobj.VehicleChasisNumber = $scope.VehicleChasisNumber;

            if ($scope.FitnessExpiryDate != undefined && $scope.FitnessExpiryDate!='')
                collectionobj.FitnessExpiryDate = moment($scope.FitnessExpiryDate).format('DD-MMM-YYYY');
            if ($scope.PermitExpiryDate != undefined && $scope.PermitExpiryDate != '')
                collectionobj.PermitExpiryDate = moment($scope.PermitExpiryDate).format('DD-MMM-YYYY');
            if ($scope.InsuranceExpiryDate != undefined && $scope.InsuranceExpiryDate != '')
                collectionobj.InsuranceExpiryDate = moment($scope.InsuranceExpiryDate).format('DD-MMM-YYYY');
            if ($scope.PollutionExpiryDate != undefined && $scope.PollutionExpiryDate != '')
                collectionobj.PollutionExpiryDate = moment($scope.PollutionExpiryDate).format('DD-MMM-YYYY');

            collectionobj.VehicleCapacity = $scope.VehicleCapacity;
            collectionobj.IsActive = $scope.IsActive;;
            collectionobj.SessionId = sessionId;
            collectionobj.FyId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/TransportMasterApi/InsertUpdateDeleteVehicleMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });

        }
        
    };

    $scope.VehicleTypeList = {};
    $scope.SelectVehicleType = function () {
        var collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.SessionId = sessionId;
        collectionobj.FyId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleTypeMaster', collectionobj);
        getData.then(function (response)
        {
          
            $scope.VehicleTypeList = response.data;
        });
    }

    $scope.SelectVehicleOwnerType = function (Type) {
 
        var collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.SessionId = sessionId;
        collectionobj.FyId = fyId;
        collectionobj.VehicleCategory = Type;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleOwnerMaster', collectionobj);
        getData.then(function (response) {
        
            $scope.VehicleOwnerTypeList = response.data;
        });
    }


   

    $scope.SelectOwnerDetails = function (Code) {
    
        $scope.ContactNumber = "";
        $scope.OwnerAddres = "";

        var obj = $filter('filter')($scope.VehicleOwnerTypeList, { 'Code':Code }, true);
        if (obj.length > 0) {
            $scope.ContactNumber = obj[0].Contact
            $scope.OwnerAddres = obj[0].Address
        }
    }

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
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleMaster', collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "10%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Vehicle Type", "HeaderValue": "VehicleType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Unique Id", "HeaderValue": "VehicleUniqueID", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Vehicle Number", "HeaderValue": "VehicleNumber", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Vehicle Registration date", "HeaderValue": "VehicleRegDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Vehicle Category", "HeaderValue": "VehicleCategory", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Owner Name", "HeaderValue": "VehicleOwnerName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Chesis Number", "HeaderValue": "VehicleChasisNumber", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Fitness Expired On", "HeaderValue": "FitnessExpiryDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Permit Expired On", "HeaderValue": "PermitExpiryDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Insurance Expired On", "HeaderValue": "InsuranceExpiryDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Pollution Expired On", "HeaderValue": "PollutionExpiryDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Capacity", "HeaderValue": "VehicleCapacity", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.VehicleMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                debugger
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.VehicleMasterList = $filter('filter')($scope.VehicleMasterList, { Code: $scope.hfId }, true);
                $scope.VehicleType = $scope.VehicleMasterList[0].VehicleTypeCode;
                $scope.UniqueId = $scope.VehicleMasterList[0].VehicleUniqueID;
                $scope.VehicleOwnerCode = $scope.VehicleMasterList[0].Code;
                $scope.VehicleCategory = $scope.VehicleMasterList[0].VehicleCategory;
                $scope.SelectVehicleOwnerType($scope.VehicleCategory);
                $scope.VehicleNumber = $scope.VehicleMasterList[0].VehicleNumber;

                if ($scope.VehicleMasterList[0].InsuranceExpiryDate != undefined && $scope.VehicleMasterList[0].InsuranceExpiryDate != '')
                    $scope.InsuranceExpiryDate = new Date($scope.VehicleMasterList[0].InsuranceExpiryDate);
                if ($scope.VehicleMasterList[0].FitnessExpiryDate != undefined && $scope.VehicleMasterList[0].FitnessExpiryDate != '')
                    $scope.FitnessExpiryDate = new Date($scope.VehicleMasterList[0].FitnessExpiryDate);
                if ($scope.VehicleMasterList[0].PermitExpiryDate != undefined && $scope.VehicleMasterList[0].PermitExpiryDate != '')
                    $scope.PermitExpiryDate = new Date($scope.VehicleMasterList[0].PermitExpiryDate);
                if ($scope.VehicleMasterList[0].PollutionExpiryDate != undefined && $scope.VehicleMasterList[0].PollutionExpiryDate != '')
                    $scope.PollutionExpiryDate = new Date($scope.VehicleMasterList[0].PollutionExpiryDate);
                
                $scope.VehicleRegDate = new Date($scope.VehicleMasterList[0].VehicleRegDate);
                $scope.VehicleCapacity = $scope.VehicleMasterList[0].VehicleCapacity;
                $scope.VehicleChasisNumber = $scope.VehicleMasterList[0].VehicleChasisNumber;

                $scope.Contact = $scope.VehicleMasterList[0].Contact;
                $scope.Address = $scope.VehicleMasterList[0].Address;
                $scope.IsActive = $scope.VehicleMasterList[0].IsActive.toString();
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
        collectionobj.VehicleOwnerCode = $scope.VehicleOwnerCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UpdatedBy = $scope.userid;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/InsertUpdateDeleteVehicleOwnerMaster', collectionobj);
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
        $scope.VehicleType = '';
        $scope.UniqueId = '';
        $scope.VehicleNumber = '';
        $scope.InsuranceExpiryDate = '';
        $scope.FitnessExpiryDate = '';
        $scope.PermitExpiryDate = '';
        $scope.InsuranceExpiryDate = '';
        $scope.PollutionExpiryDate = '';
        $scope.VehicleRegDate = '';
        $scope.VehicleCategory = '';
        $scope.VehicleOwnerCode = '';
        $scope.VehicleCapacity = '';
        $scope.VehicleChasisNumber = '';
        $scope.ContactNumber = "";
        $scope.OwnerAddres = "";
        $scope.Searchdisabled = false;
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
                { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "10%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Vehicle Type", "HeaderValue": "VehicleType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Unique Id", "HeaderValue": "VehicleUniqueID", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Vehicle Number", "HeaderValue": "VehicleNumber", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Vehicle Registration date", "HeaderValue": "VehicleRegDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Vehicle Category", "HeaderValue": "VehicleCategory", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Owner Name", "HeaderValue": "VehicleOwnerName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Chesis Number", "HeaderValue": "VehicleChasisNumber", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Fitness Expired On", "HeaderValue": "FitnessExpiryDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Permit Expired On", "HeaderValue": "PermitExpiryDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Insurance Expired On", "HeaderValue": "InsuranceExpiryDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Pollution Expired On", "HeaderValue": "PollutionExpiryDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Capacity", "HeaderValue": "VehicleCapacity", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.VehicleMasterList, window.document.title);
    };

}