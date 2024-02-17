type ButtonProps = {
  label: string;
  iconSrc: string;
  iconAlt: string;
};

function Button(props: ButtonProps) {
  const { label, iconSrc, iconAlt } = props;

  return (
    <button className="flex text-center items-center align-middle justify-center bg-gray-900 bg-opacity-35 rounded-sm m-1 h-9 w-[6rem] text-sm text-gray-200 hover:transition-all hover:text-rose-100">
      <img className="mr-1" src={iconSrc} alt={iconAlt} width="16" />
      <p className="hidden md:block">{label}</p>
    </button>
  );
}

export default Button;
