app.PendingFeeRegisterReportController = function ($scope, $element, $filter, myService) {

    $scope.FromDate = new Date();

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


    $scope.GetAllStudents = function (action)
    {
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
        getData.then(function (response) 
        {
            debugger
            $scope.StudentsList = response.data;
            if ($scope.StudentsList.length > 0)
            {
                setTimeout(function ()
                {
                    
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
        $scope.StudentName = student.StudentName;
        $scope.AdmissionNo = student.AdmissionNo;
        $scope.ClassName = student.ClassName;
        $scope.BranchName = student.BranchName;
        $scope.SectionName = student.SectionName;
        $scope.GuardianAddress = student.GuardianAddress;
        $scope.FatherName = student.FatherName;
        $scope.MotherName = student.MotherName;
        $scope.FatherContactNo = student.FatherContactNo;
        $scope.AdmissionFormNo = student.AdmissionFormNo;
        $scope.InstituteRollNo = student.InstituteRollNo;
        $scope.StudentPhoto = student.StudentPhoto;
        $scope.AcademicSess = student.AcademicSession;
        $scope.AcademicSessionId = student.AcademicSessionId;
        $scope.HideStudentList();
        //if (sessionId == $scope.AcademicSessionId) {
        //    $scope.GetSessionYear();
        //}
        //else {
        //    $scope.GetAcademicSession();
        //}
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

    //$scope.ddl_StudentsListChange = function (student) {
    //    $scope.setStudentName(student)
    //}


    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };

    $scope.txtStudent_blur = function () {
        $scope.InstituteRollNo = "";
        $scope.AdmissionNo = "";
        $scope.StudentCode = "";
    }

    $scope.$watch('Sections', function () {
        if ($scope.Sections != undefined) {
            angular.forEach($scope.Sections, function (obj) {
                obj.chk = true;
            });
        };
    })

    $scope.started = function () {
        debugger
        $scope.showLoader();
        var collectionobj = {};
       
        collectionobj.SessionId = sessionId;
        collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SectionList = JSON.stringify($scope.Sections);
        collectionobj.AdmissionNo = $scope.AdmissionNo
        collectionobj.StudentCode = $scope.StudentCode
        if ($scope.ReportCategory == 'TO') {
            collectionobj.Action = $scope.Category == 'O' ? 3 : ($scope.Category == 'A' ? 2 : 1);
            var getData = myService.methode('POST', "../Api/FeeReportApi/PendingFeeRegisterReport", collectionobj);
        }
        else {
            collectionobj.Action = 1;
            var getData = myService.methode('POST', "../Api/FeeReportApi/GetPendingFeeRegisterReportInstallmentWise", collectionobj);
        }
        getData.then(function (response) {
            var tblheader = '';
            //$('#UpdatePanel').text('');
            messagevalues = [
                { "Due Amount as on Date": moment($scope.FromDate).format('DD-MMM-YYYY') }
            ];
            if ($scope.ReportCategory == 'TO') {
                var tblheader =
                    [
                        { "HeaderText": "Sr.No.", "Value": "Id", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                        { "HeaderText": "Admission No.", "HeaderValue": "AdmissionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Mobile", "HeaderValue": "Mobile", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Opening", "HeaderValue": "OPBAL", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "FUN": "SUM" },
                        { "HeaderText": "Total Debit", "HeaderValue": "TotalDebit", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "FUN": "SUM" },
                        { "HeaderText": "Total", "HeaderValue": "Total", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "FUN": "SUM" },
                        { "HeaderText": "Paid", "HeaderValue": "PaidAmount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "FUN": "SUM" },
                        { "HeaderText": "Outstanding", "HeaderValue": "TotalOutstanding", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "FUN": "SUM" },
                    ];

                loadDataUsingPreDefinedColumn(tblheader, response.data);
            }
            else {
                var keys = Object.keys(response.data[0])
                var tblheader =
                    [
                        { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" }]
                $.each(keys, function (index,key) {
                    tblheader.push(
                        { "HeaderText": key, "HeaderValue": key, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" })
                })
                loadDataUsingPreDefinedColumn(tblheader, response.data);
            }
           
        });
    }
}