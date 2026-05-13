
//        //function getQueryStringValue (key) {
//        //    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.$", "i"), "$1"));
//        //}
//        $(document).ready(function () {
//            var qr = window.location.href;
//            if (qr.includes("request_token") == true) {
//                ShowAlertMessage(1, "Login with kite.");
//            }
//            //window.setInterval(function () { Notification(true); }, 5000);
//            $('#dvMsg').hide();
//            PaperTradeNotification();


//        });

//        $("#UserProfileBtn").on('click', function () {
//            $("#UserProfileModal").modal('show');
//        });

//        function getQueryStringValue(key) {
//            return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
//        }

//        function GetURLParameter() {
//            var sPageURL = window.location.href;
//            var indexOfLastSlash = sPageURL.lastIndexOf("/");

//            if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash)
//                return sPageURL.substring(indexOfLastSlash + 1);
//            else
//                return 0;
//        }
//        function Notification() {
//            $.ajax({
//                url: '/Home/GetNotificationLst',
//                type: 'GET',
//                success: function (data) {
//                    //popitup(html, "My Kite Login")
//                    // location.href = html;
//                    for (var i = 0; i < data.length; i++) {
//                        ShowAlertMessage(1, data[i].ScriptCode);
//                        //$('#innermsg').innerHtml = data[i].ScriptCode;
//                        //$('#dvMsg').show()

//                    }
//                },
//                error: function (error) {
//                    $(that).remove();
//                    DisplayError(error.statusText);
//                }
//            });
//        }


//function PaperTradeNotification() {
//            $.ajax({
//                url: '/Trade/GetTotalPaperTradeNotification',
//                type: 'GET',
//                success: function (data) {
//                    if (data != '0') {
//                        $("#PaperTradeNotificationCount").html(data);
//                        $(".zero").hide();
//                    }
//                    else {
//                        $("#PaperTradeNotificationCount").html('');
//                    }
//                    $("#PaperTradeNotificationCountLi").html("You Have Total " + data + " Notifications");

//                },

//                error: function (error) {

//                }
//            });
//        }

//        //function Kitelogin() {
//        //    $.ajax({
//        //        url: '/Home/KiteLogin',
//        //        type: 'GET',
//        //        success: function (html) {
//        //            //popitup(html, "My Kite Login")

//        //            debugger;
//        //            location.href = html;
//        //        },
//        //        error: function (error) {

//        //            debugger;
//        //            $(that).remove();
//        //            DisplayError(error.statusText);
//        //        }
//        //    });
//        //}
//        //function Kitelogout() {
//        //    $.ajax({
//        //        url: '/Home/KiteLogout',
//        //        type: 'GET',
//        //        success: function (html) {
//        //            //popitup(html, "My Kite Login")
//        //            // location.href = html;
//        //        },
//        //        error: function (error) {
//        //            $(that).remove();
//        //            DisplayError(error.statusText);
//        //        }
//        //    });
//        //}
//        function ShowAlertMessage(type, Message) {

//            //1:Success, 2:Error
//            var alertDiv = '#alertDiv' + type;
//            var alertMessage = '#alertMessage' + type;

//            //Set Message
//            Message = GetDefaultMessage(type, Message);
//            $(alertMessage).text(Message);

//            //Show Message
//            $(alertDiv).show();
//            $(alertDiv).fadeTo(2000, 500).slideUp(500, function () {
//                $(alertDiv).slideUp(500);
//            });

//        }
//        $('#btnKiteLogin').on('click', function () {
//            var url = $(this).attr("href");
//            var request = $.ajax({
//                url: url,
//                type: "GET",
//                data: {},
//                dataType: 'json',
//                traditional: true,
//                success: function (data) {
//                    var results = data;

//                    if (results == "") {
//                        $("#txtScript").val("");
//                        toastr.error("Please Update Your Details In Api Settings");
//                        return false;
//                    }
//                    else {
//                        var arr = url.split('/')
//                        if (arr[2] == 'KotakSecuritiesLogin') {
//                            toastr.success("Login Successfully");
//                        }
//                        else
//                            window.location.href = results;
//                        return;
//                    }
//                }
//            });
//            return false;
//        })
//        //$('#btnAngelBrokingLogin').on('click', function () {
//        //    var url = $(this).attr("href");
//        //    var request = $.ajax({
//        //        url: url,
//        //        type: "GET",
//        //        data: {},
//        //        dataType: 'json',
//        //        traditional: true,
//        //        success: function (data) {
//        //            var results = data;

