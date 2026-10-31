app.StudentWiseConcessionMappingController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSession');
    $scope.StudentCode = "";
    $scope.IsFinalStd = '';
    $scope.FromAdm = false;
    $scope.$parent.ClassCode = getParameterByName('Para1');
    $scope.StdStudentCode = getParameterByName('Para2');
    $scope.IsFinalStd = getParameterByName('Para3');
    $scope.FromAdm = getParameterByName('Para4');
    $scope.chk = false;
    $scope.AllInstConcessionCalculationData = [];

    $scope.CalculateNetDiscAmt = function (obj, totalAmount) {
        obj.DiscountPer = $scope.FormatToDecimal((obj.DiscountAmount * 100 / totalAmount), 'Yes');
        obj.NetDiscAmt = obj.DiscountAmount - obj.AdjustmentAmount
    }
    $scope.InitPer = function (obj, totalAmount) {
        if (Number(obj.DiscountAmount) > 0 && obj.IsFromSCFSD == false) {
            obj.DiscountPer = $scope.FormatToDecimal((obj.DiscountAmount * 100 / totalAmount), 'Yes');
            obj.NetDiscAmt = obj.DiscountAmount - obj.AdjustmentAmount
        }
    }

    //-------------------------------------------------------------------------------------------------------
    $scope.index = 0;
    $scope.Attachments = [];

    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            if (args.file.type.contains("image") || args.file.type.contains("pdf") || args.file.type.contains("doc") || args.file.type.contains("docx")) {
                $scope.Attachments[$scope.index] = args.file;
            }
            else {
                showMsgBox('only .jpg|.jpeg|.bmp|.doc|.docx|.pdf')
            }
        });
    });

    $scope.SetIndex = function (index) {
        $scope.index = index;
    }

    $scope.AddRow = function () {
        $scope.Attachments.push({ File: "", FileName: "" })
        $scope.$applyAsync();
    }

    $scope.RemoveRow = function (index) {
        $scope.filterList = [];
        $.each($scope.Attachments, function (i, array) {
            if (i != index)
                $scope.filterList.push(array)
        })
        $scope.Attachments = $scope.filterList;
    }

    $scope.ImagesUpload = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.StudentCode = $scope.StudentCode;
            collectionobj.FileJson = JSON.stringify($scope.Attachments);
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;

            if ($scope.Upload == "Upload") {
                collectionobj.Action = 12;
                collectionobj.CreatedBy = userid;
            }

            var getData = myService.postmethode('POST', '../Api/FeeMasterApi/InsertImages', collectionobj, $scope.Attachments);
            getData.then(function (response) {
                if (response.data == 1) {
                    showMsgBox("999", "Image", "Image Uploaded Successfully", "success", 'btn-success');
                    $scope.LoadAttachments();
                }
                else {
                    showMsgBox("Sorry, Image not uploaded.")
                }
            });
        }
    }

    $scope.LoadAttachments = function () {
        var collectionobj = {};
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 13;
       
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetConcessionDocs', collectionobj);
        getData.then(function (response) {
            $scope.Attachments = response.data
            if ($scope.Attachments == undefined || $scope.Attachments == null || $scope.Attachments.length == 0)
                $scope.Attachments = [{ File: "", FileName: "" }]
            $scope.$applyAsync();
        });
        
    }
    //--------------------------------------------------------------------------------------------------------

    $scope.ConcessionCalculationList = [];

    $scope.GetStudentsList = function (isactive, academicSessionId, studentcode, searchclick) {
        var collectionobj = {};
        collectionobj.Action = "13";
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.IsActive = isactive
        collectionobj.StudentCode = studentcode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/GetMasterApi/GetFinalStudents', collectionobj);
        getData.then(function (response) {
            $scope.StudentList = response.data.Table;
            if (studentcode != null && studentcode != '')
                $scope.StudentCode = studentcode;

            if (searchclick == null) {
                $scope.AllInstConcessionCalculationData = [];
                $scope.FinalInstallmentList = [];

                $scope.StudentName = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].Name;
                $scope.AdmissionNo = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].AdmissionNo
                $scope.ParentName = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].FatherName
                $scope.Contact = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].Mobile

                $scope.$parent.ClassCode = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].ClassCode
                $scope.StreamCode = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].StreamCode

                $scope.IsFinalStd = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].IsFinalStudent == 'Yes' ? 'true' : 'false';

                $scope.chk = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].ApplyConOnPaybleAmount

                $scope.Show = false;
                $scope.InstallmentList = [];
                $scope.LoadAttachments();
                $scope.GetInstallment();
                $scope.LoadConcessionCategory();
            }
        });
    }
    if ($scope.FromAdm) {
        $scope.disabledDDLClass = true;
        setTimeout(function () {
            $scope.disableSection = true;
        },100)
       
        $scope.GetSections($scope.$parent.ClassCode);
        $scope.GetStudentsList(1, sessionId, $scope.StdStudentCode);
        $scope.disabledbtn = true;
    }

    $scope.GetInstallment = function () {
        var collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.StudentCode = $scope.StudentCode;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetStudentConcessionDetails', collectionobj);
        getData.then(function (response) {
            $scope.InstallmentList = response.data.Table;
            $.each($scope.InstallmentList, function (index, obj) {
                obj.IsActive = false;
            });
            
        });
    };

    $scope.GetStudents = function (searchclick)
    {
        $scope.$parent.ClassCode = "";

        $scope.GetStudentsList(1, sessionId, $scope.StdStudentCode, searchclick);//sachin
        $scope.Show = true;
    }

    $scope.ddlClass_Change = function () {
        $scope.GetSections($scope.$parent.ClassCode);
        $scope.GetStudentsList(1, sessionId, $scope.StdStudentCode);
       
    };
    $scope.ddlSection_change = function () {
        $scope.GetStudentsList(1, sessionId, $scope.StdStudentCode);
    };

    $scope.FillStudentDetail = function (studentcode) {
        $scope.AllInstConcessionCalculationData = [];
        $scope.FinalInstallmentList = [];

        $scope.StudentCode = studentcode;

        $scope.StudentName = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].Name;
        $scope.AdmissionNo = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].AdmissionNo
        $scope.ParentName = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].FatherName
        $scope.Contact = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].Mobile

        $scope.$parent.ClassCode = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].ClassCode
        $scope.StreamCode = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].StreamCode

        $scope.IsFinalStd = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].IsFinalStudent== 'Yes' ? 'true' : 'false';

        $scope.chk = ($filter('filter')($scope.StudentList, { StudentCode: studentcode }))[0].ApplyConOnPaybleAmount

        $scope.Show = false;
        $scope.InstallmentList = [];

        $scope.LoadAttachments();
        $scope.GetInstallment();
        $scope.LoadConcessionCategory();
    }



    $scope.GetConcessionheadsWithInstallment = function (obj) {
        var collectionobj = {};
        collectionobj.Action = '9';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.InstallmentCode = obj.Code;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetStudentConcessionDetails', collectionobj);
        getData.then(function (response) {
            obj.ConcessionheadList = response.data.Table;
        });
    };

    $scope.GetAppliedConcessionheadsWithInstallment = function (obj) {
      
            var collectionobj = {};
            collectionobj.Action = '4';
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.StudentCode = $scope.StudentCode;
            collectionobj.InstallmentList = JSON.stringify({ Code: obj.Code });
            var getData = myService.methode('POST', '../Api/FeeMasterApi/GetStudentConcessionDetails', collectionobj);
            getData.then(function (response) {
                obj.AppliedConcessionheadList = response.data.Table1;
                $scope.CalculateConcession(obj, obj.index);
            });
    };
    var rowno = "";

    $scope.ddlConcessionhead_Change = function (obj, obj2, index) {
        var collectionobj = {};
        collectionobj.Action = '6';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.InstallmentList = JSON.stringify($scope.InstallmentList);
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetStudentConcessionDetails', collectionobj);
        getData.then(function (response) {
            angular.forEach($scope.InstallmentList, function (values) {
                angular.forEach(response.data.Table, function (SI) {
                    if (SI.Code == values.Code) {
                        values.PaidAmt = SI.PaidAmt;
                    }
                });
            });
        });
        $scope.CalculateConcession(obj2, index);
    }
    $scope.CheckList = [];
    $scope.ddlConcessionhead_Change1 = function (obj, obj2, index) {

        if (obj2.DueStatus == 'Yes' && obj2.PaidStatus == 'Yes') return;

        obj2.AppliedConcessionheadList.push(
            {
                "Code": obj.Code,
                "ConcessionHeadName": obj.ConcessionHeadName,
                "IsActive": true,
                "Srno": obj2.AppliedConcessionheadList.length+1,
                "chk": true
            }
        );

        var collectionobj = {};
        collectionobj.Action = '6';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.InstallmentList = JSON.stringify($scope.InstallmentList);
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetStudentConcessionDetails', collectionobj);
        getData.then(function (response) {
            angular.forEach($scope.InstallmentList, function (values) {
                angular.forEach(response.data.Table, function (SI) {
                    if (SI.Code == values.Code) {
                        values.PaidAmt = SI.PaidAmt;
                    }
                });
            });
        });
        $scope.CalculateConcession(obj2, obj2.index);
    }

    $scope.CalculateConcession = function (obj, index) {
        rowno = index;
        var collectionobj = {};
        //collectionobj.Action = $scope.chk ? '7' : '8';
        collectionobj.Action = '8';//Action 8 For Flat Discount
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.InstallmentList = JSON.stringify($scope.InstallmentList);
        collectionobj.InstallmentCode = obj.Code;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetStudentConcessionDetails', collectionobj);
        getData.then(function (response) {
            if (response.data == null || response.data.Table.length == 0) return;
            $scope.ConcessionCalculationList = JSON.parse(response.data.Table[0].ConcessionCalculationList);
            $scope.TempList = [];
            $scope.InstallmentDiscountAmount = 0;
            angular.forEach($scope.ConcessionCalculationList, function (obj1) {
                angular.forEach(obj1.ConcessionList, function (obj2) {
                    angular.forEach(obj2.FeeHeadList, function (obj3) {
                        $scope.TempList.push({
                            TransId: obj2.TransId,
                            PostingDate: new Date(obj2.PostingDate),
                            PostingDateFormated: moment(obj2.PostingDate).format('DD-MMM-YYYY'),
                            OldSrno: obj2.OldSrno,
                            Srno: obj2.Srno,
                            StudentCode: $scope.StudentCode,
                            InstallmentCode: obj1.InstallmentCode,
                            ConcessionheadCode: obj2.ConcessionCode,
                            ConcessionCategoryId: obj2.ConcessionCategoryId,
                            DiscountAmt: obj3.DiscountAmount,
                            DiscountPercentage: obj3.DiscountPer,
                            FeeHeadCode: obj3.FeeHeadCode,
                            IsFromSCFSD: obj3.IsFromSCFSD,
                            ChkPer: obj3.ChkPer,
                            ChkDsc: obj3.ChkDsc
                        });
                        $scope.InstallmentDiscountAmount = Number($scope.InstallmentDiscountAmount) + Number(obj3.DiscountAmount);
                    });
                });
            });
            $scope.AllInstConcessionCalculationData[index] = $scope.TempList;

            angular.forEach($filter('filter')($scope.InstallmentList, { Code: obj.Code }, true), function (values) {
                values.DiscountAmt = $scope.InstallmentDiscountAmount;
                values.NetPayableAmt = values.PayableAmt - values.DiscountAmt;
                values.BalanceAmt = values.NetPayableAmt - values.PaidAmt;
            });
        });
    }

    $scope.hfInstallmentCode = "";
    $scope.SetValues = function (obj) {
        $scope.hfInstallmentCode = obj.Code;
        $scope.hfDueStatus = obj.DueStatus;
        $scope.hfPaidStatus = obj.PaidStatus;
        $scope.CalculateConcession(obj, obj.index)
    }

    $scope.CreateFinalConcessionList = function () {
        $scope.TempList = [];
        $scope.InstallmentDiscountAmount = 0;
        $.each($scope.ConcessionCalculationList, function (index1, obj1) {
            $.each(obj1.ConcessionList, function (index2, obj2) {
                $.each(obj2.FeeHeadList, function (index3, obj3) {
                    $scope.TempList.push({
                        TransId: obj2.TransId,
                        PostingDate: new Date(obj2.PostingDate),
                        PostingDateFormated: moment(obj2.PostingDate).format('DD-MMM-YYYY'),
                        OldSrno: obj2.OldSrno,
                        Srno: obj2.Srno,
                        StudentCode: $scope.StudentCode,
                        InstallmentCode: obj1.InstallmentCode,
                        ConcessionheadCode: obj2.ConcessionCode,
                        ConcessionCategoryId: obj2.ConcessionCategoryId,
                        DiscountAmt: obj3.DiscountAmount,
                        DiscountPercentage: obj3.DiscountPer,
                        FeeHeadCode: obj3.FeeHeadCode,
                        IsFromSCFSD: obj3.IsFromSCFSD,
                        ChkPer: obj3.ChkPer,
                        ChkDsc: obj3.ChkDsc
                    });
                    $scope.InstallmentDiscountAmount = Number($scope.InstallmentDiscountAmount) + Number(obj3.DiscountAmount);
                });
            });
        });

        angular.forEach($filter('filter')($scope.InstallmentList, { Code: $scope.hfInstallmentCode }, true), function (values) {
            values.DiscountAmt = $scope.InstallmentDiscountAmount;
            values.NetPayableAmt = values.PayableAmt - values.DiscountAmt;
            values.BalanceAmt = values.NetPayableAmt - values.PaidAmt;
        });

        $scope.AllInstConcessionCalculationData[rowno] = $scope.TempList;
    }

    $scope.CalucateAmount = function (obj1, obj2) {
        obj2.DiscountAmount = Math.round(Number(obj1.TotalAmount) * Number(obj2.DiscountPer) / 100, 0);
        obj2.DiscountPer = Math.round(obj2.DiscountAmount * 100 / obj1.TotalAmount, 2);
        obj2.NetDiscAmt = obj2.DiscountAmount - obj2.AdjustmentAmount
    }



    $scope.SaveRecord = function (redirecttoFeeMapping) {
        if (isValidate()) {

            var flag = true;
            $.each($scope.InstallmentList, function (index, list) {
                if (list.BalanceAmt < 0) {
                    flag = false;
                }
            })
            if (flag) {
                $scope.FinalInstallmentList = [];
                $.each($scope.AllInstConcessionCalculationData, function (index, list) {
                    if (list != undefined) {
                        $.each(list, function (index1, obj) {
                            obj.RowNo = index + 1;
                            $scope.FinalInstallmentList.push(obj);
                        })
                    }
                })

                var collectionobj = {};
                collectionobj.StudentCode = $scope.StudentCode;
                collectionobj.InstallmentList = JSON.stringify($scope.FinalInstallmentList);
                collectionobj.ConcessionList = JSON.stringify($scope.InstallmentList);
                //collectionobj.ApplyConOnPaybleAmount = $scope.chk;
                collectionobj.ApplyConOnPaybleAmount = false;
                collectionobj.FYId = fyId;
                collectionobj.IsActive = $scope.IsActive;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                if ($scope.Save == "Save") {
                    collectionobj.Action = "1";
                }
                else if ($scope.Save == "Edit") {
                    collectionobj.Action = "2";
                }
                var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteStudentConcessionDetails', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else{
                showMsgBox('Balance Amount of any installment can not negative.');
            }
        }
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

        $scope.StudentCode = "";

        $scope.StudentName = "";
        $scope.ParentName = "";
        $scope.Contact = "";
        $scope.AdmissionNo = "";
        $scope.chk = false;

        $scope.AllInstConcessionCalculationData = [];
        $scope.FinalInstallmentList = [];
        $scope.Attachments = [{File:"",FileName:""}];
        $scope.EntryMode = "School";
        $scope.SessionId = "";

        $scope.GetInstallment();

        $scope.$applyAsync();
        $scope.SetFocus('#ddlCourse');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.ResultList = [];
    $scope.CheckConcessionCategory = function (concessioncategory_obj) {
        var collectionobj = {};
        collectionobj.Action = '14';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.ConcessionCategoryId = concessioncategory_obj.ConcessionCategoryId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetConcessionDocs', collectionobj);
        getData.then(function (response) {
            $scope.ResultList = response.data;
            if ($scope.ResultList.length > 0) {
                if ($scope.ResultList[0].Result == "0") {
                    $scope.AlertError(concessioncategory_obj);
                }
            }
        });
    }

    $scope.AlertError = function (concessioncategory_obj) {
        var error_msg = '';
        if (concessioncategory_obj.ConcessionCategoryId == "1") {
            error_msg = 'Please Check Student Gender in Student Admission Form';
            //showMsgBox("999", "Sorry", "Please Check Student Gender in Student Admission Form", "warning", 'btn-warning');
        }
        else if (concessioncategory_obj.ConcessionCategoryId == "2") {
            error_msg = 'Please Check Student Sibling in Student Admission Form';
            //showMsgBox("999", "Sorry", "Please Check Student Sibling in Student Admission Form", "warning", 'btn-warning');
        }
        else if (concessioncategory_obj.ConcessionCategoryId == "3") {
            error_msg = 'Please Check Staff Ward Detail in Student Admission Form';
            //showMsgBox("999", "Sorry", "Please Check Staff Ward Detail in Student Admission Form", "warning", 'btn-warning');
        }
        if (error_msg != '') {
            concessioncategory_obj.ConcessionCategoryId = "";
            alert(error_msg);
        }
    }

}