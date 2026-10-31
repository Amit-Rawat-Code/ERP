app.CollegeStudentAdmissionFormDetailsController = function ($scope, $element, $filter, myService) {
    $scope.AdmissionType = 2;
    $scope.MaxPreferenceList = [
        { PName: 'First Preferance', PPreferedBranch: "" },
        { PName: 'Second Preferance', PPreferedBranch: "" },
        { PName: 'Third Preferance', PPreferedBranch: "" },
        { PName: 'Fourth Preferance', PPreferedBranch: "" },
        { PName: 'Fifth Preferance', PPreferedBranch: "" },
        { PName: 'Sixth Preference', PPreferedBranch: "" },

    ]
    $scope.files = [];
    $scope.ddlCollegeCourse_Change = function (CollegeCourseCode) {
        $scope.GetSemester(CollegeCourseCode);
        $scope.GetCollegeBranch(CollegeCourseCode);
    };

    $scope.GetAdmissionFormNo = function () { }
    $scope.PreferenceAlert = function (PPreferedBranch, i) {
        if ((($filter('filter')($scope.MaxPreferenceList, { 'PPreferedBranch': PPreferedBranch })).length) > 1) {
            $scope.MaxPreferenceList[i].PPreferedBranch = "";
            alert(($filter('filter')($scope.CollegeBranchList, { 'Code': PPreferedBranch }, true))[0].CollegeBranchName + " is already selected as preferance");
        }

    }

    $scope.PerGetCountry = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/GetMasterApi/GetCountry', collectionobj);
        getData.then(function (response) {
            $scope.PerCountrylist = response.data;
        });
    };

    $scope.PerGetState = function (countrycode) {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.CountryCode = countrycode;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetState', collectionobj);
        getData.then(function (response) {
            $scope.PerStatelist = response.data
        });
    };

    $scope.PerGetCity = function (statecode) {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.StateCode = statecode;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetCity', collectionobj);
        getData.then(function (response) {
            $scope.PerCitylist = response.data;

        });
    };

    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
    });

    $scope.CopyAddress = function () {
        if ($scope.IsAddressSame == 1) {
            $scope.Per_Address1 = $scope.Curr_Address1;
            $scope.Per_Address2 = $scope.Curr_Address2;
            $scope.Per_Address3 = $scope.Curr_Address3;
            $scope.Per_CountryCode = $scope.Curr_CountryCode;
            $scope.PerGetState($scope.Per_CountryCode);
            $scope.Per_StateCode = $scope.Curr_StateCode;
            $scope.PerGetCity($scope.Per_StateCode);
            $scope.Per_CityCode = $scope.Curr_CityCode;
            $scope.Per_PinCode = $scope.Curr_PinCode;
        }
        else {
            $scope.Per_Address1 = "";
            $scope.Per_Address2 = "";
            $scope.Per_Address3 = "";
            $scope.Per_CountryCode = "";
            $scope.Per_StateCode = "";
            $scope.Per_CityCode = "";
            $scope.Per_PinCode = "";
        }

    };

    $scope.QualificationList = [];
    $scope.GetExaminations = function () {
        $scope.ExaminationList = [{ ExamName: 'High School' }, { ExamName: 'Intermediate' }, { ExamName: 'Diploma' }, { ExamName: 'Graduation' }]
    };

    $scope.AddQualificationList = function () {
        $scope.QualificationList.push({
            Examination: "",
            NameofCollege: "",
            BoardUniversity: "",
            PassingYear: "",
            DivisionPercentage: "",
            RollNo: "",
            Remark: "",
        });
        var $index = $scope.QualificationList.length - 1;
        setTimeout(function () {
            $('#ddlExamination' + $index).focus();
        }, 500);
    };

    $scope.RemoveQualificationList = function (index) {
        $scope.QualificationList.splice(index, 1)
    };    
    //$scope.QualifyingExamList = [];
    //$scope.AddQualifyingExamList = function () {
    //    $scope.QualifyingExamList.push({
    //        QualifyingExam: "",
    //        Status: "",
    //        Rollno: "",
    //        MarksObtained: "",
    //        MaxMarks: "",
    //    });
    //    var $index = $scope.QualifyingExamList.length - 1;
    //    setTimeout(function () {
    //        $('#ddlQualifyingExam' + $index).focus();
    //    }, 500);
    //};

    //$scope.GetQualifyingExam = function () {
    //    debugger
    //    $scope.QualifyingExamList[0].QualifyingExam = $scope.QualifyingExam;
    //}

    $scope.RemoveQualifyingExamList = function (index) {
        $scope.QualifyingExamList.splice(index, 1)
    };

    $scope.SiblingList = [];
    $scope.AddSiblingList = function () {
        $scope.SiblingList.push({
            Sno: "", StudentCode: "" ,Name: "", Relation: "", TypeOfWork: "", WorkPlace: ""
        });
        var $index = $scope.SiblingList.length - 1;
        setTimeout(function () {
            //$('#ddlBtechMarksList' + $index).focus();
        }, 500);
    };

    $scope.RemoveSiblingList = function (index) {
        $scope.SiblingList.splice(index, 1)
    };

    $scope.CompetitiveExamList = [];
    $scope.AddCompetitiveExamList = function () {
        $scope.CompetitiveExamList.push({
            Sno: "", StudentCode: "", Name: "", EntranceTest: "", Rollno: "", MaxMarks: "",
            ObtainedMarks: "", IsAppeared: "False", IsPhotoCopyAttached: "False"
        });
        var $index = $scope.CompetitiveExamList.length - 1;
        setTimeout(function () {
            //$('#ddlBtechMarksList' + $index).focus();
        }, 500);
    };

    $scope.RemoveCompetitiveExamList = function (index) {
        $scope.CompetitiveExamList.splice(index, 1)
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
        $scope.AdmissionType = 2;
        $scope.EnquirySearch = "";
        $scope.RegNo = "";
        $scope.AdmissionFormNo = "";
        $scope.DateOfAdmission = "";
        $scope.AcademicSessionId = "";
        $scope.$parent.CollegeCourseCode = "";
        $scope.Semester = "";
        $scope.AdmissionMode = "";
        $scope.LaternalEntry = "";
        $scope.AdmissionThrough = "";
        $scope.EnquirySourceCode = "";
        $scope.ReferenceOf = "";
        $scope.Initials = "";
        $scope.Gender = "";
        $scope.IsPhyDisable = "";
        $scope.DisabilityDetails = "";
        $scope.BloodGroup = "";
        $scope.StudentFirstName = "";
        $scope.StudentMiddleName = "";
        $scope.StudentLastName = "";
        $scope.StudentMobileNo = "";
        $scope.StudentAlternativeMobileNo = "";
        $scope.StudentEmail = "";
        $scope.StudentAlternativeEmailid = "";
        $scope.Hostel = "";
        $scope.Transport = "";
        $scope.EducationLoan = "";
        $scope.EducationLoanLocation = "";
        $scope.DateOfBirth = "";
        $scope.Religion = "";
        $scope.FatherName = "";
        $scope.FatherMobile = "";
        $scope.MotherName = "";
        $scope.MotherMobile = "";
        $scope.FatherOccupationCode = "";
        $scope.GrandFatherName = "";
        $scope.GuardianName = "";
        $scope.GuardianMobile = "";
        $scope.Curr_Address1 = "";
        $scope.Curr_Address2 = "";
        $scope.Curr_Address3 = "";
        $scope.Curr_CountryCode = "";
        $scope.Curr_StateCode = "";
        $scope.Curr_CityCode = "";
        $scope.Curr_PinCode = "";
        $scope.IsAddressSame = "";
        $scope.Per_Address1 = "";
        $scope.Per_Address2 = "";
        $scope.Per_Address3 = "";
        $scope.Per_CountryCode = "";
        $scope.Per_StateCode = "";
        $scope.Per_CityCode = "";
        $scope.Per_PinCode = "";
        $scope.files = [];
        $scope.MaxPreferenceList = [];
        $scope.MaxPreferenceList = [
            { PName: 'First Preferance', PPreferedBranch: "" },
            { PName: 'Second Preferance', PPreferedBranch: "" },
            { PName: 'Third Preferance', PPreferedBranch: "" },
            { PName: 'Fourth Preferance', PPreferedBranch: "" },
            { PName: 'Fifth Preferance', PPreferedBranch: "" },
            { PName: 'Sixth Preference', PPreferedBranch: "" },

        ]
        $scope.Category = "";
        $scope.Caste = "";
        $scope.CasteCertificateNo = "";
        $scope.CasteCertificateIssueDate = "";
        $scope.DomicileCertificateNo = "";
        $scope.DomicileCertificateIssueDate = "";
        $scope.IncomeCertificateNo = "";
        $scope.IncomeCertificateIssueDate = "";
        $scope.TransferCertificateNo = "";
        $scope.TransferCertificateIssueDate = "";

        $scope.AadharNo = "";
        $scope.AnnualIncome = "";
        $scope.BankName = "";
        $scope.BranchName = "";
        $scope.AccountNo = "";
        $scope.IFSCCode = "";
        $scope.QualificationList = [];
        $scope.AddQualificationList();
        $scope.QualifyingExam = "";
        $scope.Status = "";
        $scope.Rollno = "";
        $scope.MarksObtained = "";
        $scope.MaxMarks = "";
        $scope.MathsObtMarks = "";
        $scope.MathsMaxMarks = "";
        $scope.PhysicsObtMarks = "";
        $scope.PhysicsMaxMarks = "";
        $scope.CheObtMarks = "";
        $scope.CheMaxMarks = "";
        $scope.CsObtMarks = "";
        $scope.CsMaxMarks = "";
        $scope.BioObtMarks = "";
        $scope.BioMaxMarks = "";
        $scope.EngObtMarks = "";
        $scope.EngMaxMarks = "";
        $scope.Aggregate = "";
        $scope.Percentage = "";
        $scope.Remarks = "";
        $scope.SiblingList = [];
        $scope.AddSiblingList();
        $scope.MedicalFitnessCertifiCate = "";
        $scope.PremedicalDetail = "";
        $scope.ContactPersonName = "";
        $scope.MobileNo = "";
        $scope.CompetitiveExamList = [];
        $scope.AddCompetitiveExamList();
        $scope.$applyAsync();
        $scope.SetFocus('#txtEnquiryNo');
        if (flag == 0) {
            showMsgBox('4');
        };
    };


    $("#wizard").bootstrapWizard({
        onTabShow: function (a, b, c) {
            var d = b.find("li").length,
                e = c + 1,
                f = e / d * 100,
                g = $("#wizard");
            g.find(".progress-bar").css({
                width: f + "%"
            }), e >= d ? (g.find(".pager .next").hide(), g.find(".pager .finish").show(), g.find(".pager .finish").removeClass("disabled")) : (g.find(".pager .next").show(), g.find(".pager .finish").hide())
        }
        ,
        onNext: function (tab, navigation, index) {
            var a = tab.find('a');
            var href = a.attr('href');
            var div = $(href);
            return isValidate(div);
        },
        onTabClick: function (tab, navigation, index) {
            var a = tab.find('a');
            var href = a.attr('href');
            var div = $(href);
            return isValidate(div);
        }
    });

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            debugger
            collectionobj.StudentCode = $scope.hfId
            collectionobj.EnquiryTypeCode = $scope.AdmissionType;
            collectionobj.EnquirySearch = $scope.EnquirySearch;

            collectionobj.RegNo = $scope.RegNo;
            collectionobj.AdmissionFormNo = $scope.AdmissionFormNo;

            collectionobj.DateOfAdmission = moment($scope.DateOfAdmission,'YYYY-MMM-DD');
            collectionobj.AcademicSessionId = $scope.AcademicSessionId;
            collectionobj.CourseCode = $scope.$parent.CollegeCourseCode;
            collectionobj.SemesterCode = $scope.Semester;

            collectionobj.AdmissionMode = $scope.AdmissionMode;
            collectionobj.LaternalEntry = $scope.LaternalEntry;
            collectionobj.AdmissionThrough = $scope.AdmissionThrough;
            collectionobj.EnquirySourceCode = $scope.EnquirySourceCode;
            collectionobj.ReferenceOf = $scope.ReferenceOf;

            collectionobj.BranchPreference1 = $scope.MaxPreferenceList[0].PPreferedBranch;
            collectionobj.BranchPreference2 = $scope.MaxPreferenceList[1].PPreferedBranch;
            collectionobj.BranchPreference3 = $scope.MaxPreferenceList[2].PPreferedBranch;
            collectionobj.BranchPreference4 = $scope.MaxPreferenceList[3].PPreferedBranch;
            collectionobj.BranchPreference5 = $scope.MaxPreferenceList[4].PPreferedBranch;
            collectionobj.BranchPreference6 = $scope.MaxPreferenceList[5].PPreferedBranch;
            collectionobj.SelectedForBranch = $scope.SelectedForBranch;
            collectionobj.Initials = $scope.Initials;
            collectionobj.Gender = $scope.Gender;

            collectionobj.IsPhyDisable = $scope.IsPhyDisable;
            collectionobj.DisabilityDetails = $scope.DisabilityDetails;
            collectionobj.BloodGroup = $scope.BloodGroup;
            collectionobj.FirstName = $scope.StudentFirstName;
            collectionobj.MiddleName = $scope.StudentMiddleName;
            collectionobj.LastName = $scope.StudentLastName;
            collectionobj.StudentMobileNo = $scope.StudentMobileNo;
            collectionobj.StudentAlternativeMobileNo = $scope.StudentAlternativeMobileNo;
            collectionobj.StudentEmail = $scope.StudentEmail;
            collectionobj.StudentAlternativeEmailid = $scope.StudentAlternativeEmailid;


            collectionobj.Hostel = $scope.Hostel;
            collectionobj.Transport = $scope.Transport;
            collectionobj.EducationLoan = $scope.EducationLoan;
            collectionobj.EducationLoanLocation = $scope.EducationLoanLocation;
            collectionobj.DOB = moment($scope.DateOfBirth, 'YYYY-MMM-DD');
            collectionobj.Religion = $scope.Religion;


            collectionobj.FatherName = $scope.FatherName;
            collectionobj.FatherMobile = $scope.FatherMobile;

            collectionobj.MotherName = $scope.MotherName;
            collectionobj.MotherMobile = $scope.MotherMobile;
            collectionobj.FatherOccupation = $scope.FatherOccupationCode;
            collectionobj.GrandFatherName = $scope.GrandFatherName;
            collectionobj.GuardianName = $scope.GuardianName;
            collectionobj.GuardianMobile = $scope.GuardianMobile;

            collectionobj.Curr_Address1 = $scope.Curr_Address1;
            collectionobj.Curr_Address2 = $scope.Curr_Address2;
            collectionobj.Curr_Address3 = $scope.Curr_Address3;
            collectionobj.Curr_CountryCode = $scope.Curr_CountryCode;
            collectionobj.Curr_StateCode = $scope.Curr_StateCode;
            collectionobj.Curr_CityCode = $scope.Curr_CityCode;
            collectionobj.Curr_PinCode = $scope.Curr_PinCode;

            collectionobj.IsAddressSame = $scope.IsAddressSame;

            collectionobj.Per_Address1 = $scope.Per_Address1;
            collectionobj.Per_Address2 = $scope.Per_Address2;
            collectionobj.Per_Address3 = $scope.Per_Address3;
            collectionobj.Per_CountryCode = $scope.Per_CountryCode;
            collectionobj.Per_StateCode = $scope.Per_StateCode;
            collectionobj.Per_CityCode = $scope.Per_CityCode;
            collectionobj.Per_PinCode = $scope.Per_PinCode;


            collectionobj.CasteCategory = $scope.Category;
            collectionobj.SubCasteCategory = $scope.Caste;
            collectionobj.CasteCertificateNo = $scope.CasteCertificateNo;
            collectionobj.DateOfAdmission = $scope.DateOfAdmission;
            collectionobj.CasteDateOfIssue = moment($scope.CasteCertificateIssueDate, 'YYYY-MMM-DD');
            collectionobj.DomicileCertificateNo = $scope.DomicileCertificateNo;
            collectionobj.DomicileDateOfIssue = moment($scope.DomicileCertificateIssueDate, 'YYYY-MMM-DD');

            collectionobj.IncomeCertificateNo = $scope.IncomeCertificateNo;
            collectionobj.IncomeDateOfIssue = moment($scope.IncomeCertificateIssueDate, 'YYYY-MMM-DD');
            collectionobj.TransferCertificateNo = $scope.TransferCertificateNo;
            collectionobj.TransferDateOfIssue = moment($scope.TransferCertificateIssueDate, 'YYYY-MMM-DD');
            collectionobj.AADHAARNo = $scope.AadharNo;
            collectionobj.AnnualIncome = $scope.AnnualIncome;
            collectionobj.BankName = $scope.BankName;

            collectionobj.BranchName = $scope.BranchName;
            collectionobj.AccountNo = $scope.AccountNo;
            collectionobj.IFSCCode = $scope.IFSCCode;
            //collectionobj.InstructionMedium
            collectionobj.EducationalQualification = JSON.stringify($scope.QualificationList);

            collectionobj.QualifyingExam = $scope.QualifyingExam;
            collectionobj.Status = $scope.Status;
            collectionobj.Rollno = $scope.Rollno;
            collectionobj.MarksObtained = $scope.MarksObtained;
            collectionobj.MaxMarks = $scope.MaxMarks;

            collectionobj.MathsObtMarks = $scope.MathsObtMarks;
            collectionobj.MathsMaxMarks = $scope.MathsMaxMarks;
            collectionobj.PhysicsObtMarks = $scope.PhysicsObtMarks;
            collectionobj.PhysicsMaxMarks = $scope.PhysicsMaxMarks;
            collectionobj.CheObtMarks = $scope.CheObtMarks;
            collectionobj.CheMaxMarks = $scope.CheMaxMarks;
            collectionobj.CsObtMarks = $scope.CsObtMarks;
            collectionobj.CsMaxMarks = $scope.CsMaxMarks;
            collectionobj.BioObtMarks = $scope.BioObtMarks;
            collectionobj.BioMaxMarks = $scope.BioMaxMarks;
            collectionobj.EngObtMarks = $scope.EngObtMarks;
            collectionobj.EngMaxMarks = $scope.EngMaxMarks;
            collectionobj.Aggregate = $scope.Aggregate;
            collectionobj.Percentage = $scope.Percentage;
            collectionobj.Remarks = $scope.Remarks;

            collectionobj.SiblingList = JSON.stringify($scope.SiblingList);

            collectionobj.MedicalFitnessCertifiCate = $scope.MedicalFitnessCertifiCate;
            collectionobj.PremedicalDetail = $scope.PremedicalDetail;
            collectionobj.ContactPersonName = $scope.ContactPersonName;
            collectionobj.MobileNo = $scope.MobileNo;

            collectionobj.CompetitiveExamList = JSON.stringify($scope.CompetitiveExamList);

            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;

            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.postmethode('POST', '../Api/CollegeAdmissionTransactionApi/InsertUpdateDeleteCollegeAdmissionFormDetails', collectionobj, $scope.files);

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });

        }
    };

    $scope.CollegeApplicationGeneralDetailList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/CollegeAdmissionTransactionApi/GetCollegeAdmissionFormDetailList', collectionobj);
        getData.then(function (response) {
            //debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "StudentCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Reg. Form No", "HeaderValue": "RegistrationFormNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Adm. Form No", "HeaderValue": "AdmissionFormNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Adm. Date", "HeaderValue": "DateOfAdmission", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Adm. Session", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Course", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father Mobile No.", "HeaderValue": "FatherMobileNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }

                ];

            $scope.CollegeApplicationGeneralDetailList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                //debugger
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.CollegeApplicationGeneralDetailList = $filter('filter')($scope.CollegeApplicationGeneralDetailList, { 'StudentCode': $scope.hfId }, true);

                $scope.AdmissionType = parseInt($scope.CollegeApplicationGeneralDetailList[0].EnquiryTypeCode);
                $scope.EnquirySearch = $scope.CollegeApplicationGeneralDetailList[0].EnquirySearch;

                $scope.RegNo = $scope.CollegeApplicationGeneralDetailList[0].RegistrationFormNo;
                $scope.AdmissionFormNo = $scope.CollegeApplicationGeneralDetailList[0].AdmissionFormNo;

                $scope.DateOfAdmission = new Date($scope.CollegeApplicationGeneralDetailList[0].DateOfAdmission);
                $scope.AcademicSessionId = $scope.CollegeApplicationGeneralDetailList[0].AcademicSessionId.toString();
                $scope.$parent.CollegeCourseCode = $scope.CollegeApplicationGeneralDetailList[0].CourseCode;
                $scope.ddlCollegeCourse_Change($scope.$parent.CollegeCourseCode);
                $scope.Semester = $scope.CollegeApplicationGeneralDetailList[0].SemesterCode.toString();

                $scope.AdmissionMode = $scope.CollegeApplicationGeneralDetailList[0].AdmissionMode;
                $scope.LaternalEntry = $scope.CollegeApplicationGeneralDetailList[0].LaternalEntry ? 'true' : 'false';
                $scope.AdmissionThrough = $scope.CollegeApplicationGeneralDetailList[0].AdmissionThrough;
                $scope.EnquirySourceCode = $scope.CollegeApplicationGeneralDetailList[0].EnquirySourceCode;
                $scope.ReferenceOf = $scope.CollegeApplicationGeneralDetailList[0].ReferenceOf;

                $scope.MaxPreferenceList[0].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference1;
                $scope.MaxPreferenceList[1].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference2;
                $scope.MaxPreferenceList[2].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference3;
                $scope.MaxPreferenceList[3].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference4;
                $scope.MaxPreferenceList[4].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference5;
                $scope.MaxPreferenceList[5].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference6;
                $scope.SelectedForBranch = $scope.CollegeApplicationGeneralDetailList[0].SelectedForBranch;
                $scope.Initials = $scope.CollegeApplicationGeneralDetailList[0].Initials;
                $scope.Gender = $scope.CollegeApplicationGeneralDetailList[0].Gender;

                $scope.IsPhyDisable = $scope.CollegeApplicationGeneralDetailList[0].IsPhyDisable == "1" ? 'true' : 'false';
                $scope.DisabilityDetails = $scope.CollegeApplicationGeneralDetailList[0].DisabilityDetails;
                $scope.BloodGroup = $scope.CollegeApplicationGeneralDetailList[0].BloodGroup;
                $scope.StudentFirstName = $scope.CollegeApplicationGeneralDetailList[0].StudentFirstName;
                $scope.StudentMiddleName = $scope.CollegeApplicationGeneralDetailList[0].StudentMiddleName;
                $scope.StudentLastName = $scope.CollegeApplicationGeneralDetailList[0].StudentLastName;
                $scope.StudentMobileNo = $scope.CollegeApplicationGeneralDetailList[0].StudentMobileNo;
                $scope.StudentAlternativeMobileNo = $scope.CollegeApplicationGeneralDetailList[0].StudentAlternativeMobileNo;
                $scope.StudentEmail = $scope.CollegeApplicationGeneralDetailList[0].StudentEmailid;
                $scope.StudentAlternativeEmailid = $scope.CollegeApplicationGeneralDetailList[0].StudentAlternativeEmailid;


                $scope.Hostel = $scope.CollegeApplicationGeneralDetailList[0].Hostel == "1" ? 'true' : 'false';
                $scope.Transport = $scope.CollegeApplicationGeneralDetailList[0].Transport == "1" ? 'true' : 'false';
                $scope.EducationLoan = $scope.CollegeApplicationGeneralDetailList[0].EducationLoan == "1" ? 'true' : 'false';
                $scope.EducationLoanLocation = $scope.CollegeApplicationGeneralDetailList[0].EducationLoanLocation;
                $scope.DateOfBirth = new Date($scope.CollegeApplicationGeneralDetailList[0].DOB);
                $scope.Religion = $scope.CollegeApplicationGeneralDetailList[0].Religion;


                $scope.FatherName = $scope.CollegeApplicationGeneralDetailList[0].FatherName;
                $scope.FatherMobile = $scope.CollegeApplicationGeneralDetailList[0].FatherMobileNo;

                $scope.MotherName = $scope.CollegeApplicationGeneralDetailList[0].MotherName;
                $scope.MotherMobile = $scope.CollegeApplicationGeneralDetailList[0].MotherMobileNo;
                $scope.FatherOccupationCode = $scope.CollegeApplicationGeneralDetailList[0].FatherOccupation;
                $scope.GrandFatherName = $scope.CollegeApplicationGeneralDetailList[0].GrandFatherName;
                $scope.GuardianName = $scope.CollegeApplicationGeneralDetailList[0].LocalGuardianName;
                $scope.GuardianMobile = $scope.CollegeApplicationGeneralDetailList[0].LocalGuardianMobileNo;

                $scope.Curr_Address1 = $scope.CollegeApplicationGeneralDetailList[0].Curr_Address1;
                $scope.Curr_Address2 = $scope.CollegeApplicationGeneralDetailList[0].Curr_Address2;
                $scope.Curr_Address3 = $scope.CollegeApplicationGeneralDetailList[0].Curr_Address3;
                $scope.Curr_CountryCode = $scope.CollegeApplicationGeneralDetailList[0].Curr_CountryCode;
                $scope.Curr_StateCode = $scope.CollegeApplicationGeneralDetailList[0].Curr_StateCode;
                $scope.Curr_CityCode = $scope.CollegeApplicationGeneralDetailList[0].Curr_CityCode;
                $scope.Curr_PinCode = $scope.CollegeApplicationGeneralDetailList[0].Curr_PinCode;

                $scope.IsAddressSame = $scope.CollegeApplicationGeneralDetailList[0].IsAddressSame == true ? true : false;

                $scope.Per_Address1 = $scope.CollegeApplicationGeneralDetailList[0].Per_Address1;
                $scope.Per_Address2 = $scope.CollegeApplicationGeneralDetailList[0].Per_Address2;
                $scope.Per_Address3 = $scope.CollegeApplicationGeneralDetailList[0].Per_Address3;
                $scope.Per_CountryCode = $scope.CollegeApplicationGeneralDetailList[0].Per_CountryCode;
                $scope.PerGetState($scope.Per_CountryCode);
                $scope.Per_StateCode = $scope.CollegeApplicationGeneralDetailList[0].Per_StateCode;
                $scope.PerGetCity($scope.Per_StateCode);
                $scope.Per_CityCode = $scope.CollegeApplicationGeneralDetailList[0].Per_CityCode;
                $scope.Per_PinCode = $scope.CollegeApplicationGeneralDetailList[0].Per_PinCode;

                $scope.StudentPhoto = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].StudentPhoto, '#imgStudentPhoto', '#fuStudentPhoto');
                $scope.StudentSign = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].StudentSign, '#imgStudentSign', '#fuStudentSign');
                $scope.FatherPhoto = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].FatherPhoto, '#imgFatherPhoto', '#fuFatherPhoto');
                $scope.FatherSign = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].FatherSign, '#imgFatherSign', '#fuFatherSign');
                $scope.MotherPhoto = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].MotherPhoto, '#imgMotherPhoto', '#fuMotherPhoto');
                $scope.MotherSign = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].MotherSign, '#imgMotherSign', '#fuMotherSign');
                $scope.LocalGuardianPhoto = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].LocalGuardianPhoto, '#imgLocalGuardianPhoto', '#fuLocalGuardianPhoto');
                $scope.LocalGuardianSign = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].LocalGuardianSign, '#imgLocalGuardianSign', '#fuLocalGuardianSign');

                $scope.Category = $scope.CollegeApplicationGeneralDetailList[0].CasteCategory;
                $scope.Caste = $scope.CollegeApplicationGeneralDetailList[0].SubCasteCategory;
                $scope.CasteCertificateNo = $scope.CollegeApplicationGeneralDetailList[0].CasteCertificateNo;
                $scope.CasteCertificateIssueDate = new Date($scope.CollegeApplicationGeneralDetailList[0].CasteDateOfIssue);
                $scope.DomicileCertificateNo = $scope.CollegeApplicationGeneralDetailList[0].DomicileCertificateNo;
                $scope.DomicileCertificateIssueDate = new Date($scope.CollegeApplicationGeneralDetailList[0].DomicileDateOfIssue);
                $scope.IncomeCertificateNo = $scope.CollegeApplicationGeneralDetailList[0].IncomeCertificateNo;
                $scope.IncomeCertificateIssueDate = new Date($scope.CollegeApplicationGeneralDetailList[0].IncomeDateOfIssue);
                $scope.TransferCertificateNo = $scope.CollegeApplicationGeneralDetailList[0].TransferCertificateNo;
                $scope.TransferCertificateIssueDate = new Date($scope.CollegeApplicationGeneralDetailList[0].TransferDateOfIssue);

                $scope.AadharNo = $scope.CollegeApplicationGeneralDetailList[0].AADHAARNo;
                $scope.AnnualIncome = $scope.CollegeApplicationGeneralDetailList[0].AnnualIncome;
                $scope.BankName = $scope.CollegeApplicationGeneralDetailList[0].BankName;
                $scope.BranchName = $scope.CollegeApplicationGeneralDetailList[0].BranchName;
                $scope.AccountNo = $scope.CollegeApplicationGeneralDetailList[0].AccountNo;
                $scope.IFSCCode = $scope.CollegeApplicationGeneralDetailList[0].IFSCCode;

                $scope.QualifyingExam = $scope.CollegeApplicationGeneralDetailList[0].QualifyingExam;
                $scope.Status = $scope.CollegeApplicationGeneralDetailList[0].Status;
                $scope.Rollno = $scope.CollegeApplicationGeneralDetailList[0].Rollno;
                $scope.MarksObtained = $scope.CollegeApplicationGeneralDetailList[0].MarksObtained;
                $scope.MaxMarks = $scope.CollegeApplicationGeneralDetailList[0].MaxMarks;

                $scope.MathsObtMarks = $scope.CollegeApplicationGeneralDetailList[0].MathsObtMarks;
                $scope.MathsMaxMarks = $scope.CollegeApplicationGeneralDetailList[0].MathsMaxMarks;
                $scope.PhysicsObtMarks = $scope.CollegeApplicationGeneralDetailList[0].PhysicsObtMarks;
                $scope.PhysicsMaxMarks = $scope.CollegeApplicationGeneralDetailList[0].PhysicsMaxMarks;
                $scope.CheObtMarks = $scope.CollegeApplicationGeneralDetailList[0].ChemistryObtMarks;
                $scope.CheMaxMarks = $scope.CollegeApplicationGeneralDetailList[0].ChemistryMaxMarks;
                $scope.CsObtMarks = $scope.CollegeApplicationGeneralDetailList[0].CSObtMarks;
                $scope.CsMaxMarks = $scope.CollegeApplicationGeneralDetailList[0].CSMaxMarks;
                $scope.BioObtMarks = $scope.CollegeApplicationGeneralDetailList[0].BioObtMarks;
                $scope.BioMaxMarks = $scope.CollegeApplicationGeneralDetailList[0].BioMaxMarks;
                $scope.EngObtMarks = $scope.CollegeApplicationGeneralDetailList[0].EngObtMarks;
                $scope.EngMaxMarks = $scope.CollegeApplicationGeneralDetailList[0].EngMaxMarks;
                $scope.Aggregate = $scope.CollegeApplicationGeneralDetailList[0].AggregateMarks;
                $scope.Percentage = $scope.CollegeApplicationGeneralDetailList[0].Percentage;
                $scope.Remarks = $scope.CollegeApplicationGeneralDetailList[0].Remarks;

                $scope.MedicalFitnessCertifiCate = $scope.CollegeApplicationGeneralDetailList[0].MedicalFitnessCertificate ? 'true' : 'false';
                $scope.PremedicalDetail = $scope.CollegeApplicationGeneralDetailList[0].PreMedicalDetail;
                $scope.ContactPersonName = $scope.CollegeApplicationGeneralDetailList[0].ContactPersonName;
                $scope.MobileNo = $scope.CollegeApplicationGeneralDetailList[0].MobileNo;

                var studentCode = $scope.hfId;

                $scope.SiblingList = [];
                $scope.QualificationList = [];
                $scope.CompetitiveExamList = [];
                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.StudentCode = studentCode;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/CollegeAdmissionTransactionApi/GetCollegeAdmissionFormDetailList', collectionobj);
                getData.then(function (response) {
                    if (response.data.length > 0) {
                        $scope.QualificationList = response.data;
                        var collectionobj = {};
                        collectionobj.Action = "6";
                        collectionobj.Code = $scope.hfId;
                        collectionobj.RelationshipId = relationshipId;
                        collectionobj.StudentCode = studentCode;
                        collectionobj.SessionId = sessionId;
                        var getData = myService.methode('POST', '../Api/CollegeAdmissionTransactionApi/GetCollegeAdmissionFormDetailList', collectionobj);
                        getData.then(function (response) {
                            if (response.data.length > 0) {
                                $scope.SiblingList = response.data;
                                var collectionobj = {};
                                collectionobj.Action = "7";
                                collectionobj.Code = $scope.hfId;
                                collectionobj.RelationshipId = relationshipId;
                                collectionobj.StudentCode = studentCode;
                                collectionobj.SessionId = sessionId;
                                var getData = myService.methode('POST', '../Api/CollegeAdmissionTransactionApi/GetCollegeAdmissionFormDetailList', collectionobj);
                                getData.then(function (response) {
                                    if (response.data.length > 0) {
                                        //debugger
                                        $scope.CompetitiveExamList = response.data;
                                        $scope.hideLoader();
                                        $scope.Save = "Edit";
                                        $scope.disableForEdit = true;
                                        $scope.disableDelete = false;
                                        $scope.$applyAsync();
                                        //collapse box
                                        $('.br-pageheader').fadeIn();
                                        $('#collapseinputbox').fadeIn();
                                        $('#CollapseSearchTableList').fadeOut();
                                        $scope.SetFocus('#txtEnquiryNo', true);
                                    }
                                });
                            }
                        });
                    }
                });
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.StudentCode = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.postmethode('POST', '../Api/CollegeAdmissionTransactionApi/InsertUpdateDeleteCollegeAdmissionFormDetails', collectionobj, $scope.files);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    $scope.GetStudents = function () {
        var collectionobj = {};
        $scope.Show = true;
        collectionobj.SearchBox = $scope.SearchBox;
        collectionobj.Action = '9';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.AdmissionSourceType = $scope.AdmissionSourceType;

        var getData = myService.methode('POST', '../Api/CollegeAdmissionTransactionApi/GetStudentDetails', collectionobj);
        getData.then(function (response) {
            $scope.StudentList = response.data;
        });

    }
    $scope.GetEdit = function (ID) {

        $scope.StudentList = $filter('filter')($scope.StudentList, { 'RegNo': ID }, true);

        $scope.SessionId = $scope.StudentList[0].AcademicSessionId.toString();
        $scope.RegTransId = $scope.StudentList[0].TransID;
        $scope.$parent.ClassCode = $scope.StudentList[0].ClassCode;

        $scope.GetSections($scope.$parent.ClassCode);
        $scope.BoardCode = $scope.StudentList[0].BoardCode;
        $scope.RegNo = $scope.StudentList[0].RegNo;
        $scope.FirstName = $scope.StudentList[0].StudentFirstName;
        $scope.MiddleName = $scope.StudentList[0].StudentMiddleName;
        $scope.LastName = $scope.StudentList[0].StudentLastName;

        $scope.SearchBox = $scope.FirstName + ' ' + $scope.LastName + ' ' + $scope.LastName

        $scope.PreviousSchoolName = $scope.StudentList[0].CurrentlyStudyingSchool;
        $scope.Nationality = $scope.StudentList[0].Nationality;
        $scope.FatherName = $scope.StudentList[0].FatherName;
        $scope.MotherName = $scope.StudentList[0].MotherName;
        $scope.FatherMobile = $scope.StudentList[0].FatherMobileNo;
        $scope.MotherMobile = $scope.StudentList[0].MotherMobileNo;
        $scope.FatherEmail = $scope.StudentList[0].FatherEmailId;
        $scope.MotherEmail = $scope.StudentList[0].MotherEmailId;
        $scope.FatherBusinessDetails = $scope.StudentList[0].FatherNatureOfJob;
        $scope.FatherOccupation = $scope.StudentList[0].FatherOccupation;
        $scope.MotherOccupation = $scope.StudentList[0].MotherOccupation;
        $scope.MotherBusinessDetails = $scope.StudentList[0].MotherNatureOfJob;
        $scope.FatherResidenceAddress = $scope.StudentList[0].ResidentialAddress;
        $scope.MotherQualification = $scope.StudentList[0].MotherAcademicQualification;
        $scope.FatherQualification = $scope.StudentList[0].FatherAcademicQualification;
        $scope.Gender = $scope.StudentList[0].Gender;


        $scope.FCommAddress = true;

        $scope.FCountryCode = $scope.StudentList[0].CountryCode;
        $scope.GetState($scope.FCountryCode, 'FStatelist');

        $scope.FStateCode = $scope.StudentList[0].StateCode;
        $scope.GetCity($scope.FStateCode, 'FCitylist')

        $scope.FCityCode = $scope.StudentList[0].CityCode;
        $scope.GetCityArea($scope.FCityCode, 'FCityAreaList')

        $scope.FCityAreaCode = $scope.StudentList[0].CityAreaCode;
        $scope.FSubArea = $scope.StudentList[0].SubArea;
        $scope.FPinCode = $scope.StudentList[0].PinCode;

        $scope.DOB = new Date($scope.StudentList[0].DateOfBirth)
        $scope.AgeOnDate = $scope.StudentList[0].AgeOnDate

        $scope.Show = false;
        $scope.SearchBox = '';


    }

    $scope.GetStudentForSibling = function () {
        debugger
        var collectionobj = {};
        $scope.Show = true;
        collectionobj.Action = '10';
        collectionobj.FatherName = $scope.FatherName;
        collectionobj.MotherName = $scope.MotherName;
        collectionobj.CourseCode = $scope.SiblingCourseCode;
        collectionobj.BranchCode = $scope.SiblingBranchCode;
        collectionobj.SemesterCode = $scope.SiblingSemesterCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.AnyOther = $scope.AnyOther;

        var getData = myService.methode('POST', '../Api/CollegeAdmissionTransactionApi/GetStudentDetails', collectionobj);
        getData.then(function (response) {
            debugger
            $scope.SiblingStudentList = response.data;
        });

    }

    $scope.Click_SiblingNo = function () {
        if ($scope.IsSibling == 'true')
            $scope.GetStudentForSibling();
        else
            $scope.SiblingStudentList = [];
    }

    $scope.Change_AnyOther = function () {
        $scope.GetStudentForSibling();
    }
    $scope.GetSiblingCollegeCourse = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetCollegeCourse', collectionobj);
        getData.then(function (response) {
            $scope.CollegeSiblingCourseList = response.data
            //debugger;
        });
    };

    $scope.GetSiblingCollegeBranch = function (collegeCourseCode) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.CollegeCourseCode = collegeCourseCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetCollegeBranch', collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.CollegeSiblingBranchList = response.data
        });
    };
    $scope.GetSiblingSemester = function (CourseCode) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.CourseCode = CourseCode;
        var getData = myService.methode('POST', '../Api/GblMasterApi/GetSemesterMaster', collectionobj);
        getData.then(function (response) {
            $scope.SiblingSemesterList = response.data;
        });
    };
}