//        //            if (results == "") {
//        //                $("#txtScript").val("");
//        //                //alert("Duplicate record.");
//        //                ShowAlertMessage(1, "Login Sccuessfully.");
//        //                return false;
//        //            }
//        //            else {
//        //                window.location.href = results;
//        //                return;
//        //            }
//        //        }
//        //    })
//        //    return false;
//        //})



//        $("#menuToggleButton").on('click', function () {
//            var data = localStorage.getItem('IsToggle');
//            if (data == null || data == '') {
//                localStorage.setItem('IsToggle', 'NO')
//            }
//            else if (data == 'NO') {
//                localStorage.setItem('IsToggle', 'YES')
//            }
//            else if (data == 'YES') {
//                localStorage.setItem('IsToggle', 'NO')
//            }
//        });
//        $(document).ready(function () {
//            var data = localStorage.getItem('IsToggle');
//            if (screen.width > 767) {

//                if (data == 'NO') {
//                    $('.sidebar-mini').addClass('sidebar-collapse');
//                }
//                else {
//                    $('.sidebar-mini').removeClass('sidebar-collapse');
//                }
//            }

//        });
//        $(window).on('resize', function () {
//            if (screen.width < 768) {
//                $('.sidebar-mini').removeClass('sidebar-collapse');
//            }
//            else {
//                var data = localStorage.getItem('IsToggle');
//                if (screen.width > 767) {
//                    if (data == 'NO') {
//                        $('.sidebar-mini').addClass('sidebar-collapse');
//                    }
//                    else {
//                        $('.sidebar-mini').removeClass('sidebar-collapse');
//                    }
//                }
//            }
//        });

