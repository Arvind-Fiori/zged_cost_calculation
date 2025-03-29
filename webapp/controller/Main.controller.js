sap.ui.define(
    ["arvind/ged/cc/controller/baseController",
        "arvind/ged/cc/controller/oDataCall",
        "sap/ui/core/Fragment",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
         "sap/ui/model/FilterOperator",
        "sap/ui/model/Filter"

    ],
    function (baseController, oDataCall, Fragment, MessageBox, MessageToast, FilterOp ,Filter) {
        return baseController.extend("arvind.ged.cc.controller.Main", {

            onInit() {

                //oPage = this.getView().byId("idPage");
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("init").attachMatched(this.RHM, this);
                // this.getView().byId("lblLineNo").setVisible(false);
            },
            
            oLocalModel: "",
            sF4SONO : "",
            oSOF4Model: "",
            soFilter: "",
            RHM: function (oEvent) {

                this.hideLineNo();
                this.hideSoInput();
                this.hideSoHeader();
                this.hideRevenue();
                this.hideMaterials();
                this.hideManufacturing();
                this.hideCostWorkings();


            },
            onSoDet: function () {
                var that = this;
                const oFilter = [];
                debugger;
                var sSoNo = this.getView().byId("inpSoNo").getValue();

                if  ( sSoNo  != '' ){
                    if ( this.sF4SONO == sSoNo )
                     {    
                    var lv_check_so = 'X';
                     }
                     else
                     {
                    //     MessageBox.error("Please Select Sales Order From F4");
                    // return;
                 
                     }
                } 
                else
                {
                 this.hideSoHeader();
                 this.hideRevenue();
                 this.hideMaterials();
                 this.hideManufacturing();
                 this.hideCostWorkings();



                 MessageBox.error("Please Select So No.");
                    return;
                }                 
                // *************************************So details***********************************************
                var oSoNo = new sap.ui.model.Filter("So", sap.ui.model.FilterOperator.EQ, sSoNo);
                oFilter.push(oSoNo);
               
                oModel = this.getOwnerComponent().getModel();
                var oJson = new sap.ui.model.json.JSONModel();
                var oBusy = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "Please Wait...."

                });
                oBusy.open();
                var EntitySet = '/GetSoDetailSet';
                oDataCall.callGetOdata(oModel, oFilter, EntitySet)
                    .then(function (responce) {
                        oBusy.close();
                        debugger;
                        oJson.setData(responce.results);
                        that.oLocalModel = oJson;
                        that.getView().setModel(that.oLocalModel, "SoDetail");
                        // if ( lv_check_so == 'X' ) {
                        //   delete lv_check_so; //to check so is initial
                        that.showSoHeader();
                        that.showRevenue();
                        that.showMaterials();
                        that.showManufacturing();
                        that.showCostWorkings();
                        // }
                        
                        // if (oJson.oData[0] && oJson.oData[0].So) {
                        //     // that.getView().byId("txtSoNo1").setValue(oJson.oData[0].So);
                        //     //  that.getView().byId("txtSoNo1").bindProperty("text", "SoDetail>/0/So");
                        //     that.showSoHeader();
                        // } else {
                        //     console.error("No So data found.");
                        // }


                    })
                    .catch(function (Error, sPath) {
                        debugger;
                        oBusy.close();
                        var message = Error.responseText.split("MSG:")[3];
                        MessageBox.error(message);


                    });


                // **************************************So details**********************************************
            },
            changeLineNo: function (oEvent) {
                this.hideSoHeader();
                this.hideRevenue();
                this.hideMaterials();
                this.hideManufacturing();
                this.hideCostWorkings();
                debugger;
                var sLineNo = this.getView().byId("inpLineNo").getValue();
                if (sLineNo != '') {
                    this.showSoInput();
                }
                else {
                    this.hideSoInput();
                }
            },
          
            onGetLine: function () {
                this.hideSoHeader();
                this.hideRevenue();
                this.hideMaterials();
                this.hideManufacturing();
                this.hideCostWorkings();
                this.hideLineNo();
                this.hideSoInput();
                debugger;
                var that = this;
                const oFilter = [];

                // Odata Format to pass Date is 'YYYY-MM-DD'
                var sFromDate = this.getView().byId("DP1").getValue();

                var sToDate = this.getView().byId("DP2").getValue();
                if (sFromDate == '') {
                    this.hideLineNo();


                    MessageBox.error("Please Enter From Date");
                    return;


                }
                var oFromDate = new sap.ui.model.Filter("FromDate", sap.ui.model.FilterOperator.EQ, sFromDate);
                oFilter.push(oFromDate);
                if (sToDate != '') {
                    var oToDate = new sap.ui.model.Filter("ToDate", sap.ui.model.FilterOperator.EQ, sToDate);

                    oFilter.push(oToDate);
                }

                oModel = this.getOwnerComponent().getModel();
                var oJson = new sap.ui.model.json.JSONModel();



                var EntitySet = '/GetLineNoSet';
                var oBusy = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "Please Wait...."

                });
                oBusy.open();
                oDataCall.callGetOdata(oModel, oFilter, EntitySet)
                    .then(function (responce) {
                        debugger;
                        oBusy.close();
                        oJson.setData(responce.results);
                        that.oLocalModel = oJson;
                        that.getView().setModel(that.oLocalModel, "LineNoModel");

                        that.showLineNo();


                    })
                    .catch(function (Error, sPath) {
                        debugger;
                        oBusy.close();
                        that.hideLineNo();

                       
                                var message = Error.responseText.split("MSG:")[3];
                                MessageBox.error(message);

                    });




            },
            onPopupSearch:function(oEvent){
                debugger;
                  var sVal = oEvent.getParameter("value");
  
                  var oDialog = oEvent.getSource();
  
                  var oBinding = oDialog.getBinding("items");
                  var sID = oEvent.getSource().getId();            
                  var oFilter = new Filter("So" , FilterOp.Contains, sVal);                                
                  oBinding.filter(oFilter);
              },
            onPopupConfirm: function (oEvent) {
                debugger;
                var sID = oEvent.getSource().getId();
                if (sID.indexOf("SalesOrgF4") !== -1) {

                    var oSelectItem = oEvent.getParameter("selectedItem");
                    this.oField.setValue(oSelectItem.getTitle());
                    this.sF4SONO = oSelectItem.getTitle()
                    this.getView().byId("btnSoDtl").setVisible(true);
                }
            },
            oSalesOrgF4: null,
            onSOF4: function (oEvent) {
                const oFilter = [];
                var sFromDate = this.getView().byId("DP1").getValue();

                var sToDate = this.getView().byId("DP2").getValue();

                var oFromDate = new sap.ui.model.Filter("FromDate", sap.ui.model.FilterOperator.EQ, sFromDate);
                oFilter.push(oFromDate);
                if ( sToDate != '')
                {
                var oToDate = new sap.ui.model.Filter("ToDate", sap.ui.model.FilterOperator.EQ, sToDate);
                oFilter.push(oToDate);
                }
                var sLineNo = this.getView().byId("inpLineNo").getValue();

                var oLineNo = new sap.ui.model.Filter("LineNo", sap.ui.model.FilterOperator.EQ, sLineNo);
                oFilter.push(oLineNo);
                this.soFilter = oFilter;
                this.oField = oEvent.getSource();
                var that = this;
// 

if (!this.oSalesOrgF4) {
    // Create the fragment using sap.ui.xmlfragment
    this.oSalesOrgF4 = sap.ui.xmlfragment(
        "SalesOrgF4", // Unique ID
        "arvind.ged.cc.fragments.popup", // Fragment name with namespace
        this // Controller reference
    );

    // Add fragment as a dependent to the view
    this.getView().addDependent(this.oSalesOrgF4);

    // Set multi-select if needed
    this.oSalesOrgF4.setMultiSelect(false);

    // Bind aggregation to the list
    this.oSalesOrgF4.bindAggregation("items", {
        path: "/GetSoNoSet",
        template: new sap.m.StandardListItem({
            title: "{So}"
        }),
        filters: this.soFilter
    });

    // Open the fragment
    this.oSalesOrgF4.open();
} else {
    // If fragment already exists
    this.oSalesOrgF4.open();
    this.oSalesOrgF4.bindAggregation("items", {
        path: "/GetSoNoSet",
        template: new sap.m.StandardListItem({
            title: "{So}"
        }),
        filters: this.soFilter
    });
}

// 

                // if (!this.oSalesOrgF4) {
                    debugger; 
                   
              
                //     Fragment.load({
                //         controller: this,
                //         id: 'SalesOrgF4',
                       
                //         fragmentName: 'arvind.ged.cc.fragments.popup'
                //     }).then(function (oFragment) {
                //         that.oSalesOrgF4 = oFragment;

                //         that.oSalesOrgF4.setMultiSelect(false);
                //         debugger;
                //         that.oSalesOrgF4.bindAggregation("items", {
                //             path: '/GetSoNoSet',
                //             template: new sap.m.StandardListItem({
                //                 title: '{So}'
                               

                //             }),
                //           filters: that.soFilter

                //         });
                //         that.getView().addDependent(that.oSalesOrgF4);
                       
                //         oFragment.open();
                //     }.bind(this))

                // } else {
                //     debugger;
                //     this.oSalesOrgF4.open();
                //     this.oSalesOrgF4.bindAggregation("items", {
                //         path: '/GetSoNoSet',
                //         template: new sap.m.StandardListItem({
                //             title: '{So}'

                //         }),
                //         filters: that.soFilter

                //     });
                //  }


            },


            onSoNo: function () {
                debugger;


                var that = this;
                const oFilter = [];

                // Odata Format to pass Date is 'YYYY-MM-DD'
                var sFromDate = this.getView().byId("DP1").getValue();

                var sToDate = this.getView().byId("DP2").getValue();

                var oFromDate = new sap.ui.model.Filter("FromDate", sap.ui.model.FilterOperator.EQ, sFromDate);
                oFilter.push(oFromDate);

                var oToDate = new sap.ui.model.Filter("ToDate", sap.ui.model.FilterOperator.EQ, sToDate);
                oFilter.push(oToDate);

                var sLineNo = this.getView().byId("inpLineNo").getValue();

                var oLineNo = new sap.ui.model.Filter("LineNo", sap.ui.model.FilterOperator.EQ, sLineNo);
                oFilter.push(oLineNo);

                oModel = this.getOwnerComponent().getModel();
                var oJson = new sap.ui.model.json.JSONModel();



                var EntitySet = '/GetSoNoSet';
                this.soFilter = oFilter;
                oDataCall.callGetOdata(oModel, oFilter, EntitySet)
                    .then(function (responce) {
                        debugger;
                        oJson.setData(responce.results);
                        that.oLocalModel = oJson;
                        that.getView().setModel(that.oLocalModel, "SOF4");

                    })
                    .catch(function (Error, sPath) {
                        debugger;
                        MessageBox.error("Error in Processing");

                    });

                this.getView().byId("lblSoNo").setVisible(true);
                this.getView().byId("inpSoNo").setVisible(true);
                this.getView().byId("btnSoDtl").setVisible(true);
            },
            hideSoInput: function () {
                this.getView().byId("inpSoNo").setValue('');
                this.getView().byId("lblSoNo").setVisible(false);
                this.getView().byId("inpSoNo").setVisible(false);
                this.getView().byId("btnSoDtl").setVisible(false);
            },
            showSoInput: function () {
                this.getView().byId("inpSoNo").setValue('');
                this.getView().byId("lblSoNo").setVisible(true);
                this.getView().byId("inpSoNo").setVisible(true);
                this.getView().byId("btnSoDtl").setVisible(false);

            },
            hideLineNo: function () {
                this.getView().byId("inpLineNo").setValue('');
                this.getView().byId("lblLineNo").setVisible(false);
                this.getView().byId("inpLineNo").setVisible(false);
                this.getView().byId("btnGetSo").setVisible(false);
            },

            showLineNo: function () {

                this.getView().byId("lblLineNo").setVisible(true);
                this.getView().byId("inpLineNo").setVisible(true);
                // this.getView().byId("btnGetSo").setVisible(true);
            },
            hideSoHeader: function () {
                this.getView().byId("lblSoNo1").setVisible(false);
                this.getView().byId("txtSoNo1").setVisible(false);
                this.getView().byId("lblOdrVal").setVisible(false);
                this.getView().byId("txtOdrVal").setVisible(false);
                this.getView().byId("lblCust").setVisible(false);
                this.getView().byId("txtCust").setVisible(false);
                this.getView().byId("lblProdType").setVisible(false);
                this.getView().byId("txtProdType").setVisible(false);
            },
            showSoHeader: function () {
                this.getView().byId("lblSoNo1").setVisible(true);
                this.getView().byId("txtSoNo1").setVisible(true);
                this.getView().byId("lblOdrVal").setVisible(true);
                this.getView().byId("txtOdrVal").setVisible(true);
                this.getView().byId("lblCust").setVisible(true);
                this.getView().byId("txtCust").setVisible(true);
                this.getView().byId("lblProdType").setVisible(true);
                this.getView().byId("txtProdType").setVisible(true);
            },
            showRevenue: function () {
                this.getView().byId("lblRevenue").setVisible(true);
                this.getView().byId("lblFobRate").setVisible(true);
                this.getView().byId("txtFobRate").setVisible(true);
            },
            hideRevenue: function () {
                this.getView().byId("lblRevenue").setVisible(false);
                this.getView().byId("lblFobRate").setVisible(false);
                this.getView().byId("txtFobRate").setVisible(false);
            },
            showMaterials: function () {
                this.getView().byId("lblMaterials").setVisible(true);
                this.getView().byId("lblShellFabric").setVisible(true);
                this.getView().byId("txtShellFabric").setVisible(true);
                this.getView().byId("lblTrimFabric").setVisible(true);
                this.getView().byId("txtTrimFabric").setVisible(true);
                this.getView().byId("lblTrims").setVisible(true);
                this.getView().byId("txtTrims").setVisible(true);
                this.getView().byId("txtTrims").setVisible(true);
                this.getView().byId("lblPrintingAndOthers").setVisible(true);
                this.getView().byId("txtPrintingAndOthers").setVisible(true);
                this.getView().byId("lblTransportation").setVisible(true);
                this.getView().byId("txtTransportation").setVisible(true);
                this.getView().byId("lblTestingAndDevelopment").setVisible(true);
                this.getView().byId("txtTestingAndDevelopment").setVisible(true);
                this.getView().byId("lblVariableMaterialsCost").setVisible(true);
                this.getView().byId("txtVariableMaterialsCost").setVisible(true);
                this.getView().byId("lblValueLoss").setVisible(true);
                this.getView().byId("txtValueLoss").setVisible(true);
                this.getView().byId("lblTotalCostOfMaterials").setVisible(true);
                this.getView().byId("txtTotalCostOfMaterials").setVisible(true);
            },
            hideMaterials: function () {
                this.getView().byId("lblMaterials").setVisible(false);
                this.getView().byId("lblShellFabric").setVisible(false);
                this.getView().byId("txtShellFabric").setVisible(false);
                this.getView().byId("lblTrimFabric").setVisible(false);
                this.getView().byId("txtTrimFabric").setVisible(false);
                this.getView().byId("lblTrims").setVisible(false);
                this.getView().byId("txtTrims").setVisible(false);
                this.getView().byId("txtTrims").setVisible(false);
                this.getView().byId("lblPrintingAndOthers").setVisible(false);
                this.getView().byId("txtPrintingAndOthers").setVisible(false);
                this.getView().byId("lblTransportation").setVisible(false);
                this.getView().byId("txtTransportation").setVisible(false);
                this.getView().byId("lblTestingAndDevelopment").setVisible(false);
                this.getView().byId("txtTestingAndDevelopment").setVisible(false);
                this.getView().byId("lblVariableMaterialsCost").setVisible(false);
                this.getView().byId("txtVariableMaterialsCost").setVisible(false);
                this.getView().byId("lblValueLoss").setVisible(false);
                this.getView().byId("txtValueLoss").setVisible(false);
                this.getView().byId("lblTotalCostOfMaterials").setVisible(false);
                this.getView().byId("txtTotalCostOfMaterials").setVisible(false);
            },
            showManufacturing: function () {
                this.getView().byId("lblManufacturing").setVisible(true);
                this.getView().byId("lblSmv").setVisible(true);
                this.getView().byId("txtSmv").setVisible(true);
                this.getView().byId("lblTargetLineEff").setVisible(true);
                this.getView().byId("txtTargetLineEff").setVisible(true);
                this.getView().byId("lblTargetProdnDayLine").setVisible(true);
                this.getView().byId("txtTargetProdnDayLine").setVisible(true);
                this.getView().byId("lblProdnLine").setVisible(true);
                this.getView().byId("txtProdnLine").setVisible(true);
                this.getView().byId("lblNoOfDays").setVisible(true);
                this.getView().byId("txtNoOfDays").setVisible(true);
                this.getView().byId("lblActualLineEff").setVisible(true);
                this.getView().byId("txtlblActualLineEff").setVisible(true);
                this.getView().byId("lblActualProdn").setVisible(true);
                this.getView().byId("txtActualProdn").setVisible(true);
            },
            hideManufacturing: function () {
                this.getView().byId("lblManufacturing").setVisible(false);
                this.getView().byId("lblSmv").setVisible(false);
                this.getView().byId("txtSmv").setVisible(false);
                this.getView().byId("lblTargetLineEff").setVisible(false);
                this.getView().byId("txtTargetLineEff").setVisible(false);
                this.getView().byId("lblTargetProdnDayLine").setVisible(false);
                this.getView().byId("txtTargetProdnDayLine").setVisible(false);
                this.getView().byId("lblProdnLine").setVisible(false);
                this.getView().byId("txtProdnLine").setVisible(false);
                this.getView().byId("lblNoOfDays").setVisible(false);
                this.getView().byId("txtNoOfDays").setVisible(false);
                this.getView().byId("lblActualLineEff").setVisible(false);
                this.getView().byId("txtlblActualLineEff").setVisible(false);
                this.getView().byId("lblActualProdn").setVisible(false);
                this.getView().byId("txtActualProdn").setVisible(false);
            },
            showCostWorkings: function () {
                this.getView().byId("lblCostWorkings").setVisible(true);
                this.getView().byId("lblGrossContribution").setVisible(true);
                this.getView().byId("txtGrossContribution").setVisible(true);
                this.getView().byId("lblGrossContributionLineDay").setVisible(true);
                this.getView().byId("txtGrossContributionLineDay").setVisible(true);
                this.getView().byId("lblOperationCostLineDay").setVisible(true);
                this.getView().byId("txtOperationCostLineDay").setVisible(true);
                this.getView().byId("lblEbitdaLineDay").setVisible(true);
                this.getView().byId("txtEbitdaLineDay").setVisible(true);
                this.getView().byId("lblAnnualisedEbitda").setVisible(true);
                this.getView().byId("txtAnnualisedEbitda").setVisible(true);
                this.getView().byId("lblAssetBlockLine").setVisible(true);
                this.getView().byId("txtAssetBlockLine").setVisible(true);
                this.getView().byId("lblDepreciationLine").setVisible(true);
                this.getView().byId("txtDepreciationLine").setVisible(true);
                this.getView().byId("lblWorkingCapitalLine").setVisible(true);
                this.getView().byId("txtWorkingCapitalLine").setVisible(true);
                this.getView().byId("lblTotalCapitalEmployedLine").setVisible(true);
                this.getView().byId("txtTotalCapitalEmployedLine").setVisible(true);
                this.getView().byId("lblAnnualisedRoceLine").setVisible(true);
                this.getView().byId("txtAnnualisedRoceLine").setVisible(true);
                this.getView().byId("lblAnnualisedRoce").setVisible(true);
                this.getView().byId("txtAnnualisedRoce").setVisible(true);
            },
            hideCostWorkings: function () {
                this.getView().byId("lblCostWorkings").setVisible(false);
                this.getView().byId("lblGrossContribution").setVisible(false);
                this.getView().byId("txtGrossContribution").setVisible(false);
                this.getView().byId("lblGrossContributionLineDay").setVisible(false);
                this.getView().byId("txtGrossContributionLineDay").setVisible(false);
                this.getView().byId("lblOperationCostLineDay").setVisible(false);
                this.getView().byId("txtOperationCostLineDay").setVisible(false);
                this.getView().byId("lblEbitdaLineDay").setVisible(false);
                this.getView().byId("txtEbitdaLineDay").setVisible(false);
                this.getView().byId("lblAnnualisedEbitda").setVisible(false);
                this.getView().byId("txtAnnualisedEbitda").setVisible(false);
                this.getView().byId("lblAssetBlockLine").setVisible(false);
                this.getView().byId("txtAssetBlockLine").setVisible(false);
                this.getView().byId("lblDepreciationLine").setVisible(false);
                this.getView().byId("txtDepreciationLine").setVisible(false);
                this.getView().byId("lblWorkingCapitalLine").setVisible(false);
                this.getView().byId("txtWorkingCapitalLine").setVisible(false);
                this.getView().byId("lblTotalCapitalEmployedLine").setVisible(false);
                this.getView().byId("txtTotalCapitalEmployedLine").setVisible(false);
                this.getView().byId("lblAnnualisedRoceLine").setVisible(false);
                this.getView().byId("txtAnnualisedRoceLine").setVisible(false);
                this.getView().byId("lblAnnualisedRoce").setVisible(false);
                this.getView().byId("txtAnnualisedRoce").setVisible(false);
            }

        }

        );

    });