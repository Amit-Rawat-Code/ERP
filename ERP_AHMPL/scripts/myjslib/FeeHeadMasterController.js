app.FeeHeadMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#FeeheadName');


    $scope.GetMonths = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetMonths', collectionobj);
        getData.then(function (response) {

            $scope.MonthList = response.data;
            $scope.DefaultMonth = $filter('filter')($scope.MonthList, { Code: 'APR' }, true);
            if ($scope.DefaultMonth.length > 0) {
                $scope.Month = $scope.DefaultMonth[0].Code;
            }
        });
    }
    $scope.GetFrequency = function () {
        var collectionobj = {};

        collectionobj.Action = "6";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFrequency', collectionobj);
        getData.then(function (response) {
            $scope.FrequencyList = response.data;
        });
    }
    $scope.GetUnacruedLedgerAc = function () {
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetUnacruedLedgerAc', collectionobj);
        getData.then(function (response) {
            $scope.UnacruedLedgerAclist = response.data;
        });
    }
    $scope.GetCorpusLedgerAc = function () {
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetCorpusLedgerAc', collectionobj);
        getData.then(function (response) {
            $scope.CorpusLedgerAclist = response.data;
        });
    }
    $scope.GetDepositAc = function () {
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetDepositAc', collectionobj);
        getData.then(function (response) {
            $scope.DepositAclist = response.data;
        });
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            
            var collectionobj = {};
            collectionobj.FeeHeadName = $scope.FeeHeadName;
            collectionobj.Frequency = $scope.Frequency;
            collectionobj.DueFromMonth = $scope.Month;
            collectionobj.DisplayOrder = $scope.DisplayOrder;
            collectionobj.HeadType = $scope.HeadType;
            collectionobj.UnacruedLedgerCode = $scope.UnacruedLedgerAc;
            collectionobj.CorpusLedgerCode = $scope.CorpusLedgerAc;
            collectionobj.DepositCode = $scope.DepositAc;
            collectionobj.ConcessionLedgerCode = $scope.ConcessionLedgerCode;
            collectionobj.AccountNumber = $scope.Accountnumber;
            collectionobj.IsFeeRefundable = $scope.IsFeeRefundable;
            collectionobj.IsMonthlyBreakupReq = $scope.IsMonthlyBreakupReq;
            collectionobj.IsShowInCertificate = $scope.IsShowInCertificate;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.IsActive = $scope.IsActive;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteFeeHeadMaster', collectionobj);

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };
    $scope.GetDisplayOrder = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFeeHeadMaster', collectionobj);
        getData.then(function (response) {
            if (response.data == null)
                $scope.DisplayOrder = 1;
            else
                $scope.DisplayOrder = response.data.length + 1;
        });
    }

    $scope.GetDisplayOrder();

    $scope.FeeHeadMasterList = [];

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
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFeeHeadMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Fee head Name", "HeaderValue": "FeeHeadName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Frequency", "HeaderValue": "FrequencyName", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Due From Month", "HeaderValue": "DueFromMonth", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "HeadType", "HeaderValue": "HeadType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            $scope.FeeHeadMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, $scope.FeeHeadMasterList);
            
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.FeeHeadMasterList = $filter('filter')($scope.FeeHeadMasterList, { 'Code': $scope.hfId }, true);
                $scope.FeeHeadName = $scope.FeeHeadMasterList[0].FeeHeadName;
                $scope.Frequency = $scope.FeeHeadMasterList[0].FrequencyName;
                $scope.Month = $scope.FeeHeadMasterList[0].DueFromMonth;
                $scope.DisplayOrder = $scope.FeeHeadMasterList[0].DisplayOrder;
                $scope.HeadType = $scope.FeeHeadMasterList[0].HeadType;
                $scope.UnacruedLedgerAc = $scope.FeeHeadMasterList[0].UnacruedLedgerCode;
                $scope.CorpusLedgerAc = $scope.FeeHeadMasterList[0].CorpusLedgerCode;
                $scope.DepositAc = $scope.FeeHeadMasterList[0].DepositACCode;
                $scope.ConcessionLedgerCode = $scope.FeeHeadMasterList[0].ConcessionLedgerCode;
                $scope.Accountnumber = $scope.FeeHeadMasterList[0].ACNumber;
                $scope.IsFeeRefundable = $scope.FeeHeadMasterList[0].IsFeeRefundable == true ? "true" : "false";
                $scope.IsMonthlyBreakupReq = $scope.FeeHeadMasterList[0].IsMonthlyBreakupReq == true ? "true" : "false";
                $scope.IsShowInCertificate = $scope.FeeHeadMasterList[0].IsShowCertificate == true ? "true" : "false";             
                $scope.IsActive = $scope.FeeHeadMasterList[0].IsActive == true ? "true" : "false";
                $scope.hideLoader();
                $scope.Save = "Edit";              
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#FeeheadName', true);
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
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteFeeHeadMaster', collectionobj);
        getData.then(function (response) {
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
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.FeeHeadName = "";
       
        $scope.Frequency = "";
        $scope.Month = "APR";
        $scope.HeadType = "";
        $scope.UnacruedLedgerAc = "";
        $scope.CorpusLedgerAc = "";
        $scope.DepositAc = "";
        $scope.ConcessionLedgerCode = "";
        $scope.Accountnumber = "";
        $scope.IsFeeRefundable = "false";
        $scope.IsMonthlyBreakupReq = "false";
        $scope.IsShowInCertificate = "false";
        $scope.IsActive = "true";
        $scope.GetDisplayOrder();

        $scope.$applyAsync();
        $scope.SetFocus('#FeeheadName');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Fee head Name", "HeaderValue": "FeeHeadName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Frequency", "HeaderValue": "FrequencyName", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Due From Month", "HeaderValue": "DueFromMonth", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "HeadType", "HeaderValue": "HeadType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.FeeHeadMasterList, window.document.title);
    };

}