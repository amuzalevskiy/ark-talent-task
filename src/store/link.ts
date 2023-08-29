import EventEmitter from "events";
import { produce, Draft, Immutable } from "immer";
import { useEffect, useState } from "react";

// event bus
const emitter = new EventEmitter();
const updateEventName = "c";
export function emitChange() {
  emitter.emit(updateEventName);
}

// store API
let currentStoreState: { [key: string]: any } = produce({}, () => {});
function getStoreState<T>(storeName: string): Immutable<T> {
  return <Immutable<T>>currentStoreState[storeName];
}

function createUpdateStoreState<TStoreChunk>(storeName: string) {
  return (cb: (draft: Draft<TStoreChunk>) => void) => {
    const nextStoreState = produce(currentStoreState, (draft) => {
      if (!draft[storeName]) {
        draft[storeName] = {};
      }
      cb(draft[storeName]);
    });
    if (nextStoreState !== currentStoreState) {
      currentStoreState = nextStoreState;
      // DEBUG:
      // console.log(currentStoreState)
      emitChange();
    }
  };
}

let existingStores = new Set<string>();
export function addStore<TStoreChunk>(
  storeName: string
): [
  () => Immutable<TStoreChunk>,
  (cb: (draft: Draft<TStoreChunk>) => void) => void
] {
  if (existingStores.has(storeName)) {
    throw new Error(`Store "${storeName}" already exists`);
  }
  existingStores.add(storeName);
  return [
    () => getStoreState<TStoreChunk>(storeName),
    createUpdateStoreState<TStoreChunk>(storeName),
  ];
}

export function createUseStoreDataHook<FnType extends (...p) => any>(
  getter: FnType
): FnType {
  return <FnType>((...p) => {
    let currentValue = getter(...p);
    let [value, setValue] = useState<ReturnType<FnType>>(currentValue); // getter call on each render
    // parameters changed
    if (value !== currentValue) {
      setValue(currentValue);
    }
    useEffect(() => {
      const listener = () => {
        // react will compare old and new values and update only if needed
        setValue(getter(...p));
      };
      emitter.on(updateEventName, listener);
      return () => {
        emitter.off(updateEventName, listener);
      };
    }, []);
    return value;
  });
}
