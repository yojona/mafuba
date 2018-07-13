<p align="center"> 
<img src="https://i.imgur.com/FdNnX0r.png"><br />
Simple state container for react apps.
</p>

### Installation
```
npm i mafuba
```

### Create your Store
``` javascript
import Mafuba from 'mafuba'

export default new Mafuba({
  name: 'Piccolo Daimaō',
  age: 292,
  items: ['Makosen']
})
```

### Link Store to App
``` javascript
import React, { Component } from 'react'
import Store from './Store'

export default class App extends Component {
  componentDidMount () {
    Store.link(this)
  }
  render () {
    return <Box />
  }
}
```
Now all components in your app will respond to state changes.

``` javascript
import React, { Component } from 'react'
import Store from '../Store'

export default class Box extends Component {
  render () {
    return (
      <div>
        <span> {Store.data.name} </span>
        <span> {Store.data.age} </span>
        <span> {Store.data.items.length} </span>

        <button onClick={() => Store.setState({age: Store.data.age + 1})}>Add one</button>
      </div>
    )
  }
```
### Alternatively you can link only the components that use the Store
``` javascript
import React, { Component } from 'react'
import Store from '../Store'

export default class Box extends Component {
  componentDidMount () {
    Store.link(this)
  }
  render () {
    return (
      <div>
        <span> {Store.data.name} </span>
        <span> {Store.data.age} </span>
        <span> {Store.data.items.length} </span>

        <button onClick={() => Store.setState({age: Store.data.age + 1})}>Add one</button>
      </div>
    )
  }
```

### Methods
You can set methods to manipulate the State.
```javascript
import Mafuba from 'mafuba'

export default new Mafuba({
  data: {
    counter: 0
  },
  methods: {
    addOne () {
      this.setState({counter: this.data.counter + 1})
    }

  }
})

```
#### Another example
Methods.js
``` javascript
export function addOne () {
  this.setState({counter: this.data.counter + 1})
}

export function substractOne () {
  this.setState({counter: this.data.counter - 1})
}
```
Store.js
``` javascript
import Mafuba from 'mafuba'
import * as Methods from './Methods'

export default new Mafuba({
  data: {
    counter: 0
  },
  methods: {
    addOne: Methods.addOne,
    substractOne: Methods.substractOne,
  }
})
```

### Dispatch
You can use the dispatch() function to dispatch actions instead of setting methods.

Store.js
```javascript
import Mafuba from 'mafuba'

export default new Mafuba({
  counter: 0
})
```
App.js
```javascript
import Store from './Mafuba/Store'
import * as Actions from './Mafuba/Methods'

class App extends Component {
  componentDidMount () {
    Store.link(this)
  }
  render () {
    return (
      <div className='App'>
        <p>{Store.data.counter}</p>

        <button onClick={() => { Store.dispatch(Actions.addOne) }}> Add one </button>
        <button onClick={() => { Store.dispatch(Actions.substractOne) }}> Substract one </button>

      </div>
    )
  }
}
```
Note that if you prefer to use the dispatch function instead of establishing methods, you must import the actions when you need them.