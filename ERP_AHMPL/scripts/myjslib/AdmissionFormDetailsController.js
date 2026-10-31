app.AdmissionFormDetailsController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlClass');
    $scope.EnquiryFor = (isSchool ? 'School' : isCollege ? 'College' : null);
    $scope.SessionId = sessionId;
    $scope.disabledActiveParital = true;
    sessionStorage.removeItem('AdmClassCode');
    sessionStorage.removeItem('AdmStdCode');
    sessionStorage.removeItem('IsFinalStd');
    sessionStorage.setItem('FromAdm', false);

    $scope.disabledDDLClass = true;
    $scope.SiblingClassCode = "";
    $scope.FinalStudentList = [];
    $scope.IsFinalStudent = false;

    $scope.SetMaxMinDate().then(function (response) {
        $scope.DateOfAdmission = response;
        $scope.$applyAsync();
    });
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

    $scope.ChangeCommAddress = function (val, objName) {
        $scope.FCommAddress = false;
        $scope.MCommAddress = false;
        if (val == true) {
            $scope[objName] = true;
        }
    }

    $scope.ddlClass_Change = function () {
        if (loginTypeId == 1)
            $scope.CheckFeeDepositDetails();
        $scope.CurrentClassName = ($filter('filter')($scope.ClassList, { Code: $scope.ClassCode }))[0].ClassName
        $scope.GetSections($scope.ClassCode);
    };

    $scope.CheckFeeDepositDetails = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.StudentList = JSON.stringify([{ StudentCode: $scope.hfId, chk: true }]);
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFeeDepositDetailsFromStudentFeeStructureForm', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.FeeDepositDetails = response.data;
                $('#FeeDepositDetails').modal('show');
            }
        });
    }

    $scope.ddlSection_change = function () {
        $scope.GetOptionalSubjectList();
    };
        
    $scope.Disable = function () {
        $scope.disabledDDLClass = true;
    }

    $scope.Enable = function () {
        $scope.disabledDDLClass = false;
    }

    $scope.ddl_CityChange = function () {
        $scope.GetCityArea($scope.CityCode);
    }

    $scope.Change_AnyOther = function () {
        $scope.GetStudentForSibling();
    }

    $scope.CreateFinalStudentList = function (obj, stdcode, flag) {
        if (flag) {
            if (($filter('filter')($scope.FinalStudentList, { StudentCode: stdcode })).length == 0) {
                obj.Relation = (obj.Gender == 'Male' ? 'Brother' : (obj.Gender == 'Female' ? 'Sister' : ''))
                $scope.FinalStudentList.push(obj);
            }
            else
                alert('Student already exists in final list.')
        }
        else {
            $scope.FinalStudentList = $filter('filter')($scope.FinalStudentList, { StudentCode: '!'+stdcode });
        }
    }

    $scope.GetStudentForSibling = function () {
        var collectionobj = {};
        $scope.Show = true;
        collectionobj.Action = '7';
        collectionobj.FatherName = $scope.FatherName;
        collectionobj.MotherName = $scope.MotherName;
        collectionobj.ClassCode = $scope.SiblingClassCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.AnyOther = $scope.AnyOther;

        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentDetails', collectionobj);
        getData.then(function (response) {
            $scope.SiblingStudentList = response.data;
        });

    }

    $scope.Click_SiblingNo = function () {
        if ($scope.IsSibling == 'true')
            $scope.GetStudentForSibling();
        else
            $scope.SiblingStudentList = [];
    }

    $scope.GetStudents = function ()
    {
        var collectionobj = {};
        $scope.Show = true;
        collectionobj.SearchBox = $scope.SearchBox;
        collectionobj.Action = '6';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.AdmissionSourceType = $scope.AdmissionSourceType;

        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetStudentDetails', collectionobj);
        getData.then(function (response) {
            $scope.StudentList = response.data;
        });

    }

    $scope.GetEdit = function(ID)
    {
       
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
    $scope.SaveRecord = function (redirecttoConcessionMapping) {
        if (isValidate()) {
            if ($scope.FCommAddress || $scope.MCommAddress) {
                var collectionobj = {};
                collectionobj.StudentCode = $scope.hfId;
                collectionobj.StudentID = $scope.StudentID
                collectionobj.RegNo = $scope.RegNo
                collectionobj.TransID = $scope.RegTransId
                if ($scope.IsFinalStudent)
                    collectionobj.AdmissionNo = $scope.AdmissionNo
                collectionobj.AdmissionSourceType = $scope.AdmissionSourceType
                collectionobj.AcademicSessionId = $scope.SessionId
                collectionobj.BoardCode = $scope.BoardCode
                collectionobj.ClassCode = $scope.$parent.ClassCode
                collectionobj.SectionCode = $scope.$parent.SectionCode
                collectionobj.FirstName = $scope.FirstName
                collectionobj.MiddleName = $scope.MiddleName
                collectionobj.LastName = $scope.LastName
                collectionobj.DOB = moment($scope.DOB).format('DD-MMM-YYYY');
                collectionobj.PlaceOfBirth = $scope.PlaceOfBirth
                collectionobj.AgeOnDate = $scope.AgeOnDate
                collectionobj.Gender = $scope.Gender
                collectionobj.StudentEmail = $scope.StudentEmail
                collectionobj.StudentContact = $scope.StudentContact
                collectionobj.AadharCardNo = $scope.AadharCardNo
                collectionobj.BloodGroup = $scope.BloodGroup
                collectionobj.DateOfJoining = moment($scope.DateOfJoining).format('DD-MMM-YYYY');
                collectionobj.DateOfAdmission = moment($scope.DateOfAdmission).format('DD-MMM-YYYY');
                collectionobj.Nationality = $scope.Nationality
                collectionobj.Religion = $scope.Religion
                collectionobj.Category = $scope.Category
                collectionobj.Caste = $scope.Caste
                collectionobj.IsEws = $scope.IsEws
                collectionobj.IsSibling = $scope.IsSibling
                collectionobj.SiblingStudentList = JSON.stringify($scope.FinalStudentList)
                collectionobj.IsTC = $scope.IsTC
                collectionobj.IsTransport = $scope.IsTransport

                //Other Students Details 

                collectionobj.StreamCode = $scope.StreamCode
                collectionobj.BranchCode = $scope.BranchCode
                collectionobj.Medium = $scope.Medium

                collectionobj.SubjectList = JSON.stringify($filter('filter')($scope.OptionalSubjectList, { chk: true }));
                collectionobj.MedicalHistory = $scope.MedicalHistory
                collectionobj.Allergies = $scope.Allergies
                collectionobj.OtherMedicalInfo = $scope.OtherMedicalInfo
                collectionobj.FamilyDoctorPhone = $scope.FamilyDoctorPhone
                collectionobj.FamilyDoctorAddress = $scope.FamilyDoctorAddress
                collectionobj.DistanceFromHome = $scope.DistanceFromHome
                collectionobj.IsOnlyChild = $scope.IsOnlyChild
                collectionobj.GeneralDescription = $scope.GeneralDescription
                collectionobj.DesignationCode = $scope.DesignationCode
                collectionobj.EmployeeCode = $scope.EmployeeCode

                //Last School Information
                collectionobj.SchoolName = $scope.PreviousSchoolName
                collectionobj.PreviousCity = $scope.PreviousCity
                collectionobj.PreviousClass = $scope.PreviousClass
                collectionobj.PreviousYear = $scope.PreviousYear
                collectionobj.PreviousBoard = $scope.PreviousBoard
                collectionobj.Percentage = $scope.Percentage
                //Guardian Inputs
                collectionobj.GuardianName = $scope.GuardianName
                collectionobj.GuardianOccupationCode = $scope.GuardianOccupationCode
                collectionobj.GuardianDesignationCode = $scope.GuardianDesignationCode
                collectionobj.GuardianResidenceAddress = $scope.GuardianResidenceAddress
                collectionobj.GuardianOfficeAddress = $scope.GuardianOfficeAddress
                collectionobj.GuardianEmail = $scope.GuardianEmail
                collectionobj.GuardianAlternateEmail = $scope.GuardianAlternateEmail
                collectionobj.GuardianDOB = moment($scope.GuardianDOB).format('DD-MMM-YYYY');
                collectionobj.GuardianMobile = $scope.GuardianMobile
                collectionobj.GuardianPhone = $scope.GuardianPhone
                collectionobj.GuardianCompanyName = $scope.GuardianCompanyName
                collectionobj.GuardianBusinessDetails = $scope.GuardianBusinessDetails
                collectionobj.GuardianQualification = $scope.GuardianQualification
                collectionobj.GuardianServiceIn = $scope.GuardianServiceIn
                collectionobj.GuardianOfficephone = $scope.GuardianOfficephone
                collectionobj.GuardianOfficeMobile = $scope.GuardianOfficeMobile
                collectionobj.GuardianOfficeExtension = $scope.GuardianOfficeExtension
                collectionobj.GuardianOfficeEmail = $scope.GuardianOfficeEmail
                collectionobj.GuardianOfficeWebsite = $scope.GuardianOfficeWebsite
                collectionobj.GuardianIncome = $scope.GuardianIncome
                collectionobj.GuardianIsSingleParent = $scope.GuardianIsSingleParent

                //Father Inputs
                collectionobj.FatherName = $scope.FatherName
                collectionobj.FatherOccupationCode = $scope.FatherOccupationCode
                collectionobj.FatherDesignationCode = $scope.FatherDesignationCode
                collectionobj.FatherResidenceAddress = $scope.FatherResidenceAddress

                collectionobj.FCountryCode = $scope.FCountryCode;
                collectionobj.FStateCode = $scope.FStateCode;
                collectionobj.FCityCode = $scope.FCityCode;
                collectionobj.FCityAreaCode = $scope.FCityAreaCode;
                collectionobj.FSubArea = $scope.FSubArea;
                collectionobj.FPinCode = $scope.FPinCode;



                collectionobj.FatherOfficePhone = $scope.FatherOfficePhone
                collectionobj.FatherOfficeAddress = $scope.FatherOfficeAddress
                collectionobj.FatherEmail = $scope.FatherEmail
                collectionobj.FatherDOB = moment($scope.FatherDOB).format('DD-MMM-YYYY');
                collectionobj.FatherMobile = $scope.FatherMobile
                collectionobj.FatherPhone = $scope.FatherPhone
                collectionobj.FatherAnnualIncome = $scope.FatherAnnualIncome
                collectionobj.FatherCompanyName = $scope.FatherCompanyName
                collectionobj.FatherBusinessDetails = $scope.FatherBusinessDetails
                collectionobj.FatherQualification = $scope.FatherQualification
                collectionobj.FatherServiceIn = $scope.FatherServiceIn

                //Mother Inputs

                collectionobj.MotherName = $scope.MotherName
                collectionobj.MotherOccupationCode = $scope.MotherOccupationCode
                collectionobj.MotherDesignationCode = $scope.MotherDesignationCode
                collectionobj.MotherResidenceAddress = $scope.MotherResidenceAddress

                collectionobj.MCountryCode = $scope.MCountryCode;
                collectionobj.MStateCode = $scope.MStateCode;
                collectionobj.MCityCode = $scope.MCityCode;
                collectionobj.MCityAreaCode = $scope.MCityAreaCode;
                collectionobj.MSubArea = $scope.MSubArea;
                collectionobj.MPinCode = $scope.MPinCode;

                collectionobj.CommAddress = $scope.FCommAddress ? 'F' : $scope.MCommAddress ? 'M' : '';

                collectionobj.MotherPhone = $scope.MotherPhone
                collectionobj.MotherOfficeAddress = $scope.MotherOfficeAddress
                collectionobj.MotherEmail = $scope.MotherEmail
                collectionobj.AnniversaryDate = moment($scope.AnniversaryDate).format('DD-MMM-YYYY');
                collectionobj.MotherDOB = moment($scope.MotherDOB).format('DD-MMM-YYYY');
                collectionobj.MotherMobile = $scope.MotherMobile
                collectionobj.MotherAnnualIncome = $scope.MotherAnnualIncome
                collectionobj.MotherCompanyName = $scope.MotherCompanyName
                collectionobj.MotherBusinessDetails = $scope.MotherBusinessDetails
                collectionobj.MotherQualification = $scope.MotherQualification
                collectionobj.MotherServiceIn = $scope.MotherServiceIn

                collectionobj.ActiveParital = $scope.ddlActiveParital;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                $scope.disableAdd = true;

                if ($scope.Save == "Save") {
                    collectionobj.Action = "1";
                }
                else if ($scope.Save == "Edit") {
                    collectionobj.Action = "2";
                }
                var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteAdmissionFormDetails', collectionobj);
                getData.then(function (response) {
                    var response = (response.data.replace(/"/g, "")).split('_');
                    if (response.length > 1) {
                        var stdcode = response[1]
                    }
                    if (showMsgBox(response[0])) {
                        //if (redirecttoConcessionMapping == 1) {
                        //    //sessionStorage.setItem('AdmClassCode', $scope.$parent.ClassCode);
                        //    //sessionStorage.setItem('AdmStdCode', stdcode);
                        //    //sessionStorage.setItem('IsFinalStd', $scope.IsFinalStudent);
                        //    //sessionStorage.setItem('FromAdm', true);
                        //    window.location.href = "../FeeMaster/StudentWiseConcessionMapping?" + 'Para1=' + $scope.$parent.ClassCode + '&Para2=' + stdcode + '&Para3=' + $scope.IsFinalStudent + '&Para4=' + true;
                        //}
                        //else
                        if (redirecttoConcessionMapping == 2) {
                            //sessionStorage.setItem('AdmClassCode', $scope.$parent.ClassCode);
                            //sessionStorage.setItem('AdmStdCode', stdcode);
                            //sessionStorage.setItem('IsFinalStd', $scope.IsFinalStudent);$scope.SessionId
                            //sessionStorage.setItem('FromAdm', true);
                            window.location.href = "../FeeTransaction/AdmissionFeeDeposit?" + 'Para1=' + $scope.$parent.ClassCode + '&Para2=' + stdcode + '&Para3=' + $scope.IsFinalStudent + '&Para4=true' + '&Para5=' + $scope.SessionId;
                        }
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                showMsgBox('Please Select "Is Comm. Address" checkbox of "Father(s) Details" or "Mother(s) Details" sections.')
            }
        }
    };


    $scope.StudentList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        if ($scope.StudentList.length > 0) return;
        $scope.showLoader();

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetAdmissionFormDetails', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "StudentCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Session", "HeaderValue": "AcademicSession", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                    { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student Id", "HeaderValue": "StudentID", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Admission No.", "HeaderValue": "AdmissionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Type of Admission", "HeaderValue": "TypeofAdmission", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Medium", "HeaderValue": "Medium", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                  
                    { "HeaderText": "Date Of Birth", "HeaderValue": "DOB", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Date Of Admission", "HeaderValue": "DateOfAdmission", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Date Of Joining", "HeaderValue": "DateOfJoining", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Address", "HeaderValue": "FatherResidenceAddress", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                    { "HeaderText": "Student's Mobile", "HeaderValue": "StudentMobileNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father's Mobile", "HeaderValue": "FatherMobile", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Mother's Mobile", "HeaderValue": "MotherMobile", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Mother Name", "HeaderValue": "MotherName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },

                    { "HeaderText": "Is Final", "HeaderValue": "IsFinalStudent", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                    { "HeaderText": "Siblings", "HeaderValue": "Siblings", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "LineBreak": "Yes" },
                    { "HeaderText": "Staff Ward", "HeaderValue": "StaffWard", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },

                ];
               

            $scope.StudentList = response.data;
            loadDataTableForLargeAmountData(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.StudentListSearch = $filter('filter')($scope.StudentList, { StudentCode: $scope.hfId }, true);
                /*collectionobj.Action = "5";*/
                collectionobj.Action = "15";
                collectionobj.StudentCode = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetAdmissionFormDetails', collectionobj);
                getData.then(function (response) {
                    
                    $scope.StudentListSearch = response.data;
                    if ($scope.StudentListSearch[0].IsFeeStructureApplied == false) //&& $scope.StudentListSearch[0].TypeOfAdmission == 'New'
                        $scope.disabledDDLClass = false;
                    else
                        $scope.disabledDDLClass = true;
                    $scope.hfId = $scope.StudentListSearch[0].StudentCode;
                    $scope.StudentName = $scope.StudentListSearch[0].StudentName;
                    $scope.ClassName = $scope.StudentListSearch[0].ClassName;
                    $scope.PreviousClassName = $scope.StudentListSearch[0].ClassName
                    $scope.SessionName = $scope.StudentListSearch[0].SessionName;
                    $scope.RegTransId = $scope.StudentListSearch[0].RegTransId;
                    $scope.IsFinalStudent = $scope.StudentListSearch[0].IsFinalStudent == null ? false : $scope.StudentListSearch[0].IsFinalStudent;
                    $scope.StudentID = $scope.StudentListSearch[0].StudentID
                    $scope.AdmissionNo = $scope.StudentListSearch[0].AdmissionNo
                    $scope.AdmissionSourceType = $scope.StudentListSearch[0].AdmissionSourceType == 1 ? "1" : "0"
                    $scope.$parent.ClassCode = $scope.StudentListSearch[0].ClassCode
                    $scope.GetSections($scope.$parent.ClassCode);
                    $scope.$parent.SectionCode = $scope.StudentListSearch[0].SectionCode
                    $scope.SessionId = $scope.StudentListSearch[0].AcademicSessionID.toString();
                    $scope.BoardCode = $scope.StudentListSearch[0].BoardCode
                    $scope.RegNo = $scope.StudentListSearch[0].RegNo
                    $scope.FirstName = $scope.StudentListSearch[0].FirstName
                    $scope.MiddleName = $scope.StudentListSearch[0].MiddleName
                    $scope.LastName = $scope.StudentListSearch[0].LastName
                    $scope.DOB = new Date($scope.StudentListSearch[0].DOB)
                    $scope.DobInWords = $scope.StudentListSearch[0].DobInWords
                    $scope.SDob = $scope.StudentListSearch[0].SDob
                    $scope.SDoj = $scope.StudentListSearch[0].SDoj
                    $scope.PlaceOfBirth = $scope.StudentListSearch[0].PlaceOfBirth
                    $scope.AgeOnDate = $scope.StudentListSearch[0].AgeOnDate
                    $scope.Gender = $scope.StudentListSearch[0].Gender
                    $scope.StudentEmail = $scope.StudentListSearch[0].Email
                    $scope.StudentContact = $scope.StudentListSearch[0].MobileNo
                    $scope.AadharCardNo = $scope.StudentListSearch[0].AadharCardNo
                    $scope.BloodGroup = $scope.StudentListSearch[0].BloodGroup
                    $scope.DateOfJoining = new Date($scope.StudentListSearch[0].DateOfJoining)
                    $scope.DateOfAdmission = new Date($scope.StudentListSearch[0].DateOfAdmission)
                    $scope.Nationality = $scope.StudentListSearch[0].Nationality
                    $scope.Religion = $scope.StudentListSearch[0].Religion
                    $scope.Category = $scope.StudentListSearch[0].Category
                    $scope.Caste = $scope.StudentListSearch[0].Caste
                    $scope.IsEws = $scope.StudentListSearch[0].IsEws == true ? "true" : "false"
                    $scope.IsSibling = $scope.StudentListSearch[0].IsSibling == true ? "true" : "false"

                    $scope.IsTC = $scope.StudentListSearch[0].IsTC == true ? "true" : "false"
                    $scope.IsTransport = $scope.StudentListSearch[0].IsTransport == true ? "true" : "false"
                    $scope.WithdrawTC = $scope.StudentListSearch[0].WithdrawTC.toString();

                    $scope.StreamCode = $scope.StudentListSearch[0].StreamCode
                    $scope.BranchCode = $scope.StudentListSearch[0].BranchCode
                    $scope.BranchAddress = $scope.StudentListSearch[0].BranchAddress
                    $scope.BranchLogo = $scope.StudentListSearch[0].BranchLogo
                    $scope.Medium = $scope.StudentListSearch[0].Medium
                 
                    
                    $scope.MedicalHistory = $scope.StudentListSearch[0].MedicalHistory
                    $scope.Allergies = $scope.StudentListSearch[0].Allergies
                    $scope.OtherMedicalInfo = $scope.StudentListSearch[0].OtherMedicalInfo
                    $scope.FamilyDoctorPhone = $scope.StudentListSearch[0].FamilyDoctorPhone
                    $scope.FamilyDoctorAddress = $scope.StudentListSearch[0].FamilyDoctorAddress
                    $scope.DistanceFromHome = $scope.StudentListSearch[0].DistancefromHome
                    $scope.IsOnlyChild = $scope.StudentListSearch[0].IsOnlyChild
                    $scope.GeneralDescription = $scope.StudentListSearch[0].GeneralDescription
                    $scope.DesignationCode = $scope.StudentListSearch[0].DesignationCode
                    $scope.EmployeeCode = $scope.StudentListSearch[0].StaffWardCode

                    $scope.PreviousSchoolName = $scope.StudentListSearch[0].SchoolName
                    $scope.PreviousCity = $scope.StudentListSearch[0].PreviousCity
                    $scope.PreviousClass = $scope.StudentListSearch[0].PreviousClass
                    $scope.PreviousYear = $scope.StudentListSearch[0].PreviousYear
                    $scope.PreviousBoard = $scope.StudentListSearch[0].PreviousBoard
                    $scope.Percentage = $scope.StudentListSearch[0].Percentage
                    $scope.StudentPhoto = $scope.StudentListSearch[0].StudentPhoto
                    $scope.BranchName = $scope.StudentListSearch[0].BranchName
                    $scope.pp = parseInt($scope.StudentListSearch[0].Percentage)
                    $scope.GuardianName = $scope.StudentListSearch[0].GuardianName
                    $scope.GuardianOccupationCode = $scope.StudentListSearch[0].GuardianOccupationCode
                    $scope.GuardianDesignationCode = $scope.StudentListSearch[0].GuardianDesignationCode
                    $scope.GuardianResidenceAddress = $scope.StudentListSearch[0].GuardianResidenceAddress
                    $scope.GuardianOfficeAddress = $scope.StudentListSearch[0].GuardianOfficeAddress
                    $scope.GuardianEmail = $scope.StudentListSearch[0].GuardianEmail
                    $scope.GuardianAlternateEmail = $scope.StudentListSearch[0].GuardianAlternateEmail
                    $scope.GuardianDOB = new Date($scope.StudentListSearch[0].GuardianDOB)
                    $scope.GuardianMobile = $scope.StudentListSearch[0].GuardianMobile
                    $scope.GuardianPhone = $scope.StudentListSearch[0].GuardianPhone
                    $scope.GuardianCompanyName = $scope.StudentListSearch[0].GuardianCompanyName
                    $scope.GuardianBusinessDetails = $scope.StudentListSearch[0].GuardianBusinessDetails
                    $scope.GuardianQualification = $scope.StudentListSearch[0].GuardianQualification
                    $scope.GuardianServiceIn = $scope.StudentListSearch[0].GuardianServiceIn
                    $scope.GuardianOfficephone = $scope.StudentListSearch[0].GuardianOfficephone
                    $scope.GuardianOfficeMobile = $scope.StudentListSearch[0].GuardianOfficeMobile
                    $scope.GuardianOfficeExtension = $scope.StudentListSearch[0].GuardianOfficeExtension
                    $scope.GuardianOfficeEmail = $scope.StudentListSearch[0].GuardianOfficeEmail
                    $scope.GuardianOfficeWebsite = $scope.StudentListSearch[0].GuardianOfficeWebsite
                    $scope.GuardianIncome = $scope.StudentListSearch[0].GuardianIncome
                    $scope.GuardianIsSingleParent = $scope.StudentListSearch[0].GuardianIsSingleParent
                    $scope.FatherName = $scope.StudentListSearch[0].FatherName
                    $scope.FatherOccupationCode = $scope.StudentListSearch[0].FatherOccupationCode
                    $scope.FatherDesignationCode = $scope.StudentListSearch[0].FatherDesignationCode
                    $scope.FatherResidenceAddress = $scope.StudentListSearch[0].FatherResidenceAddress


                    $scope.FCountryCode = $scope.StudentListSearch[0].FCountryCode;
                    $scope.GetState($scope.FCountryCode, 'FStatelist')
                    $scope.FStateCode = $scope.StudentListSearch[0].FStateCode;
                    $scope.GetCity($scope.FStateCode, 'FCitylist')
                    $scope.FCityCode = $scope.StudentListSearch[0].FCityCode;
                    $scope.GetCityArea($scope.FCityCode, 'FCityAreaList')

                    $scope.FCityAreaCode = $scope.StudentListSearch[0].FCityAreaCode;
                    $scope.FSubArea = $scope.StudentListSearch[0].FSubArea;
                    $scope.FPinCode = $scope.StudentListSearch[0].FPinCode;
                    $scope.StateName = $scope.StudentListSearch[0].StateName;
                    $scope.CityName = $scope.StudentListSearch[0].CityName;
                    $scope.Years = $scope.StudentListSearch[0].Years;
                    $scope.Months = $scope.StudentListSearch[0].Months;
                    $scope.Days = $scope.StudentListSearch[0].Days;



                    $scope.FatherOfficePhone = $scope.StudentListSearch[0].FatherOfficePhone
                    $scope.FatherOfficeAddress = $scope.StudentListSearch[0].FatherOfficeAddress
                    $scope.FatherEmail = $scope.StudentListSearch[0].FatherEmail
                    $scope.FatherDOB = new Date($scope.StudentListSearch[0].FatherDOB)
                    $scope.FatherMobile = $scope.StudentListSearch[0].FatherMobile
                    $scope.FatherPhone = $scope.StudentListSearch[0].FatherPhone
                    $scope.FatherAnnualIncome = $scope.StudentListSearch[0].FatherAnnualIncome
                    $scope.FatherCompanyName = $scope.StudentListSearch[0].FatherCompanyName
                    $scope.FatherBusinessDetails = $scope.StudentListSearch[0].FatherBusinessDetails
                    $scope.FatherQualification = $scope.StudentListSearch[0].FatherQualification
                    $scope.FatherServiceIn = $scope.StudentListSearch[0].FatherServiceIn
                    $scope.MotherName = $scope.StudentListSearch[0].MotherName
                    $scope.MotherOccupationCode = $scope.StudentListSearch[0].MotherOccupationCode
                    $scope.MotherDesignationCode = $scope.StudentListSearch[0].MotherDesignationCode
                    $scope.MotherResidenceAddress = $scope.StudentListSearch[0].MotherResidenceAddress

                    $scope.MCountryCode = $scope.StudentListSearch[0].MCountryCode;
                    $scope.GetState($scope.MCountryCode, 'MStatelist')
                    $scope.MStateCode = $scope.StudentListSearch[0].MStateCode;
                    $scope.GetCity($scope.MStateCode, 'MCitylist')
                    $scope.MCityCode = $scope.StudentListSearch[0].MCityCode;
                    $scope.GetCityArea($scope.MCityCode, 'MCityAreaList')


                    $scope.MCityAreaCode = $scope.StudentListSearch[0].MCityAreaCode;
                    $scope.MSubArea = $scope.StudentListSearch[0].MSubArea;
                    $scope.MPinCode = $scope.StudentListSearch[0].MPinCode;

                    $scope.FCommAddress = false;
                    $scope.MCommAddress = false;

                    if ($scope.StudentListSearch[0].CommAddress == 'F')
                        $scope.FCommAddress = true;
                    else if ($scope.StudentListSearch[0].CommAddress == 'M')
                        $scope.MCommAddress = true;

                    $scope.MotherPhone = $scope.StudentListSearch[0].MotherPhone
                    $scope.MotherOfficeAddress = $scope.StudentListSearch[0].MotherOfficeAddress
                    $scope.MotherEmail = $scope.StudentListSearch[0].MotherEmail
                    $scope.AnniversaryDate = new Date($scope.StudentListSearch[0].AnniversaryDate)
                    $scope.MotherDOB = new Date($scope.StudentListSearch[0].MotherDOB)
                    $scope.MotherMobile = $scope.StudentListSearch[0].MotherMobile
                    $scope.MotherOfficePhone = $scope.StudentListSearch[0].MotherOfficePhone
                    $scope.MotherAnnualIncome = $scope.StudentListSearch[0].MotherAnnualIncome
                    $scope.MotherCompanyName = $scope.StudentListSearch[0].MotherCompanyName
                    $scope.MotherBusinessDetails = $scope.StudentListSearch[0].MotherBusinessDetails
                    $scope.MotherQualification = $scope.StudentListSearch[0].MotherQualification
                    $scope.MotherServiceIn = $scope.StudentListSearch[0].MotherServiceIn
                    try { $scope.ddlActiveParital = $scope.StudentListSearch[0].IsActive.toString() }
                    catch{}
                    

                    $scope.GetOptionalSubjectList($scope.hfId);

                    $scope.IsSearchBoxDisabled = true;
                    $scope.Show = false;


                    collectionobj.Action = "8";
                    collectionobj.StudentCode = $scope.hfId;
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.SessionId = sessionId;
                    collectionobj.FYId = fyId;
                    var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetAdmissionFormDetails', collectionobj);
                    getData.then(function (response) {
                        $scope.FinalStudentList = response.data;
                    });

                    $scope.hideLoader();
                    $scope.Save = "Edit";
                    //$scope.Redirect = 'Edit and Redirect to Concession Mapping'
                    $scope.Redirect = 'Edit and Redirect to Admission Fee Deposit'
                    $scope.disablePrint = false;
                    $scope.disableAdd = false;
                    $scope.disableDelete = false;
                    $scope.$applyAsync();
                    //collapse box
                    $('.br-pageheader').fadeIn();
                    $('#collapseinputbox').fadeIn();
                    $('#CollapseSearchTableList').fadeOut();
                    $scope.SetFocus('#ddlClass', true);
                    // )
                });
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
        collectionobj.StudentCode = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteAdmissionFormDetails', collectionobj);
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
        $scope.Redirect = 'Save and Redirect to Admission Fee Deposit'
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.IsSearchBoxDisabled = false;
        $scope.disabledDDLClass = true;
        try {
            $('.dropify-clear').click();
            $('#a1').click();
        }
        catch (err) {
            console.log(err.message)
        } 
        $scope.SearchBox = "";
        $scope.hfId = ""
        $scope.RegTransId = "";
        $scope.StudentID = ""
        $scope.AdmissionNo = ""
        $scope.AdmissionSourceType = undefined
        $scope.$parent.ClassCode = ""
        $scope.$parent.SectionCode = ""
        $scope.SessionId = ""
        $scope.BoardCode = ""
        $scope.RegNo = ""
        $scope.FirstName = ""
        $scope.MiddleName = ""
        $scope.LastName = ""
        $scope.DOB = ""
        $scope.PlaceOfBirth = ""
        $scope.AgeOnDate = ""
        $scope.Gender = ""
        $scope.StudentEmail = ""
        $scope.StudentContact = ""
        $scope.AadharCardNo = ""
        $scope.BloodGroup = ""
        $scope.DateOfJoining = ""
        $scope.DateOfAdmission = ""
        $scope.Nationality = ""
        $scope.Religion = ""
        $scope.Category = ""
        $scope.Caste = ""
        $scope.IsEws = ""
        $scope.IsSibling = ""
        $scope.IsTC = ""
        $scope.IsTransport = ""
        $scope.StreamCode = ""
        $scope.BranchCode = ""
        $scope.Medium = ""
        $scope.OptionalSubjectList = []
        $scope.MedicalHistory = ""
        $scope.Allergies = ""
        $scope.OtherMedicalInfo = ""
        $scope.FamilyDoctorPhone = ""
        $scope.FamilyDoctorAddress = ""
        $scope.DistanceFromHome = ""
        $scope.IsOnlyChild = ""
        $scope.GeneralDescription = ""
        $scope.DesignationCode = ""
        $scope.EmployeeCode = ""
        $scope.PreviousSchoolName = ""
        $scope.PreviousCity = ""
        $scope.PreviousClass = ""
        $scope.PreviousYear = ""
        $scope.PreviousBoard = ""
        $scope.Percentage = ""
        $scope.GuardianName = ""
        $scope.GuardianOccupationCode = ""
        $scope.GuardianDesignationCode = ""
        $scope.GuardianResidenceAddress
        $scope.GuardianOfficeAddress = ""
        $scope.GuardianEmail = ""
        $scope.GuardianAlternateEmail = ""
        $scope.GuardianDOB = ""
        $scope.GuardianMobile = ""
        $scope.GuardianPhone = ""
        $scope.GuardianCompanyName = ""
        $scope.GuardianBusinessDetails = ""
        $scope.GuardianQualification = ""
        $scope.GuardianServiceIn = ""
        $scope.GuardianOfficephone = ""
        $scope.GuardianOfficeMobile = ""
        $scope.GuardianOfficeExtension = ""
        $scope.GuardianOfficeEmail = ""
        $scope.GuardianOfficeWebsite = ""
        $scope.GuardianIncome = ""
        $scope.GuardianIsSingleParent = ""
        $scope.FatherName = ""
        $scope.FatherOccupationCode = ""
        $scope.FatherDesignationCode = ""
        $scope.FatherResidenceAddress = ""


        $scope.FCountryCode = "";
        $scope.FStateCode = "";
        $scope.FCityCode = "";

        $scope.FCityAreaCode = "";
        $scope.FSubArea = "";
        $scope.FPinCode = "";

        $scope.FatherOfficePhone = ""
        $scope.FatherOfficeAddress = ""
        $scope.FatherEmail = ""
        $scope.FatherDOB = ""
        $scope.FatherMobile = ""
        $scope.FatherPhone = ""
        $scope.FatherAnnualIncome = ""
        $scope.FatherCompanyName = ""
        $scope.FatherBusinessDetails = ""
        $scope.FatherQualification = ""
        $scope.FatherServiceIn = ""
        $scope.MotherName = ""
        $scope.MotherOccupationCode = ""
        $scope.MotherDesignationCode = ""
        $scope.MotherResidenceAddress = ""


        $scope.MCountryCode = "";
        $scope.MStateCode = "";
        $scope.MCityCode = "";

        $scope.MCityAreaCode = "";
        $scope.MSubArea = "";
        $scope.MPinCode = "";

        $scope.FCommAddress = false;
        $scope.MCommAddress = false;

        $scope.MotherPhone = ""
        $scope.MotherOfficeAddress = ""
        $scope.MotherEmail = ""
        $scope.AnniversaryDate = ""
        $scope.MotherDOB = ""
        $scope.MotherMobile = ""
        $scope.MotherAnnualIncome = ""
        $scope.MotherCompanyName = ""
        $scope.MotherBusinessDetails = ""
        $scope.MotherQualification = ""
        $scope.MotherServiceIn = ""
        $scope.SiblingClassCode = "";
        $scope.AnyOther = "";
        $scope.IsFinalStudent = "";
        $scope.ddlActiveParital = "1";
        $scope.FinalStudentList = [];
        $scope.SiblingStudentList = [];
        $scope.SetMaxMinDate().then(function (response) {
            $scope.DateOfAdmission = response;
            $scope.$applyAsync();
        });
        $scope.$applyAsync();
        $scope.SetFocus('#ddlClass');
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
        $scope.StudentList = [];
        $scope.started();
        return false;
    });

    $scope.PrintRecord = function () {
        //var tblheader =
        //    [
        //        { "HeaderText": "Sr.No.", "Value": "StudentCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
        //        { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //        { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //        { "HeaderText": "Branch", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //        { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //        { "HeaderText": "Medium", "HeaderValue": "Medium", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //        { "HeaderText": "Student", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //        { "HeaderText": "Date Of Birth", "HeaderValue": "DOB", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //        { "HeaderText": "Date Of Admission", "HeaderValue": "DateOfAdmission", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //        { "HeaderText": "Date Of Joining", "HeaderValue": "DateOfJoining", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //        { "HeaderText": "Father", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //        { "HeaderText": "Mobile", "HeaderValue": "FatherMobile", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //        { "HeaderText": "Mother", "HeaderValue": "MotherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
        //    ];

        //$scope.PrintMaster(tblheader, $scope.StudentList, window.document.title);
        $scope.Export('print');
    };
}











 