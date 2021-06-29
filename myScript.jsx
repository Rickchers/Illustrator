function placeTable () {
	var doc = app.activeDocument;
	function layName(){
		var layerCount = doc.layers.length;
		for (var ii = layerCount - 1; ii >= 0; ii--){
			targetLayer = doc.layers[ii];
			var layerName = targetLayer.name;
			//alert (layerName);
			if (layerName == '__INFO__'){
				return 'layer __INFO__ already exist!'
				};
		};
		return 1;
	};
	
	function symbolExist(){
		var symbolsCount = doc.symbols.length;
		for (var ii = symbolsCount - 1; ii >= 0; ii--){
			targetSymbol = doc.symbols[ii];
			var symbolName = targetSymbol.name;
			
			if (symbolName == 'myTable'){
				return 1;
				};
		};
		alert ('there is no symbol')
		return 0;
	};
	

	var symbolExistResult = symbolExist();
	

	var testResult = layName();

	if (testResult == symbolExistResult == 1){
		var myLayer = doc.layers.add(); 
		myLayer.name = '__INFO__';
		//myLayer.printable= false;
		
		var artboardRef = doc.artboards;

		x1 = artboardRef[0].artboardRect[0];
		y1 = artboardRef[0].artboardRect[1];

		x2 = artboardRef[0].artboardRect[2];
		y2 = artboardRef[0].artboardRect[3];

		

		symbolRef = doc.symbols.getByName('myTable');
		symbolItemRef1 = doc.symbolItems.add(symbolRef);
		symbolItemRef1.top = y2-60;
		symbolItemRef1.left = x1;
		
		symbolItemRef1.breakLink ();
	}else if(testResult != 1){alert (testResult);}

};

function getSwatches ()	{

	var doc = app.activeDocument;
	var myString = "";
	swLen = doc.swatches.length;
	for (var a = swLen-1; a >= 2; a--) {
	    var myString = myString + doc.swatches[a].toString().slice(8,-1) + " ";
	    //mycontents = myString.toString().slice(8,-1);
	    //alert (myString);
	};



		
	return myString;
};

function setSwatches () {
    var doc = app.activeDocument;
    //clear existing text frames
    for (i = 6; i >= 1; i --) {
    	//alert (i);
    	var myTextFrame = doc.textFrames.getByName ('text' + i);
		myTextFrame.textRange.characterAttributes.fillColor = doc.swatches[0].color;
		
		var rect = doc.pathItems.getByName ('rectangle'+ i);
        rect.filled = true;
        rect.fillColor = doc.swatches[0].color;
        rect.stroked = false;
    };

    var n=1;
    swLen = doc.swatches.length;
    doc.textFrames.getByName ('colorsNumber').contents = swLen-2;
    
    if (swLen < 8){
        for (var a = swLen-1; a >= 2; a--) {
            //alert ('text'+ n);
            var myString = doc.swatches[a];
            var myTextFrame = doc.textFrames.getByName ('text'+ n);
            myTextFrame.textRange.characterAttributes.fillColor = doc.swatches[0].color;
            
            myTextFrame.contents = myString.toString().slice(8,-1);
            myTextFrame.textRange.characterAttributes.fillColor = doc.swatches[a].color;
            
            var rect = doc.pathItems.getByName ('rectangle'+ n);
            rect.filled = true;
            rect.fillColor = doc.swatches[a].color;
            rect.stroked = false;
            
            n = n+1;
        };
    };

};

function getName ()	{

	var docName = app.activeDocument.name.slice(0,-3);
	var mytextFrame = app.activeDocument.textFrames.getByName ('nomer');
	mytextFrame.contents = docName;
	//var docName = app.activeDocument.fullName; //read-only. complete path to the file
	return docName;
};

//DATA!!!=========================
function doDateFormat(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year ].join('-');
};
//alert (dateString);
//END DATA========================

