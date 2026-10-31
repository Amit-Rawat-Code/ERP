app.SyllabusCoverageController = function ($scope, $element, $filter, myService) {

    $scope.EntryDate = new Date();

    $scope.ChapterCode = "";

    $scope.GetAssociatedBranches(sessionId);

    $scope.GetAllClass = function () {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.CreatedBy = userid;

        collectionobj.RelationshipId = $scope.RelationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetClass', collectionobj);
        getData.then(function (response) {
            $scope.ClassList = response.data;
        });
    };

    $scope.GetAllSection = function () {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.ClassCode = $scope.class;
        collectionobj.CreatedBy = userid;

        collectionobj.RelationshipId = $scope.RelationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetSection', collectionobj);
        getData.then(function (response) {
            $scope.SectionList = response.data;
        });
    };

    $scope.GetAllSubject = function () {
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.ClassCode = $scope.class;
        collectionobj.SectionCode = $scope.Section;
        collectionobj.CreatedBy = userid;

        collectionobj.RelationshipId = $scope.RelationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetSubjectListUsingLoginId', collectionobj);
        getData.then(function (response) {
            $scope.SubjectList = response.data;
        });
    };

    $scope.SearchRecord = function () {
        $('#CollapseSearchTableList').fadeIn();
        $scope.GetAllBookChapterPeriodList();
    };

    $scope.GetAllBookChapterPeriodList = function () {

        var collectionobj = {};
        collectionobj.Action = 1;

        collectionobj.ClassCode = $scope.class;
        collectionobj.SubjectCode = $scope.Subject;
        collectionobj.CreatedBy = userid;

        collectionobj.RelationshipId = $scope.RelationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentReportApi/GetChapterStatusForReport', collectionobj);
        getData.then(function (response) {           
            messagevalues = [
                { "Class": $scope.class == "" ? "" : $('#ddlClass option:selected').text() },
                { "Section": $scope.Section == "" ? "" : $('#ddlSection option:selected').text() },
                { "Subject": $scope.Subject == "" ? "" : $('#ddlSubject option:selected').text() }
            ];
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px" },                    
                    { "HeaderText": "Book Name", "HeaderValue": "NameOfBook", "Width": "70%" },
                    { "HeaderText": "Chapter Name", "HeaderValue": "ChapterName", "Width": "70%"},
                    { "HeaderText": "Status", "HeaderValue": "Status_Caption", "Width": "70%" },
                    { "HeaderText": "Covered Date(In Months)", "HeaderValue": "StatusDate", "Width": "80%" },
                    { "HeaderText": "Taken Period", "HeaderValue": "Total_TransID", "Width": "100%"},
                    { "HeaderText": "Assign period", "HeaderValue": "NoOfPeriod", "Width": "100%"},
                    { "HeaderText": "Deviation", "HeaderValue": "Deviation", "Width": "100%"},
                ];
            var object = {
                tblheader: tblheader,
                tblbody: response.data,
                tblshowfooter: 0,
                BodyGrid: 1,
                SummaryGrid: 0
            }
            $scope.SearchReportGrid(object);
        });
    };
}