// import "./Notification.scss";

export const notificationRegistration = (messageApi, registrationMessage) => {
  if (registrationMessage !== null && registrationMessage !== undefined) {
    return registrationMessage === "created"
      ? messageApi.success("New account created!")
      : messageApi.error(`This ${registrationMessage} is already taken`);
  }
};
export const notificationSignIn = (messageApi, errorMessage) => {
  if (errorMessage !== false) {
    return messageApi.error("Wrong email or password");
  }
};