function doArrowDirection (myCheck) {
	//alert (myCheck);
	
	arrowHorizont = app.activeDocument.pathItems.getByName ('arrowHorizont');
	arrowVertical = app.activeDocument.pathItems.getByName ('arrowVertical')

	if(myCheck){

		arrowHorizont.opacity = 100;
		arrowVertical.opacity = 0;
	
	}else if (!myCheck) {

		arrowHorizont.opacity = 0;
		arrowVertical.opacity = 100;
	}

	
};

function setName (myDlinaVala, myTolshinaPodlozhki, myPolimer){




	
	
	

	app.activeDocument.textFrames.getByName ('dlinaVala').contents = myDlinaVala;
	
	var dlinaForm = (myDlinaVala - ((myPolimer-myTolshinaPodlozhki)*2*3.14159265358979));
	
	var distortion = (dlinaForm / myDlinaVala)*100;
	
	app.activeDocument.textFrames.getByName ('distortion').contents = distortion.toString().slice(0,6);
	
	app.activeDocument.textFrames.getByName ('polimer').contents = myPolimer;
	
	
	
	var dateString = doDateFormat((new Date()).getTime());
	app.activeDocument.textFrames.getByName ('date').contents = dateString;

	redraw();



	return distortion;

};

function setQuantity (myKolForm, myKolKompl){
	app.activeDocument.textFrames.getByName ('kol_form').contents = myKolForm;
	app.activeDocument.textFrames.getByName ('kol_kompl').contents = myKolKompl;
	app.activeDocument.textFrames.getByName ('itog_form').contents = myKolForm * myKolKompl;
};

function setRelease () {
	var doc = app.activeDocument;

	newCMYK = new CMYKColor();
	newCMYK.black = 0;
	newCMYK.cyan = 0;
	newCMYK.magenta = 100;
	newCMYK.yellow = 100;

	var frame = doc.pathItems.getByName ('myFrame');
	frame.filled = true;
	frame.fillColor = newCMYK;
	frame.stroked = false;

	doc.textFrames.getByName ('date').name = '____NONE____';
	doc.textFrames.getByName ('nomer').name = '____NONE____';
	doc.textFrames.getByName ('kol_form').name = '____NONE____';
	doc.textFrames.getByName ('kol_kompl').name = '____NONE____';
	doc.textFrames.getByName ('itog_form').name = '____NONE____';	
	doc.textFrames.getByName ('distortion').name = '____NONE____';
	doc.textFrames.getByName ('dlinaVala').name = '____NONE____';
	doc.textFrames.getByName ('polimer').name = '____NONE____';
	doc.pathItems.getByName ('arrowHorizont').name = '____NONE____';
	doc.pathItems.getByName ('arrowVertical').name = '____NONE____';
	doc.textFrames.getByName ('colorsNumber').name = '____NONE____';

    for (i = 6; i >= 1; i --) {
    	//alert (i);
    	var myTextFrame = doc.textFrames.getByName ('text' + i).name = '____NONE____';
		var rect = doc.pathItems.getByName ('rectangle'+ i).name = '____NONE____';;

    }
};

function calculateOnly (myDlinaValaCalc, myTolshinaPodlozhkiCalc, myPolimerCalc){

	
	

	var dlinaFormCalc = (myDlinaValaCalc - ((myPolimerCalc-myTolshinaPodlozhkiCalc)*2*3.14159265358979));
	
	var distortionCalc = (dlinaFormCalc / myDlinaValaCalc)*100;
	
	

	return distortionCalc.toFixed(5);

};

function getXML() {

	//============================================
	var doc = app.activeDocument;
	var dest = decodeURI (doc.path);

	var XMLFolderPath = new Folder(dest.slice(0,-4) + '/XML/').getFiles("*.xml");


	var read_file = new File(XMLFolderPath);

	read_file.open('r', undefined, undefined);
	var _json = read_file.read();

	read_file.close();

	return _json;
	//=======================================================
};

function setNomer(myNomer) {
	app.activeDocument.textFrames.getByName ('nomerZakaza').contents = myNomer.slice(5,);
	return myNomer;
};




