app.EmployeeAttendanceMonthlyInAndOutReportController = function ($scope, $element, $filter, myService) {

    $scope.SetMaxMinDate().then(function (response) {
        if ($scope.ToDates > new Date())
            $scope.FromDates = new Date('01-' + moment(new Date()).format('MMM-YYYY'));
        else
            $scope.FromDates = new Date('01-' + moment($scope.ToDate).format('MMM-YYYY'));
        $scope.ToDates = $scope.ToDate;
        $scope.$applyAsync();
    });

    $scope.SearchRecord = function () {
        $('#ddlSection').removeClass('validate');
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };

    $scope.started = function () {
        
        if (moment($scope.FromDates).format('MMM-YYYY') == moment($scope.ToDates).format('MMM-YYYY')) {
            var collectionobj = {};
            collectionobj.RelationshipID = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FromDate = moment(($scope.FromDates)).format('YYYY-MMM-DD');
            collectionobj.ToDate = moment(($scope.ToDates)).format('YYYY-MMM-DD');
            collectionobj.EmployeeId = $scope.EmployeeCode;
            collectionobj.DepartmentId = $scope.DepartmentCode;
            //collectionobj.DesignationId = $scope.DesignationCode;
            collectionobj.Action = 18;
            var getData = myService.methode('POST', "/AttendanceReportApi/GetEmployeeAttandanceMonthlyInAndOut", collectionobj);
            getData.then(function (response) {
                debugger
                //messagevalues = [
                //    { "Year": $scope.SessionYear },
                //    { "Month": $scope.SessionMonth },
                //    { "Class": $('#ddlClass option:selected').text() },
                //    { "Section": $('#ddlSection option:selected').val() == "" ? "" : $('#ddlSection option:selected').text() }
                //];
                var tblheader = [];
                var tblheader =
                    [
                        { "HeaderText": "Sr No.", "Value": "RowNumber", "HeaderValue": "Id", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno", "rowSpan": "2" },
                        { "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        { "HeaderText": "Father", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        { "HeaderText": "Job Type", "HeaderValue": "JobType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        { "HeaderText": "Depart.", "HeaderValue": "DepartmentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        { "HeaderText": "Desig.", "HeaderValue": "DesignationName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                        
                        { "HeaderText": "DOJ", "HeaderValue": "DOJ", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    ];
                
                if (response.data != null && response.data.length > 0) {

                    $scope.dynamicHeader = Object.keys(response.data[0]);
                    
                    $.each($scope.dynamicHeader, function (index, val)
                    {
                        if (Number(val))
                        {
                            tblheader.push(
                                { "HeaderText": val, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No"}
                            )
                        }
                    });
                }
                tblheader.push(
                    { "HeaderText": "Present", "HeaderValue": "Present", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Absent", "HeaderValue": "Absent", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Leave", "HeaderValue": "Leave", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                )
                loadDataUsingPreDefinedColumn(tblheader, response.data);
            });
        }
        else {
            showMsgBox('From and To date should be same month-year.')
        }


        
    };
   

}