$("Document").ready(function () {
    // Handles all submit buttons
    $(document).on('click', 'button[type=submit], button[type=button]', function (e) {
        var $btn = $(this);
        if ($btn.hasClass('processing')) return;

        $btn.addClass('processing');

        var originalHtml = $btn.html();
        $btn.data('original-html', originalHtml);

        var hasOnlyIcon = $btn.find('i').length > 0 && $.trim($btn.text()) === '';

        if (hasOnlyIcon) {
            $btn.html('<i class="fa fa-spinner fa-spin"></i>');
        } else {
            $btn.html('<i class="fa fa-spinner fa-spin"></i> Processing...');
        }

        // Disable clicks visually + logically for 2 seconds
        $btn.css('pointer-events', 'none');

        setTimeout(function () {
            $btn.removeClass('processing');
            $btn.html($btn.data('original-html'));
            $btn.css('pointer-events', 'auto');
        }, 2000);
    });

    (function updateMarketTime() {
        const el = document.querySelector('#Clock');
        function formatTime(date) {
            let h = date.getHours();
            const m = date.getMinutes().toString().padStart(2, '0');
            const s = date.getSeconds().toString().padStart(2, '0');
            const ampm = h >= 12 ? 'pm' : 'am';
            h = h % 12 || 12;
            return `${h.toString().padStart(2, '0')}:${m}:${s} ${ampm}`;
        }
        function tick() {
            const now = new Date();
            if (el) {
                el.textContent = `${formatTime(now)}`;
            }
        }
        tick(); // initial call
        setInterval(tick, 1000); // update every second
    })();

    if ($('table').length > 0) {
        // Loop through each table
        $('table').each(function () {
            // Check if the table is a DataTable
            if ($.fn.dataTable.isDataTable(this)) {
                // If it's a DataTable, initialize it
                var dataTable = $(this).DataTable();

                // Bind the 'draw.dt' event
                $(this).on('draw.dt', function () {
                    // Adjust columns and recalculate responsiveness
                    dataTable.columns.adjust().responsive.recalc();
                });
            }
        });
    }

    PaperTradeNotification();

    setInterval(PaperTradeNotification, 5000);





});
let previousFundCount = 0;
function PaperTradeNotification() {
    $.ajax({
        url: '/Trade/GetTotalPaperTradeNotification',
        type: 'GET',
        success: function (data) {
            if (data != '0') {
                $("#PaperTradeNotificationCount").html(data);
            }
            else {
                $("#PaperTradeNotificationCount").html('0');
            }
            $('#PaperTradeNotificationCount').html(`<div style="position: absolute;top: 13px;right: 0;background-color: blue;color: white;border-radius: 50%;padding: 5px 8px;font-size: 12px;">${data}</div>`);


        },

        error: function (error) {

        }
    });
    //$.ajax({
    //    url: '/Admin/FundInformationHistoryCount',
    //    type: 'GET',
    //    success: function (data) {

    //        let currentCount = parseInt(data.Count) || 0;

    //        $("#FundNotificationCount").html(currentCount);

    //        $('#FundNotificationCount').html(`
    //        <div style="position: absolute;top: 13px;right: 0;background-color: blue;color: white;border-radius: 50%;padding: 5px 8px;font-size: 12px;">
    //            ${currentCount}
    //        </div>
    //    `);

    //        // Show toastr only when count increases
    //        if (currentCount > previousFundCount) {

    //            toastr.options = {
    //                closeButton: true,
    //                progressBar: true,
    //                timeOut: 0,
    //                extendedTimeOut: 0,
    //                tapToDismiss: true,
    //                newestOnTop: true,
    //                positionClass: "toast-top-right",
    //                escapeHtml: false
    //            };

    //            // Create user list with <br>
    //            let usersHtml = "";

    //            if (data.Users && data.Users.length > 0) {
    //                usersHtml = data.Users.join("<br>");
    //            }

    //            toastr.info(`
    //            You have ${currentCount} pending fund requests
    //            <br><br>
    //            ${usersHtml}
    //        `);
    //        }

    //        previousFundCount = currentCount;
    //    },

    //    error: function (error) {

    //    }
    //});
    $.ajax({
        url: '/Admin/FundInformationHistoryCount',
        type: 'GET',
        success: function (data) {

            let currentCount = parseInt(data.Count) || 0;

            $('#FundNotificationCount').html(`
            <div style="
                position:absolute;
                top:13px;
                right:0;
                background-color:#0d6efd;
                color:white;
                border-radius:50%;
                padding:5px 8px;
                font-size:12px;">
                ${currentCount}
            </div>
        `);

            if (currentCount > previousFundCount) {

                toastr.options = {
                    closeButton: true,
                    progressBar: true,
                    timeOut: 0,
                    extendedTimeOut: 0,
                    tapToDismiss: true,
                    newestOnTop: true,
                    positionClass: "toast-top-right",
                    escapeHtml: false
                };

                let usersHtml = "";

                if (data.Users && data.Users.length > 0) {

                    usersHtml = data.Users.map((x, index) => {

                        let createdDate = new Date(x.Createddate);

                        let formattedDate =
                            createdDate.toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            }) +
                            ' ' +
                            createdDate.toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit'
                            });

                        return `
                        <div style="
                            padding:8px;
                            margin-bottom:8px;
                            border-bottom:1px solid #ddd;">

                            <div>
                                <b>${index + 1}. ${x.UserName}</b>
                            </div>

                            <div>${x.FullName}</div>

                            <div>
                                Amount: ₹${x.Amount}
                            </div>

                            <div>
                                ${formattedDate}
                            </div>
                        </div>
                    `;
                    }).join("");
                }

                toastr.success(`
                <div style="margin-bottom:10px;">
                    <b>You have ${currentCount} pending fund requests</b>
                </div>

                ${usersHtml}
            `);
            }

            previousFundCount = currentCount;
        }
    });
}
function getQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
function LiveLogin(data) {
    var url = $(data).attr("data-href");
    var request = $.ajax({
        url: url,
        type: "GET",
        data: {},
        dataType: 'json',
        traditional: true,
        success: function (data) {
            var results = data;

            if (results == "") {
                $("#txtScript").val("");
                toastr.error("Please Update Your Details In Api Settings");
                return false;
            }
            else {
                var arr = url.split('/')
                if (arr[2] == 'KotakSecuritiesLogin') {
                    toastr.success("Login Successfully");
                }
                else
                    window.location.href = results;
                return;
            }
        }
    });
    return false;
}
