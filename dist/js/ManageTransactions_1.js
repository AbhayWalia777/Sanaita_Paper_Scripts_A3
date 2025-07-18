﻿var myInterval,
    myInterval2,
    allowedTradingUnit,
    Companyinitials,
    marketDepthInterval,
    _WatchlistCurrentTabIndex = 0,
    _WatchListLength = 0,
    Completedpageno = 0,
    LastPriceDictionary = [],
    BtnIds = [],
    _WatchlistTotalPageNo = 0,
    _WatchlistCurrentPageNo = 1,
    _WatchlistPreviousTotalPageNo = 0,
    _isWatchlistCallBack = !1,
    _CompletedTotalPageNo = 0,
    _CompletedPreviousTotalPageNo = 0,
    _CompletedCurrentPageNo = 1,
    _CompletedCallBack = !1,
    _ActiveTotalPageNo = 0,
    _ActivePreviousTotalPageNo = 0,
    _ActiveCurrentPageNo = 1,
    _ActiveCallBack = !1,
    LevelLoginUser = 0,
    Current_Loop_Valueof_Watchlist = 0,
    convertMisToCncModal = $("#convertMisToCncModal");
function ConvertMISToCNC() {
    var e = $(convertMisToCncModal).find("input[Name=convertActiveTradeID]").val(),
        t = $(convertMisToCncModal).find("input[Name=convertStatus]").val(),
        a = $(convertMisToCncModal).find("input[Name=convertParam]").val(),
        r = $(convertMisToCncModal).find("input[Name=hdQty]").val();
    $.ajax({
        url: "/Trade/ConvertMisToCnc",
        type: "POST",
        data: { ID: e, actionParam: a, Status: t, Qty: r },
        dataType: "json",
        traditional: !0,
        success: function (e) {
            var t = JSON.parse(e);
            return toastr.success(t.exceptionDTO.Msg), !1;
        },
    }),
        $("#btnconvertMisToCnc").removeAttr("disabled"),
        $(convertMisToCncModal).modal("hide");
}
function convertButton(e, t, a, r, l) {
    $(convertMisToCncModal).find("input[Name=convertQty]").val(r),
        $(convertMisToCncModal).find("input[Name=hdQty]").val(r),
        $(convertMisToCncModal).find("input[Name=convertActiveTradeID]").val(e),
        $(convertMisToCncModal).find("input[Name=convertStatus]").val(a),
        $(convertMisToCncModal).find("input[Name=convertParam]").val(t),
        l ? $(convertMisToCncModal).modal("show") : confirm("Are you sure to square off?") && ConvertMISToCNC();
}
function DeleteActiveTrade(e, t) {
    confirm("Are you sure you want to delete?") &&
        $.ajax({
            url: "/Trade/DeleteActiveTrade?ID=" + e + "&UserID=" + t,
            type: "GET",
            async: !0,
            success: function (e) {
                null != e && toastr.success(e);
            },
        });
}
function SetActiveTradeDetails(e) {
    var t,
        a,
        r = "",
        l = $("#Role_Id").val();
    4 == l || 5 == l
        ? "CANCELED" != e.Status &&
        "REJECTED" != e.Status &&
        (r =
            '<button class="btn btn-primary btn-sm btn-Sell" href="javascript:void(0)" onclick="DeleteActiveTrade(' +
            e.ActiveTradeID +
            "," +
            e.UserID +
            ')" data-bind=' +
            e.ActiveTradeID +
            ' style="margin-left:5px;" ><i class="fa fa-trash-o"></i> </button> ')
        : (r = "");
    var i = "",
        o = "'" + e.TradeSymbol + "'",
        d = "'" + e.ScriptInstrumentType + "'",
        n = "'" + e.ProductType + "'",
        s = "'" + e.PriceType + "'",
        c = "'" + e.CurrentPosition.toString() + "'",
        p = "'" + e.Status.toString() + "'",
        T = "'" + e.ObjScriptDTO.ScriptExchange.toString() + "'",
        u = "",
        v = "",
        b = 1;
    "Manual" == e.Strategyname && (b = !0);
    var g = $("#Role_Id").val(),
        h = e.CurrentPosition,
        y = 2;
    1 == e.TRADING_UNIT_TYPE
        ? ((t = e.Qty / e.ObjScriptDTO.ScriptLotSize), (a = e.TRADING_UNIT))
        : ((a = e.TRADING_UNIT),
            (t =
                e.ObjScriptDTO.ScriptLotSize > 10 && "MCX" == e.ObjScriptDTO.ScriptExchange && (("EXPO" == e.COMPANY_INITIAL && 51 == e.TENANT_ID) || ("ASR" == e.COMPANY_INITIAL && 57 == e.TENANT_ID) || "RVERMA" == e.COMPANY_INITIAL)
                    ? e.Qty / (e.ObjScriptDTO.ScriptLotSize / 10)
                    : e.Qty));
    var S = "",
        f = "";
    "REJECTED" != e.Status.toUpperCase() &&
        ("Buy" == e.CurrentPositionNew && (y = 1),
            (S =
                ' <button class="btn btn-primary btn-sm" onclick="buySellPopUp(' +
                e.BuyQtyWiseOrLot +
                "," +
                e.ScriptCode +
                "," +
                y +
                "," +
                o +
                "," +
                e.WID +
                "," +
                e.OrderPrice +
                "," +
                d +
                "," +
                T +
                "," +
                t +
                "," +
                e.ObjScriptDTO.ScriptLotSize +
                "," +
                e.high +
                "," +
                e.low +
                "," +
                e.TriggerPrice +
                "," +
                e.SLNew +
                "," +
                e.TGNew +
                "," +
                s +
                "," +
                n +
                "," +
                e.ActiveTradeID +
                "," +
                p +
                "," +
                e.IsLive +
                ",'EDIT'," +
                e.TRADING_UNIT_TYPE +
                ')" type="button" style="margin-left:5px;" ><i class="fa fa-pencil"></i></button> '),
            (u = ' <button class="btn btn-primary btn-sm" onclick="SquareOff(' + e.ActiveTradeID + "," + c + "," + p + "," + t + "," + b + ')" type="button" style="margin-left:5px;">Sqr Off</button> '),
            (v = ' <button class="btn btn-danger btn-sm btn-Sell" onclick="SquareOff(' + e.ActiveTradeID + "," + c + "," + p + "," + t + "," + b + ')" type="button" style="margin-left:5px;">Sqr Off</button> '),
            "OPEN" != e.Status.toUpperCase() &&
            b &&
            (f = '<button class="btn btn-primary btn-sm btn-Sell" onclick="AddQty(' + e.ActiveTradeID + "," + c + "," + p + ')" type="button" style="margin-left:5px;"><i class="fa fa-plus"></i></button>'),
            "MIS" == e.ProductType &&
            (i =
                ' <button title="Convert MIS to CNC" class="btn btn-primary btn-sm" onclick="convertButton(' +
                e.ActiveTradeID +
                "," +
                c +
                "," +
                p +
                "," +
                t +
                "," +
                b +
                ')" type="button" style="margin-left:5px;"><i class="fa fa-exchange"></i></button> ')),
        "Buy" == e.CurrentPositionNew ? (h = v) : "Sell" == e.CurrentPositionNew && (h = u);
    var L = "";
    "REJECTED" == e.Status.toUpperCase() &&
        (L = '<button onclick = "DeleteRejectedTrade(' + e.ActiveTradeID + ')" type = "button" class="btn btn-warning btn-sm btn-delete" style="margin-left:5px;" > <i class="fa fa-trash-o"></i></button >'),
        "KT" == Companyinitials && (f = "");
    var m = S + "" + f + L + r + i;
    2 == parseInt(g) && !0 == e.IsCopyTradeFlag && ((m = "-"), (h = "-")),
        "FOREX" == e.Scripttype &&
        "RT" == $("#CompanyInitial").val() &&
        ((e.OrderPrice = e.OrderPrice.toFixed(5)),
            (e.TriggerPrice = e.TriggerPrice.toFixed(5)),
            (e.ObjScriptDTO.Lastprice = e.ObjScriptDTO.Lastprice.toFixed(5)),
            (e.Profitorloss = e.Profitorloss.toFixed(5)),
            (e.SL = e.SL.toFixed(5)),
            (e.TGT2 = e.TGT2.toFixed(5)));
    var P = e.Status,
        I = "";
    I = "#tblActiveTradeList";
    var C = "";
    C = 0 == e.BuyQtyWiseOrLot ? " " : " Unit";
    var M = parseFloat(e.TriggerPrice);

    var _Price = 0;
    if (e.CurrentPositionNew === "Buy") {
        _Price = e.LAST_PRICE_TYPE === 0 ? e.ObjScriptDTO.Bid : e.ObjScriptDTO.Lastprice;
    } else if (e.CurrentPositionNew === "Sell") {
        _Price = e.LAST_PRICE_TYPE === 0 ? e.ObjScriptDTO.Ask : e.ObjScriptDTO.Lastprice;
    }


    if (
        ($(I)
            .DataTable()
            .row.add([
                h,
                m,
                e.TradeSymbol,
                t,
                a,
                e.Email,
                e.CurrentPositionNew,
                e.OrderPrice,
                M,
                _Price,
                e.Profitorloss + `<input type="hidden" class="HdnActiveTradeId" value="${e.ActiveTradeID}"/>`,
                e.Status,
                e.SL,
                e.TGT2,
                e.TGT3,
                e.TGT4,
                e.OrderDate,
                e.OrderTime,
                e.ProductType,
                e.IsLive,
                e.Strategyname,
                e.Watchlistname,
                e.Publishname,
                e.Fundmanagername,
            ])
            .draw(),
            "COMPLETE" == P)
    )
        var D = document.getElementById("tblActiveTradeBody");
    else var D = document.getElementById("tblActiveTradeBody");
    for (var A = 0; A < D.rows.length; A++) {
        var x = parseFloat($(D.rows[A].cells[5]).text()),
            h = $(D.rows[A].cells[0]).text(),
            O = parseFloat($(D.rows[A].cells[11]).text()),
            k = parseFloat($(D.rows[A].cells[12]).text()),
            E = parseFloat($(D.rows[A].cells[10]).text());
        $(D.rows[A].cells[0]).text() == e.TradeSymbol &&
            (0 == e.ExpireDays
                ? $(D.rows[A].cells[0]).append('<br /><span style="font-size:10px;color:red;"><b>(Expired)</b></span>')
                : 4 != e.ExpireDays && $(D.rows[A].cells[0]).append('<br /><span style="font-size:10px;color:red;"><b>(Expires ' + e.ExpireDays + " days)</b></span>")),
            ((x >= O && O > 0 && "Buy" == h) || (x <= O && O > 0 && "Sell" == h)) && ($(D.rows[A].cells[8]).css("background-color", "#14a964"), $(D.rows[A].cells[8]).css("color", "white")),
            ((x >= k && k > 0 && "Buy" == h) || (x <= k && k > 0 && "Sell" == h)) && ($(D.rows[A].cells[9]).css("background-color", "#14a964"), $(D.rows[A].cells[9]).css("color", "white")),
            E >= 0 ? ($(D.rows[A].cells[10]).css("background-color", "green"), $(D.rows[A].cells[10]).css("color", "white")) : ($(D.rows[A].cells[10]).css("background-color", "red"), $(D.rows[A].cells[10]).css("color", "white"));
    }
}
function SetCompletedTradeDetails(e) {
    "TGT2" == e.Status ? (e.Status = "TARGET") : "TGT3" == e.Status ? (e.Status = "TARGET2") : "TGT4" == e.Status ? (e.Status = "TARGET3") : "SL" == e.Status && (e.Status = "STOPLOSS"),
        e.Completedtradeid,
        e.Completedtradeid,
        e.Completedtradeid;
    var t = e.Qty;
    if (((t = e.Qty / e.ScriptLotSize), 1 == e.BuyQtyWiseOrLot && "NFO" == e.ScriptExchange)) var t = e.Qty;
    "FOREX" == e.Scripttype &&
        "RT" == $("#CompanyInitial").val() &&
        ((e.Entryprice = e.Entryprice.toFixed(5)),
            (e.Exitprice = e.Exitprice.toFixed(5)),
            (e.ObjScriptDTO.Lastprice = e.ObjScriptDTO.Lastprice.toFixed(5)),
            (e.Profitorloss = e.Profitorloss.toFixed(5)),
            (e.Netprofitorloss = e.Netprofitorloss.toFixed(5))),
        $("#tblCompletedTradeList")
            .DataTable()
            .row.add([
                e.Completedtradeid,
                e.UserName,
                e.TradeSymbol,
                t,
                e.CurrentPosition,
                e.Entrytime,
                e.Entryprice,
                e.Exittime,
                e.Exitprice,
                e.Profitorloss,
                e.Brokerage,
                e.Netprofitorloss,
                e.Status,
                e.ProductType,
                e.IsLive,
                e.Strategyname,
                e.Watchlistname,
                e.Publishname,
                e.Fundmanagername,
            ])
            .order([0, "desc"])
            .draw();
    for (var a = document.getElementById("tblCompletedTradeList"), r = 0; r < a.rows.length; r++) {
        var l = $(a.rows[r].cells[11]).text();
        ("TARGET" == l || "TARGET2" == l || "TARGET3" == l) && ($(a.rows[r].cells[11]).css("background-color", "#14a964"), $(a.rows[r].cells[11]).css("color", "white")),
            "STOPLOSS" == l && ($(a.rows[r].cells[11]).css("background-color", "#d83824"), $(a.rows[r].cells[11]).css("color", "white"));
    }
}
function SetWatchTradeDetails(e) {
    var t = 0,
        a = 0,
        r = 0,
        l = "";
    for (var i in LastPriceDictionary)
        if (LastPriceDictionary[i].key == e.ScriptCode) {
            (t = parseFloat(LastPriceDictionary[i].value)), (a = parseFloat(LastPriceDictionary[i].Bid)), (r = parseFloat(LastPriceDictionary[i].Ask)), (l = LastPriceDictionary[i].color);
            break;
        }
    "FOREX" == e.Scripttype && "RT" == $("#CompanyInitial").val() && ((e.Lastprice = e.Lastprice.toFixed(5)), (e.Bid = e.Bid.toFixed(5)), (e.Ask = e.Ask.toFixed(5)));
    var o = "";
    parseFloat(e.Lastprice) > t && ((o = '<span class="lp">' + e.Lastprice + "</span>"), (l = "green")),
        parseFloat(e.Lastprice) < t && ((o = '<span class="lp">' + e.Lastprice + "</span>"), (l = "red")),
        e.Lastprice == t && (o = '<span class="lp">' + e.Lastprice + "</span>");
    var d = "";
    parseFloat(e.Bid) > a && (d = '<span class="green">' + e.Bid + "</span>"), parseFloat(e.Bid) < a && (d = '<span class="red">' + e.Bid + "</span>"), e.Bid == a && (d = '<span class="green">' + e.Bid + "</span>");
    var n = "";
    parseFloat(e.Ask) > r && (n = '<span class="green">' + e.Ask + "</span>"), parseFloat(e.Ask) < r && (n = '<span class="red">' + e.Ask + "</span>"), e.Ask == r && (n = '<span class="green">' + e.Ask + "</span>");
    var s = e.ScriptName.replace(/'/g, "");
    s = "'" + s + "'";
    var c = e.ScriptTradingSymbol.replace(/'/g, "");
    c = "'" + c + "'";
    var p = "'" + e.ScriptInstrumentType + "'",
        T = "'" + e.ScriptExchange.toString() + "'",
        u = "",
        v = "",
        b = "";
    "FOREX" == e.Scripttype
        ? (v = '<i style="color:green;font-weight:bold;" class="fa fa-angle-up">&nbsp&nbsp 0.00000 %</i>')
        : "BINANCE" != e.Scripttype
            ? !0 == $("#rdPercentage").prop("checked")
                ? (u = parseFloat(e.Lastprice) - parseFloat(e.close)) < 0
                    ? (v = '<i style="color:red;font-weight:bold;" class="fa fa-angle-down">&nbsp&nbsp&nbsp' + (b = (parseFloat(u) / parseFloat(e.close)) * 100).toFixed(5) + "&nbsp%</i>")
                    : u >= 0 && (v = '<i style="color:green;font-weight:bold;" class="fa fa-angle-up">&nbsp&nbsp&nbsp' + (b = (parseFloat(u) / parseFloat(e.close)) * 100).toFixed(5) + "&nbsp%</i>")
                : !0 == $("#rdAbsolute").prop("checked") &&
                ((u = parseFloat(e.Lastprice) - parseFloat(e.close)) < 0
                    ? (v = '<i style="color:red;font-weight:bold;" class="fa fa-angle-down">&nbsp&nbsp&nbsp' + u.toFixed(5) + "</i>")
                    : u >= 0 && (v = '<i style="color:green;font-weight:bold;" class="fa fa-angle-up">&nbsp&nbsp&nbsp' + u.toFixed(5) + "</i>"))
            : "BINANCE" == e.Scripttype &&
            (!0 == $("#rdPercentage").prop("checked")
                ? e.PerChange < 0
                    ? (v = '<i style="color:red;font-weight:bold;" class="fa fa-angle-down">&nbsp&nbsp&nbsp' + e.PerChange.toFixed(5) + "&nbsp%</i>")
                    : e.PerChange >= 0 && (v = '<i style="color:green;font-weight:bold;" class="fa fa-angle-up">&nbsp&nbsp&nbsp' + e.PerChange.toFixed(5) + "&nbsp%</i>")
                : !0 == $("#rdAbsolute").prop("checked") &&
                (e.ChangeInRupee < 0
                    ? (v = '<i style="color:red;font-weight:bold;" class="fa fa-angle-down">&nbsp&nbsp&nbsp' + e.ChangeInRupee.toFixed(2) + "</i>")
                    : e.ChangeInRupee >= 0 && (v = '<i style="color:green;font-weight:bold;" class="fa fa-angle-up">&nbsp&nbsp&nbsp' + e.ChangeInRupee.toFixed(2) + "</i>")));
    var g = "btnBuy" + e.ScriptCode,
        h = "btnSell" + e.ScriptCode,
        y = "btnMarketDepth" + e.ScriptCode,
        S = ' <button id="btnName' + e.ScriptCode + '" onclick="removeScript(' + e.ScriptCode + "," + e.WID + ')" type="button" class="btn btn-warning btn-sm btn-delete"><i class="fa fa-trash-o"></i></button> ',
        f =
            '<br/><div tabindex="-1" class="b-btn"><button id="' +
            g +
            '" onclick="buySellPopUp(0,' +
            e.ScriptCode +
            ",1," +
            s +
            "," +
            e.WID +
            "," +
            e.Lastprice +
            "," +
            p +
            "," +
            T +
            ",1," +
            e.ScriptLotSize +
            "," +
            e.high +
            "," +
            e.low +
            "," +
            e.Lastprice +
            ')" type="button" class="btn btn-success btn-sm btn-Buy"> B </button> ',
        L =
            '<button id="' +
            h +
            '" onclick="buySellPopUp(0,' +
            e.ScriptCode +
            ",2," +
            s +
            "," +
            e.WID +
            "," +
            e.Lastprice +
            "," +
            p +
            "," +
            T +
            ",1," +
            e.ScriptLotSize +
            "," +
            e.high +
            "," +
            e.low +
            "," +
            e.Lastprice +
            ')" type="button" class="btn btn-danger btn-sm btn-Sell"> S </button> ',
        m = " <button id=" + y + ' class="btn btn-primary btn-sm btn-depth" onclick="MarketDepthPop(' + e.ScriptCode + "," + c + ')" type="button"><i class="fa fa-bars"></i></button> </div>',
        P = '<input Name="hiddenCode" value="' + e.ScriptCode + '" type="hidden" >',
        I = '<input Name="Scripttype" value="' + e.Scripttype + '" type="hidden" >',
        C = f + L + S + m + P + I,
        M = $("#Role_Id").val();
    "RT" == Companyinitials && "2" == M && (C = P + I);
    var D = "";
    if (("" != e.Scriptexpiry && (D = '<span style="color: red;font-size: 13px;">Expires On : ' + e.Scriptexpiry.split(" ")[0] + "</span>"), $("#buySellModel #lblScriptCode").text() == e.ScriptCode.toString())) {
        var A = e.Lastprice.toString();
        $("#buySellModel #lblLastPrice").text(A), $("#buySellModel #lblLastBid").text(e.Bid), $("#buySellModel #lblLastAsk").text(e.Ask), $("#buySellModel #hdnPrice").val(A);
    }
    var x = "";
    (x = "FOREX" == e.Scripttype ? e.ScriptTradingSymbol + " / " + e.Scriptsegment : e.ScriptTradingSymbol),
        $("#tblWatchListTradeList")
            .DataTable()
            .row.add([x + C + D, o, v, e.BidQty, d, n, e.AskQty, e.open, e.high, e.low, e.close])
            .draw();
    var O = document.getElementById("tblWatchListTradeList");
    "green" == l ? $(O.rows[Current_Loop_Valueof_Watchlist + 1].cells[1]).css("background-color", "green") : $(O.rows[Current_Loop_Valueof_Watchlist + 1].cells[1]).css("background-color", "red"),
        $("#tblWatchListTradeList").removeClass("collapsed"),
        $("#tblWatchListTradeListBody > tr > td").addClass("padding-0px");
    var k = !1;
    for (var i in LastPriceDictionary) LastPriceDictionary[i].key == e.ScriptCode && ((k = !0), (LastPriceDictionary[i].value = e.Lastprice), (LastPriceDictionary[i].color = l));
    k || LastPriceDictionary.push({ key: e.ScriptCode, value: e.Lastprice, color: l, Bid: e.Bid, Ask: e.Ask });
    var E = !1;
    for (var i in BtnIds) BtnIds[i].BuyBtnId == g && (E = !0);
    E || BtnIds.push({ BuyBtnId: g, SellBtnId: h, DeleteBtnId: "btnName" + e.ScriptCode, MarketDepthBtnId: y });
}
$(document).keydown(function (e) {
    if (9 == e.keyCode)
        $("#buySellModel").hasClass("in") ||
            $("#MarketDepthModal").hasClass("in") ||
            ($("td").removeClass("hover"),
                _WatchlistCurrentTabIndex < _WatchListLength
                    ? $("#tblWatchListTradeListBody > tr:nth-child(" + (_WatchlistCurrentTabIndex += 1) + ") > td:nth-child(1)").addClass("hover")
                    : $("#tblWatchListTradeListBody > tr:nth-child(" + (_WatchlistCurrentTabIndex = 1) + ") > td:nth-child(1)").addClass("hover"));
    else if (40 == e.keyCode)
        $("#buySellModel").hasClass("in") ||
            $("#MarketDepthModal").hasClass("in") ||
            ($("td").removeClass("hover"),
                e.preventDefault(),
                _WatchlistCurrentTabIndex < _WatchListLength
                    ? $("#tblWatchListTradeListBody > tr:nth-child(" + (_WatchlistCurrentTabIndex += 1) + ") > td:nth-child(1)").addClass("hover")
                    : $("#tblWatchListTradeListBody > tr:nth-child(" + (_WatchlistCurrentTabIndex = 1) + ") > td:nth-child(1)").addClass("hover"));
    else if (38 == e.keyCode)
        $("#buySellModel").hasClass("in") || $("#MarketDepthModal").hasClass("in")
            ? $("#price").is(":focus") || $("#txtStopLoss").is(":focus") || $("#txtTarget").is(":focus") || !document.getElementById("rbtnLimit").checked
                ? $("#TriggerPrice").is(":focus") ||
                $("#txtTarget").is(":focus") ||
                $("#txtStopLoss").is(":focus") ||
                (!document.getElementById("rbtnSL").checked && !document.getElementById("rbtnSLM").checked) ||
                (e.preventDefault(), $("#TriggerPrice").focus())
                : (e.preventDefault(), $("#price").focus())
            : (e.preventDefault(),
                _WatchlistCurrentTabIndex > 1
                    ? ($("td").removeClass("hover"), $("#tblWatchListTradeListBody > tr:nth-child(" + (_WatchlistCurrentTabIndex -= 1) + ") > td:nth-child(1)").addClass("hover"))
                    : ($("td").removeClass("hover"), $("#tblWatchListTradeListBody > tr:nth-child(" + (_WatchlistCurrentTabIndex = _WatchListLength) + ") > td:nth-child(1)").addClass("hover")));
    else if (112 == e.keyCode) {
        if ((e.preventDefault(), _WatchlistCurrentTabIndex > 0)) {
            var t = BtnIds[_WatchlistCurrentTabIndex - 1].BuyBtnId;
            $("#" + t).trigger("click"), $("#MarketDepthModal").modal("hide"), $("#CompletedTradeModal").modal("hide");
        }
    } else if (113 == e.keyCode) {
        if ((e.preventDefault(), _WatchlistCurrentTabIndex > 0)) {
            var t = BtnIds[_WatchlistCurrentTabIndex - 1].SellBtnId;
            $("#" + t).trigger("click"), $("#MarketDepthModal").modal("hide"), $("#CompletedTradeModal").modal("hide");
        }
    } else if (46 == e.keyCode) {
        if (_WatchlistCurrentTabIndex > 0) {
            e.preventDefault();
            var t = BtnIds[_WatchlistCurrentTabIndex - 1].DeleteBtnId;
            $("#" + t).trigger("click");
        }
    } else if (114 == e.keyCode) e.preventDefault(), $("html, body").animate({ scrollTop: $("#tblActiveTradeList").offset().top }, 2e3);
    else if (115 == e.keyCode) e.preventDefault(), $("#btnMoreInfoCompletedTrade2").trigger("click"), $("#buySellModel").modal("hide"), $("#MarketDepthModal").modal("hide");
    else if (116 == e.keyCode) {
        if ((e.preventDefault(), _WatchlistCurrentTabIndex > 0)) {
            var t = BtnIds[_WatchlistCurrentTabIndex - 1].MarketDepthBtnId;
            $("#" + t).trigger("click"), $("#buySellModel").modal("hide"), $("#CompletedTradeModal").modal("hide");
        }
    } else 27 == e.keyCode && (e.preventDefault(), $("#buySellModel").modal("hide"), $("#CompletedTradeModal").modal("hide"), $("#MarketDepthModal").modal("hide"));
}),
    $(document).ready(function () {
        (Companyinitials = $("#CompanyInitial").val()),
            (LevelLoginUser = $("#LevelLoginUser").text()),
            SetTradeData(),
            $("#tblActiveTradeList").DataTable({ paging: !1, lengthChange: !1, info: !1, responsive: false, scrollX: true }),
            $("#tblCompletedTradeList").DataTable({ paging: !1, lengthChange: !1, order: [[5, 0, "desc"]], info: !1 }),
            $("#tblWatchListTradeList").DataTable({ paging: !1, lengthChange: !1, processing: !0, ordering: !1, responsive: !0 }),
            $(".select2").select2(),
            (myInterval2 = setInterval(function () {
                SetWalletBalance();
            }, 1e3)),
            $("input[Name=MarketType]").on("click", function (e) {
                var t = $(e.currentTarget).val(),
                    a = $("#hdnPrice").val(),
                    r = $("#hdnPrice").val();
                $("#txtTarget").removeAttr("disabled"),
                    $("#txtTarget").removeAttr("readonly"),
                    $("#txtStopLoss").removeAttr("disabled"),
                    $("#txtStopLoss").removeAttr("readonly"),
                    "Limit" == t
                        ? ($("#buySellModel #price").removeAttr("disabled"),
                            $("#buySellModel #price").removeAttr("readonly"),
                            $("#buySellModel #price").val(a),
                            $("#buySellModel #TriggerPrice").val("0"),
                            $("#buySellModel #TriggerPrice").attr("disabled", "disabled"))
                        : "SL" == t
                            ? ($("#buySellModel #price").removeAttr("disabled"),
                                $("#buySellModel #price").removeAttr("readonly"),
                                $("#buySellModel #price").val(a),
                                $("#buySellModel #TriggerPrice").val(r),
                                $("#buySellModel #TriggerPrice").removeAttr("disabled"),
                                $("#buySellModel #TriggerPrice").removeAttr("readonly"))
                            : "SL-M" == t
                                ? ($("#buySellModel #TriggerPrice").removeAttr("disabled"),
                                    $("#buySellModel #TriggerPrice").removeAttr("readonly"),
                                    $("#buySellModel #TriggerPrice").val(r),
                                    $("#buySellModel #price").val("0"),
                                    $("#buySellModel #price").attr("disabled", "disabled"),
                                    $("#txtTarget").attr("disabled", "disabled"),
                                    $("#txtTarget").attr("readonly", "readonly"),
                                    $("#txtStopLoss").attr("disabled", "disabled"),
                                    $("#txtStopLoss").attr("readonly", "readonly"))
                                : "MARKET" == t &&
                                ($("#buySellModel #price").val("0"),
                                    $("#buySellModel #price").attr("disabled", "disabled"),
                                    $("#buySellModel #price").attr("readonly", "readonly"),
                                    $("#buySellModel #TriggerPrice").val("0"),
                                    $("#buySellModel #TriggerPrice").attr("disabled", "disabled"),
                                    $("#buySellModel #TriggerPrice").attr("readonly", "readonly"));
            });
    });
var pageno = 0;
function removeScript(e, t) {
    confirm("Are you sure you want to delete?") &&
        e > 0 &&
        t > 0 &&
        $.ajax({
            url: "/Watchlist/DeleteScript",
            type: "POST",
            data: { intWID: t, ScriptCode: e },
            dataType: "json",
            traditional: !0,
            success: function (t) {
                return JSON.parse(t).IsError
                    ? (toastr.error("Can Not Delete This Record.There Is One Active Trade."), !1)
                    : ($("#tblList")
                        .DataTable()
                        .row($("#btnName" + e).parents("tr"))
                        .remove()
                        .draw(!1),
                        toastr.success("Script Deleted Successfully."),
                        !1);
            },
        });
}
function SetWalletBalance() {
    $.ajax({
        url: "/Admin/GetBalance",
        type: "GET",
        dataType: "json",
        async: !0,
        success: function (e) {
            $("#WalletBalance").text(e);
        },
    });
}
function SetTradeData() {
    try {
        var e = "";
        (e = !0 == $("#rdAll").prop("checked") ? { tradetype: 0 } : !0 == $("#rdLive").prop("checked") ? { tradetype: 1 } : { tradetype: 2 }),
            $.ajax({
                url: "/Trade/GetDataManageTransaction",
                type: "GET",
                data: e,
                dataType: "json",
                traditional: !0,
                success: function (e) {
                    SetResult(e),
                        (myInterval = setInterval(function () {
                            SetTradeDataForRefresh();
                        }, 1e3));
                },
            });
    } catch (t) {
        toastr.error("Error On SetTradeData.");
    }
}
function SetTradeDataForRefresh() {
    try {
        var e = $("#watchlistHiddenId").val(),
            t = $("#cboScriptExchange option:selected").val();
        if ("--Select--" != $("#UserIds option:selected").text())
            var a = $("#UserIds").val(),
                r = "0";
        if ((1 == LevelLoginUser || 2 == LevelLoginUser) && "--Select--" != $("#AdminIds option:selected").text())
            var a = $("#AdminIds").val(),
                r = "1";
        if ((1 == LevelLoginUser || 2 == LevelLoginUser || 3 == LevelLoginUser) && "--Select--" != $("#BrokerIds option:selected").text())
            var a = $("#BrokerIds").val(),
                r = "1";
        if (4 == LevelLoginUser && "--Select--" != $("#UserIds option:selected").text())
            var a = $("#UserIds").val(),
                r = "1";
        var l = "";
        (l =
            !0 == $("#rdAll").prop("checked")
                ? { tradetype: 0, WID: e, scriptExchangeType: t, WatchListPage: _WatchlistCurrentPageNo, CompletedListPage: _CompletedCurrentPageNo, ActiveTradePage: _ActiveCurrentPageNo, UserID: a, IsAdmin: r }
                : !0 == $("#rdLive").prop("checked")
                    ? { tradetype: 1, WID: e, scriptExchangeType: t, WatchListPage: _WatchlistCurrentPageNo, CompletedListPage: _CompletedCurrentPageNo, ActiveTradePage: _ActiveCurrentPageNo, UserID: a, IsAdmin: r }
                    : { tradetype: 2, WID: e, scriptExchangeType: t, WatchListPage: _WatchlistCurrentPageNo, CompletedListPage: _CompletedCurrentPageNo, ActiveTradePage: _ActiveCurrentPageNo, UserID: a, IsAdmin: r }),
            $.ajax({
                url: "/Trade/GetDataManageTransaction",
                type: "GET",
                data: l,
                dataType: "json",
                async: !0,
                success: function (e) {
                    SetResult(e);
                },
            });
    } catch (i) {
        toastr.error("Error On SetTradeData.");
    }
}
var PreviousActiveTradecount = 0;
function SetResult(e) {
    var t = JSON.parse(e);
    if (null != t) {
        if (null != t.ActiveTrade) {
            var a,
                r = $("#tblActiveTradeList").DataTable();
            if (t.ActiveTrade.length > 0) {
                if (PreviousActiveTradecount != t.ActiveTrade.length) {
                    r.clear().draw(); r.innerHTML = "";
                    for (var l = 0; l < t.ActiveTrade.length; l++) {
                        var i = t.ActiveTrade[l];
                        (_ActiveTotalPageNo = t.ActiveTrade[l].Total_Page), (a = t.ActiveTrade[l].Total_Page);
                        if ("COMPLETE" == i.Status && !$('#OnlyPendingOrders').prop('checked'))
                            SetActiveTradeDetails(i);
                        else if ("COMPLETE" != i.Status && $('#OnlyPendingOrders').prop('checked'))
                            SetActiveTradeDetails(i);
                    }
                    PreviousActiveTradecount = t.ActiveTrade.length;
                } else {
                    $('#tblActiveTradeBody tr').each(function () {
                        // 'this' refers to each <tr> element in the loop
                        var elementActiveTradeID = $(this).find('.HdnActiveTradeId').val(); // Find value of element with class '.HdnActiveTradeId' within this <tr>

                        // Filter t.ActiveTrade to find the object with matching ActiveTradeID
                        var result = t.ActiveTrade.find(function (trade) {
                            return trade.ActiveTradeID == elementActiveTradeID;
                        });

                        // Merge the filtered result into the row
                        if (result) {
                            var _Price = 0;

                            if (result.CurrentPositionNew === "Buy") {
                                _Price = result.LAST_PRICE_TYPE === 0 ? result.ObjScriptDTO.Bid : result.ObjScriptDTO.Lastprice;
                            } else if (result.CurrentPositionNew === "Sell") {
                                _Price = result.LAST_PRICE_TYPE === 0 ? result.ObjScriptDTO.Ask : result.ObjScriptDTO.Lastprice;
                            }

                            $(this).find('td:eq(9)').html(_Price);
                            $(this).find('td:eq(10)').html(result.Profitorloss + `<input type="hidden" class="HdnActiveTradeId" value="${result.ActiveTradeID}"/>`);
                        }
                    });
                    var D = document.getElementById("tblActiveTradeBody");
                    for (var A = 0; A < D.rows.length; A++) {
                        var x = parseFloat($(D.rows[A].cells[5]).text()),
                            h = $(D.rows[A].cells[0]).text(),
                            O = parseFloat($(D.rows[A].cells[11]).text()),
                            k = parseFloat($(D.rows[A].cells[12]).text()),
                            E = parseFloat($(D.rows[A].cells[10]).text());



                        // Logic from the provided code
                        ((x >= O && O > 0 && "Buy" == h) || (x <= O && O > 0 && "Sell" == h)) && ($(D.rows[A].cells[8]).css("background-color", "#14a964"), $(D.rows[A].cells[8]).css("color", "white"));
                        ((x >= k && k > 0 && "Buy" == h) || (x <= k && k > 0 && "Sell" == h)) && ($(D.rows[A].cells[9]).css("background-color", "#14a964"), $(D.rows[A].cells[9]).css("color", "white"));
                        E >= 0 ? ($(D.rows[A].cells[10]).css("background-color", "green"), $(D.rows[A].cells[10]).css("color", "white")) : ($(D.rows[A].cells[10]).css("background-color", "red"), $(D.rows[A].cells[10]).css("color", "white"));
                    }
                }
            }
            else (_ActiveTotalPageNo = 1), (a = 0), (r.clear().draw()), (PreviousActiveTradecount = 0), (r.innerHTML = "");
            _ActivePreviousTotalPageNo != a && ActiveTradePaginationDestroy(),
                (_ActivePreviousTotalPageNo = t.ActiveTrade.length > 0 ? t.ActiveTrade[0].Total_Page : 1),
                SetActiveTradePagination(),
                $(".TotalActiveTradeProfitOrLoss > h3").text(t.TotalActiveTradeProfitOrLoss),
                $(".TotalActiveTrade > h3").text(t.TotalActiveTradeCount),
                t.TotalActiveTradeProfitOrLoss >= 0
                    ? ($(".dvTotalActiveTradeProfitOrLoss").addClass("bg-green"), $(".dvTotalActiveTradeProfitOrLoss").removeClass("bg-red"))
                    : ($(".dvTotalActiveTradeProfitOrLoss").addClass("bg-red"), $(".dvTotalActiveTradeProfitOrLoss").removeClass("bg-green")),
                t.TotalCompletedTradeProfitOrLoss >= 0
                    ? ($(".dvTotalCompletedTradeProfitOrLoss").addClass("bg-green"), $(".dvTotalCompletedTradeProfitOrLoss").removeClass("bg-red"))
                    : ($(".dvTotalCompletedTradeProfitOrLoss").addClass("bg-red"), $(".dvTotalCompletedTradeProfitOrLoss").removeClass("bg-green"));
        } else {
            var r = $("#tblActiveTradeList").DataTable();
            r.clear().draw(), (r.innerHTML = "");
        }
        if (
            (t.TotalCompletedTradeCount > 0 ? $(".TotalCompletedTrade > h3").text(t.TotalCompletedTradeCount) : $(".TotalCompletedTrade > h3").text("0"),
                $(".TotalCompletedTradeProfitOrLoss > h3").text(t.TotalCompletedTradeProfitOrLoss),
                null != t.objLstWatchList)
        ) {
            if (t.objLstWatchList.length > 0) {
                var o,
                    d = $("#tblWatchListTradeList").DataTable();
                d.clear().draw(), (d.innerHTML = "");
                for (var l = 0; l < t.objLstWatchList.length; l++) {
                    (_WatchlistTotalPageNo = t.objLstWatchList[l].Total_Page), (_WatchListLength = t.objLstWatchList.length), (o = t.objLstWatchList[l].Total_Page);
                    var i = t.objLstWatchList[l];
                    (Current_Loop_Valueof_Watchlist = l), SetWatchTradeDetails(i);
                }
                _WatchlistCurrentTabIndex > 0 && $("#tblWatchListTradeListBody > tr:nth-child(" + _WatchlistCurrentTabIndex + ") > td:nth-child(1)").addClass("hover"),
                    _WatchlistPreviousTotalPageNo != o && WatchlistPaginationDestroy(),
                    (_WatchlistPreviousTotalPageNo = t.objLstWatchList.length > 0 ? t.objLstWatchList[0].Total_Page : 1),
                    SetWatchlistPagination();
            } else {
                var d = $("#tblWatchListTradeList").DataTable();
                d.clear().draw(), (d.innerHTML = "");
            }
        } else {
            var d = $("#tblWatchListTradeList").DataTable();
            d.clear().draw(), (d.innerHTML = "");
        }
        if (null != t.OrderExceptionList && t.OrderExceptionList.length > 0) {
            for (
                var n = '<table class="table table-bordered table-striped" id="exceptionsTable"><thead><tr><th>TradingSymbol</th><th>Quantity</th><th>price</th><th>BuyOrSell</th><th>Message</th></tr></thead><tbody>', l = 0;
                l < t.OrderExceptionList.length;
                l++
            )
                n +=
                    "<tr><td>" +
                    t.OrderExceptionList[l].Tradingsymbol +
                    "</td><td>" +
                    t.OrderExceptionList[l].Quantity +
                    "</td><td>" +
                    t.OrderExceptionList[l].price +
                    "</td><td>" +
                    t.OrderExceptionList[l].TransactionType +
                    "</td><td>" +
                    t.OrderExceptionList[l].Message +
                    "</td></tr>";
            (n += "</tbody></table>"), $("#errorModal .modal-body").html(n), $("#errorModal").modal("show");
        }
    }
}
function SetWishlistResult(e) {
    var t = JSON.parse(e);
    if (null != t) {
        var a = $("#tblWatchListTradeList").DataTable();
        a.clear(), (a.innerHTML = "");
        for (var r = 0; r < t.objLstWatchList.length; r++) SetWatchTradeDetails(t.objLstWatchList[r]);
        0 == t.objLstWatchList.length && (a.clear(), (a.innerHTML = ""));
    }
}
function buySellPopUp(e, t, a, r, l, i, o, d, n = 1, s = 1, c = 0, p = 0, T = 0, u = 0, v = 0, b = "", g = "", h = 0, y = "", S = "", f = "", L = "") {
    $(".upperClause :input").removeAttr("disabled"),
        $("#btnProceedBuySell").removeAttr("disabled"),
        $("#price").removeClass("has-error"),
        $("#buySellModel .modal-title").css("color", "#fff"),
        $("#buySellModel #Terror").hide(),
        $("#buySellModel #Quantity-error").hide(),
        $("#buySellModel #hdnScriptExchange").val(d),
        $("#buySellModel #hdnScriptLotSize").val(s),
        $("#buySellModel #hdnHigh").val(c),
        $("#buySellModel #hdnLow").val(p),
        "" == S && (S = $("#hdnIsLiveOrder").val()),
        $("#buySellModel #hdnIsLive").val(S);
    var m = $("#CompanyInitial").val();
    "VM" == m && ($(".ProductTypeDiv").css("display", "none"), $(".TriggerPriceDiv").css("display", "none"), $(".rbtnSLDiv").css("display", "none"), $("#tgtSLDiv").css("display", "none"), $("#RememberDiv").css("display", "none")),
        "EXPO" == m && ($(".TriggerPriceDiv").css("display", "none"), $(".rbtnSLDiv").css("display", "none"), $("#RememberDiv").css("display", "none")),
        "MCX" != d ? ($("#QuantityWiseBuy").css("display", "none"), $("#marketTypeDiv").addClass("col-md-offset-4")) : ($("#QuantityWiseBuy").css("display", "block"), $("#marketTypeDiv").removeClass("col-md-offset-4"));
    var P = "";
    if (
        (1 == a ? ((P = "Buy"), $("#buySellModel .modal-title").css("background-color", "#00a65a")) : 2 == a && ((P = "Sell"), $("#buySellModel .modal-title").css("background-color", "#dd4b39")),
            $("#dropTradingUnit").html(""),
            null != allowedTradingUnit)
    ) {
        if (allowedTradingUnit.length > 0) {
            var I = allowedTradingUnit.filter((e) => e.ScriptExchange == d),
                C = [];
            "FUT" == o || "CE" == o || "PE" == o
                ? "FUT" == o
                    ? null == I[0].Future_Trading_Unit_Type || "" == I[0].Future_Trading_Unit_Type || void 0 == I[0].Future_Trading_Unit_Type
                        ? C.push(1)
                        : (C = I[0].Future_Trading_Unit_Type.split(","))
                    : null == I[0].Options_Trading_Unit_Type || "" == I[0].Options_Trading_Unit_Type || void 0 == I[0].Options_Trading_Unit_Type
                        ? C.push(1)
                        : (C = I[0].Options_Trading_Unit_Type.split(","))
                : null == I[0].Options_Trading_Unit_Type || "" == I[0].Options_Trading_Unit_Type || void 0 == I[0].Options_Trading_Unit_Type
                    ? C.push(1)
                    : (C = I[0].Equity_Trading_Unit_Type.split(",")),
                $.each(C, function (e, t) {
                    "0" == t && (t = "1"),
                        $("#dropTradingUnit").append(
                            $("<option></option>")
                                .val(parseInt(t))
                                .html("1" == t ? "Lot" : "Qty")
                        );
                });
        } else $("#dropTradingUnit").append($("<option></option>").val(parseInt(1)).html("Lot"));
    } else $("#dropTradingUnit").append($("<option></option>").val(parseInt(1)).html("Lot"));
    if (
        ($("#lblScriptSymbol").text(r.toString()),
            $("#lblScriptCode").text(t.toString()),
            $("#lblCurrentPosition").text(P),
            $("#WID").val(l),
            $("#hdnPrice").val(i),
            $("#hdnTradeID").val(h.toString()),
            $("#price").val("0"),
            $("#TriggerPrice").val(T.toString()),
            $("#hdnTriggerPrice").val(T.toString()),
            $("#txtStopLoss").val(u.toString()),
            $("#txtTarget").val(v.toString()),
            $("#Quantity").val(n.toString()),
            "EQ" != o ? ($("#rbtnNrml").val("NRML"), $("#Itype").text("NRML")) : ($("#rbtnNrml").val("CNC"), $("#Itype").text("CNC")),
            "True" == $("#IsTargetStopLossAbsolute").val() &&
            "EDIT" == f &&
            ("Buy" == P.toLowerCase() ? ($("#txtStopLoss").val(u > 0 ? i - u : 0), $("#txtTarget").val(v > 0 ? i + v : 0)) : ($("#txtStopLoss").val(u > 0 ? i + u : 0), $("#txtTarget").val(v > 0 ? i - v : 0))),
            0 == b.length)
    ) {
        var M = localStorage.getItem("RememberTargetStoploss");
        null != M
            ? ((M = JSON.parse(M)),
                $("#cbxRememberTargetStoploss").prop("checked", !0),
                null != M.PRODUCT_TYPE && "" != M.PRODUCT_TYPE && ("MIS" == M.PRODUCT_TYPE ? $("#rbtnIntraday").prop("checked", !0) : $("#rbtnNrml").prop("checked", !0)),
                null != M.PRICE_TYPE &&
                "" != M.PRICE_TYPE &&
                ("MARKET" == M.PRICE_TYPE
                ? $("input[Name=MarketType]#rbtnMarket").trigger("click")
                    : "Limit" == M.PRICE_TYPE
                    ? $("input[Name=MarketType]#rbtnLimit").trigger("click")
                        : "SL" == M.PRICE_TYPE
                        ? $("input[Name=MarketType]#rbtnSL").trigger("click")
                        : "SL-M" == M.PRICE_TYPE && $("input[Name=MarketType]#rbtnSLM").trigger("click")),
                (b = $("input[Name=MarketType]:checked").val()))
            : ($("input[Name=MarketType]#rbtnMarket").trigger("click"), $("#rbtnNrml").prop("checked", !0));
    }
    null != b &&
        "" != b &&
        ("Limit" == b
            ? ($("#buySellModel #price").removeAttr("disabled"),
                $("#buySellModel #price").removeAttr("readonly"),
                $("#buySellModel #price").val(i),
                $("#buySellModel #TriggerPrice").val("0"),
                $("#buySellModel #TriggerPrice").attr("disabled", "disabled"),
            $("input[Name=MarketType]#rbtnLimit").trigger("click"))
            : "SL" == b
            ? ($("input[Name=MarketType]#rbtnSL").trigger("click"), $("#buySellModel #price").removeAttr("disabled"), $("#buySellModel #price").removeAttr("readonly"), $("#buySellModel #price").val(i), $("#buySellModel #TriggerPrice").removeAttr("disabled"))
                : "SL-M" == b
                ? ($("input[Name=MarketType]#rbtnSLM").trigger("click"), $("#buySellModel #price").val(i), $("#buySellModel #price").attr("readonly", "readonly"), $("#buySellModel #price").attr("disabled", "disabled"))
                    : "MARKET" == b &&
                ($("input[Name=MarketType]#rbtnMarket").trigger("click"),
                        $("#buySellModel #price").val(0),
                        $("#buySellModel #price").attr("disabled", "disabled"),
                        $("#buySellModel #price").attr("readonly", "readonly"),
                        $("#buySellModel #TriggerPrice").attr("disabled", "disabled"))),
        null != g && "" != g && ("MIS" == g ? $("#rbtnIntraday").prop("checked", !0) : $("#tgtSLDiv").show()),
        "COMPLETE" == y ? $(".upperClause :input").attr("disabled", "disabled") : $(".upperClause :input").removeAttr("disabled"),
        $("#buySellModel").modal({ backdrop: !1, show: !0 }),
        $(".modal-dialog").draggable({ handle: ".modal-header" }),
        $("body").removeClass("modal-open"),
        $("#hdnSt").val(y),
        "" != L && $("#dropTradingUnit option[value=" + L + "]").attr("selected", "selected"),
        $("#dropTradingUnit").removeAttr("disabled"),
        "Open" == y && $("#dropTradingUnit").attr("disabled", "disabled"),
        "1" == localStorage.getItem("IsOneClickEnabled") && "EDIT" != f && ProceedBuySell(),
        (marginInterval = setInterval(function () {
            GetRequiredMargin();
        }, 1e3));
}
function GetRequiredMargin() {
    var e = 0,
        t = $("#buySellModel #hdnScriptLotSize").val();
    $("#buySellModel #DivGetLotSize").text(t);
    var a = $("#lblScriptCode").text(),
        r = $("#Quantity").val(),
        l = $("#WalletBalance").text(),
        i = $("#lblLastPrice").text(),
        o = document.getElementById("rbtnIntraday"),
        d = $("#lblCurrentPosition").text(),
        n = $("#buySellModel #hdnScriptExchange").val(),
        s = 0;
    if (
        (!0 == o.checked && (e = 1),
            "--Select--" != $("#UserIds option:selected").text() && (s = $("#UserIds").val()),
            (1 == LevelLoginUser || 2 == LevelLoginUser) && "--Select--" != $("#AdminIds option:selected").text() && (s = $("#AdminIds").val()),
            (1 == LevelLoginUser || 2 == LevelLoginUser || 3 == LevelLoginUser) && "--Select--" != $("#BrokerIds option:selected").text() && (s = $("#BrokerIds").val()),
            4 == LevelLoginUser && "--Select--" != $("#UserIds option:selected").text() && (s = $("#UserIds").val()),
            "" != (i = "Buy" == d ? $("#lblLastBid").text() : $("#lblLastAsk").text()) && null != i)
    ) {
        var c = "";
        l = parseFloat($('#price').val()) > 0 ? $('#price').val() : l;
        (c = { ScriptLotSize: t, ScriptCode: a, quantity: r, Totalwalletbalance: l, MisOrNot: e, Lastprice: i, TRADING_UNIT_TYPE: $("#dropTradingUnit").val(), ScriptExchange: n, UserID: s, CurrentPosition: $('#lblCurrentPosition').html() }),
            $.ajax({
                url: "/Trade/GetRequiredMargin",
                type: "GET",
                data: c,
                dataType: "json",
                success: function (e) {
                    var ee = JSON.parse(e);
                    SetRequiredMargin(ee);
                },
            });
    }
}
function SetRequiredMargin(e) {

    if (null != e.length && e.length > 0) {
        if (e[0].Requiredmargin > e[0].Availablemargin) {
            $("#DivGetAvailableMargin").css("color", "red");
            if (parseInt($("#hdnTradeID").val()) == 0) {
                $('#btnProceedBuySell').hide();
                $('#MarginError').show();
            }
        } else {
            $("#DivGetAvailableMargin").css("color", "green");
            $('#btnProceedBuySell').show();
            $('#MarginError').hide();
        }
        $("#buySellModel #DivGetRequiredMargin").text(e[0].Requiredmargin);
        $("#buySellModel #DivGetAvailableMargin").text(e[0].Availablemargin);
        $("#buySellModel #DivGetUsedMargin").text(e[0].Usedmargin);
    } else {
        $("#buySellModel #DivGetRequiredMargin").text(0);
        $("#buySellModel #DivGetAvailableMargin").text(0);
        $("#buySellModel #DivGetUsedMargin").text(0);
    }
}
function ProceedBuySell() {
    var e = $("#Quantity").val();
    if (e < 0.01) {
        toastr.error("Invalid Qty"), HidePopUp();
        return;
    }
    if (!0 == $("#cbxRememberTargetStoploss").prop("checked")) {
        var t = { PRODUCT_TYPE: $("input[Name=ProductType]:checked").val(), PRICE_TYPE: $("input[Name=MarketType]:checked").val() };
        localStorage.setItem("RememberTargetStoploss", JSON.stringify(t));
    } else localStorage.removeItem("RememberTargetStoploss");
    var a = 0;
    a = !0 == $("#cbxAutoBinanceSlTrail").prop("checked") ? 1 : 0;
    var r = $("#lblScriptCode").text(),
        l = $("#lblCurrentPosition").text();
    intWID = $("#WID").val();
    var i = $("#txtTarget").val(),
        o = $("#txtStopLoss").val(),
        e = $("#Quantity").val();
    $("#buySellModel #hdnScriptExchange").val(), $("#buySellModel #hdnScriptLotSize").val();
    var d = $("#buySellModel #hdnHigh").val(),
        n = $("#buySellModel #hdnLow").val(),
        s = $("#buySellModel #hdnIsLive").val(),
        c = $("#price").val(),
        p = $("#TriggerPrice").val(),
        T = $("#hdnTradeID").val(),
        u = $("input[Name=ProductType]:checked").val(),
        v = $("input[Name=MarketType]:checked").val(),
        b = $("#buySellModel #hdnPrice").val();
    if (null == r || "" == r || null == l || "" == l) {
        alert("Please enter correct details");
        return;
    }
    if (0 == $("#HighLowCircuitRequired").val()) {
        var g = $("#CompanyInitial").val();
        if ("SL" == v || "SL-M" == v) {
            var h = parseFloat(c),
                y = parseFloat(p),
                S = parseFloat(b),
                f = !1,
                L = "";
            if (
                ("SL" == v &&
                    "EXPO" != g &&
                    ("Sell" == l && "SL" == v && h > y ? ((f = !0), (L = "Trigger price connot be less than order price")) : "Buy" == l && "SL" == v && h < y && ((f = !0), (L = "Trigger price Cannot be higher than order price"))),
                    "Sell" == l && y > S ? ((f = !0), (L = "Trigger price Cannot be higher than last price")) : "Buy" == l && y < S && ((f = !0), (L = "Trigger price connot be less than last price")),
                    f)
            ) {
                toastr.error(L), $("#btnProceedBuySell").removeAttr("disabled");
                return;
            }
        }
        if ("Limit" == v) {
            var h = parseFloat(c),
                b = $("#buySellModel #hdnPrice").val(),
                S = parseFloat(b),
                f = !1,
                L = "";
            if (("Sell" == l && h < S ? ((f = !0), (L = "Limit price Cannot be less than last price")) : "Buy" == l && h > S && ((f = !0), (L = "Limit price connot be greater than last price")), f)) {
                $("#price").addClass("has-error"), toastr.error(L), $("#btnProceedBuySell").removeAttr("disabled");
                return;
            }
        }
    }
    if ((("" != o && "0" != o) || ("" != i && "0" != i)) && "false" == s.toLowerCase()) {
        var m = parseFloat(i),
            P = parseFloat(o),
            I = parseFloat(d),
            C = parseFloat(n),
            h = parseFloat(c),
            M = parseFloat(b);
        if ((h > 0 ? (M = h) : (h = M), "TB" == (g = $("#CompanyInitial").val()))) {
            var L = "";
            if (
                ("Buy" == l
                    ? (m > 0 && (m = M + m) < I && (L = "Target should be greater than high price"), P > 0 && (P = M - P) > C && (L = "StopLoss should be less than low price"))
                    : (m > 0 && (m = M - m) < C && (L = "Target should be less than low price"), P > 0 && (P = M + P) > I && (L = "StopLoss  should be greater than high price")),
                    "" != L)
            ) {
                toastr.error(L), $("#btnProceedBuySell").removeAttr("disabled");
                return;
            }
        }
        if ("True" == $("#IsTargetStopLossAbsolute").val()) {
            var L = "";
            if (
                ("Buy" == l
                    ? (m > 0 && m < h && (L = "Target should be greater than Order price"), P > 0 && P > h && (L = "StopLoss should be less than Order price"))
                    : (m > 0 && m > h && (L = "Target should be less than Order price"), P > 0 && P < h && (L = "StopLoss  should be greater than Order price")),
                    "" != L)
            ) {
                toastr.error(L), $("#btnProceedBuySell").removeAttr("disabled");
                return;
            }
        }
    }
    var _UserID=0;
    if ($("#UserIds option:selected").text() !== "--Select--") {
        _UserID = $("#UserIds").val();
    }
    if ((LevelLoginUser === 1 || LevelLoginUser === 2) && $("#AdminIds option:selected").text() !== "--Select--") {
        _UserID = $("#AdminIds").val();
    }
    if ((LevelLoginUser === 1 || LevelLoginUser === 2 || LevelLoginUser === 3) && $("#BrokerIds option:selected").text() !== "--Select--") {
        _UserID = $("#BrokerIds").val();
    }
    if (LevelLoginUser === 4 && $("#UserIds option:selected").text() !== "--Select--") {
        _UserID = $("#UserIds").val();
    }
    if (_UserID == 0) {
        toastr.error('Please Select a user'), $("#btnProceedBuySell").removeAttr("disabled");
        return;
    }

    var D = $("#hdnSt").val(),
        A = $("#dropTradingUnit").val();
    r > 0 &&
        intWID > 0 &&
        "" != e &&
        "0" != e &&
        $.ajax({
            url: "/Trade/ProceedBuySell",
            type: "POST",
            data: {
                intWID: intWID,
                ScriptCode: r,
                CurrentPosition: l,
                allUsers: !1,
                target: i,
                stopLoss: o,
                Quantity: e,
                price: c,
                TriggerPrice: p,
                ProductType: u,
                MarketType: v,
                TradeID: T,
                Status: D,
                iscbxAutoBinanceSlTrailEnabled: a,
                TRADING_UNIT: A,
                UserID: _UserID
            },
            dataType: "json",
            async: !0,
            success: function (e) {
                var t = JSON.parse(e);
                return t.IsError ? (HidePopUp(), toastr.error(t.TypeName), !1) : ("0" != T ? toastr.success("Order Updated successfully") : toastr.success(t.SuccessMessage), !1);
            },
        }),
        HidePopUp(),
        $("#btnProceedBuySell").removeAttr("disabled");
}
function HidePopUp() {
    $("#buySellModel").modal("hide");
}
$("#btnexport").click(function () {
    var e = $('#tblCompletedTradeList_filter input[type="search"]').val();
    window.location = '/Trade/download?search="' + e + '"';
}),
    $("#btnAddWatchList").on("click", function () {
        var e = $("#watchList option:selected").val();
        null == e || "" == e ? (window.location.href = "/WatchList/AddWatchList?ID=0") : (window.location.href = "/WatchList/AddWatchList?ID=" + e);
    }),
    $("#watchList").on("change", function () {
        var e = this.value;
        if (($("#watchlistHiddenId").val(e), null != e && "" != e))
            try {
                var t = "";
                (t = !0 == $("#rdAll").prop("checked") ? { tradetype: 0 } : !0 == $("#rdLive").prop("checked") ? { tradetype: 1 } : { tradetype: 2 }),
                    $.ajax({
                        url: "/Trade/GetWatchListTradeByWid",
                        type: "GET",
                        data: { WID: e },
                        dataType: "json",
                        success: function (e) {
                            SetWishlistResult(e);
                        },
                    });
            } catch (a) {
                alert("Error On SetTradeData.");
            }
    }),
    $("#cboScriptExchange").on("change", function () {
        try {
            SetTradeDataForRefresh();
        } catch (e) {
            toastr.error("Error On SetTradeData.");
        }
    });
var sqModal = $("#sqOfModal");
function SquareOff(e, t, a, r, l) {
    $(sqModal).find(".sqMsg").text(""),
        $(sqModal).find("input[Name=sqQty]").val(r),
        $(sqModal).find("input[Name=hdQty]").val(r),
        $(sqModal).find("input[Name=sqActiveTradeID]").val(e),
        $(sqModal).find("input[Name=sqStatus]").val(a),
        $(sqModal).find("input[Name=sqParam]").val(t),
        l ? $(sqModal).modal("show") : confirm("Are you sure to square off?") && ProceedSqOf();
}
function ProceedSqOf() {
    $(sqModal).find(".sqMsg").text("");
    if ($('input[Name=_ManualEntryPrice]').val().length > 0 && $('input[Name=_ManualExitPrice]').val().length == 0) {
        toastr.error("Please Enter Exit Price");
        $("#btnProceedSquareOff").removeAttr("disabled")
        return;
    }
    if ($('input[Name=_ManualExitPrice]').val().length > 0 && $('input[Name=_ManualEntryPrice]').val().length == 0) {
        toastr.error("Please Enter Entry Price");
        $("#btnProceedSquareOff").removeAttr("disabled")
        return;
    }
    var e = $(sqModal).find("input[Name=sqQty]").val(),
        t = $(sqModal).find("input[Name=hdQty]").val(),
        a = 0;
    if ("" == e || "0" == e || (a = parseInt(e, 10)) > parseInt(t, 10)) return $("#btnProceedSquareOff").removeAttr("disabled"), $(sqModal).find(".sqMsg").text("Invalid Qty"), !1;
    var r = $(sqModal).find("input[Name=sqActiveTradeID]").val(),
        l = $(sqModal).find("input[Name=sqStatus]").val(),
        i = $(sqModal).find("input[Name=sqParam]").val();
    $.ajax({
        url: "/Trade/ManageTradeSquareOff",
        type: "POST",
        data: { ID: r, actionParam: i, Status: l, Qty: a, isSupAdmin: 1, _ManualEntryPrice: $(sqModal).find("input[Name=_ManualEntryPrice]").val(), _ManualExitPrice: $(sqModal).find("input[Name=_ManualExitPrice]").val() },
        dataType: "json",
        traditional: !0,
        success: function (e) {
            var t = JSON.parse(e);
            return 1 == t.exceptionDTO.id ? toastr.success(t.exceptionDTO.Msg) : 0 == t.exceptionDTO.id ? toastr.success(t.exceptionDTO.Msg) : 2 == t.exceptionDTO.id && toastr.success(t.exceptionDTO.Msg), !1;
        },
    }),
        $("#btnProceedSquareOff").removeAttr("disabled"),
        $(sqModal).modal("hide");
}
function CallSync(e) {
    confirm("Are you sure to sync order?") &&
        $.ajax({
            url: "/Trade/CallSync",
            type: "POST",
            data: { ID: e },
            dataType: "json",
            traditional: !0,
            success: function (e) {
                return JSON.parse(e), toastr.success("Order Sync request sent successfully"), !1;
            },
        });
}
function MarketDepthPop(e, t) {
    var a = '<button type="button" class="btn btn-success" onclick="HideDepthModal();$(\'#btnBuy' + e + "').click()\">Buy</button>";
    (a += '<button type="button" class="btn btn-danger" onclick="HideDepthModal();$(\'#btnSell' + e + "').click()\">Sell</button>"),
        $("#MarketDepthModal #buySellButtonDiv").html(a),
        $("#MarketDepthModal #lblDepthScriptSymbol").text(t),
        $("#MarketDepthModal #hdnDepthScriptCode").val(e),
        $.ajax({
            url: "/Trade/_MarketDepth",
            type: "POST",
            data: { ScriptCode: e },
            success: function (e) {
                return (
                    $("#MarketDepthModal .modal-body").html(e),
                    $("#MarketDepthModal").modal({ backdrop: !1, show: !0 }),
                    $("body").removeClass("modal-open"),
                    (marketDepthInterval = setInterval(function () {
                        SetMarketDepthForRefresh();
                    }, 1e3)),
                    !1
                );
            },
        });
}
function SetMarketDepthForRefresh() {
    var e = $("#MarketDepthModal #hdnDepthScriptCode").val();
    $.ajax({
        url: "/Trade/_MarketDepth",
        type: "POST",
        data: { ScriptCode: e },
        async: !0,
        success: function (e) {
            return $("#MarketDepthModal #lblDepthLTP").text("(" + $("#hdnDepthLTP").val() + ")"), $("#MarketDepthModal .modal-body").html(e), !1;
        },
    });
}
function HideDepthModal() {
    clearInterval(marketDepthInterval), $("#MarketDepthModal").modal("hide");
}
function HideCompletedTradeModal() {
    $("#CompletedTradeModal").modal("hide");
}
function btnLoginToTradeUsingModal() {
    var e = $("#btnKiteLogin").attr("href");
    return (
        $.ajax({
            url: e,
            type: "GET",
            data: {},
            dataType: "json",
            traditional: !0,
            success: function (e) {
                var t = e;
                if ("" == t) return $("#txtScript").val(""), ShowAlertMessage(1, "Login Sccuessfully."), !1;
                window.location.href = t;
            },
        }),
        !1
    );
}
function SetWatchlistPagination() {

}
function WatchlistPaginationDestroy() {

}
function SetCompletedPagination() {

}
function CompletedPaginationDestroy() {

}
function SetActiveTradePagination() {

}
function ActiveTradePaginationDestroy() {

}
function SetCompletedTradeModalData() {
    try {
        var a = 0;
        var e = $("#watchlistHiddenId").val(),
            t = $("#cboScriptExchange option:selected").val();
        if ("--Select--" != $("#UserIds option:selected").text())
            var a = $("#UserIds").val(),
                r = "0";
        if ((1 == LevelLoginUser || 2 == LevelLoginUser) && "--Select--" != $("#AdminIds option:selected").text())
            var a = $("#AdminIds").val(),
                r = "1";
        if ((1 == LevelLoginUser || 2 == LevelLoginUser || 3 == LevelLoginUser) && "--Select--" != $("#BrokerIds option:selected").text())
            var a = $("#BrokerIds").val(),
                r = "1";
        if (4 == LevelLoginUser && "--Select--" != $("#UserIds option:selected").text()) {
            $("#UserIds").val();
            var r = "1";
        }
        var l = "";
        (l =
            !0 == $("#rdAll").prop("checked")
                ? { tradetype: 0, WID: e, scriptExchangeType: t, CompletedListPage: _CompletedCurrentPageNo, UserID: a, IsAdminOrNot: r }
                : !0 == $("#rdLive").prop("checked")
                    ? { tradetype: 1, WID: e, scriptExchangeType: t, CompletedListPage: _CompletedCurrentPageNo, UserID: a, IsAdminOrNot: r }
                    : { tradetype: 2, WID: e, scriptExchangeType: t, CompletedListPage: _CompletedCurrentPageNo, UserID: a, IsAdminOrNot: r }),
            $.ajax({
                url: "/Trade/SetCompletedTradeDataForManageTransaction",
                type: "GET",
                data: l,
                dataType: "json",
                async: !0,
                success: function (e) {
                    var t = JSON.parse(e);
                    if (null != t) {
                        var a,
                            r = $("#tblCompletedTradeList").DataTable();
                        if ((r.clear().draw(), (r.innerHTML = ""), null != t.CompletedTrade && t.CompletedTrade.length > 0)) {
                            for (var l = 0; l < t.CompletedTrade.length; l++) {
                                (_CompletedTotalPageNo = t.CompletedTrade[l].Total_Page), (a = t.CompletedTrade[l].Total_Page);
                                var i = t.CompletedTrade[l];
                                SetCompletedTradeTableDetails(i), $("#CompletedTradeModal td:first-child").addClass("CompletedTradeModal_First_Td"), BindClick(), bindHideClick();
                            }
                            _CompletedPreviousTotalPageNo != a && CompletedPaginationDestroy(), (_CompletedPreviousTotalPageNo = t.CompletedTrade.length > 0 ? t.CompletedTrade[0].Total_Page : 1), SetCompletedPagination();
                        }
                    }
                },
            });
    } catch (i) {
        alert("Error On SetTradeData.");
    }
}
function bindHideClick() {
    $(".hideTranDetailRow").bind("click", function () {
        $(this).css("display", "none"), $("#TranDetail").remove();
    });
}
function SetCompletedTradeTableDetails(e) {
    "TGT2" == e.Status ? (e.Status = "TARGET") : "TGT3" == e.Status ? (e.Status = "TARGET2") : "TGT4" == e.Status ? (e.Status = "TARGET3") : "SL" == e.Status && (e.Status = "STOPLOSS");
    var t,
        a,
        r =
            '<a href="javascript:void(0)" id="GetCompletedTradeDetail" data-bind=' +
            e.Completedtradeid +
            ' ><i class="fa fa-info-circle"></i> </a> <a href="javascript:void(0)" id="DeleteCompletedTrade" data-bind=' +
            e.Completedtradeid +
            ' style="margin-left:10px;" ><i class="fa fa-trash-o"></i> </a> <a href="javascript:void(0)" class="hideTranDetailRow"  style = "margin-left: 15px;font-size:15px;display:none;" ><i class="fa fa-arrow-circle-up"></i></a> <p style="margin-left: 10px;">  ' +
            e.Completedtradeid +
            "</p> ";
    1 == e.TRADING_UNIT_TYPE
        ? ((t = e.Qty / e.ScriptLotSize), (a = e.TRADING_UNIT))
        : ((a = e.TRADING_UNIT),
            (t =
                e.ScriptLotSize > 10 && "MCX" == e.ScriptExchange && (("EXPO" == e.COMPANY_INITIAL && 51 == e.TENANT_ID) || ("ASR" == e.COMPANY_INITIAL && 57 == e.TENANT_ID) || "RVERMA" == e.COMPANY_INITIAL)
                    ? e.Qty / (e.ScriptLotSize / 10)
                    : e.Qty)),
        "FOREX" == e.Scripttype && "RT" == $("#CompanyInitial").val() && (e.Profitorloss = e.Profitorloss.toFixed(5)),
        $("#tblCompletedTradeList").DataTable().row.add([r, e.Username, e.TradeSymbol, t, a, e.Profitorloss, e.Entrytime, e.CurrentPosition, e.Status]).order([0, "desc"]).draw();
    for (var l = document.getElementById("tblCompletedTradeList"), i = 0; i < l.rows.length; i++) {
        var o = $(l.rows[i].cells[6]).text();
        ("TARGET" == o || "TARGET2" == o || "TARGET3" == o) && ($(l.rows[i].cells[6]).css("background-color", "#14a964"), $(l.rows[i].cells[6]).css("color", "white")),
            "STOPLOSS" == o && ($(l.rows[i].cells[6]).css("background-color", "#d83824"), $(l.rows[i].cells[6]).css("color", "white"));
        var d = $(l.rows[i].cells[5]).text();
        parseFloat(d) >= 0
            ? ($(l.rows[i].cells[5]).css("background-color", "#14a964"), $(l.rows[i].cells[5]).css({ color: "white", "font-weight": "bold" }))
            : 0 > parseFloat(d) && ($(l.rows[i].cells[5]).css("background-color", "#d83824"), $(l.rows[i].cells[5]).css({ color: "white", "font-weight": "bold" }));
    }
}
function BindClick() {
    $("#GetCompletedTradeDetail").bind("click", function () {
        $(".hideTranDetailRow").hide();
        var e = $(this).closest("tr"),
            t = $(e).find(".hideTranDetailRow");
        $(t).show();
        var a = $(this).data("bind");
        $.ajax({
            url: "/Trade/SetCompletedTradeDetailData?Completedtradeid=" + a,
            type: "GET",
            async: !0,
            success: function (t) {
                null != t && ($("#TranDetail").remove(), $(t).insertAfter(e));
            },
        });
    }),
        $("#DeleteCompletedTrade").bind("click", function () {
            var e = $(this).data("bind");
            $.ajax({
                url: "/Trade/SoftDeleteCompletedTrade?ID=" + e,
                type: "GET",
                async: !0,
                success: function (e) {
                    null != e && (toastr.success(e), SetCompletedTradeModalData());
                },
            });
        });
}
$("#btnMoreInfoCompletedTrade").on("click", function () {
    if ("--Select--" != $("#UserIds option:selected").text()) var e = $("#UserIds").val();
    if ((1 == LevelLoginUser || 2 == LevelLoginUser) && "--Select--" != $("#AdminIds option:selected").text()) var e = $("#AdminIds").val();
    if ((1 == LevelLoginUser || 2 == LevelLoginUser || 3 == LevelLoginUser) && "--Select--" != $("#BrokerIds option:selected").text()) var e = $("#BrokerIds").val();
    if (4 == LevelLoginUser && "--Select--" != $("#UserIds option:selected").text()) var e = $("#UserIds").val();
    SetCompletedTradeModalData(); $("#CompletedTradeModal").modal("show");
}),
    $("#btnMoreInfoCompletedTrade2").on("click", function () {
        if ("--Select--" != $("#UserIds option:selected").text()) var e = $("#UserIds").val();
        if ((1 == LevelLoginUser || 2 == LevelLoginUser) && "--Select--" != $("#AdminIds option:selected").text()) var e = $("#AdminIds").val();
        if ((1 == LevelLoginUser || 2 == LevelLoginUser || 3 == LevelLoginUser) && "--Select--" != $("#BrokerIds option:selected").text()) var e = $("#BrokerIds").val();
        if (4 == LevelLoginUser && "--Select--" != $("#UserIds option:selected").text()) var e = $("#UserIds").val();
        SetCompletedTradeModalData(); $("#CompletedTradeModal").modal("show");
    }),
    $("#SqrOffAllBtn").on("click", function () {
        confirm("Are You Sure You Want To Sqr-Off All Trades ?") && (window.location.href = "/Trade/SqrOffAll");
    });
var addQtyModal = $("#addQtyModal");
function AddQty(e, t, a) {
    $(addQtyModal).find(".sqMsg").text(""),
        $(addQtyModal).find("#btnProceedAddQty").removeAttr("disabled"),
        $(addQtyModal).find("input[Name=sqActiveTradeID]").val(e),
        $(addQtyModal).find("input[Name=sqStatus]").val(a),
        $(addQtyModal).find("input[Name=sqParam]").val(t),
        $(addQtyModal).modal("show");
}
function ProceedAddQty() {
    $(addQtyModal).find(".sqMsg").text("");
    var e = $(addQtyModal).find("input[Name=sqQty]").val(),
        t = 0;
    if ("" == e || "0" == e) return $(addQtyModal).find("#btnProceedAddQty").removeAttr("disabled"), $(addQtyModal).find(".sqMsg").text("Invalid Qty"), !1;
    t = parseInt(e, 10);
    var a = $(addQtyModal).find("input[Name=sqActiveTradeID]").val(),
        r = $(addQtyModal).find("input[Name=sqStatus]").val(),
        l = $(addQtyModal).find("input[Name=sqParam]").val();
    $.ajax({
        url: "/Trade/AddQtyToActiveTrade",
        type: "POST",
        data: { ID: a, actionParam: l, Status: r, Qty: t },
        dataType: "json",
        traditional: !0,
        success: function (e) {
            var t = JSON.parse(e);
            return 1 == t.exceptionDTO.id ? toastr.success(t.exceptionDTO.Msg) : 0 == t.exceptionDTO.id ? toastr.success(t.exceptionDTO.Msg) : 2 == t.exceptionDTO.id && toastr.success(t.exceptionDTO.Msg), !1;
        },
    }),
        $(addQtyModal).find("#btnProceedAddQty").removeAttr("disabled"),
        $(addQtyModal).modal("hide");
}
function getTradingUnit(e) {
    $.ajax({
        url: "/Trade/GetTradingUnitAccess?UserID=" + e,
        type: "GET",
        dataType: "json",
        success: function (e) {
            null != e && "" != e && (allowedTradingUnit = JSON.parse(e));
        },
    });
}
function SetTotalBrokrage(e) {
    $.ajax({
        url: "/Trade/GetTotalBrokrage",
        type: "Get",
        data: { UserID: e },
        dataType: "json",
        traditional: !0,
        success: function (e) {
            $("#TotalBrokrage").html(e);
        },
    });
}
function SqrOffAllForManageTransaction() {
    if (confirm("Are you sure to square off All?")) {
        if ("--Select--" != $("#UserIds option:selected").text())
            var e = $("#UserIds").val(),
                t = $("#UserIds option:selected").text();
        if ((1 == LevelLoginUser || 2 == LevelLoginUser) && "--Select--" != $("#AdminIds option:selected").text())
            var e = $("#AdminIds").val(),
                t = $("#AdminIds option:selected").text();
        if ((1 == LevelLoginUser || 2 == LevelLoginUser || 3 == LevelLoginUser) && "--Select--" != $("#BrokerIds option:selected").text())
            var e = $("#BrokerIds").val(),
                t = $("#BrokerIds option:selected").text();
        $.ajax({
            url: "/Trade/SqrOffAllForManageTransaction",
            type: "Get",
            data: { UserID: e, Username: t },
            dataType: "json",
            traditional: !0,
            success: function (e) {
                var t = JSON.parse(e);
                1 == t.exceptionDTO.id ? toastr.success(t.exceptionDTO.Msg) : 0 == t.exceptionDTO.id ? toastr.error(t.exceptionDTO.Msg) : 2 == t.exceptionDTO.id && toastr.error(t.exceptionDTO.Msg);
            },
        });
    }
}
function DeleteRejectedTrade(e) {
    confirm("Are you sure you want to delete?") &&
        $.ajax({
            url: "/Trade/DeleteRejectedTrade?ID=" + e,
            type: "GET",
            async: !0,
            success: function (e) {
                null != e && toastr.success(e), SetTradeDataForRefresh();
            },
        });
}
$("#UserIds").on("change", function () {
    "" != $("#UserIds").val()
        ? ($("#AdminIds").val(null).trigger("change"),
            $("#BrokerIds").val(null).trigger("change"),
            $("#SqrOffBtn").show(),
            $("#btnAddWatchList").show(),
            SetTotalBrokrage($("#UserIds").val()),
            (LastPriceDictionary = []),
            (BtnIds = []),
            (_WatchlistCurrentTabIndex = 0),
            clearInterval(myInterval),
            getTradingUnit($("#UserIds").val()),
            (myInterval = setInterval(function () {
                SetTradeDataForRefresh();
            }, 1e3)))
        : ($("#SqrOffBtn").hide(), $("#btnAddWatchList").hide(), (LastPriceDictionary = []), (BtnIds = []), (_WatchlistCurrentTabIndex = 0));
}),
    $("#AdminIds").on("change", function () {
        "" != $("#AdminIds").val()
            ? ($("#BrokerIds").val(null).trigger("change"),
                $("#UserIds").val(null).trigger("change"),
                $("#SqrOffBtn").show(),
                $("#btnAddWatchList").show(),
                (LastPriceDictionary = []),
                (BtnIds = []),
                SetTotalBrokrage($("#AdminIds").val()),
                getTradingUnit($("#AdminIds").val()),
                (_WatchlistCurrentTabIndex = 0),
                clearInterval(myInterval),
                (myInterval = setInterval(function () {
                    SetTradeDataForRefresh();
                }, 1e3)))
            : ($("#SqrOffBtn").hide(), $("#btnAddWatchList").hide(), (LastPriceDictionary = []), (BtnIds = []), (_WatchlistCurrentTabIndex = 0));
    }),
    $("#BrokerIds").on("change", function () {
        "" != $("#BrokerIds").val()
            ? ($("#AdminIds").val(null).trigger("change"),
                $("#UserIds").val(null).trigger("change"),
                $("#SqrOffBtn").show(),
                $("#btnAddWatchList").show(),
                (LastPriceDictionary = []),
                (BtnIds = []),
                (_WatchlistCurrentTabIndex = 0),
                clearInterval(myInterval),
                SetTotalBrokrage($("#BrokerIds").val()),
                getTradingUnit($("#BrokerIds").val()),
                (myInterval = setInterval(function () {
                    SetTradeDataForRefresh();
                }, 1e3)))
            : ($("#SqrOffBtn").hide(), $("#btnAddWatchList").hide(), (LastPriceDictionary = []), (BtnIds = []), (_WatchlistCurrentTabIndex = 0));
    });
