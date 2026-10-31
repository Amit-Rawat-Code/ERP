app.BindingIssueEntryLibController = function ($scope, $element, $filter, myService) {
    $scope.Save = "Save";
    $scope.SetFocus('#txtBinder');
    $scope.VDate = new Date();
    $scope.GetVoucherNoLibList(3);

    $scope.GetAccessionNo = function () {
        //debugger;
        var collectionobj = {};

        if ($scope.Save == "Save") {
            collectionobj.Action = 7;
            //collectionobj.AccessionNo = $scope.AccessionM;
        }
        else if ($scope.Save == "Edit") {
            collectionobj.Action = 10;
            collectionobj.TransId = $scope.hfId;
        }

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetAccessionIDList', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.AccessionNoList = [];
                $scope.AccessionNoList = response.data;
            }
        });
    };
    $scope.GetAccessionNoDetails = function (accession, index) {
        //debugger;
        var collectionobj = {};
        if ($scope.Save == "Save") {
            collectionobj.Action = 7;
            collectionobj.AccessionID = accession;
        }
        else if ($scope.Save == "Edit") {
            collectionobj.Action = 10;
            collectionobj.TransID = $scope.hfId;
        }
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetAccessionIDList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                //debugger;
                $scope.BD[index].BookCode = response.data[0].BookCode;
                $scope.BD[index].BookName = response.data[0].BookName;
                $scope.BD[index].Author = response.data[0].Author;
                $scope.BD[index].Publisher = response.data[0].Publisher;
                $scope.BD[index].Edition = response.data[0].Edition;
                $scope.BD[index].PublisherYear = response.data[0].PublisherYear;
            }
        });
    };
    $scope.BindBinderRecord = function (binder) {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.BinderCode = binder;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBinderList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.AddressM = response.data[0].Address;
            }
        });
    };
    $scope.ddl_BinderListChange = function (binder) {
        //debugger;
        $scope.BindBinderRecord(binder.SubCode);
    }
    $scope.BindingTypeDetails = function (BindingTypeID, index) {
        //debugger;
        $scope.BD[index].Rate = $filter('filter')($scope.BindingList, { 'BindingTypeCode': BindingTypeID })[0].Rate;
        $scope.GetRateAndQty1(index);
        //if ($scope.Save == "Save") {
        //    $scope.GetRateAndQty1(index);
        //}
        //else if ($scope.Save == "Edit") {
        //    $scope.GetRateAndQty();
        //}
        //var collectionobj = {};
        //collectionobj.Action = 8;
        //collectionobj.Code = BindingTypeID;
        //collectionobj.RelationshipId = relationshipId;
        //collectionobj.SessionId = sessionId;
        //collectionobj.FYId = fyId;
        //var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBindingTypeList', collectionobj);
        //getData.then(function (response) {
        //    if (response.data.length > 0) {
        //        $scope.BD[index].Rate = response.data[0].Rates;
        //    }
        //});
    };
    $scope.BindingTypeList = function () {
        //debugger;
        var collectionobj = {};

        if ($scope.Save == "Save") {
            collectionobj.Action = 8;
        }
        else if ($scope.Save == "Edit") {
            collectionobj.Action = 9;
            collectionobj.TransID = $scope.hfId;
        }

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBindingTypeList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                //debugger
                $scope.BindingList = [];
                $scope.BindingList = response.data;
                if ($scope.Save == "Edit") {
                    $scope.GetRateAndQty();
                }

            }
        });
    };
    $scope.GetRateAndQty = function () {
        //debugger;
        $.each($scope.BindingList, function (index, array) {
            //$scope.BindingList[index]["TotalQty"] = "";
            //$scope.BindingList[index]["Rate"] = "";
            if (array.BindingTypeCode != "") {
                $.each($scope.BD, function (index1, array1) {
                    if (array1.AccessionNo != "") {
                        //debugger;
                        if (array.BindingTypeCode == array1.BindingTypeCode) {
                            //debugger;
                            $scope.BindingList[index]["Rate"] = $scope.checkNaN($scope.BindingList[index]["Rate"]) + $scope.checkNaN($scope.BD[index1]["Rate"])
                            $scope.BindingList[index]["TotalQty"] = $scope.checkNaN($scope.BindingList[index]["TotalQty"]) + 1;
                        }
                    }
                });
            }
            if ($scope.checkNaN(array.Rate) != 0) {
                //debugger;
                if ($scope.checkNaN($scope.BindingList[index]["TotalQty"]) != 0) {
                    $scope.BindingList[index]["Rate"] = ($scope.checkNaN($scope.BindingList[index]["Rate"]) / $scope.checkNaN($scope.BindingList[index]["TotalQty"]))
                    $scope.BindingList[index]["TotalAmt"] = ($scope.checkNaN($scope.BindingList[index]["TotalQty"]) * $scope.checkNaN($scope.BindingList[index]["Rate"]))
                }
            }
        });
    };

    $scope.GetRateAndQty1 = function (index1) {
        //debugger;
        $.each($scope.BindingList, function (index, array) {
            //$scope.BindingList[index]["TotalQty"] = "";
            //$scope.BindingList[index]["Rate"] = "";
            if (array.BindingTypeCode != "") {
                if ($scope.BD[index1].AccessionNo != "") {
                    //debugger;
                    if ($scope.BD[index1].BindingTypeCode == array.BindingTypeCode) {
                        //debugger;
                        //$scope.BindingList[index]["Rate"] = $scope.checkNaN($scope.BindingList[index]["Rate"]) + $scope.checkNaN($scope.BD[index1]["Rate"])
                        $scope.BindingList[index]["TotalQty"] = $scope.checkNaN($scope.BindingList[index]["TotalQty"]) + 1;
                    }
                }
            }
            if ($scope.checkNaN(array.Rate) != 0) {
                //debugger;
                if ($scope.checkNaN($scope.BindingList[index]["TotalQty"]) != 0) {
                    //$scope.BindingList[index]["Rate"] = ($scope.checkNaN($scope.BindingList[index]["Rate"]) / $scope.checkNaN($scope.BindingList[index]["TotalQty"]))
                    $scope.BindingList[index]["TotalAmt"] = ($scope.checkNaN($scope.BindingList[index]["TotalQty"]) * $scope.checkNaN($scope.BindingList[index]["Rate"]))
                }
            }
        });
    };
    //function CheckDuplicateAccessionNo() {
    //    var cnt = 0
    //    debugger;
    //    $.each($scope.BD, function (index, array) {
    //        $.each($scope.BD, function (index1, array1) {
    //            if (array.AccessionNo == array1.AccessionNo) {
    //                cnt = cnt + 1;
    //            }
    //        });
    //    });
    //    return cnt;
    //}

    $scope.BD = [];
    $scope.AddBD = function () {
        //debugger;
        $scope.BD.push({
            SrNo: "",
            AccessionNo: "",
            BookCode: "",
            BookName: "",
            AuthorName: "",
            PublisherName: "",
            Edition: "",
            PublisherYear: "",
            BindingTypeCode: "",
            Rate: "",
        });
        var $index = $scope.BD.length - 1;
        setTimeout(function () { $('#txtSrNo' + $index).focus(); }, 500);
    };
    $scope.RemoveBE = function (index) {
        $scope.BD.splice(index, 1)

    };
    $scope.UpBE = function (index) {
        x = index, y = index - 1;
        var obj = $scope.BD[x];
        $scope.BD[x] = $scope.BD.splice(y, 1, obj)[0];
    };
    $scope.DownBE = function (index) {
        x = index;
        if (index == $scope.BD.length - 1)
            y = 0;
        else
            y = index + 1;
        var obj = $scope.BD[x];
        $scope.BD[x] = $scope.BD.splice(y, 1, obj)[0];
    };

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        //debugger
        if (isValidate()) {
            //var rnt = CheckDuplicateAccessionNo();
            //if (rnt > 1) {
            //    showMsgBox('Duplicate accessionNo with same description is not allowed');
            //}
            //else {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.TransId = $scope.hfId;
            collectionobj.V_Date = $scope.VDate;
            collectionobj.BinderCode = $scope.SubCode;
            collectionobj.BD = $scope.BD;
            /*collectionobj.bindingtype = $scope.BindingList;*/
            collectionobj.BindingIssueEntryInJson = JSON.stringify($scope.BD);
            collectionobj.BindingIssueDetailInJson = JSON.stringify($scope.BindingList);
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

            var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBindingIssueEntry", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });

        }
        //}
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
        $scope.VoucherM = "";
        $scope.GetVoucherType("BNDIS");
        $scope.GetVoucherNoLibList(3);

        $scope.VDate = "";
        $scope.VDate = new Date();
        $scope.hfId = "";

        $scope.SearchBinderText = "";
        $scope.AddressM = "";
        $scope.BindingList = [];
        $scope.BindingTypeList();
        $scope.BD = [];
        $scope.AddBD();
        $scope.SetFocus('#txtBinder');
        $scope.$applyAsync();
        $scope.BindingIssueEntryList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.BindingIssueEntryList = [];

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        //debugger;
        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetBindingIssueEntryList", collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Issue Date", "Value": "V_Date", "HeaderValue": "V_Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Issue No", "Value": "PVNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Binder", "Value": "BinderCode", "HeaderValue": "BinderName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            // $scope.BindingIssueEntryList = response.data.Table;
            $scope.BindingIssueEntryList = response.data.Table1;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                //debugger;                
                $scope.BindingIssueEntryList = $filter('filter')($scope.BindingIssueEntryList, { 'TransID': $scope.hfId });
                $scope.VDate = new Date(moment(row[1], 'DD-MM-YYYY'));;
                $scope.VenderM = $(FindHtml(row[2])).val();
                $scope.SubCode = $(FindHtml(row[3])).val();
                $scope.BindBinderRecord($scope.SubCode);
                $scope.SearchBinderText = $scope.BindingIssueEntryList[0].BinderName;
                $scope.Save = "Edit";
                $scope.GetAccessionNo();
                $scope.BindingTypeList();
                $scope.BD = $filter('filter')($scope.BindingIssueEntryList, { 'TransID': $scope.hfId });
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtBinder', true);
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
        collectionobj.TransId = $scope.hfId;
        collectionobj.UpdatedBy = JSON.parse(userid);

        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBindingIssueEntry", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ResetControl();
                $scope.hideLoader();
            };
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

    //Binders Details Dropdown------------------

    $scope.GetBinderList = function (action) {
        $scope.disabledSearch = true;
        $scope.hideloader = true;
        //debugger
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = action

        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetBinderList", collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.BinderList = response.data;
            if ($scope.BinderList.length > 0) {
                //setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;

                //}, 100);
            }
            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }
    //$scope.HideBinderList = function (val) {

    //    setTimeout(function () {
    //        if (document.querySelectorAll(".show").length > 0) {
    //            document.getElementById("BinderListOnOff").classList.toggle("show")
    //        }
    //    }, 200);
    //}
    //$(".BinderListOnOff").click(function (e) {

    //    e.stopPropagation();
    //    return false;
    //});
    //$scope.SearchBinders = function () {
    //    //
    //    $scope.SearchEmployeeText = "";
    //    document.getElementById("BinderListOnOff").classList.toggle("show");
    //}
    $scope.setBinderLib = function (binder) {

        $scope.SearchBinderText = binder.BinderName;
        $scope.SubCode = binder.SubCode;
        $scope.Address = binder.Address;
        $scope.HideBinderList();
        $scope.$applyAsync();
    }
    $scope.resetBinderData = function () {
        $scope.SearchBinderText = "";
        $scope.SubCode = "";
        $scope.Address = "";
    }

    //-------------------------------

    /*Print Button Click Event*/
    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Issue Date", "Value": "V_Date", "HeaderValue": "V_Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Issue No", "Value": "PVNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Binder", "Value": "BinderCode", "HeaderValue": "BinderName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.BindingIssueEntryList, window.document.title);
    };

}