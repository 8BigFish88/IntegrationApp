/*Lezione 27-28/01/2020 
N.B. 1 - I commenti sono da leggere da quello più in basso a quello più in alto.
     2 - Le funzioni get, remove e put sono definite in ajax.js.
     3 - Per inserire i pulsanti che ci serivano abbiamo scaricato 
          la cartella font da https://fontawesome.com/v4.7.0/assets/font-awesome-4.7.0.zip 
     4 - Essendo quest'app collegata ad un servizio esterno di fake API,
         non è possibile fare effettivamente delle modifiche nel loro db.
         Perciò non possiamo aspettarci delle modifiche effettive causate dalla post,
         dalla put o dalla delete.
         Possiamo però verificare che le chiamate siano andate a buon fine dalla console.
         GET e PUT dovranno restituire codice 200,
         POST 201 e DELETE 204.
      */

/* Queste linee di codice dichiarano delle varibili globali.
Tali variabili occorreranno per:
- definire l'url, chiamato dalle richieste html get, post etc..
- definire la pagina iniziale associata alla funzione loadUsers
- definire una variabile di ricerca testo necessaria al funzionamento
   del form di ricerca.
*/

//const API_URL='https://reqres.in/api/users';
const API_URL='https://api8bigfiish88.herokuapp.com/api/v1.0/users/';
var page=1;
var searchText;

/* Questa funzione serve a far funzionare il pulsante submit
  associato al form dell'updateUser.
  Il suo scopo è chiamre la funzione put.
  Questa è un'operazione che non abbiamo terminato a lezione.
  Vedremo domani la soluzione.
*/
  
  function userPut(event, id) {
    console.log(event);
    event.preventDefault();
    
    var card = document.getElementById("user_" + id);

    /*Inizializzando un oggetto FormData, possiamo manipolare
    il contenuto di un form senza conoscerne il nome dei campi.
    Tramite un ciclo for costruiamo quindi un oggetto json con il
    suo contenuto*/
    let formData = new FormData(card.getElementsByTagName("form")[0]);
  
    console.log(formData);
  
    let jsonObject={};
    for (const [key, value]  of formData.entries()) {
        jsonObject[key] = value;
    }
    console.log(jsonObject);
  
    data = JSON.stringify(jsonObject);
  
    console.log(data);
  
    put(
      API_URL+id,
      data,
      function(request) {
        console.log("utente modificato", request);
        loadUsers(1);
      },
      function() {
        console.log("ko");
      }
    );
  }

/* Questa funzione serve a far funzionare il pulsante 
  associato all'evento closeUpdate.
  Vedi funzionamento closeDetails.
*/

function closeUpdate(id){
  var card = document.getElementById("user_"+id);
  card.getElementsByClassName("intro")[0].style.display="block";
  card.getElementsByClassName("update")[0].remove();
}

/* Questa funzione serve a far funzionare il  pulsante 
  associato all'evento updateUser.
  Per farlo chiama una funzione get che recupera 
  i dati dell'utente col relativo id.
  In caso di successo entra in gioco una funzione succesCallback.
  Questa cambia il contenuto della relativa card user.
  Questo è possibile modificando lo stile 
  della div "intro" e ponendo: display="none".
  Successivamente è necessario ripopolare il contenuto
  della card con una nuova div.
  Quest'ultima sarà  popolata del nuovo contenuto, 
  il quale, in questo caso, è costituito da un form.
  In caso di insuccesso verrà chiamata la errorCallback. 
  In questo caso costituita da
  un semplice console.log.*/
function updateUser(id){
  get(
    API_URL+id,
    function(request){
          var response =
            request.currentTarget.response || request.target.responseText;
          var user = JSON.parse(response);
          var card = document.getElementById("user_"+id);
          card.getElementsByClassName("intro")[0].style.display="none";
          card.innerHTML+='<div class="update">\
              <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">\
              <image x="0" y="0" width="140" height="140" style="display: block; width: 100%; height: 100%; object-fit: cover;" xlink:href="'+user.avatar+'"/></svg>\
              <form id="form" onsubmit="userPut(event,' +
              id +
              ')">\
              <div class="form-group">\
                <label for="email">Email address</label>\
                <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">\
                <small id="emailHelp" class="form-text text-muted">We ll never share your email with anyone else.</small>\
              </div>\
              <div class="form-group">\
                  <label for="name">Name</label>\
                <input name="name" type="text" class="form-control" id="name" placeholder="Name">\
              </div>\
              <div class="form-group">\
                <label for="description">Description</label>\
                <input name="description" type="text" class="form-control" id="description" placeholder="Description">\
              </div>\
              <div class="form-group">\
                <label for="avatar">Avatar</label>\
                <input name="avatar" type="text" class="form-control" id="avatar" placeholder="Avatar">\
              </div>\
              <button type="submit" class="btn btn-primary">Submit</button>\
              </form>\
              <p><a onclick="closeUpdate('+id+')" class="btn btn-primary col-lg-4 col-xs-4 col-md-4 col-sm-4" href="javascript:void(0)" role="button"><i class="fa fa-window-close-o" aria-hidden="true"></i></a>\
              </p>\
              </div>';
    },
    function(){console.log("ko");}
  )
}

