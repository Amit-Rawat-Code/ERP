app.ClassWiseSubjectMasterController = function ($scope, $element, $filter, myService) {
    $scope.disableForEdit = false;
    $scope.SetFocus('#ddlClass');
    $scope.disabledDDLClass = false;
    $scope.SectionList = [];

    $scope.ddlClass_Change = function (ClassCode, index) {
        if (ClassCode != '') {
            $scope.GetSection(ClassCode);
        }
        else {
            $scope.SectionList = [];
        }
    }
    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
    $scope.GetSection = function (ClassCode) {
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.ClassCode = ClassCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetSectionList', collectionobj);
        getData.then(function (response) {
            $scope.SectionList = ($filter('filter')(response.data, { 'ClassCode': ClassCode }, true));
        });
    }
    $scope.selectedSectionCount = 0;
    $scope.AllSection = function () {
        angular.forEach($scope.SectionList, function (CI) {
            CI.chk = $scope.chkAllSection;
        });
    }

    $scope.GetSubjectGroup = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetSubjectGroup', collectionobj);
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
        collectionobj.ClassCode = $scope.$parent.ClassCode;
        collectionobj.SectionCode = JSON.stringify(($filter('filter')($scope.SectionList, { 'chk': true }, true)));
        collectionobj.SubjectGroupData = JSON.stringify(($filter('filter')($scope.SubjectGruopList, { 'chk': true }, true)));
        collectionobj.SessionId = sessionId;
        collectionobj.Code = $scope.hfId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetClassWiseSubjectMaster', collectionobj);
        getData.then(function (response) {
            debugger
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

    $scope.checkAll=function(obj) {
        if (obj.Monday==false) {
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
            colindex: [1,2]
        });
    });

    /* Save Button Click Event */
    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {         
            if (($filter('filter')($scope.SubjectList, { 'Type': '!' + '0' }, true)).length > 0) {
                var collectionobj = {};
                collectionobj.Code = $scope.hfId;
                collectionobj.ClassCode = $scope.ClassCode;
                collectionobj.SectionData = JSON.stringify(($filter('filter')($scope.SectionList, { 'chk': true }, true)));
                collectionobj.SubjectGroupData = JSON.stringify(($filter('filter')($scope.SubjectList, { 'Type': '!' + '0' }, true)));
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                collectionobj.IsActive = $scope.IsActive;               
                var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteClassWiseSubjectMaster', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }           
        };
    }

    $scope.ClassWiseSubjectMasterList = [];
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
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetClassWiseSubjectMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class", "Value": "ClassCode", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "Value": "SectionCode", "HeaderValue": "SectionName", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject Group Name", "HeaderValue": "SubjectGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject Name", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.ClassWiseSubjectMasterList = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table3);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();

                $scope.ClassWiseSubjectMasterList= $filter('filter')($scope.ClassWiseSubjectMasterList, { 'Code': $scope.hfId }, true);

                $scope.SectionCode = $scope.ClassWiseSubjectMasterList[0].SectionCode;
                $scope.$parent.ClassCode = $scope.ClassWiseSubjectMasterList[0].ClassCode;
                $scope.SectionList = $filter('filter')(response.data.Table1, { 'ClassCode': $scope.$parent.ClassCode, ClassWiseSubjectMasterCode: $scope.hfId }, true);
                //$scope.SubjectGruopList = response.data.Table2;
                $scope.SubjectGruopList = response.data.Table2
                debugger;
                setTimeout(function () {
                    var collectionobj = {};
                    collectionobj.Action = "6";
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.SectionCode = JSON.stringify(($filter('filter')($scope.SectionList, { 'chk': true }, true)));
                    collectionobj.ClassCode = $scope.$parent.ClassCode;
                    collectionobj.SubjectGroupData = JSON.stringify(($filter('filter')($scope.SubjectGruopList, { 'chk': true }, true)));
                    collectionobj.SessionId = sessionId;
                    collectionobj.Code = $scope.hfId;
                    var getData = myService.methode('POST', '../Api/TimeTableApi/GetClassWiseSubjectMaster', collectionobj);
                    getData.then(function (response) {
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
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteClassWiseSubjectMaster', collectionobj);
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
        $scope.$parent.ClassCode = "";
        $scope.SectionList = [];
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