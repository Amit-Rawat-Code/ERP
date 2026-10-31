app.ConcessionFeeHeadMappingController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlConcessionHeadCode');

    $scope.GetConcessionHead = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetConcessionHead', collectionobj);
        getData.then(function (response) {
            $scope.ConcessionHeadList = response.data;
        });
    }
    $scope.GetExistsConcessionHead = function (ConcessionHCode) {
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.ConcessionHeadCode = ConcessionHCode;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetExistsConcessionHead', collectionobj);
        getData.then(function (response) {
            if (response.data.Table.length > 0) {
                $scope.GetFeeHeadDetail();
                
                $scope.hfId = response.data.Table[0].Code;
                $scope.ConcessionHeadMappingList = response.data.Table1;
                $scope.Save = "Edit";    
            }
            else
            {
                $scope.ConcessionHeadMappingList = [];
                $scope.AddRow();
                $scope.GetFeeHeadDetail();
            }
        });
    }
    $scope.AddRow = function () {
        $scope.ConcessionHeadMappingList.push({
            Srno: "1",
            FeeHeadCode: "",
            DiscountPer: "",
            DiscountAmt: "",
        });
    }

    $scope.RemoveRow = function (srno) {
        $scope.ConcessionHeadMappingList = $filter('filter')($scope.ConcessionHeadMappingList, { Srno: '!' + srno });
    }
    $scope.GetFeeHeadDetail = function () {
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.AcademicSessionId = sessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFeeHeadDetail', collectionobj);
        getData.then(function (response) {
            $scope.FeeHeadList = response.data;
        });
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.ConcessionHeadCode = $scope.ConcessionHeadCode;
            collectionobj.ConsessionFeeHeadMapData = JSON.stringify($scope.ConcessionHeadMappingList);
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
            var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteConcessionFeeHeadMapMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.ConcessionFeeHeadMapMasterList = [];
    $scope.ConcessionFeeHeadMapDataList = [];
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
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetConcessionFeeHeadMapMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Concession head Name","HeaderValue": "ConcessionHeadName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },                 
                ];
            $scope.ConcessionFeeHeadMapMasterList = response.data;         
            loadDataUsingPreDefinedColumn(tblheader, $scope.ConcessionFeeHeadMapMasterList);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ConcessionFeeHeadMapMasterList = $filter('filter')($scope.ConcessionFeeHeadMapMasterList, { 'Code': $scope.hfId }, true);
                $scope.ConcessionHeadCode = $scope.ConcessionFeeHeadMapMasterList[0].ConcessionHeadCode;
                $scope.GetFeeHeadDetail();

                var collectionobj = {};
                collectionobj.Action = "7";
                collectionobj.Code = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/FeeMasterApi/GetConcessionFeeHeadMapMaster', collectionobj);
                getData.then(function (response) {
                    $scope.ConcessionHeadMappingList = response.data; 
                });                            

                $scope.hideLoader();
                $scope.Save = "Edit";               
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlConcessionHeadCode', true);
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
        var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteConcessionFeeHeadMapMaster', collectionobj);
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
        $scope.ConcessionHeadCode = "";   
        $scope.ConcessionHeadMappingList = [];
        $scope.$applyAsync();
        $scope.SetFocus('#ddlConcessionHeadCode');
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
            ];
        $scope.PrintMaster(tblheader, $scope.ConcessionFeeHeadMapMasterList, window.document.title);
    };


}