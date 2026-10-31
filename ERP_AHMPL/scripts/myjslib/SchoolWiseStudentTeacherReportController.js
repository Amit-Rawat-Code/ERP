app.SchoolWiseStudentTeacherReportController = function ($scope, $element, $filter, myService) {
    $scope.GetSchools = function () {

        var collectionobj = {};
        collectionobj.Action = '1';
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/MISReportApi/GetMISReport', collectionobj);
        getData.then(function (response) {
            $scope.SchoolList = response.data;
        });
    };

    $scope.SearchRecord = function () {
        $('#CollapseSearchTableList').fadeIn();
        $scope.started();
        //setTimeout(function () { $scope.started(); }, 1000);        
    };
    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.SessionId = sessionId;
        collectionobj.RIDs = JSON.stringify($filter('filter')($scope.SchoolList, { 'chk': true }, true));
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReport", collectionobj);
        getData.then(function (response) {
            if (response.data != null && response.data.length > 0) {
                $scope.MonthlyReportList = response.data;
                $scope.hideLoader();
            }
            else {
                $('#CollapseSearchTableList').fadeOut();
                showMsgBox('NO RECORD FOUND....');
            }
        });
    }
}