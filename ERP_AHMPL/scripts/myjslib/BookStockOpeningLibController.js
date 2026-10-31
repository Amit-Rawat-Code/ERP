app.BookStockOpeningLibController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtBillNo');
    $scope.VDate = new Date();
    $scope.validate1 = "S";
    $scope.GetVoucherNoLibList(6);
    $scope.DuplicateRecordSerials = [];
    $scope.FilteredExcelList = [];
    $scope.StockExcelList = [];
    $scope.StockExcelBookList = [];
    $scope.StockDataExcel = [];
    $scope.AuthorFlag = false;
    $scope.PublisherFlag = false;
    $scope.BookFlag = false;
    $scope.GroupFlag = false;
    $scope.SubjectFlag = false;
    $scope.AlmirahFlag = false;
    $scope.RackFlag = false;
    $scope.BinFlag = false;
    $scope.EditionFlag = false;    
    $scope.UnmatchedList = [];
    $scope.Message2 = "";
    $scope.totalDisplayed = 500;
    $scope.ProgressBarValue = 0;
    $scope.LoadMore = function () {
        $scope.showLoader();
        if ($scope.totalDisplayed + 500 > $scope.FilteredExcelList.length)
            $scope.totalDisplayed += $scope.totalDisplayed - $scope.FilteredExcelList.length;
        else
            $scope.totalDisplayed += 500;
        setTimeout(function () {
            $scope.hideLoader();
        }, 5000)
    };


    var FullPath = window.location.href;
    var path = window.location.pathname;
    $scope.ExcelPath = FullPath.replace(path, "/Content/ExcelFormat/ExcelForAccession.xlsx");

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
        $scope.SNoList($scope.BS.length);
    };

    $scope.RemoveBS = function (index) {
        $scope.BS.splice(index, 1)
        $scope.SNoList($scope.BS.length);
    };
    $scope.UpBS = function (index) {
        x = index, y = index - 1;
        var obj = $scope.BS[x];
        $scope.BS[x] = $scope.BS.splice(y, 1, obj)[0];
    };
    $scope.DownBS = function (index) {
        x = index;
        if (index == $scope.BS.length - 1)
            y = 0;
        else
            y = index + 1;
        var obj = $scope.BS[x];
        $scope.BS[x] = $scope.BS.splice(y, 1, obj)[0];
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
    $scope.GetBookDetail = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBookDetailLib', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                //debugger
                $scope.BookList = response.data;
            }
        });
    };

    $scope.GetBookDetails = function (BookCode, index) {
        //debugger;
        if (BookCode == "" || BookCode == 'undefined') { }
        else {
            var collectionobj = {};
            collectionobj.Action = 7;
            collectionobj.SessionId = sessionId;
            collectionobj.Code = BookCode;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBookDetailLib', collectionobj);
            getData.then(function (response) {
                if (response.data.length > 0) {
                    $scope.BS[index].AuthorCode = response.data[0].AuthorCode;
                    $scope.BS[index].Author = response.data[0].Author;
                    $scope.BS[index].PublisherCode = response.data[0].PublisherCode;
                    $scope.BS[index].Publisher = response.data[0].Publisher;
                }
            });
        }
    };

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
            //debugger;
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.TransId = $scope.hfId;
            collectionobj.V_Date = moment($scope.VDate, 'DD-MM-YYYY');
            collectionobj.BillDate = moment($scope.BillDateM, 'DD-MM-YYYY');
            collectionobj.VendorCode = $scope.hfVenderCode;
            collectionobj.BillNo = $scope.SearchBillText;
            collectionobj.DataInToJson = JSON.stringify($scope.BS);
            collectionobj.ExcelData1 = JSON.stringify($scope.ExcelList);
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
            var getData = myService.methode('POST', '../Api/LibraryTransactionApi/InsertUpdateDeleteBookStockOpening', collectionobj);
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

    $scope.ResetControl = function (flag) {
        //debugger;
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disable = false;
        $scope.VoucherM = "";
        $scope.GetVoucherType("OPNLB");
        $scope.GetVoucherNoLibList(1);
        $scope.VDate = "";
        $scope.VDate = new Date();
        $scope.hfId = "";
        $scope.BS = [];
        $scope.validate1 = "S";
        $scope.AddBS();
        $scope.BookStockList = [];
        $scope.BookStockList1 = [];
        $scope.FilteredExcelList = [];
        $scope.totalDisplayed = 500;
        $scope.DuplicateRecordSerials = [];
        $scope.AuthorFlag = false;
        $scope.PublisherFlag = false;
        $scope.BookFlag = false;
        $scope.GroupFlag = false;
        $scope.SubjectFlag = false;
        $scope.AlmirahFlag = false;
        $scope.RackFlag = false;
        $scope.BinFlag = false;
        $scope.EditionFlag = false;
        $scope.UnmatchedList = [];
        $scope.Message2 = "";
        $scope.ProgressBarValue = 0;
        $scope.PrefixM = "";
        $scope.AlmeraCode = "";
        $scope.RackCode = "";
        $scope.BinNameM = "";
        $scope.AccessionFromM = "";
        $scope.AccessionToM = "";
        $scope.FromM = "";
        $scope.ToM = "";
        $scope.StockExcelList = [];
        $scope.ProgressBarValue = 0;
        $scope.ProgressValue = 0;
        document.getElementById('fileUpload').value = "";
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
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBookStockListOpening', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "V No.", "Value": "PVNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "V Date", "Value": "VDate", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

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
                $scope.VDate = new Date(moment(row[2], 'DD-MM-YYYY'));
                $scope.PVNo = $(FindHtml(row[1])).val();
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
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/InsertUpdateDeleteBookStockOpening', collectionobj);
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

    $scope.loadFile = function (files) {
        //debugger
        $scope.$apply(function () {
            //debugger
            $scope.selectedFile = files[0];
            var file = $scope.selectedFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadstart = function () {
                    $scope.showLoader();
                }
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, { type: 'binary' });
                    var first_sheet_name = workbook.SheetNames[0];
                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);
                    if (dataObjects.length > 0) {
                        $scope.StockDataExcel = dataObjects;
                        $scope.sn = false;
                    }
                    else {
                        $scope.msg = "Error : Something Wrong !";
                    }
                }
                reader.onerror = function (ex) {

                }
                reader.onloadend = function () {
                    $scope.hideLoader();
                }
                reader.readAsBinaryString(file);
            }
        })
    }
    $scope.ShowExcelRecords = function () {
        $scope.StockExcelList = [];
        $scope.IsExcelDataOk = true;
        $scope.TrimWhiteSpaces($scope.StockDataExcel);
        $scope.StockExcelBookList = $scope.uniqueByKey($scope.StockExcelBookList, 'AccessionNo');
        $.each($scope.StockExcelBookList, function (index, value) {
            $scope.StockExcelList.push({
                SrNo: (index + 1),
                AccessionNo: value.AccessionNo,
                Author: value.Author,
                BookTitle: value.BookTitle,
                Volume: value.Volume,
                Publisher: value.Publisher,
                GroupName: value.GroupName,
                Subject: value.Subject,
                Pages: value.Pages,
                ISBNNo: value.ISBNNo,
                Edition: value.Edition,
                DDC: value.DDC,
                BarCode: value.BarCode,
                Almirah: value.Almirah,
                Rack: value.Rack,
                Bin: value.Bin,
                color: ''
            });
        })
        $scope.CheckExcelRecords();
    }    
    $scope.uniqueByKey = function (array, key) {
        $scope.res = [...new Map(array.map((x) => [x[key].toLowerCase(), x])).values()]
        setTimeout(function () {
            $scope.hideLoader();
        }, 1000)
        return $scope.res;
    };

    //$scope.UploadExcelRecords = function () {
    //    debugger
    //    if ($scope.StockExcelList.length > 0) {
    //        var collectionobj = {};
    //        collectionobj.Action = 1;
    //        collectionobj.IsActive = $scope.IsActive;
    //        collectionobj.SessionId = sessionId;
    //        collectionobj.FYId = fyId;
    //        collectionobj.RelationshipId = relationshipId;
    //        collectionobj.CreatedBy = JSON.parse(userid);
    //        collectionobj.UpdatedBy = JSON.parse(userid);
    //        collectionobj.BookMasterExcelData = JSON.stringify($scope.StockExcelList);
    //        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBookStockOpening", collectionobj);
    //        getData.then(function (response) {
    //            debugger
    //            if (showMsgBox(response.data, '', 'Already Exists...', 'warning', 'btn-warning')) {
    //                $scope.ClearControl(1);
    //            }
    //        });
    //    }
    //    else {ssss
    //        showMsgBox('999', '', 'Please Choose File...', 'warning', 'btn-warning');
    //    }
    //};

    $scope.TrimWhiteSpaces = function (objectData) {
        $scope.StockExcelBookList = [];
        $.each(objectData, function (index, value) {
            $scope.StockExcelBookList.push({
                AccessionNo: value.AccessionNo == undefined ? '' : value.AccessionNo.trim(),
                Author: value.Author == undefined ? '' : value.Author.trim(),
                BookTitle: value.BookTitle == undefined ? '' : value.BookTitle.trim(),
                Volume: value.Volume == undefined ? '' : value.Volume.trim(),
                Publisher: value.Publisher == undefined ? '' : value.Publisher.trim(),
                GroupName: value.GroupName == undefined ? '' : value.GroupName.trim(),
                Subject: value.Subject == undefined ? '' : value.Subject.trim(),
                Pages: value.Pages == undefined ? '' : value.Pages.trim(),
                ISBNNo: value.ISBNNo == undefined ? '' : value.ISBNNo.trim(),
                Edition: value.Edition == undefined ? '' : value.Edition.trim(),
                DDC: value.DDC == undefined ? '' : value.DDC.trim(),
                BarCode: value.BarCode == undefined ? '' : value.BarCode.trim(),
                Almirah: value.Almirah == undefined ? '' : value.Almirah.trim(),
                Rack: value.Rack == undefined ? '' : value.Rack.trim(),
                Bin: value.Bin == undefined ? '' : value.Bin.trim()
            });
        })
    }

    $scope.ValidateExcelData = function () {
        $scope.FilteredExcelList = [];
        var n = $scope.DuplicateRecordSerials;
        $.each($scope.DuplicateRecordSerials, function (index, value) {
            if (value.FlagVal == 0)
                $scope.StockExcelList[value.SrNo - 1].color = '#e97b51';
            if (value.FlagVal == 1)
                $scope.StockExcelList[value.SrNo - 1].color = '#e5bccd';
        })
        if ($scope.UnmatchedList.length > 1) {
            $scope.Message2 = $scope.UnmatchedList.join(",");
        }
        else {
            $scope.Message2 = $scope.UnmatchedList.join("");;
        }
        $scope.RecordToBeInserted = $scope.StockExcelList.length - $scope.DuplicateRecordSerials.length;
        $scope.FilteredExcelList = $scope.StockExcelList;
    }

    function GetHeaderList(HeaderList) {
        var tblheader = [];
        $.each(HeaderList, function (index, val) {
            if (index < HeaderList.length - 1) {
                var thtext = val.replace('"', '').replace('"', '')
                tblheader.push(
                    { "HeaderText": thtext, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                )
            }
        });
        return tblheader;
    }

    $scope.ShowALL = function () {
        $scope.ProgressValue = 0;
        $scope.FilteredExcelList = [];
        $scope.FilteredExcelList = $filter('filter')($scope.StockExcelList);
    }
    $scope.ShowCorrerct = function () {
        $scope.ProgressValue = 0;
        $scope.FilteredExcelList = [];
        $scope.FilteredExcelList = $filter('filter')($scope.StockExcelList, { color: "" }, true);
    }
    $scope.ShowRed = function () {
        $scope.ProgressValue = 0;
        $scope.FilteredExcelList = [];
        $scope.FilteredExcelList = $filter('filter')($scope.StockExcelList, { color: "#e97b51" }, true);
    }
    $scope.ShowUnmatched = function () {
        $scope.ProgressValue = 0;
        $scope.FilteredExcelList = [];
        $scope.FilteredExcelList = $filter('filter')($scope.StockExcelList, { color: "#e5bccd" }, true);
    }

    $scope.GetErrorList = function (ErrorSrNo) {
        for (var j = 0; j < ErrorSrNo.Table.length; j++) {
            if (ErrorSrNo.Table[j].UnmatchedType == "Author" && $scope.AuthorFlag == false) {
                $scope.UnmatchedList.push("Author");
                $scope.AuthorFlag = true;
            }
            if (ErrorSrNo.Table[j].UnmatchedType == 'Publisher' && $scope.PublisherFlag == false) {
                $scope.UnmatchedList.push("Publisher");
                $scope.PublisherFlag = true;
            }
            if (ErrorSrNo.Table[j].UnmatchedType == 'Book' && $scope.BookFlag == false) {
                $scope.UnmatchedList.push("Book");
                $scope.BookFlag = true;
            }
            if (ErrorSrNo.Table[j].UnmatchedType == 'Group' && $scope.GroupFlag == false) {
                $scope.UnmatchedList.push("Group");
                $scope.GroupFlag = true;
            }
            if (ErrorSrNo.Table[j].UnmatchedType == 'Subject' && $scope.SubjectFlag == false) {
                $scope.UnmatchedList.push("Subject");
                $scope.SubjectFlag = true;
            }
            if (ErrorSrNo.Table[j].UnmatchedType == 'Almirah' && $scope.AlmirahFlag == false) {
                $scope.UnmatchedList.push("Almirah");
                $scope.AlmirahFlag = true;
            }
            if (ErrorSrNo.Table[j].UnmatchedType == 'Rack' && $scope.RackFlag == false) {
                $scope.UnmatchedList.push("Rack");
                $scope.RackFlag = true;
            }
            if (ErrorSrNo.Table[j].UnmatchedType == 'Bin' && $scope.BinFlag == false) {
                $scope.UnmatchedList.push("Bin");
                $scope.BinFlag = true;
            }
            if (ErrorSrNo.Table[j].UnmatchedType == 'Edition' && $scope.EditionFlag == false) {
                $scope.UnmatchedList.push("Edition");
                $scope.EditionFlag = true;
            }
            
            $scope.DuplicateRecordSerials.push({
                SrNo: ErrorSrNo.Table[j].SrNo,
                FlagVal: ErrorSrNo.Table[j].UnmatchedType == "Accession" ? 0 : 1
            });
        }
    }

    function SlicedData(ExcelListData) {
        $scope.start = 0;
        $scope.increment = 100;
        $scope.ExportData = [];
        //$scope.StockExcelList = $filter('filter')($scope.StockExcelList, { 'color': '' }, true);
        if (ExcelListData.length > 0) {
            $scope.end = Math.floor(ExcelListData.length / $scope.increment);
            $scope.end = $scope.end + ((ExcelListData.length % $scope.increment) != 0 ? 1 : 0);

            for (var j = $scope.start; j < $scope.end; j++) {
                $scope.obj = {};
                $scope.obj[j] = [];
                $scope.ExportData.push($scope.obj)
            };
            $scope.incrementStart = 0;
            $scope.incrementEnd = $scope.increment;

            for (var i = 0; i < $scope.ExportData.length; i++) {
                $scope.NestedArray = [];
                for (var j = $scope.incrementStart; j < $scope.incrementEnd; j++) {
                    if (ExcelListData[j] != null) {
                        $scope.NestedArray.push(ExcelListData[j]);
                    }
                }
                $scope.ExportData[i] = $scope.NestedArray;
                $scope.incrementStart = $scope.incrementEnd;
                $scope.incrementEnd = $scope.incrementEnd + $scope.increment;
            };
        }
        else {
            showMsgBox('999', '', 'Please Choose File...', 'warning', 'btn-warning');
        }
    }

    $scope.ProgressValue = 0;
    $scope.CheckExcelRecords = async function () {
        $scope.Message2 = "";
        $scope.ProgressValue = 0;
        $scope.updateCounter1 = 0;
        SlicedData($scope.StockExcelList);
        $scope.count1 = 1;
        $scope.DuplicateRecordSerials = [];
        $scope.ExportData1 = $scope.ExportData;
        $scope.Upto = Math.floor($scope.ExportData1.length / $scope.increment);
        $scope.Upto = $scope.end + (($scope.ExportData1.length % $scope.increment) != 0 ? 1 : 0);
        for (var i = 0; i < $scope.Upto; i++) {
            var flag = await $scope.CheckExcelData(i).then(
                function (res) {
                    if (res) {
                        $scope.count1 += 1;
                        $scope.ProgressBarValue1 = ($scope.count1 * 100) / $scope.Upto;
                        $scope.ProgressValue = parseInt($scope.ProgressBarValue1);
                        $scope.ValidateExcelData();
                    }
                    return res;
                });
            if (!flag)
                break;
        }
    }
    $scope.UploadExcelRecords = async function () {
        $scope.ProgressValue = 0;
        $scope.updateCounter = 0;
        $scope.start = 0;
        $scope.increment = 100;
        $scope.ExportData = [];
        
        SlicedData($scope.FilteredExcelList);
        $scope.count = 1;
        for (var i = 0; i < $scope.ExportData.length; i++) {
            var flag = await $scope.UploadExcelData(i).then(
                function (res) {
                    if (res) {
                        $scope.count += 1;
                        $scope.ProgressBarValue = ($scope.count * 100) / $scope.ExportData.length;
                        $scope.ProgressValue = parseInt($scope.ProgressBarValue);
                        if ($scope.ProgressValue >= 100) {
                            showMsgBox('999', '', 'Data Uploaded successfully.', 'success', 'btn-success');
                        }

                    }
                    return res;
                });
            if (!flag)
                break;
        }
    };

    $scope.UploadExcelData = async function (index) {
        var existsData = ($filter('filter')($scope.FilteredExcelList, { color: "#e97b51" }, true)).length;
        var unmatchedData = ($filter('filter')($scope.FilteredExcelList, { color: "#e5bccd" }, true)).length;
        if (existsData + unmatchedData == 0) {
            var collectionobj = {};
            collectionobj.Action = 9;
            collectionobj.BookMasterExcelData = JSON.stringify($scope.ExportData[index]);
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.V_Date = moment($scope.VDate, 'DD-MM-YYYY');
            collectionobj.BillDate = moment($scope.BillDateM, 'DD-MM-YYYY');
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = JSON.parse(userid);
            collectionobj.UpdatedBy = JSON.parse(userid);
            var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBookStockOpening", collectionobj);
            return getData.then(function (response) {
                if (response.data.replace(/"/g, "") == "1") {
                    return true;
                }
                else {
                    showMsgBox(response.data)
                    return false;
                }
            });
        }
        else {
            showMsgBox("Please select Correct Data..")
            return false;
        }        
    }

    $scope.CheckExcelData = async function (index) {
        var collectionobj = {};
        collectionobj.Action = 10;
        collectionobj.BookMasterExcelData = JSON.stringify($scope.ExportData1[index]);
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.CreatedBy = JSON.parse(userid);
        collectionobj.UpdatedBy = JSON.parse(userid);
        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetBookStockListOpening", collectionobj);
        return getData.then(function (response) {
            if (response.data.Table[0].SrNo != undefined) {
                $scope.GetErrorList(response.data);
                return true;
            }
            else {
                return true;
            }
        });
    }
}