const map = L.map("map").setView([41.18, -71.58], 12);

const aerialMapLayer = L.tileLayer(
  "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 16,
    attribution:
      'Map tiles by <a href="https://usgs.gov">Department of Interior/USGS</a> | <a href="https://github.com/geohouse/blockIslandGlassFloats">This site\'s source code</a>',
  }
);

const topoMapLayer = L.tileLayer(
  "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 16,
    attribution:
      'Map tiles by <a href="https://usgs.gov">Department of Interior/USGS</a> | <a href="https://github.com/geohouse/blockIslandGlassFloats">This site\'s source code</a>',
  }
);

aerialMapLayer.addTo(map);
map.scrollWheelZoom.disable();
// map.invalidateSize();

document.addEventListener("scroll", (event) => {
  console.log("scrolling");
  setTimeout(() => {
    console.log("Scroll rest");
  }, 500);
  isScrolledInView();
});

function isScrolledInView() {
  const scrollInfoBox = document.querySelector(".first-scroll-info");
  const rect = scrollInfoBox.getBoundingClientRect();
  const top = rect.top;
  const bottom = rect.bottom;

  const isVisible = top > 0 && bottom <= window.innerHeight;

  if (!isVisible) {
    console.log("Scrolled out of view");
    const mapRect = document.querySelector("#map").getBoundingClientRect();
    const newVerticalOffset = `${mapRect.bottom}px`;
    console.log(newVerticalOffset);
    scrollInfoBox.style.top = newVerticalOffset;
    topoMapLayer.addTo(map);
  }
}
