// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
PokemonApp.Pokemon = function (pokemonUri) {
  this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
};

PokemonApp.Pokemon.prototype.render = function () {
  console.log("Rendering pokemon: #" + this.id);

  PokemonApp.clearModal();

  $("#pokemon-modal").modal("show");
  var self = this;
  $.ajax({
    url: "/api/pokemon/" + this.id,
    success: function (response) {
      self.info = response;
      console.debug('CHARACTER LOADED SUCCESFULLY');
      //console.log("Pokemon info:");
      console.log(self.info);
      $("#pkmn-name").text(self.info.name);
      $("#pkmn-number").text(self.info.pkdx_id);
      $("#pkmn-height").text(self.info.height);
      $("#pkmn-weight").text(self.info.weight);

      $("#pkmn-hp").text(self.info.hp);
      $("#pkmn-attack").text(self.info.attack);
      $("#pkmn-defense").text(self.info.defense);
      $("#pkmn-sp-attack").text(self.info.sp_atk);
      $("#pkmn-sp-defense").text(self.info.sp_def);
      $("#pkmn-speed").text(self.info.speed);
      var types = "";
      self.info.types.forEach(function(type){
      	types += type.name + ' ';
      });
      $("#pkmn-types").text(types);
      self.showHighestDesc(self.info.descriptions);
      self.getSprite(self.info.sprites[0].resource_uri);
      
      
    }
  });

};

PokemonApp.Pokemon.idFromUri = function (pokemonUri) {
  var uriSegments = pokemonUri.split("/");
  var secondLast = uriSegments.length - 2;
  return uriSegments[secondLast];
};

PokemonApp.Pokemon.prototype.getSprite = function(spriteUri){

  $.ajax({
    url: spriteUri,
    success: function (response) {
    	console.debug("SPRITE OBTAINED SUCCESFULLY");
    	$("#pkmn-sprite").attr("src",'http://pokeapi.co' + response.image);
    }
  });

};

PokemonApp.Pokemon.prototype.showHighestDesc = function(descriptions){
	var descUri = "";
	var highestDesc = 0;
	var self = this;

	descriptions.forEach(function(description){
		var arr = description.name.split('_');
		if (arr[(arr.length)-1] > highestDesc ){
			highestDesc = arr[(arr.length)-1];
			descUri = description.resource_uri;
		}
	});
	$.ajax({
    	url: descUri,
    	success: function (response) {
    		console.debug("DESCRIPTION OBTAINED SUCCESFULLY");
    		$('#pkmn-description').text(response.description);
    	}
 	});

};

$(document).on("ready", function () {

  $(".js-show-pokemon").on("click", function (event) {
    var $button = $(event.currentTarget);
    var pokemonUri = $button.data("pokemon-uri");

    var pokemon = new PokemonApp.Pokemon(pokemonUri);
    pokemon.render();
  });

});

PokemonApp.clearModal = function(){
	  $("#pkmn-name").text("loading...");
      $("#pkmn-number").text("loading...");
      $("#pkmn-height").text("loading...");
      $("#pkmn-weight").text("loading...");
      $("#pkmn-hp").text("loading...");
      $("#pkmn-attack").text("loading...");
      $("#pkmn-defense").text("loading...");
      $("#pkmn-sp-attack").text("loading...");
      $("#pkmn-sp-defense").text("loading...");
      $("#pkmn-speed").text("loading...");
      $("#pkmn-types").text("loading...");
      $("#pkmn-sprite").attr("src","");
      $('#pkmn-description').text("loading...");
};
