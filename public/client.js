
//this function was used for 'onEachFeature' allroutes option
function popup(feature, layer) {
    console.log(feature, layer);
    if (feature.properties) {
        layer.bindPopup('Name: ' + feature.properties.route_name + '<br> Code: ' + feature.properties.route_code);
    }
}

//this function can be used for 'style' leaflet option
/*
function redcolor(){
    return{
        color: "#ff0000",
        opacity: 0.65
    }
}
*/
var colors = ['#71ff34', '#ff3471', '#ff7b34', '#34aeff', '#ff4834']
var routes = []
const fetchroutes = fetch('/routes')
    .then(res => { return res.json() })
    .then(data => {
        data = data.features
        // data.forEach(route => {
        // routes.push(
        for (let i = 0; i < data.length; ++i) {
            routes.push(L.geoJSON(data[i], {
                onEachFeature: popup,
                style: {
                    opacity: 0.65,
                    color: colors[i % colors.length],
                    weight: 6
                }
            }))
            // )
        }//)
        routes.forEach(route => {
            route.addTo(map)
        });
    })
// routes.forEach(route => {
//     route.addTo(map)
// });
console.log(routes);

//////////


function pathfind(opoint, dpoint) {
    var opoint = document.getElementById("origin").value
    var dpoint = document.getElementById("destination").value
    fetch(`/pathfind?origin=${encodeURIComponent(opoint)}&destination=${encodeURIComponent(dpoint)}`)
        .then(res => { return res.json() })
        .then(data => {
            data = data.features
            // data.forEach(route => {
            // routes.push(
            for (let index = 0; index < data.length; ++index) {
                L.geoJSON(data[index], {
                    onEachFeature: popup,
                    style: {
                        opacity: 0.65,
                        color: '#3F826D',
                        weight: 15,
                        dashArray: '4 1 2',
                        dashOffset: '3'
                    }
                }).addTo(map)
                // )
            }//)
        })
}

var pathfind2 = (o, d) => fetch(`/pathfind?origin=${encodeURIComponent(o.value)}&destination=${encodeURIComponent(d.value)}`)
    .then(res => { return res.json() })
    .then(data => {
        data = data.features
        // data.forEach(route => {
        // routes.push(
        for (let index = 0; index < data.length; ++index) {
            L.geoJSON(data[index], {
                onEachFeature: popup,
                style: {
                    opacity: 0.65,
                    color: '#3F826D',
                    weight: 15,
                    dashArray: '4 1 2',
                    dashOffset: '3'
                }
            }).addTo(map)
            // )
        }//)
    })



// document.getElementById("btnpathfind").addEventListener("click", pathfind);
/////////

// var route_RD_GUSA = L.geoJSON(allroutesJson.features[0], {
//     onEachFeature: popup,
//     style: {
//         opacity: 0.65,
//         color: '#F7F7FF'
//     }
// });
// var route_PATAG_COGON = L.geoJSON(allroutesJson.features[1], {
//     onEachFeature: popup,
//     style: {
//         opacity: 0.65,
//         color: '#F7F7FF'
//     }
// })
// var route_BAYABAS_COGON = L.geoJSON(allroutesJson.features[2], {
//     onEachFeature: popup,
//     style: {
//         opacity: 0.65,
//         color: '#F7F7FF'
//     }
// })
// var route_BONBON_COGON = L.geoJSON(allroutesJson.features[3], {
//     onEachFeature: popup,
//     style: {
//         opacity: 0.65,
//         color: '#F7F7FF'
//     }
// })
// var route_BALULANG_COGON = L.geoJSON(allroutesJson.features[4], {
//     onEachFeature: popup,
//     style: {
//         opacity: 0.65,
//         color: '#F7F7FF'
//     }
// })
// var route_BUENA_ORO_COGON = L.geoJSON(allroutesJson.features[5], {
//     onEachFeature: popup,
//     style: {
//         opacity: 0.65,
//         color: '#F7F7FF'
//     }
// })
// var route_CAMP_EVG_COGON = L.geoJSON(allroutesJson.features[6], {
//     onEachFeature: popup,
//     style: {
//         opacity: 0.65,
//         color: '#F7F7FF'
//     }
// })
// var allRouteLayer = L.layerGroup([
//     route_RD_GUSA,
//     route_PATAG_COGON,
//     route_BAYABAS_COGON,
//     route_BONBON_COGON,
//     route_BALULANG_COGON,
//     route_BUENA_ORO_COGON,
//     route_CAMP_EVG_COGON
// ]);

