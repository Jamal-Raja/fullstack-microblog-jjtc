import { useEffect, useState } from "react";

function PopupMessage({ type = "message", message, displayTime = 3000 }) {
  const [visible, setVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => setVisible(false), 400);
    }, displayTime);

    return () => clearTimeout(hideTimer);
  }, [displayTime]);

  if (!visible) return null;

  const styles = {
    message: "bg-blue-100 border-blue-400 text-blue-900",
    success: "bg-green-100 border-green-400 text-green-900",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-900",
    error: "bg-red-100 border-red-400 text-red-900",
  };

  return (
    <div
      className={`
        fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[400px]
        px-4 py-3 rounded-md border shadow-lg font-semibold text-centre
        transition-all duration-400 ease-out
        ${styles[type]}
        ${!isMounted ? "-top-32 opacity-0" : ""}
        ${isMounted && !animateOut ? "top-5 opacity-100" : ""}
        ${animateOut ? "-top-32 opacity-0" : ""}
      `}
      style={{ zIndex: 9999 }}
    >
      {message}
    </div>
  );
}

export default PopupMessage;
