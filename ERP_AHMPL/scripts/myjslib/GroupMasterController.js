app.GroupMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#GroupId');
    $scope.GetGroupCode = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        var getData = myService.methode('POST', '../Api/MasterApi/GetGroupMaster', collectionobj);
        getData.then(function (response) {
            //
            $scope.GroupCode = response.data[0].GroupCode;
            $scope.DisplayOrder = response.data[0].DisplayOrder;
        });
        }

    $scope.GetGroupCode();

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
          
            collectionobj.GroupId = $scope.hfId;
            collectionobj.GroupCode = $scope.GroupCode;
            collectionobj.GroupName = $scope.GroupName;
            collectionobj.GroupAddress = $scope.GroupAddress;
            collectionobj.DisplayOrder = $scope.DisplayOrder;
            collectionobj.IsActive = $scope.IsActive;        
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/MasterApi/InsertUpdateDeleteGroupMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
                $scope.GetGroupCode();
            });
        }
    };

    $scope.GroupMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.GetDisplayOrder = function () {

        var collectionobj = {};
        collectionobj.Action = "4";

        var getData = myService.methode('POST', '../Api/MasterApi/GetGroupMaster', collectionobj);
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
     
        var getData = myService.methode('POST', '../Api/MasterApi/GetGroupMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "GroupId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Group Name", "HeaderValue": "GroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Group Address", "HeaderValue": "GroupAddress", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
       
            $scope.GroupMaster = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                var ID = parseInt($scope.hfId);
                $scope.GroupMaster = $filter('filter')($scope.GroupMaster, { 'GroupId': ID }, true);
                $scope.GroupCode = $scope.GroupMaster[0].GroupCode;
                $scope.GroupName = $scope.GroupMaster[0].GroupName;           
                $scope.GroupAddress = $scope.GroupMaster[0].GroupAddress;
                $scope.DisplayOrder = $scope.GroupMaster[0].DisplayOrder;
                
                $scope.IsActive = $scope.GroupMaster[0].IsActive == true ? "true" : "false";
                $scope.hideLoader();
                $scope.Save = "Edit";
               // $scope.disableAdd=true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#GroupCode', true);
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
        collectionobj.GroupId = $scope.hfId;
        var getData = myService.methode('POST', '../Api/MasterApi/InsertUpdateDeleteGroupMaster', collectionobj);
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
        $scope.GroupCode="";
        $scope.GroupName = "";
        $scope.GroupAddress = "";
        $scope.GetDisplayOrder();
        $scope.IsActive = "true";
        $scope.$applyAsync();
        $scope.SetFocus('#GroupCode');
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
                { "HeaderText": "Sr.No.", "Value": "GroupId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Group Name", "HeaderValue": "GroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Group Address", "HeaderValue": "GroupAddress", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Displa yOrder", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.GroupMaster, window.document.title);
    };
}