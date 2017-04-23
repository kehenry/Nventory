/**
 * Created by Keenan on 3/14/2017.
 */
/**
 * Created by Keenan on 3/12/2017.
 */
Admins = new Mongo.Collection('admins');

Admins.allow({
    insert: function(userId, doc){
        return !!userId;
    }
});

AdminSchema = new SimpleSchema({
    email:{
        type: String,
        regEx: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        label: "Email"
    }
});

Admins.attachSchema(AdminSchema);

export default Admins;