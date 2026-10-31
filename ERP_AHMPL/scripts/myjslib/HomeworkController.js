app.HomeworkController = function ($scope, $element, $filter, myService)
{
    $scope.disableDelete = true;
    $scope.files = [];

    $scope.ddlClass_Change = function (Code) {
    
        $scope.BindEmpSection(Code);
    }

    $scope.Attachments = [];

    $scope.disableSubject = function () {
    
        if ($scope.IsAllSubject==1) {
            $scope.IndividualSubject = true;
        }
        else if ($scope.IsAllSubject == 0){
            $scope.IndividualSubject = false;
            
        }
    }
    
    $scope.index = 0;    
    $scope.$on("seletedFile", function (event, args) {
    
        var sum = 0;
        $scope.$apply(function () {
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

    $scope.AddRow = function () {

        if ($scope.Attachments.length == 10)
            showMsgBox("Maximum 10 attachments are allowed.");
        else {
            $scope.Attachments.push({ Attachment: "" })
        }
    }

    $scope.RemoveRow = function (index) {
        $scope.filterList = [];
        $.each($scope.Attachments, function (i, array) {
            if (i != index) {
                $scope.filterList.push(array)
            }
        })
        $scope.Attachments = $scope.filterList;
    }
   
    function checkShowdate() {
       
        var showdate = $('#txtHomeWorkShowDate').val();
        var hidedate = $('#txtHomeWorkHideDate').val();
        if (Date.parse(showdate) > Date.parse(hidedate)) {
            showMsgBox('Hide date not smallar to Show Date.');
            $('#txtHomeWorkHideDate').val("");
            $('#txtHidetime').val('');
        }
    }
    $scope.ddlSection_change = function (ClassCode, SectionCode) {
        
        $scope.BindSubjectList(ClassCode, SectionCode);
        $scope.BindStudentCode(ClassCode, SectionCode)

    };

    $scope.ddlSubject_change = function (ClassCode, SectionCode, Subjectcode) {

        $scope.BindStudentCode(ClassCode, SectionCode, Subjectcode)
    };

    $scope.BindSubjectList = function (ClassCode, SectionCode) {
      
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.ClassCode = ClassCode;
        collectionobj.SectionCode = SectionCode;
        collectionobj.SessionId = sessionId;
        collectionobj.EmployeeCode = userid;
        var getData = myService.methode('POST', '../Api/HomeworkApi/GetClassWiseSubject', collectionobj);
        getData.then(function (response) {
            
            $scope.SubjectList = response.data;
        });
    }

    $scope.BindStudentCode = function (ClassCode, SectionCode,SubjectCode) {
   
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.ClassCode = ClassCode;
        collectionobj.SectionCode = SectionCode;
        collectionobj.SubjectCode = SubjectCode;
        collectionobj.EmployeeId = userid;
        var getData = myService.methode('POST', "../Api/HomeworkApi/getAllStudent", collectionobj);
        getData.then(function (response) {
          
            $scope.records = response.data;
            
            $.each($scope.records, function (i, val) {

                val.chk = true;
            })
                                    
        });
        $scope.$applyAsync();
    };

    $scope.SaveRecord = function () {
        debugger
        $('#ddlSubject').removeClass('validate')
        if (isValidate()) {
            debugger
            var collectionobj = {};//StudentList
            $scope.StudentCodeList = [];
            var stringSplit = $('#hdngetstu').text().split(',');
            if ($scope.records.length > '0')
            {
                for (var i = 0; i < $scope.records.length; i++)
                {
                    $scope.StudentCodeList.push(
                        {
                            Srno: i + 1,
                            StudentCode: $scope.records[i].StudentCode,
                            chk: true
                        }
                    );
                    var $index = $scope.StudentCodeList.length - 1;
                    setTimeout(function () {
                        $('#txtSrno' + $index).focus();
                    }, 500);
                }
            }
         
    
            collectionobj.StudentCodeList = JSON.stringify($scope.StudentCodeList); 
            collectionobj.TransID = $scope.hfId;
            collectionobj.ClassCode = $scope.BindClass;
            collectionobj.SectionCode = $scope.BindSection;
            collectionobj.IsAllSubject = $scope.IsAllSubject;
            collectionobj.SubjectCode = $scope.BindSubject;
            collectionobj.HomeWorkDate = moment($scope.HomeWorkDate).format('YYYY-MMM-DD'); 
            collectionobj.ShowDate = moment($scope.ShowDate).format('YYYY-MMM-DD'); 
            collectionobj.EndDate = moment($scope.EndDate).format('YYYY-MMM-DD');
            collectionobj.VideoPath = $scope.VideoUrl;
            if (typeof ($scope.VideoEndDate) !== "undefined" && $scope.VideoEndDate != "") {
                collectionobj.VideoEndDate = moment($scope.VideoEndDate).format('YYYY-MMM-DD');
            }
            else {
                
                collectionobj.VideoEndDate = $scope.VideoEndDate;
            }
            collectionobj.Description = tinymce.get("TextEditor").getContent();
            collectionobj.Title = $scope.Topic;
            collectionobj.SubmissionRequired = $scope.IsSubmissionRequired;
            collectionobj.SessionId = sessionId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.FYId = fyId;

            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Update") {
                collectionobj.Action = "2";
            }
        
            var getData = myService.postmethode('POST', '../Api/HomeworkApi/InsertUpdateDeleteHomeworks', collectionobj, $scope.Attachments);
            getData.then(function (response) {

                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    }

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    }

    $scope.deleteRecord = function () {
        debugger
        var collectionobj = {};
        collectionobj.TransID = $scope.hfId;
        collectionobj.Action = 3;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', "../Api/HomeworkApi/InsertUpdateDeleteHomeworks", collectionobj,);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });

    }
    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    }
    $scope.ResetControl = function (flag) {
        $scope.BindClass = "";
        $scope.BindSection = "";
        $scope.BindSubject = "";
        $scope.Topic = "";
        $scope.HomeWorkDate = "";
        $scope.ShowDate = "";
        $scope.EndDate = "";
        $scope.VideoEndDate = "";
        $scope.IsSubmissionRequired = "";
        $scope.Attachments = [];
        $scope.AddRow();
        $scope.VideoUrl = "";
        tinymce.get("TextEditor").setContent("");
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.hfId = "";
        $scope.disableSub = false;
        $scope.SetFocus('#ddlClass');
        $scope.Attachment = "";
        
        if (flag == 0) {
            showMsgBox('4');
        };
    }

    $scope.HomeworkList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    }

    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', '../Api/HomeworkApi/GETHomeWork', collectionobj);
        getData.then(function (response) {
       
            $scope.HomeworkList = response.data;
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "20px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "50px;", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%;", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%;", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Title", "HeaderValue": "Title", "Width": "100%;", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Show Date", "HeaderValue": "ShowDate", "Width": "100%;", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "HomeWork Date", "HeaderValue": "HomeworkDate", "Width": "100%;", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "End Date", "HeaderValue": "EndDate", "Width": "100%;", "ShowColumn": "Yes", "ImageColumn": "No" }

                ];
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {

                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.HomeworkList = $filter('filter')($scope.HomeworkList, { 'TransId': $scope.hfId });
                $scope.BindClass = $scope.HomeworkList[0].ClassCode;
                $scope.GetSections($scope.BindClass);

                $scope.BindSection = $scope.HomeworkList[0].SectionCode;
                $scope.ddlClass_Change($scope.BindClass);
                $scope.BindSubject = $scope.HomeworkList[0].SubjectCode;

                $scope.ddlSection_change($scope.BindClass, $scope.BindSection);
                $scope.Title = $scope.HomeworkList[0].Title;
                $scope.ShowDate = new Date($scope.HomeworkList[0].ShowDate);
                $scope.HomeWorkDate = new Date($scope.HomeworkList[0].HomeworkDate);
                $scope.EndDate = new Date($scope.HomeworkList[0].EndDate);

                $scope.IsAllSubject = $scope.HomeworkList[0].IsAllSubject;

                $scope.Topic = $scope.HomeworkList[0].Title;
                $scope.VideoUrl = $scope.HomeworkList[0].VideoPath;
                $scope.VideoEndDate = new Date($scope.HomeworkList[0].VideoEndDate);
                $scope.IsSubmissionRequired = $scope.HomeworkList[0].SubmissionRequired ? "1" : "0";
                tinymce.get("TextEditor").setContent($scope.HomeworkList[0].Description);

                $scope.IsSearchBoxDisabled = true;
                $scope.Show = false;
                $scope.hideLoader();
                $scope.Save = "Update";
               
                $scope.$apply();
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlClass', true);
            });
    
        });
    }



    $scope.BindEmpClass = function () {
      
 
        var collectionobj = {};
        collectionobj.Action = "19";
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.EmployeeCode = userid;
        var getData = myService.methode('POST', "../Api/HomeworkApi/GetEmployeeClass", collectionobj);
        getData.then(function (response) {
          
            $scope.classRec = response.data;
        });
    }

    $scope.BindEmpSection = function (Code) {
     
        var collectionobj = {};
        collectionobj.Action = "20";
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.ClassCode = Code;
        collectionobj.EmployeeCode = userid;
        var getData = myService.methode('POST', "../Api/HomeworkApi/GetEmployeeSection", collectionobj);
        getData.then(function (response) {
            
            $scope.SecRec = response.data;
        });
    }
}





