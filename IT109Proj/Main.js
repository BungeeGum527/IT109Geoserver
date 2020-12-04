const winH = document.querySelector('.main_container');
// const winW = document.querySelector('.main_container');
fun_winH();
// fun_winW();

function fun_winH(){
	var x = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	winH.style.height = x - 20 + "px";
}
// function fun_winW(){
// 	var x = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
// 	winH.style.width = x - 20 + "px";
// }
function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("openForm").style.display = "block"
}
function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("myForm").style.zIndex = 9999999;
  document.getElementById("openForm").style.display = "none"

}




var mymap = L.map('mapid').setView([9.1204, 125.59], 8);


var municipalities;
var WFSLayer = null;
var owsURI = 'http://localhost:8080/geoserver/IT109geoserver/ows';
var mun_load = ["IT109geoserver:a1_10",
				"IT109geoserver:a11_20",
				"IT109geoserver:a21_30",
				"IT109geoserver:a31_40",
				"IT109geoserver:a41_50",
				"IT109geoserver:a51_60",
				"IT109geoserver:a61_71"];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(mymap);

function load_municipalities(str){
    municipalities = L.tileLayer.wms(owsURI, {
      layers: 'IT109geoserver:caragaregion',
      format: 'image/png',
      transparent: true,
      attribution: "Matt Morales",
      zIndex: 100,
      opacity: .8,
      version: '1.1.0',
    }).addTo(mymap);
}

// for (var i = 0; i < mun_load.length; i++) {
	load_municipalities(owsURI);
// }

function wfsRequest(filter){
    var defaultParameters = {
      service: 'WFS',
      version: '2.0.0',
      request: 'GetFeature',
      typeName: 'IT109geoserver:caragaregion',
      maxFeatures: 100,
      outputFormat: 'application/json',
      cql_filter: filter
    };
    var parameters = L.Util.extend(defaultParameters);

    var URL = owsURI + L.Util.getParamString(parameters);
    // alert(L.Util.getParamString(parameters));
    // mymap.fitBounds(); 
  }

function set_cql(textInput) {
    var cql_filter;
    if (textInput){
      cql_filter = "mun_name LIKE '%"+textInput+"%'";
    }else{
    	return alert("Input Municipalities!");
    }

    municipalities.setParams({
      CQL_FILTER: cql_filter
    })
    console.log(municipalities);
    wfsRequest(cql_filter);
  }


$('#btnGo').click(function(){
    var textInput = $('#textInput').val();
    // var greaterLess = $('#greaterLess').val();
    // var numberInput = $('#numberInput').val();
    // var typeOfQuery = $('#typeOfQuery').val();
    WFSLayer = null;
    set_cql(textInput.toUpperCase());  //,greaterLess, numberInput, typeOfQuery
    mymap.closePopup();
  })
  $('#btnClear').click(function(){
    $('#textInput').val('');
    municipalities.setParams({
      CQL_FILTER: '1=1',
    })
    mymap.closePopup();
    WFSLayer = null;
    mymap.setView([9.1204, 125.59], 8);
  })


  // mymap.on("click", function(e) {

  //   var _layers = this._layers,
  //     layers,
  //     versions,
  //     styles;
  //   for (var x in _layers) {
    	
  //     var _layer = _layers[x];
  //     if (_layer.wmsParams) {

  //     layers = _layer.wmsParams.layers;
  //     versions = _layer.wmsParams.version;
  //     styles = _layer.wmsParams.styles;
  //     }
  //   }
    
  //   var loc = e.latlng,
  //     xy = e.containerPoint,
  //     size = this.getSize(),
  //     bounds = this.getBounds(),
  //     crs = this.options.crs,
  //     sw = crs.project(bounds.getSouthWest()),
  //     ne = crs.project(bounds.getNorthEast()),

  //     obj = {
  //     service: "WMS",
  //     version: versions[0],
  //     request: "GetFeatureInfo",
  //     layers: layers,
  //     bbox: sw.x + "," + sw.y + "," + ne.x + "," + ne.y,
  //     width: size.x,
  //     height: size.y,
  //     query_layers: layers,
  //     info_format: "application/json", 
  //     feature_count: 1
  //     };
      

  //   if (parseFloat(obj.version) >= 1.3) {
  //     obj.crs = crs.code;
  //     obj.i = Math.round(xy.x);
  //     obj.j = Math.round(xy.y);
  //   } else {
  //     obj.srs = crs.code;
  //     obj.x = Math.round(xy.x);
  //     obj.y = Math.round(xy.y);
  //   }


  //   $.ajax({
  //     url: owsURI + L.Util.getParamString(obj, owsURI, true),
  //     beforeSend:function(){
  //     $('#loader').show();
  //     },
  //     success: function(data, status, xhr) {
  //     $('#loader').hide();
  //     var html = "<table  class='table table-striped'>";
  //     if (data.features) {
  //      var features = data.features;
  //       if (features.length) {
  //       for (var i in features) {
  //         var feature = features[i];                     
  //         var properties=feature.properties;
  //         html+='<thead><tr><th>Property</th><th>Value</th></tr></thead><tbody>';
  //         for (var x in properties) {
  //           html+='<tr><th>'+x+'</th><td>'+properties[x]+'</td></tr>';
  //         }
  //         html+='</tbody></table>';
  //       }
  //       } else {
  //       html += "No Features Found.";
  //       }
  //     } else {
  //       html += "Failed to Read the Feature(s).";
  //     }
  //     map.openPopup(html, loc,{maxHeight:500});
  //     },
  //     error: function(xhr, status, err) {
  //     html += "Unable to Complete the Request.: " + err;
  //     map.openPopup(html, loc);
  //     }
  //   });
  // });

