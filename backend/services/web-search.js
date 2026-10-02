async function webSearch(
  query
) {

  if (!query) {
    throw new Error(
      "Search query is required."
    );
  }

  return {
    query,
    results: [],
    message:
      "Connect an authorized search provider here."
  };
}

module.exports =
  webSearch;
