export default class Mafuba {
  constructor (object) {
    this.data = {}
    this.refs = []

    if (object.hasOwnProperty('data')) this.data = object.data
    else this.data = object

    if (object.hasOwnProperty('methods')) {
      for (const method in object.methods) {
        this.constructor.prototype[method] = object.methods[method]
      }
    }
  }

  getData () {
    return this.data
  }

  setState (data) {
    this.data = Object.assign({}, this.data, data)

    this.refs.forEach(component => {
      component.setState(data)
    })
  }

  link (component) {
    this.refs.push(component)
  }
}
