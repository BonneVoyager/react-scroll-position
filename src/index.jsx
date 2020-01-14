import React from 'react';

function getScrollPosition(target) {
  if (target instanceof window.Window) {
    return {
      x: target.scrollX,
      y: target.scrollY
    };
  }

  return {
    x: target.scrollLeft,
    y: target.scrollTop
  };
}

function scroll(target, x, y) {
  if (target instanceof window.Window) {
    target.scrollTo(x, y);
  } else {
    target.scrollLeft = x;
    target.scrollTop = y;
  }
}

export const memoryStore = {
  data: new Map(),
  get(key) {
    if (!key) {
      return null;
    }
    return this.data.get(key) || null;
  },
  set(key, data) {
    if (!key) {
      return;
    }
    return this.data.set(key, data);
  }
};

export default class ScrollPosition extends React.Component {
  constructor() {
    super(...arguments);
    this.attachScrollNode = this.attachScrollNode.bind(this);
    this.getScroll = this.getScroll.bind(this);
    this.getScrollNode = this.getScrollNode.bind(this);
    this.setScroll = this.setScroll.bind(this);
    this._target = window;
  }

  attachScrollNode(node) {
    this._target = node;
  }

  getScroll() {
    if (this._target) {
      return getScrollPosition(this._target);
    }
  }

  getScrollNode() {
    if (this._target) {
      return this._target;
    }
  }

  setScroll(pos) {
    pos = pos || this.props.store.get(this.props.scrollKey);
    if (this._target && pos) {
      scroll(this._target, pos.x, pos.y);
    }
  }

  saveScroll(key) {
    if (this._target) {
      const pos = getScrollPosition(this._target);
      key = key || this.props.scrollKey;
      this.props.store.set(key, pos);
    }
  }

  componentDidMount() {
    this.setScroll();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.scrollKey !== nextProps.scrollKey) {
      this.saveScroll();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollKey !== prevProps.scrollKey) {
      this.setScroll();
    }
  }

  componentWillUnmount() {
    this.saveScroll();
    delete this._target;
  }

  render() {
    const { children = null, ...props } = this.props;
    return children && children({
      ...props,
      attachScrollNode: this.attachScrollNode,
      getScroll: this.getScroll,
      getScrollNode: this.getScrollNode,
      setScroll: this.setScroll
    });
  }
}

ScrollPosition.defaultProps = {
  store: memoryStore
};
