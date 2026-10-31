app.TeacherWorkLoadReportController = function ($scope, $element, $filter, myService) {
    $scope.started = function () {
        $('#CollapseSearchTableList').attr('class', 'collapse in');

        $scope.showLoader();

        var collectionobj = {};
        collectionobj.Action = "1";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableReportApi/TeacherWorkLoadReport', collectionobj);
        getData.then(function (response) {
            messagevalues = [
                { "From Date": moment(response.data.Table[0].FromDate).format('DD-MMM-YYYY') },
                { "To Date": moment(response.data.Table[0].ToDate).format('DD-MMM-YYYY') }
            ];
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Employee Id", "HeaderValue": "EmployeeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Contact No.", "HeaderValue": "ContactNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Alloted Period", "HeaderValue": "AllotedPeriod", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subtituted Period", "HeaderValue": "SubtitutedPeriod", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Missed Period", "HeaderValue": "MissedPeriod", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            loadDataUsingPreDefinedColumn(tblheader, response.data.Table1);
        });
    };

    $scope.started();
};