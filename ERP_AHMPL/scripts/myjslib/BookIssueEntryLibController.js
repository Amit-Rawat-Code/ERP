app.BookIssueEntryLibController = function ($scope, $element, $filter, myService) {

    $scope.SetFocus('#txtAccessionNo');
    $scope.VDate = new Date();
    $scope.AddDay = function () {
        //debugger;
        if ($scope.IssuedDay != "") {
            if ($scope.IssuedDay > $scope.MaximumIssueDay) {
                $scope.IssuedDay = "";
                return showMsgBox("Maximum Issue Days : " + $scope.MaximumIssueDay);
            }            
            var dt = new Date($filter('date')($scope.VDate, "yyyy-MM-dd"));
            dt.setDate(dt.getDate() + $scope.checkNaN($scope.IssuedDay));
            $scope.ReturnDate = dt;
        }
    }

    angular.element(function () {
        $scope.GetMaximumIssueDay();
    });

    $scope.GetMaximumIssueDay = function () {
        var collectionobj = {};
        collectionobj.Action = 10;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;

        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetBookIssueEntryList", collectionobj);
        getData.then(function (response) {
            $scope.MaximumIssueDay = response.data[0].MaximumIssueDays;
            $scope.IssuedDay = $scope.MaximumIssueDay;
            $scope.AddDay();
        });
    }

    $scope.CalculateDay = function () {
        debugger;
        $scope.IssuedDay = "";
        if ($scope.IssuedDay == "" || $scope.IssuedDay == undefined) {
            var a = moment($scope.VDate, 'DD-MM-YYYY');
            var b = moment($scope.ReturnDate, 'DD-MM-YYYY');
            var days = b.diff(a, 'days');
            $scope.IssuedDay = days + 1;
        }
    }



    $scope.StudentClassSection = {
        StudentId: ''
    }
    $scope.StudentPanel = true;
    $scope.EmployeePanel = false;
    $scope.MemberTypeM = "Student";
    $scope.MemberType = function () {
        if (typeof ($scope.MemberTypeM) != "undefined") {

            if ($scope.MemberTypeM == "Student") {
                $scope.StudentPanel = true;
                $scope.EmployeePanel = false;
            } else {
                $scope.StudentPanel = false;
                $scope.EmployeePanel = true;
            }
        }
    };
    $scope.GetVoucherNoLibList(1);
    $scope.AccessionNo = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.AccessionNo = $scope.AccessionM;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetAccessionIDLib', collectionobj);
        getData.then(function (response) {
            if($scope.AccessionM == "" || $scope.AccessionM == undefined)
            {
                return showMsgBox("Please Enter Accession Number...");
            }
            if (response.data.length > 0) {
                //debugger;
                var CHeckStatus = response.data[0].Type;
                if (CHeckStatus == "A") {
                    $scope.hfBookcode = response.data[0].BookCode;
                    $scope.BookNameM = response.data[0].BookName;
                    $scope.hfAuthorCode = response.data[0].AuthorCode;
                    $scope.AuthorM = response.data[0].Author;
                    $scope.hfPublisherCode = response.data[0].PublisherCode;
                    $scope.PublisherM = response.data[0].Publisher;
                    $scope.BarIDM = response.data[0].BARID;
                }
                else if (CHeckStatus == "I") {
                    showMsgBox("This book is already Issued...");
                }
                else{
                    showMsgBox("This book is not available for some reason please check...");
                }
            }
            else {
                $scope.hfBookcode = "";
                $scope.BookNameM = "";
                $scope.hfAuthorCode = "";
                $scope.AuthorM = "";
                $scope.hfPublisherCode = "";
                $scope.PublisherM = "";
                $scope.BarIDM = "";
                showMsgBox("This book is not available");
            }
        });
    };

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        if (isValidate()) {
            //debugger;
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.TransId = $scope.hfId;
            collectionobj.V_Date = moment($scope.VDate, 'DD-MM-YYYY');
            collectionobj.MemberType = $scope.MemberTypeM;
            collectionobj.BookCode = $scope.hfBookcode;
            collectionobj.StudentCode = $scope.StudentCode;
            collectionobj.EmployeeCode = $scope.EmployeeCode;
            collectionobj.AccessionNo = $scope.AccessionM;
            collectionobj.BARID = $scope.BarIDM;
            collectionobj.Remark = $scope.RemarkM;
            collectionobj.ReturnDate = moment($scope.ReturnDate, 'DD-MM-YYYY');
            collectionobj.BookIssueDays = $scope.IssuedDay;
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

            var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBookIssueEntry", collectionobj);
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
        $scope.GetVoucherType("BKISS");
        $scope.GetVoucherNoLibList(1);
        $scope.VDate = new Date();
        $scope.ReturnDate = "";
        $scope.IssuedDay = "";
        $scope.hfId = "";
        $scope.MemberTypeM = "Student";
        $scope.MemberType();
        $scope.hfBookcode = "";
        $scope.StudentIDM = "";
        $scope.ScholarNoM = "";
        $scope.SearchText = "";
        $scope.StudentCode = "";
        $scope.SearchEmployeeText = "";
        $scope.EmployeeCode = "";
        $scope.EmployeeId = "";
        $scope.AccessionM = "";
        $scope.BookNameM = "";
        $scope.AuthorM = "";
        $scope.PublisherM = "";
        $scope.BarIDM = "";
        $scope.RemarkM = "";
        $scope.AdmissionNoM = "";
        $scope.ClassNameM = "";
        $scope.SetFocus('#ddlStudentName');
        $scope.StudentClassSection.StudentId = "";
        $('.dropify-clear').click();
        $scope.$applyAsync();
        $scope.BookIssueEntryList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.BookIssueEntryList = [];

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
        
        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetBookIssueEntryList", collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Issue Date", "Value": "VDate", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Issue No.", "Value": "PVNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Accession No.", "Value": "AccessionNo", "HeaderValue": "AccessionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student Name", "Value": "StudentCode", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employee Name", "Value": "EmployeetCode", "HeaderValue": "Employee", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            //debugger;
            $scope.BookIssueEntryList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                //debugger;
                $scope.BookIssueEntryList = $filter('filter')($scope.BookIssueEntryList, { 'TransID': $scope.hfId });
                $scope.VDate = new Date(moment(row[1], 'DD-MM-YYYY'));;
                $scope.PVNo = $(FindHtml(row[2])).val();
                $scope.MemberTypeM = $scope.BookIssueEntryList[0].MemberType;
                $scope.ReturnDate = new Date(moment($scope.BookIssueEntryList[0].ReturnDate, 'DD-MM-YYYY'));
                $scope.IssuedDay = $scope.BookIssueEntryList[0].BookIssueDays;
                if ($scope.MemberTypeM == "Student") {
                    $scope.StudentCode = $scope.BookIssueEntryList[0].StudentCode;
                    $scope.SearchText = $scope.BookIssueEntryList[0].StudentName;
                    $scope.StudentIDM = $scope.BookIssueEntryList[0].Student_ID;
                    $scope.AdmissionNoM = $scope.BookIssueEntryList[0].AdmissionNo;
                    $scope.ClassNameM = $scope.BookIssueEntryList[0].ClassName + ' - ' + $scope.BookIssueEntryList[0].SectionName;
                    $scope.StudentPanel = true;
                    $scope.EmployeePanel = false;
                }
                else if ($scope.MemberTypeM == "Employee") {
                    $scope.EmployeeCode = $scope.BookIssueEntryList[0].EmployeeCode;
                    $scope.EmployeeIDM = $scope.BookIssueEntryList[0].EmployeeID;
                    $scope.SearchEmployeeText = $scope.BookIssueEntryList[0].Employee;
                    $scope.StudentPanel = false;
                    $scope.EmployeePanel = true;
                }

                $scope.hfBookcode = $scope.BookIssueEntryList[0].BookCode;
                $scope.BookNameM = $scope.BookIssueEntryList[0].BookName;
                $scope.AccessionM = $scope.BookIssueEntryList[0].AccessionNo;
                $scope.AuthorM = $scope.BookIssueEntryList[0].Author;
                $scope.PublisherM = $scope.BookIssueEntryList[0].Publisher;
                $scope.BarIDM = $scope.BookIssueEntryList[0].BARID;
                $scope.RemarkM = $scope.BookIssueEntryList[0].Remark;
                $scope.Save = "Edit";
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
        collectionobj.TransId = $scope.hfId;
        collectionobj.BookCode = $scope.hfBookcode;
        collectionobj.AccessionNo = $scope.AccessionM;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.UpdatedBy = JSON.parse(userid);

        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteBookIssueEntry", collectionobj);
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
                { "HeaderText": "Issue Date", "Value": "VDate", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Issue No", "Value": "VendorCode", "HeaderValue": "VenderName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Accession No.", "Value": "BillNo", "HeaderValue": "BillNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Book Name", "HeaderValue": "BillDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.BookEntryList, window.document.title);
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
        $scope.AdmissionNoM = student.AdmissionNo;
        $scope.ClassNameM = student.ClassName + ' - ' + student.SectionName;
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

}