// open street map layer (maptiler api)
var osmDefault = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=VhesJPHeAqyxwLGSnrFq', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
// map initialization
var map = L.map('map', {
    center: [8.477703150412395, 124.64379231398955], // target is rizal monument
    zoom: 18,
    layers: [
        osmDefault
        //     route_RD_GUSA,
        //     route_PATAG_COGON,
        //     route_BAYABAS_COGON,
        //     route_BONBON_COGON,
        //     route_BALULANG_COGON,
        //     route_BUENA_ORO_COGON,
        //     route_CAMP_EVG_COGON
    ] //starts with all routes displayed
});

//two objects to contain our base layers and overlays. both are defined above. used for layers control
var baseMaps = {
    "Default": osmDefault,
    "Satellite": Esri_WorldImagery
}

// var overlays = {
//     "AllRouteLayer": allRouteLayer,
//     "RD_GUSA": route_RD_GUSA,
//     "PATAG_COGON": route_PATAG_COGON,
//     "BAYABAS_COGON": route_BAYABAS_COGON,
//     "BONBON_COGON": route_BONBON_COGON,
//     "BALULANG_COGON": route_BALULANG_COGON,
//     "BUENA_ORO_COGON": route_BUENA_ORO_COGON,
//     "CAMP_EVG_COGON": route_CAMP_EVG_COGON
// }

L.control.layers(baseMaps).addTo(map);

var userMarker = L.marker([8.477703150412395, 124.64379231398955]);

/* you can define custom marker icon
var customMarker = L.icon({
    iconUrl: 'directory.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadwoUrl:'my-icon-shadow.png', //shadows are optional
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]

    //to add
    var customMarker = L.marker([8.477703150412395, 124.64379231398955],
        {
            icon: customMarker,
            draggable: true //useful for shortest walking path (offroad)?
        }).addTo(map)
});
*/

L.control.locate().addTo(map); //check top left corner for added button/control
/*
var routeLayers = L.layerGroup().addTo(map);
allroutes.features.forEach((feature) => {
    L.geoJSON(feature).addTo(routeLayers);
});
*/

function openPanel(id) {
    $(id).css({
        'width': '350px', 
        'visibility': 'visible'
    });
    console.log(id);
}
function closePanel(id) {
    $(id).css({
        'width': '0px', 
        'visibility': 'hidden',
    });

}

$('#journeyBtn, #routesBtn').click(function(e){
    switch (e.target.id) {
        case "journeyBtn":
                //close other panels first
                closePanel('#routesPanel');
                $('#routesBtn').css({
                    'background-color': '#3F2B96'
                });
                //then open target panel
                openPanel('#journeyPanel');
                $('#journeyBtn').css({
                    'background-color': '#A8C0FF'
                });
            break;
        case "routesBtn":
                closePanel('#journeyPanel');
                $('#journeyBtn').css({
                    'background-color': '#3F2B96'
                });

                openPanel('#routesPanel');
                $('#routesBtn').css({
                    'background-color': '#A8C0FF'
                });
            break;
        default:
            console.log('here');
            break;
    }
});

$('.closeBtn').click(function(e){
    console.log(e.target.id);
    switch (e.target.id) {
        case 'journeyCloseBtn':
            closePanel('#journeyPanel');
            break;
        case 'routesCloseBtn':
            closePanel('#routesPanel');
            break;
    
        default:
            break;
    }
});
// function showAll() {
//     //overlays.AllRouteLayer.addTo(map);
//     overlays.RD_GUSA.addTo(map);
//     overlays.PATAG_COGON.addTo(map);
//     overlays.BAYABAS_COGON.addTo(map);
//     overlays.BONBON_COGON.addTo(map);
//     overlays.BALULANG_COGON.addTo(map);
//     overlays.BUENA_ORO_COGON.addTo(map);
//     overlays.CAMP_EVG_COGON.addTo(map);
// }

// function hideAll() {
//     //overlays.AllRouteLayer.remove();
//     overlays.RD_GUSA.remove();
//     overlays.PATAG_COGON.remove();
//     overlays.BAYABAS_COGON.remove();
//     overlays.BONBON_COGON.remove();
//     overlays.BALULANG_COGON.remove();
//     overlays.BUENA_ORO_COGON.remove();
//     overlays.CAMP_EVG_COGON.remove();
// }

