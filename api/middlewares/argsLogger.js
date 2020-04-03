module.exports = (...args) => {
  args.map((arg, index) => {
    console.log(`argument ${index}: `, arg)
  })

  return args
}
