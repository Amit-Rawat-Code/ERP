app.BookEntryLibController = function ($scope, $element, $filter, myService) {
    //debugger
    $scope.SetFocus('#ddlVender');
    $scope.BillDate = new Date();
    $scope.VDate = new Date();
    $scope.GetVoucherNoLibList(7);
    $scope.GetVender = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetVenderLib', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.Venderlist = response.data;
            }
        });
    };
    $scope.GetBookDetail = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBookDetailLib', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                //debugger
                $scope.BookList = response.data;
            }
        });
    };
    $scope.GetBookDetails = function (BookCode, index) {
        debugger;
        if (BookCode == "" || BookCode == 'undefined') { }
        else {
            var collectionobj = {};
            collectionobj.Action = 7;
            collectionobj.SessionId = sessionId;
            collectionobj.Code = BookCode;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBookDetailLib', collectionobj);
            getData.then(function (response) {
                if (response.data.length > 0) {
                    $scope.BE[index].AuthorCode = response.data[0].AuthorCode;
                    $scope.BE[index].Author = response.data[0].Author;
                    $scope.BE[index].PublisherCode = response.data[0].PublisherCode;
                    $scope.BE[index].Publisher = response.data[0].Publisher;
                    $scope.BE[index].Edition = response.data[0].Edition;
                    $scope.BE[index].PublisherYear = response.data[0].PublisherYear;
                    $scope.BE[index].Price = response.data[0].Price;
                    $scope.BE[index].BookAccCode = response.data[0].BookAccCode;
                    $scope.BE[index].BookAccessories = response.data[0].BookAccessories;
                    $scope.BE[index].NoOfPages = response.data[0].NoOfPages;
                    $scope.BE[index].NoOfCopy = response.data[0].NoOfCopies;
                }
            });
        }
    };
    /* Get Book list */
    $scope.Booklist = function () {
        debugger;
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.Counter = $scope.Counter;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/BookList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.BookEntryList = [];
                $scope.BookEntryList = response.data;
            }
        });
    };

    $scope.BE = [];
    $scope.AddBE = function () {
        //debugger;
        $scope.BE.push({
            SrNo: "",
            BookCode: "",
            AuthorCode: "",
            Author: "",
            PublisherCode: "",
            Publisher: "",
            Edition: "",
            PublisherYear: "",
            Price: "",
            NoOfPages: "",
            NoOfCopy: "",
            BookAccCode: "",
            BookAccessories: "",
        });
        var $index = $scope.BE.length - 1;
        setTimeout(function () { $('#txtSrNo' + $index).focus(); }, 500);
    };
    $scope.RemoveBE = function (index) {
        $scope.BE.splice(index, 1)

    };
    $scope.UpBE = function (index) {
        x = index, y = index - 1;
        var obj = $scope.BE[x];
        $scope.BE[x] = $scope.BE.splice(y, 1, obj)[0];
    };
    $scope.DownBE = function (index) {
        x = index;
        if (index == $scope.BE.length - 1)
            y = 0;
        else
            y = index + 1;
        var obj = $scope.BE[x];
        $scope.BE[x] = $scope.BE.splice(y, 1, obj)[0];
    };

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.TransId = $scope.hfId;
            collectionobj.VendorCode = $scope.VenderM;
            collectionobj.V_Date = $scope.VDate;
            collectionobj.BillNo = $scope.BillNo;
            collectionobj.BillDate = $scope.BillDate;
            collectionobj.BookEntryList = JSON.stringify($scope.BE);
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

            var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBookEntry", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });

        }
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
        debugger;
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.VoucherM = "";
        $scope.GetVoucherType('BKPUR');
        $scope.VDate = "";
        $scope.VDate = new Date();
        $scope.GetVoucherNoLibList(7);
        $scope.hfId = "";
        $scope.VenderM = "";
        $scope.BillNo = "";
        $scope.BillDate = "";
        $scope.BE = [];
        $scope.AddBE();
        $scope.SetFocus('#ddlVender');
        $scope.BookEntryList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.BookEntryList = [];

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
        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetBookEntryList", collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Voucher Date", "Value": "VDate", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Voucher No.", "Value": "PVNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Vendor Name", "Value": "VendorCode", "HeaderValue": "VenderName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Bill No.", "Value": "BillNo", "HeaderValue": "BillNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Bill Date", "HeaderValue": "BillDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            $scope.BookEntryList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                //debugger;
                $scope.BookEntryList = $filter('filter')($scope.BookEntryList, { 'TransID': $scope.hfId });
                $scope.VDate = new Date(moment(row[1], 'DD-MM-YYYY'));;
                $scope.PVNo = $(FindHtml(row[2])).val();
                $scope.VenderM = $(FindHtml(row[3])).val();
                $scope.BillNo = $(FindHtml(row[4])).val();
                $scope.BillDate = new Date(moment(row[5], 'DD-MM-YYYY'));

                var collectionobj = {};
                collectionobj.Action = 8;
                collectionobj.TransId = $scope.hfId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                //debugger;
                var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetBookEntryList", collectionobj);
                getData.then(function (response) {
                    //debugger;
                    $scope.BE = response.data;
                });

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlVender', true);
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

        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBookEntry", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ResetControl();
                $scope.hideLoader();
            };
        });
    };

    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
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

    /*Print Button Click Event*/
    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Voucher Date", "Value": "VDate", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Vendor Name", "Value": "VendorCode", "HeaderValue": "VenderName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Bill No.", "Value": "BillNo", "HeaderValue": "BillNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Bill Date", "HeaderValue": "BillDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.BookEntryList, window.document.title);
    };


}