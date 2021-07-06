AFRAME.registerComponent("place-side-view",{
    
    init: function(){
        this.createPlaces()
    },
    
    tick: function(){
        const placeContainer = document.querySelector("#places-container");
        const {state} = placeContainer.getAttribute("tour");
        if(state == "view" || state == "sideView"){
            this.el.setAttribute("visible", true);
        }
        else{
            this.el.setAttribute("visible", false);
        }
    },

    createPlaceTumbnail: function(position, id){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("id", `place-${id}`);
        entityEl.setAttribute("position", position);
        entityEl.setAttribute("geometry", {
            primitive: "circle",
            radius: 2.5
        });
        entityEl.setAttribute("material", {
            src: "./assets/helicopter.png",
            opacity: 0.9,
        });
        entityEl.setAttribute("click_events", {});
        
        return entityEl;
    },
    
    createPlaces: function(){
        const sideViewContainer = document.querySelector("#side-view-container");
        var prevoiusXPosition = -150;
        var prevoiusYPosition = 30;
        
        for(var i=1;i<=4;i++){
            const position ={
                x:(prevoiusXPosition += 50),
                y:(prevoiusYPosition += 2),
                z: -40
            }    
            const entityEl = this.createPlaceTumbnail(position, i);
            sideViewContainer.appendChild(entityEl);
        }
    }
})
