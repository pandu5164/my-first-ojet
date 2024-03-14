define([
    'knockout',
    'utils/Core',
], function (ko, CoreUtils) {
    'use strict';
    class AboutViewModal {
        constructor(params) {
            console.log('core utils about page with params', {[CoreUtils.generateUniqueId()]: params});
        }

    }
    return AboutViewModal;
})