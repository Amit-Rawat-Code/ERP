app.MonthlySchoolReportController = function ($scope, $element, $filter, myService) {
    $scope.StaffTeachingReportList = [];
    $scope.StaffOthersReportList1 = [];
    $scope.StaffOthersReportList2 = [];
    $scope.StaffOthersReportList3 = [];
    $scope.StudentsStrengthReportList1 = [];
    $scope.StudentsStrengthReportList2 = [];
    $scope.LeaveDetailTeacherList = [];
    $scope.LeaveDetailNonTeacherList = [];
    $scope.ColumnList = [];

    $scope.GetSchools = function () {

        var collectionobj = {};
        collectionobj.Action = '1';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/MISReportApi/GetMISReport', collectionobj);
        getData.then(function (response) {
            $scope.SchoolList = response.data;
        });
    };

    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }        
    };
    $scope.started = function () {                
        var collectionobj = {};
        if ($scope.SchName != undefined && $scope.StaffStrength == 'true') {
            $scope.showLoader();
            $scope.StffStr = false;
            collectionobj.Action = 4;
            collectionobj.RelationshipId = $scope.SchName;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReport", collectionobj);
            getData.then(function (response) {
                if (response.data != null && response.data.length > 0) {
                    var tblHeader = [];
                    $scope.TeachingdynamicHeader = Object.keys(response.data[0]);
                    tblHeader = GetHeaderList($scope.TeachingdynamicHeader);                    
                }
                $scope.StaffTeachingHeaderList = tblHeader;
                $scope.StaffTeachingReportList = response.data;
                $scope.hideLoader();
            });
            collectionobj = {};
            collectionobj.Action = 5;
            collectionobj.RelationshipId = $scope.SchName;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReport", collectionobj);
            getData.then(function (response) {
                if (response.data != null && response.data.length > 0) {
                    var tblheader = [];
                    $scope.StaffdynamicHeader = Object.keys(response.data[0]);
                    tblheader = GetHeaderList($scope.StaffdynamicHeader);                    
                }
                $scope.StaffHeaderList = tblheader;
                $scope.StaffReportList = response.data;
                $scope.hideLoader();
            });
        }
        else
        {
            $scope.StffStr = true;
        }
        if ($scope.SchName != undefined && $scope.CwStudentStrength == 'true') {
            $scope.showLoader();
            $scope.StStr = false;
            collectionobj = {};
            collectionobj.Action = 8;
            collectionobj.RelationshipId = $scope.SchName;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReport", collectionobj);
            getData.then(function (response) {
                var tblheader = [];
                if (response.data != null && response.data.length > 0) {
                    $scope.dynamicHeader = Object.keys(response.data[0]);
                    tblheader = GetHeaderList($scope.dynamicHeader);
                }
                $scope.HeaderDataList = tblheader;
                $scope.DataList = response.data;
                $scope.hideLoader();
            });            
        }
        else
        {
            $scope.StStr = true;
        }
        if ($scope.SchName != undefined && $scope.QwOutstandingFee == 'true') {
            //debugger
            $scope.showLoader();
            $scope.OutstandingFee = false;
            collectionobj = {};
            collectionobj.Action = 9;
            collectionobj.RelationshipId = $scope.SchName;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReports", collectionobj);
            getData.then(function (response) {
                debugger
                $scope.TBLOutFee = true;
                $scope.TBLOutFee1 = true;
                $scope.TotOut1 = true;
                $scope.TotOut2 = true;
                var HH;
                var TT1 = 0;
                var TT2 = 0;
                var tblheaderOutFee = [];
                if ((response.data.Table != null || response.data.Table1 != null) && (response.data.Table.length > 0 || response.data.Table1.length > 0)) {
                    if (response.data.Table.length > 0) {
                        HH = response.data.Table[0];
                    }
                    else
                    {
                        HH = response.data.Table1[0];
                    }
                    $scope.dynamicHeader = Object.keys(HH);

                    $.each($scope.dynamicHeader, function (index, val) {
                        if (index < $scope.dynamicHeader.length) {
                            var thtext = val.replace('"', '').replace('"', '')
                            tblheaderOutFee.push(
                                { "HeaderText": thtext, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                            )
                        }

                    });
                }
                if (response.data.Table.length) {
                    TT1 = parseFloat(response.data.Table[0].Total);
                    $scope.TBLOutFee = false;
                }
                if (response.data.Table1.length) {
                    TT2 = parseFloat(response.data.Table1[0].Total);
                    $scope.TBLOutFee1 = false;
                }
                if ($scope.TBLOutFee == false && $scope.TBLOutFee1 == false)
                {
                    $scope.TotOut2 = false;
                }
                else if ($scope.TBLOutFee == true && $scope.TBLOutFee1 == false)
                {
                    $scope.TotOut2 = false;
                }
                else if ($scope.TBLOutFee == false && $scope.TBLOutFee1 == true)
                {
                    $scope.TotOut1 = false;
                }
                $scope.HeaderDataListOutFee = tblheaderOutFee;
                $scope.DataListOutFee = response.data.Table;
                $scope.DataListOutFee1 = response.data.Table1;
                $scope.TotalOutstandingAmt = TT1 + TT2;
                $scope.hideLoader();
            });
        }
        else {
            $scope.OutstandingFee = true;
        }
        if ($scope.SchName != undefined && $scope.LDTeachingStaff == 'true') {
            debugger
            $scope.showLoader();
            $scope.LeaveDetailTeacher = false;
            collectionobj = {};
            collectionobj.Action = 10;
            collectionobj.RelationshipId = $scope.SchName;
            collectionobj.ToDate = moment(($scope.FromDate)).format('YYYY-MM-DD');
            collectionobj.Year = moment(($scope.FromDate)).format('YYYY');
            collectionobj.Month = moment(($scope.FromDate)).format('MM');
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReport", collectionobj);
            getData.then(function (response) {
                if (response.data != null && response.data.length > 0) {
                    $scope.LeaveDetailTeacherList = response.data;
                }
                $scope.hideLoader();
            });
        }
        else
        {
            $scope.LeaveDetailTeacher = true;
        }
        if ($scope.SchName != undefined && $scope.LDNonTeachingStaff == 'true') {
            $scope.showLoader();
            $scope.LeaveDetailNonTeacher = false;
            collectionobj = {};
            collectionobj.Action = 11;
            collectionobj.RelationshipId = $scope.SchName;
            collectionobj.ToDate = moment(($scope.FromDate)).format('YYYY-MM-DD');
            collectionobj.Year = moment(($scope.FromDate)).format('YYYY');
            collectionobj.Month = moment(($scope.FromDate)).format('MM');
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReport", collectionobj);
            getData.then(function (response) {
                if (response.data != null && response.data.length > 0) {
                    $scope.LeaveDetailNonTeacherList = response.data;
                }
                $scope.hideLoader();
            });
        }
        else {
            $scope.LeaveDetailNonTeacher = true;
        }
        if ($scope.SchName != undefined && $scope.DetailsOfNewAdmissions == 'true') {
            //debugger            
            $scope.showLoader();
            collectionobj = {};
            collectionobj.Action = 12;
            collectionobj.RelationshipId = $scope.SchName;
            collectionobj.Year = moment(($scope.FromDate)).format('YYYY');
            collectionobj.Month = moment(($scope.FromDate)).format('MM');
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReports", collectionobj);
            getData.then(function (response) {
                //debugger
                if (response.data.Table != null && response.data.Table.length > 0) {
                    $scope.DetailsOfNewAdmissionsList1 = response.data.Table;
                    $scope.DetailsOfNewAdmissionsList2 = response.data.Table1;
                    $scope.DetailsOfNewAdmissionsLayout = false;
                }
                else
                {
                    $scope.DetailsOfNewAdmissionsLayout = true;
                }
                $scope.hideLoader();
            });
        }
        else {
            $scope.DetailsOfNewAdmissionsLayout = true;
        }
        if ($scope.SchName != undefined && $scope.RequirementOfNewStaff == 'true') {
            //debugger            
            $scope.showLoader();
            collectionobj = {};
            collectionobj.Action = 13;
            collectionobj.RelationshipId = $scope.SchName;
            collectionobj.Year = moment(($scope.FromDate)).format('YYYY');
            collectionobj.Month = moment(($scope.FromDate)).format('MM');
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReport", collectionobj);
            getData.then(function (response) {
                //debugger
                if (response.data.length > 0) {
                    $scope.RequirementOfNewStaffList = response.data;
                    $scope.RequirementOfNewStaffLayout = false;
                }
                else
                {
                    $scope.RequirementOfNewStaffLayout = true;
                }
                $scope.hideLoader();
            });
        }
        else {
            $scope.RequirementOfNewStaffLayout = true;
        }
        if ($scope.SchName != undefined && $scope.StudentWithdrawl == 'true') {
            //debugger            
            $scope.showLoader();
            collectionobj = {};
            collectionobj.Action = 16;
            collectionobj.RelationshipId = $scope.SchName;
            collectionobj.Year = moment(($scope.FromDate)).format('YYYY');
            collectionobj.Month = moment(($scope.FromDate)).format('MM');
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReport", collectionobj);
            getData.then(function (response) {
                //debugger
                if (response.data.length > 0) {
                    $scope.StudentWithdrawalList = response.data;
                    $scope.StudentWithdrawalsLayout = false;
                }
                else {
                    $scope.StudentWithdrawalsLayout = true;
                }
                $scope.hideLoader();
            });
        }
        else {
            $scope.StudentWithdrawalsLayout = true;
        }
        if ($scope.SchName != undefined && $scope.TeacherNontLeftDetails == 'true') {
            debugger
            $scope.showLoader();
            collectionobj = {};
            collectionobj.Action = 15;
            collectionobj.RelationshipId = $scope.SchName;
            collectionobj.Year = moment(($scope.FromDate)).format('YYYY');
            collectionobj.Month = moment(($scope.FromDate)).format('MM');
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReports", collectionobj);
            getData.then(function (response) {
                debugger
                if (response.data.Table != null && response.data.Table.length > 0) {
                    $scope.ThNthLeftList = response.data.Table;
                    $scope.CountThNthStaff = response.data.Table1;
                    $scope.ThNthLeftLayout = false;
                }
                else {
                    $scope.ThNthLeftLayout = true;
                }
                $scope.hideLoader();
            });
        }
        else {
            $scope.ThNthLeftLayout = true;
        }
        if ($scope.SchName != undefined && $scope.AppointmentNewStaff == 'true') {
            debugger
            $scope.showLoader();
            collectionobj = {};
            collectionobj.Action = 17;
            collectionobj.RelationshipId = $scope.SchName;
            collectionobj.Year = moment(($scope.FromDate)).format('YYYY');
            collectionobj.Month = moment(($scope.FromDate)).format('MM');
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReports", collectionobj);
            getData.then(function (response) {
                debugger
                if (response.data.Table != null && response.data.Table.length > 0) {
                    $scope.ApptNewStaffList = response.data.Table;
                    $scope.CountApptNewStaff = response.data.Table1;
                    $scope.ApptNewStaffLayout = false;
                }
                else {
                    $scope.ApptNewStaffLayout = true;
                }
                $scope.hideLoader();
            });
        }
        else {
            $scope.ThNthLeftLayout = true;
        }
        var school = $filter('filter')($scope.SchoolList, { RelationshipId: $scope.SchName });
        messagevalues = [
            { "Select School": school[0].BranchName +'-'+ school[0].BranchAddress},
            { "As On Month / Year": moment($scope.FromDate).format('DD-MMM-YYYY') }
        ];
        var message = "";
        var seprator = "";
        var filter = "<span class='filter' ></span> ";
        var j = 0;
        if (messagevalues.length > 0)
            $.each(messagevalues, function (i, values) {

                $.each(values, function (key, val) {
                    j = j + 1;
                    if (val != null && val != "") {
                        if (j == 3) {
                            message = message + "</br>"
                            j = 0;
                        }
                        else { message = message + seprator + filter; }
                        message = message + "<span class='filter-title-name' >" + key + "</span> : <span class='filter-title'>" + val + "</span>"
                        seprator = ", ";

                        filter = "";
                    };
                });
            });
        if (message.length > 0) {
            message = '' + message + '';
        }
        $('#FilterTitle').html(message);
        $(".section-toggle").slideToggle('slow');
        $(".filter-toggle").css("display", "block");

        $('.refresh-container').fadeOut(2000);
    }    

    function GetHeaderList(HeaderList) {
        var tblheader = [];
        $.each(HeaderList, function (index, val) {
            if (index < HeaderList.length - 1) {
                var thtext = val.replace('"', '').replace('"', '')
                tblheader.push(
                    { "HeaderText": thtext, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                )
            }            
        });
        return tblheader;
    }
}