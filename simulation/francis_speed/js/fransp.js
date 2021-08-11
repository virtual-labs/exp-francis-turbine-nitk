//on click of next button

var mpointer=0;
var repeat =0;
var flag=0;
var x=0;
var y;

var idInput = null, checkUnit = null, textDisplay = null;
var compareVal = 0, qCount = 0, resultCount = 0 ;
var ansDisplay = 0;

//Questions object
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");

		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");

		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.innerHTML = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		var myDiv1  = document.getElementById("question-div");
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			myDiv1.style.height = "150px";
			document.getElementById("divq").appendChild(dispAns);
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			myDiv1.style.height = "150px";
			document.getElementById("divq").appendChild(dispAns);
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}

function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}

//To insert input and check button
function userCalculation(elem)
{
	ansDisplay++;
	var inputVal = document.createElement("input");
	var checkVal = document.createElement("input");
	var rightVal = document.createElement("span");
	inputVal.setAttribute("type","text");
	inputVal.setAttribute("id","res"+ansDisplay);
	inputVal.setAttribute("oninput","checkInputValid(this)");
	rightVal.setAttribute("id","rightAns"+ansDisplay);
	inputVal.classList.add("inputStyle");
	checkVal.setAttribute("type","button");
	checkVal.setAttribute("id","chk"+ansDisplay);
	checkVal.setAttribute("style","cursor:pointer");
	checkVal.setAttribute("onclick","checkResult();");
	checkVal.setAttribute("value","CHECK");
	elem.appendChild(inputVal);
	elem.appendChild(rightVal);
	elem.appendChild(checkVal);
	// elem.setAttribute("onmouseover","formulaDisplay(event,this);");
	// elem.setAttribute("onmouseleave","formulaDisplayClose();");
	// checkVal.setAttribute("onmouseover","formulaDisplayClose();");
}
function checkResult()
{
	var idd = document.getElementById("res"+ansDisplay);
	var idd1 = document.getElementById("chk"+ansDisplay);
	var ansId = document.getElementById("rightAns"+ansDisplay);
	if(simsubscreennum == 2)
	{
		compareVal = values[x][lnt][6];
		checkUnit = "N-m";
	}
	else if(simsubscreennum == 5)
	{
		compareVal = values[x][lnt][4];
		checkUnit = "m";
	}
	else if(simsubscreennum == 6)
	{
		compareVal = values[x][lnt][10];
		checkUnit = "m<sup>3</sup>/sec";
	}
	else if(simsubscreennum == 7 && resultCount == 0)
	{
		compareVal = values[x][lnt][11];
		checkUnit = "W";
	}
	else if(simsubscreennum == 7 && resultCount == 1)
	{
		compareVal = values[x][lnt][12];
		checkUnit = "W";
	}
	else if(simsubscreennum == 7 && resultCount == 2)
	{
		compareVal = values[x][lnt][13];
		checkUnit = "%";
	}

	if(!idd.value  || !idd.value!=" ")
	{
		// idd.setAttribute("placeholder","Please enter value");
	}
	else if(Math.round(idd.value) != Math.round(compareVal))
	{
		// console.log(2);
		qCount++;
		// blinkStop();
		ansId.classList.remove("resultStyle");
		idd.style.borderColor = "red";
		ansId.style.color = "red";
		ansId.innerHTML= "&#10008;";
		if(qCount == 2)
		{
			idd1.value = "RESULT";
		}
		if(qCount == 3)
		{
			idd1.style.visibility = "hidden";
			idd.parentNode.removeChild(idd);
			idd1.parentNode.removeChild(idd1);
			ansId.classList.add("resultStyle");
			ansId.style.color = "black";
			ansId.innerHTML= compareVal+checkUnit;
			goToNextFunction();
		}
	}
	else
	{
		idd1.style.visibility = "hidden";
		idd.parentNode.removeChild(idd);
		idd1.parentNode.removeChild(idd1);
		ansId.classList.add("resultStyle");
		ansId.style.color = "black";
		ansId.innerHTML= compareVal+checkUnit+"<span style='color:green;font-size:20px;'>&#10004;</span>";
		goToNextFunction();
	}
}
function goToNextFunction()
{
	if(simsubscreennum == 2)
	{
		qCount = 0;
		if(lnt == 0)
		{
			var q1 = Object.create(questions);
			generateQuestion(q1,"Selected speed value is constant throughout the experiment. Say True/False? ","","False","True",0,0,2,screen2Proceed,10,320,200,160);
		}
		else
			document.getElementById("nextButton").style.visibility = "visible";
	}
	else if(simsubscreennum == 5)
	{
		qCount = 0;
		document.getElementById("nextButton").style.visibility = "visible";
	}
	else if(simsubscreennum == 6)
	{
		qCount = 0;
		if(lnt == 1)
		{
			var q2 = Object.create(questions);
			generateQuestion(q2,"Head of water (h) is calculated by: ","","h = Initial hook gauge reading - Final hook gauge reading","h = Final hook gauge reading -  Initial hook gauge reading","h = Final hook gauge reading +  Initial hook gauge reading","h = Final hook gauge reading *  Initial hook gauge reading",2,screen2Proceed,410,90,358,180);
		}
		else
			document.getElementById("nextButton").style.visibility = "visible";
	}
	else if(simsubscreennum == 7 && resultCount == 0)
	{
		resultCount = 1;
		qCount = 0;
		document.getElementById('can7-6').innerHTML = "Output power = ";
		idInput = document.getElementById('can7-6');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 7 && resultCount == 1)
	{
		resultCount = 2;
		qCount = 0;
		document.getElementById('can7-7').innerHTML = "Efficiency =  ";
		idInput = document.getElementById('can7-7');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 7 && resultCount == 2)
	{
		resultCount = 0;
		qCount = 0;
		qCount = 0;
		lnt+=1;
		document.getElementById('nextButton').style.visibility="visible";
		step7a();
	}

}
// function formulaDisplay(event,ele)
// {
// 	var xx = event.pageX;
// 	var yy = event.pageY;
// 	xx = xx -  100;
// 	yy = yy - 60;
// 	if(ele.id == "can2-6")
// 		textDisplay = "&tau; (N-m) = (W - S)*R*g";
// 	if(ele.id == "can5-5")
// 		textDisplay = "H (m) = H<sub>s</sub> + z";
// 	if(ele.id == "can6-12")
// 		textDisplay = "Q<sub>act</sub> (m<sup>3</sup>/sec) = (2/3)*C<sub>d</sub>*l*&radic;(2g)*h<sup>(3/2)</sup> ";
// 	if(ele.id == "can7-5")
// 		textDisplay = "Input Power (W) = &gamma;*Q<sub>act</sub>*H";
// 	if(ele.id == "can7-6")
// 		textDisplay = "Output Power (W) = (2*&pi;*N*&tau;)/60";
// 	if(ele.id == "can7-7")
// 		textDisplay = "Efficiency (%) = (Output Power/Input Power) * 100";
//
// 	document.getElementById("formula").style = "position:absolute;visibility:visible;background-color:black;color:white;border-radius:5px;padding:5px;left:"+xx+"px;top:"+yy+"px;";
// 	document.getElementById("formula").innerHTML = textDisplay;
// }
// function formulaDisplayClose()
// {
// 	document.getElementById("formula").innerHTML = "";
// 	document.getElementById("formula").style.visibility = "hidden";
// }
function navNext()
{

for (temp = 0; temp <=8 ; temp++)
{
document.getElementById('canvas'+temp).style.visibility="hidden";
}

simsubscreennum+=1;
document.getElementById('canvas'+(simsubscreennum)).style.visibility="visible";
document.getElementById('nextButton').style.visibility="hidden";
magic();
}


