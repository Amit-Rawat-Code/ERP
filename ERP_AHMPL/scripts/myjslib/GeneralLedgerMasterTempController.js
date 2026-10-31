app.GeneralLedgerMasterTempController = function ($scope, $element, $filter, myService) {
    $scope.IsActive = "True";
    $scope.SetFocus('#txtLedgerName');

    $scope.TDSdisability = true;
       
    $scope.$watch('IsTDSActive', function () {
        debugger;
        if ($scope.IsTDSActive == 'Y')
        { $scope.TDSdisability = false; }
        else { $scope.TDSdisability = true; }

    });

    $scope.SaveRecord = function () {

        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};

            collectionobj.LedgerName = $scope.LedgerName;
            collectionobj.AliasName = $scope.AliasName;

            collectionobj.GroupCode = $scope.LedgerGroupModel;
            collectionobj.Nature = $scope.NatureModel;

            collectionobj.Address1 = $scope.Address1;
            collectionobj.Address2 = $scope.Address2;
            collectionobj.Address3 = $scope.Address3;
            collectionobj.CountryId = $scope.CountryCode;

            collectionobj.StateId = $scope.StateCode;
            collectionobj.CityId = $scope.CityCode;
            collectionobj.Pincode = $scope.Pincode;

            collectionobj.EmailId = $scope.EMailId;
            collectionobj.PhoneNo = $scope.PhoneNo;
            collectionobj.MobileNo = $scope.MobileNo;

            collectionobj.ChqeuePrintName = $scope.ChqeuePrintName;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.IsStopPayment = $scope.PIsActive;

            collectionobj.TDSYN = $scope.IsTDSActive;
            collectionobj.PANNo = $scope.PAN;
            collectionobj.TDSAC = $scope.TDSLedgerModel;
            collectionobj.DeducteeType = $scope.TDSDeducteeModel;
            collectionobj.TDSNature = $scope.TDSNatureModel;
            collectionobj.DeducteeStatus = $scope.DeducteeStatus;
            collectionobj.TDSPercentage = $scope.ConvertPerToDecimalPoint($scope.TDSPercentage);
            collectionobj.TDSSection = $scope.TDSSectionModel;

            collectionobj.ExciseNo = $scope.ExciseRegNo;
            collectionobj.Range = $scope.Range;
            collectionobj.Division = $scope.Division;
            collectionobj.Commisionrate = $scope.ConvertAmountToDecimalPoint($scope.Commisionrate);

            collectionobj.BankName = $scope.BankName;
            collectionobj.BankBranchName = $scope.BranchName;
            collectionobj.AccountNo = $scope.AccountNo;
            collectionobj.IFSCCode = $scope.IFSCCode;
            collectionobj.TinNo = $scope.GSTN;

            collectionobj.GblSubCode = $scope.GblhfId;

            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
                collectionobj.CreatedBy = JSON.parse(userid);
                var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteLedger_Temp", collectionobj);
                getData.then(function (response) {
                    debugger;
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                collectionobj.Action = 2;
                collectionobj.SubCode = $scope.hfId;
                collectionobj.UpdatedBy = JSON.parse(userid);
                var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteLedger_Temp", collectionobj);
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
        $scope.SetFocus('#txtLedgerName');
        $scope.LedgerName = "";
        $scope.AliasName = "";
        $scope.LedgerGroupModel = "";
        $scope.NatureModel = "";

        $scope.Address1 = "";
        $scope.Address2 = "";
        $scope.Address3 = "";

        $scope.GetCountry();

        $scope.Pincode = "";
        $scope.EMailId = "";
        $scope.PhoneNo = "";
        $scope.MobileNo = "";
        $scope.ChqeuePrintName = "";
        $scope.IsActive = "true";
        $scope.PIsActive = "False";
        $scope.IsTDSActive = "N";
        $scope.PAN = "";
        $scope.TDSLedgerModel = "";
        $scope.TDSDeducteeModel = "";
        $scope.TDSNatureModel = "";
        $scope.DeducteeStatus = "";
        $scope.TDSPercentage = "";
        $scope.TDSSectionModel = "";
        $scope.ExciseRegNo = "";
        $scope.Range = "";
        $scope.Division = "";
        $scope.Commisionrate = "";
        $scope.BankName = "";
        $scope.BranchName = "";
        $scope.AccountNo = "";
        $scope.IFSCCode = "";
        $scope.GSTN = "";
        $scope.DrCr = 'D'
        $scope.hfId = "";
        $scope.GblhfId = "";

        $('input[type=text],select').removeAttr("disabled");
        $('#txtPAN,#ddlTDSLedger,#ddlTDSDeductee,#ddlTDSNature,#txtTDSPercentage,#ddlTDSSection').attr("disabled", "disabled");

        if (flag == 0) {
            showMsgBox('4');
        };

    };

    $scope.SetLedgerGroupNature = function () {
        debugger;
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 6;
        $scope.collectionobj["SchoolCode"] = schoolCode;
        $scope.collectionobj["BranchCode"] = branchCode;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["GroupCode"] = $scope.LedgerGroupModel;

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedgerGroup', '{obj:' + JSON.stringify($scope.collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.NatureModel = response.data[0].Nature;
                $scope.DrCr = response.data[0].OpnType;
            }
            
        });
    };

    $scope.LedgerList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        $scope.FormTitle = "Sort By Column: General Ledger Master(Temp)"
        $scope.showLoader();

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.Nature = 'Customer,Transporter,Supplier,Bank,Bank Loan';

        debugger;
        var getData = myService.methode('POST', "../Api/AccountMasterApi/GetLedger_Temp", collectionobj);
        getData.then(function (response) {
       
            var tblheader =
              [
                  { "HeaderText": "Sr.No.", "Value": "SubCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                  { "HeaderText": "Ledger Name", "HeaderValue": "LedgerName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                  { "HeaderText": "Ledger Group Name", "HeaderValue": "LedgerGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                  { "HeaderText": "Nature", "HeaderValue": "Nature", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                  
                  { "HeaderText": "Alias", "HeaderValue": "AliasName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "Add1", "HeaderValue": "Add1", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "Add2", "HeaderValue": "Add2", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "Add3", "HeaderValue": "Add3", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "Country", "HeaderValue": "CountryName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "State", "HeaderValue": "StateName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "City", "HeaderValue": "CityName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "PinCode", "HeaderValue": "PinCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "PhoneNo", "HeaderValue": "PhoneNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "MobileNo", "HeaderValue": "MobileNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "EmailId", "HeaderValue": "EmailId", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  
                  { "HeaderText": "Chqeue Print Name", "HeaderValue": "ChqeuePrintName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "Stop Payment", "HeaderValue": "StopPayment", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn", "NumberType": $scope.Amt },

                  { "HeaderText": "TDSYN", "HeaderValue": "TDSYN", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" },
                  { "HeaderText": "PANNo", "HeaderValue": "PANNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "TDS Ledger Name", "HeaderValue": "TDSLedgerName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "TDS Deductee Type", "HeaderValue": "TDSDeducteeTypeName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "TDS Nature", "HeaderValue": "TDSCategoryCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "TDSPer", "HeaderValue": "TDSPer", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn", "NumberType": $scope.Per },
                  { "HeaderText": "TDSSectionName", "HeaderValue": "TDSSectionName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "ExciseNo", "HeaderValue": "ExciseNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "Range", "HeaderValue": "Range", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "Division", "HeaderValue": "Division", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },

                  { "HeaderText": "Commisionrate", "HeaderValue": "Commisionrate", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "NumberType": $scope.Per },
                  { "HeaderText": "Bank Name", "HeaderValue": "BankName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "Branch Name", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "AccountNo", "HeaderValue": "AccountNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "IFSC", "HeaderValue": "IfscCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "TDS Category", "HeaderValue": "TDSCategoryName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "GSTN", "HeaderValue": "GSTN", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" },
              ];

            $scope.LedgerList = response.data;
            loadDataTableForLargeAmountData(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                debugger;
                $scope.LedgerListSearch = $filter('filter')($scope.LedgerList, { 'SubCode': $scope.hfId });

                $scope.LedgerName = $scope.LedgerListSearch[0].LedgerName;
                $scope.LedgerGroupModel = $scope.LedgerListSearch[0].LedgerGroupCode;
                $scope.NatureModel = $scope.LedgerListSearch[0].Nature;
              
                $scope.AliasName = $scope.LedgerListSearch[0].AliasName;
                $scope.Address1 = $scope.LedgerListSearch[0].Add1;
                $scope.Address2 = $scope.LedgerListSearch[0].Add2;
                $scope.Address3 = $scope.LedgerListSearch[0].Add3;

                $scope.CountryCode = $scope.LedgerListSearch[0].CountryCode
                $scope.GetState($scope.CountryCode)
                $scope.StateCode = $scope.LedgerListSearch[0].StateCode
                $scope.GetCity($scope.StateCode);
                $scope.CityCode = $scope.LedgerListSearch[0].CityCode

                $scope.Pincode = $scope.LedgerListSearch[0].PinCode;
                $scope.PhoneNo = $scope.LedgerListSearch[0].PhoneNo;
                $scope.MobileNo = $scope.LedgerListSearch[0].MobileNo;
                $scope.EMailId = $scope.LedgerListSearch[0].EmailId;
               
                $scope.ChqeuePrintName = $scope.LedgerListSearch[0].ChqeuePrintName;
                $scope.PIsActive = $scope.LedgerListSearch[0].StopPayment == "Yes" ? "True" : "False";
                $scope.IsTDSActive = $scope.LedgerListSearch[0].TDSYN == "Yes" ? "Y" : "N";
                $scope.PAN = $scope.LedgerListSearch[0].PANNo;
                $scope.TDSLedgerModel = $scope.LedgerListSearch[0].TDSLedgerCode;
                $scope.TDSDeducteeModel = $scope.LedgerListSearch[0].TDSDeducteeTypeCode;
                $scope.BindTDSDeducteeStatus();
                $scope.TDSNatureModel = $scope.LedgerListSearch[0].TDSCategoryCode;
                $scope.TDSPercentage = $scope.LedgerListSearch[0].TDSPer;
                $scope.TDSSectionModel = $scope.LedgerListSearch[0].TDSSectionCode;
                $scope.ExciseRegNo = $scope.LedgerListSearch[0].ExciseNo;
                $scope.Range = $scope.LedgerListSearch[0].Range;
                $scope.Division = $scope.LedgerListSearch[0].Division;
                $scope.Commisionrate = $scope.ConvertPerToDecimalPoint($scope.LedgerListSearch[0].Commisionrate);
                $scope.BankName = $scope.LedgerListSearch[0].BankName;
                $scope.BranchName = $scope.LedgerListSearch[0].BranchName;
                $scope.AccountNo = $scope.LedgerListSearch[0].AccountNo;
                $scope.IFSCCode = $scope.LedgerListSearch[0].IfscCode;
                $scope.GSTN = $scope.LedgerListSearch[0].GSTN;
                $scope.IsActive = $scope.LedgerListSearch[0].IsActive == "Yes" ? "true" : "false";

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtLedgerName', true);
                $scope.hideLoader();


            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        debugger;
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.SubCode = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        collectionobj.FYId = fyId;

        var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteLedger_Temp", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
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
        $scope.LedgerList = [];
        $scope.started();
        return false;
    });
    $scope.GlobalLedgerList = [];
    $scope.btn_GlobalSearch = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started1();
    };
    $scope.started1 = function () {
        $scope.FormTitle = "Sort By Column: Global Ledger Master"

        $scope.showLoader();

        var collectionobj = {};
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;

        debugger;
        var getData = myService.methode('POST', "../Api/AccountMasterApi/Get_GlobalLedgerinTempLedgerMaster", collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "SubCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Ledger Code", "HeaderValue": "LedgerCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Ledger Name", "HeaderValue": "LedgerName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Ledger Group Name", "Value": "LedgerGroupCode", "HeaderValue": "LedgerGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Nature", "HeaderValue": "Nature", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                    { "HeaderText": "Alias", "HeaderValue": "AliasName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Add1", "HeaderValue": "Add1", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "Add2", "HeaderValue": "Add2", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "Add3", "HeaderValue": "Add3", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Country", "Value": "CountryCode", "HeaderValue": "CountryName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "State", "Value": "StateCode", "HeaderValue": "StateName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "City", "Value": "CityCode", "HeaderValue": "CityName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "PinCode", "HeaderValue": "PinCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "PhoneNo", "HeaderValue": "PhoneNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "MobileNo", "HeaderValue": "MobileNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "EmailId", "HeaderValue": "EmailId", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },

                    //{ "HeaderText": "Chqeue Print Name", "HeaderValue": "ChqeuePrintName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "Stop Payment", "HeaderValue": "StopPayment", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn", "NumberType": $scope.Amt },

                    //{ "HeaderText": "TDSYN", "HeaderValue": "TDSYN", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" },
                    //{ "HeaderText": "PANNo", "HeaderValue": "PANNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "TDS Ledger Name", "Value": "TDSLedgerCode", "HeaderValue": "TDSLedgerName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "TDS Deductee Type", "Value": "TDSDeducteeTypeCode", "HeaderValue": "TDSDeducteeTypeName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "TDS Nature", "Value": "TDSCategoryCode", "HeaderValue": "TDSCategoryCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "TDSPer", "HeaderValue": "TDSPer", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn", "NumberType": $scope.Per },
                    //{ "HeaderText": "TDSSectionName", "Value": "TDSSectionCode", "HeaderValue": "TDSSectionName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "ExciseNo", "HeaderValue": "ExciseNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "Range", "HeaderValue": "Range", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "Division", "HeaderValue": "Division", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },

                    //{ "HeaderText": "Commisionrate", "HeaderValue": "Commisionrate", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "NumberType": $scope.Per },
                    //{ "HeaderText": "Bank Name", "HeaderValue": "BankName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "Branch Name", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "AccountNo", "HeaderValue": "AccountNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "IFSC", "HeaderValue": "IfscCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "TDS Category", "Value": "TDSCategoryCode", "HeaderValue": "TDSCategoryName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "GSTN", "HeaderValue": "GSTN", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" },
                ];

            $scope.GlobalLedgerList = response.data;
            loadDataTableForLargeAmountData(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.GblhfId = $(this).find('input[type="hidden"]').val();

                $scope.GlobalLedgerListSearch = $filter('filter')($scope.GlobalLedgerList, { 'SubCode': $scope.GblhfId });

                $scope.LedgerCode = $scope.GlobalLedgerListSearch[0].LedgerCode;
                $scope.LedgerName = $scope.GlobalLedgerListSearch[0].LedgerName;
                $scope.LedgerGroupModel = $scope.GlobalLedgerListSearch[0].LedgerGroupCode;
                $scope.NatureModel = $scope.GlobalLedgerListSearch[0].Nature;

                $scope.AliasName = $scope.GlobalLedgerListSearch[0].AliasName;
                $scope.Address1 = $scope.GlobalLedgerListSearch[0].Add1;
                $scope.Address2 = $scope.GlobalLedgerListSearch[0].Add2;
                $scope.Address3 = $scope.GlobalLedgerListSearch[0].Add3;

                $scope.CountryCode = $scope.GlobalLedgerListSearch[0].CountryCode
                $scope.GetState($scope.CountryCode)
                $scope.StateCode = $scope.GlobalLedgerListSearch[0].StateCode
                $scope.GetCity($scope.StateCode);
                $scope.CityCode = $scope.GlobalLedgerListSearch[0].CityCode

                $scope.Pincode = $scope.GlobalLedgerListSearch[0].PinCode;
                $scope.PhoneNo = $scope.GlobalLedgerListSearch[0].PhoneNo;
                $scope.MobileNo = $scope.GlobalLedgerListSearch[0].MobileNo;
                $scope.EMailId = $scope.GlobalLedgerListSearch[0].EmailId;

                //$scope.OpeningBalance = $scope.ConvertAmountToDecimalPoint($scope.GlobalLedgerListSearch[0].OpeningBal);
                //$scope.DrCr = $scope.GlobalLedgerListSearch[0].DrCr == "D" ? "D" : "C"; 
                $scope.ChqeuePrintName = $scope.GlobalLedgerListSearch[0].ChqeuePrintName;
                $scope.PIsActive = $scope.GlobalLedgerListSearch[0].StopPayment == "Yes" ? "True" : "False";
                $scope.IsTDSActive = $scope.GlobalLedgerListSearch[0].TDSYN == "Yes" ? "Y" : "N";
                $scope.PAN = $scope.GlobalLedgerListSearch[0].PANNo;
                $scope.TDSLedgerModel = $scope.GlobalLedgerListSearch[0].TDSLedgerCode;
                $scope.TDSDeducteeModel = $scope.GlobalLedgerListSearch[0].TDSDeducteeTypeCode;
                $scope.BindTDSDeducteeStatus();
                $scope.TDSNatureModel = $scope.GlobalLedgerListSearch[0].TDSCategoryCode;
                $scope.TDSPercentage = $scope.GlobalLedgerListSearch[0].TDSPer;
                $scope.TDSSectionModel = $scope.GlobalLedgerListSearch[0].TDSSectionCode;
                $scope.ExciseRegNo = $scope.GlobalLedgerListSearch[0].ExciseNo;
                $scope.Range = $scope.GlobalLedgerListSearch[0].Range;
                $scope.Division = $scope.GlobalLedgerListSearch[0].Division;
                $scope.Commisionrate = $scope.ConvertPerToDecimalPoint($scope.GlobalLedgerListSearch[0].Commisionrate);
                $scope.BankName = $scope.GlobalLedgerListSearch[0].BankName;
                $scope.BranchName = $scope.GlobalLedgerListSearch[0].BranchName;
                $scope.AccountNo = $scope.GlobalLedgerListSearch[0].AccountNo;
                $scope.IFSCCode = $scope.GlobalLedgerListSearch[0].IfscCode;
                $scope.GSTN = $scope.GlobalLedgerListSearch[0].GSTN;
                $scope.IsActive = $scope.GlobalLedgerListSearch[0].IsActive == "Yes" ? "true" : "false";

                $('input[type=text],select').attr("disabled", "disabled");
                $('#ddlFonts').removeAttr("disabled");

                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtLedgerName', true);
                $scope.hideLoader();
            });
        });
    }
}