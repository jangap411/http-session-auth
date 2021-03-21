function auth(req, res, next) {
  if (!req.session.user) {
    //(!req.signedCookies.user)
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      let err = new Error("You are not authenticated");

      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
    }

    let auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    let username = auth[0];
    let password = auth[1];

    if (username == "admin" && password == "p@ssword") {
      // res.cookie("user", "admin", {
      //   signed: true,
      // });
      req.session.user = "admin";
      next();
    } else {
      let err = new Error("You are not authenticated");

      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
    }
  } else {
      if(req.session.user == 'admin'){ //(req.signedCookies.user == "admin") 
        next();
      } else {
        let err = new Error("You are not authenticated");
        err.status = 401;
        next(err);
      }
  }
}

module.exports = auth;
