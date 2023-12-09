export const validateEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
}

export const getImageExtension = (uri: string | undefined) => {
    // Extract the file name from the URI
    const fileName = uri?.split('/').pop();
  
    // Extract the file extension from the file name
    const fileExtension = fileName?.split('.').pop();
  
    return fileExtension?.toLowerCase(); // Return the lowercase extension
};