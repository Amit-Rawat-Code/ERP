app.ddlBindings = function ($scope, $element, $filter, myService) {
    // Global
    //$scope.BindCountry = function () {
    //    
    //    $scope.collectionobj = {};
    //    $scope.collectionobj["Action"] = 4;
    //    $scope.collectionobj["RelationshipId"] = relationshipId;

    //    $scope.collectionobj["FYId"] = fyId;
    //    var getData = myService.methode('POST', '../Administrator/CountryMasterList', $scope.collectionobj);
    //    getData.then(function (response) {
    //      if(response.data.length>0)
    //        { $scope.CountriesList = response.data;}
    //      else 
    //       {$scope.CountriesList = "";} 
    //    });
    //};

    //$scope.BindState = function () {
    //    
    //    $scope.collectionobj = {};
    //    $scope.collectionobj["Action"] = 4;
    //    if (typeof ($scope.CountryModel) !== 'undefined')
    //    { $scope.collectionobj["CountryId"] = $scope.CountryModel; }
    //    else
    //    { $scope.collectionobj["CountryId"] = '101' }
        
    //    $scope.collectionobj["RelationshipId"] = relationshipId;

    //    $scope.collectionobj["FYId"] = fyId;

    //    var getData = myService.methode('POST', '../Administrator/StateMasterList', $scope.collectionobj);
    //    getData.then(function (response) {
    //      if(response.data.length>0)
    //        { $scope.StatesList = response.data;}
    //      else 
    //       {$scope.StatesList = "";}
            
    //    });
    //};

    //$scope.BindCity = function () {
    //    
    //    $scope.collectionobj = {};
    //    $scope.collectionobj["Action"] = 4;
    //    $scope.collectionobj["StateId"] = $scope.StateModel;
    //    $scope.collectionobj["RelationshipId"] = relationshipId;


    //    $scope.collectionobj["FYId"] = fyId;

    //    var getData = myService.methode('POST', '../Administrator/CityMasterList', $scope.collectionobj);
    //    getData.then(function (response) {
    //    if(response.data.length>0)
    //        { $scope.CitiesList = response.data; $scope.DCitiesList = response.data;}
    //      else 
    //       {$scope.CitiesList  = "";$scope.DCitiesList  = "";}
            
    //    });
    //};


    // Company Master
    $scope.BindFirmStatus = function () {

        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Company/GetFirmMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.FirmStatusList = response.data;
        });
    };

    $scope.BindNatureOfBusiness = function () {

        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Company/GetNatureBusinessMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.NatureOfBusinessList = response.data;
        });
    };

    $scope.BindSubSector = function () {

        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Company/GetSubSectorMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.SubSectorList = response.data;
        });
    };

    $scope.BindCompany = function () {

        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["CreatedBy"] = JSON.parse(userid);

        var getData = myService.methode('POST', '../Company/GetCompanyMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.CompanyList = response.data;
        });
    };


    // Account Master
    $scope.BindMainGroup = function () {
        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetMainGroup', $scope.collectionobj);
        getData.then(function (response) {
            $scope.MainGroupList = response.data;
        });
    };

    $scope.BindNature = function () {
        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 12;

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetNature', $scope.collectionobj);
        getData.then(function (response) {
            $scope.NatureList = response.data;
        });
    };

    $scope.BindNatureRelationshipwise = function () {
        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 16;

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetNature', $scope.collectionobj);
        getData.then(function (response) {
            $scope.NatureList = response.data;
        });
    };

    $scope.BindLedgerGroup = function () {
        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedgerGroup', $scope.collectionobj);
        getData.then(function (response) {
            $scope.LedgerGroupList = response.data;
        });
    };

    $scope.LedgerCodePicker = function () {

        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 0;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;


        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedgerCode', $scope.collectionobj);
        getData.then(function (response) {
            
            $scope.LedgerCodeList = response.data;
            $scope.LedgerCode = response.data["0"].LCount;
        });
    };

    $scope.BindTDSLedger = function () {

        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 9;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["Nature"] = "T.D.S.";

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetTDSLedgers', $scope.collectionobj);
        getData.then(function (response) {
            
            $scope.TDSLedgerList = response.data;
        });
    };

    $scope.BindTDSNature = function () {

        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 10;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;



        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetTDSNature', $scope.collectionobj);
        getData.then(function (response) {
            
            $scope.TDSNatureList = response.data;
        });
    };

    $scope.BindTDSSection = function () {

        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 5;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;


        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetTDSSection', $scope.collectionobj);

        getData.then(function (response) {
            
            $scope.TDSSectionList = response.data;
        });
    };

    $scope.BindTDSDeductee = function () {

        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 5;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;



        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetTDSDeductee', $scope.collectionobj);
        getData.then(function (response) {
            
            $scope.TDSDeducteeList = response.data;
        });
    };

    $scope.BindTDSDeducteeStatus = function () {
        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 5;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["Nature"] = $scope.TDSDeducteeModel;

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetTDSDeductee', $scope.collectionobj);
        getData.then(function (response) {
            
            $scope.DeducteeStatusList = $filter('filter')(response.data, { 'Code': $scope.TDSDeducteeModel });
            $scope.DeducteeStatus = $scope.DeducteeStatusList[0].DedStatus;
        });
    };

    $scope.BindTransporters = function () {

        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 9;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["Nature"] = "Transporter";

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetTDSLedgers', $scope.collectionobj);
        getData.then(function (response) {
            
            $scope.TransportersList = response.data;
        });
    };

    $scope.BindTDSPercentage = function () {
        $scope.TDSNatureList1 = $filter('filter')($scope.TDSNatureList, { 'Code': $scope.TDSNatureModel });
        if ($scope.DeducteeStatus == 'Company')
        { $scope.TDSPercentage = $scope.TDSNatureList1[0].CompanyPer; }
        else if ($scope.DeducteeStatus == 'Non-Company')
        { $scope.TDSPercentage = $scope.TDSNatureList1[0].IndPer; }
        else
        { $scope.TDSPercentage = 0; }
            
    };

    $scope.BindSecurityLedger = function () {

       
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 13;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;


        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetTDSLedgers', $scope.collectionobj);
        getData.then(function (response) {
            
            $scope.SecurityLedgerList = response.data;
        });
    };

    $scope.BindCashLedger = function () {
        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 9;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["Nature"] = "Cash";
        
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
           
            $scope.CashACList = response.data;
            $scope.CashACModel = $filter('filter')($scope.CashACList, { 'Nature': 'Cash' })[0].SubCode;
            $scope.BindRuningBalance($scope.CashACModel);
            
        });
    };

    $scope.BindBankLedger = function () {
 
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 9;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["Nature"] = "Bank,Bank Loan";

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
          
            $scope.BankACList = response.data;
        });
    };

    $scope.BindCashBankLedger = function () {
     
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 9;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["Nature"] = "Cash,Bank,Bank Loan";

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
         
            $scope.CashBankACList = response.data;

        });
    };

    $scope.TBindCashBankLedger = function () {
        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 9;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["Nature"] = "Cash,Bank,Bank Loan";

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
           
            $scope.TCashBankACList = response.data;
        });
    };

    $scope.BindGeneralLedgers = function () {
   
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 9;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;
        $scope.collectionobj["Nature"] = '';
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
          
            $scope.GeneralLedgersList = response.data;
        });
    };

    $scope.BindJVGeneralLedgers = function () {
       
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 9;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;
        //$scope.collectionobj["Nature"] = 'Cash';
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
        
            $scope.JVGeneralLedgersList = response.data;
        });
    };

    $scope.BindVouchers = function () {
        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 5;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["SessionId"] = sessionId;

        var getData = myService.methode('POST', '../Api/AccountMasterApi/VoucherMasterList', $scope.collectionobj);
        getData.then(function (response) {
            $scope.VouchersList = response.data;
        });
    };

    $scope.VConfirm = '';

    $scope.CheckVoucherConfirm = function () {
       
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 8;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["SessionId"] = sessionId;
        $scope.collectionobj["VoucherType"] = $scope.VoucherModel;

        var getData = myService.methode('POST', '../Api/AccountMasterApi/VoucherMasterList', $scope.collectionobj);
        getData.then(function (response) {
            $scope.VConfirm = response.data[0].VoucherConfirm;
            $scope.BindVoucherKeys($scope.VConfirm);
        });
    };

    $scope.BindVoucherKeys = function (VConfirm)
    {
        $scope.collectionobj = {};
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["VoucherType"] = $scope.VoucherModel;
        if (VConfirm == true) { $scope.collectionobj["VoucherConfirm"] = 1; }
        else if (VConfirm== false) { $scope.collectionobj["VoucherConfirm"] = 0; }
        else { $scope.collectionobj["VoucherConfirm"] = VConfirm; }
        
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetVoucherKeys', $scope.collectionobj);
        getData.then(function (response) {
            $scope.VoucherKeys = response.data;
           
            if ($scope.VoucherKeys.length > 0)
            {
                if ($scope.VConfirm == true)
                {
                    if ($scope.PVNo === 'undefined') return
                    $scope.PVNo = $scope.VoucherKeys[0].PVNo;

                    if ($scope.CVNo === 'undefined') return
                    $scope.CVNo = $scope.VoucherKeys[0].CVNo;

                    if ((sessionStorage.getItem("ExcelSetteledDate") != '') && (sessionStorage.getItem("ExcelSetteledDate") != 'undefined') && (sessionStorage.getItem("ExcelSetteledDate") !=null))
                    {
                        $scope.PVDate = new Date(sessionStorage.getItem("ExcelSetteledDate"));
                        $scope.CVDate = new Date(sessionStorage.getItem("ExcelSetteledDate"));
                    }
                    else
                    {
                        if ($scope.PVDate === 'undefined') return
                        $scope.PVDate = new Date(moment($scope.VoucherKeys[0].PVDate, 'YYYY-MM-DD'));

                        if ($scope.CVDate === 'undefined') return
                        $scope.CVDate = new Date(moment($scope.VoucherKeys[0].CVDate, 'YYYY-MM-DD'));
                    }
                }
                else {
                    if ($scope.PVNo === 'undefined') return
                    $scope.PVNo = $scope.VoucherKeys[0].PVNo;

                    if ($scope.PVDate === 'undefined') return
                    $scope.PVDate = new Date(moment($scope.VoucherKeys[0].PVDate, 'YYYY-MM-DD'));
                }
            }
        });
    };

    $scope.BindTransModes = function () {
       
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 0;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["VoucherType"] = $scope.VoucherModel;
        var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetLedgerVoucher', $scope.collectionobj);
        getData.then(function (response) {
            $scope.TransModeList = response.data;
         
        });
    };

    $scope.BindRuningBalance = function (ledgercode,index) {
        
        $scope.collectionobj = {};
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["LedgerCode"] = $scope.GetDesiredValues(ledgercode, 0);
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetRuningBalance', $scope.collectionobj);
        getData.then(function (response) {
            $scope.RuningBalance = response.data;
            if (response.data.length>0)
                if (typeof (index) === 'undefined') {
                    $scope.CashRuningBalance = $scope.RuningBalance[0].RuningBalance;
                    $scope.ClearedAmount = $scope.RuningBalance[0].ClearedAmount;
                    $scope.InProcessAmount = $scope.RuningBalance[0].InProcessAmount;}
            else if (index== '-1') { $scope.VoucherDataobj.RuningBalance = $scope.RuningBalance[0].RuningBalance; }
            else { $scope.VoucherData[index].RuningBalance = $scope.RuningBalance[0].RuningBalance; }
        });
    };
    
    $scope.GetDesiredValues = function (model, index) {
        var result = "";
        if (model.match("|")) {
            $scope.MergerdCode = model.split('|');
            result = $scope.MergerdCode[index];
        } else {
            result = model;
        }
        return result;
    }

    $scope.BindVoucherNarrations = function () {
       
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 6;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["NarrationId"] = $scope.VoucherModel;

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetVoucherNarrations', $scope.collectionobj);
        getData.then(function (response) {
            $scope.VoucherNarrationList = response.data;

        });
    };
    $scope.SetVoucherNarration = function ()
    {
        $scope.VNarration = $scope.VoucherNarrationModel;
        $scope.VoucherNarrationModel = "";
    }
    $scope.BindVNarrAllowed = function (NarrationId) {
        
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 5;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["SessionId"] = sessionId;
        $scope.collectionobj["NarrationId"] = NarrationId;

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetVoucherNarrations', $scope.collectionobj);
        getData.then(function (response) {
            $scope.VNarrList = response.data;
        });
    };

    // Inventory
    $scope.BindBaseUnits = function (ItemCode) {

        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 27;
        $scope.collectionobj["RelationshipId"] = relationshipId;
        $scope.collectionobj["SessionId"] = sessionId;
        //$scope.collectionobj["CompCode"] = compCode;
        //$scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Api/InventoryMasterApi/GetItemMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.BaseUnitLists = response.data.Table;
        });
    };

    $scope.BindItemGroup = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
        $scope.collectionobj["SessionId"] = sessionId;
        //$scope.collectionobj["CompCode"] = compCode;
        //$scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Api/InventoryMasterApi/GetItemGroupMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.ItemGroupList = response.data;
        });
    };

    $scope.StoreList = [];

    $scope.BindStore = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 //$scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["SessionId"] = sessionId;
        var getData = myService.methode('POST', '../Inventory/GetStoreMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.StoreList = response.data;
        });
    };

    $scope.BindRack = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetRackMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.RackList = response.data;
        });
    };

    $scope.BindExpenses = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 9;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetExpenseTaxesHeadMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.ExpensesList = response.data;

        });
    };

    $scope.BindExpense = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 10;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetExpenseTaxesHeadMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.ExpenseList = response.data;

        });
    };

    $scope.BindExpenseCode = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 8;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetExpenseTaxesHeadMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.ExpenseCodeList = response.data;
        });
    };

    $scope.BindSubCode = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 6;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetExpenseTaxesHeadMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.SubCodeList = response.data;
        });
    };

    $scope.BindUnit = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetUnitMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.UnitCodeList = response.data;
        });
    };

    $scope.BindVatCommodity = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetCommodityMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.VatCommodityList = response.data;
        });
    };

    $scope.BindItemCategory = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetItemCategoryMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.ItemCategoryList = response.data;
        });
    };

    $scope.BindVatReturnType = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 3;
        $scope.collectionobj["Name"] = $scope.Name;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;

        var getData = myService.methode('POST', '../Inventory/GetVatReturnType', $scope.collectionobj);
        getData.then(function (response) {

            $scope.VatReturnTypeList = response.data;
        });
    };

    $scope.BindSupplier = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 14;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["SessionId"] = sessionId;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
            $scope.SupplierList = response.data;
        });
    };

    $scope.BindSCCSupplier = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 19;
        $scope.collectionobj["RelationshipId"] = relationshipId;
        $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
            $scope.SupplierList = response.data;
        });
    };

    $scope.getSuplierDetail = function (SupplierCode) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 19;
        $scope.collectionobj["LedgerCode"] = SupplierCode;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.Address1 = response.data[0].Address;
                $scope.CityName = response.data[0].CityName;

                $scope.GSTN = response.data[0].GSTN;
                $scope.PhoneNo = response.data[0].PhoneNo;
                $scope.MobileNo = response.data[0].MobileNo;
                $scope.CityCode = response.data[0].CityCode;
                $scope.PlaceOfSupply = response.data[0].CityName;
            }
            else {
                $scope.Address1 = "";
                $scope.CityName = "";
                $scope.GSTN = "";
                $scope.PhoneNo = "";
                $scope.MobileNo = "";
                $scope.CityCode = "";
                $scope.PlaceOfSupply = "";
            }
        });
    }

    $scope.getSuplierDetailUsingSCode = function (SupplierCode) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 21;
        $scope.collectionobj["LedgerCode"] = SupplierCode;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.Address1 = response.data[0].Address;
                $scope.CityName = response.data[0].CityName;
                $scope.GSTN = response.data[0].GSTN;
                $scope.PhoneNo = response.data[0].PhoneNo;
                $scope.MobileNo = response.data[0].MobileNo;
                $scope.CityCode = response.data[0].CityCode;
                $scope.PlaceOfSupply = response.data[0].CityName;
            }
            else {
                $scope.Address1 = "";
                $scope.CityName = "";
                $scope.GSTN = "";
                $scope.PhoneNo = "";
                $scope.MobileNo = "";
                $scope.CityCode = "";
                $scope.PlaceOfSupply = "";
            }
        });
    }

    $scope.BindTransporter = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 15;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["SessionId"] = sessionId;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
            $scope.TransporterList = response.data;
        });
    };

    $scope.BindCashPostAC = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 16;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
            $scope.CashPostACList = response.data;
        });
    };

    $scope.BindAgainstFrom = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 17;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
            $scope.AgainstFromList = response.data;
        });
    };

    $scope.BindPurchaseBillType = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 7;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["NatureCode"] = 'PBILL';

        var getData = myService.methode('POST', '../Api/AccountMasterApi/VoucherMasterList', $scope.collectionobj);
        getData.then(function (response) {
            $scope.PurchaseBillTypeList = response.data;
        });
    };

    $scope.getVoucherNo = function (PurchaseBillTypeCode) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 2;
        $scope.collectionobj["V_Type"] = PurchaseBillTypeCode;
        $scope.collectionobj["RelationshipId"] = relationshipId;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Purchase/GetPurchaseBill', $scope.collectionobj);
        getData.then(function (response) {
            $scope.VoucherNo = response.data.Table[0].VoucherNo;
        });
    };

    $scope.BindInvoiceType = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 6;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["Head"] = 'P';
        var getData = myService.methode('POST', '../Inventory/GetInvoiceMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.InvoiceTypeList = response.data;
        });
    };

    $scope.BindItem = function (action, Itemgroupcode, storecode, index) {
        if (action == null) { action = 4 }

        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = action;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["ItemCode"] = Itemgroupcode;
        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        if (storecode != null)
            $scope.collectionobj["StoreCode"] = storecode;

        var getData = myService.methode('POST', '../Inventory/GetItemMaster', $scope.collectionobj);
        getData.then(function (response) {
            if (index == null)
                $scope.ItemList = response.data.Table;
            else
                $scope.ItemList[index] = response.data.Table;
        });
    };

    $scope.BindBaseUnit = function (ItemCode) {

        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 18;
        $scope.collectionobj["Code"] = ItemCode;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetItemMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.BaseUnitList = response.data.Table;
        });
    };

    $scope.BindPurPostAC = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 18;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
            $scope.PurPostACList = response.data;
        });
    };

    $scope.BindSaleBillType = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 7;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["NatureCode"] = 'SBILL';
        var getData = myService.methode('POST', '../Api/AccountMasterApi/VoucherMasterList', $scope.collectionobj);
        getData.then(function (response) {
            $scope.SaleBillTypeList = response.data;
        });
    };

    $scope.getVoucherNoForSaleBill = function (SaleBillTypeCode) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 5;
        $scope.collectionobj["V_Type"] = SaleBillTypeCode;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Sale/GetSaleBill', $scope.collectionobj);
        getData.then(function (response) {
            $scope.SVoucherNo = response.data.Table[0].VoucherNo;
        });
    };

    $scope.BindSInvoiceType = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 6;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["CompCode"] = compCode;
        $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["Head"] = 'S';

        var getData = myService.methode('POST', '../Inventory/GetInvoiceMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.SInvoiceTypeList = response.data;
        });
    };

    $scope.BindSAgainstFrom = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 20;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
            $scope.SAgainstFromList = response.data;
        });
    };

    $scope.SetTextInModel = function (attr, value) {

        setTimeout(function () {
            $scope.obj = {};
            if (typeof (value) === 'undefined') {
                $scope[attr.textModel] = '';
                return;
            }
            $scope.obj[attr.valueCol] = value;
            var filterList = $filter('filter')($scope[attr.listobj], $scope.obj);
            try {
                if (filterList.length > 0 && filterList != null)
                    $scope[attr.textModel] = filterList[0][attr.textCol];
                else
                    $scope[attr.textModel] = '';
            }
            catch (ex) {
                $scope[attr.textModel] = '';
            }
            $scope.$applyAsync();
        }, 150);
    };

    $scope.ClearTextModel = function () {
        $.each($scope.attr, function (index, list) {
            $scope[list.textModel] = "";
        })
    }

    $scope.BindSubgroup = function (action) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = action;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', $scope.collectionobj);
        getData.then(function (response) {
            $scope.ExpensesList = response.data;
        });
    };

    $scope.BindApplicationCode = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetApplicationMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.ApplicationCodeList = response.data;
        });
    };

    $scope.BindColorList = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetColorMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.ColorList = response.data;
        });
    };

    $scope.BindItemMakeList = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetItemMakeMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.ItemMakeList = response.data;
        });
    };

    $scope.BindModelCode = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetModelMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.ModelCodeList = response.data;
        });
    };

    $scope.BindPacking = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
 $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;

        var getData = myService.methode('POST', '../Inventory/GetPackingMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.PackingList = response.data;
        });
    };

    $scope.BindSize = function (index) {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["RelationshipId"] = relationshipId;
        $scope.collectionobj["CompCode"] = compCode; $scope.collectionobj["SiteCode"] = siteCode;
        $scope.collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Inventory/GetSizeMaster', $scope.collectionobj);
        getData.then(function (response) {
            $scope.SizeList = response.data;
        });
    };

    $scope.GetVoucherType = function (VType) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.V_Type = VType;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetVoucherTypeLib', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.VoucherTypeList = response.data;
                $scope.VoucherM = $filter('filter')($scope.VoucherTypeList, { 'VCode':  VType  })[0].VCode;
            }
        });
    };

    $scope.CheckHQYN = function () {
        $scope.collectionobj = {};
        
        $scope.collectionobj["Action"] = 6;
        $scope.collectionobj.CompCode = compCode;
        $scope.collectionobj.SiteCode = siteCode;
        $scope.collectionobj["RelationshipId"] = relationshipId;
        $scope.collectionobj["SessionId"] = sessionId;
        var getData = myService.methode('POST', '../Employee/CheckHQYN', $scope.collectionobj);
        getData.then(function (response) {
            
            $scope.CheckHQlist = response.data;
        });
    };

    //$scope.GetLeaveType = function () {
    //    $scope.collectionobj = {};
    //    $scope.collectionobj["Action"] = 5;
    //    $scope.collectionobj["BranchCode"] = branchCode;
    //    $scope.collectionobj["RelationshipId"] = relationshipId;
    //    $scope.collectionobj["SessionId"] = sessionId;
    //    $scope.collectionobj["FYId"] = fyId;
    //    $scope.collectionobj.CompCode = compCode;
    //    $scope.collectionobj.SiteCode = siteCode;
    //    var getData = myService.methode('POST', '../Employee/LeaveTypeMasterList', $scope.collectionobj);
    //    getData.then(function (response) {
    //        $scope.LeaveTypes = response.data
    //    });
    //};

    //$scope.GetAbbrType = function () {
    //    $scope.collectionobj = {};
    //    
    //    $scope.collectionobj.Action = 5;
    //    $scope.collectionobj.SessionId = sessionId;
    //    $scope.collectionobj.SchoolCode = schoolCode;
    //    $scope.collectionobj.BranchCode = branchCode;
    //    $scope.collectionobj.FYId = fyId;
    //    $scope.collectionobj.CompCode = compCode;
    //    $scope.collectionobj.SiteCode = siteCode;
    //    var getData = myService.methode('POST', "../Employee/MasterAbbreviationList", $scope.collectionobj);
    //    getData.then(function (response) {
    //        $scope.AbbrTypes = response.data;
    //    });
    //};

    $scope.BindSaudaNo = function (loadactive) {
        if (loadactive != null) {
            var collectionobj = {};
            collectionobj.Action = 16;
            collectionobj.FYId = fyId;
            collectionobj.SchoolCode = schoolCode;
            collectionobj.BranchCode = branchCode;
            collectionobj.CompCode = compCode;
            collectionobj.SiteCode = siteCode;
            collectionobj.SupplierCode = $scope.SupplierCode;

            var getData = myService.methode('POST', "../Inventory/GetMaterialInwardEntry", '{obj:' + JSON.stringify(collectionobj) + '}');
            getData.then(function (response) {
                $scope.SaudaList = response.data.Table;
            });
        }
        else {
            var collectionobj = {};
            collectionobj.Action = 4;
            collectionobj.FYId = fyId;
            collectionobj.SchoolCode = schoolCode;
            collectionobj.BranchCode = branchCode;
            collectionobj.CompCode = compCode;
            collectionobj.SiteCode = siteCode;
            collectionobj.SupplierCode = $scope.SupplierCode;

            var getData = myService.methode('POST', "../Inventory/GetSaudaEntry", '{obj:' + JSON.stringify(collectionobj) + '}');
            getData.then(function (response) {
                $scope.SaudaList = response.data.Table;
            });
        }

    };

    $scope.GetSOSite = function (IsHQ) {
        
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        if (typeof (IsHQ) !== 'undefined') { collectionobj.IsHQ = IsHQ; }

        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetHOSOLedger', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.SOSiteList = response.data;
        });
    };       
}
