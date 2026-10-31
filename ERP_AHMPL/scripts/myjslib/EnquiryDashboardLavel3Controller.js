app.EnquiryDashboardLavel3Controller = function ($scope, $element, $filter, myService) {
    sessionStorage.setItem('DashBoradLevel', 3);
    $scope.Redirect = function (transid) {
        sessionStorage.setItem('EnquiryTransId', transid);
        window.location.href = "/EnquiryTransaction/EnquiryFollowUpForm";
    }
    $scope.NewEnquiry = function () {
        window.location.href = "/EnquiryTransaction/EnquiryForm";
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
         var getData = myService.methode('POST', '../Api/DashBoardApi/GetEnquiryDashBoard', collectionobj);
        getData.then(function (response) {         
            $scope.EnquiryFormList = response.data.Table;
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