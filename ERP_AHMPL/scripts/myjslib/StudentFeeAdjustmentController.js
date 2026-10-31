app.StudentFeeAdjustmentController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlClass');
    $scope.viewspan = false;
    //$scope.datedisable = true;
    /* Save Button Click Event */
    $scope.GetStudentForFeeAdjustment = function (classcode) {
        if ($.fn.DataTable.isDataTable("#example2")) {
            $('#example2').dataTable().fnClearTable();
            $('#example2').dataTable().fnDestroy();
        }

        $scope.showLoader();
        var collectionobj = {};
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.InstallmentList = JSON.stringify($scope.InstallmentList);
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 5;
        var getData = myService.methode('POST', "../Api/FeeMasterApi/GetStudentForFeeAdjustment", collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Srno", "ShowColumn": "Yes"},
                    { "HeaderText": "Admission No.", "ShowColumn": "Yes" },
                    { "HeaderText": "Class", "ShowColumn": "Yes" },
                    { "HeaderText": "Student Name", "ShowColumn": "Yes" },
                    { "HeaderText": "Father Name", "ShowColumn": "No" },
                    { "HeaderText": "Installment", "ShowColumn": "Yes" },
                    { "HeaderText": "FeeHead", "ShowColumn": "Yes" },
                    { "HeaderText": "Due", "ShowColumn": "Yes" },
                    { "HeaderText": "Fee Structure (Old)", "ShowColumn": "Yes" },
                    { "HeaderText": "Concession (Old)", "ShowColumn": "Yes" },
                    { "HeaderText": "Applied Fee Structure (Old)", "ShowColumn": "Yes" },
                    { "HeaderText": "Fee Structure (New)", "ShowColumn": "Yes" },
                    { "HeaderText": "Concession (New)", "ShowColumn": "Yes" },
                    { "HeaderText": "Apply Fee Structure (New)", "ShowColumn": "Yes" },
                    { "HeaderText": "Adjustment (If Any)", "ShowColumn": "Yes" },
                    { "HeaderText": "Last Fee Group (Applied)", "ShowColumn": "No" },
                    { "HeaderText": "New Fee Group (Apply)", "ShowColumn": "No" }
                ];
            $scope.StudentList = response.data.Table;
            var listobj = $filter('filter')($scope.StudentList, { 'TypeofAdmission': $scope.TypeofAdmission, 'IsActive': $scope.IsActive, Flag: 1 });
            if (listobj.length > 0) {
                $scope.disableAdd = false;
                //$scope.viewspan = false;
            }
            else {
                $scope.disableAdd = true;
            }
            if (($filter('filter')($scope.StudentList, { 'TypeofAdmission': $scope.TypeofAdmission, 'IsActive': $scope.IsActive })).length == 0) {
                $scope.hideLoader();
            }
            if (($filter('filter')($scope.StudentList, { 'TypeofAdmission': $scope.TypeofAdmission, 'IsActive': $scope.IsActive })).length > 0) {
                var l = tblheader.length;
                for (var i = 0; i < l; i++) {
                    var val = tblheader[i]
                    var headertext = "Sr.No.";
                    if (val.HeaderText != "Id") {
                        headertext = val.HeaderText;
                    }
                    if (val.ShowColumn == "Yes") {
                        if ($('#anchor label').text() != '') {
                            if ($('#anchor label').text().indexOf(headertext) == -1) {
                                $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + (i+1) + ' checked><label class="">' + headertext + '</label> </div>');
                            }
                        }
                        else {
                            $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + (i+1) + ' checked><label class="">' + headertext + '</label></div>');
                        }

                    }
                    else {
                        if ($('#anchor label').text().indexOf(headertext) == -1) {
                            $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + (i+1) + '><label class="">' + headertext + '</label></div>');
                        }
                    }
                }
                $('#CollapseSearchTableList').attr('class', 'collapse in');
            }
        });
    }

    $scope.BindDataTable = function (flag) {
        var hideColumn = [5,16,17];
        var columnDefs = [];
        for (var i = 0; i < hideColumn.length; i++) {
            var val = hideColumn[i]
            columnDefs.push({
                "targets": [Number(val)],
                "visible": false
                //"searchable": false 
            })
        }
        if (flag) {
            setTimeout(function () {
                var table=$('#example2').DataTable({ retrieve: true, "columnDefs": columnDefs, });
                $('input.toggle-vis').on('change', function (e) {
                    e.preventDefault();
                    //Get the column API object
                    var column = table.column($(this).attr('data-column'));
                    //Toggle the visibility
                    column.visible(!column.visible());
                });
                $scope.hideLoader();
            }, 300)
        }
    }

    $scope.ddlClass_Change = function (classcode) {
        $scope.GetSections(classcode);
        $scope.GetStudentForFeeAdjustment();
    }
    $scope.ddlSection_change = function (classcode) {
        $scope.GetStudentForFeeAdjustment();
    }
    $scope.ddlStream_Change = function (classcode) {
        $scope.GetStudentForFeeAdjustment();
    }
    $scope.ddlChange_TypeofAdmission = function () {
        if ($.fn.DataTable.isDataTable("#example2")) {
            $('#example2').dataTable().fnClearTable();
            $('#example2').dataTable().fnDestroy();
        }
    }
    $scope.ddlChange_IsActive = function () {
        if ($.fn.DataTable.isDataTable("#example2")) {
            $('#example2').dataTable().fnClearTable();
            $('#example2').dataTable().fnDestroy();
        }
    }
    

    $scope.SaveRecord = function () {
        if (isValidate()) {
            if (($filter('filter')($scope.StudentList, { chk: true, 'TypeofAdmission': $scope.TypeofAdmission, 'IsActive': $scope.IsActive })).length > 0) {


                var collectionobj = {};
                collectionobj.Code = $scope.hfId;
                collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentList, { chk: true, 'TypeofAdmission': $scope.TypeofAdmission, 'IsActive': $scope.IsActive }));

                collectionobj.VDate = moment($scope.ToDate).format('DD-MMM-YYYY');
                collectionobj.ClassCode = $scope.ClassCode;
                collectionobj.SectionCode = $scope.SectionCode;
                collectionobj.StreamCode = $scope.StreamCode;
                collectionobj.InstallmentList = JSON.stringify($scope.InstallmentList);

                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                collectionobj.Action = "1";

                var getData = myService.methode('POST', '../Api/FeeTransactionApi/InsertUpdateDeleteStudentFeeAdjustment', collectionobj);
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

        $scope.GetStudentForFeeAdjustment();
        $scope.$parent.ClassCode = "";
        $scope.$parent.SectionCode = "";
        $scope.StreamCode = "";


        $scope.StudentList = [];

        $scope.IsActive = "1";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlInstallment');
        if (flag == 0) {
            showMsgBox('4');
        };
    };
   
   
}