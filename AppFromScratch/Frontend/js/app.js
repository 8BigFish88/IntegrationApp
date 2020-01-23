document.addEventListener('DOMContentLoaded',function(){
    get(
        "http://localhost:5000/api/v1.0/users",
        function(request) {
          var response =
            request.currentTarget.response || request.target.responseText;
          var user = JSON.parse(response);
          console.log(JSON.parse(response))

          var container = document.getElementById("cards-container");
          container.innerHTML = '';
          for(let i=0; i<user.length;i++){
              container.innerHTML+='<div class="col-md-4">\
          <div class="card mb-4 shadow-sm">\
            <svg class="bd-placeholder-img card-img-top" style="background: url('+user[i].avatar+') center; background-size: cover" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"></svg>\
            <div class="card-body">\
              <h2 class="card-title">'+user[i].name+'</h2>\
              <p class="card-text">'+user[i].description+'</p>\
              <div class="d-flex justify-content-between align-items-center">\
                <div class="btn-group">\
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>\
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>\
                </div>\
                <small class="text-muted">9 mins</small>\
              </div>\
            </div>\
          </div>\
        </div>';
            console.log(user[i].avatar)
          }
        },
        function(){
            var p = document.getElementById("card-container");
            p.innerHTML = "";
            p.innerHTML='<div  class="alert alert-danger col-xs-12 col-lg-12">Errore di caricamento dati</div>';
        }
      );

});