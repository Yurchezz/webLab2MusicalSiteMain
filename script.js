function isOnline() {   
    return window.navigator.onLine; 
}

useLocalStorage = true;

var db;
var new_image_url = '../images/mf_face_1.jpg';




document.addEventListener("DOMContentLoaded", openIndexedDB, false);

var LocalStorageDataProvider = function(){};

LocalStorageDataProvider.prototype.addAppeal = function(){

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    
    today = mm + '.' + dd + '.' + yyyy;
    today_time = new Date();
    appeal_counter = parseInt(localStorage.getItem("appeal_counter"));
    
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
    document.getElementById("appeal_text").value= "";
    localStorage.setItem("appeal_counter",++appeal_counter);

}

LocalStorageDataProvider.prototype.addNew = function(){

    var new_counter = parseInt(localStorage.getItem("new_counter"));
    var img = document.querySelector('img');
        
        localStorage.setItem('new' + new_counter, '<div class="col-md-4 p-2">\
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
LocalStorageDataProvider.prototype.getAllAppeals = function(){
    
        var appeal_counter = parseInt(localStorage.getItem("appeal_counter"));

            if(!isOnline()){
                alert("offline");
            }else if(isOnline()){
                for(let i = 0;i < appeal_counter;i++){
                    document.getElementById("appeals").innerHTML += localStorage.getItem('appeal'+i);
                }
            } 
}
LocalStorageDataProvider.prototype.getAllNews = function(){

    var new_counter = parseInt(localStorage.getItem("new_counter"));
    
    if(!isOnline()){
        alert("oflline");
    }else  if(isOnline()){
        for(let i = 0;i < new_counter;i++){
            document.getElementById("news_container").innerHTML += localStorage.getItem('new'+i);
        }
    }

}


var IndexedDBDataProvider = function(){}


function openIndexedDB(){
    
    var openRequest = indexedDB.open("MJDB",2);

    openRequest.onupgradeneeded = function(event){
        alert("Upgrading...");
        db = event.target.result;
        db.createObjectStore("appealsStore", {keyPath:"appealCounter", autoIncrement:true});
        db.createObjectStore("newsStore",{keyPath:"newsCounter", autoIncrement:true});
      
    }
    openRequest.onsuccess = function(event){
        alert("Success");
        db = event.target.result;
        
        if(isOnline()){
            appealsGeneration();
            newsGeneration();
            
        }else{
            alert("Offline...");
        }
    }
    openRequest.onerror = function(event){
        alert("error");
    }
    
}


IndexedDBDataProvider.prototype.addAppeal = function(){
    var transaction = db.transaction('appealsStore','readwrite');
    var store = transaction.objectStore('appealsStore');

    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    
    today = mm + '.' + dd + '.' + yyyy;
    today_time = new Date();


    let appeal = {
        appealTime:today,
        appealTimeHours:today_time.getHours(),
        appealTimeMinutes:today_time.getMinutes(),
        text: document.getElementById("appeal_text").value
    }
    store.add(appeal);
    
    
    
}
IndexedDBDataProvider.prototype.addNew = function(){
    var transaction = db.transaction('newsStore','readwrite');
    var store = transaction.objectStore('newsStore');
    

    let newsItem = {
        imageUrl:new_image_url,
        text: document.getElementById("new_text").value,
        title: document.getElementById("new_title").value
    }
    store.add(newsItem);
    
}
IndexedDBDataProvider.prototype.getAllAppeals = function(){
   var tmpAppelsCount; 
    var transaction = db.transaction('appealsStore','readwrite');
    var store = transaction.objectStore('appealsStore');

    var tmpAppelsCount = store.count();
    tmpAppelsCount.onsuccess = function(){
        tmpAppelsCount = tmpAppelsCount.result;
    }

    var getRequest = store.getAll();
    getRequest.onsuccess = function(event){
        alert(tmpAppelsCount);
        if(!isOnline()){
            alert("offline");
        }else if(isOnline()){
            for(let i = 0;i < tmpAppelsCount;i++){
                document.getElementById("appeals").innerHTML += '<div class="row d-flex justify-content-center border border-dark border-top-1 border-bottom-0 border-left-0 border-right-0 mt-5 mb-5">\
                <div class="col-md-2 p-2 mt-4 d-flex-col align-items-center">\
                    <p>Mr. Smith</p>\
                    <p>'+event.target.result[i].appealTimeHours+":"+event.target.result[i].appealTimeMinutes+'</p>\
                    <p>'+event.target.result[i].appealTime+'</p>\
                </div>\
                <div class="col-md-8 p-2 mt-4 d-flex-col ">'
                + event.target.result[i].text +
                '</div>\
                </div>';
            }
        } 

    }
    getRequest.onerror = function(event){
        alert("error");
    }

}
IndexedDBDataProvider.prototype.getAllNews = function(){
    var tmpNewsCount; 
    var transaction = db.transaction('newsStore','readwrite');
    var store = transaction.objectStore('newsStore');

    var tmpNewsCount = store.count();
    tmpNewsCount.onsuccess = function(){
        tmpNewsCount = tmpNewsCount.result;
    }

    var getRequest = store.getAll();
    getRequest.onsuccess = function(event){
        alert(tmpNewsCount);
        if(!isOnline()){
            alert("offline");
        }else if(isOnline()){
            for(let i = 0;i < tmpNewsCount;i++){
                document.getElementById("news_container").innerHTML += '<div class="col-md-4 p-2">\
                <div class="card p-2">\
                    <img src='+event.target.result[i].imageUrl+' alt="">\
                    <div class="card-body">\
                        <p class="card-text">'+  event.target.result[i].text +' </p>\
                    </div>\
                </div>\
                </div>';
            }
        } 

    }
    getRequest.onerror = function(event){
        alert("erroor");
    }
    
}
//-----------------------------------------------------------
var DAL = function(){
	var useLocalStorage = false;
    !window.indexedDB
	if (useLocalStorage) {
		this.data_provider = new LocalStorageDataProvider();
     
    } else {
		this.data_provider = new IndexedDBDataProvider();
	}
};
//------------------------------------------------------------
DAL.prototype.addAppeal = function() {
    this.data_provider.addAppeal();
};
DAL.prototype.addNew = function() {
    this.data_provider.addNew();
};
DAL.prototype.getAllAppeals = function() {
    this.data_provider.getAllAppeals();
};
DAL.prototype.getAllNews = function() {
    this.data_provider.getAllNews();
};


var dataContext = new DAL();


function addAppeal(){
    if(isOnline()){
    
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        
        today = mm + '.' + dd + '.' + yyyy;
        today_time = new Date();

        let newAppeal = {

        text : document.getElementById("appeal_text").value,
        appealHours :  today_time.getHours(),
        appealMinutes : today_time.getMinutes(),
        appealDate : today
        }
        
        $.ajax({
            type:"POST",
            url: "http://localhost:8080/api/appeals",
            contentType: 'application/json',
            data: JSON.stringify(newAppeal)
        })
    }else{
        dataContext.addAppeal();
    }
}
function addNew(){

    if(isOnline()){
        let newsItem = {
            img:new_image_url,
            text: document.getElementById("new_text").value,
            title: document.getElementById("new_title").value
        }
        
    $.ajax({
        type:"POST",
        url: "http://localhost:8080/api/news",
        contentType: 'application/json',
        data: JSON.stringify(newsItem)
    })
    }else{
        dataContext.addNew();
    }
    
}
function appealsGeneration(){
    if(isOnline()){
    
        $.get("http://localhost:8080/api/appeals", function(data, status){
            let appeal;
           
            for(appeal in data.data){
                appeal = data.data[appeal];
                document.getElementById("appeals").innerHTML += '<div class="row d-flex justify-content-center border border-dark border-top-1 border-bottom-0 border-left-0 border-right-0 mt-5 mb-5">\
                <div class="col-md-2 p-2 mt-4 d-flex-col align-items-center">\
                    <p>Mr. Smith</p>\
                    <p>'+appeal.appealHours+":"+appeal.appealMinutes+'</p>\
                    <p>'+appeal.appealDate+'</p>\
                </div>\
                <div class="col-md-8 p-2 mt-4 d-flex-col ">'
                + appeal.text+
                '</div>\
                </div>';
            }
        });
        dataContext.getAllAppeals();
    }
}
function newsGeneration(){
    if(isOnline()){
    
        $.get("http://localhost:8080/api/news", function(data, status){
            let new_item;
            for(new_item in data.data){
                new_item = data.data[new_item];
                document.getElementById("news_container").innerHTML += '<div class="col-md-4 p-2">\
                <div class="card p-2">\
                    <img src='+new_item.img+' alt="">\
                    <div class="card-body">\
                        <p class="card-text">'+new_item.text +' </p>\
                    </div>\
                </div>\
                </div>';
            }
        });
        dataContext.getAllNews();
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