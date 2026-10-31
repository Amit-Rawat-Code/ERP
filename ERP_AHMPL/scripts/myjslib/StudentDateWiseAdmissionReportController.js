app.StudentDateWiseAdmissionReportController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtAttendanceDate');
    $scope.disableSearch = true;


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
        collectionobj.Action = 5;
        collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "/APi/AdmissionReportApi/GetDateWiseAdmissionReport", collectionobj);
        getData.then(function (response) {
            debugger
            var tblheader = [];
            var tblheader =
                [
                    { "HeaderText": "Sr No.", "Value": "RowNumber", "HeaderValue": "Id", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno", "rowSpan": "2" },
                ];

            $scope.dynamicHeader = Object.keys(response.data[0]);
            $.each($scope.dynamicHeader, function (index, val) {
                tblheader.push({ "HeaderText": val, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-left" })
            });

            loadDataUsingPreDefinedColumn(tblheader, response.data);
        }); 
    }
}

