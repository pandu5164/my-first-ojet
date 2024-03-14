/**
 * Singleton to store global objects
 */
define(['ojs/ojvalidationgroup'], function() {
    class CoreUtils {
        constructor() {
            if (!CoreUtils.instance) {
                this.counter = 0;
                CoreUtils.instance = this;
            }
            return CoreUtils.instance;
        }

        generateUniqueId(type) {
            return `uid-${type || 'page'}-${this.counter++}`;
        }
        checkValidationGroup(id) {
            console.log('id to validate group', id);
            const tracker = document.getElementById(id);
            if (tracker.valid === 'valid') {
                return true;
            }
            else {
                console.log('Group is invalid will focus on first error state. PLease address it accordingly');
                // show messages on all the components that are invalidHiddden, i.e., the
                // required fields that the user has yet to fill out.
                tracker.showMessages();
                tracker.focusOn('@firstInvalidShown');
                return false;
            }
        }
        toastMessagePosition() {
            return {
                my: { vertical: 'top', horizontal: 'end' },
                at: { vertical: 'top', horizontal: 'end' },
                of: 'window'//'#pageHeader'
            }
        }
    }
    //creating instance
    const instance = new CoreUtils();
    return instance;
});