app.CollegeGenTimeTableManualController = function ($scope, $element, $filter, myService) {
    //debugger
    $scope.SetFocus('#txtTitle');
    $('#txtReportTitle').css('display', 'none');
    $scope.chk = [];
    $scope.Employee = [];
    $scope.Subject = [];
    $scope.WeekDays = [];
    $scope.rows = [];

    angular.element('#ddlBranch').addClass('validate');
    angular.element('#ddlStream').addClass('validate');
    angular.element('#ddlWeekDay').addClass('validate');

    $scope.PeriodCode = '';
    $scope.WeekDayName = '';

    $scope.GETLeftPeriod = function (PeriodId, WeekDay, id, rowno, cellno, PeriodType) {
        //debugger
        $scope.PeriodCode = PeriodId;
        $scope.WeekDayName = WeekDay;

        var collectionobj = {};
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.SemesterCode = $scope.SemesterCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.PeriodCode = PeriodId;
        collectionobj.WeekDayName = WeekDay;
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 8;

        var getData = myService.methode('POST', "../Api/CollegeTimeTableApi/GetCourseSubjectTeacher", collectionobj);
        getData.then(function (response) {
            $scope.LeftPeriodList = response.data;
            $('#CollegeTimeTableManual tr td').removeClass('td-active')
            $('#' + id).addClass('td-active');
            $scope.days = WeekDay;
            $scope.PeriodIds = PeriodId;
            $scope.PeriodTypes = PeriodType;
            $scope.rowno = rowno;
            $scope.cellno = cellno;
            $.each($scope.LeftPeriodList, function (index, array) {
                array["chk"] = false;
            });
            var abc = $filter('filter')($scope.rows, { row: $scope.rowno, cell: $scope.cellno }, true);
            $.each($scope.LeftPeriodList, function (index, array) {
                $.each(abc, function (index1, array1) {
                    if (array1.cellData.EmployeeCode == array.EmployeeCode && array1.cellData.SubjectCode == array.SubjectCode) {
                        array.chk = true;
                    }
                });
            });

            $scope.$applyAsync();
        });
    }
    $scope.Periods = [];
    $scope.GetPeriods = function () {

        var collectionobj = {};
        collectionobj.Action = 7;
        //collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/CollegeTimeTableApi/GetShiftPeriodMappingMaster', collectionobj);
        getData.then(function (response) {
            $scope.Periods = response.data.Table
        });
    };
    $scope.GetCourseUsingShift = function () {
        //debugger
        var collectionobj = {};
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 8;

        var getData = myService.methode('POST', "../Api/CollegeTimeTableApi/GetShiftCourseMapping", collectionobj);
        getData.then(function (response) {
            $scope.CourseList = response.data;
        });
    }
    $scope.ddlShift_change = function () {
        $scope.GetCourseUsingShift();
        $scope.GetPeriods();
    }

    $scope.GetSemesterUsingShiftCourse = function () {
        var collectionobj = {};
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 9;

        var getData = myService.methode('POST', "../Api/CollegeTimeTableApi/GetShiftCourseMapping", collectionobj);
        getData.then(function (response) {
            $scope.SemesterList = response.data;
            $scope.GenerateCollegeTimeTableSelectionDetails();
        });
    }
    $scope.GetBranchUsingShiftCourse = function () {
        var collectionobj = {};
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 10;

        var getData = myService.methode('POST', "../Api/CollegeTimeTableApi/GetShiftCourseMapping", collectionobj);
        getData.then(function (response) {
            $scope.BranchList = response.data;
        });
    }
    $scope.ddlCourse_Change = function (CourseCode) {
        $scope.GetBranchUsingShiftCourse(CourseCode);
    }
    $scope.ddlSection_Change = function () {

    }
    $scope.ddl_ChangeBranch = function (CourseCode) {
        $scope.GetSemesterUsingShiftCourse(CourseCode);
    }
    $scope.ddlStream_Change = function () {
    }

    $scope.studentDetails = {
        CourseCode: "",
        SemesterCode: "",
        BranchCode: "",
        ShiftCode: ""
    }

    $scope.WeekDays = [{ name: 'Monday' },
    { name: 'Tuesday' },
    { name: 'Wednesday' },
    { name: 'Thursday' },
    { name: 'Friday' },
    { name: 'Saturday' }];

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.TransID = $scope.hfId;
            collectionobj.TitleName = $scope.TitleName;
            collectionobj.CourseCode = $scope.CourseCode;
            collectionobj.SemesterCode = $scope.SemesterCode;
            collectionobj.BranchCode = $scope.BranchCode;
            collectionobj.ShiftCode = $scope.ShiftCode;
            collectionobj.Remark = $scope.Remark;
            collectionobj.IsActive = $scope.IsActive;
            var result = $scope.rows.map(function (obj) {
                return { Period: obj.cellData.Period, Day: obj.cellData.Day, EmployeeCode: obj.cellData.EmployeeCode, SubjectCode: obj.cellData.SubjectCode, ClassTeacher: obj.cellData.ClassTeacher, PeriodType: obj.cellData.PeriodType, FixedAllocation: obj.cellData.FixedAllocation };

            });
            collectionobj.cellData = JSON.stringify(result);
            collectionobj.RelationshipId = relationshipId;

            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }

            var getData = myService.methode('POST', "../Api/CollegeTimeTableTransactionApi/InsertUpdateDeleteGenTimeTableManual", collectionobj);
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


        $scope.SetFocus('#txtTitle');
        $scope.TitleName = "";
        $scope.ShiftCode = "";
        $scope.hfId = "";
        $scope.CourseCode = "";
        $scope.CourseList = [];
        $scope.BranchList = [];
        $scope.SemesterList = [];
        $scope.SemesterCode = "";
        $scope.BranchCode = "";
        $scope.ShiftCode = "";
        $scope.PeriodIds = [];
        $scope.Periods = [];
        $scope.rows = [];
        $scope.IsActive = "true";
        $scope.isShiftDisabled = false;
        $scope.isCourseDisabled = false;
        $scope.isSemesterDisabled = false;
        $scope.isBranchDisabled = false;
        $scope.isHide = true;
        $scope.chk = [];
        $scope.LeftPeriodList = [];
        $scope.PeriodCode = "";
        $scope.WeekDayName = "";

        if (flag == 0) {
            showMsgBox('4');
        };

    }

    $scope.CollegeTimeTableList = [];

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        //debugger

        var getData = myService.methode('POST', "../Api/CollegeTimeTableTransactionApi/GetTimeTableManualList", collectionobj);
        getData.then(function (response) {
            //debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Title", "HeaderValue": "Title", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Shift", "Value": "ShiftCode", "HeaderValue": "ShiftName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Course", "Value": "CourseCode", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },                    
                    { "HeaderText": "Branch", "Value": "BranchCode", "HeaderValue": "CollegeBranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Semester", "Value": "SemesterCode", "HeaderValue": "Semester", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
                ];
            $scope.CollegeTimeTableList = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $scope.hideLoader();
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();

                $scope.TitleName = row[1];
                $scope.isShiftDisabled = true;
                $scope.isCourseDisabled = true;
                $scope.isSemesterDisabled = true;
                $scope.isBranchDisabled = true;

                $scope.ShiftCode = $(FindHtml(row[2])).val();
                $scope.GetCourseUsingShift();
                $scope.CourseCode = $(FindHtml(row[3])).val();
                $scope.GetSemesterUsingShiftCourse();
                $scope.GetBranchUsingShiftCourse($scope.CourseCode)
                $scope.BranchCode = $(FindHtml(row[4])).val();
                $scope.SemesterCode = $(FindHtml(row[5])).val();
                $scope.CourseName = $scope.CollegeTimeTableList[0].CollegeCourseName;
                $scope.Semester = $scope.CollegeTimeTableList[0].Semester;
                $scope.IsActive = row[7] == "Yes" ? "true" : "false";
                $scope.GetPeriods();
                $scope.GetPeriodWeekday($scope.hfId);
                $scope.GenerateCollegeTimeTableSelectionDetails();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlTitle', true);
                $scope.hideLoader();

            });
        });
    };

    $scope.GetPeriodWeekday = function (transId) {
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.TransID = transId;
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.SemesterCode = $scope.SemesterCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;

        var getData = myService.methode('POST', "../Api/CollegeTimeTableTransactionApi/GetTimeTableManualList", collectionobj);
        getData.then(function (response) {
            if (response.data.Table.length > 0) {
                $scope.PeriodEmployeeList = response.data.Table;
                $scope.BindGridDetail();
            }
        });

    }

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        //debugger
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.TransID = $scope.hfId;
        collectionobj.CourseCode = $scope.CourseCode;
        collectionobj.SemesterCode = $scope.SemesterCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 3;

        var getData = myService.methode('POST', "../Api/CollegeTimeTableTransactionApi/InsertUpdateDeleteGenTimeTableManual", collectionobj);
        getData.then(function (response) {
            //debugger
            if (showMsgBox(response.data)) {
                $scope.ResetControl();
            };
        });
    };

    $scope.rowno;
    $scope.cellno;
    $scope.days;
    $scope.PeriodIds;
    $scope.AssignTeacherList = [];


    $scope.BindGridDetail = function () {
        $scope.rows = [];
        $.each($scope.PeriodEmployeeList, function (i, val) {
            $scope.cell = {
                Period: $scope.PeriodEmployeeList[i].PeriodCode,
                Day: $scope.PeriodEmployeeList[i].WeekDayName,
                EmployeeCode: $scope.PeriodEmployeeList[i].EmployeeCode,
                Employee: $scope.PeriodEmployeeList[i].EmployeeName,
                SubjectCode: $scope.PeriodEmployeeList[i].SubjectCode,
                Subject: $scope.PeriodEmployeeList[i].SubjectName,
                PeriodType: $scope.PeriodEmployeeList[i].PeriodType,
                ClassTeacher: $scope.PeriodEmployeeList[i].IsCourseTeacher,
                FixedAllocation: $scope.PeriodEmployeeList[i].FixedAllocation
            };
            $scope.rowno = $scope.PeriodEmployeeList[i].rowNo,
                $scope.cellno = $scope.PeriodEmployeeList[i].cellNo,

                $scope.EmployeeSubject = {
                    Employee: $scope.PeriodEmployeeList[i].EmployeeName,
                    Subject: $scope.PeriodEmployeeList[i].SubjectName
                };

            $scope.rows.push({
                row: $scope.rowno,
                cell: $scope.cellno,
                cellData: $scope.cell,
                Employee: $scope.EmployeeSubject.Employee,
                Subject: $scope.EmployeeSubject.Subject,
                EmployeeSubject: $scope.EmployeeSubject.Employee + '-' + $scope.EmployeeSubject.Subject
            });

            $scope.$applyAsync();

        });
    }

    $scope.chkChange = function (leftPeriod, flag) {
        leftPeriod.FixedAllocation = flag ? leftPeriod.FixedAllocation : false;

        var abc = $scope.rows;
        $scope.rows = [];
        $.each(abc, function (index, array) {
            if (array['row'] == $scope.rowno && array['cell'] == $scope.cellno) {
            } else { $scope.rows.push(array); }
        })


        $.each($scope.chk, function (i, val) {
            if ($scope.chk[i] == true) {
                $scope.cell =
                {
                    Period: $scope.PeriodIds,
                    Day: $scope.days,
                    EmployeeCode: $scope.LeftPeriodList[i].EmployeeCode,
                    Employee: $scope.LeftPeriodList[i].EmployeeName,
                    SubjectCode: $scope.LeftPeriodList[i].SubjectCode,
                    Subject: $scope.LeftPeriodList[i].SubjectName,
                    PeriodType: $scope.PeriodTypes,
                    ClassTeacher: $scope.LeftPeriodList[i].IsClassTeacher,
                    FixedAllocation: $scope.LeftPeriodList[i].FixedAllocation
                };
                $scope.EmployeeSubject =
                {
                    Employee: $scope.LeftPeriodList[i].EmployeeName,
                    Subject: $scope.LeftPeriodList[i].SubjectName
                };
                $scope.rows.push({
                    row: $scope.rowno,
                    cell: $scope.cellno,
                    cellData: $scope.cell,
                    Employee: $scope.EmployeeSubject.Employee,
                    Subject: $scope.EmployeeSubject.Subject,
                    EmployeeSubject: $scope.EmployeeSubject.Employee + '-' + $scope.EmployeeSubject.Subject
                });

                $scope.$applyAsync();
            }
        });
    };

    $scope.chkChange1 = function (val, employeecode, obj) {
        if (obj.TotalCount > 1) {
            showMsgBox("can not change, tearcher already engaged with other class in same day same period.")
            obj.FixedAllocation = true;
        }
        else {
            $.each($scope.rows, function (index, obj) {
                $.each(obj.cellData, function (key, value) {
                    if (key == 'FixedAllocation' && obj.cellData['EmployeeCode'] == employeecode && obj.cellData['Period'] == $scope.PeriodCode && obj.cellData['Day'] == $scope.WeekDayName) {
                        obj.cellData[key] = val;
                    }
                });
            });
            $scope.$applyAsync();
        }

    };
    $scope.GenerateCollegeTimeTableSelectionDetails = function () {
        $scope.filterShift = $filter('filter')($scope.Shifts, { Code: $scope.ShiftCode });
        if ($scope.filterShift.length > 0)
            $scope.ShiftName = $scope.filterShift[0].ShiftWithTime;
        else
            $scope.ShiftName = "";
    }

    $scope.PrintRecord = function () {
        var shif = $("#yourdropdownid option:selected").text();
        $('#txtReportTitle').css('display', 'block');
        $scope.PrintForm($('#print').html(), 'Generate CollegeTimeTable Manual');
        $('#txtReportTitle').css('display', 'none');
    };
};