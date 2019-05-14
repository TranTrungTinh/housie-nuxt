export default function(context) {
  console.log("[Middleware] Just Auth User");
  if (!context.store.getters['user/isAuthenticated']) {
    context.redirect("/");
  }
}