function nameKD() {
	//alert ("hello from jsx!")
	
	var doc = app.activeDocument;
	var outputFolder = doc.fullName;
	var KDcontents = app.activeDocument.textFrames.getByName ('distortion').contents;
	var dest = decodeURI (doc.fullName);
	var saveName = new File (dest.slice(0,-3) + "_KD_" + KDcontents + ".ai");

	
	doc.saveAs (saveName);

	
	//alert (app.activeDocument.textFrames.getByName ('distortion').contents);
};


function selectGroupElement(myInputValue) {
	//alert (myInputValue);
	var doc = app.activeDocument;
	doc.selection = null;
	elmentsIndex = doc.activeLayer.groupItems.length;
	doc.activeLayer.groupItems[myInputValue].selected = true;
};

function fartuk(myInputHeightValue, myInputWeightValue, myStateValue) {
	
	var doc = app.activeDocument;


	//var myInputHeightValue = prompt("Input Height Value", [200]);
	//var myInputWeightValue = prompt("Input Weight Value", [100]);

	//var myStateValue = prompt("Input State Value", [0]);

	function round(number, increment, offset) {
		return Math.ceil((number - offset) / increment ) * increment + offset;
	};






	//var myLayer = doc.layers.getByName('cross');
	var myLayer = doc.activeLayer;
	var myLayerName = myLayer.name.slice(0,5);
	if (myLayerName =='cross'){
		var myItems = myLayer.groupItems;
	};
	
	//var myItems = myLayer.groupItems;
	var myLength = myLayer.groupItems.length;

	var myArrX = [];
	var myArrY = [];

	var myArrX2 = [];
	var myArrY2 = [];

	for (var i=0; i<myLength; i++)
		{
			myArrX.push(myItems[i].controlBounds[0]);
			myArrY.push(myItems[i].controlBounds[1]);
			myArrX2.push(myItems[i].controlBounds[2]);
			myArrY2.push(myItems[i].controlBounds[3]);			
							
	};

	var X = Math.min.apply(Math, myArrX);
	var Y = Math.max.apply(Math, myArrY);

	var X2 = Math.max.apply(Math, myArrX2);
	var Y2 = Math.min.apply(Math, myArrY2);


	doc.artboards[0].artboardRect = [X, Y, X2, Y2];



	var artBoardHightInPoints = (Y-Y2);
	var artBoardHightInMillimeters = (Y-Y2)/2.834645;
	//alert (artBoardHightInMillimeters);
	var artBoardWeightInPoints =(X2-X);
	var artBoardWeightInMillimeters = (X2-X)/2.834645;
	//alert (artBoartWeightInMillimeters);


	if (myStateValue == 0 && myInputHeightValue == 200 && myInputWeightValue == 100){
		setArtboartdRound(200, 100);
	}else if (myStateValue == 1 && myInputHeightValue == 200 && myInputWeightValue == 100){
		setArtboartdRound(100, 200);
	}else if (myStateValue == 0 && myInputHeightValue > 200 && myInputWeightValue == 100){
		setArtboartdRound(myInputHeightValue, 100)
	}else if (myStateValue == 1 && myInputHeightValue > 200 && myInputWeightValue == 100){
		setArtboartdRound(100, myInputHeightValue)
	};




	function setArtboartdRound(height, weight) {
			var artBoardHightInMillimetersRound = round(artBoardHightInMillimeters, 50, 50)+height;
			var artBoardWeightInMillimetersRound = round(artBoardWeightInMillimeters, 50, 50)+weight;

			var artBoardHightInPointsRound = artBoardHightInMillimetersRound*2.834645;
			var myNewHightIncrease = (artBoardHightInPointsRound - (Y-Y2))/2;

			var artBoardWeighInPointsRound = artBoardWeightInMillimetersRound*2.834645;
			var myNewWeightIncrease = (artBoardWeighInPointsRound - (X2-X))/2;

			if (height > 200 && weight == 100){
				var myHightIncrease = ((height*2.834645)-artBoardHightInPoints)/2;
				doc.artboards[0].artboardRect = [X-myNewWeightIncrease, Y+myHightIncrease, X2+myNewWeightIncrease, Y2-myHightIncrease];
			};

			if (height == 100 && weight > 200){
				var myWeightIncrease = ((weight*2.834645)-artBoardWeightInPoints)/2;
				doc.artboards[0].artboardRect = [X-myWeightIncrease, Y+myNewHightIncrease, X2+myWeightIncrease, Y2-myNewHightIncrease];
			};

			if (height <= 200 && weight <= 200){
				doc.artboards[0].artboardRect = [X-myNewWeightIncrease, Y+myNewHightIncrease, X2+myNewWeightIncrease, Y2-myNewHightIncrease];
			};

	};




};

