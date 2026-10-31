app.MultipleLedgerReportController = function ($scope, $element, $filter, myService) {
    $scope.chkGroupAccount = true;
    $scope.chkLedgerAccount = false;
    $scope.studentDetails = {
        ClassId: "",
        SectionId: ""
    }
    $scope.chk = [];
    $("#change").change(function () {
        var status = this.checked;
        $("#select_all")[0].checked = status;
    })
    $scope.changeGroupAccount = function () {
        debugger;
        seprator = ""
        stringbuilder = "";
        var count = 0;
        var chkflag = 0;
        $.each($scope.chk, function (index, val) {
            if (val === true) {
                stringbuilder = stringbuilder + seprator;
                stringbuilder = stringbuilder + $scope.RecGroupAccount[index].GroupCode;
                seprator = ","
                count += 1; 
            }
            else {
                chkflag = 1;
            }
        });
        if (chkflag == 1)
        { $scope.ChkAll = false } else { $scope.ChkAll = true }
        $('#hdngetstu').html(stringbuilder);
        $scope.AllField = 'Total Selection : ' + count
        $scope.$applyAsync();
    }

    $scope.changeLedgerAccount = function () 
    {
        debugger;
        seprator = ""
        stringbuilder = "";
        var count = 0;
        var chkflag = 0;
        $.each($scope.chk, function (index, val) {
            if (val === true) {
                stringbuilder = stringbuilder + seprator;
                stringbuilder = stringbuilder + $scope.RecLedgerAccount[index].SubCode;
                seprator = ","
                count += 1;

            }
            else {
                chkflag = 1;
            }
        });
        if (chkflag == 1)
        { $scope.ChkAll = false } else { $scope.ChkAll = true }
        $('#hdngetstu').html(stringbuilder);
        $scope.AllField = 'Total Selection : ' + count
        $scope.$applyAsync();
    }

    $scope.SelectDeselect = function () {
        debugger;
        if ($scope.ChkAll != true) {
            $('#hdngetstu').html('');
            $.each($scope.chk, function (index, val) {
                $scope.chk[index] = false
            });
            if ($scope.TransMode == 1) {
              
                $scope.changeGroupAccount();
            }
            else {
                $scope.changeLedgerAccount();
            }

        }
        else {
            $.each($scope.chk, function (index, val) {
                $scope.chk[index] = true
            });

            if ($scope.TransMode == 1) {

                $scope.changeGroupAccount();
            }
            else {
                $scope.changeLedgerAccount();
            }

        }
    }
    var id=
    $scope.BindGroupAccount = function () {
        $scope.ChkAll = true;
         $scope.TransMode = '1';
        $scope.Account = "Group";
        $scope.RecGroupAccount = ''
        $scope.RecLedgerAccount = ''
        $scope.chkGroupAccount = true;
        $scope.chkLedgerAccount = false;
        debugger;
        var collectionobj = {};
        collectionobj.FYId = fyId;
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
         
            var getData = myService.methode('POST', "../Api/AccountMasterApi/GetLedgerGroup", collectionobj);

        getData.then(function (response) {
            $scope.RecGroupAccount = response.data;
            $scope.RecLedgerAccount = ''
            if (response.data.length > 0) {

                $scope.chk = [];
             
                $scope.AllField = response.data;
                  id = response.data;
                seprator = "";
                stringbuilder = "";
                $('#hdngetstu').html('');
                var count = 0;
                $.each(id, function (i, val) {
                    if (val.GroupCode != '') {
                        count = count + 1;
                        stringbuilder = stringbuilder + seprator + val.GroupCode;
                        seprator = ",";
                        $scope.AllField = 'Total Selection : ' + count;
                        $scope.chk[i] = true;
                        $('#hdngetstu').html(stringbuilder);
                    }
                });
                if ($('#hdngetstu').html() == '') {
                    $scope.AllField = '';
                    $scope.ChkAll = false;
                }
                $scope.forhideshow = false;
                $scope.$applyAsync();
                $scope.hideLoader();

            }
            else {
                $scope.forhideshow = true;
                $("input:checkbox").prop('checked', false);
                $('#hdngetstu').html('');
            } 
        });

    };
    $scope.BindLedgerAccount = function () {
        debugger;
        $scope.ChkAll = true;
         $scope.TransMode = '2';
        $scope.Account = "Ledger Account";
        $scope.RecGroupAccount = ''
        $scope.RecLedgerAccount = ''
        $scope.chkGroupAccount = false;
        $scope.chkLedgerAccount = true;
        var collectionobj = {};
        collectionobj.FYId = fyId;
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
         
        var getData = myService.methode('POST', "../Api/AccountMasterApi/GetLedger", collectionobj);
        getData.then(function (response) {
            $scope.RecLedgerAccount = response.data;
            $scope.RecGroupAccount = ''
            if (response.data.length > 0) {

                $scope.chk = [];
               
                $scope.AllField = response.data;
                var id = response.data;
                seprator = "";
                stringbuilder = "";
                $('#hdngetstu').html('');
                var count = 0;
                $.each(id, function (i, val) {
                    if (val.SubCode != '') {
                        count = count + 1;
                        stringbuilder = stringbuilder + seprator + val.SubCode;
                        seprator = ",";
                        $scope.AllField = 'Total Selection : ' + count;
                        $scope.chk[i] = true;
                        $('#hdngetstu').html(stringbuilder);
                    }
                });
                if ($('#hdngetstu').html() == '') {
                    $scope.AllField = '';
                    $scope.ChkAll = false;
                }
                $scope.forhideshow = false;
                $scope.$applyAsync();
                $scope.hideLoader();

            }
            else {
                $scope.forhideshow = true;
                $("input:checkbox").prop('checked', false);
                $('#hdngetstu').html('');
            }
        });

    };
    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $(".section-toggle").slideToggle('slow');
            $(".filter-toggle").toggleClass("open");
            $(".filter-toggle").fadeIn();
            
        
            $scope.started();
        }
    };
    $scope.started = function () {
        debugger;
        if ($('#hdngetstu') != "") {
            $scope.showLoader();
            var SelectdCodeList = [];
            var stringSplit = $('#hdngetstu').text().split(',');
            if (stringSplit == " ") {
                stringSplit = "0";
            }
            for (var i = 0; i < stringSplit.length; i++) {
                SelectdCodeList.push(stringSplit[i]);
            } 
            
            var collectionobj = {};
            collectionobj.RelationshipId = relationshipId;
             
            collectionobj.FYId = fyId;
            collectionobj.Action = 7;
            collectionobj.TransMode = $scope.TransMode;
            collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
            collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
            collectionobj.CodeList = SelectdCodeList;
            collectionobj.EntryNarration = $scope.EntryNarration ? '1' : '0';
            collectionobj.VoucherNarration = $scope.VoucherNarration ? '1' : '0';
            var getData = myService.methode('POST', "../Api/AccountReportApi/GetMultipleLedgerReport", collectionobj);
            getData.then(function (response)
            {
                debugger;$('#UpdatePanel').empty();
                var tblheader = '';
                if(response.data.length>0)
                    var MaxFID = response.data[response.data.length-1].FID;
                    var chkFID =0;
                for (var i = 0; i < MaxFID; i++) {
                    
                    chkFID = chkFID + 1;
               
                    debugger;
                   
                    $scope.FilteredData = $filter('filter')(response.data, { 'FID': chkFID });
                    $scope.FilteredData = $filter('filter')($scope.FilteredData, { 'RSubCode': $scope.FilteredData[0].RSubCode });
                        messagevalues =
                        [
                          { "FromDate": moment($scope.FromDate).format('DD-MMM-YYYY') },
                          { "ToDate": moment($scope.ToDate).format('DD-MMM-YYYY') },
                          { "Account Name": $scope.FilteredData[0].Title }
                        ];
                        tblheader =
                       [ 
                          { "HeaderText": "Date", "HeaderValue": "Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                          { "HeaderText": "Voucher Type", "HeaderValue": "V_Type", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                          { "HeaderText": "Number", "HeaderValue": "CvNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                          { "HeaderText": "Particular", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "FooterText": "Total" },
                          { "HeaderText": "Dr", "HeaderValue": "DebitAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "Fun": "Sum", "NumberType": $scope.Amt },
                          { "HeaderText": "Cr", "HeaderValue": "CreditAmt", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "Fun": "Sum", "NumberType": $scope.Amt },
                          { "HeaderText": "Balance", "HeaderValue": "Balance", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "NumberType": $scope.Amt },
                          { "HeaderText": "DR/CR", "HeaderValue": "DRCR", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "NumberType": $scope.Amt },

                       ];
                        loadDataUsingPreDefinedColumnForMulitpleTable(tblheader,'example' + chkFID, $scope.FilteredData, chkFID);
                    
                    } 

                $scope.rptname = 'Multiple Ledger Report';
                $scope.hideLoader();
            });
        }
        else {
            showMsgBox('No record is selected, kindly select atleast one record.');
            return;
        }
    }


}