app.ConcessionOnFeeStructureController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtConcessionHeadName');
    $scope.GetInstallment = function () {
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetInstallmentMaster', collectionobj);
        getData.then(function (response) {
            $scope.InstallmentList = response.data;
            $.each($scope.InstallmentList, function (index, obj) {
                obj.IsActive = false;
            });
        });
    };
    $scope.ddlClass_Change = function (classcode) {
        $scope.GetSections(classcode);
        $scope.FeeStructureGroupCode = "";
    }
    $scope.ddlSection_change = function (classcode) {
        $scope.FeeStructureGroupCode = "";
    }
    $scope.ddlStream_Change = function (classcode) {
        $scope.FeeStructureGroupCode = "";
    }
    $scope.AllInstallment = function () {
        angular.forEach($scope.InstallmentList, function (CI) {
            CI.IsActive = $scope.chkAllInstallment;
        });
    }
    $scope.SaveRecord = function () {
        if (isValidate()) {
            debugger;
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.ConcessionheadCode = $scope.ConcessionheadCode;
            collectionobj.InstallmentList = JSON.stringify($scope.InstallmentList);

            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode;
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
            var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteConcessionOnFeeStructure', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.ConcessionOnFeeStructureMasterList = [];

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
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetConcessionOnFeeStructureMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Concession Head", "HeaderValue": "ConcessionHeadName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Fee Structure Group", "HeaderValue": "FeeStructureGroupName", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            $scope.ConcessionOnFeeStructureMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ConcessionOnFeeStructureMasterList = $filter('filter')($scope.ConcessionOnFeeStructureMasterList, { 'Code': $scope.hfId }, true);

                $scope.ConcessionheadCode = $scope.ConcessionOnFeeStructureMasterList[0].ConcessionHeadCode;
                $scope.$parent.ClassCode = $scope.ConcessionOnFeeStructureMasterList[0].ClassCode;
                $scope.GetSections($scope.$parent.ClassCode);
                $scope.$parent.SectionCode = $scope.ConcessionOnFeeStructureMasterList[0].SectionCode;
                $scope.StreamCode = $scope.ConcessionOnFeeStructureMasterList[0].StreamCode;
                $scope.FeeStructureGroupCode = $scope.ConcessionOnFeeStructureMasterList[0].FeeStructureGroupCode;
                $scope.IsActive = $scope.ConcessionOnFeeStructureMasterList[0].IsActive == true ? "true" : "false";

                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/FeeMasterApi/GetConcessionOnFeeStructureMaster', collectionobj);
                getData.then(function (response) {
                    $scope.InstallmentList = response.data;
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
        var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteConcessionHeadMaster', collectionobj);
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
        $scope.ConcessionHeadName = "";
        $scope.IsActive = "true";
        $scope.$applyAsync();
        $scope.SetFocus('#txtConcessionHeadName');
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
                { "HeaderText": "Concession head Name", "HeaderValue": "ConcessionHeadName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.ConcessionHeadMasterList, window.document.title);
    };

}