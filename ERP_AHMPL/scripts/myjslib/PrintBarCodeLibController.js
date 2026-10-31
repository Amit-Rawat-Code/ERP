app.PrintBarCodeLibController = function ($scope, $element, $filter, myService) {
    //$scope.AccessionDetailList = [];
    $scope.GetFromAccessionList = function () {
        //debugger
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = 5;
        var getData = myService.methode('POST', "../Api/LibraryReportApi/GetBookSearchList", collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.FromAccessionList = response.data;
            }
        })
    }

    $scope.GetToAccessionList = function () {
        //debugger
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = 5;
        var getData = myService.methode('POST', "../Api/LibraryReportApi/GetBookSearchList", collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.ToAccessionList = response.data;
            }
        })
    }

    $scope.setToAccession = function (acc) {
        $scope.SearchAccessTo = acc.AccessionID;
        $scope.$applyAsync();
    }
    $scope.setFromAccession = function (acc) {
        $scope.SearchAccessFrom = acc.AccessionID;
        $scope.$applyAsync();
    }

    $scope.PrintTypeM = "Accession";
    $scope.DisabledToAccession = false;
    $scope.DisabledFromAccession = false;
    $scope.PrintType = function () {
        if ($scope.PrintTypeM == "Accession") {
            $scope.DisabledToAccession = false;
            $scope.DisabledFromAccession = false;
        }
        else if ($scope.PrintTypeM == "NewStock") {
            $scope.DisabledToAccession = true;
            $scope.DisabledFromAccession = true;
        }
    }

    $scope.SearchRecord = function () {
        $('#CollapseSearchTableList').fadeIn();
        $scope.started();
    };

    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 6;
        if ($scope.PrintTypeM == "Accession") {
            collectionobj.PrintCounter = '1';
        }
        else if ($scope.PrintTypeM == "NewStock") {
            collectionobj.PrintCounter = '0';
        }        
        collectionobj.FromAccession = $scope.SearchAccessFrom;
        collectionobj.ToAccession = $scope.SearchAccessTo;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        //debugger;
        var getData = myService.methode('POST', "../Api/LibraryReportApi/GetBookSearchList", collectionobj);
        getData.then(function (response) {
            $scope.AccessionDetailList = response.data.length > 0 ? response.data : '';
            $scope.hideLoader();
        });
    };
    $scope.AccessionPrintList1 = [];
    $scope.GenerateBarCode = function () {
        //debugger
        var filterDate = $filter('filter')($scope.AccessionDetailList, { 'chk': true }, true);
        var dataRows = [];
        var Columns = { Col1: '', Col2: '' };
        $.each(filterDate, function (index, row) {
            if (Columns.Col2 != "") {
                Columns = { Col1: '', Col2: '' };
            }
            if (index % 2 == 0)
                Columns.Col1 = row.AccessionID
            else
                Columns.Col2 = row.AccessionID
            if (Columns.Col2 != "" || filterDate.length - 1 == index)
                dataRows.push(Columns)
        })
        $scope.AccessionPrintList1 = dataRows;
    }

    $scope.PrintPreview = function () {
        var collectionobj = {};
        //debugger
        $scope.AccessionPrintList = [];
        if ($scope.PrintTypeM == "Accession") {
            collectionobj.PrintCounter = '1';
        }
        else if ($scope.PrintTypeM == "NewStock") {
            collectionobj.PrintCounter = '0';
        }
        collectionobj.SessionId = $scope.SessionId;
        collectionobj.BSAccessionID = JSON.stringify($filter('filter')($scope.AccessionDetailList, { 'chk': true }, true));
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/LibraryReportApi/GetBookSearchList", collectionobj);
        getData.then(function (response) {
            debugger
            $scope.AccessionDetailList = [];
            $scope.DocOrientation = 'l';
            $scope.AccessionPrintList = response.data;

        })
    }

    $scope.$watch('AccessionPrintList', function () {
        if (typeof ($scope.AccessionPrintList) === 'undefined') return;
        setTimeout(function () {
            $scope.PrintBarCode();
        }, 500)

    })
    $scope.$on('barcode', function () {
        JsBarcode(".barcode").init();
    });

    $scope.PrintBarCode = function () {
        var mywindow = window.open('', 'PRINT');

        mywindow.document.write('<html><head><title></title><meta charset="utf-8" /></head>');
        mywindow.document.write('<body>' + document.getElementById('Export').innerHTML + '</body>');
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();

        return true;
    }
}