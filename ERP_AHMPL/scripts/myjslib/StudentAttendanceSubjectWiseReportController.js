
app.StudentAttendanceSubjectWiseReportController = function ($scope, $element, $filter, myService) {

    $scope.SetFocus('#txtAttendanceDate');
    $scope.disableSearch = true;
    ClassList = "";


    $scope.GetCdf = function ()
    {
        debugger
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var GetData = myService.methode('POST', '../Api/GetMasterApi/GetClass', collectionobj)
        GetData.then(function (response)
        {
            debugger
            var cls = response.data;
            var ClassList = cls[0].ClassName;
            $scope.$watch('selected', function (ClassList)
            {
                debugger
                // reset to nothing, could use `splice` to preserve non-angular references
                $scope.ddlClass = [];
                
                angular.forEach(ClassList, function (val)
                {
                    $scope.ddlClass.push(val.id.toString());
                });
            });
           
        });
    }

    //$scope.ddlClass_Change = function () {
    //    $scope.GetClasses();
    //}



    $scope.SearchRecord = function () {
        debugger
        if ($scope.Category == '0') {
            var collectionobj = {};
            collectionobj.Action = 4;
            collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
            collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
            collectionobj.SessionId = sessionId;
            collectionobj.AbbrTypeId = $scope.filter;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.ClassCode = $scope.ClassCode
            // collectionobj.SectionCode = $Scope.section.SectionId.Value;

            var getData = myService.methode('POST', "/StudentAttendanceReportMasterApi/GetStudentAttandanceDateWiseReport", collectionobj);
            getData.then(function (response) {
                debugger
                var tblheader =
                    [
                        { "HeaderText": "Sr No.", "Value": "RowNumber", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                        { "HeaderText": "Student Name", "HeaderValue": "EmployeeName", "Width": "140px", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "140px", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Attendance Date", "HeaderValue": "AttendanceDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Class", "HeaderValue": "Class", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "AbbrTypr", "HeaderValue": "AbbrType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                    ];
                loadDataUsingPreDefinedColumn(tblheader, response.data);
            });
        }
        else if ($scope.Category == '1') {
            var collectionobj = {};
            collectionobj.Action = 4;
            collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
            collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
            collectionobj.SessionId = sessionId;
            //collectionobj.AbbrTypeId = $scope.filter;
            collectionobj.RelationshipId = relationshipId;
            //collectionobj.ClassCode = $scope.ClassCode
            // collectionobj.SectionCode = $Scope.section.SectionId.Value;
            var getData = myService.methode('POST', "/StudentAttendanceReportMasterApi/GetStudentAttandanceDateWiseReport", collectionobj);
            getData.then(function (response) {
                debugger
                var tblheader =
                    [
                        { "HeaderText": "Student Name", "Value": "RowNumber", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                        { "HeaderText": "Father Name", "HeaderValue": "EmployeeName", "Width": "140px", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Attendance Date", "HeaderValue": "AttendanceDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Class", "HeaderValue": "DesignationName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "AbbrTypr", "HeaderValue": "fatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                    ];
                loadDataUsingPreDefinedColumn(tblheader, response.data);
            });
        };
       
    };
}

