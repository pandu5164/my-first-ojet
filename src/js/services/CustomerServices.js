/**
 * Customers service abstraction
 */
define(['utils/Service'], function(ServiceUtils) {
    class CustomersServices {
        constructor() {
            
        }
        saveCustomer = async function(customer) {
            console.log('payload', customer);
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
            const data = await ServiceUtils.fetchData('getCustomers', 'POST', customer);
            console.log('post customer data', data);
            return data;
            // return new Promise(function (resolve, reject) {
            //     setTimeout(() => {
            //         const random = Math.random() < 0.5;
            //         const response = {
            //             success: random,
            //         };
            //         if (random) {
            //             resolve(response);
            //         } else {
            //             response.message = 'Something went wrong';
            //             reject(response);
            //         }
            //     }, 2000);

            // });
        }
        
    }
    //creating instance
    const instance = new CustomersServices();
    return instance;
});