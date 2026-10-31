app.SubjectDaysMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlClass');
    $scope.chkWS = false;

    $scope.ddlClass_Change = function (classcode) {
        $scope.GetSections(classcode);
    }


    $scope.SaveRecord = function () {
        if (isValidate()) {

            var subjectDaysList = [];
            $("table tbody tr").each(function () {
                var row = $(this);
                var SubjectDetails = {};
                SubjectDetails.SubjectId = row.find("input[type='hidden']#hfSubjectId").val();
                var WeekDaysDetails = {};
                WeekDaysDetails.Monday = row.find("input[type='checkbox']#chkMonday", this).prop('checked');
                WeekDaysDetails.Tuesday = row.find("input[type='checkbox']#chkTuesday", this).prop('checked');
                WeekDaysDetails.Wednesday = row.find("input[type='checkbox']#chkWednesday", this).prop('checked');
                WeekDaysDetails.Thursday = row.find("input[type='checkbox']#chkThursday", this).prop('checked');
                WeekDaysDetails.Friday = row.find("input[type='checkbox']#chkFriday", this).prop('checked');
                WeekDaysDetails.Saturday = row.find("input[type='checkbox']#chkSaturday", this).prop('checked');
                WeekDaysDetails.Sunday = row.find("input[type='checkbox']#chkSunday", this).prop('checked');
                SubjectDetails.WeekDayName = WeekDaysDetails;
                subjectDaysList.push(SubjectDetails);
            });

            var collectionobj = {};
            collectionobj.SubjectDaysList = JSON.stringify(subjectDaysList);
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode;
            collectionobj.BranchCode = $scope.BranchCode;
            collectionobj.StreamCode = $scope.StreamCode;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.UpdatedBy = userid;
            collectionobj.CreatedBy = userid;
            collectionobj.Action = "1";
            var getData = myService.methode('POST', "../Api/TiemTableApi/InsertUpdateDeleteSubjectDaysMaster", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                };
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
        $scope.hfId = "";
        $scope.$parent.ClassCode = "";
        $scope.$parent.SectionCode = "";
        $scope.BranchCode = "";
        $scope.StreamCode = "";
        $scope.IsActive = "true";
        $scope.SetFocus('#ddlClass');
        $scope.SubjectDaysMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.SubjectDaysMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', "../Api/TiemTableApi/SelectSubjectDaysMaster", collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Id", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class", "Value": "ClassCode", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "Value": "SectionCode", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "Value": "BranchCode", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Stream", "Value": "StreamCode", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Subject Name", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Monday", "HeaderValue": "Monday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Tuesday", "HeaderValue": "Tuesday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Wednesday", "HeaderValue": "Wednesday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Thursday", "HeaderValue": "Thursday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Friday", "HeaderValue": "Friday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Saturday", "HeaderValue": "Saturday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Sunday", "HeaderValue": "Sunday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    {
                        "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No"
                        , "CssClass": "activeyn"
                    }

                ];
            $scope.SubjectDaysMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.$parent.ClassCode = $(FindHtml(row[1])).val();
                $scope.ddlClass_Change($scope.$parent.ClassCode);
                $scope.$parent.SectionCode = $(FindHtml(row[2])).val();
                $scope.BranchCode = $(FindHtml(row[3])).val();
                $scope.StreamCode = $(FindHtml(row[4])).val();
                $scope.SubjectDaysMasterList = $filter('filter')($scope.SubjectDaysMasterList, {
                    'ClassCode': $scope.$parent.ClassCode, 'SectionCode': $scope.$parent.SectionCode,
                    'BranchCode': $scope.BranchCode, 'StreamCode': $scope.StreamCode
                });
                $scope.IsActive = $scope.SubjectDaysMasterList[0].IsActive == true ? "true" : "false";
                // $scope.SearchbyValue();
                var collectionobj = {};
                collectionobj.ClassCode = $scope.$parent.ClassCode;
                collectionobj.SectionCode = $scope.$parent.SectionCode;
                collectionobj.BranchCode = $scope.BranchCode;
                collectionobj.StreamCode = $scope.StreamCode;
                collectionobj.Action = "5";
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;

                var getData = myService.methode('POST', "../Api/TiemTableApi/SelectSubjectDaysMaster", collectionobj);
                getData.then(function (response) {
                    $scope.SubjectPriorities = response.data;
                });
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.hideLoader();
                $scope.$apply();
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
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.Action = "3";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', "../Api/TiemTableApi/InsertUpdateDeleteSubjectDaysMaster", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            };
        });
    };

    $scope.SubjectDaysMaster = function () {
        var collectionobj = {};
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', "../Api/TiemTableApi/SelectSubjectDaysMaster", collectionobj);
        getData.then(function (response) {
            $scope.SubjectDays = response.data;
        });
    }
    $scope.$watch('ClassCode', function () {
        if (typeof ($scope.ClassCode) === 'undefined') return;
        $scope.SubjectDaysMaster();
    })

    $scope.$watch('SectionCode', function () {
        if (typeof ($scope.SectionCode) === 'undefined') return;
        $scope.SubjectDaysMaster();
    })

    $scope.$watch('BranchCode', function () {
        if (typeof ($scope.BranchCode) === 'undefined') return;
        $scope.SubjectDaysMaster();
    })

    $scope.$watch('StreamCode', function () {
        if (typeof ($scope.StreamCode) === 'undefined') return;
        $scope.SubjectDaysMaster();
    })

    $scope.fnChkWOS = function (index) {
        var row = $("table tbody tr:eq(" + index + ")");
        row.find("input[type='checkbox']#chkWS").prop('checked', false);
        if (row.find("input[type='checkbox']#chkWOS", this).prop('checked')) {

            row.find("input[type='checkbox']#chkMonday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkTuesday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkWednesday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkThursday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkFriday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkSaturday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkSunday", this).prop('checked', false);
        }
        else {
            var row = $("table tbody tr:eq(" + index + ")");
            row.find("input[type='checkbox']#chkMonday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkTuesday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkWednesday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkThursday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkFriday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkSaturday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkSunday", this).prop('checked', false);
        }
    };

    $scope.fnChkWS = function (index) {
        debugger;
        var row = $("table tbody tr:eq(" + index + ")");
        row.find("input[type='checkbox']#chkWOS").prop('checked', false);
        if (row.find("input[type='checkbox']#chkWS", this).prop('checked')) {
            debugger;
            row.find("input[type='checkbox']#chkMonday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkTuesday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkWednesday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkThursday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkFriday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkSaturday", this).prop('checked', true);
            row.find("input[type='checkbox']#chkSunday", this).prop('checked', true);
        }
        else {
            debugger;
            var row = $("table tbody tr:eq(" + index + ")");
            row.find("input[type='checkbox']#chkMonday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkTuesday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkWednesday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkThursday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkFriday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkSaturday", this).prop('checked', false);
            row.find("input[type='checkbox']#chkSunday", this).prop('checked', false);
        }
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
                { "HeaderText": "Sr.No.", "Value": "Id", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Branch", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Subject Name", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Monday", "HeaderValue": "Monday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Tuesday", "HeaderValue": "Tuesday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Wednesday", "HeaderValue": "Wednesday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Thursday", "HeaderValue": "Thursday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Friday", "HeaderValue": "Friday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Saturday", "HeaderValue": "Saturday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Sunday", "HeaderValue": "Sunday", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                {
                    "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No"
                    , "CssClass": "activeyn"
                }

            ];
        $scope.PrintMaster(tblheader, $scope.SubjectDaysMasterList, window.document.title);
    };
};