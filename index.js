
var productNameInput=document.getElementById('productName')
var productCategoryInput=document.getElementById('productCategory')
var productPriceInput=document.getElementById('productPrice')
var productDescriptionInput=document.getElementById('productDescription')
var mainButton=document.getElementById('main-button')

mainButton.onclick=function(){
    if (mainButton.innerHTML=="Update") {
        editProduct()
    }
    else
    addProduct()
}
var productContainer=[]

if (localStorage.getItem('products') != null) {
    productContainer = JSON.parse(localStorage.getItem('products'))
}

function addProduct(){
    var productobj={
        name:productNameInput.value,
        category:productCategoryInput.value,
        price:productPriceInput.value,
        description:productDescriptionInput.value
    }
    productContainer.push(productobj);
    localStorage.setItem('products',JSON.stringify(productContainer))
    displayProduct()
    clearInputs()
}
function displayProduct(){
    var cartona=``

    for (i= 0; i<productContainer.length; i++) {
        cartona+=`
        <tr>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].description}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm ">Delete</button></td>
        <td><button onclick="updateProduct(${i})" class="btn btn-success btn-sm ">Update</button></td>

        </tr>
        ` 
    }
    document.getElementById('tbody').innerHTML=cartona;
}

function clearInputs(){
    productNameInput.value="";
    productCategoryInput.value="";
    productPriceInput.value="";
    productDescriptionInput.value="";
}
function deleteProduct(i){
    productContainer.splice(i,1)
    localStorage.setItem('products',JSON.stringify(productContainer))
    displayProduct()
}
var globalindex;

function updateProduct(i){
    globalindex=i
    productNameInput.value=productContainer[i].name
    productCategoryInput.value=productContainer[i].category
    productPriceInput.value=productContainer[i].price
    productDescriptionInput.value=productContainer[i].description
    mainButton.innerHTML="Update"
}
function editProduct(){
    productContainer[globalindex].name = productNameInput.value
    productContainer[globalindex].category = productCategoryInput.value
    productContainer[globalindex].price = productPriceInput.value
    productContainer[globalindex].description = productDescriptionInput.value
    displayProduct()
    mainButton.innerHTML="Add Product"
    clearInputs()
}
function searchProduct(){
    var searchInput = document.getElementById('query').value
    var cartona=``
    for (i= 0; i<productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchInput.toLowerCase())) {   
        cartona+=`
        <tr>
        <td>${productContainer[i].name.replace(searchInput,'<span class="bg-yellow">'+searchInput+'</span>')}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].description}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm ">Delete</button></td>
        <td><button class="btn btn-success btn-sm ">Update</button></td>
        </tr>
        `
        } 
    }
    document.getElementById('tbody').innerHTML=cartona
}
displayProduct()
