app.MasterTransferWithAcademicController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSession');
    $scope.chkAllow = [];
    $scope.faviconload = [];
    $scope.favicongreen = [];
    $scope.faviconred = [];
    $scope.disabledImport = false;

    //$scope.chkAllRow = function () {
    //    for (var index = 0; index < $scope.MasterTableList.length; index++) {
    //        $scope.chkAllow[index] = $scope.chkAll;          

    //    }
    //}
    //$scope.$watch('chkAll', function () {
    //    if (typeof ($scope.chkAll) === 'undefined') return;
    //    $scope.chkAllRow();
    //});

    $scope.$watch('MasterTableList', function () {
        if (typeof ($scope.MasterTableList) === 'undefined') {
            $scope.hide = true;
        } else {
            if ($scope.MasterTableList.length > 0) {
                $scope.hide = false;
            } else {
                $scope.hide = true;
            }
        }
    });
    $scope.BindNextSession = function () {
        debugger;
        var collectionobj = {};
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Administrator/NextSessionList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.NextSessionList = response.data;
        });
    };

    //$scope.BindNextFinancialYear = function () {
    //    debugger;
    //    var collectionobj = {};
    //    collectionobj.Action = 6;
    //    collectionobj.SchoolCode = schoolCode;
    //    collectionobj.BranchCode = branchCode;
    //    collectionobj.FYId = fyId;
    //    collectionobj.SessionId = $scope.ToSessionId;

    //    //var getData = myService.methode('POST', '../Administrator/FinancialYearMasterList', '{obj:' + JSON.stringify(collectionobj) + '}');    
    //    getData.then(function (response) {
    //        $scope.NextFinancialYearList = response.data;
    //    });
    //};


    $scope.BindNextFinancialYear = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;

        var getData = myService.methode('POST', "../Api/GblMasterApi/GetFinancialYearMaster", collectionobj);
        getData.then(function (response) {
            $scope.NextFinancialYearList = response.data;
        });
    };
    $scope.BindNextFinancialYear();

    $scope.BindMasterTableList = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        var getData = myService.methode('POST', "../Api/DataTransferApi/GetMasterTableListForAcademic", collectionobj);
        getData.then(function (response) {
            $scope.MasterTableList = response.data;
        });
    };

    $scope.sleep = function (duration) {
        var now = new Date().getTime();
        while (new Date().getTime() < now + duration) { /* do nothing */ }
    }
    $scope.TransferRecord = function () {
        if (isValidate()) {
            proceedConfirmbox("It will delete all data from your selected table. Do you want to proceed ", function () {
                $scope.disabledImport = true;
                var MasterList = [];
                $scope.showLoader();
                var SelectedMasters = {};

                SelectedMasters["TableName"] = 'Table';
                MasterList.pop();
                MasterList.push(SelectedMasters);

                var collectionobj = {};
                collectionobj.MasterList = MasterList;

                collectionobj.SessionId = $scope.ToSessionId;
                collectionobj.FromSessionId = sessionId;

                collectionobj.FYId = $scope.ToFYId;
                collectionobj.FromFYId = fyId;

                collectionobj.RelationshipId = relationshipId;
                collectionobj.CreatedBy = JSON.parse(userid);

                collectionobj.Action = "3";
                var getData = myService.methode('POST', "../Api/DataTransferApi/InsertMasterTransferWithAcademic", collectionobj);
                getData.then(function (response) {
                    if (response.data.replace(/"/g, "") == "3") {
                        MasterList = [];

                        var count = 0;
                        var percentage = 0.00;

                        collectionobj = {};
                        $scope.hideLoader();

                        $("table tbody tr").each(function (i) {
                            setTimeout(() => {
                                var row = $(this);
                                var chkAllow = row.find("input[type='checkbox']#chkAllow");                               
                                if (chkAllow.prop("checked")) {                                   
                                    $scope.faviconload[i] = true;
                                    $scope.favicongreen[i] = false;
                                    $scope.faviconred[i] = false;

                                    var SelectedMasters = {};
                                    var tableName = row.find("input[type='hidden']#hfTableName").val();
                                    SelectedMasters["TableName"] = tableName;
                                    MasterList.pop();
                                    MasterList.push(SelectedMasters);

                                    collectionobj.MasterList = MasterList;

                                    collectionobj.SessionId = $scope.ToSessionId;
                                    collectionobj.FromSessionId = sessionId;

                                    collectionobj.FYId = $scope.ToFYId;
                                    collectionobj.FromFYId = fyId;

                                    collectionobj.RelationshipId = relationshipId
                                    collectionobj.CreatedBy = JSON.parse(userid);

                                    var AcSYN = row.find("input[type='hidden']#AcSYN").val();  

                                    if (tableName != ".TimeTable") {
                                        if (AcSYN == "Y") {
                                            collectionobj.Action = "1";
                                        }
                                        else {
                                            collectionobj.Action = "2";
                                        }
                                    }
                                    else {
                                        collectionobj.Action = "5";
                                    }
                                   
                                    var getData = myService.methode('POST', "../Api/DataTransferApi/InsertMasterTransferWithAcademic", collectionobj);
                                    getData.then(function (response) {
                                        if (response.data.replace(/"/g, "") == "1" || response.data.replace(/"/g, "") == "2") {
                                            count = count + 1;
                                            percentage = (count * 100 / $("table tbody tr").find("input[type='checkbox']:checked").length)

                                            $scope.favicongreen[i] = true;
                                            $scope.faviconred[i] = false;
                                            if (percentage == 100) {
                                                if (!showMsgBox('999', "Import", "Imported successfully.", "success", 'btn-success')) {
                                                    $scope.ClearControl(1);
                                                }
                                            }
                                        }
                                        else {
                                            $scope.favicongreen[i] = false;
                                            $scope.faviconred[i] = true;
                                        }
                                        $scope.faviconload[i] = false;
                                    });
                                }
                                if (i == $scope.MasterTableList.length - 1)
                                    $scope.disabledImport = false;
                            }, i * 1000);
                        });
                    }
                });
            }); /*If Close*/

        }

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
        debugger;
        $scope.SetFocus('#ddlSession');
        $scope.ToSessionId = "";
        $scope.ToFYId = "";
        $scope.BindMasterTableList();
        if (flag == 0) {
            showMsgBox('4');
        };
    }
}