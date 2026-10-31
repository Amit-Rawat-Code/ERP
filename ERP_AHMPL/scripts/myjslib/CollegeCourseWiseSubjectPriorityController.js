app.CollegeCourseWiseSubjectPriorityController = function ($scope, $element, $filter, myService) {

    $scope.FillCourseWiseSubjectPriorityMaster = function () {
        var collectionobj = {};
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.SemesterCode = $scope.SemesterCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/CollegeTimeTableApi/GetCourseWiseSubjectPriority", collectionobj);
        getData.then(function (response) {
            $scope.CourseWiseSubjectPriorityList = response.data;
        });
    }

    $scope.$watch('CourseCode', function () {
        if (typeof ($scope.CourseCode) === 'undefined') return;
        $scope.FillCourseWiseSubjectPriorityMaster();
    })

    $scope.$watch('SemesterCode', function () {
        if (typeof ($scope.SemesterCode) === 'undefined') return;
        $scope.FillCourseWiseSubjectPriorityMaster();
    })

    $scope.$watch('BranchCode', function () {
        if (typeof ($scope.BranchCode) === 'undefined') return;
        $scope.FillCourseWiseSubjectPriorityMaster();
    })

    /* Save Button Click Event */
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.CourseCode = $scope.CourseCode;
            collectionobj.SemesterCode = $scope.SemesterCode;
            collectionobj.BranchCode = $scope.BranchCode;
            collectionobj.SubjectPriorityData = JSON.stringify($scope.CourseWiseSubjectPriorityList);
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
            var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteCourseWiseSubjectPriorityMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.CourseWiseSubjectPriorityMasterList = [];
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
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetCourseWiseSubjectPriority', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Id", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Course", "Value": "CourseCode", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "Value": "BranchCode", "HeaderValue": "CollegeBranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Semester", "Value": "SemesterCode", "HeaderValue": "Semester", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },                    
                    { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Priority", "HeaderValue": "Priority", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Consecutive", "HeaderValue": "IsConsecutive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }
                ];
            $scope.CourseWiseSubjectPriorityMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.CourseWiseSubjectPriorityMasterList = $filter('filter')($scope.CourseWiseSubjectPriorityMasterList, { 'Id': Number($scope.hfId) }, true);
                debugger;
                $scope.CourseCode = $(FindHtml(row[1])).val();
                $scope.GetCollegeBranch($scope.CourseCode);
                $scope.SemesterCode = $(FindHtml(row[3])).val();
                $scope.BranchCode = $(FindHtml(row[2])).val();
                $scope.IsActive = $scope.CourseWiseSubjectPriorityMasterList[0].IsActive == true ? "true" : "false";
                debugger;
                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;
                collectionobj.CourseCode = $scope.CourseCode;
                collectionobj.SemesterCode = $scope.SemesterCode;
                collectionobj.BranchCode = $scope.BranchCode;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetCourseWiseSubjectPriority', collectionobj);
                getData.then(function (response) {
                    $scope.CourseWiseSubjectPriorityList = response.data;
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
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.SemesterCode = $scope.SemesterCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/InsertUpdateDeleteCourseWiseSubjectPriorityMaster', collectionobj);
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
        $scope.CourseCode = "";
        $scope.SemesterCode = "";
        $scope.BranchCode = "";
        $scope.IsActive = "true";
        $scope.CourseWiseSubjectPriorityList = [];
        $scope.CourseWiseSubjectPriorityMasterList = [];
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
                { "HeaderText": "Sr.No.", "Value": "Id", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Course", "Value": "CourseCode", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },                
                { "HeaderText": "Branch", "Value": "BranchCode", "HeaderValue": "CollegeBranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Semester", "HeaderValue": "Semester", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Priority", "HeaderValue": "Priority", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }
            ];
        $scope.PrintMaster(tblheader, $scope.CourseWiseSubjectPriorityMasterList, window.document.title);
    };


}