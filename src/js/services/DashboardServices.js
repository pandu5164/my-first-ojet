/**
 * Customers service abstraction
 */
define(['utils/Service'], function(ServiceUtils) {
    class DashboardServices {
        constructor() {
            
        }
        fetchUserCountries = async function() {
            const data = await ServiceUtils.fetchData('usersCountries');
            console.log('post user countries data', data);
            return data;
        }
        fetchUsersCountByAge = async function() {
            const data = await ServiceUtils.fetchData('usersCountByAge');
            console.log('get UsersCountData', data);
            return data;
        }
    }
    //creating instance
    const instance = new DashboardServices();
    return instance;
});