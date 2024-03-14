/**
 * @module PieViewModal
 * @description your dashboard view model code goes here
 * @license
 * Copyright (c) 2014, 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @author ZPK
*/
define([
    'knockout',
    'utils/Core',
    'services/DashboardServices',
    'ojs/ojarraydataprovider',
    'ojs/ojconverter-number',
    'ojs/ojchart',
    // "ojs/ojcontext",
    // "ojs/ojknockout",
    'ojs/ojlabel',
    'ojs/ojinputtext',
    'ojs/ojinputnumber',
    'ojs/ojformlayout',
], function (ko, CoreUtils, DashboardServices, ArrayDataProvider, ojconverter_number_1) {
    'use strict';
    // function DashboardViewModel(Context) {
    //     this.dashboardInputValue = ko.observable("Hello Pavan");
    //     this.inputNumberValue = ko.observable(0);
    // }
    class PieViewModal {
        constructor(params) {
            // super(params);
            console.log('pie params', params); // can access routing details from params object
            // setTimeout(() => {
            //     router.go({path: 'about', params: {id: "myUniqueId"}}); // can route to about page with data(queryParams) sent under params object
            // }, 3000);
            this._initAllIds();
            this._initAllLabels();
            this._initAllObservables(params);
            this._initAllVariables(params);
        }
        // fetchUsersCountries = async() => {
        //     try {
        //         const dataFromService = await DashboardServices.fetchUserCountries();
        //         console.log('countries data', dataFromService);
        //         if (dataFromService) {
        //             this.userCountriesData(dataFromService);
        //         }
        //         // return dataFromService;
        //     } catch(error) {
        //         console.log('error in fetching user countries', error);
        //     }
        // };
        /**
         * @description return the color of the pie chart item
         * @param {object} series
         * @returns {string} color
         */
        pieChartColor = (series) => {
            console.log('series obj', series);
            return series.items[0].data.color;
        };
    }

    /**
     * @function
     * @description Initializes all the observable Ids
     */
    PieViewModal.prototype._initAllIds = function() {
        // console.log('core utils fn', CoreUtils.generateUniqueId());
        this.pieChart1 = CoreUtils.generateUniqueId('piechart1');
    }
    /**
     * @function
     * @description Initializes all the observable labels(transformations)
     */
    PieViewModal.prototype._initAllLabels = function() {

    }
    /**
     * @function _initAllVairables
     * @description initializes dashbaord variables
     */
    PieViewModal.prototype._initAllVariables = function(params) {
        // this.endpoint = ServiceUtils.buildEndPointUrl('getCustomers');
        // this.router = params?.router;
        // const {userCountriesData} = params;
        this.usersPieDataProvider = new ArrayDataProvider(this.userCountriesData, {
            keyAttributes: 'id'
        });
        this.decimalConverter = new ojconverter_number_1.IntlNumberConverter({
            minimumFractionDigits: 0, // 2
            maximumFractionDigits: 0 // 2
        });
        this.percentConverter = new ojconverter_number_1.IntlNumberConverter({
            style: 'percent'
        });
        this.currencyConverter = new ojconverter_number_1.IntlNumberConverter({
            style: 'currency',
            currency: 'USD'
        });
        // this.fetchUsersCountries();
    }
    /**
     * @function
     * @description Initializes all the observable values
     */
    PieViewModal.prototype._initAllObservables = function(params) {
        var self = this; // if this is used we can use self.isInputLastNameDisabled and no need to bind fn()'s.
        const {usersPieSelectionValue, userCountriesData} = params;
        self.usersPieSelectionValue = usersPieSelectionValue; // ko.observableArray([]);
        self.userCountriesData = userCountriesData; // ko.observableArray([]);
        self.formatValue = ko.observable('decimal');
        self.numberConverter = ko.pureComputed(() => {
            if (this.formatValue() == 'decimal') {
                return this.decimalConverter;
            }
            else if (this.formatValue() == 'percent') {
                return this.percentConverter;
            }
            else {
                return this.currencyConverter;
            }
        });
        /**
         * @description identify the pie chart item click as in props we used this observable for selection
         */
        // self.usersPieSelectionValue.subscribe(function([value]) {
        //     console.log('pie item clicked value', value); // value will be keyAttributes we provided in the ArrayDataProvider
        //     self.router.go({path: 'about', params: {id: value}});
        // }.bind(this));
    };
    return PieViewModal;
});
