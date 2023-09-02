export const notificationRegistration = (messageApi, registrationMessage) => {
  if (registrationMessage !== "") {
    return registrationMessage === "created"
      ? messageApi.success("New account created!")
      : messageApi.error(`This ${registrationMessage} is already taken`);
  }
};
export const notificationSignIn = (messageApi, errorMessage) => {
  if (errorMessage !== 0) {
    return messageApi.error("Wrong email or password");
  }
};
