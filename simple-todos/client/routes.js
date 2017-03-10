Router.route('/home', function () {
    this.render('home');
});

Router.route('/', function () {
    this.render('login');
});