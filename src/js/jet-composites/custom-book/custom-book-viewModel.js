/**
 * 
*/
define([
    'ojs/ojtranslation',
    'knockout',
    'utils/Core',
    'ojs/ojarraydataprovider',
    'ojs/ojcontext',
    'ojs/ojavatar',
    'ojs/ojknockout',
    'ojs/ojinputtext',
    'ojs/ojbutton',
    'ojs/ojdialog',
    'ojs/ojselectsingle',
    'oj-c/rating-gauge',
], function (Translations, ko, CoreUtils, ArrayDataProvider) {
    const _t = Translations.getTranslatedString;
    function customBookViewModel(Context) {
        // this.incidentInputValue = "Hello Pavan";
        // jet life cycle method starts
        const element = Context.element;
        this.element = element;
        this.context = Context;
        this._initAllIds();
        this._initAllLabels();
        this._initVariables(Context);
        this._initObservables();
        this.handleAddToCart = this._handleAddToCart.bind(this);
        this.handleAddToList = this._handleAddToList.bind(this);
        this.cardClick = this._cardClick.bind(this);
        // this.handleSaveToList = this._handleSaveToList.bind(this);
        // this.handleCloseDialog = this._handleCloseDialog.bind(this);
        // this.beforeFavoriteDialogClose = this._beforeFavoriteDialogClose.bind(this);
        
        this.computeCartClassName = (Context) => {
            console.log('addToCart Class compution', Context);
        }
        this.constructor = () => {
            console.log('cosntructor of books fn');
        }
        this.activated = () => {
            console.log('activated the variables');
        }
        this.attached = () => {
            console.log('attached the events');
        }
        this.connected = () => {
            // accUtils.announce('Books page loaded.', 'assertive');
            document.title="Books";
            console.log('connected to books');
        }
        this.bindingsApplied = () => {
            console.log('bindings applied');
        }
        this.dispose = () => {
            console.log('disposed the events & vatiables');
        }
        this.disconnected = () => {
            console.log('disconnected from books page');
        }
        this.transitionCompleted = () => {
            console.log('transition to books page completed');
        }
        // jet life cycle method ends
    }
    customBookViewModel.prototype._initAllIds = function () {
        this.addToCart = CoreUtils.generateUniqueId('button');
        this.addToList = CoreUtils.generateUniqueId('button');
        // this.favoriteDialogId = CoreUtils.generateUniqueId('modal');
        // this.favoriteDialogOkId = CoreUtils.generateUniqueId('button');
        // this.inputListId = CoreUtils.generateUniqueId('input');
    }
    customBookViewModel.prototype._initAllLabels = function () {
        this.addToCartLabel = _t('buttons.addToCart');
        this.addToListLabel = _t('buttons.addToList');
        // this.favoriteDialogTitle = _t('headers.favoriteDialogTitle');
        // this.saveToListLabel = _t('buttons.saveToListLabel');
        // this.closeFavoriteLabel = _t('buttons.closeFavoriteLabel');
    }
    customBookViewModel.prototype._initVariables = function(context) {
        this.bookTitle = context.properties.bookTitle;
        // this.inputListLabel = "Book List"
    }
    customBookViewModel.prototype._initObservables = function() {
        // this.inputListValue = ko.observable(null);
        this.booksListData = ko.observableArray([{
            value: 1,
            label: "Favorites"
        }]);
        // this.inputListDataProvider = ko.observable(new ArrayDataProvider(this.booksListData, {
        //     keyAttributes: "value",
        // }));
    }
    customBookViewModel.prototype._handleAddToCart = function(event){
        event.stopImmediatePropagation();
        console.log('clicked on cart icon', event);
    }
    customBookViewModel.prototype._handleAddToList = function(event){
        event.stopImmediatePropagation();
        console.log('clicked on list icon', event);
        // document.getElementById(this.favoriteDialogId).open();
          // Fire a custom cardClick event
        const params = {
            bubbles: true,
            detail: {value: this.context.properties.bookId}
        };
        this.element.dispatchEvent(new CustomEvent('addedToList', params));
    }
    customBookViewModel.prototype._cardClick = function(){
         // Fire a custom cardClick event
        const params = {
            bubbles: true,
            detail: {value: this.context.properties.bookId}
        };
        this.element.dispatchEvent(new CustomEvent('bookClick', params));
    }
    // customBookViewModel.prototype._handleSaveToList = function() {
    //     console.log('added item to list');
    //     const params = {
    //         bubbles: true,
    //         detail: {value: this.inputListValue()}
    //     };
    //     this.element.dispatchEvent(new CustomEvent('addedToList', params));
    //     document.getElementById(this.favoriteDialogId).close();
    // }
    // customBookViewModel.prototype._handleCloseDialog = function() {
    //     console.log('closed favorite modal dialog');
    //     document.getElementById(this.favoriteDialogId).close();
    // }
    // customBookViewModel.prototype._beforeFavoriteDialogClose = function() {
    //     this.inputListValue(null);
    // }
    return customBookViewModel;
});
