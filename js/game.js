const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let target = "";
let selectDiv = "";
let totalErrors = 0;

function round() {
  $(target).removeClass("target");
  $("span[name='" + target.substr(1) + "']").addClass("d-none"); 

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  
  target = divSelector;

  if (hits === maxHits) {
    endGame();
  }
  else{
    $("span[name='" + target.substr(1) + "']").removeClass("d-none");
    $("span[name='" + target.substr(1) + "']").text(hits+1);
  }
}

function endGame() {
  $("div.col").addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-errors").text(totalErrors);

  $("div.col").removeClass("target");
  $("span[name*='slot-']").addClass("d-none");

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  
  var currentTarget = event.target;
  if (event.target.localName == "span"){
    currentTarget = event.currentTarget;
  };
  //console.log(currentTarget.id);
  

  $(selectDiv).removeClass("miss");
  //selectDiv = "#"+event.target.id;
  selectDiv = "#"+currentTarget.id;
  //if ($(event.target).hasClass("target")) {
  if ($(currentTarget).hasClass("target")) {
    hits = hits + 1;
    round();
  }else if (firstHitTime !== 0){
    $(selectDiv).addClass("miss");
    totalErrors += 1;
  }
}

function init() {
  
  $(".game-field").click(handleClick);
  //$("span[name*='slot-']").click(handleClick);

  $("#button-reload").click(function() {
    
      $("div.col").removeClass("d-none");
      $("span[name*='slot-']").addClass("d-none");
      firstHitTime = getTimestamp();
      hits = 0;
      target = "";
      totalErrors = 0;
      $("div.target").removeClass("target");
      $("#win-message").addClass("d-none");
      round();

  });
}

$(document).ready(init);
