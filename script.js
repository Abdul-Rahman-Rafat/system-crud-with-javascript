let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");

// --------

let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let del_all=document.getElementById("deleteAll")

let tbody = document.getElementById("tbody");

// let search = document.getElementById("search");
// let searchTitle = document.getElementById("searchTitle");
// let searchCategory = document.getElementById("searchCategory");
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
let datapro= JSON.parse(localStorage.getItem('product'))||[];


submit.onclick=()=>{

    let newObj= {
        titel:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        category:category.value,

        total:total.innerHTML,
        count:count.value

    }
datapro.push(newObj)
// console.log(datapro)
localStorage.setItem('product',JSON.stringify(datapro))
clearData();
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

function showData(){
  
    tbody.innerHTML = '';
    for(let i=0; i<datapro.length; i++){
        let newTr = document.createElement("tr")
        newTr.innerHTML = `
        <td>${i+1} </td>
        <td>${datapro[i].titel}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
    
        <td>${datapro[i].category}</td>
        <td><i id="update"  class="fa-solid fa-pen"></i></td>
        <td><i id="delete" onclick="deleteData(${i})" class="fa-solid fa-trash"></i></td>
        `
        tbody.appendChild(newTr)
    }
if(tbody.innerHTML){
del_all.style.display="block";
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
