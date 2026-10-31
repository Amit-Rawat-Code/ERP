app.StudentVehicleRouteMappingController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSession');
    //$scope.SetFocus('#ddlVehicles');
    $scope.TripList = [{ Code: "1", TripName: "Up Trip" }, { Code: "2", TripName: "Down Trip" }, { Code: "3", TripName: "Round Trip" }]
    var response = [];
    $scope.VtableList2 = [];
    //$scope.studentDetails = {
    //    ClassCode: "",
    //    SectionCode: ""
    //}

    //$scope.StudentClassSection = {
    //    StudentId: ""
    //}


    //$scope.RouteStoppage = {
    //    StoppageId: ""
    //}

    //$scope.TransDirection = {
    //    RouteDirectionId: ""
    //}


    $scope.ddlClass_Change = function (ClassCode) {

        $scope.StudentAttendanceLists = [];
        $scope.GetSections(ClassCode);
    }

    //$scope.rbEntryMode_Change = function () {
    //    angular.forEach($scope.Students, function (student) {
    //        student.chk = false;
    //        student.disabled = false;
    //    })
    //}
    $scope.TransportAppliedStudents = [];
    $scope.GetNewAdmissionStudents = function (classcode) {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.AcademicSessionId = sessionId;
        collectionobj.ClassCode = classcode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.StudentCode = $scope.StudentCode;
        var getData = myService.methode('POST', '../Api/TransportTransactionApi/GetStudentsForTransport', collectionobj);
        getData.then(function (response) {

            $scope.Students = $filter('filter')(response.data, { IsTransportApply: 0 }, true);
            $scope.TransportAppliedStudents = $filter('filter')(response.data, { IsTransportApply: 1 }, true);
            $scope.disabledSearch = false;
            $scope.hideloader = false;
        });

    }

    $scope.FillStudentDetail = function (StudentData) {

        $scope.StudentPhoto = StudentData.SPhoto;
        $scope.SearchText = StudentData.SName;
        $scope.StudentCode = StudentData.SCode;
        $scope.$parent.ClassCode = StudentData.SClassCode;
        $scope.ddlClass_Change(StudentData.SClassCode);
        $scope.ddlSectionCode = StudentData.SSectionCode.toString();
        $scope.AdmStudentName = StudentData.SName;
        $scope.AdmissionNo = StudentData.SAdmissionNo;
        $scope.Address = StudentData.SAddress;
        $scope.ParentName = StudentData.SParentName;
        $scope.Contact = StudentData.SContact;
        $scope.SessionName = StudentData.SSessionName;
        $scope.StudentDOB = new Date(StudentData.SDOB);
        $scope.IsFromMerit = StudentData.IsFromMerit;
        $scope.ClassName = StudentData.SClassName;
        $scope.StreamCode = StudentData.SStreamCode;
    }

    $scope.StudentDataList = [];
    $scope.StudentData = {};
    $scope.FillStudentDetailsM = function (student) {
        if (student.chk || $scope.type == 1) {

            $scope.StudentData =
            {

                SPhoto: student.StudentPhoto,
                SText: student.StudentName,
                SCode: student.StudentCode,
                SName: student.StudentName,
                SClassCode: student.ClassCode,
                SAdmissionNo: student.AdmissionNo,
                SAddress: student.Address,
                SSectionCode: student.SectionCode,
                SParentName: student.FatherName,
                SContact: student.Mobile,
                SSessionName: student.SessionName,
                SDOB: new Date(student.DOB),
                SClassName: student.ClassName,
                SSectionCode: student.SectionCode,
                SSectionName: student.SectionName,
                SStreamCode: student.StreamCode,
                STransID: student.TransID
            };
            //v.TransId = true;
            $scope.StudentDataList.push($scope.StudentData);
            $scope.FillStudentDetail($scope.StudentData);
        }
        else {
            $scope.StudentDataList = $scope.StudentDataList.filter(obj => {
                return obj.SCode !== student.StudentCode
            });

            $scope.FillStudentDetail($scope.StudentDataList[$scope.StudentDataList.length - 1]);
        }
    }

    $scope.StudentCount = function () {
        var collectionobj = {};
        collectionobj.Action = 11;
        collectionobj.SessionId = sessionId;
        collectionobj.VehicleCode = $scope.ddlVehicleNumber;
        collectionobj.RouteCode = $scope.ddlRouteName;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/TransportTransactionApi/GetStudentRouteVehicleMapping', collectionobj);
        getData.then(function (response) {

            $scope.CountList = response.data;

            $scope.Vacant = $scope.CountList[0].Vacant;
            $scope.filled = $scope.CountList[0].filled;

        });
    }

    $scope.SelectVehicleNumber = function () {

        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;
        collectionobj.RouteCode = $scope.ddlRouteName;
        collectionobj.Stoppage = $scope.ddlStoppage;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleMaster', collectionobj);
        getData.then(function (response) {

            $scope.VehicleNumberList = response.data;
        });
    }

    $scope.SelectVehicleNumberGrid = function (GridRouteId, GridStoppageId, obj) {

        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;
        collectionobj.RouteCode = GridRouteId;
        collectionobj.Stoppage = GridStoppageId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleMaster', collectionobj);
        getData.then(function (response) {

            obj.VehicleNumberGridList = response.data;
        });
    }

    $scope.SelectRouteName = function () {

        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.SessionId = sessionId;
        collectionobj.StoppageCode = $scope.ddlStoppage;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleRouteMaster', collectionobj);
        getData.then(function (response) {

            $scope.VehicleRouteName = response.data;
        });

    }

    $scope.SelectRouteNameGrid = function (GridStoppageId, obj) {
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.SessionId = sessionId;
        collectionobj.StoppageCode = GridStoppageId;
        collectionobj.StudentCode = obj.StudentCode;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleRouteMaster', collectionobj);
        getData.then(function (response) {
            obj.VehicleRouteNameGrid = response.data;
        });

    }

    $scope.btnEdit_Click = function (obj) {
        $scope.SelectRouteNameGrid(obj.StoppageCode, obj);
        $scope.SelectVehicleNumberGrid(obj.RouteCode, obj.StoppageCode, obj);
    }

    $scope.ddlRouteName_Change = function () {
        $scope.SelectVehicleNumber();
    }

    $scope.ddlStopages_Change = function () {

        $scope.SelectRouteName();
    }

    $scope.change_ddlStatus = function (listofstoppage) {
        if (listofstoppage.ddlStatus == 'false') {
            listofstoppage.showDeactivation = true;
        }
        else {
            listofstoppage.showDeactivation = false;
        }
        $scope.$applyAsync();
    }

    $scope.GetStoppages = function () {

        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.RouteCode = $scope.ddlRouteName;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleRouteMaster', collectionobj);
        getData.then(function (response) {

            $scope.Stoppages = response.data;

        });
    }

    $scope.GetFareDetails = function () {

        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.TripMode = $scope.TripMode;
        collectionobj.Stoppage = $scope.ddlStoppage;
        collectionobj.RouteCode = $scope.ddlRouteName;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.Action = 5;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', "../Api/TransportMasterApi/GetVehicleFareMaster", collectionobj);
        getData.then(function (response) {

            $scope.FareDtlAmt = response.data;
        });
    }

    $scope.GetFareDetailsGrid = function (GridRouteId, obj) {
        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.RouteCode = GridRouteId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.Action = 5;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', "../Api/TransportMasterApi/GetVehicleFareMaster", collectionobj);
        getData.then(function (response) {

            $scope.FareDtlAmtGrid = response.data;
            obj.FareAmount = $scope.FareDtlAmtGrid[0].FareAmount;
        });
    }

    //$scope.GetConsessionDetails = function () {

    //    var collectionobj = {};
    //    collectionobj.SessionId = sessionId;
    //    collectionobj.RelationshipId = relationshipId;
    //    collectionobj.FYId = fyId;
    //    collectionobj.Action = 6;
    //    collectionobj.CreatedBy = userid;
    //    collectionobj.UpdatedBy = userid;
    //    var getData = myService.methode('POST', "../Api/TransportMasterApi/GetVehicleFareMaster", collectionobj);
    //    getData.then(function (response) {

    //        $scope.ConcessionheadList = response.data;
    //    });
    //}

    //$scope.GetConsessionAmount = function (ConcessionHeadCode, obj)
    //{

    //    var collectionobj = {};
    //    collectionobj.SessionId = sessionId;
    //    collectionobj.RelationshipId = relationshipId;
    //    collectionobj.FYId = fyId;
    //    collectionobj.Action = 7;
    //    collectionobj.CreatedBy = userid;
    //    collectionobj.UpdatedBy = userid;
    //    var getData = myService.methode('POST', "../Api/TransportMasterApi/GetVehicleFareMaster", collectionobj);
    //    getData.then(function (response)
    //    {

    //        $scope.ConcessionAmountList = response.data;
    //        obj.discAmount = ($filter('filter')($scope.ConcessionheadList, { ConcessionHeadCode: ConcessionHeadCode }, true))[0].DiscountAmt;
    //        $scope.ConcessionAmt = obj.discAmount;
    //        var monthAmt = ($scope.FareDtlAmt[0].FareAmount);
    //        var discAmt = (obj.discAmount);
    //        obj.NetAmount = monthAmt - discAmt;
    //        $scope.NetAmt = obj.NetAmount;

    //    });
    //}  


    $scope.Vtable = {};
    $scope.GetGridData = function () {

        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.VehicleCode = $scope.ddlVehicleNumber;
        collectionobj.Stoppage = $scope.ddlStoppage;
        collectionobj.RouteCode = $scope.ddlRouteName;
        collectionobj.Action = 7;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', "../Api/TransportTransactionApi/GetStudentRouteVehicleMapping", collectionobj);
        getData.then(function (response) {
            angular.forEach(response.data, function (obj) {
                var isDuplicate = $scope.VtableList2.some(function (item, idx) {
                    return item.StudentCode == obj.StudentCode
                });
                if (!isDuplicate)
                    $scope.VtableList2.push(obj);
            })
        });
        $scope.$applyAsync();
    }


    $scope.GetVehicleCapacity = function () {

        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.Code = $scope.ddlVehicleNumber;
        collectionobj.Action = 6;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', "../Api/TransportMasterApi/GetVehicleMaster", collectionobj);
        getData.then(function (response) {

            $scope.CapacitiesList = response.data;
            $scope.ddlVehicleCapacity = $scope.CapacitiesList[0].VehicleCapacity;
        });
    }

    $scope.GetVehicleCapacityGrid = function (GridVehicleCode, obj) {

        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.VehicleCode = GridVehicleCode;
        collectionobj.Action = 6;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', "../Api/TransportMasterApi/GetVehicleMaster", collectionobj);
        getData.then(function (response) {

            $scope.CapacitiesListGrid = response.data;
            obj.VehicleCapacity = $scope.CapacitiesListGrid[0].VehicleCapacity;
        });
    }



    $scope.ddlCheckAll = function (ModelList, filter, repeatinlist, i) {

        if (filter != null && filter != "" && repeatinlist == null) {
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
        else if (repeatinlist != null) {
            var l1 = $scope[repeatinlist];
            var l2 = l1[i]
            var l3 = l2[ModelList]
            $.each(l3, function (index, array) {
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
    }

    $scope.ddlUnCheckAll = function (ModelList, repeatinlist, i) {
        if (repeatinlist != null) {
            var l1 = $scope[repeatinlist];
            var l2 = l1[i]
            var l3 = l2[ModelList]
            $.each(l3, function (index, array) {
                array.chk = false
            })
        }
        else {
            $.each($scope[ModelList], function (index, array) {
                array.chk = false
            })
        }

    }

    $scope.StudentDataDisable = function () {
        $scope.Students.map(obj => {
            obj.disabled = false;
            obj.chk = false;
        });
        if ($scope.VtableList2 != null) {
            $scope.Students.map(obj => {
                $scope.VtableList2.map(obj1 => {
                    if (obj.StudentCode == obj1.StudentCode) {
                        obj.disabled = true;
                        obj.chk = true;
                    }
                });
            });
        }
    }


    $scope.AddStopage = function () {

        $('#ddlClass').removeClass('validate')
        $('#ddlSection').removeClass('validate')

        if (isValidate()) {

            var filterActiveStudentRecords = $filter('filter')($scope.VtableList2, { StudentCode: $scope.StudentCode, StoppageCode: $scope.ddlStoppage, ddlStatus: 'true' });
            if (filterActiveStudentRecords.length == 0) {
                var ApplicableDate = moment(($scope.ApplicableDate)).format('DD-MMM-YYYY');
                var len = $scope.CapacitiesList[0].VehicleCapacity;
                if ($scope.VtableList2.length < len) {
                    for (sdata of $filter('filter')($scope.StudentDataList,{ SCode: $scope.StudentCode },true)) {
                        var VSSudentCode = sdata.SCode;
                        var VSStudentName = sdata.SName;
                        var VSClassCode = sdata.SClassCode;
                        var VSClassName = sdata.SClassName;
                        var VSAddress = sdata.SAddress;
                        var VSSectionCode = sdata.SSectionCode;
                        var VSAdmissionNo = sdata.SAdmissionNo;
                        var VSFatherName = sdata.SParentName;
                        var VSSectionName = sdata.SSectionName;

                        var VSRouteCode = $scope.ddlRouteName;
                        var VSVehicleCode = $scope.ddlVehicleNumber;
                        var VSStoppageCode = ($filter('filter')($scope.Stoppages, { StoppageCode: $scope.ddlStoppage }))[0].StoppageCode;
                        //var VSFareCode = ($filter('filter')($scope.FareDtlAmt, { FareCd: $scope.FareDtlAmt.FareCode }))[0].FareCode;
                        var VSVehicleCapacityCode = $scope.ddlVehicleCapacity;

                        var VSRouteName = ($filter('filter')($scope.VehicleRouteName, { Code: $scope.ddlRouteName }))[0].RouteName;
                        var VSVehicleName = ($filter('filter')($scope.VehicleNumberList, { Code: $scope.ddlVehicleNumber }))[0].VehicleNumber;
                        var VSStoppageName = ($filter('filter')($scope.Stoppages, { StoppageCode: $scope.ddlStoppage }))[0].Stoppage;
                        var VSFare = ($filter('filter')($scope.FareDtlAmt, { FareAmt: $scope.FareDtlAmt.FareCode }))[0].FareAmount;
                        var VSVehicleCapacity = $scope.CapacitiesList[0].VehicleCapacity;
                        var VSTripMode = $scope.TripMode;
                        var VSTripName = ($filter('filter')($scope.TripList, { Code: $scope.TripMode }))[0].TripName;;
                        //var VSConcessionAmount = $scope.ConcessionAmt
                        var VSApplicableDate = ApplicableDate;
                        //var VSNetFare = $scope.NetAmt;
                        var VStransId = sdata.STransID;
                        var ddlStatus = $scope.IsActive
                        var data =
                        {
                            StudentCode: VSSudentCode,
                            StudentName: VSStudentName,
                            AdmissionNo: VSAdmissionNo,
                            Father: VSFatherName,
                            RouteCode: VSRouteCode,
                            RouteName: VSRouteName,
                            ClassName: VSClassName,
                            ClassCode: VSClassCode,
                            Adddress: VSAddress,
                            SectionCode: VSSectionCode,
                            SectionName: VSSectionName,
                            VehicleName: VSVehicleName,
                            VehicleCode: VSVehicleCode,
                            StoppageCode: VSStoppageCode,
                            StoppageName: VSStoppageName,
                            VehicleCapacityCode: VSVehicleCapacityCode,
                            VehicleCapacity: VSVehicleCapacity,
                            TripMode: VSTripMode,
                            TripName: VSTripName,
                            ApplicableDate: VSApplicableDate,
                            FareAmount: VSFare,
                            //FareCode: VSFareCode,
                            //ConcessionAmount: VSConcessionAmount,
                            //NetFare: VSNetFare,
                            ddlStatus: ddlStatus,
                            TransID: VStransId,
                            NewRecord: true
                        };

                        response.push(data);
                        $scope.VtableList2.push(data);
                        $.each($scope.VtableList2, function (index, obj1) {
                            if (obj1.TransID == undefined) {
                                TransID = true;
                            }
                        });
                    }

                }
                else {
                    alert("Vahicle Capacity Full")
                }

                $scope.TripMode = '';
                $scope.ddlFare = '';
                $scope.ddlStoppage = '';
                $scope.ddlRouteName = '';
                $scope.ddlVehicleNumber = '';
                $scope.ApplicableDate = '';
            }
            else {
                showMsgBox('Student already added in grid in active status.Please change student status in bottom grid for selected stoppage.')
            }
        }
    };

    $scope.RemoveStopage = function (rowNo) {
        $scope.VtableList2 = $filter('filter')($scope.VtableList2, { RowNo: '!' + rowNo });
    };

    $scope.ClearRecord = function () {
        $scope.AdmStudentName = '';
        $scope.SectionCode = '';
        $scope.ClassName = '';
        $scope.ddlRouteName = '';
        $scope.ddlStoppage = '';
        $scope.TripMode = '';
        $scope.ddlFare = '';
        $scope.ShiftName = '';
        $scope.ddlVehicleNumber = '';
        $scope.ddlVehicleCapacity = '';
        $scope.DeactivationDate = '';
        $scope.$parent.ClassCode = '';
        $scope.$parent.SectionCode = '';
        $scope.Remark = '';
        $scope.SearchText = '';
        $scope.ApplicableDate = '';
        $scope.SessionName = '';
        $scope.AdmissionNo = '';
        $scope.Address = '';
        $scope.ParentName = '';
        $scope.Contact = '';
        $scope.StudentDataList = [];
        $scope.StudentData = {};
        $scope.TripDistance = 0;
        $scope.TripFare = 0;
        var responselength = response.length;
        if (responselength = 0) { }
    }

    $scope.SaveRecord =async function () {

        $('#ddlClass').removeClass('validate')
        $('#ddlSection').removeClass('validate')
        $('#ddlStudentClassSection').removeClass('validate')
        $('#ddlRouteStoppages').removeClass('validate')
        $('#ddlRouteDirection').removeClass('validate')
        $('#txtTripDistance').removeClass('validate')
        $('#txtTripFare').removeClass('validate')
        $('#ddlRouteName').removeClass('validate')
        $('#ddlVehicleNumber').removeClass('validate')
        $('#ddlStopages').removeClass('validate')
        $('#ddlVehicleCapacity').removeClass('validate')
        $('#ddlTripMode').removeClass('validate')
        $('#txtAppliedDate').removeClass('validate')
        $('#ddlIsActive').removeClass('validate')
        if (isValidate()) {
            //var len = $scope.CapacitiesListGrid[0].VehicleCapacity;
            //$scope.VtableList2.length = len;
            var flag = "-1";
            if ($scope.VtableList2.length > 0) {
                for (let i = 0; i < $scope.VtableList2.length; i++) {
                    var collectionobj = {};
                    collectionobj.StudentVehicleRouteMappingId = $scope.hfId;
                    if ($scope.VtableList2[i].NewRecord) {
                        collectionobj.VehicleCode = $scope.VtableList2[i].VehicleCode;
                        collectionobj.RouteCode = $scope.VtableList2[i].RouteCode;
                        collectionobj.Stoppage = $scope.VtableList2[i].StoppageCode;
                        collectionobj.VehicleCapacity = $scope.VtableList2[i].VehicleCapacity;
                        collectionobj.StudentCode = $scope.VtableList2[i].StudentCode;
                        collectionobj.SectionCode = $scope.VtableList2[i].SectionCode;
                        collectionobj.ClassCode = $scope.VtableList2[i].ClassCode;
                        collectionobj.SectionName = $scope.VtableList2[i].SectionName;
                        collectionobj.AdmissionNo = $scope.VtableList2[i].AdmissionNo;
                        collectionobj.Father = $scope.VtableList2[i].Father;
                        collectionobj.ApplicableDate = $scope.VtableList2[i].ApplicableDate;
                        collectionobj.TripMode = $scope.VtableList2[i].TripMode;
                        collectionobj.FareAmount = $scope.VtableList2[i].FareAmount;
                        //collectionobj.ConcessionHeadCode = $scope.VtableList2[i].ConcessionHeadCode;
                        //collectionobj.discAmount = $scope.VtableList2[i].discAmount;
                        //collectionobj.NetAmount = $scope.VtableList2[i].NetAmount;
                        //collectionobj.FareAmount = $scope.VtableList2[i].FareAmount;
                        //collectionobj.DeactivationDate = $scope.VtableList2[i].DeactivationDate;
                        collectionobj.Action = 1;
                    }
                    else {
                        collectionobj.Srno = $scope.VtableList2[i].Srno;
                        collectionobj.VehicleCode = $scope.VtableList2[i].VehicleCode;
                        collectionobj.RouteCode = $scope.VtableList2[i].RouteCode;
                        collectionobj.Stoppage = $scope.VtableList2[i].StoppageCode;
                        collectionobj.IsActive = $scope.VtableList2[i].ddlStatus;
                        if ($scope.VtableList2[i].ddlStatus == 'false' && $scope.VtableList2[i].DeactivationDate != '' && $scope.VtableList2[i].DeactivationDate != null && $scope.VtableList2[i].DeactivationDate != undefined)
                            collectionobj.DeactivationDate = moment($scope.VtableList2[i].DeactivationDate).format('DD-MMM-YYYY');
                        collectionobj.Action = 2;
                    }
                    collectionobj.SessionId = sessionId;
                    collectionobj.FyId = fyId;
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.CreatedBy = userid;
                    collectionobj.UpdatedBy = userid;

                    var getData = myService.methode('POST', "../Api/TransportTransactionApi/InsertUpdateDeleteStudentRouteVehicleMapping", collectionobj);
                    await getData.then(function (response) {
                        if (showMsgBox(response.data)) {
                            if (i == $scope.VtableList2.length-1)
                            $scope.ClearControl(1);
                        }
                    });
                }
            }
            else {
                showMsgBox('Please Select Student and Stoppage data')
            }
        }

    };
    /*Delete Button Click Event*/

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.StudentVehicleRouteMappingId = $scope.hfId;
        collectionobj.StudentCode = $scope.VtableList2[0].StudentCode;
        //collectionobj.DeactivationDate = moment($scope.VtableList2[0].DeactivationDate).format('YYYY-MMM-DD H:mm');
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', "../Api/TransportTransactionApi/InsertUpdateDeleteStudentRouteVehicleMapping", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {

                $scope.ClearControl(1);
            }
        });
    };


    /*Reset Button Click Event*/
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
        //$scope.SetFocus('#ddlVehicles');
        $scope.IsActive = "true";
        $scope.hfId = "";
        $scope.ddlRouteName = '';
        $scope.ddlVehicleNumber = '';
        $scope.ddlStoppage = '';
        $scope.listofstoppagestudents = "";
        if (typeof ($scope.Transvehicle) !== 'undefined')
            $scope.Transvehicle.VehicleId = "";
        if (typeof ($scope.TranRoute) !== 'undefined')
            $scope.TranRoute.RouteId = "";
        $scope.StudentVehicleRouteList = [];
        $scope.TransportAppliedStudents = [];
        $scope.VtableList2 = '';
        $scope.StudentDataList = '';
        $scope.StudentData = '';
        $scope.ClearRecord();
        location.reload();
        //$scope.ddlUnCheckAll();
        var table = $('#vitual').DataTable();
        table.clear().draw();
        response = [];

        if (flag == 0) {
            showMsgBox('4');
        };
    }



    /*Search Button Click Event*/
    $scope.StudentVehicleRouteList = [];

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/TransportTransactionApi/GetStudentRouteVehicleMapping", collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Id", "HeaderValue": "Id", "Value": "TransID", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student", "HeaderValue": "StudentName", "Value": "StudentCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Vehicle", "HeaderValue": "VehicleNumber", "Value": "VehicleCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Route", "HeaderValue": "RouteName", "Value": "RouteId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            $scope.StudentVehicleRouteList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {

                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                var collectionobj = {};

                $scope.StudentVehicleRouteList = $filter('filter')($scope.StudentVehicleRouteList, { 'TransID': $scope.hfId });
                collectionobj.StudentCode = $(this).find('input[type="hidden"]#hdStudentName').val();
                collectionobj.TransId = $scope.StudentVehicleRouteList[0].TransID;
                $scope.Save = "Edit";
                $scope.disableDelete = false;

                collectionobj.Action = 10;
                collectionobj.SessionId = sessionId;
                collectionobj.RelationshipId = relationshipId;


                var getData = myService.methode('POST', "../Api/TransportTransactionApi/GetStudentRouteVehicleMapping", collectionobj);
                getData.then(function (response) {
                    $scope.VtableList2 = response.data;
                    var StudentRow = $filter('filter')($scope.TransportAppliedStudents, { StudentCode: $scope.VtableList2[0].StudentCode });
                    $scope.SearchText = $scope.VtableList2[0].StudentName
                    $scope.FillStudentDetailsM(StudentRow[0]);
                    $scope.disabledDDLClass = true;
                    $scope.disableSection = true;
                    $scope.disabledDDLClass = true;
                });

                $('#ddlClass').removeClass('validate');
                $('#ddlSection').removeClass('validate');
                $('#ddlStudentClassSection').removeClass('validate');
                $('#ddlRouteStoppages').removeClass('validate');
                $('#ddlRouteDirection').removeClass('validate');
                $('#txtTripDistance').removeClass('validate');
                $('#txtTripFare').removeClass('validate');
                $('#ddlRouteName').removeClass('validate');
                $('#ddlVehicleNumber').removeClass('validate');
                $('#ddlStopages').removeClass('validate');
                $('#ddlVehicleCapacity').removeClass('validate');
                $('#ddlTripMode').removeClass('validate');
                $('#txtAppliedDate').removeClass('validate');
                $('#ddlIsActive').removeClass('validate');
                $scope.SetFocus('#ddlVehicles', true);
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.hideLoader();
                //$scope.$applyAsync();
                $scope.$applyAsync();
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
        $scope.started();
        return false;
    });

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "VehicleRoute", "HeaderValue": "VehicleRoute", "Value": "VehicleId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        var tblnheader =
            [
                { "HeaderText": "Id", "Value": "StudentCode", "HeaderValue": "Id", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Student", "Value": "StudentCode", "HeaderValue": "STDNUMBER", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class", "HeaderValue": "ClassName", "Value": "ClassId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Section", "HeaderValue": "SectionName", "Value": "SectionId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Stoppage", "HeaderValue": "StoppageName", "Value": "StoppageId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "TripMode", "HeaderValue": "RouteDirection", "Value": "RouteDirectionId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Distance(In Km.)", "HeaderValue": "Distance", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Fare", "HeaderValue": "FareAmount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintNestedMaster(tblheader, $scope.StudentVehicleRouteList, window.document.title, tblnheader, $scope.listofstoppagestudents);
    };

}; 