app.TransferCertificateController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSession');
    var chkvalue;
    var jtp = null;
    $scope.chkdisable = false;
    $scope.IssueDate = new Date();
    var StudentCode = null;


    $scope.GetChkvalue = function (chkvalue) {
        
        $scope.GetPreviousOrLastStudyClass(chkvalue);
    }

    $scope.LastStudyClassList = [];
    $scope.GetPreviousOrLastStudyClass = function (chkvalue)
    {
        debugger
        var collectionobj = {};        
        collectionobj.Code = jtp;
        collectionobj.AcademicSessionId = $scope.AcademicSessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;

        if (chkvalue == true)
        {
            collectionobj.Action = "7";
        }
        else
        {
            collectionobj.Action = "8";
        }
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentDetailsForTransfer', collectionobj);
        getData.then(function (response)
        {
            debugger
            $scope.LastStudyClassList = response.data;
            if ($scope.LastStudyClassList.length > 0)
            {
                $scope.CurrentClass = $scope.LastStudyClassList[0].ClassName;
                jtp = $scope.LastStudyClassList[0].Code;
            }            
        });
    }

    $scope.GetSchoolDetail = function () {
        $scope.SchoolNo = schoolNo;
        $scope.BookNo = srNo;
        $scope.AffiliationNo = affiliationNo;
        $scope.Renewed = affiliationDate;
        $scope.SchoolStatus = schoolStatus;
    }
    $scope.GetSchoolDetail();

    $scope.GetAllAcademicSession = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = '10';
        //collectionobj.RelationshipId = relationshipId;
        //collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentDetailsForTransfer', collectionobj);
        getData.then(function (response) {
            $scope.SessionList = response.data;
        });
    };
    $scope.GetAllClass = function () {
        var collectionobj = {};
        collectionobj.Action = '5';
        //collectionobj.AcademicSessionId = $scope.AcademicSessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GblMasterApi/GetClasses', collectionobj);
        //var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentDetailsForTransfer', collectionobj);
        getData.then(function (response) {
            $scope.ClassList = response.data;
        });
    };

    $scope.GetStudents = function () {
        var collectionobj = {};
        $scope.Show = true;        
        collectionobj.AcademicSessionId = $scope.AcademicSessionId;
        //collectionobj.ClassCode = $scope.class;

        collectionobj.Action = '6';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentDetailsForTransfer', collectionobj);
        getData.then(function (response) {
            $scope.StudentList = response.data;
        });
    };

    //$scope.GetEdit = function (ID) {
    //    $scope.StudentList = $filter('filter')($scope.StudentList, { 'AdmissionNo': ID }, true);

    //    $scope.RegNo = $scope.StudentList[0].RegNo;
    //    $scope.AdmissionNo = $scope.StudentList[0].AdmissionNo;
    //    $scope.DateOfAdmission = $scope.ConverDate($scope.StudentList[0].DateOfAdmission);

    //    //$scope.SearchBox = $scope.FirstName + ' ' + $scope.MiddleName + ' ' + $scope.LastName
    //    StudentCode = $scope.StudentList[0].StudentCode;
    //    $scope.StudentName = $scope.StudentList[0].StudentName;
    //    $scope.MotherName = $scope.StudentList[0].MotherName;
    //    $scope.FatherName = $scope.StudentList[0].FatherName;

    //    $scope.DOB = $scope.ConverDate($scope.StudentList[0].DOB);
    //    $scope.MobileNo = $scope.StudentList[0].Mobile;
    //    $scope.Nationality = $scope.StudentList[0].Nationality;
    //    $scope.CasteName = $scope.StudentList[0].Category;

    //    $scope.PreClass = $scope.StudentList[0].PreviousClass;
    //    $scope.PreSchool = $scope.StudentList[0].SchoolName + '(' + $scope.StudentList[0].PreviousBoard + ')';

    //    //$scope.GetPreviousOrLastStudyClass();
    //    jtp= $scope.StudentList[0].ClassCode;
    //    $scope.CurrentClass = $scope.StudentList[0].ClassName;

    //    $scope.SubjectDetail = $scope.StudentList[0].SubjectName;

    //    if ($scope.StudentList[0].Fees_YesNo == 'Yes') {
    //        $scope.FeesConcession = $scope.StudentList[0].Fees_YesNo + ' (' + $scope.StudentList[0].FeeConcession + ' )';
    //    }
    //    else {
    //        $scope.FeesConcession = $scope.StudentList[0].Fees_YesNo;
    //    }
    //    $scope.IsDues = $scope.StudentList[0].Dues.toString();
    //    $scope.DueAmt = $scope.StudentList[0].Bal_Amount;

    //    $scope.Show = false;
    //    $scope.SearchBox = '';
    //}

    $scope.GetEdit = function (student) {
        var collectionobj = {};
        $scope.Show = true;
        collectionobj.Code = student.StudentCode;
        collectionobj.AcademicSessionId = $scope.AcademicSessionId;
        collectionobj.ClassCode = $scope.class;

        collectionobj.Action = '9';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentDetailsForTransfer', collectionobj);
        getData.then(function (response) {
            $scope.StudentData = response.data;


            $scope.StudentData = $filter('filter')(response.data, { 'StudentCode': student.StudentCode }, true);

            $scope.RegNo = $scope.StudentData[0].RegNo;
            $scope.AdmissionNo = $scope.StudentData[0].AdmissionNo;
            $scope.DateOfAdmission = $scope.ConverDate($scope.StudentData[0].DateOfAdmission);

            //$scope.SearchBox = $scope.FirstName + ' ' + $scope.MiddleName + ' ' + $scope.LastName
            StudentCode = $scope.StudentData[0].StudentCode;
            $scope.StudentName = $scope.StudentData[0].StudentName;
            $scope.MotherName = $scope.StudentData[0].MotherName;
            $scope.FatherName = $scope.StudentData[0].FatherName;

            $scope.DOB = $scope.ConverDate($scope.StudentData[0].DOB);
            $scope.MobileNo = $scope.StudentData[0].Mobile;
            $scope.Nationality = $scope.StudentData[0].Nationality;
            $scope.CasteName = $scope.StudentData[0].Category;

            $scope.PreClass = $scope.StudentData[0].PreviousClass;
            $scope.PreSchool = $scope.StudentData[0].SchoolName + '(' + $scope.StudentData[0].PreviousBoard + ')';

            //$scope.GetPreviousOrLastStudyClass();
            jtp = $scope.StudentData[0].ClassCode;
            $scope.CurrentClass = $scope.StudentData[0].ClassName;

            $scope.SubjectDetail = $scope.StudentData[0].SubjectName;

            if ($scope.StudentData[0].Fees_YesNo == 'Yes') {
                $scope.FeesConcession = $scope.StudentData[0].Fees_YesNo + ' (' + $scope.StudentData[0].FeeConcession + ' )';
            }
            else {
                $scope.FeesConcession = $scope.StudentData[0].Fees_YesNo;
            }
            $scope.IsDues = $scope.StudentData[0].Dues.toString();
            $scope.DueAmt = $scope.StudentData[0].Bal_Amount;

            $scope.Show = false;
            $scope.SearchBox = '';
        });
    }


    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            //collectionobj.RegNo = $scope.StudentList[0].RegNo;
            //collectionobj.StudentCode = $scope.StudentList[0].StudentCode;
            //collectionobj.AdmissionNo = $scope.StudentList[0].AdmissionNo;

            collectionobj.RegNo = $scope.RegNo;
            collectionobj.AdmissionNo = $scope.AdmissionNo;

            collectionobj.AnyDues = $scope.IsDues;
            collectionobj.AnyOtherActivity = $scope.IsActivity;
            collectionobj.LastPresentDate = moment($scope.DateOfPresent).format('DD-MMM-YYYY');
            collectionobj.NoOfDays = $scope.OpenDays;
            collectionobj.NoOfDaysPresent = $scope.PresentDays;
            collectionobj.CertificateIssusDate = moment($scope.IssueDate).format('DD-MMM-YYYY');
            collectionobj.ReasonOfLeaving = $scope.LeavingReason;
            collectionobj.GeneralConduct = $scope.GeneralConduct;
            collectionobj.Remark = $scope.Remark;
            collectionobj.StudentResult = $scope.StudentResult;
            collectionobj.AdmissionClassCode = $scope.AdmissionClassCode;
            collectionobj.PreviousClass_YN = $scope.chk;
            collectionobj.LastStudyClass = $scope.CurrentClass;
            collectionobj.SubjectName = $scope.SubjectDetail;

            collectionobj.AcademicSessionID = $scope.AcademicSessionId;
            collectionobj.PreviousSchoolDetail = $scope.PreSchool;


            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;

            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.StudentCode = StudentCode;
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.TransID = $scope.hfId;
            }

            if ($scope.IsDues == "1") {
                showMsgBox("999", "Stop", "Please Clear All Dues, Then Transfer Certificate Will be Issued.", "warning", 'btn-warning');
                $scope.SetFocus('#ddlDues');
            }
            else {
                var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteTransferCertificateDetails', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
        }
    };

    $scope.ClearControl = function (flag) {
        if (flag == 1)
            $scope.ResetControl(flag);
        else
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
    };

    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";

        //School Details
        //$scope.SchoolNo = '';                               $scope.BookNo = '';
        //$scope.AffiliationNo = '';          $scope.Renewed = '';                $scope.SchoolStatus = '';

        //Student Details
        $scope.AcademicSessionId = ''; $scope.SrNo = '';
        $scope.RegNo = ''; $scope.AdmissionNo = ''; $scope.DateOfAdmission = new Date();
        $scope.StudentName = ''; $scope.MotherName = ''; $scope.FatherName = '';
        $scope.DOB = new Date(); $scope.MobileNo = ''; $scope.Nationality = '';
        $scope.Category = ''; $scope.ClassName = '';

        //Previous Details
        $scope.PreClass = ''; $scope.PreSchool = ''; $scope.CurrentClass = '';
        $scope.SubjectDetail = ''; $scope.FeesConcession = ''; $scope.IsDues = ''; $scope.DueAmt = '';

        //Office Use Details
        $scope.IsActivity = ''; $scope.DateOfPresent = new Date();
        $scope.OpenDays = ''; $scope.PresentDays = ''; $scope.IssueDate = new Date();
        $scope.LeavingReason = ''; $scope.GeneralConduct = ''; $scope.Remark = '';
        $scope.StudentResult = ''; $scope.AdmissionClassCode = '';
        $scope.SearchBox = undefined;



        $scope.IsSearchBoxDisabled = false;
        $scope.AcademicDisable = false;

        $scope.$applyAsync();
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
        collectionobj.Action = "3";
        collectionobj.TransID = $scope.hfId;
        collectionobj.StudentCode = $scope.hfIdcode;

        collectionobj.AcademicSessionID = $scope.AcademicSessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;

        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteTransferCertificateDetails', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    $scope.TCList = [];
    $scope.StudentTC = {};
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.TCList = [];
    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = "4";

        collectionobj.AcademicSessionID = $scope.AcademicSessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentDetailsForTransfer', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Voucher No.", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Admission No.", "HeaderValue": "AdmissionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Admission Date", "HeaderValue": "DateOfAdmission", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "LastStudyClass", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "TC Issued Date", "HeaderValue": "CertificateIssusDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.TCList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();

                $scope.AcademicDisable = true;
                $scope.IsSearchBoxDisabled = true;

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.TCList = $filter('filter')($scope.TCList, { 'TransId': $scope.hfId }, true);
               

                $scope.StudentTC = $scope.TCList[0];
                $scope.StudentResult = $scope.TCList[0].StudentResult;

                $scope.StudentTC["schoolNo"] = $scope.SchoolNo;
                $scope.StudentTC["BookNo"] = $scope.BookNo;
                $scope.StudentTC["SrNo"] = displayCode + "/2022" + "/" + $scope.TCList[0].PVNo;
                $scope.SrNo = displayCode + "/2022" + "/" + $scope.TCList[0].PVNo;
                $scope.StudentTC["AffiliationNo"] = $scope.AffiliationNo;
                $scope.StudentTC["Renewed"] = $scope.Renewed;
                $scope.StudentTC["SchoolStatus"] = $scope.SchoolStatus;
                $scope.StudentTC["PromotedtoHigherClass"] = $scope.StudentResult == 1 ? 'Yes' : $scope.StudentResult == 2 ? 'No' : '';


                $scope.$applyAsync();
                //Student Detail
                if ($scope.TCList[0].AcademicSessionID != null && $scope.TCList[0].AcademicSessionID != undefined)
                    $scope.AcademicSessionId = $scope.TCList[0].AcademicSessionID.toString();
                $scope.hfIdcode = $scope.TCList[0].StudentCode;
                $scope.RegNo = $scope.TCList[0].RegNo;
                $scope.AdmissionNo = $scope.TCList[0].AdmissionNo;
                $scope.DateOfAdmission = $scope.ConverDate($scope.TCList[0].DateOfAdmission);

                $scope.StudentName = $scope.TCList[0].StudentName;
                $scope.MotherName = $scope.TCList[0].MotherName;
                $scope.FatherName = $scope.TCList[0].FatherName;

                $scope.DOB = $scope.ConverDate($scope.TCList[0].DOB);
                $scope.MobileNo = $scope.TCList[0].Mobile;
                $scope.Nationality = $scope.TCList[0].Nationality;

                $scope.CasteName = $scope.TCList[0].Category;
                //$scope.ClassName = $scope.TCList[0].ClassName;   

                // Student Other detail
                $scope.SubjectDetail = $scope.TCList[0].SubjectDetail;
                

                $scope.PreClass = $scope.TCList[0].PreviousClass;

                //if ($scope.TCList[0].SchoolName != "") {
                //    $scope.PreSchool = $scope.TCList[0].SchoolName + '(' + $scope.TCList[0].PreviousBoard + ')';
                //}
                //else {
                //    $scope.PreSchool = $scope.TCList[0].PreviousBoard;
                //}                

                $scope.PreSchool = $scope.TCList[0].PreviousSchoolDetail;
                $scope.StudentTC["PreSchool"] = $scope.TCList[0].PreviousSchoolDetail;

                $scope.chk = $scope.TCList[0].PreviousClass_YN;
               
                if ($scope.TCList[0].PreviousClass_YN == false) {
                    $scope.chkdisable = true;
                    $scope.CurrentClass = $scope.TCList[0].ClassName;
                    $scope.StudentTC["CurrentClass"] = $scope.TCList[0].ClassName;
                }
                else {
                    $scope.chkdisable = true;
                    $scope.CurrentClass = $scope.TCList[0].LastStudyClass;
                    $scope.StudentTC["CurrentClass"] = $scope.TCList[0].LastStudyClass;
                }

                jtp = $scope.TCList[0].ClassCode;

                //if (chkvalue == true) {
                //    $scope.CurrentClass = $scope.LastStudyClassLst[0].ClassName;
                //    $scope.classcode = $scope.LastStudyClassLst[0].Code;
                //}
                //else {
                //    $scope.CurrentClass = $scope.LastStudyClassLst[0].ClassName;
                //    $scope.classcode = $scope.LastStudyClassLst[0].Code;
                //}

                if ($scope.TCList[0].Fees_YesNo == 'Yes') {
                    $scope.FeesConcession = $scope.TCList[0].Fees_YesNo + ' (' + $scope.TCList[0].FeeConcession + ' )';
                    $scope.StudentTC["FeesConcessionPrint"] = $scope.FeesConcession;
                }
                else {
                    $scope.FeesConcession = $scope.TCList[0].Fees_YesNo;
                    $scope.StudentTC["FeesConcessionPrint"] = $scope.FeesConcession;
                }

                $scope.IsDues = $scope.TCList[0].Dues.toString();
                $scope.DueAmt = $scope.TCList[0].Bal_Amount;

                if ($scope.TCList[0].Dues == 0) {
                    $scope.StudentTC["DuesPrint"] = 'Yes';
                }
                else {
                    $scope.StudentTC["DuesPrint"] = 'No';
                }


                //Office Use
                $scope.IssueDate = $scope.ConverDate($scope.TCList[0].CertificateIssusDate);
                $scope.IsActivity = $scope.TCList[0].AnyOtherActivity.toString();
                if ($scope.TCList[0].AnyOtherActivity == 0) {
                    $scope.StudentTC["ActivityPrint"] = 'No';
                }
                else if ($scope.TCList[0].AnyOtherActivity == 1) {
                    $scope.StudentTC["ActivityPrint"] = 'NCC Cadet';
                }
                else if ($scope.TCList[0].AnyOtherActivity == 2) {
                    $scope.StudentTC["ActivityPrint"] = 'Scouts & Guides';
                }

                $scope.GeneralConduct = $scope.TCList[0].GeneralConduct;

                $scope.DateOfPresent = $scope.ConverDate($scope.TCList[0].LastPresentDate);
                $scope.OpenDays = $scope.TCList[0].NoOfDays;
                $scope.PresentDays = $scope.TCList[0].NoOfDaysPresent;

                $scope.StudentResult = $scope.TCList[0].StudentResult.toString();
                $scope.AdmissionClassCode = $scope.TCList[0].AdmissionClassCode;

                $scope.LeavingReason = $scope.TCList[0].ReasonOfLeaving;
                $scope.Remark = $scope.TCList[0].Remark;

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
            });
        });
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
        $scope.TCList = [];
        $scope.started();
        return false;
    });

    $scope.PrintRecord = function () {
        $scope.Export('print');
    };
}