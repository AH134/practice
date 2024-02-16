import HeaderButton from "./HeaderButton";

export default function Header() {
  return (
    <div className="border-b-[1px] border-b-indigo-950 text-white max-w-2xl m-auto h-16 flex items-center">
      <div className="flex w-1/2 justify-start">
        <a className="flex items-center text-center justify-start" href="/">
          <img
            className="m-1"
            src="assets/icon-white2.png"
            alt="checkmark"
            width="20"
          />
          <p className="text-xl font-bold">Pomodoro</p>
        </a>
      </div>
      <div className="flex w-1/2 justify-end">
        <HeaderButton
          label="Report"
          iconSrc="/assets/graph-white.png"
          iconAlt="lol"
        />
        <HeaderButton
          label="Setting"
          iconSrc="/assets/config-white.png"
          iconAlt="lol"
        />
        <HeaderButton
          label="Login"
          iconSrc="/assets/user-white.png"
          iconAlt="lol"
        />
      </div>
    </div>
  );
}
