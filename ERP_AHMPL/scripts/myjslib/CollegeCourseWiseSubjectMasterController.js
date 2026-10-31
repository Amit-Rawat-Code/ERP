app.CollegeCourseWiseSubjectMasterController = function ($scope, $element, $filter, myService) {
    $scope.disableForEdit = false;
    $scope.SetFocus('#ddlClass');
    $scope.disabledDDLClass = false;
    $scope.SemesterList = [];

    $scope.ddlBranch_change = function (CourseCode) {
        //debugger
        if (CourseCode != '') {
            $scope.GetSemesterList(CourseCode);
        }
        else {
            $scope.SemesterList = [];
        }
    }
    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
    $scope.GetSemesterList = function (CourseCode) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.CourseCode = CourseCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetSemesterList', collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.SemesterList = ($filter('filter')(response.data, { 'CourseCode': CourseCode }, true));
        });
    }
    $scope.selectedSectionCount = 0;
    $scope.AllSection = function () {
        angular.forEach($scope.SemesterList, function (CI) {
            CI.chk = $scope.chkAllSection;
        });
    }

    $scope.GetSubjectGroup = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetSubjectGroup', collectionobj);
        getData.then(function (response) {
            $scope.SubjectGruopList = response.data;
        });
    }

    $scope.selectedSubjectGroupCount = 0;
    $scope.AllSubjectGroup = function () {
        angular.forEach($scope.SubjectGruopList, function (CI) {
            CI.chk = $scope.chkAllSubjectGroup;
        });
    }

    $scope.GetSubjectDetail = function () {
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.SemesterCode = JSON.stringify(($filter('filter')($scope.SemesterList, { 'chk': true }, true)));
        collectionobj.SubjectGroupData = JSON.stringify(($filter('filter')($scope.SubjectGruopList, { 'chk': true }, true)));
        collectionobj.SessionId = sessionId;
        collectionobj.Code = $scope.hfId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetClassWiseSubjectMaster', collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.SubjectList = response.data.Table;
        });
    }

    $scope.Reset = function (obj) {
        if (obj.Type == '0') {
            obj.IsExam = false;
            obj.PeriodInWeek = "";

            obj.Monday = false;
            obj.Tuesday = false;
            obj.Wednesday = false;
            obj.Thursday = false;
            obj.Friday = false;
            obj.Saturday = false;
            obj.Sunday = false;
            obj.chkWS = false;
        }
        else {
            obj.Monday = true;
            obj.Tuesday = true;
            obj.Wednesday = true;
            obj.Thursday = true;
            obj.Friday = true;
            obj.Saturday = true;
            obj.Sunday = false;
            obj.chkWS = false;
        }
    }
    $scope.fnChkWS = function (obj) {
        if (obj.chkWS) {
            obj.Monday = true;
            obj.Tuesday = true;
            obj.Wednesday = true;
            obj.Thursday = true;
            obj.Friday = true;
            obj.Saturday = true;
            obj.Sunday = true;
        }
        else {
            obj.Monday = false;
            obj.Tuesday = false;
            obj.Wednesday = false;
            obj.Thursday = false;
            obj.Friday = false;
            obj.Saturday = false;
            obj.Sunday = false;

        }
    }

    $scope.checkAll = function (obj) {
        if (obj.Monday == false) {
            obj.chkWS = false;
        } else if (obj.Tuesday == false) {
            obj.chkWS = false;
        } else if (obj.Wednesday == false) {
            obj.chkWS = false;
        } else if (obj.Thursday == false) {
            obj.chkWS = false;
        } else if (obj.Friday == false) {
            obj.chkWS = false;
        } else if (obj.Saturday == false) {
            obj.chkWS = false;
        } else if (obj.Sunday == false) {
            obj.chkWS = false;
        }
        else {
            obj.chkWS = true;
        }
    }


    $scope.$on('tablecellmarge', function () {
        $('#example2').margetable({
            type: 2,
            colindex: [1, 2]
        });
    });

    /* Save Button Click Event */
    $scope.SaveRecord = function () {
        //debugger
        if (isValidate()) {
            if (($filter('filter')($scope.SubjectList, { 'Type': '!' + '0' }, true)).length > 0) {
                var collectionobj = {};
                collectionobj.Code = $scope.hfId;
                collectionobj.CourseCode = $scope.CourseCode;
                collectionobj.BranchCode = $scope.BranchCode;
                collectionobj.SemesterData = JSON.stringify(($filter('filter')($scope.SemesterList, { 'chk': true }, true)));
                collectionobj.SubjectGroupData = JSON.stringify(($filter('filter')($scope.SubjectList, { 'Type': '!' + '0' }, true)));
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                collectionobj.IsActive = $scope.IsActive;
                var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteClassWiseSubjectMaster', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
        };
    }

    $scope.CourseWiseSubjectMasterList = [];
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
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetClassWiseSubjectMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Course", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "HeaderValue": "CollegeBranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Semester", "HeaderValue": "Semester", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "CourseCode", "HeaderValue": "CourseCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "BranchCode", "HeaderValue": "BranchCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "SemesterCode", "HeaderValue": "SemesterCode", "Width": "100%", "ShowColumn": "NO", "ImageColumn": "No" },
                    { "HeaderText": "Subject Group Name", "HeaderValue": "SubjectGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject Name", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.CourseWiseSubjectMasterList = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table3);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();

                $scope.CourseWiseSubjectMasterList = $filter('filter')($scope.CourseWiseSubjectMasterList, { 'Code': $scope.hfId }, true);
                //debugger
                $scope.SemesterCode = $scope.CourseWiseSubjectMasterList[0].SemesterCode;
                $scope.CourseCode = $scope.CourseWiseSubjectMasterList[0].CourseCode;
                $scope.GetCollegeBranch($scope.CourseCode);
                $scope.BranchCode = $scope.CourseWiseSubjectMasterList[0].BranchCode;
                $scope.SemesterList = $filter('filter')(response.data.Table1, { 'CourseCode': $scope.CourseCode, CollegeCourseWiseSubjectMasterCode: $scope.hfId,chk:true }, true);
                //$scope.SubjectGruopList = response.data.Table2;
                $scope.SubjectGruopList = response.data.Table2
                //debugger;
                setTimeout(function () {
                    //debugger
                    var collectionobj = {};
                    collectionobj.Action = "6";
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.SemesterData = JSON.stringify(($filter('filter')($scope.SemesterList, { 'chk': true }, true)));
                    collectionobj.CourseCode = $scope.CourseCode;
                    collectionobj.SubjectGroupData = JSON.stringify(($filter('filter')($scope.SubjectGruopList, { 'chk': true }, true)));
                    collectionobj.SessionId = sessionId;
                    collectionobj.Code = $scope.hfId;
                    var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetClassWiseSubjectMaster', collectionobj);
                    getData.then(function (response) {
                        //debugger
                        $scope.SubjectList = response.data.Table;
                    });
                }, 500);
                $scope.hideLoader();
                //$scope.disableAdd = true;
                $scope.disableForEdit = true;
                $scope.disableDelete = false;
                $scope.disabledDDLClass = true;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlClass', true);
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
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteClassWiseSubjectMaster', collectionobj);
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
        $scope.disableForEdit = false;
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.disabledDDLClass = false;
        $scope.hfId = "";
        $scope.CourseCode = "";
        $scope.BranchCode = "";
        $scope.SemesterList = [];
        $scope.SubjectGruopList = [];
        $scope.GetSubjectGroup();
        $scope.SubjectList = [];
        $scope.IsActive = "true";
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
}