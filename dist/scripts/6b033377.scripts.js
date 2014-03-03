"use strict";angular.module("luckStatApp",["ngCookies","ngResource","ngSanitize","ngRoute","underscore","luckNumServices"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/partials/main.html",controller:"MainCtrl"}).when("/stat",{templateUrl:"views/partials/stat.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("luckStatApp").controller("MainCtrl",["$scope","$http","_",function(a,b,c){a.numbers=[];var d=[],e=90,f={name:"BC 649",numofDraw:6,numoBonus:1,poolMin:1,poolMax:49};a.selectedNumber=[];for(var g=f.poolMin;g<=f.poolMax;g++)a.numbers.push({value:g,selected:!1});var h=function(a,b){return a.length===c.intersection(b,a).length},i=function(){d=[];for(var b=[],c=0;c<a.selectedNumber.length;c++)b.push(a.selectedNumber[c].value);$.each(e,function(a,c){var f=h(b,c.numbers)?1:0;d.push({date:new Date(e[a].date),isWinningNumber:f})})},j=function(){paintChart(d)};a.selectNumber=function(b){if(-1!==c.indexOf(a.selectedNumber,b))b.selected=!1,a.selectedNumber=c.without(a.selectedNumber,b);else{if(a.selectedNumber.length===f.numofDraw)return;b.selected=!0,a.selectedNumber.push(b)}i(),j()},b.get("data/649.json").success(function(a){e=a})}]);var luckNumServices=angular.module("luckNumServices",["ngResource"]);luckNumServices.factory("Records",["$resource",function(a){return a("data/:649Data.json",{},{query:{method:"GET",isArray:!0}})}]);var paintChart=function(a){function b(){h.domain(o.empty()?i.domain():o.extent()),s.select(".area").attr("d",p),s.select(".x.axis").call(l)}var c={top:10,right:10,bottom:100,left:40},d={top:430,right:10,bottom:20,left:40},e=700-c.left-c.right,f=500-c.top-c.bottom,g=500-d.top-d.bottom,h=d3.time.scale().range([0,e]),i=d3.time.scale().range([0,e]),j=d3.scale.linear().range([f,0]),k=d3.scale.linear().range([g,0]),l=d3.svg.axis().scale(h).orient("bottom"),m=d3.svg.axis().scale(i).orient("bottom"),n=d3.svg.axis().scale(j).orient("left"),o=d3.svg.brush().x(i).on("brush",b),p=d3.svg.area().interpolate("monotone").x(function(a){return h(a.date)}).y0(f).y1(function(a){return j(a.isWinningNumber)}),q=d3.svg.area().interpolate("monotone").x(function(a){return i(a.date)}).y0(g).y1(function(a){return k(a.isWinningNumber)});d3.select("svg").remove();var r=d3.select("#chartContent").append("svg").attr("width",e+c.left+c.right).attr("height",f+c.top+c.bottom);r.append("defs").append("clipPath").attr("id","clip").append("rect").attr("width",e).attr("height",f);var s=r.append("g").attr("class","focus").attr("transform","translate("+c.left+","+c.top+")"),t=r.append("g").attr("class","context").attr("transform","translate("+d.left+","+d.top+")");h.domain(d3.extent(a.map(function(a){return a.date}))),j.domain([0,d3.max(a.map(function(a){return a.isWinningNumber}))]),i.domain(h.domain()),k.domain(j.domain()),s.append("path").datum(a).attr("class","area").attr("d",p),s.append("g").attr("class","x axis").attr("transform","translate(0,"+f+")").call(l),s.append("g").attr("class","y axis").call(n),t.append("path").datum(a).attr("class","area").attr("d",q),t.append("g").attr("class","x axis").attr("transform","translate(0,"+g+")").call(m),t.append("g").attr("class","x brush").call(o).selectAll("rect").attr("y",-6).attr("height",g+7)};