app.InventoryIndentApprovalController = function ($scope, $element, $filter, myService) {


    $scope.ApprovalDate = new Date();
    $scope.getVoucherNo = function () {
       
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.V_Type = 'IDNTA';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/InventoryTransactionApi/GetIndentVoucher', collectionobj);
        getData.then(function (response) {
            
            $scope.ApprovalNo = response.data[0].VoucherNo;
        });
    }

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

    $scope.key_Up = function (key) {

        if (key == 'Enter' || typeof (key) === 'undefined' || key == 'Backspace') {
            $scope.getEmployeeDetailUsingEmployeeCode($scope.EmployeeList, $scope.EmployeeCode)
        }
    }

    $scope.getEmployeeDetailUsingEmployeeCode = function (EmployeeList, EmployeeCode) {
      
        $scope.DepartMent = ($filter('filter')($scope.EmployeeList, { 'EmployeeCode': EmployeeCode }))[0].DepartmentName;
    }

    $scope.BindEmployee = function () {
        
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
    
    $scope.IndentDetList = [];
    $scope.BindIndentDetail = function (EmployeeCode) {
        debugger
        collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.EmployeeCode = EmployeeCode;
        
        var getData = myService.methode('POST', '../Api/InventoryTransactionApi/GetIndentEntryDetailforApproval', collectionobj);
        getData.then(function (response) {
          
      debugger
            if (response.data.length == 0) return;
            if (response.data.length > 0) {
                $("#Indent").show();
                $scope.IndentDetList = response.data;
            }
        });
    }

    $scope.IndentApprovalDetList = [];
    $scope.AddIndentApprovalDetList = function () {
        $scope.IndentApprovalDetList.push({
            SrNo: "",
            IndentNo: "",
            ITransID: "",
            ISrNo:"",
            IndentDate: "",
            RefNo: "",
            RefDate: "",
            ItemName: "",
            ItemCode: "",
            UnitName: "",
            UnitCode: "",
            StockQty: "",
            //OnOrderQty: "",
            IndentQty: "",
            ApproveQty: "",
            //POReq: "",
           
            IRemark: "",
            ARemark: "",
            IndentCloser: "",
        });
        var $index = $scope.IndentApprovalDetList.length - 1;
        setTimeout(function () {
            $('#txtSrno' + $index).focus();
        }, 500);
    };


    $scope.BindIndentDetailInApproval = function () {
        var index1 = 0;
        $("Indent").hide();
        $scope.IndentApprovalDetList = [];
        debugger
        $.each($scope.IndentDetList, function (index, val) {
            
            if (val.chk == true) {
                
                $scope.AddIndentApprovalDetList();
                $scope.IndentApprovalDetList[index1].IndentNo = val.IndentNo;
                $scope.IndentApprovalDetList[index1].ITransID = val.TransID;
                $scope.IndentApprovalDetList[index1].ISrNo = val.ISrNo;
                $scope.IndentApprovalDetList[index1].IndentDate = val.IndentDate;
                $scope.IndentApprovalDetList[index1].RefNo = val.RefNo;
                $scope.IndentApprovalDetList[index1].RefDate = val.RefDate;
                $scope.IndentApprovalDetList[index1].ItemName = val.ItemName;
                $scope.IndentApprovalDetList[index1].ItemCode = val.ItemCode;
                $scope.IndentApprovalDetList[index1].UnitName = val.UnitName;
                $scope.IndentApprovalDetList[index1].UnitCode = val.UnitCode;
                $scope.IndentApprovalDetList[index1].StockQty = val.StockQty;
                $scope.IndentApprovalDetList[index1].IndentQty = val.PendingQty;
                $scope.IndentApprovalDetList[index1].IRemark = val.IRemark;
                index1 = index1 + 1;
            }
        });
    }

    function IsVerify() {
        
        var msg = ""
        $.each($scope.IndentApprovalDetList, function (index, array) {
            
            if (array.ItemCode == "") {
                msg = "Please Fill Item in Row " + (index + 1);
            }
            else if (array.ItemCode == "" && $scope.checkNaN(array.ApproveQty) != 0) {
                msg = "Please Fill Item in Row " + (index + 1);
            }
            else if (array.ItemCode != "" && $scope.checkNaN(array.ApproveQty) == 0) {
                msg = "Please Fill Approve Qty in Row " + (index + 1);
            }
            else if (array.ItemCode != "" && array.POReq == "") {
                msg = "Please Fill P.O.Req. in Row " + (index + 1);
            }
        });
        return msg;
    }

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        if (isValidate()) {
            debugger
            if ($scope.IndentApprovalDetList.length == 0) { alertbox("No Records Found", "Validate"); }
            else {
                var msg = IsVerify();
                if (msg != "") {
                    alertbox(msg, "Validate");
                } else {
                    
                    $scope.showLoader();
                    collectionobjcollectionobj = {};
                    collectionobj.TransID = $scope.hfId;
                    collectionobj.ApprovalNo = $scope.ApprovalNo;
                    collectionobj.ApprovalDate = moment($scope.ApprovalDate, "DD-MMM-YYYY").format('YYYY-MMM-DD');
                    collectionobj.Indenter = $scope.EmployeeCode;
                    collectionobj.DepartMent = $scope.DepartMent;
                    collectionobj.IndentApproval_Det = JSON.stringify($scope.IndentApprovalDetList);
                    collectionobj.SessionId = sessionId;
                    collectionobj.RelationshipId = relationshipId;
                    collectionobj.FYId = fyId;
                    collectionobj.CreatedBy = JSON.parse(userid);
                    collectionobj.UpdatedBy = JSON.parse(userid);
                 
                    if ($scope.Save == "Save")
                    {
                        collectionobj.Action = 1;
                    }
                    else
                    {
                        collectionobj.Action = 2;
                    }

                    var getData = myService.methode('POST', "../Api/InventoryTransactionApi/InsertUpdateDeleteIndentApproval", collectionobj);
                    getData.then(function (response) {
                        
                        if (showMsgBox(response.data)) {
                            $scope.ClearControl(1);
                        }
                    });
                }
            }
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

    $scope.ResetControl = function (flag) {

        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableSelect = false;
        $scope.attr[0].Isdisabled = false;
        $scope.SetFocus('#Indenter');
        $("#Indent").hide();
        $scope.ApprovalNo = "";
        $scope.ApprovalDate = "";
        $scope.ApprovalDate = new Date();
        $scope.DepartMent = "";
        $scope.EmployeeCode = "";
        $scope.hfId = "";
        $scope.IndentDetList = [];
      
        $scope.IndentApprovalDetList = [];
        
        $scope.getVoucherNo();
        $scope.ClearTextModel();
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
       

        var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetIndentEntryDetailforApproval", collectionobj);
        getData.then(function (response) {
          
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Indent No.", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Indent Date", "HeaderValue": "V_Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                               
                    { "HeaderText": "Indenter", "Value": "IndenterCode", "HeaderValue": "Indenter", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", },
                    { "HeaderText": "Department", "Value": "DepartmentId", "HeaderValue": "DepartmentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.IndentApprovalDetList = response.data;

            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                debugger
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
              
                $scope.IndentApprovalDetList = $filter('filter')($scope.IndentApprovalDetList, { 'TransID': $scope.hfId });
                $scope.ApprovalNo = $scope.IndentApprovalDetList[0].PVNo;
                $scope.ApprovalDate = new Date(moment($scope.IndentApprovalDetList[0].V_Date, 'DD-MM-YYYY'));
               
                $scope.EmployeeCode = $scope.IndentApprovalDetList[0].IndenterCode;
                $scope.SetTextInModel($scope.attr[0], $scope.EmployeeCode);
                $scope.DepartMent = $scope.IndentApprovalDetList[0].DepartmentName;
                $scope.InTransID = $scope.IndentApprovalDetList[0].InTransID;
              
                var collectionobj = {};
                collectionobj.Action = 6;
                collectionobj.FYId = fyId;
                collectionobj.SessionId = sessionId;
                collectionobj.TransID = $scope.hfId;

                debugger
                var getData = myService.methode('POST', "../Api/InventoryTransactionApi/GetIndentEntryDetailforApproval", collectionobj);
                getData.then(function (response) {
                    debugger
                    $scope.IndentApprovalDetList = response.data;

              
               
                //$.each($scope.IndentApprovalDetList, function (index, array) {
                  
                //    if (array.IndentCloser == true) {
                      
                //        $scope.IndentApprovalDetList[index].IndentCloser = true;
                //    }
                //});
                });

                $("#Indent").hide();
                $scope.attr[0].Isdisabled = true;


                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.disableSelect = true;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#Indenter', true);
                $scope.hideLoader();
            });
   
        });
    };

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        $scope.showLoader();
        $scope.collectionobj = {};
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.TransID = $scope.hfId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = 3;
        var getData = myService.methode('POST', "../Api/InventoryTransactionApi/InsertUpdateDeleteIndentApproval", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ResetControl();

            };
        });
    };

}