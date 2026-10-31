app.StudentDateWiseFormSubmissionReportController = function ($scope, $element, $filter, myService) {
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
        collectionobj.Action = 3;
        collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "/RegistrationReportApi/GetDatewiseRegistrationFormSubmissionReport", collectionobj);
        getData.then(function (response) {
            debugger

            
            var tblheader =
                [
                    { "HeaderText": "Date", "HeaderValue": "Date", "ShowColumn": "Yes", "ImageColumn": "No", "width": "150px" },
                    { "HeaderText": "Quantity", "HeaderValue": "StudentName", "ShowColumn": "Yes", "ImageColumn": "No", "Width": "150px" },
                    { "HeaderText": "From Series", "HeaderValue": "ParentsName", "ShowColumn": "Yes", "ImageColumn": "No", "width": "150px" },
                    { "HeaderText": "To Series", "HeaderValue": "RegistrationNo", "ShowColumn": "Yes", "ImageColumn": "No", "width": "150px" }

                ];

            debugger
            loadDataUsingPreDefinedColumn(tblheader, response.data);

        });
    }
}

//, columns: [{ "HeaderText": "Enquiry", "HeaderValue": "Reg1", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }]