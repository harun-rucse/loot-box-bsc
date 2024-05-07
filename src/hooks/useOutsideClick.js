import { useEffect, useRef } from "react";

export function useOutsideClick(handler, propagation = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener("click", handleClick, propagation);

    return () => document.removeEventListener("click", handleClick, true);
  }, [handler]);

  return ref;
}
