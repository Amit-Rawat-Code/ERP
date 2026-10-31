app.GetMasterController = function ($scope, $element, $sce, $filter, $timeout, myService) {
    $scope.GetCountry = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/GetMasterApi/GetCountry', collectionobj);
        getData.then(function (response) {
            $scope.Countrylist = response.data
            $scope.DefaultCountry = $filter('filter')($scope.Countrylist, { CountryName: 'India' }, true);
            if ($scope.DefaultCountry.length > 0) {
                $scope.CountryCode = $scope.DefaultCountry[0].Code;
                $scope.GetState($scope.CountryCode);
            }
        });
    };

    $scope.GetState = function (countrycode, objName) {
        // function (countrycode) {
        var collectionobj = {};
        collectionobj.Action = "4"; 
       // collectionobj.CountryCode = countrycode;   
        collectionobj.CountryCode = countrycode;   
        var getData = myService.methode('POST', '../api/GetMasterApi/GetState', collectionobj);
        getData.then(function (response) {
            if (objName == null || objName == undefined) {
                $scope.Statelist = response.data
                $scope.DefaultState = $filter('filter')($scope.Statelist, { StateName: 'Uttar Pradesh' }, true);

                if ($scope.DefaultState.length > 0) {
                    $scope.StateCode = $scope.DefaultState[0].Code;
                    $scope.GetCity($scope.StateCode)
                }
            }
            else {
                $scope[objName] = response.data
            }
        });
    };

    $scope.GetCity = function (statecode, objName) {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.StateCode = statecode;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetCity', collectionobj);
        getData.then(function (response) {
            if (objName == null || objName == undefined) {
                $scope.Citylist = response.data;
            }
            else {
                $scope[objName] = response.data
            }
            
            //$scope.DefaultCity = $filter('filter')($scope.Citylist, { CityName: 'Kanpur' }, true);
            //if ($scope.DefaultCity.length > 0) {
            //    $scope.CityCode = $scope.DefaultCity[0].Code;

            //    $scope.GetCityArea($scope.CityCode)
            //}    
        });
    };
    $scope.GetEnquirySource = function (enquirySourceCode)
    {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.Code = enquirySourceCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetEnquirySource', collectionobj);
        getData.then(function (response) {
            $scope.EnquirySourceList = response.data
        });
    };

    $scope.GetCityArea = function (citycode, objName) {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.CityCode = citycode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetCityArea', collectionobj);
        getData.then(function (response) {
            if (objName == null || objName == undefined) {
                $scope.CityAreaList = response.data
            }
            else {
                $scope[objName] = response.data
            }
        });
    };

    $scope.GetEnquiryType = function (modeofenquiry) {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.ModeofEnquiry = modeofenquiry;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetEnquiryType', collectionobj);
        getData.then(function (response) {
            $scope.EnquiryTypeList = response.data
        });
    };



    $scope.GetClasses = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetClass', collectionobj);
        getData.then(function (response) {
            $scope.ClassList = response.data
        });
    };
    $scope.GetSections = function (classcode) {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.ClassCode = classcode;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;     
        var getData = myService.methode('POST', '../api/GetMasterApi/GetSection', collectionobj);
        getData.then(function (response) {
            $scope.Sections = response.data
        });
    };
    $scope.GetAllSections = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetSection', collectionobj);
        getData.then(function (response) {
            $scope.Sections = response.data
        });
    };

    $scope.GetStream = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;     
        var getData = myService.methode('POST', '../api/GetMasterApi/GetStream', collectionobj);
        getData.then(function (response) {
            $scope.StreamList = response.data
        });
    };




    $scope.GetBranchSides = function () {      
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetBranch', collectionobj);
        getData.then(function (response) {            
            $scope.BranchList = response.data
        });
    };


    $scope.GetSessionYear = function (sid) {
        
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sid == null ? sessionId : sid;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetSessionMonths', collectionobj);
        getUserDetails.then(function (response) {
            $scope.SessionYears = response.data;
        });
    }

    $scope.GetSessionMonth = function () {       
        $scope.SessionMonths = $scope.SessionYears;
    }

    //This is use for College Course DDL Create Date 5-March-2021

    $scope.GetCollegeCourse = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetCollegeCourse', collectionobj);
        getData.then(function (response) {
            $scope.CollegeCourseList = response.data
            //debugger;
        });
    };

    $scope.GetCollegeBranch = function (collegeCourseCode) {
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
            $scope.CollegeBranchList = response.data
        });
    };

    $scope.GetEnquiryCategory = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/GetMasterApi/GetEnquiryCategory', collectionobj);
        getData.then(function (response) {
            $scope.EnquiryCategoryList = response.data
        });
    };

    //This is Group ID DDL 9-March-2021 9:45AM GetSociety

    $scope.GetGroup = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/GetMasterApi/GetGroup', collectionobj);
        getData.then(function (response) {
            $scope.GroupList = response.data
        });
    };

    $scope.GetSociety = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/GetMasterApi/GetSociety', collectionobj);
        getData.then(function (response) {
            $scope.SocietyList = response.data
        });
    };

    $scope.GetSchool = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/GetMasterApi/GetSchool', collectionobj);
        getData.then(function (response) {
            $scope.SchoolList = response.data
        });
    };

    $scope.GetBranchs = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/MasterApi/GetBranchMaster', collectionobj);
        getData.then(function (response) {
            debugger
            $scope.Branchs = response.data
        });
    };

    //This is Categories DDL Function
    $scope.GetCategories = function () {
        var collectionobj = {};
        collectionobj.Action = "11";
        var getData = myService.methode('POST', '../api/GetMasterApi/GetCategory', collectionobj);
        getData.then(function (response) {
            $scope.Categories = response.data
        });
    }
    $scope.GetSession = function () {
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;

        var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetSessionMonths', collectionobj);
        getUserDetails.then(function (response) {
            $scope.SessionList = response.data;
        });
    }


    $scope.GetListedSessions = function () {
        
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.CreatedBy = userid;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetSession', collectionobj);
        getData.then(function (response) {
            $scope.ListedSessions = response.data;
        });
    }

    $scope.GetUserTypes = function () {
        
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/UserMasterApi/GetUserType', collectionobj);
        getData.then(function (response) {
            $scope.ListedUserTypes = response.data;
            if (loginTypeId != null && Number(loginTypeId) !== 1) {
                $scope.ListedUserTypes = $scope.ListedUserTypes.splice(1, $scope.ListedUserTypes.length-1);
            }
            if (Number(loginTypeId) == 3) {
                $scope.ListedUserTypes = $scope.ListedUserTypes.splice(1, $scope.ListedUserTypes.length - 1);
            }
        });
    }


    $scope.GetRoles = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../Api/MasterApi/GetRoles', collectionobj);
        getData.then(function (response) {     
            $scope.RolesList = response.data;
        });
    }

    $scope.GetModules = function (action,userid) {
        var collectionobj = {};
        if (action == null)
            action = 4;
        collectionobj.UserId = userid;
        collectionobj.Action = action;
        var getData = myService.methode('POST', '../Api/MasterApi/GetModules', collectionobj);
        getData.then(function (response) {
            $scope.ModulesList = response.data;
        });
    }

    $scope.GetSubMenues = function (Module) {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.ModuleId = Module;
        var getData = myService.methode('POST', '../Api/MasterApi/GetSubMenues', collectionobj);
        getData.then(function (response) {
            $scope.SubMenuesList = response.data;
        });
    }

    
    $scope.GetAssociatedBranches = function (sesid) {
        
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.UserId = userid
        collectionobj.SessionId = sesid;
        var getData = myService.methode('POST', '../api/MasterApi/GetBranchMaster', collectionobj);
        getData.then(function (response) {
            $scope.AssociatedBranches = response.data;
        });
    }

    $scope.GetUserName = function (action) {
        var collectionobj = {};
        collectionobj.relationshipId = relationshipId;
        collectionobj.Action = "10";
        collectionobj.UserId = userid;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/UserMasterApi/GetUserDetail', collectionobj);
        getData.then(function (response) {
            $scope.UserNameList = response.data;

        });
    }

    $scope.GetUserDetails = function (userId) {
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.userId = userId;
        var getData = myService.methode('POST', '../Api/UserMasterApi/GetUserDetail', collectionobj);
        getData.then(function (response) {
            $scope.UserDetails = response.data;
        });
    }

    $scope.GetRegistrationFeeHead = function () {
        
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetRegistrationFeeHead', collectionobj);
        getUserDetails.then(function (response) {
            $scope.RegistrationFeeHeadList = response.data;
        });
    }

    $scope.GetBoards = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetBoards', collectionobj);
        getUserDetails.then(function (response) {
            $scope.BoardList = response.data;
            if ($scope.BoardList.length > 0)
                $scope.BoardCode = $scope.BoardList[0].BoardName;
        });
    }

    $scope.GetMediums = function () {

        var collectionobj = {};
        collectionobj.Action = '13';
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDDLs', collectionobj);
        getData.then(function (response) {
            $scope.MediumList = response.data;
            if ($scope.MediumList.length>0)
                $scope.Medium = $scope.MediumList[0].MediumName;
        });
    }

    $scope.GetPayModes = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetPayModes', collectionobj);
        getUserDetails.then(function (response) {
            $scope.PayModeList = response.data;
            if ($scope.IsPayMode == null) {
                $scope.PaymentType = ($filter('filter')($scope.PayModeList, { Name: 'Cash' }))[0].Code.toString();
            }
        });
    }

    $scope.GetUserSchoolBranch = function () {
        var collectionobj = {};
        collectionobj.Action = "9";
        collectionobj.UserId = $scope.UserName;
        var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetUserSchoolBranch', collectionobj);
        getUserDetails.then(function (response) {
            $scope.SchoolBranchsList = response.data;
        });
    }

    $scope.GetNationality = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetNationality', collectionobj);
        getUserDetails.then(function (response) {
            $scope.NationalityList = response.data;
        });
    }

    $scope.GetMotherTongue = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetMotherTongue', collectionobj);
        getUserDetails.then(function (response) {
            $scope.MotherTongueList = response.data;
        });
    }

    $scope.GetDocuments = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetDocuments', collectionobj);
        getUserDetails.then(function (response) {
            $scope.ListedDocuments = response.data;
        });
    }

    $scope.GetMerites = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetMerites', collectionobj);
        getUserDetails.then(function (response) {
            $scope.MeritList = response.data;
        });
    }

    $scope.GetSubjectGroup = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../api/GblMasterApi/GetSubjectGroupMaster", collectionobj);
        getData.then(function (response) {
            $scope.SubjectGroups = response.data;
        })
    };

    $scope.BatchClassWise = function (classcode) {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.ClassCode = classcode;
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetClassMeritListPrePrimary', collectionobj);
        getData.then(function (response) {
            $scope.BatchClassWiseList = response.data.Table
        });
    };
    $scope.GetGender = function () {
        var collectionobj = {};
        collectionobj.Action = '4';
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDDLs', collectionobj);
        getData.then(function (response) {
            $scope.GenderList = response.data;
        });
    };
    $scope.GetSemester = function (CourseCode) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.CourseCode = CourseCode;
        var getData = myService.methode('POST', '../Api/GblMasterApi/GetSemesterMaster', collectionobj);
        getData.then(function (response) {
            $scope.SemesterList = response.data;
        });
    };
    $scope.GetOccupation = function () {
        var collectionobj = {};
        collectionobj.Action = '8';
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDDLs', collectionobj);
        getData.then(function (response) {
            $scope.Occupations = response.data;
        });
    };
    $scope.GetDesignationType = function () {
        var collectionobj = {};
        collectionobj.Action = '4';
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDesignationType', collectionobj);
        getData.then(function (response) {
            $scope.DesignationTypeList = response.data;
        });
    };
    $scope.GetReligions = function () {
        var collectionobj = {};
        collectionobj.Action = '6';
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDDLs', collectionobj);
        getData.then(function (response) {
            $scope.Religions = response.data;
        });
    };
    $scope.GetSubjectList = function () {
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetSubjectMaster', collectionobj);
        getData.then(function (response) {
            $scope.SubjectList = response.data;
        });
    };
    $scope.GetDepartments = function () {
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDepartments', collectionobj);
        getData.then(function (response) {
            $scope.DepartmentList = response.data;
        });
    };
    $scope.GetDesignations = function () {
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDesignations', collectionobj);
        getData.then(function (response) {
            $scope.DesignationList = response.data;
        });
    };
    $scope.GetGrades = function () {
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetGrades', collectionobj);
        getData.then(function (response) {
            $scope.GradeList = response.data;
        });
    };
    $scope.GetAbbreviationType = function () {
        var collectionobj = {};
        collectionobj.Action = '9';
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDDLs', collectionobj);
        getData.then(function (response) {
            $scope.AbbrTypes = response.data;
        });
    };
    $scope.GetLeaveType = function () {
        var collectionobj = {};
        collectionobj.Action = '10';
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDDLs', collectionobj);
        getData.then(function (response) {
            $scope.LeaveTypes = response.data;
        });
    };
    $scope.GetEmployees = function () {
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetEmployeeList', collectionobj);
        getData.then(function (response) {
            $scope.EmployeesList = response.data.Table;
        });
    };
    $scope.GetInstallments = function () {
        var collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = $scope.SessionId == undefined || $scope.SessionId == '' ? sessionId : $scope.SessionId;
        collectionobj.AcademicSessionId = $scope.SessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetInstallmentMaster', collectionobj);
        getData.then(function (response) {
            $scope.InstallmentList = response.data;
        });
    };
    $scope.GetMonths = function () {
        var collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GblMasterApi/GetSessionMaster', collectionobj);
        getData.then(function (response) {
            $scope.MonthList = response.data;
        });
    };
    $scope.GetFeeStructureGroup = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFeeStructureGroupDetail', collectionobj);
        getData.then(function (response) {
            $scope.GetFeeStructureGroupList = response.data;
        });
    }

    $scope.GetShifts = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetShiftMaster', collectionobj);
        getData.then(function (response) {
            $scope.Shifts = response.data;
        });
    }
    $scope.GetConcessionheads = function () {
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetConcessionHeadMaster', collectionobj);
        getData.then(function (response) {
            $scope.ConcessionheadList = response.data;
            angular.forEach($scope.ConcessionheadList, function (SI) {
                SI['chk'] = false;
            });
        });
    };
    $scope.GetSubjectListUsingLoginId = function () {
        var collectionobj = {};
        collectionobj.Action = '7';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.CreatedBy = userid;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetSubjectListUsingLoginId', collectionobj);
        getData.then(function (response) {
            $scope.SubjectList = response.data;
        });
    };

    $scope.GetOptionalSubjectList = function (studentCode) {
        var collectionobj = {};
        collectionobj.Action = '7';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.CreatedBy = userid;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.StudentCode = studentCode;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetClassWiseSubjectMaster', collectionobj);
        getData.then(function (response) {
            $scope.OptionalSubjectList = response.data.Table;
        });
    };

    $scope.GetClassesUsingLoginId = function () {
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetClass', collectionobj);
        getData.then(function (response) {
            $scope.ClassList = response.data

        });
    };
    $scope.GetSectionsUsingLoginId = function (classcode) {
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.ClassCode = classcode;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetSection', collectionobj);
        getData.then(function (response) {
            $scope.Sections = response.data
        });
    };

    $scope.FinalStudentsList = function (isactive, academicSessionId, studentCode)
    {
        var collectionobj = {};        
        collectionobj.Action = "12";
        collectionobj.AcademicSessionId = academicSessionId;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.ActiveParital = isactive
        collectionobj.StudentCode = studentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetFinalStudents', collectionobj);
        getData.then(function (response)
        {
            $scope.StudentList = response.data.Table;
            if ($scope.StudentList.length > 0)
            {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;
                    $scope.$applyAsync();
                }, 100);
            }
        });
    }

    $scope.FinalStudentsList_Promiss = function (isactive, academicSessionId, studentCode) {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = "12";
        collectionobj.AcademicSessionId = academicSessionId;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.ActiveParital = isactive
        collectionobj.StudentCode = studentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetFinalStudents', collectionobj);
        return getData.then(function (response) {
            $scope.hideLoader();
            $scope.StudentList = response.data.Table;
            if ($scope.StudentList.length > 0) {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;
                    $scope.$applyAsync();
                }, 100);
            }
        });
    }

    $scope.FinalStudentsListFromCurrentSession_Promiss = function (isactive, studentCode) {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = "18";
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.ActiveParital = isactive
        collectionobj.StudentCode = studentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetFinalStudents', collectionobj);
        return getData.then(function (response) {
            $scope.hideLoader();
            $scope.StudentList = response.data.Table;
            if ($scope.StudentList.length > 0) {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;
                    $scope.$applyAsync();
                }, 100);
            }
        });
    }

    $scope.GetCurrentAcademicSessionAllStudents = function () {
        var collectionobj = {};
        collectionobj.Action = "12";
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.AcademicSessionId = sessionId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetFinalStudents', collectionobj);
        getData.then(function (response) {
            $scope.StudentList = response.data.Table;
            $scope.disabledSearch = false;
            $scope.hideloader = false;
        });
    }

    $scope.GetLedger = function (nature) {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.Nature = nature;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', collectionobj);
        getData.then(function (response) {
            $scope.LedgerList = response.data;
        });
    }

    $scope.GeBanks = function ()
    {
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/MasterApi/GetBankMaster', collectionobj);
        getData.then(function (response)
        {
            $scope.GetBank = response.data;
        });
    };
    $scope.GetYear = function () {
        var collectionobj = {};
        collectionobj.Action = '1';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GblMasterApi/GetAllYear', collectionobj);
        getData.then(function (response) {
            $scope.YearList = response.data;
        });
    };
    $scope.LoadConcessionCategory = function () {
        var collectionobj = {};
        collectionobj.Action = '17';
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetDDLs', collectionobj);
        getData.then(function (response) {
            $scope.ConcessionCategoryList = response.data;
        });
    };
    $scope.LoadSMSSubject = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/SMSMasterApi/GetSMSSubjectMaster', collectionobj);
        getData.then(function (response) {
            $scope.SMSSubjectList = response.data
        });
    };
    $scope.LoadSMSTemplate = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.SMSSubjectCode = $scope.SMSSubjectCode;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.UserType = $scope.UserType;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/SMSMasterApi/GetSMSTemplateMaster', collectionobj);
        getData.then(function (response) {
            $scope.SMSTemplateList = response.data
        });
    };
    $scope.GetAllRole = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../Api/MasterApi/GetRoles', collectionobj);
        getData.then(function (response) {
            $scope.RolesList = response.data;
        });
    }
    $scope.LoadAllStudentsUsingClassSectionList = function (isactive, academicSessionId, studentCode, ClassSectionList) {
        var collectionobj = {};
        collectionobj.Action = "16";
        collectionobj.AcademicSessionId = academicSessionId;
        collectionobj.ClassCode = JSON.stringify(ClassSectionList);
        //collectionobj.SectionCode = $scope.SectionCode;
        //collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.ActiveParital = isactive
        collectionobj.StudentCode = studentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetFinalStudents', collectionobj);
        getData.then(function (response) {
            $scope.StudentList = response.data.Table;
            if ($scope.StudentList.length > 0) {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;
                    $scope.$applyAsync();
                }, 100);
            }
        });
    }
    $scope.LoadAllStudentsUsingClassList = function (isactive, academicSessionId, studentCode, ClassList) {
        var collectionobj = {};
        collectionobj.Action = "16";
        collectionobj.AcademicSessionId = academicSessionId;
        collectionobj.ClassCode = JSON.stringify(ClassList);
        //collectionobj.SectionCode = $scope.SectionCode;
        //collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.ActiveParital = isactive
        collectionobj.StudentCode = studentCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GetMasterApi/GetFinalStudents', collectionobj);
        getData.then(function (response) {
            $scope.StudentList = response.data.Table;
            if ($scope.StudentList.length > 0) {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;
                    $scope.$applyAsync();
                }, 100);
            }
        });
    }

    $scope.GetEmployeeType = function () {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/EmployeeMasterApi/GetDepartmentMaster', collectionobj);
        getData.then(function (response) {
            $scope.EmployeeTypeList = response.data;
        });
    }
  $scope.GetAllClassesWithSections = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "1";
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetAllClassWithSection', collectionobj);
        getData.then(function (response)
        {
            $scope.AllClassSectionList = response.data;
        });
    };

}