//Move pointing finger with mouse
$(document).mousemove(function(e)
{

if(simsubscreennum==1 && mpointer==0)
{
if(e.pageX<800 && e.pageY<600)
{
document.getElementById('onarm').style.visibility="visible";

 $("#onarm").css({left:e.pageX, top:e.pageY});
}


}

else if(simsubscreennum!=1)
{
	document.getElementById('onarm').style.visibility="hidden";
}


});
//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
if (document.getElementById('arrow1').style.visibility=="hidden")
document.getElementById('arrow1').style.visibility="visible";
else
document.getElementById('arrow1').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction()
{
clearInterval(myInt);
document.getElementById('arrow1').style.visibility="hidden";
}

//-------------------------------------function magic starts here----------------------------------------------------

function magic()
{

	if (simsubscreennum==1)
	{
		document.getElementById('trial').style="visibility:hidden ;left: 70px; top: 100px;position: absolute;font-weight: bold;";
		document.getElementById('trial').innerHTML="";
		document.getElementById("onarm").style="margin-left:-50px; margin-top: -50px; position:absolute;";

		if(flag==1)
		{

			document.getElementById("formula").style.visibility = "hidden";
			document.getElementById('can1on').onclick="";
			document.getElementById('pumptext').innerHTML="&nbsp;Stop the pump by pressing the stop button."
			document.getElementById('stepnumber').innerHTML="&nbsp;8&nbsp";

		}
		else
		{

			// document.getElementById('trial').style="visibility:visible ;left: 700px; top: 100px;position: absolute;font-weight: bold;text-transform: uppercase;";
			// document.getElementById('trial').innerHTML="Trial : " + repeat;

			document.getElementById('can1on').onclick=function() { step1(); };
			document.getElementById('can1-3').onclick=function() { stepstop(); };
		}


	}

	else if (simsubscreennum==2)
	{

		refresh1();
		repeat+=1;
		document.getElementById("formula").style.visibility = "hidden";
		document.getElementById('trial').style="visibility:visible ;left: 700px; top: 100px;position: absolute;font-weight: bold;text-transform: uppercase;";
		document.getElementById('trial').innerHTML="Trial : " + (lnt+1)

		if (repeat==1)
		{
			document.getElementById('can2-3').style.visibility="hidden";
			document.getElementById('can2-ok').onclick=function() { step2andhalf();};


		}
		else
		{

			document.getElementById('can2-form').style.visibility="hidden";

			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 520px; top: 190px; height: 50px; z-index: 10;";


			document.getElementById('can2-3').style.visibility="visible";
			document.getElementById('can2-4').innerHTML="Applied weight on pan = ";
			document.getElementById('can2-3').onclick=function() { step2(); };
		}

	}

	else if (simsubscreennum==3)
	{

		document.getElementById('formula').style.visibility="hidden";
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('can3-3').style.visibility="hidden";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 720px; top: 150px; height: 50px; z-index: 10;";

		document.getElementById('can2-3').style.visibility="hidden";
		document.getElementById('can3-4').onclick=function() { step3(); };
	}

	else if (simsubscreennum==4)
	{
		document.getElementById('can3-3').style.visibility="hidden";
		step4();

	}

	else if (simsubscreennum==5)
	{
		step5();
	}

	else if (simsubscreennum==6)
	{


		document.getElementById("formula").style.visibility = "hidden";
		document.getElementById('can6-9').innerHTML="Initial reading (water level till crest) = "+values[x][lnt][7] +" cm";
		myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 200px; top: 190px; height: 50px; z-index: 10;";

			document.getElementById("arrow1").style.WebkitTransform = "rotate(45deg)";
			 // Code for IE9
			 document.getElementById("arrow1").style.msTransform = "rotate(45deg)";
			 // Standard syntax
			 document.getElementById("arrow1").style.transform = "rotate(45deg)";

		document.getElementById('can6-7').onclick=function() { step6andhalf();};


	}
	else if (simsubscreennum==7)
	{
		document.getElementById("formula").style.visibility = "hidden";
		step7();
	}
	else if(simsubscreennum == 8)
	{
		document.getElementById('can1-1').style.visibility = "hidden";
		document.getElementById('can1on').style.visibility = "hidden";
		document.getElementById('can1-3').style.visibility = "hidden";
		document.getElementById('formula').style.visibility = "hidden";
		document.getElementById('trial').style.visibility = "hidden";
		var stepSkip = document.getElementById("skip");
		stepSkip.classList.toggle('fade');
		setTimeout(function()
		{
			document.getElementById("nextButton").style.visibility = "visible";
		},500);
	}

	else (simsubscreennum==9)
	{
		document.getElementById('step8text1').onclick=function() { step_8a();}
		document.getElementById('step8text2').onclick=function() { step_8b();}
		document.getElementById('step8text3').onclick=function() { step_8c();}
	}



}

