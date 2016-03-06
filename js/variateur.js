jQuery (function($) {
	"use strict";
	//hljs.initHighlighting();
	
	//code pour jouer l'animation
	$('#jouer').click(function() {
		$('.effet').removeClass('jouer_effet');
		setTimeout(function() {
			$('.effet').addClass('jouer-effet');
		},0);
	});
	
	
	
	function CssProp(initialCssProp) {
		var self=this;
		self.couleur = ko.observable(initialCssProp.couleur);
		self.couleur = ko.observable(initialCssProp.couleur);
		self.couleur_fond = ko.observable(initialCssProp.couleur_fond);
		self.scaleX = ko.observable(initialCssProp.scaleX);
		self.rotateX = ko.observable(initialCssProp.rotateX);
		self.rotateY = ko.observable(initialCssProp.rotateY);
		self.translateX = ko.observable(initialCssProp.translateX);
		self.translateY = ko.observable(initialCssProp.translateY);
		self.skewX = ko.observable(initialCssProp.skewX);
		self.skewY = ko.observable(initialCssProp.skewY);
		//transformations 3D
		self.rotateZ = ko.observable(initialCssProp.rotateZ);
		self.translateZ = ko.observable(initialCssProp.translateZ);
		self.perspectiveZ = ko.observable(initialCssProp.perspectiveZ);
		
		
	}
  
	function CuePoint(time,initialCssProp) {
		var self=this;
		self.time = ko.observable(time);
		self.cssProp = ko.observable(new CssProp(initialCssProp));
		// cssText sera directement mis dans l'attribut style
		self.cssText = ko.computed(function () {
			var csstab = [];
			var i;
			
			//test si les valeurs sont vides
			if (self.cssProp().scaleX() != 1) {
				var scale = "scale" + "(" + self.cssProp().scaleX() + ")";
				csstab.push(scale); 
			}
			if (self.cssProp().rotateX() != 0) {
				var rotateX = "rotateX" + "(" + self.cssProp().rotateX() + "deg" + ")";
				csstab.push(rotateX);
			}
			if (self.cssProp().rotateY() != 0) {
				var rotateY = "rotateY" + "(" + self.cssProp().rotateY() + "deg" + ")";
				csstab.push(rotateY);
			}
			if (self.cssProp().translateX() != 0) {
				var translateX = "translateX" + "(" + self.cssProp().translateX() + "px" + ")";
				csstab.push(translateX);
			}
			if (self.cssProp().translateY() != 0) {
				var translateY = "translateY" + "(" + self.cssProp().translateY() + "px" + ")";
				csstab.push(translateY);
			}
			if (self.cssProp().skewX() != 0) {
				var skewX = "skewX" + "(" + self.cssProp().skewX() + "deg" + ")";
				csstab.push(skewX);
			}
			if (self.cssProp().skewY() != 0) {
				var skewY = "skewY" + "(" + self.cssProp().skewY() + "deg" + ")";
				csstab.push(skewY);
			}
			if (self.cssProp().rotateZ() != 0) {
				var rotateZ = "rotateZ" + "(" + self.cssProp().rotateZ() + "deg" + ")";
				csstab.push(rotateZ);
			}
			if (self.cssProp().translateZ() != 0) {
				var translateZ = "translateZ" + "(" + self.cssProp().translateZ() + "px" + ")";
				csstab.push(translateZ);
			}
			if (self.cssProp().perspectiveZ() != 0) {
				var perspectiveZ = "perspective" + "(" + self.cssProp().perspectiveZ() + ")";
				csstab.push(perspectiveZ);
			}
			
			var test = csstab.join("\n\t\t ");
			
		    var result = "-webkit-transform: ";
			
			for (i=0; i<test.length; i++) {
				result += test[i];
			}
			
			result += ";";
			return result;
		});
	}
	
	function ViewModel() {
		var self=this;
		self.items = ko.observableArray([
			new CuePoint("10", {couleur:'black', couleur_fond:'#fff', scaleX:"1", rotateX:"0", rotateY:"0", translateX:"0", translateY:"0", skewX:"0", skewY:"0", rotateZ:"0", translateZ:"0", perspectiveZ:"0"}),
			new CuePoint("50", {couleur:'red', couleur_fond:'black', scaleX:"1", rotateX:"0", rotateY:"0", translateX:"0", translateY:"0", skewX:"0", skewY:"0", rotateZ:"0", translateZ:"0", perspectiveZ:"0"}),
		]);        
		self.selected = ko.observable();
		
		self.addCuePoint = function () {
			self.items.push(new CuePoint("40", {couleur:'red', couleur_fond:'black', scaleX:"1", rotateX:"0", rotateY:"0", translateX:"0", translateY:"0", skewX:"0", skewY:"0", rotateZ:"0", translateZ:"0", perspectiveZ:"0"}));
		}
		
		self.afterRender = function(elements, dataModel) {
			var $drag = $(elements).filter(".drag");
			$drag.draggable({axis: "x"});
			
			$drag.on("dragstop", function(event){
				console.log("stop:",this);
				var leftpx = parseInt($(this).css("left"), 10);
				var leftpc = Math.round(leftpx / $(this).parent().width() * 100);
				dataModel.time(leftpc);
			});
		}
		
		self.animText = ko.computed(function(){
			var total = "@-webkit-keyframes laAnim {";
			var i = 0;
			for (i=0; i< self.items().length; i++) {
				total += self.items()[i].time() + "% {" + self.items()[i].cssText() + "}";
			}
			total += "}";
			return total;
		});
		
	};
	ko.applyBindings(new ViewModel(), document.getElementById("htmlTop"));
});