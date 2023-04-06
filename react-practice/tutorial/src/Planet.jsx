const User = (props) => {
  return props.isGasPlanet && <div>{props.name}</div>;
};

export default User;
