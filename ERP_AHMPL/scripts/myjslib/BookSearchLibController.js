app.BookSearchLibController = function ($scope, $element, $filter, myService) {

    $scope.SetFocus('#txtBookName');
    $scope.BookSearchList = [];
    $scope.IssueBookList = [];
    $scope.IssueBookDetailList = [];
    $scope.IsHidden = false;
    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {
        debugger;
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.VoucherM = "";
        $scope.GetVoucherType("BNDIS");
        $scope.GetVoucherNoLibList(4);
        $scope.VDate = "";
        $scope.VDate = new Date();
        $scope.hfId = "";
        $scope.GetIssueNo();
        $scope.hfStudentId = "";
        $scope.BinderName = "";
        $scope.AddressM = "";
        $scope.IssueNoM = "";
        $scope.BD = [];
        $scope.bindingtype = [];
        $scope.SetFocus('#ddlIssueNo');
        $scope.$applyAsync();
        $scope.BindingIssueEntryList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    };


    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#CollapseSearchTableList').fadeIn();
        $scope.started();
    };

    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 1;
        collectionobj.BOBookName = $scope.BookNameM;
        collectionobj.BSEdition = $scope.EditionM;
        collectionobj.BSPublisherYear = $scope.PublisherYearM;
        collectionobj.BAName = $scope.BookAccessoriesM;
        collectionobj.AUName = $scope.AuthorM;
        collectionobj.PMName = $scope.PublisherM;
        collectionobj.AMName = $scope.AlmeraM;
        collectionobj.RMName = $scope.RackM;
        collectionobj.BMBin = $scope.BinM;
        collectionobj.AccessionID = $scope.AccessionIDM;
        collectionobj.BSISBN = $scope.ISBNM;
        collectionobj.BSDDC = $scope.DDCM;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        //debugger;
        var getData = myService.methode('POST', "../Api/LibraryReportApi/GetBookSearchList",collectionobj);
        getData.then(function (response) {
            var tblheader = [];

            $scope.dynamicHeader = Object.keys(response.data.length > 0?response.data[0]:'');
            $.each($scope.dynamicHeader, function (index, val) {
                tblheader.push({ "HeaderText": val, "HeaderValue": val, "Width": "100%", "ShowColumn": val == "CssClass" ? "No" : "Yes", "ImageColumn": "No", "CssClass": "CssClass" })
            });
            //debugger
            loadDataUsingDynamicColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                //debugger
                var row = $('#example').DataTable().row(this).data();
                var AccessionID = row[11];
                var rowStyle = row[16];
                if (rowStyle != "row3") {
                    $scope.BindBookDetails(AccessionID);
                }                
            });
        });
    };

    $scope.IssueBook = function (AccessionID) {

        var collectionobj = {};
        collectionobj.Action = 2;
        collectionobj.AccessionID = AccessionID;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        debugger;
        var getData = myService.methode('POST', "../Api/LibraryReportApi/GetIssueBookList",collectionobj);
        getData.then(function (response) {
            $scope.IssueBookList = response.data;
            $scope.IssueBookDetailList = [];
        });
    };

    $scope.IssueBookDetail = function (AccessionID, IssueNo, SubAction) {

        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.SubAction = SubAction;
        collectionobj.IssueNo = IssueNo;
        collectionobj.AccessionID = AccessionID;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        debugger;
        var getData = myService.methode('POST', "../Api/LibraryReportApi/GetIssueBookDetail",collectionobj);
        getData.then(function (response) {
            $scope.IssueBookDetailList = response.data;
            if (SubAction == 1) {
                $scope.BookIssue = true;
                $scope.BindingIssue = false;
                $scope.WriteOffBook = false;
            }
            else if (SubAction == 2) {
                $scope.BookIssue = false;
                $scope.BindingIssue = true;
                $scope.WriteOffBook = false;
            }
            else if (SubAction == 3) {
                $scope.BookIssue = false;
                $scope.BindingIssue = false;
                $scope.WriteOffBook = true;
            }
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
    $scope.BindBookDetails = function (AccessionID) {
        //debugger
        var modal = document.getElementById("myModal");
        modal.style.display = "block";        
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.AccessionID = AccessionID;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/LibraryReportApi/GetBookSearchList", collectionobj);
        getData.then(function (response) {
            //debugger;
            if (response.data.length > 0) {
                $scope.BindBookDetailList = response.data;
                $('#myModal').modal('show');
            }
        });
    }
    ///*Print Button Click Event*/
    //$scope.PrintRecord = function () {
    //    var tblheader =
    //      [
    //            { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
    //            { "HeaderText": "Issue Date", "Value": "V_Date", "HeaderValue": "V_Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
    //            { "HeaderText": "Issue No", "Value": "PVNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
    //            { "HeaderText": "Binder", "Value": "BinderCode", "HeaderValue": "BinderName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
    //      ];
    //    $scope.PrintMaster(tblheader, $scope.BindingIssueEntryList, window.document.title);
    //};
    function loadDataUsingDynamicColumn(headerColumn, data, displayOrder) {

        if (displayOrder != null && displayOrder != '') {
            colOrder = displayOrder;
        }
        loadDataTablesUsingPreDefinedColumn(headerColumn, data);
        //else {
        //    var tblRows = [];
        //    var rowObj = { "": "Sorry No Record's Found!" };
        //    tblRows.push(rowObj);

        //    loadDataTablesUsingPreDefinedColumn(headerColumn, tblRows);
        //}
    };
    var externalcss = '';
    function loadDataTablesUsingPreDefinedColumn(tblheader, data) {

        if (JSON.stringify(data).length > 2) {
            var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap ' + externalcss + '" ></table>');
            var thead = $('<thead></thead>');
            var theadrow = $('<tr></tr>');

            var tfoot = $('<tfoot></tfoot>');
            var tfootrow = $('<tr></tr>');

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
                    //if (val.HeaderText == "Id") {
                    //    theadrow.append('<th>Sr.No.</th>');
                    //}
                    //else {
                    theadrow.append('<th>' + headertext + '</th>');
                //}

                else
                    theadrow.append('<th class=' + val.CssClass + '>' + headertext + '</th>');
                // Append footerrow here
                tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + headertext + '" /></th>');
            }

            thead.append(theadrow);

            tab.append(thead);
            var tbody = $('<tbody></tbody>');
            var sumList = [];

            $.each(data, function (i, obj) {
                var trow = "";
                $.each(tblheader, function (j, val) {
                    var key = val.HeaderValue;                    
                    var value = obj[key];
                    if (j == 0) {
                        var cc = obj[val.CssClass];
                        trow = $('<tr class=' + cc + '></tr>');
                    }                        
                    if (value == 'undefined' || value == null) { value = "" }
                    if (key == "Id" || key == "#") {                        
                        if (obj[val.Value] == 'undefined' || obj[val.Value] == null)
                            trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '</td>');
                        else
                            trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (i + 1) + '<input type="hidden" id="hdId_' + i + '" name="Id" value=' + obj[val.Value] + ' /></td>');
                    }
                    else {
                        if (val.ImageColumn != 'undefined' && val.ImageColumn != null && val.ImageColumn == "Yes") {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                //trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                                trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="' + val.Width + '"></td>');
                            else
                                //trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                                trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '"></td>');
                        }
                        else if (val.DocumentColumn != 'undefined' && val.DocumentColumn != null && val.DocumentColumn == "Yes") {
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td><a href="../' + ((value == null || value == "") ? '#' : value) + '" download>Download Attachment</a></td>');
                            else
                                trow.append('<td class=' + val.CssClass + '><a href="../' + ((value == null || value == "") ? '#' : value) + '" download>Download Attachment</a></td>');
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
                        else if (val.IdDateType == "Yes") {
                            if (obj[val.Value] == 'undefined' || obj[val.Value] == null) {
                                if (val.CssClass == 'undefined' || val.CssClass == null)
                                    trow.append('<td  ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">' + Number(moment(value).format('YYYYMMDD')) + '</span>' + value + '</td>');
                                else
                                    trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">' + Number(moment(value).format('YYYYMMDD')) + '</span>' + value + '</td>');
                            }
                            else {

                                if (val.CssClass == 'undefined' || val.CssClass == null)
                                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">' + Number(moment(value).format('YYYYMMDD')) + '</span><input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                                else
                                    trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();"><span style="Display:none;">' + Number(moment(value).format('YYYYMMDD')) + '</span>' + value + '<input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                            }
                        }
                        else {

                            if (obj[val.Value] == 'undefined' || obj[val.Value] == null) {
                                if (val.CssClass == 'undefined' || val.CssClass == null)
                                    trow.append('<td  ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</td>');
                                else
                                    trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '</td>');
                            }
                            else {

                                if (val.CssClass == 'undefined' || val.CssClass == null)
                                    trow.append('<td ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '<input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                                else
                                    trow.append('<td class=' + val.CssClass + ' ondblclick="angular.element(this).scope().dbClick();">' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : value) + '<input type="hidden" id="hd' + key + '" name=' + key + ' value=' + obj[val.Value] + ' /></td>');
                            }

                        }
                    }
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
                        sumList[j] = Number(sumList[j]) + (isNaN(value) ? 0 : Number(value));
                    }
                });
                tbody.append(trow);
            });

            tab.append(tbody);
            if (addfunfoot == 1) {
                var ftrow = $('<tr class="print"></tr>');
                $.each(sumList, function (index, value) {
                    var footval = (value == '0' ? '-' : ((isNaN(value) || value == "") ? value : Number(value).toLocaleString("en", { useGrouping: false, maximumFractionDigits: 0 })));

                    ftrow.append('<th class="text-right">' + footval + '</th>');
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
            var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap" ></table>');
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