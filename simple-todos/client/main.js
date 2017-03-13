import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import {Items} from '../collections/collections.js';


Template.register.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var emailVar = template.find('#email').value;
    var pinVar = template.find('#userPin').value;
    Accounts.createUser({
      email: emailVar,
      password: pinVar
    });
    console.log(emailVar + " registered as " + userType);
  },
    'click .goLogin': function(event){
        event.preventDefault();
        FlowRouter.go('login');
    }

});

Template.login.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var emailVar = template.find('#login-email').value;
    var pinVar = template.find('#login-userPin').value;
    Meteor.loginWithPassword(emailVar,pinVar);
    console.log(emailVar + " logged in");
  },'click .register': function(event){
        event.preventDefault();
        FlowRouter.go('register');
        console.log("register here");
    }
});

Template.home.events({
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
    console.log("logged out");
  },'click .addNew': function(event){
    event.preventDefault();
    FlowRouter.go('addNewProduct');
    console.log("add products here");
  }
});

Template.addNewProduct.events({
    'click .goBack': function(event){
        event.preventDefault();
        FlowRouter.go('home');
        console.log("returned home");
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

Template.home.helpers({
    items() {
        return Items.find({});
    }
});
Template.home.helpers({
    products() {
        return Products.find({});
    }
});

// Template.my_form.events({
//     'submit .Insert': function( event ){   // also tried just 'submit', both work for me!
//         console.log( 'Submitting...' );
//         event.preventDefault();
//          name = event.target.textbox1.value;
//         Items.insert({
//             title: name,
//         });
//         event.target.textbox1.value = "";
//     }
// });

// Template.item.events({
//     /*'click .updoot'() {
//         // Set the checked property to the opposite of its current value
//          name1 = target.textbox1.value;
//         Items.update(this._id, {$set: {title: "cat"}});
//     },*/
//     'click .delete'() {
//         Items.remove(this._id);
//     },
// });
