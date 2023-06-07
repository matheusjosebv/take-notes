import { useState, useEffect } from "react";

function useLayout() {
  const [mobile, setMobile] = useState(false);
  const [tablet, setTablet] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const update = () => {
      setMobile(window.matchMedia("(max-width: 551px)").matches);
      setTablet(
        window.matchMedia("(mix-width: 552px) and (max-width: 899px)").matches
      );
      setDesktop(window.matchMedia("(min-width: 900px)").matches);
    };
    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return { mobile, tablet, desktop };
}

export default useLayout;
