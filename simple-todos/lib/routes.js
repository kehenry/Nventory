//import 'simple-todos/client/main.js';
import Admins from '../collections/Admins.js';


FlowRouter.route('/register',{
        name:'register',
        action(){
            BlazeLayout.render('register');
        }
});
FlowRouter.route('/adminhome',{
        name:'adminhome',
        triggersEnter: [checkLoggedIn],
        action(){
            BlazeLayout.render('adminhome');
        }
});
FlowRouter.route('/home',{
        name:'home',
        triggersEnter: [checkLoggedIn],
        action(){
            BlazeLayout.render('home');
        }
});
FlowRouter.route('/',{
    name:'login',
    triggersEnter: [redirectIfLoggedIn],
    action(){
        BlazeLayout.render('login');
    }
});
FlowRouter.route('/editProduct',{
    name:'editProduct',
    action(){
        BlazeLayout.render('editProduct');
    }
});
FlowRouter.route('/adminTools',{
    name:'adminTools',
    action(){
        BlazeLayout.render('adminTools');
    }
});

FlowRouter.route('/productPage',{
    name:'productPage',
    action(){
        BlazeLayout.render('productPage');
    }
});

FlowRouter.route('/addProduct',{
    name:'addProduct',
    action(){
        BlazeLayout.render('addProduct');
    }
});
FlowRouter.route('/removeProduct',{
    name:'removeProduct',
    action(){
        BlazeLayout.render('removeProduct');
    }
});

FlowRouter.route('/labs',{
    name:'labPage',
    action(){
        BlazeLayout.render('labPage');
    }
});

FlowRouter.route('/checkoutPage',{
    name:'checkoutPage',
    action(){
        BlazeLayout.render('checkoutPage');
    }
});

FlowRouter.route('/addLab',{
    name:'addLab',
    action(){
        BlazeLayout.render('addLab');
    }
});
FlowRouter.route('/newCheckout',{
    name:'newCheckout',
    action(){
        BlazeLayout.render('newCheckout');
    }
});

FlowRouter.route('/newCheckout1',{
    name:'newCheckout1',
    action(){
        BlazeLayout.render('newCheckout1');
    }
});
FlowRouter.route('/removeCheckout',{
    name:'removeCheckout',
    action(){
        BlazeLayout.render('removeCheckout');
    }
});
FlowRouter.route('/removeLab',{
    name:'removeLab',
    action(){
        BlazeLayout.render('removeLab');
    }
});
FlowRouter.route('/addAmin',{
    name:'addAdmin',
    action(){
        BlazeLayout.render('addAdmin');
    }
});


function checkLoggedIn (ctx, redirect) {
    if (!Meteor.userId()) {
        redirect('/');
    }
};

function redirectIfLoggedIn (ctx, redirect) {


    if(Meteor.userId()){
        var currentEmail = Meteor.user().emails[0].address;
        if(Admins.findOne({email:currentEmail})){
            redirect('/adminhome');
        }
        else{
            redirect('home');
        }
    }
};

Accounts.onLogin(function () {
    var currentEmail = Meteor.user().emails[0].address;
    if(Admins.findOne({email:currentEmail})){
        FlowRouter.go('/adminhome');
    }
    else{
        FlowRouter.go('home');
    }

});

