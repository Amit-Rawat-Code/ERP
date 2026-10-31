app.EmployeeAttendancePunchLogInAndOutReportController = function ($scope, $element, $filter, myService)
{
    debugger
    $scope.FromDates = new Date(); 
    $scope.type = 1; 
    
    $scope.rdShowBranches = function ()
    {
        debugger
        if ($scope.type == 1)
        {
            $scope.ActionAccordingRadioButton = 18;
        }
        else
        {
            $scope.ActionAccordingRadioButton = 1;
        }
    }
    $scope.rdShowBranches();
    $scope.SearchRecord = function ()
    {
        $('#ddlSection').removeClass('validate');
        if (isValidate())
        {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };
    $scope.timeobject = function (t)
    {
        a = t.replace('AM', '').replace('PM', '').split(':');
        h = parseInt(a[0]);
        m = parseInt(a[1]);
        ampm = (t.indexOf('AM') !== -1) ? 'AM' : 'PM';
        return { hour: h, minute: m, ampm: ampm };
    }
    $scope.timediff = function (s, e)
    {
        s = $scope.timeobject(s);
        e = $scope.timeobject(e);
        e.hour = (e.ampm === 'PM' && s.ampm !== 'PM' && e.hour < 12) ? e.hour + 12 : e.hour;
        hourDiff = Math.abs(e.hour - s.hour);
        minuteDiff = e.minute - s.minute;

        if (minuteDiff < 0)
        {
            minuteDiff = Math.abs(60 + minuteDiff);
            hourDiff = hourDiff - 1;
        }
        return hourDiff + ':' + Math.abs(minuteDiff);
    }
    $scope.started = function ()
    {
        if ($scope.FromDates !=null)
        {
            debugger
            var collectionobj = {};
            collectionobj.RelationshipID = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FromDate = moment(($scope.FromDates)).format('YYYY-MMM-DD');  
            collectionobj.Action = $scope.ActionAccordingRadioButton;
            var getData = myService.methode('POST', "/AttendanceReportApi/GetPunchLogEmployeeAttandance", collectionobj);
            getData.then(function (response)
            {           
                var tblheader = [];
                var tblheader =
                    [
                        { "HeaderText": "Sr No.", "Value": "RowNumber", "HeaderValue": "Id", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno", "rowSpan": "2" },
                        { "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        { "HeaderText": "Employee Id", "HeaderValue": "EmployeeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        { "HeaderText": "Job Type", "HeaderValue": "JobType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        { "HeaderText": "Depart.", "HeaderValue": "DepartmentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        { "HeaderText": "Desig.", "HeaderValue": "DesignationName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        { "HeaderText": "DOJ", "HeaderValue": "DOJ", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        { "HeaderText": "Time", "HeaderValue": "AttTime", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        { "HeaderText": "Status", "HeaderValue": "Abbr", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    ];
                if (response.data != null && response.data.length > 0)
                {
                    $.each(response.data, function (i, val)
                    {
                        if ((val.LogOutDate != null) && (val.LogInDate != null))
                        {
                            var LID = val.LogInDate.substring(10, 19);
                            var LOD = val.LogOutDate.substring(10, 19);
                            if ((($scope.timediff(LID, LOD)) > '01:00') && (($scope.timediff(LID, LOD)) < '04:00'))
                            {
                                val["Abbr"] = "HD";
                            }
                            else if ((($scope.timediff(LID, LOD)) > '04:00'))
                            {
                                val["Abbr"] = "P";
                            }
                            else
                            {
                                val["Abbr"] = "A";
                            }
                        }
                        else if ((val.LogInDate != null) && (val.LogOutDate == null))
                        {
                            val["Abbr"] = "OTP";
                        }
                        else
                        {
                            val["Abbr"] = "A";
                        }
                    });
                }
                loadDataUsingPreDefinedColumn(tblheader, response.data);
            });
        }
        else
        {
            showMsgBox('Select From Date.');
        }
    };


}