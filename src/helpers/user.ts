import validator from "validator";

export const checkIfEmailIsValid = (email: string) => validator.isEmail(email);

export const checkIfPasswordIsValid = (password: string) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
  const passwordIsvalid = regex.test(password);

  return passwordIsvalid;
};

export const checkIfIdIsValid = (id: string) => validator.isUUID(id)
export const checkIfPhoneNumberIsValid = (phoneNumber: string) => validator.isMobilePhone(phoneNumber, "pt-BR", {strictMode: true})