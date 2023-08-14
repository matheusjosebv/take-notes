import { useState, useEffect } from "react";

function useLayout() {
  const [mobile, setMobile] = useState<boolean>(false);
  const [tablet, setTablet] = useState<boolean>(false);
  const [desktop, setDesktop] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      setMobile(window.matchMedia("(max-width: 55.1rem)").matches);
      setTablet(window.matchMedia("(mix-width: 55.2rem) and (max-width: 89.9rem)").matches);
      setDesktop(window.matchMedia("(min-width: 90.0rem)").matches);
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
