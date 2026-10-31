app.CollegeAdmissionDateWisedetailController = function ($scope, $element, $filter, myService) {
    $scope.ddlCollegeCourse_Change = function (CollegeCourseCode) {
        $scope.GetSemester(CollegeCourseCode);
        $scope.GetCollegeBranch(CollegeCourseCode);
    };

    $scope.SearchRecord = function () {
        $('#ddlSection').removeClass('validate');
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 2;
        collectionobj.CourseCode = $scope.CollegeCourseCode;
        collectionobj.SelectedForBranch = $scope.SelectedForBranch;
        collectionobj.SemesterCode = $scope.Semester;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        //debugger;
        var getData = myService.methode('POST', "../Api/CollegeAdmissionReportApi/GetCollegeAdmissionReport", collectionobj);
        getData.then(function (response) {
            debugger
            //$scope.CollegeStudentList = response.data;
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