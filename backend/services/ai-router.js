const config =
  require("../config");

const providerA =
  require("./providers/provider-a");

const providerB =
  require("./providers/provider-b");

const providerC =
  require("./providers/provider-c");

const providers = {
  "provider-a":
    providerA,

  "provider-b":
    providerB,

  "provider-c":
    providerC
};

async function aiRouter(
  requestedProvider,
  messages
) {

  const order =
    requestedProvider &&
    providers[requestedProvider]
      ? [
          requestedProvider,
          ...Object.keys(providers)
            .filter(
              p =>
                p !== requestedProvider
            )
        ]
      : Object.keys(providers);

  let lastError = null;

  for (const providerName of order) {

    const provider =
      providers[providerName];

    try {

      if (
        !config.providers[
          providerName
        ].key ||
        !config.providers[
          providerName
        ].url
      ) {
        continue;
      }

      const reply =
        await provider(
          messages
        );

      return {
        provider:
          providerName,
        reply
      };

    } catch (error) {

      lastError = error;

    }
  }

  throw (
    lastError ||
    new Error(
      "No AI provider is configured."
    )
  );
}

module.exports =
  aiRouter;
