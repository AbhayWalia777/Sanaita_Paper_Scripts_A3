$(document).ready(function () {
	$('.select2').select2();
	$('#ScriptExchange').on('change', function () {
		ClearScript();
	});
});
function ClearScript() {
	$('#txtScript').val('');
	$('#ScriptCode').val('');
}


$("#txtScript").autocomplete({
	source: function (request, response) {
		var _ScriptExchange = $('#ScriptExchange').val();

		$.ajax({
			url: "/Watchlist/GetScriptList",
			type: "GET",
			dataType: "json",
			data: {
				Search: request.term,
				ScriptExchange: _ScriptExchange
			},
			success: function (data) {
				response($.map(data, function (item) {
					return {
						label: item.ScriptTradingSymbol,
						value: item.ScriptTradingSymbol,
						code: item.ScriptCode
					};
				}));
			}
		});
	},
	minLength: 2,
	select: function (event, ui) {
		$("#txtScript").val(ui.item.value);
		$("#ScriptCode").val(ui.item.code);

		console.log("Symbol:", ui.item.value);
		console.log("Code:", ui.item.code);

		return false;
	}
});
$(document).on("click", "#btnPlaceTrade", function () {

	var tradeDetails = {
		CurrentPosition: $("#CurrentPosition").val(),
		UserID: $("#UserID").val(),
		ProductType: $("#ProductType").val(),
		Quantity: $("#Quantity").val(),
		ScriptCode: parseInt($("#ScriptCode").val()) || 0,
		ScriptTradingSymbol: $("#txtScript").val(),
		ScriptExchange: $("#ScriptExchange").val()
	};

	console.log(tradeDetails);

	$.ajax({
		url: '/Trade/PlaceTradeManually',
		type: 'POST',
		data: tradeDetails,
		success: function (result) {

			if (result.IsError) {
				toastr.error(result.TypeName);
			} else {
				toastr.success(
					result.SuccessMessage ||
					result.TypeName ||
					"Trade placed successfully."
				);
			}
		},
		error: function (xhr, status, error) {
			console.error(error);
			toastr.error("Failed to place trade.");
		}
	});

});
