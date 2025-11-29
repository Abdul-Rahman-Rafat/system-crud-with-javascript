let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");


let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let del_all=document.getElementById("deleteAll")

let tbody = document.getElementById("tbody");

let mode = 'create';
let tmp ; // to access index of items


let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");



function getTotal(){

    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML=result;
        total.style.background='rgba(3, 88, 3, 1)';
    }
    else{
        total.innerHTML='';
        total.style.background='#e100f1'
    }
}

// let datapro=[];  //X
let datapro= JSON.parse(localStorage.getItem('product'))||[]; // get store data if it exists from localStorage


submit.onclick=()=>{

    let newObj= {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        category:category.value.toLowerCase(),

        total:total.innerHTML,
        count:count.value

    }

if(title.value!=''&&
   category.value!=''&&
   price.value!=''&&
    count.value<100){

       if(mode === 'create'){//create
       if(newObj.count>1){
           for(let i=0 ; i<newObj.count;i++){
               datapro.push(newObj);
           }
       }
       else{
           datapro.push(newObj);
       }
       }
       else{ //update
           datapro[tmp]=newObj;
           mode="create"; //after update return to create
           submit.textContent="Create"; //after update return to create
           count.style.display="block"
       }
       clearData();
   }



// console.log(datapro)
localStorage.setItem('product',JSON.stringify(datapro))
showData()
}


function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style.background='#e100f1'
    count.value = '';
    category.value = '';

}
function createRow(i){
 let newTr = document.createElement("tr")
        newTr.innerHTML = `
        <td>${i+1} </td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
    
        <td>${datapro[i].category}</td>
        <td><i id="update" onclick="updateData(${i})" class="fa-solid fa-pen"></i></td>
        <td><i id="delete" onclick="deleteData(${i})" class="fa-solid fa-trash"></i></td>
        `
        tbody.appendChild(newTr)
}
function showData(){
  
    tbody.innerHTML = '';
    for(let i=0; i<datapro.length; i++){

        createRow(i);
    }
if(tbody.innerHTML){
del_all.style.display="block";
del_all.textContent=`Delete All (${datapro.length})`
del_all.onclick=delete_all;
}
else{
del_all.style.display="none";
}
}
showData();
function deleteData(i){
datapro.splice(i,1);
localStorage.setItem('product',JSON.stringify(datapro))

showData();
}

function delete_all(){
    localStorage.clear();
    datapro.splice(0)
    showData();
}

function updateData(i){
    
    title.value = datapro[i].title ;
    price.value = datapro[i].price ;
    taxes.value = datapro[i].taxes ;
    ads.value = datapro[i].ads ;
    discount.value = datapro[i].discount ;
    category.value = datapro[i].category ;
    getTotal();
    count.style.display="none";
    submit.textContent='Update';
    mode = "update";
    tmp=i; //to access the selected item 
    showData();

    window.scroll({
        top:0,
        behavior:'smooth'
    });
}

let searchMode='title';
function getSearchMode(id){
    if(id=='searchTitle'){
        searchMode='title';
        
    }
    else{
        searchMode='category';
    }
    search.placeholder='Search by '+searchMode;
    search.focus();
    search.value='';
    showData();
    
}
function searchData(search_value)
{
    tbody.innerHTML='';
    for(let i=0;i<datapro.length;i++){
        // title
        if(searchMode=='title'){
            if( datapro[i].title.includes(search_value.toLowerCase())){
            createRow(i);
            }
        }
        // category
        else{
            if( datapro[i].category.includes(search_value.toLowerCase())){
            createRow(i);
            }
        }
    }
}
