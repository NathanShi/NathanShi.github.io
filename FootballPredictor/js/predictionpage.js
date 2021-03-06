var teamKey = {"AFCB":"AFC Bournemouth", "ARS":"Arsenal", "BUR":"Burnley", "CHE":"Chelsea FC", "CRY":"Crystal Palace", "EVE":"Everton", "HUL":"Hull City",
"LEI":"Leicester City", "LIV":"Liverpool","MANC":"Manchester City", "MANU":"Manchester United", "MID":"Middlesbrough", "SOU":"Southampton", "STO": "Stoke City", "SUN":"Sunderland AFC", "SWA": "Swansea City", "TOT":"Tottenham Hotspur", "WAT":"Watford", "WBA":"West Bromwich Albion", "WHU": "West Ham United"};


if(localStorage.internal_redirection=="true")
{
    var hometeam_name = localStorage.home_name;
    var hometeam_name_formatted = hometeam_name.toLowerCase().replace(/ /g, "");
    var awayteam_name = localStorage.away_name;
    var awayteam_name_formatted = awayteam_name.toLowerCase().replace(/ /g, "");
    localStorage.setItem("internal_redirection", "false");
}
else{
    var hometeam_abb = window.location.hash.substr(1).replace(/%20/g, " ").substr(0,window.location.hash.substr(1).indexOf("#"));
    //var hometeam_name = localStorage.home_name;
    var hometeam_name = teamKey[hometeam_abb];
    var hometeam_name_formatted = hometeam_name.toLowerCase().replace(/ /g, "");

    var awayteam_abb = window.location.hash.substr(window.location.hash.substr(1).indexOf("#")+2).replace(/%20/g, " ");
    //var awayteam_name = window.location.hash.substr(1).replace(/%20/g, " ");
    var awayteam_name = teamKey[awayteam_abb];
    var awayteam_name_formatted = awayteam_name.toLowerCase().replace(/ /g, "");

}

var page_state = localStorage.state;
//if (page_state == "upcoming")
//    document.getElementById("swap_venue").style.visibility = "hidden";
//else
document.getElementById("swap_venue").style.visibility = "visible";

var abbrevKey = {"AFC Bournemouth":"AFCB", "Arsenal":"ARS", "Burnley":"BUR", "Chelsea FC":"CHE", "Crystal Palace":"CRY", "Everton":"EVE", "Hull             City":"HUL", "Leicester City":"LEI", "Liverpool":"LIV","Manchester City":"MANC", "Manchester United":"MANU", "Middlesbrough":"MID", "Southampton":"SOU", "Stoke City": "STO", "Sunderland AFC":"SUN", "Swansea City": "SWA", "Tottenham Hotspur":"TOT", "Watford":"WAT", "West Bromwich Albion":"WBA", "West Ham United": "WHU"}

var teamColors = {"AFC Bournemouth":'rgb(199,51,54)',"Arsenal":'rgb(159,0,19)',"Burnley":'rgb(199,51,105)',"Chelsea FC":'rgb(15,29,123)',"Crystal Palace":'rgb(75,124,216)',"Everton":'rgb(74,101,181)',"Hull City":'rgb(228,139,47)',"Leicester City":'rgb(208,166,57)',"Liverpool":'rgb(255,109,109)',"Manchester City":'rgb(184,223,245)',"Manchester United":'rgb(218,0,0)',"Middlesbrough":'rgb(190,35,30)',"Southampton":'rgb(139,26,24)',"Stoke City":'rgb(217,33,43)',"Sunderland AFC":'rgb(166,129,35)',"Swansea City":'rgb(37,37,37)',"Tottenham Hotspur":'rgb(4,18,85)',"Watford":'rgb(255,197,0)',"West Bromwich Albion":'rgb(9,17,83)',"West Ham United":'rgb(94,33,59)'};

