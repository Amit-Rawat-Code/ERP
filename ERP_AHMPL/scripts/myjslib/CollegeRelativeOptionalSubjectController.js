app.CollegeRelativeOptionalSubjectController = function ($scope, $element, $filter, myService) {
    
    $scope.GetOptionalSubjects = function () {
        var collectionobj = {};
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.semesterCode = $scope.semesterCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetRelativeOptionalSubjectMaster', collectionobj);
        getData.then(function (response) {
            $scope.OptionalSubjects = response.data;
        });
    };
    $scope.$watch('OptionalSubjectCode', function () {
        if (typeof ($scope.OptionalSubjectCode) === 'undefined') return;
        $scope.RelativeSubjectList = [];
        $scope.GetRelativeOptionalSubjects();
        $scope.RelativeSubjects = [];
    });

    $scope.$watch('CourseCode', function () {
        if (typeof ($scope.CourseCode) === 'undefined') return;
        $scope.GetOptionalSubjects();
    })

    $scope.$watch('semesterCode', function () {
        if (typeof ($scope.semesterCode) === 'undefined') return;
        $scope.GetOptionalSubjects();
    })

    $scope.$watch('BranchCode', function () {
        if (typeof ($scope.BranchCode) === 'undefined') return;
        $scope.GetOptionalSubjects();
    })

    $scope.$watch('OptionalSubjectCode', function () {
        if (typeof ($scope.OptionalSubjectCode) === 'undefined') return;
        $scope.GetOptionalSubjects();
    });

    $scope.GetRelativeOptionalSubjects = function () {
        if ($scope.OptionalSubjectCode === 'undefined' || $scope.OptionalSubjectCode == '') {
            $scope.RelativeOptionalSubjects = "";
        }
        else {
            var collectionobj = {};
            collectionobj.CourseCode = $scope.CourseCode;
            collectionobj.semesterCode = $scope.semesterCode;
            collectionobj.BranchCode = $scope.BranchCode;
            collectionobj.RelativeSubjectCode = $scope.OptionalSubjectCode;
            collectionobj.Action = "5";
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetRelativeOptionalSubjectMaster', collectionobj);
            getData.then(function (response) {
                $scope.RelativeOptionalSubjects = response.data;
            });
        }
    };

    $scope.RelativeSubjectList = [];
    $scope.AddtoCart = function (chkRelativeOptionalSubject, ddlOptionalSubject, RelativeOptionalSubjectCode, OptionalSubjectName) {
        var flag = 0;
        if ($(chkRelativeOptionalSubject).prop('checked')) {
            for (var i = 0; i < $scope.RelativeSubjectList.length; i++) {
                if ($scope.RelativeSubjectList[i].RelativeSubjectCode == RelativeOptionalSubjectCode) {
                    flag = 1;
                }
            }

            $scope.SubjectList = {
                "SubjectCode": $scope.OptionalSubjectCode,
                "RelativeSubjectCode": RelativeOptionalSubjectCode,
                "SubjectName": $(ddlOptionalSubject + ' option:selected').text(),
                "RelativeSubjectName": OptionalSubjectName
            };

            if (flag == 0)
                $scope.RelativeSubjectList.push($scope.SubjectList);
            $scope.RelativeSubjects = $scope.RelativeSubjectList;
        }
        else {
            for (var i = 0; i < $scope.RelativeSubjectList.length; i++) {
                if ($scope.RelativeSubjectList[i].RelativeSubjectCode == RelativeOptionalSubjectCode) {
                    flag = 1;
                    $scope.RelativeSubjectList.splice(i, 1);
                }
            }
        }
    };

    /* Save Button Click Event */
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.RelativeSubjectData = JSON.stringify($scope.RelativeSubjectList);
            collectionobj.CourseCode = $scope.CourseCode;
            collectionobj.semesterCode = $scope.semesterCode;
            collectionobj.BranchCode = $scope.BranchCode;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.UpdatedBy = userid;
            collectionobj.CreatedBy = userid;
            collectionobj.Action = "1";
            var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteRelativeOptionalSubjectMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
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
        $scope.CourseCode = "";
        $scope.semesterCode = "";
        $scope.StreamCode = "";
        $scope.IsActive = "true";
        $scope.RelativeSubjects = "";
        $scope.RelativeOptionalSubjectList = [];
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    }

    $scope.RelativeOptionalSubjectList = [];
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
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetRelativeOptionalSubjectMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Course", "Value": "CourseCode", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "Value": "BranchCode", "HeaderValue": "CollegeBranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Semester", "Value": "SemesterCode", "HeaderValue": "Semester", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Optional Subject", "Value": "OptionalSubjectCode", "HeaderValue": "OptionalSubject", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Relative Subject", "HeaderValue": "RelativeSubject", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }
                ];
            $scope.RelativeOptionalSubjectList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.RelativeOptionalSubjectList = $filter('filter')($scope.RelativeOptionalSubjectList, { 'Code': $scope.hfId }, true);
                $scope.CourseCode = $(FindHtml(row[1])).val();
                $scope.GetCollegeBranch($scope.CourseCode);
                $scope.BranchCode = $(FindHtml(row[2])).val();
                $scope.semesterCode = $(FindHtml(row[3])).val();                
                $scope.OptionalSubjectCode = $(FindHtml(row[5])).val();
                $scope.IsActive = $scope.RelativeOptionalSubjectList[0].IsActive == true ? "true" : "false";

                var collectionobj = {};
                collectionobj.Action = "6";
                collectionobj.Code = $scope.hfId;
                collectionobj.CourseCode = $scope.CourseCode;
                collectionobj.semesterCode = $scope.semesterCode;
                collectionobj.BranchCode = $scope.BranchCode;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetRelativeOptionalSubjectMaster', collectionobj);
                getData.then(function (response) {
                    $scope.RelativeSubjectList = [];
                    $.each(response.data, function (row, val) {
                        $scope.SubjectList = {
                            "SubjectCode": val.OptionalSubjectCode,
                            "RelativeSubjectCode": val.RelativeOptionalSubjectCode,
                            "SubjectName": val.SubjectName,
                            "RelativeSubjectName": val.RelativeSubjectName
                        };
                        $scope.RelativeSubjectList.push($scope.SubjectList);
                    })
                    $scope.RelativeSubjects = $scope.RelativeSubjectList;
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
    }

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.semesterCode = $scope.semesterCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteRelativeOptionalSubjectMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
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
                { "HeaderText": "Course", "Value": "CourseCode", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Branch", "Value": "BranchCode", "HeaderValue": "CollegeBranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Semester", "Value": "SemesterCode", "HeaderValue": "Semester", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Optional Subject", "Value": "OptionalSubjectCode", "HeaderValue": "OptionalSubject", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Relative Subject", "HeaderValue": "RelativeSubject", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }
            ];

        $scope.PrintMaster(tblheader, $scope.RelativeOptionalSubjectList, window.document.title);
    };
};