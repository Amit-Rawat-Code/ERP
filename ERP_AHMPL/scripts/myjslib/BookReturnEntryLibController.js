app.BookReturnEntryLibController = function ($scope, $element, $filter, myService) {

    $scope.SetFocus('#txtAccessionNo');
    $scope.VDate = new Date();

    $scope.AccessionWisePanel = true;
    $scope.StudentWisePanel = false;
    $scope.EmployeeWisePanel = false;
    $scope.StudentPanel = true;
    $scope.EmployeePanel = false;
    $scope.MemberTypeM = "Accession";
    $scope.MemberType = function () {
        if (typeof ($scope.MemberTypeM) != "undefined") {
            if ($scope.MemberTypeM == "Accession") {
                $scope.AccessionWisePanel = true;
                $scope.StudentWisePanel = false;
                $scope.EmployeeWisePanel = false;
                $scope.StudentPanel = true;
                $scope.EmployeePanel = false;
                $scope.BookListIssued = [];
                $scope.MemberTypeMM = "";
            }
            else if ($scope.MemberTypeM == "Student") {
                $scope.AccessionWisePanel = false;
                $scope.StudentWisePanel = true;
                $scope.EmployeeWisePanel = false;
                $scope.StudentPanel = false;
                $scope.EmployeePanel = false;
                $scope.BookListIssued = [];
                $scope.AccessionM = "";
                $scope.hfBookcode = "";
                $scope.hfAuthorCode = "";
                $scope.hfEmployeeCode = "";
                $scope.hfStudentCode = "";
                $scope.hfEmployeeCode = "";
                $scope.hfPublisherCode = "";
                $scope.BookNameM = "";
                $scope.AuthorM = "";
                $scope.PublisherM = "";
                $scope.StudentIDM = "";
                $scope.StudentNameM = "";
                $scope.EmployeeIDM = "";
                $scope.EmployeeNameM = "";
                $scope.BarIDM = "";
                $scope.LatePeriod = "";
                $scope.MemberTypeMM = "Student";
                $scope.LateFine = "";
            } else if ($scope.MemberTypeM == "Employee") {
                $scope.AccessionWisePanel = false;
                $scope.StudentWisePanel = false;
                $scope.EmployeeWisePanel = true;
                $scope.StudentPanel = false;
                $scope.EmployeePanel = false;
                $scope.BookListIssued = [];
                $scope.AccessionM = "";
                $scope.hfBookcode = "";
                $scope.hfAuthorCode = "";
                $scope.hfEmployeeCode = "";
                $scope.hfStudentCode = "";
                $scope.hfEmployeeCode = "";
                $scope.hfPublisherCode = "";
                $scope.BookNameM = "";
                $scope.AuthorM = "";
                $scope.PublisherM = "";
                $scope.StudentIDM = "";
                $scope.StudentNameM = "";
                $scope.EmployeeIDM = "";
                $scope.EmployeeNameM = "";
                $scope.BarIDM = "";
                $scope.LatePeriod = "";
                $scope.LateFine = "";
                $scope.MemberTypeMM = "Employee";
            }
            $scope.BookList = [];
        }
    };
    $scope.AccessionIssueNo = function () {
        //debugger;
        if ($scope.AccessionM == "" && $scope.AccessionM == undefined) {
            return;
        }
        else {
            var collectionobj = {};
            collectionobj.Action = 6;
            collectionobj.AccessionNo = $scope.AccessionM;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetAccessionIDIssueList', collectionobj);
            getData.then(function (response) {
                if (response.data.length > 0) {
                    //debugger;
                    $scope.hfMemberTypeM = "";
                    $scope.hfIssueId = response.data[0].TransID;
                    $scope.hfBookcode = response.data[0].BookCode;
                    $scope.BookNameM = response.data[0].BookName;
                    $scope.hfAuthorCode = response.data[0].AuthorCode;
                    $scope.AuthorM = response.data[0].Author;
                    $scope.hfPublisherCode = response.data[0].PublisherCode;
                    $scope.PublisherM = response.data[0].Publisher;
                    $scope.BarIDM = response.data[0].BARID;
                    $scope.hfIssuedDay = response.data[0].IssuedDay;
                    $scope.DueDate = new Date(moment(response.data[0].DueDate, 'DD-MM-YYYY'));
                    $scope.LatePeriod = response.data[0].LateDay;
                    $scope.LateFine = response.data[0].FineAmt;
                    $scope.MemberTypeMM = response.data[0].MemberType;
                    var Member = response.data[0].MemberType;
                    $scope.Cal();
                    if (Member == "Student") {
                        $scope.StudentPanel = true;
                        $scope.EmployeePanel = false;
                        $scope.hfMemberTypeM = "True";
                        $scope.StudentIDM = response.data[0].StudentId;
                        $scope.StudentNameM = response.data[0].StudentName;
                        $scope.hfStudentCode = response.data[0].StudentCode;
                        $scope.ScholarNoM = response.data[0].ScholarNumber;                        
                    } else if (Member == "Employee") {
                        $scope.StudentPanel = false;
                        $scope.EmployeePanel = true;
                        $scope.hfMemberTypeM = "False";
                        $scope.EmployeeIDM = response.data[0].EmployeeId;
                        $scope.EmployeeNameM = response.data[0].EmployeeName;
                        $scope.hfEmployeeCode = response.data[0].EmployeeCode;                       
                    }
                    $scope.GetBookDetails();
                }
                else if (response.data.length == 0) {
                    if ($scope.AccessionM != "" && $scope.AccessionM != undefined) {
                        showMsgBox("This book is not issued.!");
                    }
                    $scope.hfId = "";
                    $scope.hfIssueId = "";
                    $scope.hfIssuedDay = "";
                    $scope.MemberTypeMM = "";
                    $scope.hfBookcode = "";
                    $scope.BookNameM = "";
                    $scope.hfStudentCode = "";
                    $scope.hfEmployeeCode = "";
                    $scope.hfAuthorCode = "";
                    $scope.AuthorM = "";
                    $scope.hfPublisherCode = "";
                    $scope.PublisherM = "";
                    $scope.AccessionM = "";
                    $scope.StudentIDM = "";
                    $scope.StudentNameM = "";
                    $scope.LateDay = "";
                    $scope.BarIDM = "";
                    $scope.RemarkM = "";
                    $scope.EmployeeIDM = "";
                    $scope.EmployeeNameM = "";
                    $scope.hfMemberTypeM = "True";
                    $scope.StudentPanel = true;
                    $scope.EmployeePanel = false;
                    $scope.SetFocus('#txtAccessionNo');

                }

            });
        }
    };

    $scope.GetWriteOffDetails = function () {
        debugger;
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.AccessionNo = $scope.AccessionM;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetWriteOffDetails', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.WriteOffTypeList = response.data;
            }
        });
    };
    $scope.WriteOffTypeAmount = function () {
        debugger;
        $scope.WriteOffTypeAmt = $filter('filter')($scope.WriteOffTypeList, { 'WOTypeID': $scope.WriteOffTypeM })[0].FineAmt;
        $scope.$applyAsync();
    }
    $scope.Cal = function () {
        //debugger;
        $scope.TotalAmt = (($scope.checkNaN($scope.LateFineAmt) + $scope.checkNaN($scope.WriteOffTypeAmt)) - $scope.checkNaN($scope.DiscountAmt))
        $scope.$applyAsync();
    }    

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {
            debugger;
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.TransId = $scope.hfId;
            collectionobj.IssueTransId = $scope.hfIssueId;
            collectionobj.V_Date = $scope.VDate;
            collectionobj.MemberType = $scope.MemberTypeM;
            collectionobj.BookCode = $scope.hfBookcode;
            collectionobj.StudentCode = $scope.hfStudentCode;
            collectionobj.EmployeeCode = $scope.hfEmployeeCode;
            collectionobj.AccessionNo = $scope.AccessionM;
            collectionobj.ReturnDate = $scope.DueDate;
            collectionobj.IssuedDay = $scope.hfIssuedDay;
            collectionobj.BARID = $scope.BarIDM;
            collectionobj.Remark = $scope.RemarkM;
            collectionobj.LateDay = $scope.LateDay;
            collectionobj.LateFineAmt = $scope.LateFineAmt;
            collectionobj.WOTypeAmt = $scope.WriteOffTypeAmt;
            collectionobj.WOTypeID = $scope.WriteOffTypeM;
            collectionobj.DisAmt = $scope.DiscountAmt;
            collectionobj.TotalAmt = $scope.TotalAmt;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = JSON.parse(userid);
            collectionobj.UpdatedBy = JSON.parse(userid);
            collectionobj.BookList = JSON.stringify($scope.BookList);

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = 2;
            }

            var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBookReturnEntry", collectionobj);
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
        $scope.VoucherM = "";
        $scope.GetVoucherType("BKRET");
        $scope.GetVoucherNoLibList(2);
        $scope.VDate = new Date();
        $scope.DueDate = "";
        $scope.hfId = "";
        $scope.hfIssueId = "";
        $scope.hfIssuedDay = "";
        $scope.MemberTypeMM = "";
        $scope.MemberTypeM = "Accession";
        $scope.hfBookcode = "";
        $scope.BookNameM = "";
        $scope.hfStudentCode = "";
        $scope.hfEmployeeCode = "";
        $scope.hfAuthorCode = "";
        $scope.AuthorM = "";
        $scope.hfPublisherCode = "";
        $scope.PublisherM = "";
        $scope.AccessionM = "";
        $scope.StudentIDM = "";
        $scope.StudentNameM = "";
        $scope.LatePeriod = "";
        $scope.LateFine = "";
        $scope.EmployeeCode = "";
        $scope.StudentCode = "";
        $scope.WriteOffTypeAmt = "";
        $scope.WriteOffTypeM = "";
        $scope.DiscountAmt = "";
        $scope.TotalAmt = "";
        $scope.BarIDM = "";
        $scope.RemarkM = "";
        $scope.EmployeeIDM = "";
        $scope.EmployeeNameM = "";
        $scope.hfMemberTypeM = "True";
        $scope.StudentWisePanel = false;
        $scope.EmployeeWisePanel = false;
        $scope.AccessionWisePanel = true;
        $scope.BookListIssued = [];
        $scope.BookList = [];
        $scope.SearchEmployeeText = "";
        $scope.SearchText = "";
        $scope.SetFocus('#txtAccessionNo');
        $scope.$applyAsync();
        $scope.BookReturnEntryList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    };
    $scope.BookReturnEntryList = [];

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
        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetBookReturnEntryList", collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Return Date", "Value": "VDate", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Return No.", "Value": "PVNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Accession No.", "Value": "AccessionNo", "HeaderValue": "AccessionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Book Name", "Value": "BookCode", "HeaderValue": "BookName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            $scope.BookReturnEntryList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                debugger;
                $scope.BookReturnEntryList = $filter('filter')($scope.BookReturnEntryList, { 'TransID': $scope.hfId });
                $scope.VDate = new Date(moment(row[1], 'DD-MM-YYYY'));
                $scope.PVNo = $(FindHtml(row[2])).val();
                $scope.AccessionM = $(FindHtml(row[3])).val();

                var collectionobj = {};
                collectionobj.Action = 5;
                collectionobj.TransId = $scope.hfId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetBookReturnEntryList", collectionobj);
                getData.then(function (response) {
                    debugger;
                    $scope.hfIssueId = response.data[0].IssueTransID;
                    $scope.hfAuthorCode = response.data[0].AuthorCode;
                    $scope.AuthorM = response.data[0].Author;
                    $scope.hfPublisherCode = response.data[0].PublisherCode;
                    $scope.PublisherM = response.data[0].Publisher;
                    $scope.hfBookcode = response.data[0].BookCode;
                    $scope.BookNameM = response.data[0].BookName;
                    $scope.BarIDM = response.data[0].BARID;
                    $scope.MemberTypeM = response.data[0].MemberType;
                    $scope.DueDate = new Date(moment(response.data[0].DueDate, 'DD-MM-YYYY'));
                    $scope.hfIssuedDay = $scope.IssuedDay;
                    $scope.RemarkM = response.data[0].Remark;
                    $scope.LatePeriod = response.data[0].LateDay;                    
                    $scope.LateFine = response.data[0].LateFineAmt;
                    $scope.WriteOffTypeAmt = response.data[0].WOTypeAmt;
                    $scope.WriteOffTypeM = response.data[0].WOTypeID;
                    $scope.DiscountAmt = response.data[0].DisAmt;
                    $scope.TotalAmt = response.data[0].TotalAmt;
                    if ($scope.MemberTypeM == "Student") {
                        $scope.StudentPanel = true;
                        $scope.EmployeePanel = false;
                        $scope.hfMemberTypeM = "True";
                        $scope.StudentIDM = response.data[0].StudentId;
                        $scope.StudentNameM = response.data[0].StudentName;
                        $scope.hfStudentCode = response.data[0].StudentCode;
                        $scope.ScholarNoM = response.data[0].ScholarNumber;
                        $scope.MemberTypeMM = "Student";
                    } else if ($scope.MemberTypeM == "Employee") {
                        $scope.StudentPanel = false;
                        $scope.EmployeePanel = true;
                        $scope.hfMemberTypeM = "False";
                        $scope.EmployeeIDM = response.data[0].EmployeeId;
                        $scope.EmployeeNameM = response.data[0].EmployeeName;
                        $scope.hfEmployeeCode = response.data[0].EmployeeCode;
                        $scope.MemberTypeMM = "Employee";
                    }
                    
                });
                $scope.Save = "Edit";
                $scope.GetBookDetails();                
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlStudentName', true);
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

        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBookReturnEntry", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ResetControl();
                $scope.hideLoader();
            };
        });
    };

    $scope.GetAllStudentList = function (StudentCode) {
        $scope.disabledSearch = true;
        $scope.hideloader = true;
        //debugger;
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        /*collectionobj.ScholarNo = $scope.ScholarNoM;*/
        collectionobj.StudentId = $scope.StudentIDM;
        collectionobj.StudentCode = StudentCode;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = 5;
        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetStudentListLib", collectionobj);
        getData.then(function (response) {
            //debugger;
            $scope.StudentsListLib = response.data;
            if ($scope.StudentsListLib.length > 0) {
                /*setTimeout(function () {*/
                $scope.disabledSearch = false;
                $scope.hideloader = false;

                //}, 4000);
            }
            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }

    $scope.setStudentNameLib = function (student) {
        //debugger;
        $scope.SearchText = student.StudentName;
        $scope.StudentCode = student.StudentCode;
        $scope.StudentName = student.StudentName;
        $scope.StudentIDM = student.StudentId;
        $scope.ScholarNoM = student.ScholarNumber;
        $scope.HideStudentList();
        $scope.$applyAsync();
    }

    $scope.GetAllEmployees = function (action) {
        $scope.disabledSearch = true;
        $scope.hideloader = true;

        $scope.showLoader();
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = action

        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/SearchEmployees", collectionobj);
        getData.then(function (response) {

            $scope.EmployeeList = response.data;
            if ($scope.EmployeeList.length > 0) {
                setTimeout(function () {
                    $scope.disabledSearch = false;
                    $scope.hideloader = false;

                }, 100);
            }

            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }

    $scope.setEmployeeNameLib = function (employee) {


        $scope.SearchEmployeeText = employee.EmployeeName;
        $scope.EmployeeCode = employee.EmployeeCode;
        $scope.EmployeeName = employee.EmployeeName;
        $scope.EmployeeIDM = employee.EmployeeId;
        $scope.DepartmentName = employee.DepartmentName;
        $scope.DesignationName = employee.DesignationName;
        $scope.PresentAddress = employee.PresentAddress;
        $scope.FatherName = employee.FatherName;
        $scope.MotherName = employee.MotherName;
        $scope.ContactNo = employee.ContactNo;
        $scope.JoiningDate = employee.JoiningDate;
        $scope.EmployeePhoto = employee.EmployeePhoto;

        $scope.HideEmployeeList();
        //$scope.HideDiv=true;
        $scope.$applyAsync();
    }
    $scope.BookList = [];
    $scope.AddRow = function () {
        $scope.BookList.push({
            Srno: "",
            BookCode: "",
            BookName: "",
            StudentCode: "",
            EmployeeCode: "",
            IssueDate: "",
            ReturnDate: "",
            IssueNo: "",
            RelationshipId: "",
            IssueTransId: "",
            MemberType: "",
            AccessionNo: "",
            BARID: "",
            LateDay: "",
            FineAmt: ""
        });
    }
    $scope.GetBookDetails = function () {
        //debugger
        var collectionobj = {};
        $scope.Membercode = "";
        collectionobj.Action = '8';
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetBookReturnEntryList', collectionobj);
        getData.then(function (response) {
            debugger
            $scope.BookListIssued = response.data;
            if ($scope.Save == "Edit") {
                $scope.BookListIssued = $filter('filter')($scope.BookListIssued, { 'AccessionNo': $scope.AccessionM, 'Type': 'R' });
                $scope.AddBookByAcession();
            }
            else {
                if ($scope.MemberTypeM == 'Accession') {
                    $scope.BookListIssued = $filter('filter')($scope.BookListIssued, { 'AccessionNo': $scope.AccessionM,'Type':'I' });
                    $scope.AddBookByAcession();
                }
                if ($scope.MemberTypeM == "Student") {
                    $scope.BookListIssued = $filter('filter')($scope.BookListIssued, { 'StudentCode': $scope.StudentCode, 'Type': 'I' });
                }
                else if ($scope.MemberTypeM == "Employee") {
                    $scope.BookListIssued = $filter('filter')($scope.BookListIssued, { 'EmployeeCode': $scope.EmployeeCode, 'Type': 'I' });
                }
            }            

        });
    };

    $scope.AddBookList = function () {
        var cnt = 0;
        $scope.BookList = [];
        $.each($scope.BookListIssued, function (index, val) {
            //debugger            
            if (val.chk == true) {
                $scope.AddRow();
                $scope.BookList[cnt].Srno = (index + 1);
                $scope.BookList[cnt].BookCode = val.BookCode;
                $scope.BookList[cnt].BookName = val.BookName;
                $scope.BookList[cnt].StudentCode = val.StudentCode;
                $scope.BookList[cnt].EmployeeCode = val.EmployeeCode;
                $scope.BookList[cnt].IssueDate = val.IssueDate;
                $scope.BookList[cnt].ReturnDate = val.ReturnDate;
                $scope.BookList[cnt].IssueNo = val.IssueNo;
                $scope.BookList[cnt].RelationshipId = val.relationshipId;
                $scope.BookList[cnt].IssueTransId = val.IssueTransId;
                $scope.BookList[cnt].MemberType = val.MemberType;
                $scope.BookList[cnt].AccessionNo = val.AccessionNo;
                $scope.BookList[cnt].BARID = val.BARID;
                $scope.BookList[cnt].LateDay = val.LateDay;
                $scope.BookList[cnt].FineAmt = val.FineAmt;
                cnt = cnt + 1;
            }
        });
    }

    $scope.AddBookByAcession = function () {
        var cnt = 0;
        $scope.BookList = [];
        $.each($scope.BookListIssued, function (index, val) {
                $scope.AddRow();
                $scope.BookList[cnt].Srno = (index + 1);
                $scope.BookList[cnt].BookCode = val.BookCode;
                $scope.BookList[cnt].BookName = val.BookName;
                $scope.BookList[cnt].StudentCode = val.StudentCode;
                $scope.BookList[cnt].EmployeeCode = val.EmployeeCode;
                $scope.BookList[cnt].IssueDate = val.IssueDate;
                $scope.BookList[cnt].ReturnDate = val.ReturnDate;
                $scope.BookList[cnt].IssueNo = val.IssueNo;
                $scope.BookList[cnt].RelationshipId = val.relationshipId;
                $scope.BookList[cnt].IssueTransId = val.IssueTransId;
                $scope.BookList[cnt].MemberType = val.MemberType;
                $scope.BookList[cnt].AccessionNo = val.AccessionNo;
                $scope.BookList[cnt].BARID = val.BARID;
                $scope.BookList[cnt].LateDay = val.LateDay;
                $scope.BookList[cnt].FineAmt = val.FineAmt;
                cnt = cnt + 1;
        });
    }

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
                { "HeaderText": "Accession No.", "Value": "AccessionNo", "HeaderValue": "AccessionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Book Name", "Value": "BookCode", "HeaderValue": "BookName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.BookReturnEntryList, window.document.title);
    };                
}