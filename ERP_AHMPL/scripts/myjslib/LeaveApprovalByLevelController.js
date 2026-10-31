app.LeaveApprovalByLevelController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ApplicableDate');

    $scope.GetEmployeeData = function(Code)
    { 
       return $scope.EmployeesList.filter(x => x.EmployeeCode == Code);
    }

    $scope.GetFirstAuthDetail = function (Code) {
        $scope.FirstAuthDetail = $scope.GetEmployeeData(Code)
    }
    $scope.GetSeconedAuthDetail = function (Code) {
        $scope.SeconedAuthDetail = $scope.GetEmployeeData(Code)
    }

    $scope.GetEmployeeDetails = function ()
    {
        $scope.EmpDetails = $scope.GetEmployeeData($scope.EmployeeCode);
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.ExceptEmployeeCode = $scope.EmployeeCode;
        var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetEmployeeList', collectionobj);
        getData.then(function (response) {
            $scope.FirstEmployeesList = response.data.Table;
        });
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.TransId = $scope.hfId;
            collectionobj.EmployeeCode = $scope.EmployeeCode; 
            collectionobj.TypeOfApproval = $scope.TypeOfApproval;
            collectionobj.FirstApprovalAuthority = $scope.FirstAuthEmployeeCode;
            collectionobj.SeconedApprovalAuthority = $scope.TypeOfApproval=="Double"? $scope.SeconedAuthEmployeeCode:null;
            collectionobj.DateOfApplicable = moment($scope.ApplicableDate).format('YYYY-MMM-DD');
            collectionobj.SessionId = sessionId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertUpdateDeleteLeaveApprovalByLevel", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });

        }
    }

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.TransId = $scope.hfId;
        collectionobj.Action = 3;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.CreatedBy = userid
        collectionobj.UpdatedBy = userid

        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertUpdateDeleteLeaveApprovalByLevel", collectionobj);
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


        $scope.hfId = "";
        $scope.EmployeeCode = "";
        $scope.TypeOfApproval = "";
        $scope.FirstAuthEmployeeCode="";
        $scope.SeconedAuthEmployeeCode = "";
        $scope.ApplicableDate = "";
        $scope.EmpDetails = "";
        $scope.FirstEmployeesList = "";
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.hfId = "";
        $scope.SetFocus('#ApplicableDate');
        $scope.LeaveApprovalByLevelList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    };
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
       // debugger;
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/GetLevelApprovalByLevel", collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Applicable Date", "HeaderValue": "DateOfApplicable", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "EMP Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Designation", "HeaderValue": "DesignationName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Department", "HeaderValue": "DepartmentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Approval Type", "HeaderValue": "TypeOfApproval", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "First Authorized EMP", "HeaderValue": "FirstAuth", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Seconed Authorized EMP", "HeaderValue": "SeconedAuth", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            $scope.LeaveApprovalByLevelList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.LeaveApprovalByLevelList = $filter('filter')($scope.LeaveApprovalByLevelList, { 'TransID': $scope.hfId });
                $scope.EmployeeCode = $scope.LeaveApprovalByLevelList[0].EmployeeCode.toString();
                $scope.GetEmployeeDetails();
                $scope.FirstAuthEmployeeCode = $scope.LeaveApprovalByLevelList[0].FirstApprovalAuthority;
                $scope.SeconedAuthEmployeeCode = $scope.LeaveApprovalByLevelList[0].SeconedApprovalAuthority;
                $scope.GetFirstAuthDetail($scope.FirstAuthEmployeeCode); 
                $scope.GetSeconedAuthDetail($scope.SeconedAuthEmployeeCode); 
                $scope.ApplicableDate =new Date($scope.LeaveApprovalByLevelList[0].DateOfApplicable);
                $scope.TypeOfApproval = $scope.LeaveApprovalByLevelList[0].TypeOfApproval;
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ApplicableDate', true);
                $scope.hideLoader();
            });

        });

    };

    $scope.LeaveApprovalByLevelList = [];

    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
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
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
            ];
        $scope.PrintMaster(tblheader, $scope.LeaveApprovalByLevelList, window.document.title);
    };
}
