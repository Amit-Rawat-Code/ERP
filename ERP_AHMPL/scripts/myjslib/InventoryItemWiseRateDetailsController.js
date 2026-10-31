
app.InventoryItemWiseRateDetailsController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtFromDate');

     $scope.BindItemCategory = function () {
        collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;

        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetItemCategoryMaster", collectionobj);
         getData.then(function (response) {
             
            $scope.ItemCategoryList = response.data;
        });
    }
    $scope.BindItemName = function (ItemCategoryCode) {
        
        collectionobj = {};
        collectionobj.Action = '6';
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.ItemCategoryCode = ItemCategoryCode;
        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetItemMaster", collectionobj);
        getData.then(function (response) {
     
            $scope.ItemNameList = response.data;
        });
    }
    $scope.BindItemModel = function () {
        collectionobj = {};
        collectionobj.Action = '5';
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "../Api/InventoryMasterApi/GetModelMaster", collectionobj);
        getData.then(function (response) {
            $scope.ModelNameList = response.data;
        });
    }
    $scope.BindState = function () {
        
        collectionobj = {};
        collectionobj.Action = '4';
        //collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/GetMasterApi/GetState", collectionobj);
        getData.then(function (response) {
       
            $scope.Statelist = response.data;
        });
    }

    $scope.BindCity = function (StateCode) {
        
        collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.StateCode = StateCode;
        var getData = myService.methode('POST', "../Api/GetMasterApi/GetCity", collectionobj);
        getData.then(function (response) {
            
            $scope.Citylist = response.data;
        });
    }

    $scope.SaveRecord = function () {
        
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};

            collectionobj.TransId = $scope.hfId;
            collectionobj.IWR_Date = moment(($scope.IWR_Date)).format('DD-MMM-YYYY');
            collectionobj.ItemCategoryCode = $scope.ItemCategoryCode;
            collectionobj.ItemNameCode = $scope.ItemNameCode;
            collectionobj.ModelCode = $scope.ModelCode;
            collectionobj.PreferredVender = $scope.PreferredVender;
            collectionobj.VenderAddress = $scope.VenderAddress;
            collectionobj.StateCode = $scope.StateCode;
            collectionobj.CityCode = $scope.CityCode;
            collectionobj.Pincode = $scope.Pincode;
            collectionobj.MobileNo = $scope.MobileNo;
            collectionobj.EmailId = $scope.EmailId;
            collectionobj.PaymentTerms = $scope.PaymentTerms;
            collectionobj.UnitPrice = $scope.UnitPrice;
            collectionobj.GstRate = $scope.GstRate;
            collectionobj.TotalAmount = $scope.TotalAmount;
            collectionobj.Remark = $scope.Remark;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
                collectionobj.CreatedBy = userid;
            }
            else {
                collectionobj.Action = 2;
                collectionobj.UpdatedBy = userid;
            }
            var getData = myService.methode('POST', "../Api/InventoryTransactionApi/InsertUpdateDeleteItemWiseRateDetails", collectionobj);
            getData.then(function (response) {

                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
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

    /*REset Button On Click Event*/
    $scope.ResetControl = function (flag) {

        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.IWR_Date = '';
        $scope.ItemCategoryCode='';
        $scope.ItemNameCode = '';
        $scope.ModelCode = '';
        $scope.PreferredVender = '';
        $scope.VenderAddress = '';
        $scope.StateCode = '';
        $scope.CityCode = '';
        $scope.Pincode = '';
        $scope.MobileNo = '';
        $scope.EmailId = '';
        $scope.PaymentTerms = '';
        $scope.UnitPrice = '';
        $scope.GstRate = '';
        $scope.TotalAmount = '';
        $scope.Remark = '';
        $scope.SetFocus('#txtHSNCode');
        $scope.IsActive = "true";
        $scope.hfId = "";
        if (flag == 0) {
            showMsgBox('4');
        };
    }
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {
       
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetItemWiseRateDetails", collectionobj);
        getData.then(function (response) {

            debugger
            $scope.ItemWiseRateList = response.data;
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "20px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Item Name", "HeaderValue": "ItemName", "Width": "100%;", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Category Name", "HeaderValue": "CategoryName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Model Name", "HeaderValue": "ModelName", "Width": "100%;", "ShowColumn": "Yes", "ImageColumn": "No" },
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
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "50%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" },
                ];

            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
               
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ItemWiseRateList = $filter('filter')($scope.ItemWiseRateList, { 'TransId': $scope.hfId });
                $scope.IWR_Date = new Date($scope.ItemWiseRateList[0].IWR_Date);
                $scope.ItemCategoryCode = $scope.ItemWiseRateList[0].ItemCategoryCode;
                $scope.ItemNameCode = $scope.ItemWiseRateList[0].ItemNameCode;
                $scope.BindItemName($scope.ItemCategoryCode);
                $scope.ModelCode = $scope.ItemWiseRateList[0].ModelCode;
                $scope.PreferredVender = $scope.ItemWiseRateList[0].PreferredVender;
                $scope.VenderAddress = $scope.ItemWiseRateList[0].VenderAddress;
                $scope.StateCode = $scope.ItemWiseRateList[0].StateCode;
                $scope.BindCity($scope.StateCode);
                $scope.CityCode = $scope.ItemWiseRateList[0].CityCode;
                $scope.Pincode = $scope.ItemWiseRateList[0].Pincode;
                $scope.MobileNo = $scope.ItemWiseRateList[0].MobileNo;
                $scope.EmailId = $scope.ItemWiseRateList[0].EmailId;
                $scope.PaymentTerms = $scope.ItemWiseRateList[0].PaymentTerms;
                $scope.UnitPrice = $scope.ItemWiseRateList[0].UnitPrice;
                $scope.GstRate = $scope.ItemWiseRateList[0].GstRate;
                $scope.CalculateTotalAmount($scope.UnitPrice, $scope.GstRate);
                $scope.Remark = $scope.ItemWiseRateList[0].Remark;
                $scope.IsActive = $scope.ItemWiseRateList[0].IsActive.toString();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtUnitName', true);
                $scope.hideLoader();


            });
        });
    };
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.TransId = $scope.hfId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;

        var getData = myService.methode('POST', "../Api/InventoryTransactionApi/InsertUpdateDeleteItemWiseRateDetails", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
    $scope.CalculateTotalAmount = function (UnitPrice, Per) {
       
        $scope.TotalAmount = Number(UnitPrice) + Number(UnitPrice * (Per / 100));
    }
}