//const { forEach } = require("core-js/js/array");

app.AdmissionFeeDepositController =function ($scope, $element, $filter, myService) {   
    $scope.SetFocus('#ddlSession');
    $scope.SetMaxMinDate().then(function (response) {
        $scope.FeeDepositDate = response;
        $scope.$applyAsync();
    });
    $scope.StudentId = "";
    $scope.StudentCode = "";
    $scope.StreamCode = "";
    $scope.AdmStudentName = "";
    $scope.ClassWiseFeesStructure = [];
    $scope.selectedConcessionCount = 0;
    $scope.selectedInstallmentCount = 0;
    $scope.BankName = "";
    
    $scope.$parent.ClassCode = getParameterByName('Para1');
    $scope.StudentCode = getParameterByName('Para2');
    $scope.IsFinalStd = getParameterByName('Para3');
    $scope.FromAdm = getParameterByName('Para4');
    $scope.SessionId = getParameterByName('Para5') == null ? sessionId : getParameterByName('Para5');

    $scope.$watch('GetFeeStructureGroupList', function () {
        if ($scope.GetFeeStructureGroupList != undefined) {
            $scope.FeeStructureGroup = $scope.GetFeeStructureGroupList.length > 0 ? $scope.GetFeeStructureGroupList[0].Code : '';
        }
    })
    //setTimeout(function () {
    //    $scope.FeeStructureGroup = $scope.GetFeeStructureGroupList.length > 0 ? $scope.GetFeeStructureGroupList[0].Code : '';
    //}, 500);

    $scope.AllInstallment = function () {
        angular.forEach($scope.InstallmentList, function (SI) {
            SI.IsActive = $scope.chkAllInstallment;
        });
    }

    $scope.AllConcession = function () {
        angular.forEach($scope.ConcessionheadList, function (SI) {
            SI.chk = $scope.chkAllConcession;
        });
    }

    $scope.GetInstallment = function () {
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetInstallmentMaster', collectionobj);
        getData.then(function (response) {
            $scope.InstallmentList = response.data;
            $.each($scope.InstallmentList, function (index, obj) {
                obj.chk = false;
            });
        });
    };

    $scope.GetStudentConcession = function (action, studentcode, transid) {
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.InstallmentList = JSON.stringify($filter('filter')($scope.InstallmentList, { chk: true }));
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetStudentConcessionDetails', collectionobj);
        getData.then(function (response) {
            $scope.ConcessionheadList = response.data.Table
            $scope.ConcessionheadList1 = response.data.Table1
            $scope.GetClassWiseFeeStructure(action, $scope.StudentCode, transid);
        });
    }

    $scope.GetClassWiseFeeStructure = function (action, studentcode, transid) {
        if (action == null) {
            action = 6;
        }
        var collectionobj = {};
        collectionobj.TransID = transid;
        collectionobj.Action = action;
        collectionobj.InstallmentList = JSON.stringify($filter('filter')($scope.InstallmentList, { chk: true })); 
        collectionobj.ConcessionList = JSON.stringify($filter('filter')($scope.ConcessionheadList, { chk: true }));
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;;
        collectionobj.StreamCode = $scope.StreamCode;;
        collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroup;
        collectionobj.StudentCode = studentcode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetClassWiseFeeStructure', collectionobj);
        getData.then(function (response) {

            $scope.ClassWiseFeesStructure = response.data;
            $.each($scope.ClassWiseFeesStructure, function (index, obj) {
                if (obj.HeadType == 'Admission') {
                    obj.chk = true;
                }
            })

        });
    };

    var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
    var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    $scope.ToWords = function (s) {
        //debugger
        s = s.toString();
        s = s.replace(/[\, ]/g, '');
        if (s != parseFloat(s))
            return 'not a number';
        var x = s.indexOf('.');
        if (x == -1)
            x = s.length;
        if (x > 15)
            return 'too big';
        var n = s.split('');
        var str = '';
        var sk = 0;
        for (var i = 0; i < x; i++) {
            if ((x - i) % 3 == 2) {
                if (n[i] == '1') {
                    str += tn[Number(n[i + 1])] + ' ';
                    i++;
                    sk = 1;
                }
                else if (n[i] != 0) {
                    str += tw[n[i] - 2] + ' ';
                    sk = 1;
                }
            }
            else if (n[i] != 0) {
                str += dg[n[i]] + ' ';
                if ((x - i) % 3 == 0)
                    str += 'Hundred ';
                sk = 1;
            } if ((x - i) % 3 == 1) {
                if (sk)
                    str += th[(x - i - 1) / 3] + ' ';
                sk = 0;
            }
        }
        if (x != s.length) {
            var y = s.length;
            str += 'point ';
            //for (var i = x + 1; istr.replace(/\s+/g, ' '));
        }
        $scope.AmtInWords = str;
    }

    $scope.GetFeeStructureByGroup = function (action, studentcode, transid) {
        //debugger
        var collectionobj = {};
        collectionobj.TransID = transid;
        collectionobj.Action = action;
        collectionobj.InstallmentList = JSON.stringify($filter('filter')($scope.InstallmentList, { chk: true }));
        collectionobj.ConcessionList = JSON.stringify($filter('filter')($scope.ConcessionheadList, { chk: true }));
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;;
        collectionobj.StreamCode = $scope.StreamCode;;
        collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroup;
        collectionobj.StudentCode = studentcode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetClassWiseFeeStructure', collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.FeesStructureGroupList = response.data;
            $scope.getTotal($scope.FeesStructureGroupList);
            $scope.PrintHeadingValue = 'Admission Receipt';
        });
    };


    $scope.GetNewAdmissionStudents = function (classcode)
    {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.AcademicSessionId = $scope.SessionId;
        collectionobj.ClassCode = classcode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.StudentCode = $scope.StudentCode;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetNewAdmissionStudents', collectionobj);
        getData.then(function (response) {
            $scope.Students = response.data;
            $scope.disabledSearch = false;
            $scope.hideloader = false;

           
            if ($scope.FromAdm && $scope.Students.length > 0) {
                var student = $scope.Students[0]
                $scope.StudentPhoto = student.StudentPhoto;
                $scope.SearchText = student.StudentName;

                $scope.GetSections(student.ClassCode);
                $scope.disabledSearch = true;
                $scope.AdmStudentName = student.StudentName;
                $scope.RegNo = student.RegNo
                $scope.Address = student.Address
                $scope.ParentName = student.FatherName
                $scope.Contact = student.Mobile
                $scope.SessionName = student.SessionName
                $scope.StudentDOB = new Date(student.DOB)
                $scope.IsFromMerit = student.IsFromMerit
                $scope.ClassName = student.ClassName

                $scope.$parent.SectionCode = student.SectionCode
                $scope.StreamCode = student.StreamCode
            }
        });
 
    }

    $scope.ddlSession_Change = function () {
        $scope.GetNewAdmissionStudents();
    }

    if ($scope.FromAdm) {
        $scope.disabledDDLClass = true;
        $scope.GetSections($scope.$parent.ClassCode);
        $scope.GetNewAdmissionStudents($scope.$parent.ClassCode);
        $scope.disabledrow = true;
    }

    $scope.ddlClass_Change = function (classcode) {
        $scope.$parent.SectionCode = "";
        $scope.GetNewAdmissionStudents(classcode);
        $scope.GetSections($scope.$parent.ClassCode);
    };

    $scope.FillStudentDetail = function (student) {

        $scope.StudentPhoto = student.StudentPhoto;
        $scope.SearchText = student.StudentName;
        $scope.StudentCode = student.StudentCode;

        $scope.$parent.ClassCode = student.ClassCode;
        $scope.GetSections(student.ClassCode);

        $scope.AdmStudentName = student.StudentName;
        $scope.RegNo = student.RegNo
        $scope.Address = student.Address
        $scope.ParentName = student.FatherName
        $scope.Contact = student.Mobile
        $scope.SessionName = student.SessionName
        $scope.StudentDOB = new Date(student.DOB)
        $scope.IsFromMerit = student.IsFromMerit
        $scope.ClassName = student.ClassName
        //$scope.StudentId = ($filter('filter')($scope.Students, { StudentCode: $scope.StudentCode }))[0].StudentId
        //$scope.RollNo = ($filter('filter')($scope.Students, { StudentCode: $scope.StudentCode }))[0].RollNo

        $scope.$parent.SectionCode = student.SectionCode
        $scope.StreamCode = student.StreamCode

    }


    $scope.NetPayableAmt = function (obj) {
        obj.NetPayable = obj.Amount - obj.ConcessionAmt
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.disableAdd = true;
            $scope.cleargo = true;
            if ($scope.ClassWiseFeesStructure == undefined || ($filter('filter')($scope.ClassWiseFeesStructure, { chk: true }).length == 0)) {
                $scope.cleargo = false;
                showMsgBox('Select at least one fee head')
                $scope.disableAdd = false;
            }

            if ($scope.cleargo) {
                var collectionobj = {};
                collectionobj.TransID = $scope.hfId;
                collectionobj.ClngDate = $scope.hfClngDate;
                collectionobj.VDate = moment($scope.FeeDepositDate).format('DD-MMM-YYYY');
                collectionobj.AcademicSessionId = $scope.SessionId;
                collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroup;
                collectionobj.StudentCode = $scope.StudentCode;
                collectionobj.StudentId = $scope.StudentId;

                collectionobj.ClassCode = $scope.ClassCode;
                collectionobj.SectionCode = $scope.SectionCode;

                collectionobj.RegNo = $scope.RegNo;
                collectionobj.BillNo = $scope.BillNo;
                if (moment.isDate($scope.BillDate))
                    collectionobj.BillDate = moment($scope.BillDate).format('DD-MMM-YYYY');

                collectionobj.CashRect = $scope.FeeMode == 'Cash' ? $scope.TotalRectAmount : 0;
                collectionobj.ChqRect = $scope.FeeMode == 'Cheque' ? $scope.TotalRectAmount : 0;
                collectionobj.ChqDate = $scope.FeeMode == 'Cheque' ? moment($scope.ChequeDate).format('YYYY/MM/DD') : ($scope.FeeMode == 'DD' ? moment($scope.ChequeDDDate).format('YYYY/MM/DD') : ($scope.FeeMode == 'NEFT' ? moment($scope.NEFTDate).format('YYYY/MM/DD') : ""));
                collectionobj.ChqNo = $scope.FeeMode == 'Cheque' ? $scope.ChequeNo : ($scope.FeeMode == 'DD' ? $scope.DDNo : ($scope.FeeMode == 'NEFT' ? $scope.UTRNo : ""));
                collectionobj.BankACCode = (($scope.EntryMode == 'Bank' && $scope.FeeMode == 'Cash') || $scope.FeeMode != 'Cash') ? $scope.BankName : "";


                collectionobj.Remark = $scope.Remark;
                collectionobj.EntryMode = $scope.EntryMode;
                collectionobj.PayMode = $scope.FeeMode

                collectionobj.FeeStructures = JSON.stringify($filter('filter')($scope.ClassWiseFeesStructure, { chk: true }));

                collectionobj.ConcessionList = JSON.stringify($filter('filter')($scope.ConcessionheadList, { chk: true }));

                collectionobj.IsFromMerit = $scope.IsFromMerit

                collectionobj.FYId = fyId;
                collectionobj.IsActive = $scope.IsActive;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                if ($scope.Save == "Save") {
                    if ($scope.EntryMode == "School" && $scope.FeeMode == "Cash")
                        collectionobj.Action = "1";
                    else
                        collectionobj.Action = "9";
                }
                else if ($scope.Save == "Edit") {
                    if ($scope.EntryMode == "School" && $scope.FeeMode == "Cash")
                        collectionobj.Action = "2";
                    else
                        collectionobj.Action = "10";
                }
                var getData = myService.methode('POST', '../Api/FeeTransactionApi/InsertUpdateDeleteAdmFeeDeposit', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        if ($scope.FromAdm) {
                            window.location.href = "../AdmissionTransaction/AdmissionFormDetailsStudentDetails";
                        }
                        $scope.ClearControl(1);
                    }

                });
            }
        }
    };

    $scope.FeeDepositList = [];
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
        if ($scope.FromAdm)
        collectionobj.StudentCode = $scope.StudentCode;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetAdmFeeDeposit', collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Session", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "RcptNo", "HeaderValue": "RcptNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "blue-text" },
                    { "HeaderText": "Fee Deposit Date", "HeaderValue": "FDDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "IdDateType": "Yes" },
                    { "HeaderText": "StudentId", "HeaderValue": "StudentId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student Name", "HeaderValue": "Student", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Installment", "HeaderValue": "Installment", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Entry Mode", "HeaderValue": "EntryMode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Pay Mode", "HeaderValue": "PayMode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Canceled", "HeaderValue": "IsCanceled", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "Status", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Clear Date", "HeaderValue": "ClngDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            

            $scope.FeeDepositList = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                $scope.amount = -1;
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
               

                $scope.FeeDepositList = $filter('filter')($scope.FeeDepositList, { 'TransId': $scope.hfId  });

                $scope.hfClngDate = $scope.FeeDepositList[0].ClngDate;
                $scope.StudentPhoto = $scope.FeeDepositList[0].StudentPhoto;
                $scope.SearchText = $scope.FeeDepositList[0].Student
                $scope.StudentCode = $scope.FeeDepositList[0].StudentCode

                $scope.$parent.ClassCode = $scope.FeeDepositList[0].ClassCode
                $scope.GetSections($scope.FeeDepositList[0].ClassCode);

                $scope.AdmStudentName = $scope.FeeDepositList[0].Student
                $scope.RegNo = $scope.FeeDepositList[0].RegNo
                $scope.Address = $scope.FeeDepositList[0].Address
                $scope.ParentName = $scope.FeeDepositList[0].FatherName
                $scope.Contact = $scope.FeeDepositList[0].Mobile
                
                $scope.SessionName = $scope.FeeDepositList[0].SessionName
                $scope.StudentDOB = new Date($scope.FeeDepositList[0].DOB)
                $scope.IsFromMerit = $scope.FeeDepositList[0].IsFromMerit
                $scope.ClassName = $scope.FeeDepositList[0].ClassName
                
                $scope.$parent.SectionCode = $scope.FeeDepositList[0].SectionCode
                $scope.StreamCode = $scope.FeeDepositList[0].StreamCode

              
                $scope.StudentId = $scope.FeeDepositList[0].StudentId
                $scope.FeeDepositDate = new Date($scope.FeeDepositList[0].FDDate)
            
                $scope.disabledDDLClass = true;
                $scope.disableSection = true;

                $scope.EntryMode = $scope.FeeDepositList[0].EntryMode;

                $scope.BillNo = $scope.FeeDepositList[0].BillNo;
                $scope.BillDate = $scope.FeeDepositList[0].BillDate != null ? new Date($scope.FeeDepositList[0].BillDate) : "";

                $scope.FeeMode = $scope.FeeDepositList[0].PayMode;
                $scope.ChequeNo = $scope.FeeMode == "Cheque" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
                $scope.ChequeDate = $scope.FeeMode == "Cheque" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
                $scope.DDNo = $scope.FeeMode == "DD" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
                $scope.ChequeDDDate = $scope.FeeMode == "DD" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
                $scope.UTRNo = $scope.FeeMode == "NEFT" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
                $scope.NEFTDate = $scope.FeeMode == "NEFT" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
                $scope.BankName = $scope.FeeDepositList[0].BankName;

                $scope.Remark = $scope.FeeDepositList[0].Remark;
                $scope.SessionId = $scope.FeeDepositList[0].AcademicSessionId.toString();
                $scope.FeeStructureGroup = $scope.FeeDepositList[0].FeeStructureGroupCode;
                $scope.FeeType = $scope.FeeDepositList[0].FeeType;
                $scope.AdmissionNo = $scope.FeeDepositList[0].AdmissionNo;
                $scope.FeeAmount = $scope.FeeDepositList[0].FeeAmount;
                //$scope.ToWords($scope.FeeAmount);                
                $scope.AmountInWords = $scope.FeeDepositList[0].AmountInWords;
                $scope.RcptNo = $scope.FeeDepositList[0].RcptNo;
                $scope.StudentName = $scope.FeeDepositList[0].Student

                var collectionobj = {};
                collectionobj.Action = "7";
                collectionobj.TransId = $scope.hfId ;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetAdmFeeDeposit', collectionobj);
                getData.then(function (response) {
                    //$scope.chkAllConcessiondisabled = true;
                    //angular.forEach($scope.ConcessionheadList, function (SI) {
                    //    SI.chk = false;
                    //    angular.forEach(response.data.Table, function (obj) {
                    //        if (SI.Code == obj.ConcessionheadCode) {
                    //            SI.chk = true;
                    //        }
                    //    });
                    //    SI.disabled = true;
                    //});
                    

                    $scope.chkAllInstallmentdisabled = true;
                    angular.forEach($scope.InstallmentList, function (SI) {
                        SI.chk = false;
                        angular.forEach(response.data.Table1, function (obj) {
                            if (SI.Code == obj.InstallmentCode) {
                                SI.chk = true;
                            }
                        });
                        SI.disabled = true;
                    });
                    

                    $scope.GetStudentConcession('8', $scope.FeeDepositList[0].StudentCode, $scope.FeeDepositList[0].TransId);
                    $scope.GetFeeStructureByGroup('11', $scope.FeeDepositList[0].StudentCode, $scope.FeeDepositList[0].TransId);
                });

                $scope.Save = 'Edit';
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#ddlSession', true);
                $scope.hideLoader();
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
        collectionobj.TransID = $scope.hfId;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.StudentId = $scope.StudentId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/InsertUpdateDeleteAdmFeeDeposit', collectionobj);
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
        $scope.IsActive = "true";
      
        $scope.hfId = "";

        $scope.FeeDepositList = [];
        $scope.StudentCode = "";

        $scope.ClassWiseFeesStructure = [];

        $scope.AdmStudentName = "";
        $scope.RegNo = "";
        $scope.ParentName = "";
        $scope.Contact = "";
        $scope.StudentDOB = "";
        $scope.IsFromMerit = "";

        $scope.$parent.SectionCode = "";
        $scope.StreamCode = "";


        $scope.$parent.ClassCode = "";

        $scope.EntryMode = "School";

        $scope.BillNo = "";
        $scope.BillDate = "";

        $scope.FeeMode = "Cash";
        $scope.ChequeNo = "";
        $scope.ChequeDate = "";
        $scope.DDNo = "";
        $scope.ChequeDDDate = "";
        $scope.UTRNo = "";
        $scope.NEFTDate = "";
        $scope.BankName = "";

        $scope.Remark = "";
        $scope.FeeStructureGroup = "";
        $scope.StudentId = "";

        $scope.SessionName = "";
        $scope.ClassName = "";
        $scope.Address = "";

        $scope.SearchText = "";

        $scope.Sections = [];

        $scope.chkAllInstallmentdisabled = false;
        $scope.chkAllConcessiondisabled = false;
        $scope.disabledDDLClass = false;
        $scope.disableSection = false;

        $scope.GetNewAdmissionStudents();
        $scope.GetConcessionheads();
        $scope.GetInstallment();
        $scope.FeeDepositDate = $scope.TodayDate;

        $scope.$applyAsync();
        $scope.SetFocus('#ddlCourse');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.BackToUrl = function () {
        window.location.href = "../AdmissionTransaction/AdmissionFormDetailsStudentDetails";
    }
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
        $scope.Export('print');
    };

    $scope.started1 = function (transid) {
        if (locked != 'No') {
            $scope.visibleAdd = false;
            $scope.visibleSearch = false;
            $scope.visibleDelete = false;
            $scope.visiblePrint = false;
            $scope.visibleClear = false;
        }
        else {
            setTimeout(function () {
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.hfId = transid;
            }, 500);

        }

        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetAdmFeeDeposit', collectionobj);
        getData.then(function (response) {

            $scope.FeeDepositList = response.data.Table;
            $scope.FeeDepositList = $filter('filter')($scope.FeeDepositList, { 'TransId': transid });

            $scope.showLoader();
            $scope.amount = -1;


            $scope.StudentPhoto = $scope.FeeDepositList[0].StudentPhoto;
            $scope.SearchText = $scope.FeeDepositList[0].Student
            $scope.StudentCode = $scope.FeeDepositList[0].StudentCode

            $scope.$parent.ClassCode = $scope.FeeDepositList[0].ClassCode
            $scope.GetSections($scope.FeeDepositList[0].ClassCode);

            $scope.AdmStudentName = $scope.FeeDepositList[0].Student
            $scope.RegNo = $scope.FeeDepositList[0].RegNo
            $scope.Address = $scope.FeeDepositList[0].Address
            $scope.ParentName = $scope.FeeDepositList[0].FatherName
            $scope.Contact = $scope.FeeDepositList[0].Mobile

            $scope.SessionName = $scope.FeeDepositList[0].SessionName
            $scope.StudentDOB = new Date($scope.FeeDepositList[0].DOB)
            $scope.IsFromMerit = $scope.FeeDepositList[0].IsFromMerit
            $scope.ClassName = $scope.FeeDepositList[0].ClassName

            $scope.$parent.SectionCode = $scope.FeeDepositList[0].SectionCode
            $scope.StreamCode = $scope.FeeDepositList[0].StreamCode


            $scope.StudentId = $scope.FeeDepositList[0].StudentId
            $scope.FeeDepositDate = new Date($scope.FeeDepositList[0].FDDate)

            $scope.disabledDDLClass = true;
            $scope.disableSection = true;

            $scope.EntryMode = $scope.FeeDepositList[0].EntryMode;

            $scope.BillNo = $scope.FeeDepositList[0].BillNo;
            $scope.BillDate = $scope.FeeDepositList[0].BillDate != null ? new Date($scope.FeeDepositList[0].BillDate) : "";

            $scope.FeeMode = $scope.FeeDepositList[0].PayMode;
            $scope.ChequeNo = $scope.FeeMode == "Cheque" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
            $scope.ChequeDate = $scope.FeeMode == "Cheque" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
            $scope.DDNo = $scope.FeeMode == "DD" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
            $scope.ChequeDDDate = $scope.FeeMode == "DD" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
            $scope.UTRNo = $scope.FeeMode == "NEFT" ? $scope.FeeDepositList[0].ChequeDDNEFTNo : "";
            $scope.NEFTDate = $scope.FeeMode == "NEFT" ? new Date($scope.FeeDepositList[0].ChequeDDNEFTDate) : "";
            $scope.BankName = $scope.FeeDepositList[0].BankName;

            $scope.Remark = $scope.FeeDepositList[0].Remark;
            $scope.SessionId = $scope.FeeDepositList[0].AcademicSessionId.toString();
            $scope.FeeStructureGroup = $scope.FeeDepositList[0].FeeStructureGroupCode;

            var collectionobj = {};
            collectionobj.Action = "7";
            collectionobj.TransId = transId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            var getData = myService.methode('POST', '../Api/FeeTransactionApi/GetAdmFeeDeposit', collectionobj);
            getData.then(function (response) {

                $scope.chkAllInstallmentdisabled = true;
                angular.forEach($scope.InstallmentList, function (SI) {
                    SI.chk = false;
                    angular.forEach(response.data.Table1, function (obj) {
                        if (SI.Code == obj.InstallmentCode) {
                            SI.chk = true;
                        }
                    });
                    SI.disabled = true;
                });


                $scope.GetStudentConcession('8', $scope.FeeDepositList[0].StudentCode, $scope.FeeDepositList[0].TransId);
            });


            $scope.SetFocus('#ddlSession', true);
            $scope.hideLoader();
        });
    };
    var transId = getParameterByName('TransId');
    var locked = getParameterByName('Locked');
    if (transId != null) {
        setTimeout(function () { $scope.started1(transId); }, 1000);
    }

    $scope.getTotal = function (ListValue) {
        var total = 0;
        for (var i = 0; i < ListValue.length; i++) {
            var product = ListValue[i].NetPayable;
            total += product;
        }
        return $scope.ToWords(total);
    }
}