var transparentTeamColors = {"AFC Bournemouth":'rgba(199,51,54,.25)',"Arsenal":'rgba(159,0,19,.25)',"Burnley":'rgba(199,51,105,.25)',"Chelsea FC":'rgba(15,29,123,.5)',"Crystal Palace":'rgba(75,124,216,.5)',"Everton":'rgba(74,101,181,.5)',"Hull City":'rgba(228,139,47,.5)',"Leicester City":'rgba(208,166,57,.5)',"Liverpool":'rgba(255,109,109,.25)',"Manchester City":'rgba(184,223,245,.8)',"Manchester United":'rgba(218,0,0,.25)',"Middlesbrough":'rgba(190,35,30,.25)',"Southampton":'rgba(139,26,24,.5)',"Stoke City":'rgba(217,33,43,.5)',"Sunderland AFC":'rgba(166,129,35,.5)',"Swansea City":'rgba(37,37,37,.5)',"Tottenham Hotspur":'rgba(4,18,85,.5)',"Watford":'rgba(255,197,0,.5)',"West Bromwich Albion":'rgba(9,17,83,.5)',"West Ham United":'rgba(94,33,59,.5)'};

var displayoptions;
var comparisontables;
var descriptions;
var statGroupings;
var OverallGraphConfig;
var VSGraphConfig;
var barChartO;
var barChartVS;

var key = ["ACCpOP","ACWpP","AFCpOP","AFCpP","AGCpOSOT","AGM","AGSpSOT","AOApP","AOFpOP","APPG","ARCforOpP","ARCpOP","ASCpOP","ASFpM","ASMpM","ASTpP",
        "AYCforOpP","AYCpOP","P5ME"];
var homeData_O = [0.140776699, 0.105670103, 0.290453074, 0.256013746, 0.376146789, -0.916666667, 0.19, 0.051546392, 0.047734628, 0.625, 0.001718213, 0.001618123, 6.757281553, 3.375, 2.958333333, 7.278350515, 0.030068729, 0.041262136, 0.2];
var homeData_VS = [0.134275618, 0.117977528, 0.279151943, 0.269662921, 0.386363636, -0.272727273, 0.264150943, 0.054307116, 0.042402827, 0.909090909, 0.003745318, 0.001766784, 2.954063604, 7.363636364, 6.454545455, 4.099250936, 0.035580524, 0.044169611, 0.2];
var awayData_O = [0.127897682, 0.10772164, 0.277378098, 0.28122021, 0.372727273, -0.434782609, 0.344444444, 0.054337464, 0.03117506, 1.043478261, 0.001906578, 0.003197442, 7.023181455, 2.652173913, 3.086956522, 5.963775024, 0.034318398, 0.038369305, 0.6];
var awayData_VS = [0.125776398, 0.118705036, 0.267080745, 0.221223022, 0.421875, -0.945887446, 0.255319149, 0.055755396, 0.040372671, 0.416666667, 0, 0.00310559, 3.763975155, 5.083333333, 5.916666667, 2.870503597, 0.021582734, 0.037267081, 0.6];

var config = {
        type: 'pie',
        
        data: {
            datasets: [{
                data: [450,150,670],
                //data: [vote[2], vote[1], vote[0]],
                borderWidth:[1,1,1],
                borderColor: ['rgb(231,233,237)','rgb(231,233,237)','rgb(231,233,237)'],
                backgroundColor: [teamColors[awayteam_name],'rgb(75, 192, 192)',teamColors[hometeam_name]],
                //backgroundColor: ['rgb(17,57,142)','rgb(75, 192, 192)','rgb(232,179,23)'],
                //borderColor: [window.chartColors.grey, window.chartColors.grey, window.chartColors.grey],
                //backgroundColor: [window.chartColors.chelsea, window.chartColors.green,window.chartColors.watford],
                label: 'Dataset 5'
            }],
            labels: [
                awayteam_name,
                "Draw",
                hometeam_name
                
                
            ]
        },
        options: {
            showAllTooltips: true,
            intersect: false,
            responsive: true,
            legend: {
                hidden: Boolean,
                reverse: true,
                labels: {
                    fontSize: 13,
                    boxWidth: 50
                }
            },
            tooltips: {
                position: "pieTooltipPosition",
                caretSize: 0,
                yPadding: 8,
                xPadding: 10,
                titleFontSize: 18,
                bodyFontSize: 20,
                displayColors: false
            }
        }
    };

var logo = {2:"img/Team_Logos/".concat(hometeam_name_formatted).concat(".png"),
            1:"img/Team_Logos/watford_chelsea.png",
            0:"img/Team_Logos/".concat(awayteam_name_formatted).concat(".png")};

