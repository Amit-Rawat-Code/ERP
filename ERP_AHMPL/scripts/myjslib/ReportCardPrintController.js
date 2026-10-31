app.ReportCardPrintController = function ($scope, $element, $filter, myService) {

    var academicSession = academicSession;

    $scope.GetAllClass = function () {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GblMasterApi/GetClasses', collectionobj);
        getData.then(function (response) {
            $scope.ClassList = response.data;
        });
    };

    $scope.GetAllExams = function () {
        var collectionobj = {};
        collectionobj.Action = 7;        
        collectionobj.ClassCode = $scope.class;

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;        
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetReportCard', collectionobj);
        getData.then(function (response) {
            $scope.ExamList = response.data;
        });
    };

    $scope.GetAllSubject = function () {      
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.ClassCode = $scope.class;

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetSGroupSkillMapping', collectionobj);
        getData.then(function (response) {           
            $scope.SubjectListSC = response.data;
        });
    };

    $scope.GetStudents = function () {
        var collectionobj = {};
        $scope.Show = true;
        collectionobj.SearchBox = $scope.SearchBox;
        collectionobj.Action = '1';

        collectionobj.ClassCode = $scope.class;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;        
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentDetailsForReportCard', collectionobj);
        getData.then(function (response) {
            $scope.StudentList = response.data;
        });
    };

    $scope.StudentDetail = {};
    $scope.GetEdit = function (ID) {
        $scope.Show = false;
        $scope.StudentList = $filter('filter')($scope.StudentList, { 'RegNo': ID }, true);
        $scope.StudentDetail = $scope.StudentList[0];

        $scope.GetReportCardComponent();
        $scope.GetSubjectList();
        $scope.GetAllSubject();
        $scope.GetCoSkills();
        $scope.GetLearning();
        $scope.GetGradingScale();          
    }

    $scope.ReportList = {};
    $scope.GetReportCardComponent = function () {        
        var collectionobj = {};                
        collectionobj.Action = '2';

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetReportCard', collectionobj);
        getData.then(function (response) {
            $scope.ReportList = JSON.parse(response.data[0].ReportList);
        });
    };

    $scope.SubjectList = [];
    $scope.GetSubjectList = function () {
        var collectionobj = {};
        collectionobj.Action = '3';
        collectionobj.ClassCode = $scope.class;

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetReportCard', collectionobj);
        getData.then(function (response) {
            $scope.SubjectList = JSON.parse(response.data[0].SubjectList);
        });
    };

    $scope.CoSkillList = [];
    $scope.GetCoSkills= function () {
        var collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.ClassCode = $scope.class;

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetReportCard', collectionobj);
        getData.then(function (response) {
            $scope.CoSkillList = JSON.parse(response.data[0].CoSkillList);
        });
    };

    $scope.LearningList = [];
    $scope.GetLearning = function () {
        var collectionobj = {};
        collectionobj.Action = '6';
        collectionobj.ClassCode = $scope.class;

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetReportCard', collectionobj);
        getData.then(function (response) {
            $scope.LearningList = JSON.parse(response.data[0].LearningList);
        });
    };

    $scope.GradeList = [];
    $scope.GetGradingScale = function () {
        var collectionobj = {};
        collectionobj.Action = '4';

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetReportCard', collectionobj);
        getData.then(function (response) {
            $scope.GradeList = JSON.parse(response.data[0].GradeList);
        });
    };

    $scope.PrintRecord = function () {
        $scope.Export('print');
    };
}