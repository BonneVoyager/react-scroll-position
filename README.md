# react-scroll-position

ScrollPosition HOC which remembers attached node scroll position and restores it.

## Installation

```
npm install --save react-scroll-position
```

## Usage

```js
import React, { Component} from 'react'
import ScrollPosition from 'react-scroll-position'

const RememberMyScroll = ({ children }) => {
  return (
    <ScrollPosition scrollKey="my-scroll">
      {
        ({ attachScrollNode, getScroll, getScrollNode, setScroll }) =>
        <div ref={attachScrollNode}>
          {children}
        </div>
      }
    </ScrollPosition>
  )
}
```

ScrollPosition HOC uses children as function and returns functions which can be used to manipulate the scrolling.

#### attachScrollNode

Expects HTMLElement `node`.

#### getScroll

Gets attached `node` x and y scroll positions.

#### getScrollNode

Gets attached HTMLElement `node`.

#### setScroll

Sets attached `node` x and y scroll positions.

## License

[MIT](LICENSE)
