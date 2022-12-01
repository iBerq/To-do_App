db = db.getSiblingDB("admin");

db.auth("root", "example");

db = db.getSiblingDB("to-do_app");

db.createUser({
  user: "to-do_app_user",
  pwd: "password",
  roles: [
    {
      role: "dbOwner",
      db: "to-do_app",
    },
  ],
});
