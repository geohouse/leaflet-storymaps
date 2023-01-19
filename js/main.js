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

const map = L.map("map", {
  center: [41.18, -71.58],
  zoom: 12,
});

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

const scrollBoxDetails = {
  1: { className: ".first-scroll-info", background: aerialMapLayer },
  2: { className: ".second-scroll-info", background: topoMapLayer },
  3: { className: ".third-scroll-info", background: aerialMapLayer },
};

const possibleBackgrounds = [aerialMapLayer, topoMapLayer];

function checkBoxRect(element) {
  const boxRect = element.getBoundingClientRect();
  const boxTop = boxRect.top;
  const boxBottom = boxRect.bottom;
  //   console.log({ boxTop, boxBottom });
  const boxTopBottom = { boxTop: boxTop, boxBottom: boxBottom };
  return boxTopBottom;
}

// global var used to keep track of whether the background corresponding
// to the currently visible info is the same or different to the map layer
// on the screen.
let currentBackground = aerialMapLayer;

// This is the storymap driver to change the background map
// based on the currently shown info box on the screen
function isScrolledInView() {
  for (let scrollBox in scrollBoxDetails) {
    console.log(scrollBox);
    // Select the looped info box and check whether it's currently
    // visible ont he screen.
    const selectedBox = document.querySelector(
      scrollBoxDetails[scrollBox]?.className
    );
    const { boxTop, boxBottom } = checkBoxRect(selectedBox);
    console.log({ boxTop, boxBottom });
    const isVisible = boxTop > 0 && boxBottom <= window.innerHeight;
    console.log(isVisible);
    if (isVisible) {
      const scrolledBackground = scrollBoxDetails[scrollBox].background;
      // Only change the background layer for the info box if it's different
      // from the background layer currently being shown.
      if (scrolledBackground !== currentBackground) {
        currentBackground = scrolledBackground;
        // There may be a better way to do this - currently it removes all possible
        // backgrounds then re-adds the background that matches the info box.
        for (const background of possibleBackgrounds) {
          map.removeLayer(background);
        }
        currentBackground.addTo(map);
      }
    }
  }
  //     const selectedBox = document.querySelector(className);
  //     [boxTop, boxBottom] = checkBoxRect(selectedBox);
  //   });
  //   const firstScrollBox = document.querySelector(".first-scroll-info");
  //   const secondScrollBox = document.querySelector(".second-scroll-info");
  //   const thirdScrollBox = document.querySelector(".third-scroll-info");

  //   const firstScrollBoxRect = scrollInfoBox.getBoundingClientRect();
  //   const firstScrollBoxTop = rect.top;
  //   const firstScrollBoxBottom = rect.bottom;

  //   const isVisible = top > 0 && bottom <= window.innerHeight;

  //   if (!isVisible) {
  //     console.log("Scrolled out of view");
  //     const mapRect = document.querySelector("#map").getBoundingClientRect();
  //     const newVerticalOffset = `${mapRect.bottom}px`;
  //     console.log(newVerticalOffset);
  //     scrollInfoBox.style.top = newVerticalOffset;
  //     topoMapLayer.addTo(map);
  //   }
}
