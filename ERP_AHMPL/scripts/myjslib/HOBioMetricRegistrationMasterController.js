app.HOBioMetricRegistrationMasterController = function ($scope, $element, $filter, myService) {
    $scope.loginAs = sessionStorage.getItem('loginAs');
    if ($scope.loginAs == 'HO') {
        $scope.namesList = [
            {
                Value: 'School',
                Name: 'School',
            },
            {
                Value: 'H.O.',
                Name: 'H.O.',
            }
        ];
    }
    else {
        $scope.namesList = [
            {
                Value: 'School',
                Name: 'School',
            }
        ];
    }
    $scope.GetHOEmployee = function () {
        $scope.AllBranchNameList = {};
        var collectionobj = {};
        collectionobj.Action = "1";
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetHOBioMetricRegistrationMaster', collectionobj);
        getData.then(function (response) {
            $scope.HOEmployeeList = response.data;
        });
    }
    $scope.EmpAllocationOnChange = function () {
        $scope.BioMatricMachineList = {};
        if ($scope.EmpAllocation == 'H.O.') {
            $scope.BranchName = true;
            $scope.GetHOEmployee();
            $scope.GetAllHOBiometricMachine();
        }
        else {
            $scope.GetAllBranch();
        }
    }
    $scope.GetAllBranch = function () {
        $scope.BranchName = false;
        $scope.HOEmployeeList = {};
        var collectionobj = {};
        collectionobj.Action = "10";
        if ($scope.loginAs == 'HO') {
            collectionobj.RelationshipId = null;
        }
        else {
            collectionobj.RelationshipId = relationshipId;
        }
        var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetHOBioMetricRegistrationMaster', collectionobj);
        getData.then(function (response) {
            $scope.AllBranchNameList = response.data;
        });
    }
    $scope.GetAllEmployeeByBranchCode = function () {
        if ($scope.EmpAllocation == 'School') {
            $scope.BranchName = false;
            $scope.HOEmployeeList = {};
            var collectionobj = {};
            collectionobj.Action = "11";
            collectionobj.SessionId = sessionId;
            collectionobj.RelationshipId = $scope.RelationshipId;
            var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetHOBioMetricRegistrationMaster', collectionobj);
            getData.then(function (response) {
                $scope.HOEmployeeList = response.data;
            });
        }
    }
    $scope.GetEmployeeDetailByEmployeeCode = function () {
        var collectionobj = {};
        collectionobj.Action = "2";
        collectionobj.Code = $scope.HOEmployee;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetHOBioMetricRegistrationMaster', collectionobj);
        getData.then(function (response) {
            $scope.EmployeeName = response.data[0]["Name"];
            $scope.FatherName = response.data[0]["FatherName"];
            $scope.Contact = response.data[0]["ContactNo"];
            $scope.Address = response.data[0]["PermanentAddress"];
            $scope.EmployeePhotoPath = response.data[0]["EmployeePhotoPath"];
        });
    }
    $scope.GetAllHOBiometricMachine = function () {
        var collectionobj = {};
        collectionobj.Action = "3";
        var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetHOBioMetricRegistrationMaster', collectionobj);
        getData.then(function (response) {
            $scope.BioMatricMachineList = response.data;
        });
    }
    $scope.GetAllBranchBiometricMachine = function () {
        if ($scope.EmpAllocation == 'School') {
            var collectionobj = {};
            collectionobj.Action = "12";
            collectionobj.RelationshipId = $scope.RelationshipId;
            var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetHOBioMetricRegistrationMaster', collectionobj);
            getData.then(function (response) {
                $scope.BioMatricMachineList = response.data;
            });
        }
    }   
    $scope.SaveRecord = function () {
        if (isValidate()) {
            if ($filter('filter')($scope.BioMatricMachineList, { 'Chk': true }, true).length > 0) {

                var collectionobj = {};
                collectionobj.Code = $scope.HOEmployee;
                collectionobj.BiometricEmpDetails = JSON.stringify($filter('filter')($scope.BioMatricMachineList, { 'Chk': true }, true));
                collectionobj.RelationshipId = relationshipId;

                if ($scope.Save == "Save") {
                    collectionobj.CreatedBy = userid;
                    collectionobj.Action = "4";
                }
                else if ($scope.Save == "Edit") {
                    collectionobj.UpdatedBy = userid;
                    collectionobj.Action = "7";
                }

                var getData = myService.methode('POST', '../Api/EmployeeMasterApi/InsertUpdateDeleteHOBioMetricRegistrationMaster', collectionobj);
                getData.then(function (response)
                {
                    if (showMsgBox(response.data))
                    {
                        $scope.ClearControl(1);
                    }

                });
            }
            else {
                showMsgBox("Select Atleast One Machine.");
            }
        }
    };
    $scope.ClearControl = function (flag)
    {
        if (flag == 1)
        {
            $scope.ResetControl(flag);
        }
        else
        {
            clearConfirmbox("do u want to clear field?", function () { $scope.ResetControl(0); });
        }
    };
    $scope.ResetControl = function (flag)
    {
        $scope.Save = "Save";
        $scope.HOEmployee = "";
        $scope.EmpAllocation = "";
        $scope.RelationshipId = "";
        $scope.EmployeeName = '';
        $scope.FatherName = '';
        $scope.Contact = '';
        $scope.Address = '';
        $scope.BioMatricMachineList = {};
        $scope.EmployeePhotoPath = '';
        if (flag == 0)
        {
            showMsgBox('4');
        };
        $scope.$applyAsync();
    }

    $scope.HOBioMetricMachineList = [];
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {
        $scope.BioMatricMachineList = {};
        var collectionobj = {};
        collectionobj.Action = "5";
        if ($scope.loginAs == 'HO') {
            collectionobj.RelationshipId = null;
        }
        else {
            collectionobj.RelationshipId = relationshipId;
        }
        var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetHOBioMetricRegistrationMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "EmployeeCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Employee Name", "Value": "EmpName", "HeaderValue": "EmpName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch Name", "HeaderValue": "BranchName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            $scope.HOBioMetricMachineList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.HOBioMetricMachineList = $filter('filter')($scope.HOBioMetricMachineList, { 'hfId': $scope.EmployeeCode });
                var collectionobj = {};
                collectionobj.Action = "6";
                collectionobj.Code = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                $scope.HOEmployee = $scope.hfId;
                if ($scope.EmpAllocation == 'H.O.') {
                    collectionobj.UpdatedBy = 1;
                }
                else {
                    collectionobj.UpdatedBy = 0;
                }
                var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetHOBioMetricRegistrationMaster', collectionobj);
                getData.then(function (response) {
                    $scope.BioMatricMachineList = response.data;
                    $.each($scope.BioMatricMachineList, function (index, obj1) {
                        if (obj1.Chk == 1) {
                            obj1.RecordsGet = true;
                        }
                    })
                    $scope.$applyAsync();
                });
                var collectionobj1 = {};
                collectionobj1.Action = "9";
                collectionobj1.Code = $scope.hfId;
                collectionobj1.SessionId = sessionId;
                collectionobj1.RelationshipId = relationshipId;
                var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetHOBioMetricRegistrationMaster', collectionobj1);
                getData.then(function (response) {
                    $scope.EmpAllocation = response.data[0].EmpAllocation;
                    if ($scope.EmpAllocation == 'H.O.') {
                        $scope.HOEmployeeList = response.data;
                        $scope.GetEmployeeDetailByEmployeeCode();
                        $scope.BranchName = true;
                    }
                    else {
                        $scope.BranchName = false;
                        $scope.AllBranchNameList = response.data;
                        $scope.HOEmployeeList = response.data;
                        $scope.RelationshipId = response.data[0].RelationshipId.toString();
                        $scope.GetEmployeeDetailByEmployeeCode();
                    }
                });
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
            });
        });
    };
    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "8";
        collectionobj.Code = $scope.HOEmployee;
        collectionobj.BiometricEmpDetails = JSON.stringify($filter('filter')($scope.BioMatricMachineList, { 'Chk': true }, true));
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertEditEmployeeAttendanceDateWise", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
}