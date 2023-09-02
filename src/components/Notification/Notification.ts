export const notificationRegistration = (
  messageApi: any,
  registrationMessage: string
) => {
  if (registrationMessage !== "") {
    return registrationMessage === "created"
      ? messageApi.success("New account created!")
      : messageApi.error(`This ${registrationMessage} is already taken`);
  }
};
export const notificationSignIn = (messageApi: any, errorMessage: number) => {
  if (errorMessage !== 0) {
    return messageApi.error("Wrong email or password");
  }
};
