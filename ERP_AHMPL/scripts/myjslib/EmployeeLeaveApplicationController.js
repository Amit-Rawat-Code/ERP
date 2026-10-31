app.EmployeeLeaveApplicationController = function ($scope, $element, $filter, myService)
{
    $scope.disableDelete = true;
    $scope.CLcounter = 0;
    $scope.ELcount = 0;
    $scope.MLcount = 0;
    $scope.SLcount = 0;

    $scope.BALCLcounter = 0;
    $scope.BALELcount = 0;
    $scope.BALMLcount = 0;
    $scope.BALSLcount = 0;

    $scope.ApprovedLeave = 0;
    $scope.TotalApprovedLeave = 0;
    $scope.TotalAllotedLeave = 0;
    $scope.TotalBalanceLeave = 0;
    $scope.TotalEL = 0;

    $scope.SetAllDatesDisplay = function ()
    {
        if ((($scope.ToDate != '') && (new Date($scope.ToDate) < new Date($scope.FromDate))) || ($scope.ToDate == ''))
        {
            $scope.AllDatesDiv = true;
        }
        else
        {
            $scope.AllDatesDiv = false;
        }
    }

    $scope.FillCountLeaveAccordingLeaveType = function (LeaveWiseDetailList) {

        var CLcounter = 0;
        var ELcount = 0;
        var MLcount = 0;
        var SLcount = 0;
        if (LeaveWiseDetailList.length > 0) {
            $.each(LeaveWiseDetailList, function (index, array) {

                if ((array.AbbrTypeIdEmployee == 4) && ($scope.LeaveFor == 'F'))
                {
                    CLcounter = CLcounter + 1;
                }
                else if (((array.AbbrTypeIdEmployee == 4)) && (($scope.LeaveFor == 'HDF') || ($scope.LeaveFor == 'HDS'))) {
                    CLcounter = CLcounter + .5;
                }
                else if (((array.AbbrTypeIdEmployee == 6)) && ($scope.LeaveFor == 'F')) {
                    ELcount = ELcount + 1;
                }
                else if (((array.AbbrTypeIdEmployee == 6)) && (($scope.LeaveFor == 'HDF') || ($scope.LeaveFor == 'HDS'))) {
                    ELcount = ELcount + .5;
                }
                else if (((array.AbbrTypeIdEmployee == 7)) && ($scope.LeaveFor == 'F')) {
                    MLcount = MLcount + 1;
                }
                else if (((array.AbbrTypeIdEmployee == 7)) && (($scope.LeaveFor == 'HDF') || ($scope.LeaveFor == 'HDS'))) {
                    MLcount = MLcount + .5;
                }
                else if (((array.AbbrTypeIdEmployee == 8)) && ($scope.LeaveFor == 'F')) {
                    SLcount = SLcount + 1;
                }
                else if (((array.AbbrTypeIdEmployee == 8)) && (($scope.LeaveFor == 'HDF') || ($scope.LeaveFor == 'HDS'))) {
                    SLcount = SLcount + .5;
                }
                else {
                    return;
                }
            });

            $scope.CLcounter = CLcounter;
            $scope.ELcount = ELcount;
            $scope.MLcount = MLcount;
            $scope.SLcount = SLcount;

            if ((($scope.CLcounter) <= ($scope.BALCLcounter)) && (($scope.ELcount) <= ($scope.BALELcount)) && (($scope.MLcount) <= ($scope.BALMLcount)) && (($scope.SLcount) <= ($scope.BALSLcount))) {
            }
            else {
                showMsgBox('Leave Type Taken Can Not Be Less Than Leave Type Balance.')
            }
        }
    };

    $scope.SetFocus('#ddlResponsibleEmployee');

    $scope.EmployeeValue = code;

    $scope.LeaveDetailList = function () {
        collectionObject = {};
        collectionObject.Action = 5;
        collectionObject.SessionId = sessionId;
        collectionObject.EmployeeCode = code;
        collectionObject.FYId = fyId;
        collectionObject.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/AttendanceTransactionApi/EmployeeAttendanceLeaveMasterList', collectionObject);
        getData.then(function (response) {
            $scope.LeaveDetails = response.data;
            $scope.DesignationCode = response.data[0]["DesignationCode"];
            $scope.DepartmentCode = response.data[0]["DepartmentCode"];
            $scope.TotalAllotedLeave = Number($scope.Sumoflist('LeaveDetails', 'AllotedLeaves'));
            $scope.TotalApprovedLeave = Number($scope.Sumoflist('LeaveDetails', 'LeaveTaken'));
            $scope.TotalBalanceLeave = $scope.TotalAllotedLeave - $scope.TotalApprovedLeave;

            $scope.BALCLcounter = Number($scope.Sumoflist(response.data, 'ElBalance', { LeaveShortName: 'CL' }));
            $scope.BALELcount = Number($scope.Sumoflist(response.data, 'ElBalance', { LeaveShortName: 'EL' }));
            $scope.BALMLcount = Number($scope.Sumoflist(response.data, 'ElBalance', { LeaveShortName: 'ML' }));
            //  $scope.BALSLcount = response.data[3]["Balance"];
        });
    };

    $scope.GetLeaveTypeFirst = function ()
    {
        var collectionobj = {};
        collectionobj.Action = '14';
        collectionobj.relationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDDLs', collectionobj);
        getData.then(function (response)
        {
            $scope.LeaveTypes = response.data;
        });
    };

    $scope.GetAllLeavesDates = function () {
        var collectionobj = {};
        collectionobj.Action = '16';
        collectionobj.LeaveFrom = moment($scope.FromDate).format('YYYY-MMM-DD');
        collectionobj.LeaveTo = moment($scope.ToDate).format('YYYY-MMM-DD');
        var getData = myService.methode('POST', '../Api/AttendanceTransactionApi/EmployeeAttendanceLeaveMasterList', collectionobj);
        getData.then(function (response) {
            $scope.AllLeavesDates = response.data;
            $scope.SetAllDatesDisplay();
        });
    };

    $scope.LeaveDetailList(userid);
    $scope.VoucherDate = new Date();
    $scope.$watch('VoucherDate', function () {
        if (typeof ($scope.VoucherDate) === 'undefined') return;
        var month = moment($scope.VoucherDate).month() + 1;
        var day = moment($scope.VoucherDate).date();
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

        else if ($scope.LeaveFor == 'F') {
            $('#txtLeaveTo').attr('max', "");
        }
    });
    //$scope.ddlLeaveType_Change = function () {
    //    if ((($scope.CLcounter) <= ($scope.BALCLcounter)) && (($scope.ELcount) <= ($scope.BALELcount)) && (($scope.MLcount) <= ($scope.BALMLcount)) && (($scope.SLcount) <= ($scope.BALSLcount))) {
    //    }
    //    else {
    //        showMsgBox('Leave Type Taken Can Not Be Less Than Leave Type Balance.')
    //    }
    //}

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
    $scope.SaveRecords = function (flag)
    {
        let a = moment($scope.FromDate);
        var b = moment($scope.ToDate);
        var days = b.diff(a, 'days');
        var datediff = (days) + 1;
        //if ($scope.TotalBalanceLeave > 0 && datediff <= $scope.TotalBalanceLeave)
        //{
            if ((($scope.CLcounter) <= ($scope.BALCLcounter)) && (($scope.ELcount) <= ($scope.BALELcount)) && (($scope.MLcount) <= ($scope.BALMLcount)) && (($scope.SLcount) <= ($scope.BALSLcount))) {
                var collectionobj = {};
                collectionobj.TransId = $scope.hfId;
                collectionobj.EmployeeCode = $scope.EmployeeValue;
                collectionobj.VDate = moment($scope.VoucherDate).format('YYYY-MMM-DD');
                collectionobj.DepartmentCode = $scope.DepartmentCode;
                collectionobj.DesignationCode = $scope.DesignationCode;
                collectionobj.LeaveFrom = moment($scope.FromDate).format('YYYY-MMM-DD');
                collectionobj.LeaveTo = moment($scope.ToDate).format('YYYY-MMM-DD');
                collectionobj.LeaveReason = $scope.LeaveReason;
                collectionobj.Remarks = $scope.Remarks;
                collectionobj.OnLeaveContactNo = $scope.OnLeaveContactNo;
                collectionobj.OnLeaveAddress = $scope.OnLeaveAddress;
                collectionobj.IsLeaveRecieved = 1;
                collectionobj.LeaveFor = $scope.LeaveFor;
                collectionobj.InAbsenceResponsibleEmployeeId = $scope.ResEmployeeValue;
                collectionobj.CommunicationPrefferedMode = $scope.CommunicationPrefferedMode;
                collectionobj.SessionId = sessionId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.IsApproved = 0;
                collectionobj.FYId = fyId;
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                collectionobj.LeaveApprovalStatusByDates = JSON.stringify($scope.AllLeavesDates);
                if ($scope.Save == "Save") {
                    collectionobj.Action = 1;
                }
                else {
                    collectionobj.Action = 2;
                }
                var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertUpdateDeleteEmployeeLeaveApplication", collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                showMsgBox('Leave Type Taken Can Not Be Less Than Leave Type Balance.')
            }
        //}
        //else {
        //    showMsgBox('Leave can not Application from more than balance leave.')
        //}
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
        $scope.SetAllDatesDisplay();
        if (flag == 0) {
            showMsgBox('4');
        };
    };


    $scope.SearchRecord = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.EmployeeCode = $scope.EmployeeValue;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/EmployeeAttendanceLeaveMasterList", collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    {
                        "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno"
                    },
                    { "HeaderText": "Application Date", "HeaderValue": "VoucherDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employee", "HeaderValue": "EmpName", "Value": "InAbsenceResponsibleEmployeeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Responsible Person", "HeaderValue": "ResName", "Value": "InAbsenceResponsibleEmployeeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Leave For", "HeaderValue": "LeaveFor", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Apply Leave From", "HeaderValue": "LeaveFrom", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Apply Leave To", "HeaderValue": "LeaveTo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Approved Dates", "HeaderValue": "ApvDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Rejected Dates", "HeaderValue": "RejDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Leave Reason", "HeaderValue": "LeaveReason", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Remarks", "HeaderValue": "Remarks", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Comm Mode", "HeaderValue": "CommunicationPrefferedMode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "On Leave ContactNo", "HeaderValue": "OnLeaveContactNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "On Leave Address", "HeaderValue": "OnLeaveAddress", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "First Approval Status", "Value": "FirstApprovalStatus", "HeaderValue": "FirstApprovalStatus", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Second Approval Status", "Value": "SecondApprovalStatus", "HeaderValue": "SecondApprovalStatus", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Final Status", "Value": "IsApproved", "HeaderValue": "Status", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function ()
            {
                $scope.showLoader();
                $scope.disableDelete = false;
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

                    var collectionobj = {};
                    collectionobj.Action = '17';
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.TransId = $scope.hfId;
                    var getData = myService.methode('POST', '../Api/AttendanceTransactionApi/EmployeeAttendanceLeaveMasterList', collectionobj);
                    getData.then(function (response)
                    {
                        $scope.AllLeavesDates = response.data;
                        $scope.SetAllDatesDisplay();
                    });

                    $scope.Save = "Edit";
                    $scope.SetFocus('#ddlResponsibleEmployee', true);
                }
                else
                {
                    showMsgBox('Only Pending leave can edit.');
                    $scope.ClearControl(1);
                }
                //$scope.$Application();

                $scope.$applyAsync();
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

    $scope.deleteRecord = function ()
    {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.TransId = $scope.hfId;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertUpdateDeleteEmployeeLeaveApplication", collectionobj);
        getData.then(function (response)
        {
            if (showMsgBox(response.data))
            {
                $scope.ResetControl();
                $scope.hideLoader();
            };
        });
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
        $scope.SearchRecord();
        return false;
    });
}