app.EmployeeAttendanceMonthlyReportController = function ($scope, $element, $filter, myService) {
    $scope.SetMaxMinDate().then(function (response) {
        if ($scope.ToDates > new Date())
            $scope.FromDates = new Date('01-' + moment(new Date()).format('MMM-YYYY'));
        else
            $scope.FromDates = new Date('01-' + moment($scope.ToDate).format('MMM-YYYY'));
        $scope.ToDates = $scope.ToDate;
        $scope.$applyAsync();
    });

    $scope.SearchRecord = function () {
        $('#ddlSection').removeClass('validate');
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };

    $scope.started = function () {

        if (moment($scope.FromDates).format('MMM-YYYY') == moment($scope.ToDates).format('MMM-YYYY')) {
        var collectionobj = {};
        collectionobj.RelationshipID = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FromDate = moment(($scope.FromDates)).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment(($scope.ToDates)).format('YYYY-MMM-DD');
        collectionobj.EmployeeId = $scope.EmployeeCode;
        collectionobj.DepartmentId = $scope.DepartmentCode;
        //collectionobj.DesignationId = $scope.DesignationCode;
        collectionobj.Action = 18;
        var getData = myService.methode('POST', "/AttendanceReportApi/GetEmployeeAttandanceMonthlyReport", collectionobj);
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
                    { "HeaderText": "Job Type", "HeaderValue": "JobType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    { "HeaderText": "Depart.", "HeaderValue": "DepartmentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    { "HeaderText": "Desig.", "HeaderValue": "DesignationName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    { "HeaderText": "DOJ", "HeaderValue": "DOJ", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },

                ];
            if (response.data != null && response.data.length > 0) {

                $scope.dynamicHeader = Object.keys(response.data[0]);

                $.each($scope.dynamicHeader, function (index, val) {
                    if (Number(val)) {
                        tblheader.push(
                            { "HeaderText": val, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                        )
                    }
                });


            }
            tblheader.push(
                { "HeaderText": "Present", "HeaderValue": "Present", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Absent", "HeaderValue": "Absent", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Leave", "HeaderValue": "Leave", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            )
            $scope.loadDataUsingPreDefinedColumn(tblheader, response.data);
        });
        }
        else {
            showMsgBox('From and To date should be same month-year.')
        }
    };
    $scope.loadDataUsingPreDefinedColumn = function (headerColumn, data, displayOrder) {

        if (displayOrder != null && displayOrder != '') {
            colOrder = displayOrder;
        }
        $scope.loadDataTablesUsingPreDefinedColumn(headerColumn, data);
    };
    $scope.loadDataTablesUsingPreDefinedColumn = function (tblheader, data) {

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