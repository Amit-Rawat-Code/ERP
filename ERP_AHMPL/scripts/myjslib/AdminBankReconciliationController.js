app.AdminBankReconciliationController = function ($scope, $element, $filter, myService) {
    $scope.type = 1;

    $scope.GeBanksForExcel = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "13";
        var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetBankReconciliation', collectionobj);
        getData.then(function (response)
        {
            $scope.ExcelBankList = response.data;
        });
    };

    $scope.GetExcelFormatNo = function ()
    {
        $scope.AllExcelFormat = '';
        var collectionobj = {};
        collectionobj.Action = "1";
        collectionobj.BankCode = $scope.ExcelBank;
        var getData = myService.methode('POST', '../Api/MasterApi/GetExcelFormatNo', collectionobj);
        getData.then(function (response)
        {
            $scope.AllExcelFormat = response.data;
        });
    };


    $scope.rdShowDiv = function () {
        if ($scope.type == 1) {
            $scope.excelDataTableHide = true;
            $scope.searchExcelDataButton = true;
            $scope.Bank = '';
            $scope.LedgerDataList = {};
            $scope.ExcelDataList = {};
            $scope.disFeeDeposit = true;
            $scope.disBankRecepits = true;
            $scope.ledgerSetteledButtion = true;
            $scope.ledgerDataListtable = true;
            $scope.showExcelBank = true;
        }
        else {
            $scope.showExcelBank = false;
            $scope.searchExcelDataButton = false;
            $scope.Bank = '';
            $scope.LedgerDataList = {};
            $scope.ExcelDataList = {};
            $scope.disFeeDeposit = false;
            $scope.disBankRecepits = false;
            $scope.ledgerSetteledButtion = true;
            $scope.ledgerDataListtable = true;
        }
    }
    $scope.rdShowDiv();
    $scope.MatchChequeNoRecords = null;

    $scope.BindBankRuningBalance = function () {
        $scope.BindRuningBalance($scope.Bank);
    };

    $scope.SearchExcelRecords = function ()
    {
        if ($scope.type != 1)
        {
            var collectionobj = {};
            collectionobj.Action = "6";
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.BankCode = $scope.ExcelBank;
            collectionobj.ExcelFormatNo = $scope.ExcelFormatNo;
            //collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
            //collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
            var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetBankReconciliation', collectionobj);
            getData.then(function (response)
            {
                if (response.data.length > 0)
                {
                    $scope.ExcelDataList = response.data;
                    $scope.excelDataTableHide = false;
                }
                else
                {
                    $scope.ExcelDataList = response.data;
                }
            });
        }
    };

    $scope.$watch('LedgerDataList', function ()
    {
        if (typeof ($scope.LedgerDataList) === 'undefined') return;
        var table = $('#LedgerDataList').DataTable();
        table.destroy();
    });


    $scope.LedgerWiseDetails = function (Status) {

        var table = $('#example3').DataTable();
        table.destroy();

        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        if (Status == 'Cleared') {
            collectionobj.Action = 1;
        }
        else if (Status == 'InProcess') {
            collectionobj.Action = 2;
        }
        else {
            collectionobj.Action = 3;
        }
        collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
        collectionobj.SubCode = $scope.Bank;
        collectionobj.ResStatus = Status;
        collectionobj.EntryNarration = "1";
        collectionobj.VoucherNarration = "1";

        var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerWiseDetails", collectionobj);
        getData.then(function (response) {

            $scope.LedgerWiseDetailsList = response.data;
        });

    };


    $scope.LedgerMasterRecords = function ()
    {
        if ($scope.type != 1)
        {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Action = "7";
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.BankCode = $scope.Bank;
	        collectionobj.FYId = fyId;
            if (($scope.FromDate != undefined) && ($scope.ToDate != undefined))
            {
                collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
                collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
            }
            else
            {
                collectionobj.FromDate = '';
                collectionobj.ToDate ='';
            }
            var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetBankReconciliation', collectionobj);
            getData.then(function (response)
            {
                $scope.hidetxtDate = true;
                $scope.hidetxtTransactionNo = true;
                $scope.thDatehide = true;
                $scope.thTransactionNo = true;
                $scope.LedgerDataList = response.data;
                $scope.hideLoader();
                if (response.data.length > 0)
                {
                    $scope.ledgerSetteledButtion = false;
                    $scope.ledgerDataListtable = false;
                }
            });
        }
        else {
            if (($scope.FromDate != undefined || $scope.FromDate != null) && ($scope.ToDate == undefined || $scope.ToDate == null))
            {
                showMsgBox("Fill To Date.");
            }
            else
            {
                $scope.showLoader();
                var collectionobj = {};
                collectionobj.Action = "11";
                collectionobj.BankCode = $scope.Bank;
                if (($scope.FromDate != undefined || $scope.FromDate != null) && ($scope.ToDate != undefined || $scope.ToDate != null)) {
                    collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
                    collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
                }
                else {
                    collectionobj.FromDate = $scope.FromDate;
                    collectionobj.ToDate = $scope.ToDate;
                }
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
		collectionobj.FYId = fyId;
                var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetBankReconciliation', collectionobj);
                getData.then(function (response) {
                    $scope.LedgerDataList = response.data;
                    $scope.hideLoader();
                    $scope.hidetxtDate = false;
                    $scope.hidetxtTransactionNo = false;
                    $scope.thDatehide = false;
                    $scope.thTransactionNo = false;
                    if (response.data.length > 0) {
                        $scope.ledgerSetteledButtion = false;
                        $scope.ledgerDataListtable = false;
                    }
                });
            }
        }
    };

    $scope.OpenBankRecepitVoucher = function ()
    {
        $scope.IsExcelCheckBoxChecked = false;
        angular.forEach($scope.ExcelDataList, function (obj) {
            if (obj.checked == true) {
                $scope.ExcelDataTransId = obj.TransID;
                $scope.ExcelDataSrNo = obj.RowSrNo;
                $scope.ExcelDataTransactionNo = obj.TransactionNo;
                $scope.ExcelDatahBankCode = $scope.Bank;
                $scope.ExcelSetteledDate = obj.SettledDate;
                sessionStorage.setItem('ExcelSetteledDate', $scope.ExcelSetteledDate);
                $scope.ExcelSetteledAmount = obj.SettledAmount;
                $scope.ExcelTransactionMode = obj.TransactionMode;

                if ((obj.ExcelFormatNo == "1") && ($scope.ExcelBank == "1")) {
                    $scope.ExcelNarration = "TransactionNo: " + obj.TransactionNo + ",ScholarNo: " + obj.ScholarNo + ",StudentName: " + obj.StudentName + ",ClassSection: " + obj.ClassSection + ",Remarks: " + obj.Remarks + ",Amount: " + obj.Amount + ",Status: " + obj.Status + ",ClearanceDate: " + obj.ClearanceDate;
                }
                else if ((obj.ExcelFormatNo == "2") && ($scope.ExcelBank == "1")) {
                    $scope.ExcelNarration = obj.UniqueNo + "," + obj.CompanyReference + "," + obj.SolId + "," + obj.Section + "," + obj.Quarter + "," + obj.LateFees + "," + obj.FeeAmount + "," + obj.DrwnOnBank + "," + obj.DrwnOnBranch + "," + obj.ClearanceFlag + "," + obj.TimeColl;
                }
                else if ((obj.ExcelFormatNo == "1") && ($scope.ExcelBank == "2")) {
                    $scope.ExcelNarration = obj.ValueDate + "," + obj.PostDate + "," + obj.RemitterBranch + "," + obj.ChequeNo;
                }
                else if ((obj.ExcelFormatNo == "1") && ($scope.ExcelBank == "3")) {
                    $scope.ExcelNarration = obj.TransactionNo + "," + obj.ScholarNo + "," + obj.StudentName + "," + obj.ClassSection + "," + obj.Remarks + "," + obj.Amount + "," + obj.Status + "," + obj.ClearanceDate;
                }
                else {
                    $scope.ExcelNarration = obj.Particulars + "," + obj.Balance;
                }

                $scope.IsExcelCheckBoxChecked = true;
            }
        })
        if ($scope.IsExcelCheckBoxChecked != true) {
            showMsgBox("One Checkbox Should Be Selected.");
        }
        else {
            //"../AccountTransaction/BankReceiveVoucher", "?ExcelDataTransId=" + $scope.ExcelDataTransId + "&ExcelDataSrNo=" + $scope.ExcelDataSrNo + "&ExcelDataTransactionNo=" + ExcelDataTransactionNo + "&ExcelDatahBankCode=" + $scope.ExcelDatahBankCode + "&ExcelSetteledDate=" + $scope.ExcelSetteledDate + "&ExcelSetteledAmount=" + $scope.ExcelSetteledAmount + "&ExcelTransactionMode=" + $scope.ExcelTransactionMode + "&ExcelNarration=" + $scope.ExcelNarration ;
            location.href = "/AccountTransaction/BankReceiveVoucher?ExcelDataTransId=" + $scope.ExcelDataTransId + "&ExcelDataSrNo=" + $scope.ExcelDataSrNo + "&ExcelDataTransactionNo=" + $scope.ExcelDataTransactionNo + "&ExcelDatahBankCode=" + $scope.ExcelDatahBankCode + "&ExcelSetteledDate=" + $scope.ExcelSetteledDate + "&ExcelSetteledAmount=" + $scope.ExcelSetteledAmount + "&ExcelTransactionMode=" + $scope.ExcelTransactionMode + "&ExcelNarration=" + $scope.ExcelNarration;
        }
    };

    $scope.OpenFeesDepositForm = function ()
    {
        $scope.FeesIsExcelCheckBoxChecked = false;
        angular.forEach($scope.ExcelDataList, function (obj) {
            if (obj.checked == true) {
                $scope.FeesExcelDataTransId = obj.TransID;
                $scope.FeesExcelDataSrNo = obj.RowSrNo;
                $scope.FeesExcelDataTransactionNo = obj.TransactionNo;
                $scope.FeesExcelDatahBankCode = $scope.Bank;
                $scope.FeesExcelSetteledDate = obj.SettledDate;
                //sessionStorage.setItem('ExcelSetteledDate', $scope.ExcelSetteledDate);
                $scope.FeesExcelSetteledAmount = obj.Amount;
                $scope.FeesExcelTransactionMode = obj.TransactionMode;
                $scope.FeesExcelAddmissionNo = obj.ScholarNo;

                //if ((obj.ExcelFormatNo == "1") && (obj.SubCode == "50000008")) {
                //    $scope.ExcelNarration = obj.BranchCode + "," + obj.CompanyCode + "," + obj.TransactionNo + "," + obj.ScholarNo + "," + obj.StudentName + "," + obj.ClassSection + "," + obj.Remarks + "," + obj.Emailid + "," + obj.MobileNo + "," + obj.Amount + "," + obj.TotalAmount + "," + obj.CommissionAmount + "," + obj.Status, + "," + obj.ClearanceDate + "," + obj.CRTDDate + "," + obj.AuthoriseDate + "," + obj.Aggregator + "," + obj.MerchantTransactionId + "," + obj.MerchantTransactionId;
                //}
                //else if ((obj.ExcelFormatNo == "2") && (obj.SubCode == "50000008")) {
                //    $scope.ExcelNarration = obj.UniqueNo + "," + obj.CompanyReference + "," + obj.SolId + "," + obj.Section + "," + obj.Quarter + "," + obj.LateFees + "," + obj.FeeAmount + "," + obj.DrwnOnBank + "," + obj.DrwnOnBranch + "," + obj.ClearanceFlag + "," + obj.TimeColl;
                //}
                //else if ((obj.ExcelFormatNo == "1") && (obj.SubCode == "20000003")) {
                //    $scope.ExcelNarration = obj.ValueDate + "," + obj.PostDate + "," + obj.RemitterBranch + "," + obj.ChequeNo;
                //}
                //else {
                //    $scope.ExcelNarration = obj.Particulars + "," + obj.Balance;
                //}

                $scope.FeesIsExcelCheckBoxChecked = true;
                return;
            }
        })
        if ($scope.FeesIsExcelCheckBoxChecked != true) {
            showMsgBox("One Checkbox Should Be Selected.");
        }
        else {
            location.href = "/FeeTransaction/FeeDeposit?FeesExcelDataTransId=" + $scope.FeesExcelDataTransId + "&FeesExcelDataSrNo=" + $scope.FeesExcelDataSrNo + "&FeesExcelAddmissionNo=" + $scope.FeesExcelAddmissionNo + "&FeesExcelSetteledDate=" + $scope.FeesExcelSetteledDate + "&FeesExcelTransactionMode=" + $scope.FeesExcelTransactionMode + "&FeesExcelDatahBankCode=" + $scope.FeesExcelDatahBankCode + "&FeesExcelSetteledAmount=" + $scope.FeesExcelSetteledAmount;
        }
    };
    $scope.Row = [];
    $scope.CheckLedgerMatchRecordsWithTransactionNo = function (obj)
    {
        angular.forEach($scope.LedgerDataList, function (row) {
            row['color'] = "";
            row.checked = false;
        });

        angular.forEach($scope.Row, function (row) {
            $.each(row, function (key, value) {
                row[key] = "";
            });
        });

        if (obj.checked) {
            if (($scope.Bank != '') && ($scope.FromDate != 'undefined') && ($scope.ToDate != 'undefined') && ($scope.LedgerDataList != null)) {
                $scope.showLoader();
                var collectionobj = {};
                collectionobj.Action = "9";
                collectionobj.BankCode = $scope.ExcelBank;
                collectionobj.ExcelFormatNo = $scope.ExcelFormatNo;
                var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetBankReconciliation', collectionobj);
                getData.then(function (response) {
                    $scope.MatchingFields = response.data;
                    $scope.column = {};
                    angular.forEach($scope.MatchingFields, function (column) {
                        
                        angular.forEach($scope.LedgerDataList, function (row, index) {
                            if (obj[column.ExcelHeaderName] == row[column.MatchingColumn]) {
                                $scope.Row[index][column.MatchingColumn] = "font-weight:600;color:#FFF;background-color: #00000085;text-decoration: underline;";
                                row['color'] = "green";
                            }
                        });
                    })
                    $scope.hideLoader();
                    $scope.$applyAsync();
                });
            }
        }
        
    }

    $scope.ExcelOneCheckBoxChecked = function (position, entities) {
        angular.forEach(entities, function (subscription, index) {
            if (position != index) {
                subscription.checked = false;
            }
        });
    }


    $scope.LedgerOneCheckBoxChecked = function (position, entities) {
        if ($scope.type != 1) {
            angular.forEach(entities, function (subscription, index) {
                if (position != index)
                    subscription.checked = false;
            });
        }
    }


    $scope.SaveRecord = function () {
        $scope.IsExcelDataCheckBoxChecked = false;
        $scope.IsLedgerDataCheckBoxChecked = false;
        $scope.IsClearingDateSelected = true;
        angular.forEach($scope.ExcelDataList, function (obj) {
            if (obj.checked == true) {
                $scope.ExcelDatahfId = obj.TransID;
                $scope.ExcelSrno = obj.RowSrNo;
                $scope.AdminSetteledDate = obj.SettledDate;
                $scope.IsExcelDataCheckBoxChecked = true;
            }
        })
        angular.forEach($scope.LedgerDataList, function (obj1) {
            if (obj1.checked == true) {
                debugger
                if (obj1.transactionDate == undefined || obj1.transactionDate == null) {
                    $scope.IsClearingDateSelected = false;
                }

                if ($scope.AdminSetteledDate != undefined && $scope.AdminSetteledDate != null) {
                    $scope.LedgerDatahfId = obj1.TransID;
                    $scope.LedgerSrno = obj1.LRowSrNo;
                    $scope.TransactionNo = obj1.TransactionNo;
                    $scope.IsLedgerDataCheckBoxChecked = true;
                }

            }
        })
        if ($scope.type != 1) {
            debugger
            if (($scope.IsExcelDataCheckBoxChecked == true) && ($scope.IsLedgerDataCheckBoxChecked == true)) {
                var collectionobj = {};
                if ($scope.AdminSetteledDate != undefined && $scope.AdminSetteledDate != null && $scope.AdminSetteledDate != '') {
                    collectionobj.Date = moment($scope.AdminSetteledDate).format('YYYY-MMM-DD');
                    collectionobj.TransID = $scope.ExcelDatahfId;
                    collectionobj.LedgerDataTransID = $scope.LedgerDatahfId;
                    collectionobj.SrNo = $scope.ExcelSrno;
                    collectionobj.LedgerSrNo = $scope.LedgerSrno;
                    collectionobj.SessionId = sessionId;
                    collectionobj.FYId = fyId;
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.Action = "8";
                    collectionobj.CreatedBy = userid;
                    var getData = myService.methode('POST', '../Api/AccountTransactionApi/InsertUpdateDeleteBankReconciliation', collectionobj);
                    getData.then(function (response) {
                        if (showMsgBox(response.data)) {
                            location.reload(true);
                        }
                    });
                }
            }
            else {
                showMsgBox("One Checkbox Should Be Selected.");
            }
        }
        else {
            if (($filter('filter')($scope.LedgerDataList, { 'checked': true }, true)).length > 0) {

                if ($scope.IsClearingDateSelected) {
                    var collectionobj = {};
                    collectionobj.TransactionNo = JSON.stringify($filter('filter')($scope.LedgerDataList, { 'checked': true }, true));
                    collectionobj.SessionId = sessionId;
                    collectionobj.FYId = fyId;
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.Action = "12";
                    collectionobj.CreatedBy = userid;
                    var getData = myService.methode('POST', '../Api/AccountTransactionApi/InsertUpdateDeleteBankReconciliation', collectionobj);
                    getData.then(function (response) {
                        if (showMsgBox(response.data)) {
                            $scope.ClearControl(1);
                        }
                    });
                }
                else {
                    showMsgBox("Fill Transaction Date.");
                }
            }
            else {
                showMsgBox("One Checkbox Should Be Selected.");
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
        $scope.rdShowDiv();
    };

}