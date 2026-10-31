app.CashDepositInBankController = function ($scope, $element, $filter, myService)
{
    $scope.type = 1;
    $scope.TotAmt = true;
    $scope.TotalAmt = 0;
    $scope.MaxDate = moment(new Date()).format('YYYY-MM-DD');

    $scope.rdShowDiv = function ()
    {
        $scope.ChkAll = false;
        $scope.LedgerType = "";
        $scope.DepositDate = undefined;
        if ($scope.type == 1)
        {
            $scope.hideLedgerTypeDropDown = false;
            $scope.divledgerDataList = true;
            $scope.divLedgerToatal = true;
            $scope.ledgerPostVoucher = true;
            $scope.postVoucher = "Post Voucher";
        }
        else
        {
            $scope.postVoucher = "Update Bank Deposit Date";
            var collectionobj = {};
            collectionobj.Action = 2;
            collectionobj.BankSubCode = $scope.LedgerType;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetCashDepositInBankLedgerEntry', collectionobj);
            getData.then(function (response)
            {
                $scope.LedgerList = response.data;
                if (response.data.length > 0)
                {
                    $scope.hideLedgerTypeDropDown = true;
                    $scope.divledgerDataList = false;
                    $scope.divLedgerToatal = true;
                    $scope.ledgerPostVoucher = false;
                  
                }
                else
                {
                    $scope.hideLedgerTypeDropDown = true;
                    $scope.divledgerDataList = true;
                    $scope.divLedgerToatal = true;
                    $scope.ledgerPostVoucher = true;
                }
            });
        }
    }

    $scope.rdShowDiv();

    $scope.FillLedgerDetails = function ()
    {
        $scope.TotalAmt = 0;
        if (($scope.type == 1))
        {
            $scope.BindRuningBalance($scope.LedgerType);
            var collectionobj = {};
            collectionobj.Action = 1;
            collectionobj.BankSubCode = $scope.LedgerType;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetCashDepositInBankLedgerEntry', collectionobj);
            getData.then(function (response)
            {
                $scope.LedgerList = response.data;
                if (response.data.length > 0)
                {
                    $scope.hideLedgerTypeDropDown = false;
                    $scope.divledgerDataList = false;
                    $scope.divLedgerToatal = false;
                    $scope.ledgerPostVoucher = false;
                }
            });
        }
    };

    $scope.ShowPopupDetails = function ()
    {
        $scope.LedgerPopUpList = [];
        $scope.showLoader();
        var table = $('#example3').DataTable();
        table.destroy();
        var collectionobj = {};
        collectionobj.BankSubCode = $scope.LedgerType;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        if (($scope.type == 1))
        {
            collectionobj.Action = 4;
        }
        else
        {
            collectionobj.Action = 5;
        }
        var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetCashDepositInBankLedgerEntry', collectionobj);
        getData.then(function (response)
        {
            $scope.hideLoader();
            $scope.LedgerPopUpList = response.data; 
        });
    };


    $scope.FillTotalAmt = function (obj)
    {
        if (obj.checked == true)
        {
            var IntialAmt = 0;
            IntialAmt = IntialAmt + obj.Amount;
            $scope.TotalAmt = parseFloat(IntialAmt) + parseFloat($scope.TotalAmt);
        }
        else
        {
            if ($scope.TotalAmt > obj.Amount)
            {
                $scope.TotalAmt = parseFloat($scope.TotalAmt) - parseFloat(obj.Amount);
            }
            else
            {
                $scope.TotalAmt = parseFloat(obj.Amount) - parseFloat($scope.TotalAmt);
            }
        }
    };


    $scope.FillLedgerType = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetCashDepositInBankLedgerEntry', collectionobj);
        getData.then(function (response)
        {
            $scope.LedgerTypeList = response.data;
        });
    };

    $scope.OpenContraVoucherForm = function ()
    {
        if (isValidateList())
        {
            if (($scope.type == 1) && ((($filter('filter')($scope.LedgerList, { 'checked': true }, true)).length) > 0) && ($scope.DepositDate != null || $scope.DepositDate != undefined))
            {
                var TransStrings = JSON.stringify($scope.ReturnArray($scope.LedgerList, "TransID", ',', 'checked', true));
                location.href = "/AccountTransaction/ContraVoucher?DepositDate=" + $scope.DepositDate + "&CRAmt=" + $scope.TotalAmt + "&BankSubCode=" + $scope.LedgerType + "&TransID=" + TransStrings;
            }
            else if (($scope.type != 1) && ((($filter('filter')($scope.LedgerList, { 'checked': true }, true)).length) > 0) && ($scope.DepositDate != null || $scope.DepositDate != undefined))
            {
                var collectionobj = {};
                collectionobj.LedgerDataTransID = JSON.stringify(($filter('filter')($scope.LedgerList, { 'checked': true }, true)));
                collectionobj.PVDate = moment($scope.DepositDate).format('YYYY-MMM-DD');
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.Action = 1;
                collectionobj.UpdatedBy = userid;
                var getData = myService.methode('POST', '../Api/AccountTransactionApi/UpdateCashDepositInBank', collectionobj);
                getData.then(function (response)
                {
                    if (showMsgBox(response.data))
                    {
                        $scope.ClearControl(1);
                    }
                });
            }
            else
            {
                showMsgBox("Select Atleast One Check Box Or Date Of Deposit.");
            }
        }
    };

    $scope.CheckALL = function ()
    {
        $.each($scope.LedgerList, function (index, obj) {
            obj.checked = $scope.ChkAll;
        });
    }

    $scope.UnCheck_ChkAll = function () {
        $scope.flag = true;
        $.each($scope.LedgerList, function (index, obj) {
            if (obj.checked == false) {
                $scope.flag = false;
                return;
            }
        });
        $scope.ChkAll = $scope.flag;
    }


    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };
    $scope.ResetControl = function (flag) {
        $scope.ChkAll = false;
        $scope.rdShowDiv();
    };

}