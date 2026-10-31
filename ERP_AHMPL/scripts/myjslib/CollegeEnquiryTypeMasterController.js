app.CollegeEnquiryTypeMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtEnquiryType');

    $scope.DefaultValue = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/CollegeEnquiryMasterApi/GetCollegeEnquiryTypeMaster', collectionobj);
        getData.then(function (response) {
            var data = response.data;
            $scope.DisplayOrder = response.data[0].DisplayOrders;

        });

    };
    $scope.DefaultValue();
    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.EnquiryType = $scope.EnquiryType;
            collectionobj.DisplayOrder = $scope.DisplayOrder;
            collectionobj.ModeOfEnquiry = $scope.ModeOfEnquiry;
            collectionobj.EnquiryCategory = $scope.EnquiryCategory;
            collectionobj.IsRecurring = $scope.IsRecurring;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/CollegeEnquiryMasterApi/InsertUpdateDeleteCollegeEnquiryTypeMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                    $scope.DefaultValue();
                }

            });
        }
    }

    $scope.EnquiryTypeMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.GetDisplayOrder = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/CollegeEnquiryMasterApi/GetCollegeEnquiryTypeMaster', collectionobj);
        getData.then(function (response) {
            if (response.data == null)
                $scope.DisplayOrder = 1;
            else
                $scope.DisplayOrder = response.data.length + 1;
        });
    }

    $scope.GetDisplayOrder();

    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/CollegeEnquiryMasterApi/GetCollegeEnquiryTypeMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Enquiry Type", "HeaderValue": "EnquiryType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Mode Of Enquiry", "HeaderValue": "ModeOfEnquiry", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Enquiry Category", "HeaderValue": "EnquiryCategory", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Recurring", "HeaderValue": "Recurring", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.EnquiryTypeMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.EnquiryTypeMasterList = $filter('filter')($scope.EnquiryTypeMasterList, { 'Code': $scope.hfId }, true);
                $scope.EnquiryType = row[1]//$scope.EnquiryTypeMasterList[0].EnquiryType;
                $scope.DisplayOrder = row[2];
                $scope.ModeOfEnquiry = row[3];
                $scope.EnquiryCategory = row[4];
                $scope.IsRecurring = row[5] == "Yes" ? "True" : "False";
                $scope.IsActive = row[6] == "Yes" ? "true" : "false";

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtEnquiryType', true);
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
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/CollegeEnquiryMasterApi/InsertUpdateDeleteCollegeEnquiryTypeMaster', collectionobj);
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
        $scope.hfId = "";
        $scope.EnquiryType = "";
        $scope.ModeOfEnquiry = "Offline";
        $scope.EnquiryCategory = "";
        $scope.IsRecurring = "True";
        $scope.AreaCode = "";
        $scope.GetDisplayOrder();
        $scope.IsActive = "true";
        $scope.EnquiryTypeMasterList = [];
        $scope.$applyAsync();
        $scope.SetFocus('#txtEnquiryType');
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
                { "HeaderText": "Enquiry Type", "HeaderValue": "EnquiryType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Mode Of Enquiry", "HeaderValue": "ModeOfEnquiry", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Enquiry Category", "HeaderValue": "EnquiryCategory", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Recurring", "HeaderValue": "Recurring", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.EnquiryTypeMasterList, window.document.title);
    };
};