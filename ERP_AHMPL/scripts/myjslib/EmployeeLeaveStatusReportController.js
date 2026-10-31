app.EmployeeLeaveStatusReportController = function ($scope, $element, $filter, myService) {

    $scope.SearchRecord = function () {
    if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };
    $scope.started = function () {
        
        var collectionobj = {};
        collectionobj.RelationshipID = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.EmployeeCode = $scope.EmployeeCode;
        collectionobj.DepartmentCode = $scope.DepartmentCode;
        collectionobj.DesignationCode = $scope.DesignationCode;
        collectionobj.Action = 6;
        var getData = myService.methode('POST', "/Api/HRReportsApi/GetEmployeeLeaveStatus", collectionobj);
        getData.then(function (response) {
           
            $scope.LeaveStatus = response.data;
            if ($scope.LeaveStatus.length > 0) {
                $(".section-toggle").slideToggle('slow');
                $(".filter-toggle").css("display", "block");
            }
        
        });
    };

}
