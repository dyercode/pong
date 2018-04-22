/*jshint newcap: false */
Crafty.scene('Game', function() {
		Game.buildWalls();
		Game.deployLazers();
		Game.placePaddles();
		Game.placeBall();
		//Game.generateVillages();
		//this.player = Crafty.e('PlayerCharacter').at(5, 5);
		/*this.show_victory = this.bind('VillageVisited', function() {
			if (!Crafty('Village').length) {
				Crafty.scene('Victory');
			}
		});
	}, function() {
		this.unbind('VillageVisited', this.show_victory);
*/
});