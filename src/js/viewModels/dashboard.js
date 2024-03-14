/**
* 
*/
define([
    'ojs/ojtranslation',
    'knockout',
    'utils/Core',
    'utils/Service',
    'services/DashboardServices',
    'ojs/ojarraydataprovider',
    'ojs/ojconverter-number',
    'text!../../dataVisualizations/chart/resources/piechartData.json',
    'ojs/ojmodule-element-utils',
    'ojs/ojchart',
    // "ojs/ojcontext",
    // "ojs/ojknockout",
    'ojs/ojlabel',
    'ojs/ojinputtext',
    'ojs/ojinputnumber',
    'ojs/ojformlayout',
    'ojs/ojconveyorbelt',
], function (Translations, ko, CoreUtils, ServiceUtils, DashboardServices, ArrayDataProvider, ojconverter_number_1, data, ModuleElementUtils) {
    'use strict';
    // function DashboardViewModel(Context) {
    //     this.dashboardInputValue = ko.observable("Hello Pavan");
    //     this.inputNumberValue = ko.observable(0);
    // }
    const _t = Translations.getTranslatedString;
    class DashboardViewModel {
        constructor(params) {
            const {router} = params;
            // super(params);
            console.log('dashboard params', params); // can access routing details from params object
            // setTimeout(() => {
            //     router.go({path: 'about', params: {id: "myUniqueId"}}); // can route to about page with data(queryParams) sent under params object
            // }, 3000);
            this._initAllIds();
            this._initAllLabels();
            this._initAllObservables();
            this._initAllVariables(params);
        }
        fetchUsersCountByAge = async() => {
            try {
                const dataFromService = await DashboardServices.fetchUserCountries();
                console.log('countries data', dataFromService);
                if (dataFromService) {
                    this.userCountriesData(dataFromService);
                }
            } catch (error) {
                console.log('error while getting userCountByAge', error);
            }
        };
        fetchUsersCountries = async() => {
            try {
                const dataFromService = await DashboardServices.fetchUsersCountByAge();
                console.log('usersCountByAge data', dataFromService);
                if (dataFromService) {
                    this.usersCountByAgeData(dataFromService);
                }
                // return dataFromService;
            } catch(error) {
                console.log('error in fetching user countries', error);
            }
        };
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
     * @description loads pie chart data by making api call and do data mapping
     */
    DashboardViewModel.prototype._loadPieChartData = function() {
        this.fetchUsersCountByAge();
        this.fetchUsersCountries();
    }
    /**
     * @function
     * @description Initializes all the observable Ids
     */
    DashboardViewModel.prototype._initAllIds = function() {
        // console.log('core utils fn', CoreUtils.generateUniqueId());
        this.pieChart1 = CoreUtils.generateUniqueId('piechart1');
        this.chartContainer = CoreUtils.generateUniqueId('chartContainer');
    }
    /**
     * @function
     * @description Initializes all the observable labels(transformations)
     */
    DashboardViewModel.prototype._initAllLabels = function() {
        this.usersDemoDataLabel = _t('headers.usersDemoData');
    }
    /**
     * @function _initAllVairables
     * @description initializes dashbaord variables
     */
    DashboardViewModel.prototype._initAllVariables = function(params) {
        // this.endpoint = ServiceUtils.buildEndPointUrl('getCustomers');
        const modulesConfigArray = [
            {
                module: ModuleElementUtils.createConfig({
                    name: 'charts/pie',
                    params: {
                        usersPieSelectionValue: this.usersPieSelectionValue,
                        userCountriesData: this.userCountriesData
                    }
                })
            },
            {
                module: ModuleElementUtils.createConfig({
                    name: 'charts/pie',
                    params: {
                        usersPieSelectionValue: this.usersCountByAgeValue,
                        userCountriesData: this.usersCountByAgeData
                    }
                })
            },
            {
                module: ModuleElementUtils.createConfig({
                    name: 'charts/pie',
                    params: {
                        usersPieSelectionValue: this.usersPieSelectionValue,
                        userCountriesData: [],//this.userCountriesData
                    }
                })
            },
            {
                module: ModuleElementUtils.createConfig({
                    name: 'charts/pie',
                    params: {
                        usersPieSelectionValue: this.usersPieSelectionValue,
                        userCountriesData: this.userCountriesData
                    }
                })
            },
        ]
        this.modulesDataProvider = new ArrayDataProvider(modulesConfigArray);
        this._loadPieChartData();
        // this.pieChartModuleConfig = ModuleElementUtils.createConfig({
        //     name: 'charts/pie',
        //     params: {
        //         usersPieSelectionValue: this.usersPieSelectionValue,
        //         userCountriesData: this.userCountriesData
        //     }
        // });
        // this.pieChart2ModuleConfig = ModuleElementUtils.createConfig({
        //     name: 'charts/pie',
        //     params: {
        //         usersPieSelectionValue: this.usersPieSelectionValue,
        //         userCountriesData: this.userCountriesData
        //     }
        // });
        this.router = params?.router;
        // this.usersPieDataProvider = new ArrayDataProvider(this.userCountriesData, {
        //     keyAttributes: 'id'
        // });
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
    }
    /**
     * @function
     * @description Initializes all the observable values
     */
    DashboardViewModel.prototype._initAllObservables = function() {
        var self = this; // if this is used we can use self.isInputLastNameDisabled and no need to bind fn()'s.
        self.usersPieSelectionValue = ko.observableArray([]);
        self.userCountriesData = ko.observableArray([]);
        self.usersCountByAgeData = ko.observableArray([]);
        self.usersCountByAgeValue = ko.observableArray([]);
        self.formatValue = ko.observable('decimal');
        // self.numberConverter = ko.pureComputed(() => {
        //     if (this.formatValue() == 'decimal') {
        //         return this.decimalConverter;
        //     }
        //     else if (this.formatValue() == 'percent') {
        //         return this.percentConverter;
        //     }
        //     else {
        //         return this.currencyConverter;
        //     }
        // });
        /**
         * @description identify the pie chart item click as in props we used this observable for selection
         */
        self.usersPieSelectionValue.subscribe(function([value]) {
            console.log('pie item clicked value', value); // value will be keyAttributes we provided in the ArrayDataProvider
            self.router.go({path: 'about', params: {id: value}});
        }.bind(this));
        self.usersCountByAgeValue.subscribe(function([value]) {
            self.router.go({path: 'books', params: {id: value}});
        }.bind(this));
    };
    return DashboardViewModel;
});
