app.VoucherNarrationController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtVoucherNarration');
    $scope.chkAllow = [];
    $scope.$watch('chkAll', function () {
        if (typeof ($scope.chkAll) === 'undefined') return;
        $scope.chkAllRow();
    });
    $scope.hide = true;
    $scope.$watch('VNarrList', function () {
        if (typeof ($scope.VNarrList) === 'undefined') {
            $scope.hide = true;
        } else {
            if ($scope.VNarrList.length > 0) {
                $scope.hide = false;
            } else {
                $scope.hide = true;
            }
        }
    });
    $scope.chkAllRow = function () {
        for (var index = 0; index < $scope.VNarrList.length; index++) {
            $scope.chkAllow[index] = $scope.chkAll;
        }
    }
    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.showLoader();
            var VoucherList = [];
            var collectionobj = {};
            collectionobj.Narration = $scope.VoucherNarration;


            $("table tbody tr").each(function () {
                debugger;
                var row = $(this);
                var chkAllow = row.find("input[type='checkbox']#chkAllow");
                if (chkAllow.prop("checked")) {
                    var VoucherDetails = {};
                    VoucherDetails["VoucherId"] = row.find("input[type='hidden']#hfvoucherId").val();
                    VoucherList.push(VoucherDetails);
                }
            });
            collectionobj.VoucherList = VoucherList;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.RelationshipId = relationshipId;
             

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
                collectionobj.CreatedBy = JSON.parse(userid);
                var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteVoucherNarration", collectionobj);
                getData.then(function (response) {
                    debugger;
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                collectionobj.Action = 2;
                collectionobj.NarrationId = $scope.hfId;
                collectionobj.UpdatedBy = JSON.parse(userid);
                var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteVoucherNarration", collectionobj);
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
        $scope.VoucherNarration = "";
        $scope.SetFocus('#txtVoucherNarration');
        $scope.BindVNarrAllowed();
        $scope.IsActive = "true";
        $scope.hfId = "";
        $scope.VoucherNarrationMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };

    }
    $scope.VoucherNarrationMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        
        collectionobj.FYId = fyId;

        debugger;
        var getData = myService.methode('POST', "../Api/AccountMasterApi/GetVoucherNarrations", collectionobj);
        getData.then(function (response) {

            var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "NarrationId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Narration", "HeaderValue": "Narration", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
            ];

            $scope.VoucherNarrationMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                debugger;

                $scope.VoucherNarrationMasterList = $filter('filter')($scope.VoucherNarrationMasterList, { 'NarrationId': $scope.hfId });
                $scope.VoucherNarration = row[1];
                $scope.IsActive = row[2] == "Yes" ? "true" : "false";

                $scope.BindVNarrAllowed($scope.hfId);
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtVoucherNarration', true);
                $scope.hideLoader();


            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        showMsgBox('Delete is not permitted.');
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
            { "HeaderText": "Sr.No.", "Value": "NarrationId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
            { "HeaderText": "Narration", "HeaderValue": "Narration", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
        ];

        $scope.PrintMaster(tblheader, $scope.VoucherNarrationMasterList, window.document.title);
    };
}