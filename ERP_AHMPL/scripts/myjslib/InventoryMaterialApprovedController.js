app.InventoryMaterialApprovedController = function ($scope, $element, $filter, myService)
{
    $scope.BillValue = "0.00";
    $scope.Isdisabled = false;
    $scope.BindItemGroup();
  

    $scope.BindMaterialInwardEntryType = function () {
      
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;

        collectionobj.FYId = fyId;
        collectionobj.VoucherType = 'MATQC';
        collectionobj.NatureCode = '1';

        var getData = myService.methode('POST', '../Api/AccountMasterApi/VoucherMasterList', collectionobj);
        getData.then(function (response) {
        
            $scope.MaterialInwardEntryTypeList = response.data;
        });
    };
    $scope.BindSupplier = function () {
       
        var collectionobj = {};
        collectionobj.Action = 24;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Nature = 'Supplier';
        var getData = myService.methode('POST', '../Api/InventoryTransactionApi/GetLedgerData', collectionobj);
        getData.then(function (response) {
            
            $scope.SupplierList = response.data;
        });
    };

    $scope.getSuplierDetail = function (SupplierCode) {

        var collectionobj = {};
        collectionobj.Action = 25;
        collectionobj.LedgerCode = SupplierCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/InventoryTransactionApi/GetLedgerData', collectionobj);
        getData.then(function (response) {

            if (response.data.length > 0) {
                $scope.Address1 = response.data[0].Address;
                $scope.CityName = response.data[0].CityName;

                $scope.GSTN = response.data[0].GSTN;
                $scope.PhoneNo = response.data[0].PhoneNo;
                $scope.MobileNo = response.data[0].MobileNo;
                $scope.CityCode = response.data[0].CityCode;
                $scope.PlaceOfSupply = response.data[0].CityName;
            }
            else {
                $scope.Address1 = "";
                $scope.CityName = "";
                $scope.GSTN = "";
                $scope.PhoneNo = "";
                $scope.MobileNo = "";
                $scope.CityCode = "";
                $scope.PlaceOfSupply = "";
            }
        });
    }
    $scope.ApprovalDate = new Date();

    $scope.ChangeStyle = function (index, transId) {
      
        for (var i = 0; i < $scope.List1.length; i++) {
            if ($scope.List1[i].index == index) {
                $scope.List1[i].bc = "acacad"
                $scope.List1[i].c = "#000"
                $scope.txtGENo = $scope.List1[i].VoucherNo;
            }
            else {
                $scope.List1[i].bc = "#fff"
                $scope.List1[i].c = "#bcbcbc"
            }
        }
        if ($scope.Isdisabled === false)
            $scope.showdiv = true;

        $scope.GetData(8, transId);
        $('#txtVoucherNo').focus();
    };

    $scope.GRN_Detail = [];
    
    $scope.GetGRDetail = function () {
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetMaterialInwardEntry", collectionobj);
        getData.then(function (response) {
            
            $scope.List1 = response.data.Table;
        });
    }
         
    $scope.GetData = function (action, transId) {
           debugger
           var collectionobj = {};
           collectionobj.Action = action;
           collectionobj.FYId = fyId;
           collectionobj.SessionId = sessionId;
           collectionobj.TransID = transId;
           var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetMaterialInwardEntry", collectionobj);
           getData.then(function (response) {                                   
           $scope.GRN_Detail = response.data.Table1;
        });
    }
    $scope.GetGRDetail();


    $scope.getgrossAmt = function (recqty, rate, index) {
        $scope.GRN_Detail[index].Amount = $scope.ConvertAmountToDecimalPoint(recqty  * rate);
        if (Number($scope.GRN_Detail[index].AcceptQty) > Number($scope.GRN_Detail[index].RecQty)) {
            alert("Accept Qty. can not grater than Rec Qty.", "Not Permitted!!");
            $scope.GRN_Detail[index].AcceptQty = $scope.GRN_Detail[index].RecQty;
            
        }
        else
            $scope.GRN_Detail[index].RejectQty = $scope.GRN_Detail[index].RecQty - $scope.GRN_Detail[index].AcceptQty;
    }

    $scope.getgrossAmt = function (excessqty, recqty, rate, index) {
       
        $scope.GRN_Detail[index].Amount = $scope.ConvertAmountToDecimalPoint((Number(recqty) + Number(excessqty))* rate);
        if (Number($scope.GRN_Detail[index].AcceptQty) > Number($scope.GRN_Detail[index].RecQty)) {
            alert("Accept Qty. can not grater than Rec Qty.", "Not Permitted!!");
            $scope.GRN_Detail[index].AcceptQty = $scope.GRN_Detail[index].RecQty;
            
        }
        else
            $scope.GRN_Detail[index].RejectQty = $scope.GRN_Detail[index].RecQty - $scope.GRN_Detail[index].AcceptQty;
    }
    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.resetRow = function (index) {
        $scope.GRN_Detail[index].Rate = "";
        $scope.GRN_Detail[index].BaseUnitCode = ""
        $scope.GRN_Detail[index].Amount = "";
        if ($scope.GRN_Detail[index].Amt == '' || $scope.GRN_Detail[index].Amt == 'undefined')
            $scope.GRN_Detail[index].Amt = 0;
    }
    $scope.BindItemGroup = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;

        var getData = myService.methode('POST', '../Api/InventoryMasterApi/GetItemGroupMaster', collectionobj);
        getData.then(function (response) {

            $scope.ItemGroupList = response.data;
        });
    };
    $scope.BindItem = function (Itemgroupcode, index) {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/InventoryMasterApi/GetItemMaster', collectionobj);
        getData.then(function (response) {

            $scope.ItemList = response.data;
        });
    };

    $scope.BindBaseUnit = function (ItemCode) {
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/InventoryMasterApi/GetUnitMaster', collectionobj);
        getData.then(function (response) {
            $scope.BaseUnitList = response.data;
        });
    };

    $scope.BindItemGroup();
    $scope.BindItem();
    $scope.BindBaseUnit();

    $scope.SumofList = function (model) {

        $scope[model] = Number($scope.GRN_Detail.sum('Amount')).toFixed(2);
        return $scope[model];
    }

    $scope.SaveRecord = function () {
        
        if (isValidate()) {
           
            var collectionobj = {};
            collectionobj.TransID = $scope.hfId;
            collectionobj.V_Type = $scope.MaterialInwardEntryTypeCode;
            collectionobj.VoucherNo = $scope.VoucherNo;
            collectionobj.V_Date = moment($scope.VoucherDate, "DD-MMM-YYYY").format('YYYY-MM-DD');
            collectionobj.GRN_Detail = JSON.stringify($scope.GRN_Detail);
            collectionobj.SupplierCode = $scope.SupplierCode;
            collectionobj.Address = $scope.Address1;
            collectionobj.CityName = $scope.CityName;
            collectionobj.ChallanNo = $scope.ChallanNo;
            collectionobj.ChallanDate = ValidDate($scope.ChallanDate) ? moment($scope.ChallanDate, "DD-MMM-YYYY").format('YYYY-MM-DD') : "";
            collectionobj.ApprovalDate = ValidDate($scope.ApprovalDate) ? moment($scope.ApprovalDate, "DD-MMM-YYYY").format('YYYY-MM-DD') : "";
            collectionobj.GRNo = $scope.GRNo;
            collectionobj.GRDate = ValidDate($scope.GRDate) ? moment($scope.GRDate, "DD-MMM-YYYY").format('YYYY-MM-DD') : "";
            collectionobj.GSTN = $scope.GSTN;
            collectionobj.TransporterCode = $scope.TransporterCode;
            collectionobj.VehicleNo = $scope.VehicleNo;
            collectionobj.GrossWt = $scope.GrossWt;
            collectionobj.TareWt = $scope.TareWt;
            collectionobj.Remark = $scope.Remarks;
            collectionobj.CancelYN = $scope.IsBillCanceled;
            collectionobj.BillValue = $scope.BillValue;
            collectionobj.NetAmt = $scope.NetAmount;
            collectionobj.FYId = fyId;
            collectionobj.SessionId = sessionId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;

            if ($scope.Save == "Save")
            {
                collectionobj.Action = 9;
            }
            else if ($scope.Save == "Edit")
            {
                collectionobj.Action = 10;
            }
            var getData = myService.methode('POST', "../Api/InventoryTransactionApi/InsertUpdateDeleteMaterialInwardEntry", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data))
                {
                    $scope.ClearControl(1);
                }
            });
        }
    };
    $scope.ClearControl = function (flag) {

        if (flag == 1)
        {
            $scope.ResetControl(flag);
        }
        else
        {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {
       
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.MaterialInwardEntryTypeCode = "";
        $scope.txtGENo = "";
        $scope.List1 = [];
        //$scope.resetSupplierAndBillFields();
        $scope.ChallanNo = "";
        $scope.ChallanDate = "";

        $scope.VoucherNo = "";
        $scope.VoucherDate = new Date();

        $scope.GRNo = "";
        $scope.GRDate = "";

        $scope.VoucherDate = '';
        $scope.VehicleNo = '';
        $scope.SupplierCode = "";
        $scope.Address1 = "";
        $scope.CityName = "";
        $scope.GSTN = "";

        $scope.TransporterCode = "";
        $scope.Remarks = "";
        $scope.IsBillCanceled = "False";

        $scope.BillValue = "0.00";
        $scope.NetAmount = "0.00";
        $scope.GrossWt = "";
        $scope.TareWt = "";
        $scope.GRN_Detail = [];

        $scope.showdiv = false;
        $scope.Isdisabled = false;

        $scope.GetGRDetail();
        $scope.SetFocus('#ddlMaterialApprovalType');


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
        $scope.showLoader();
        
        var collectionobj = {};
        collectionobj.Action = 12;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
       
        var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetMaterialInwardEntry", collectionobj);
        getData.then(function (response) {
            debugger
            var tblheader =
                [
                    { "HeaderText": "S.R. No.", "Value": "TransId", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Voucher Type", "HeaderValue": "Description", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", },
                    { "HeaderText": "G.E. No.", "HeaderValue": "VoucherNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "G.E. Date", "HeaderValue": "VoucherDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "G.R. No.", "HeaderValue": "GRNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "G.R. Date", "HeaderValue": "GRDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Supplier", "HeaderValue": "SupplierName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Bill Value", "HeaderValue": "BillValue", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "NumberType": $scope.Amt },
                    { "HeaderText": "Net Amount", "HeaderValue": "NetAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "NumberType": $scope.Amt },
                    { "HeaderText": "Cancel", "HeaderValue": "CancelYN", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.MaterialApprovalList = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                debugger
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(FindHtml(row[0])).val();
                $scope.MaterialApprovalList = $filter('filter')($scope.MaterialApprovalList, { 'TransId': $scope.hfId });

                $scope.MaterialInwardEntryTypeCode = $scope.MaterialApprovalList[0].VoucherType;

                $scope.ChallanNo = $scope.MaterialApprovalList[0].ChallanNo;

                $scope.Isdisabled = true;

                $scope.txtGENo = $scope.MaterialApprovalList[0].VoucherNo;

                $scope.ChallanDate = ConverttoDate($scope.MaterialApprovalList[0].ChallanDate);
                $scope.VoucherDate = ConverttoDate($scope.MaterialApprovalList[0].VoucherDate);

                $scope.GRNo = $scope.MaterialApprovalList[0].GRNo;
                $scope.GRDate = ConverttoDate($scope.MaterialApprovalList[0].GRDate);

                $scope.SupplierCode = $scope.MaterialApprovalList[0].SupplierCode;
                $scope.Address1 = $scope.MaterialApprovalList[0].Address1;
                $scope.CityName = $scope.MaterialApprovalList[0].CityCode;
                $scope.GSTN = $scope.MaterialApprovalList[0].GSTN;

                $scope.TransporterCode = $scope.MaterialApprovalList[0].TransporterCode;

                $scope.VehicleNo = $scope.MaterialApprovalList[0].VehicleNo;

                $scope.Remarks = $scope.MaterialApprovalList[0].Remarks;
                $scope.IsBillCanceled = $scope.MaterialApprovalList[0].CancelYN==1 ? 'True' : 'False';

                $scope.BillValue = $scope.ConvertAmountToDecimalPoint($scope.MaterialApprovalList[0].BillValue);
                $scope.NetAmount = $scope.ConvertAmountToDecimalPoint($scope.MaterialApprovalList[0].NetAmt);

                $scope.GrossWt = $scope.MaterialApprovalList[0].GrWt;
                $scope.TareWt = $scope.MaterialApprovalList[0].TareWt;

                $scope.showLoader();

                var collectionobj = {};
                collectionobj.Action = 13;
                collectionobj.FYId = fyId;
                collectionobj.SessionId = sessionId;
                collectionobj.TransId = $scope.hfId;

                
                var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetMaterialInwardEntry", collectionobj);
                getData.then(function (response) {
                    debugger
                    $scope.GRN_Detail = response.data.Table;
                });

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#ddlCashBankLedger', true);
                $scope.hideLoader();
            });
        });
    };

}