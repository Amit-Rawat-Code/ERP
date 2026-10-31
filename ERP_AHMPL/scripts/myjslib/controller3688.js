app.controller3688 = function ($scope, $element, $sce, $filter, $timeout, myService) {
    $scope.alertJS = function (value) {
        alert(value);
    }

    $scope.Replace = function (value) {
        if (value == null) return "";
        var str = value.split('$');
        var returnstring = "";
        var para = $('<p></p>');
        for (var i = "0"; i < str.length; i++) {
            para.append('<p>' + str[i] + '</p>');
        }
        return $scope.trustAsHtml(para.html());
    };

    $scope.GetReportHeaderUsingCategory = function (reportcategoryname)
    {
        debugger
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.ReportCategoryName = reportcategoryname;

        var getData = myService.methode('POST', "../GblMasterApi/GetReportHeader",collectionobj);
        getData.then(function (response)
        {
            if (response.data.length > 0)
                $scope.ReportHeader = $sce.trustAsHtml(response.data[0].HeaderHtml);

        });
    }
    $scope.GetACCode = function () {
        //
        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.FYId = fyId;

        var getData = myService.methode('POST', "../Fee/SelectFeeAccountDetails", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.ACCodes = response.data;
        });
    }

    $scope.GetReportCategory = function () {
        //
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 1;
        $scope.collectionobj["BranchCode"] = branchCode;
        $scope.collectionobj["SchoolCode"] = schoolCode;
        $scope.collectionobj["SessionId"] = sessionId;
        var getData = myService.methode('POST', '../Administrator/GetReportCategory', '{obj:' + JSON.stringify($scope.collectionobj) + '}');
        getData.then(function (response) {
            $scope.ReportCategoryList = response.data
        });
    };

    $scope.LeaveTypeMasterList = function () {
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["BranchCode"] = branchCode;
        $scope.collectionobj["SchoolCode"] = schoolCode;
        $scope.collectionobj["SessionId"] = sessionId;
        var getData = myService.methode('POST', '../Attendance/LeaveTypeMasterList', '{obj:' + JSON.stringify($scope.collectionobj) + '}');
        getData.then(function (response) {
            $scope.LeaveTypeList = response.data
            $scope.PrevLeaveTypeList = response.data
        });
    };

    $scope.GetOptionalSubjectList = function (studentCode, focusctrl) {
        $scope.collectionobj = {};
        $scope.collectionobj["StudentCode"] = '-1';

        if (studentCode == null) {
            if (typeof ($scope.studentDetails.ClassId) === 'undefined') return;
            if (typeof ($scope.studentDetails.SectionId) === 'undefined') return;
            if (typeof ($scope.studentDetails.BranchId) === 'undefined') return;
            if (typeof ($scope.studentDetails.StreamId) === 'undefined') return;
        }
        else {
            $scope.collectionobj["StudentCode"] = studentCode;
        }

        $scope.collectionobj["ClassId"] = $scope.studentDetails.ClassId;
        $scope.collectionobj["SectionId"] = $scope.studentDetails.SectionId;
        $scope.collectionobj["BranchId"] = $scope.studentDetails.BranchId;
        $scope.collectionobj["StreamId"] = $scope.studentDetails.StreamId;

        $scope.collectionobj["SchoolCode"] = schoolCode;
        $scope.collectionobj["BranchCode"] = branchCode;
        $scope.collectionobj["SessionId"] = sessionId;

        var getData = myService.methode('POST', "../TimeTable/GetOptionalSubjectList", '{obj:' + JSON.stringify($scope.collectionobj) + '}');
        getData.then(function (response) {

            $scope.OptionalSubjectList = response.data;
            $scope.hideLoader();
            if (focusctrl != null)
                $scope.SetFocus(focusctrl, true)
            $scope.$applyAsync();
        });
    };

    $scope.GetAllEmployee = function () {


        var flag1 = "0";
        var flag2 = "0";
        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 4;
        $scope.collectionobj["SchoolCode"] = schoolCode;
        $scope.collectionobj["BranchCode"] = branchCode;
        $scope.collectionobj["SessionId"] = sessionId;
        $scope.collectionobj["LoginId"] = userid;
        $scope.collectionobj["IsResigned"] = false;
        if (typeof ($scope.DesignationType) === 'undefined') {
            flag1 = 1;
        }
        if (flag1 == 0) {
            $scope.collectionobj["DesignationType"] = $scope.DesignationType;
        }
        if (typeof ($scope.EmployeeCode) === 'undefined') {
            flag2 = 1;
        }
        if (flag2 == 0) {
            $scope.collectionobj["EmployeeCode"] = $scope.EmployeeCode;
        }
        var getData = myService.methode('POST', "../Employee/GetEmployeeListUsingDesignationType", '{obj:' + JSON.stringify($scope.collectionobj) + '}');
        getData.then(function (response) {
            $scope.EmployeeList = response.data
        });
    };

    $scope.GetEmployeeDetails = function (employeeCode) {

        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 5;
        $scope.collectionobj["EmployeeCode"] = employeeCode;
        $scope.collectionobj["SchoolCode"] = schoolCode;
        $scope.collectionobj["BranchCode"] = branchCode;
        $scope.collectionobj["SessionId"] = sessionId;

        var getData = myService.methode('POST', "../Employee/EditEmployeeRegistration", '{obj:' + JSON.stringify($scope.collectionobj) + '}');
        getData.then(function (response) {

            $scope.EmployeeDetails = JSON.parse(response.data);
        });
    };

    $scope.GetModules = function () {

        var collectionobj = {};
        collectionobj["ModuleId"] = $scope.ModuleId;
        collectionobj["SessionId"] = sessionId;
        collectionobj["BranchCode"] = branchCode;
        collectionobj["SchoolCode"] = schoolCode;
        collectionobj["LoginId"] = JSON.parse(userid);

        var getData = myService.methode('POST', '../Administrator/ModuleList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.ModuleList = response.data
        });
    };

    
    $scope.GetBranchStreambyClassId = function (ClassId) {
        
        var collectionobj = {};
        collectionobj["Action"] = 9;
        collectionobj["Classid"] = ClassId; 
        collectionobj["SessionId"] = sessionId;
        collectionobj["BranchCode"] = branchCode;
        collectionobj["SchoolCode"] = schoolCode;
        collectionobj["FYId"] = fyId;
        var getData = myService.methode('POST', '../Administrator/GetBranchStreambyClassId', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.Branchs = response.data.Table;
            $scope.Streams = response.data.Table1;
        });
    };


    $scope.BindAgeonDate = function () {
        return new Date();
    };

    $scope.GetCourses = function () {
        myService.getCourses().then(function (response) {
            $scope.Courses = response.data
        });
    };

    $scope.GetBranchs = function () {
        myService.getBranchs().then(function (response) {
            $scope.Branchs = response.data
        });
    };

    $scope.GetClasses = function (courseid) {
        myService.getClasses(courseid).then(function (response) {
            $scope.Classes = response.data
        });
    };

    $scope.GetOccupation = function (occupationId) {
        
        if (occupationId == 1) {
            myService.getOccupation(occupationId).then(function (response) {
                $scope.FOccupations = response.data
            });
        }
        else {
            myService.getOccupation(occupationId).then(function (response) {
                $scope.MOccupations = response.data
            });
        }

    };

    $scope.GetShifts = function () {

        myService.getShifts().then(function (response) {
            $scope.Shifts = response.data
        });
    };

    $scope.GetTitleList = function () {

        var collectionobj = {};
        collectionobj["PeriodId"] = "-1";
        collectionobj["SessionId"] = sessionId;
        collectionobj["BranchCode"] = branchCode;
        collectionobj["SchoolCode"] = schoolCode;

        var getData = myService.methode('POST', '../TimeTable/SelectTimeTableDateWise', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.TitleList = response.data
        });
    };

    $scope.GetPeriods = function () {
        var periodMaster = {};
        periodMaster["PeriodId"] = "-1";
        periodMaster["SessionId"] = sessionId;
        periodMaster["BranchCode"] = branchCode;
        periodMaster["SchoolCode"] = schoolCode;

        var getData = myService.methode('POST', '../TimeTable/PeriodMasterList', '{obj:' + JSON.stringify(periodMaster) + '}');
        getData.then(function (response) {
            $scope.Periods = response.data
        });
    };

    $scope.GetStreams = function () {
        myService.getStreams().then(function (response) {
            $scope.Streams = response.data
        });
    };

    $scope.GetMediums = function () {
        myService.getMediums().then(function (response) {
            $scope.Mediums = response.data
            if ($scope.Mediums.length==1)
            $scope.studentDetails.MediumId = $scope.Mediums[0].MediumId
        });
    };

    $scope.GetHouses = function () {
        myService.getHouses().then(function (response) {
            $scope.Houses = response.data
        });
    };

    $scope.GetBoards = function () {
        myService.getBoards().then(function (response) {
            $scope.Boards = response.data
            if ($scope.Boards.length==1)
            $scope.studentDetails.BoardUniversity = $scope.Boards[0].BoardId
        });
    };

    $scope.GetNationalities = function (nationaltyobj) {
        myService.getNationalities().then(function (response) {
            if (nationaltyobj == 'F')
                $scope.FatherNationalities = response.data
            else if (nationaltyobj == 'M')
                $scope.MotherNationalities = response.data
            else
                $scope.Nationalities = response.data
        });
    };

    $scope.GetReligions = function () {
        myService.getReligions().then(function (response) {
            $scope.Religions = response.data
        });
    };

    $scope.GetCategories = function () {
        myService.getCategories().then(function (response) {
            $scope.Categories = response.data
            if ($scope.Categories.length == 1)
                $scope.CountryId = $scope.Categories[0].CountryId
        });
    };

    $scope.GetCountries = function (countryobj) {

        myService.getCountries().then(function (response) {
            //
            if (countryobj == 'P') {
                $scope.ParmanentCountries = response.data
                if ($scope.ParmanentCountries.length == 1) {
                    $scope.studentDetails.GuardianCountryId = $scope.ParmanentCountries[0].CountryId
                    $scope.GetStates($scope.studentDetails.GuardianCountryId, 'P');
                }
            }
            else if (countryobj == 'L') {
                $scope.LocalCountries = response.data
                if ($scope.LocalCountries.length == 1) {
                    $scope.studentDetails.LocalCountryId = $scope.LocalCountries[0].CountryId
                    $scope.GetStates($scope.studentDetails.LocalCountryId, 'L');
                }
            }
            else {
                $scope.GuardianCountries = response.data
                if ($scope.GuardianCountries.length == 1) {
                    $scope.studentDetails.ParmanentCountryId = $scope.GuardianCountries[0].CountryId
                    $scope.GetStates($scope.studentDetails.ParmanentCountryId, 'G');
                }
            }            
        });
    };

    $scope.GetSection = function (classid, modelList) {
        if (classid != null) {
            var getData = myService.getSections(classid);
            getData.then(function (response) {
                if (modelList==null)
                    $scope.Sections = response.data
                else
                    $scope[modelList] = response.data
            });
        }
    };

    $scope.GetCaste = function (categoryid) {
        var getData = myService.getCaste(categoryid);
        getData.then(function (response) {
            $scope.Caste = response.data
        });
    };

    $scope.GetStates = function (countryid, stateobj) {
        var getData = myService.getStates(countryid);
        getData.then(function (response) {
            if (stateobj == 'P') {
                $scope.ParmanentStates = response.data
                if ($scope.ParmanentStates.length == 1) {
                    $scope.studentDetails.ParmanentStateId = $scope.ParmanentStates[0].StateId
                    $scope.GetCities($scope.studentDetails.ParmanentStateId, 'P');
                }
            }
            else if (stateobj == 'L') {
                $scope.LocalStates = response.data
                if ($scope.LocalStates.length == 1) {
                    $scope.studentDetails.LocalStateId = $scope.LocalStates[0].StateId
                    $scope.GetCities($scope.studentDetails.LocalStateId, 'L');
                }
            }
            else {
                $scope.GuardianStates = response.data
                if ($scope.GuardianStates.length == 1) {
                    $scope.studentDetails.GuardianStateId = $scope.GuardianStates[0].StateId
                    $scope.GetCities($scope.studentDetails.GuardianStateId, 'G');
                }
            }
                
        });
    };

    $scope.GetCities = function (stateid, cityobj) {
        var getData = myService.getCities(stateid);
        getData.then(function (response) {
            if (cityobj == 'P'){
                $scope.ParmanentCities = response.data
                if ($scope.ParmanentCities.length == 1) {
                    $scope.studentDetails.ParmanentCityId = $scope.ParmanentCities[0].CityId
                }
            }                
            else if (cityobj == 'L'){
                $scope.LocalCities = response.data
                if ($scope.LocalCities.length == 1) {
                    $scope.studentDetails.LocalCityId = $scope.LocalCities[0].CityId
                }
            }                
            else {
                $scope.GuardianCities = response.data
                if ($scope.GuardianCities.length == 1) {
                    $scope.studentDetails.GuardianCityId = $scope.GuardianCities[0].CityId
                }
            }              

            $scope.hideLoader();
        });
    };

    $scope.GetCitieAreas = function (cityid) {
        var getData = myService.getCitieAreas(cityid);
        getData.then(function (response) {
            $scope.CityAreaList = response.data
            $scope.hideLoader();
        });
    };

    $scope.GetEnquirySources = function () {
        var getData = myService.getEnquirySources();
        getData.then(function (response) {
            $scope.EnquirySourceList = response.data
            $scope.hideLoader();
        });
    };

    $scope.FillDDLDepartmentList = function () {
        $scope.Department = {};
        $scope.Department["Action"] = 4;
        $scope.Department["BranchCode"] = branchCode;
        $scope.Department["SchoolCode"] = schoolCode;
        $scope.Department["SessionId"] = sessionId;
        var getData = myService.methode('POST', '../Employee/DepartmentMaster', '{obj:' + JSON.stringify($scope.Department) + '}');
        getData.then(function (response) {
            $scope.Departments = response.data;
        });
    };

    $scope.FillDDLDesignationList = function () {
        $scope.Designation = {};
        $scope.Designation["Action"] = 4;
        $scope.Designation["BranchCode"] = branchCode;
        $scope.Designation["SchoolCode"] = schoolCode;
        $scope.Designation["SessionId"] = sessionId;
        var getData = myService.methode('POST', '../Employee/DesignationMaster', '{obj:' + JSON.stringify($scope.Designation) + '}');
        getData.then(function (response) {
            $scope.Designations = response.data;
        });
    };

    $scope.FillDesignationTypeList = function () {
        var collectionobj = {};
        collectionobj["BranchCode"] = branchCode;
        collectionobj["SchoolCode"] = schoolCode;
        collectionobj["SessionId"] = sessionId;
        var getData = myService.methode('POST', '../Employee/DesignationType', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.DesignationTypeList = response.data;
        });
    };

    $scope.FillDDLGradeList = function () {
        $scope.Grade = {};
        $scope.Grade["Action"] = 4;
        $scope.Grade["BranchCode"] = branchCode;
        $scope.Grade["SchoolCode"] = schoolCode;
        $scope.Grade["SessionId"] = sessionId;
        var getData = myService.methode('POST', '../Employee/GradeMaster', '{obj:' + JSON.stringify($scope.Grade) + '}');
        getData.then(function (response) {
            $scope.Grades = response.data;
        });
    };
    $scope.FatherOccupation = function () {
        $scope.Occupation = {};
        $scope.Occupation["Action"] = 6;
        $scope.Occupation["OccupationType"] = OccupationType;
        $scope.Occupation["BranchCode"] = branchCode;
        $scope.Occupation["SchoolCode"] = schoolCode;
        $scope.Occupation["SessionId"] = sessionId;
        var getData = myService.methode('POST', '../Employee/OccupationMasterTypeWise', '{obj:' + JSON.stringify($scope.Occupation) + '}');
        getData.then(function (response) {
            $scope.GetFatherOccupation = response.data;
        });
    };
    $scope.CopyAddress = function (countryobj) {
        $scope.showLoader();
        if (countryobj == 'L') {
            if ($scope.chk1) {
                $scope.studentDetails.LocalCountryId = $scope.studentDetails.ParmanentCountryId

                $scope.GetStates($scope.studentDetails.ParmanentCountryId, 'L');
                $scope.studentDetails.LocalStateId = $scope.studentDetails.ParmanentStateId

                $scope.GetCities($scope.studentDetails.LocalStateId, 'L');
                $scope.studentDetails.LocalCityId = $scope.studentDetails.ParmanentCityId;

                $scope.studentDetails.LocalAddress = $scope.studentDetails.ParmanentAddress;
                $scope.studentDetails.LocalPinCode = $scope.studentDetails.ParmanentPinCode;
            }
            else {
                $scope.studentDetails.LocalCountryId = "";
                $scope.studentDetails.LocalStateId = "";
                $scope.studentDetails.LocalCityId = "";
                $scope.studentDetails.LocalAddress = "";
                $scope.studentDetails.LocalPinCode = "";

                $scope.hideLoader();
            }
        }
        else {
            if ($scope.chk2) {
                $scope.studentDetails.GuardianName = $scope.studentDetails.FatherName
                $scope.studentDetails.Relationship = "Father"
                $scope.studentDetails.GuardianEmail = $scope.studentDetails.FatherEmail
                $scope.studentDetails.GuardianContactNo = $scope.studentDetails.FatherContactNo

                $scope.studentDetails.GuardianCountryId = $scope.studentDetails.ParmanentCountryId

                $scope.GetStates($scope.studentDetails.ParmanentCountryId, 'G');
                $scope.studentDetails.GuardianStateId = $scope.studentDetails.ParmanentStateId

                $scope.GetCities($scope.studentDetails.GuardianStateId, 'G');
                $scope.studentDetails.GuardianCityId = $scope.studentDetails.ParmanentCityId

                $scope.studentDetails.GuardianAddress = $scope.studentDetails.ParmanentAddress
                $scope.studentDetails.GuardianPinCode = $scope.studentDetails.ParmanentPinCode
            }
            else {
                $scope.studentDetails.GuardianName = "";
                $scope.studentDetails.Relationship = "";
                $scope.studentDetails.GuardianEmail = "";
                $scope.studentDetails.GuardianContactNo = "";
                $scope.studentDetails.GuardianCountryId = "";
                $scope.studentDetails.GuardianStateId = "";
                $scope.studentDetails.GuardianCityId = "";
                $scope.studentDetails.GuardianAddress = "";
                $scope.studentDetails.GuardianPinCode = "";

                $scope.hideLoader();
            }
        }
    };

    $scope.SelectCaste = function (categoryId, selectCasteId) {
        $scope.GetCaste(categoryId);
        return selectCasteId;
    };

    $scope.SelectState = function (countryId, obj, selectStateId) {
        $scope.GetStates(countryId, obj)
        return selectStateId;
    };

    $scope.SelectCity = function (stateId, obj, selectCityId) {
        $scope.GetCities(stateId, obj)
        return selectCityId;
    };

    $scope.SelectClass = function (courseId, selectClassId) {
        $scope.GetClasses(courseId)
        return selectClassId;
    };

    $scope.SelectOccupation = function (occupationId) {
        //
        $scope.GetOccupation(occupationId)
        return selectFOccupationId;
    };

    $scope.SelectSection = function (classId, selectSectionId) {
        $scope.GetSection(classId)
        return selectSectionId;
    };

    $scope.SetPhotoUrl = function (photoPath, photoId, inputfileid) {
        try {
            if (photoPath != null) {
                if (inputfileid != null) {
                    ResetImage(photoPath, inputfileid);
                };

                $(photoId).attr("src", photoPath + '?date=' + new Date());
            }
            else {
                ResetImage("", inputfileid);
                $(photoId).removeAttr("src");
            }
        }
        catch (ex) {
            console.log(ex.message);
        }
        //

        return photoPath;
    }

    $scope.GetSubjectGroup = function () {
        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', "../Administrator/SubjectGroupMasterList", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.SubjectGroups = response.data;
        })
    };

    $scope.$watch('SubjectGroupId', function () {

        if (typeof ($scope.SubjectGroupId) === 'undefined') return;
        if ($('#ddlSubject') === 'undefined') return;
        $scope.GetSubject();
    });

    $scope.GetSubject = function () {

        var collectionobj = {};
        collectionobj.SubjectGroupId = $scope.SubjectGroupId;
        collectionobj.SessionId = sessionId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;

        var getData = myService.methode('POST', "../Administrator/SubjectMasterList", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.Subjects = response.data;
        })
    };

    $scope.showLoader = function () {
        $('#cover-spin').show(0);
    };

    $scope.hideLoader = function () {
        $('#cover-spin').hide();
    };

    $scope.loadData = function (data, showColumn, imageColumn) {

        var tblHeaders = [{ "Header": "", "Width": "40px" }];
        if (JSON.stringify(data).length > 2) {
            var tblHeaders = [{ "Header": "Sr.No.", "Width": "50px", "CssClass": "srno" }];
            $.each(data[0], function (key, val) {
                tblHeaders.push({ "Header": key, "Width": "100%" });
            });
        }

        $scope.tblHeaders = tblHeaders;
        var tblRows = [];
        if (JSON.stringify(data).length > 2) {
            $.each(data, function (i, obj) {
                var rowObj = { "Id": "" };
                $.each(obj, function (key, val) {
                    rowObj[key] = val;
                });

                tblRows.push(rowObj);
            });

            loadDataTableForLargeAmountData(tblHeaders, tblRows, showColumn, imageColumn);
        }
        else {
            var rowObj = { "": "Sorry No Record's Found!" };
            tblRows.push(rowObj);

            loadDataTable(tblHeaders, tblRows, [0]);
        }
    };

    $scope.GetVehicleTypes = function () {
        myService.getvehicletypes().then(function (response) {
            $scope.VehiclesTypes = response.data
        });
    };

    $scope.GetVehicleOwners = function () {
        myService.getvehicleowners().then(function (response) {
            $scope.VechilesOwners = response.data
        });
    };

    $scope.GetRouteTypes = function () {
        myService.getroutetypes().then(function (response) {
            $scope.RoutesTypes = response.data
        });
    };

    $scope.GetStopages = function () {
        myService.getstopages().then(function (response) {
            $scope.Stoppages = response.data
        });
    };

    $scope.GetRouteDirections = function () {
        myService.getroutedirections().then(function (response) {
            $scope.RoutesDirections = response.data
        });
    };

    $scope.GetVehicles = function () {
        myService.getvehicles().then(function (response) {
            $scope.Vehicles = response.data
        });
    };

    $scope.GetRoutes = function () {
        myService.getroutes().then(function (response) {
            $scope.Routes = response.data
        });
    };

    $scope.GetRouteVehicleMappings = function () {
        myService.getroutevehiclemappings().then(function (response) {
            $scope.Mappings = response.data
        });
    };

    $scope.GetStudents = function (clsid, secid) {
        //
        myService.getstudents(clsid, secid).then(function (response) {
            $scope.Students = response.data
        });
    };

    $scope.GetRouteWiseStoppages = function (rteid) {
        myService.getroutewisestoppages(rteid).then(function (response) {
            $scope.RStoppages = response.data
        });
    };

    $scope.GetVehicleWiseRoutes = function (vehid) {
        myService.getvehiclewiseroutes(vehid).then(function (response) {
            $scope.RRoutes = response.data
        });
    };

    $scope.GetTripDistanceFare = function (rteid, stpid, trpmde) {
        myService.gettripdistancefare(rteid, stpid, trpmde).then(function (response) {
            if (response.data[0]["Distance"] === null)
            { $scope.TripDistance = "0"; }
            else
            { $scope.TripDistance = response.data[0]["Distance"]; }

            if (response.data[0]["TripFare"] === null)
            { $scope.TripFare = "0"; }
            else
            { $scope.TripFare = response.data[0]["TripFare"]; }
        });
    };

    $scope.GetContentTypes = function () {
        myService.getcontenttypes().then(function (response) {
            $scope.ContentsTypes = response.data
        });
    };
    $scope.GetContentNodes = function (contenttypeid) {
        myService.getcontentnodes(contenttypeid).then(function (response) {
            $scope.ContentsNodes = response.data
        });
    };
    $scope.GetContentBodys = function () {
        myService.getcontentbodys().then(function (response) {
            $scope.ContentsBodys = response.data
        });
    };
    $scope.GetMasterAPIs = function () {
        myService.getmasterapis().then(function (response) {
            $scope.MasterAPIs = response.data
        });
    };
    $scope.GetMailServers = function () {
        myService.getmailservers().then(function (response) {
            $scope.MailServers = response.data
        });
    };

    $scope.checkReType = function () {
        //
        if ($('#txtNewPasscode').val() == $('#txtReTypePasscode').val()) {
            $('#txtReTypePasscode').attr('style', 'box-shadow: 0px 1px #70c126;')
            chk = true;
        }
        else {
            $('#txtReTypePasscode').attr('style', 'box-shadow: 0px 1px #ea1313;')
            chk = false;
        }
    }
    var chk = '';
    $scope.ChangePassword = function () {
        //
        var valid = true;
        if ($('#txtCurrentPasscode').val() == '') {
            $('#txtCurrentPasscode').attr('style', 'box-shadow: 0px 1px #ea1313;')
            valid = false;
            return;
        }
        else if ($('#txtNewPasscode').val() == '') {
            $('#txtCurrentPasscode').attr('style', 'box-shadow: 0px 1px #70c126;')
            $('#txtNewPasscode').attr('style', 'box-shadow: 0px 1px #ea1313;')
            valid = false;
            return;
        }
        else if ($('#txtReTypePasscode').val() == '') {
            $('#txtNewPasscode').attr('style', 'box-shadow: 0px 1px #70c126;')
            $('#txtReTypePasscode').attr('style', 'box-shadow: 0px 1px #ea1313;')
            valid = false;
            return;
        }

        else if (chk == true) {
            $('#txtCurrentPasscode').attr('style', 'box-shadow: 0px 1px #70c126;')
            $('#txtNewPasscode').attr('style', 'box-shadow: 0px 1px #70c126;')
            $('#txtReTypePasscode').attr('style', 'box-shadow: 0px 1px #70c126;')
            var collectionobj = {};
            collectionobj.schoolCode = schoolCode;
            collectionobj.branchCode = branchCode;
            collectionobj.SessionId = sessionId;
            collectionobj.fyId = fyId;
            collectionobj.PassWord = $('#txtCurrentPasscode').val();
            collectionobj.PassCode = $('#txtReTypePasscode').val();
            collectionobj.userId = userid;
            var getData = myService.methode('POST', "../ChangePassCode/ModifyPassCode", '{obj:' + JSON.stringify(collectionobj) + '}');
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }

    }
    $scope.ClearControl = function (flag) {
        //
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function () {
        $('#txtNewPasscode').val('')
        $('#txtReTypePasscode').val('')
        $('#txtCurrentPasscode').val('')
        $('#txtReTypePasscode').attr('style', 'box-shadow: 0px 1px #ffffff;')
        $('#txtCurrentPasscode').attr('style', 'box-shadow: 0px 1px #ffffff;')
        $('#txtNewPasscode').attr('style', 'box-shadow: 0px 1px #ffffff;')

        chk = false;
        $scope.mySwitch = false;
    }

    $scope.checkPassCode = function () {
        var collectionobj = {};
        collectionobj.schoolCode = schoolCode;
        collectionobj.branchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.PassWord = $('#txtCurrentPasscode').val();
        collectionobj.userId = userid;
        var getData = myService.methode('POST', "../ChangePassCode/checkPassCode", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            //

            if (response.data == 0) {
                $scope.mySwitch = true;
                chk = false;
                $('#txtCurrentPasscode').attr('style', 'box-shadow: 0px 1px #ea1313;')
            }
            else {
                $scope.mySwitch = false;
                chk = true;
                $('#txtCurrentPasscode').attr('style', 'box-shadow: 0px 1px #70c126;')
            }
        });
    };

    $scope.GetSessionYear = function () {
        var collectionobj = {};
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;

        var getUserDetails = myService.methode('POST', '../Administrator/GetSessionMonths', '{obj:' + JSON.stringify(collectionobj) + '}');
        getUserDetails.then(function (response) {

            $scope.SessionYears = response.data;
        });
    }

    $scope.GetSession = function () {
        var collectionobj = {};
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;

        var getUserDetails = myService.methode('POST', '../Administrator/SessionMasterList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getUserDetails.then(function (response) {

            $scope.SessionList = response.data;
            $scope.CurSessionId = sessionId.toString();
        });
    }

    $scope.GetSessionMonth = function () {
        //
        $scope.SessionMonths = $scope.SessionYears;
    }

    if (sessionStorage.getItem("code") != null)
        $scope.MatchingId = sessionStorage.getItem("code");

    $scope.hideteacher = true;

    $scope.BindStudent = function () {

        var getData = myService.methode('POST', "../Student/GetStudentList_UsingLoginId", '{loginId: ' + JSON.stringify(userid) + ',schoolCode: ' + JSON.stringify(schoolCode) + ',branchCode: ' + JSON.stringify(branchCode) + ',sessionId: ' + JSON.stringify(sessionId) + ',fyId: ' + JSON.stringify(fyId) + '}');
        getData.then(function (response) {
            $.each(response.data, function (i, val) {
                //
                $scope.rec = response.data;
            });
            //
            if ($scope.MatchingId != null || $scope.MatchingId != 'undefined' || $scope.MatchingId != '')
                response.data = $filter('filter')(response.data, { 'StudentCode': $scope.MatchingId });

            $('#lblStudentName').text(response.data[0].StudentName);
            $('#hdnStudentCode').val(response.data[0].StudentCode);
            $('#imgStudentName').attr("Src", response.data[0].StudentPhoto);

            sessionStorage.setItem("code", response.data[0].StudentCode);
            sessionStorage.setItem("StudentData", JSON.stringify(response.data));

            $scope.BindNotificationbehaveOfStudentCode(response.data[0].StudentCode);
            //$scope.BindUnReadNotify(response.data[0].StudentCode);
        });
    }

    $scope.DocSize = "a4";
    $scope.DocOrientation = "portrait";
    $scope.FontSize = "14";
    $scope.FilterMsg = "";
    $scope.Filters = {};
    $scope.RepeatHeader = 1;
    $scope.keys = [];
    $scope.SummaryFilter = '1';
    $scope.showtblfooter = 0;
    $scope.BodyHeaderTitle = "";
    $scope.LeftFooterText = "";
    $scope.LeftFooterValue = "";
    $scope.RightFooterText = "";
    $scope.RightFooterValue = "";

    $scope.Replace = function (value, splitvalue) {
        if (value == null) return;
        var str = value.toString().split(splitvalue);
        if (str.length == 0) return value;
        var returnstring = "";
        var breaktext = "";
        var para = $('<p></p>');
        for (var i = 0; i < str.length; i++) {
            para.append(breaktext).append(str[i]);
            breaktext = '<br/>';
        }
        return para.html();
    };
    /*Print Syllabus Book*/
    $scope.Export = function (mode) {
        $scope.Orientation = $scope.DocOrientation == "portrait" ? 'p' : 'l';
        if (typeof (mode) === 'undefined') return;
        if (mode == "pdf") {
            ''
            html2canvas(document.querySelector("#ExportDiv")).then(canvas => {
                var pdf = new jsPDF($scope.Orientation, "mm", $scope.DocSize);
                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();
                var imgData = canvas.toDataURL("image/png", 100.0);

                pdf.addImage(imgData, 'PNG', 0, 0, width, height);
                pdf.save(window.document.title);
            });
        }

        if (mode == "print") {
            //$.noConflict();
            var printContents = document.getElementById('ExportDiv').innerHTML;
            var popupWin = window.open('', '_blank', 'width=1000,height=1000');
            popupWin.document.open();
            popupWin.document.write('<html><head><meta charset="utf-8" /><style type="text/css" media="print">@page { size:' + $scope.DocSize.toUpperCase() + ' ' + $scope.DocOrientation.toUpperCase() + '; }</style><link href="../Content/plugins/assets/css/print/print-bootstrap.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/print/print-main.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/icofont.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/font-awesome.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/materialdesignicons.min.css" media="all" rel="stylesheet" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        }

        return false;
    }
    $scope.GetFilterMsg = function () {
        var message = "";
        var seprator = "";
        var filter = "<span class='filter' >Filter  : </span> ";

        if (messagevalues.length > 0)
            $.each(messagevalues, function (i, values) {
                $.each(values, function (key, val) {
                    if (val != null && val != "") {
                        message = message + seprator + filter;
                        message = message + "<span class='filter-title-name' >" + key + "</span> : <span class='filter-title'>" + val + "</span>"
                        seprator = ", ";
                        filter = "";
                    };
                });
            });
        if (message.length > 0) {
            message = '(' + message + ')';
        }
        $scope.FilterMsg = message;
    }
    $scope.SearchForTableRepeatReportGrid = function (object) {
        $scope.GetFilterMsg();
        $scope.tblheader = [];
        $scope.tblbody = [];
        $scope.tblfootermain = [];
        $scope.tblfooterrepeat = {};
        $scope.keys = [];
        $scope.RepeatHeader = 0;
        $scope.showtblfooter = object.showtblfooter
        if (object.BodyGrid == 1) {
            $scope.tblheader = object.tblheader
            $scope.tblbody = object.tblbody;
            $scope.TextMessage = object.TextMessage;

            
            if (object.showtblfooter == 1)
                $.each(object.FooterColumn.TextCol, function (index, array) {
                    $scope.tblfooterrepeat = {};
                    $.each($scope.tblheader, function (key, val) {
                        $scope.tblfooterrepeat[val.HeaderValue] = "";
                    });
                    $scope.tblfooterrepeat[array.Text] = array.Val;
                    $.each(object.tblbody, function (rowindex, values) {
                        if (Array.isArray(array.SumCol)) {
                            $.each(array.SumCol, function (index, val) {
                                if ($scope.tblfooterrepeat[val] == "") {
                                    $scope.tblfooterrepeat[val] = 0;
                                }
                                if (isNaN(values[val])) {
                                    $scope.tblfooterrepeat[val] += 0
                                }
                                else {
                                    $scope.tblfooterrepeat[val] = $scope.tblfooterrepeat[val] + Number(values[array.Sum[index]]);
                                }
                            });
                        }
                        else {
                            if ($scope.tblfooterrepeat[array.SumCol] == "") {
                                $scope.tblfooterrepeat[array.SumCol] = 0;
                            }
                            if (isNaN(values[array.SumCol])) {
                                $scope.tblfooterrepeat[array.SumCol] += 0
                            }
                            else {
                                $scope.tblfooterrepeat[array.SumCol] = $scope.tblfooterrepeat[array.SumCol] + Number(values[array.Sum]);
                            }
                        }
                    });
                    $scope.tblfootermain.push($scope.tblfooterrepeat);
                });
        }
        else {
            $scope.tblbody = null;
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
    $scope.SearchReportGrid = function (object) {
        debugger
        $scope.GetFilterMsg();
        $scope.tblheader = [];
        $scope.tblbody = [];
        $scope.tblfootermain = [];
        $scope.tblfooterrepeat = {};
        $scope.keys = [];
        $scope.RepeatHeader = 0;
        $scope.showtblfooter = object.showtblfooter
        if (object.BodyGrid == 1) {
            $scope.tblheader = object.tblheader
            $scope.tblbody = object.tblbody;
            $scope.TextMessage = object.TextMessage;

            
            if (object.showtblfooter == 1)
                $.each(object.FooterColumn.TextCol, function (index, array) {
                    $scope.tblfooterrepeat = {};
                    $.each($scope.tblheader, function (key, val) {
                        $scope.tblfooterrepeat[val.HeaderValue] = "";
                    });
                    $scope.tblfooterrepeat[array.Text] = array.Val;
                    $.each(object.tblbody, function (rowindex, values) {
                        if (Array.isArray(array.SumCol)) {
                            $.each(array.SumCol, function (index, val) {
                                if ($scope.tblfooterrepeat[val] == "") {
                                    $scope.tblfooterrepeat[val] = 0;
                                }
                                if (isNaN(values[val])) {
                                    $scope.tblfooterrepeat[val] += 0
                                }
                                else {
                                    $scope.tblfooterrepeat[val] = $scope.tblfooterrepeat[val] + Number(values[array.Sum[index]]);
                                }
                            });
                        }
                        else {
                            if ($scope.tblfooterrepeat[array.SumCol] == "") {
                                $scope.tblfooterrepeat[array.SumCol] = 0;
                            }
                            if (isNaN(values[array.SumCol])) {
                                $scope.tblfooterrepeat[array.SumCol] += 0
                            }
                            else {
                                $scope.tblfooterrepeat[array.SumCol] = $scope.tblfooterrepeat[array.SumCol] + Number(values[array.Sum]);
                            }
                        }
                    });
                    $scope.tblfootermain.push($scope.tblfooterrepeat);
                });
        }
        else {
            $scope.tblbody = null;
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

    $scope.SearchRepeatReportGrid = function (object) {

        $scope.GetFilterMsg();
        $scope.tblheader = [];
        $scope.tblbody = [];
        $scope.tblfootermain = [];
        $scope.tblfooterrepeat = {};
        $scope.keys = [];
        $scope.RepeatHeader = 0;
        $scope.showtblfooter = object.showtblfooter
        if (object.BodyGrid == 1) {
            $scope.tblheader = object.tblheader
            $scope.tblbody = object.tblbody;
            $scope.TextMessage = object.TextMessage;
            $scope.keys = object.keys;
            if (object.showtblfooter == 1)
                $.each(object.FooterColumn.TextCol, function (index, array) {
                    $scope.tblfooterrepeat = {};
                    $.each($scope.tblheader, function (key, val) {
                        $scope.tblfooterrepeat[val.HeaderValue] = "";
                    });
                    $scope.tblfooterrepeat[array.Text] = array.Val;
                    $.each(object.tblbody, function (rowindex, values) {
                        if (Array.isArray(array.SumCol)) {
                            $.each(array.SumCol, function (index, val) {
                                if ($scope.tblfooterrepeat[val] == "") {
                                    $scope.tblfooterrepeat[val] = 0;
                                }
                                if (isNaN(values[val])) {
                                    $scope.tblfooterrepeat[val] += 0
                                }
                                else {
                                    $scope.tblfooterrepeat[val] = $scope.tblfooterrepeat[val] + Number(values[array.Sum[index]]);
                                }
                            });
                        }
                        else {
                            if ($scope.tblfooterrepeat[array.SumCol] == "") {
                                $scope.tblfooterrepeat[array.SumCol] = 0;
                            }
                            if (isNaN(values[array.SumCol])) {
                                $scope.tblfooterrepeat[array.SumCol] += 0
                            }
                            else {
                                $scope.tblfooterrepeat[array.SumCol] = $scope.tblfooterrepeat[array.SumCol] + Number(values[array.Sum]);
                            }
                        }
                    });
                    $scope.tblfootermain.push($scope.tblfooterrepeat);
                });
        }
        else {
            $scope.tblbody = null;
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
                            debugger
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
    
    $scope.SearchRepeatReportGridWithCRSPANDISPERDISAMT = function (object) {
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
                                    if ($scope.tblfooterrepeat[array.SumCol] == "") {
                                        $scope.tblfooterrepeat[array.SumCol] = 0;
                                    }
                                    if (isNaN(values[array.SumCol])) {
                                        $scope.tblfooterrepeat[array.SumCol] += 0
                                    }
                                    else {
                                        $scope.tblfooterrepeat[array.SumCol] = $scope.tblfooterrepeat[array.SumCol] + values[array.Sum]
                                    }
                                    if ($scope.tblfooterrepeat[array.SumColDP] == "") {
                                        $scope.tblfooterrepeat[array.SumColDP] = 0;
                                    }

                                    if (isNaN(values[array.SumColDP])) {
                                        $scope.tblfooterrepeat[array.SumColDP] += 0
                                    }
                                    else {
                                        $scope.tblfooterrepeat[array.SumColDP] = $scope.tblfooterrepeat
                                            [array.SumColDP] + values[array.SumDP]
                                    }


                                    if ($scope.tblfooterrepeat[array.SumColDA] == "") {
                                        $scope.tblfooterrepeat[array.SumColDA] = 0;
                                    }
                                    if (isNaN(values[array.SumColDA])) {
                                        $scope.tblfooterrepeat[array.SumColDA] += 0
                                    }
                                    else {
                                        $scope.tblfooterrepeat[array.SumColDA] = $scope.tblfooterrepeat[array.SumColDA] + values[array.SumDA]
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
                                if ($scope.tblfooterrepeat1[array.SumCol] == "") {
                                    $scope.tblfooterrepeat1[array.SumCol] = 0;
                                }
                                if (isNaN(values[array.SumCol])) {
                                    $scope.tblfooterrepeat1[array.SumCol] += 0
                                }
                                else {
                                    $scope.tblfooterrepeat1[array.SumCol] = $scope.tblfooterrepeat1[array.SumCol] + values[array.Sum]
                                }
                                //if ($scope.tblfooterrepeat[array.SumColDP] == "") {
                                //    $scope.tblfooterrepeat[array.SumColDP] = 0;
                                //}

                                //if (isNaN(values[array.SumColDP])) {
                                //    $scope.tblfooterrepeat[array.SumColDP] += 0
                                //}
                                //else {
                                //    $scope.tblfooterrepeat[array.SumColDP] = $scope.tblfooterrepeat
                                //        [array.SumColDP] + values[array.SumDP]
                                //}


                                //if ($scope.tblfooterrepeat[array.SumColDA] == "") {
                                //    $scope.tblfooterrepeat[array.SumColDA] = 0;
                                //}
                                //if (isNaN(values[array.SumColDA])) {
                                //    $scope.tblfooterrepeat[array.SumColDA] += 0
                                //}
                                //else {
                                //    $scope.tblfooterrepeat[array.SumColDA] = $scope.tblfooterrepeat[array.SumColDA] + values[array.SumDA]
                                //}

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
                        $.each(object.tblbody, function (index1, array)
                        {
                            if (array[object.SummaryCol[0]] == key)
                            {
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
                            if (val.IsFooterTotal != "Yes")
                            {
                                if (val.FooterText == null)
                                    $scope.tblfooter.push({ FooterText: '' })
                                else
                                    $scope.tblfooter.push({ FooterText: val.FooterText, TextAlign: val.FooterTextAlign })
                            }
                            else
                            {
                                var totalfooteramount = 0;
                                $.each($scope.tblbodySummary, function (keys, values)
                                {
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
    $scope.SearchRepeatReportGridWithCRSPAN = function (object) {
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
                            $.each(object.tblbody, function (rowindex, values) 
                            {
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
    $scope.Formatter = function (val) {
        //alert(val);
        if (isNaN(val) || val == "" || val == null) return val;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(val);
    }

    $scope.getstudetails = function (id, Name, StudentPhoto, ClassName, SectionName, BranchName) {
        sessionStorage.setItem("code", id);
        window.location.href = "../GuardianDashBoard/DashBoard";
    }

    $scope.FilterToggle = function () {

        $(".section-toggle").slideToggle('slow');
        $(".filter-toggle").toggleClass("open");
    };

    $scope.GetFeeType = function () {
        //
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', "../Fee/SelectFeeTypeMaster", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.FeeTypes = response.data;
        });

    };

    $scope.GetFees = function () {
        //
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.SessionId = sessionId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', "../Fee/SelectFeeMaster", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.FeeStructure = response.data;
        });

    };

    $scope.GetClassFeesStructure = function () {
        //
        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.FeeTypeId = $scope.FeeTypeId;
        collectionobj.ClassId = $scope.studentDetails.ClassId;
        collectionobj.SectionId = $scope.studentDetails.SectionId;
        collectionobj.Code = $scope.studentDetails.StudentCode;
        collectionobj.ForStudent = $scope.ForStudent;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', "../Fee/SelectClassFeesStructureMaster", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.FeeStructure = response.data;
            $scope.TotalAmount = 0;
            if (typeof ($scope.ForStudent) !== 'undefined')
                $.each($scope.FeeStructure, function (row, array) {
                    if (array.isAlloted === true)
                        $scope.TotalAmount = $scope.TotalAmount + (array.FeeAmt - array.DisAmt);
                })
        });
    };

    $scope.hideloader = true;
    $scope.GetAllStudents = function (action) {
        debugger
        $scope.disabledSearch = true;
        $scope.hideloader = true;
        
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = action

        var getData = myService.methode('POST', "../Student/SearchStudents", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            debugger
            $scope.StudentsList = response.data;
            if ($scope.StudentsList.length > 0) {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;
                    $scope.$applyAsync();
                }, 100);
            }

            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }
    //$scope.HideDiv=false;
    $scope.HideStudentList = function (val) {
        setTimeout(function () {
            //if (val == '1') {
            //    $scope.HideDiv = false;
            //    var show = document.querySelector("show");
            //}
            //alert(document.querySelectorAll(".show").length)
            if (document.querySelectorAll(".show").length > 0) {
                //$scope.HideDiv = false;
                document.getElementById("FeeStuListOnOff").classList.toggle("show")
            }
            //if ($scope.HideDiv == true) {document.getElementById("FeeStuListOnOff").classList.toggle("show")}
        }, 200);
    }    
    //$(document).click(function () {
    //    setTimeout(function () { $scope.HideDiv = true }, 200);
    //});
    $(".FeeStuListOnOff").click(function (e) {
        e.stopPropagation();
        return false;
    }); 
    $scope.SearchStudents = function ()
    {
        debugger
        $scope.SearchText = "";
        document.getElementById("FeeStuListOnOff").classList.toggle("show");
    }

    
    $scope.setStudentName = function (student) {
        

        $scope.SearchText = student.StudentName;
        $scope.StudentCode = student.StudentCode;

        $scope.StudentName = student.StudentName;
        $scope.StudentId = student.StudentId;
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

        $scope.HideStudentList();
        //$scope.HideDiv=true;
        $scope.$applyAsync();
    }
    $scope.resetStudentData = function () {
        $scope.StudentCode = "";
        $scope.StudentName = "";
        $scope.StudentId = "";
        $scope.ClassName = "";
        $scope.BranchName = "";
        $scope.SectionName = "";
        $scope.GuardianAddress = "";
        $scope.FatherName = "";
        $scope.MotherName = "";
        $scope.FatherContactNo = "";
        $scope.AdmissionFormNo = "";
        $scope.InstituteRollNo = "";
        $scope.StudentPhoto = "/Content/Photos/no-image.png";
    }
   
    //Employee Details Dropdown-----------------
    $scope.GetAllEmployees = function (action) {
        $scope.disabledSearch = true;
        $scope.hideloader = true;
        
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = action

        var getData = myService.methode('POST', "../Library/SearchEmployees", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            
            $scope.EmployeeList = response.data;
            if ($scope.EmployeeList.length > 0) {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;

                }, 100);
            }

            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }
    $scope.HideEmployeeList = function (val) {
        
        setTimeout(function () {            
            if (document.querySelectorAll(".show").length > 0) {              
                document.getElementById("EmpListOnOff").classList.toggle("show")
            }          
        }, 200);
    }
    $(".EmpListOnOff").click(function (e) {
        
        e.stopPropagation();
        return false;
    });
    $scope.SearchEmployees = function () {
        
        $scope.SearchEmployeeText = "";
        document.getElementById("EmpListOnOff").classList.toggle("show");
    }
    $scope.setEmployeeNameLib = function (employee) {
        

        $scope.SearchEmployeeText = employee.EmployeeName;
        $scope.EmployeeCode = employee.EmployeeCode;
        $scope.EmployeeName = employee.EmployeeName;
        $scope.EmployeeIdM = employee.EmployeeId;
        $scope.DepartmentName = employee.DepartmentName;
        $scope.DesignationName = employee.DesignationName;
        $scope.PresentAddress = employee.PresentAddress;
        $scope.FatherName = employee.FatherName;
        $scope.MotherName = employee.MotherName;
        $scope.ContactNo = employee.ContactNo;
        $scope.JoiningDate = employee.JoiningDate;
        $scope.EmployeePhoto = employee.EmployeePhoto;

        $scope.HideEmployeeList();
        //$scope.HideDiv=true;
        $scope.$applyAsync();
    }
    $scope.resetEmployeeData = function () {
        $scope.EmployeeCode = "";
        $scope.EmployeeName = "";
        $scope.EmployeeId = "";
        $scope.DepartmentName = "";
        $scope.DesignationName = "";
        $scope.PresentAddress = "";
        $scope.FatherName = "";
        $scope.MotherName = "";
        $scope.ContactNo = "";
        $scope.JoiningDate = "";
        $scope.EmployeePhoto = "/Content/Photos/no-image.png";

    }
    //------------------------------------------


    //Binder Details Dropdown-----------------
    $scope.GetBinderList = function (action) {
        $scope.disabledSearch = true;
        $scope.hideloader = true;
        
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = action

        var getData = myService.methode('POST', "../Library/GetBinderList", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            
            $scope.BinderList = response.data;
            if ($scope.BinderList.length > 0) {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;

                }, 100);
            }
            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }
    $scope.HideBinderList = function (val) {
        
        setTimeout(function () {
            if (document.querySelectorAll(".show").length > 0) {
                document.getElementById("BinderListOnOff").classList.toggle("show")
            }}, 200);
    }
    $(".BinderListOnOff").click(function (e) {
        
        e.stopPropagation();
        return false;
    });
    $scope.SearchBinders = function () {
        //
        $scope.SearchEmployeeText = "";
        document.getElementById("BinderListOnOff").classList.toggle("show");
    }
    $scope.setBinderLib = function (binder) {
        
        $scope.SearchBinderText = binder.BinderName;
        $scope.SubCode = binder.SubCode;
        $scope.Address = binder.Address;
        $scope.HideBinderList();       
        $scope.$applyAsync();
    }
    $scope.resetBinderData = function () {
        $scope.SearchBinderText ="";
        $scope.SubCode ="";
        $scope.Address ="";
    }
    //------------------------------------------

    $scope.GetCanceledFeesReceipt = function () {
        var collectionobj = {};
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', "../Fee/GetCanceledFeesReceipt", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.Receipts = response.data;
        });
    }

    $scope.GetSchoolBranch = function () {
        //
        var collectionobj = {};
        collectionobj.Action = 1;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', "../Administrator/GetSchoolBranch", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {

            $scope.SchoolBranchsList = response.data;
        });

    };

    $scope.GetClassUsingId = function (action) {
        
        if (action == "")
        { action = 7; }
        var collectionobj = {};
        collectionobj.Action = action;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', "../Administrator/ClassMasterList", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {

            $scope.Classes = response.data;
        });
    };

    $scope.GetSectionUsingId = function (classid, action) {
        
        if (action == "")
        { action = 7; }
        var collectionobj = {};
        collectionobj.Action = action;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.ClassId = classid;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', "../Administrator/SectionMasterList", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {

            $scope.Sections = response.data;
        });
    };

    $scope.GetBranchUsingId = function (action) {
        
        if (action == "")
        { action = 7; }
        var collectionobj = {};
        collectionobj.Action = action;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', "../Administrator/BranchMasterList", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {

            $scope.Branchs = response.data;
        });
    };

    $scope.GetHeadOfficeAllBranch = function () {
        //
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;

        var getData = myService.methode('POST', "../Visitor/SelectHeadOfficeAllBranch", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.RevenuePerBranch = response.data;
        });
    };

    $scope.GetDocumentList = function () {
        //
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', "../EmployeeDocument/GetDocumentList", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.DocumentList = response.data;
        });
    };
    //List of Exam 
    $scope.BindExam = function () {
        
        var collectionobj = {};
        collectionobj.Action = 9;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Exam/BindExam', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.ExamList = response.data;
            }
        });
    };
    //-----------
    $scope.ConverToDate = function (date, format) {
        return moment(date).format(format);
    };
    $scope.GetStreamUsingId = function () {
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', "../Administrator/GetStreamUsingId", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.Streames = response.data;
        });
    };
    $scope.GetMediumUsingId = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', "../Administrator/GetMediumUsingId", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.Mediumes = response.data;
        });
    };
    $scope.HomeworkMode = function () {
        
        $scope.collectionObject = {};
        $scope.collectionObject["Action"] = "4";
        $scope.collectionObject["BranchCode"] = branchCode;
        $scope.collectionObject["SchoolCode"] = schoolCode;
        var getData = myService.methode('POST', '../Guardian/GetHomeworkStudent', '{obj:' + JSON.stringify($scope.collectionObject) + '}');
        getData.then(function (response) {
            
            $scope.GSHomeworksMode = response.data;
        });

    };
    //List of Sub Report Type Name 
    $scope.SubReportTypeName = function () {
        
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Exam/SubReportTypeName', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.SubReportTypeNamelist = response.data;
            }
        });
    };
    //List of Exam 
    $scope.BindFeeHead = function () {
        
        var collectionobj = {};
        collectionobj.Action = 1;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Fee/BindFeeHead', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.FeeHeadList = response.data;
            }
        });
    };
    //List of Almera of Library 
    $scope.GetAlmeraList = function () {
        
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Library/GetAlmeraList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.Almeralist = response.data;
            }
        });
    };
    //List of Subject Group of Library 
    $scope.GetSubjectGroupLibList = function () {
        
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Library/GetSubjectGrpLibList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.SubjectGrpLibList = response.data;
            }
        });
    };
    //List of Subject Group of Library 
    $scope.GetSubjectLibList = function (SubjectGroupId) {
        
        if (SubjectGroupId == "")
            return;
        var collectionobj = {};
        collectionobj.Action = 10;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SubjectGrpCode = SubjectGroupId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Library/GetSubjectLibList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.SubjectLibList = response.data;
            }
        });
    };
    //Get BookAcce Name Lib of Library 
    $scope.GetBookAcceNameLibList = function () {
        
        var collectionobj = {};
        collectionobj.Action = 9;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Library/GetBookAcceNameLibList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.BookAcceNameLibList = response.data;
            }
        });
    };
    //List of Author of Library 
    $scope.GetAuthorLibList = function () {
        
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Library/GetAuthorLibList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.AuthorLibList = response.data;
            }
        });
    };
    //List of Publisher of Library 
    $scope.GetPublisherLibList = function () {
        
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Library/GetPublisherLibList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.PublisherLibList = response.data;
            }
        });
    };
    //List of Category of Library 
    $scope.GetCategoryLibList = function () {
        
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Library/GetCategoryLibList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.CategoryLibList = response.data;
            }
        });
    };
    //List of Category of Library 
    $scope.GetEditionTypeLibList = function () {
        
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Library/GetEditionTypeLibList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.EditionTypeLibList = response.data;
            }
        });
    };

    $scope.SelectSubject = function (SubjectGrpId, selectSubjectId) {
        $scope.GetSubjectLibList(SubjectGrpId)
        return selectSubjectId;
    };
    //List of Rack of library
    $scope.GetRackLibList = function () {
        
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Library/GetRackLibList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.RacklibList = response.data;
            }
        });
    };

    //List of Rack of library
    $scope.GetVoucherNoLibList = function (SubAction) {
        
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.SubAction = SubAction;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        var getData = myService.methode('POST', '../Library/GetVoucherNoLibList', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                
                $scope.PVNo = response.data[0].PVNo;
            }
        });
    };
    
    $scope.ddlCheckAll = function (ModelList, filter) {
        if (filter != null && filter != "") {
            $.each($filter('filter')($scope[ModelList], filter), function (index, array) {
                if (array.hasOwnProperty('IsActive')) {
                    if (array.IsActive == true)
                        array.chk = true;
                    else
                        array.chk = false;
                }
                else {
                    array.chk = true;
                }
            })
        }
        else {
            $.each($scope[ModelList], function (index, array) {
                if (array.hasOwnProperty('IsActive')) {
                    if (array.IsActive == true)
                        array.chk = true;
                    else
                        array.chk = false;
                }
                else {
                    array.chk = true;
                }
            })
        }
        //$scope[ModelList].chk=true
    }

    $scope.ddlUnCheckAll = function (ModelList) {
        $.each($scope[ModelList], function (index, array) {
            array.chk = false
        })
    }

    $scope.ToogleDDL = function (id,model) {
        $(document).on('click', function (e) {
            if ($(e.target).closest("#" + id).length === 0) {
                $scope[model] = false;
                $scope.$applyAsync();
            }
        });
    }

    $scope.GetCount = function (list, initcap) {
        $scope.count = 0;
        $scope.return = initcap;
        if (typeof (list) === 'undefined') return $scope.return;
        $.each(list, function (index, array) {
            if (array.chk == true)
                $scope.count = $scope.count + 1
        });
        if ($scope.count > 0)
            $scope.return = $scope.count + " Selection";
        return $scope.return;
    }

    $scope.GetDefaultModerator = function () {

        var collectionobj = {};
        collectionobj["SessionId"] = sessionId;
        collectionobj["BranchCode"] = branchCode;
        collectionobj["SchoolCode"] = schoolCode;

        var getData = myService.methode('POST', '../LiveClass/GetDefaultModerator', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.DefaultModerator = response.data
        });
    };

    $scope.GetWithoutDefaultModerator = function () {

        var collectionobj = {};
        collectionobj["SessionId"] = sessionId;
        collectionobj["BranchCode"] = branchCode;
        collectionobj["SchoolCode"] = schoolCode;

        var getData = myService.methode('POST', '../LiveClass/GetWithoutDefaultModerator', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.WithoutDefaultModerator = response.data
        });
    };

}