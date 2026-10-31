app.EnquiryDashBoardController = function ($scope, $element, $filter, myService)
{
    sessionStorage.setItem('DashBoradLevel', 1);
    $scope.Redirect = function (transid) {
        sessionStorage.setItem('EnquiryTransId', transid);
        window.location.href = "/EnquiryTransaction/EnquiryFollowUpForm";
    }
    $scope.NewEnquiry = function () {
        
        window.location.href = "/EnquiryTransaction/EnquiryForm";
    }

    $scope.CheckAll = function (flag) {
        $.each($scope.EnquiryFormList, function (index, obj) {
            obj.chk = flag;
        });
    }

    $scope.GetLavelWiseUser = function () {
        
        var collectionobj = {};
        collectionobj.Level = "2";
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/DashBoardApi/GetLavelWiseUser', collectionobj);
        getData.then(function (response) {
            $scope.LavelwiseUserList = response.data;
        });
    }


    $scope.AssignedUser = function () {
        let filteredlist = $filter('filter')($scope.EnquiryFormList, { 'chk': true })
        if (filteredlist.length > 0) {
            var collectionobj = {};
            collectionobj.Action = "1";
            let result = filteredlist.map(function (obj) {
                return { TransId: obj.TransId, UserId: $scope.EnquiryAssignToUser };
            });
            collectionobj.AssignedUserData = JSON.stringify(result);
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', '../api/DashBoardApi/UpdateUserIdOfEnquiry', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.EnquiryAssignToUser = "";
                    $scope.started();
                }

            });
        }
        else {
            showMsgBox("You have to select at least one enquiry no.!")
            $scope.Allchk = false;
        }
    }

    $scope.started = function ()
    {
       
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.SessionIdForEnquiry = $scope.SessionIdForEnquiry ? $scope.SessionIdForEnquiry : sessionId;
        collectionobj.SessionIdForFollowup = $scope.SessionIdForFollowup ? $scope.SessionIdForFollowup : sessionId;
        collectionobj.FYId = fyId;
        collectionobj.EnquiryTypeCode = $scope.EnquiryTypeCode;
        collectionobj.EnquiryTypeCode2 = $scope.EnquiryTypeCode2;
        collectionobj.EnquirySourceCode = $scope.EnquirySourceCode;    
        collectionobj.FollowupCategory = $scope.FollowupCategory;
        collectionobj.CreatedBy = userid;
        //
        var getData = myService.methode('POST', '../Api/DashBoardApi/GetEnquiryDashBoard', collectionobj);
        getData.then(function (response)
        {
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