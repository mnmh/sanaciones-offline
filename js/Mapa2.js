let mapcontainer = document.getElementById("mapasanaciones")
// Data Mundo
let MundoFeatures = JSON.parse(mundo)[0].features;
// Data Municipio
let MunicipiosFeatures = JSON.parse(municipios).features;
// Data departamentos
let DepartamentosFeatures = JSON.parse(departamentos).features;
// Data Ubicaciones
let UbicacionFeatures = JSON.parse(ubicacion2);

console.log(ubicacion2)
// Data Pueblos
let PruebasFeatures = JSON.parse(pueblos);


// Generando Mapa
let map = L.map(mapcontainer, {
    maxZoom: 9,
    minZoom: 2,
    scrollWheelZoom: false
}).setView([4.124080991005611, -73.67431640625001], 5);

// Añadiendo Json Mundo aL Mapa
Object.keys(MundoFeatures).map(item => {
    L.geoJson(MundoFeatures[item].geometry, {
        weight: 0.2,
        color: '#666',
        fillColor: 'none',
        fillOpacity: 1,
        opacity: 1
    }).addTo(map);
});
// Añadiendo Json Municipio aL Mapa
Object.keys(MunicipiosFeatures).map(item => {
    L.geoJson(MunicipiosFeatures[item], {
        weight: 0.2,
        color: '#666',
        fillColor: 'none',
        fillOpacity: 1,
        opacity: 1
    }).addTo(map);
});
// Coloriando Los departamentos
let color_departamentos = d3.scaleOrdinal(d3.schemeSet3)

// Añadiendo Json Departamentos aL Mapa
Object.keys(DepartamentosFeatures).map(item => {
    L.geoJson(DepartamentosFeatures[item], {
        weight: 0.2,
        color: '#555',
        fillColor: color_departamentos(DepartamentosFeatures[item].properties.NOMBRE_DPT),
        fillOpacity: 0.20,
    }).addTo(map);
});




var resguardoIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Google_Map_Marker.svg',
    iconSize: [50, 50], // size of the icon
});

var puebloIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Google_Map_Marker.svg',
    iconSize: [20, 20], // size of the icon
});

let markers_pueblos = []
let markers_resguardos = []

let rmax = 30
let markers = L.markerClusterGroup({
    maxClusterRadius: 60,
    iconCreateFunction: iconClusterDefine
})

pie = d3.pie()
    .padAngle(0.005)
    .sort(null)
    .value(d => d.value)


color_peligro = d3.scaleOrdinal().range(['#E0052D', '#F2D7B6']).domain(['si', 'no'])

cargarPueblos()

function iconClusterDefine(cluster) {
    var children = cluster.getAllChildMarkers(),
        n = children.length,
        strokeWidth = 1,
        r = rmax - 2 * strokeWidth - (n < 10 ? 12 : n < 100 ? 8 : n < 1000 ? 4 : 0),
        iconDim = 50

    let data = devolverData(children)
    let html = dibujarDona({
        data: data,
        n: n,
        r: r,
        strokeWidth: strokeWidth
    })

    let myIcon = new L.DivIcon({
        html: html,
        className: 'marker-cluster',
        iconSize: new L.Point(iconDim, iconDim)
    });
    return myIcon;
}

function devolverData(children) {
    let resp = [
        {
            name: 'si',
            value: 0
        },
        {
            name: 'no',
            value: 0
        }
    ]
    children.map(c => {
        if (c.options.peligro) resp[0].value = resp[0].value + 1
        else resp[1].value = resp[1].value + 1
    })

    return resp
}


function dibujarDona(aggs) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let vis = d3.select(svg).attr('width', 50)
        .attr('height', 50)

    let scaleTotal = d3.scaleLinear().range(['#FFF', '#F2B705']).domain([0, 102])
    const arcs = pie(aggs.data);
    vis.append('circle')
        .attr('cx', 25)
        .attr('cy', 25)
        .attr('r', 25)
        .attr('fill', scaleTotal(aggs.n))
        .attr('fill', '#FFF')


    vis.selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", d => color_peligro(d.data.name))
        .attr("d", d3.arc().innerRadius(20).outerRadius(25))
        .attr('transform', 'translate(25,25)')

    vis.append('text')
        .text(aggs.n)
        .attr('fill', '#333')
        .attr('dy', '.5em')
        .attr('x', 25)
        .attr('y', 25)
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'middle')

    return serializeXmlNode(svg);
}

function serializeXmlNode(xmlNode) {
    if (typeof window.XMLSerializer != "undefined") {
        return (new window.XMLSerializer()).serializeToString(xmlNode);
    } else if (typeof xmlNode.xml != "undefined") {
        return xmlNode.xml;
    }
    return "";
}


function devolverPoblacion(elem) {
    if (elem['Con población entre 0-99 personas'] === 'X') return '0-99'
    else if (elem['Con población entre 100-199 personas'] === 'X') return '100-199'
    else if (elem['Con población entre 200-500 personas'] === 'X') return '200-500'
    else return 'Sin información'
}

function devolverPeligro(elem) {
    if (elem['En peligro de ser exterminados cultural o físicamente por el conflicto armado interno por el Auto 004 de 2009.'] === 'X') return true
    else return false
}

function cargarPueblos() {

    Object.keys(UbicacionFeatures).map(index => {

        let lat = parseFloat(UbicacionFeatures[index]["Latitud"].replace(',', '.'))
        let lon = parseFloat(UbicacionFeatures[index]['Longitud'].replace(',', '.'))
        let marker = L.marker([lat, lon], {
            icon: puebloIcon,
            pueblo: UbicacionFeatures[index]['Pueblo'],
            poblacion: devolverPoblacion(UbicacionFeatures[index]),
            peligro: devolverPeligro(UbicacionFeatures[index])
        })
            .bindTooltip(
                '<b>Seudónimo:</b> ' + UbicacionFeatures[index]['Seudónimo'] + '</br > ' +
                '<b>Municipio:</b>' + UbicacionFeatures[index]['Municipio'] + '</br > ' +
                UbicacionFeatures[index]['Mensaje'] 
                , { className: 'myCSSClass' }
            ).on('click', async () => {
                markers_resguardos = []
                let cod_resguardos = []
                Object.keys(PruebasFeatures).map(item => {
                    if (UbicacionFeatures[index]["Pueblo"].replace(/\s+/g,' ').trim() == PruebasFeatures[item]['Pueblo'].replace(/\s+/g,' ').trim()) {
                        Object.keys(MunicipiosFeatures).filter()
                    }
                });
            }).addTo(markers)
        map.addLayer(markers)
    });
}