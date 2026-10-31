app.ExamSubjectTeacherMappingController = function ($scope, $element, $filter, myService)
{
    $scope.AddRow = function (obj, index)
    {
        $scope.ClassSubjectTeacherList.splice(index + 1, 0, {
            SubjectGroupCode: obj.SubjectGroupCode,
            SubjectCode: obj.SubjectCode,
            SubjectGroupName: obj.SubjectGroupName,
            SubjectName: obj.SubjectName,
            NoOfPeriodInWeek: obj.NoOfPeriodInWeek,
            EmployeeCode: "",
            IsDuplicate: true
        });
    }

    $scope.RemoveRow = function (srno)
    {
        $scope.ClassSubjectTeacherList = $filter('filter')($scope.ClassSubjectTeacherList, { Srno: '!' + srno });
    }
    $scope.ddlClass_Change = function (classCode)
    {
        
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.ClassCode = classCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetSectionList', collectionobj);
        getData.then(function (response) {
            $scope.Sections = ($filter('filter')(response.data, { 'ClassCode': classCode }, true));
        });
    }

    $scope.GetEmployee = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetEmployeeList', collectionobj);
        getData.then(function (response) {

            $scope.TeacherList = response.data;
        });
    }
    $scope.FillClassSubjectWithTeacherMaster = function ()
    {
        
        var collectionobj = {};
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/AssessmentApi/GetExamSubjectTeacherMapping", collectionobj);
        getData.then(function (response) {
            $scope.ClassSubjectTeacherList = response.data;
        });
    }
    $scope.ImportDataButtonClick = function ()
    {
        
        if (isValidate())
        {
            
            var collectionobj = {};
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode;
            collectionobj.BranchCode = $scope.BranchCode;
            collectionobj.StreamCode = $scope.StreamCode;
            collectionobj.Action = 9;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            var getData = myService.methode('POST', "../Api/AssessmentApi/GetExamSubjectTeacherMapping", collectionobj);
            getData.then(function (response)
            {
                $scope.ClassSubjectTeacherList = response.data;
            });
        }
    }

    $scope.$watch('ClassCode', function ()
    {
        if (typeof ($scope.ClassCode) === 'undefined') return;
        $scope.FillClassSubjectWithTeacherMaster();
    })

    $scope.$watch('SectionCode', function ()
    {
        if (typeof ($scope.SectionCode) === 'undefined') return;
        $scope.FillClassSubjectWithTeacherMaster();
    })

    $scope.$watch('BranchCode', function ()
    {
        if (typeof ($scope.BranchCode) === 'undefined') return;
        $scope.FillClassSubjectWithTeacherMaster();
    })

    $scope.$watch('StreamCode', function () {
        if (typeof ($scope.StreamCode) === 'undefined') return;
        $scope.FillClassSubjectWithTeacherMaster();
    })

    /* Save Button Click Event */
    $scope.SaveRecord = function () {
        if (isValidate())
        {
            debugger
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode;
            collectionobj.BranchCode = $scope.BranchCode;
            collectionobj.StreamCode = $scope.StreamCode;
            collectionobj.ClassSubjectTeacherData = JSON.stringify($scope.ClassSubjectTeacherList);
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteExamSubjectTeacherMappingMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.ClassSubjectTeacherMasterList = [];
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
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetExamSubjectTeacherMapping', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    //{ "HeaderText": "Subject Group Name", "HeaderValue": "SubjectGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "Week Period", "HeaderValue": "WeeklyPeriod", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                    { "HeaderText": "Class", "Value": "ClassCode", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "Value": "SectionCode", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "Value": "BranchCode", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Stream", "Value": "StreamCode", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }

                ];

            $.each(response.data, function (index, obj) {
                var flag = false;
                $.each($scope.ClassSubjectTeacherMasterList, function (index1, obj1) {
                    if (obj1.Code == obj.Code) {
                        flag = true;
                    }
                });
                if (!flag)
                    $scope.ClassSubjectTeacherMasterList.push({
                        Code: obj.Code,
                        ClassName: obj.ClassName,
                        ClassCode: obj.ClassCode,
                        SectionName: obj.SectionName,
                        SectionCode: obj.SectionCode,
                        BranchName: obj.BranchName,
                        BranchCode: obj.BranchCode,
                        StreamName: obj.StreamName,
                        StreamCode: obj.StreamCode,
                        EmployeeName: obj.EmployeeName,
                        IsActive: obj.IsActive
                    });
            });
            loadDataUsingPreDefinedColumn(tblheader, $scope.ClassSubjectTeacherMasterList);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ClassSubjectTeacherMasterList = $filter('filter')($scope.ClassSubjectTeacherMasterList, { 'Code': $scope.hfId }, true);
               
                $scope.$parent.ClassCode = $scope.ClassSubjectTeacherMasterList[0].ClassCode;
                $scope.ddlClass_Change($scope.$parent.ClassCode);
                $scope.$parent.SectionCode = $scope.ClassSubjectTeacherMasterList[0].SectionCode;
                $scope.BranchCode = $scope.ClassSubjectTeacherMasterList[0].BranchCode;
                $scope.StreamCode = $scope.ClassSubjectTeacherMasterList[0].StreamCode;
                $scope.IsActive = $scope.ClassSubjectTeacherMasterList[0].IsActive == true ? "true" : "false";


                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;
                collectionobj.ClassCode = $scope.$parent.ClassCode;
                collectionobj.SectionCode = $scope.$parent.SectionCode;
                collectionobj.BranchCode = $scope.BranchCode;
                collectionobj.StreamCode = $scope.StreamCode;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/AssessmentApi/GetExamSubjectTeacherMapping', collectionobj);
                getData.then(function (response) {
                    $scope.ClassSubjectTeacherList = response.data;
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
        var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteExamSubjectTeacherMappingMaster', collectionobj);
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
        $scope.$parent.ClassCode = "";
        $scope.$parent.SectionCode = "";
        $scope.BranchCode = "";
        $scope.StreamCode = "";
        $scope.ClassSubjectTeacherList = [];
        $scope.ClassSubjectTeacherMasterList = [];
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
    ///*Refresh Search Table Record*/
    //$(document).on("click", ".RefreshSearchTable", function (e) {

    //    var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
    //    var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
    //    var loadingAnim = panelToRefresh.find('.loading-progress');
    //    panelToRefresh.show();
    //    setTimeout(function () {
    //        loadingAnim.addClass('la-animate');
    //    }, 100);
    //    $scope.started();
    //    return false;
    //});

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Subject Group Name", "HeaderValue": "SubjectGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Week Period", "HeaderValue": "WeeklyPeriod", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Branch", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }
            ];
        $scope.PrintMaster(tblheader, $scope.ClassSubjectTeacherMasterList, window.document.title);
    };


}