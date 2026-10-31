app.SchoolMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSociety');
    $scope.GetSchoolCode = function (SocietyId) {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.SocietyId = SocietyId;
        var getData = myService.methode('POST', '../Api/MasterApi/GetSchoolMaster', collectionobj);
        getData.then(function (response) {
            //
            $scope.SchoolCodes = response.data[0].Column1;
        });
    }

   // $scope.GetSchoolCode();

    $scope.SaveRecord = function () {
        if (isValidate()) {
            //
            var collectionobj = {};
            collectionobj.SchoolId = $scope.hfId;
            collectionobj.SocietyId = $scope.SocietyId;
            collectionobj.SchoolCode = $scope.SchoolCodes;
            collectionobj.SchoolName = $scope.SchoolNames;
            collectionobj.SchoolAddress = $scope.SAddress;
            collectionobj.DisplayOrder = $scope.DisplayOrder;
            collectionobj.IsHo = $scope.Is == "4" ? true : false;
            collectionobj.IsSociety = $scope.Is == "1" ? true : false;
            collectionobj.IsCollege = $scope.Is == "3" ? true : false;
            collectionobj.IsSchool = $scope.Is == "2" ? true : false;
            collectionobj.IsActive = $scope.IsActive;        
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/MasterApi/InsertUpdateDeleteSchoolMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.SchoolMasterList = [];
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
        var getData = myService.methode('POST', '../Api/MasterApi/GetSchoolMaster', collectionobj);
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
        var getData = myService.methode('POST', '../Api/MasterApi/GetSchoolMaster', collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "SchoolId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "School Code", "HeaderValue": "SchoolCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "School Name", "HeaderValue": "SchoolName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "School Address", "HeaderValue": "SchoolAddress", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
           // 
            $scope.SchoolMaster= response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                var ID =parseInt($scope.hfId);
                //
                $scope.SchoolMaster = $filter('filter')($scope.SchoolMaster, { 'SchoolId': ID }, true);

                $scope.SchoolCodes = $scope.SchoolMaster[0].SchoolCode;
                $scope.SchoolNames = $scope.SchoolMaster[0].SchoolName;
                $scope.SAddress = $scope.SchoolMaster[0].SchoolAddress;
                $scope.Is = $scope.SchoolMaster[0].IsHO == true ? "4" : $scope.SchoolMaster[0].IsSociety == true ? "1" : $scope.SchoolMaster[0].IsCollege == true ? "3" : $scope.SchoolMaster[0].IsSchool == true ? "2" : "0";
                $scope.SocietyId = ($scope.SchoolMaster[0].SocietyId).toString();
                $scope.DisplayOrder = $scope.SchoolMaster[0].DisplayOrder;
                $scope.IsActive = $scope.SchoolMaster[0].IsActive == true ? "true" : "false";
                $scope.hideLoader();
                $scope.Save = "Edit";
               // $scope.disableAdd=true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlSociety', true);
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
        collectionobj.SchoolId = $scope.hfId;
        collectionobj.GroupCode = groupCode;
        collectionobj.SocietyCode = societyCode;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/MasterApi/InsertUpdateDeleteSchoolMaster', collectionobj);
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
        $scope.SocietyId = "";
        $scope.SchoolCodes ="";
        $scope.SchoolNames = "";
        $scope.SAddress = "";
        $scope.Is = "";
        $scope.SocietyId = "";
        $scope.GetDisplayOrder();
        $scope.IsActive = "true";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlSociety');
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
                { "HeaderText": "Sr.No.", "Value": "SchoolId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "School Code", "HeaderValue": "SchoolCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "School Name", "HeaderValue": "SchoolName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                // { "HeaderText": "Society Address", "HeaderValue": "SocietyAddress", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.SchoolMaster, window.document.title);
    };
}