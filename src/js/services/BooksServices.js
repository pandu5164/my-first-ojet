/**
 * Customers service abstraction
 */
define(['utils/Service'], function(ServiceUtils) {
    class BooksServices {
        constructor() {
            
        }
        fetchBooks = async function() {
            return new Promise((resolve, reject) => {
                setTimeout(async() => {
                    return resolve(await ServiceUtils.fetchData('books'));
                }, 1000);
            });
        }
    }
    //creating instance
    const instance = new BooksServices();
    return instance;
});