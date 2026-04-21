        $(document).ready(function () {
            $('.classDate').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' })

            $('.classDate').datepicker({
                autoclose: true,
                useCurrent: true,
                todayHighlight: true,
                todayBtn: true,
            });
            var today = new Date();
            var date = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            date.setDate(date.getDate() - 30);
            dd = String(date.getDate()).padStart(2, '0');
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            var previousDay = mm + '/' + dd + '/' + yyyy;

            $('#rptStartDate').val(previousDay);
            $('#rptEndDate').val(today);

            GetData();

        });
        function GetData() {
            var req = {
                AdminId: $('#AdminId').val() , startDate: $('#rptStartDate').val(), endDate: $('#rptEndDate').val()
            }
            $.ajax({
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                url: '/Admin/GetViewUserData',
                data: JSON.stringify(req),
                success: function (response) {
                    var responseData = JSON.parse(response);
                    var tblTransaction = $('#tblList').DataTable(
                    );
                    tblTransaction.clear().draw();
                    tblTransaction.innerHTML = "";
                    var lstData = responseData;
                    _OpeningBalance = lstData[0].Openingwalletbalance;
                    for (var i = 0; i < lstData.length; i++) {
                        var result = lstData[i];
                        SetCompletedTradeDetails(result);
                    }
                },
                error: function (response) {
                    console.log(response.d);
                }

            });
        }
        function SetCompletedTradeDetails(item) {

var ViewAllUsers="";
if(item.TotalUsers!=0)
{
ViewAllUsers='<a href="/Admin/ViewUsers?AdminId=' + item.UserID + '"><button type="button" class="btn btn-warning btn-sm margin-right-5px">View Users<i class="fa fa-user-alt"></i></button> </a>';
}

            var netProfit = item.Totalloss + item.Totalprofit;
            var table = $('#tblList').DataTable().row.add([
                item.CreatedDateString,
                item.Fullname,
                item.Username,
                item.Sponsorid,
                item.Email,
                item.TotalUsers,
                item.RoleName,
                item.ExpiryDateString,
                netProfit,
                item.TotalBrokerage,
                item.Balance,
                item.IsActive,
                ViewAllUsers
            ]).order([0, 'desc']).draw();
        }

