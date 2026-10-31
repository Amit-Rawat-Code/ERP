app.MarkingSchemeMasterController = function ($scope, $element, $filter, myService)
{
    $scope.SetFocus('#ddlSession'); 
    $scope.MarkingSchemeList = [];
    $scope.ChapterTopicList = [];

    $scope.GetAllClass = function () {
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.AcademicSessionID = $scope.SessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;        
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetMarkingSchemeMaster', collectionobj);
        getData.then(function (response) {
            $scope.ClassList = response.data;
        });
    };

    $scope.GetAllSubject = function () {
        var collectionobj = {};
        collectionobj.Action = 9;
        collectionobj.ClassCode = $scope.class;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetMarkingSchemeMaster', collectionobj);
        getData.then(function (response) {
            $scope.SubjectList = response.data;           
        });
    };
        
    $scope.GetAllChapterWithTopic = function () {      
        var collectionobj = {};
        collectionobj.Action = 6;

        collectionobj.AcademicSessionID = $scope.SessionId;
        collectionobj.ClassCode = $scope.class;
        collectionobj.SubjectCode = $scope.Subject;

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;        
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetMarkingSchemeMaster', collectionobj);
        getData.then(function (response) {
            $scope.ChapterTopicList = response.data;
            angular.forEach(response.data, function (obj) {
                obj.MarksList = JSON.parse(obj.MarksList);
            });
        });
    };

    $scope.GetAllMarks = function (obj) {
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetMarkingSchemeMaster', collectionobj);
        getData.then(function (response) {
            $scope.MarksList = response.data;           
        });
    };

    $scope.GetAllMarks();

    $scope.TotalMarks = function (obj) { 
        var sum = 0;
        var totalmarks = 0;
        angular.forEach(obj.MarksList, function (array) {
            if ((totalmarks+(Number(array.NoofQuestions) * array.Marks)) > Number(obj.marks)) {
                array.NoofQuestions = 0;
                showMsgBox("Total No. of questions marks can not greater Exam Marks.");
            }
            else {
                totalmarks += Number(array.NoofQuestions) * array.Marks;
                sum += Number(array.NoofQuestions);
            }            
        });
        obj.Total = sum;
    };
    
    /* Save Button Click Event */
    $scope.SaveRecord = function () {
        if (isValidate()) {            
            var collectionobj = {};

            collectionobj.AcademicSessionID = $scope.SessionId;
            collectionobj.ClassCode = $scope.class;
            collectionobj.SubjectCode = $scope.Subject;
            
            collectionobj.MarkingSchemeMasterData = JSON.stringify($scope.ChapterTopicList);

            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.IsActive = true;

            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }

            var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteMarkingSchemeMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

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

        var getData = myService.methode('POST', '../Api/AssessmentApi/GetMarkingSchemeMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Academic Session", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },                    
                ];

            $scope.MarkingSchemeList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();

                //------------------------Disabled-------------------------
                $scope.clsSession = true;
                $scope.clsClass = true;
                $scope.clsSubject = true;
                //------------------------Disabled-------------------------

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                
                $scope.MarkingSchemeList = $filter('filter')($scope.MarkingSchemeList, { 'Code': $scope.hfId }, true);
                $scope.SessionId = $scope.MarkingSchemeList[0].AcademicSessionID.toString();
                $scope.class = $scope.MarkingSchemeList[0].ClassCode;
                $scope.Subject = $scope.MarkingSchemeList[0].SubjectCode;

                $scope.GetAllClass();
                $scope.GetAllSubject();
            
                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;                
                var getData = myService.methode('POST', '../Api/AssessmentApi/GetMarkingSchemeMaster', collectionobj);
                getData.then(function (response) {
                    if (response.data) {
                        $scope.ChapterTopicList = response.data;
                        angular.forEach(response.data, function (obj) {
                            obj.MarksList = JSON.parse(obj.MarksList);
                        });
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
        var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteMarkingSchemeMaster', collectionobj);
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

        //------------------------Enabled-------------------------
        $scope.clsSession = false;
        $scope.clsClass = false;
        $scope.clsSubject = false;
        //------------------------Enabled-------------------------

        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";

        $scope.MarkingSchemeList = [];        
        $scope.ChapterTopicList = [];

        $scope.SessionId = '';
        $scope.class = '';
        $scope.Subject = '';
        $scope.SetFocus('#ddlSession');

        $scope.$applyAsync();       
        if (flag == 0) {
            showMsgBox('4');
            $scope.SetFocus("#SessionId"); 
        };
    };

    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
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

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Academic Session", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.MarkingSchemeList, window.document.title);
    };
}