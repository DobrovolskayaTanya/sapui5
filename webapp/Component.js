sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"./controller/HelloDialog",
	"sap/ui/Device"
], function (UIComponent, JSONModel, ResourceModel, HelloDialog, Device) {
	"use strict";
	return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
		metadata: {
			manifest: "json"
		},
		init: function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			//set data model
			var oData = {
				recipient: {
					name: "Tanya"
				}
			};
			var oModel = new JSONModel(oData);
			this.setModel(oModel);
			
			// set dialog
			this._helloDialog = new HelloDialog(this.getRootControl());
			//create the views based on the url/hash
			this.getRouter().initialize();
			
			// set device model
			var oDeviceModel =  new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
		},
		getContentDensityClass:function(){
			if(!this._sContentDensityClass){
				if(!Device.support.touch){
					this._sContentDensityClass = "sapUiSizeCompact";
				} else{
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},
		exit: function(){
			this._helloDialog.destroy();
			delete this._helloDialog;
		},
		openHelloDialog:function(){
			this._helloDialog.open();
		}
	});
});