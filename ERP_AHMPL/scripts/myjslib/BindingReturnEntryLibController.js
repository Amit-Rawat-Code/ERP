app.BindingReturnEntryLibController = function ($scope, $element, $filter, myService) {
    $scope.Save = "Save";
    $scope.SetFocus('#ddlIssueNo');
    $scope.VDate = new Date();
    $scope.GetVoucherNoLibList(4);

    $scope.GetIssueNo = function () {
        //debugger;
        var collectionobj = {};
        if ($scope.Save == "Save") {
            collectionobj.Action = 8;
        }
        else if ($scope.Save == "Edit") {
            //debugger;
            collectionobj.Action = 10;
        }
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetIssueNoList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                //debugger;
                $scope.IssueNoList = [];

                if ($scope.Save == "Save") {
                    $scope.IssueNoList = response.data;
                }
                else if ($scope.Save == "Edit") {
                    //debugger;
                    $scope.IssueNoList = response.data;
                    $scope.IssueNoM = ($filter('filter')($scope.IssueNoList, { 'VrNo': vrno }))[0].TransID;
                }

            }
        });
    };
    $scope.GetIssueNoDetails = function (TransId) {
        //debugger;
        var collectionobj = {};
        if ($scope.Save == "Save") {
            collectionobj.Action = 9;
        }
        else if ($scope.Save == "Edit") {
            collectionobj.Action = 4;
        }

        collectionobj.TransId = TransId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetIssueNoDetails', collectionobj);
        getData.then(function (response) {
            if (response.data.Table.length > 0) {
                //debugger;

                if ($scope.Save == "Save") {
                    $scope.hfStudentId = response.data.Table1[0].BinderCode;
                    $scope.BinderName = response.data.Table1[0].BinderName;
                    $scope.AddressM = response.data.Table1[0].Address;
                    $scope.BD = response.data.Table1;
                    $scope.bindingtype = response.data.Table;
                }
                else if ($scope.Save == "Edit") {
                    $scope.BinderName = response.data.Table1[0].BinderName;
                    $scope.AddressM = response.data.Table1[0].Address;
                    $scope.AddressM = response.data.Table1[0].Address;
                    $scope.BD = response.data.Table1;
                    $scope.bindingtype = response.data.Table2;
                }
            }
        });
    };


    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {

        if (isValidate()) {
            //debugger
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.TransId = $scope.hfId;
            collectionobj.V_Date = $scope.VDate;
            collectionobj.IssueNo = $scope.IssueNoM;
            collectionobj.BinderCode = $scope.hfStudentId;
            collectionobj.BindingIssueEntryInJson = JSON.stringify($scope.BD);
            collectionobj.bindingtype = $scope.bindingtype;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = JSON.parse(userid);
            collectionobj.UpdatedBy = JSON.parse(userid);
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = 2;
            }

            var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBindingReturnEntry", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
        //}
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
        //debugger;
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.VoucherM = "";
        $scope.GetVoucherType("BNDIS");
        $scope.GetVoucherNoLibList(4);
        $scope.VDate = "";
        $scope.VDate = new Date();
        $scope.hfId = "";
        $scope.GetIssueNo();
        $scope.hfStudentId = "";
        $scope.BinderName = ""
        $scope.AddressM = "";
        $scope.IssueNoM = "";
        $scope.BD = [];
        $scope.bindingtype = [];
        $scope.SetFocus('#ddlIssueNo');
        $scope.$applyAsync();
        $scope.BindingIssueEntryList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.BindingReturnEntryList = [];

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        //debugger;
        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetBindingReturnEntryList", collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Return Date", "Value": "V_Date", "HeaderValue": "V_Date", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Return No", "Value": "PVNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Issue No", "Value": "ISSUENO", "HeaderValue": "ISSUENO", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Binder", "Value": "BinderCode", "HeaderValue": "BinderName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            // $scope.BindingIssueEntryList = response.data.Table;

            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                //debugger;
                $scope.BindingReturnEntryList = $filter('filter')($scope.BindingReturnEntryList, { 'TransID': $scope.hfId });
                $scope.VDate = new Date(moment(row[1], 'DD-MM-YYYY'));;
                $scope.PVNo = $(FindHtml(row[2])).val();
                //$scope.GetIssueNo();
                $scope.IssueNoM = $scope.hfId;
                $scope.hfStudentId = $(FindHtml(row[4])).val();
                $scope.Save = "Edit";                

                $scope.GetIssueNoDetails($scope.hfId);
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlIssueNo', true);
                $scope.hideLoader();
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.TransId = $scope.hfId;
        collectionobj.UpdatedBy = JSON.parse(userid);

        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBindingReturnEntry", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ResetControl();
                $scope.hideLoader();
            };
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

    /*Print Button Click Event*/
    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Issue Date", "Value": "V_Date", "HeaderValue": "V_Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Issue No", "Value": "PVNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Binder", "Value": "BinderCode", "HeaderValue": "BinderName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.BindingIssueEntryList, window.document.title);
    };

}