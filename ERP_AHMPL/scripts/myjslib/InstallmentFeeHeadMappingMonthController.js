app.InstallmentFeeHeadMappingMonthController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlInstallment');
/* Save Button Click Event */
    $scope.selectedMonthCount = 0;
    $scope.FeeStructure = [];
    $scope.MonthList = [];
    $scope.SessionId = sessionId;

    $scope.AllMonth = function () {
        angular.forEach($scope.MonthList, function (CI) {
            CI.IsActive = $scope.chkAllMonth;
        });
    }
    $scope.ddlSession_Change = function () {
        $scope.GetInstallments();
        $scope.FeeStructureGroupCode = "";
    }
    $scope.ddlSection_change = function () {
        $scope.FeeStructureGroupCode = "";
    }
    $scope.ddlStream_Change = function () {
        $scope.FeeStructureGroupCode = "";
    }
    $scope.chkChange = function (obj) {
        $scope.GetFeeStructure();
    }

    $scope.GetFeestructureWiseMonths = function () {
        //var collectionobj = {};
        //collectionobj.Action = "7";
        //collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroupCode
        //collectionobj.ClassCode = $scope.ClassCode
        //collectionobj.SectionCode = $scope.SectionCode
        //collectionobj.StreamCode = $scope.StreamCode
        //collectionobj.RelationshipId = relationshipId;
        //collectionobj.SessionId = sessionId;
        //var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFeeStructureOnInstallmentMapping', collectionobj);
        //getData.then(function (response) {
        //    if (response.data.Table.length>0)
        //        $scope.AcademicSessionId = response.data.Table[0].AcademicSessionId;
        //    else
        //        $scope.AcademicSessionId = '';

            var collectionobj = {};
            collectionobj.Action = '5';
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = $scope.SessionId;
            //collectionobj.AcademicSessionId = $scope.SessionId;
            var getData = myService.methode('POST', '../Api/GblMasterApi/GetSessionMaster', collectionobj);
            getData.then(function (response) {
                $scope.MonthList = response.data;
            });
        //});
    };

    $scope.GetFeeStructure = function () {
        var collectionobj = {};
        collectionobj.Action = "8";
        collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroupCode
        collectionobj.MonthList = JSON.stringify($scope.MonthList)
        collectionobj.ClassCode = JSON.stringify($scope.Sections)
        collectionobj.SectionCode = JSON.stringify($scope.Sections)
        collectionobj.StreamCode = $scope.StreamCode
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.AcademicSessionId = $scope.SessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFeeStructureOnInstallmentMapping', collectionobj);
        getData.then(function (response) {
            $scope.FeeStructure = response.data.Table;
            $scope.FeeStructure1 = response.data.Table1;
        });
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            debugger;
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.InstallmentCode = $scope.InstallmentCode;
            collectionobj.AcademicSessionId = $scope.SessionId;
            collectionobj.MonthList = JSON.stringify($scope.MonthList);
            collectionobj.FeeStructure = JSON.stringify($scope.FeeStructure1);

            collectionobj.ClassCode = JSON.stringify($scope.Sections)
            collectionobj.SectionCode = JSON.stringify($scope.Sections)
            collectionobj.StreamCode = $scope.StreamCode;

            collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroupCode;

            collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2"; 
            }
            var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteInstallmentMappingMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.InstallmentMappingMasterList = [];
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
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetInstallmentMappingMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Installment", "HeaderValue": "InstallmentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Fee Structure Group", "HeaderValue": "FeeStructureGroupName", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            $scope.InstallmentMappingMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();               
                $scope.InstallmentMappingMasterList = $filter('filter')($scope.InstallmentMappingMasterList,{'Code': $scope.hfId }, true);
                $scope.SessionId = $scope.InstallmentMappingMasterList[0].AcademicSessionId.toString();
                $scope.GetInstallments();
                $scope.InstallmentCode = $scope.InstallmentMappingMasterList[0].InstallmentCode;
                $scope.ClassCode = $scope.InstallmentMappingMasterList[0].ClassCode;
                $scope.SectionCode = $scope.InstallmentMappingMasterList[0].SectionCode;

                angular.forEach($scope.Sections, function (obj) {
                    var flag = false;
                    obj.chk = false;
                    if (obj.IsActive)
                        flag = true;
                    if (flag)
                        obj.IsActive = false;
                    if (obj.ClassCode == $scope.ClassCode && obj.Code == $scope.SectionCode) {
                        obj.chk = true;
                        if (flag)
                            obj.IsActive = true;
                    }
                });

                $scope.StreamCode = $scope.InstallmentMappingMasterList[0].StreamCode;
                $scope.FeeStructureGroupCode = $scope.InstallmentMappingMasterList[0].FeeStructureGroupCode;
                $scope.IsActive = $scope.InstallmentMappingMasterList[0].IsActive == true ? "true" : "false"; 
                


                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId ;
                collectionobj.InstallmentCode = $scope.InstallmentCode;
                collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroupCode
                collectionobj.ClassCode = JSON.stringify([{ ClassCode: $scope.ClassCode, chk: true }]);
                collectionobj.SectionCode = JSON.stringify([{ Code: $scope.SectionCode, chk: true  }]);
                collectionobj.StreamCode = $scope.StreamCode
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.AcademicSessionId = $scope.SessionId ;

                var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFeeStructureOnInstallmentMapping', collectionobj);
                getData.then(function (response) {
                    $scope.MonthList = response.data.Table;
                    $scope.FeeStructure = response.data.Table1;
                    $scope.FeeStructure1 = response.data.Table2;
                });
                
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlInstallment', true);
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
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteInstallmentMappingMaster', collectionobj);
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
        $scope.hfId = "";

        $scope.GetAllSections();
        $scope.SessionId = sessionId;
        $scope.InstallmentCode = "";
        $scope.ClassCode = "";
        $scope.SectionCode = "";
        $scope.StreamCode = "";
        $scope.FeeStructureGroupCode = "";

        $scope.MonthList = [];
        $scope.FeeStructure = [];

        $scope.IsActive = "true";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlInstallment');
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
        $scope.started();
        return false;
    });
    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Installment", "HeaderValue": "InstallmentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Fee Structure Group", "HeaderValue": "FeeStructureGroupName", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.InstallmentMappingMasterList, window.document.title);
    };

    $scope.$on('tablecellmarge', function () {
        $('#example2').margetable({
            type: 2,
            colindex: [0,1,2]
        });
    });
}