window.onload=function(){
    var voted = true;
    var ctx = document.getElementById("chart-area").getContext("2d");
    var chart = new Chart(ctx, config);
    
    preparePage();
    
   //Initialize global variables;
    displayoptions = document.getElementById("venueoroverall").getElementsByTagName("li");  //Either OVERALL or VENUE
    comparisontables = document.getElementsByClassName("comparisontable");                  //keystats tables; either  OVERALL or VENUE
    descriptions = document.getElementsByClassName("descriptions_OverallVenue");            //Descriptions; either OVERALL or VENUE
    var tableTitles = document.getElementsByClassName("tableTitle");
    statGroupings = getGroupings(tableTitles);                                              //Every Table Title
    OverallGraphConfig = $("#Overall_Attributes>li")
    VSGraphConfig = $("#VS_Attributes>li")
    //Initially:
    //We want our active selectors to be: Overall AND Quick Stats;
    statGroupings[0].classList.add("optionActivated"); //Add OptionActivated to Span elt. of Quick Stats
    displayoptions[0].getElementsByTagName("a")[0].classList.add("optionActivated");
        
    //Chart:
    Chart.defaults.global.hover.mode = 'nearest';
    const CHARTT = $("#barChart_Total");
    const CHARTVS = $("#barChart_VS");
    
    barChartO = new Chart(CHARTT, {
        type:'bar',
        data: {
            labels:["ACWpP","AFCpOP","AOFpOP","APPG","ARCforOpP","AYCforOpP", "P5ME"],
            datasets: [
                {
                    label: hometeam_name,
                    borderWidth: 1,
                    backgroundColor: transparentTeamColors[hometeam_name],
                    borderColor: teamColors[hometeam_name],
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: teamColors[hometeam_name],
                    pointBorderWidth: 1,
                    pointBackgroundColor: teamColors[hometeam_name],
//                    pointHoverRadius: 5,
//                    pointHoverBackgroundColor: teamColors[hometeam_name],
//                    pointHoverBorderColor: "rgba(220,220,220,1)",
//                    pointHoverBorderWidth: 5,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: [0.105670103, 0.290453074, 0.047734628, 0.625, 0.001718213, 0.030068729, 0.2],
                },
                {
                    label: awayteam_name,
                    borderWidth: 1,
                    backgroundColor: transparentTeamColors[awayteam_name],
                    borderColor: teamColors[awayteam_name],
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: teamColors[awayteam_name],
                    pointBorderWidth: 1,
                    pointBackgroundColor: teamColors[awayteam_name],
//                    pointHoverRadius: 5,
//                    pointHoverBackgroundColor: teamColors[awayteam_name],
//                    pointHoverBorderColor: "rgba(220,220,220,1)",
//                    pointHoverBorderWidth: 5,
                    pointRadius: 3,
                    pointHitRadius: 1,
                    data: [0.10772164, 0.27737809, 0.03117506, 1.043478261, 0.001906578, 0.0034318398, 0.6],
                }
            ]
        },
        options:{
            responsive: true,
            showTooltips: true,
            tooltips:{
                position:'nearest'
            },
        }
    });
    barChartVS = new Chart(CHARTVS, {
        type:'bar',
        data: {
            labels:["ACWpP","AFCpOP","AOFpOP","APPG","ARCforOpP","AYCforOpP", "P5ME"],
            datasets: [
                {
                    label: hometeam_name,
                    borderWidth: 1,
                    backgroundColor: transparentTeamColors[hometeam_name],
                    borderColor: teamColors[hometeam_name],
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: teamColors[hometeam_name],
                    pointBorderWidth: 1,
                    pointBackgroundColor: teamColors[hometeam_name],
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: teamColors[hometeam_name],
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 5,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: [0.117977528, 0.279151943, 0.042402827, 0.909090909, 0.003745318, 0.035580524, 0.2]
                },
                {
                    label: awayteam_name,
                    borderWidth: 1,
                    backgroundColor: transparentTeamColors[awayteam_name],
                    borderColor: teamColors[awayteam_name],
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: teamColors[awayteam_name],
                    pointBorderWidth: 1,
                    pointBackgroundColor: teamColors[awayteam_name],
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: teamColors[awayteam_name],
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 5,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: [0.118705036, 0.267080745, 0.040372671, 0.416666667, 0, 0.021582734, 0.6]
                }
            ]
        },
        options:{
            responsive: true,
            showTooltips: true,
            tooltips:{
                position:'nearest'
            },
            tooltipCaretSize: 0,
        }
    });

    updatePage();
 
    //Add our listeners:
    
    document.getElementById("chart-area").onclick = function(evt) {   
        var activePoints = chart.getElementAtEvent(evt);

        if(activePoints.length > 0)
        {
            //get the internal index of slice in pie chart
            var clickedElementindex = activePoints[0]["_index"];
            //alert(clickedElementindex);
            //get specific label by index 
            var label = chart.data.labels[clickedElementindex];
            //alert(label);
            //get value by index      
            var value = chart.data.datasets[0].data[clickedElementindex];
            console.log("aaaa" + Chart.Tooltip);
            if (voted) {
                chart.data.datasets[0].data[clickedElementindex] += 1;
//                console.log(config.data.datasets[0].data[0]);
                chart.data.datasets[0].borderWidth[clickedElementindex] = 13;
                chart.data.datasets[0].borderColor[clickedElementindex] = chart.data.datasets[0].backgroundColor[clickedElementindex];
                document.getElementById("VoteInfoContainer").style.display ="inline-block";
                document.getElementById("your_vote").innerHTML = "You vote for " + label + "!";
                    console.log(label);
                if(label == "Draw"){
                    document.getElementById("drawLogo").style = "";
                    document.getElementById("draw_logo1").src = "img/Team_Logos/"+hometeam_name.toLowerCase().replace(/ /g, "")+".png";
                    document.getElementById("draw_logo2").src = "img/Team_Logos/"+awayteam_name.toLowerCase().replace(/ /g, "")+".png";
                    
                }else {
                    document.getElementById("vote_logo").src = "img/Team_Logos/"+label.toLowerCase().replace(/ /g, "")+".png";
                }
                document.getElementById("see_more").style = "";
                document.getElementById("pieChart").style= "display: inline-block; vertical-align: top; width:40%; margin-left: 10%; margin-top: 2em;"
                //chart.data.datasets[0].backgroundColor[clickedElementindex] = helpers.color(chart.data.datasets[0].backgroundColor[clickedElementindex]).saturate(1).darken(-0).rgbString();
                //var ctx1 = document.getElementById("chart-area").getContext("2d");
                voted = false;
                var click = chart.update();
                var chart1 = new Chart(ctx, config); 
            }else{
                document.getElementById("voted").innerHTML = "You can only vote once.";
            }               
          //clickPie(clickedElementindex);
    //      chart.onClick();

          /* other stuff that requires slice's label and value */
       }
    }
    
    for(var i = 0; i < displayoptions.length; i++) {
        displayoptions[i].onclick = function() {
            $("#venueoroverall li a.optionActivated")[0].classList.remove("optionActivated");
            $('a',this)[0].classList.add("optionActivated");
            updatePage();
            return false;
        }
    }
    
    for(var i = 0; i<statGroupings.length; i++){
        statGroupings[i].onclick=function() {
            if($(this)[0].classList.contains("optionActivated")){
                $("img", this)[0].src="img/collapsible_div_arrow_left.png";
                $(this)[0].classList.remove("optionActivated");    
            }
            else{
                if($(".tableTitle span.optionActivated")[0]){
                    $(".tableTitle span.optionActivated img")[0].src = "img/collapsible_div_arrow_left.png";
                    $(".tableTitle span.optionActivated")[0].classList.remove("optionActivated");
                }
                $("img", this)[0].src="img/collapsible_div_arrow_down.png";   
                $(this)[0].classList.add("optionActivated");   
            }
            updatePage();
            return false;
        }
    }
    
    for(var i = 0; i<OverallGraphConfig.length; i++){
        OverallGraphConfig[i].onclick=function() {
            if ($("i", this)[0].classList.contains("fa-check-square-o")) //This means it is currently showing on the graph.
            {
                var labels = barChartO.data.labels;
                var Odataset1 = barChartO.data.datasets[0].data;
                var Odataset2 = barChartO.data.datasets[1].data;
                var VSdataset1 = barChartVS.data.datasets[0].data;
                var VSdataset2 = barChartVS.data.datasets[1].data;
                var itr = NaN;
                
                var clicked_label = $("em", this)[0].innerText;
                var index = labels.indexOf(clicked_label);
                
                barChartO.data.labels = labels.slice(0, index).concat(labels.slice(index+1));
                barChartVS.data.labels = labels.slice(0, index).concat(labels.slice(index+1));
                
                barChartO.data.datasets[0].data = Odataset1.slice(0,index).concat(Odataset1.slice(index+1, Odataset1.length));
                barChartO.data.datasets[1].data = Odataset2.slice(0,index).concat(Odataset2.slice(index+1, Odataset1.length));
                barChartVS.data.datasets[0].data = VSdataset1.slice(0,index).concat(VSdataset1.slice(index+1, Odataset1.length));
                barChartVS.data.datasets[1].data = VSdataset2.slice(0,index).concat(VSdataset2.slice(index+1, Odataset1.length));
                
                for(var itr=0; itr<VSGraphConfig.length; itr++)
                {
                    if(VSGraphConfig[itr].innerText == this.innerText)
                    {
                        elt_index = itr;
                        break;
                    }
                }
                
                $("i", this)[0].classList.remove("fa-check-square-o");
                $("i", this)[0].classList.add("fa-square-o");
                
                VSGraphConfig[elt_index].getElementsByTagName("i")[0].classList.remove("fa-check-square-o");
                VSGraphConfig[elt_index].getElementsByTagName("i")[0].classList.add("fa-square-o");
                
                barChartO.update();
                barChartVS.update();
            }
            else if ($("i", this)[0].classList.contains("fa-square-o")) //This means it is currently NOT showing on the graph.
            {
                var labels = barChartO.data.labels;
                
                var OdatasetH = barChartO.data.datasets[0].data;
                var OdatasetA = barChartO.data.datasets[1].data;
                var VSdatasetH = barChartVS.data.datasets[0].data;
                var VSdatasetA = barChartVS.data.datasets[1].data;
                var itr = NaN;
                
                var clicked_label = $("em", this)[0].innerText;
                
                label_index = key.indexOf(clicked_label);
                barChartO.data.labels.push(clicked_label)
                barChartVS.data.labels.push(clicked_label);

                OdatasetH.push(homeData_O[label_index]);
                OdatasetA.push(awayData_O[label_index]);
                
                barChartO.data.datasets[0].data = OdatasetH;
                barChartO.data.datasets[1].data = OdatasetA;
                
                VSdatasetH.push(homeData_VS[label_index]);
                VSdatasetA.push(awayData_VS[label_index]);
                barChartVS.data.datasets[0].data = VSdatasetH;
                barChartVS.data.datasets[1].data = VSdatasetA;
                
                for(var itr=0; itr<VSGraphConfig.length; itr++)
                {
                    if(VSGraphConfig[itr].innerText == this.innerText)
                    {
                        elt_index = itr;
                        break;
                    }
                }
                
                $("i", this)[0].classList.remove("fa-square-o");
                $("i", this)[0].classList.add("fa-check-square-o");
                
                VSGraphConfig[elt_index].getElementsByTagName("i")[0].classList.remove("fa-square-o");
                VSGraphConfig[elt_index].getElementsByTagName("i")[0].classList.add("fa-check-square-o");
                
                barChartO.update();
                barChartVS.update();
            }
            return false;
        }
        VSGraphConfig[i].onclick=function() {
            if ($("i", this)[0].classList.contains("fa-check-square-o")) //This means it is currently showing on the graph.
            {
                var labels = barChartO.data.labels;
                var Odataset1 = barChartO.data.datasets[0].data;
                var Odataset2 = barChartO.data.datasets[1].data;
                var VSdataset1 = barChartVS.data.datasets[0].data;
                var VSdataset2 = barChartVS.data.datasets[1].data;
                var itr = NaN;
                
                var clicked_label = $("em", this)[0].innerText;
                var index = labels.indexOf(clicked_label);
                
                barChartO.data.labels = labels.slice(0, index).concat(labels.slice(index+1));
                barChartVS.data.labels = labels.slice(0, index).concat(labels.slice(index+1));
                
                barChartO.data.datasets[0].data = Odataset1.slice(0,index).concat(Odataset1.slice(index+1, Odataset1.length));
                barChartO.data.datasets[1].data = Odataset2.slice(0,index).concat(Odataset2.slice(index+1, Odataset1.length));
                barChartVS.data.datasets[0].data = VSdataset1.slice(0,index).concat(VSdataset1.slice(index+1, Odataset1.length));
                barChartVS.data.datasets[1].data = VSdataset2.slice(0,index).concat(VSdataset2.slice(index+1, Odataset1.length));
                
                for(var itr=0; itr<OverallGraphConfig.length; itr++)
                {
                    if(OverallGraphConfig[itr].innerText == this.innerText)
                    {
                        elt_index = itr;
                        break;
                    }
                }
                
                $("i", this)[0].classList.remove("fa-check-square-o");
                $("i", this)[0].classList.add("fa-square-o");
                
                OverallGraphConfig[elt_index].getElementsByTagName("i")[0].classList.remove("fa-check-square-o");
                OverallGraphConfig[elt_index].getElementsByTagName("i")[0].classList.add("fa-square-o");
                
                barChartO.update();
                barChartVS.update();
            }
            else if ($("i", this)[0].classList.contains("fa-square-o")) //This means it is currently NOT showing on the graph.
            {
                var labels = barChartO.data.labels;
                
                var OdatasetH = barChartO.data.datasets[0].data;
                var OdatasetA = barChartO.data.datasets[1].data;
                var VSdatasetH = barChartVS.data.datasets[0].data;
                var VSdatasetA = barChartVS.data.datasets[1].data;
                var itr = NaN;
                
                var clicked_label = $("em", this)[0].innerText;
                
                label_index = key.indexOf(clicked_label);
                barChartO.data.labels.push(clicked_label)
                barChartVS.data.labels.push(clicked_label);

                OdatasetH.push(homeData_O[label_index]);
                OdatasetA.push(awayData_O[label_index]);
                barChartO.data.datasets[0].data = OdatasetH;
                barChartO.data.datasets[1].data = OdatasetA;
                
                VSdatasetH.push(homeData_VS[label_index]);
                VSdatasetA.push(awayData_VS[label_index]);
                barChartVS.data.datasets[0].data = VSdatasetH;
                barChartVS.data.datasets[1].data = VSdatasetA;
                
                for(var itr=0; itr<OverallGraphConfig.length; itr++)
                {
                    if(OverallGraphConfig[itr].innerText == this.innerText)
                    {
                        elt_index = itr;
                        break;
                    }
                }
                
                $("i", this)[0].classList.remove("fa-square-o");
                $("i", this)[0].classList.add("fa-check-square-o");
                
                OverallGraphConfig[elt_index].getElementsByTagName("i")[0].classList.remove("fa-square-o");
                OverallGraphConfig[elt_index].getElementsByTagName("i")[0].classList.add("fa-check-square-o");
                
                barChartO.update();
                barChartVS.update();
            }
            return false;
        }
    }
    
    document.getElementsByClassName("SwapVenues_2")[0].onclick=function(evt){
        localStorage.setItem("internal_redirection", true);
        localStorage.setItem("home_name", awayteam_name);
        localStorage.setItem("away_name", hometeam_name);
        window.location.href='predictionpage.html';
//        window.location.href='predictionpage.html#'+abbrevKey[awayteam_name]+"#"+abbrevKey[hometeam_name];
    }

    var selectButtons = document.getElementsByClassName("selectButton");
    for (var i = 0; i<selectButtons.length; i++){
        selectButtons[i].onclick = function(){
            if ($(this)[0].id=="deselect"){
                barChartO.data.labels = []
                barChartO.data.datasets[0].data = []
                barChartO.data.datasets[1].data = []
                
                barChartVS.data.labels = [] 
                barChartVS.data.datasets[0].data = []
                barChartVS.data.datasets[1].data = []
                
                for (var i = 0; i<OverallGraphConfig.length; i++){
                    if (OverallGraphConfig[i].getElementsByTagName('i')[0].classList.contains("fa-check-square-o")){
                        OverallGraphConfig[i].getElementsByTagName('i')[0].classList.remove("fa-check-square-o");
                        VSGraphConfig[i].getElementsByTagName('i')[0].classList.remove("fa-check-square-o");
                        OverallGraphConfig[i].getElementsByTagName('i')[0].classList.add("fa-square-o");
                        VSGraphConfig[i].getElementsByTagName('i')[0].classList.add("fa-square-o");
                    }
                }
                barChartO.update();
                barChartVS.update();
            }
            else{
                barChartO.data.labels = key;
                barChartO.data.datasets[0].data = homeData_O;
                barChartO.data.datasets[1].data = awayData_O;
                
                barChartVS.data.labels = key; 
                barChartVS.data.datasets[0].data = homeData_VS;
                barChartVS.data.datasets[1].data = awayData_VS;
                
                for (var i = 0; i<OverallGraphConfig.length; i++){
                    if (OverallGraphConfig[i].getElementsByTagName('i')[0].classList.contains("fa-square-o")){
                        OverallGraphConfig[i].getElementsByTagName('i')[0].classList.remove("fa-square-o");
                        VSGraphConfig[i].getElementsByTagName('i')[0].classList.remove("fa-square-o");
                        OverallGraphConfig[i].getElementsByTagName('i')[0].classList.add("fa-check-square-o");
                        VSGraphConfig[i].getElementsByTagName('i')[0].classList.add("fa-check-square-o");
                    }
                }
                barChartO.update();
                barChartVS.update();
            }
        }
    }

}

