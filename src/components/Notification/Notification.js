// import "./Notification.scss";

export const notification = (messageApi, messageState) => {
  if (messageState !== null && messageState !== undefined) {
    return messageState === "created"
      ? messageApi.success("New account created!")
      : messageApi.error(`This ${messageState} is already taken`);
  }
};
