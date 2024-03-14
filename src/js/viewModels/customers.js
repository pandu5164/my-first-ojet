/**
* 
*/
define([
    'ojs/ojtranslation',
    'exports',
    'knockout',
    'utils/Core',
    'services/CustomerServices',
    'ojs/ojasyncvalidator-length',
    'ojs/ojarraydataprovider',
    "ojs/ojcontext",
    "ojs/ojknockout",
    'ojs/ojformlayout',
    'ojs/ojlabel',
    'ojs/ojinputtext',
    'ojs/ojinputnumber',
    'ojs/ojdatetimepicker',
    'ojs/ojselectsingle',
    'ojs/ojselectcombobox',
    'oj-c/select-multiple',
    'oj-c/button',
    'ojs/ojvalidationgroup',
    'ojs/ojmessages'
], function (Translations, exports, ko, CoreUtils, CustomerServices, AsyncLengthValidator, ArrayDataProvider, Context) {
    'use strict';
    // function DashboardViewModel(Context) {
    //     this.dashboardInputValue = ko.observable("Hello Pavan");
    //     this.inputNumberValue = ko.observable(0);
    // }
    const _t = Translations.getTranslatedString;
    class CustomerViewModel {
        constructor() {
            this._initAllIds();
            this._initAllLabels();
            this._initVariables();
            this._initAllObservables();
            this._initValidators();
            // this._intiEventHandlers();
            this.onInputFirstNameValueChange = this._onInputFirstNameValueChange.bind(this);
            this.onInputFirstNameRawValueChange = this._onInputFirstNameRawValueChange.bind(this);
            this.onInputWeightRawValueChange = this._onInputWeightRawValueChange.bind(this);
            this.onInputBirthdayValueChange = this._onInputBirthdayValueChange.bind(this);
            this.onInputCountryValueChanged = this._oninputCountryValueChanged.bind(this);
            this.onCreateButtonClick = this._onCreateButtonClick.bind(this);
            this.onResetButtonClick = this._onResetButtonClick.bind(this);
            this.createMessage = this._createMessage.bind(this);
            this.closeMessageHandler = this._closeMessageHandler.bind(this);
            this.getMessageDetail = this._getMessageDetail.bind(this);
            this.computedTimeStamp = this._computedTimeStamp.bind(this);
            this.computedCloseAffordanceFn = this._computedCloseAffordanceFn.bind(this);
            this.computedSoundFn = this._computedSoundFn.bind(this);
            // console.log('dashboardView modal obj', this);
        }
    }
    /**
     * @function _onResetButtonClick
     * @description reset selections made in form
     */
    CustomerViewModel.prototype._onResetButtonClick = async function () {
        console.log('Reset button clicked, now we are resetting form selections');
        this.inputFirstNameValue(null);
        this.inputLastNameValue(null);
        this.inputFullNameValue(null);
        this.inputWeightValue(null);
        this.inputAgeValue(null);
        this.inputBirthdayValue(null);
        this.inputCountryValue(null);
        this.inputStateValue(null);
        this.isInputStateDisabled(false);
        // let api_url = "https://jsonplaceholder.typicode.com/comments";
        // let dataFromService;
        // try {
        //     const response = await fetch(api_url);
        //     if (!response.ok) { throw Error('Something went wrong'); }
        //     dataFromService = await response.json();
        //     console.log('response data from api', dataFromService);
        // } catch (error) {
        //     console.log('error in api call', error);
        // }
    }
    /**
     * @function _onCreateButtonClick
     * @description tells what to do when create button clicked
     */
    CustomerViewModel.prototype._onCreateButtonClick = async function() {
        const valid = CoreUtils.checkValidationGroup(this.formValidationGroupId);
        // or we can use individual elements for validation which returns promise and we can save it in an array and check once we received all promises
        // document.getElementById(this.inputFirstNameId).validate(); //-> which returns promise
        if (valid) {
            const jsonServiceRequest = {
                firstName: this.inputFirstNameValue(),
                lastName: this.inputLastNameValue(),
                dob: this.inputBirthdayValue(),
                weight: this.inputWeightValue(),
                country: this.inputCountryValue(),
                state: this.inputStateValue(),

            }
            let dataFromService;
            let arrDp;
            try {
                dataFromService = await CustomerServices.saveCustomer(jsonServiceRequest);
                console.log('Response data', dataFromService);
                if (dataFromService?.id) {
                    arrDp = new ArrayDataProvider([{
                        severity: 'confirmation',
                        summary: 'Confirmation message',
                        detail: 'Form saved successfully',
                        timestamp: this._computedTimeStamp(),
                        autoTimeout: 2500,
                    }]);
                    this._onResetButtonClick();
                }
            } catch(error) {
                console.log('error is', error);
                arrDp = new ArrayDataProvider([{
                    severity: 'error',
                    summary: 'Error message',
                    detail: 'Error while saving data',
                    timestamp: this._computedTimeStamp(),
                    autoTimeout: 2500,
                }]);
                return error;
            }
            // submit the form would go here
            this.messagesDataProvider(arrDp);
        }
    }
    /**
     * @function _getState
     * @description get state array values based on country value
     */
    CustomerViewModel.prototype._getState = function (value) {
        if (value) {
            //method - 1
            // let results = []
            // for (let key of Object.keys(this.stateData)) {
            //     if (key.match(value)) { result.push(this.stateData[key]); }
            // } 
            // return results[0];
            // (or) 
            // method - 2
            // Object.keys(this.stateData).filter((key) => key.match(value)).forEach((key) => {
            //     results.push(this.stateData[key]);
            // });
            // return results[0];
            // (or) use method - 3 written below  -> to extract value out of matching key in an object
            return Object.keys(this.stateData)
                .filter((key) => key.match(value))
                .map((k) => this.stateData[k])[0];
        }
        return [];
    }
    /**
     * @function _oninputCountryValueChanged
     * @description maps respective state based on selected country
     */
    CustomerViewModel.prototype._oninputCountryValueChanged = function (event) {
        const value = event?.detail.value;
        this.inputStateValue(null);
        if (value) {
            this.isInputStateDisabled(false);
            const selectedStateArr = this._getState(value);
            this.selectedCountryStates(selectedStateArr);
            const stateDataProvider = new ArrayDataProvider(selectedStateArr, {
                keyAttributes: "value",
            });
            this.inputStateDataProvider(stateDataProvider);
        } else {
            this.isInputStateDisabled(true);
            this.inputStateDataProvider(new ArrayDataProvider([], {
                keyAttributes: "value",
            }));
        }
    }

    /**
 * @function _onInputFirstNameValueChange
 * @description Initializing event handlers 
 */
    CustomerViewModel.prototype._onInputFirstNameValueChange = function (event) {
        // this.onInputFirstNameValueChange = function(event) {
        // console.log('event for fName change', event);
        const value = event?.detail.value;
        if (value) {
            this.isInputLastNameDisabled(false);
            return;
        }
        this.isInputLastNameDisabled(true);
        // }.bind(this);
        // this.onInputFirstNameRawValueChange = function(event) {

        // }.bind(this);
    }

    /**
 * @function onInputFirstNameRawValueChange
 * @description Initializing event handlers 
 */
    CustomerViewModel.prototype._onInputFirstNameRawValueChange = function (event) {
        // this.onInputFirstNameValueChange = function(event) {
        // console.log('event for fName change', event);
        const value = event?.detail.value;
        if (value) {
            event.currentTarget.validate();
        }
        // if(value) {
        //     this.isInputLastNameDisabled(false);
        //     return;
        // }
        // this.isInputLastNameDisabled(true);
        // }.bind(this);
        // this.onInputFirstNameRawValueChange = function(event) {

        // }.bind(this);
    }
    /**
* @function _onInputWeightRawValueChange
* @description Initializing event handlers 
*/
    CustomerViewModel.prototype._onInputWeightRawValueChange = function (event) {
        // this.onInputFirstNameValueChange = function(event) {
        // console.log('event for fName change', event);
        const value = event?.detail.value;
        if (value && Number(value) <= 2) {
            this.inputWeightMessagesCustom([this.weightMessage])
        } else {
            this.inputWeightMessagesCustom([]);
        }
        // if(value) {
        //     this.isInputLastNameDisabled(false);
        //     return;
        // }
        // this.isInputLastNameDisabled(true);
        // }.bind(this);
        // this.onInputFirstNameRawValueChange = function(event) {

        // }.bind(this);
    }
    /**
     * @function _getAge
     * @description calculates age based on ISO strings
     * @param {ISOString} dateString ISO string from input date type
     * @returns {Number}
     */
    CustomerViewModel.prototype._getAge = function (dateString) {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 0 || age > 120) {
            return null;
        }
        return age;
    }
    /**
     * @function _getBirthday
     * @description calculates birthday based on age
     * @param {Number} age 
     * @returns {Number}
     */
    CustomerViewModel.prototype._getBirthday = function (age) {
        const today = new Date();
        const year = today.getFullYear() - age;
        const birthday = new Date(year, today.getMonth(), today.getDate()).toISOString();
        // console.log('birthday', birthday);
        return birthday.split('T')[0];
    }
    // onInputBirthdayValueChange
    /**
    * @function _onInputBirthdayValueChange
    * @description calculates age based on user input
    */
    CustomerViewModel.prototype._onInputBirthdayValueChange = function (event) {
        const value = event?.detail.value;
        // console.log('called onInputBirthdayValueChange', value);
        if (value) {
            const age = this._getAge(value);
            // if (age < 18) {
            //     this.inputBirthdayMessagesCustom([this.birthdayMessage])
            // } else {
            this.inputBirthdayMessagesCustom([]);
            this.inputAgeValue(age);
            // }
        } else {
            this.inputBirthdayMessagesCustom([this.birthdayMessage]);
            this.inputAgeValue(null);
        }
    }
    /**
    * @function _getMessageDetail
    * @description get message detail
    * @param {severity} string
    */
    CustomerViewModel.prototype._getMessageDetail = function(severity){
        console.log('this value from getMessage', this);
        if (severity != null) { // this.newMessagesOptions().includes('detail')
            return `${severity} message detail`;
        }
        return null;
    };
    /** 
     * @function _computedTimeStamp
     * @description returns date
     */
    CustomerViewModel.prototype._computedTimeStamp = function () {
        return new Date().toISOString();
    }
    /**
     * @function __computedCloseAffordanceFn
     */
    CustomerViewModel.prototype._computedCloseAffordanceFn = function () {
        return this.computedCloseAffordance();
    }
    /**
     * @function _computedSoundFn
     */
    CustomerViewModel.prototype._computedSoundFn = function () {
        return this.computedSound()
    }
    /**
     * @function _createMessage
     * @description creates type of error based on input {error}
     * @param {error} string
     */
    CustomerViewModel.prototype._createMessage = function (severity) {
        let initCapSeverity = '';
        if (severity != null) {
            initCapSeverity = severity.charAt(0).toUpperCase() + severity.slice(1);
        }
        return {
            severity: severity,
            summary: initCapSeverity + ' message summary',
            detail: this._getMessageDetail(initCapSeverity),
            timestamp: this._computedTimeStamp(),
            autoTimeout: 2500,
            // closeAffordance: this._computedCloseAffordanceFn(),
            // sound: this._computedSoundFn(),
        };
    };
    /**
     * @function closeMessageHandler
     * @description closes error notification
     */
    CustomerViewModel.prototype._closeMessageHandler = function(event) {
        // Remove from bound observable array
        this.messages.remove(event.detail.message);
        // When message is closed due to auto-tmeout, or user chosing to close all,
        //  selectedMessages will need explicit update
        // this.selectedMessages.remove((severity) => {
        //     return severity === event.detail.message.severity;
        // });
    };
    /**
         * @function
         * @description Initializing input variables 
         */
    CustomerViewModel.prototype._initVariables = function () {
        const minAgeValue = this._getBirthday(18);
        this.inputBirthdayMinValue = ko.observable('1989-10-26');
        this.inputBirthdayMaxValue = minAgeValue; // ko.observable('2089-10-26');
        this.birthdayMessage = {
            detail: _t('messageCustom.birthday'),
            summary: "",
            severity: "error"
        };
        this.weightMessage = {
            detail: _t('messageCustom.weight'),
            summary: "",
            severity: "warning"
        };
        this.ageError1 = {
            detail: _t('messageCustom.age1'),
            summary: "",
            severity: "info"
        };
        this.ageError2 = {
            detail: _t('messageCustom.age2'),
            summary: "",
            severity: "warning"
        };
        this.ageError3 = {
            detail: _t('messageCustom.age3'),
            summary: "",
            severity: "error"
        };
        this.countryData = [
            { value: "IN", label: "India" },
            { value: "US", label: "United States" },
            { value: "CH", label: "China" },
            { value: "PK", label: "Pakistan" },
            { value: "SA", label: "South Africa" },
        ]
        this.stateData = {
            'IN': [
                { value: "BH", label: "Bihar" },
                { value: "GJ", label: "Gujarat" }
            ],
            'US': [
                { value: "NY", label: "New York" },
                { value: "NJ", label: "New Jersey" }
            ],
            'CH': [
                { value: "WH", label: "WUHAN" },
            ],
            'PK': [
                { value: "HYD", label: "Hyderabad" },
                { value: "KA", label: "Karachi" }
            ],
            'SA': [
                { value: "NC", label: "Northern Cape" }
            ]
        };
        // this.messagesDataProvider = new ArrayDataProvider(this.messages);
        this.messagesPosition = CoreUtils.toastMessagePosition(); //ko.observable('top-end-window');
    }
    /**
     * @function
     * @description Initializing input validators 
     */
    CustomerViewModel.prototype._initValidators = function () {
        this.inputFirstNameValidators = ko.observableArray([
            new AsyncLengthValidator(
                {
                    min: 5,
                    max: 10,
                    countBy: 'codeUnit',
                    hint: {
                        inRange: _t('validators.firstNameLengthHint', '{min}', '{max}'),
                    },
                    messageSummary: {
                        tooLong: _t('validators.tooManyChars'),
                        tooShort: _t('validators.tooFewChars'),
                    },
                    messageDetail: {
                        tooLong: _t('validators.tooLongMsg', '{max}'),
                        tooShort: _t('validators.tooShortMsg', '{min}'),
                    }
                }
            )
        ]);
    }
    /**
     * @function
     * @description Initializes all the observable Ids
     */
    CustomerViewModel.prototype._initAllIds = function () {
        // console.log('core utils customers page', CoreUtils.generateUniqueId());
        this.inputFirstNameId = CoreUtils.generateUniqueId('input');
        this.inputLastNameId = CoreUtils.generateUniqueId('input');
        this.inputFullNameId = CoreUtils.generateUniqueId('input');
        this.inputAgeId = CoreUtils.generateUniqueId('input');
        this.inputWeightId = CoreUtils.generateUniqueId('input');
        this.inputBirthdayId = CoreUtils.generateUniqueId('input');
        this.inputCountryId = CoreUtils.generateUniqueId('input');
        this.inputStateId = CoreUtils.generateUniqueId('input');
        this.createButtonId = CoreUtils.generateUniqueId('button');
        this.resetButtonId = CoreUtils.generateUniqueId('button');
        this.formValidationGroupId = CoreUtils.generateUniqueId('form');
    }
    /**
     * @function
     * @description Initializes all the observable labels(transformations)
     */
    CustomerViewModel.prototype._initAllLabels = function () {
        this.inputFirstNameLabel = _t('inputs.firstName');
        this.inputLastNameLabel = _t('inputs.lastName');
        this.inputFullNameLabel = _t('inputs.fullName');
        this.inputAgeLabel = _t('inputs.age');
        this.inputWeightLabel = _t('inputs.weight');
        this.inputBirthdayLabel = _t('inputs.birthday');
        this.inputCountryLabel = _t('inputs.country');
        this.inputStateLabel = _t('inputs.state');
        this.createButtonLabel = _t('buttons.create');
        this.resetButtonLabel = _t('buttons.reset');
    }
    /**
     * @function
     * @description Initializes all the observable values
     */
    CustomerViewModel.prototype._initAllObservables = function () {
        // var self = this; // if this is used we can use self.isInputLastNameDisabled and no need to bind fn()'s.
        this.inputFirstNameValue = ko.observable(null);
        this.inputLastNameValue = ko.observable(null);
        this.inputFullNameValue = ko.observable(null);
        this.inputWeightValue = ko.observable(null);
        this.inputAgeValue = ko.observable(null);
        this.inputBirthdayValue = ko.observable(null);
        this.isInputLastNameDisabled = ko.observable(true);
        this.inputCountryValue = ko.observable('IN'); //null
        this.inputStateValue = ko.observable(null);
        this.isInputStateDisabled = ko.observable(false);
        this.selectedCountryStates = ko.observableArray([]);
        this.createCustomerFormValid = ko.observable();
        this.commonOptions = ko.observableArray(['dark']);
        this.showDarkToasts = ko.computed(() => {
            return this.commonOptions().indexOf('dark') !== -1;
        });
        this.messages = ko.observableArray([
            this._createMessage('error') //warning // none
        ]);
        // custom messages
        this.newMessagesOptions = ko.observableArray(['closeAffordance']);
        this.inputAgeMessagesCustom = ko.observableArray([]);
        this.inputWeightMessagesCustom = ko.observableArray([]);
        this.inputBirthdayMessagesCustom = ko.observableArray([]);
        this.messagesDataProvider = ko.observableArray([]); //this.messages

        // ko.computed(function() {
        //     if (this.inputCountryValue()) {
        //         return false;
        //     }
        //     return true;
        // }, this);

        // ko.computed(function(event) {
        //     console.log('computed state selection');
        //     if(this.selectedCountryStates) {
        //         return new ArrayDataProvider(this.selectedCountryStates, {
        //             keyAttributes: "value",
        //         });
        //     } else {
        //         return null;
        //     }
        // }, this);
        //ko.observableArray([]);

        // this.inputFullNameValue = ko.computed(function() {
        //     if (this.inputFirstNameValue() && this.inputLastNameValue()) {
        //         return `${this.inputFirstNameValue()} ${this.inputLastNameValue()}`;
        //     }
        //     return '';
        // }, this); // -> method - 1

        // setTimeout(function () {
        //     this.inputAgeMessagesCustom([this.ageError1])
        // }.bind(this), 1500);
        // setTimeout(function () {
        //     this.inputAgeMessagesCustom([this.ageError2])
        // }.bind(this), 3000);
        // setTimeout(function () {
        //     this.inputAgeMessagesCustom([this.ageError3])
        // }.bind(this), 5000);
        // setTimeout(function () {
        //     this.inputAgeMessagesCustom([])
        // }.bind(this), 6000);

        this.inputLastNameValue.subscribe(function () {
            return this.inputFullNameValue(`${this.inputFirstNameValue()} ${this.inputLastNameValue()}`)
        }.bind(this)); // -> method - 2

        // this.onInputFirstNameValueChange = function(event) { // moved to initEventHandlers fn.
        //     // console.log('event for fName change', event);
        //     const value = event?.detail.value;
        //     if(value) {
        //         this.isInputLastNameDisabled(false);
        //         return;
        //     }
        //     this.isInputLastNameDisabled(true);
        // }.bind(this);

        // this.isInputLastNameDisabled = ko.computed(function() {
        //     if (this.inputFirstNameValue()){
        //         return false;
        //     }
        //     return true;
        // }, this);
        this.isInputFullNameDisabled = ko.computed(function () {
            // console.log(this.inputFirstNameValue());
            // console.log(this.inputLastNameValue());
            if (this.inputFirstNameValue() && this.inputLastNameValue()) {
                return true;
            }
            return true
        }, this);
        this.computedSound = ko.computed(() => {
            return this.newMessagesOptions().indexOf('sound') !== -1 ? 'defaults' : 'none';
        }, this);
        this.computedCloseAffordance = ko.computed(() => {
            return this.newMessagesOptions().indexOf('closeAffordance') !== -1 ? 'defaults' : 'none';
        }, this);
        // data providers
        this.inputCountryDataProvider = ko.observable(new ArrayDataProvider(this.countryData, {
            keyAttributes: "value",
        }));
        this.inputStateDataProvider = ko.observable(new ArrayDataProvider(this._getState('IN'), {
            keyAttributes: "value",
        }));

    };
    return CustomerViewModel;
});