//~~~~~~~~~~~~~~~~ Preparation ~~~~~~~~~~~~~~~~
function preparePage(){
    prepareBanner();    
    prepareQuickStats();
    prepareTabularComparison();
    prepareNextPredict();
}

function prepareBanner(){
    var banner = document.getElementsByClassName("Prediction_Banner")[0];
    var hometeam_banner = banner.getElementsByClassName("Home_team")[0];
    hometeam_banner.setAttribute("id", hometeam_name_formatted);
    hometeam_banner.getElementsByClassName("TeamTitleText")[0].innerHTML = hometeam_name;
    hometeam_banner.getElementsByClassName("TeamLogo")[0].setAttribute("id", hometeam_name_formatted);
    hometeam_banner.getElementsByClassName("TeamLogo")[0].setAttribute("src", "img/Team_Logos/".concat(hometeam_name_formatted).concat(".png"));
    var awayteam_banner = banner.getElementsByClassName("Away_team")[0];
    awayteam_banner.setAttribute("id", awayteam_name_formatted);
    awayteam_banner.getElementsByClassName("TeamTitleText")[0].innerHTML = awayteam_name;
    awayteam_banner.getElementsByClassName("TeamLogo")[0].setAttribute("id", awayteam_name_formatted);
    awayteam_banner.getElementsByClassName("TeamLogo")[0].setAttribute("src", "img/Team_Logos/".concat(awayteam_name_formatted).concat(".png"));
}

