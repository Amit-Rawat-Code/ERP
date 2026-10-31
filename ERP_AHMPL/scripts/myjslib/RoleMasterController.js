app.RoleMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#RoleName');
    $scope.GetUserLevel = function ()
    {
        var collectionobj = {};  
        collectionobj.Action = "4";

        var getData = myService.methode('POST', '../Api/MasterApi/GetUserLevel', collectionobj);
        getData.then(function (response) {
             
            $scope.UserLevelList = response.data;
        });          

    }
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};  
            collectionobj.RoleId=$scope.hfId; 
            collectionobj.RoleName = $scope.RoleName;
            collectionobj.UserLevel = $scope.UserLevel;
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
            var getData = myService.methode('POST', '../Api/MasterApi/InsertUpdateDeleteRoleMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });          
        }
    };
 
    $scope.RoleMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.GetDisplayOrder = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../Api/MasterApi/GetRoleMaster', collectionobj);
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
        var getData = myService.methode('POST', '../Api/MasterApi/GetRoleMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "RoleId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Role Name", "HeaderValue": "RoleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },                   
                    { "HeaderText": "User Level", "HeaderValue": "LevelName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },   
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },   
                   
                ];

            $scope.RoleMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                var ID=parseInt($scope.hfId);
                $scope.RoleMasterList = $filter('filter')($scope.RoleMasterList, { 'RoleId': ID }, true);
                $scope.RoleName = $scope.RoleMasterList[0].RoleName;
                $scope.UserLevel = $scope.RoleMasterList[0].UserLevel;
                $scope.DisplayOrder = $scope.RoleMasterList[0].DisplayOrder;
                $scope.IsActive = $scope.RoleMasterList[0].IsActive == true ? "true" : "false";
                
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#RoleName', true);             
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
        collectionobj.RoleId = $scope.hfId; 
        var getData = myService.methode('POST', '../Api/MasterApi/InsertUpdateDeleteRoleMaster', collectionobj);
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
        $scope.RoleMasterList = [];
        $scope.RoleName = "";
        $scope.UserLevel = "";
        $scope.DisplayOrder = "";
        $scope.IsActive = "True";
        $scope.$applyAsync();
        $scope.SetFocus('#RoleName');  
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
                { "HeaderText": "Sr.No.", "Value": "RoleId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Role Name", "HeaderValue": "RoleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "User Level", "HeaderValue": "UserLevel", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

            ];

        $scope.PrintMaster(tblheader, $scope.RoleMasterList, window.document.title);
    };
}