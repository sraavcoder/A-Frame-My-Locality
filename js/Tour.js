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
        id: "room1",
        title: "Outer Locality",
        url: "./assets/3.jpg",
      },
      {
        id: "room2",
        title: "Bedroom 1",
        url: "./assets/2.jpg",
      },

      {
        id: "room3",
        title: "Bedroom 2",
        url: "./assets/1.jpg",
      }
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 30;
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
      radiusInner:7,
      radiusOuter:8
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
      radius:7
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
      color: "white",
      value:item.title
    });
    position.y = -15
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
      src : `./assets/${selectedCard}.jpeg`,
      color:"white"
    })
  }
});
