var productNameInput= document.getElementById('productName');
var productPriceInput= document.getElementById('productPrice');
var productCategoryInput= document.getElementById('productCategory');
var productDescInput= document.getElementById('productDesc');

var productsContainer=[];
if(localStorage.getItem('ourProducts')!=null){
    productsContainer=JSON.parse( localStorage.getItem('ourProducts'));
     displayProducts();
}
else{
    productsContainer=[];
}
var updateIndex;
function addProduct(){
    if(updateIndex==undefined){
   var product={
    name:productNameInput.value ,
    price: productPriceInput.value,
    category:productCategoryInput.value,
    desc:productDescInput.value
   }
   productsContainer.push(product);
}else{
     productsContainer[updateIndex].name = productNameInput.value;
        productsContainer[updateIndex].price = productPriceInput.value;
        productsContainer[updateIndex].category = productCategoryInput.value;
        productsContainer[updateIndex].desc = productDescInput.value;
        document.getElementById('mainBtn').innerHTML = 'Add Product';
        updateIndex = undefined;
}
   localStorage.setItem('ourProducts',JSON.stringify( productsContainer));
   clearForm();
   displayProducts();
}


function clearForm(){
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescInput.value="";
}
function displayProducts(){
    var cartoona=``;
    for(var i=0;i<productsContainer.length;i++){
        cartoona+=`<tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button onclick='updateProduct(${i})' class="btn btn-outline-info">Updata</button></td>
        <td><button onclick='deleteProduct(${i})' class="btn btn-outline-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML=cartoona;
}

function deleteProduct(index){
    productsContainer.splice(index,1);
       localStorage.setItem('ourProducts',JSON.stringify( productsContainer));

    displayProducts();
}
function searchProduct(term){
     var cartoona=``;
    for(var i=0;i<productsContainer.length;i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            cartoona+=`<tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button onclick='updateProduct(${i})' class="btn btn-outline-info">Updata</button></td>
        <td><button onclick='deleteProduct(${i})' class="btn btn-outline-danger">Delete</button></td>
        </tr>`
        }
         document.getElementById('tableBody').innerHTML=cartoona;
    }

}
function updateProduct(index){
productNameInput.value=productsContainer[index].name;
productPriceInput.value=productsContainer[index].price;
productCategoryInput.value=productsContainer[index].category;
productDescInput.value=productsContainer[index].desc;
updateIndex=index;
document.getElementById('mainBtn').innerHTML='Update';
}

