
import { Template } from 'meteor/templating';
import Products from '../collections/Products.js';
import Labs from '../collections/Labs.js';
import Checkouts from '../collections/Checkouts.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// validating email
var isEmail = function(value){
    var filter=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if(filter.test(value)){
        return true
    }
    Bert.alert("Invalid email or empty.",'warning','fixed-top');
    return false;
};


Template.register.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var emailVar = template.find('#email').value;
        var pinVar = template.find('#userPin').value;

        if (isEmail(emailVar)) {
            Accounts.createUser({
                email: emailVar,
                password: pinVar
            });
            console.log(emailVar + " registered as ");
            FlowRouter.go('login');

        }

        return false;// prevent the submission

        /*   console.log(emailVar + " registered as ");
         },
         'click .goLogin': function(event){
         event.preventDefault();
         */
    },
    'click .goLogin': function(event) {
        event.preventDefault();
        FlowRouter.go('login');
    }
});

Template.login.events({
    'submit form': function(event, template) {FlowRouter.go('login');
        event.preventDefault();
        var emailVar = template.find('#login-email').value;
        var pinVar = template.find('#login-userPin').value;
        Meteor.loginWithPassword(emailVar,pinVar,function (err) {
            if(err){
                Bert.alert("Incorrect email or password! Try again.",'warning','fixed-top');
            }
        });
        console.log(emailVar + " logged in" );
    },'click .register': function(event){
        event.preventDefault();
        FlowRouter.go('register');
        console.log("register here");
    },'click .addAdmin': function(event){
        event.preventDefault();
        FlowRouter.go('addAdmin');
    }
});

Template.adminhome.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        console.log("logged out");
    },'click .adminTools': function(event){
        event.preventDefault();
        FlowRouter.go('adminTools');
        console.log("add products here");
    },'click .newCheckout1': function(event){
        event.preventDefault();
        FlowRouter.go('newCheckout');
        console.log("add new checkouts")
    }
});
Template.home.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        console.log("logged out");
    }
});

Template.adminTools.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('home');
        console.log("returned home");
    },
    'click .addadmin': function(event){
        event.preventDefault();
        FlowRouter.go('addAdmin');
    },
    'click .labPage': function(event){
        event.preventDefault();
        FlowRouter.go('labPage');
        console.log("view and edit labs here");
    }, 'click .productPage': function(event){
        event.preventDefault();
        FlowRouter.go('productPage');
        console.log("view and edit products here");
    }
    , 'click .checkoutPage': function(event){
        event.preventDefault();
        FlowRouter.go('checkoutPage');
        console.log("view and add checkouts here");}
});


Template.editProduct.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('productPage');
    }
});
Template.addAdmin.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('login');
    }
});

Template.labPage.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('adminTools');
    }
    ,'click .addLab': function(event){
        event.preventDefault();
        FlowRouter.go('addLab');
        console.log("add labs here");
    }
    ,'click .removeLab': function(event){
        event.preventDefault();
        FlowRouter.go('removeLab');
        console.log("remove products here");
    }
    // , 'click .editLab': function(event){
    //     event.preventDefault();
    //     FlowRouter.go('editLab');
    //     console.log("edit products here");}
});

Template.productPage.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('adminTools');
    }
    ,'click .newProduct': function(event){
        event.preventDefault();
        FlowRouter.go('addProduct');
        console.log("add products here");
    }
    ,'click .removeProduct': function(event){
        event.preventDefault();
        FlowRouter.go('removeProduct');
        console.log("remove products here");
    }
    , 'click .editProduct': function(event){
        event.preventDefault();
        FlowRouter.go('editProduct');
        console.log("edit products here");}
});
Template.checkoutPage.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('adminTools');
    }
    ,'click .newCheckout': function(event){
        event.preventDefault();
        FlowRouter.go('newCheckout');
    }
    ,'click .removeCheckout': function(event){
        event.preventDefault();
        FlowRouter.go('removeCheckout');
        console.log("remove checkouts here");
    }

});

Template.newCheckout.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('checkoutPage');
    },
    'click .goHome': function(event){
        event.preventDefault();
        FlowRouter.go('home');
    }
});




Template.addProduct.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('productPage');
    }
});

Template.addLab.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('labPage');
    }
});
Template.removeProduct.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('productPage');
    },
    'click .delete': function () {
        Products.remove(this._id);
    }
});
Template.removeCheckout.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('checkoutPage');
    },
    'click .delete': function () {
        Checkouts.remove(this._id);
    }
});
Template.removeLab.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('labPage');
    },
    'click .delete': function () {
        Labs.remove(this._id);
    }
});

// Template.home.events({
//     'click.register': function(event){
//         event.preventDefault();
//         FlowRouter.go('register');
//         console.log("register here");
//     }
// });

Tracker.autorun(function () {
    if (!Meteor.userId()) {
        FlowRouter.go('login');
    }
});


Template.removeProduct.helpers({
    products() {
        return Products.find({},{
            sort:{name:1}
        });    }
});

Template.productPage.helpers({
    products() {
        return Products.find({},{
            sort:{name:1}
        });    }
});
Template.home.helpers({
    products() {
        return Products.find({},{
            sort:{name:1}
        });    }
});
Template.adminhome.helpers({
    products() {
        return Products.find({},{
            sort:{name:1}
        });    }
});
Template.editProduct.helpers({
    products() {
        //Products.price().toFixed(2);
        return Products.find({},{
            sort:{name:1}
        });
    }
});

Template.labPage.helpers({
    labs() {
        return Labs.find({},{
            sort:{name:1}
        });    }
});
Template.removeLab.helpers({
    labs() {
        return Labs.find({},{
            sort:{name:1}
        });    }
});

// global template for dates
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('LLL');
});

Template.checkoutPage.helpers({
    checkouts() {
        return Checkouts.find({},{
            sort:{date:-1}
        });
    }
});

Template.removeCheckout.helpers({
    checkouts() {
        return Checkouts.find({},{
            sort:{date:-1}
        });
    }
});
Template.editProduct.events({
        'click .goBack': function(event){
            event.preventDefault();
            FlowRouter.go('productPage');
        },
        'click .editThis': function(event,) {
            event.preventDefault();
            let newName = $("#updateName").val();
            let newPrice = $("#updatePrice").val();
            let newQuantity = $("#updateQuantity").val();
            Products.update(this._id, {$set: {name: newName}});
            Products.update(this._id, {$set: {price: newPrice}});
            Products.update(this._id, {$set: {quantity: newQuantity}});
        },
    }

);