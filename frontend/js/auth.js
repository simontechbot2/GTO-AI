let currentUser = null;

async function checkAuthentication() {

  try {

    const response =
      await fetch("/api/auth/me");

    if (!response.ok) {
      currentUser = null;
      return null;
    }

    const data =
      await response.json();

    currentUser = data.user || null;

    return currentUser;

  } catch {
    return null;
  }
}

async function logout() {

  await fetch("/api/auth/logout", {
    method: "POST"
  });

  currentUser = null;

  window.location.reload();
}
