function myFunction() {
    document.getElementById("myDropdown")
        .classList.toggle("show");
}

function displayBatchScan() {
    phpFile = "json_test_db_post.php";
    changeTable(phpFile);
}

function vtResults() {
    $.ajax({
        url: "api/1/files/scans",
        success: vt_success,
        dataType: "json"
    });
}

function vt_link_cell(vt_result) {
    let cell = document.createElement('td');
    if (vt_result.scanned == 1) {
        let malicousLink = document.createElement('a');
        malicousLink.href = vt_result.permalink; 
        malicousLink.target = "blank";
        malicousLink.appendChild(fa_icon('fa-bug'));
        cell.appendChild(malicousLink);
    } else {
        let scanLink = document.createElement('a');
        scanLink.href = "#"; 
        scanLink.appendChild(fa_icon('fa-search-plus'));
        cell.appendChild(scanLink);
    }
    return cell;
}

function vt_scan_date_cell(vt_result) {
    let cell = document.createElement('td');
    if (vt_result.scanned == 1) {
        cell.innerText = vt_result.scanDate; 
    } else {
        cell.innerText = "TBD";
    }
    return cell;
}

function vt_success(scanData) {
    console.dir(scanData);
    for (var i = 0; i < scanData.length; i++) {
        let vt_file = $('#' + scanData[i].fileId);
        if (vt_file.hasClass("hasResults") == false) {
            vt_file.append(vt_link_cell(scanData[i])); 
            vt_file.append(vt_scan_date_cell(scanData[i])); 
            vt_file.addClass("hasResults");
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

function fa_icon( fa_type ) {
    let fa_element = document.createElement('i');
    fa_element.className = "fas " + fa_type; 
    return fa_element;
}

function dropdown_menu() {
    let drop_menu_div = document.createElement('div');

    let dd_menu = document.createElement('button');
    dd_menu.className = "dropbtn";
    $(dd_menu).click(() => $('#myDropdown').toggle());
    dd_menu.appendChild(fa_icon('fa-ellipsis-v'));
    drop_menu_div.appendChild(dd_menu);

    let menu_items = document.createElement('div');
    menu_items.className = "dropdown-content";
    menu_items.id = "myDropdown";

    let scan_link = document.createElement('a');
    scan_link.id = "scanDrive";
    scan_link.href = "#";
    scan_link.className = "dd_item";
    scan_link.innerText = "Scan Joined Google Drive";
    $(scan_link)
        .click(function() {
            $.ajax({
                url: "api/1/files",
                success: gd_success,
                dataType: "json"
            });
        });
    menu_items.appendChild(scan_link);

    let exclusion_link = document.createElement('a');
    exclusion_link.id = "filenameExclusion";
    exclusion_link.href = "#";
    exclusion_link.className = "dd_item";
    exclusion_link.innerText = "Filename Exclusion Settings";
    menu_items.appendChild(exclusion_link);

    let mime_link = document.createElement('a');
    mime_link.id = "mimeExclusion";
    mime_link.href = "#";
    mime_link.className = "dd_item";
    mime_link.innerText = "MIME Exclusion Settings";
    menu_items.appendChild(mime_link);
    drop_menu_div.appendChild(menu_items);
    
    $(drop_menu_div).on('click', '.dd_item', () => $('#myDropdown').toggle());
    return drop_menu_div;
}

function logged_data(loginStatus) {
    if (loginStatus.loggedin == 1) {
        /* User is logged in already show them the menu */
        $('#contextMenu').html(dropdown_menu());
    } else {
        /* User is not logged in show them register button */
        let loginButton = document.createElement('button');
        loginButton.id = "registerDrive";
        loginButton.innerText('Register');
        $(loginButton).click(function(e) {
                e.preventDefault();
                window.location = "https://www.vtgdrive.us/authorize";
                is_logged_in();
            });
        $('#contextMenu').html(loginButton);
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

function run_on_load() {
    /* add functions here to run on page load */
    is_logged_in();
}

window.onload = run_on_load;

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
