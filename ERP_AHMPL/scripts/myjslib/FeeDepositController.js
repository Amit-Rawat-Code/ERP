app.FeeDepositController =async function ($scope, $element, $filter, myService)
{
    $scope.BankName = "";
    $scope.AdjustmentAmount = 0;
    $scope.AdjustmentAmountInit = 0;    
    $scope.ddlSession_Change = function () {
        $scope.FinalStudentsList(null, $scope.SessionId); 
    }
    var FeesExcelSetteledDate = getParameterByName('FeesExcelSetteledDate');
    var FeesExcelDataTransId = getParameterByName('FeesExcelDataTransId');
    var FeesExcelDataSrNo = getParameterByName('FeesExcelDataSrNo');

    var FeesExcelTransactionMode = getParameterByName('FeesExcelTransactionMode');
    var FeesExcelAddmissionNo = getParameterByName('FeesExcelAddmissionNo');
    var FeesExcelDatahBankCode = getParameterByName('FeesExcelDatahBankCode');
    var FeesExcelSetteledAmount = getParameterByName('FeesExcelSetteledAmount');
    //$scope.SearchStudents();
    $scope.GetStudents = function ()
    {
        $scope.disabledEntryMode = false;
        $scope.disabledBank = false;
        if ((FeesExcelAddmissionNo != null) && (FeesExcelAddmissionNo != '') && (FeesExcelAddmissionNo != 'undefined')) {
            $scope.disabledEntryMode = true;
            $scope.disabledBank = true;
            $scope.disabledDDLClass = true;
            $scope.disabledFeeDepositDate = true;
            $scope.FinalStudentsListFromCurrentSession_Promiss().then(function () {
                setTimeout(function () {
                    $scope.disabledSearch = true;
                },100)
                $scope.StudentList = $filter('filter')($scope.StudentList, { AdmissionNo: FeesExcelAddmissionNo });
                if ($scope.StudentList.length > 0) {
                    $scope.SearchText = $scope.StudentList[0].StudentName;
                    $scope.FillStudentDetail($scope.StudentList[0])
                }
                else {
                    showMsgBox('Sorry no student found.')
                }
            });
        }
        else {
            $scope.FinalStudentsList_Promiss(null, sessionId).then(function () {
                if ($scope.StudentList.length == 0) {
                    showMsgBox('Sorry no student found.');
                }
            });
        }
    }


    if ((FeesExcelSetteledDate != null) && (FeesExcelSetteledDate != '') && (FeesExcelSetteledDate != 'undefined'))
    {
       
        $scope.FeeDepositDate = new Date(FeesExcelSetteledDate);
        $scope.EntryMode = "Bank";
    }
    else
    {
        $scope.EntryMode = "School";
        $scope.SetMaxMinDate().then(function (response) {
            $scope.FeeDepositDate = response;
            $scope.$applyAsync();
        });
    }

    if ((FeesExcelTransactionMode != null) && (FeesExcelTransactionMode != '') && (FeesExcelTransactionMode != 'undefined'))
    {
        if (FeesExcelTransactionMode == 'Cheque')
        {
            $scope.TransModeModel = 'Cheque';
        }
        else
        {
            $scope.TransModeModel = 'NEFT';
        }
    }
   
    if ((FeesExcelDatahBankCode != null) && (FeesExcelDatahBankCode != '') && (FeesExcelDatahBankCode != 'undefined'))
    {
        $scope.BankName = FeesExcelDatahBankCode;
    }

    

    $scope.SetFocus('#ddlSession');
    $scope.StudentId = "";
    $scope.StudentCode = "";
    $scope.StreamCode = "";
    $scope.AdmStudentName = "";
    $scope.StudentWiseFeeStructure = [];
    $scope.GroupWiseFeeStructure = [];
    $scope.selectedConcessionCount = 0;
    $scope.selectedInstallmentCount = 0;
    $scope.IsChequeBounce = false;
    $scope.SundryList = [];
    $scope.IsSundryVoucher = false;
    $scope.IsCanceledRecNo = false;
    $scope.SessionId = sessionId;
    $scope.$watch('GetFeeStructureGroupList', function () {
        if ($scope.GetFeeStructureGroupList != undefined) {
            $scope.FeeStructureGroup = $scope.GetFeeStructureGroupList.length > 0 ? $scope.GetFeeStructureGroupList[0].Code : '';
        }
    })

    $scope.GetSundryLedgerTran = function () {
        var collectionobj = {};
        collectionobj.Action = '8';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetLedgerVoucher', collectionobj);
        getData.then(function (response) {
            $scope.SundryList = response.data;
        });
    };

    $scope.GetSundryLedgerTran();

    $scope.AllInstallment = function () {
        angular.forEach($scope.InstallmentList, function (SI) {
            SI.chk = $scope.chkAllInstallment;
        });
    }

    $scope.AllConcession = function () {
        angular.forEach($scope.ConcessionheadList, function (SI) {
            SI.chk = $scope.chkAllConcession;
        });
    }

    $scope.GetCanceledReceipt = function () {
        var collectionobj = {};
        collectionobj.Action = '6';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.StudentCode = $scope.StudentCode;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetFeesReceiptCancellation', collectionobj);
        getData.then(function (response) {
            $scope.Receipts = response.data;
        });
    };

    $scope.GetDueInstallment = function () {
        var collectionobj = {};
        collectionobj.Action = '10';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.StudentCode = $scope.StudentCode;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetDueInstallment', collectionobj);
        getData.then(function (response) {
            $scope.InstallmentList = response.data;
            $.each($scope.InstallmentList, function (index, obj) {
                obj.chk = false;
            });
        });
    };

    $scope.GetStudentWiseFeeStructure = function (action, transid) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.InstallmentList = JSON.stringify($filter('filter')($scope.InstallmentList, { chk: true }));
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetStudentConcessionDetails', collectionobj);
        getData.then(function (response) {
            $scope.ConcessionheadList = response.data.Table
            $scope.ConcessionheadList1 = response.data.Table1
        });

        if (action == null) {
            action = 6;
        }
        var collectionobj = {};
        collectionobj.TransID = transid;
        collectionobj.Action = action;
        collectionobj.InstallmentList = JSON.stringify($filter('filter')($scope.InstallmentList, { chk: true })); 
        collectionobj.ConcessionList = JSON.stringify($filter('filter')($scope.ConcessionheadList, { chk: true }));
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroup;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetStudentWiseFeeStructure', collectionobj);
        getData.then(function (response) {
            if (response.data != null && response.data.Table.length > 0) {
                $scope.StudentWiseFeeStructure = response.data.Table;
                if (response.data.Table1!=null && response.data.Table1.length > 0) {

                    $scope.AdjustmentAmount = response.data.Table1[0].AdjustmentAmount;
                    $scope.AdjustmentAmountInit = $scope.AdjustmentAmount;
                }
                if ($scope.StudentWiseFeeStructure != null && $scope.StudentWiseFeeStructure.length > 0)
                    if ($scope.StudentWiseFeeStructure[0].IsCanceled) {
                        showMsgBox('Cancelled receipt can not edit or delete.');
                    }
                $.each($scope.StudentWiseFeeStructure, function (index, obj) {
                    if (obj.HeadType == 'Admission') {
                        obj.chk = true;
                    }
                })
                var NetPayable = $scope.Sumoflist('StudentWiseFeeStructure', 'NetPayable', { chk: true })
                $scope.TotalPaybleAmount = Number(NetPayable);
                $scope.SumCarriedForward();
            } else {
                $scope.StudentWiseFeeStructure = []
                $scope.AdjustmentAmount = 0;
                $scope.TotalPaybleAmount = 0;
            }
        });
    };

    $scope.ShowStudentFeeCard = function () {
        var collectionobj = {};
        collectionobj.Action = 9;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetStudentWiseFeeStructure', collectionobj);
        getData.then(function (response) {
            $scope.FeeStructureList = response.data.Table;
        });
    }

    $scope.ddlClass_Change = function () {
        $scope.StudentPhoto = "../Content/Photos/user-profile-Icon.png";
        $scope.SearchText = "";
        $scope.StudentCode = "";
        $scope.StudentName = "";
        $scope.Address = "";
        $scope.ParentName = "";
        $scope.Contact = "";
        $scope.SessionName = "";
        $scope.StudentDOB = "";
        $scope.ClassName = "";
        $scope.$parent.SectionCode = "";
        $scope.StreamCode = "";

        //$scope.GetSections($scope.$parent.ClassCode);
        $scope.GetStudents();

    };

    $scope.FillStudentDetail = function (student)
    {
        $scope.disableSection = true;

        //$scope.StudentId = ($filter('filter')($scope.StudentList, { StudentCode: $scope.StudentCode }))[0].StudentId
        //$scope.AdmissionNo = ($filter('filter')($scope.StudentList, { StudentCode: $scope.StudentCode }))[0].AdmissionNo
        //$scope.ParentName = ($filter('filter')($scope.StudentList, { StudentCode: $scope.StudentCode }))[0].FatherName
        //$scope.Contact = ($filter('filter')($scope.StudentList, { StudentCode: $scope.StudentCode }))[0].Mobile
        //$scope.StudentDOB = new Date(($filter('filter')($scope.StudentList, { StudentCode: $scope.StudentCode }))[0].DOB)
        //$scope.$parent.SectionCode = ($filter('filter')($scope.StudentList, { StudentCode: $scope.StudentCode }, true))[0].SectionCode
        //$scope.StreamCode = ($filter('filter')($scope.StudentList, { StudentCode: $scope.StudentCode }))[0].StreamCode

        $scope.StudentPhoto = student.StudentPhoto;
        $scope.SearchText = student.Name;
        $scope.StudentCode = student.StudentCode;

        $scope.$parent.ClassCode = student.ClassCode;
        //$scope.GetSections(student.ClassCode);

        $scope.StudentName = student.Name;
        //$scope.RegNo = student.RegNo
        $scope.Address = student.Address
        $scope.ParentName = student.FatherName
        $scope.Contact = student.Mobile
        $scope.SessionName = student.SessionName
        $scope.StudentDOB = new Date(student.DOB)
        //$scope.IsFromMerit = student.IsFromMerit
        $scope.ClassName = student.ClassName
        //$scope.StudentId = ($filter('filter')($scope.Students, { StudentCode: $scope.StudentCode }))[0].StudentId
        //$scope.RollNo = ($filter('filter')($scope.Students, { StudentCode: $scope.StudentCode }))[0].RollNo

        $scope.$parent.SectionCode = student.SectionCode
        $scope.StreamCode = student.StreamCode

        $scope.ConcessionheadList = [];
        $scope.ConcessionheadList1 = [];
        $scope.StudentWiseFeeStructure = [];

        $scope.GetDueInstallment();
        $scope.ShowStudentFeeCard();
        $scope.GetCanceledReceipt();
        $scope.GetCheckBounceAmount();
        $scope.SumCarriedForward();
        $scope.GetStudentWiseFeeStructure();
    }

    $scope.CheckAdjustment = function () {
        if (Number($scope.AdjustmentAmountInit) < 0) {
            if (Number($scope.AdjustmentAmountInit) > Number($scope.AdjustmentAmount) || Number($scope.AdjustmentAmount) > 0) {
                $scope.AdjustmentAmount = $scope.AdjustmentAmountInit;
                showMsgBox('Adjustment Amount can not more 0 or not less than ' + $scope.AdjustmentAmountInit)
            }
        }
        else {
            if (Number($scope.AdjustmentAmountInit) > 0) {
                if (Number($scope.AdjustmentAmountInit) < Number($scope.AdjustmentAmount) || Number($scope.AdjustmentAmount) < 0) {
                    $scope.AdjustmentAmount = $scope.AdjustmentAmountInit;
                    showMsgBox('Adjustment Amount can not less 0 or not more than ' + $scope.AdjustmentAmountInit)
                }
            }
        }       
    }
    $scope.NetPayableAmt = function (obj) {
        //if ($scope.StudentWiseFeeStructure[0].HeadType == 'Opening') {
        //    if ($scope.StudentWiseFeeStructure[0].PayableAmt < 0)
        //        $scope.StudentWiseFeeStructure[0].NetPayable = -$scope.Sumoflist('StudentWiseFeeStructure', 'NetPayable', { chk: true, HeadType: '!Opening' });
        //    else
        //        $scope.StudentWiseFeeStructure[0].NetPayable = $scope.Sumoflist('StudentWiseFeeStructure', 'NetPayable', { chk: true, HeadType: '!Opening' });
        //}
        obj.NetPayable = obj.Amount - obj.ConcessionAmt
        var NetPayable = $scope.Sumoflist('StudentWiseFeeStructure', 'NetPayable', { chk: true })

        //if (Number($scope.BalBroughtForward) < 0) {
        //    if ((-Number($scope.BalBroughtForward)) >= Number(NetPayable)) {
        //        $scope.AdjBalBroughtForward = NetPayable
        //    }
        //    else {
        //        $scope.AdjBalBroughtForward = -$scope.BalBroughtForward
        //    }
        //}
        //else {
        //    if (Number($scope.BalBroughtForward) >= Number(NetPayable)) {
        //        $scope.AdjBalBroughtForward = NetPayable
        //    }
        //    else {
        //        $scope.AdjBalBroughtForward = -$scope.BalBroughtForward
        //    }
        //}
        $scope.TotalPaybleAmount = Number(NetPayable)
        $scope.SumCarriedForward();
    }

    $scope.CheckFee = function (obj) {
       

        if (obj.chk == false)
            obj.NetPayable = 0;
        else
            if (obj.PayableAmt - obj.ConcessionAmt >= 0)
                obj.NetPayable = obj.PayableAmt - obj.ConcessionAmt;
            else
                obj.NetPayable = 0;

        //if ($scope.StudentWiseFeeStructure[0].HeadType == 'Opening') {
        //    if ($scope.StudentWiseFeeStructure[0].PayableAmt < 0)
        //        $scope.StudentWiseFeeStructure[0].NetPayable = -$scope.Sumoflist('StudentWiseFeeStructure', 'NetPayable', { chk: true, HeadType: '!Opening' });
        //    else
        //        $scope.StudentWiseFeeStructure[0].NetPayable = $scope.Sumoflist('StudentWiseFeeStructure', 'NetPayable', { chk: true, HeadType: '!Opening' });
        //}

        var NetPayable = $scope.Sumoflist('StudentWiseFeeStructure', 'NetPayable', { chk: true })
        //if (Number($scope.BalBroughtForward) < 0) {
        //    if ((-Number($scope.BalBroughtForward)) >= Number(NetPayable)) {
        //        $scope.AdjBalBroughtForward = NetPayable
        //    }
        //    else {
        //        $scope.AdjBalBroughtForward = -$scope.BalBroughtForward
        //    }
        //}
        //else {
        //    if (Number($scope.BalBroughtForward) >= Number(NetPayable)) {
        //        $scope.AdjBalBroughtForward = NetPayable
        //    }
        //    else {
        //        $scope.AdjBalBroughtForward = -$scope.BalBroughtForward
        //    }
        //}

       

        $scope.TotalPaybleAmount = Number(NetPayable)
        $scope.SumCarriedForward();
    }

    $scope.CheckFee_Again = function (obj) {
        //if ($scope.StudentWiseFeeStructure[0].HeadType == 'Opening') {
        //    if ($scope.StudentWiseFeeStructure[0].PayableAmt < 0)
        //        $scope.StudentWiseFeeStructure[0].NetPayable = -$scope.Sumoflist('StudentWiseFeeStructure', 'NetPayable', { chk: true, HeadType: '!Opening' });
        //    else
        //        $scope.StudentWiseFeeStructure[0].NetPayable = $scope.Sumoflist('StudentWiseFeeStructure', 'NetPayable', { chk: true, HeadType: '!Opening' });
        //}
        obj.chk = true;
        if (Number(obj.NetPayable) == 0) {
            obj.chk = false;
        }
       
        var a = (obj.PayableAmt)
        var b = Number(obj.NetPayable)
        if (a < b && obj.HeadType != 'Opening') {
            obj.NetPayable = obj.PayableAmt;
            showMsgBox('"Net Payable Amount" can not grater "Payable Amt."')
        }
        else if (obj.HeadType == 'Opening') {
           
            a = (obj.PayableAmt)
            if (a < 0) {
                if (a > b || b>0) {
                    obj.NetPayable = 0;
                    showMsgBox('"Net Payable Amount" can not grater "Payable Amt.-Concession Amt."')
                }
            }
            else if (a > 0) {
                if (a < b) {
                    obj.NetPayable = 0;
                    showMsgBox('"Net Payable Amount" can not grater "Payable Amt.-Concession Amt."')
                }
            }
        }
        var NetPayable = $scope.Sumoflist('StudentWiseFeeStructure', 'NetPayable', { chk: true })
        //if (Number($scope.BalBroughtForward) < 0) {
        //    if ((-Number($scope.BalBroughtForward)) >= Number(NetPayable)) {
        //        $scope.AdjBalBroughtForward = NetPayable
        //    }
        //    else {
        //        $scope.AdjBalBroughtForward = -$scope.BalBroughtForward
        //    }
        //}
        //else {
        //    if (Number($scope.BalBroughtForward) >= Number(NetPayable)) {
        //        $scope.AdjBalBroughtForward = NetPayable
        //    }
        //    else {
        //        $scope.AdjBalBroughtForward = -$scope.BalBroughtForward
        //    }
        //}
        $scope.TotalPaybleAmount = Number(NetPayable)
        $scope.SumCarriedForward();
    }

    $scope.AutoFillFeeRectAmt = function () {

        if ($scope.StudentWiseFeeStructure[0].HeadType == 'Opening') {
            if ($scope.StudentWiseFeeStructure[0].PayableAmt < 0) {

                $scope.StudentWiseFeeStructure[0].NetPayable = 0;
                var paybleamt = $scope.Sumoflist('StudentWiseFeeStructure', 'PayableAmt', { HeadType: '!Opening' });
                var paidamt = $scope.Sumoflist('StudentWiseFeeStructure', 'Paid', { HeadType: '!Opening' });

                if ((Number($scope.TotalPaybleAmount)) <= (Number(paybleamt) - Number(paidamt))) {
                    $scope.TotalPaybleAmount_temp = Number($scope.TotalPaybleAmount);
                    $.each($filter('filter')($scope.StudentWiseFeeStructure, { HeadType: '!Opening' }), function (index, obj) {
                        obj.NetPayable = 0;
                        obj.chk = false;
                        obj.Balance = 0;
                    });

                    $.each($filter('filter')($scope.StudentWiseFeeStructure, { HeadType: '!Opening' }), function (index, obj) {
                        if ((obj.PayableAmt - obj.Paid) <= $scope.TotalPaybleAmount_temp) {
                            obj.NetPayable = (obj.PayableAmt) - Number(obj.Paid)
                            $scope.TotalPaybleAmount_temp = $scope.TotalPaybleAmount_temp - obj.NetPayable;
                            obj.chk = true;
                        }
                        else {
                            if (typeof Number($scope.TotalPaybleAmount_temp) !== 'number' || $scope.TotalPaybleAmount_temp == 0) {
                                obj.NetPayable = 0;
                                obj.chk = false;
                            }
                            else {
                                obj.NetPayable = $scope.TotalPaybleAmount_temp;
                                obj.chk = true;
                            }
                            return false;
                        }
                    });

                }
                else {
                    $scope.TotalPaybleAmount = $scope.Sumoflist('StudentWiseFeeStructure', 'PayableAmt', { HeadType: '!Opening' }) - $scope.Sumoflist('StudentWiseFeeStructure', 'Paid', { HeadType: '!Opening' });
                    showMsgBox('"Total Net Payble Amount" can not grater "Total Payable Amount"')
                    if ($scope.TotalPaybleAmount != 0)
                        $scope.AutoFillFeeRectAmt();
                }
            }
            else {
                var paybleamt = $scope.Sumoflist('StudentWiseFeeStructure', 'PayableAmt');
                var paidamt = $scope.Sumoflist('StudentWiseFeeStructure', 'Paid');

                if ((Number($scope.TotalPaybleAmount)) <= (Number(paybleamt) - Number(paidamt))) {
                    $scope.TotalPaybleAmount_temp = Number($scope.TotalPaybleAmount);
                    $.each($scope.StudentWiseFeeStructure, function (index, obj) {
                        obj.NetPayable = 0;
                        obj.chk = false;
                        obj.Balance = 0;
                    });

                    $.each($scope.StudentWiseFeeStructure, function (index, obj) {
                        if ((obj.PayableAmt - obj.Paid) <= $scope.TotalPaybleAmount_temp) {
                            obj.NetPayable = (obj.PayableAmt) - Number(obj.Paid)
                            $scope.TotalPaybleAmount_temp = $scope.TotalPaybleAmount_temp - obj.NetPayable;
                            obj.chk = true;
                        }
                        else {
                            if (typeof Number($scope.TotalPaybleAmount_temp) !== 'number' || $scope.TotalPaybleAmount_temp == 0) {
                                obj.NetPayable = 0;
                                obj.chk = false;
                            }
                            else {
                                obj.NetPayable = $scope.TotalPaybleAmount_temp;
                                obj.chk = true;
                            }
                            return false;
                        }
                    });

                }
                else {
                    $scope.TotalPaybleAmount = $scope.Sumoflist('StudentWiseFeeStructure', 'PayableAmt') - $scope.Sumoflist('StudentWiseFeeStructure', 'Paid');
                    showMsgBox('"Total Net Payble Amount" can not grater "Total Payable Amount"')
                    if ($scope.TotalPaybleAmount != 0)
                        $scope.AutoFillFeeRectAmt();
                }
            }
        }
        else {
            var paybleamt = $scope.Sumoflist('StudentWiseFeeStructure', 'PayableAmt');
            var paidamt = $scope.Sumoflist('StudentWiseFeeStructure', 'Paid');
            $scope.disableAdd = false;
            if ((Number($scope.TotalPaybleAmount)) <= (Number(paybleamt) - Number(paidamt))) {
                $scope.TotalPaybleAmount_temp = Number($scope.TotalPaybleAmount);
                $.each($scope.StudentWiseFeeStructure, function (index, obj) {
                    obj.NetPayable = 0;
                    obj.chk = false;
                    obj.Balance = 0;
                });

                $.each($scope.StudentWiseFeeStructure, function (index, obj) {
                    if ((obj.PayableAmt - obj.Paid) <= $scope.TotalPaybleAmount_temp) {
                        obj.NetPayable = (obj.PayableAmt) - Number(obj.Paid)
                        $scope.TotalPaybleAmount_temp = $scope.TotalPaybleAmount_temp - obj.NetPayable;
                        obj.chk = true;
                    }
                    else {
                        if (typeof Number($scope.TotalPaybleAmount_temp) !== 'number' || $scope.TotalPaybleAmount_temp == 0) {
                            obj.NetPayable = 0;
                            obj.chk = false;
                        }
                        else {
                            obj.NetPayable = $scope.TotalPaybleAmount_temp;
                            obj.chk = true;
                        }
                        return false;
                    }
                });

            }
            else {
                $scope.TotalPaybleAmount = $scope.Sumoflist('StudentWiseFeeStructure', 'PayableAmt') - $scope.Sumoflist('StudentWiseFeeStructure', 'Paid');
                
                if (FeesExcelDataTransId != null && FeesExcelDataTransId != '') {
                    $scope.disableAdd = true;
                    showMsgBox('Bank settled amount should be equal to fee receipet amount.')
                }
                else {
                    showMsgBox('"Total Net Payble Amount" can not grater "Total Payable Amount"')
                }
                if ($scope.TotalPaybleAmount != 0)
                    $scope.AutoFillFeeRectAmt();
            }
        }

   
    }

    $scope.SumCarriedForward = function () {
        if (isNaN($scope.ChequeBounceAmount))
            $scope.ChequeBounceAmount = 0;
        if (isNaN($scope.CarriedForward))
            $scope.CarriedForward = 0;

        if ((FeesExcelSetteledAmount != null) && (FeesExcelSetteledAmount != '') && (FeesExcelSetteledAmount != 'undefined')) {
            $scope.TotalPaybleAmount = $scope.ConvertToDecimalPoint(FeesExcelSetteledAmount);
            $scope.AutoFillFeeRectAmt();
        }
        else {
            $scope.TotalPaybleAmount = Number($scope.Sumoflist('StudentWiseFeeStructure', 'NetPayable', { chk: true })) + Number($scope.CarriedForward) + Number($scope.ChequeBounceAmount) + Number($scope.AdjustmentAmount);
            $scope.TotalPaybleAmount = $scope.ConvertToDecimalPoint($scope.TotalPaybleAmount);
        }
    }

    $scope.ddlReceipts_Change = function (obj) {
        var flag = false;
        if (obj.chk) {
            flag = true;
        }
        angular.forEach($scope.Receipts, function (SI) {
            SI.chk = false;
        });
        obj.chk = flag;
    }

    $scope.ddlSundry_Change = function (obj) {
        var flag = false;
        if (obj.chk) {
            flag = true;
        }
        angular.forEach($scope.SundryList, function (SI) {
            SI.chk = false;
        });
        obj.chk = flag;
    }

    $scope.GetCheckBounceAmount = function () {
        var collectionobj = {};
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Action = 7
        var getData = myService.methode('POST', "../Api/FeeTransactionApi/GetFeesReceiptCancellation", collectionobj);
        getData.then(function (response) {
            $scope.ChequeBounceAmount = response.data[0].ChequeBounceAmt;
            if ($scope.ChequeBounceAmount > 0) {
                $scope.IsChequeBounce = true;
            }
            $scope.SumCarriedForward();
        });
    }

    var insindexflag = false;
    $scope.ShowCarriedForwardtxt = function (index,chk) {
        insindexflag = $scope.ShowHide = $scope.InstallmentList.length == index && chk ? true : false;
    }

    $scope.ShowCarriedForwardtxt1 = function (index, chk) {
        $scope.ShowHide = $scope.StudentWiseFeeStructure.length == index && insindexflag && chk ? true : false;
    }

    $scope.SaveRecord = function () {
        if (isValidate())
        {
            $scope.disableAdd = true;
            if ($scope.TotalPaybleAmount < 0)
            {
                showMsgBox('"Total Net Payble Amount (B)" can not negative.')
                $scope.disableAdd = false;
            }
            else
            {
                $scope.cleargo = true;
                $scope.SLlength = $filter('filter')($scope.SundryList, { chk: true });
                $scope.IsSundrySelected = $scope.SLlength.length > 0;
                if ($scope.StudentWiseFeeStructure != undefined && ($filter('filter')($scope.StudentWiseFeeStructure, { chk: true }).length != 0)) {
                    if ($scope.IsSundrySelected) {
                        if ($scope.SLlength.length > 1) {
                            showMsgBox('Only one ref. voucher can be selected.')
                            $scope.cleargo = false;
                            $scope.disableAdd = false;
                        }
                        else {
                            if ($scope.TotalPaybleAmount != $scope.SLlength[0].CrAmt && $scope.SLlength[0].V_Type != 'OPBAL') {
                                showMsgBox('Selected ref. voucher amount should be equal to Total Net Payble Amount.')
                                $scope.cleargo = false;
                                $scope.disableAdd = false;
                            }
                        }
                    }
                }
                else {
                    $scope.cleargo = false;
                    showMsgBox('Select at least one fee head.')
                    $scope.disableAdd = false;
                }


                if ($scope.cleargo) {

                    var collectionobj = {};
                    collectionobj.ExcelDataTransID = FeesExcelDataTransId;
                    collectionobj.SrNo = FeesExcelDataSrNo;
                    collectionobj.TransID = $scope.hfId;
                    collectionobj.VDate = moment($scope.FeeDepositDate).format('DD-MMM-YYYY');
                    collectionobj.AcademicSessionId = $scope.SessionId;
                    collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroup;
                    collectionobj.StudentCode = $scope.StudentCode;
                    collectionobj.StudentId = $scope.StudentId;

                    collectionobj.ClassCode = $scope.ClassCode;
                    collectionobj.SectionCode = $scope.SectionCode;

                    collectionobj.RegNo = $scope.RegNo;
                    collectionobj.BillNo = $scope.BillNo;
                    if (moment.isDate($scope.BillDate))
                        collectionobj.BillDate = moment($scope.BillDate).format('DD-MMM-YYYY');

                    collectionobj.CashRect = $scope.FeeMode == 'Cash' ? $scope.TotalRectAmount : 0;
                    collectionobj.ChqRect = $scope.FeeMode == 'Cheque' ? $scope.TotalRectAmount : 0;
                    collectionobj.ChqDate = $scope.FeeMode == 'Cheque' ? moment($scope.ChequeDate).format('YYYY/MM/DD') : ($scope.FeeMode == 'DD' ? moment($scope.ChequeDDDate).format('YYYY/MM/DD') : ($scope.FeeMode == 'NEFT' ? moment($scope.NEFTDate).format('YYYY/MM/DD') : ""));
                    collectionobj.ChqNo = $scope.FeeMode == 'Cheque' ? $scope.ChequeNo : ($scope.FeeMode == 'DD' ? $scope.DDNo : ($scope.FeeMode == 'NEFT' ? $scope.UTRNo : ""));
                    collectionobj.BankACCode = $scope.IsSundrySelected ? $scope.SLlength[0].SubCode : (($scope.EntryMode == 'Bank' && $scope.FeeMode == 'Cash') || ($scope.FeeMode != 'Cash') ? $scope.BankName : "");


                    collectionobj.Remark = $scope.Remark;
                    collectionobj.EntryMode = $scope.EntryMode;
                    collectionobj.PayMode = ($scope.IsSundryVoucher && $scope.Save == "Edit") ? 'Adjustment' : $scope.FeeMode;

                    collectionobj.FeeStructures = JSON.stringify($filter('filter')($scope.StudentWiseFeeStructure, { chk: true }));

                    collectionobj.ConcessionList = JSON.stringify($filter('filter')($scope.ConcessionheadList));

                    collectionobj.SundryList = JSON.stringify($filter('filter')($scope.SundryList, { chk: true }));

                    collectionobj.IsFromMerit = $scope.IsFromMerit
                    collectionobj.TotalRect = $scope.TotalPaybleAmount
                    collectionobj.AdjustAmount = $scope.AdjustmentAmount
                    collectionobj.CarriedForward = $scope.CarriedForward
                    collectionobj.ChequeBounceAmt = $scope.ChequeBounceAmount


                    collectionobj.FeeCancelTransId = JSON.stringify($filter('filter')($scope.Receipts, { chk: true }));

                    collectionobj.FYId = fyId;
                    collectionobj.IsActive = $scope.IsActive;
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.SessionId = sessionId;
                    collectionobj.CreatedBy = userid;
                    collectionobj.UpdatedBy = userid;
                    if ($scope.Save == "Save") {
                        collectionobj.Action = "1";
                    }
                    else if ($scope.Save == "Edit") {
                        collectionobj.Action = "2";
                    }

                    if ($scope.StudentWiseFeeStructure[0].IsCanceled) {
                        showMsgBox('Cancelled receipt can not edit or delete.');
                    }
                    else {
                        var getData = myService.methode('POST', '../Api/FeeTransactionApi/InsertUpdateDeleteFeeDeposit', collectionobj);
                        getData.then(function (response) {
                            if (showMsgBox(response.data)) {
                                $scope.ClearControl(1);
                            }

                        });
                    }
                }
            }
        }
    };

    $scope.FeeDepositList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        //debugger
        $scope.showLoader();
        var collectionobj = {};
        /*collectionobj.Action = "4";*/
        collectionobj.Action = "12";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetFeeDeposit', collectionobj);
        getData.then(function (response) {
            //debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Session", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "RcptNo", "HeaderValue": "RcptNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "blue-text" },
                    { "HeaderText": "Fee Deposit Date", "HeaderValue": "FDDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "IdDateType": "Yes" },
                    { "HeaderText": "AdmissionNo", "HeaderValue": "AdmissionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student Name", "HeaderValue": "Student", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Installment", "HeaderValue": "Installment", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Entry Mode", "HeaderValue": "EntryMode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Pay Mode", "HeaderValue": "PayMode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Canceled", "HeaderValue": "IsCanceled", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "Status", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Clear Date", "HeaderValue": "ClngDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            

            //$scope.FeeDepositList = response.data.Table;
            loadDataTableForLargeAmountData(tblheader, response.data.Table);
            $('#example tbody').on('dblclick', 'tr', function (event) {

                $scope.IsChequeBounce = false;

                $scope.showLoader();
                $scope.amount = -1;
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();

                var collectionobj = {};
                collectionobj.Action = '13';
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.TransId = $scope.hfId;
                var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetFeeDeposit', collectionobj);
                getData.then(function (response) {

                    $scope.FeeDepositList = response.data.Table;

                    $scope.StudentPhoto = $scope.FeeDepositList[0].StudentPhoto;
                    $scope.SearchText = $scope.FeeDepositList[0].Student;
                    $scope.StudentName = $scope.FeeDepositList[0].Student
                    $scope.StudentCode = $scope.FeeDepositList[0].StudentCode
                    $scope.StudentId = $scope.FeeDepositList[0].StudentId

                    $scope.FeeDepositDate = new Date($scope.FeeDepositList[0].FDDate)

                    $scope.Address = $scope.FeeDepositList[0].Address
                    $scope.ClassName = $scope.FeeDepositList[0].ClassName

                    $scope.AdmissionNo = $scope.FeeDepositList[0].AdmissionNo
                    $scope.ParentName = $scope.FeeDepositList[0].FatherName
                    $scope.Contact = $scope.FeeDepositList[0].Mobile
                    $scope.StudentDOB = new Date($scope.FeeDepositList[0].DOB)
                    $scope.IsFromMerit = $scope.FeeDepositList[0].IsFromMerit

                    $scope.$parent.ClassCode = $scope.FeeDepositList[0].ClassCode
                    //$scope.GetSections($scope.$parent.ClassCode);
                    $scope.$parent.SectionCode = $scope.FeeDepositList[0].SectionCode
                    $scope.StreamCode = $scope.FeeDepositList[0].StreamCode

                    $scope.disabledDDLClass = true;
                    $scope.disableSection = true;

                    $scope.EntryMode = $scope.FeeDepositList[0].EntryMode;

                    $scope.BillNo = $scope.FeeDepositList[0].BillNo;
                    $scope.BillDate = $scope.FeeDepositList[0].BillDate != null ? new Date($scope.FeeDepositList[0].BillDate) : "";

                    $scope.FeeMode = $scope.FeeDepositList[0].PayMode;
                    $scope.FeeType = $scope.FeeDepositList[0].FeeType;
                    $scope.FeeAmount = $scope.FeeDepositList[0].FeeAmount;
                    $scope.ToWords($scope.FeeAmount);
                    $scope.AmountInWords = $scope.FeeDepositList[0].AmountInWords;
                    $scope.ChequeNo = $scope.FeeMode == "Cheque" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
                    $scope.ChequeDate = $scope.FeeMode == "Cheque" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
                    $scope.DDNo = $scope.FeeMode == "DD" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
                    $scope.ChequeDDDate = $scope.FeeMode == "DD" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
                    $scope.UTRNo = $scope.FeeMode == "NEFT" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
                    $scope.NEFTDate = $scope.FeeMode == "NEFT" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
                    $scope.BankName = $scope.FeeDepositList[0].BankName;

                    $scope.Remark = $scope.FeeDepositList[0].Remark;
                    $scope.SessionId = $scope.FeeDepositList[0].AcademicSessionId.toString();
                    $scope.FeeStructureGroup = $scope.FeeDepositList[0].FeeStructureGroupCode;

                    $scope.Installment = $scope.FeeDepositList[0].Installment;
                    $scope.RcptNo = $scope.FeeDepositList[0].RcptNo;

                    $scope.SundryVoucher = $scope.FeeDepositList[0].SundryVoucher;
                    $scope.IsSundryVoucher = $scope.FeeDepositList[0].IsSundryVoucher;

                    $scope.CanceledRecNo = $scope.FeeDepositList[0].CanceledRecNo;
                    $scope.IsCanceledRecNo = $scope.FeeDepositList[0].IsCanceledRecNo;

                    $scope.ChequeBounceAmount = $scope.FeeDepositList[0].ChequeBounceAmount;
                    if ($scope.ChequeBounceAmount > 0) {
                        $scope.IsChequeBounce = true;
                    }

                    $scope.AdjustmentAmount = $scope.FeeDepositList[0].AdjustAmount;

                    $scope.ShowStudentFeeCard();

                    var collectionobj = {};
                    collectionobj.Action = '10';
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.SessionId = sessionId;
                    collectionobj.FYId = fyId;
                    collectionobj.StudentCode = $scope.StudentCode;
                    var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetDueInstallment', collectionobj);
                    getData.then(function (response) {
                        $scope.InstallmentList = response.data;
                        $.each($scope.InstallmentList, function (index, obj) {
                            obj.chk = false;
                        });

                        var collectionobj = {};
                        collectionobj.Action = "7";
                        collectionobj.TransId = $scope.hfId;
                        collectionobj.RelationshipId = relationshipId;
                        collectionobj.SessionId = sessionId;
                        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetFeeDeposit', collectionobj);
                        getData.then(function (response) {
                            $scope.chkAllInstallmentdisabled = true;
                            angular.forEach($scope.InstallmentList, function (SI) {
                                SI.chk = false;
                                angular.forEach(response.data.Table1, function (obj) {
                                    if (SI.Code == obj.InstallmentCode) {
                                        SI.chk = true;
                                    }
                                });
                                SI.disabled = true;
                            });


                            $scope.GetStudentWiseFeeStructure('8', $scope.FeeDepositList[0].TransId);
                            $scope.GetGroupWiseFeeStructure($scope.FeeDepositList[0].TransId);
                        });
                    });




                    $scope.Save = 'Edit';
                    $scope.disableDelete = false;
                    $scope.disablePrint = false;
                    $scope.$applyAsync();
                    //collapse box
                    $('.br-pageheader').fadeIn();
                    $('#collapseinputbox').fadeIn();
                    $('#CollapseSearchTableList').fadeOut();

                    $scope.SetFocus('#ddlSession', true);
                    $scope.hideLoader();

                });
                
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
        collectionobj.TransID = $scope.hfId;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.StudentId = $scope.StudentId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        if ($scope.StudentWiseFeeStructure[0].IsCanceled) {
            showMsgBox('Cancelled receipt can not edit or delete.');
        }
        else {
            var getData = myService.methode('POST', '../Api/FeeTransactionApi/InsertUpdateDeleteFeeDeposit', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
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
        if (FeesExcelDataTransId != null && FeesExcelDataTransId != '') {
            location.href = "/AccountTransaction/AdminBankReconciliation";
        }
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.IsActive = "true";
      
        $scope.hfId = "";

        $scope.FeeDepositList = [];
        $scope.StudentPhoto = "../Content/Photos/user-profile-Icon.png";
        $scope.StudentCode = "";
        $scope.Address = "";

        $scope.StudentWiseFeeStructure = [];

        $scope.SearchText = "";

        $scope.StudentName = "";
        $scope.AdmissionNo = "";
        $scope.ParentName = "";
        $scope.Contact = "";
        $scope.StudentDOB = "";
        $scope.IsFromMerit = "";

        $scope.$parent.SectionCode = "";
        $scope.StreamCode = "";


        $scope.$parent.ClassCode = "";
        $scope.ClassName = "";

        $scope.EntryMode = "School";

        $scope.BillNo = "";
        $scope.BillDate = "";

        $scope.FeeMode = "Cash";
        $scope.ChequeNo = "";
        $scope.ChequeDate = "";
        $scope.DDNo = "";
        $scope.ChequeDDDate = "";
        $scope.UTRNo = "";
        $scope.NEFTDate = "";
        $scope.BankName = "";

        $scope.Remark = "";
        $scope.SessionId = sessionId;
        $scope.StudentId = "";
        $scope.TotalPaybleAmount = 0;
        $scope.ChequeBounceAmount = 0;
        $scope.AdjustmentAmount = 0;
        $scope.AdjustmentAmountInit = 0;

        $scope.SundryVoucher = "";
        $scope.IsSundryVoucher = false;
        $scope.IsCanceledRecNo = false;
        $scope.ShowHide = false;

        $scope.Sections = [];
        $scope.ConcessionheadList = [];
        $scope.ConcessionheadList1 = [];
        $scope.InstallmentList = [];
        $scope.Receipts = [];
        $scope.FeeStructureList = [];

        $scope.IsChequeBounce = false;
        $scope.chkAllInstallmentdisabled = false;
        $scope.chkAllConcessiondisabled = false;
        $scope.disabledDDLClass = false;
        $scope.disableSection = false;

        $scope.GetSundryLedgerTran();
        $scope.SetMaxMinDate().then(function (response) {
            $scope.Date = response;
            $scope.$applyAsync();
        });
        $scope.$applyAsync();
        $scope.SetFocus('#ddlCourse');
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
        $scope.Export('print');
    };

    $scope.started1 = function (transid) {
        if (locked != 'No') {
            $scope.visibleAdd = false;
            $scope.visibleSearch = false;
            $scope.visibleDelete = false;
            $scope.visiblePrint = false;
            $scope.visibleClear = false;
        }
        else {
            setTimeout(function () {
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.hfId = transid;
            }, 500);

        }

        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetFeeDeposit', collectionobj);
        getData.then(function (response) {

            $scope.FeeDepositList = response.data.Table;
            $scope.FeeDepositList = $filter('filter')($scope.FeeDepositList, { 'TransId': transid });

            $scope.IsChequeBounce = false;

            $scope.showLoader();
            $scope.amount = -1;

            $scope.StudentPhoto = $scope.FeeDepositList[0].StudentPhoto;
            $scope.SearchText = $scope.FeeDepositList[0].Student;
            $scope.StudentName = $scope.FeeDepositList[0].Student
            $scope.StudentCode = $scope.FeeDepositList[0].StudentCode
            $scope.StudentId = $scope.FeeDepositList[0].StudentId

            $scope.FeeDepositDate = new Date($scope.FeeDepositList[0].FDDate)

            $scope.Address = $scope.FeeDepositList[0].Address
            $scope.ClassName = $scope.FeeDepositList[0].ClassName

            $scope.AdmissionNo = $scope.FeeDepositList[0].AdmissionNo
            $scope.ParentName = $scope.FeeDepositList[0].FatherName
            $scope.Contact = $scope.FeeDepositList[0].Mobile
            $scope.StudentDOB = new Date($scope.FeeDepositList[0].DOB)
            $scope.IsFromMerit = $scope.FeeDepositList[0].IsFromMerit

            $scope.$parent.ClassCode = $scope.FeeDepositList[0].ClassCode
            //$scope.GetSections($scope.$parent.ClassCode);
            $scope.$parent.SectionCode = $scope.FeeDepositList[0].SectionCode
            $scope.StreamCode = $scope.FeeDepositList[0].StreamCode

            $scope.disabledDDLClass = true;
            $scope.disableSection = true;

            $scope.EntryMode = $scope.FeeDepositList[0].EntryMode;

            $scope.BillNo = $scope.FeeDepositList[0].BillNo;
            $scope.BillDate = $scope.FeeDepositList[0].BillDate != null ? new Date($scope.FeeDepositList[0].BillDate) : "";

            $scope.FeeMode = $scope.FeeDepositList[0].PayMode;
            $scope.ChequeNo = $scope.FeeMode == "Cheque" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
            $scope.ChequeDate = $scope.FeeMode == "Cheque" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
            $scope.DDNo = $scope.FeeMode == "DD" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
            $scope.ChequeDDDate = $scope.FeeMode == "DD" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
            $scope.UTRNo = $scope.FeeMode == "NEFT" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
            $scope.NEFTDate = $scope.FeeMode == "NEFT" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
            $scope.BankName = $scope.FeeDepositList[0].BankName;

            $scope.Remark = $scope.FeeDepositList[0].Remark;
            $scope.SessionId = $scope.FeeDepositList[0].AcademicSessionId.toString();
            $scope.FeeStructureGroup = $scope.FeeDepositList[0].FeeStructureGroupCode;

            $scope.Installment = $scope.FeeDepositList[0].Installment;
            $scope.RcptNo = $scope.FeeDepositList[0].RcptNo;

            $scope.SundryVoucher = $scope.FeeDepositList[0].SundryVoucher;
            $scope.IsSundryVoucher = $scope.FeeDepositList[0].IsSundryVoucher;

            $scope.CanceledRecNo = $scope.FeeDepositList[0].CanceledRecNo;
            $scope.IsCanceledRecNo = $scope.FeeDepositList[0].IsCanceledRecNo;

            $scope.ChequeBounceAmount = $scope.FeeDepositList[0].ChequeBounceAmount;
            if ($scope.ChequeBounceAmount > 0) {
                $scope.IsChequeBounce = true;
            }

            $scope.AdjustmentAmount = $scope.FeeDepositList[0].AdjustAmount;

            $scope.ShowStudentFeeCard();

            var collectionobj = {};
            collectionobj.Action = '10';
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.StudentCode = $scope.StudentCode;
            var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetDueInstallment', collectionobj);
            getData.then(function (response) {
                $scope.InstallmentList = response.data;
                $.each($scope.InstallmentList, function (index, obj) {
                    obj.chk = false;
                });

                var collectionobj = {};
                collectionobj.Action = "7";
                collectionobj.TransId = transId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetFeeDeposit', collectionobj);
                getData.then(function (response) {
                    $scope.chkAllInstallmentdisabled = true;
                    angular.forEach($scope.InstallmentList, function (SI) {
                        SI.chk = false;
                        angular.forEach(response.data.Table1, function (obj) {
                            if (SI.Code == obj.InstallmentCode) {
                                SI.chk = true;
                            }
                        });
                        SI.disabled = true;
                    });


                    $scope.GetStudentWiseFeeStructure('8', $scope.FeeDepositList[0].TransId);
                });
            });
            $scope.SetFocus('#ddlSession', true);
            $scope.hideLoader();
        });
    };
    var transId = getParameterByName('TransId');
    var locked = getParameterByName('Locked');
    if (transId != null) {
        setTimeout(function () { $scope.started1(transId); }, 1000);
    }

    var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
    var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty',  'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    $scope.ToWords = function (s) {
        //debugger
        s = s.toString();
        s = s.replace(/[\, ]/g, '');
        if (s != parseFloat(s))
            return 'not a number';
        var x = s.indexOf('.');
        if (x == -1)
            x = s.length;
        if (x > 15)
            return 'too big';
        var n = s.split('');
        var str = '';
        var sk = 0;
        for (var i = 0; i < x; i++) {
            if ((x - i) % 3 == 2) {
                if (n[i] == '1') {
                    str += tn[Number(n[i + 1])] + ' ';
                    i++;
                    sk = 1;
                }
                else if (n[i] != 0) {
                    str += tw[n[i] - 2] + ' ';
                    sk = 1;
                }
            }
            else if (n[i] != 0) {
                str += dg[n[i]] + ' ';
                if ((x - i) % 3 == 0)
                    str += 'Hundred ';
                sk = 1;
            } if ((x - i) % 3 == 1) {
                if (sk)
                    str += th[(x - i - 1) / 3] + ' ';
                sk = 0;
            }
        }
        if (x != s.length) {
            var y = s.length;
            str += 'point ';
            //for (var i = x + 1; istr.replace(/\s+/g, ' '));
        }
        $scope.AmtInWords = str;
    }

    $scope.GetGroupWiseFeeStructure = function (transid)
    {
        //debugger
        var collectionobj = {};
        collectionobj.TransID = transid;
        collectionobj.Action = 14;
        collectionobj.InstallmentList = JSON.stringify($filter('filter')($scope.InstallmentList, { chk: true }));
        collectionobj.ConcessionList = JSON.stringify($filter('filter')($scope.ConcessionheadList, { chk: true }));
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroup;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetStudentWiseFeeStructure', collectionobj);
        getData.then(function (response)
        {
            //debugger
            $scope.GroupWiseFeeStructure = response.data.Table;
            $scope.PrintHeadingValue = 'Fee Receipt';
        });
    }

    function printConfirmbox(confirmText, functions) {
        swal({
            title: "Print ?",
            text: confirmText,
            type: "success",
            showCancelButton: true,
            confirmButtonClass: 'btn-success',
            confirmButtonText: "Yes, proceed it!",
            closeOnConfirm: true
        }, functions);
    }
    $scope.PrintAfterSave = function () {
        var collectionobj = {};
        collectionobj.Action = "13";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.TransId = $scope.hfId;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetFeeDeposit', collectionobj);
        getData.then(function (response) {
            $Scope.StudentFeeDetail = response.data;
            $scope.RcptNo = $scope.StudentFeeDetail[0].RcptNo;
            $scope.FeeDepositDate = new Date($scope.StudentFeeDetail[0].FDDate);
            $scope.AdmissionNo = $scope.StudentFeeDetail[0].AdmissionNo;
            $scope.ClassName = $scope.StudentFeeDetail[0].ClassName;
            $scope.StudentName = $scope.StudentFeeDetail[0].Student;
            $scope.GetStudentWiseFeeStructure('8', $scope.StudentFeeDetail[0].TransId);
        });
    }
}