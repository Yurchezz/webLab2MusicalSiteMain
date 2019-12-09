useLocalStorage = true;

var db;

var appeal_counter = 0;
var news_counter = 0;
document.addEventListener("DOMContentLoaded", openIndexedDB, false);

var LocalStorageDataProvider = function(){
    // localStorage.setItem("appeal_counter",0);
    // localStorage.setItem("news_counter",0);
};

LocalStorageDataProvider.prototype.addAppeal = function(){

    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    // var yyyy = today.getFullYear();
    
    // today = mm + '.' + dd + '.' + yyyy;
    // today_time = new Date();
    // var appeal_counter = parseInt(localStorage.getItem("appeal_counter"));
    
    // localStorage.setItem('appeal' + appeal_counter, '<div class="row d-flex justify-content-center border border-dark border-top-1 border-bottom-0 border-left-0 border-right-0 mt-5 mb-5">\
    // <div class="col-md-2 p-2 mt-4 d-flex-col align-items-center">\
    //     <p>Mr. Smith</p>\
    //     <p>'+today_time.getHours()+":"+today_time.getMinutes()+'</p>\
    //     <p>'+today+'</p>\
    // </div>\
    // <div class="col-md-8 p-2 mt-4 d-flex-col ">'
    // + document.getElementById("appeal_text").value +
    // '</div>\
    // </div>');

   localStorage.setItem("appeal_counter",++appeal_counter);

}

LocalStorageDataProvider.prototype.addNew = function(){

    // var new_counter = parseInt(localStorage.getItem("new_counter"));
    // var img = document.querySelector('img');
        
    //     localStorage.setItem('new' + new_counter, '<div class="col-md-4 p-2">\
    //     <div class="card p-2">\
    //         <img src='+new_image_url+' alt="">\
    //         <div class="card-body">\
    //             <p class="card-text">'+  document.getElementById("new_text").value +' </p>\
    //         </div>\
    //     </div>\
    //     </div>');
    //     document.getElementById("new_text").value = "";
    //     document.getElementById("new_title").value = "";
        localStorage.setItem("new_counter",++new_counter);
    

}
LocalStorageDataProvider.prototype.getAllAppeals = function(){

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
        alert("Success" + event.target.result);
        db = event.target.result;
    
    }
    openRequest.onerror = function(event){
        alert("error");
       
    }

}


IndexedDBDataProvider.prototype.addAppeal = function(){
    var transaction = db.transaction('appealsStore','readwrite');
    var store = transaction.objectStore('appealsStore');

    let appeal = {
        id:'js',
        price: 10
    }
    store.add(appeal);
    var getRequest = store.get(1);
    getRequest.onsuccess = function(event){
        alert(event.target.result.price);
    }
    
}
IndexedDBDataProvider.prototype.addNew = function(){

}
IndexedDBDataProvider.prototype.getAllAppeals = function(){

}
IndexedDBDataProvider.prototype.getAllNews = function(){
    
}

var DAL = function(){
	//var useLocalStorage = false;
    !window.indexedDB
	if (useLocalStorage) {
		this.data_provider = new LocalStorageDataProvider();
	} else {
		this.data_provider = new IndexedDBDataProvider();
	}
};

DAL.prototype.addAppeal = function() {
    this.data_provider.addAppeal();
};
DAL.prototype.addNew = function() {
    this.data_provider.addNew();
};

var dataContext = new DAL();

function buttonClick(){
    dataContext.addAppeal();
}