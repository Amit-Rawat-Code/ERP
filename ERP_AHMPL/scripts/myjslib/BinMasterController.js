app.BinMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtName');

    $scope.DuplicateRecordSerials = [];
    $scope.FilteredExcelList = [];
    $scope.StockExcelList = [];
    $scope.StockExcelBookList = [];
    $scope.StockDataExcel = [];
    $scope.AlmirahFlag = false;
    $scope.RackFlag = false;
    $scope.UnmatchedList = [];
    $scope.Message = "";
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
    /* Refresh Table on Model Selection */
    //$scope.$watch('[RackCode,BinStartFrom,BinEndFrom,Prefix,Counter]', function () {
    //    //debugger;
    //    $scope.binmasterlist = [];
    //});

    $scope.GetAlmeraList = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/LibraryMasterApi/GetAlmeraList", collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.Almeralist = response.data;
        });
    };
    $scope.GetRackLibList = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/LibraryMasterApi/GetRackMasterList", collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.RacklibList = response.data;
        });
    };

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.AlmeraCode = $scope.AlmeraCode;
            collectionobj.RackCode = $scope.RackCode;
            collectionobj.BinStart = $scope.BinStartFrom;
            collectionobj.BinEnd = $scope.BinEndFrom;
            collectionobj.Prefix = $scope.Prefix;
            collectionobj.Counter = $scope.Counter;
            collectionobj.binmasterlist = $scope.binmasterlist;
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

            var getData = myService.methode('POST', "../Api/LibraryMasterApi/InsertUpdateDeleteBinMaster", collectionobj);
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
        $scope.hfId = "";
        $scope.AlmeraCode = "";
        $scope.RackCode = "";
        $scope.BinStartFrom = "";
        $scope.BinEndFrom = "";
        $scope.Prefix = "";
        $scope.Counter = "";
        $scope.binmasterlist = [];
        $scope.SetFocus('#txtName');
        $scope.BinList = [];
        $scope.StockExcelList = [];
        $scope.FilteredExcelList = [];
        $scope.DuplicateRecordSerials = [];
        $scope.ProgressBarValue = 0;
        $scope.ProgressValue = 0;
        $scope.Message = "";
        $scope.AlmirahFlag = false;
        $scope.RackFlag = false;
        $scope.UnmatchedList = [];
        document.getElementById('fileUpload').value = "";
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.BinList = [];

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
        var getData = myService.methode('POST', "../Api/LibraryMasterApi/GetBinMasterList", collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "AlmeraCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Almera", "Value": "AlmeraCode", "HeaderValue": "AlmeraName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Rack", "Value": "RackCode", "HeaderValue": "RackName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Bin Start Form", "HeaderValue": "BinStart", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Bin End Form", "HeaderValue": "BinEnd", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Prefix", "HeaderValue": "Prefix", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Counter", "HeaderValue": "Counter", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            $scope.BinList = response.data;

            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                //debugger;                
                $scope.AlmeraCode = $(FindHtml(row[1])).val();
                $scope.RackCode = $(FindHtml(row[2])).val();
                $scope.BinList = $filter('filter')($scope.BinList, { 'AlmeraCode': $scope.AlmeraCode, 'RackCode': $scope.RackCode });
                $scope.BinStartFrom = row[3];
                $scope.BinEndFrom = row[4];
                $scope.Prefix = row[5];
                $scope.Counter = row[6];

                var collectionobj = {};
                collectionobj.Action = 7;
                collectionobj.Code = $scope.hfId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.AlmeraCode = $scope.AlmeraCode;
                collectionobj.RackCode = $scope.RackCode;
                //debugger;
                var getData = myService.methode('POST', "../Api/LibraryMasterApi/GetBinMasterList", collectionobj);
                getData.then(function (response) {
                    $scope.binmasterlist = response.data;
                });

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtName', true);
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
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.Code = $scope.hfId;
        collectionobj.UpdatedBy = JSON.parse(userid);

        var getData = myService.methode('POST', "../Api/LibraryMasterApi/InsertUpdateDeleteBinMaster", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ResetControl();
                $scope.hideLoader();
            };
        });
    };

    /*Refresh Search Table Record*/
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
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Almera", "HeaderValue": "AlmeraName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Rack", "HeaderValue": "RackName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Bin Start Form", "HeaderValue": "BinStart", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Bin End Form", "HeaderValue": "BinEnd", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Prefix", "HeaderValue": "Prefix", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Counter", "HeaderValue": "Counter", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
            ];
        $scope.PrintMaster(tblheader, $scope.BinList, window.document.title);
    };

    /* Get Regular Exam*/
    $scope.Binlist = function () {
        //debugger;
        if ($scope.BinStartFrom == "")
            return;
        if ($scope.BinEndFrom == "")
            return;

        if ($scope.BinEndFrom < $scope.BinStartFrom) {
            showMsgBox('Bin End  Form value must be greater than Bin Start Form value');
            return;
        }
        else {
            var collectionobj = {};
            collectionobj.Action = 6;
            collectionobj.AlmeraCode = $scope.AlmeraCode;
            collectionobj.RackCode = $scope.RackCode;
            collectionobj.BinStart = $scope.BinStartFrom;
            collectionobj.BinEnd = $scope.BinEndFrom;
            collectionobj.Prefix = $scope.Prefix;
            collectionobj.Counter = $scope.Counter;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            var getData = myService.methode('POST', '../Api/LibraryMasterApi/BindBinList', collectionobj);
            getData.then(function (response) {
                if (response.data.length > 0) {
                    //$scope.binmasterlist = [];
                    $scope.binmasterlist = response.data;
                }
            });
        }
    };

    $scope.loadFile = function (files) {
        //debugger
        $scope.$apply(function () {
            //debugger
            $scope.selectedFile = files[0];
            var file = $scope.selectedFile;
            if (file) {
                var reader = new FileReader();
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
                reader.readAsBinaryString(file);
            }
        })
    }

    $scope.result = [];    
    $scope.ShowExcelRecords = function () {
        $scope.StockExcelList = [];
        $scope.showLoader();
        $scope.totalDisplayed = 500;
        $scope.StockExcelList = [];
        $scope.IsExcelDataOk = true;
        $scope.TrimWhiteSpaces($scope.StockDataExcel);
        $scope.GetNewArray();
        $scope.StockExcelBookList = $scope.result;
        $.each($scope.StockExcelBookList, function (index, value) {
            $scope.StockExcelList.push({
                SrNo: (index + 1),
                Almirah: value.Almirah,
                Rack: value.Rack,
                Bin: value.Bin,
                color: ''
            });
        })
        $scope.CheckExcelRecords();
        $scope.hideLoader();
        $scope.$applyAsync();
    }
    $scope.GetNewArray = function () {
        $scope.IsExcelDataOk = true;
        angular.forEach($scope.StockExcelBookList, function (objStockDetailsList) {
            var cnt = 0;
            var StockDataExcelUD = objStockDetailsList.Almirah + '_' + objStockDetailsList.Rack + '_' + objStockDetailsList.Bin + '_' + objStockDetailsList.Prefix + '_' + objStockDetailsList.Counter + '_' + objStockDetailsList.NoOfBinPerRack;
            if ($scope.result.length > 0) {
                angular.forEach($scope.result, function (objresult) {
                    var objresultUD = objresult.Almirah + '_' + objresult.Rack + '_' + objresult.Bin + '_' + objresult.Prefix + '_' + objresult.Counter + '_' + objresult.NoOfBinPerRack;
                    if (StockDataExcelUD.toLowerCase() == objresultUD.toLowerCase()) {
                        cnt++;
                    }
                })
            }
            if (cnt == 0) {
                var Almirah = objStockDetailsList.Almirah;
                var Rack = objStockDetailsList.Rack;
                var Bin = objStockDetailsList.Bin;
                var Prefix = objStockDetailsList.Prefix;
                var Counter = objStockDetailsList.Counter;
                var NoOfBinPerRack = objStockDetailsList.NoOfBinPerRack;
                $scope.result.push({
                    Almirah: Almirah,
                    Rack: Rack,
                    Bin: Bin,
                    Prefix: Prefix,
                    Counter: Counter,
                    NoOfBinPerRack: NoOfBinPerRack
                });
            }
        })
        $scope.$applyAsync();
    };    
    //$scope.UploadExcelRecords = function () {
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
    //        var getData = myService.methode('POST', "../Api/LibraryMasterApi/InsertUpdateDeleteBinMaster", collectionobj);
    //        getData.then(function (response) {
    //            //debugger
    //            if (showMsgBox(response.data)) {
    //                $scope.ClearControl(1);
    //            }
    //        });
    //    }
    //    else {
    //        showMsgBox('999', '', 'Please Choose File...', 'warning', 'btn-warning');
    //    }
    //};
    $scope.TrimWhiteSpaces = function (objectData) {
        $.each(objectData, function (index, value) {
            $scope.StockExcelBookList.push({
                Almirah: value.Almirah == undefined ? '' : value.Almirah.trim(),
                Rack: value.Rack == undefined ? '' : value.Rack.trim(),
                Bin: value.Bin == undefined ? '' : value.Bin.trim(),
                Prefix: value.Prefix == undefined ? '' : value.Prefix.trim(),
                Counter: value.Counter == undefined ? '' : value.Counter.trim(),
                NoOfBinPerRack: value.NoOfBinPerRack == undefined ? '' : value.NoOfBinPerRack.trim(),
            });
        })
    }

    $scope.ProgressValue = 0;
    $scope.CheckExcelRecords = async function () {
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
                        if ($scope.updateCounter1 > 0) {
                            if ($scope.ProgressValue >= 100) {
                                $scope.ValidateExcelData();
                            }
                        }
                    }
                    return res;
                });
            if (!flag)
                break;
        }
        //$scope.scrollToBottom        
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
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = JSON.parse(userid);
            collectionobj.UpdatedBy = JSON.parse(userid);
            var getData = myService.methode('POST', "../Api/LibraryMasterApi/InsertUpdateDeleteBinMaster", collectionobj);
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
        var getData = myService.methode('POST', "../Api/LibraryMasterApi/GetBinMasterList", collectionobj);
        return getData.then(function (response) {
            if ((index + 1) == $scope.ExportData1.length) {
                $scope.updateCounter1 = 1;
            }
            $scope.field = [];
            $scope.field = Object.keys(response.data[0]);
            if (response.data[0].SrNo != undefined) {
                $scope.GetErrorList(response.data);
                return true;
            }
            else {
                return true;
            }
        });
    }

    $scope.ValidateExcelData = function () {
        $scope.FilteredExcelList = [];
        var n = $scope.DuplicateRecordSerials;
        $.each($scope.DuplicateRecordSerials, function (index, value) {
            if (value.FlagVal == 0) {
                $scope.StockExcelList[value.SrNo - 1].color = '#e97b51';
            }
            if (value.FlagVal == 1) {
                $scope.StockExcelList[value.SrNo - 1].color = '#e5bccd';
            }
        });
        if ($scope.UnmatchedList.length > 1) {
            $scope.Message2 = $scope.UnmatchedList.join(",");
        }
        else {
            $scope.Message2 = $scope.UnmatchedList.join("");;
        }
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

        for (var j = 0; j < ErrorSrNo.length; j++) {
            if (ErrorSrNo[j].UnmatchedType == 'Almirah' && $scope.AlmirahFlag == true) {
                $scope.UnmatchedList.push("Almirah");
                $scope.AlmirahFlag = true;
            }                
            if (ErrorSrNo[j].UnmatchedType == 'Rack' && $scope.RackFlag == true) {
                $scope.UnmatchedList.push("Rack");
                $scope.RackFlag = true;
            }
            $scope.DuplicateRecordSerials.push({
                SrNo: ErrorSrNo[j].SrNo,
                FlagVal: ErrorSrNo[j].UnmatchedType == "Bin" ? 0 : 1
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

}