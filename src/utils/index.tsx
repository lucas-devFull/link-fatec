// export const handleEmailValidation = (email: string) => {
//     const isValid = isValidEmail(email);

//     const validityChanged = (errors.email && isValid) || (!errors.email && !isValid);
//     if (validityChanged) {
//         console.log('Fire tracker with', isValid ? 'Valid' : 'Invalid');
//     }

//     return isValid;
// };

export const isValidEmail = (email: string) => /^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
