app.StudentFeeStructureMappingController = function ($scope, $element, $filter, $compile, myService) {
    $scope.SetFocus('#ddlClass');
    /* Save Button Click Event */
    $scope.visibleSearch = false;
    $scope.visiblePrint = false;
    $scope.SessionId = sessionId;

    $scope.ddlSession_Change = function () {
        $scope.FinalStudentsList(null, $scope.SessionId);
        $scope.disableDelete = false;
    }
    $scope.ddlClass_Change = function (classcode) {
        $scope.GetSections(classcode);
        $scope.FinalStudentsList(null, $scope.SessionId);
        $scope.disableDelete = false;
    }
    $scope.ddlSection_change = function (classcode) {
        $scope.FinalStudentsList(null, $scope.SessionId);
        $scope.disableDelete = false;
    }
    $scope.ddlStream_Change = function (classcode) {
        $scope.FinalStudentsList(null, $scope.SessionId);
        $scope.disableDelete = false;
    }
   
    $scope.SaveRecord = function () {
        if (isValidate()) {
            if (($filter('filter')($scope.StudentList, { chk: true, 'TypeofAdmission': $scope.TypeofAdmission, 'IsActive': $scope.IsActive })).length > 0) {


                var collectionobj = {};
                collectionobj.Code = $scope.hfId;
                collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentList, { chk: true, 'TypeofAdmission': $scope.TypeofAdmission, 'IsActive': $scope.IsActive }));

                collectionobj.ClassCode = $scope.ClassCode;
                collectionobj.SectionCode = $scope.SectionCode;
                collectionobj.StreamCode = $scope.StreamCode;

                collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroupCode;
                collectionobj.Flag = $scope.IsFeeStructureNotApplicable;

                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                collectionobj.Action = "1";

                var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteStudentFeeStructureDetails', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                showMsgBox('Sorry, Select at least one student.');
            }
        }
    };
    $scope.DeleteRecord = function () {
        if (loginTypeId == '1') {
            $scope.CheckFeeDepositDetails();
        }
        else {
            $scope.ConfirmBeforeDelete();
        }

    };

    $scope.ConfirmBeforeDelete = function () {
        swal({
            title: "Do you want delete records(s) permanently?",
            text: 'Records(s) can not be recovered.<br><div class="col-md-12 col-sm-12 col-xs-12 mgbt-xs-15"><div class= "input-box"><input type="checkbox" id="IsDeleteLedger" onchange="angular.element(document).scope().ChkDeleteLedger()" ng-model="IsDeleteLedger" ng-init="IsDeleteLedger=false" /><label for="IsDeleteLedger" style="color: black;margin: 4px 0px 0px 4px;"> Delete With Ledger</label><div class="text-box-msg-r"></div></div></div>',
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: 'btn-warning',
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false,
            html: $compile('<br><div class="col-md-12 col-sm-12 col-xs-12 mgbt-xs-15"><div class= "input-box"><input type="checkbox" id="IsDeleteLedger" ng-model="IsDeleteLedger" onchange="angular.element(document).scope().ChkDeleteLedger()" ng-init="IsDeleteLedger=false" /><label for="IsDeleteLedger" style="color: black;margin: 4px 0px 0px 4px;"> Delete With Ledger</label><div class="text-box-msg-r"></div></div></div>')($scope)
        }, $scope.deleteRecord)
    }

    $scope.ChkDeleteLedger = function () {
        $scope.IsDeleteLedger = !$scope.IsDeleteLedger;
        $scope.$applyAsync();
    }
    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Code = $scope.hfId;
        collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentList, { chk: true, 'TypeofAdmission': $scope.TypeofAdmission, 'IsActive': $scope.IsActive }));

        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;

        collectionobj.IsDelete = $scope.IsDeleteLedger;

        collectionobj.Action = "3";
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteStudentFeeStructureDetails', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    $scope.CheckFeeDepositDetails = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentList, { chk: true, 'TypeofAdmission': $scope.TypeofAdmission, 'IsActive': $scope.IsActive }));
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFeeDepositDetailsFromStudentFeeStructureForm', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.FeeDepositDetails = response.data;
                $('#FeeDepositDetails').modal('show');
            }
            else {
                $scope.ConfirmBox();
            }
        });
    }

    $scope.ConfirmBox = function () {
        swal({
            title: "Do you want delete records(s) permanently?",
            text: 'Records(s) can not be recovered.<br><div class="col-md-12 col-sm-12 col-xs-12 mgbt-xs-15"><div class= "input-box"><input type="checkbox" id="IsDeleteLedger" onchange="angular.element(document).scope().ChkDeleteLedger()" ng-model="IsDeleteLedger" ng-init="IsDeleteLedger=false" /><label for="IsDeleteLedger" style="color: black;margin: 4px 0px 0px 4px;"> Delete With Ledger</label><div class="text-box-msg-r"></div></div></div>',
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: 'btn-warning',
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false,
            html: $compile('<br><div class="col-md-12 col-sm-12 col-xs-12 mgbt-xs-15"><div class= "input-box"><input type="checkbox" id="IsDeleteLedger" ng-model="IsDeleteLedger" onchange="angular.element(document).scope().ChkDeleteLedger()" ng-init="IsDeleteLedger=false" /><label for="IsDeleteLedger" style="color: black;margin: 4px 0px 0px 4px;"> Delete With Ledger</label><div class="text-box-msg-r"></div></div></div>')($scope)
        }, $scope.DeleteRecordAfterSAdminConfirm)
    }

    $scope.DeleteRecordAfterSAdminConfirm = function () {
        var collectionobj = {};
        collectionobj.Code = $scope.hfId;
        collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentList, { chk: true, 'TypeofAdmission': $scope.TypeofAdmission, 'IsActive': $scope.IsActive }));
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.IsDelete = $scope.IsDeleteLedger;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/DeleteRecordAfterSAdminConfirm', collectionobj);
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

        $scope.$parent.ClassCode = "";
        $scope.$parent.SectionCode = "";
        $scope.StreamCode = "";
        $scope.FeeStructureGroupCode = "";
        $scope.IsFeeStructureNotApplicable = false;

        $scope.StudentList = [];

        $scope.IsActive = "1";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlInstallment');
        if (flag == 0) {
            showMsgBox('4');
        };
    };
   
   
}