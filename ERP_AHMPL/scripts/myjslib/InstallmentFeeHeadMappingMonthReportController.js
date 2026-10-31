app.InstallmentFeeHeadMappingMonthReportController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSession');
    $scope.ReportCategory = '2';
    $scope.ClassList = [];
    $scope.Sections = [];
    $scope.Search = function () {
        // clear first
        if ($.fn.DataTable.isDataTable('#LedgerRequestList')) {
            var tableObj = $("#LedgerRequestList").DataTable();
            tableObj.clear();
            tableObj.destroy();
        }
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.Action = $scope.ReportCategory;
            collectionobj.InstallmentCode = $scope.InstallmentCode;
            collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroupCode
            if ($scope.ReportCategory == "2")
                collectionobj.ClassCode = JSON.stringify($filter('filter')($scope.ClassList, { chk: true }, true))
            else
                collectionobj.ClassCode = JSON.stringify($filter('filter')($scope.Sections, { chk: true }, true))
            collectionobj.StreamCode = $scope.StreamCode
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.AcademicSessionId = $scope.SessionId;

            var getData = myService.methode('POST', '../Api/FeeReportApi/InstallmentMappingReport', collectionobj);
            getData.then(function (response) {
                if (response.data.length == 0) {
                    if ($.fn.DataTable.isDataTable('#LedgerRequestList')) {
                        var tableObj = $("#LedgerRequestList").DataTable();
                        tableObj.clear();
                        tableObj.destroy();
                    }
                }
                $scope.FeeStructure = response.data;
                
            });
        }
    };

    $scope.$on('tablecellmarge', function () {
        $('#LedgerRequestList').margetable({
            type: 2,
            colindex: [0,1,2,3,4]
        });
    });
}