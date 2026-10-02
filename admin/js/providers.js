async function loadProviders() {

  const response =
    await fetch(
      "../api/models"
    );

  return response.json();
    }
