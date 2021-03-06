'use strict';

/**
 * @ngdoc function
 * @name vanoverboardApp.controller:MusingsCtrl
 * @description
 * # MusingsCtrl
 * Controller of the vanoverboardApp
 */
angular.module('vanoverboardApp')
    .controller('VanGoCtrl', ['$scope','$http','bikeshareService',
        function ($scope,$http,bikeshareService) {

          var d3 = require('d3');

          var curDate = new Date();

/*
          function getTime(zone, success) {
            var url = 'http://json-time.appspot.com/time.json?tz=' + zone,
              ud = 'json' + (+new Date());
            window[ud]= function(o){
              success && success(new Date(o.datetime));
            };
            document.getElementsByTagName('head')[0].appendChild((function(){
              var s = document.createElement('script');
              s.type = 'text/javascript';
              s.src = url + '&callback=' + ud;
              return s;
            })());
          }

          getTime('GMT', function(time){
            // This is where you do whatever you want with the time:
            alert(time);
          });
          */

          //http://api.openweathermap.org/data/2.5/weather?zip=22201,us&appid=6da66b5a20f27cf66c93410546b1f9ce
          function getWeather(zipcode){

            var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode +',us&appid=6da66b5a20f27cf66c93410546b1f9ce';

            $http({
              method: 'get',
              url: weatherUrl,
              responseType: "json"
            }).
            success(function(data){
              console.log('Success - weather');

              console.log(data);
              $scope.weather = data;

            }).
            error(function(data){
              console.log('Error: ' + data);
            });
          }




          $scope.no_buses_running_work = true;
          $scope.no_buses_running_home = true;

          //Station Codes
          var station = {
            mcpherson_square:"C02",
            court_house:"K01",

            clarendon:"K02",

            largo_town_center:"G05", // eastbound silver
            new_carrollton:"D13", // eastbound orange
            vienna:"K08", // westbound orange
            wiehle:"N06"  // westbound siler
          }

          $scope.api_key = '4cf4c4ec54fe4d569a1ac414036dac83';

          //$scope.station_code = 'All';
          var metro={
            goHome:{
              url:'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/' + station.mcpherson_square +'?api_key=' + $scope.api_key,
              endpoint:[station.vienna, station.wiehle],
              line:['OR','SV']
            },
            goWork:{
              url:'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/' + station.mcpherson_square +'?api_key=' + $scope.api_key,
              endpoint:[station.largo_town_center, station.new_carrollton],
              line:['OR','SV']
            }
          }

          //var goWork = 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All?api_key=' + $scope.api_key;

          function metroHome(){
            // Trains at McPherson heading home
            $http({
              method: 'get',
              url: metro.goHome.url,
              responseType: "json"
            }).
            success(function(data){
              console.log('Success - metroHome');

              var trains = data.Trains;
              var trainsHeadingHome = [];

              for (var x in trains) {
                for (var y in metro.goHome.endpoint){
                  if (metro.goHome.endpoint[y] === trains[x].DestinationCode){
                    for (var z in metro.goHome.line){
                      if (metro.goHome.line[z] == trains[x].Line){

                        trains[x].ArrivalTime = getArrivalTime(trains[x].Min);

                        trainsHeadingHome.push(trains[x]);
                      }
                    }
                  }
                }
              }

              $scope.trainsHeadingHome = trainsHeadingHome;

            }).
            error(function(data){
              console.log('Error: ' + data);
            });
          }


          function metroWork(){
            // Trains at Court House heading towards work
            $http({
              method: 'get',
              url: metro.goWork.url,
              responseType: "json"
            }).
            success(function(data){
              console.log('Success - metroWork');

              var trains = data.Trains;
              var trainsHeadingWork = [];

              for (var x in trains) {
                for (var y in metro.goWork.endpoint){
                  if (metro.goWork.endpoint[y] === trains[x].DestinationCode){

                    for (var z in metro.goWork.line){
                      if (metro.goWork.line[z] == trains[x].Line){
                        // calculate arrival time
                        trains[x].ArrivalTime = getArrivalTime(trains[x].Min);
                        trainsHeadingWork.push(trains[x]);
                      }
                    }


                  }
                }
              }

              $scope.trainsHeadingWork = trainsHeadingWork;

            }).
            error(function(data){
              console.log('Error: ' + data);
            });
          }




          // 3Y bus arrivals

          //work start - Rt 29 Lee Hwy + Cleveland St	East to McPherson Square	6000701
          //work end - K St Nw + 15th St Nw	East to McPherson Square	1001221

          //home start - 15th St Nw + I St Nw & K St Nw	West to Harrison Street & Lee Hwy	1001199
          //home end - Rt 29 Lee Hwy + Calvert St	West to Harrison Street & Lee Hwy	6000705
          var busstop ={
            work:{
              start:'6000701',
              end:'1001221'
            },
            home:{
              start:'1001199',
              end:'6000705'
            }
          }

          var bus={
            routeId:'3Y',
            goHome:{
              url:'https://api.wmata.com/NextBusService.svc/json/jPredictions?StopID='+ busstop.home.start +'&api_key=' + $scope.api_key
            },
            goWork:{
              url:'https://api.wmata.com/NextBusService.svc/json/jPredictions?StopID='+ busstop.work.start +'&api_key=' + $scope.api_key
            }
          }

          //ARR,BRD
          function getArrivalTime(minutes){
            // calculate arrival time
            var d1 = new Date ();
            var d2 = new Date (d1);

            if ((minutes === 'ARR')||(minutes === 'BRD')){

            }else{
              d2.setMinutes(d1.getMinutes() + Number(minutes));
            }

            var localTime = d2.toLocaleTimeString();
            var ampm = localTime.split(' ');

            var time = localTime.split(':');
            time[0]+':'+time[1]+' '+ampm[1]
            return time[0]+':'+time[1]+' '+ampm[1];
          }

          function busWork(){
            // towards McPherson
            $http({
              method: 'get',
              url: bus.goWork.url,
              responseType: "json"
            }).
            success(function(data){

              console.log('Success - busWork');

              var buses = data.Predictions;
              var busesHeadingWork = [];

              for (var x in buses) {
                if (bus.routeId === buses[x].RouteID){
                  // calculate arrival time
                  buses[x].ArrivalTime = getArrivalTime(buses[x].Minutes);

                  busesHeadingWork.push(buses[x]);
                }

              }

              $scope.busesHeadingWork = busesHeadingWork;
              if (busesHeadingWork.length > 0){
                $scope.no_buses_running_work = false;
              }

            }).
            error(function(data){
              console.log('Error: ' + data);
            });
          }

          function busHome(){
            // towards Arlington
            $http({
              method: 'get',
              url: bus.goHome.url,
              responseType: "json"
            }).
            success(function(data){

              console.log('Success - busHome');

              var buses = data.Predictions;
              var busesHeadingHome = [];

              for (var x in buses) {
                if (bus.routeId === buses[x].RouteID){
                  // calculate arrival time
                  buses[x].ArrivalTime = getArrivalTime(buses[x].Minutes);

                  busesHeadingHome.push(buses[x]);
                }

              }

              $scope.busesHeadingHome = busesHeadingHome;
              if (busesHeadingHome.length > 0){
                $scope.no_buses_running_home = false;
              }

            }).
            error(function(data){
              console.log('Error: ' + data);
            });
          }

          //execute
          busWork();
          busHome();
          metroWork();
          metroHome();

          getWeather('22201');

          var pollBusHome;
          var pollBusWork;
          var pollMetroHome;
          var pollMetroWork;
          var pollWeather;
          function poll(){
            var intervalTime = 10000; // 10 secs
            pollBusHome = setInterval(busHome,intervalTime);
            pollBusWork = setInterval(busWork,intervalTime);
            pollMetroHome = setInterval(metroHome,intervalTime);
            pollMetroWork = setInterval(metroWork,intervalTime);
            pollWeather = setInterval(getWeather,intervalTime,'22201');
          }
          poll();

          // d3
          // selections
          d3.selectAll("h5").style("color", "pink");
          d3.select("body").style("color", "gray");

          // randomly color
          /*
          d3.selectAll("div").style("color", function() {
            return "hsl(" + Math.random() * 360 + ",100%,50%)";
          });
          */

          //To alternate shades of gray for even and odd nodes:
          /*
            d3.selectAll("div").style("background-color", function(d, i) {
              return i % 2 ? "#fff" : "#eee";
            });
            */

          // reading in a array of values
          /*
          d3.selectAll("div")
            .data([4, 8, 15, 16, 23, 42])
            .style("font-size", function(d) { return d + "px"; });
*/
/*
          // Update…
          var p = d3.select("body").selectAll("p")
            .data([4, 8, 15, 16, 23, 42])
            .text(function(d) { return d; });

          // Enter…
          p.enter().append("p")
            .text(function(d) { return d; });

          // Exit…
          p.exit().remove();
          */

          //to fade the background of the page to black:
          /*
            d3.select("body").transition()
              .style("background-color", "black");
          */

          //to resize circles in a symbol map with a staggered delay:
          /*
            d3.selectAll("circle").transition()
              .duration(750)
              .delay(function(d, i) { return i * 10; })
              .attr("r", function(d) { return Math.sqrt(d * scale); });
              */

/*
        d3.select('#chart')
          .append('svg')
            .attr('width', 600)
            .attr('height', 400)
            .style('background','yellow')
          .append('rect')
            .attr('x',200)
            .attr('y',100)
            .attr('height',200)
            .attr('width',200)
            .style('fill','blue')


          d3.select('svg')
            .append('circle')
            .attr('cx','300')
            .attr('cy','200')
            .attr('r','50')
            .style('fill','#840043')
*/

          //var bardata = [20, 30, 45, 15, 67,20, 34,45, 15, 20, 34,45, 15,30, 45, 15, 67,20, 34,45, 15, 20, 34,45, 15, 97, 20, 34];

          var bardata = [];

          for (var i=0; i<500; i++){
            bardata.push(Math.random()*30)
          }

          bardata.sort(function compareNumbers(a,b) {
            return a-b;
          })

          var height = 400,
              width = 600,
              barWidth = 50,
              barOffset = 5;

          // height based color
          /*
          var colors = d3.scale.linear()
            .domain([0, d3.max(bardata)])
            .range(['red','blue']);
            */

          // x based color
          var colors = d3.scale.linear()
            .domain([0, bardata.length*.33, bardata.length*.66, bardata.length])
            .range(['red','blue','pink','green']);

          var yScale = d3.scale.linear()
            .domain([0,d3.max(bardata)])
            .range([0, height]);

          var xScale = d3.scale.ordinal()
            .domain(d3.range(0,bardata.length))
            .rangeBands([0,width])

          var tempColor;

          var tooltip = d3.select('body').append('div')
            .style('position','absolute')
            .style('padding','0 10px')
            .style('background','white')
            .style('opacity',0)


         var myChart =  d3.select('#chart').append('svg')
            .attr('width',width)
            .attr('height',height)
            .style('background','#C9D7D6')
            .selectAll('rect').data(bardata)
            .enter().append('rect')
              //.style('fill',colors)
              .style('fill', function(d,i){
                return colors(i);
              })
              .attr('width',xScale.rangeBand())
              .attr('height',0)
           /*
              .attr('height',function(d){
                return yScale(d);
              })
          */
              .attr('x',function(d,i){
                return xScale(i);
              })
              .attr('y', height)
           /*
             .attr('y', function(d){
               return height - yScale(d);
             })
             */
            .on('mouseover',function(d){

              tooltip.transition()
                .style('opacity',.9)

              tooltip.html(d)
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY) + 'px')

              tempColor = this.style.fill;
              d3.select(this)
                .style('opacity',.5)
                .style('fill','yellow')
            })
            .on('mouseout', function(d){
              d3.select(this)
                .transition().duration(800)
                .style('opacity',1)
                .style('fill',tempColor)
            })

          myChart.transition()
            .attr('height', function(d){
              return yScale(d);
            })
            .attr('y', function(d){
              return height - yScale(d);
            })
            .delay(function(d,i) {
              return i * 5;
            })
            .duration(1000)
            .ease('elastic')

          var vGuideScale = d3.scale.linear()
            .domain([0,d3.max(bardata)])
            .range([height,0])

          var vAxis = d3.svg.axis()
            .scale(vGuideScale)
            .orient('left')
            .ticks(10);

          var vGuide = d3.select('svg').append('g');

            vAxis(vGuide);

            vGuide.attr('transform','translate(35,0)');
          vGuide.selectAll('path')
            .style({fill:'none',stroke:'#000'});
          vGuide.selectAll('line')
            .style({stroke:'#000'});

          var hAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .tickValues(xScale.domain().filter(function(d){
              return !(i % (bardata.length/100));
            }))

          var hGuide = d3.select('svg').append('g')
          hAxis(hGuide);
          hGuide.attr('transform','translate(0, ' + (height-30) + ')');
          hGuide.selectAll('path')
            .style({fill:'none',stroke:'#000'});
          hGuide.selectAll('line')
            .style({stroke:'#000'});


    }]);
