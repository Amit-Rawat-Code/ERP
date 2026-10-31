app.TDSSectionMasterController = function ($scope, $element, $filter, myService) {

    $scope.SetFocus('#txtSectionName');

    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};

            collectionobj.SectionName = $scope.SectionName;
            collectionobj.ChallanCode = $scope.ChallanCode;

            collectionobj.IsActive = $scope.IsActive;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
                collectionobj.CreatedBy = JSON.parse(userid);
                var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteTDSSection", collectionobj);
                getData.then(function (response) {
                    debugger;
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                collectionobj.Action = 2;
                collectionobj.SectionCode = $scope.hfId;
                collectionobj.UpdatedBy = JSON.parse(userid);
                var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteTDSSection", collectionobj);
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
        $scope.SectionName = "";
        $scope.ChallanCode = "";
        $scope.SetFocus('#txtSectionName');
        $scope.IsActive = "true";
        $scope.hfId = "";
        $scope.TDSSectionList = [];
        if (flag == 0) {
            showMsgBox('4');
        };

    }


    $scope.TDSSectionList = [];
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
        

        var getData = myService.methode('POST', "../Api/AccountMasterApi/GetTDSSection", collectionobj);
        getData.then(function (response) {

            var tblheader =
            [
            { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
            { "HeaderText": "Section Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Challan Code", "HeaderValue": "ChallanCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
            debugger;
            $scope.TDSSectionList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                debugger;
                $scope.TDSSectionList = $filter('filter')($scope.TDSSectionList, { 'Code': $scope.hfId });
                $scope.SectionName = row[1];
                $scope.ChallanCode = row[2];
                $scope.IsActive = row[3] == "Yes" ? "true" : "false";

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtSectionName', true);
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
        collectionobj.SectionCode = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        
        collectionobj.FYId = fyId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        var getData = myService.methode('POST', "../Api/AccountMasterApi/InsertUpdateDeleteTDSSection", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
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
                  { "HeaderText": "Sr.No.", "Value": "Branch_Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                  { "HeaderText": "Section Name", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                  { "HeaderText": "Challan Code", "HeaderValue": "ChallanCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                  { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                 ];
        $scope.PrintMaster(tblheader, $scope.TDSSectionList, window.document.title);
    };

}