app.BookStockLibController = function ($scope, $element, $filter, myService) {

    $scope.SetFocus('#txtBillNo');
    $scope.VDate = new Date();
    $scope.validate1 = "S";
    $scope.GetVoucherNoLibList(6);
    $scope.StockExcelList = [];

    $scope.GetVoucherNoLibList = function (SubAction) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SubAction = SubAction;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetVoucherNoLibList', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.MaxAccessionNo = response.data[0].PVNo;
            }
        });
    }
     $scope.GetAlmeraList = function () {
        
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryMasterApi/GetAlmeraList', collectionobj);
         getData.then(function (response) {
             //debugger
            if (response.data.length > 0) {
                $scope.Almeralist = response.data;
            }
        });
    };
    $scope.GetRackLibListByAlmera = function (AlmeraCode) {
        //debugger
        $scope.RacklibList = [];
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.SessionId = sessionId;
        collectionobj.AlmeraCode = AlmeraCode;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryMasterApi/GetRackMasterList', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.RacklibList = response.data;
            }
        });
    };

    $scope.setBillNoLib = function (billno) {
        //debugger;
        $scope.SearchBillText = billno.BillNo;
        $scope.TransID = billno.TransID;
        $scope.BillDateM = new Date(moment(billno.BillDate, 'DD-MM-YYYY'));
        $scope.VednerNameM = billno.VendorName;
        $scope.hfVenderCode = billno.VendorCode;
        $scope.HideStudentList();
        $scope.$applyAsync();
    }

    $scope.resetBillNoData = function () {
        $scope.SearchBillText = "";
        $scope.TransID = "";
        $scope.BillDateM = "";
        $scope.VednerNameM = "";
        $scope.hfVenderCode = "";
    }

    $scope.GetBinList = function (RackCode) {
        //debugger;
        var collectionobj = {};
        $scope.BinList = [];
        collectionobj.Action = 8;
        collectionobj.AlmeraCode = $scope.AlmeraCode;
        collectionobj.RackCode = RackCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/LibraryMasterApi/BindBinList',  collectionobj);
        getData.then(function (response) {            
            if (response.data.length > 0) {
                //debugger;
                $scope.BinList = response.data;
            }
        });
    };

    $scope.BS = [];
    $scope.AddBS = function () {
        //debugger;
        $scope.BS.push({
            SrNo: "",
            BookCode: "",
            BookName: "",
            AccessionNo: "",
            AlmeraCode: "",
            Almera: "",
            RackCode: "",
            Rack: "",
            BinCode: "",
            Bin: "",
            AuthorName: "",
            AuthorCode: "",
            PublisherName: "",
            PublisherCode: "",
            Edition: "",
            PublisherYear: "",
            Price: "",
            NoOfPages: "",
            NoOfCopy: "",
            BookAccCode: "",
            BookAccessories: "",
            ISBN: "",
            DDC: "",
            BARID: "",
        });
        var $index = $scope.BS.length - 1;
        setTimeout(function () { $('#txtSrNo' + $index).focus(); }, 500);
    };
    $scope.FetchRecord = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.TransId = $scope.TransID;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBillDetailLib',  collectionobj );
        getData.then(function (response) {
            debugger
            if (response.data.length > 0) {
                $scope.BS = response.data;
                $scope.SNoList($scope.BS.length);
                var collectionobj = {};
                collectionobj.Action = 5;
                collectionobj.SessionId = sessionId;
                collectionobj.BinStart = 1;
                collectionobj.BinEnd = $scope.BS.length;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                var getData = myService.methode('POST', '../Api/LibraryMasterApi/GetAccessionSetting', collectionobj);
                getData.then(function (response) {
                    //debugger
                    if (response.data.length > 0) {
                        $scope.AccessionIDList = response.data;
                        $.each($scope.AccessionIDList, function (index, value) {
                            //debugger
                            $scope.BS[index].AccessionID = value.AccessionId;
                        });
                    }
                });
            }
        });
    };

    $scope.SNoList = function (len) {
        this.SrNoList = [];
        //debugger;
        for (var i = 1; i <= len; i++) {
            //debugger;
            var obj = { no: i };
            this.SrNoList.push(obj);
        }
    }

    $scope.GenerateAccession = function () {
        //debugger;

        if ($scope.Save == "Save") {
            if ($scope.SearchBillText == "") { showMsgBox("Select bill no."); }
            else if ($scope.BillDateM == "") { showMsgBox("Select bill date."); }
            else if ($scope.AlmeraCode == "") { showMsgBox("Select almera name"); }
            else if ($scope.RackCode == "") { showMsgBox("Select rack name"); }
            else if ($scope.BinNameM == "") { showMsgBox("Select bin name"); }
            //else if ($scope.AccessionFromM == "") { showMsgBox("Select Accession from"); }
            //else if ($scope.AccessionToM == "") { showMsgBox("Select Accession to"); }
            else if ($scope.FromM == "") { showMsgBox("Select srno. from"); }
            else if ($scope.ToM == "") { showMsgBox("Select srno. to"); }
            else {
                //debugger;
                var FromS = parseInt($scope.FromM);
                var ToS = parseInt($scope.ToM);
                if (FromS > ToS) { showMsgBox("SrNo. From can't Greater Than SrNo. To.!"); }
                else {
                    if ($scope.FromM > 0) {
                        //debugger;                        
                            //var AccessionID = $scope.AccessionFromM;
                            for (var i = FromS; i <= ToS; i++) {
                                $scope.BS[i - 1].Almera = $filter('filter')($scope.Almeralist, { 'Code': $scope.AlmeraCode })[0].Name;
                                $scope.BS[i - 1].AlmeraCode = $scope.AlmeraCode;
                                $scope.BS[i - 1].Rack = $filter('filter')($scope.RacklibList, { 'Code': $scope.RackCode })[0].Name;
                                $scope.BS[i - 1].RackCode = $scope.RackCode;
                                $scope.BS[i - 1].Bin = $filter('filter')($scope.BinList, { 'Code': $scope.BinNameM })[0].Name;
                                $scope.BS[i - 1].BinCode = $scope.BinNameM;
                                //if (i == $scope.FromM) {
                                //    $scope.BS[i - 1].AccessionID = $scope.PrefixM + AccessionID;
                                //}
                                //else {
                                //    $scope.BS[i - 1].AccessionID = $scope.PrefixM + ($scope.checkNaN(AccessionID) + 1);
                                //    AccessionID = ($scope.checkNaN(AccessionID) + 1);
                                //}                                
                            }
                        }                        
                    }
                }
            }
        }

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        if (isValidate()) {
            debugger;
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.TransId = $scope.hfId;
            collectionobj.V_Date = moment($scope.VDate, 'DD-MM-YYYY');
            collectionobj.BillDate = moment($scope.BillDateM, 'DD-MM-YYYY');
            collectionobj.VendorCode = $scope.hfVenderCode;
            collectionobj.BillNo = $scope.SearchBillText;
            collectionobj.DataInToJson = JSON.stringify($scope.BS);            
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = JSON.parse(userid);
            collectionobj.UpdatedBy = JSON.parse(userid);

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = 2;
            }
            var getData = myService.methode('POST', '../Api/LibraryTransactionApi/InsertUpdateDeleteBookStock', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });

        }
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
        //debugger;
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disable = false;
        $scope.VoucherM = "";
        $scope.GetVoucherType("BKLOC");
        $scope.GetVoucherNoLibList(1);
        $scope.VDate = "";
        $scope.VDate = new Date();
        $scope.hfId = "";
        $scope.BS = [];
        $scope.validate1 = "S";
        $scope.AddBS();
        $scope.BookStockList = [];
        $scope.BookStockList1 = [];
        $scope.resetBillNoData();
        $scope.SearchBillText = "";
        $scope.PrefixM = "";
        $scope.BillDateM = "";
        $scope.AlmeraCode = "";
        $scope.RackCode = "";
        $scope.BinNameM = "";
        $scope.AccessionFromM = "";
        $scope.AccessionToM = "";
        $scope.FromM = "";
        $scope.ToM = "";
        $scope.SetFocus('#txtBillNo');
        $('.dropify-clear').click();
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.BookStockList = [];

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        //debugger;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBookStockList', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Bill No.", "Value": "BillNo", "HeaderValue": "BillNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Bill Date", "Value": "BillDate", "HeaderValue": "BillDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "V No.", "Value": "PVNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "V Date", "Value": "VDate", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Vender Name", "Value": "VendorCode", "HeaderValue": "VendorName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                ];
            //debugger
            $scope.BookStockList = response.data.Table1;
            $scope.BookStockList1 = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                //debugger;
                $scope.BookStockList = $filter('filter')($scope.BookStockList, { 'TransID': $scope.hfId });
                $scope.BillDateM = new Date(moment(row[2], 'DD-MM-YYYY'));
                $scope.SearchBillText = $(FindHtml(row[1])).val();
                $scope.hfVenderCode = $(FindHtml(row[5])).val();
                $scope.VednerNameM = $scope.BookStockList[0].Vendor;
                $scope.VDate = new Date(moment(row[4], 'DD-MM-YYYY'));
                $scope.PVNo = $(FindHtml(row[3])).val();
                //debugger;
                $scope.disable = true;
                $scope.validate1 = "E";
                $scope.BS = $scope.BookStockList;

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlStudentName', true);
                $scope.hideLoader();
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.TransId = $scope.hfId;
        collectionobj.BookCode = $scope.hfBookcode;
        collectionobj.AccessionNo = $scope.AccessionM;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/InsertUpdateDeleteBookStock', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ResetControl();
                $scope.hideLoader();
            };
        });
    };    

    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        //debugger;
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

    /*Print Button Click Event*/
    $scope.PrintRecord = function () {
        $scope.BookStockList1 = $filter('filter')($scope.BookStockList1, { 'TransID': $scope.hfId });
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Bill No.", "Value": "BillNo", "HeaderValue": "BillNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Bill Date", "Value": "BillDate", "HeaderValue": "BillDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "V No.", "Value": "PVNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "V Date", "Value": "VDate", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Vender Name", "Value": "VendorCode", "HeaderValue": "VendorName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.BookStockList1, window.document.title);
    };

    $scope.GetBillNoList = function (action) {
      
        $scope.disabledSearch = true;
        $scope.hideloader = true;
        //debugger;
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.Action = action;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBillNoList', collectionobj);
        getData.then(function (response) {
            //debugger;
            $scope.BillList = response.data;
            if ($scope.BillList.length > 0) {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;
                }, 100);
            }
            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }
    
    //$(".BillListOnOff").click(function (e) {
    //    debugger;
    //    e.stopPropagation();
    //    return false;
    //});
    
}