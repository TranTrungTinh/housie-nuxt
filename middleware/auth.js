export default function({ store, redirect }) {
  console.log("[Middleware] Must be sign in User");
  if (!store.getters['user/isAuthenticated']) {
    return redirect("/");
  }
}
