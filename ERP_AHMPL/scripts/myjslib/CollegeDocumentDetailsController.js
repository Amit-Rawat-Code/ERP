app.CollegeDocumentDetailsController = function ($scope, $element, $filter, myService) {

    $scope.DocumentList = [];

    $scope.AddDocumentList = function () {
        $scope.DocumentList.push({
            SNo: "",
            DocumentCode: "",
            DocName: "",
            OriginalDoc: "",
            CopyDoc: "",
            OriginalDocPath: "",
            CopyDocPath: "",
            Remark: "",
        });
    };

    $scope.GetDocumentList = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getdata = myService.methode('POST', '../Api/CollegeAdmissionTransactionApi/GetCollegeDocumentDetail', collectionobj);
        getdata.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.DocumentList = response.data;
            }
        });
    }

    $scope.GetAllStudentList = function (StudentCode) {
        $scope.disabledSearch = true;
        $scope.hideloader = true;
        //debugger;
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.Action = 6;
        var getData = myService.methode('POST', "../Api/CollegeAdmissionTransactionApi/GetCollegeDocumentDetail", collectionobj);
        getData.then(function (response) {
            //debugger;
            $scope.StudentsList = response.data;
            if ($scope.StudentsList.length > 0) {
                /*setTimeout(function () {*/
                $scope.disabledSearch = false;
                $scope.hideloader = false;

                //}, 4000);
            }
            $scope.hideLoader();
            $scope.$applyAsync();
        });
    }

    $scope.setStudentName = function (student) {
        //debugger;
        $scope.SearchText = student.Name;
        $scope.StudentCode = student.StudentCode;
        $scope.Name = student.Name;
        $scope.FatherName = student.FatherName;
        $scope.Course = student.CollegeCourseName;
        $scope.CollegeUniversityRollNo = student.Rollno;
        $scope.Gender = student.Gender;
        if (student.CasteCategory == "GEN") {
            $scope.General = true;
        }
        else if (student.CasteCategory == "OBC") {
            $scope.OBC = true;
        }
        else if (student.CasteCategory == "SC") {
            $scope.SC = true;
        }
        else if (student.CasteCategory == "ST") {
            $scope.ST = true;
        }
        $scope.ContactNumber = student.ContactNo;
        $scope.YearlyIncome = student.AnnualIncome;
        $scope.HideStudentList();
        $scope.$applyAsync();
    }

    $scope.SaveRecord = function () {
        debugger
        var collectionobj = {};
        disableAdd = false;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.FatherName = $scope.FatherName;
        collectionobj.CourseName = $scope.Course;
        collectionobj.Rollno = $scope.CollegeUniversityRollNo;
        collectionobj.Gender = $scope.Gender;
        var a = "";
        if ($scope.General == true) {
            a = $("#chkGeneral").val();
        }
        else if ($scope.OBC == true) {
            a = $("#chkOBC").val();
        }
        else if ($scope.SC == true) {
            a = $("#chkSC").val();
        }
        else if ($scope.ST == true) {
            a = $("#chkST").val();
        }
        collectionobj.CasteCategory = a;
        collectionobj.MobileNo = $scope.ContactNumber;
        collectionobj.AnnualIncome = $scope.YearlyIncome;
        collectionobj.DocumentsPath = JSON.stringify($scope.DocumentList);
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UpdatedBy = JSON.parse(userid);
        collectionobj.CreatedBy = JSON.parse(userid);
        collectionobj.Action = 1;
        collectionobj.SubAction = 1;
        var getdata = myService.postmethode("POST", "../Api/CollegeAdmissionTransactionApi/InsertUpdateDeleteCollegeDocumentDetail", collectionobj, $scope.Attachments)
        getdata.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        })
    }

    $scope.Attachments = [];
    $scope.index = 0;
    $scope.$on("seletedFile", function (event, args) {
        //debugger
        var sum = 0;
        $scope.$apply(function () {
            //debugger
            if (args.file.type.contains("jpg") || args.file.type.contains("jpeg") || args.file.type.contains("bmp") || args.file.type.contains("png") || args.file.type.contains("pdf") || args.file.type.contains("mp4")) {

                $scope.Attachments[$scope.index] = args.file;

            }
            else {
                showMsgBox('Only .jpg|.jpeg|.bmp|.png|.pdf Files Accepted')
            }
        });
           
        });
    $scope.SetIndex = function (index) {
        $scope.index = index;
    }

    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    }
    $scope.started = function () {

        $scope.hdnMediaTransId = "";
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/CollegeAdmissionTransactionApi/GetCollegeDocumentDetail", collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr NO", "Value": "StudentCode", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Name", "Value": "Name", "HeaderValue": "Name", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father Name", "Value": "FatherName", "HeaderValue": "FatherName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Course Name", "HeaderValue": "CourseName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "RollNo", "Value": "RollNo", "HeaderValue": "RollNo", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Gender", "HeaderValue": "Gender", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "CasteCategory", "Value": "CasteCategory", "HeaderValue": "CasteCategory", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Contact No.", "HeaderValue": "ContactNo", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Annual Incoome", "HeaderValue": "YearlyIncoome", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsSamajKalyan", "Value": "IsSamajKalyan", "HeaderValue": "FatherName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "PRGenObc", "HeaderValue": "PRGenObc", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "FeeWaiveOff", "Value": "FeeWaiveOff", "HeaderValue": "FatherName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Domicile", "HeaderValue": "Domicile", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            $scope.DocumentDetailList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('tbody').on('dblclick', 'tr', function () {
                //debugger
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.DocumentDetailList = $filter('filter')($scope.DocumentDetailList, { 'StudentCode': $scope.hfId });
                $scope.SearchText = $scope.DocumentDetailList[0].Name;
                $scope.Name = $scope.DocumentDetailList[0].Name;
                $scope.FatherName = $scope.DocumentDetailList[0].FatherName;
                $scope.Course = $scope.DocumentDetailList[0].CourseName;
                $scope.CollegeUniversityRollNo = $scope.DocumentDetailList[0].Rollno;
                $scope.Gender = $scope.DocumentDetailList[0].Gender.trim();
                $scope.disabledSearch = true;
                var gen = $scope.DocumentDetailList[0].CasteCategory;
                if (gen.trim() == 'GEN') {
                    $scope.General = true
                }
                else if (gen == 'OBC') {
                    $scope.OBC = true
                }
                else if (gen == 'SC') {
                    $scope.SC = true
                }
                else if (gen == 'ST') {
                    $scope.ST = true
                }
                $scope.ContactNumber = $scope.DocumentDetailList[0].ContactNo;
                $scope.YearlyIncome = $scope.DocumentDetailList[0].YearlyIncoome;

                var collectionobj = {};
                collectionobj.Action = 7;
                collectionobj.StudentCode = $scope.hfId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', "../Api/CollegeAdmissionTransactionApi/GetCollegeDocumentDetail", collectionobj);
                getData.then(function (response) {
                    //debugger
                    $scope.DocumentDetailEditList = response.data;
                    $scope.DocumentList = [];
                    $scope.DocumentList = $scope.DocumentDetailEditList;
                    $scope.Save = "Update";
                    $scope.disableDelete = false;
                    $scope.$applyAsync();
                    $('.br-pageheader').fadeIn();
                    $('#collapseinputbox').fadeIn();
                    $('#CollapseSearchTableList').fadeOut();
                    $scope.hideLoader();
                });                
            });
        });
    }

    $scope.UploadFile = function (index) {
        //debugger
        var newIndex = $scope.GetClickIndex(index);
        var file = document.getElementById('FileOriginalUpld' + index).value;
        var docValue = document.getElementById('hdDc' + index).value;
        if (file != "") {
            //debugger
            var collectionobj = {};            
            collectionobj.Action = 1;
            collectionobj.SubAction = 2;
            collectionobj.DocumentCode = docValue;
            collectionobj.StudentCode = $scope.hfId;
            collectionobj.DocumentsPath = JSON.stringify($scope.DocumentList);
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.index = newIndex;
            var getdata = myService.postmethode("POST", "../Api/CollegeAdmissionTransactionApi/InsertUpdateDeleteCollegeDocumentDetail", collectionobj, $scope.Attachments)
            getdata.then(function (response) {
                if (response.data == '1') {
                    showMsgBox('999', 'File Upload', 'Successfull', 'success', "btn-success")
                    document.getElementById('FileOriginalUpld' + index).value = "";
                }
            })
        }
        else {
            showMsgBox("Please Choose File To Upload...");
        }
    }

    $scope.GetClickIndex = function (index) {
        var len = $scope.DocumentList.length;
        var counter = 0;
        for (var i = 0; i < len; i++) {
            if (document.getElementById('FileOriginalUpld' + i).value != "") {
                counter = counter + 1;
            }
            if ((counter - 1) == index) {
                return index;
                break;
            }            
        }
        return counter - 1;
    }

    $scope.ClearControl = function (flag) {
        //debugger
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("do u want to clear field?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {
        //debugger
        $scope.Save = "Save";
        $scope.SearchText = "";
        $scope.Name = "";
        $scope.FatherName = "";
        $scope.Course = "";
        $scope.CollegeUniversityRollNo = "";
        $scope.Gender = "";

        $scope.disabledSearch = false;
        $scope.General = false;
        $scope.OBC = false;
        $scope.SC = false;
        $scope.ST = false;
        $scope.ContactNumber = "";
        $scope.YearlyIncome = "";
        $scope.DocumentList = [];
        $scope.GetDocumentList();

        $scope.hfId = '';
        $('.dropify-clear').click();
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    }

    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.StudentCode = $scope.hfId;
        collectionobj.UpdatedBy = userid;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 3;
        var getData = myService.methode('POST', "/Api/CollegeAdmissionTransactionApi/InsertUpdateDeleteCollegeDocumentDetail", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
    $scope.GetImagePath = function (url) {
        //debugger
        if (url != null || url != '') {
            $scope.ImgUrl = url;
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            $('#myModal').modal('show');
        }        
    }
}