function prepareQuickStats(){
    OverallQuickStats = $("#overalltableQS .progress-bar")
    VSQuickStats = $("#venuetableQS .progress-bar")
    for (var i = 0; i<OverallQuickStats.length-1; i+=2)
    {
        OverallQuickStats[i].classList.add(hometeam_name_formatted);
        OverallQuickStats[i+1].classList.add(awayteam_name_formatted);
        VSQuickStats[i].classList.add(hometeam_name_formatted);
        VSQuickStats[i+1].classList.add(awayteam_name_formatted);
    }
}

function prepareTabularComparison(){
    var OverallTC = $("#overalltableTC")[0];
    var VenueTC = $("#venuetableTC")[0];
    
    $("th",OverallTC)[1].getElementsByTagName("h1")[0].innerHTML = hometeam_name;
    $("th",OverallTC)[1].classList.add(hometeam_name_formatted);
    $("th",OverallTC)[2].getElementsByTagName("h1")[0].innerHTML = awayteam_name;
    $("th",OverallTC)[2].classList.add(awayteam_name_formatted);
    
    $("th",VenueTC)[1].getElementsByTagName("h1")[0].innerHTML = hometeam_name;
    $("th",VenueTC)[1].classList.add(hometeam_name_formatted);
    $("th",VenueTC)[2].getElementsByTagName("h1")[0].innerHTML = awayteam_name;
    $("th",VenueTC)[2].classList.add(awayteam_name_formatted);
    
    var OverallData = $("#overalltableTC tbody tr");
    var VenueData = $("#venuetableTC tbody tr");
    console.log("OverallData.length is: ",OverallData.length);
    for (var i = 0; i<OverallData.length; i++)
    {
        var home_val_O = parseFloat(OverallData[i].getElementsByTagName("td")[1].innerHTML);
        var away_val_O = parseFloat(OverallData[i].getElementsByTagName("td")[2].innerHTML);
        var home_val_VS = parseFloat(VenueData[i].getElementsByTagName("td")[1].innerHTML);
        var away_val_VS = parseFloat(VenueData[i].getElementsByTagName("td")[2].innerHTML);

        if (home_val_O > away_val_O)
        {
            OverallData[i].getElementsByTagName("td")[1].classList.add(hometeam_name_formatted, "superior");
            OverallData[i].getElementsByTagName("td")[2].classList.add(awayteam_name_formatted);
        }
        else if (home_val_O < away_val_O)
        {
            OverallData[i].getElementsByTagName("td")[1].classList.add(hometeam_name_formatted);
            OverallData[i].getElementsByTagName("td")[2].classList.add(awayteam_name_formatted, "superior");
        }
        else{
            OverallData[i].getElementsByTagName("td")[1].classList.add(hometeam_name_formatted, "superior");
            OverallData[i].getElementsByTagName("td")[2].classList.add(awayteam_name_formatted, "superior");
        }
        
        if (home_val_VS > away_val_VS)
        {
            VenueData[i].getElementsByTagName("td")[1].classList.add(hometeam_name_formatted, "superior");
            VenueData[i].getElementsByTagName("td")[2].classList.add(awayteam_name_formatted);
        }
        else if (home_val_VS < away_val_VS)
        {
            VenueData[i].getElementsByTagName("td")[1].classList.add(hometeam_name_formatted);
            VenueData[i].getElementsByTagName("td")[2].classList.add(awayteam_name_formatted, "superior");
        }
        else{
            VenueData[i].getElementsByTagName("td")[1].classList.add(hometeam_name_formatted, "superior");
            VenueData[i].getElementsByTagName("td")[2].classList.add(awayteam_name_formatted, "superior");
        }
        
    }
}

