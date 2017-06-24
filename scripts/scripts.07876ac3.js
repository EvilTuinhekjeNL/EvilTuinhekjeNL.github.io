"use strict";function MainCtrl(a,b,c,d,e){a.result=!1,a.search=function(){var b=a.model.search;if(angular.isDefined(b)&&b.length>0){a.errorApi="",c.getSteam64Id(b).then(function(d){1===d.data.response.success?(a.user={},a.video={},a.user.username=b,a.user.id=d.data.response.steamid,c.getGames(a.user.id).then(function(c){a.user.games=c.data.response,a.user.games.under30mins=f(c.data.response.games);var d={};d.username=b,d.games=c.data.response.game_count,d.unplayed=f(c.data.response.games).length;var g=Math.floor(Math.random()*(d.unplayed-0)+0),h=Math.floor(Math.random()*(d.unplayed-0)+0);d.game1=f(c.data.response.games)[g].name,d.game2=f(c.data.response.games)[h].name,a.watson=e.getIntroduction(d)},function(a){window.alert("EVERYBODY PANIC")})):a.errorApi="User not found for "+b},function(a){window.alert("SHIT WENT DOWN")})}},a.selectGame=function(b){a.video={},d.findResults(b.name).then(function(c){if(a.selectedGame=b,a.video={},angular.isDefined(c.data.videos.value)){for(var d=0;d<c.data.videos.value.length;d++)if(angular.isDefined(c.data.videos.value[d].motionThumbnailUrl))return a.video.thumb=c.data.videos.value[d].motionThumbnailUrl,a.video.height=c.data.videos.value[d].height,void(a.video.width=c.data.videos.value[d].width);window.scrollTo(0,document.body.scrollHeight)}},function(a){window.alert("TRUMP PUSHED THE BUTTON!")})};var f=function(a){for(var b=[],c=0;c<a.length;c++)if(a[c].playtime_forever<=30){var d=a[c];d.img_icon_url.length>0?(d.imgUrl="http://media.steampowered.com/steamcommunity/public/images/apps/:appid/:hash.jpg",d.imgUrl=d.imgUrl.replace(":appid",d.appid),d.imgUrl=d.imgUrl.replace(":hash",d.img_icon_url)):d.imgUrl="http://cdn.gigya.com/photos/6558361/79a3fbe4f114495db2c8327c2161b7a0/thumbnail?ts=636059217145790735",b.push(a[c])}return b}}function SteamService(a){function b(b){var c=d+e+"ResolveVanityURL/"+g+"?"+h+"&vanityurl="+b+"&"+i;return a.get(c)}function c(b){var c=d+f+"GetOwnedGames/"+g+"?"+h+"&steamid="+b+"&include_appinfo=1&"+i;return a.get(c)}var d="http://api.steampowered.com/",e="ISteamUser/",f="IPlayerService/",g="v0001/",h="key=8EFCDDB723B83E44C77F8C963A3ED3DF",i="format=json";return{getSteam64Id:b,getGames:c}}function BingService(a){function b(b){var d=c+"q="+b+" game&count=5";return a.get(d,{headers:{"Ocp-Apim-Subscription-Key":"f4af1312513942b6be33a1913ebd4a2c"}})}var c="https://api.cognitive.microsoft.com/bing/v5.0/search?";return{findResults:b}}function WatsonService(a){function b(a){var b="Hello there "+a.username+", you have played "+a.games+" games. "+a.unplayed+" of these games are virtually unplayed, maybe you should try "+a.game1+" or maybe "+a.game2;return encodeURI(c+b)}var c="https://watson-api-explorer.mybluemix.net/text-to-speech/api/v1/synthesize?accept=audio%2Fogg%3Bcodecs%3Dopus&voice=en-US_MichaelVoice&text=";return{getIntroduction:b}}angular.module("steefApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$httpProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("steefApp").filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),angular.module("steefApp").controller("MainCtrl",MainCtrl),MainCtrl.$inject=["$scope","$filter","SteamService","BingService","WatsonService"],angular.module("steefApp").service("SteamService",SteamService),SteamService.$inject=["$http"],angular.module("steefApp").service("BingService",BingService),BingService.$inject=["$http"],angular.module("steefApp").service("WatsonService",WatsonService),WatsonService.$inject=["$http"],angular.module("steefApp").run(["$templateCache",function(a){a.put("views/main.html",'<div ng-controller="MainCtrl as ctrl"> <div class="jumbotron"> <h1>Alright there</h1> <p class="lead"> are you ready for some information overload? </p> </div> <div class="row"> <div class="col-lg-6 col-lg-offset-3"> <label for="search">Voer je Steam ID in</label> <div class="input-group"> <span class="input-group-addon" id="basic-addon1">@</span> <input type="text" class="form-control" ng-model="model.search" placeholder="Search for..."> <span class="input-group-btn"> <button class="btn btn-success" type="button" ng-click="search()">Go!</button> </span> </div> </div> </div> <div class="" ng-if="errorApi"> <p>{{errorApi}}</p> </div> <div class="row marketing" ng-show="user"> <h4>Let\'s break it down!</h4> <p> <audio controls ng-if="watson"> <source src="{{watson}}" type="audio/ogg"> </source></audio><br><br> <strong>{{ user.username }}</strong> you have played <strong>{{ user.games.game_count }}</strong> games. <br> </p> <div ng-if="user.games.under30mins.length > 0"> <h4>You\'ve played these games under 30 minutes:</h4> <ul> <li ng-repeat="game in user.games.under30mins"> <a href="" ng-click="selectGame(game)"> <img width="32" height="32" ng-src="{{game.imgUrl}}"> {{ game.name }} ({{game.playtime_forever}} mins) </a> </li> </ul> </div> </div> <div ng-if="selectedGame"> <h4> <img width="32" height="32" ng-src="{{selectedGame.imgUrl}}"> {{ selectedGame.name }} </h4> <div ng-if="video.thumb"> <video width="640" height="320" controls> <source src="{{ video.thumb }} " type="video/mp4"> </source></video> <span ng-hide="video.thumb">YOUR BROWSER IS DUMB ASS SHIT.</span> </div> <div ng-if="!video.thumb"> No video found :( </div> </div> <div> <br><br><br><br><br><br> </div> </div>')}]);