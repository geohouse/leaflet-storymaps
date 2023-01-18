const map = L.map("map").setView([41.18, -71.58], 12);

let currentBackgroundLayer_map1 = L.tileLayer(
  "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 16,
    attribution:
      'Map tiles by <a href="https://usgs.gov">Department of Interior/USGS</a> | <a href="https://github.com/geohouse/blockIslandGlassFloats">This site\'s source code</a>',
  }
);

currentBackgroundLayer_map1.addTo(map);
map.scrollWheelZoom.disable();
// map.invalidateSize();
