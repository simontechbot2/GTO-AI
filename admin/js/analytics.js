async function loadAnalytics() {

  const response =
    await fetch(
      "../api/admin/analytics"
    );

  return response.json();
}
