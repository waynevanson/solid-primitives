import { JSX } from "solid-js";

export type EventListenerOptions = boolean | AddEventListenerOptions;
export type TargetWithEventMap = Window | Document | HTMLElement | MediaQueryList;

export type EventMapOf<Target> = Target extends Window
  ? WindowEventMap
  : Target extends Document
  ? DocumentEventMap
  : Target extends HTMLElement
  ? HTMLElementEventMap
  : Target extends MediaQueryList
  ? MediaQueryListEventMap
  : never;

export type EventListenerDirectiveProps = [
  type: string,
  handler: (e: any) => void,
  options?: EventListenerOptions
];

export type EventListenerMapDirectiveProps =
  | [handlerMap: Record<string, (e: any) => void>, options?: EventListenerOptions]
  | Record<string, (e: any) => void>;

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      // directive types are very premissive to prevent type errors from incompatible types, since props cannot be generic
      eventListener: EventListenerDirectiveProps;
      eventListenerMap: EventListenerMapDirectiveProps;
    }
  }
}

// only here so the `JSX` import won't be shaken off the tree:
export type E = JSX.Element;
