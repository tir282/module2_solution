$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global){
     
    var dc= {};

    var homeHtmlUrl = "snippets/home-snippet.html";
    var allCategoriesUrl="https://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml="snippets/categories-title-snippet.html";
    var categoryHtml="snippets/category-snippets.html";
    var menuItemsUrl="https://davids-restaurant.herokuapp.com/menu_items.json?category=";
    var menuItemsTileHtml="snippets/menu-item-title.html";
    var menuItemHtml="snippets/menu-item.html";

    var insertHtml= function (selector, html){
        var targetElem= document.querySelector(selector);
        targetElem.innerHTML= html;
    };

    var showLoading = function (selector){
        var html="<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };

    var insertProperty = function (string, propName ,propValue){
      var propToRepalce="{{" + propName + "}}";
      string=string.replace(new RegExp(propToReplace,"g"),propValue);
      return string;
    }

    document.addEventListener("DOMContentLoaded", function (event){

        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            homeHtmlUrl,
            function (responseText){
                document.querySelector("#main-content").innerHTML = responseText;
            },
        false);
    });

    dc.loadMenuCategories= function (){
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(
        allCategoriesUrl,
        builAndShowCategoriesHTML);
      
    };

    dc.loadMenuItems= function(categoryShort){
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(
        menuItemsUrl + categoryShort,
        buildAndShowmenuItemHtml);
    };

    function builAndShowCategoriesHTML(categories){
      $ajaxUtils.sendGetRequest(
        categoriesTitleHtml,
        function(categoriesTitleHtml){
       $ajaxUtils.sendGetRequest(
        categoryHtml,
        function(categoryHtml){
          var categoriesViewHtml= buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
      false);
    },
    false);
  }
function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml){

  var finalHtml= categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  for(var i=0; i<categories.lenght;i++){
    var html= categoryHtml;
    var name="" + categories[i].name;
    var short_name="" + categories[i].short_name;
    html=insertProperty(html, "name" , name);
    html= insertProperty(html, "short_name", short_name);
    finalHtml += html;
  }
  finalHtml += "</section";
  return finalHtml;
}

function buildAndShowmenuItemHtml (categoryMenuItems){
  $ajaxUtils.sendGetRequest(
    menuItemsTileHtml,
    function(menuItemsTileHtml){
      $ajaxUtils.sendGetRequest(
        menuItemHtml,
        function (menuItemHtml) {
          var menuItemsViewHtml= buildMenuItemsViewHtml(categoryMenuItems,menuItemsTitleHtml,menuItemHtml);
          insertHtml("#main-content", menuItemsViewHtml);
        },
      false);
    },
  false);
}
function buildMenuItemsViewHtml(categoryMenuItems,menuItemsTitleHtml,menuItemHtml){

  menuItemsTitleHtml= insertProperty(menuItemsTileHtml,"name",
  categoryMenuItems.category.name);

  menuItemsTitleHtml= insertProperty(menuItemsTileHtml,"name",
  categoryMenuItems.category.special_instructions);
  var finalHtml= menuItemsTileHtml;
  finalHtml += "<section class='row'>";
  
  var menuItems= categoryMenuItems.menu_items;
  var catShortName= categoryMenuItems.category.short_name;
  for(var i=0; i<menuItems.lenght;i++){
    var html= menuItemHtml;
    html=insertProperty(html, "short_name", menuItems[i].short_name);
    html=insertProperty(html,"catShortName",catShortName);
    html=insertItemPrice(html,"price_small",menuItems[i].price_small);
    html=insertItemPortionName(html,"samll_portion_name",menuItems[i].small_portiion_name);
    html=insertItemPrice(html,"price_large",menuItems[i].price_large);
    html=insertItemPortionName(html,"large_portion_name",menuItems[i].large_portiion_name);
    html=insertProperty(html,"name",menuItems[i].name);   
    html=insertProperty(html,"description",menuItems[i].description);

    if(i%2 !=0){
      html+= "<div class='clearflix visible-lg-block visible-md-block'></div>";

    }
    finalHtml += html;
  }
  finalHtml += "</section>";
  return finalHtml;
}
function insertItemPrice(html,pricePropName,priceValue){
  if(!priceValue){
    return insertProperty(html, pricePropName,"");;
  }
  priceValue= "$" + priceValue.toFixed(2);
  html= insertProperty(html,portionPropName,portionValue);
  return html;


}




  global.$dc=dc

})(window);
