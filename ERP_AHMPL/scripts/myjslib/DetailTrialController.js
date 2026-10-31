app.DetailTrialController = function ($scope, $element, $filter, myService) {
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
            if ($scope.TransMode == 1) {
                $scope.changeLedgerAccount();

            }
            else {
                $scope.changeGroupAccount();
            }

        }
        else {
            $.each($scope.chk, function (index, val) {
                $scope.chk[index] = true
            });

            if ($scope.TransMode == 1) {
                $scope.changeLedgerAccount();

            }
            else {
                $scope.changeGroupAccount();
            }

        }
    }
    $scope.BindGroupAccount = function () {
        $scope.ChkAll = true;
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
        debugger;
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
                $scope.ChkAll = true;
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
        if ($('#hdngetstu') != "") {
            var SelectdCodeList = [];
            var stringSplit = $('#hdngetstu').text().split(',');
            if (stringSplit == " ") {
                stringSplit = "0";
            }
            for (var i = 0; i < stringSplit.length; i++) {
                SelectdCodeList.push(stringSplit[i]);
            }


            if ($scope.OpeningMode == undefined) {
                $scope.OpeningMode = "1"
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
            collectionobj.Action = 3;
            var getData = myService.methode('POST', "../Api/AccountReportApi/GetTrialReport", collectionobj);
            getData.then(function (response)
            {

                var ColSpan = "2";
                messagevalues = [
                        { "FromDate": moment($scope.FromDate).format('DD-MMM-YYYY') },
                        { "ToDate": moment($scope.ToDate).format('DD-MMM-YYYY') },
                        { "OpeningMode": $scope.OpeningMode == "1" ? 'With Opening' : $scope.OpeningMode == "2" ? 'Only Opening' : $scope.OpeningMode == "3" ? 'Without Opening' : '' },

                ];

                var tblheader =
                [
                    { "HeaderText": 'Srno', "HeaderValue": "Id", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "ColumnText": "No", "CreateCol": "No" }
                ];


                $.each(response.data[0], function (key, val) {
                    if (key != 'Subcode') {
                        if (key == 'GroupName')
                            tblheader.push({ "HeaderText": 'Group Name', "HeaderValue": key, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "ColumnText": "No", "CreateCol": "Yes" })
                        else if (key == 'Name')
                            tblheader.push({ "HeaderText": key, "Value": "Subcode", "HeaderValue": key, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "ColumnText": "No", "CreateCol": "Yes", "FooterText": "Total" })
                        else if (key == 'ColSpan')
                            tblheader.push({ "HeaderText": key, "HeaderValue": key, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "ColumnText": "No", "CreateCol": "No" })
                        else
                            tblheader.push({ "HeaderText": key, "HeaderValue": key, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "ColumnText": "Yes", "CreateCol": "Yes", "Fun": "Sum", "CssClass": "text-right" })
                    }
                });

                var tblheader2 =
                [
                    { "HeaderText": "SrNo", "HeaderValue": "Id", "Width": "100%", "ColSpan": "1", "RowSpan": "2", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Group Name", "HeaderValue": "GroupName", "Width": "100%", "ColSpan": "1", "RowSpan": "2", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Name", "Value": "SubCode", "ColSpan": "1", "RowSpan": "2", "TextAlign": "left" },
                    { "HeaderText": "<------Opening------>", "ColSpan": ColSpan, "RowSpan": "1", "TextAlign": "center", "MatchingText": "Opening", "CssClass": "text-right" },
                    { "HeaderText": "<--Transcation During The Period-->", "ColSpan": ColSpan, "RowSpan": "1", "TextAlign": "center", "MatchingText": "Transaction", "CssClass": "text-right" },
                    {
                        "HeaderText": "<--Closing As on Date-->", "ColSpan": ColSpan, "RowSpan": "1", "TextAlign": "center","CssClass": "text-right",
                        "MatchingText": "Closing"
                    }
                ];

                debugger;
                $scope.loadDataUsingPreDefinedColumn(tblheader, tblheader2, response.data);
                $('#example tbody').on('dblclick', 'tr', function () {
                    var row = $('#example').DataTable().row(this).data();
                    var SubCode = $(FindHtml(row[2])).val();
                    if (SubCode != null && SubCode != '' && SubCode != undefined && SubCode != '/') {
                        $scope.SelectIframoutiframe_with_querystring("/AccountReport/LedgerReport", "?SubCode=" + SubCode + "&FromDate=" + moment($scope.FromDate).format('DD-MMM-YYYY') + "&ToDate=" + moment($scope.ToDate).format('DD-MMM-YYYY') + "&Locked=No", "Ledger Report");
                    }
                });
            });
        }

            $scope.loadDataUsingPreDefinedColumn = function (headerColumn, tblheader2, data, displayOrder) {

                if (displayOrder != null && displayOrder != '') {
                    colOrder = displayOrder;
                }
                $scope.loadDataTablesUsingPreDefinedColumn(headerColumn, tblheader2, data);
            };
            
            $scope.loadDataTablesUsingPreDefinedColumn = function (tblheader, tblheader2, data) {
                if (JSON.stringify(data).length > 2) {
                    var tab = $('<table id="example" class="table compact table-hover  table-bordered nowrap DetailTrial" ></table>');
                    var thead = $('<thead></thead>');
                    var theadrow = $('<tr></tr>');

                    var tfoot = $('<tfoot></tfoot>');
                    var tfootrow = $('<tr></tr>');

                    var ll = tblheader2.length;
                    for (var i = 0; i < ll; i++) {
                        var val = tblheader2[i]
                        var headertext = val.HeaderText;
                        theadrow.append('<th colspan=' + val.ColSpan + ' rowspan=' + val.RowSpan + ' style="text-align: ' + val.TextAlign + ';">' + headertext + '</th>');
                    }

                    thead.append(theadrow);

                    theadrow = $('<tr></tr>');
                    var l = tblheader.length;
                    for (var i = 0; i < l; i++) {
                        var val = tblheader[i]
                        var headertext = "Sr.No.";
                        if (val.HeaderText != "Id") {
                            headertext = val.HeaderText;
                        }

                        if (val.ShowColumn == "Yes") {
                            if ($('#anchor label').text() != '') {
                                if ($('#anchor label').text().indexOf(headertext) == -1) {
                                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label> </div>');
                                }
                            }
                            else {
                                $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label></div>');
                            }

                        }
                        else {
                            if ($('#anchor label').text().indexOf(headertext) == -1) {
                                $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + '><label class="">' + headertext + '</label></div>');
                            }
                        }
                        if (val.ColumnText == 'Yes' || val.ColumnText == 'undefined' || val.ColumnText == null) {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                theadrow.append('<th>' + headertext.replace('Opening', "").replace('Transaction', "").replace('Closing', "") + '</th>');
                            else
                                theadrow.append('<th class=' + val.CssClass + '>' + headertext.replace('Opening', "").replace('Transaction', "").replace('Closing', "") + '</th>');

                        }
                        if (val.CreateCol == 'Yes' || val.CreateCol == 'undefined' || val.CreateCol == null)
                            tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + headertext + '" /></th>');
                    }

                    thead.append(theadrow);

                    tab.append(thead);
                    var tbody = $('<tbody></tbody>');
                    var sumList = [];
                    $.each(data, function (i, obj) {
                        var trow = $('<tr></tr>');
                        $.each(tblheader, function (j, val) {
                            var key = val.HeaderValue;

                            var value = obj[key];

                            if (value == 'undefined' || value == null) { value = "" }
                            if (key == "Id" || key == "#") {
                                if (obj[val.Value] == 'undefined' || obj[val.Value] == null)
                                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '</td>');
                                else
                                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + obj[val.Value] + ' /></td>');
                            }
                            else {
                                if (val.ImageColumn == "Yes") {
                                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                                }
                                else if (val.tooltip == "Yes") {
                                    if (obj[val.Value] == 'undefined' || obj[val.Value] == null) {
                                        if (val.CssClass == 'undefined' || val.CssClass == null)
                                            trow.append('<td  ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                                        else
                                            trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                                    }
                                    else {

                                        if (val.CssClass == 'undefined' || val.CssClass == null)
                                            trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                                        else
                                            trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span class="spnDetails">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</span><input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /><span class="spnTooltip">' + obj[val.tooltipvalue] + '</span></td>');
                                    }
                                }
                                else {
                                    if (val.CreateCol == 'Yes' || val.CreateCol == 'undefined' || val.CreateCol == null)
                                        if (obj[val.Value] == 'undefined' || obj[val.Value] == null)
                                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                                trow.append('<td>' + value + '</td>');
                                            else
                                                trow.append('<td class=' + val.CssClass + '>' + value + '</td>');
                                        else
                                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                                trow.append('<td>' + value + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + obj[val.Value] + ' /></td>');
                                            else
                                                trow.append('<td class=' + val.CssClass + '>' + value + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + obj[val.Value] + ' /></td>');
                                }
                            }
                            if (key != 'ColSpan')
                            if (sumList[j] == "" || sumList[j] == 'undefined' || sumList[j] == null)
                                sumList[j] = 0;
                            if (val.Fun == 'undefined' || val.Fun == null) {
                                if (val.FooterText == 'undefined' || val.FooterText == null) {
                                    sumList[j] = "";
                                }
                                else {
                                    sumList[j] = val.FooterText;
                                }
                            }
                            else {
                                addfunfoot = 1;
                                value = value.replace(/,/g, "");
                                sumList[j] = Number(sumList[j]) + (isNaN(value) ? 0 : Number(value));
                               
                            }
                        });
                        tbody.append(trow);
                    });

                    tab.append(tbody);

                    if (addfunfoot == 1) {
                        var ftrow = $('<tr class="print"></tr>');
                        $.each(sumList, function (index, value) {
                            var footval = (value == '0' ? '-' : ((isNaN(value) || value == "") ? value : Number(value).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 })));

                            ftrow.append('<th   class="text-right">' + footval + '</th>');
                        });
                        //tfoot.append(tfootrow);
                        tfoot.addClass("print")
                        tfoot.append(ftrow);

                        tab.append(tfoot);
                    }
                    else {
                        tfoot.append(tfootrow);
                        tab.append(tfoot);
                    }
                    //tfoot.append(tfootrow);
                    //tab.append(tfoot);

                    $("#UpdatePanel").html(tab);

                    var hideColumn = [];
                    var m = $('#anchor input[type="checkbox"]');
                    for (var i = 0; i < m.length; i++) {
                        if (!$(m[i]).prop('checked')) {
                            hideColumn.push(i);
                        }
                    }


                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.append("datatable('" + hideColumn + "')");

                    $("#UpdatePanel").append(script);


                }
                else {
                    var tab = $('<table id="example" class="table compact table-hover  table-bordered nowrap DetailTrial" ></table>');
                    var thead = $('<thead></thead>');
                    var theadrow = $('<tr></tr>');

                    var l = tblheader.length;
                    for (var i = 0; i < l; i++) {
                        var val = tblheader[i]
                        var headertext = "Sr.No.";
                        if (val.HeaderText != "Id") {
                            headertext = val.HeaderText;
                        }
                        if (val.ShowColumn == "Yes") {
                            if ($('#anchor label').text() != '') {
                                if ($('#anchor label').text().indexOf(headertext) == -1) {
                                    $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label> </div>');
                                }
                            }
                            else {
                                $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + ' checked><label class="">' + headertext + '</label></div>');
                            }

                        }
                        else {
                            if ($('#anchor label').text().indexOf(headertext) == -1) {
                                $("#anchor").append('<div class="checkbox checkbox-success check-box"><input type="checkbox" class="toggle-vis" data-column=' + i + '><label class="">' + headertext + '</label></div>');
                            }
                        }
                        if (val.CssClass == 'undefined' || val.CssClass == null)
                            // Append header here
                            theadrow.append('<th>' + headertext + '</th>');
                        else
                            theadrow.append('<th class=' + val.CssClass + '>' + headertext + '</th>');
                    }

                    thead.append(theadrow);

                    tab.append(thead);


                    var tbody = $('<tbody></tbody>');

                    var trow = $('<tr></tr>');
                    trow.append("<th colspan=" + tblheader.length + " style='text-align: center;'>No Record Found!</th>");
                    tbody.append(trow);

                    tab.append(tbody);
                    $("#UpdatePanel").html(tab);

                }

                angular.element(document).scope().hideLoader();
            };
        }
 
}