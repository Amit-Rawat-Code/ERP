app.EmployeeAttendanceMonthWiseReportController = function ($scope, $element, $filter, myService) {
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
        collectionobj.RelationshipID = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FromDate = $scope.SessionYear + '-' + $scope.SessionMonth + '-' + '01';
        collectionobj.EmployeeId = $scope.EmployeeCode;
        collectionobj.DepartmentId = $scope.DepartmentCode;
        collectionobj.DesignationId = $scope.DesignationCode;
        collectionobj.Action = 18;
        var getData = myService.methode('POST', "/AttendanceReportApi/GetEmployeeAttandanceMonthWiseReport", collectionobj);
        getData.then(function (response) {
            
            messagevalues = [
                { "Year": $scope.SessionYear },
                { "Month": $scope.SessionMonth },
                { "Class": $('#ddlClass option:selected').text() },
                { "Section": $('#ddlSection option:selected').val() == "" ? "" : $('#ddlSection option:selected').text() }
            ];
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "RowNumber", "HeaderValue": "Id", "Width": "48px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    { "HeaderText": "Father", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    { "HeaderText": "Depart.", "HeaderValue": "DepartmentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    { "HeaderText": "Desig.", "HeaderValue": "DesignationName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    { "HeaderText": "DOJ", "HeaderValue": "DOJ", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                    { "HeaderText": "1", "HeaderValue": "1", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "2", "HeaderValue": "2", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "3", "HeaderValue": "3", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "4", "HeaderValue": "4", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "5", "HeaderValue": "5", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "6", "HeaderValue": "6", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "7", "HeaderValue": "7", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "8", "HeaderValue": "8", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "9", "HeaderValue": "9", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "10", "HeaderValue": "10", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "11", "HeaderValue": "11", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "12", "HeaderValue": "12", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "13", "HeaderValue": "13", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "14", "HeaderValue": "14", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "15", "HeaderValue": "15", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "16", "HeaderValue": "16", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "17", "HeaderValue": "17", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "18", "HeaderValue": "18", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "19", "HeaderValue": "19", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "20", "HeaderValue": "20", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "21", "HeaderValue": "21", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "22", "HeaderValue": "22", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "23", "HeaderValue": "23", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "24", "HeaderValue": "24", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "25", "HeaderValue": "25", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "26", "HeaderValue": "26", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "27", "HeaderValue": "27", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "28", "HeaderValue": "28", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            $scope.lastdate = moment($scope.SessionYear + '-' + $scope.SessionMonth + '-' + '01').endOf('month').format('DD');

            if ($scope.lastdate === '31') {
                tblheader.push(
                    { "HeaderText": "29", "HeaderValue": "29", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "30", "HeaderValue": "30", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "31", "HeaderValue": "31", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" });
            }
            else if ($scope.lastdate === '30') {
                tblheader.push(
                    { "HeaderText": "29", "HeaderValue": "29", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "30", "HeaderValue": "30", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" });
            }
            else if ($scope.lastdate === '29') {
                tblheader.push(
                    { "HeaderText": "29", "HeaderValue": "29", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No" });
            }

            tblheader.push(
                { "HeaderText": "Present", "HeaderValue": "Present", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Absent", "HeaderValue": "Absent", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Leave", "HeaderValue": "Leave", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" });
            $scope.loadDataUsingPreDefinedColumn(tblheader, response.data);
        });
    };
   $scope.loadDataUsingPreDefinedColumn = function (headerColumn, data, displayOrder) {

        if (displayOrder != null && displayOrder != '') {
            colOrder = displayOrder;
        }
        $scope.loadDataTablesUsingPreDefinedColumn(headerColumn, data);
    };
    $scope.loadDataTablesUsingPreDefinedColumn = function (tblheader, data)
    {
        
        if (JSON.stringify(data).length > 2) {
            var tab = $('<table id="example" class="table compact table-att table-hover table-striped table-bordered nowrap" ></table>');
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
                    theadrow.append('<th>' + headertext + '</th>');
                else
                    theadrow.append('<th class=' + val.CssClass + '>' + headertext + '</th>');
                tfootrow.append('<th><input type="text" class="form-control form-control-sm" style="width:' + val.Width + '" placeholder="' + headertext + '" /></th>');
            }

            thead.append(theadrow);
          
            tab.append(thead);
            var tbody = $('<tbody></tbody>');
      
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
                            var values = value.split("_");
                            var textvalue = values.length > 0 ? values[0] : "";
                            var backcolor = values.length > 1 ? values[1] : "fff";
                            if (val.CssClass == 'undefined' || val.CssClass == null)
                                trow.append('<td style="background-color:' + backcolor + '">' + (typeof (textvalue) == 'boolean' ? (textvalue == true ? "Yes" : "No") : textvalue) + '</td>');
                            else
                                trow.append('<td class=' + val.CssClass + ' style="background-color:' + backcolor + '">' + (typeof (textvalue) == 'boolean' ? (textvalue == true ? "Yes" : "No") : textvalue) + '</td>');
                        }
                    }
                });
                tbody.append(trow);
            });

            tab.append(tbody);

            tfoot.append(tfootrow);
            tab.append(tfoot);

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