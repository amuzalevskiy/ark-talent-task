import { useState } from "react";

let promiseLoading = null;
let AntvG2 = null;

export function useAntvG2(): null | typeof import("@antv/g2") {
  const [loaded, setLoaded] = useState(AntvG2 !== null);
  if (!loaded) {
    if (!promiseLoading) {
      promiseLoading = import("@antv/g2").then((G2) => {
        AntvG2 = G2;
        setLoaded(true);
        promiseLoading = false;
      });
    } else {
      promiseLoading.then(() => {
        setLoaded(true);
      });
    }
  }
  return AntvG2;
}