function prepareNextPredict(){
    $("#nextPredictBox")[0].getElementsByTagName("input")[0].value=hometeam_name;
    $("#nextPredictBox")[0].getElementsByTagName("input")[1].value=awayteam_name;
}

//~~~~~~~~~~~~~~~~ Other Funcs ~~~~~~~~~~~~~~~~

function getGroupings(tableTitles){
    ret = []
    for (var i =0; i<tableTitles.length; i++)
        {
            ret.push(tableTitles[i].getElementsByTagName('span')[0]);
        }
    return ret;
}

function updatePage(){
    var Overall_VS_index = 0;
    if($("#venueoroverall li a.optionActivated")[0].text=="Venue Specific"){
        Overall_VS_index=1;
    }
    descriptions[Overall_VS_index].style.display="block";
    descriptions[(Overall_VS_index+1)%2].style.display="none";
    
    for(var i=0; i<comparisontables.length; i++)
    {
        comparisontables[i].style.display="none";
    }
    
    if($('.tableTitle span.optionActivated h3')[0])
    {
        switch($('.tableTitle span.optionActivated h3')[0].innerHTML)
        {
            case("Quick Stats:"):
                comparisontables[Overall_VS_index].style.display="table";
                break;
            case("Graphical Comparison:"):
                comparisontables[2+Overall_VS_index].style.display="table";
                break;
            case("Tabular Comparison:"):
                comparisontables[4+Overall_VS_index].style.display="table";
                break;
        }
    }
    return false;    
}

function OverallGraphConfigFunc(){
    var input, filter, ul, li, a, i;
    input = document.getElementById("OverallGraphConfig");
    filter = input.value.toUpperCase();
    ul = document.getElementById("Overall_Attributes");
    li = ul.getElementsByTagName("li");
    for(i = 0; i<li.length; i++) {
//        a = li[i].getElementsByTagName("a")[0];
        if(li[i].innerText.toUpperCase().indexOf(filter) > -1){
            li[i].style.display="";
        } else{
            li[i].style.display="none";
        }
    }
    return false;
}

function VSGraphConfigFunc(){
    var input, filter, ul, li, a, i;
    input = document.getElementById("VSGraphConfig");
    filter = input.value.toUpperCase();
    ul = document.getElementById("VS_Attributes");
    li = ul.getElementsByTagName("li");
    for(i = 0; i<li.length; i++) {
//        a = li[i].getElementsByTagName("a")[0];
        if(li[i].innerText.toUpperCase().indexOf(filter) > -1){
            li[i].style.display="";
        } else{
            li[i].style.display="none";
        }
    }
}

