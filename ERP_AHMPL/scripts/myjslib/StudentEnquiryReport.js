app.StudentEnquiryReportController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtAttendanceDate');
    $scope.disableSearch = true;


    $scope.SearchRecord = function () {
        $('#ddlSection').removeClass('validate');
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };


    $scope.started = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = 1;
        collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
        collectionobj.SessionId = sessionId;
        collectionobj.Category = $scope.filter;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/StudentEquiryReportApi/GetStudentEnquiryReport", collectionobj);
        getData.then(function (response) {
            debugger
            var tblheader = [];
            var tblheader =
                [
                    { "HeaderText": "Sr No.", "Value": "RowNumber", "HeaderValue": "Id", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno", "rowSpan": "2" },
                    //{ "HeaderText": "Perticulars", "HeaderValue": "Perticulars", "ShowColumn": "Yes", "ImageColumn": "No", "Width": "100%" },
                    //{ "HeaderText": "Enquiry", "HeaderValue": "Reg1", "ShowColumn": "Yes", "ImageColumn": "No", "width": "100%" },
                    //{ "HeaderText": "Registration", "HeaderValue": "Reg2", "ShowColumn": "Yes", "ImageColumn": "No", "Width": "100%" },
                    //{ "HeaderText": "Admission", "HeaderValue": "Adm", "ShowColumn": "Yes", "ImageColumn": "No", "Width": "100%" }
                ];
            if (response.data != null && response.data.length > 0) {
                $scope.dynamicHeader = Object.keys(response.data[0]);
                $.each($scope.dynamicHeader, function (index, val) {
                    //if (val.indexOf('Reg2') == -1)
                    //    tblheader.push({ "HeaderText": val, "HeaderValue": val, "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "text-left" })
                    //else
                        tblheader.push({ "HeaderText": val, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-left" })
                });
            }

            loadDataUsingPreDefinedColumn(tblheader, response.data);
        });
    }
    loadDataTablesUsingPreDefinedColumn = function (tblheader, data) {
        debugger

        if (data.length > 0) {
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
                {
                    
                    theadrow.append('<th>' + headertext + '</th>');
                }
                else
                    
                    theadrow.append('<th class=' + val.CssClass + '>' + headertext + '</th>');
                tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + headertext + '" /></th>');
                // Append footerrow here
              }
            //thead.append(theadrow);
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

//, columns: [{ "HeaderText": "Enquiry", "HeaderValue": "Reg1", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }]