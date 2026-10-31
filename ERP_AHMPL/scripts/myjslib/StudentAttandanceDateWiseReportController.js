app.StudentAttendanceDateWiseReportController = function ($scope, $element, $filter, myService) {

    $scope.SetFocus('#txtAttendanceDate');
    $scope.disableSearch = true;

    $scope.SearchStudents = function () {

        $scope.SearchText = "";
        $scope.InstituteRollNo = "";
        $scope.AdmissionNo = "";
        $scope.StudentCode = "";

        document.getElementById("FeeStuListOnOff").classList.toggle("show");
        $scope.GetAllStudents();
    }


    $scope.ddlSection_Change = function () {
        $scope.GetAllStudents();
    }

    $scope.GetAllStudents = function (action) {
        debugger
        $scope.disabledSearch = false;
        var collectionobj = {};
        $scope.StudentsList = [];
        collectionobj.BranchCode = $scope.BranchCode;;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.UpdatedBy = userid;
        collectionobj.Action = "5"
        var getData = myService.methode('POST', "../Api/FeeReportApi/SearchStudentsForFeeDetails", collectionobj);
        getData.then(function (response) {
            debugger
            $scope.StudentsList = response.data;
            if ($scope.StudentsList.length > 0) {
                setTimeout(function () {

                    $scope.disabledSearch = false;
                    $scope.hideloader = false;
                    $scope.$applyAsync();
                }, 100);
            }

            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }

    $scope.setStudentName = function (student) {

        $scope.SearchText = student.StudentName;
        $scope.StudentCode = student.StudentCode;
        $scope.AdmissionNo = student.AdmissionNo;
        $scope.InstituteRollNo = student.InstituteRollNo;
        $scope.HideStudentList();
        $scope.$applyAsync();
    }


    $scope.HideStudentList = function (val) {
        setTimeout(function () {

            if (document.querySelectorAll(".show").length > 0) {
                //$scope.HideDiv = false;
                document.getElementById("FeeStuListOnOff").classList.toggle("show")
            }

        }, 200);
    } 

    $scope.ddlClass_Change = function (ClassCode) {
     
        $scope.GetSections(ClassCode);
    }

    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };

    $scope.started = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
        collectionobj.SessionId = sessionId;
        if ($scope.filter != '0')
            collectionobj.AbbrTypeId = $scope.filter;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode
        collectionobj.StudentCode = $scope.StudentCode
        var getData = myService.methode('POST', "/Api/StudentAttendanceReportApi/GetStudentAttendanceDateWiseReport", collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr No.", "Value": "RowNumber", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Student Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Date of Admission", "HeaderValue": "DateOfAdmission", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Attendance Date", "HeaderValue": "AttendanceDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "AbbrType", "HeaderValue": "AbbrType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            loadDataUsingPreDefinedColumn(tblheader, response.data);///JSON.parse(myData)
            var collectionobj = {};
            collectionobj.Action = 7;
            collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
            collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
            collectionobj.SessionId = sessionId;
            if ($scope.filter != '0')
                collectionobj.AbbrTypeId = $scope.filter;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode
            collectionobj.StudentCode = $scope.StudentCode
            var getData = myService.methode('POST', "/Api/StudentAttendanceReportApi/GetStudentAttendanceDateWiseReport", collectionobj);
            getData.then(function (response) {
                $scope.AbbrGroupWiseCountList = response.data;
            });
        });
    };
}

