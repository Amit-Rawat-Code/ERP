app.EmployeeAttendenceDateWiseReportController = function ($scope, $element, $filter, myService) {
    //$scope.studentDetails = {
    //    ClassId: "",
    //    SectionId: ""
    //}

    $scope.SearchRecord = function () {
        $('#ddlSection').removeClass('validate');
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };

    $scope.started = function () {
        debugger
        var collectionobj = {};
        collectionobj.RelationshipID = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.AbbrTypeId = $scope.filter;
        collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
        collectionobj.Action = 17;
        var getData = myService.methode('POST', "../AttendanceReportApi/GetEmployeeAttandanceDateWiseReport", collectionobj);
        getData.then(function (response) {
           
            debugger
           
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "RowNumber", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "140px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Attendance Date", "HeaderValue": "AttendanceDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Department", "HeaderValue": "DepartmentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "DesignationName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father", "HeaderValue": "fatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "title", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }

                ];
            debugger
            loadDataUsingPreDefinedColumn(tblheader, response.data);
        });
    };
}