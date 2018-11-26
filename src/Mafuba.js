export default class Mafuba {
  constructor (object) {
    if (Array.isArray(object)) this.error('Mafuba constructor expects an object.')
    if (!object || typeof object !== 'object') {
      this.error(
        'Mafuba constructor expects ' +
        'an object. \n\nnew Mafuba (arg ' +
        'Object) \n\nCurrently ' + typeof object
      )
    }

    this.data = {}
    this.refs = []

    if (object.data) {
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

    if (object.mutations) {
      if (typeof object.mutations === 'object' && !Array.isArray(object.mutations)) {
        for (const mutation in object.mutations) {
          this.constructor.prototype[mutation] = object.mutations[mutation]
        }
      } else {
        this.error(
          '"mutations" node in state expects ' +
          'an object as argument. \n\nnew ' +
          'Mafuba({\nmutations: node Object\n})'
        )
      }
    }
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
      if (component.updater && component.updater.isMounted(component)) {
        component.forceUpdate() 
      }
    })
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
