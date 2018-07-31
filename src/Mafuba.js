import Seal from './Seal'

export default class Mafuba {
  constructor (object) {

    if (!object || typeof object !== 'object') this.error(
      'Mafuba constructor expects ' +
      'an object. \n\nnew Mafuba (argm ' +
      'Object) \n\nCurrently ' + typeof object
    )

    this.data = {}
    this.refs = []

    if (!!object.data) {
      if (typeof object.data === 'object' && !Array.isArray(object.data)) {
        this.data = object.data
      } else {
        this.error(
          '"data" node in state expects ' +
          'an object as argument. \n\nnew ' +
          'Mafuba({\n\tdata: node Object\n})'
        )
      }
    } else {
      this.data = object
    }

    if (!!object.methods) {
      if (typeof object.methods === 'object' && !Array.isArray(object.methods)) {
        for (const method in object.methods) {
          this.constructor.prototype[method] = object.methods[method]
        }
      } else {
        this.error(
          '"methods" node in state expects' +
          'an object as argument. \n\nnew ' +
          'Mafuba({\n\tmethods: node Object\n})'
        )
      }
    }

    Seal(this.data)
  }

  error (err) {
    err = err || '"setState", "dispatch" or "link" method expects an argument'
    throw new Error('[ Mafuba exception ]: ' + err)
  }

  getData () {
    return this.data
  }

  setState (data) {
    if (!data) this.error()
    this.data = Object.assign({}, this.data, data)

    this.refs.forEach(component => {
      component.forceUpdate()
    })

    Seal(this.data)
  }

  link (component) {
    if (!component) this.error()
    this.refs.push(component)
  }

  dispatch (action) {
    if (!action) this.error()
    action.bind(this).call()
  }
}
