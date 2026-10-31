app.FeeConcessionChartReportController = function ($scope, $element, $filter, myService) {
    $scope.StudentCode = "";
    $scope.SearchStudents = function () {
        $scope.SearchText = "";
        document.getElementById("FeeStuListOnOff").classList.toggle("show");
        $scope.StudentCode = "";
        $.each($scope.Sections, function (index, array) {
            array.chk = false;
        })
    }
    $scope.GetStudentsFeeConcessionChartReport = function () {
        var collectionobj = {};
        collectionobj.Action = "13";
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/GetMasterApi/GetFinalStudents', collectionobj);
        getData.then(function (response) {
            $scope.StudentList = response.data.Table;
            if ($scope.StudentList.length > 0) {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;
                    $scope.$applyAsync();
                }, 100);
            }
        });
    }
    $scope.FillStudentDetail = function (student) {
        $scope.SearchText = student.Name;
        $scope.StudentCode = student.StudentCode;
        $.each($scope.Sections, function (index, array) {
            array.chk = false;
        })
        $.each($scope.Sections, function (index, array) {
            if (array.Code == student.SectionCode) {
                array.chk = true;
            }
        })
    }
    $scope.SearchRecord = function () {
        $('#CollapseSearchTableList').fadeIn();
        $scope.started();
    };
    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = "1";
        collectionobj.SectionList = JSON.stringify($filter('filter')($scope.Sections, { chk: true }));
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeReportApi/FeeConcessionChartReport', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "HeaderValue": "Srno", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Admission Status", "HeaderValue": "IsFinal", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "StudentName", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Admission No.", "HeaderValue": "AdmissionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "FatherName", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Installment-1", "HeaderValue": "Installment1", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Installment-2", "HeaderValue": "Installment2", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Installment-3", "HeaderValue": "Installment3", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Installment-4", "HeaderValue": "Installment4", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    
                ];
            colIndex = 1;
            rowGroupIndex = [1];
            $scope.hideLoader();
            $scope.FeeConcessionChartList = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
        
        });
    };

}