const Notification = ({ message, isSuccessful }) => {
  if (message === null) {
    return null;
  }

  return <div className={isSuccessful ? "success" : "error"}>{message}</div>;
};

export default Notification;
