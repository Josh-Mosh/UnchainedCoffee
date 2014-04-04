module.exports = function Route(app){

 app.io.route('new_favorite', function(req){
 	var message = "New Favorite Added";
 	app.io.broadcast('updated_favorite', req.data)
 })

 app.io.route('new_shop', function(req){
 	console.log('REQ>>>', req);
 	var message = "New Shop Added";
 	app.io.broadcast('updated_shop', req.data)
 })

}
