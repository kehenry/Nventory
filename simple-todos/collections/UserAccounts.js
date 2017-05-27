/**
 * Created by Keenan on 3/14/2017.
 */
/**
 * Created by Keenan on 3/12/2017.
 */
UserAccounts = new Mongo.Collection('UserAccounts');

UserAccounts.allow({
    insert: function(UserAccountId, doc){
        return !!UserAccountId;
    }
});

UserAccountSchema = new SimpleSchema({
    email:{
        type: String,
        regEx: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        label: "Email"
    },
    pin:{
        type: String,
        label:"Pin"
    },
    date:{
        type: Date,
        label: "Date Created",
        autoValue: function () {
            return new Date()
        },
        autoform: {
            type:"hidden"
        }
    }
});

UserAccounts.attachSchema(UserAccountSchema);

export default UserAccounts;