import * as React from "react";

export interface ScrollPositionValues {
  /**
   * scrollLeft/scrollX values from/for the node/window
   */
  x: number;

  /**
   * scrollTop/scrollY values from/for the node/window
   */
  y: number;
}

export interface ScrollPositionProps {
  /**
   * Key under which the values are stored for the particular component
   */
  scrollKey: string;

  /**
   * Store with get/set functions
   */
  store?: ScrollPositionStore;
}

/**
 * Object having get/set functions
 */
export class ScrollPositionStore {
  get(key: string): ScrollPositionProps;
  set(key: string, data: ScrollPositionProps);
}

/**
 * ScrollPosition HOC remembers attached node scroll position and restores it.
 */
declare class ScrollPosition extends React.Component<ScrollPositionProps, any> {
  render: () => {
    /**
     * Attach node to ScrollPosition HOC
     */
    attachScrollNode: (node: HTMLElement) => void;

    /**
     * Get node x and y scroll positions
     */
    getScroll: () => ScrollPositionValues;

    /**
     * Get attached node
     */
    getScrollNode: () => HTMLElement;

    /**
     * Set node x and y scroll positions
     */    
    setScroll: (pos: ScrollPositionValues) => void;
  }
}

export default ScrollPosition;
