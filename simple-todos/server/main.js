import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
  // code to run on server at startup
});
var users = [
    {email:"normal@example.com",roles:[]},
    {email:"admin@example.com",roles:['admin']}
];

_.each(users, function (user) {
    var id;

    id = Accounts.createUser({
        email: user.email,
        password: "apple1",
        profile: { name: user.email }
    });

    if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles, 'default-group');
    }

});