type ButtonProps = {
  label: string;
  iconSrc: string;
  iconAlt: string;
};

export default function HeaderButton(props: ButtonProps) {
  const { label, iconSrc, iconAlt } = props;

  return (
    <button className="flex text-center items-center align-middle justify-center bg-indigo-950 bg-opacity-55 rounded-sm m-1 h-9 w-[6rem] text-sm text-gray-300 hover:text-gray-200">
      <img className="mr-1" src={iconSrc} alt={iconAlt} width="16" />
      {label}
    </button>
  );
}
