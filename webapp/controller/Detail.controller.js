sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"   // instead of insett in the DB
], function (Controller, UIComponent, History, MessageToast) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this.byId("rating").reset();
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "invoice"
			});
		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var SPreviousHash = oHistory.getPreviousHash();

			if (SPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTi("overview", {}, true);
			}
		},
		onRatingChange: function (oEvent) {
			var fValue = oEvent.getParameter("value");
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			
			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
  
		}

	});
});