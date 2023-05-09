// export const handleEmailValidation = (email: string) => {
//     const isValid = isValidEmail(email);

//     const validityChanged = (errors.email && isValid) || (!errors.email && !isValid);
//     if (validityChanged) {
//         console.log('Fire tracker with', isValid ? 'Valid' : 'Invalid');
//     }

//     return isValid;
// };

export const isValidEmail = (email: string) =>
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
    );
