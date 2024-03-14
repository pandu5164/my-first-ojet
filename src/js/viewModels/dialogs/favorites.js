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
    'ojs/ojdefer',
    'oj-c/rating-gauge',
], function (Translations, ko, CoreUtils, ArrayDataProvider) {
    const _t = Translations.getTranslatedString;
    function FavoritesDialogViewModel(context) {
        this.element = context.element;
        this.context = context;
        console.log('favorites context', context);
        this._initAllIds(context);
        this._initAllLabels();
        this._initObservables(context);
        this._initVariables(context);
        this.handleSaveToList = this._handleSaveToList.bind(this);
        this.handleCloseDialog = this._handleCloseDialog.bind(this);
        this.beforeFavoriteDialogClose = this._beforeFavoriteDialogClose.bind(this);
    
    }
    FavoritesDialogViewModel.prototype._initAllIds = function (context) {
        this.favoriteDialogId = context.favoriteDialogId;
        this.favoriteDialogOkId = CoreUtils.generateUniqueId('button');
        this.inputListId = CoreUtils.generateUniqueId('input');
    }
    FavoritesDialogViewModel.prototype._initAllLabels = function () {
        this.favoriteDialogTitle = _t('headers.favoriteDialogTitle');
        this.saveToListLabel = _t('buttons.saveToListLabel');
        this.closeFavoriteLabel = _t('buttons.closeFavoriteLabel');
        this.inputListLabel = _t('inputs.lists');
    }
    FavoritesDialogViewModel.prototype._initVariables = function(context) {
        this.changeColorCallback = context.changeColorCallback;
        this.inputListDataProvider = new ArrayDataProvider(this.booksListData, {
            keyAttributes: "value",
        });
    }
    FavoritesDialogViewModel.prototype._initObservables = function(context) {
        this.inputListValue = ko.observable(null);
        this.booksListData = context.booksListData;
    }
    FavoritesDialogViewModel.prototype._handleSaveToList = function() {
        console.log('added item to list');
        const params = {
            bubbles: true,
            detail: {value: this.inputListValue()}
        };
        document.dispatchEvent(new CustomEvent('updateSelectedListAction', params));
        this.changeColorCallback(this.inputListValue());
        document.getElementById(this.favoriteDialogId).close();
    }
    FavoritesDialogViewModel.prototype._handleCloseDialog = function() {
        console.log('closed favorite modal dialog');
        document.getElementById(this.favoriteDialogId).close();
    }
    FavoritesDialogViewModel.prototype._beforeFavoriteDialogClose = function() {
        this.inputListValue(null);
    }
    return FavoritesDialogViewModel;
});
