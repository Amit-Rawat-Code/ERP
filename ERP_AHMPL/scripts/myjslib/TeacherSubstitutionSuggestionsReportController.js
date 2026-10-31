app.TeacherSubstitutionSuggestionsReportController = function ($scope, $element, $filter, myService) {
    $scope.ddlShift_change = function () {
        $scope.GetShiftwiseEmployees();
    }

    $scope.GetShiftwiseEmployees = function () {
        var collectionobj = {};
        collectionobj.ShiftCode = $scope.ShiftCode
        collectionobj.Action = "1";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetEmployeeOnLeaveList', collectionobj);
        getData.then(function (response) {
            $scope.EmployeesList = response.data.Table;
        });
    }

    $scope.ddlEmployee_Change = function () {
        $scope.GetLeaveRecords();
    }

    $scope.GetLeaveRecords = function () {
        var collectionobj = {};
        collectionobj.ReplaceFromEmployeeCode = $scope.EmployeeCode
        collectionobj.ShiftCode = $scope.ShiftCode
        collectionobj.Action = "8";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetEmployeeOnLeaveList', collectionobj);
        getData.then(function (response) {
            $scope.SubtitutionDateRange = response.data.Table;
        });
    }

    $scope.SubtitutionDateRange = [
        //{
        //    Srno: '',
        //    FromDate: '10-Jan-2021',
        //    ToDate: '15-Jan-2021',
        //    Type: 'A',
        //    Chk: false
        //},
        //{
        //    Srno: '',
        //    FromDate: '15-Jan-2021',
        //    ToDate: '20-Jan-2021',
        //    Type: 'A',
        //    Chk: false
        //}
    ];

    $scope.Periods = [
        //{
        //    PeriodName: 'P1',
        //    PeriodCode: '01'
        //},
        //{
        //    PeriodName: 'P2',
        //    PeriodCode: '02'
        //},
        //{
        //    PeriodName: 'P3',
        //    PeriodCode: '03'
        //},
        //{
        //    PeriodName: 'P4',
        //    PeriodCode: '04'
        //},
        //{
        //    PeriodName: 'P5',
        //    PeriodCode: '05'
        //},
        //{
        //    PeriodName: 'P6',
        //    PeriodCode: '06'
        //},
        //{
        //    PeriodName: 'P7',
        //    PeriodCode: '07'
        //},
        //{
        //    PeriodName: 'P8',
        //    PeriodCode: '08'
        //}

    ];

    $scope.AddRecord = function () {
        $scope.AddSubtitutionDateRange = [];
        if (moment.isDate($scope.FromDate)) {
            if (moment.isDate($scope.ToDate)) {
                var addcurrDate = moment($scope.FromDate).startOf('day');
                var addlastDate = moment($scope.ToDate).startOf('day');
                //var valueArr = [];
                //valueArr = $scope.AddSubtitutionDateRange.map(function (item) { return item.FromDate });
                //valueArr.push(moment(currDate).format('DD-MMM-YYYY'));
                //var isDuplicate = valueArr.some(function (item, idx) {
                //    return valueArr.indexOf(item) != idx
                //});
                //if (!isDuplicate)
                $scope.AddSubtitutionDateRange.splice(0, 0, {
                    Srno: '',
                    FromDate: moment(addcurrDate).format('DD-MMM-YYYY'),
                    ToDate: moment(addcurrDate).format('DD-MMM-YYYY'),
                    Type: 'M',
                    Chk: true,
                    IsNotReplaced: true
                });
                while (addcurrDate.add(1, 'days').diff(addlastDate) <= 0) {
                    //var valueArr = $scope.AddSubtitutionDateRange.map(function (item) { return item.FromDate });
                    //valueArr.push(moment(currDate).format('DD-MMM-YYYY'));
                    //var isDuplicate = valueArr.some(function (item, idx) {
                    //    return valueArr.indexOf(item) != idx
                    //});
                    //if (!isDuplicate)
                    $scope.AddSubtitutionDateRange.splice(0, 0, {
                        Srno: '',
                        FromDate: moment(addcurrDate).format('DD-MMM-YYYY'),
                        ToDate: moment(addcurrDate).format('DD-MMM-YYYY'),
                        Type: 'M',
                        Chk: true,
                        IsNotReplaced: true
                    });
                    //dates.push(currDate.clone().toDate());
                }
                //$scope.AddSubtitutionDateRange.sort(function (a, b) {
                //    var keyA = new Date(a.FromDate),
                //        keyB = new Date(b.FromDate);
                //    // Compare the 2 dates
                //    if (keyA < keyB) return -1;
                //    if (keyA > keyB) return 1;
                //    return 0;
                //});
                var collectionobj = {};
                collectionobj.Action = "12";
                collectionobj.ShiftCode = $scope.ShiftCode;
                collectionobj.ReplaceFromEmployeeCode = $scope.EmployeeCode;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.SubtitutionDateRange = JSON.stringify($scope.AddSubtitutionDateRange);
                var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetEmployeeOnLeaveList', collectionobj);
                getData.then(function (response) {
                    //var currDate = moment(response.data.Table[0].FromDate).startOf('day');
                    //var lastDate = moment(response.data.Table[response.data.Table.length-1].ToDate).startOf('day');

                    angular.forEach(response.data.Table, function (obj) {
                        var valueArr = $scope.SubtitutionDateRange.map(function (item) { return item.FromDate });
                        valueArr.push(moment(obj.FromDate).format('DD-MMM-YYYY'));
                        var isDuplicate = valueArr.some(function (item, idx) {
                            return valueArr.indexOf(item) != idx
                        });
                        if (!isDuplicate)
                        $scope.SubtitutionDateRange.push(obj);
                    })
                    $scope.SubtitutionDateRange.sort(function (a, b) {
                        var keyA = new Date(a.FromDate),
                            keyB = new Date(b.FromDate);
                        // Compare the 2 dates
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                    //$scope.GetDataForUpdateRecord();
                });
            }
            else {
                showMsgBox('Select ToDate.');
                $scope.SetFocus('#txtToDate');
                
            }            
        }
        else {
            showMsgBox('Select FromDate.');
            $scope.SetFocus('#txtFromDate');
        }
    }

    $scope.RemoveRecord = function (index) {
        $scope.SubtitutionDateRange.splice(index,1);
    }

    $scope.SubstitutionTimeTable = [
        //{
        //    Date: '01/Jul/2021',
        //    Day: 'Monday',
        //    PeriodList: [
        //        {
        //            PeriodCode: '01',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00001",
        //            ClassName: '1st',
        //            ClassCode: '0001',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '02',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '03',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '04',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00001",
        //            ClassName: '4rth',
        //            ClassCode: '0004',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '05',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '06',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '07',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '08',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        }
        //    ]
        //},
        //{
        //    Date: '02/Jul/2021',
        //    Day: 'Tuesday',
        //    PeriodList: [
        //        {
        //            PeriodCode: '01',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00001",
        //            ClassName: '1st',
        //            ClassCode: '0001',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '02',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '03',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '2nd',
        //            ClassCode: '0002',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '04',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '05',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '06',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '07',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '08',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        }
        //    ]
        //},
        //{
        //    Date: '03/Jul/2021',
        //    Day: 'Wednesday',
        //    PeriodList: [
        //        {
        //            PeriodCode: '01',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '02',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '2nd',
        //            ClassCode: '0002',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '03',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '2nd',
        //            ClassCode: '0002',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '04',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '05',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '06',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '07',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '08',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        }
        //    ]
        //},
        //{
        //    Date: '04/Jul/2021',
        //    Day: 'Thursday',
        //    PeriodList: [
        //        {
        //            PeriodCode: '01',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '2nd',
        //            ClassCode: '0002',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '02',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '03',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '2nd',
        //            ClassCode: '0002',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '04',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '05',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '06',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '07',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '08',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        }
        //    ]
        //},
        //{
        //    Date: '05/Jul/2021',
        //    Day: 'Friday',
        //    PeriodList: [
        //        {
        //            PeriodCode: '01',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '2nd',
        //            ClassCode: '0002',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '02',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '03',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '04',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '05',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '06',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '07',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '08',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        }
        //    ]
        //},
        //{
        //    Date: '06/Jul/2021',
        //    Day: 'Saturday',
        //    PeriodList: [
        //        {
        //            PeriodCode: '01',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '2nd',
        //            ClassCode: '0002',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '02',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '03',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '04',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '05',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        },
        //        {
        //            PeriodCode: '06',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '07',
        //            EmployeeName: "Jagdeesh Gupta",
        //            EmployeeCode: "00003",
        //            ClassName: '3rd',
        //            ClassCode: '0003',
        //            Subject: "English",
        //            SubjectCode: '001',
        //            SubtituteTeacherList: [
        //                {
        //                    EmployeeName: "Mohit Gupta",
        //                    Subject: "English",
        //                    SubjectCode: '001'
        //                },
        //                {
        //                    EmployeeName: "Ramesh Gupta",
        //                    Subject: "Hindi",
        //                    SubjectCode: '002'
        //                }
        //            ]
        //        },
        //        {
        //            PeriodCode: '08',
        //            EmployeeName: "",
        //            EmployeeCode: "",
        //            ClassName: '',
        //            ClassCode: '',
        //            Subject: "",
        //            SubjectCode: '',
        //            SubtituteTeacherList: []
        //        }
        //    ]
        //}
    ];

    $scope.Print = function () {
        $scope.PrintForm($('#print').html(), 'Teacher Substitution Report');
    }

    $scope.GetTeacherTimeTableGrid = function () {
        var collectionobj = {};
        collectionobj.SubtitutionDateRange = JSON.stringify($scope.SubtitutionDateRange) 
        collectionobj.ReplaceFromEmployeeCode = $scope.EmployeeCode;
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.SWithSameSubject = $scope.SWithSameSubject;
        collectionobj.Action = "2";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetEmployeeOnLeaveList', collectionobj);
        getData.then(function (response)
        {
            $scope.Periods = response.data.Table;

            $.each(response.data.Table1, function (index, obj)
            {
                obj.PeriodList = JSON.parse(obj.PeriodList);
            });

            $scope.SubstitutionTimeTable = response.data.Table1;

            $scope.SubtPrintTitle();
        });
    }

    $scope.LoadTimetable = function () {
        if ($scope.Save == 'Edit') {
            $scope.GetDataForUpdateRecord();
        }
        else {
            $scope.GetTeacherTimeTableGrid();
        }
    }

    $scope.GetTeachersforSubtitute = function (p, obj) {
        var collectionobj = {};
        collectionobj.ReplaceFromEmployeeCode = $scope.EmployeeCode;
        collectionobj.PeriodCode = p.PeriodCode;
        collectionobj.CourseCode = p.CourseCode;
        collectionobj.SubjectCode = p.SubjectCode;
        collectionobj.VDate = obj.Day;
        collectionobj.SWithSameSubject = $scope.SWithSameSubject;
        collectionobj.FromDate = moment(obj.Date).format('DD-MMM-YYYY');
        collectionobj.ToDate = moment(obj.Date).format('DD-MMM-YYYY');
        collectionobj.Action = "3";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetEmployeeOnLeaveList', collectionobj);
        getData.then(function (response) {
            $scope.TeacherListForSubstitution = response.data.Table;

            $scope.SelectedTeacherList = $filter('filter')((($scope.SubstitutionTimeTable[$scope.row]).PeriodList[$scope.colrow]).SubtituteTeacherList, { Chk: true });

            //var filter1 = $filter('filter')(($scope.SubstitutionTimeTable[$scope.row].PeriodList), { PeriodCode: p.PeriodCode })
            //$scope.SelectedTeacherList = $filter('filter')(filter1[$scope.colrow].SubtituteTeacherList, { Chk: true });

            $.each($scope.SelectedTeacherList, function (i, obj) {
                $.each($scope.TeacherListForSubstitution, function (index, array) {
                    if (obj.EmployeeCode == array.EmployeeCode && obj.SubjectCode == array.SubjectCode) {
                        array.Chk = true;
                    }
                });
            });
        });
    }

    $scope.row;
    $scope.colrow;
    $scope.ShowModalPopUp = function (p, obj, row, colrow) {
        $('#exampleModalCenter').modal('show');
        //$scope.GetTeachersforSubtitute(p, obj.Day, obj.Date);
        $scope.GetTeachersforSubtitute(p, obj);
        $scope.row = row; $scope.colrow = colrow-1;
    }

   
    $scope.SaveChange = function () {
        $scope.SelectedTeacherList = $filter('filter')($scope.TeacherListForSubstitution, { Chk: true });

        $.each((($scope.SubstitutionTimeTable[$scope.row]).PeriodList[$scope.colrow]).SubtituteTeacherList, function (index, array) {
            array.Chk = false;
        });

        $.each($scope.SelectedTeacherList, function (i, obj) {
            $.each((($scope.SubstitutionTimeTable[$scope.row]).PeriodList[$scope.colrow]).SubtituteTeacherList, function (index, array) {
                if (obj.EmployeeCode == array.EmployeeCode && obj.SubjectCode == array.SubjectCode) {
                    array.Chk = true;
                }
            });
        });

        $('#exampleModalCenter').modal('hide');
    }

    $scope.SaveRecord = function () {
        $scope.FinalList = [];
        if (isValidate()) {
            $scope.showLoader();
            $.each($scope.SubstitutionTimeTable, function (index1, array1)
            {
                debugger
                $.each(array1.PeriodList, function (index2, array2) {
                    if (array2.EmployeeName != null) {
                        var stl = $filter('filter')(array2.SubtituteTeacherList, { Chk: true });
                            if (stl !=null && stl.length > 0) {
                                $.each(stl, function (index3, array3) {
                                    $scope.FinalList.push({
                                        Date: array1.Date,
                                        Day: array1.Day,
                                        ClassCode: array2.ClassCode,
                                        SectionCode: array2.SectionCode,
                                        OldEmployeeCode: array2.EmployeeCode,
                                        NewEmployeeCode: array3.EmployeeCode,
                                        NewEmployeeName: array3.EmployeeName,
                                        SubjectCode: array3.SubjectCode,
                                        PeriodCode: array2.PeriodCode,
                                        TransId: array2.TransId,
                                        Type: array1.Type
                                    });
                                });
                        }
                        else {
                            if (array2.EmployeeName != null) {
                                $scope.FinalList.push({
                                    Date: array1.Date,
                                    Day: array1.Day,
                                    OldEmployeeCode: array2.EmployeeCode,
                                    ClassCode: array2.ClassCode,
                                    SectionCode: array2.SectionCode,
                                    NewEmployeeCode: array2.EmployeeCode,
                                    NewEmployeeName: array2.EmployeeName,
                                    SubjectCode: array2.SubjectCode,
                                    PeriodCode: array2.PeriodCode,
                                    TransId: array2.TransId,
                                    Type: array1.Type
                                });
                            }
                        }
                    }
                })
            })

            var collectionobj = {};
            collectionobj.TransID = $scope.hfId;
            collectionobj.SWithSameSubject = $scope.SWithSameSubject;
            collectionobj.ShiftCode = $scope.ShiftCode;
            collectionobj.ReplaceFromEmployeeCode = $scope.EmployeeCode;
            collectionobj.ReplaceTeacherData = JSON.stringify($scope.FinalList);
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;

            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/InsertUpdateDeleteReplaceTeacherMaster', collectionobj);
            if ($scope.Save == 'Edit') {
                collectionobj.Action = "10";
            }
            else {
                collectionobj.Action = "4";
            }

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        };
    };

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetEmployeeOnLeaveList', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Shift", "HeaderValue": "ShiftName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Substitute", "HeaderValue": "Replaced", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Substitute With Same Subject", "HeaderValue": "IsSubWithSameSubject", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Substitute Dates", "HeaderValue": "ReplaceDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ]; 

            $scope.ReplaceTeacherList = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $('#example tbody').on('dblclick', 'tr', function (event) {

                $scope.showLoader();
                $scope.Save = "Edit";
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();

                $scope.ReplaceTeacherList = $filter('filter')($scope.ReplaceTeacherList, { TransID: $scope.hfId }, true);

                $scope.EmployeeCode = $scope.ReplaceTeacherList[0].OldEmployeeCode
                $scope.ShiftCode = $scope.ReplaceTeacherList[0].ShiftCode

                
                $scope.SWithSameSubject = $scope.ReplaceTeacherList[0].IsSubWithSameSubject?'true':'false'
                $scope.GetShiftwiseEmployees();

                var collectionobj = {};
                collectionobj.TransID = $scope.hfId;
                collectionobj.ShiftCode = $scope.ShiftCode;
                collectionobj.Action = "7";
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetEmployeeOnLeaveList', collectionobj);
                getData.then(function (response) {

                    $scope.SubtitutionDateRange = response.data.Table;
                    $scope.$on('CustomFunction', function () {
                        $scope.LoadTimetable();
                    });
                    
                });
                
                $scope.isShiftDisabled = true
                $scope.isEmpDisabled = true

                $scope.hideLoader();
          
                $scope.disableDelete = false;
                $scope.disablePrint = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#FromDate', true);
            });
        });
    };

  

    $scope.GetDataForUpdateRecord = function ()
    {
        debugger
        var collectionobj = {};
        collectionobj.TransID = $scope.hfId;
        collectionobj.SubtitutionDateRange = JSON.stringify($scope.SubtitutionDateRange)
        collectionobj.ReplaceFromEmployeeCode = $scope.EmployeeCode;
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.SWithSameSubject = $scope.SWithSameSubject;
        collectionobj.Action = "9";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/GetEmployeeOnLeaveList', collectionobj);
        getData.then(function (response) {

            $scope.Periods = response.data.Table;
            $.each(response.data.Table1, function (index, obj) {
                obj.PeriodList = JSON.parse(obj.PeriodList);
            });
            $scope.SubstitutionTimeTable = response.data.Table1;

            $scope.SubtPrintTitle();
        });
    }

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

        $scope.isShiftDisabled = false
        $scope.isEmpDisabled = false

        $scope.hfId = "";
  
        $scope.SubtitutionDateRange = [];
        $scope.Periods = [];
        $scope.SubstitutionTimeTable = [];
        $scope.ShiftCode = "";
        $scope.EmployeeCode = "";
        $scope.SWithSameSubject = 'true';

        $scope.FromDate = "";
        $scope.ToDate = "";

        $scope.ReplaceTeacherList = [];


        //$scope.AddRow();
        $scope.StreamCode = "";
        $scope.IsActive = "true";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlSession');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "11";
        collectionobj.TransID = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/TimeTableTransactionApi/InsertUpdateDeleteReplaceTeacherMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Shift", "HeaderValue": "ShiftName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Substitute", "HeaderValue": "Replaced", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Substitute With Same Subject", "HeaderValue": "IsSubWithSameSubject", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Substitute Dates", "HeaderValue": "ReplaceDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.ReplaceTeacherList, window.document.title);
    };

    $scope.SubtPrintTitle = function () {
        $scope.ShiftName = ($filter('filter')($scope.Shifts, { Code: $scope.ShiftCode }))[0].ShiftWithTime;
        $scope.EmployeeName = ($filter('filter')($scope.EmployeesList, { EmployeeCode: $scope.EmployeeCode }))[0].EmployeeName;
        $scope.SubtWithSameSubj = $scope.SWithSameSubject=='true' ? 'Yes' : 'No';
    }

    $scope.ddlChk_Change = function (obj) {
        $scope.SubstitutionTimeTable = $filter('filter')($scope.SubstitutionTimeTable, { Date: '!' + obj.FromDate }, true);
    }
    
};