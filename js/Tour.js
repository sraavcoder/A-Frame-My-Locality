AFRAME.registerComponent("tour", {
  schema:{
    state: {type:"string", default:"places-list"},
    selectedCard: {type:"string", default:"#card1"}
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards()
  },

  tick: function(){
    const {state} = this.el.getAttribute("tour");

    if(state == "view"){
      this.hideEl([this.placesContainer])
      this.showView()
    }
  },

  createCards: function () {
    const thumbNailsRef = [
      {
        id: "taj-mahal",
        title: "Taj Mahal",
        url: "./assets/thumbnails/taj_mahal.png",
      },
      {
        id: "budapest",
        title: "Budapest",
        url: "./assets/thumbnails/budapest.jpg",
      },

      {
        id: "eiffel-tower",
        title: "Eiffel Tower",
        url: "./assets/thumbnails/eiffel_tower.jpg",
      },
      {
        id: "new-york-city",
        title: "New York City",
        url: "./assets/thumbnails/new_york_city.png",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      const borderEl=this.createBorder(position, item.id);
      const thumbnailEl=this.createThumbNail(item);
      const titleEl = this.createTitle(item, position);
      
      borderEl.appendChild(thumbnailEl);
      borderEl.appendChild(titleEl);
      this.placesContainer.appendChild(borderEl);    
    }
  },
  
  createBorder: function(position, id){
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id",id);
    entityEl.setAttribute("visible",true);
    entityEl.setAttribute("position",position);
    entityEl.setAttribute("geometry",{
      primitive:"ring",
      radiusInner:9,
      radiusOuter:10
    });
    entityEl.setAttribute("material",{
      color:"#5f545b",
      opacity:1
    });
    entityEl.setAttribute("click_events",{});
    return entityEl;
  },
  createThumbNail:function(item){
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible",true);
    entityEl.setAttribute("geometry",{
      primitive:"circle",
      radius:9
    });
    entityEl.setAttribute("material",{
      src:item.url
    });
    return entityEl;
  },
  createTitle: function(item, position){
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible",true);
    entityEl.setAttribute("text",{
      font:"roboto",
      align: "center",
      width: 70,
      color: "#f70077",
      value:item.title
    });
    position.y = -20
    entityEl.setAttribute("position",position);
    return entityEl;
  },
  hideEl: function(eList){
    eList.map((el)=>{
      el.setAttribute("visible", false);
    })
  },
  showView: function(){
    var {selectedCard} = this.data;
    var skyEl = document.querySelector("#main-container")
    skyEl.setAttribute("material", {
      src : `./assets/360_images/${selectedCard}/place-0.jpg`,
      color:"white"
    })
  }
});
