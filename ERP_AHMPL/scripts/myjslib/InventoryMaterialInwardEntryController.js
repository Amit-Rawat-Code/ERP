app.InventoryMaterialInwardEntryController = function ($scope, $element, $filter, myService)
{
    $scope.VoucherDate = new Date();
    $scope.BindMaterialInwardEntryType = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;
        
        collectionobj.FYId = fyId;
        collectionobj.VoucherType = 'MIWED';
        collectionobj.NatureCode = '1';

        var getData = myService.methode('POST', '../Api/AccountMasterApi/VoucherMasterList', collectionobj);
        getData.then(function (response) {
         
            $scope.MaterialInwardEntryTypeList = response.data;
        });
    };
    $scope.getMaterialInwardEntryVoucherNo = function (V_Type) {
     
        var collectionobj = {};
        collectionobj.Action = "2";
        collectionobj.V_Type = 'MIWED';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/InventoryTransactionApi/GetMaterialInwardEntry', collectionobj);
        getData.then(function (response) {
           
            $scope.VoucherNo = response.data.Table[0].VoucherNo;
        });
    };
    $scope.GetSupplierData = function () {
      
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
           debugger
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
    $scope.BindTransporter = function () {
        
        var collectionobj = {};
        collectionobj.Action = 26;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/AccountMasterApi/GetLedger', collectionobj);
        getData.then(function (response) {
          
            $scope.TransporterList = response.data;
        });
    };


    $scope.GetIndentApprovalData = function () {

        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetIndentEntryDetailforApproval", collectionobj);
        getData.then(function (response) {
            
            $scope.IndentApprovalDetail = response.data;
            //angular.forEach(response.data.Table, function (value, key) {
            //    $scope.list = {};
            //    $scope.list['Srno'] = $scope.GRN_Detail.length;
            //    $scope.list['ItemGroupCode'] = value.ItemGroupCode;
            //    $scope.list['ItemCode'] = value.ItemCode;
            //    $scope.list['BaseUnitCode'] = value.BaseUnitCode;


            //    this.push($scope.list);
            //}, $scope.GRN_Detail);
        });
    }

    $scope.GRN_Detail = $scope.GRN_Detail || [];

    $scope.AddGRN_Detail = function () {
 
       
        if (typeof ($scope.GRN_Detail !== 'undefined')) {
            
            $scope.GRN_Detail.push({

                Srno: "",
                BillQty: "",
                RecQty: "",
                Rate: "",
                Amount: "",
               // ITransID="",
                IndentANo: "",
                IndentADate: "",
                RefNo:"",
                RefDate: "",
                ItemName: "",
                ItemCode:"",
                UnitName: "",
                BaseUnitCode:"",
                StockQty: "",
                IndentQty: "",
                IRemark: "",
                IndentYN: "",
                NetAmount:'',

            });
            var $index = $scope.GRN_Detail.length - 1;
            setTimeout(function () {
                $('#txtSrno' + $index).focus();
            }, 500);
        }
    }
        $scope.BindIndentApprovalDetail = function ()
        {
            debugger
            var index1 = 0
               $("Indent").hide();
            $scope.GRN_Detail = [];
            $.each($scope.IndentApprovalDetail, function (index, val) {
                debugger
                    
                if (val.chk == true) {
                    $scope.AddGRN_Detail();
                    $scope.GRN_Detail[index1].IndentANo = val.IndentANo;
                    $scope.GRN_Detail[index1].ITransID = val.ITransID;
                    $scope.GRN_Detail[index1].IndentADate = val.IndentADate;
                    $scope.GRN_Detail[index1].RefNo = val.RefNo;
                    $scope.GRN_Detail[index1].RefDate = val.RefDate;
                    $scope.GRN_Detail[index1].ItemName = val.ItemName;
                    $scope.GRN_Detail[index1].ItemCode = val.ItemCode;
                    $scope.GRN_Detail[index1].UnitName = val.UnitName;
                    $scope.GRN_Detail[index1].BaseUnitCode = val.UnitCode;
                    $scope.GRN_Detail[index1].StockQty = val.StockQty;
                    $scope.GRN_Detail[index1].IndentQty = val.ApproveQty;
                    $scope.GRN_Detail[index1].IRemark = val.IRemark;
                    $scope.GRN_Detail[index1].IndentYN = val.chk;
                    $scope.GRN_Detail[index1].NetAmount = val.NetAmount;
                    index1 = index1 + 1;
                }
           
                
                //$scope.AddGRN_Detail();
            })
            

    };
    $scope.RemoveGRN_Detail = function (index) {
        $scope.GRN_Detail.splice(index, 1)
    };
    $scope.UpGRN_Detail = function (index) {
        x = index, y = index - 1;
        var obj = $scope.GRN_Detail[x];
        $scope.GRN_Detail[x] = $scope.GRN_Detail.splice(y, 1, obj)[0];
    };
    $scope.DownGRN_Detail = function (index) {
        x = index;
        if (index == $scope.GRN_Detail.length - 1)
            y = 0;
        else
            y = index + 1;
        var obj = $scope.GRN_Detail[x];
        $scope.GRN_Detail[x] = $scope.GRN_Detail.splice(y, 1, obj)[0];
    };


    $scope.GetDetailsListobj = [];

    $scope.checkNaN = function (amount) {
        if (isNaN(amount))
            return 0;
        else
            return Number(amount)
    }

    $scope.calculateBillValue = function () {
        $scope.NetAmount = $scope.GRN_Detail.sum('Amount');
    }

    $scope.SaveRecord = function () {
   
        $scope.Stocker = 0;
            if ($scope.Stocker == 0) {
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
                collectionobj.GRNo = $scope.GRNo;
                collectionobj.GRDate = ValidDate($scope.GRDate) ? moment($scope.GRDate, "DD-MMM-YYYY").format('YYYY-MM-DD') : "";
                collectionobj.GSTN = $scope.GSTN;
                collectionobj.TranspoterCode = $scope.TransporterCode;
                collectionobj.VehicleNo = $scope.VehicleNo;
                collectionobj.Remark = $scope.Remarks;
                collectionobj.CancelYN = $scope.IsBillCanceled;
                collectionobj.BillValue = $scope.NetAmount;
                collectionobj.NetAmt = $scope.NetAmount;
                if (ValidDate($scope.DueDate))
                    collectionobj.DueDate = moment($scope.DueDate, "DD-MMM-YYYY").format('YYYY-MMM-DD')
               
                collectionobj.GrossWt = $scope.GrossWt;
                collectionobj.TareWt = $scope.TareWt;
               
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                
                if ($scope.Save == "Save") {
                    collectionobj.Action = 1;
                    collectionobj.CreatedBy = userid;
                }
                else {
                    collectionobj.Action = 3;
                    collectionobj.UpdatedBy = userid;
                }
                var getData = myService.methode('POST', "../Api/InventoryTransactionApi/InsertUpdateDeleteMaterialInwardEntry", collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
        }
    };

    $scope.getgrossAmt = function (recqty, rate, index) {
        $scope.GRN_Detail[index].Amount = $scope.ConvertAmountToDecimalPoint(recqty * rate);
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

        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.BindMaterialInwardEntryType();
        $scope.MaterialInwardEntryTypeCode = "";

        $scope.ChallanNo = "";
        $scope.ChallanDate = "";

        $scope.VoucherNo = "";
        $scope.getMaterialInwardEntryVoucherNo();
        $scope.VoucherDate = new Date();

        $scope.GRNo = "";
        $scope.GRDate = "";

        $scope.SupplierCode = "";
        $scope.Address1 = "";
        $scope.CityName = "";
        $scope.GSTN = "";

        $scope.BillQty="0"
        $scope.TransporterCode = "";
        $scope.Remarks = "";
        $scope.IsBillCanceled = "False";


        $scope.GrossWt = "";
        $scope.TareWt = "";
        $scope.GRN_Detail = [];
        $scope.AddGRN_Detail();
        $scope.BillValue = "0.00";
        $scope.NetAmount = "0.00";
        $scope.disabledCanceled = false;
        $scope.disabledSupplier = false;
        $scope.disableMaterialTypeCode = false;
        $scope.disableIsAgainstIndent = false;
        $scope.IsAgainstIndent = '1';

        $scope.VehicleNo = "";
        $scope.Stocker = 0;
   
        $scope.SetFocus('#ddlMaterialInwardEntryType');

        $scope.hfId = "";

        if (flag == 0) {
            showMsgBox('4');
        };
    }

    $scope.getAmount = function (itemCode, index) {
        debugger;
        if ($scope.PackingIsAllowed != '-1') {
            $scope.GRN_Detail[index].Amount = ($scope.GRN_Detail[index].QtyInBags * $scope.GRN_Detail[index].Rate * $scope.GRN_Detail[index].RecQtyUnitWise).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        else {
            $scope.GRN_Detail[index].Amount = ($scope.GRN_Detail[index].Rate).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    };

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        $scope.showLoader();

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        
        var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetMaterialInwardEntry", collectionobj);
        getData.then(function (response) {
           
            var tblheader =
                [
                    { "HeaderText": "S.R. No.", "Value": "TransId", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Voucher Type", "HeaderValue": "Description", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", },
                    { "HeaderText": "Supplier", "HeaderValue": "SupplierName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "G.E. No.", "HeaderValue": "VoucherNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "G.E. Date", "HeaderValue": "VoucherDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Bill Value", "HeaderValue": "BillValue", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "NumberType": $scope.Amt },
                    { "HeaderText": "Net Amount", "HeaderValue": "NetAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "NumberType": $scope.Amt },
                    { "HeaderText": "Cancel", "HeaderValue": "CancelYN", "Value":"Yes", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            
            $scope.MaterialInwardEntry = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $('#example tbody').on('dblclick', 'tr', function () {
                
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(FindHtml(row[0])).val();
                $scope.MaterialInwardEntry = $filter('filter')($scope.MaterialInwardEntry, { 'TransId': $scope.hfId });

                $scope.MaterialInwardEntryTypeCode = $scope.MaterialInwardEntry[0].VoucherType;

                $scope.ChallanNo = $scope.MaterialInwardEntry[0].ChallanNo;
                $scope.VoucherNo = $scope.MaterialInwardEntry[0].VoucherNo;

                if (typeof ($scope.MaterialInwardEntry[0].ChallanDate) !== 'undefined' && $scope.MaterialInwardEntry[0].ChallanDate != null && $scope.MaterialInwardEntry[0].ChallanDate != "") { $scope.ChallanDate = ConverttoDate($scope.MaterialInwardEntry[0].ChallanDate); }

                $scope.VoucherDate = ConverttoDate($scope.MaterialInwardEntry[0].VoucherDate);

                $scope.GRNo = $scope.MaterialInwardEntry[0].GRNo;

                if (typeof ($scope.MaterialInwardEntry[0].GRDate) !== 'undefined' && $scope.MaterialInwardEntry[0].GRDate != null && $scope.MaterialInwardEntry[0].GRDate != "") { $scope.GRDate = ConverttoDate($scope.MaterialInwardEntry[0].GRDate); }

                $scope.SupplierCode = $scope.MaterialInwardEntry[0].SupplierCode;

                $scope.Address1 = $scope.MaterialInwardEntry[0].Address1;
                $scope.CityName = $scope.MaterialInwardEntry[0].CityCode;
                $scope.GSTN = $scope.MaterialInwardEntry[0].GSTN;

                $scope.TransporterCode = $scope.MaterialInwardEntry[0].TransporterCode;
                $scope.VehicleNo = $scope.MaterialInwardEntry[0].VehicleNo;

                $scope.Remarks = $scope.MaterialInwardEntry[0].Remarks;
                $scope.IsBillCanceled = $scope.MaterialInwardEntry[0].CancelYN==1 ? 'True' : 'False';

                $scope.BillValue = $scope.ConvertAmountToDecimalPoint($scope.MaterialInwardEntry[0].BillValue);
                $scope.NetAmount = $scope.ConvertAmountToDecimalPoint($scope.MaterialInwardEntry[0].NetAmt);

                $scope.BillQty = $scope.MaterialInwardEntry[0].BillQty;


                if (ValidDate(moment($scope.MaterialInwardEntry[0].DueDate).format('YYYY-MMM-DD')))
                    $scope.DueDate = moment($scope.MaterialInwardEntry[0].DueDate).format('YYYY-MMM-DD')


                $scope.GrossWt = $scope.MaterialInwardEntry[0].GrWt;
                $scope.TareWt = $scope.MaterialInwardEntry[0].TareWt;
                

                $scope.showLoader();

                var collectionobj = {};
                collectionobj.Action = 5;
                collectionobj.FYId = fyId;
                collectionobj.SessionId = sessionId;
                collectionobj.TransID = $scope.hfId;
                debugger
                
                var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetMaterialInwardEntry", collectionobj);
                getData.then(function (response) {
                  debugger
                    $scope.GRN_Detail = response.data.Table;
                    $scope.IsAgainstIndent = $scope.GRN_Detail[0].IndentYN == true? $scope.IsAgainstIndent = '2': $scope.IsAgainstIndent='1';
                });

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                $scope.disableMaterialTypeCode = true;
                $scope.disabledSupplier = true;
                $scope.disabledCanceled = true;
                $scope.disableIsAgainstIndent = true;
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

              //  $scope.SetFocus('#ddlCashBankLedger', true);
                $scope.hideLoader();
            });
        });
    };



    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        debugger;
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.TransID = $scope.hfId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UpdatedBy = JSON.parse(userid);

        var getData = myService.methode('POST', "../Api/InventoryTransactionApi/InsertUpdateDeleteMaterialInwardEntry", collectionobj);
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
                { "HeaderText": "S.R. No.", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Description", "HeaderValue": "Description", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", },
                { "HeaderText": "G.E. No.", "HeaderValue": "VoucherNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "G.E. Date", "HeaderValue": "VoucherDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Sauda No.", "HeaderValue": "SaudaNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Due Date", "HeaderValue": "DueDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Supplier", "HeaderValue": "SupplierName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Bill Value", "HeaderValue": "BillValue", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Net Amount", "HeaderValue": "NetAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Cancel", "HeaderValue": "CancelYN", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];
        $scope.PrintMaster(tblheader, $scope.MaterialInwardEntryList);
    };
 
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
        getData.then(function (response)
        {
           $scope.ItemList = response.data;
        });
    };
    $scope.BindBaseUnit = function (ItemCode) {

        var collectionobj = {};
        collectionobj.Action = 7;
        //collectionobj.Code = ItemCode;
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
    $scope.BindBaseUnit()

    $scope.resetRow = function (index) {
        $scope.GRN_Detail[index].Rate = "";
        $scope.GRN_Detail[index].BaseUnitCode = ""
        $scope.GRN_Detail[index].Amount = "";
        if ($scope.GRN_Detail[index].Amt == '' || $scope.GRN_Detail[index].Amt == 'undefined')
            $scope.GRN_Detail[index].Amt = 0;

    }

    $scope.SumofList = function (model) {
        
        $scope[model] = Number($scope.GRN_Detail.sum('Amount')).toFixed(2);
        return $scope[model];
    }
    $scope.SumofQty = function (model) {
        
        $scope[model] = Number($scope.GRN_Detail.sum('RecQty'));
        return $scope[model];
    }
    $scope.BillQty = '0';
}