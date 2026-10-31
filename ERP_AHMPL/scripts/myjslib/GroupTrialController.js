app.GroupTrialController = function ($scope, $element, $filter, myService) {
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
    var seprator = "";
    var stringbuilder = "";
    $scope.changeGroupAccount = function () {
        debugger;
      
        seprator = ""
        stringbuilder = "";
        var count = 0;
        var chkflag = 0;
        $.each($scope.chk, function (index, val)
        {
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

    $scope.changeLedgerAccount = function () {
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
            if ($scope.TransMode == 1 || $scope.TransMode==undefined) {
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

            if ($scope.TransMode == 1 || $scope.TransMode == undefined) {
                $scope.changeGroupAccount();
            }
            else {            
                $scope.changeLedgerAccount();
            }

        }
    }

 


    $scope.BindGroupAccount = function ()
    {
        $scope.ChkAll = true;
        $scope.Account = "Group";
        $scope.RecGroupAccount = ''
        $scope.RecLedgerAccount = ''
        $scope.chkGroupAccount = true;
        $scope.chkLedgerAccount = false;
       
        var collectionobj = {};
        collectionobj.FYId = fyId;
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
 
        var getData = myService.methode('POST', "../Api/AccountMasterApi/GetLedgerGroup", collectionobj);

        getData.then(function (response) {
            $scope.RecGroupAccount = response.data;
            $scope.RecLedgerAccount = ''
            if (response.data.length > 0)
            {

                $scope.chk = [];
            
                $scope.AllField = response.data;
                var id = response.data;
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
        debugger; $scope.ChkAll = true;
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
            $scope.started();
        }
    };
    $scope.started = function () {
        debugger;
        if ($('#hdngetstu') != "")
        { 
            var SelectdCodeList = [];
            var stringSplit = $('#hdngetstu').text().split(',');
            if (stringSplit == " ") {
                stringSplit = "0";
            }
            for (var i = 0; i < stringSplit.length; i++) {
                SelectdCodeList.push(stringSplit[i]);
            }


            if ($scope.OpeningMode == undefined)
            {
                $scope.OpeningMode="1"
            }
            if ($scope.TransMode == undefined) {
                $scope.TransMode = "1"
            }


            debugger;
            var collectionobj = {}; 
            collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
            collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
            collectionobj.OpeningMode = $scope.OpeningMode;
            collectionobj.TransMode = $scope.TransMode;
            collectionobj.CodeList = SelectdCodeList;
            collectionobj.RelationshipId = relationshipId;
     
            collectionobj.FYId = fyId;
            collectionobj.Action = 1 ;
            var getData = myService.methode('POST', "../Api/AccountReportApi/GetTrialReport", collectionobj);
            getData.then(function (response) {
                
                messagevalues = [
                        { "FromDate": moment($scope.FromDate).format('DD-MMM-YYYY') },
                        { "ToDate": moment($scope.ToDate).format('DD-MMM-YYYY') },
                        { "OpeningMode": $scope.OpeningMode=="1"?'With Opening': $scope.OpeningMode=="2"?'Only Opening':$scope.OpeningMode=="3"?'Without Opening':'' },
                        //{ "View Type": $scope.TransMode == "1" ? 'Group' : 'Ledger Account' },
                       
                ];
                var tblheader =
                    [
                        { "HeaderText": "SrNo", "HeaderValue": "Id", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                        { "HeaderText": "Group Name", "HeaderValue": "GroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Account Head", "Value": "Subcode", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        { "HeaderText": "Debit", "HeaderValue": "Dr", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "NumberType": $scope.Amt },
                        { "HeaderText": "Credit", "HeaderValue": "Cr", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-right", "NumberType": $scope.Amt },


                    ];

                loadDataUsingPreDefinedColumn(tblheader, response.data);
                $('#example tbody').on('dblclick', 'tr', function () {
                    var row = $('#example').DataTable().row(this).data();
                    var SubCode = $(FindHtml(row[2])).val();
                    if (SubCode != null && SubCode != '' && SubCode != undefined && SubCode != '/') {
                        $scope.SelectIframoutiframe_with_querystring("/AccountReport/LedgerReport", "?SubCode=" + SubCode + "&FromDate=" + moment($scope.FromDate).format('DD-MMM-YYYY') + "&ToDate=" + moment($scope.ToDate).format('DD-MMM-YYYY') + "&Locked=No", "Ledger Report");
                    }
                });

            });
        }
        else
        {
            showMsgBox('No record is selected, kindly select atleast one record.');
            return;
        } 
       
    }


}