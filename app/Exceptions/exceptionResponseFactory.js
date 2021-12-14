"use strict";

const NotAuthorizedException = use("App/Exceptions/NotAuthorizedException");
const UnexpectedErrorException = use("App/Exceptions/UnexpectedErrorException");
const RecordNotFoundException = use("App/Exceptions/RecordNotFoundException");
const NotProcessedException = use("App/Exceptions/NotProcessedException");
const RecordNotCreatedException = use(
  "App/Exceptions/RecordNotCreatedException"
);

const customExceptions = [
  UnexpectedErrorException,
  RecordNotCreatedException,
  RecordNotFoundException,
  NotProcessedException,
  NotAuthorizedException,
];
const codesNotAuth = [
  "E_USER_NOT_FOUND",
  "E_PASSWORD_MISMATCH",
  "E_INVALID_JWT_TOKEN",
];

const isFromCustomException = (error) => {
  return customExceptions.some((e) => error instanceof e);
};

const isFromAuthException = (error) => {
  return codesNotAuth.some((code) => code === error.code);
};

const shouldThrowException = (error) => {
  return error.code === "E_VALIDATION_FAILED";
};

const getMessageError = (error) => {
  const message = error.message;
  return message.replace(`${error.code}:`, "").trim();
};

const exceptionResponseFactory = (error) => {
  const defaultException = new UnexpectedErrorException();
  let message = getMessageError(defaultException);
  let code = defaultException.code;
  let name = defaultException.name;

  if (!error) {
    return { message, code, name };
  }

  console.log(">>>>>", error);
  console.log(">>>>>", error.message);
  if (shouldThrowException(error)) {
    throw error;
  }

  if (isFromCustomException(error) || isFromAuthException(error)) {
    return {
      message: getMessageError(error),
      code: error.code,
      name: error.name,
    };
  }

  return { message, code, name };
};

module.exports = exceptionResponseFactory;
