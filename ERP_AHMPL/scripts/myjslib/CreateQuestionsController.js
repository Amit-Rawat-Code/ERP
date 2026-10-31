app.CreateQuestionsController = function ($scope, $element, $filter, myService) {
    $scope.GetAllClass = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetClassWiseSubjectWiseBook', collectionobj);
        getData.then(function (response) {
            $scope.ClassList = response.data;
        });
    };


    $scope.AddRowByNumberOfOptions = function () {
        
        $scope.rowsList = [];

        for (var i = 0; i < $scope.NumberOfOption; i++)
        {
            $scope.rowsList.push({
                
            });
        }
    }

    $scope.GetAllSubject = function () {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.Code = $scope.Class;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetClassWiseSubjectWiseBook', collectionobj);
        getData.then(function (response) {
            $scope.SubjectList = response.data;
        });
    };
    $scope.GetAllConcept = function () {
        var collectionobj = {};
        collectionobj.Action = 10;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.SubjectCode = $scope.Subject;
        collectionobj.ClassCode = $scope.Class;
        collectionobj.BookName = $scope.Book;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetClassWiseSubjectWiseBook', collectionobj);
        getData.then(function (response) {
            $scope.ConceptList = response.data;
        });
    };
    $scope.GetAllChapter = function () {

        var collectionobj = {};
        collectionobj.Action = 11;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.SubjectCode = $scope.Subject;
        collectionobj.ClassCode = $scope.Class;
        collectionobj.BookName = $scope.Book;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetClassWiseSubjectWiseBook', collectionobj);
        getData.then(function (response) {
            $scope.ChapterList = response.data;
        });
    };
    $scope.GetAllBookName = function () {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetBookChapterMaster', collectionobj);
        getData.then(function (response) {
            $scope.BookNameList = response.data;
        });
    };
    $scope.SetQuestionType = function () {
        if ($scope.QuestionType == "Objective") {
            $scope.OptionsTypeDiv = false;
            $scope.NumberOfOptionDiv = false;
            $scope.QuestionTextDiv = true;
            $scope.ComprehensiveQuestionTypeDiv = true;
        }
        else if ($scope.QuestionType == "Comprehensive") {
            $scope.OptionsTypeDiv = true;
            $scope.QuestionTextDiv = false;
            $scope.NumberOfOptionDiv = true;
            $scope.ComprehensiveQuestionTypeDiv = false;
        }
        else {
            $scope.OptionsTypeDiv = true;
            $scope.QuestionTextDiv = false;
            $scope.NumberOfOptionDiv = true;
        }
    }
    $scope.SetComprehensiveQuestionType = function () {

        if ($scope.ComprehensiveQuestionType == "Objective") {
            $scope.OptionsTypeDiv = false;
            $scope.NumberOfOptionDiv = false;
            $scope.QuestionTextDiv = false;
            $scope.ComprehensiveQuestionTypeDiv = false;
            $scope.ComprehensiveQuestionTextDiv = true;
        }
        else {
            $scope.OptionsTypeDiv = true;
            $scope.NumberOfOptionDiv = true;
            $scope.QuestionTextDiv = false;
            $scope.ComprehensiveQuestionTypeDiv = false;
            $scope.ComprehensiveQuestionTextDiv = false;
        }
    }


    /* Save Button Click Event */
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.ClassCode = $scope.class;
            collectionobj.SubjectCode = $scope.Subject;
            collectionobj.BookName = $scope.Books;
            collectionobj.ConceptChapterMappingData = JSON.stringify($scope.ConceptChapterMappingList);
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteConceptChapterMapping', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.ConceptChapterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetConceptChapterMapping', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Name of Book", "HeaderValue": "NameOfBook", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }

                ];

            $scope.ConceptChapterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ConceptChapterList = $filter('filter')($scope.ConceptChapterList, { 'Code': $scope.hfId }, true);
                $scope.ConceptChapterList = $scope.ConceptChapterList;
                $scope.class = $scope.ConceptChapterList[0].ClassCode;
                $scope.Subject = $scope.ConceptChapterList[0].SubjectCode;
                $scope.Books = $scope.ConceptChapterList[0].BookCode;
                $scope.GetAllClass();
                $scope.GetAllSubject();
                $scope.GetAllBook();
                $scope.GetAllConcept();
                $scope.GetAllChapter();
                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/AssessmentApi/GetConceptChapterMapping', collectionobj);
                getData.then(function (response) {
                    if (response.data) {
                        $scope.ConceptChapterMappingList = response.data;
                    }
                });
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                //$scope.SetFocus('#ddlSession', true);
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteConceptChapterMapping', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
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
        $scope.ConceptChapterList = [];
        $scope.ConceptChapterMappingList = [];
        $scope.class = '';
        $scope.Subject = '';
        $scope.Books = '';
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
}
