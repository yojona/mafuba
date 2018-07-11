<p align="center"> 
<img src="https://i.imgur.com/FdNnX0r.png"><br />
Simple state container for react apps.
</p>

### Install Mafuba
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

### Link the Store to your App
Now all components in your app will respond to state changes.
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
