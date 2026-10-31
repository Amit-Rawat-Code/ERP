app.ScholasticGroupMappingController = function ($scope, $element, $filter, myService, $q)
{
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

    //$scope.GetSection = function (ClassCode) {
    //    var collectionobj = {};
    //    collectionobj.Action = "6";
    //    collectionobj.ClassCode = ClassCode;
    //    collectionobj.RelationshipId = relationshipId;
    //    collectionobj.FYId = fyId;
    //    collectionobj.SessionId = sessionId;
    //    var getData = myService.methode('POST', '../Api/TimeTableApi/GetSectionList', collectionobj);
    //    getData.then(function (response) {
    //        $scope.SectionList = ($filter('filter')(response.data, { 'ClassCode': ClassCode }, true));
    //    });
    //}
        
    $scope.GetAllExams = function () {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.AcademicSessionID = fyId;
        collectionobj.ClassCode = $scope.class;

        //collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        //var getData = myService.methode('POST', '../Api/ExamMasterApi/GetExamGroupToExamMaster', collectionobj);
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetChapterTopicMapping', collectionobj);
        getData.then(function (response) {
            $scope.ExamList = response.data;
        });
    };   

    $scope.GetAllSubject = function () {
        $scope.SubjectList = [];
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.ClassCode = $scope.class;

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetSGroupSkillMapping', collectionobj);
        getData.then(async function (response) {
            $scope.SubjectList = response.data;

            await $scope.GetAllSkillName().then(function (responseSkillNameList) {
                sessionStorage.setItem("SkillNameList", JSON.stringify(responseSkillNameList));
            })
            $scope.ScholasticList.push({
                Srno: "1",
                SubjectCode: "",                
                SkillGroupCode: "",
                SubjectList: $scope.SubjectList,
                SkillNameList: JSON.parse(sessionStorage.getItem("SkillNameList")),
                SkillGroupList: $scope.SkillGroupList
            });
            $scope.$applyAsync();
        });
    };
    
    $scope.LoadSubjects = function (obj) {
        obj.SubjectList = $scope.SubjectList;
        $scope.$applyAsync();
    }
   
    $scope.GetAllSkillName = async function () {
        return $q(async function (resolve,reject) {
            $scope.SkillNameList = [];
            var collectionobj = {};
            collectionobj.Action = "5";

            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            var getData = myService.methode('POST', '../Api/ExamMasterApi/GetSkillGradeMaster', collectionobj);
            await getData.then(function (response) {
                resolve(response.data);
            });
        });
    };

    $scope.LoadAllSkills = function (obj) {
        if ($scope.Save == "Save") {
            if (sessionStorage.getItem("SkillNameList") != null && sessionStorage.getItem("SkillNameList") != {})
                obj.SkillNameList = JSON.parse(sessionStorage.getItem("SkillNameList"));
            $scope.$applyAsync();
        }
    };

    $scope.SkillGroupList = [];
    $scope.GetAllSkillGroup = function () {
        $scope.SkillGroupList = [];
        var collectionobj = {};
        collectionobj.Action = "6";

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetSkillGradeMaster', collectionobj);
        getData.then(async function (response) {
            $scope.SkillGroupList = response.data;
        });
    };

    $scope.LoadSkillGroup = function (obj) {
        obj.SkillGroupList = $scope.SkillGroupList;
        $scope.$applyAsync();
    }
    $scope.GetAllSkillGroup();

    $scope.GetAllReportCardComponent = function () {
        var collectionobj = {};
        collectionobj.Action = "6";
        
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetSGroupSkillMapping', collectionobj);
        getData.then(function (response) {
            $scope.ComponentList = response.data;
        });
    };
    $scope.GetAllReportCardComponent();

    $scope.ScholasticList = [];
    $scope.AddRow = function () {
        $scope.ScholasticList.push({
            Srno: "1",
            SubjectCode: "",           
            SkillGroupCode: "",
            SubjectList: [],
            SkillNameList: [],
            SkillGroupList:[]
        });
    }

    $scope.RemoveRow = function (srno) {
        $scope.ScholasticList = $filter('filter')($scope.ScholasticList, { Srno: '!' + srno });
    }
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.ClassCode = $scope.class;
            collectionobj.ExamCode = $scope.exam;
            collectionobj.ComponentCode = $scope.component;
            collectionobj.SubjectSkillData = JSON.stringify($scope.ScholasticList);

            collectionobj.FYId = fyId;
            collectionobj.RelationShipId = relationshipId;
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
            var getData = myService.methode('POST', '../Api/ExamMasterApi/InsertUpdateDeleteSGroupSkillMapping', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.SubjectSkillList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    }

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.FYId = fyId;
        collectionobj.RelationShipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetSGroupSkillMapping', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class Name", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Exam Name", "HeaderValue": "ExamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Report Card Component", "HeaderValue": "ComponentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.SubjectSkillList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {                
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.SubjectSkillList = $filter('filter')($scope.SubjectSkillList, { 'Code': $scope.hfId }, true);

                $scope.class = $scope.SubjectSkillList[0].ClassCode;
                $scope.GetAllExams();
                $scope.exam = $scope.SubjectSkillList[0].ExamCode;
                $scope.component = $scope.SubjectSkillList[0].ComponentCode;

                $scope.GetAllSubject();
                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                debugger
                var getData = myService.methode('POST', '../Api/ExamMasterApi/GetSGroupSkillMapping', collectionobj);
                getData.then(function (response) {
                    if (response.data) {
                        $scope.ScholasticList = response.data;
                        angular.forEach($scope.ScholasticList, function (obj) {
                            obj.SkillNameList = JSON.parse(obj.SkillNameList);
                            $scope.$applyAsync();
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
                $scope.SetFocus('#ddlclass');
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

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/InsertUpdateDeleteSGroupSkillMapping', collectionobj);
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
        $scope.hfId = "";

        $scope.class = '';
        $scope.exam = '';
        $scope.component = '';        
        $scope.ScholasticList = [];        
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
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
                { "HeaderText": "Class Name", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Exam Name", "HeaderValue": "ExamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Report Card Component", "HeaderValue": "ComponentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.ScholasticList, window.document.title);
    };
}