function step1()
{
	mpointer=1;
	document.getElementById('onarm').style.visibility="hidden";
	document.getElementById('nextButton').style.visibility="visible";
}

function step2()
{
	myStopFunction();

	document.getElementById("can2-3").style.animation = "water0 1s 1 forwards";
	setTimeout(function(){

		document.getElementById('can2-4').innerHTML="Applied weight on pan (W) = "+values[x][lnt][3] +" kg" ;
		document.getElementById('can2-5').innerHTML="Spring balance reading (S) = "+values[x][lnt][5] +" kg" ;
		// document.getElementById('can2-6').innerHTML="Torque = "+values[x][lnt][6] +" N-m";
		document.getElementById('can2-6').innerHTML="Torque (&tau;) = ";
		idInput = document.getElementById('can2-6');
		userCalculation(idInput);
	}, 2000);
}

function step2andhalf()
{
	x = document.getElementById("can2-select").selectedIndex;
	y = document.getElementById("can2-select").options;

	document.getElementById('trial').style="visibility:visible ;left: 700px; top: 100px;position: absolute;font-weight: bold;text-transform: uppercase;";
	document.getElementById('trial').innerHTML="Trial : " + repeat;



	setTimeout(function(){

		document.getElementById('can2-4').innerHTML="Dead weight of the pan (W) = "+values[x][lnt][3]+" kg";
		document.getElementById('can2-5').innerHTML="Spring balance reading (S) = "+values[x][lnt][5] +" kg" ;
		document.getElementById('can2-6').innerHTML="Torque (&tau;) = ";
		idInput = document.getElementById('can2-6');
		userCalculation(idInput);
	}, 1000);
}
function screen2Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}
function step3()
{
	myStopFunction();
	document.getElementById('can3-3').style.visibility="visible";

	document.getElementById("can3-4").style.animation = "tacho 1s 1 forwards";
	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 300px; top: 240px; height: 50px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)";
		 // Code for IE9
		 document.getElementById("arrow1").style.msTransform = "rotate(90deg)";
		 // Standard syntax
		 document.getElementById("arrow1").style.transform = "rotate(90deg)";


	document.getElementById('can3-3').onclick=function() { step3andhalf(); };
}
function step3andhalf()
{
	myStopFunction();
	document.getElementById("can3-3").style.transformOrigin = "30% 30%";
	document.getElementById("can3-3").style.animation = "valveturn-2 0.5s ";

	setTimeout(function(){
	document.getElementById('can3-5').innerHTML="Speed of motor (N) = "+y[x].text +" rpm";
	if(lnt == 0)
	{
	var q2 = Object.create(questions);
	generateQuestion(q2,"Tachometer is used to measure _________","","Pressure","Speed","Torque","Efficiency",2,screen3Proceed,540,360,200,170);
	}
	else
		document.getElementById('nextButton').style.visibility="visible";
	}, 1000);


}
function screen3Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}
function step4()
{
	document.getElementById("can4-3").style.transformOrigin = "62% 37%";
	document.getElementById("can4-3").style.animation = "arrow-1 1.5s forwards ";;
	setTimeout(function(){
		document.getElementById('can4-4').innerHTML="Supply pressure ="+values[x][lnt][0] +" kg/cm<sup>2</sup>" ;
		document.getElementById('can4-5').innerHTML="Supply head (H<sub>s</sub>) ="+values[x][lnt][2] +" m" ;
		document.getElementById('nextButton').style.visibility="visible";
	}, 2000);
}
function step5()
{
	setTimeout(function(){
	document.getElementById("can5-3").style.transformOrigin = "62% 37%";
	document.getElementById("can5-3").style.animation = "arrow-11 3s forwards ";

	}, 700);
	setTimeout(function(){
	document.getElementById('can5-4').innerHTML="Vacuum pressure = "+values[x][lnt][1] +" kg/cm<sup>2</sup>" ;
	// document.getElementById('can5-5').innerHTML="Total pressure (H) = "+values[x][lnt][4] +" m";
	document.getElementById('can5-5').innerHTML="Total pressure (H) = ";
	idInput = document.getElementById('can5-5');
	userCalculation(idInput);
	}, 3200);
}

