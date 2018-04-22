/*jshint newcap: false */
"use_strict";
var white = 'rgb(255,255,255)';
Crafty.c('Grid', {
	init: function() {
		this.attr({
			w: Game.mapGrid.tile.width,
			h: Game.mapGrid.tile.height
		});
	},
	at: function(x, y) {
		if (x === undefined && y === undefined) {
			return { x: this.x/Game.mapGrid.tile.width, y: this.y/Game.mapGrid.tile.height };
		} else {
			this.attr({ x: x * Game.mapGrid.tile.width, y: y * Game.mapGrid.tile.height });
			return this;
		}
	}
});

Crafty.c('Actor',{
	init: function() {
		this.requires('2D, Canvas, Grid');
	}
});

Crafty.c('Wall',{
	init: function() {
		this.requires('Actor, Solid, Color')
		.color(white);
	}
});

Crafty.c('TopWall',{
	init: function() {
		this.requires('Wall')
		.color(white);
	}
});

Crafty.c('BottomWall',{
	init: function() {
		this.requires('Wall')
		.color(white);
	}
});

Crafty.c('Lazerz', {
	init: function() {
		this.requires('Actor')
	}
});



Crafty.c('Paddle',{
	init: function() {
		this.requires('2D, Canvas, Solid, Color, Collision')
		.attr({
			w: Game.mapGrid.tile.width,
			h:Game.mapGrid.tile.height * 8
		})
		.color(white);
	},
	at: function(x, y) {
		if (x === undefined && y === undefined) {
			return { x: this.x/Game.mapGrid.tile.width, y: this.y/(Game.mapGrid.tile.height - this.h/2)};
		} else {
			this.attr({ x: x * Game.mapGrid.tile.width, y: y * Game.mapGrid.tile.height - (this.h/2) });
			return this;
		}
	}
});

Crafty.c('PlayerPaddle', {
	init: function() {
		this.requires('Paddle, Multiway')
		.multiway({
			UP_ARROW: -90,
			DOWN_ARROW: 90
		})
		.stopOnSolids();
	},
	stopOnSolids: function() {
		this.onHit('Solid', this.stopMovement);

		return this;
	},
	stopMovement: function() {
        this._speed = 0;
        if (this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
	}
});

Crafty.c('EnemyPaddle', {
init: function() {
	this.requires('Paddle');
	this.bind('EnterFrame', function() {
		var ball = Crafty('Ball');
		if (this._y > ball._y && !this.hit('TopWall')) {
			this.y = this._y - 1;
		} else if (this._y + this._h< ball._y  && !this.hit('BottomWall')) {
			this.y = this._y + 1;
		}
		//this.y = ball._y;
	});
}
});

Crafty.c('Ball',{
	init: function() {
		this.requires('Actor, Collision, Color')
		.bounceOnSolids()
		.color(white);
		this.attr({dX:2, dY:1.85});
		
		this.bind('EnterFrame', function() {
			this.x += this.dX;
			this.y += this.dY;
		});
	},
	bounceOnSolids: function() {
		this.onHit('Paddle', this.bounceX);
		this.onHit('Wall', this.bounceWall);
		this.onHit('Lazerz', this.boomLazerZat);
		return this;
	},
	bounceX: function() {
		this.attr({dX: -this.dX});
	},
	bounceWall: function() {
		this.attr({dY: -this.dY});
	},
	boomLazerZat: function() {
		if (!this.hit('Paddle')) {
			this.dX = 0;
			this.dY = 0;
		}
	}
});