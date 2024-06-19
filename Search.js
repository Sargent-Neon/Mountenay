function check(result, french, id){
  var have = false;
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  cArray.forEach(element => {
    var buffer = element.split("=");
    if(result == "Ten" || result == "Dog"){
      if(buffer[0] == "Ten"){
        var elem = document.getElementById('b');
        elem.parentNode.removeChild(elem);
        have = true;
      }
    }
    else if(buffer[0] == result){
      var buf = document.getElementById("w");
      buf.style.pointerEvents = "none";
      have = true;
    }
  });
  if(have == false){
    Search(result, french, id);
  }
}

function Search(result, french, id){
  const dia = document.createElement('div');
    dia.innerHTML = "<p id='dialogue'>Tu as trouvé "+french+"</p>";
    document.body.appendChild(dia);
  if(result.indexOf("Nothing") != 0){
    found(result, 'have');
  }
  else{
    found(result, 'Nothing');
  }
  let timeout = setTimeout(deleteTxt, 2000);
  if(id == 'w'){
    document.getElementById(id).style.pointerEvents = "none";
  }
  else{
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
  }
}

function deleteTxt(){
  var elem = document.getElementById('dialogue');
  elem.parentNode.removeChild(elem);
}

function found(name, value){
    const d = new Date();
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/;";
}