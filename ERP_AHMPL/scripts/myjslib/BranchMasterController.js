app.BranchMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSchool');
    $scope.GetBranchCode = function (SchoolId) {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.SchoolId =SchoolId;
        var getData = myService.methode('POST', '../Api/MasterApi/GetBranchMaster', collectionobj);
        getData.then(function (response) {
            $scope.BranchCode = response.data[0].Column1;
        });
    }

  //  $scope.GetSocietyCode();

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.BranchId = $scope.hfId;
            collectionobj.SchoolId = $scope.SchoolId;
            collectionobj.BranchCode = $scope.BranchCode;
            collectionobj.BranchName = $scope.BranchName;
            collectionobj.BranchAddress = $scope.BranchAddress;
            collectionobj.DisplayCode = $scope.DisplayCodes;
            collectionobj.BranchUrl = $scope.BranchUrl;
            collectionobj.BranchLogo = $scope.BranchLogo;
            collectionobj.BackgroundImage = $scope.BackgroundImage;
            collectionobj.DisplayOrder = $scope.DisplayOrder;
            collectionobj.IsActive = $scope.IsActive;        
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            //
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
        //  var getData = myService.methode('POST', '/NoticeBoard/CRUD', collectionobj);
          var getData = myService.methode('POST', '../Api/MasterApi/InsertUpdateDeleteBranchMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.BranchMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.GetDisplayOrder = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.GroupCode = groupCode;
        collectionobj.SocietyCode = societyCode;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/MasterApi/GetBranchMaster', collectionobj);
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
        collectionobj.GroupCode = groupCode;
        collectionobj.SocietyCode = societyCode;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/MasterApi/GetBranchMaster', collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "BranchId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Branch Code", "HeaderValue": "BranchCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Display Code", "HeaderValue": "DisplayCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch Name", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch Address", "HeaderValue": "BranchAddress", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch Url", "HeaderValue": "BranchUrl", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch Logo", "HeaderValue": "BranchLogo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "Yes" },
                    { "HeaderText": "Background Image", "HeaderValue": "BackgroundImage", "Width": "100%", "ShowColumn": "No", "ImageColumn": "Yes" },
                ];
        
            $scope.BranchMaster = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                var ID = parseInt($scope.hfId);
                $scope.BranchMaster = $filter('filter')($scope.BranchMaster, { 'BranchId': ID }, true);
                $scope.DisplayCodes = $scope.BranchMaster[0].DisplayCode;
                $scope.BranchUrl = $scope.BranchMaster[0].BranchUrl;
                $scope.BranchCode = $scope.BranchMaster[0].BranchCode;
                $scope.BranchName = $scope.BranchMaster[0].BranchName;           
                $scope.BranchAddress = $scope.BranchMaster[0].BranchAddress;
                $scope.BranchLogo = $scope.BranchMaster[0].BranchLogo;
                $scope.BackgroundImage = $scope.BranchMaster[0].BackgroundImage;
                $scope.SchoolId = ($scope.BranchMaster[0].SchoolId).toString();
                $scope.DisplayOrder = $scope.BranchMaster[0].DisplayOrder;
                $scope.IsActive = $scope.BranchMaster[0].IsActive == true ? "true" : "false";
                $scope.hideLoader();
                $scope.Save = "Edit";
                // $scope.disableAdd=true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlSchool', true);
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
        collectionobj.BranchId = $scope.hfId;
        collectionobj.SchoolId = $scope.SchoolId;
        //collectionobj.SocietyCode = societyCode;
        //collectionobj.SchoolCode = schoolCode;
        //collectionobj.BranchCode = branchCode;
        //collectionobj.SessionId = sessionId;
      //  collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/MasterApi/InsertUpdateDeleteBranchMaster', collectionobj);
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
        $scope.DisplayCodes = "";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.BranchCode = "";
        $scope.BranchName = "";
        $scope.BranchUrl = "";
        $scope.BranchAddress = "";
        $scope.SchoolId = "";
        $scope.GetDisplayOrder();
        $scope.IsActive = "true";
        $('#BackgroundImage').val('');
        $('#logo').val('');
        $scope.BranchLogo = "";
        $scope.BackgroundImage = "";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlSchool');
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
                { "HeaderText": "Sr.No.", "Value": "BranchId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Branch Code", "HeaderValue": "BranchCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Display Code", "HeaderValue": "DisplayCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Branch Name", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Branch Address", "HeaderValue": "BranchAddress", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Barnch Url", "HeaderValue": "BranchUrl", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];
        $scope.PrintMaster(tblheader, $scope.BranchMaster, window.document.title);
    };
}