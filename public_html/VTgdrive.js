function myFunction() {
  document.getElementById("myDropdown")
    .classList.toggle("show");
}

function displayBatchScan() {
  phpFile = "json_test_db_post.php";
  changeTable(phpFile);
}
$(function() {
  function vtResults() {
    $.ajax({
      url: "api/1/files/scans",
      success: vt_success,
      dataType: "json"
    });
  }

  function vt_success(scanData) {
    console.dir(scanData);
    for (var i = 0; i < scanData.length; i++) {
      if ($('#' + scanData[i].fileId)
        .hasClass("results") == false) {
        if (scanData[i].scanned == 1) {
          var malicousLink = '<td><a target="blank" href="' +
            scanData[i].permalink;
          malicousLink += '"><i class="fas fa-bug"></i></a></td>';
          $('#' + scanData[i].fileId)
            .append(malicousLink);
          $('#' + scanData[i].fileId)
            .append('<td>' + scanData[i].scanDate + '</td>');
        } else {
          $('#' + scanData[i].fileId)
            .append('<td><i class="fab fa-searchengin"></i></td>');
          $('#' + scanData[i].fileId)
            .append('<td> TBD </td>');
        }
        $('#' + scanData[i].fileId)
          .addClass("results");
      }
    }
    setTimeout(vtResults, 2000);
  }

  function is_logged_in() {
    $.ajax({
      url: "api/1/user/loggedin",
      success: logged_data,
      dataType: "json"
    });
  }

  function logged_data(loginStatus) {
    if (loginStatus.loggedin == 1) {
      /* User is logged in already show them the menu */
      var dropDownMenu =
        `<button type="button" class="dropbtn" onclick="myFunction()" ><i class="fas fa-ellipsis-v"></i></button>
    <div class="dropdown-content" id="myDropdown"> 
            <!When user clicks this href the files that were batch scanned and stored in the DB will
            be called to the data table by the displayBatchScan() function.>
            <a id="scanDrive" href="#">Scan Joined Google Drive</a>
            <a href="#">Filename Exclusion Settings</a>
            <a href="#">MIME Exclusion Settings</a>
        </div>`;
      $('#contextMenu')
        .html(dropDownMenu);
      $('#scanDrive')
        .click(function() {
          $.ajax({
            url: "api/1/files",
            success: gd_success,
            dataType: "json"
          });
          $('#myDropdown')
            .toggle();
        });
      $('.dropbtn')
        .click(function() {
          $('#myDropdown')
            .toggle();
        });
    } else {
      /* User is not logged in show them register button */
      var loginButton =
        '<button id="registerDrive">Register</button>';
      $('#contextMenu')
        .html(loginButton);
      $('#registerDrive')
        .click(function(e) {
          e.preventDefault();
          window.location = "https://www.vtgdrive.us/authorize";
          is_logged_in();
        });
    }
  }

  function gd_success(driveData) {
    console.dir(driveData);
    for (var i = 0; i < driveData.length; i++) {
      var rowData = "<tr id=" + driveData[i].fileId + "><td>";
      rowData += driveData[i].fileName + '</td>';
      rowData += '<td>' + driveData[i].mimeType + '</td></tr>';
      $('#dataTable > tbody:last-child')
        .append(rowData);
    }
    setTimeout(vtResults, 1000);
  }
  window.onload = is_logged_in;
});

var userInput, phpFile;

function filenameSearch() {
  userInput = document.getElementById("searchbox")
    .value;
  phpFile = "filenameSearch.php";
  $.post(phpFile, {
    variable: userInput
  });
  changeTable(phpFile);
}

function md5Search() {
  userInput = document.getElementById("searchbox")
    .value;
  phpFile = "md5Search.php";
  $.post(phpFile, {
    variable: userInput
  });
  changeTable(phpFile);
}

function isMaliciousSearch() {
  phpFile = "isMaliciousSearch.php";
  changeTable(phpFile);
}
