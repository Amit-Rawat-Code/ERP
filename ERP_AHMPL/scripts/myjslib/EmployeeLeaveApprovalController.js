app.EmployeeLeaveApprovalController = function ($scope, $element, $filter, myService)
{
   
    $scope.SetFocus('#txtVoucherDate');
    $scope.ApproveLeave = [];
    $scope.ApprovedLeave = 0;
    $scope.ApproveMaxLeave = 0;
    $scope.TotalApprovedLeave = 0;
    $scope.TotalAllotedLeave = 0;
    $scope.TotalBalanceLeave = 0;
    $scope.AFS = 'First';

    $scope.CLcounter = 0;
    $scope.ELcount = 0;
    $scope.MLcount = 0;
    $scope.SLcount = 0;

    $scope.BALCLcounter = 0;
    $scope.BALELcount = 0;
    $scope.BALMLcount = 0;
    $scope.BALSLcount = 0;


    $('#ddlDepartment').prop('disabled', true);
    $('#ddlDesignation').prop('disabled', true);
    $('#ddlEmployee').prop('disabled', true);
    $('#txtFromDate').prop('disabled', true);
    $('#txtToDate').prop('disabled', true);

    $scope.$watch('IsApproved', function () {
        if ($scope.IsApproved == 1) {
            $("#txtApprovedFrom").addClass('validate');
            $("#txtApprovedTo").addClass('validate');
        }
        else {
            $("#txtApprovedFrom").removeClass('validate');
            $("#txtApprovedTo").removeClass('validate');
        }
    });
    $scope.VoucherDate = new Date();
    $scope.$watch('FromDate', function () {

        var month = moment($scope.VoucherDate).month() + 1;
        var day = moment($scope.VoucherDate).date();
        var date = moment($scope.VoucherDate).year() + "-" + (month < 10 ? '0' + month : '' + month) + "-" + (day < 10 ? '0' + day : '' + day);
        $scope.minFromDate = date;
        //$('#txtLeaveFrom').attr('min', date);
    });
    $scope.$watch('ToDate', function () {
        var month = moment($scope.FromDate).month() + 1;
        var day = moment($scope.FromDate).date();
        var date = moment($scope.FromDate).year() + "-" + (month < 10 ? '0' + month : '' + month) + "-" + (day < 10 ? '0' + day : '' + day);
        $scope.minToDate = date;
        //$('#txtLeaveTo').attr('min', date);
    });
    $scope.$watch('LeaveFor', function () {
        if ($scope.LeaveFor == 'HDF' || $scope.LeaveFor == 'HDS') {
            var month = moment($scope.FromDate).month() + 1;
            var day = moment($scope.FromDate).date();
            var date = moment($scope.FromDate).year() + "-" + (month < 10 ? '0' + month : '' + month) + "-" + (day < 10 ? '0' + day : '' + day);
            $scope.minToDate = date;
            $scope.maxToDate = date;
            //$('#txtLeaveTo').attr('max', date);
        }

        else if ($scope.LeaveFor == 'F') {
            $scope.maxToDate = "";
            //$('#txtLeaveTo').attr('max', "");
        }
    });
    $scope.$watch('EmployeeValue', function () {
        if (typeof ($scope.EmployeeValue) === 'undefined') return;
        $scope.LeaveDetailList($scope.EmployeeValue);
    });

    $scope.GetLeaveTypeFirst = function () {
        var collectionobj = {};
        collectionobj.Action = '14';
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDDLs', collectionobj);
        getData.then(function (response) {
            $scope.LeaveTypes = response.data;
        });
    };
    $scope.GetLeaveTypeSecond = function () {
        var collectionobj = {};
        collectionobj.Action = '15';
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDDLs', collectionobj);
        getData.then(function (response) {
            $scope.LeaveTypess = response.data;
        });
    };

    $scope.GetBalanceLeave = function (balanceleave, index) {

        if (balanceleave < 0) {
            showMsgBox('Balance leave can not < 0')
            $scope.LeaveDetails[index].ApprovedLeave = 0;
        }
        else {
            $scope.ApprovedLeave = $scope.Sumoflist('LeaveDetails', 'ApprovedLeave', null, 0);

            if ($scope.ApprovedLeave > $scope.ApproveMaxLeave) {
                $scope.LeaveDetails[index].ApprovedLeave = 0;
                $scope.ApprovedLeave = $scope.Sumoflist('LeaveDetails', 'ApprovedLeave', null, 0);
                showMsgBox('Maximum ' + $scope.ApproveMaxLeave + ' leave can approve.')
            }
        }

        $('#txtLeaveType_0').removeClass('red-validation');
    }

    $scope.EnableDisable = function () {
        //If TextBox is disabled it will be enabled and vice versa.
        $scope.IsDisabled = !$scope.SecondIsApproved;
    }

    $scope.GetAllLeaveDates = function ()
    {
        $scope.EmpAttendanceId = "";
        var querystring = window.location.href.split("?");
        if (querystring.length > 1)
        {
            $scope.TransId = querystring[1].split('=')[1];
            $scope.collectionObject = {};
            $scope.collectionObject["Action"] = 14;
            $scope.collectionObject["TransId"] = $scope.TransId;
            $scope.collectionObject["RelationshipId"] = relationshipId;
            $scope.collectionObject["SessionId"] = sessionId;
            var getData = myService.methode('POST', '../Api/AttendanceTransactionApi/EmployeeAttendanceLeaveMasterList', $scope.collectionObject);
            getData.then(function (response) {
                $scope.AllLeavesDates = response.data;
            });
        }
    };

    $scope.FillCountLeaveAccordingLeaveType = function (LeaveWiseDetailList)
    {
        var CLcounter = 0;
        var ELcount = 0;
        var MLcount = 0;
        var SLcount = 0;
        if (LeaveWiseDetailList.length > 0)
        {
            $.each(LeaveWiseDetailList, function (index, array)
            {
                if ((array.AbbrTypeIdFirst == 4) && ($scope.LeaveFor == 'F') && (array.FirstIsApproved != 2))
                {
                    CLcounter = CLcounter + 1;
                }
                else if (((array.AbbrTypeIdFirst == 4)) && (($scope.LeaveFor == 'HDF') && (array.FirstIsApproved != 2) || ($scope.LeaveFor == 'HDS')))
                {
                    CLcounter = CLcounter + .5;
                }
                else if (((array.AbbrTypeIdFirst == 6)) && ($scope.LeaveFor == 'F') && (array.FirstIsApproved != 2))
                {
                    ELcount = ELcount + 1;
                }
                else if (((array.AbbrTypeIdFirst == 6)) && (($scope.LeaveFor == 'HDF') && (array.FirstIsApproved != 2) || ($scope.LeaveFor == 'HDS')))
                {
                    ELcount = ELcount + .5;
                }
                else if (((array.AbbrTypeIdFirst == 7)) && ($scope.LeaveFor == 'F') && (array.FirstIsApproved != 2))
                {
                    MLcount = MLcount + 1;
                }
                else if (((array.AbbrTypeIdFirst == 7)) && (($scope.LeaveFor == 'HDF') && (array.FirstIsApproved != 2) || ($scope.LeaveFor == 'HDS')))
                {
                    MLcount = MLcount + .5;
                }
                else if (((array.AbbrTypeIdFirst == 8)) && ($scope.LeaveFor == 'F') && (array.FirstIsApproved != 2))
                {
                    SLcount = SLcount + 1;
                }
                else if (((array.AbbrTypeIdFirst == 8)) && (($scope.LeaveFor == 'HDF') && (array.FirstIsApproved != 2) || ($scope.LeaveFor == 'HDS')))
                {
                    SLcount = SLcount + .5;
                }
                else
                {
                    return;
                }
            });

            $scope.CLcounter = CLcounter;
            $scope.ELcount = ELcount;
            $scope.MLcount = MLcount;
            $scope.SLcount = SLcount;

            $scope.ApprovedLeave = CLcounter + ELcount + MLcount + SLcount;
            $scope.LeaveDetails[0].ApprovedLeave = CLcounter.toString();
            $scope.LeaveDetails[1].ApprovedLeave = ELcount;
            $scope.LeaveDetails[2].ApprovedLeave = MLcount;
            $scope.LeaveDetails[3].ApprovedLeave = SLcount;
        }
    };
    $scope.FillCountLeaveAccordingLeaveTypeSecond = function (LeaveWiseDetailList)
    {
        var CLcounter = 0;
        var ELcount = 0;
        var MLcount = 0;
        var SLcount = 0;
        if (LeaveWiseDetailList.length > 0) {

            $.each(LeaveWiseDetailList, function (index, array)
            {
                if ((array.AbbrTypeIdSecond == 4) && ($scope.LeaveFor == 'F'))
                {
                    CLcounter = CLcounter + 1;
                }
                else if ((array.AbbrTypeIdSecond == 4) && (($scope.LeaveFor == 'HDF') || ($scope.LeaveFor == 'HDS'))) {
                    CLcounter = CLcounter + .5;
                }
                else if ((array.AbbrTypeIdSecond == 6) && ($scope.LeaveFor == 'F')) {
                    ELcount = ELcount + 1;
                }
                else if ((array.AbbrTypeIdSecond == 6) && (($scope.LeaveFor == 'HDF') || ($scope.LeaveFor == 'HDS'))) {
                    ELcount = ELcount + .5;
                }
                else if ((array.AbbrTypeIdSecond == 7) && ($scope.LeaveFor == 'F')) {
                    MLcount = MLcount + 1;
                }
                else if ((array.AbbrTypeIdSecond == 7) && (($scope.LeaveFor == 'HDF') || ($scope.LeaveFor == 'HDS'))) {
                    MLcount = MLcount + .5;
                }
                else if ((array.AbbrTypeIdSecond == 8) && ($scope.LeaveFor == 'F')) {
                    SLcount = SLcount + 1;
                }
                else if ((array.AbbrTypeIdSecond == 8) && (($scope.LeaveFor == 'HDF') || ($scope.LeaveFor == 'HDS'))) {
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
            $scope.ApprovedLeave = CLcounter + ELcount + MLcount + SLcount;
            $scope.LeaveDetails[0].ApprovedLeave = CLcounter;
            $scope.LeaveDetails[1].ApprovedLeave = ELcount;
            $scope.LeaveDetails[2].ApprovedLeave = MLcount;
            $scope.LeaveDetails[3].ApprovedLeave = SLcount;
        }
    };

    $scope.CheckLeaveRejectStatusFirst = function (Index, RowIndex, ApprovedDetails, obj)
    {
        if (obj != null)
        {
            if (obj.FirstIsApproved == 2)
            {
                obj.AbbrTypeIdFirst = "";
                $scope.FillCountLeaveAccordingLeaveType($scope.AllLeavesDates);
            }
        }
           
        //if (ApprovedDetails.length != Index)
        //{
        //    var BeforeIndex = RowIndex - 1;
        //    var AfterIndex = RowIndex + 1;
        //    var StatusBeforeIndex = null;
        //    var StatusAfterIndex = null;
        //    $.each(ApprovedDetails, function (index, array)
        //    {          
        //        if ((index == BeforeIndex))
        //        {
        //            StatusBeforeIndex = array.FirstIsApproved;
        //        }
        //        if (index == AfterIndex)
        //        {
        //            StatusAfterIndex = array.FirstIsApproved;
        //        }
        //    });
        //    if ((StatusBeforeIndex == 1) && (StatusAfterIndex = 1))
        //    {
        //        alert('Rejection can not be in middle from Leave From And Leave To.');
        //        ApprovedDetails[RowIndex].FirstIsApproved = '1';
        //    }
        //}
    };
    $scope.CheckLeaveRejectStatusSecond = function (Index, RowIndex, ApprovedDetails, obj)
    {
        if (obj != null)
        {
            if (obj.SecondIsApproved == 2)
            {
                obj.AbbrTypeIdSecond = "";
                $scope.FillCountLeaveAccordingLeaveTypeSecond($scope.AllLeavesDates);
            }
        }
        //if (ApprovedDetails.length != Index)
        //{
        //    var BeforeIndex = RowIndex - 1;
        //    var AfterIndex = RowIndex + 1;
        //    var StatusBeforeIndex = null;
        //    var StatusAfterIndex = null;
        //    $.each(ApprovedDetails, function (index, array)
        //    {
        //        if (array.SecondIsApproved == 2)
        //        {
        //            if ((index == BeforeIndex)) {
        //                StatusBeforeIndex = array.SecondIsApproved;
        //            }
        //            if (index == AfterIndex) {
        //                StatusAfterIndex = array.SecondIsApproved;
        //            }
        //        }
        //    });
        //    if ((StatusBeforeIndex == 1) && (StatusAfterIndex = 1))
        //    {
        //        return alert('Rejection can not be in middle from Leave From And Leave To.');
        //        ApprovedDetails[RowIndex].SecondIsApproved = '1';
        //    }
        //}
    };

    $scope.SaveRecord = function (flag) {
        if (flag == 1) {
            $scope.SaveRecords(flag);
        }
        else {
            submitConfirmbox("do u want to final submit for leave?", function () { $scope.SaveRecords(0); });
        }
    };

    $scope.SaveRecords = function (flag) {
        
        if (isValidate())
        {
            
            //if ($scope.TotalBalanceLeave > 0 && datediff <= $scope.TotalBalanceLeave)
            //{

            //if ($scope.ApprovedLeave > 0)
            //{
                //if (datediff == $scope.ApprovedLeave)
                //{
                if ((($scope.CLcounter) <= ($scope.BALCLcounter)) && (($scope.ELcount) <= ($scope.BALELcount)) && (($scope.MLcount) <= ($scope.BALMLcount)) && (($scope.SLcount) <= ($scope.BALSLcount)))
                {
                    var collectionobj = {};
                    //var EmpAttendanceId = "";
                    var querystring = window.location.href.split("?");
                    collectionobj.TransId = querystring[1].split('=')[1];
                    collectionobj.VDate = moment($scope.VoucherDate).format('YYYY-MMM-DD');
                    //collectionobj.LeaveTypeCode = $scope.AbbrTypeId;
                    collectionobj.DepartmentCode = $scope.DepartmentCode;
                    collectionobj.DesignationCode = $scope.DesignationCode;
                    collectionobj.EmployeeCode = $scope.EmployeeValue;
                    collectionobj.ApprovedByEmployeCode = code;
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
                    if ($scope.IsApproved == 1) {
                        collectionobj.ApprovedFrom = moment($scope.ApprovedFrom).format('YYYY-MMM-DD');
                        collectionobj.ApprovedTo = moment($scope.ApprovedTo).format('YYYY-MMM-DD');
                    }
                    else {
                        collectionobj.ApprovedFrom = '';
                        collectionobj.ApprovedTo = '';
                    }
                    collectionobj.IsActive = $scope.IsActive;
                    collectionobj.IsApproved = $scope.IsApproved;
                    collectionobj.SessionId = sessionId;
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.FYId = fyId;
                    collectionobj.ApprovedBy = userid;
                    collectionobj.LeaveTypeCode = JSON.stringify($scope.LeaveDetails);
                    collectionobj.LeaveApprovalStatusByDates = JSON.stringify($scope.AllLeavesDates);
                    if ($scope.Save == "Save") {
                        collectionobj.Action = 1;
                    }
                    else {
                        collectionobj.TransId = $scope.hfId;
                        collectionobj.Action = 2;
                    }
                    var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertUpdateDeleteEmployeeLeaveApplication", collectionobj);
                    getData.then(function (response) {
                        if (showMsgBox(response.data)) {
                            $scope.ClearControl(1);
                        }
                    });
                    // }
                    //else if ($scope.ApprovedLeave == '0.5' && datediff == 1)
                    //{
                    //    var collectionobj = {};
                    //    //var EmpAttendanceId = "";
                    //    var querystring = window.location.href.split("?");
                    //    collectionobj.TransId = querystring[1].split('=')[1];
                    //    collectionobj.VDate = moment($scope.VoucherDate).format('YYYY-MMM-DD');
                    //    //collectionobj.LeaveTypeCode = $scope.AbbrTypeId;
                    //    collectionobj.DepartmentCode = $scope.DepartmentCode;
                    //    collectionobj.DesignationCode = $scope.DesignationCode;
                    //    collectionobj.EmployeeCode = $scope.EmployeeValue;
                    //    collectionobj.ApprovedByEmployeCode = code;
                    //    collectionobj.LeaveFrom = moment($scope.FromDate).format('YYYY-MMM-DD');
                    //    collectionobj.LeaveTo = moment($scope.ToDate).format('YYYY-MMM-DD');
                    //    collectionobj.LeaveReason = $scope.LeaveReason;
                    //    collectionobj.Remarks = $scope.Remarks;
                    //    collectionobj.OnLeaveContactNo = $scope.OnLeaveContactNo;
                    //    collectionobj.OnLeaveAddress = $scope.OnLeaveAddress;
                    //    collectionobj.IsLeaveRecieved = 1;
                    //    collectionobj.LeaveFor = $scope.LeaveFor;
                    //    collectionobj.InAbsenceResponsibleEmployeeId = $scope.ResEmployeeValue;
                    //    collectionobj.CommunicationPrefferedMode = $scope.CommunicationPrefferedMode;
                    //    if ($scope.IsApproved == 1) {
                    //        collectionobj.ApprovedFrom = moment($scope.ApprovedFrom).format('YYYY-MMM-DD');
                    //        collectionobj.ApprovedTo = moment($scope.ApprovedTo).format('YYYY-MMM-DD');
                    //    }
                    //    else {
                    //        collectionobj.ApprovedFrom = '';
                    //        collectionobj.ApprovedTo = '';
                    //    }
                    //    collectionobj.IsActive = $scope.IsActive;
                    //    collectionobj.IsApproved = $scope.IsApproved;
                    //    collectionobj.SessionId = sessionId;
                    //    collectionobj.RelationshipId = relationshipId;
                    //    collectionobj.FYId = fyId;
                    //    collectionobj.ApprovedBy = userid;
                    //    collectionobj.LeaveTypeCode = JSON.stringify($scope.LeaveDetails);
                    //    collectionobj.LeaveApprovalStatusByDates = JSON.stringify($scope.AllLeavesDates);

                    //    if ($scope.Save == "Save") {
                    //        collectionobj.Action = 1;
                    //    }
                    //    else {
                    //        collectionobj.TransId = $scope.hfId;
                    //        collectionobj.Action = 2;
                    //    }
                    //    var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertUpdateDeleteEmployeeLeaveApplication", collectionobj);
                    //    getData.then(function (response) {
                    //        if (showMsgBox(response.data)) {
                    //            $scope.ClearControl(1);
                    //        }
                    //    });
                }
                else
                {
                    showMsgBox('Leave Type Taken Can Not Be Less Than Leave Type Balance.')
                }
            //}
            //else
            //{
            //    showMsgBox('Diff . of Leave Approve From and Leave Approve To should equal to Total Approve Leave')
            //    $('#txtLeaveType_0').addClass('red-validation');
            //    $('#txtLeaveType_0').focus();
            //}
            //else
            //{
            //    showMsgBox('Please fill values in leave type textbox.')
            //    $('#txtLeaveType_0').addClass('red-validation');
            //    $('#txtLeaveType_0').focus();
            //}

            //}

            //}
            //else {
            //    showMsgBox('Leave can not apply from more than balance leave.')
        }
    };


    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        if (confirm("Do you want to delete this record?")) {
           
            var collectionobj = {};
            collectionobj.Action = 3;
            var querystring = window.location.href.split("?");
            collectionobj.TransId = querystring[1].split('=')[1];
            collectionobj.VoucherDate = $scope.VoucherDate;
            collectionobj.LeaveTypeCode = $scope.LeaveTypeCode;
            collectionobj.DepartmentCode = $scope.DepartmentCode;
            collectionobj.DesignationCode = $scope.DesignationCode;
            collectionobj.EmployeeCode = $scope.EmployeeValue;
            collectionobj.LeaveFrom = $scope.FromDate;
            collectionobj.LeaveTo = $scope.ToDate;
            collectionobj.UpdatedBy = userid
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertEditEmployeeAttendance", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    window.location.href = 'EmployeeLeaveList';
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

        $scope.Save = "Approved";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        if ($scope.IsAdd === true || $scope.IsEdit === true) {
            $scope.disableAdd = false;
        }
        $scope.hfId = "";
        $scope.VoucherDate = "";
        $scope.SetFocus('#txtVoucherDate');
        $scope.ResEmployeeValue = "";
        $scope.LeaveFor = "";
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.LeaveReason = "";
        $scope.Remarks = "";
        $scope.CommunicationPrefferedMode = "";
        $scope.OnLeaveContactNo = "";
        $scope.OnLeaveAddress = "";
        //$scope.AbbrTypeId = "";
        $scope.ApprovedFrom = "";
        $scope.IsApproved = "";
        $scope.ApprovedTo = "";

        $scope.GetEmployeeLeaveDetail();
        if (flag == 0) {
            showMsgBox('4');
        } else {
            window.location.href = "../AttendanceTransaction/EmployeeLeaveList";
        }
    };

    $scope.LeaveDetailList = function (EmployeeCode)
    {
        $scope.collectionObject = {};
        $scope.collectionObject["Action"] = 10;
        $scope.collectionObject["RelationshipId"] = relationshipId;
        $scope.collectionObject["SessionId"] = sessionId;
        $scope.collectionObject["EmployeeCode"] = EmployeeCode;
        $scope.collectionObject["FYId"] = fyId;
        var getData = myService.methode('POST', '../Api/AttendanceTransactionApi/EmployeeAttendanceLeaveMasterList', $scope.collectionObject);
        getData.then(function (response)
        {
            $scope.LeaveDetails = response.data;
            $scope.TotalAllotedLeave = Number($scope.Sumoflist('LeaveDetails', 'AllotedLeaves'));
            $scope.TotalApprovedLeave = Number($scope.Sumoflist('LeaveDetails', 'LeaveTaken'));
            $scope.TotalBalanceLeave = $scope.TotalAllotedLeave - $scope.TotalApprovedLeave;

            $scope.BALCLcounter = Number($scope.Sumoflist(response.data, 'Balance', { LeaveShortName: 'CL' }));
            $scope.BALELcount = Number($scope.Sumoflist(response.data, 'Balance', { LeaveShortName: 'EL' }));
            $scope.BALMLcount = Number($scope.Sumoflist(response.data, 'Balance', { LeaveShortName: 'ML' }));
            //$scope.BALSLcount = response.data[3]["Balance"] == 'undefined' ? 0 : response.data[3]["Balance"];
            
            $scope.FillCountLeaveAccordingLeaveType($scope.AllLeavesDates);
            //$scope.FillCountLeaveAccordingLeaveTypeSecond($scope.AllLeavesDates);
        });
    };

    $scope.EmployeeLeaveList = function ()
    {
        $scope.collectionObject = {};
        $scope.collectionObject["Action"] = 7;
        $scope.collectionObject["RelationshipId"] = relationshipId;
        $scope.collectionObject["SessionId"] = sessionId;
        $scope.collectionObject["FYId"] = fyId;
        $scope.collectionObject["EmployeeCode"] = code;
        var getData = myService.methode('POST', '../Api/AttendanceTransactionApi/EmployeeAttendanceLeaveMasterList', $scope.collectionObject);
        getData.then(function (response) {

            $scope.EmployeeLeaveLists = response.data;
        });
    };
    $scope.EmployeeLeaveApprovalLists = [];
    $scope.SearchApprovedRecord = function ()
    {
        debugger
        var collectionobj = {};
        collectionobj.Action = 21;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.EmployeeCode = code;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/EmployeeAttendanceLeaveMasterList", collectionobj);
        getData.then(function (response)
        {
            var tblheader =
                [
                    {
                        "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno"
                    },
                    { "HeaderText": "Date", "HeaderValue": "VoucherDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employee", "HeaderValue": "EmpName", "Value": "InAbsenceResponsibleEmployeeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Responsible Emp", "HeaderValue": "ResName", "Value": "InAbsenceResponsibleEmployeeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "Leave Type", "Value": "AbbrTypeId", "HeaderValue": "AbbrType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
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
                ];
            $scope.EmployeeLeaveApprovalLists = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            debugger
            $('#example tbody').on('dblclick', 'tr', function ()
            {
                debugger
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.EmployeeLeaveApprovalLists = $filter('filter')($scope.EmployeeLeaveApprovalLists, { 'TransId': $scope.hfId });
                debugger
                var collectionobj = {};
                collectionobj.Action = 22;
                collectionobj.TransId = $scope.EmployeeLeaveApprovalLists[0].EmployeeCode.toString();
                collectionobj.EmployeeCode = code;                
                var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/EmployeeAttendanceLeaveMasterList", collectionobj);
                getData.then(function (response)
                {
                    debugger
                    if (response.data.length>0)
                    {
                        debugger
                        window.location.href = '/AttendanceTransaction/EmployeeLeaveApproval?TransId=' + $scope.hfId;
                    }
                });
            });
        });
    };
    $scope.SearchRecord = function ()
    {
        debugger
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.EmployeeCode = $scope.EmployeeValue;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/EmployeeAttendanceLeaveMasterList", collectionobj);
        getData.then(function (response)
        {
            var tblheader =
                [
                    {
                        "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno"
                    },
                    { "HeaderText": "Date", "HeaderValue": "VoucherDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employee", "HeaderValue": "EmpName", "Value": "InAbsenceResponsibleEmployeeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Responsible Emp", "HeaderValue": "ResName", "Value": "InAbsenceResponsibleEmployeeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "Leave Type", "Value": "AbbrTypeId", "HeaderValue": "AbbrType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Leave For", "HeaderValue": "LeaveFor", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Leave From", "HeaderValue": "LeaveFrom", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Leave To", "HeaderValue": "LeaveTo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    //{ "HeaderText": "Approved From", "HeaderValue": "ApprovedFrom", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "Approved To", "HeaderValue": "ApprovedTo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Leave Reason", "HeaderValue": "LeaveReason", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Remarks", "HeaderValue": "Remarks", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Comm Mode", "HeaderValue": "CommunicationPrefferedMode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "On Leave ContactNo", "HeaderValue": "OnLeaveContactNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "On Leave Address", "HeaderValue": "OnLeaveAddress", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Status", "Value": "IsApproved", "HeaderValue": "Status", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function ()
            {
                debugger
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ResEmployeeValue = $(this).find('input[type="hidden"]#hdResName').val();
                $scope.VoucherDate = new Date(moment(row[1], 'DD-MM-YYYY'));
                
                //$scope.AbbrTypeId = $(this).find('input[type="hidden"]#hdAbbrType').val();
                $scope.LeaveFor = row[4];
                $scope.FromDate = new Date(moment(row[5], 'DD-MM-YYYY'));
                $scope.ToDate = new Date(moment(row[6], 'DD-MM-YYYY'));
                $scope.ApprovedFrom = new Date(moment(row[7], 'DD-MM-YYYY'));
                $scope.ApprovedTo = new Date(moment(row[8], 'DD-MM-YYYY'));
                $scope.LeaveReason = row[9];
                //$scope.Remarks = row[10];
                $scope.CommunicationPrefferedMode = row[9];
                $scope.OnLeaveContactNo = row[10];
                $scope.OnLeaveAddress = row[11];
                $scope.IsApproved = $(this).find('input[type="hidden"]#hdStatus').val();

                if ($scope.IsApproved == "1")
                {
                    showMsgBox('Only Pending leave can edit.');
                    $scope.disableAdd = true;                    
                }
                else
                {
                    if ($scope.IsEdit === true)
                    {
                        $scope.disableAdd = false;
                    }
                }

                $scope.Save = "Approved";
                $scope.$applyAsync();
                $('#simplemodal-close').click();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtVoucherDate', true);
                $scope.hideLoader();
            });
        });
    };

    $scope.GetEmployeeLeaveDetail = function ()
    {
        $scope.EmpAttendanceId = "";
        var querystring = window.location.href.split("?");
        if (querystring.length > 1)
        {
            $scope.TransId = querystring[1].split('=')[1];
            $scope.collectionObject = {};
            $scope.collectionObject["Action"] = 8;
            $scope.collectionObject["TransId"] = $scope.TransId;
            $scope.collectionObject["RelationshipId"] = relationshipId;
            $scope.collectionObject["SessionId"] = sessionId;
            $scope.collectionObject["FYId"] = fyId;
            $scope.collectionObject["EmployeeCode"] = code;
            var getData = myService.methode('POST', '../Api/AttendanceTransactionApi/EmployeeAttendanceLeaveMasterList', $scope.collectionObject);
            getData.then(function (response)
            {
                $scope.EmployeeLeaveDetail = response.data;
                $scope.hfId = response.data[0]["TransId"].toString();
                $scope.VoucherDate = new Date(moment(response.data[0]["VDate"], 'YYYY-MM-DD'));
                $scope.AFS = response.data[0]["EmployeeApprovalLevel"];
                $scope.EmployeeValue = response.data[0]["EmployeeCode"];
                $scope.EmployeeCode = $scope.EmployeeValue;
                $scope.DesignationCode = response.data[0]["DesignationCode"];
                $scope.DepartmentCode = response.data[0]["DepartmentCode"];
                //$scope.AbbrTypeId = response.data[0]["LeaveTypeCode"].toString();
                $scope.LeaveFor = response.data[0]["LeaveFor"];
                $scope.FromDate = new Date(moment(response.data[0]["LeaveFrom"], 'YYYY-MM-DD'));
                $scope.ToDate = new Date(moment(response.data[0]["LeaveTo"], 'YYYY-MM-DD'));
                $scope.MinFromDate = moment($scope.FromDate).format('YYYY-MM-DD');
                $scope.MinToDate = moment($scope.ToDate).format('YYYY-MM-DD');
                //$scope.ApproveMaxLeave = ($scope.LeaveFor == "F" ? 1 : .5) * (($scope.ToDate.getDate() - $scope.FromDate.getDate()) + 1);
                let a = moment($scope.FromDate);
                var b = moment($scope.ToDate);
                var days = b.diff(a, 'days');
                $scope.ApproveMaxLeave = ($scope.LeaveFor == "F" ? 1 : .5) * (days + 1);
                $scope.LeaveReason = response.data[0]["LeaveReason"];
                //$scope.Remarks = response.data[0]["Remarks"];
                $scope.OnLeaveContactNo = response.data[0]["OnLeaveContactNo"];
                $scope.OnLeaveAddress = response.data[0]["OnLeaveAddress"];
                $scope.CommunicationPrefferedMode = response.data[0]["CommunicationPrefferedMode"];
                //$scope.ResEmployeeValue = response.data[0]["InAbsenceResponsibleEmployeeId"].toString();
                $scope.IsApproved = (response.data[0]["IsApproved"].toString());
                if (response.data[0]["ApprovedFrom"] != null && response.data[0]["ApprovedTo"] != null) {
                    $scope.ApprovedFrom = new Date(moment(response.data[0]["ApprovedFrom"], 'YYYY-MM-DD'));
                    $scope.ApprovedTo = new Date(moment(response.data[0]["ApprovedTo"], 'YYYY-MM-DD'));
                }
                
                $scope.Save = "Approved";
                $scope.hideLoader();

            });
        }
        

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
        collectionobj.EmployeeCode = $scope.EmployeeValue;
        collectionobj.LeaveFrom = $scope.FromDate;
        collectionobj.LeaveTo = $scope.ToDate;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', "../Api/AttendanceTransactionApi/InsertEditEmployeeAttendanceLeaveMaster", collectionobj);
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

    $scope.LBSVTM = function (flag) {
        if (flag == 1) {
            $("#ApllyLeavebox1, #ApllyLeavebox2").css("display", "none");
            $("#LeaveBalanceStatusViewOnly").css("display", "block");
        }
        else {
            $("#LeaveBalanceStatusViewOnly").css("display", "none");
            $("#ApllyLeavebox1, #ApllyLeavebox2").css("display", "block");
        }
    };
}