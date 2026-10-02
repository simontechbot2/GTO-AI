async function loadStats() {

  try {

    const response =
      await fetch(
        "../api/admin/stats"
      );

    const data =
      await response.json();

    document.getElementById(
      "users"
    ).textContent =
      data.users ?? 0;

    document.getElementById(
      "requests"
    ).textContent =
      data.requests ?? 0;

    document.getElementById(
      "conversations"
    ).textContent =
      data.conversations ?? 0;

    document.getElementById(
      "providers"
    ).textContent =
      data.providers ?? 0;

  } catch (error) {

    console.error(error);

  }
}

loadStats();
