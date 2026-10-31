app.BankReconciliationController = function ($scope, $element, $filter, myService)
{
    $scope.DownloadExcelFormat = true;
    $scope.sn = true;
    $scope.Date = new Date();    
  

    $scope.GeBanksForExcel = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "13";
        var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetBankReconciliation', collectionobj);
        getData.then(function (response)
        {
            $scope.ExcelBankList = response.data;
        });  
    };


    $scope.GetExcelFormatNo = function (BankCode)
    {
        var collectionobj = {};
        collectionobj.Action = "1";
        if ((BankCode != 'undefined') || (BankCode != ''))
        {
            collectionobj.BankCode = $scope.Bank;
        }
        else
        {
            collectionobj.BankCode = BankCode;
        }
        var getData = myService.methode('POST', '../Api/MasterApi/GetExcelFormatNo', collectionobj);
        getData.then(function (response)
        {
            if (response.data.length > 0)
            {
                $scope.AllExcelFormat = response.data;
            }
        });
    };

    $scope.ShowExcelFormat = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "2";
        collectionobj.BankCode = $scope.Bank;
        collectionobj.ExcelFormatNo = $scope.ExcelFormatNo;
        var getData = myService.methode('POST', '../Api/MasterApi/GetExcelFormatNo', collectionobj);
        getData.then(function (response)
        {
            if (response.data.length > 0)
            {
                $scope.DownloadExcelFormat = false;
                $scope.ExcelFormatPath = response.data[0].ExcelFormatPath;
            }
        });
    };

    $scope.selectedFilesdf = null;
    $scope.loadFile = function (files)
    {
        $scope.$apply(function ()
        {
            $scope.selectedFile = files[0];
            var file = $scope.selectedFile;
            if (file)
            {
                var reader = new FileReader();
                reader.onload = function (e)
                {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, { type: 'binary' });
                    var first_sheet_name = workbook.SheetNames[0];
                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);                     
                    if (dataObjects.length > 0)
                    {
                        $scope.DataExcel = dataObjects;
                        $scope.sn = false; 
                        $scope.disableAdd = true;
                        $scope.UploadExcelRecords($scope.DataExcel);
                        //$('#txtFileUpload').val('');
                    }
                    else
                    {
                        $scope.msg = "Error : Something Wrong !";
                    }
                }
                reader.onerror = function (ex) {

                }

                reader.readAsBinaryString(file);
            }
        })        
    }
    /* Save Button Click Event */
    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            var filterUploadExcelRecordsList = $filter('filter')($scope.UploadExcelRecordsList, { Status: 2 });
            if (filterUploadExcelRecordsList.length > 0) {
                var collectionobj = {};
                collectionobj.TransID = $scope.hfId;
                collectionobj.BankCode = $scope.Bank;
                collectionobj.ExcelFormatNo = $scope.ExcelFormatNo;
                //collectionobj.FromDate = $scope.FromDate;
                //collectionobj.ToDate = $scope.ToDate;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                //collectionobj.Keys = JSON.stringify(Object.keys($scope.DataExcel[0]));
                collectionobj.ExcelData = JSON.stringify($filter('filter')($scope.UploadExcelRecordsList, { Status: 2 }));
                if ($scope.Date != undefined || $scope.Date != null || $scope.Date != '')
                    collectionobj.Date = moment($scope.Date).format('YYYY-MMM-DD');
                $scope.msg = "";
                if ($scope.Save == "Save") {
                    collectionobj.Action = "1";
                    collectionobj.CreatedBy = userid;
                }
                else if ($scope.Save == "Edit") {
                    collectionobj.Action = "4";
                    collectionobj.UpdatedBy = userid;
                    collectionobj.Code = $scope.hfId;
                }
                var getData = myService.methode('POST', '../Api/AccountTransactionApi/InsertUpdateDeleteBankReconciliation', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
            else {
                showMsgBox('No fresh records found for uploading.')
            }
        }
    };
    $scope.VerifyRecords = function ()
    {
        if (isValidate())
        {
            
            var collectionobj = {};
            collectionobj.TransID = $scope.hfId;
            collectionobj.Date = moment($scope.Date).format('YYYY-MMM-DD');
            collectionobj.BankCode = $scope.Bank;
            collectionobj.ExcelFormatNo = $scope.ExcelFormatNo;            
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.Keys = JSON.stringify(Object.keys($scope.DataExcel[0]));
            collectionobj.ExcelData = JSON.stringify($scope.DataExcel);            
            collectionobj.Action = "10";
            collectionobj.CreatedBy = userid;            
            var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetBankReconciliation', collectionobj);
            getData.then(function (response)
            {
                if (response.data[0].Status == '1')
                {
                    showMsgBox(response.data[0].Val)
                    $scope.UploadExcelRecordsList = '';
                    $scope.disableAdd = true;                 
                }
                else
                {
                    $scope.disableAdd = false;
                    showMsgBox('999', 'Verify', 'Record verify Successfully.', 'success', 'btn-success')
                    $scope.UploadExcelRecords(response.data); 
                }
                 
            });
        }
    };

    $scope.UploadExcelRecordsList = [];  
    $scope.UploadExcelRecords = function (DataExcel)
    {
        $scope.UploadExcelRecordsList = DataExcel;
        $scope.$applyAsync();
    };


    $scope.BankExcelMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function ()
    {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function ()
    {

        var collectionobj = {};
        collectionobj.Action = "2";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetBankReconciliation', collectionobj);
        getData.then(function (response)
        {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "SrNo", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },  
                    { "HeaderText": "Bank Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Date", "HeaderValue": "Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "From Date", "HeaderValue": "FromDate", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "To Date", "HeaderValue": "ToDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },                    
                    { "HeaderText": "Excel Format No", "HeaderValue": "ExcelFormatNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            $scope.BankExcelMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                $scope.sn = false;
                $scope.btnVerify = true;
                $scope.disableAdd = true;
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.BankExcelMasterList = $filter('filter')($scope.BankExcelMasterList, { 'TransID': $scope.hfId }, true);  
                //$scope.FromDate = new Date($scope.BankExcelMasterList[0].FromDates);
                //$scope.ToDate = new Date($scope.BankExcelMasterList[0].ToDates);
                $scope.Date = new Date($scope.BankExcelMasterList[0].Dates);
                $scope.Bank = $scope.BankExcelMasterList[0].BankCode;
                $scope.GetExcelFormatNo($scope.Bank);                
                $scope.ExcelFormatNo = $scope.BankExcelMasterList[0].ExcelFormatNo.toString();
                var collectionobj = {};
                collectionobj.Action = "3";   
                collectionobj.TransID = $scope.hfId; 
                collectionobj.ExcelFormatNo = $scope.BankExcelMasterList[0].ExcelFormatNo; 
                collectionobj.BankCode = $scope.BankExcelMasterList[0].BankCode; 
                var getData = myService.methode('POST', '../Api/AccountTransactionApi/GetBankReconciliation', collectionobj);
                getData.then(function (response)
                {
                    $scope.UploadExcelRecordsList = response.data;
                    $scope.$applyAsync();  
                    angular.forEach($scope.UploadExcelRecordsList, function (obj)
                    {
                        if (obj.IsAdminReconcile == true)
                        {
                            $scope.disableDelete = true;
                            $scope.disableDate = true;
                            $scope.disableBank = true;
                            $scope.disableExcelFormatNo = true;
                            $scope.disableFromDate = true;
                            $scope.disableToDate = true;
                            $scope.disablefileUpload = true;
                        }                        
                    });                                
                });
             
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtShiftName', true);
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function ()
    {
        debugger
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.TransID = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.CreatedBy = userid;
        collectionobj.BankCode = $scope.Bank;
        collectionobj.ExcelFormatNo = $scope.ExcelFormatNo;

        var getData = myService.methode('POST', '../Api/AccountTransactionApi/InsertUpdateDeleteBankReconciliation', collectionobj);
        getData.then(function (response)
        {
            if (showMsgBox(response.data))
            {
                $scope.ClearControl(1);
            }
        });
    };

    $scope.ClearControl = function (flag)
    {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };
    $scope.ResetControl = function (flag)
    {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.Date = new Date();
        $scope.Bank = "";
        $scope.ExcelFormatNo = "";
        $scope.btnVerify = false;
        $scope.sn = true;
        //$scope.FromDate = "";
        //$scope.ToDate = "";   
        $scope.fileUpload = ""; 
        $scope.UploadExcelRecordsList = ""; 
        $scope.$applyAsync();
       
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
                { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "SrNo", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Bank Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Date", "HeaderValue": "Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                //{ "HeaderText": "From Date", "HeaderValue": "FromDate", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No" },
                //{ "HeaderText": "To Date", "HeaderValue": "ToDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Excel Format No", "HeaderValue": "ExcelFormatNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.ShiftMasterList, window.document.title);
    };
}