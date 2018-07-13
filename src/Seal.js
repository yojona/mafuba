export default function Seal (object) {
  Object.getOwnPropertyNames(object).forEach(name => {
    let value = object[name]
    object[name] = value && typeof value === 'object' ? Seal(value) : value
  })

  return Object.freeze(object)
}
