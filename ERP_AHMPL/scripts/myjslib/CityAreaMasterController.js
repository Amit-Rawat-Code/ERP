app.CityAreaMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlCountry');
    $scope.DefaultValue = function () {
        var collectionobj = {};
            collectionobj.Action = "4"; 
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/EnquiryMasterApi/GetCityAreaMaster', collectionobj);
            getData.then(function (response) {
                var data = response.data;
                $scope.DisplayOrder = response.data[0].DisplayOrders;
                
            });
        
    };

    $scope.DefaultValue();
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};  
            collectionobj.Code=$scope.hfId; 
            collectionobj.CountryCode = $scope.CountryCode;
            collectionobj.StateCode = $scope.StateCode;
            collectionobj.CityCode = $scope.CityCode;
            collectionobj.CityAreaName = $scope.CityAreaName;
            collectionobj.AreaCode = $scope.AreaCode;   
            collectionobj.DisplayOrder = $scope.DisplayOrder;    
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
            var getData = myService.methode('POST', '../Api/EnquiryMasterApi/InsertUpdateDeleteCityAreaMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                    $scope.DefaultValue();
                }

            });          
        }
    };
 
    $scope.CityAreaMasterList = [];
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
        var getData = myService.methode('POST', '../Api/EnquiryMasterApi/GetCityAreaMaster', collectionobj);
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
        var getData = myService.methode('POST', '../Api/EnquiryMasterApi/GetCityAreaMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Country", "HeaderValue": "CountryName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },                   
                    { "HeaderText": "State", "HeaderValue": "StateName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "City", "HeaderValue": "CityName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },   
                    { "HeaderText": "City Area", "HeaderValue": "CityAreaName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },   
                    { "HeaderText": "Area Code", "HeaderValue": "AreaCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },   
                    { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },  
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.CityAreaMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.CityAreaMasterList = $filter('filter')($scope.CityAreaMasterList, { 'Code': $scope.hfId }, true);

                $scope.CountryCode = $scope.CityAreaMasterList[0].CountryCode;
                $scope.StateCode = $scope.CityAreaMasterList[0].StateCode;
                $scope.CityCode = $scope.CityAreaMasterList[0].CityCode;
                $scope.CityAreaName = row[4];
                $scope.AreaCode = row[5];
                $scope.DisplayOrder = row[6];
                $scope.IsActive = row[7] == "Yes" ? "true" : "false";
              
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlCountry', true);             
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
        var getData = myService.methode('POST', '../Api/EnquiryMasterApi/InsertUpdateDeleteCityAreaMaster', collectionobj);
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
        
        $scope.CityAreaMasterList = [];
        $scope.CityAreaName = "";
        $scope.AreaCode = "";
        $scope.GetDisplayOrder();
        $scope.IsActive = "true";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlCountry');  
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
                { "HeaderText": "Country", "HeaderValue": "CountryName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "State", "HeaderValue": "StateName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "City", "HeaderValue": "CityName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "City Area", "HeaderValue": "CityAreaName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Area Code", "HeaderValue": "AreaCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.CityAreaMasterList, window.document.title);
    };
}