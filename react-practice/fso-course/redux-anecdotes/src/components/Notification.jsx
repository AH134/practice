import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  const show = notification !== "" ? "block" : "none";
  const style = {
    display: show,
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
