app.EntranceMarksEntryPrimaryJuniorController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlGroup');
    $scope.IsWrittenExam = true;
    $scope.SubjectMarksEntry = [];
    $scope.SubjectList = [];
    $scope.ddlClass_Change = function () {
        $scope.BatchClassWise($scope.ClassCode);
        $scope.GetEntranceMarksEntryList();
    }
    
    $scope.GetEntranceMarksEntryList = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.Code = $scope.hfId;
        collectionobj.RegNo = $scope.RegNo;
        collectionobj.ClassCode = $scope.$parent.ClassCode;
        collectionobj.BatchCode = $scope.BatchCode == '' ? null : $scope.BatchCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;

        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetBatchesForMarksEntry', collectionobj);
        getData.then(function (response) {
            $scope.StudentsList = response.data;
            if ($scope.StudentsList == undefined || $scope.StudentsList.length == 0) {
                showMsgBox('Sorry no student found.')
            }
        });
    }

    $scope.GetEntranceSubject = function (index, obtainMarks, regNo,studentName,batchName) {
        var flag = false;
        $.each($scope.SubjectMarksEntry[index], function (index1, obj1) {
            if (obj1.RegNo == regNo) {
                flag = true;
            }
        });
        if (flag) {
            $scope.SubjectList = $scope.SubjectMarksEntry[index];
            $scope.ObtainMaxMarks = obtainMarks;
            $scope.index = index;
            $scope.RegNo = regNo;
            $scope.StudentName = studentName;
            $scope.BatchName = batchName;
        }
        if (!flag) {
            var collectionobj = {};
            collectionobj.Action = "6";
            collectionobj.Code = $scope.hfId;
            collectionobj.RegNo = regNo;
            collectionobj.ClassCode = $scope.$parent.ClassCode;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetEntranceSubjects', collectionobj);
            getData.then(function (response) {
                $scope.SubjectList = response.data;
                if ($scope.SubjectList.length==0) {
                    showMsgBox('Sorry no entrance subject found.')
                }
                $scope.ObtainMaxMarks = obtainMarks;
                $scope.index = index;
                $scope.RegNo = regNo;
                $scope.StudentName = studentName;
                $scope.BatchName = batchName;
            });
        }
        
    }

    $scope.ClearMe = function (StudentRegNo) {
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.ClassCode = $scope.$parent.ClassCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetEntranceSubjects', collectionobj);
        getData.then(function (response) {
            $scope.SubjectList = response.data;
            $scope.ObtainMaxMarks = obtainMarks;
            $scope.index = index;
            $scope.RegNo = regNo;
        });
    }
    $scope.Cancel = function (StudentRegNo) {
        $scope.SubjectList = [];
    }

    $scope.CheckObtainMarks = function (obj, MaxMarks, ObtainMarks) {
        if (ObtainMarks > MaxMarks) {
            alert("Sorry, Obtained Marks can not greater than Max Marks.")
            obj.ObtainMarks = 0;
        }
    }
    $scope.SetSubjectMarks = function () {
        var flag = true;
        if ($scope.SubjectWiseTotalMaxMarks != $scope.TotalMarks) {
            alert("Sorry, Max Marks Total should be equal to Total Marks.")
            flag = false;
        }
        if ($scope.SubjectWiseTotalObtain != $scope.ObtainMaxMarks) {
            alert("Sorry, Subject Wise Obtained Marks Total should be equal to Marks Obtained.")
            flag = false;
        }
        if (flag) {
            $.each($scope.SubjectList, function (index, obj) {
                obj["RegNo"] = $scope.RegNo;
            });
            $scope.SubjectMarksEntry[$scope.index] = $scope.SubjectList
            $scope.SubjectList = [];
        }
    }
    $scope.SaveRecord = function () {
        if (isValidate()) {
            if ($scope.StudentsList !== undefined && $scope.StudentsList.length > 0) {
                var collectionobj = {};
                collectionobj.Code = $scope.hfId;
                collectionobj.ClassCode = $scope.ClassCode;
                collectionobj.BatchCode = $scope.BatchCode;
                collectionobj.TotalMarks = $scope.TotalMarks;
                collectionobj.EntranceMarksList = JSON.stringify($scope.StudentsList);
                $scope.MarksList = [];
                $.each($scope.SubjectMarksEntry, function (index, obj) {
                    $.each(obj, function (index1, obj1) {
                        $scope.MarksList.push(obj1);
                    });
                })
                collectionobj.SubjectMarksEntry = JSON.stringify($scope.MarksList);

                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                if ($scope.Save == "Save") {
                    collectionobj.Action = "1";
                }
                else if ($scope.Save == "Edit") {
                    collectionobj.Action = "2";
                }
                var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteEntranceMarksEntryPrimaryJunior', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }

                });
            } else {
                showMsgBox('Sorry no student found.')
            }
        }
    };
    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    }

    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.disabledDDLClass = false;
        $scope.hfId = "";
        $scope.$parent.ClassCode = "";
        $scope.BatchCode = "";
        $scope.TotalMarks = "";
        $scope.StudentsList = [];
        $scope.SubjectList = [];
        $scope.ObtainMaxMarks = "";
        $scope.EntranceMarksEntryPrimaryJuniorList = [];
        $scope.index = "";
        $scope.RegNo = "";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlClass');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.EntranceMarksEntryPrimaryJuniorList = [];
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
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetEntranceMarksEntryPrimaryJunior', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class Name", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Batch Name", "HeaderValue": "BatchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Reg. No.", "HeaderValue": "RegNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

           
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $scope.EntranceMarksEntryPrimaryJuniorList = response.data.Table1;

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
    
                $scope.EntranceMarksEntryPrimaryJuniorList = $filter('filter')($scope.EntranceMarksEntryPrimaryJuniorList, { 'Code': $scope.hfId }, true);
                $scope.StudentsList = $scope.EntranceMarksEntryPrimaryJuniorList;
                if ($scope.EntranceMarksEntryPrimaryJuniorList.length > 0) {
                    $scope.TotalMarks = $scope.EntranceMarksEntryPrimaryJuniorList[0].MaxMarks;
                    $scope.$parent.ClassCode = $scope.EntranceMarksEntryPrimaryJuniorList[0].ClassCode;
                }
              
                $scope.disabledDDLClass = true;
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlGroup', true);
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
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteEntranceMarksEntryPrimaryJunior', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    //$scope.ClearControl = function (flag) {


    /*Refresh Search Table Record*/
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

    //$scope.PrintRecord = function () {
    //    var tblheader =
    //        [
    //            { "HeaderText": "Sr.No.", "Value": "SocietyId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
    //            { "HeaderText": "Society Code", "HeaderValue": "SocietyCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
    //            { "HeaderText": "Society Name", "HeaderValue": "SocietyName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
    //            { "HeaderText": "Society Address", "HeaderValue": "SocietyAddress", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
    //            { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
    //            { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
    //        ];

    //    $scope.PrintMaster(tblheader, $scope.SocietyMaster, window.document.title);
    //};
}