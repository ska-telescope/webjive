export default {
  async preloadUser() {
    try {
      // AT2-43 - Stub out MaxIV A&A Layer for the moment
      // as we don't have an A&A Server.
      //
      // TODO: Put A&A back in
      // const res = await fetch("/auth/user");
      // const user = await res.json();
      const user = {username : "Pre-loaded User"};
      return user;
    } catch (err) {
      return null;
    }
  },

  async login(username, password) {
    // AT2-43 deliberate stub of A&A
    // TODO: Put A&A back in
    return username;
    // const init = {
    //   method: "POST",
    //   body: JSON.stringify({ username, password }),
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8"
    //   }
    // };

    // try {
    //   const res = await fetch("/auth/login", init);
    //   return res.ok ? username : null;
    // } catch (err) {
    //   return null;
    // }
  },

  async logout() {
    // AT2-43 deliberate stub of A&A
    // TODO: Put A&A back in
    return true;
    // try {
    //   const init = { method: "POST" };
    //   const res = await fetch("/auth/logout", init);
    //   return true;
    // } catch (err) {
    //   return false;
    // }
  }
};
