/*
 *  function to sort the products by title alphabetically
 * */
function sortByName(a, b) {
  //convert to lowercase to prevent bad sorting when there are lower and upper cases
  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
  return 0;
}

/*
 *  function to reverse the sort the products by title alphabetically
 *  we cannot factorize reverseSortByName && sortByName
 * */

function reverseSortByName(a, b) {
  if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
  if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
  return 0;
}


/*
*   function to clean all the Table ,delete all rows from the domNode
* */
function cleanTable(){
  for(var i=2,len=document.getElementById("productsTable").rows.length ; i<len ; i++){
    document.getElementById("productsTable").rows[i].innerHTML="";
  }
}


/*
* Function that get the products by filters (the case of Name is binded to HTML)
* */


function getProductByFilter(titre, prixMax, order) {
  var filtredProducts = [];

  if (prixMax && !titre) {
    //filter by price
    for (var i = 0, len = products.list.length; i < len; i++) {
      if (products.list[i].price <= 1500)
        filtredProducts.push(products.list[i]);
    }
  }

  if (titre && !prixMax) {
    for (var i = 0, len = products.list.length; i < len; i++) {
      if (products.list[i].title.includes(titre))
        filtredProducts.push(products.list[i]);
    }
    cleanTable();
    var row = document.getElementById("productsTable").insertRow(-1);
    for (var i = 0, len = filtredProducts.length; i < len; i++) {
      row.insertCell(0).innerHTML = filtredProducts[i].title;
      row.insertCell(-1).innerHTML = filtredProducts[i].price;
      row = document.getElementById("productsTable").insertRow(-1);
    }
  }
  if (titre && prixMax) {
    for (var i = 0, len = products.list.length; i < len; i++) {
      if (products.list[i].price <= 1500 && products.list[i].title.includes(titre)) {
        filtredProducts.push(products.list[i]);
      }
    }
  }

  //sortingData
  if (order == "croissant") {
    filtredProducts.sort(sortByName);
  }
  else if ((order == "decroissant")) {
    filtredProducts.sort(reverseSortByName)
  }
  return filtredProducts;


}


/*
*   function to initialize dataTable
* */
function setTableData() {
  for (var i = 0, len = products.list.length; i < len; i++) {
    var row = document.getElementById("productsTable").insertRow(-1);
    row.insertCell(0).innerHTML = products.list[i].title;
    row.insertCell(-1).innerHTML = products.list[i].price;

  }

}


/*
*     function called when the keyup event is fired
* */
function getFiltredProducts() {
  var title = document.getElementById("title").value;
  if(document.getElementById("title").value==""){
    cleanTable();
    setTableData();
  }
  var price = document.getElementById("price").value;
  getProductByFilter(title);
}

setTableData();

