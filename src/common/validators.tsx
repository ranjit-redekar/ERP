export const isValidPan = (_: any, val: string): Promise<any> => {
    const panNumberRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (panNumberRegex.test(val) || val === "") {
        return Promise.resolve();
    }
    return Promise.reject('Please enter valid PAN number');
}

export const isValidGST = (_: any, val: string): Promise<any> => {
    const gstNumberRegex = /^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})$/;
    if (gstNumberRegex.test(val) || val === "") {
        return Promise.resolve();
    }
    return Promise.reject('Please enter valid GST number');
}