sap.ui.define(
    ["arvind/ged/cc/controller/baseController",
        "arvind/ged/cc/controller/oDataCall",
        "sap/ui/core/Fragment"
      
      ],
    function(baseController, oDataCall , Fragment ){
        return baseController.extend("arvind.ged.cc.controller.Main",{
           
            onInit() {

                //oPage = this.getView().byId("idPage");
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("init").attachMatched(this.RHM, this);
                // this.getView().byId("lblLineNo").setVisible(false);
            },
            oLocalModel: "",
            oSOF4Model: "",
            soFilter:"",
            RHM: function (oEvent) {
                
                this.getView().byId("lblLineNo").setVisible(false);                
                this.getView().byId("inpLineNo").setVisible(false);
                this.getView().byId("btnGetSo").setVisible(false);

                
                this.getView().byId("lblSoNo").setVisible(false);                
                this.getView().byId("inpSoNo").setVisible(false);                
                this.getView().byId("btnSoDtl").setVisible(false);
            },
            onSoDet:function(){
 
                this.getView().byId("lblSoNo1").setVisible(true);  
                this.getView().byId("txtSoNo1").setVisible(true);
                this.getView().byId("lblSoNo1").setVisible(true);  
                this.getView().byId("txtSoNo1").setVisible(true);
                this.getView().byId("lblOdrVal").setVisible(true);
                this.getView().byId("txtOdrVal").setVisible(true);
                this.getView().byId("lblRevenue").setVisible(true);
                this.getView().byId("lblFobRate").setVisible(true);
                this.getView().byId("txtFobRate").setVisible(true);
                this.getView().byId("lblCust").setVisible(true);
                this.getView().byId("txtCust").setVisible(true);
                this.getView().byId("lblProdType").setVisible(true);
                this.getView().byId("txtProdType").setVisible(true);
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
            onGetLine:function(){
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

                oModel = this.getOwnerComponent().getModel();
                var oJson = new sap.ui.model.json.JSONModel();

                
                
              var EntitySet = '/GetLineNoSet';
              oDataCall.callGetOdata(oModel, oFilter , EntitySet)
              .then(function (responce) {
                debugger;
                      oJson.setData(responce.results); 
                       that.oLocalModel = oJson;
                        that.getView().setModel(that.oLocalModel, "LineNoModel");
                        
               
                 
                 
                 
              })
              .catch(function (Error, sPath) {
                debugger;
                  MessageBox.error("Error in Processing");

              });


               
                this.getView().byId("lblLineNo").setVisible(true);                
                this.getView().byId("inpLineNo").setVisible(true);
                this.getView().byId("btnGetSo").setVisible(true);
            },
            onPopupConfirm:function(oEvent){
            debugger;
            var sID = oEvent.getSource().getId();
            if (sID.indexOf("SalesOrgF4") !== -1)
            {

                var oSelectItem = oEvent.getParameter("selectedItem");
                this.oField.setValue(oSelectItem.getTitle());
            }
            },
            oSalesOrgF4 : null,
            onSOF4:function(oEvent){
  
                this.oField = oEvent.getSource();
                var that = this;
                if(! this.oSalesOrgF4)
                {
                    debugger;
                    Fragment.load({
                        controller:this,
                        id:'SalesOrgF4',
                        fragmentName: 'arvind.ged.cc.fragments.popup'
                    }).then(function(oFragment){
                        that.oSalesOrgF4 = oFragment;  

                        that.oSalesOrgF4.setMultiSelect(false);
                                     
                        that.oSalesOrgF4.bindAggregation("items",{
                            path:'/GetSoNoSet',
                            template:new sap.m.StandardListItem({
                                title : '{So}',
                                 description: '{So}'
                                
                            }),
                            filters:that.soFilter

                        });
                        that.getView().addDependent(that.oSalesOrgF4);
                        
                        oFragment.open();
                    });

                }else{

                    this.oSalesOrgF4.open();
                    this.oSalesOrgF4.bindAggregation("items",{
                        path:'/GetSoNoSet',
                        template:new sap.m.StandardListItem({
                            title : '{So}',
                            description: '{So}'
                            
                        }),
                        filters:that.soFilter

                    });
                }
              

            },
           

            onSoNo:function(){
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
              oDataCall.callGetOdata(oModel, oFilter , EntitySet)
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
            }



            }         
           
        );

    })  ;