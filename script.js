// localStorage.clear();
// localStorage.setItem("appeal_counter",0);
// localStorage.setItem("new_counter",0);
var new_image_url = '../images/mf_face_1.jpg';
function appealsGeneration(){
    var appeal_counter = parseInt(localStorage.getItem("appeal_counter"));

    if(isOnline() == false && appeal_counter!=0){
        for(let i = 0;i < appeal_counter;i++){
            document.getElementById("appeals").innerHTML += localStorage.getItem('appeal'+i);
        }
    }

}
function newsGeneration(){
    var new_counter = parseInt(localStorage.getItem("new_counter"));
    
    if(isOnline() == false && new_counter!=0){
        for(let i = 0;i < new_counter;i++){
            document.getElementById("news_container").innerHTML += localStorage.getItem('new'+i);
        }
    }
}
function adminFunctional(){

    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img  = document.querySelector('img'); 
            var reader = new FileReader();
            reader.onload = function(){
                img.src = reader.result;
                new_image_url= reader.result;
              
            }
          reader.readAsDataURL(this.files[0]);
           
        }
    });
}
function addAppeal(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    
    today = mm + '.' + dd + '.' + yyyy;
    today_time = new Date();
    var appeal_counter = parseInt(localStorage.getItem("appeal_counter"));

    if(isOnline() == true){
        if( document.getElementById("appeal_text").value.trim() != ""){
            document.getElementById("appeals").innerHTML += 
        
            '<div class="row d-flex justify-content-center border border-dark border-top-1 border-bottom-0 border-left-0 border-right-0 mt-5 mb-5">\
            <div class="col-md-2 p-2 mt-4 d-flex-col align-items-center">\
                <p>Mr. Smith</p>\
                <p>'+today_time.getHours()+":"+today_time.getMinutes()+'</p>\
                <p>'+today+'</p>\
            </div>\
            <div class="col-md-8 p-2 mt-4 d-flex-col ">'
            + document.getElementById("appeal_text").value +
            '</div>\
            </div>';
            document.getElementById("appeal_text").value = "";
            alert("SERVER ACCEPTED THE DATA");
         }else{
             alert("ENTER SOME TEXT PLEASE!");
         }
    }else{
        
        localStorage.setItem('appeal' + appeal_counter, '<div class="row d-flex justify-content-center border border-dark border-top-1 border-bottom-0 border-left-0 border-right-0 mt-5 mb-5">\
        <div class="col-md-2 p-2 mt-4 d-flex-col align-items-center">\
            <p>Mr. Smith</p>\
            <p>'+today_time.getHours()+":"+today_time.getMinutes()+'</p>\
            <p>'+today+'</p>\
        </div>\
        <div class="col-md-8 p-2 mt-4 d-flex-col ">'
        + document.getElementById("appeal_text").value +
        '</div>\
        </div>');
         document.getElementById("appeals").innerHTML += localStorage.getItem('appeal'+appeal_counter);
    
       localStorage.setItem("appeal_counter",++appeal_counter);
    }

} 
function addNew(){

    var new_counter = parseInt(localStorage.getItem("new_counter"));
    var img = document.querySelector('img');

    if(isOnline() == true){
        if( document.getElementById("new_title").value.trim() != ""){
            alert("SERVER ACCEPTED THE DATA");
         }else{
             alert("ENTER SOME TEXT PLEASE!");
         }
    }else{
        
        localStorage.setItem('new' + new_counter, '      <div class="col-md-4 p-2">\
        <div class="card p-2">\
            <img src='+new_image_url+' alt="">\
            <div class="card-body">\
                <p class="card-text">'+  document.getElementById("new_text").value +' </p>\
            </div>\
        </div>\
        </div>');
        document.getElementById("new_text").value = "";
        document.getElementById("new_title").value = "";
        localStorage.setItem("new_counter",++new_counter);
    }

}
function isOnline() {   
    return window.navigator.onLine; 
}

