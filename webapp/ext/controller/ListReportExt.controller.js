sap.ui.define([
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
function (Filter,FilterOperator){
    "use strict";
    return {
        onInit:function(oEvent){
            
            var sTable =this.getView().byId('listReport');
           // sTable.attachBeforeRebindTable(this.onBeforeRebindTable.bind(this));
        },
        onBeforeRebindTable: function (oEvent) {
            
            var filter = new Filter("Name", FilterOperator.EQ, "Smart Design");
            oEvent.getParameters().bindingParams.filters.push(filter)
        
        
            // var oDefaultFilter = {
            //     "Product": "Smart Design"
            // };
        
        
            // oGlobalFilter.setFilterData(oDefaultFilter);
       
        },
        onBeforeRebindDialogTable:function(oEvent){
            var filter = new Filter("Product", FilterOperator.EQ, this.sSelectedField);
            oEvent.getParameters().bindingParams.filters.push(filter)
        },
        onPressCancle:function(oEvent){
            this.oDialog.close()
        },
        onPressRefresh:function(oEvent){
            sap.ui.core.Fragment.byId(this.getView().createId("fragment-1"),"SmartTable").rebindTable()
        },
        onClickLink: function(oEvent) {
           debugger
          this.sSelectedField=oEvent.getSource().getBindingContext().getObject().Product;
           if(!this.pDialog){
           this.pDialog =sap.ui.core.Fragment.load({
            controller:this,
               id:this.getView().createId("fragment-1"),
               name:"myFirst.project1.ext.fragments.test"
           }
           )
           this.pDialog.then(function(oDialog) {
               this.oDialog=oDialog;
               this.getView().addDependent(oDialog);
            oDialog.open();
        }.bind(this))
    }else{
        this.oDialog.open();
    }
           
        }
    };
});
