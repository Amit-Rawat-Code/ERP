app.RelativeOptionalSubjectController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlClass');

    $scope.ddlClass_Change = function (classCode) {
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

    $scope.GetOptionalSubjects = function () {
        var collectionobj = {};
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetRelativeOptionalSubjectMaster', collectionobj);
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

    $scope.$watch('ClassCode', function () {
        if (typeof ($scope.ClassCode) === 'undefined') return;
        $scope.GetOptionalSubjects();
    })

    $scope.$watch('SectionCode', function () {
        if (typeof ($scope.SectionCode) === 'undefined') return;
        $scope.GetOptionalSubjects();
    })

    $scope.$watch('BranchCode', function () {
        if (typeof ($scope.BranchCode) === 'undefined') return;
        $scope.GetOptionalSubjects();
    })

    $scope.$watch('StreamCode', function () {
        if (typeof ($scope.StreamCode) === 'undefined') return;
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
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode;
            collectionobj.BranchCode = $scope.BranchCode;
            collectionobj.StreamCode = $scope.StreamCode;
            collectionobj.RelativeSubjectCode = $scope.OptionalSubjectCode;
            collectionobj.Action = "5";
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            var getData = myService.methode('POST', '../Api/TimeTableApi/GetRelativeOptionalSubjectMaster', collectionobj);
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
            collectionobj.ClassCode= $scope.ClassCode;
            collectionobj.SectionCode= $scope.SectionCode;
            collectionobj.BranchCode= $scope.BranchCode;
            collectionobj.StreamCode= $scope.StreamCode;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.UpdatedBy = userid;
            collectionobj.CreatedBy = userid;
            collectionobj.Action = "1";           
            var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteRelativeOptionalSubjectMaster', collectionobj);
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
        $scope.$parent.ClassCode = "";
        $scope.$parent.SectionCode = "";
        $scope.BranchCode = "";
        $scope.StreamCode = "";
        $scope.IsActive = "true";
        $scope.SetFocus('#ddlClass');
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
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetRelativeOptionalSubjectMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class", "Value": "ClassCode", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "Value": "SectionCode", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "Value": "BranchCode", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Stream", "Value": "StreamCode", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
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
                $scope.$parent.ClassCode = $(FindHtml(row[1])).val();
                $scope.ddlClass_Change($scope.$parent.ClassCode);
                $scope.$parent.SectionCode = $(FindHtml(row[2])).val();
                $scope.BranchCode = $(FindHtml(row[3])).val();
                $scope.StreamCode = $(FindHtml(row[4])).val();
                $scope.OptionalSubjectCode = $(FindHtml(row[5])).val();
                $scope.IsActive = $scope.RelativeOptionalSubjectList[0].IsActive == true ? "true" : "false";

                var collectionobj = {};
                collectionobj.Action = "6";
                collectionobj.Code = $scope.hfId;
                collectionobj.ClassCode = $scope.$parent.ClassCode;
                collectionobj.SectionCode = $scope.$parent.SectionCode;
                collectionobj.BranchCode = $scope.BranchCode;
                collectionobj.StreamCode = $scope.StreamCode;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/TimeTableApi/GetRelativeOptionalSubjectMaster', collectionobj);
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
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteRelativeOptionalSubjectMaster', collectionobj);
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
                { "HeaderText": "Sr NO", "Value": "RelativeOptionalSubjectId", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Branch", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Optional Subject", "HeaderValue": "OptionalSubject", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Relative Subject", "HeaderValue": "RelativeSubject", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }
            ];

        $scope.PrintMaster(tblheader, $scope.RelativeOptionalSubjectList, window.document.title);
    };
};