/*
function step6()
{

	setTimeout(function(){
	document.getElementById("can6-5").style.animation = "water-4 1.5s 1 forwards";
	setTimeout(function(){
	document.getElementById("can6-3").style.animation = "myhook-1 2s 1  forwards";
	}, 1500);
	step6andhalf();
	}, 1000);



}
*/
function step6andhalf()
{
	myStopFunction();
	setTimeout(function(){
	document.getElementById("can6-13").style.animation = "water-5 1.5s 1 forwards";

	}, 1000);
	setTimeout(function(){
	document.getElementById("can6-3").style.animation = "myhook-2 2s 1  forwards";
	step6quarter();
	}, 2700);
}

function step6quarter()
{
	setTimeout(function(){

	document.getElementById('can6-10').innerHTML="Final reading = "+values[x][lnt][8] +" cm" ;
	document.getElementById('can6-11').innerHTML="Head of water (h) = "+values[x][lnt][9] + " cm";
	document.getElementById('can6-12').innerHTML="Actual discharge, Q<sub>act</sub> = ";
	idInput = document.getElementById('can6-12');
	userCalculation(idInput);
	}, 3000);

}
function scree6Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}
function step7()
{
	document.getElementById('can7-1').innerHTML="Actual discharge (Q<sub>act</sub>) = "+values[x][lnt][10] +"m<sup>3</sup>/sec" ;
	document.getElementById('can7-2').innerHTML="Speed of motor (N) ="+y[x].text+" rpm"
	document.getElementById('can7-3').innerHTML="Torque (&tau;) = "+values[x][lnt][6]+"N-m";
	document.getElementById('can7-4').innerHTML="Total pressure (H) = "+values[x][lnt][4]+"m";
	if(lnt == 0)
	{
		var hval = values[x][lnt][9]+"m";
		var q1 = Object.create(questions);
		generateQuestion(q1,"Total Head(H) value set in the experiment is : ","","9.5m","2.0m","3.5m",hval,4,scree7Proceed,400,350,280,170);
	}
	else
	{
		setTimeout(function(){
		document.getElementById('can7-5').innerHTML="Input power = ";
		idInput = document.getElementById('can7-5');
		userCalculation(idInput);
		}, 500);
	}

}
function scree7Proceed()
{
	setTimeout(function(){
	document.getElementById('can7-5').innerHTML="Input power = ";
	idInput = document.getElementById('can7-5');
	userCalculation(idInput);
	}, 500);
}
function step7a()
{
	if(repeat==3)
	{
		flag=1;
		mpointer=0;
		simsubscreennum=0;

	}
	else if (repeat < 3)
	{


		simsubscreennum=1;

	}
}

