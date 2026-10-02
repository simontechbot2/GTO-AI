const config =
  require("../../config");

async function providerA(
  messages
) {

  const provider =
    config.providers[
      "provider-a"
    ];

  const response =
    await fetch(
      provider.url,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "Authorization":
            `Bearer ${provider.key}`
        },

        body:
          JSON.stringify({
            model:
              provider.model,

            messages
          })
      }
    );

  const data =
    await response.json();

  if (!response.ok) {

    throw new Error(
      data?.error?.message ||
      "Provider A failed."
    );

  }

  return (
    data?.choices?.[0]
      ?.message?.content ||
    ""
  );
}

module.exports =
  providerA;
