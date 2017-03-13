//import 'simple-todos/client/main.js';


FlowRouter.route('/register',{
        name:'register',
        action(){
            BlazeLayout.render('register');
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

FlowRouter.route('/addNewProduct',{
    name:'addNewProduct',
    action(){
        BlazeLayout.render('addNewProduct');
    }
});
FlowRouter.route('/removeProduct',{
    name:'removeProduct',
    action(){
        BlazeLayout.render('removeProduct');
    }
});


function checkLoggedIn (ctx, redirect) {
    if (!Meteor.userId()) {
        redirect('/');
    }
};

function redirectIfLoggedIn (ctx, redirect) {
    if (Meteor.userId()) {
        redirect('/home');
    }
};

Accounts.onLogin(function () {
    FlowRouter.go('home');
});

