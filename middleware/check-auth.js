export default function(context) {
  console.log("[Middleware] Check Auth");
  console.log(context.app.$cookies.get('auth'));
  context.store.dispatch("user/initAuth", context.req);
}
