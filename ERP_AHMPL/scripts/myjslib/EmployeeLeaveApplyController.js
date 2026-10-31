app.EmployeeLeaveApplyController = function ($scope, $element, myService) {
    $scope.TotalApprovedLeave = 0;
    $scope.TotalAllotedLeave = 0;
    $scope.TotalBalanceLeave = 0;

    $scope.SetFocus('#ddlResponsibleEmployee');

    $scope.EmployeeValue = sessionStorage.getItem('code');
    //alert($scope.Code);
   
    var userid = sessionStorage.getItem("userid");

    $scope.$watch('userid', function () {
        
        //if (typeof ($scope.EmployeeValue) === 'undefined') return;
        $scope.LeaveDetailList(userid);
        //$('#btnSearch').prop('disabled', true);
    });
    //$scope.$watch('Code', function () {
    //    if (typeof ($scope.Code) === 'undefined') return;        
    //    if (sessionStorage.getItem("loginTypeId") != 4) return;
    //    $scope.EmployeeValue = $scope.Code;
    //});

    $scope.VoucherDate = new Date();
    $scope.$watch('VoucherDate', function () {
        if (typeof ($scope.VoucherDate) === 'undefined') return;
        var month = moment($scope.VoucherDate).month() + 1;
        var day=moment($scope.VoucherDate).date();
        var date = moment($scope.VoucherDate).year() + "-" + (month < 10 ? '0' + month : '' + month) + "-" + (day < 10 ? '0' + day : '' + day);
        $scope.LeaveFrom = new Date(date);
        $('#txtLeaveFrom').attr('min', date);
    });
    $scope.$watch('LeaveFrom', function () {
        if (typeof ($scope.LeaveFrom) === 'undefined') return;
        var month = moment($scope.LeaveFrom).month() + 1;
        var day = moment($scope.LeaveFrom).date();
        var date = moment($scope.LeaveFrom).year() + "-" + (month < 10 ? '0' + month : '' + month) + "-" + (day < 10 ? '0' + day : '' + day);
        $scope.LeaveTo = new Date(date);
        $('#txtLeaveTo').attr('min', date);
    });
    $scope.$watch('LeaveFor', function () {
        if (typeof ($scope.LeaveFor) === 'undefined') return;
        if ($scope.LeaveFor == 'HDF' || $scope.LeaveFor == 'HDS') {
            var month = moment($scope.LeaveFrom).month() + 1;
            var day = moment($scope.LeaveFrom).date();
            var date = moment($scope.LeaveFrom).year() + "-" + (month < 10 ? '0' + month : '' + month) + "-" + (day < 10 ? '0' + day : '' + day);
            $scope.LeaveTo = new Date(date);
            $('#txtLeaveTo').attr('max', date);
        }
      
        else if ($scope.LeaveFor == 'F')
        {
            $('#txtLeaveTo').attr('max', "");
        }
    });
    $scope.SaveRecord = function (flag) {
        if (isValidate()) {
            if (flag == 1) {
                $scope.SaveRecords(flag);
            }
            else {
                submitConfirmbox("do u want to final submit for leave?", function () { $scope.SaveRecords(0); });
            }
        }
    };
    $scope.SaveRecords = function (flag) {       
            if ($scope.TotalBalanceLeave > 0 &&
                (($scope.ToDate.getDate() - $scope.FromDate.getDate()) + 1) <= $scope.TotalBalanceLeave) {


                var collectionobj = {};
                collectionobj.EmpAttendanceId = $scope.hfId;
                collectionobj.EmployeeCode = $scope.EmployeeValue;
                collectionobj.VoucherDate = $scope.VoucherDate;
                collectionobj.DepartmentId = $scope.DepartmentValue;
                collectionobj.DesignationId = $scope.DesignationValue;
                collectionobj.LeaveFrom = $scope.FromDate;
                collectionobj.LeaveTo = $scope.ToDate;
                collectionobj.LeaveReason = $scope.LeaveReason;
                collectionobj.Remarks = $scope.Remarks;
                collectionobj.OnLeaveContactNo = $scope.OnLeaveContactNo;
                collectionobj.OnLeaveAddress = $scope.OnLeaveAddress;
                collectionobj.IsLeaveRecieved = 1;
                collectionobj.LeaveFor = $scope.LeaveFor;
                collectionobj.InAbsenceResponsibleEmployeeId = $scope.ResEmployeeValue;
                collectionobj.CommunicationPrefferedMode = $scope.CommunicationPrefferedMode;
                collectionobj.IsActive = $scope.IsActive;
                collectionobj.SessionId = sessionId;
                collectionobj.SchoolCode = schoolCode;
                collectionobj.BranchCode = branchCode;
                collectionobj.IsApproved = 0;
                collectionobj.FYId = fyId;
                collectionobj.CreatedBy = JSON.parse(userid);
                collectionobj.UpdatedBy = JSON.parse(userid);

                if ($scope.Save == "Save") {
                    collectionobj.Action = 1;
                }
                else {
                    collectionobj.Action = 2;
                }
                var getData = myService.methode('POST', "../Attendance/InsertEditEmployeeAttendanceLeaveMaster", '{obj:' + JSON.stringify(collectionobj) + '}');
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                showMsgBox('Leave can not apply from more than balance leave.')
            }
        }

    $('#ddlDepartment').prop('disabled', true);
    $('#ddlDesignation').prop('disabled', true);
    $('#ddlEmployee').prop('disabled', true);
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
        $scope.hfId = "";
        $scope.VoucherDate = new Date();
        $scope.SetFocus('#ddlResponsibleEmployee');
        $scope.ResEmployeeValue = "";
        $scope.AbbrTypeId = "";
        $scope.LeaveFor = "";
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.LeaveReason = "";
        $scope.Remarks = "";
        $scope.CommunicationPrefferedMode = "";
        $scope.OnLeaveContactNo = "";
        $scope.OnLeaveAddress = "";

        if (flag == 0) {
            showMsgBox('4');
        };
    };
    $scope.Code = sessionStorage.getItem("code");
    $scope.LeaveDetailList = function () {
        debugger;
        $scope.collectionObject = {};
        $scope.collectionObject["Action"] = 5;
        $scope.collectionObject["BranchCode"] = branchCode;
        $scope.collectionObject["SchoolCode"] = schoolCode;
        $scope.collectionObject["SessionId"] = sessionId;
        $scope.collectionObject["EmployeeCode"] = $scope.Code;
        $scope.collectionObject["FYId"] = fyId;
        var getData = myService.methode('POST', '../Attendance/EmployeeAttendanceLeaveMasterList', '{obj:' + JSON.stringify($scope.collectionObject) + '}');
        getData.then(function (response) {
            debugger;
            $scope.LeaveDetails = response.data;
            $scope.DesignationValue = response.data[0]["DesignationId"];
            $scope.DepartmentValue = response.data[0]["DepartmentId"];
            $scope.TotalAllotedLeave = response.data[0]["TotalAllotedLeave"];
            $scope.TotalApprovedLeave = response.data[0]["TotalApprovedLeave"];
    

            $scope.TotalBalanceLeave = $scope.TotalAllotedLeave - $scope.TotalApprovedLeave;
        });
    };

    $scope.SearchRecord = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.FYId = fyId;
        collectionobj.EmployeeCode = sessionStorage.getItem('code');

        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "../Attendance/EmployeeAttendanceLeaveMasterList", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            debugger;
            var tblheader =
                [
                    {
                        "HeaderText": "Sr.No.", "Value": "EmpAttendanceId", "HeaderValue": "EmpAttendanceId", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno"
                    },
                    { "HeaderText": "Date", "HeaderValue": "VoucherDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employee", "HeaderValue": "EmpName", "Value": "InAbsenceResponsibleEmployeeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Responsible Emp", "HeaderValue": "ResName", "Value": "InAbsenceResponsibleEmployeeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Leave For", "HeaderValue": "LeaveFor", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Leave From", "HeaderValue": "LeaveFrom", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Leave To", "HeaderValue": "LeaveTo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Approved From", "HeaderValue": "ApprovedFrom", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Approved To", "HeaderValue": "ApprovedTo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Leave Reason", "HeaderValue": "LeaveReason", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Remarks", "HeaderValue": "Remarks", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Comm Mode", "HeaderValue": "CommunicationPrefferedMode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "On Leave ContactNo", "HeaderValue": "OnLeaveContactNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "On Leave Address", "HeaderValue": "OnLeaveAddress", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Is Approved", "Value": "IsApproved", "HeaderValue": "Status", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                debugger;
                var row = $('#example').DataTable().row(this).data();
                if ($(this).find('input[type="hidden"]#hdStatus').val() == "0")
                {
                    $scope.hfId = $(this).find('input[type="hidden"]').val();
                    $scope.VoucherDate = new Date(moment(row[1], 'DD-MM-YYYY'));
                    $scope.ResEmployeeValue = $(this).find('input[type="hidden"]#hdResName').val();
                
                    $scope.LeaveFor = row[4];
                    $scope.FromDate = new Date(moment(row[5], 'DD-MM-YYYY'));
                    $scope.ToDate = new Date(moment(row[6], 'DD-MM-YYYY'));

                    $scope.LeaveReason = row[9];
                    $scope.Remarks = row[10];
                    $scope.CommunicationPrefferedMode = row[11];
                    $scope.OnLeaveContactNo = row[12];
                    $scope.OnLeaveAddress = row[13];


                    $scope.Save = "Edit";

                    $scope.SetFocus('#ddlResponsibleEmployee', true);
                }
                else
                {
                    showMsgBox('Only Pending leave can edit.');
                    $scope.ClearControl(1);
                }
                $scope.$apply();

                $('#simplemodal-close').click();

                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

           
                $scope.hideLoader();
            });
        });

    };

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 3;      
        collectionobj.VoucherDate = $scope.VoucherDate;
        collectionobj.EmpAttendanceId = $scope.hfId;
        collectionobj.LeaveTypeId = $scope.LeaveTypeId;
        collectionobj.DepartmentId = $scope.DepartmentValue;
        collectionobj.DesignationId = $scope.DesignationValue;
        collectionobj.EmployeeCode = $scope.EmployeeValue;
        collectionobj.LeaveFrom = $scope.FromDate;
        collectionobj.LeaveTo = $scope.ToDate;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', "../Attendance/InsertEditEmployeeAttendanceLeaveMaster", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ResetControl();
                $scope.hideLoader();
            };
        });
    };

    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
        var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
        var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
        var loadingAnim = panelToRefresh.find('.loading-progress');
        panelToRefresh.show();
        setTimeout(function () {
            loadingAnim.addClass('la-animate');
        }, 100);
        $scope.SearchRecord();
        return false;
    });
}