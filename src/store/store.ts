/**
 * FOR DOCUMENTATION PURPOSE ONLY
 */
import { CoronavirusState } from "./Coronavirus";
import { LeftPanelState } from "./LeftPanelState";
import { RightPanelState } from "./RightPanelState";

export type Store = {
  leftPanel: LeftPanelState;
  rightPanel: RightPanelState;
  coronavirus: CoronavirusState;
};
