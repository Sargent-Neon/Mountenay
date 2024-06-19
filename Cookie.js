var open = false, inventory = false;


window.onload = function() {
  var drag = document.getElementsByClassName('op');
  for (var i = 0; i < drag.length; i++) {
    drag[i].draggable = false;
  }
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  var buffer = cArray[0].split("=");
  if (buffer[1].indexOf("Inv") !== -1 && inventory == false) {
    createInventory();
    return;
  }
}

function removeBtn(name) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  cArray.forEach(element => {
    var buffer = element.split("=");
    if (buffer[1].indexOf("Inv") == 0 && inventory == false) {
      createInventory();
    }
    if (buffer[0].indexOf(name) == 0) {
      var elem = document.getElementById(name);
      elem.parentNode.removeChild(elem);
    }
  })
}

function createInventory() {
  const Inv = document.createElement('div');
  Inv.innerHTML = '<img id="Inventory" draggable="false" class="m" onclick="Inv()" src="/BackgroundImages/IB.png" width="100px" height="auto">';
  document.getElementById("InvBtn").appendChild(Inv);
  inventory = true;
}

// function checkCookies(name){
//   const cDecoded = decodeURIComponent(document.cookie);
//   const cArray = cDecoded.split(";");
//   cArray.forEach(element => {
//     var buffer = element.split("=");
//     if(buffer[0].indexOf(name) == 0){
//       return true;
//     }
//   })
// }

function checkSuit(name, value) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  var buffer = cArray[0].split("=");
  if (buffer[0].indexOf("Suitcase") == 0) {
    create(name, value);
  }
}

function create(name, value) {
  const d = new Date();
  d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/;";
  removeBtn(name);
}

//document.cookie = "dog=have;expires="

function Inv() {
  if (open == false) {
    document.getElementById("Inventory").src = "/BackgroundImages/CIB.png";
    //var buttons = document.getElementsByClassName('op');
    itemsCollected();
    var images = document.getElementsByClassName('op');
    for (var i = 0; i < images.length; i++) {
      images[i].style.pointerEvents = "none";
    }
    open = true;
  }
  else {
    document.getElementById("Inventory").src = "/BackgroundImages/IB.png";
    document.getElementById('grid').innerHTML = '';
    var images = document.getElementsByClassName('op');
    for (var i = 0; i < images.length; i++) {
      images[i].style.pointerEvents = "auto";
    }
    open = false;
  }
  var buttons = document.getElementsByClassName('op');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.opacity = (
      buttons[i].style.opacity == "0.5" ? "1" : "0.5");
  }
}

function itemsCollected() {
  var items = [];
  var counter = 0;
  const value = `${document.cookie}`;
  const parts = value.split(`; `);
  for (var i = 0; i < parts.length; i++) {
    const ic = parts[i].split("=");
    if (ic[1] == "have") {
      items[counter] = ic[0];
      counter++;
    }
  }
  displayItem(items);
}

function displayItem(a) {
  for (var i = 0; i < a.length; i++) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'gallery__img';
    itemDiv.innerHTML = '<img src="/itemsImages/' + a[i] + '.png" width = 100px height = 100px>';
    document.getElementById('grid').appendChild(itemDiv);
  }
}