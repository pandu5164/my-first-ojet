/**
 * Singleton to store global objects
 */
define(['text!../../json/config.json'], function(configFile) {
    const config = JSON.parse(configFile);
    // console.log('config file obj', config);
    class ServiceUtils {
        constructor() {

        }

        /**
         * @function buildEndPointUrl
         * @description Build the url based on the config.json properties
         * @param {} endpointProperty Config.json property name for the endpoint we want to use
         * @returns {String} Url to use in the fetchData call
         */
        buildEndPointUrl(endpointProperty) {
            let url = `${config.isSecure ? 'https': 'http'}://${config.host}:${config.port}/${config.endpoints[endpointProperty]}`
            return url;
        }
        /**
        * @function fetchData
        * @description Executes the api requests according to the method and endpoint we pass
        * @param {String} endpointProperty Config.json property name for the endpoint we want to use
        * @param {String} method The request method type
        * @param {Any} bodyData The data to send if we ae using POST method
        * @returns {Promise<Any>}
        */
        async fetchData(endpointProperty, method, bodyData) {
            let fetchOptionsObject = null;
            if (method === "POST") {
                fetchOptionsObject = {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(bodyData)
                };
            }
            let api_url = this.buildEndPointUrl(endpointProperty);
            let dataFromService;
            try {
                const response = await fetch(api_url, fetchOptionsObject);
                if(!response.ok) {throw Error('Something went wrong');}
                dataFromService = await response.json();
            } catch(error) {
                console.log('error while fetching customer data', error);
                // return {message: error};
                throw Error('Something went wrong');
            }
            console.log('customer api call response', dataFromService);
            return dataFromService;
        }
    }
    //creating instance
    return new ServiceUtils();;
});