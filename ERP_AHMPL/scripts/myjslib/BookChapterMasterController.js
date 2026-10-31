app.BookChapterMasterController = function ($scope, $element, $filter, myService)
{
    $scope.EntryDate = new Date();

    $scope.GetAllBookName = function ()
    {
        
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetBookChapterMaster', collectionobj);
        getData.then(function (response)
        {
            $scope.BookNameList = response.data;
        });
    };

    $scope.GetAllPublication = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.Code = $scope.NameOfBook;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetBookChapterMaster', collectionobj);
        getData.then(function (response) {           
            $scope.PublicationList = response.data;
            if ($scope.PublicationList.length > 0)
            {
                $scope.Publication = response.data[0].Code;
            }
        });
    };

    $scope.ChapterList = [];
    $scope.AddRow = function ()
    {
        $scope.ChapterList.push({
            Srno: "1",
            ChapterName: "",
        });
    }

    $scope.RemoveRow = function (srno)
    {
        $scope.ChapterList = $filter('filter')($scope.ChapterList, { Srno: '!' + srno });
    }

    /* Save Button Click Event */
    $scope.SaveRecord = function () {
        
        if (isValidate())
        {
            var collectionobj = {};
            collectionobj.ChapterData = JSON.stringify($scope.ChapterList);
            collectionobj.BookName = $scope.NameOfBook;
            collectionobj.Publication = $scope.Publication;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.EntryDate = $scope.EntryDate;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            if ($scope.Save == "Save")
            {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit")
            {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteBookChapterMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.ChapterMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function ()
    {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetBookChapterMaster', collectionobj);
        getData.then(function (response)
        {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Entry Date", "HeaderValue": "EntryDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Name of Book", "HeaderValue": "NameOfBook", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Publication", "HeaderValue": "Publication", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }

                ];

            $scope.ChapterMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ChapterMasterList = $filter('filter')($scope.ChapterMasterList, { 'Code': $scope.hfId }, true);
                $scope.ChapterMasterList = $scope.ChapterMasterList;
                $scope.EntryDate = $scope.ConverDate($scope.ChapterMasterList[0].EntryDate);
                $scope.NameOfBook = $scope.ChapterMasterList[0].BookCode;
                $scope.Publication = $scope.ChapterMasterList[0].PublicationCode;
                $scope.GetAllPublication();
                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/AssessmentApi/GetBookChapterMaster', collectionobj);
                getData.then(function (response)
                {
                    if (response.data.length>0)
                    {
                        $scope.ChapterList = response.data;
                    }
                });
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                //$scope.SetFocus('#ddlSession', true);
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
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteBookChapterMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };


    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };    
    $scope.ResetControl = function (flag)
    {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.ChapterMasterList = [];     
        $scope.ChapterList = [];
        $scope.NameOfBook ='';
        $scope.Publication = '';
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
}
