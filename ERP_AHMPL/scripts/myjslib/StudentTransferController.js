app.StudentTransferController = function ($scope, $element, $filter, myService)
{
    $scope.StudentTransferList = true;
    $scope.GetAllClassesWithSections(); 
    $scope.GetStream();
    $scope.disabledImport = false;
    $scope.StudentTableList = [];

    $scope.chkRowAll = function ()
    {
        for (var index = 0; index < $scope.StudentTableList.length; index++)
        {
            $scope.StudentTableList[index].chkAllow = $scope.chkAll;
        }
    }
    $scope.getBackClassSectionName = function (Student)
    {
        if (Student.PromotionStatus == 'F' || Student.PromotionStatus == 'L')
        {
            Student.ToSectionCode = $scope.SectionCode;
            if (Student.OutStanding == 0 && Student.PromotionStatus == 'L')
            {
                Student.ProStatus = 'Not Promoted';
            }
            else if (Student.OutStanding != 0 && Student.PromotionStatus == 'L')
            {
                Student.ProStatus = 'Will Be Promoted Due To Out Standing/Advance';
            }
            else 
            {
                Student.ProStatus = 'Remain In Same Class.';
            }
        }
        else
        {
           //  $scope.BindStudentTableList();
            Student.ProStatus = 'To Be Promoted.';
            Student.ToSectionCode = Student.NewSectionCode;
        }
    } 

    $scope.chkUncheck = function ()
    {
        $scope.flag = true;
        for (var index = 0; index < $scope.StudentTableList.length; index++)
        {
            if ($scope.StudentTableList[index].chkAllow == false)
            {
                $scope.flag = false;
                break;
            }
        }
        $scope.chkAll = $scope.flag;
    }

    $scope.GetSession = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 4;
        var getData = myService.methode('POST', "../api/GetMasterApi/GetSession", collectionobj);
        getData.then(function (response)
        {
            $scope.SessionList = response.data;
        });
    };
    $scope.GetAllotedFinancialYear = function ()
    {
        var collectionobj = {};
        collectionobj.UserId = userid;
        collectionobj.SessionId = $scope.ToSessionId;
        collectionobj.Action = 4;
        var getData = myService.methode('POST', '../Api/StudentTransferApi/GetFinancialYear', collectionobj);
        getData.then(function (response)
        {
            $scope.AllotedFinancialYearList = response.data;
        });
    }

    $scope.ddlClass_Change = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetSectionList', collectionobj);
        getData.then(function (response)
        {
            $scope.Sections = ($filter('filter')(response.data, { 'ClassCode': $scope.ClassCode }, true));            
        });       
    }
    $scope.ddlSection_change = function ()
    {
        $scope.BindStudentTableList();
    }    
    
    $scope.BindStudentTableList = function ()
    {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 1;
        collectionobj.FromClassCode = $scope.ClassCode;
        collectionobj.FromSectionCode = $scope.SectionCode;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/StudentTransferApi/GetStudentListForPromotion', collectionobj);
        getData.then(function (response)
        {
            $scope.hideLoader();
            if (response.data.length > 0)
            {
                $scope.StudentTransferList = false;
                $scope.StudentTableList = response.data;
                $.each($scope.StudentTableList, function (index, obj)
                {
                    if (obj.TypeofAdmission == 'New')
                    {
                        obj.SectionEnrollInNewSession = true;                        
                        obj.StreamEnrollInNewSession = true;
                        obj.PromotionStatusEnrollInNewSession = true;
                        obj.PromotionStatus = 'N';
                    }
                    else
                    {
                        obj.PromotionStatus = 'P';
                        obj.SectionEnrollInNewSession = false;
                        obj.StreamEnrollInNewSession = false;
                        obj.PromotionStatusEnrollInNewSession = false;
                    }                 
                });
            }
            else
            {
                $scope.StudentTransferList = true;
                $scope.StudentTableList = response.data;
            }
        });
    };

    $scope.TransferRecord = function ()
    {
        if (isValidate())
        {
           
            if ($scope.StudentTableList.length>0)
            {
                $scope.IsClassAndStreamSelected = true;
                angular.forEach($scope.StudentTableList, function (obj1) {
                    if (obj1.chkAllow == true) {
                        if (obj1.ToSectionCode == undefined || obj1.ToSectionCode == null || obj1.ToSectionCode == '' || obj1.ToStreamCode == undefined || obj1.ToStreamCode == null || obj1.ToStreamCode == '') {
                            $scope.IsClassAndStreamSelected = false;
                        }
                    }
                })
                if ($filter('filter')($scope.StudentTableList, { 'chkAllow': true }, true).length > 0)
                {
                    if ($scope.IsClassAndStreamSelected == true) {
                        proceedConfirmbox("It will delete all data from your selected student from session " + $('#ddlSession option:selected').text() + " (if exists). Do you want to proceed ", function () {
                            $scope.showLoader();
                            var collectionobj = {};
                            collectionobj.PromoteStudentLists = JSON.stringify($filter('filter')($scope.StudentTableList, { 'chkAllow': true }, true));
                            collectionobj.FromClassCode = $scope.ClassCode;
                            collectionobj.FromSectionCode = $scope.SectionCode;
                            collectionobj.ToSessionId = $scope.ToSessionId;
                            collectionobj.ToFYId = $scope.ToFYId;
                            collectionobj.RelationshipId = relationshipId;
                            collectionobj.SessionId = sessionId;
                            collectionobj.FYId = fyId;
                            collectionobj.UpdatedBy = userid;
                            collectionobj.Action = 1;
                            var getData = myService.methode('POST', "../api/StudentTransferApi/InsertUpdateDeleteStudentTransfer", collectionobj);
                            getData.then(function (response)
                            {
                                $scope.hideLoader();
                                if (showMsgBox(response.data))
                                {
                                    $scope.ClearControl(1);
                                }
                            });
                        });
                    }
                    else {
                        showMsgBox('Select Class Or Stream');
                    }
                }
                else
                {
                    showMsgBox('Select Atleast One CheckBox.');
                }
            }
            else
            {
                showMsgBox('No Records Found.');
            }
        }
    }

    $scope.ClearControl = function (flag)
    {
        if (flag == 1)
        {
            $scope.ResetControl(flag);
        }
        else
        {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag)
    {
        $scope.StudentTransferList = true;
        $scope.$parent.ClassCode = "";
        $scope.$parent.SectionCode = "";
        $scope.StudentTableList = [];
        if (flag == 0)
        {
            showMsgBox('4');
        };
    } 
}