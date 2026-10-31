app.SubjectClassGroupMaster = function ($scope, $element, $timeout, $filter, myService) {
    $scope.SetFocus('#ddlClass');

    $scope.studentDetails = [{ ClassId: "", SectionId: "", BranchId: "", StreamId: "", MediumId:"" }];

    $scope.SaveRecord = function () {
        
        if (isValidate()) {
            debugger;
            var Subjects = [];

            var collectionobj = {};

            collectionobj.ClassId = $scope.studentDetails.ClassId;
            collectionobj.SectionId = $scope.studentDetails.SectionId;
            collectionobj.BranchId = $scope.studentDetails.BranchId;
            collectionobj.StreamId = $scope.studentDetails.StreamId;
            collectionobj.MediumId = $scope.studentDetails.MediumId;

            $("table tbody tr").each(function () {
                debugger;

                var row = $(this);

                var optionalSubject = row.find("#ddlSubjectOptional option:selected", this).val();

                if (optionalSubject != "0") {
                    var SubjectDetails = {};

                    SubjectDetails["SubjectGroupId"] = row.find("input[type='hidden']#SubjectGroupId").val();

                    SubjectDetails["SubjectId"] = row.find("input[type='hidden']#SubjectId").val();

                    SubjectDetails["IsSubjectOptional"] = optionalSubject;

                    var checkbox = row.find("input[type='checkbox']");

                    SubjectDetails["IsSubjectExam"] = checkbox.prop("checked");

                    SubjectDetails["EmployeeCode"] = row.find("#ddlTeacher option:selected", this).val();

                    SubjectDetails["WeeklyPeriod"] = row.find("#txtWeeklyPeriod", this).val();

                    Subjects.push(SubjectDetails);
                }
            });

            collectionobj.Subjects = Subjects;

            collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.SchoolCode = schoolCode;
            collectionobj.BranchCode = branchCode;
            collectionobj.CreatedBy = JSON.parse(userid);
            collectionobj.UpdatedBy = JSON.parse(userid);

            var getData = myService.methode('POST', "../TimeTable/InsertSubjectClassGroupMaster", '{obj:' + JSON.stringify(collectionobj) + '}');
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };
    // This is for Get All Data
    $scope.DeleteRecord=function(){
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        debugger;
        var collectionobj = {};

        collectionobj.ClassId = $scope.studentDetails.ClassId;
        collectionobj.SectionId = $scope.studentDetails.SectionId;
        collectionobj.BranchId = $scope.studentDetails.BranchId;
        collectionobj.StreamId = $scope.studentDetails.StreamId;
        collectionobj.MediumId = $scope.studentDetails.MediumId;

        collectionobj.SessionId = sessionId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.UpdatedBy = JSON.parse(userid);

        var getData = myService.methode('POST', "../TimeTable/DeleteSubjectClassGroupMaster", '{obj:' + JSON.stringify(collectionobj) + '}');
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
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.SetFocus('#ddlClass');
        $scope.studentDetails = [{ ClassId: "", SectionId: "", BranchId: "", StreamId: "", MediumId: "", }];
        $scope.FillSubjectClassGroupMaster();
        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.SubjectClassGroupMasterList = [];

        
    }

    $scope.FillSubjectClassGroupMaster = function () {
        var collectionobj = {};
       
        collectionobj.ClassId = $scope.studentDetails.ClassId;
        collectionobj.SectionId = $scope.studentDetails.SectionId;
        collectionobj.BranchId = $scope.studentDetails.BranchId;
        collectionobj.StreamId = $scope.studentDetails.StreamId;
        collectionobj.MediumId = $scope.studentDetails.MediumId;

        collectionobj.IsActive = $scope.IsActive;
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.SchoolCode = schoolCode
        collectionobj.BranchCode = branchCode

        var getData = myService.methode('POST', "../TimeTable/SubjectClassGroupList", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.SubjectClassGroupMasters = response.data;
        });
    }
   
    $scope.$watch('studentDetails.ClassId', function () {
        if (typeof($scope.studentDetails) === 'undefined') return;
        $scope.FillSubjectClassGroupMaster();
    })

    $scope.$watch('studentDetails.SectionId', function () {
        if (typeof($scope.studentDetails) === 'undefined') return;
        $scope.FillSubjectClassGroupMaster();
    })

    $scope.$watch('studentDetails.BranchId', function () {
        if (typeof($scope.studentDetails) === 'undefined') return;
        $scope.FillSubjectClassGroupMaster();
    })

    $scope.$watch('studentDetails.StreamId', function () {
        if (typeof($scope.studentDetails) === 'undefined') return;
        $scope.FillSubjectClassGroupMaster();
    })

    $scope.$watch('studentDetails.MediumId', function () {
        if (typeof($scope.studentDetails) === 'undefined') return;
        $scope.FillSubjectClassGroupMaster();
    })

    $scope.SubjectClassGroupMasterList = [];

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;

        var getData = myService.methode('POST', "../TimeTable/SubjectClassGroupMasterList", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "SubjectClassGroupMasterId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Group", "HeaderValue": "SubjectGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Week Period", "HeaderValue": "WeeklyPeriod", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Medium", "HeaderValue": "MediumName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }

                ];

            $scope.SubjectClassGroupMasterList = response.data;

            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function () {
                debugger;
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.SubjectClassGroupMasterList = $filter('filter')($scope.SubjectClassGroupMasterList, { 'SubjectClassGroupMasterId': $scope.hfId });
                $scope.SearchbyValue();

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#ddlClass', true);
            });
        });
    };

    $scope.SearchbyValue = function () {

        debugger;
        var collectionobj1 = {};

        collectionobj1.Id = $scope.hfId;
        collectionobj1.SessionId = sessionId;
        collectionobj1.Action = 6;
        collectionobj1.SchoolCode = schoolCode
        collectionobj1.BranchCode = branchCode

        var getData = myService.methode('POST', "../TimeTable/SubjectClassGroupList", '{obj:' + JSON.stringify(collectionobj1) + '}');
        getData.then(function (response) {

            $scope.studentDetails = {
                ClassId: response.data[0]["ClassId"],
                SectionId: $scope.SelectSection(response.data[0]["ClassId"], response.data[0]["SectionId"]),
                BranchId: response.data[0]["BranchId"],
                StreamId: response.data[0]["StreamId"],
                MediumId: response.data[0]["MediumId"]
            }
            debugger;
            $scope.IsActive = response.data[0]["IsActive"] == true ? "True" : "False";

            var collectionobj = {};

            collectionobj.ClassId = $scope.studentDetails.ClassId;
            collectionobj.SectionId = $scope.studentDetails.SectionId;
            collectionobj.BranchId = $scope.studentDetails.BranchId;
            collectionobj.StreamId = $scope.studentDetails.StreamId;
            collectionobj.MediumId = $scope.studentDetails.MediumId;

            collectionobj.Action = 5;

            collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.SchoolCode = schoolCode
            collectionobj.BranchCode = branchCode

            var getData = myService.methode('POST', "../TimeTable/SubjectClassGroupList", '{obj:' + JSON.stringify(collectionobj) + '}');
            getData.then(function (response) {
                $scope.SubjectClassGroupMasters = response.data;
                $scope.hideLoader();
            });
        });
    }

    $scope.$on('MergeCommonRows', function () {
        var columnList = [2];
        var table = $('#tblSubjectClassGroup');
        var firstColumnBrakes = [];
        // iterate through the columns instead of passing each column as function parameter:

        for (var i = 0; i < columnList.length; i++) {
            
            var previous = null, cellToExtend = null, rowspan = 1;
            table.find("td:nth-child(" + columnList[i] + ")").each(function (index, e) {
                debugger;
                var jthis = $(this), content = jthis.text();

                // check if current row "break" exist in the array. If not, then extend rowspan:
                if (previous == content && content != "") {
                    // hide the row instead of remove(), so the DOM index won't "move" inside loop.
                    jthis.addClass('hidden');
                    cellToExtend.attr("rowspan", (rowspan = rowspan + 1));
                } else {
                    // store row breaks only for the first column:
                    if (i === 1) firstColumnBrakes.push(index);
                    rowspan = 1;
                    previous = content;
                    cellToExtend = jthis;
                }
            });
        }
        // now remove hidden td's (or leave them hidden if you wish):
        //$('td.hidden').remove();
    });

    $scope.GetTeachers = function () {

        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 5;
        $scope.collectionobj["SchoolCode"] = schoolCode;
        $scope.collectionobj["BranchCode"] = branchCode;
        $scope.collectionobj["SessionId"] = sessionId;

        var getData = myService.methode('POST', "../TimeTable/TeacherSubjectMasterList", '{obj:' + JSON.stringify($scope.collectionobj) + '}');
        getData.then(function (response) {
            $scope.Teachers = response.data
        });
    };

    $scope.GetTeachers();

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
                     { "HeaderText": "Sr.No.", "Value": "SubjectClassGroupMasterId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                     { "HeaderText": "Subject Group", "HeaderValue": "SubjectGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                     { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                     { "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                     { "HeaderText": "Week Period", "HeaderValue": "WeeklyPeriod", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                     { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                     { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                     { "HeaderText": "Branch", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                     { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                     { "HeaderText": "Medium", "HeaderValue": "MediumName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                     { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }

                 ];
        $scope.PrintMaster(tblheader, $scope.SubjectClassGroupMasterList, window.document.title);
    };


};
