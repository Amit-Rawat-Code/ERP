app.FeeBillReportController = function ($scope, $element, $filter, myService) {
    $scope.DList = [];
    $scope.ddlClass_Change = function (ClassId)
    {
        $scope.GetSections(ClassId);
    }
    $scope.ddlSession_Change = function () {
        $scope.GetInstallments();
    }
    $scope.SearchRecord = function () {
        if (isValidate()) {
            if (($filter('filter')($scope.InstallmentList, { chk: true }, true)).length == 0) {
                showMsgBox('At least one installment should be selected.')
            }
            else {
                $('#CollapseSearchTableList').fadeIn();
                var table = $('#tblDList').DataTable();
                table.destroy();
                $scope.started();
            }
        }
    };

    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.AcademicSessionId = $scope.SessionId;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.RollNo = $scope.InstituteRollNo;
        collectionobj.Mode = $scope.FeeMode;
        collectionobj.AdmissionNo = $scope.AdmissionNo;
        collectionobj.StudentCode = $scope.StudentCode;
        var getData = myService.methode('POST', "../Api/FeeReportApi/GetFeeDefaulterNoticeReport", collectionobj);
        getData.then(function (response) {
            $scope.DList = response.data.Table;
            $scope.hideLoader();
        });
    }

    $scope.StudentArray = [];
    $scope.PrintPreview = function ()
    {
        var collectionobj = {};
        //debugger
        collectionobj.AcademicSessionId = $scope.SessionId;
        collectionobj.AllInstallmentCode = JSON.stringify($filter('filter')($scope.InstallmentList, { 'chk': true }, true));
        collectionobj.AllStdentCode = JSON.stringify($filter('filter')($scope.DList, { 'chkBx': true }, true));
        collectionobj.Action = 6;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        $scope.SelectedClassCode = ($filter('filter')($scope.ClassList, { Code: $scope.ClassCode }, true))[0].ClassName;
        $scope.SelectedSectionCode = ($filter('filter')($scope.Sections, { Code: $scope.SectionCode }, true))[0].SectionName;
        $scope.SelectedSession = ($filter('filter')($scope.SessionList, { 'SessionId': $scope.SessionId }))[0].SessionName;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        var getData = myService.methode('POST', "../Api/FeeReportApi/GetFeeDefaulterNoticeReport", collectionobj);
        getData.then(function (response)
        {
            debugger
            $scope.DocOrientation = 'l';
            $scope.FeeBookletH = response.data.Table;
            $scope.FeeBookletD = response.data.Table1;
            $scope.FeeBookletAmt = response.data.Table2;
        })
    }

    $scope.$watch('FeeBookletH', function () {
        if (typeof ($scope.FeeBookletH) === 'undefined') return;
        setTimeout(function () {
            $scope.Export('print');
        }, 500)

    })
}