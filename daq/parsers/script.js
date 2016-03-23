module.exports = {
  parameters: {
    name: "code",
    label: "Javascript code",
    defaultValue: `
function(cb, args, dataSource, buffer) {
  // Get the data from the arguments. The raw data is available as javascript buffer.
  var origin = args["origin"];
  var parameter = args["parameter"];

  callback.record();

  callback.stat("12345");
}
`
  }
}
