export default class Mafuba {
  constructor (data) {
    this.data = data
    this.components = []
  }

  setState (data) {
    this.components.forEach(comp => {
      comp.setState(data)
    })
    this.data = Object.assign({}, this.data, data)
  }

  link (component) {
    this.components.push(component)
  }
}
