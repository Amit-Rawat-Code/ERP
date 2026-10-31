app.FeeCollectionReportController = function ($scope, $element, $filter, myService) {
    $scope.StudentClassSection = {
        StudentId: ""
    }
    //$scope.DateTo = "";

    $scope.ddlClass_Change = function (ClassId) {
        debugger
        $scope.GetSections(ClassId);
    }

    $scope.SearchStudents = function () {
        
        $scope.SearchText = "";
        $scope.InstituteRollNo = "";
        $scope.AdmissionNo = "";
        $scope.StudentCode = "";

        document.getElementById("FeeStuListOnOff").classList.toggle("show");
        $scope.GetAllStudents();
    }

    $scope.ddlSection_Change = function () {
        $scope.GetAllStudents();
    }


    $scope.GetAllStudents = function (action)
    {
        debugger
        $scope.disabledSearch = false;
        var collectionobj = {};
        $scope.StudentsList = [];
        collectionobj.BranchCode = $scope.BranchCode;;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.UpdatedBy = userid;
        collectionobj.Action = "5"
        var getData = myService.methode('POST', "../Api/FeeReportApi/SearchStudentsForFeeDetails", collectionobj);
        getData.then(function (response) 
        {
            debugger
            $scope.StudentsList = response.data;
            if ($scope.StudentsList.length > 0)
            {
                setTimeout(function ()
                {
                    
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;
                    $scope.$applyAsync();
                }, 100);
            }

            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }

    $scope.setStudentName = function (student) {
        
        $scope.SearchText = student.StudentName;
        $scope.StudentCode = student.StudentCode;
        $scope.StudentName = student.StudentName;
        $scope.AdmissionNo = student.AdmissionNo;
        $scope.ClassName = student.ClassName;
        $scope.BranchName = student.BranchName;
        $scope.SectionName = student.SectionName;
        $scope.GuardianAddress = student.GuardianAddress;
        $scope.FatherName = student.FatherName;
        $scope.MotherName = student.MotherName;
        $scope.FatherContactNo = student.FatherContactNo;
        $scope.AdmissionFormNo = student.AdmissionFormNo;
        $scope.InstituteRollNo = student.InstituteRollNo;
        $scope.StudentPhoto = student.StudentPhoto;
        $scope.AcademicSess = student.AcademicSession;
        $scope.AcademicSessionId = student.AcademicSessionId;
        $scope.HideStudentList();
        //if (sessionId == $scope.AcademicSessionId) {
        //    $scope.GetSessionYear();
        //}
        //else {
        //    $scope.GetAcademicSession();
        //}
           $scope.$applyAsync();
    }


    $scope.HideStudentList = function (val) {
        setTimeout(function () {
          
            if (document.querySelectorAll(".show").length > 0) {
                //$scope.HideDiv = false;
                document.getElementById("FeeStuListOnOff").classList.toggle("show")
            }
            
        }, 200);
    }    

    //$scope.ddl_StudentsListChange = function (student) {
    //    $scope.setStudentName(student)
    //}


    $scope.SearchRecord = function () {
        debugger
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };

    $scope.txtStudent_blur = function () {
        $scope.InstituteRollNo = "";
        $scope.AdmissionNo = "";
        $scope.StudentCode = "";
    }

    $scope.started = function () {
        debugger
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = $scope.SummaryFilter;
        collectionobj.SessionId = sessionId;
        collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');

        //if (typeof ($scope.ToDate) !== 'undefined')
        //    $scope.DateTo = $scope.ToDate 
        //else
        //    $scope.DateTo = $scope.FromDate
        collectionobj.RelationshipId = relationshipId;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
        collectionobj.RollNo = $scope.InstituteRollNo;
        collectionobj.Mode = $scope.FeeMode;
        collectionobj.AdmissionNo = $scope.AdmissionNo
        collectionobj.StudentCode = $scope.StudentCode

        //var getData = myService.methode('POST', "../Api/FeeManagementReportApi/GetFeeDefaulterNoticeReport", '{obj:' + JSON.stringify(collectionobj) + '}');
        var getData = myService.methode('POST', "../Api/FeeReportApi/GetFeeDefaulterNoticeReport", collectionobj);
        getData.then(function (response) {
            debugger
            var tblheader = '';
            $('#UpdatePanel').text('');
            messagevalues = [
                { "From Date": moment($scope.FromDate).format('DD-MMM-YYYY') },
                { "To Date": moment($scope.ToDate).format('DD-MMM-YYYY') },
                { "Student": $scope.Student },
                { "Student Id": $scope.StudentId },
                { "Scholar No.": $scope.InstituteRollNo }
            ];
            if ($scope.SummaryFilter == '4') {
                var tblheader = [
                    { "HeaderText": "Date", "HeaderValue": "VrDate", "Width": "100px" },
                    { "HeaderText": "Rcpt. No.", "HeaderValue": "FilterCol", "Width": "100px", "RowSpan": "FilterCol" },
                    { "HeaderText": "Voucher", "HeaderValue": "V_Type", "Width": "100px", "RowSpan": "FilterCol" },
                    { "HeaderText": "Student", "HeaderValue": "Student", "Width": "100px" },
                    { "HeaderText": "Admission No.", "HeaderValue": "AdmissionNo", "Width": "100px" },
                    { "HeaderText": "Class", "HeaderValue": "Class", "Width": "100px" },
                    { "HeaderText": "Section", "HeaderValue": "Section", "Width": "100px" },
                    { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100px" },
                    { "HeaderText": "Mobile No", "HeaderValue": "MobileNo", "Width": "100px" },
                    { "HeaderText": "Status", "HeaderValue": "Status", "Width": "100px" },
                    { "HeaderText": "Mode", "HeaderValue": "Mode", "Width": "100px" },
                    { "HeaderText": "Transaction No", "HeaderValue": "TransactionNo", "Width": "100px" },
                    { "HeaderText": "Month", "HeaderValue": "Month", "Width": "100px" },
                    { "HeaderText": "(₹) Amount", "HeaderValue": "Amount", "Width": "100px", "TextAlign": "Right" }
                ];
            }
            else if ($scope.SummaryFilter == '2') {
                var tblheader = [
                    { "HeaderText": "Rcpt. No.", "HeaderValue": "FilterCol", "Width": "100px", "RowSpan": "FilterCol" },
                    { "HeaderText": "Date", "HeaderValue": "VrDate", "Width": "100px" },
                    //{ "HeaderText": "Sch No.", "HeaderValue": "SchNo", "Width": "100px" },
                    { "HeaderText": "Admission No.", "HeaderValue": "AdmissionNo", "Width": "100px" },
                    { "HeaderText": "Student", "HeaderValue": "Student", "Width": "100px" },
                    { "HeaderText": "Class", "HeaderValue": "Class", "Width": "100px" },
                    { "HeaderText": "Section", "HeaderValue": "Section", "Width": "100px" },
                    { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100px" },
                    { "HeaderText": "Mobile No", "HeaderValue": "Mobile", "Width": "100px" },
                    { "HeaderText": "Status", "HeaderValue": "Status", "Width": "100px" },
                    { "HeaderText": "Mode", "HeaderValue": "Mode", "Width": "100px" },
                    { "HeaderText": "Transaction No", "HeaderValue": "TransactionNo", "Width": "100px" },
                    { "HeaderText": "Month", "HeaderValue": "Month", "Width": "100px" },
                    { "HeaderText": "FeeName", "HeaderValue": "FeeName", "Width": "100px" },
                    { "HeaderText": "(₹) Amount", "HeaderValue": "Amount", "Width": "100px", "TextAlign": "Right", "DecimalPoint": "Yes" }
                ];

            }
           $scope.tblfootermain1 = [];
            var object = {
             tblheader: tblheader,
                RepeatHeader: 1,
                showtblfooter: 1,
                tblbody: response.data.Table,
                FooterColumn: {
                    TextCol: [],
                },
                tbodyFooterColumn: {
                    TextCol: [],
                },
                BodyGrid: 1,
                SummaryGrid: 0
            }
        
            if ($scope.SummaryFilter == '4') {
                debugger
                object.FooterColumn['TextCol'] = [{ Text: 'Month', Val: 'Total Amt', SumCol: 'Amount', Sum: 'Amount' },
                    { Text: 'Month', Val: 'Cancel Rcpt. Amt.', SumCol: 'Amount', Sum: 'CancelAmount' },
                    { Text: 'Month', Val: 'Net Amt.', SumCol: 'Amount', Sum: 'NetAmount' }];
                $scope.SearchReportGrid(object);
            }
            else if ($scope.SummaryFilter == '2') {
                object.FooterColumn['TextCol'] = [
                    { Text: 'FeeName', Val: 'Total Amt', SumCol: 'Amount', Sum: 'Amount' },
                    { Text: 'FeeName', Val: 'Cancel Rcpt. Amt.', SumCol: 'Amount', Sum: 'CancelAmount' },
                    { Text: 'FeeName', Val: 'Net Amt.', SumCol: 'Amount', Sum: 'NetAmount' }];
                object.tbodyFooterColumn['TextCol'] = [{ Text: 'FeeName', Val: 'Total', SumCol: 'Amount', Sum: 'Amount' }];
                SearchRepeatReportGridWithCRSPAN(object);
            }


            var tblheader = [
                { "HeaderText": "S No.", "HeaderValue": "SNo", "Width": "100%", "RowSpan": "SNo", "CssClass": "srno" },
                { "HeaderText": "Payment Mode", "HeaderValue": "PayMode", "Width": "100%", "FooterText": "Total" },

                { "HeaderText": "(₹) Amount", "HeaderValue": "Amount", "Width": "100%", "CssClass": "text-right", "Fun": "Sum" }
            ];
            messagevalues = [];
            loadDataUsingPreDefinedColumnForMulitpleTable(tblheader, 'example1', response.data.Table1);


            //$(".section-toggle").slideToggle('slow');
            //$(".filter-toggle").css("display", "block");


        });
    }
    SearchRepeatReportGridWithCRSPAN = function (object) {
        $scope.GetFilterMsg();
        $scope.tblheader = [];
        $scope.tblbody = [];
        $scope.tblfootermain = [];
        $scope.tblfooterrepeat = {};

        $scope.tblfootermain1 = [];
        $scope.tblfooterrepeat1 = {};

        $scope.keys = [];
        $scope.showtblfooter = object.showtblfooter
        //
        if (object.BodyGrid == 1) {
            if (object.tblbody.length > 0 && object.tblbody != null) {

                $scope.RepeatHeader = object.RepeatHeader;
                $scope.tblheader = object.tblheader
                $scope.tblbody = object.tblbody;
                $scope.TextMessage = object.TextMessage;
                $scope.BodyHeaderTitle = object.BodyHeaderTitle;

                $scope.LeftFooterText = object.LeftFooterText;
                $scope.LeftFooterValue = object.LeftFooterValue;
                $scope.RightFooterText = object.RightFooterText;
                $scope.RightFooterValue = object.RightFooterValue;

                $.each($scope.tblbody, function (index, array) {
                    if ($scope.keys.indexOf(array.FilterCol) === -1 && array.FilterCol != "" && array.FilterCol != null) {
                        $scope.keys.push(array.FilterCol);
                    }
                });

                if ($scope.keys.length > 0) {
                    console.log($scope.keys);
                    if (object.tbodyFooterColumn != null)
                        $.each($scope.keys, function (index, val) {
                            $.each(object.tbodyFooterColumn.TextCol, function (index, array) {
                                $scope.tblfooterrepeat = {};
                                $.each($scope.tblheader, function (key, val) {
                                    $scope.tblfooterrepeat[val.HeaderValue] = "";
                                });
                                $scope.tblfooterrepeat[array.Text] = array.Val;
                                var tbody = $filter('filter')(object.tblbody, { FilterCol: val });
                                $.each(tbody, function (rowindex, values) {

                                    if (Object.prototype.toString.call(array.SumCol) === '[object Array]') {
                                        var abc = array.SumCol;
                                        $.each(abc, function (rowindex1, values1) {
                                            if ($scope.tblfooterrepeat[values1] == "") {
                                                $scope.tblfooterrepeat[values1] = 0;
                                            }
                                            if (isNaN(values[values1])) {
                                                $scope.tblfooterrepeat[values1] += 0
                                            }
                                            else {
                                                $scope.tblfooterrepeat[values1] = $scope.tblfooterrepeat[values1] + values[array.Sum[rowindex1]]
                                            }
                                        })
                                    } else {
                                        if ($scope.tblfooterrepeat[array.SumCol] == "") {
                                            $scope.tblfooterrepeat[array.SumCol] = 0;
                                        }
                                        if (isNaN(values[array.SumCol])) {
                                            $scope.tblfooterrepeat[array.SumCol] += 0
                                        }
                                        else {
                                            $scope.tblfooterrepeat[array.SumCol] = $scope.tblfooterrepeat[array.SumCol] + values[array.Sum]
                                        }
                                    }
                                });
                                $scope.tblfooterrepeat['FilterCol'] = val;
                                $scope.tblfootermain.push($scope.tblfooterrepeat);

                            });
                        });

                    if (object.showtblfooter == 1)
                        $.each(object.FooterColumn.TextCol, function (index, array) {
                            $scope.tblfooterrepeat1 = {};
                            $.each($scope.tblheader, function (key, val) {
                                $scope.tblfooterrepeat1[val.HeaderValue] = "";
                            });
                            $scope.tblfooterrepeat1[array.Text] = array.Val;
                            $.each(object.tblbody, function (rowindex, values) {
                                if (Object.prototype.toString.call(array.SumCol) === '[object Array]') {
                                    var abc = array.SumCol;
                                    $.each(abc, function (rowindex1, values1) {
                                        if ($scope.tblfooterrepeat1[values1] == "") {
                                            $scope.tblfooterrepeat1[values1] = 0;
                                        }
                                        if (isNaN(values[values1])) {
                                            $scope.tblfooterrepeat1[values1] += 0
                                        }
                                        else {
                                            $scope.tblfooterrepeat1[values1] = $scope.tblfooterrepeat1[values1] + values[array.Sum[rowindex1]]
                                        }
                                    })
                                } else {
                                    if ($scope.tblfooterrepeat1[array.SumCol] == "") {
                                        $scope.tblfooterrepeat1[array.SumCol] = 0;
                                    }
                                    if (isNaN(values[array.SumCol])) {
                                        $scope.tblfooterrepeat1[array.SumCol] += 0
                                    }
                                    else {
                                        $scope.tblfooterrepeat1[array.SumCol] = $scope.tblfooterrepeat1[array.SumCol] + values[array.Sum]
                                    }
                                }
                            });
                            $scope.tblfootermain1.push($scope.tblfooterrepeat1);
                        });
                }
                else {

                    if (object.showtblfooter == 1)
                        $.each(object.FooterColumn.TextCol, function (index, array) {
                            $scope.tblfooterrepeat = {};
                            $.each($scope.tblheader, function (key, val) {
                                $scope.tblfooterrepeat[val.HeaderValue] = "";
                            });
                            $scope.tblfooterrepeat[array.Text] = array.Val;
                            $.each(object.tblbody, function (rowindex, values) {
                                if ($scope.tblfooterrepeat[array.SumCol] == "") {
                                    $scope.tblfooterrepeat[array.SumCol] = 0;
                                }
                                if (isNaN(values[array.SumCol])) {
                                    $scope.tblfooterrepeat[array.SumCol] += 0
                                }
                                else {
                                    $scope.tblfooterrepeat[array.SumCol] = $scope.tblfooterrepeat[array.SumCol] + values[array.Sum]
                                }
                            });
                            $scope.tblfootermain.push($scope.tblfooterrepeat);
                        });
                }
            }
            else {
                $scope.tblheader = [];
                $scope.tblbody = [];
                $scope.tblfootermain = [];
                $scope.tblfooterrepeat = {};

                $scope.tblfootermain1 = [];
                $scope.tblfooterrepeat1 = {};

                $scope.keys = [];
                $scope.FilterMsg = "";
            }
        }

        $scope.HeadValue = [];
        $scope.tblheaderSummary = [];
        $scope.tblbodySummary = [];
        $scope.tblfooterSummary = {};

        if (object.SummaryGrid == 1) {
            //$scope.Repeater = object.Repeater;
            var HeadName = object.SummaryCol[0];
            //var HeadName1 = object.HeadName1;
            $.each(object.tblbody, function (index, vales) {
                key = vales[HeadName]
                if ($.inArray(key, $scope.HeadValue) === -1) {
                    $scope.HeadValue.push(key)
                }
            });

            $scope.tblheaderSummary = object.SummaryHeader;

            $scope.headerIndex = object.SummaryHeaderRow;

            $.each($scope.HeadValue, function (index, val) {
                key = val
                $scope.tblbodySummary1 = {};
                $scope.tblbodySummary1[object.SummaryCol[0]] = key;
                $.each(object.SummaryCol, function (index, values) {
                    if (index != 0) {
                        if (!$scope.tblbodySummary1[object.SummaryCol[index]]) {
                            $scope.tblbodySummary1[object.SummaryCol[index]] = 0;
                        }
                        var hh = object.SummaryCol[0];
                        $.each(object.tblbody, function (index1, array) {
                            if (array[object.SummaryCol[0]] == key) {
                                if (isNaN(array[object.SummaryCol[index]]))
                                    $scope.tblbodySummary1[object.SummaryCol[index]] += 0;
                                else
                                    $scope.tblbodySummary1[object.SummaryCol[index]] += Number(array[object.SummaryCol[index]]);
                            }
                        });
                    }
                });
                //console.log(JSON.stringify($scope.tblbodySummary1));
                $scope.tblbodySummary.push($scope.tblbodySummary1);
            });

            var rowindex = 0;
            if ($scope.showtblfooter == 1)
                $.each($scope.tblheaderSummary, function (index, row) {
                    $scope.tblfooter = [];
                    if (row[index].IsTitleRow != "Yes") {
                        $.each(row, function (key, val) {
                            if (val.IsFooterTotal != "Yes") {
                                if (val.FooterText == null)
                                    $scope.tblfooter.push({ FooterText: '' })
                                else
                                    $scope.tblfooter.push({ FooterText: val.FooterText, TextAlign: val.FooterTextAlign })
                            }
                            else {
                                var totalfooteramount = 0;
                                $.each($scope.tblbodySummary, function (keys, values) {
                                    totalfooteramount += values[val.HeaderValue];
                                });
                                $scope.tblfooter.push({ FooterText: totalfooteramount, TextAlign: val.FooterTextAlign })
                            }
                        });
                        $scope.tblfooterSummary[rowindex] = $scope.tblfooter;
                    }
                    else
                        rowindex = index;

                });
        }

        if (object.tblbody.length > 0) {
            $(".section-toggle").slideToggle('slow');
            $(".filter-toggle").css("display", "block");
        }

        $scope.hideLoader();
    }
}