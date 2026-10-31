app.CollegeEnquiryDashboardLavel3Controller = function ($scope, $element, $filter, myService) {
    sessionStorage.setItem('DashBoradLevel', 3);
    $scope.Redirect = function (transid) {
        sessionStorage.setItem('EnquiryTransId', transid);
        window.location.href = "/CollegeEnquiryTransaction/CollegeEnquiryFollowUpForm";
    }
    $scope.NewEnquiry = function () {
        window.location.href = "/CollegeEnquiryTransaction/CollegeEnquiryForm";
    }

    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.SessionIdForEnquiry = $scope.SessionIdForEnquiry
        collectionobj.SessionIdForFollowup = $scope.SessionIdForFollowup
        collectionobj.FYId = fyId;
        collectionobj.EnquiryTypeCode = $scope.EnquiryTypeCode;
        collectionobj.EnquiryTypeCode2 = $scope.EnquiryTypeCode2;
        collectionobj.EnquirySourceCode = $scope.EnquirySourceCode;
        collectionobj.FollowupCategory = $scope.FollowupCategory;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', '../Api/CollegeEnquiryDashBoardApi/GetEnquiryDashBoard', collectionobj);
        getData.then(function (response) {
            //debugger
            var FilteredDataList = [];
            $scope.Table1Data = response.data.Table;
            if ($scope.Table1Data[0].UserLevelId == 3) {
                FilteredDataList = $filter('filter')($scope.Table1Data, function (value) {
                    return value.LevelId == '3' || value.LevelId == null
                });
            }
            $scope.EnquiryFormList = FilteredDataList;
            $scope.EnquiryDashBoardFollowUpList = response.data.Table1;
            $scope.DashBoardStatus = response.data.Table2;
            $scope.CategorywiseDueFollowups = response.data.Table3;
            $scope.TodayDueFollowupList = response.data.Table4;
            $scope.TotalDueFollowupList = response.data.Table5;
            $scope.ClosedEnquiryList = response.data.Table6;
            $scope.TransferedEnquiryList = response.data.Table7;
        });
    };

    $scope.started();

}