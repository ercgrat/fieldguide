import parsePhoneNumber from 'libphonenumber-js';

export const validateEmail = (email: string) =>
  new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email);

export const validatePhoneNumber = (phoneNumber: string) => {
  const res = parsePhoneNumber(phoneNumber, {
    defaultCountry: 'US'
  });

  return res?.isValid();
};
