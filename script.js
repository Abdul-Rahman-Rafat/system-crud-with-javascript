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

// let tbody = document.getElementById("tbody");
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

        total:total.innerHTML,
        count:count.value,
        category:category.value

    }
datapro.push(newObj)
// console.log(datapro)
localStorage.setItem('product',JSON.stringify(datapro))
clearData();
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