function StrokeColor (mySwColor){
	var doc = app.activeDocument;

	var mySwatchSelected = doc.swatches[mySwColor-1].color;

	var mySwatchSelectedName = doc.swatches[mySwColor-1].toString().slice(8,doc.swatches[mySwColor-1].toString().length-1);





	function layerName(){
		var layerCount = doc.layers.length;
		for (var i = layerCount - 1; i >= 0; i--){
			
			var layerName = doc.layers[i].name;
			if (layerName == 'cross ' + mySwatchSelectedName){
				return 1;
			};
		};
		return 0;
	};


	var testResult = layerName();

	if (testResult == 0)
	{

	var myLayer = doc.layers.add(); 
	myLayer.name = 'cross ' + mySwatchSelectedName;


	//var docSelected = doc.selection;
	};

	

	for (var i = doc.artboards.length - 1; i >= 0; i--) {

		

		var topLeftCoordinates = doc.artboards[i].artboardRect;

		var m  = app.getScaleMatrix(-100,100); 

		var x1 = topLeftCoordinates[0];
		var y1 = topLeftCoordinates[1];

		var x2 = topLeftCoordinates[2];;
		var y2 = topLeftCoordinates[3];

		var centerX = x1+((x2-x1)/2);
		var centerY = y1+(y2-y1)/2;





		function makeCrosses(x_arg1,y_arg1,x_arg2,y_arg2,x_arg3,y_arg3,x_arg4,y_arg4,myScaleMatrix){
			
					
			function makeOneCross (crossGroup, x_arg, y_arg){

				newVPath = crossGroup.pathItems.add();
				newVPath.setEntirePath(Array(Array(x_arg, y_arg-7.086615), Array(x_arg, y_arg+7.086615)));

				newVPath.filled = false;
				newVPath.stroked = true;
				newVPath.strokeWidth = 0.709;
				newVPath.strokeOverprint = true;
				newVPath.strokeColor = mySwatchSelected;

				

				
				newHPath = crossGroup.pathItems.add();
				newHPath.setEntirePath(Array(Array(x_arg-7.086615, y_arg), Array(x_arg+7.086615, y_arg)));
				

				newHPath.filled = false;
				newHPath.stroked = true;
				newHPath.strokeWidth = 0.709;
				newHPath.strokeOverprint = true;
				newHPath.strokeColor = mySwatchSelected;

			
			};

			activeLayer = doc.layers.getByName('cross ' + mySwatchSelectedName);
			
			var crossGroupAll = activeLayer.groupItems.add();
				crossGroupAll.name = 'crosses';
						
			var crossGroupA = crossGroupAll.groupItems.add();
			makeOneCross (crossGroupA, x_arg1, y_arg1);
			

			var crossGroupB = crossGroupAll.groupItems.add();
			makeOneCross (crossGroupB, x_arg2, y_arg2);
			

			var crossGroupC = crossGroupAll.groupItems.add();
			makeOneCross (crossGroupC, x_arg3, y_arg3);
			

			var crossGroupD = crossGroupAll.groupItems.add();
			makeOneCross (crossGroupD, x_arg4, y_arg4);
			

			textRef = activeLayer.textFrames.add();
			textRef.contents = "N";
			textRef.textRange.characterAttributes.fillColor = doc.swatches[mySwColor-1].color;
			textRef.textRange.characterAttributes.overprintFill = true;
			textRef.top = y_arg4+5;
			textRef.left = x_arg4+25;
			//textRef.transform(myScaleMatrix);


		};




		makeCrosses(centerX,y2-21.259845,x1-21.259845,centerY,x2+21.259845,centerY,centerX,y1+21.259845,m);	
	};	
};