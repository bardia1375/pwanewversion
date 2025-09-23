import { memo, useCallback, useEffect, useState } from "react";
import { cn } from "../../shared/utils";
import { getTimeParts, getPersianDate } from "../../shared/utils/date";
import { MenuButton } from "./components/MenuButton";
import { Typography } from "../../shared/components/ui";

const NAVBAR_CLASSES = {
  nav: cn(
    "w-3/4 bg-secondary backdrop-blur-sm ",
    "flex items-center justify-between px-3 py-1",
    "rounded-br-full rounded-tr-full fixed top-4 left-0 z-40"
  ),
  rightNav: {
    container: cn(
      "bg-secondary backdrop-blur-sm ",
      "flex items-center justify-between px-4 py-4",
      "rounded-bl-full rounded-tl-full fixed top-4 right-0 z-40 "
    ),
  },
  title: {
    container: "flex flex-col items-center",
    main: "text-primary  font-bold",
    sub: "",
  },
  time: {
    container: "flex flex-col items-end",
    clock: "text-primary  font-bold tracking-widest font-mono",
    date: "",
  },
} as const;

const Navbar = memo(() => {
  const [time, setTime] = useState(getTimeParts());
  const [persianDate, setPersianDate] = useState(getPersianDate());

  const handleMenuClick = useCallback(() => {
    // TODO: Implement menu open logic
  }, []);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      const now = new Date();
      setTime(getTimeParts(now));
      setPersianDate(getPersianDate(now));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <nav  dir="rtl">
      {/* Right: Menu Button */}
      <div className={NAVBAR_CLASSES.rightNav.container}>
        <MenuButton onClick={handleMenuClick} />
      </div>

      <div className={NAVBAR_CLASSES.nav}>
        {/* Center: Title */}
        <div className={NAVBAR_CLASSES.title.container}>
          <Typography variant="caption" className={NAVBAR_CLASSES.title.main}>حمیدرضا نوری مطلق</Typography>
          <Typography variant="caption" className={NAVBAR_CLASSES.title.sub}>شرکت دار ایران</Typography>
        </div>
        {/* Left: Time */}
        <div className={NAVBAR_CLASSES.time.container}>
          <Typography variant="h2" className={NAVBAR_CLASSES.time.clock}>
            {`${time.hours}:${time.minutes}:${time.seconds}`}
          </Typography>
          <Typography variant="caption" className={NAVBAR_CLASSES.time.date}>{persianDate}</Typography>
        </div>
      </div>
    </nav>
  );
});

// Add display name for better debugging
Navbar.displayName = "Navbar";

export default Navbar;
