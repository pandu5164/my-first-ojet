define({
    // root bundle
    root: {
        // "oj-message": {
        //     fatal: "Fatal",
        //     error: "Error",
        //     warning: "Warning",
        //     info: "Info",
        //     confirmation: "Confirmation",
        //     "compact-type-summary": "{0}: {1}"
        // },
        // ... contents omitted
        buttons: {
            create: "Create",
            reset: "Reset",
            addToCart: "Add to cart",
            addToList: "Add to list",
            saveToListLabel: "Save",
            closeFavoriteLabel: "Close",
        },
        headers: {
            usersDemoData: 'Users',
            favoriteDialogTitle: 'Add to list'
        },
        inputs: {
            age: "Age",
            country: "Country",
            birthday: "Birthday",
            firstName: "First Name!",
            fullName: "Full Name",
            lastName: "Last Name",
            state: "State",
            weight: "Weight",
            lists: "Lists",
        },
        messageCustom: {
            age1: "This age field need to be filled in 5seconds",
            age2: "This age field need to be filled in 5seconds",
            age3: "This age field need to be filled in 5seconds",
            birthday: "You should be at least 18 years old!",
            weight: "weight should be greater then 2 kgs",
        },
        validators: {
            firstNameLengthHint: 'Custom hint: value must have at least {min} characters but not more than {max}',
            tooFewChars: 'Custom: Too few characters',
            tooManyChars: 'Custom: Too many characters',
            tooShortMsg: 'Custom: Number of characters is too low. Enter at least {min} characters.',
            tooLongMsg: 'Custom: Number of characters is too high. Enter at most {max} characters',
        },
    },

    // supported locales.       
    "fr-CA": 1,
    // ar: 1,
    // ro: 1,
    // "zh-Hant": 1,
    // nl: 1,
    // it: 1,
    // fr: 1,
    // //  ... contents omitted
    // tr: 1, fi: 1
});