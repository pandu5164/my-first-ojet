/**
 * 
*/
define([
    "knockout",
    "ojs/ojcontext",
    'utils/Core',
    'ojs/ojarraydataprovider',
    'services/BooksServices',
    'ojs/ojmodule-element-utils',
    'ojs/ojavatar',
    "ojs/ojknockout",
    "ojs/ojinputtext",
    'ojs/ojinputtext',
    'ojs/ojprogress-circle',
    'custom-book/loader'
], function (ko, Context, CoreUtils, ArrayDataProvider, BooksServices, ModuleElementUtils) {
    function BooksViewModel(context) {
        // this.incidentInputValue = "Hello Pavan";
        this.element = context.element;
        fetchBooksData = async () => {
            try {
                const dataFromService = await BooksServices.fetchBooks();
                console.log('books data', dataFromService);
                if (dataFromService && dataFromService.length) {
                    const booksSrc = dataFromService.map(book => {
                        book.heartColor = ko.observable(null);
                        return book;
                    })
                    this.booksData(booksSrc);
                } else {
                    this.noDataAvailable(true);
                }
                this.isLoading(false);
            } catch (error) {
                this.isLoading(false);
                console.log('error while getting bookData', error);
            }
        }
        updateSelectedListAction = function(value) {
            console.log('called to uodate value', value);
        }
        this._initIds();
        this._initAllObservables();
        this._initAllVariables();
        // this.changeColorCallback = this._changeColorCallback.bind(this);
        // jet life cycle method starts
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
        this.bookClick = (e) => { //in html is defined as on-book-click - 'on' gets added to defined methods in component.json for custom-book module and camel case is splitted by '-'
            console.log('clicked book', e);
        }
        this.bookAddedToList = (e) => { //in html is defined as on-added-to-list - 'on' gets added to defined methods in component.json for custom-book module and camel case is splitted by '-'
            console.log('book added to list', e);
            this.bookId(e.detail.value);
            const currentBook = this.booksData()?.find(book => book.id === this.bookId());
            if (currentBook.heartColor() === BooksViewModel.COLORS.red) {
                currentBook.heartColor(null);
                return;
            }
            document.getElementById(this.favoriteDialogId).open();
        }
    }
    BooksViewModel.COLORS = {
        red: 'red'
    }
    /**
     * @function _changeColorCallback
     * @definition changes the color of favorite icon
     */
    BooksViewModel.prototype._changeColorCallback = function(bookId) {
        console.log('bookId is', bookId());
        const currentBook = bookId && this.booksData()?.find(book => book.id === bookId());
        console.log('changing color to red');
        if(!currentBook) return;
        currentBook.heartColor(BooksViewModel.COLORS.red);
        // document.getElementById(`heart-${bookId()}`).style.color= 'red';
    }
    /**
     * @function _loadBooksData
     * @description makes api call to get books 
     */
    BooksViewModel.prototype._loadBooksData = () => {
        this.fetchBooksData();
    }
    /**
     * @function _initIds
     */
    BooksViewModel.prototype._initIds = function () {
        this.favoriteDialogId =  CoreUtils.generateUniqueId('modal');
    }
    /**
     * @function _initAllObservables
     */
    BooksViewModel.prototype._initAllObservables = async function () {
        this.bookId = ko.observable(null);
        this.booksData = ko.observableArray([]);
        this.isLoading = ko.observable(true);
        this.noDataAvailable = ko.observable(false);
        this.booksListData = ko.observableArray([{
            value: 1,
            label: "Favorites"
        }]);
    }
    /**
     * @function _initAllVariables
     * @description initializes all variables and onload api calls
     */
    BooksViewModel.prototype._initAllVariables = async function() {
        this.booksDataProvider = new ArrayDataProvider(this.booksData);
        this._loadBooksData();
        this.favoritesDialog = ModuleElementUtils.createConfig({
            name: 'dialogs/favorites',
            params: {
                booksListData: this.booksListData,
                favoriteDialogId: this.favoriteDialogId,
                changeColorCallback: this._changeColorCallback.bind(this, this.bookId),
                element: this.element
            }
        });
    }
    return BooksViewModel;
});