function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";
	document.getElementById('question-div').style.top=dright+"px";
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);
	qObject.setCallBack(fn);
}
function step_8a()
{
	$("#chartContainer").ejChart(
        {
		    //Initializing Primary X Axis
		    primaryXAxis:
            {
			    labelFormat: "{value}",
                title: { text: 'Output Power (W)' },
                range: { min: 0, max: 1800, interval: 200 }
            },

			//Initializing Primary Y Axis
            primaryYAxis:
            {
				labelFormat: "{value}",
                title: { text: 'Efficiency (%)' },
                range: { min: 0, max: 50, interval: 5 }


            },

			//Initializing Common Properties for all the series

            //Initializing Series
            series:
			[
			    {
                points: [
				{ x: values[x][0][12], y: values[x][0][13]},
				{ x: values[x][1][12], y: values[x][1][13]},
				{ x: values[x][2][12], y: values[x][2][13]},
				{ x: values[x][3][12], y: values[x][3][13]},
				{ x: values[x][4][12], y: values[x][4][13]},
				{ x: values[x][5][12], y: values[x][5][13]},
				{ x: values[x][6][12], y: values[x][6][13]}

				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,

			legend:{visible:false}
        });
}

function step_8b()
{

	$("#chartContainer").ejChart(
        {
		    //Initializing Primary X Axis
		    primaryXAxis:
            {
				labelFormat: "{value}",
                title: { text: 'Actual Discharge (Cumecs)' },
                range: { min: 0, max: 0.0350, interval: 0.0050 }

            },

			//Initializing Primary Y Axis
            primaryYAxis:
            {

			    labelFormat: "{value}",
                title: { text: 'Efficiency (%)' },
                range: { min: 0, max: 50, interval: 5 }
            },

			//Initializing Common Properties for all the series

            //Initializing Series
            series:
			[
			    {
                points: [
				{ x: values[x][0][10], y: values[x][0][13]},
				{ x: values[x][1][10], y: values[x][1][13]},
				{ x: values[x][2][10], y: values[x][2][13]},
				{ x: values[x][3][10], y: values[x][3][13]},
				{ x: values[x][4][10], y: values[x][4][13]},
				{ x: values[x][5][10], y: values[x][5][13]},
				{ x: values[x][6][10], y: values[x][6][13]}


				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,

			legend:{visible:false}
        });
}
function step_8c()
{
	$("#chartContainer").ejChart(
        {
		    //Initializing Primary X Axis
		    primaryXAxis:
            {

                labelFormat: "{value}",
                title: { text: 'Output Power (W)' },
                range: { min: 0, max: 1800, interval: 200 }
            },

			//Initializing Primary Y Axis
            primaryYAxis:
            {
				labelFormat: "{value}",
                title: { text: 'Actual Discharge (Cumecs)' },
                range: { min: 0, max: 0.0350, interval: 0.0050 }

            },

			//Initializing Common Properties for all the series

            //Initializing Series
            series:
			[
			    {
                points: [
				{ x: values[x][0][12], y: values[x][0][10]},
				{ x: values[x][1][12], y: values[x][1][10]},
				{ x: values[x][2][12], y: values[x][2][10]},
				{ x: values[x][3][12], y: values[x][3][10]},
				{ x: values[x][4][12], y: values[x][4][10]},
				{ x: values[x][5][12], y: values[x][5][10]},
				{ x: values[x][6][12], y: values[x][6][10]}


				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,

			legend:{visible:false}
        });
}






function stepstop()
{
	if(flag!=1){
		document.getElementById('nextButton').style.visibility="hidden";
	}
	else{
		simsubscreennum=7;
		document.getElementById('nextButton').style.visibility="visible";
	}

}


function refresh1()
{
	document.getElementById("can2-3").style.animation = "";
	document.getElementById('can2-5').innerHTML="Spring balance reading (S) = ";
	document.getElementById('can2-6').innerHTML="Torque = ";

	document.getElementById('can2-5').innerHTML="Spring balance reading(S) = ";
	document.getElementById('can2-6').innerHTML="Torque (&tau;) = ";

	document.getElementById("can2-select").selectedIndex = 0;

	document.getElementById("can3-4").style.animation = "";
	document.getElementById("can3-3").style.transformOrigin = "";
	document.getElementById("can3-3").style.animation = "";
	document.getElementById('can3-5').innerHTML="Speed of motor (N) = ";
	document.getElementById("can4-3").style.transformOrigin = "";
	document.getElementById("can4-3").style.animation = "";

	document.getElementById('can4-4').innerHTML="Supply pressure =" ;
	document.getElementById('can4-5').innerHTML="Supply head (H<sub>s</sub>) =";

	document.getElementById("can5-3").style.transformOrigin = "";
	document.getElementById("can5-3").style.animation = "";

	document.getElementById('can5-4').innerHTML="Vacuum pressure = " ;
	document.getElementById('can5-5').innerHTML="Total pressure (H) = ";

	document.getElementById("can6-5").style.animation = "";
	document.getElementById("can6-3").style.animation = "";

	document.getElementById("can6-13").style.animation = "";
	document.getElementById("can6-3").style.animation = "";
	document.getElementById('can6-9').innerHTML="Initial reading (water level till crest) =";
	document.getElementById('can6-10').innerHTML="Final reading = ";
	document.getElementById('can6-11').innerHTML="Head of water (h)= ";
	document.getElementById('can6-12').innerHTML="Actual discharge, Q<sub>act</sub> = ";
	document.getElementById('can7-5').innerHTML="Input power = ";
	document.getElementById('can7-6').innerHTML="Output power = ";
	document.getElementById('can7-7').innerHTML="Efficiency = ";
	document.getElementById('nextButton').style.visibility="hidden";
}
