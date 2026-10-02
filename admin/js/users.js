async function loadUsers() {

  const response =
    await fetch(
      "../api/admin/users"
    );

  return response.json();
    }
