import EventEmitter from "events";
import { produce, Draft, Immutable } from "immer";
import { useEffect, useState } from "react";

/**
 * Internal event bus
 * 
 * It looks like this bus could be split between different stores,
 * but developers are not limited to use data from single store to
 * construct some getter response. Having multiple event buses may/will
 * lead to errors
 */
const emitter = new EventEmitter();
const updateEventName = "c";
export function emitChange() {
  emitter.emit(updateEventName);
}

// store API
/**
 * Internal storage
 */
let currentStoreState: { [key: string]: any } = produce({}, () => {});

/**
 * Extracts store chunk which corresponds to certain store
 *
 * @param storeName string - name of the store
 * @returns Immutable<TStoreChunk> - immutable data stored in the store
 */
function getStoreState<TStoreChunk>(storeName: string): Immutable<TStoreChunk> {
  return <Immutable<TStoreChunk>>currentStoreState[storeName];
}

/**
 * Creates function which allows to update store content
 *
 * @param storeName string - name of the store
 * @returns Function which allows to update store state,
 *          Function accepts callback which will receive draft of store data as parameter
 *          Draft is editable copy of store data. All modifications will be persisted in store
 *          once cb is completed.
 */
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

/**
 * Returns accessors to the store data
 *
 * @param storeName string
 * @returns [getter, updater] @see getStoreState, @see createUpdateStoreState
 */
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

/**
 * Creates hook which allows extract chunk of data from store and subscribe to its changes
 *
 * @param getter - fucntion which extracts data from global state
 * @returns - function which returns store data and subscribes to the store changes
 */
export function createUseStoreDataHook<
  FnType extends (...parameters: any[]) => any
>(getter: FnType): FnType {
  return <FnType>((...parameters) => {
    let currentValue = getter(...parameters);
    let [value, setValue] = useState<ReturnType<FnType>>(currentValue);
    if (value !== currentValue) {
      // parameters changed probably... anyway, update value
      // @TODO check if this call triggers warning/error
      setValue(currentValue);
    }
    useEffect(() => {
      const listener = () => {
        // react will compare old and new values and update only if needed
        setValue(getter(...parameters));
      };
      emitter.on(updateEventName, listener);
      return () => {
        emitter.off(updateEventName, listener);
      };
    }, parameters);
    return value;
  });
}
