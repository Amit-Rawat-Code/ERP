app.HomeWorkReportController = function ($scope, $element, myService) {
    //$('#ddlSection').change(function () {
    //    debugger
    //    $scope.HomeworkSubject()

    //});
    //$('#ddlClass').change(function () {
    //    $scope.BindEmpSection()
    //    debugger
    //});
    //$('#ddlSubject').change(function () {
    //    $scope.HomeworkTopic()
    //    debugger
    //});
    $scope.HomeworkSubject = function () {
        debugger;
        var collectionobj = {};
        collectionobj.schoolCode = schoolCode;
        collectionobj.branchCode = branchCode;
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.ClassId = $('#ddlClass').val();
        collectionobj.SectionId = $("#ddlSection").val();
        collectionobj.SubjectId = $("#ddlSection").val();
        collectionobj.EmployeeId = $scope.Code;
        getData = myService.methode('POST', "../Homework/SubjectEmpWise", '{ obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.AllSubject = response.data;

        });
        $scope.$applyAsync();
    }
    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };

    

    $scope.started = function () {
        debugger;
        var collectionobj = {};
        
        collectionobj.Action = '26';
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.ClassCode = $('#ddlClass').val();
        collectionobj.SectionCode = $("#ddlSection").val();
        collectionobj.Subject = $("#ddlSubject").val();
        collectionobj.TopicName = $("#ddlHomeworkTopic").val();
        collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
        //var getData = myService.methode('POST', "../Homework/GetHomeWorkTopicClassSectionSubjectEmpWise", '{obj:' + JSON.stringify(collectionobj) + '}');
        var getData = myService.methode('POST', "../Api/HomeworkApi/GetHomeWorkTopicClassSectionSubjectEmpWise", collectionobj);
        getData.then(function (response) {
            messagevalues = [
               { "From Date": $scope.FromDate },    
               { "To Date": $scope.ToDate },
               { "Class": $('#ddlClass option:selected').text() },
               { "Section": $('#ddlSection option:selected').val() == "" ? "" : $('#ddlSection option:selected').text() },
               { "Subject": $('#ddlSubject option:selected').text() },
                 { "Homework Topic": $('#ddlHomeworkTopic option:selected').text() }
             
            ];
            debugger;
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "EmployeeName", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "TopicName", "HeaderValue": "TopicName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "EmployeeName", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "ClassName", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "SectionName", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "SubjectName", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsAttachment", "HeaderValue": "Attachment", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Is Vedio HomeWork", "HeaderValue": "VedioPath", "Width": "140px", "ShowColumn": "No", "ImageColumn": "Yes", "CssClass": "T-PPC" },
                ];

            loadDataUsingPreDefinedColumn(tblheader, response.data);


        });
    }

    $scope.HomeworkTopic = function () {
        debugger;
        var collectionobj = {};
        collectionobj.Action = '27';
        collectionobj.schoolCode = schoolCode;
        collectionobj.branchCode = branchCode;
        collectionobj.Subject = SubjectId
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.ClassId = $('#ddlClass').val();
        collectionobj.SectionId = $("#ddlSection").val();
        collectionobj.SubjectId = $('#ddlSubject').val();
        collectionobj.EmployeeId = $scope.Code;
        getData = myService.methode('POST', "../Homework/GetHomeWorkTopicClassSectionSubjectEmpWise", '{ obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response)
        {
            $scope.HomeworkTopic = response.data;

        });
        $scope.$applyAsync();
    }
 
    //$scope.BindEmpClass = function () {

    //    $scope.tblhideHomeworkDetails = true;
    //    var collectionobj = {};
    //    collectionobj.SessionId = sessionId;
    //    collectionobj.FYId = fyId;
    //    collectionobj.SchoolCode = schoolCode;
    //    collectionobj.BranchCode = branchCode;
    //    collectionobj.EmployeeCode = $scope.Code;
    //    var getData = myService.methode('POST', "../Homework/GetEmployeeClass", '{obj:' + JSON.stringify(collectionobj) + '}');
    //    getData.then(function (response) {
    //        $scope.classRec = response.data;
    //    });
    //}
    //$scope.BindEmpSection = function () {
    //    debugger;
    //    var collectionobj = {};
    //    collectionobj.SessionId = sessionId;
    //    collectionobj.FYId = fyId;
    //    collectionobj.SchoolCode = schoolCode;
    //    collectionobj.BranchCode = branchCode;
    //    collectionobj.ClassId = $('#ddlClass').val();
    //    collectionobj.EmployeeCode = $scope.Code;
    //    var getData = myService.methode('POST', "../Homework/GetEmployeeSection", '{obj:' + JSON.stringify(collectionobj) + '}');
    //    getData.then(function (response) {
    //        $scope.SecRec = response.data;
    //    });
    //}

    $scope.ddlClass_Change = function (ClassCode) {
        $scope.GetSections(ClassCode);
    }
    //$scope.BindDetails = function () {
    //    debugger;
    //    collectionobj.Action;
    //    collectionobj.Rel
    //    var getData = myService.methode('POST', '../DashBoard/GetUserDetails', '{userid:' + JSON.stringify(userid) + ',schoolcode:' + JSON.stringify(schoolCode) + ',branchcode:' + JSON.stringify(branchCode) + '}');
    //    var getData = myService.methode('POST', '../DashBoard/GetUserDetails', '{userid:' + JSON.stringify(userid) + ',schoolcode:' + JSON.stringify(schoolCode) + ',branchcode:' + JSON.stringify(branchCode) + '}');
    //    getData.then(function (response) {
    //        debugger;
    //        $scope.Code = response.data[0].Code;
    //        sessionStorage.setItem("code", $scope.Code);
    //        $scope.BindEmpClass();
    //    });
    //}




}
