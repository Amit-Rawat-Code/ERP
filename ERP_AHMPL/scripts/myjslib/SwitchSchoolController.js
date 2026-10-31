app.SwitchSchoolController = function ($scope, $element, $sce, $filter, $timeout, myService) {
    $scope.CurrentlySchoolLogo = "";
    $scope.CurrentlySchool = "";
    $scope.CurrentlySchoolAddress = "";
    $scope.CurrentlySchoolCode = "";

    $scope.SwitchToSchoolLogo = "";
    $scope.SwitchToSchool = "";
    $scope.SwitchToSchoolAddress = "";
    $scope.SwitchToSchoolCode = "";

    $scope.ShowPopup = function () {
        $('#ModalSwitchSchool').modal({
            show: 'true'
        }); 

        $scope.CurrentlySchoolLogo = sessionStorage.getItem('branchLogo');
        $scope.CurrentlySchool = sessionStorage.getItem('SchoolName');
        $scope.CurrentlySchoolAddress = sessionStorage.getItem('schoolAddress');
        $scope.CurrentlySchoolCode = sessionStorage.getItem('displayCode');

        $scope.GetAllotedSession();
    }

    $scope.SwitchSchool = function () {
        $scope.filterSession = $filter('filter')($scope.AllotedSessionList, { SessionId: Number($scope.SessionId) }, true);
        $scope.filterFY = $filter('filter')($scope.AllotedFinancialYearList, { FinancialYearId: Number($scope.FinancialYearId) }, true);
        $scope.filterSchool = $filter('filter')($scope.AllotedSchoolList,{ RelationshipId: Number($scope.RelationshipId) },true);

        sessionStorage.setItem('sessionId', $scope.SessionId);
        sessionStorage.setItem('academicSession', $scope.filterSession[0].SessionName);
        sessionStorage.setItem('fyId', $scope.FinancialYearId);
        sessionStorage.setItem('financialYear', $scope.filterFY[0].FinancialYearName);
        sessionStorage.setItem('relationshipId', $scope.RelationshipId);
        sessionStorage.setItem("displayCode", $scope.filterSchool[0].DisplayCode);
        sessionStorage.setItem('SchoolName', $scope.filterSchool[0].SchoolName);
        sessionStorage.setItem('schoolAddress', $scope.filterSchool[0].SchoolAddress);
        sessionStorage.setItem('isHO', $scope.filterSchool[0].IsHO);
        sessionStorage.setItem('isSchool', $scope.filterSchool[0].IsSchool);
        sessionStorage.setItem('isCollege', $scope.filterSchool[0].IsCollege);
        sessionStorage.setItem('isSociety', $scope.filterSchool[0].IsSociety);
        sessionStorage.setItem('groupCode', $scope.filterSchool[0].GroupCode);
        sessionStorage.setItem('societyCode', $scope.filterSchool[0].SocietyCode);
        sessionStorage.setItem('schoolCode', $scope.filterSchool[0].SchoolCode);
        sessionStorage.setItem('branchCode', $scope.filterSchool[0].BranchCode);

        sessionStorage.setItem('branchLogo', $scope.filterSchool[0].BranchLogo);
        sessionStorage.removeItem("sessionTodayDate");
        sessionStorage.removeItem("sessionStartDate");
        sessionStorage.removeItem("sessionEndDate");
        location.reload();
    }

    $scope.GetAllotedSession = function () {
        var collectionobj = {};
        collectionobj.UserId = userid;
        var getData = myService.methode('POST', '../Api/LoginApi/GetAllotedSession', collectionobj);
        getData.then(function (response) {
            $scope.AllotedSessionList = response.data;
            $scope.SessionId = sessionId;
            $scope.GetAllotedFinancialYear();
            $scope.GetAllotedSchoolSessionWise();
        });
    }
    $scope.GetAllotedFinancialYear = function () {
        var collectionobj = {};
        collectionobj.UserId = userid;
        collectionobj.SessionId = $scope.SessionId;
        var getData = myService.methode('POST', '../Api/LoginApi/GetAllotedFinancialYear', collectionobj);
        getData.then(function (response) {
            $scope.AllotedFinancialYearList = response.data;
            $scope.FinancialYearId = fyId;
        });
    }
    $scope.GetAllotedSchoolSessionWise = function () {
        var collectionobj = {};
        collectionobj.UserId = userid;
        collectionobj.SessionId = $scope.SessionId;
        var getData = myService.methode('POST', '../Api/LoginApi/GetAllotedSchoolSessionWise', collectionobj);
        getData.then(function (response) {
            $scope.AllotedSchoolList = response.data;
            $scope.RelationshipId = relationshipId;
        });
    }

    $scope.ddlSession_Change = function () {
        $scope.GetAllotedFinancialYear();
        $scope.GetAllotedSchoolSessionWise();
    }


    $scope.ddlSchool_Change = function () {
        $scope.filterSchool = $filter('filter')($scope.AllotedSchoolList, { RelationshipId: Number($scope.RelationshipId) }, true);

        $scope.SwitchToSchoolLogo = $scope.filterSchool[0].BranchLogo;
        $scope.SwitchToSchool = $scope.filterSchool[0].SchoolName;
        $scope.SwitchToSchoolAddress = $scope.filterSchool[0].SchoolAddress;
        $scope.SwitchToSchoolCode = $scope.filterSchool[0].DisplayCode;
    }
}