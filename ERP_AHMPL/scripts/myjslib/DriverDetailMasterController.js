app.DriverDetailMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtSearch');
    $scope.SessionId = sessionId;

    $scope.AlbumIcon = [];
    $scope.show = function (input) {
        
        $scope.AlbumIcon = [];
        $scope.getFiledetails();
        for (var i = 0; i < input.files.length; i++) {
            if (input.files[i]) {
                if (input.files[i].size < '1048576') {
                    var filerdr = new FileReader();
                    filerdr.onload = function (e) {
                        $scope.AlbumIcon.push((e.target.result).replace(/^data:image\/[a-z]+;base64,/, ""));
                    }
                    filerdr.readAsDataURL(input.files[i]);
                }

            };
        }
        if (input.files && input.files[0]) {
            var filerdr = new FileReader();
            filerdr.readAsDataURL(input.files[0]);
            filerdr.onload = function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    var sizes = {
                        width: this.width,
                        height: this.height
                    };
                    if (input.files[0].size >= 1048576) {
                        alert("File is more than 1 mb");
                        $('#file').val() = "";
                        $scope.AlbumIcon = "";
                        return;
                    }
                    else if (sizes.width > 1970 || sizes.height > 1450) {
                        alert("File width is more than 1968 px Or height is more than 1440 px");
                        $('#file').val("");
                        $scope.AlbumIcon = "";
                        return;
                    }
                }
            }
        };
    };

    $scope.getFiledetails = function () {
        var x = document.getElementById("fileInput");
        var txt = "";
        var files = $('#fileInput')[0].files;
        var len = $('#fileInput').get(0).files.length;

        for (var i = 0; i < len; i++) {

            f = files[i];
            var ext = f.name.split('.').pop().toLowerCase();

            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                showMsgBox("Oops! Please Select Images(Best : .Jpeg or jpg Images)");
                return;
            }
        }

        if ('files' in x) {
            if (x.files.length == 0) {
                showMsgBox("Select one or more Images.");
            }
            else if (x.files.length > 30) {
                showMsgBox("Oops! 30 Photos maximum allowed.");
                $('#dvdata').attr('Style', 'DISPLAY:NONE');
                $('#fileInput').val('');
                return;
            }
            else {
                var totalSize = 0;
                var MaxSize = 20971520;
                for (var i = 0; i < x.files.length; i++) {
                    var file = x.files[i];
                    if ('name' in file) {
                        totalSize += file.size
                    }
                    //-------------20 mb 
                }
                if (totalSize >= MaxSize) {
                    showMsgBox("Oops! Max Size of All Photo:1 MB");
                    $('#dvdata').attr('Style', 'DISPLAY:NONE');
                    $('#fileInput').val('');
                    return;
                }
                $('#dvdata').attr('Style', 'DISPLAY:block');
                var MaxSizePhoto = 0;
                var a = 0;
                txt = "<table id='thetable' class='table compact table-hover table-striped table-bordered'><thead><tr><th>Sr.No.</th><th>Image Name</th><th>Image Size</th><th>Status</th></tr></thead><tbody>"
                for (var i = 0; i < x.files.length; i++) {

                    var a = a + 1;
                    txt += "<tr class='tab-tr" + a + "'>";
                    var file = x.files[i];

                    if ('name' in file) {
                        MaxSizePhoto += file.size
                        var photoinmb = (file.size / (1024 * 1024)).toFixed(2)
                        var color = photoinmb > 1 ? '#f78989' : '#95e695';
                        var stat = photoinmb > 1 ? 'Not Approved' : 'Approved';
                        var s = i + 1;
                        txt += "<td class='tab-td1' name='record' style='background-color:" + color + "'>" + (i + 1) + ". </td><td class='tab-td2' style='background-color:" + color + "'>" + file.name + "</td> <td class='tab-td3' style='background-color:" + color + "'> " + photoinmb + " mb</td><td style='background-color:" + color + "'>" + stat + "</td> </tr>";
                        if (MaxSizePhoto > '1048576') {
                            showMsgBox("Oops! Max Size of Photo:1 MB");
                        }
                    }
                }
                txt += "</tbody></table>"
            }
        }
        else {
            if (x.value == "") {
                showMsgBox("Select one or more Images.");
            }
            else {
                txt += "The files property is not supported by your browser!";
                txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property.
            }
        }
        //document.getElementById("dvdata").innerHTML = txt;
    }


    $scope.SaveRecord = function () {
        if (isValidate()) {
            debugger
            var collectionobj = {};
            collectionobj.DriverCode = $scope.hfId;
            collectionobj.DriverName = $scope.DriverName;
            collectionobj.Contact = $scope.ContactNumber;
            collectionobj.Address = $scope.DriverAddress;
            collectionobj.DLNumber = $scope.DLNumber;
            collectionobj.Adhaar = $scope.Adhaar;
            collectionobj.PhotoIdList = $scope.AlbumIcon;

            collectionobj.SessionId = sessionId;
            collectionobj.FyId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/TransportMasterApi/InsertUpdateDeleteDriverDetailMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }

    };

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetDriverDetailMaster', collectionobj);
        getData.then(function (response) {
           
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "DriverCode", "HeaderValue": "Id", "Width": "10%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Driver Name", "HeaderValue": "DriverName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Contact Number", "HeaderValue": "Contact", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Driver's Address", "HeaderValue": "Address", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "DL Number", "HeaderValue": "DLNumber", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Adhaar", "HeaderValue": "Adhaar", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.DriverDetailList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
               
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.DriverDetailList = $filter('filter')($scope.DriverDetailList, { DriverCode: $scope.hfId }, true);

                //$scope.DriverCode = $scope.DriverDetailList[0].DriverCode;
                $scope.DriverName = $scope.DriverDetailList[0].DriverName;
                $scope.ContactNumber = $scope.DriverDetailList[0].Contact;
                $scope.DriverAddress = $scope.DriverDetailList[0].Address;
                $scope.DLNumber = $scope.DriverDetailList[0].DLNumber;
                $scope.Adhaar = $scope.DriverDetailList[0].Adhaar;
                //$scope.VehicleRegDate = new Date($scope.DriverDetailList[0].VehicleRegDate);
                //$scope.FitnessExpiryDate = new Date($scope.DriverDetailList[0].FitnessExpiryDate);
                //$scope.PermitExpiryDate = new Date($scope.DriverDetailList[0].PermitExpiryDate);
                //$scope.InsuranceExpiryDate = new Date($scope.DriverDetailList[0].InsuranceExpiryDate);
                //$scope.PollutionExpiryDate = new Date($scope.DriverDetailList[0].PollutionExpiryDate);
                //$scope.OwnerName = $scope.DriverDetailList[0].OwnerName.toString();
                //$scope.OwnerAddres = $scope.DriverDetailList[0].Address;
                //$scope.ContactNumber = $scope.DriverDetailList[0].Contact;
                //$scope.VehicleCapacity = $scope.DriverDetailList[0].VehicleCapacity;
                //$scope.VehicleChasisNumber = $scope.DriverDetailList[0].VehicleChasisNumber.toString();//OwnerName
                $scope.IsActive = $scope.DriverDetailList[0].IsActive.toString();
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableAdd = false;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlCourse', true);

            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.DriverCode = $scope.hfId;
        collectionobj.DriverName = $scope.DriverName;
        collectionobj.DispalyCode = displayCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UpdatedBy = $scope.userid;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/InsertUpdateDeleteDriverDetailMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
    $scope.ClearControl = function (flag) {
        debugger
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };
    $scope.ResetControl = function (flag) {
        debugger
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.DriverName = '';
        $scope.ContactNumber = '';
        $scope.DriverAddress = '';
        $scope.DLNumber = '';
        $scope.Adhaar = '';
        $scope.fileInput = '';
       
        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.$applyAsync();
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
                { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Reg. No.", "HeaderValue": "RegNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Form Sale Type", "HeaderValue": "FormSaleType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.RegistrationFormSaleEntryOffline, window.document.title);
    };

}