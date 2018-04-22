"use_strict";
var Game = {
	mapGrid: {
		width: 36,
		height: 24,
		tile: {
			width: 16,
			height: 16
		}
	},
	width: function() {
		return Game.mapGrid.width * Game.mapGrid.tile.width;
	},
	height: function() {
		return Game.mapGrid.height * Game.mapGrid.tile.height;
	},
	center: function() {
		return {x:(Game.mapGrid.width - 1)/ 2, y:(Game.mapGrid.height - 1)/ 2};
	},
	addWall: function(x, y) {
		Crafty.e('TopWall').at(x,0);
		Crafty.e('BottomWall').at(x,Game.mapGrid.height - 1);
	},
	buildWalls: function() {
		var lengthOfField = _.range(Game.mapGrid.width);
		_.each(lengthOfField, function(x) {Game.addWall(x);});
	},
	deployLazers: function() {
		_.each(_.range(0, Game.mapGrid.height - 1), function(y) {
			Crafty.e('Lazerz').at(0,y);
			Crafty.e('Lazerz').at(Game.mapGrid.width -1,y);
		});
	},
	placeBall: function() {
		var center = Game.center();
		Crafty.e('Ball').at(center.x, center.y);
	},
	placePaddles: function() {
		var center = Game.center();
		Crafty.e('PlayerPaddle').at(0,center.y);
		Crafty.e('EnemyPaddle').at(Game.mapGrid.width - 1, center.y);
	},
	start: function() {
		Crafty.init(Game.width(), Game.height());
		Crafty.background('rgb(87, 109, 20)');
		Crafty.scene('Game');
	}
};