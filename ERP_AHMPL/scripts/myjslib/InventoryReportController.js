app.InventoryReportController = function ($scope, $element, $filter, myService) {

   
    $scope.GetGroupName = function () {
        collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getdata = myService.methode('POST', "../Api/InventoryMasterApi/GetItemGroupMaster", collectionobj);
        getdata.then(function (response) {

            $scope.GroupNameList = response.data;
        });
    }
    $scope.GetCategoryName = function (ItemGroupCode) {
       
        if (ItemGroupCode == undefined)
        {
            ItemGroupCode = '';
        }
        collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.ItemGroupCode = ItemGroupCode;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetItemCategoryMaster", collectionobj);
            getData.then(function (response) {
                
            $scope.ItemCategoryList = response.data;
        })
    }

    $scope.GetItemName = function (ItemCategoryCode) {
        
        if (ItemCategoryCode == undefined) {
            ItemCategoryCode = '';
        }
        collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.ItemCategoryCode = ItemCategoryCode;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getdata = myService.methode('POST', "../Api/InventoryMasterApi/GetItemMaster", collectionobj);
        getdata.then(function (response) {
           
            $scope.ItemNameList = response.data;
        });
    }

    $scope.GetModelName = function () {
        collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetModelMaster", collectionobj);
        getData.then(function (response) {
            
            $scope.ModelNameList = response.data;
        })
    }
    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };
    $scope.VehicleDataList = [];
    $scope.StudentDetailList = [];
    $scope.started = function () {

        var collectionobj = {};
       
            collectionobj.Action = '1';

            collectionobj.SessionId = sessionId
            collectionobj.ItemNameCode = $scope.ItemNameCode
            collectionobj.ItemGroupCode = $scope.ItemGroupCode
            collectionobj.ItemCategoryCode = $scope.ItemCategoryCode;
            collectionobj.ItemModelCode = $scope.ItemModelCode;
            collectionobj.FYId = fyId;
            
        var getData = myService.methode('POST', '../Api/InventoryReportApi/GetInventoryReport', collectionobj);
            getData.then(function (response) {
                debugger

                var tblheader =
                    [
                        { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                        { "HeaderText": "Item Name", "HeaderValue": "ItemName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Item Group Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Model Name", "HeaderValue": "ModelName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Date", "HeaderValue": "IWR_Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Vender", "HeaderValue": "PreferredVender", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Vender Address", "HeaderValue": "VenderAddress", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "State", "HeaderValue": "StateName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "City", "HeaderValue": "CityName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Pincode", "HeaderValue": "Pincode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Mobile No", "HeaderValue": "MobileNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Email Id", "HeaderValue": "EmailId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Payment Terms", "HeaderValue": "PaymentTerms", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Unit Price", "HeaderValue": "UnitPrice", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Unit", "HeaderValue": "UnitName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "GST %", "HeaderValue": "GstRate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Total Amount", "HeaderValue": "TotalAmount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Remark", "HeaderValue": "Remark", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "IsActive", "Value": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    ];
                loadDataUsingPreDefinedColumn(tblheader, response.data);
            });
        
    } 
}