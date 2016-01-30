PokemonApp.PokemonEvolutions = function (id, info) {
  this.id = id;
  this.info = info;
};

PokemonApp.PokemonEvolutions.prototype.render = function () {
  console.log("Rendering evolutions for: #" + this.id);

  // You will need some AJAX calls!
};

$(document).on("ready", function () {

  $("#btn-evolution").on("click", function (event) {
  	$(".evolution-body").toggleClass("hide");
  });

});