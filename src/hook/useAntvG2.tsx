import { useState } from "react";

let promiseLoading = null;
let AntvG2 = null;

/*
 * This is hack... antv.g2 cannot be built in my local environment for unknown reason,
 * This approach just hides error. @TODO investigate
 */
export function useAntvG2(): null | typeof import("@antv/g2") {
  const [loaded, setLoaded] = useState(AntvG2 !== null);
  if (!loaded) {
    if (!promiseLoading) {
      promiseLoading = import("../../node_modules/@antv/g2/dist/g2.min.js").then((G2) => {
        AntvG2 = G2;
        setLoaded(true);
        promiseLoading = null;
      });
    } else {
      promiseLoading.then(() => {
        setLoaded(true);
      });
    }
  }
  return AntvG2;
}
