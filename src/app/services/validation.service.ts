export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any, select:boolean = false) {
        if(validatorValue.name == undefined){
            validatorValue.name = "This field";
        }
        let config:any = {
            'required': `Please provide ${validatorValue.name}.`,
            //'pattern': `Please provide valid <strong>${validatorValue.name}</strong>!`,
            'invalidCreditCard': 'Is invalid credit card number.',
            'invalidEmailAddress': 'Please provide valid email.',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            //'areEqual': `${validatorValue.name} must be equal!`,
            'minlength': `Minimum length ${validatorValue.requiredLength}.`,
            'min': `Study year must be at least ${validatorValue.min}.`,
            'max': `Study year should not more than ${validatorValue.max}.`
        };
        if(validatorValue.type == "select" || validatorValue.type == "radio"){
            config.required = `Please select ${validatorValue.name}.`;
        }
        if(validatorValue.type == "checkbox"){
            config.required = `Please select at last one ${validatorValue.name}.`;
        }
        if(validatorValue.type == "agree"){
            config.required = `${validatorValue.name}`;
            //config.pattern = `${validatorValue.name}`;
        }
        if(validatorValue.type == "other"){
            config.required = `${validatorValue.name}`;
            //config.pattern = `${validatorValue.name}`;
        }
        return config[validatorName];
    }

    static creditCardValidator(control:any) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    static emailValidator(control:any) {
        // RFC 2822 compliant regex
        if (control.value != null && control.value != "" && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control:any) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
}

