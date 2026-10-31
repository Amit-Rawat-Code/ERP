app.InsertOpeningintoLedgerController = function ($scope, $element, $filter, myService)
{
    $scope.LedgerTransferList = true;
    $scope.disabledImport = false;
    $scope.LedgerList = [];
    $scope.chkRowAll = function ()
    {
        for (var index = 0; index < $scope.LedgerList.length; index++)
        {
            $scope.LedgerList[index].chkAllow = $scope.chkAll;
        }
    }
    $scope.chkUncheck = function ()
    {
        $scope.flag = true;
        for (var index = 0; index < $scope.LedgerList.length; index++)
        {
            if ($scope.LedgerList[index].chkAllow == false)
            {
                $scope.flag = false;
                break;
            }
        }
        $scope.chkAll = $scope.flag;
    }

    $scope.GetSession = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 4;
        var getData = myService.methode('POST', "../api/GetMasterApi/GetSession", collectionobj);
        getData.then(function (response)
        {
            $scope.SessionList = response.data;
        });
    };
    $scope.GetAllotedFinancialYear = function ()
    {
        var collectionobj = {};
        collectionobj.UserId = userid;
        collectionobj.SessionId = $scope.ToSessionId;
        collectionobj.Action = 4;
        var getData = myService.methode('POST', '../Api/LedgerTransferApi/GetFinancialYear', collectionobj);
        getData.then(function (response)
        {
            $scope.AllotedFinancialYearList = response.data;
        });
    }

    $scope.ddlAllotedFinancialYear_Change = function () {
        $scope.BindLedgerList();
    }

    $scope.BindLedgerList = function ()
    {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.ToFYId = $scope.ToFYId;
        var getData = myService.methode('POST', '../api/LedgerTransferApi/GetRelationshipwiseLedgerListForOpening', collectionobj);
        getData.then(function (response)
        {
            $scope.LedgerList = response.data;
            $scope.hideLoader();
        });
    };

    $scope.TransferRecord = function ()
    {
        if (isValidate())
        {
            if ($scope.LedgerList.length>0)
            {
                if ($filter('filter')($scope.LedgerList, { 'chkAllow': true }, true).length > 0)
                {
                    proceedConfirmbox("It will delete all data from your selected Ledger from session " + $('#ddlSession option:selected').text() + " (if exists). Do you want to proceed ", function () {
                        var collectionobj = {};
                        collectionobj.TransferLedgerList = JSON.stringify($filter('filter')($scope.LedgerList, { chkAllow: true }, true));
                        collectionobj.ToSessionId = $scope.ToSessionId;
                        collectionobj.ToFYId = $scope.ToFYId;
                        collectionobj.RelationshipId = relationshipId;
                        collectionobj.SessionId = sessionId;
                        collectionobj.FYId = fyId;
                        collectionobj.CreatedBy = userid;
                        var getData = myService.methode('POST', "../api/LedgerTransferApi/InsertOpeningRelationshipwise", collectionobj);
                        getData.then(function (response) {
                           
                            if (showMsgBox(response.data)) {
                                $scope.ClearControl(1);
                            }
                        });
                    });
                }
                else
                {
                    showMsgBox('Select Atleast One CheckBox.');
                }
            }
            else
            {
                showMsgBox('No Records Found.');
            }
        }
    }

    $scope.ClearControl = function (flag)
    {
        if (flag == 1)
        {
            $scope.ResetControl(flag);
        }
        else
        {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag)
    {
        $scope.LedgerTransferList = true;
        $scope.ToSessionId = "";
        $scope.ToFYId = "";
        $scope.LedgerList = [];
        if (flag == 0)
        {
            showMsgBox('4');
        };
    } 
}