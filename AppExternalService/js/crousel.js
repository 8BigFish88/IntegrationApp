document.addEventListener('DOMContentLoaded',function(){
    get(
        "https://reqres.in/api/users?page=1&per_page=30",
        function(request) {
          var response =
            request.currentTarget.response || request.target.responseText;
          var user = JSON.parse(response).data;
          console.log(JSON.parse(response).data)
          var container = document.getElementById("cards-container");
          container.innerHTML = '';
          for(let i=0; i<user.length;i++){
              container.innerHTML+='<div class="col-lg-4">\
              <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">\
              <image x="0" y="0" width="140" height="140" style="display: block; width: 100%; height: 100%; object-fit: cover;" xlink:href="'+user[i].avatar+'"/></svg>\
              <h2>'+user[i].first_name+'</h2>\
              <p>'+user[i].email+'</p>\
              <p><a class="btn btn-secondary" href="https://reqres.in/api/users/'+user[i].id+'" role="button">View details »</a></p>\
              </div>';
          }
        },
        function(){
            var p = document.getElementById("card-container");
            p.innerHTML = "";
            p.innerHTML='<div  class="alert alert-danger col-xs-12 col-lg-12">Errore di caricamento dati</div>';
        }
      );
});