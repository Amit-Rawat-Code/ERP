app.BookReturnRegisterLibController = function ($scope, $element, $filter, myService) {

    $scope.StudentPanel = true;
    $scope.EmployeePanel = false;
    $scope.MemberTypeM = "Student";
    $scope.MemberType = function () {
        if (typeof ($scope.MemberTypeM) != "undefined") {

            if ($scope.MemberTypeM == "Student") {
                $scope.StudentPanel = true;
                $scope.EmployeePanel = false;
                $scope.EmployeeCode = "";
            } else {
                $scope.StudentPanel = false;
                $scope.EmployeePanel = true;
                $scope.StudentCode = "";
            }
        }
    };

    $scope.GetBookDetail = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBookDetailLib', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                //debugger
                $scope.BookList = response.data;
            }
        });
    };

    $scope.GetSubjectLibList = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryMasterApi/GetSubjectGrpLibList', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.SubjectLibList = response.data;
            }
            else {
                $scope.SubjectLibList = [];
            }
        });
    };

    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };
    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 2;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.EmployeeCode = $scope.EmployeeCode;
        collectionobj.AccessionID = $scope.AccessionId;
        collectionobj.SubjectCode = $scope.SubjectCode;
        collectionobj.BookCode = $scope.BookCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "../Api/LibraryReportApi/GetBookIssueAndReturnReport", collectionobj);
        getData.then(function (response) {
            //debugger
            //if (response.data != null && response.data.length > 0) {
                var tblheader = [];

                $scope.dynamicHeader = Object.keys(response.data.length > 0 ? response.data[0] : '');
                $.each($scope.dynamicHeader, function (index, val) {
                    tblheader.push({ "HeaderText": val, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "" })
                });
                //debugger
                loadDataUsingPreDefinedColumn(tblheader, response.data);
            //}
        });
    }
    $scope.ClearTextDropDownEmp = function () {
        if ($scope.SearchEmployeeText == '') {
            $scope.EmployeeCode = "";
        }
    }
    $scope.ClearTextDropDownStd = function () {
        if ($scope.SearchText == '') {
            $scope.StudentCode = "";
        }
    }

    $scope.GetAllEmployees = function (action) {
        $scope.disabledSearch = true;
        $scope.hideloader = true;

        $scope.showLoader();
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = action

        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/SearchEmployees", collectionobj);
        getData.then(function (response) {

            $scope.EmployeeList = response.data;
            if ($scope.EmployeeList.length > 0) {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;

                }, 100);
            }

            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }

    $scope.setEmployeeNameLib = function (employee) {


        $scope.SearchEmployeeText = employee.EmployeeName;
        $scope.EmployeeCode = employee.EmployeeCode;
        $scope.EmployeeName = employee.EmployeeName;
        $scope.EmployeeIDM = employee.EmployeeId;
        $scope.DepartmentName = employee.DepartmentName;
        $scope.DesignationName = employee.DesignationName;
        $scope.PresentAddress = employee.PresentAddress;
        $scope.FatherName = employee.FatherName;
        $scope.MotherName = employee.MotherName;
        $scope.ContactNo = employee.ContactNo;
        $scope.JoiningDate = employee.JoiningDate;
        $scope.EmployeePhoto = employee.EmployeePhoto;

        $scope.HideEmployeeList();
        //$scope.HideDiv=true;
        $scope.$applyAsync();
    }

    $scope.GetAllStudentList = function (StudentCode) {
        $scope.disabledSearch = true;
        $scope.hideloader = true;
        //debugger;
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        /*collectionobj.ScholarNo = $scope.ScholarNoM;*/
        collectionobj.StudentId = $scope.StudentIDM;
        collectionobj.StudentCode = StudentCode;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = 5;
        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetStudentListLib", collectionobj);
        getData.then(function (response) {
            //debugger;
            $scope.StudentsListLib = response.data;
            if ($scope.StudentsListLib.length > 0) {
                /*setTimeout(function () {*/
                $scope.disabledSearch = false;
                $scope.hideloader = false;

                //}, 4000);
            }
            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }

    $scope.setStudentNameLib = function (student) {
        //debugger;
        $scope.SearchText = student.StudentName;
        $scope.StudentCode = student.StudentCode;
        $scope.StudentName = student.StudentName;
        $scope.StudentIDM = student.StudentId;
        $scope.ScholarNoM = student.ScholarNumber;
        $scope.HideStudentList();
        $scope.$applyAsync();
    }
    $(document).on("click", ".RefreshSearchTable", function (e) {
        //debugger;
        var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
        var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
        var loadingAnim = panelToRefresh.find('.loading-progress');
        panelToRefresh.show();
        setTimeout(function () {
            loadingAnim.addClass('la-animate');
        }, 100);
        $scope.started();
        return false;
    });
}