/* Questa funzione serve a far funzionare il pulsante 
  di submit associato al form Crea Nuovo Utente.
  Costruisce un oggetto JSON tramite il contenuto del form
  compilato. In seguito chiama una post a cui viene mandato
  tra i parametri, l'oggetto JSON trasformato in stringa.
  Se la chiamata viene fatto ad un servizio esterno doi mok API,
  non potremmo effettivamente modificare i dati del loro db.
  Ci dovremmo accontentare di leggere in console 
  una risposta positiva, in caso la chiamata sia andata a buon fine.
  Questo dscorso vale anche per la put e la delete.
  */

function userPost(event) {
  console.log(event);
  event.preventDefault();
  let formData = new FormData(document.getElementById("form_new"));
  let jsonObject={}
  for (const [key, value]  of formData.entries()) {
      jsonObject[key] = value;
  }
  data = JSON.stringify(jsonObject);
  console.log(data);
  post(
    API_URL,
    data,
    function(request) {
      console.log("utente salvato", request);
      loadUsers(1)
    },
    function() {
      console.log("ko");
    }
  );
}


/* Questa funzione serve a far funzionare il pulsante 
  associato all'evento closeNew.
  Vedi funzionamento closeDetails.
*/
function closeNew(id){
  var card = document.getElementById("card-user-new");
  card.getElementsByTagName("a")[0].style.display="block";
  card.getElementsByTagName("form")[0].remove();
  card.getElementsByTagName("p")[0].remove();
}

/* Questa funzione serve a far funzionare il pulsante 
  Crea Nuovo Utente.
  Selezionata la card card-user-new invisibile,
  pone la sua visibilità in modalità block. 
  Costruisce un form di inserimento dati utente.
  Al form viene quindi associato un evento onsubmit,
  a cui viene collegata la funzione userPost definita sopra.
  */

function userSave() {

  var card = document.getElementById("card-user-new" );
  document.getElementById("create").style.display="none";
  card.innerHTML +=
    '<form id="form_new" onsubmit="userPost(event); closeNew()">\
    <div class="form-group">\
      <label for="email">Email address</label>\
      <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">\
      <small id="emailHelp" class="form-text text-muted">We ll never share your email with anyone else.</small>\
    </div>\
    <div class="form-group">\
        <label for="name">Name</label>\
      <input name="name" type="text" class="form-control" id="name" placeholder="Name">\
    </div>\
    <div class="form-group">\
      <label for="description">Description</label>\
      <input name="description" type="text" class="form-control" id="description" placeholder="Description">\
    </div>\
    <div class="form-group">\
      <label for="avatar">Avatar</label>\
      <input name="avatar" type="text" class="form-control" id="avatar" placeholder="Avatar">\
    </div>\
    <button type="submit" class="btn btn-primary">Submit</button>\
    </form>\
    <p><a onclick="closeNew()" class="btn btn-primary col-lg-2 col-xs-2 col-md-2 col-sm-2" href="javascript:void(0)" role="button"><i class="fa fa-window-close-o" aria-hidden="true"></i></a>\
    </p>';

}

/* Questa funzione serve a far funzionare il  pulsante 
  associato all'evento deleteUser.
  Per farlo chiama la funzione remove.
  In caso di successo entra in gioco una funzione succesCallback.
  La quale elimina la relativa card user.
  In caso di insuccesso verrà chiamata la errorCallback. 
  In questo caso verrà mostrata una div con stile alert-danger.*/

function deleteUser(id){
  remove(
    API_URL+id,
    function(){
      var card = document.getElementById("user_"+id);
      card.remove();
      loadUsers(1);
    },
    function(){
      var p = document.getElementById("card-container");
      p.innerHTML = "";
      p.innerHTML='<div  class="alert alert-danger col-xs-12 col-lg-12">Errore di caricamento dati</div>';
  }
  )
}

/* Questa funzione serve a far funzionare il pulsante 
  associato all'evento closeDetails.
  Quando è stato chimato l'evento userDetails, 
  è possibile tornare alla visualizzazione precedente
  della card cliccando su un'icona a forma di x.
  Per far ciò basta recuperare la card in questione tramite il metodo:
  getElementById.
  Successivamente è necessario porre lo stile dell div "intro" 
  (che racchiude il contenuto) su display="block".
  Infine occorre rimuovere la div "details" che conteneva i dettagli
  inseriti nella funzione userDetails.
  */
function closeDetails(id){
  var card = document.getElementById("user_"+id);
  card.getElementsByClassName("intro")[0].style.display="block";
  card.getElementsByClassName("details")[0].remove();
}


