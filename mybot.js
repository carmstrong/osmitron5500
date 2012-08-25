function new_game() {
	next_position = null;
	DEBUG = false;
}

function make_move() {
   var board = get_board();

   // we found an item! take it!
   if (board[get_my_x()][get_my_y()] > 0) {
   	next_position = null;
   	return TAKE;
   }

   	if(next_position == null || board[next_position.x][next_position.y] == 0){
   		next_position = find_next_position();
   	}

   	if( next_position == null ){
   		if( DEBUG ){
   			trace("I don't know what to do!");
   		}
   		return PASS;
   	}

   	var next_direction = get_direction(get_my_x(),get_my_y(),next_position.x,next_position.y);
   	if( DEBUG ){
   		trace("I'm at: ["+get_my_x()+","+get_my_y()+"]. My target is: ["+next_position.x+","+next_position.y+"]. I'm headed "+get_text_direction(next_direction));
   	}
	return next_direction;
}

function find_next_position(){
	// first, we need all da fruit!
	var fruit = find_all_fruit();
	var min_fruit = null;
	var min_cost = 100000;
	for(var i=0;i<fruit.length;i++){
		var curr_cost = calc_cost(get_my_x(),get_my_y(),fruit[i],fruit);
		if(min_fruit == null || curr_cost < min_cost){
			min_fruit = fruit[i];
			min_cost = curr_cost;
		}
	}
	return min_fruit;
}

function calc_cost(myX,myY,fruit,allFruit){
	var dists = [];
	for(var i=0;i<allFruit.length;i++){
		if(fruit.x != allFruit[i].x && fruit.y != allFruit.y){
			dists.push(calc_distance(fruit.x,fruit.y,allFruit[i].x,allFruit[i].y));
		}
	}
	return dists.avg() + calc_distance(myX,myY,fruit.x,fruit.y);
}

function calc_distance(x1,y1,x2,y2){
	return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}

function find_all_fruit(){
	var board = get_board();
	var fruit = [];
	for (x=0;x<WIDTH;x++){
		for(y=0;y<HEIGHT;y++){
			if(board[x][y] > 0){
				fruit.push({"x":x,"y":y});
				if( DEBUG ){
					trace("Fruit found at ["+x+","+y+"]");
				}
			}
		}
	}
	return fruit;
}

function get_direction(myX,myY,targetX,targetY){
	if(myX > targetX){
		return WEST;
	}
	if(myX < targetX){
		return EAST;
	}
	if(myY > targetY){
		return NORTH;
	}
	if(myY < targetY){
		return SOUTH;
	}
}

function get_text_direction(dir){
	switch(dir){
		case NORTH:
			return "NORTH";
		case SOUTH:
			return "SOUTH";
		case WEST:
			return "WEST";
		case EAST:
			return "EAST";
	}
}

// http://javascript.about.com/library/blaravg.htm
Array.prototype.avg = function() {
var av = 0;
var cnt = 0;
var len = this.length;
for (var i = 0; i < len; i++) {
var e = +this[i];
if(!e && this[i] !== 0 && this[i] !== '0') e--;
if (this[i] == e) {av += e; cnt++;}
}
return av/cnt;
}