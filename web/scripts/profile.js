async function fetchUser() {
  const res = await fetch(`/api/users/${id}`);
  const user = await res.json();
  return user;
}

async function fetchUserRecipes() {
  const res = await fetch(`/api/users/${id}/recipes`);
  const recipes = await res.json();
  return recipes;
}
