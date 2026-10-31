app.BookMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtName');
    $scope.DuplicateRecordSerials = [];
    $scope.FilteredExcelList = [];
    $scope.StockExcelList = [];
    $scope.StockExcelBookList = [];
    $scope.StockDataExcel = [];
    $scope.AuthorFlag = false;
    $scope.PublisherFlag = false;
    $scope.GroupFlag = false;
    $scope.SubjectFlag = false;
    $scope.EditionFlag = false;
    $scope.CategoryFlag = false;
    $scope.UnmatchedList = [];
    $scope.Message = "";
    $scope.totalDisplayed = 500;
    $scope.ProgressBarValue = 0;
    $scope.LoadMore = function () {
        $scope.showLoader();
        if ($scope.totalDisplayed + 500 > $scope.FilteredExcelList.length)
            $scope.totalDisplayed += $scope.totalDisplayed - $scope.FilteredExcelList.length;
        else
            $scope.totalDisplayed += 500;
        setTimeout(function () {
            $scope.hideLoader();
        }, 5000)
    };

    var FullPath = window.location.href;
    var path = window.location.pathname;
    $scope.ExcelPath = FullPath.replace(path, "/Content/ExcelFormat/ExcelForBook.xlsx");
    $scope.SelectImage = function (input, imgsource, scope) {
        //debugger;
        if (input.files && input.files[0]) {
            var filerdr = new FileReader();
            filerdr.onload = function (e) {
                $(imgsource).attr('src', e.target.result);
                $scope[scope] = e.target.result;
            }
            filerdr.readAsDataURL(input.files[0]);
        };
    };

    //List of Category of Library 
    $scope.GetEditionTypeLibList = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryMasterApi/GetEditionTypeLibList',collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.EditionTypeLibList = response.data;
            }
        });
    };
    //Get BookAcce Name Lib of Library 
    $scope.GetBookAcceNameLibList = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 9;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryMasterApi/GetBookAcceNameLibList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.BookAcceNameLibList = response.data;
            }
        });
    };
    //List of Author of Library 
    $scope.GetAuthorLibList = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryMasterApi/GetAuthorLibList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.AuthorLibList = response.data;
            }
        });
    };
    //List of Publisher of Library 
    $scope.GetPublisherLibList = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryMasterApi/GetPublisherLibList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.PublisherLibList = response.data;
            }
        });
    };
    //List of Subject Group of Library 
    $scope.GetSubjectGroupLibList = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryMasterApi/GetSubjectGrpLibList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.SubjectGrpLibList = response.data;
            }
        });
    };
    //List of Subject Group of Library 
    $scope.GetSubjectLibList = function (SubjectGroupId) {
        //debugger;
        if (SubjectGroupId == "")
            return;
        var collectionobj = {};
        collectionobj.Action = 10;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.SubjectGrpCode = SubjectGroupId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryMasterApi/GetSubjectLibList', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.SubjectLibList = response.data;
            }
            else {
                $scope.SubjectLibList = [];
            }
        });
    };
    //List of Category of Library 
    $scope.GetCategoryLibList = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryMasterApi/GetCategoryLibList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.CategoryLibList = response.data;
            }
        });
    };
    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.BooKName = $scope.BMName;
            collectionobj.Edition = $scope.Edition;
            collectionobj.EditionType = $scope.EditionType;
            collectionobj.PublisherYear = $scope.PublisherYear;
            collectionobj.Cost = $scope.Cost;
            collectionobj.NoOfPages = $scope.NoOfPages;
            collectionobj.NoOfCopies = $scope.NoOfCopies;
            collectionobj.BookAcceCode = $scope.BookAcceName;
            collectionobj.PublisherCode = $scope.PublisherName;
            collectionobj.AuthorCode = $scope.AuthorName;
            collectionobj.SubjectGrpCode = $scope.SubjectGrpName;
            collectionobj.SubjectCode = $scope.SubjectName;
            collectionobj.Topic = $scope.Topic;
            collectionobj.CategoryCode = $scope.CategoryName;
            collectionobj.Series = $scope.Series;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.BookPDFPath = $scope.BookPDfM;
            collectionobj.CoverPhotoPath = $scope.BookCoverPhotoM;

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

            var getData = myService.methode('POST', "../Api/LibraryMasterApi/InsertUpdateDeleteBookMaster", collectionobj);
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
        //debugger;
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.hfId = "";
        $scope.BMName = "";
        $scope.Edition = "";
        $scope.EditionType = "";
        $scope.PublisherYear = "";
        $scope.Cost = "";
        $scope.NoOfPages = "";
        $scope.NoOfCopies = "";
        $scope.BookAcceName = "";
        $scope.PublisherName = "";
        $scope.AuthorName = "";
        $scope.SubjectGrpName = "";
        $scope.SubjectName = "";
        $scope.Topic = "";
        $scope.CategoryName = "";
        $scope.Series = "";
        $scope.StockExcelList = [];
        $scope.FilteredExcelList = [];
        $scope.DuplicateRecordSerials = [];
        $scope.ProgressBarValue = 0;
        $scope.ProgressValue = 0;
        $scope.AuthorFlag = false;
        $scope.PublisherFlag = false;
        $scope.GroupFlag = false;
        $scope.SubjectFlag = false;
        $scope.EditionFlag = false;
        $scope.CategoryFlag = false;
        $scope.UnmatchedList = [];
        document.getElementById('fileUpload').value = "";
        $scope.IsActive = "";
        $scope.BookPDfM = "";
        $scope.BookCoverPhotoM = "";
        try {
            $('.dropify-clear').click();
            $('#a1').click();
        }
        catch (err) {
            console.log(err.message)
        }
        $scope.SetFocus('#txtName');
        $scope.BookList = [];
        $scope.SubjectLibList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.BookList = [];

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        //debugger;
        var getData = myService.methode('POST', "../Api/LibraryMasterApi/GetBookMasterList", collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Name", "HeaderValue": "BookName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Edition", "HeaderValue": "Edition", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Edition Type", "HeaderValue": "EditiionType", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" },
                    { "HeaderText": "Publisher Year", "HeaderValue": "PublisherYear", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Cost", "HeaderValue": "Cost", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "No Of Pages", "HeaderValue": "NoOfPages", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "No Of Copies", "HeaderValue": "NoOfCopies", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Book Accessories", "Value": "BookAccCode", "HeaderValue": "BookAccess", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Author", "Value": "AuthorCode", "HeaderValue": "Author", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Publisher", "Value": "PublisherCode", "HeaderValue": "Publisher", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject Group ", "Value": "SubjectGroupCode", "HeaderValue": "SubjectGroup", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject", "Value": "SubjectCode", "HeaderValue": "Subject", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Topic", "HeaderValue": "Topic", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Category", "Value": "Category", "HeaderValue": "Category", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Series", "HeaderValue": "Series", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }

                ];
            $scope.BookList = response.data;

            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                //debugger
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                //debugger;
                $scope.BookList = $filter('filter')($scope.BookList, { 'Code': $scope.hfId });

                $scope.BMName = row[1];
                $scope.Edition = row[2];
                $scope.EditionType = row[3];
                $scope.PublisherYear = row[4];
                $scope.Cost = row[5];
                $scope.NoOfPages = row[6];
                $scope.NoOfCopies = row[7];
                $scope.BookAcceName = $(FindHtml(row[8])).val();
                $scope.PublisherName = $(FindHtml(row[10])).val();
                $scope.AuthorName = $(FindHtml(row[9])).val();
                $scope.SubjectGrpName = $(FindHtml(row[11])).val();
                $scope.GetSubjectLibList($scope.SubjectGrpName);
                $scope.SubjectName = $(FindHtml(row[12])).val();
                // $(FindHtml(row[12])).val();
                $scope.Topic = row[13];
                $scope.CategoryName = $(FindHtml(row[14])).val();
                $scope.Series = row[15];
                $scope.IsActive = row[16] == "Yes" ? "true" : "false";
                $scope.BookCoverPhotoM = $scope.SetPhotoUrl($scope.BookList[0].CoverPhotoPath, '#imgBookCoverPhoto', '#fuBookCoverPhoto');
                $scope.BookPDfM = $scope.SetPhotoUrl($scope.BookList[0].BookPDFPath, '#imgBookPDf', '#fuBookPDf');
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtName', true);
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
        collectionobj.Code = $scope.hfId;
        collectionobj.UpdatedBy = JSON.parse(userid);

        var getData = myService.methode('POST', "../Api/LibraryMasterApi/InsertUpdateDeleteBookMaster", collectionobj);
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

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Name", "HeaderValue": "BookName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Edition", "HeaderValue": "Edition", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Edition Type", "HeaderValue": "EditiionType", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" },
                { "HeaderText": "Publisher Year", "HeaderValue": "PublisherYear", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Cost", "HeaderValue": "Cost", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "No Of Pages", "HeaderValue": "NoOfPages", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "No Of Copies", "HeaderValue": "NoOfCopies", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Book Accessories", "Value": "BookAccCode", "HeaderValue": "BookAccess", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Author", "Value": "AuthorCode", "HeaderValue": "Author", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Publisher", "Value": "PublisherCode", "HeaderValue": "Publisher", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Subject Group ", "Value": "SubjectGroupCode", "HeaderValue": "SubjectGroup", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Subject", "Value": "SubjectCode", "HeaderValue": "Subject", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Topic", "HeaderValue": "Topic", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Category", "Value": "Category", "HeaderValue": "Category", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Series", "HeaderValue": "Series", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No", "CssClass": "activeyn" }
            ];
        $scope.PrintMaster(tblheader, $scope.BookList, window.document.title);
    };
    $scope.ClickFunction = function () {
        $scope.$apply(function () {
            $scope.showLoader();
            this.value = null;
        })
    }
    $scope.loadFile = function (files) {
        //debugger
        
        $scope.$apply(function () {
            //debugger            
            
            $scope.selectedFile = files[0];
            var file = $scope.selectedFile;
            if (file) {
                var reader = new FileReader();
                reader.onloadstart = function () {
                    $scope.showLoader();
                }
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, { type: 'binary' });
                    var first_sheet_name = workbook.SheetNames[0];
                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);
                    if (dataObjects.length > 0) {
                        $scope.StockDataExcel = dataObjects;
                        $scope.sn = false;
                    }
                    else {
                        $scope.msg = "Error : Something Wrong !";
                    }
                }
                reader.onerror = function (ex) {

                }
                reader.onloadend = function () {
                    $scope.hideLoader();
                }
                reader.readAsBinaryString(file);
            }
            
        })        
    }
    $scope.result = [];
    $scope.ShowExcelRecords =function () {
        $scope.showLoader();
        $scope.StockExcelList = [];
        
        $scope.totalDisplayed = 500;

        $scope.IsExcelDataOk = true;
        $scope.TrimWhiteSpaces($scope.StockDataExcel);
        //$scope.StockExcelBookList = $scope.uniqueByKey($scope.StockExcelBookList, 'BookName');
        $scope.GetNewArray();
        $scope.StockExcelBookList = $scope.result;

        $.each($scope.StockExcelBookList, function (index, value) {
            $scope.StockExcelList.push({
                SrNo: (index + 1),
                BookName: value.BookName,
                EditionType: value.EditionType,
                AuthorName: value.AuthorName,
                PublisherName: value.PublisherName,
                Group: value.Group,
                Subject: value.Subject,
                Category: value.Category,
                Volume: value.Volume,
                color: ''
            });
        })
        $scope.CheckExcelRecords();
        //});
        
        $scope.$applyAsync();
    }

    $scope.GetNewArray =async function () {
       
        $scope.IsExcelDataOk = true;
        await angular.forEach($scope.StockExcelBookList, function (objStockDetailsList) {
            var cnt = 0;
            var StockDataExcelUD = objStockDetailsList.BookName + '_' + objStockDetailsList.EditionType + '_' + objStockDetailsList.AuthorName + '_' + objStockDetailsList.PublisherName + '_' + objStockDetailsList.Group + '_' + objStockDetailsList.Subject + '_' + objStockDetailsList.Category + objStockDetailsList.Volume;
            if ($scope.result.length > 0) {
                angular.forEach($scope.result, function (objresult) {
                    var objresultUD = objresult.BookName + '_' + objresult.EditionType + '_' + objresult.AuthorName + '_' + objresult.PublisherName + '_' + objresult.Group + '_' + objresult.Subject + '_' + objresult.Category + objresult.Volume;
                    if (StockDataExcelUD.toLowerCase() == objresultUD.toLowerCase()) {
                        cnt++;
                    }
                })
            }
            if (cnt == 0) {
                var BookName = objStockDetailsList.BookName;
                var EditionType = objStockDetailsList.EditionType;
                var AuthorName = objStockDetailsList.AuthorName;
                var PublisherName = objStockDetailsList.PublisherName;
                var Group = objStockDetailsList.Group;
                var Subject = objStockDetailsList.Subject;
                var Category = objStockDetailsList.Category;
                var Volume = objStockDetailsList.Volume;
                $scope.result.push({
                    BookName:BookName,
                    EditionType:EditionType,
                    AuthorName: AuthorName,
                    PublisherName: PublisherName,
                    Group: Group,
                    Subject: Subject,
                    Category: Category,
                    Volume: Volume
                });
            }
        })
        $scope.$applyAsync();
    };

    $scope.uniqueByKey = function (array, key) {
        $scope.res = [...new Map(array.map((x) => [x[key].toLowerCase(), x])).values()]
        setTimeout(function () {
            $scope.hideLoader();
        },1000)        
        return $scope.res;
    };
    
    $scope.ProgressValue = 0;
    $scope.CheckExcelRecords = async function () {
        $scope.Message2 = "";
        $scope.ProgressValue = 0;
        $scope.updateCounter1 = 0;
        SlicedData($scope.StockExcelList);
        $scope.count1 = 1;
        $scope.DuplicateRecordSerials = [];
        $scope.ExportData1 = $scope.ExportData;
        $scope.Upto = Math.floor($scope.ExportData1.length / $scope.increment);
        $scope.Upto = $scope.end + (($scope.ExportData1.length % $scope.increment) != 0 ? 1 : 0);
        for (var i = 0; i < $scope.Upto; i++) {
            var flag = await $scope.CheckExcelData(i).then(
                function (res) {
                    if (res) {
                        $scope.count1 += 1;
                        $scope.ProgressBarValue1 = ($scope.count1 * 100) / $scope.Upto;
                        $scope.ProgressValue = parseInt($scope.ProgressBarValue1);
                        if ($scope.updateCounter1 > 0) {
                            if ($scope.ProgressValue >= 100) {
                                $scope.ValidateExcelData();
                            }
                        }
                    }
                    return res;
                });
            if (!flag)
                break;
        }
        //$scope.scrollToBottom        
    }
    $scope.UploadExcelRecords = async function () {
        $scope.ProgressValue = 0;
        $scope.updateCounter = 0;
        $scope.start = 0;
        $scope.increment = 100;
        $scope.ExportData = [];        
        SlicedData($scope.FilteredExcelList);
        $scope.count = 1;

        for (var i = 0; i < $scope.ExportData.length; i++) {            
            var flag = await $scope.UploadExcelData(i).then(
                function (res) {
                    if (res) {
                        $scope.count += 1;
                        $scope.ProgressBarValue = ($scope.count * 100) / $scope.ExportData.length;
                        $scope.ProgressValue = parseInt($scope.ProgressBarValue);
                        if ($scope.ProgressValue >= 100) {
                            showMsgBox('999', '', 'Data Uploaded successfully.', 'success', 'btn-success');
                        }
                        
                    }
                    return res;
                });
            if (!flag)
                break;
        }
    };
  
    $scope.UploadExcelData = async function (index) {
        var existsData = ($filter('filter')($scope.FilteredExcelList, { color: "#e97b51" }, true)).length;
        var unmatchedData = ($filter('filter')($scope.FilteredExcelList, { color: "#e5bccd" }, true)).length;
        if (existsData + unmatchedData == 0) {
            var collectionobj = {};
            collectionobj.Action = 11;
            collectionobj.BookMasterExcelData = JSON.stringify($scope.ExportData[index]);
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = JSON.parse(userid);
            collectionobj.UpdatedBy = JSON.parse(userid);
            var getData = myService.methode('POST', "../Api/LibraryMasterApi/InsertUpdateDeleteBookMaster", collectionobj);
            return getData.then(function (response) {
                if (response.data.replace(/"/g, "") == "1") {
                    return true;
                }
                else {
                    showMsgBox(response.data)
                    return false;
                }
            });
        }
        else {
            showMsgBox("Please select Correct Data..")
            return false;
        }
        
    }

    $scope.CheckExcelData = async function (index) {
        var collectionobj = {};
        collectionobj.Action = 12;
        collectionobj.BookMasterExcelData = JSON.stringify($scope.ExportData1[index]);
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.CreatedBy = JSON.parse(userid);
        collectionobj.UpdatedBy = JSON.parse(userid);
        var getData = myService.methode('POST', "../Api/LibraryMasterApi/GetBookMasterList", collectionobj);
        return getData.then(function (response) {
            if ((index + 1) == $scope.ExportData1.length) {
                $scope.updateCounter1 = 1;
            }
            $scope.field = [];
            $scope.field = Object.keys(response.data[0]);
            if (response.data[0].SrNo != undefined) {
                $scope.GetErrorList(response.data);
                return true;
            }
            else {
                return true;
            }
        });
    }

    $scope.TrimWhiteSpaces = function (objectData) {
        $scope.StockExcelBookList = [];
        $.each(objectData, function (index, value) {
            $scope.StockExcelBookList.push({
                BookName: value.BookName == undefined ? '' : value.BookName.trim(),
                EditionType: value.EditionType == undefined ? '' : value.EditionType.trim(),
                AuthorName: value.AuthorName == undefined ? '' : value.AuthorName.trim(),
                PublisherName: value.PublisherName == undefined ? '' : value.PublisherName.trim(),
                Group: value.Group == undefined ? '' : value.Group.trim(),
                Subject: value.Subject == undefined ? '' : value.Subject.trim(),
                Category: value.Category == undefined ? '' : value.Category.trim(),
                Volume: value.Volume == undefined ? '' : value.Volume.trim()
            });
        })
    }

    $scope.ValidateExcelData = function () {
        $scope.FilteredExcelList = [];
        var n = $scope.DuplicateRecordSerials;
        $.each($scope.DuplicateRecordSerials, function (index, value) {
            if (value.FlagVal == 0) {
                $scope.StockExcelList[value.SrNo - 1].color = '#e97b51';
            }                
            if (value.FlagVal == 1) {
                $scope.StockExcelList[value.SrNo - 1].color = '#e5bccd';
            }                
        });
        if ($scope.UnmatchedList.length > 1) {
            $scope.Message2 = $scope.UnmatchedList.join(",");
        }
        else {
            $scope.Message2 = $scope.UnmatchedList.join("");
        }
        $scope.FilteredExcelList = $scope.StockExcelList;                
    }

    function GetHeaderList(HeaderList) {
        var tblheader = [];
        $.each(HeaderList, function (index, val) {
            if (index < HeaderList.length - 1) {
                var thtext = val.replace('"', '').replace('"', '')
                tblheader.push(
                    { "HeaderText": thtext, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                )
            }            
        });
        return tblheader;
    }

    $scope.ShowALL = function () {
        $scope.ProgressValue = 0;
        $scope.FilteredExcelList = [];
        $scope.FilteredExcelList = $filter('filter')($scope.StockExcelList);
    }
    $scope.ShowCorrerct = function () {
        $scope.ProgressValue = 0;
        $scope.FilteredExcelList = [];
        $scope.FilteredExcelList = $filter('filter')($scope.StockExcelList, { color: "" }, true);
    }
    $scope.ShowRed = function () {
        $scope.ProgressValue = 0;
        $scope.FilteredExcelList = [];
        $scope.FilteredExcelList = $filter('filter')($scope.StockExcelList, { color: "#e97b51" }, true);
    }
    $scope.ShowUnmatched = function () {
        $scope.ProgressValue = 0;
        $scope.FilteredExcelList = [];
        $scope.FilteredExcelList = $filter('filter')($scope.StockExcelList, { color: "#e5bccd" }, true);
    }    

    $scope.GetErrorList = function (ErrorSrNo) {
        for (var j = 0; j < ErrorSrNo.length; j++) {
            if (ErrorSrNo[j].UnmatchedType == "Author" && $scope.AuthorFlag == false) {
                $scope.UnmatchedList.push("Author");
                $scope.AuthorFlag = true;
            }
            if (ErrorSrNo[j].UnmatchedType == 'Publisher' && $scope.PublisherFlag == false) {
                $scope.UnmatchedList.push("Publisher");
                $scope.PublisherFlag = true;
            }                
            if (ErrorSrNo[j].UnmatchedType == 'Group' && $scope.GroupFlag == false) {
                $scope.UnmatchedList.push("Group");
                $scope.GroupFlag = true;
            }
            if (ErrorSrNo[j].UnmatchedType == 'Subject' && $scope.SubjectFlag == false) {
                $scope.UnmatchedList.push("Subject");
                $scope.SubjectFlag = true;
            }                
            if (ErrorSrNo[j].UnmatchedType == 'Edition' && $scope.EditionFlag == false) {
                $scope.UnmatchedList.push("Edition");
                $scope.EditionFlag = true;
            }                
            if (ErrorSrNo[j].UnmatchedType == 'Category' && $scope.CategoryFlag == false) {
                $scope.UnmatchedList.push("Category");
                $scope.CategoryFlag = true;
            }                
            $scope.DuplicateRecordSerials.push({
                SrNo: ErrorSrNo[j].SrNo,
                FlagVal: ErrorSrNo[j].UnmatchedType == "Book" ? 0 : 1
            });
        }
    }

    function SlicedData(ExcelListData) {
        $scope.start = 0;
        $scope.increment = 100;
        $scope.ExportData = [];
        //$scope.StockExcelList = $filter('filter')($scope.StockExcelList, { 'color': '' }, true);
        if (ExcelListData.length > 0) {
            $scope.end = Math.floor(ExcelListData.length / $scope.increment);
            $scope.end = $scope.end + ((ExcelListData.length % $scope.increment) != 0 ? 1 : 0);

            for (var j = $scope.start; j < $scope.end; j++) {
                $scope.obj = {};
                $scope.obj[j] = [];
                $scope.ExportData.push($scope.obj)
            };
            $scope.incrementStart = 0;
            $scope.incrementEnd = $scope.increment;

            for (var i = 0; i < $scope.ExportData.length; i++) {
                $scope.NestedArray = [];
                for (var j = $scope.incrementStart; j < $scope.incrementEnd; j++) {
                    if (ExcelListData[j] != null) {
                        $scope.NestedArray.push(ExcelListData[j]);
                    }
                }
                $scope.ExportData[i] = $scope.NestedArray;
                $scope.incrementStart = $scope.incrementEnd;
                $scope.incrementEnd = $scope.incrementEnd + $scope.increment;
            };
        }
        else {
            showMsgBox('999', '', 'Please Choose File...', 'warning', 'btn-warning');
        }
    }

    //$scope.scrollToBottom = function () {
    //    // set id of element you want to scroll
    //    $location.hash('body');
    //    $anchorScroll();
    //};
}