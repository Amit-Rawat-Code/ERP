app.DefineExamSubjectWiseController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlClassSection');

    $scope.ddlClass_Change = function () {
 

        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.SectionCode = $scope.AllClassSection;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "/Api/ExamMasterApi/GetSubjectCodeUsingClassSection", collectionobj);
        getData.then(function (response) {
        
            $scope.SubjectList = response.data;
        }); 
    }
    $scope.ddl_Subject_Change = function () {
        
        $scope.GetAllExamsGroup();
    }

    $scope.GetAllExamsGroup = function () {
       
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetExamGroupToExamMaster', collectionobj);
        getData.then(function (response) {
          
            $scope.ExamGroupList = response.data;
        });
    };

    $scope.ddl_Group_Change = function (GroupCode)
    {
        $scope.GetAllExams(GroupCode)
    }

    $scope.GetAllExams = function (Code) {
       
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.AcademicSessionID = sessionId;
        collectionobj.GroupCode = Code;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetExamByExamGroup', collectionobj);
        getData.then(function (response) {
            
            $scope.ExamList = response.data;
        });
    };
    
    $scope.SaveRecord = function () {
      
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.SectionCode = $scope.AllClassSection;
            collectionobj.SubjectCode = $scope.SubjectCode;
            collectionobj.GroupCode = $scope.GroupCode;
            collectionobj.ExamCode = $scope.ExamCode;
            collectionobj.EntryType = $scope.EntryType;
            collectionobj.MaxMarks = $scope.MaxMarks;
            collectionobj.PassingMarks = $scope.PassingMarks;
            collectionobj.ReportCardMark = $scope.ReportCardMark;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            var getData = myService.methode('POST', "/Api/ExamMasterApi/InsertUpdateDeleteDefineExamSubjectWise", collectionobj);
            getData.then(function (response) {
                
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
        else {
            showMsgBox("Oops! Please Select Signature....");
            $scope.hideLoader();
        }
    }
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
        $scope.AllClassSection = '';
        $scope.SubjectCode = '';
        $scope.GroupCode = '';
        $scope.ExamCode = '';
        $scope.EntryType = '';
        $scope.MaxMarks = '';
        $scope.PassingMarks = '';
        $scope.ReportCardMark = '';
        $scope.AllClassSection = '';
        $scope.TeacherCode = '';
        $scope.SetFocus('#ddlClassSection')
        $scope.hfId = "";
        if (flag == 0) {
            showMsgBox('4');
        };
    }

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
     
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/ExamMasterApi/GetDefineExamSubjectWise", collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class-SectionName", "HeaderValue": "ClassSectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject Name", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Group Name", "HeaderValue": "ExamGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Exam Name", "HeaderValue": "ExamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Exam Group Name", "HeaderValue": "ExamGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Max Marks", "HeaderValue": "MaxMarks", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Passing Marks", "HeaderValue": "PassingMarks", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Report Card Marks", "HeaderValue": "RCM", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.DefineExamSubjectWiseList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
               
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.DefineExamSubjectWiseList = $filter('filter')($scope.DefineExamSubjectWiseList, { 'Code': $scope.hfId });
                $scope.AllClassSection = $scope.DefineExamSubjectWiseList[0].SectionCode;
                $scope.SubjectCode = $scope.DefineExamSubjectWiseList[0].SubjectCode;
                $scope.ddlClass_Change();
                
                $scope.ddl_Subject_Change();
                $scope.GroupCode = $scope.DefineExamSubjectWiseList[0].GroupCode;
                
                $scope.ExamCode = $scope.DefineExamSubjectWiseList[0].Examcode;
                $scope.ddl_Group_Change($scope.GroupCode);
                
                $scope.EntryType = $scope.DefineExamSubjectWiseList[0].EntryTypeCode;
                $scope.MaxMarks = $scope.DefineExamSubjectWiseList[0].MaxMarks;
                $scope.PassingMarks = $scope.DefineExamSubjectWiseList[0].PassingMarks;
                $scope.ReportCardMark = $scope.DefineExamSubjectWiseList[0].RCM;
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#Signature', true);
                $scope.hideLoader();


            });
        });
    };

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.Code = $scope.hfId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;

        var getData = myService.methode('POST', "../Api/ExamMasterApi/InsertUpdateDeleteUploadPrincipalSignature", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
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
                { "HeaderText": "Keyword", "HeaderValue": "Keyword", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "KeywordDescription", "HeaderValue": "KeywordDescription", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.UnitMasterList, window.document.title);
    };


}