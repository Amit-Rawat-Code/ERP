app.ShiftClassMappingController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlShift');
    $scope.MappedStudentList = [];
    $scope.UnMappedStudentList = [];
    $scope.UnMappedStudentList1 = [];

    $scope.ddlShift_change = function () {
        if ($scope.ShiftCode != "") {
            $scope.GetClassWiseTotalStudent();
        }
        else {
            $scope.ClassWiseTotalStudentlist = [];
        }
    }

    $scope.GetClassWiseTotalStudent = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetClassWiseTotalStudent', collectionobj);
        getData.then(function (response) {
            $scope.ClassWiseTotalStudentlist = response.data;
            if ($scope.ClassWiseTotalStudentlist.length > 0) {
                $scope.IsActive = $scope.ClassWiseTotalStudentlist[0].IsStudentWiseMapping.toString();
            }
            $scope.ChkAll = true;
            $.each($scope.ClassWiseTotalStudentlist, function (index, obj) {
                if (obj.Chk == false) {
                    $scope.ChkAll = false;
                    return false;
                };
            });
            $scope.GetUnMappedStudentList($scope.ClassWiseTotalStudentlist);
        });
    }

    $scope.GetUnMappedStudentList = function (obj) {
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.ClassCode = obj.ClassCode;
        collectionobj.SectionCode = obj.SectionCode;
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetClassWiseTotalStudent', collectionobj);
        getData.then(function (response) {
            $scope.UnMappedStudentList1 = response.data;
        });
    }

    $scope.MappedStudentList = [];
    $scope.GetMappedStudentList = function () {
        $scope.filterData = ($filter('filter')($scope.UnMappedStudentList, { 'chk': 1 }, true));
        $scope.MappedStudentList[$scope.index1] = $scope.filterData;
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            //$scope.flag = false;

            //$.each($scope.ClassWiseTotalStudentlist, function (index, obj) {
            //    if (obj.StudentRequired == true) {
            //        $scope.flag = true;
            //        return false;
            //    };
            //});

            //if ($scope.flag) {
            //    if (($filter('filter')($scope.UnMappedStudentList1, { 'chk': 1 }, true)).length > 0) {
                    
            //    }
            //    else {
            //        showMsgBox('Sorry, If students required checkBox/checkBoxes is checked , map student with class/classes.');
            //    }
            //}
            //else {
            //    showMsgBox('Sorry, If "Is Student Wise Mapping In Shift" is yes , map student with class/classes.');
            //}

            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.ShiftCode = $scope.ShiftCode;
            collectionobj.ClassData = JSON.stringify($filter('filter')($scope.ClassWiseTotalStudentlist, { 'Chk': true }, true));
            collectionobj.StudentData = JSON.stringify($filter('filter')($scope.UnMappedStudentList1, { 'chk': 1 }, true));
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.Action = "1";
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteShiftClassMappingMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.ShiftClassMappingMasterList = [];
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
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetShiftClassMapping', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Shift Name", "Value": "ShiftCode", "HeaderValue": "ShiftName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Student Wise Mapping In Shift", "Value": "IsStudentWiseMapping", "HeaderValue": "IsStudentWiseMapping", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    
                ];

            $scope.ShiftClassMappingMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.ShiftCode = $(FindHtml(row[1])).val();
                $scope.IsActive = $(FindHtml(row[2])).val();
                $scope.GetClassWiseTotalStudent();
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlSession', true);
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        if ($scope.ShiftCode != "") {
            var collectionobj = {};
            collectionobj.Action = "3";
            collectionobj.ShiftCode = $scope.ShiftCode;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.UpdatedBy = userid;
            var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteShiftClassMappingMaster', collectionobj);
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
        $scope.ShiftCode = "";
        $scope.ChkAll = false;
        $scope.StudentRequiredAll = false;
        $scope.IsActive = 'false';
        $scope.ClassWiseTotalStudentlist = [];
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
                { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Shift Name", "Value": "ShiftCode", "HeaderValue": "ShiftName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Is Student Wise Mapping In Shift", "Value": "IsStudentWiseMapping", "HeaderValue": "IsStudentWiseMapping", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

            ];

        $scope.PrintMaster(tblheader, $scope.ClassFeeStructureMasterList, window.document.title);
    };

    $scope.index1;
    $scope.FilterRecords = function (ClassCode, SectionCode, StudentRequired, index) {
        $scope.index1 = index;
        $scope.UnMappedStudentList = $filter('filter')($scope.UnMappedStudentList1, { ClassCode: ClassCode, SectionCode: SectionCode })

        $.each(($filter('filter')($scope.UnMappedStudentList1, { ClassCode: ClassCode, SectionCode: SectionCode })), function (index, obj) {
            if (!StudentRequired)
            obj.chk = 0;
            obj.disabled = !StudentRequired;
        });
    }

    $scope.UpdateIndex = function (index, ClassCode, SectionCode) {
        $scope.index1 = index;
        if ($scope.MappedStudentList[index].length == 0)
            $scope.MappedStudentList[index] = $filter('filter')($scope.UnMappedStudentList1, { ClassCode: ClassCode, SectionCode: SectionCode, chk: 1 })
    }

    $scope.UnMappedAllStudent = function (obj,chk, ClassCode, SectionCode, index) {

        if (chk == false) {
            obj.StudentRequired = false;
            obj.AllotTotalStudent = 0;
            $.each(($filter('filter')($scope.UnMappedStudentList1, { ClassCode: ClassCode, SectionCode: SectionCode })), function (index, obj) {
                obj.chk = 0;
            });
        }
        $scope.ChkAll = true;
        $scope.StudentRequiredAll = true;
        $.each($scope.ClassWiseTotalStudentlist, function (index, obj) {
            if (obj.StudentRequired == false) {
                $scope.StudentRequiredAll = false;
            };
            if (obj.Chk == false) {
                $scope.ChkAll = false;
                return false;
            };
        });

        $scope.MappedStudentList[index] = [];
    }

    $scope.CheckALL = function () {

        $.each($scope.ClassWiseTotalStudentlist, function (index, obj) {
            obj.Chk = $scope.ChkAll;
            if ($scope.ChkAll == false)
                obj.StudentRequired = $scope.ChkAll;
        });

        if ($scope.ChkAll == false)
        $scope.StudentRequiredAll = false;
        
    }

    $scope.CheckStudentRequiredAll = function () {
        $.each($scope.ClassWiseTotalStudentlist, function (index, obj) {
            if (obj.Chk) {
                obj.StudentRequired = $scope.StudentRequiredAll;
            }
            else {
                obj.StudentRequired = false;
            }
        });
        $scope.flag = true;

        $.each($scope.ClassWiseTotalStudentlist, function (index, obj) {
            if (obj.StudentRequired == false) {
                $scope.flag = false;
                return false;
            };
        });

        $scope.StudentRequiredAll = $scope.flag;
    }

    $scope.CheckStudentRequiredChk = function () {
        if ($scope.IsActive == 'false') {
            $scope.flag = false;
            $.each($scope.ClassWiseTotalStudentlist, function (index, obj) {
                if (obj.StudentRequired == true) {
                    $scope.flag = true;
                    return false;
                };
            });
            if ($scope.flag) {
                $scope.IsActive = 'true'
                showMsgBox('Sorry, Uncheck All "Students Required CheckBoxes"');
            }
        }
        
    }
}