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

    var insertHtml= function (selector, html){
        var targetElem= document.querySelector(selector);
        targetElem.innerhtml= html;
    };

    var showLoading = function (selector){
        var html="<div class='text-centre'>";
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
    })

  global.$dc=dc
})(window);
