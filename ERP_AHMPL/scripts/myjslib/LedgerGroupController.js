app.LedgerGroupController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtLedgerGroup');

    $scope.SaveRecord = function () {      
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            
            collectionobj.GroupName = $scope.LedgerGroup;
            collectionobj.UnderGroupCode = $scope.LedgerGroupModel;
            collectionobj.MainGroupCode = $scope.MainGroupModel;
            collectionobj.GroupLevelCode = "";
            collectionobj.SysGroup = "N";
            collectionobj.Nature = $scope.NatureModel;
            collectionobj.PrintSequence = $scope.PrintSequence;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.OpnType = $scope.DrCr;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
                collectionobj.CreatedBy = userid;
                var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteLedgerGroup", collectionobj);
                getData.then(function (response) {
                    debugger;
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                collectionobj.Action = 2;
                collectionobj.GroupCode = $scope.hfId;
                collectionobj.UpdatedBy = userid;
                var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteLedgerGroup", collectionobj);
                getData.then(function (response) {
                    debugger;
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
        }
    }

    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {
        debugger;
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.LedgerGroup = "";
        $scope.LedgerGroupModel = "";
        $scope.MainGroupModel = "";
        $scope.NatureModel = "";
        $scope.NatureModel = "";
        $scope.PrintSequence = "";
        $scope.SetFocus('#txtLedgerGroup');
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.DrCr = "D";
        $scope.LedgerGroupMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };

    }
    $scope.LedgerGroupMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        debugger;
        var getData = myService.methode('POST', "../Api/AccountMasterApi/GetLedgerGroup", collectionobj);
        getData.then(function (response) {

            var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "GroupCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Ledger Group Name", "HeaderValue": "GroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Under Group Name", "Value": "UnderGroupCode", "HeaderValue": "UnderGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Main Group", "Value": "Code", "HeaderValue": "MainGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Nature",  "HeaderValue": "ACtype", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" },
                { "HeaderText": "PrintSequence", "HeaderValue": "PrintSequence", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" },
                { "HeaderText": "OpnType", "Value": "OpnType", "HeaderValue": "OpnType", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },

            ];

            $scope.LedgerGroupMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                debugger;
                $scope.LedgerGroupMasterList = $filter('filter')($scope.LedgerGroupMasterList, { 'GroupCode': $scope.hfId });
                $scope.LedgerGroup = $scope.LedgerGroupMasterList[0].GroupName;
                $scope.LedgerGroupModel = $(FindHtml(row[2])).val();

                $scope.MainGroupModel = $(FindHtml(row[3])).val();
                $scope.NatureModel = FindText(row[4]);
                $scope.IsActive = row[5] == "Yes" ? "true" : "false";
                $scope.PrintSequence = row[6];
                $scope.DrCr = $(FindHtml(row[7])).val();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtLedgerGroup', true);
                $scope.hideLoader();


            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        debugger;
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.GroupCode = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.UpdatedBy = userid

        var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteLedgerGroup", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
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
                { "HeaderText": "Sr.No.", "Value": "GroupCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Ledger Group Name", "HeaderValue": "GroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Under Group Name", "Value": "UnderGroupCode", "HeaderValue": "UnderGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Main Group", "Value": "Code", "HeaderValue": "MainGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Nature", "Value": "ACtype", "HeaderValue": "ACtype", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" },
                { "HeaderText": "PrintSequence", "HeaderValue": "PrintSequence", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }

           ];
        $scope.PrintMaster(tblheader, $scope.LedgerGroupMasterList, window.document.title);
    };
}