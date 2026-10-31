app.EmployeeRegistrationController = function ($scope, $element, $filter, myService) {
    $scope.disableDelete = true;
    $scope.SetFocus('#txtFirstName');
    $scope.SpecializationSubjectList = [];
    $scope.KRAList = [];
    $scope.EmployeeData = [];
    $scope.LeaveTypeIds = [];
    $scope.LeaveValues = [];

    $scope.CopyAddress = function () {
        if ($scope.chkAddress)
            $scope.employeeDetails.PermanentAddress = $scope.employeeDetails.PresentAddress
        else
            $scope.employeeDetails.PermanentAddress = "";
    }

    $scope.GetLeaveTypeMaster = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/AttendanceMasterApi/GetLeaveTypeMaster", collectionobj);
        getData.then(function (response) {
            $scope.LeaveTypeMasterList = response.data;
        });
    }

    $scope.GetSpecializationSubjectMaster = function () {
        var collectionobj = {};
        collectionobj.Action = 7;
        var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetDepartmentMaster', collectionobj);
        getData.then(function (response) {
            $scope.SpecializationSubjectList = response.data;
        });
    }
    $scope.GetKRAMaster = function () {
        var collectionobj = {};
        collectionobj.Action = 8;
        var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetDepartmentMaster', collectionobj);
        getData.then(function (response) {
            $scope.KRAList = response.data;
        });
    }

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
        var validatetab1 = isValidate($('#tab1'));
        if (validatetab1) {
            var validatetab2 = isValidate($('#tab2'));
            if (validatetab2) {
                $scope.EmployeeRegistartion();
            }
            else {
                $('#a2').click();
            }
        }
        else {
            $('#a1').click();
        }
    };

    $scope.EmployeeRegistartion = function () {
        if (isValidate()) {

            $scope.action = "";
            $scope.employeeDetails["Religion"] = $scope.Religion;
            $scope.employeeDetails["Nationality"] = $scope.Nationality;
            $scope.employeeDetails["Category"] = $scope.Category;
            $scope.employeeDetails["Caste"] = $scope.Caste;
            $scope.employeeDetails["DesignationCode"] = $scope.DesignationCode;
            $scope.employeeDetails["DepartmentCode"] = $scope.DepartmentCode;
            $scope.employeeDetails["GradeCode"] = $scope.GradeCode;
            $scope.employeeDetails["Gender"] = $scope.Gender;
            $scope.employeeDetails["MeritalStatus"] = $scope.MaritalStatus;
            $scope.employeeDetails["DateofAnniversary"] = moment($scope.employeeDetails.DateofAnniversary).format("DD-MMM-YYYY");
            $scope.employeeDetails["DateofBirth"] = moment($scope.employeeDetails.DateofBirth).format("DD-MMM-YYYY");

            $scope.employeeDetails["SessionId"] = sessionId;
            $scope.employeeDetails["FYId"] = fyId;
            $scope.employeeDetails["RelationshipId"] = relationshipId;
            $scope.employeeDetails["CreatedBy"] = JSON.parse(userid);
            $scope.employeeDetails["UpdatedBy"] = JSON.parse(userid);
            $scope.employeeDetails["IsActive"] = $scope.IsActive;
            
            $scope.employeeDetails["JoiningDate"] = moment($scope.employeeDetails.JoiningDate).format("DD-MMM-YYYY");
            $scope.employeeDetails["LeaveAllotedDate"] = moment($scope.LeaveAllotedDate).format("DD-MMM-YYYY");
            if (new Date($scope.LeaveAllotedDate) >= new Date($scope.employeeDetails.JoiningDate))
            {
                $scope.employeeDetails["LeaveTypeMasterList"] = JSON.stringify($scope.LeaveTypeMasterList);
                $scope.employeeDetails["EmpAllocation"] = $scope.EmpAllocation;
                $scope.employeeDetails["EmpType"] = $scope.EmpType;
                $scope.employeeDetails["SpecializationList"] = JSON.stringify($filter('filter')($scope.SpecializationSubjectList, { 'chk': true }));
                $scope.employeeDetails["KRAList"] = JSON.stringify($filter('filter')($scope.KRAList, { 'chk': true }));
                if ($scope.Save == 'Save')
                    $scope.action = 1;
                else
                    if ($scope.Save == 'Edit')
                        $scope.action = 2;

                $scope.employeeDetails["Action"] = $scope.action;
                $scope.employeeDetails["EmployeeCode"] = $scope.employeeDetails.EmployeeCode;

                $scope.employeeDetails["JobType"] = $scope.JobType;

                var getData = myService.methode('POST', '../Api/EmployeeMasterApi/InsertUpdateDeleteEmployeeRegistration', $scope.employeeDetails);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });

            }
            else
            {
                showMsgBox("Leave Alloted Date Can not be Less Than Date of Joining.");
            }
        }
    };

    $scope.SelectImage = function (input, imgsource, scope) {
        if (input.files && input.files[0]) {
            var filerdr = new FileReader();
            filerdr.onload = function (e) {
                $(imgsource).attr('src', e.target.result);
                $scope.employeeDetails[scope] = e.target.result;
            }
            filerdr.readAsDataURL(input.files[0]);
        };
    };

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        started();
    };

    function started() {
        $scope.disableDelete = false;
        $scope.showLoader();
        $scope.employeeDetails = {};
        $scope.employeeDetails["Action"] = 4;
        $scope.employeeDetails["RelationshipId"] = relationshipId;
        $scope.employeeDetails["SessionId"] = sessionId;
        var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetEmployeeList', $scope.employeeDetails);
        getData.then(function (response) {
            $scope.EmployeeData = response.data["Table"];

            var tblheader =
                [
                    {
                        "HeaderText": "Sr.No.", "Value": "EmployeeCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno"
                    },
                    //{ "HeaderText": "Employee Code", "HeaderValue": "EmployeeCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employee Id", "HeaderValue": "EmployeeId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employee Name", "HeaderValue": "FullName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Job Type", "HeaderValue": "JobType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Registration Id", "HeaderValue": "RegistrationId", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Joining Date", "HeaderValue": "JoiningDate", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "File No.", "HeaderValue": "FileNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Department", "HeaderValue": "Department", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Designation", "HeaderValue": "Designation", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Grade", "HeaderValue": "Grade", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Machine Id", "HeaderValue": "MachineId", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Reference", "HeaderValue": "Reference", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Display Name", "HeaderValue": "DisplayName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Birth Date", "HeaderValue": "DateofBirth", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Gender", "HeaderValue": "Gender", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Mother Name", "HeaderValue": "MotherName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Spouse Name", "HeaderValue": "SpouseName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Merital Status", "HeaderValue": "MeritalStatus", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Emergencey Contact No.", "HeaderValue": "EmergenceyContactNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Email", "HeaderValue": "Email", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Mobile No.", "HeaderValue": "ContactNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Aadhaar No.", "HeaderValue": "AadhaarNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "PanCard No.", "HeaderValue": "PanCardNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Anniversary Date", "HeaderValue": "DateofAnniversary", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Passport No.", "HeaderValue": "PassportNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Resignation Date", "HeaderValue": "DateofResignation", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Present Address", "HeaderValue": "PresentAddress", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Permanent Address", "HeaderValue": "PermanentAddress", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Religion", "HeaderValue": "Religion", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Nationality", "HeaderValue": "Nationality", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Category", "HeaderValue": "Category", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Caste", "HeaderValue": "Caste", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Height", "HeaderValue": "Height", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Weight", "HeaderValue": "Weight", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Blood Group", "HeaderValue": "BloodGroup", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Identification Mark", "HeaderValue": "IdentificationMark", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Hobbies", "HeaderValue": "Hobbies", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Languages Known", "HeaderValue": "LanguagesKnown", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Resigned", "HeaderValue": "IsResigned", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "EmployeePhotoPath", "HeaderValue": "EmployeePhotoPath", "Width": "100%", "ShowColumn": "No", "ImageColumn": "Yes" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            loadDataUsingPreDefinedColumn(tblheader, response.data["Table"], 'desc');

            $('#example tbody').on('dblclick', 'tr', function () {

                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();                
                $scope.EmployeeData = $filter('filter')($scope.EmployeeData, { EmployeeCode: $scope.hfId })

                $scope.employeeDetails =
                {
                    EmployeeCode: $scope.EmployeeData[0]["EmployeeCode"],
                    FirstName: $scope.EmployeeData[0]["FirstName"],
                    MiddelName: $scope.EmployeeData[0]["MiddelName"],
                    LastName: $scope.EmployeeData[0]["LastName"],
                    DisplayName: $scope.EmployeeData[0]["DisplayName"],
                    FatherName: $scope.EmployeeData[0]["FatherName"],
                    MotherName: $scope.EmployeeData[0]["MotherName"],
                    SpouseName: $scope.EmployeeData[0]["SpouseName"],
                    EmergenceyContactNo: $scope.EmployeeData[0]["EmergenceyContactNo"],
                    Email: $scope.EmployeeData[0]["Email"],
                    ContactNo: $scope.EmployeeData[0]["ContactNo"],
                    AadhaarNo: $scope.EmployeeData[0]["AadhaarNo"],
                    PanCardNo: $scope.EmployeeData[0]["PanCardNo"],
                    DateofAnniversary: new Date($scope.EmployeeData[0]["DateofAnniversary"]),
                    PassportNo: $scope.EmployeeData[0]["PassportNo"],
                    DateofResignation: new Date($scope.EmployeeData[0]["DateOfResignation"]),
                    PresentAddress: $scope.EmployeeData[0]["PresentAddress"],
                    PermanentAddress: $scope.EmployeeData[0]["PermanentAddress"],
                    Height: $scope.EmployeeData[0]["Height"],
                    Weight: $scope.EmployeeData[0]["Weight"],
                    BloodGroup: $scope.EmployeeData[0]["BloodGroup"],
                    IdentificationMark: $scope.EmployeeData[0]["IdentificationMark"],
                    Hobbies: $scope.EmployeeData[0]["Hobbies"],
                    LanguagesKnown: $scope.EmployeeData[0]["LanguagesKnown"],
                    EmployeePhotoPath: $scope.SetPhotoUrl($scope.EmployeeData[0]["EmployeePhotoPath"], '#imgEmployeePhoto', '#fuEmployeePhoto'),
                    JoiningDate: new Date($scope.EmployeeData[0]["JoiningDate"]),
                    FileNo: $scope.EmployeeData[0]["FileNo"],
                    MachineId: $scope.EmployeeData[0]["MachineId"],
                    Reference: $scope.EmployeeData[0]["Reference"],
                    DateofBirth: new Date($scope.EmployeeData[0]["DateofBirth"]),
                    IsResigned: $scope.EmployeeData[0]["IsResigned"] == 'Yes' ? 'True' : 'False',
                    ResignationDate: $scope.EmployeeData[0]["ResignationDate"],
                    ResignationRemak: $scope.EmployeeData[0]["ResignationRemak"],
                    ReferenceDesignation: $scope.EmployeeData[0]["ReferenceDesignation"],
                    ReferenceContactNo: $scope.EmployeeData[0]["ReferenceContactNo"],
                    ReferenceEmail: $scope.EmployeeData[0]["ReferenceEmail"],
                };

                //$scope.GetEmployeeType();
                $scope.GetSpecializationSubjectMaster();
                $scope.GetKRAMaster();
                $scope.Gender = $scope.EmployeeData[0]["Gender"];
                $scope.Religion = $scope.EmployeeData[0]["Religion"];
                $scope.Nationality = $scope.EmployeeData[0]["Nationality"];
                $scope.Category = $scope.EmployeeData[0]["Category"];
                $scope.Caste = $scope.EmployeeData[0]["Caste"];
                $scope.EmpAllocation = $scope.EmployeeData[0]["EmpAllocation"];
                $scope.EmpType = $scope.EmployeeData[0]["EmployeeType"];
                $scope.JobType = $scope.EmployeeData[0]["JobType"];

                $scope.LeaveAllotedDate = new Date($scope.EmployeeData[0]["LeaveAllotedDate"]);

                $scope.DepartmentCode = $scope.EmployeeData[0]["DepartmentCode"];
                $scope.DesignationCode = $scope.EmployeeData[0]["DesignationCode"];
                $scope.GradeCode = $scope.EmployeeData[0]["GradeCode"];
                $scope.MaritalStatus = $scope.EmployeeData[0]["MeritalStatus"];
                $scope.IsActive = $scope.EmployeeData[0]["IsActive"] == true ? 'true' : 'false';

                var collectionobj = {};
                collectionobj["EmployeeCode"] = $scope.hfId;
                collectionobj["Action"] = 6;
                collectionobj["RelationshipId"] = relationshipId;
                collectionobj["SessionId"] = sessionId;
                var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetEmployeeList', collectionobj);
                getData.then(function (response) {
                    $scope.LeaveTypeMasterList = response.data["Table"];
                    $scope.EmpKRAList = response.data["Table1"];
                    $scope.SubjectList = response.data["Table2"];

                    $.each($scope.SpecializationSubjectList, function (index, obj1) {
                        $.each($scope.SubjectList, function (index, obj) {
                            if (obj1.Name == obj.SpecializationSubject) {
                                obj1.chk = true;
                            }
                        });
                    });

                    $.each($scope.KRAList, function (index, obj3) {
                        $.each($scope.EmpKRAList, function (index, obj4) {
                            if (obj3.Name == obj4.KRAName) {
                                obj3.chk = true;
                            }
                        });
                    });
                });

                $scope.$applyAsync();
                $scope.hideLoader();
                $scope.SetFocus('#txtFirstName', true);


                $scope.SetIsResigned();

                $scope.Save = "Edit";
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
            });
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
        $scope.IsActive = "True";
        $scope.hfId = "";
        $scope.employeeDetails = {};

        $scope.chkAddress = false;
        $scope.Gender = "";
        $scope.Religion = "";
        $scope.Nationality = "";
        $scope.Category = "";
        $scope.Caste = "";
        $scope.DepartmentCode = "";
        $scope.DesignationCode = "";
        $scope.GradeCode = "";
        $scope.MaritalStatus = "";

        $scope.SetFocus('#txtFirstName', false);

        $('.dropify-clear').click();
        $('#a1').click();
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
        started();
        return false;
    });

    $scope.PrintRecord = function () {

        //var print = '<div class="col-lg-12">EmployeeId:' + $scope.EmployeeData[0]["EmployeeId"] + '</br>RegistrationId:' + $scope.EmployeeData[0]["RegistrationId"] + '</br>JoiningDate:' + $scope.EmployeeData[0]["JoiningDate"] + '</br>FileNo:' + $scope.EmployeeData[0]["FileNo"] + '</br>Department:' + $scope.EmployeeData[0]["Department"] + '</br>Designation:' + $scope.EmployeeData[0]["Designation"] + '</br>Grade:' + $scope.EmployeeData[0]["Grade"] + '</br>MachineId:' + $scope.EmployeeData[0]["MachineId"] + '</br>Reference:' + $scope.EmployeeData[0]["Reference"] + '</br>FirstName:' + $scope.EmployeeData[0]["FirstName"] + '</br>MiddelName:' + $scope.EmployeeData[0]["MiddelName"] + '</br>LastName:' + $scope.EmployeeData[0]["LastName"] + '</br>DisplayName:' + $scope.EmployeeData[0]["DisplayName"] + '</br>DateofBirth:' + $scope.EmployeeData[0]["DateofBirth"] + '</br>Gender:' + $scope.EmployeeData[0]["Gender"] + '</br>FatherName:' + $scope.EmployeeData[0]["FatherName"] + '</br>MotherName:' + $scope.EmployeeData[0]["MotherName"] + '</br>SpouseName:' + $scope.EmployeeData[0]["SpouseName"] + '</br>MeritalStatus:' + $scope.EmployeeData[0]["MeritalStatus"] + '</br>EmergenceyContactNo:' + $scope.EmployeeData[0]["EmergenceyContactNo"] + '</br>Email:' + $scope.EmployeeData[0]["Email"] + '</br>ContactNo:' + $scope.EmployeeData[0]["ContactNo"] + '</br>AadhaarNo:' + $scope.EmployeeData[0]["AadhaarNo"] + '</br>PanCardNo:' + $scope.EmployeeData[0]["PanCardNo"] + '</br>DateofAnniversary:' + $scope.EmployeeData[0]["DateofAnniversary"] + '</br>PassportNo:' + $scope.EmployeeData[0]["PassportNo"] + '</br>DateofResignation:' + $scope.EmployeeData[0]["DateofResignation"] + '</br>PresentAddress:' + $scope.EmployeeData[0]["PresentAddress"] + '</br>PermanentAddress:' + $scope.EmployeeData[0]["PermanentAddress"] + '</br>Religion:' + $scope.EmployeeData[0]["Religion"] + '</br>Nationality:' + $scope.EmployeeData[0]["Nationality"] + '</br>Category:' + $scope.EmployeeData[0]["Category"] + '</br>Caste:' + $scope.EmployeeData[0]["Caste"] + '</br>Height:' + $scope.EmployeeData[0]["Height"] + '</br>Weight:' + $scope.EmployeeData[0]["Weight"] + '</br>BloodGroup:' + $scope.EmployeeData[0]["BloodGroup"] + '</br>IdentificationMark:' + $scope.EmployeeData[0]["IdentificationMark"] + '</br>Hobbies:' + $scope.EmployeeData[0]["Hobbies"] + '</br>LanguagesKnown:' + $scope.EmployeeData[0]["LanguagesKnown"] + '</br>EmployeePhotoPath:' + $scope.EmployeeData[0]["EmployeePhotoPath"] + '</div>';

        //var print = '<div class="col-lg-12">EmployeeId:' +  + '</br>:' +  + '</br>JoiningDate:' +  + '</br>FileNo:' +  + '</br>Department:' +  + '</br>Designation:' +  + '</br>Grade:' +  + '</br>MachineId:' +  + '</br>Reference:' +  + '</br>FirstName:' +  + '</br>MiddelName:' +  + '</br>LastName:' +  + '</br>DisplayName:' + $scope.EmployeeData[0]["DisplayName"] + '</br>DateofBirth:' +  + '</br>Gender:' +  + '</br>FatherName:' +  + '</br>MotherName:' +  + '</br>SpouseName:' +  + '</br>MeritalStatus:' +  + '</br>EmergenceyContactNoEmergenceyContactNo:' +  + '</br>Email:' +  + '</br>ContactNo:' +  + '</br>AadhaarNo:' +  + '</br>PanCardNo:' +  + '</br>DateofAnniversary:' +  + '</br>PassportNo:' +  + '</br>DateofResignation:' + $scope.EmployeeData[0]["DateofResignation"] + '</br>PresentAddress:' +  + '</br>PermanentAddress:' +  + '</br>Religion:' +  + '</br>Nationality:' +  + '</br>Category:' +  + '</br>Caste:' +  + '</br>Height:' +  + '</br>Weight:' +  + '</br>BloodGroup:' +  + '</br>IdentificationMark:' +  + '</br>Hobbies:' +  + '</br>LanguagesKnown:' +  + '</br>EmployeePhotoPath:' +  + '</div>';
        //alert($scope.EmployeeData[0]["FirstName"])
        //alert($scope.EmployeeData[0]["MiddelName"])
        //alert($scope.EmployeeData[0]["LastName"])

        var print = '<table class="table p-table-0 "><tbody><tr><td class="l-side-bg-n" width="30%"><div class="student-box"><div class="profile-cover-pic"><div class="profile-image-overlay"></div></div><div class="profile-info "><div class="profile-img-wrap img-circle"> <img class="inline-block mb-10 img-circle" src=' + $scope.EmployeeData[0]["EmployeePhotoPath"] + ' alt="user"></div><div class="stu-detail-box text-center"><h5 class="block stu-pr-name ">' + $scope.EmployeeData[0]["FirstName"] + ' ' + $scope.EmployeeData[0]["MiddelName"] + ' ' + $scope.EmployeeData[0]["LastName"] + '</h5><h6 class="block stu-code pb-10">Department <br /> <span>(&nbsp;' + $scope.EmployeeData[0]["Department"] + '&nbsp;)</span></h6><h6 class="stu-id">Designation <br /> <span>[&nbsp;' + $scope.EmployeeData[0]["Designation"] + '&nbsp;]</span></h6></div></div><div class="break-section clearfix text-center"><div class="icon-box "><div class="icon-code"><div> <i class="icofont-baby"></i></div></div><div class="break-title">Date of Birth</div></div><div class="box-detail">' + $scope.EmployeeData[0]["DateofBirth"] + '</div></div><div class="break-section clearfix text-center"><div class="icon-box "><div class="icon-code"><div> <i class="icofont-group-students"></i></div></div><div class="break-title">Gender</div></div><div class="box-detail">' + $scope.EmployeeData[0]["Gender"] + '</div></div><div class="break-section clearfix text-center"><div class="icon-box "><div class="icon-code"><div> <i class="icofont-flag"></i></div></div><div class="break-title">Nationality</div></div><div class="box-detail">' + $scope.EmployeeData[0]["Nationality"] + '</div></div><div class="break-section clearfix text-center"><div class="icon-box "><div class="icon-code"><div> <i class="icofont-hand"></i></div></div><div class="break-title">Religion</div></div><div class="box-detail">' + $scope.EmployeeData[0]["Religion"] + '</div></div><div class="break-section clearfix text-center"><div class="icon-box "><div class="icon-code"><div class="f-s-13"> <i class="icofont-brand-microsoft"></i></div></div><div class="break-title">Category</div></div><div class="box-detail">' + $scope.EmployeeData[0]["Category"] + '</div></div><div class="break-section clearfix text-center"><div class="icon-box "><div class="icon-code"><div> <i class="icofont-bullhorn"></i></div></div><div class="break-title">Caste</div></div><div class="box-detail">' + $scope.EmployeeData[0]["Caste"] + '</div></div></div></td><td class="tab-in-lp">' + $scope.PrintMasterHeader().html() + ' <table class="table p-table"><tr><td colspan="3" class="no-b"><div class="break-section2 clearfix text-center"><div class="icon-box "><div class="icon-code"><div> <i class="icofont-data"></i></div></div><div class="break-title">Employee Details</div></div></div></td></tr><tr><td width="33.33%"><div class="break-title2">Employee ID</div><div class="box-detail2">' + $scope.EmployeeData[0]["EmployeeId"] + '</div></td><td><div class="break-title2">Registration Id</div><div class="box-detail2">' + $scope.EmployeeData[0]["RegistrationId"] + '</div></td><td width="33.33%"><div class="break-title2">Machine ID</div><div class="box-detail2">' + $scope.EmployeeData[0]["MachineId"] + '</div></td></tr><tr><td width="33.33%"><div class="break-title2">Date Of Joining</div><div class="box-detail2">' + $scope.EmployeeData[0]["JoiningDate"] + '</div></td><td width="33.33%"><div class="break-title2">Grade</div><div class="box-detail2">' + $scope.EmployeeData[0]["Grade"] + '</div></td><td><div class="break-title2">File No.</div><div class="box-detail2">' + $scope.EmployeeData[0]["FileNo"] + '</div></td></tr><tr><td colspan="3"><div class="break-title2">Reference</div><div class="box-detail2">' + $scope.EmployeeData[0]["Reference"] + '</div></td></tr><tr><td colspan="3" class="no-b"><div class="break-section2 clearfix text-center"><div class="icon-box "><div class="icon-code"><div> <i class="icofont-users-alt-5"></i></div></div><div class="break-title">Family Details</div></div></div></td></tr><tr><td width="33.33%"><div class="break-title2">Father Name</div><div class="box-detail2">' + $scope.EmployeeData[0]["FatherName"] + '</div></td><td width="33.33%"><div class="break-title2">Mother Name</div><div class="box-detail2">' + $scope.EmployeeData[0]["MotherName"] + '</div></td><td><div class="break-title2">Spouse Name</div><div class="box-detail2">' + $scope.EmployeeData[0]["SpouseName"] + '</div></td></tr><tr><td><div class="break-title2">Marital Status</div><div class="box-detail2">' + $scope.EmployeeData[0]["MeritalStatus"] + '</div></td><td colspan="2"><div class="break-title2">Date of Anniversary</div><div class="box-detail2">' + $scope.EmployeeData[0]["DateofAnniversary"] + '</div></td></tr><tr><td colspan="3" class="no-b"><div class="break-section2 clearfix text-center"><div class="icon-box "><div class="icon-code"><div> <i class="icofont-info"></i></div></div><div class="break-title">Identity Details</div></div></div></td></tr><tr><td width="33.33%"><div class="break-title2">Aadhaar No.</div><div class="box-detail2">' + $scope.EmployeeData[0]["AadhaarNo"] + '</div></td><td width="33.33%"><div class="break-title2">PanCard No.</div><div class="box-detail2">' + $scope.EmployeeData[0]["PanCardNo"] + '</div></td><td><div class="break-title2">Passport No.</div><div class="box-detail2">' + $scope.EmployeeData[0]["PassportNo"] + '</div></td></tr><tr><td><div class="break-title2">Height</div><div class="box-detail2">' + $scope.EmployeeData[0]["Height"] + '</div></td><td><div class="break-title2">Weight</div><div class="box-detail2">' + $scope.EmployeeData[0]["Weight"] + '</div></td><td><div class="break-title2">Blood Group</div><div class="box-detail2">' + $scope.EmployeeData[0]["BloodGroup"] + '</div></td></tr><tr><td><div class="break-title2">Identification Mark</div><div class="box-detail2">' + $scope.EmployeeData[0]["IdentificationMark"] + '</div></td><td><div class="break-title2">Hobbies</div><div class="box-detail2">' + $scope.EmployeeData[0]["Hobbies"] + '</div></td><td><div class="break-title2">Languages Known</div><div class="box-detail2">' + $scope.EmployeeData[0]["LanguagesKnown"] + '</div></td></tr><tr><td colspan="3" class="no-b"><div class="break-section2 clearfix text-center"><div class="icon-box "><div class="icon-code"><div> <i class="icofont-contacts"></i></div></div><div class="break-title">Contact Details</div></div></div></td></tr><tr><td><div class="break-title2">Contact No.</div><div class="box-detail2">' + $scope.EmployeeData[0]["ContactNo"] + '</div></td><td colspan="2"><div class="break-title2">Emergencey Contact No.</div><div class="box-detail2">' + $scope.EmployeeData[0]["EmergenceyContactNo"] + '</div></td></tr><tr><td colspan="3"><div class="break-title2">Email ID</div><div class="box-detail2">' + $scope.EmployeeData[0]["Email"] + '</div></td></tr><tr><td colspan="3"><div class="break-title2">Present Address</div><div class="box-detail2">' + $scope.EmployeeData[0]["PresentAddress"] + '</div></td></tr><tr><td colspan="3"><div class="break-title2">Permanent Address</div><div class="box-detail2">' + $scope.EmployeeData[0]["PermanentAddress"] + '</div></td></tr></table></td></tr></tbody></table>';

        $scope.PrintForm(print);
    };
    $scope.SetIsResigned = function () {
        if ($scope.employeeDetails.IsResigned == "True") {
            $scope.TargetDate = false;
            $scope.TargetRemark = false;
        }
        else {
            $scope.TargetDate = true;
            $scope.TargetRemark = true;
        }
    }

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    }

    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.EmployeeCode = $scope.hfId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        collectionobj.JoiningDate = null;
        collectionobj.DateofBirth = null;
        var getData = myService.methode('POST', "../Api/EmployeeMasterApi/InsertUpdateDeleteEmployeeRegistration", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
};