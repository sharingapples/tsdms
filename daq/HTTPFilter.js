module.exports = function(req, res) {
  // First try to figure out the data source based on the request made
  this.processors.( (processor) => {
    var parameters = new FilterParameters(processor.filters);
    if (!parameters.path.match(req.url) ||
        !parameters.headers.match(req)) ||
        !parameters.queries.match(req.queries)
        !parameters.data.match(req.body)) {
      return false;
    }

    // great we found the processor, let's parse it down using the parser
    processor.parser.parse(parameters, { request: req, response: res });

    // No need to continue to other processors
    return true;
  });
}
