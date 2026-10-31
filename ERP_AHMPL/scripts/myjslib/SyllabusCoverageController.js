app.SyllabusCoverageController = function ($scope, $element, $filter, myService)
{
    $scope.EntryDate = new Date();
    $scope.ChapterCode = "";
    
    $scope.GetAllClass = function () {        
        var collectionobj = {};
        collectionobj.Action = 6;        
        collectionobj.CreatedBy = userid;

        collectionobj.RelationshipId = relationshipId;
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

        collectionobj.RelationshipId = relationshipId;
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

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetSubjectListUsingLoginId', collectionobj);
        getData.then(function (response) {
            $scope.SubjectList = response.data;
        });
    };
    
    $scope.GetAllBookChapterPeriodList = function () {
     
        var collectionobj = {};
        collectionobj.Action = 6;

        collectionobj.ClassCode = $scope.class;        
        collectionobj.SubjectCode = $scope.Subject;
        collectionobj.CreatedBy = userid;

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentTransactionApi/GetChapterStatus', collectionobj);
        getData.then(function (response) {
            $scope.ChapterList = response.data;
        });
    };

    $scope.GetAllStatus = function (obj) {
        $scope.ChapterCode = obj.ChapterID;

        var collectionobj = {};
        collectionobj.Action = 5;      
        collectionobj.Status = obj.Status;

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentTransactionApi/GetChapterStatus', collectionobj);
        getData.then(function (response) {
            $scope.StatusList = response.data;
        });
    };

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};

            collectionobj.ClassCode = $scope.class;
            collectionobj.SectionCode = $scope.Section;
            collectionobj.SubjectCode = $scope.Subject;

            collectionobj.ChapterCode = $scope.ChapterCode;
            collectionobj.EmployeeCode = code;

            collectionobj.StatusDate = $scope.EntryDate;
            collectionobj.Status = $scope.status;
            collectionobj.Remark = $scope.Remark;

            collectionobj.FYId = fyId;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;            
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            var getData = myService.methode('POST', '../Api/AssessmentTransactionApi/InsertUpdateDeleteChapterStatus', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.GetAllBookChapterPeriodList();
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {        
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";
        debugger
        $scope.EntryDate = new Date();
        $scope.status = '';
        $scope.Remark = '';
        $scope.GetAllBookChapterPeriodList();
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };

}