// function toggleRoute() {
//     switch (window.event.target.id) {
//         case 'rd_gusa':
//             console.log('rd gusa');
//             if (overlays.RD_GUSA._mapToAdd == null) {
//                 overlays.RD_GUSA.addTo(map);
//             } else {
//                 overlays.RD_GUSA.remove();
//             }
//             break;
//         case 'patag_cogon':
//             console.log('patag cogon');
//             if (overlays.PATAG_COGON._mapToAdd == null) {
//                 overlays.PATAG_COGON.addTo(map);
//             } else {
//                 overlays.PATAG_COGON.remove();
//             }
//             break;
//         case 'bayabas_cogon':
//             console.log('bayabas cogon');
//             if (overlays.BAYABAS_COGON._mapToAdd == null) {
//                 overlays.BAYABAS_COGON.addTo(map);
//             } else {
//                 overlays.BAYABAS_COGON.remove();
//             }
//             break;
//         case 'bonbon_cogon':
//             console.log('bonbon cogon');
//             if (overlays.BONBON_COGON._mapToAdd == null) {
//                 overlays.BONBON_COGON.addTo(map);
//             } else {
//                 overlays.BONBON_COGON.remove();
//             }
//             break;
//         case 'balulang_cogon':
//             console.log('balulang cogon');
//             if (overlays.BALULANG_COGON._mapToAdd == null) {
//                 overlays.BALULANG_COGON.addTo(map);
//             } else {
//                 overlays.BALULANG_COGON.remove();
//             }
//             break;
//         case 'buena_oro_cogon':
//             console.log('buena oro cogon');
//             if (overlays.BUENA_ORO_COGON._mapToAdd == null) {
//                 overlays.BUENA_ORO_COGON.addTo(map);
//             } else {
//                 overlays.BUENA_ORO_COGON.remove();
//             }
//             break;
//         case 'camp_evg_cogon':
//             console.log('camp evg cogon');
//             if (overlays.CAMP_EVG_COGON._mapToAdd == null) {
//                 overlays.CAMP_EVG_COGON.addTo(map);
//             } else {
//                 overlays.CAMP_EVG_COGON.remove();
//             }
//             break;
//         default:
//             break;
//     }
// }

// map.on('click', function (e) {
//     function addMarker(e) {
//         // Add marker to map at click location; add popup window
//         var newMarker = new L.marker(e.latlng).addTo(map);
//         console.log(newMarker);
//     }
// });

// map.on('click', function(e) {
//     alert(e.latlng);
// } );

var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    }
});
var greenIcon = new LeafIcon({
    iconUrl: 'http://leafletjs.com/SlavaUkraini/examples/custom-icons/leaf-green.png',
    shadowUrl: 'http://leafletjs.com/SlavaUkraini/examples/custom-icons/leaf-shadow.png'
})

var origin = {}
var destination = {}

var pinOrigin = function (e) {
    if (e.id == 'd-pin') return
    if (origin.options) {
        if (map.listens('drag')) {
            var pin1 = origin.getLatLng()
            document.getElementById("origin").value = Object.values(pin1).reverse().toString()
            map.off('drag')
        } else { map.on('drag', oDrag) }
        return
    }
    if (!origin.options) {
        origin = L.marker(map.getCenter(), { draggable: true }).addTo(map);
        map.on('drag', oDrag);
    }
};

var pinDestination = function (e) {
    if (e.id == 'o-pin') return
    if (destination.options) {
        if (map.listens('drag')) {
            var pin1 = destination.getLatLng()
            document.getElementById("destination").value = Object.values(pin1).reverse().toString()
            map.off('drag')
        } else { map.on('drag', dDrag) }
        return
    }
    if (!destination.options) {
        destination = L.marker(map.getCenter(), { draggable: true, icon: greenIcon }).addTo(map);
        map.on('drag', dDrag);
    }
};
var oDrag = function (e) {
    if (!e) return
    var center = map.getCenter()
    origin.setLatLng(center)
}
var dDrag = function (e) {
    if (!e) return
    var center = map.getCenter()
    destination.setLatLng(center)
}

// test