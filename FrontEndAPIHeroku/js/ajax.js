function get(url, successCallback, errorCallback) {
  // istanzio l'oggetto request
  var xhr = new XMLHttpRequest();

  // creo un domain request per non incappare nell'eccezione CORS
  if (!("withCredentials" in xhr)) xhr = new XDomainRequest();

  // apro la connessione per effettuare la GET all'url specificato
  xhr.open("GET", url, true);

  // dichiaro la callback da usare in caso di successo
  xhr.onload = successCallback;

  // dichiaro la callback da usare in caso di errore
  xhr.onerror = errorCallback;

  // effettuo la chiamata
  xhr.send();
  return xhr;
}

function post(url, data, successCallback, errorCallback) {
  /* 
 // questo va aggiunto nel caso in cui i dati arrivino direttamente un form html
 var params =
    typeof data == "string"
      ? data
      : Object.keys(data)
          .map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
          })
          .join("&");
*/
  var params = data;

  // istanzio l'oggetto request
  var xhr = new XMLHttpRequest();

  // creo un domain request per non incappare nell'eccezione CORS
  if (!("withCredentials" in xhr)) xhr = new XDomainRequest();

  // preparo la chiamata all'url specificato
  xhr.open("POST", url);

  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3) {
      if (xhr.status == 200) {
        // dichiaro la callback nel caso di successo
        successCallback(xhr.responseText);
      }
      // dichiaro la callback nel caso di fallimento
      else errorCallback();
    }
  };

  // setto gli header necessari
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/json");

  // effettuo la chiamata
  xhr.send(params);
  return xhr;
}

function remove(url, successCallback, errorCallback) {
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3) {
      if (this.status == 204) {
        // dichiaro la callback nel caso di successo
        successCallback(xhr.responseText);
      }
      // dichiaro la callback nel caso di fallimento
      else errorCallback();
    }
  };
  xhr.send();
}


function put(url, data, successCallback, errorCallback) {
  /* 
 // questo va aggiunto nel caso in cui i dati arrivino direttamente un form html
 var params =
    typeof data == "string"
      ? data
      : Object.keys(data)
          .map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
          })
          .join("&");
*/
  var params = data;

  // istanzio l'oggetto request
  var xhr = new XMLHttpRequest();

  // creo un domain request per non incappare nell'eccezione CORS
  if (!("withCredentials" in xhr)) xhr = new XDomainRequest();

  // preparo la chiamata all'url specificato
  xhr.open("PUT", url);

  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3) {
      if (xhr.status == 200) {
        // dichiaro la callback nel caso di successo
        successCallback(xhr.responseText);
      }
      // dichiaro la callback nel caso di fallimento
      else errorCallback();
    }
  };

  // setto gli header necessari
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/json");

  // effettuo la chiamata
  xhr.send(params);
  return xhr;
}

function remove(url, successCallback, errorCallback) {
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3) {
      if (this.status == 200) {
        // dichiaro la callback nel caso di successo
        successCallback(xhr.responseText);
      }
      // dichiaro la callback nel caso di fallimento
      else errorCallback();
    }
  };
  xhr.send();
}

function errorHandler() {
  console.log("XHR ERROR!!!");
}