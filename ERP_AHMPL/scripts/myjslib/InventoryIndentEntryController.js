app.InventoryIndentEntryController = function ($scope, $element, $filter, myService) {

    $scope.attr = [
        {
            valueModel: 'EmployeeCode', initfun: 'BindEmployee()',
            listobj: 'EmployeeList', textCol: "Name", valueCol: "EmployeeCode",
            header: [
                { TextCol: "Name", ValueCol: "Name", Width: 150 },
                { TextCol: "EmployeeId", ValueCol: "EmployeeId", Width: 50 },
                { TextCol: "DepartmentName", ValueCol: "DepartmentName", Width: 300 }]
        }
    ];


    $scope.key_Up = function (key)
    {

        if (key == 'Enter' || typeof (key) === 'undefined' || key == 'Backspace')
        {
            $scope.getEmployeeDetailUsingEmployeeCode($scope.EmployeeList, $scope.EmployeeCode)
        }
    }

    $scope.getEmployeeDetailUsingEmployeeCode = function (EmployeeList, EmployeeCode)
    {

        $scope.DepartMent = ($filter('filter')($scope.EmployeeList, { 'EmployeeCode': EmployeeCode }))[0].DepartmentName;
    }


    $scope.BindEmployee = function ()
    {
        
        collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/InventoryTransactionApi/GetIndentEntryData', collectionobj);
        getData.then(function (response) {
            $scope.EmployeeList = response.data;
        });
    };

    $scope.GetIndentNo = function ()
    {
      
        var collectionobj = {};
        collectionobj.Action = "2";
        collectionobj.V_Type = 'IDNTE';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/InventoryTransactionApi/GetIndentEntryData', collectionobj);
        getData.then(function (response) {
            
            $scope.IndentNo = response.data[0].VoucherNo;
        });
    }
    $scope.GetIndentNo();

    $scope.IndentDate = new Date();
    $scope.IndentRefDate = new Date();


    $scope.Indent_Detail = $scope.Indent_Detail || [];

    $scope.AddIndent_Detail = function () {
       
        if (typeof ($scope.Indent_Detail !== 'undefined')) {
            $scope.Indent_Detail.push({

                Srno: "",
                ItemCode: "",
                StockQty:"",
                Remark:'',

            });
            var $index = $scope.Indent_Detail.length - 1;
            setTimeout(function () {
                $('#txtSrno' + $index).focus();
            }, 500);
        };
    }


    $scope.RemoveIndent_Detail = function (index)
    {
        $scope.Indent_Detail.splice(index, 1)
    };

    $scope.StockedItemQty = function (ItemCode, index) {
     
        collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.ItemCode = ItemCode;
       
        var getData = myService.methode('POST', '../Api/InventoryTransactionApi/GetStockDetialByItemCode',collectionobj);
        getData.then(function (response) {
          
            if (response.data.length == 0) return;
            if (response.data.length > 0) {
                $scope.Indent_Detail[index].StockQty = response.data[0].StockedQty;
            }
        });
    };
  

    $scope.SaveRecord = function ()
    {

        if (isValidate()) {
           
            var collectionobj = {};
            collectionobj.TransID = $scope.hfId;
            collectionobj.IndentNo = $scope.IndentNo;
            collectionobj.V_Type = 'IDNTE';
            collectionobj.IndentDate = moment($scope.IndentDate, "DD-MMM-YYYY").format('YYYY-MMM-DD');
            collectionobj.Indent_Detail = JSON.stringify($scope.Indent_Detail);
            collectionobj.IndentRefNo = $scope.IndentRefNo;
            collectionobj.IndentRefDate = moment($scope.IndentRefDate, "DD-MMM-YYYY").format('YYYY-MMM-DD');
            collectionobj.Indenter = $scope.EmployeeCode;
            collectionobj.DepartMent = $scope.DepartMent;
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
            var getData = myService.methode('POST', "../Api/InventoryTransactionApi/InsertUpdateDeleteIndentEntry", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    }


$scope.getgrossAmt = function (recqty, rate, index) {
    $scope.Indent_Detail[index].Amount = $scope.ConvertAmountToDecimalPoint(recqty * rate);
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
    $scope.IndentNo = "";
    $scope.IndentDate = new Date();
    $scope.IndentRefNo = '';

    $scope.IndentRefDate = new Date();
    $scope.IndenterTextModel = '';
    $scope.DepartMent = '';
    $scope.Indent_Detail = [];
    $scope.AddIndent_Detail();
    $scope.GetIndentNo();
    $scope.SetFocus('#txtIndentNo');

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
    collectionobj.Action = 4;
    collectionobj.FYId = fyId;
    collectionobj.SessionId = sessionId;
    collectionobj.FYId = fyId;

    var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetIndentEntryData", collectionobj);
    getData.then(function (response) {

        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Indent No.", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Indent Date", "HeaderValue": "V_Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Indent Ref. No.", "HeaderValue": "IndentRefNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Indent Ref. Date", "HeaderValue": "IndentRefDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Indenter", "Value": "Indenter", "HeaderValue": "Indenter", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", }
            ];
      
        $scope.IndentList = response.data;
        loadDataUsingPreDefinedColumn(tblheader, response.data);
        $('#example tbody').on('dblclick', 'tr', function () {
            debugger
            $scope.showLoader();
           
            var row = $('#example').DataTable().row(this).data();
            $scope.hfId = $(FindHtml(row[0])).val();
       
            $scope.IndentList = $filter('filter')($scope.IndentList, { 'TransID': $scope.hfId });
            $scope.IndentNo = $scope.IndentList[0].PVNo;
            $scope.IndentDate = new Date(moment($scope.IndentList[0].IndentDate, 'DD-MM-YYYY'));
            $scope.IndentRefNo = $scope.IndentList[0].IndentRefNo;
            $scope.IndentRefDate = new Date(moment($scope.IndentList[0].IndentRefDate, 'DD-MM-YYYY'));
            
            $scope.EmployeeCode = $scope.IndentList[0].IndenterCode;
            $scope.SetTextInModel($scope.attr[0], $scope.EmployeeCode);
            $scope.DepartMent = $scope.IndentList[0].DepartmentName;
            

            $scope.showLoader();

            var collectionobj = {};
            collectionobj.Action = 5;
            collectionobj.FYId = fyId;
            collectionobj.SessionId = sessionId;
            collectionobj.TransID = $scope.hfId;

            debugger
            var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetIndentEntryData", collectionobj);
            getData.then(function (response) {
                debugger
                $scope.Indent_Detail = response.data;

            });

            $scope.Save = "Edit";
            $scope.disableDelete = false;
            $scope.$applyAsync();

            $('.br-pageheader').fadeIn();
            $('#collapseinputbox').fadeIn();
            $('#CollapseSearchTableList').fadeOut();

            $scope.SetFocus('#ddlCashBankLedger', true);
            $scope.hideLoader();
        });
    });
};

   

$scope.DeleteRecord = function () {
    deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
};

$scope.deleteRecord = function () {

   
    var collectionobj = {};
    collectionobj.Action = 6;
    collectionobj.TransID = $scope.hfId;
    collectionobj.SessionId = sessionId;
    collectionobj.FYId = fyId;
    collectionobj.UpdatedBy = JSON.parse(userid);

    var getData = myService.methode('POST', "../Api/InventoryTransactionApi/InsertUpdateDeleteIndentEntry", collectionobj);
    getData.then(function (response) {
        if (showMsgBox(response.data)) {
            $scope.ClearControl(1);
        }
    });
};
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
            { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
            { "HeaderText": "Indent No.", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Indent Date", "HeaderValue": "V_Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Indent Ref. No.", "HeaderValue": "IndentRefNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Indent Ref. Date", "HeaderValue": "IndentRefDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Indenter", "Value": "Indenter", "HeaderValue": "Indenter", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", }
        ];
    $scope.PrintMaster(tblheader, $scope.MaterialInwardEntryList);
};

$scope.BindItem = function () {
    
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
    //collectionobj.Code = ItemCode;
    collectionobj.RelationshipId = relationshipId;
    collectionobj.SessionId = sessionId;
    collectionobj.FYId = fyId;

    var getData = myService.methode('POST', '../Api/InventoryMasterApi/GetUnitMaster', collectionobj);
    getData.then(function (response) {
        $scope.BaseUnitList = response.data;
    });
};


$scope.BindItem();
$scope.BindBaseUnit()

$scope.resetRow = function (index) {
    $scope.Indent_Detail[index].Rate = "";
    $scope.Indent_Detail[index].BaseUnitCode = ""
    $scope.Indent_Detail[index].Amount = "";
    if ($scope.Indent_Detail[index].Amt == '' || $scope.Indent_Detail[index].Amt == 'undefined')
        $scope.Indent_Detail[index].Amt = 0;
}

$scope.SumofList = function (model) {

    $scope[model] = Number($scope.Indent_Detail.sum('Amount')).toFixed(2);
    return $scope[model];
}
$scope.SumofQty = function (model) {

    $scope[model] = Number($scope.Indent_Detail.sum('RecQty'));
    return $scope[model];
}

}
