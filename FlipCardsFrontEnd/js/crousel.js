document.addEventListener('DOMContentLoaded',function(){
    var profiles =[];
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
              profiles.push({id: user[i].id, detail: user[i].description});
              console.log(profiles[i]['id']);
              container.innerHTML+='<div class="col-lg-4 card-flip">\
              <div class="flip">\
              <div class="front">\
              <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140" style="background: url('+user[i].avatar+') center; background-size: cover max-width: 140 px; max-height: 140px" ></svg>\
              <h2>'+user[i].name+'</h2>\
              <p>'+user[i].email+'</p>\
              <p><a id="detail_user'+user[i].id+'" class="btn btn-secondary" href="" role="button">View details »</a></p>\
              </div>\
              <div class="back">\
              <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140" style="background: url('+user[i].avatar+') center; background-size: cover;"></svg>\
              <h2>'+user[i].name+'</h2>\
              <p>'+profiles[i]['detail']+'</p>\
              <p><a class="btn btn-secondary" href="" role="button">« Turn card</a></p>\
              </div></div></div>';
              console.log(user[i].avatar)
            } 
   
        },
        function(){
            var p = document.getElementById("card-container");
            p.innerHTML = "";
            p.innerHTML='<div  class="alert alert-danger col-xs-12 col-lg-12">Errore di caricamento dati</div>';
        }
      );
    var imgs = [
            "https://images.unsplash.com/photo-1578167597239-14f8fc680b6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1856&q=80", 
            "https://images.unsplash.com/photo-1577688723008-7c501eae6f26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", 
            "https://images.unsplash.com/photo-1577353716826-9151912dcdd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
        ]
    var carousel = document.getElementById("mycarousel");
    for(let i=0; i<imgs.length;i++){
            carousel.innerHTML+='\
            <div id=slide'+i+' class="carousel-item">\
            </div>';
            let slide = document.getElementById('slide'+i);
            slide.style.backgroundImage= 'url('+imgs[i]+')';
        }

    document.querySelector(".card-flip").classList.toggle("flip");  
    
});