/* Questa funzione serve a far funzionare il  pulsante 
  associato all'evento userDetails.
  Per farlo chiama una funzione get che recupera 
  i dati dell'utente col relativo id.
  In caso di successo entra in gioco una funzione succesCallback,
  la quale cambia il contenuto della relativa card user.
  Questo è possibile modificando lo stile 
  della div "intro" e ponendo: display="none".
  Successivamente è necessario ripopolare il contenuto
  della card con una nuova div.
  Quest'ultima sarà  popolata del nuovo contenuto.
  In caso di insuccesso verrà chiamata la errorCallback. 
  In questo caso costituita da
  un semplice console.log.*/
function userDetails(id){
  get(
    API_URL+id,
    function(request){
          console.log("ok");
          var response =
            request.currentTarget.response || request.target.responseText;
          var user = JSON.parse(response);
          console.log("get result:", user);
          var card = document.getElementById("user_"+id);
          card.getElementsByClassName("intro")[0].style.display="none";
          card.innerHTML+='<div class="details">\
              <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">\
              <image x="0" y="0" width="140" height="140" style="display: block; width: 100%; height: 100%; object-fit: cover;" xlink:href="'+user.avatar+'"/></svg>\
              <h2>'+user.name+'</h2>\
              <p class="description">'+user.description+'</p>\
              <p><a onclick="closeDetails('+id+')" class="btn btn-primary col-lg-4 col-xs-4 col-md-4 col-sm-4" href="javascript:void(0)" role="button"><i class="fa fa-window-close-o" aria-hidden="true"></i></a>\
              </p>\
              </div>';
    },
    function(){console.log("ko");}
  )
}

/* Questa funzione serve far funzionare il form di ricerca.
  Ma perchè funzioni effettivamente occorre che sia implementato 
  una get specifica lato server.
*/

function search(){
  searchText = document.getElementById("searchText").value;
  loadUsers();
}

/*Questa è la funzione che faceva visualizzare la lista degli utenti.
Abbiamo iniziato inserendo dei pulsanti sulla parte bassa delle card.
Details, Update, Delete.
Successivamente abbiamo associato a tali pulsanti degli eventi: onclick.
Per ogni evento abbiamo definito una funzione che determinava il comportamento
di tali pulsanti.*/

function loadUsers(page){
  var url = API_URL+"?page="+page;
  if(searchText){
    url = url + '&search='+searchText;
  }

  get(
    API_URL+"?page="+page,
    function(request) {
      var response =
        request.currentTarget.response || request.target.responseText;
      var user = JSON.parse(response);
      console.log(JSON.parse(response))
      response = JSON.parse(response);
      var currentPage = response.page;
      var totalPages = response.total_pages;
      var container = document.getElementById("cards-container");
      container.innerHTML = '';
      for(let i=0; i<user.length;i++){
          container.innerHTML+='<div id="user_'+user[i].id+'" class="col-lg-4 col-xs-12 col-md-12 col-sm-12">\
          <div class="intro">\
          <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140" style="background: url('+user[i].avatar+') center; background-size: cover;">\
          </svg>\
          <h2>'+user[i].name+'</h2>\
          <p>'+user[i].email+'</p>\
          <p><a onclick="userDetails('+user[i].id+')" class="btn btn-success col-lg-2 col-xs-1 col-md-1 col-sm-1" href="javascript:void(0)" role="button"><i class="fa fa-eye" aria-hidden="true"></i></a>\
          <a onclick="updateUser('+user[i].id+')" class="btn btn-primary col-lg-2 col-xs-1 col-md-1 col-sm-1" href="javascript:void(0)" role="button"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>\
          <a onclick="deleteUser('+user[i].id+')" class="btn btn-danger col-lg-2 col-xs-1 col-md-1 col-sm-1" href="javascript:void(0)" role="button"><i class="fa fa-trash-o" aria-hidden="true"></i></a>\
          </p>\
          </div>\
          </div>';
      }

      /*Queste linee di codice consentono la paginazione
      degli elementi restituiti dalla chiamata get*/

      console.log(totalPages)
      console.log(currentPage)
      var paginator = document.getElementById("card-paginator");
      paginator.innerHTML = "";
      for (let i = 1; i <= totalPages; i++) {
        paginator.innerHTML +=
        '<a class="btn btn-lg '+(currentPage==page?'active':'')+' "   href="javascript:void(0)"  onclick="loadUsers('+i+')" > ' + i + "</a>";
      }
      
    },
    function(){
        var p = document.getElementById("card-container");
        p.innerHTML = "";
        p.innerHTML='<div  class="alert alert-danger col-xs-12 col-lg-12">Errore di caricamento dati</div>';
    }
  );
}

/*Queste linee di codice consentono alle chiamate http di partire 
solo se l'intero dom èstato caricato*/
document.addEventListener('DOMContentLoaded',function(){
  loadUsers(1);
  var button_new = document.getElementById("card-user-new");
      button_new.innerHTML +=
      '<a id="create" class="btn-primary btn-block btn-lg"   href="javascript:void(0)"  onclick="userSave()">Crea Nuovo</a>';
});