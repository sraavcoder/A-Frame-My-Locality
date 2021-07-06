AFRAME.registerComponent("click_events",{
    schema:{
        selectedItemId:{type:"string", default:""}
    },
    init: function(){
        this.handleMouseEnterEvent();
        this.handleMouseLeaveEvents();
        this.handleMouseClickEvent();   
    },
    handleMouseEnterEvent: function(){
        this.el.addEventListener("mouseenter",()=>{
            const placeId = ["taj-mahal", "budapest", "eiffel-tower", "new-york-city"]
            const id = this.el.getAttribute("id");
            if(placeId.includes(id)){   
                const placeContainer = document.querySelector("#places-container")
                placeContainer.setAttribute("click_events",{
                    selectedItemId:id
                })
                this.el.setAttribute("material",{
                    color:"blue",
                    opacity:1
                })
            }   
        })
    },
    handleMouseLeaveEvents: function(){
        console.log("leave")
        this.el.addEventListener("mouseleave", () => {
            const { selectedItemId } = this.data;
            if (selectedItemId) {
              const el = document.querySelector(`#${selectedItemId}`);
              const id = el.getAttribute("id");
              if (id == selectedItemId) {
                el.setAttribute("material", {
                  color: "#5f545b",
                  opacity: 1,
                });
              }
            }
          });
        },
        handleMouseClickEvent: function(){
            this.el.addEventListener("click", ()=>{
                const placesContainer = document.querySelector("#places-container")
                const {state} = placesContainer.getAttribute("tour");
                if (state == "places-list"){
                    const id = this.el.getAttribute("id")
                    const placesId = ["taj-mahal", "budapest", "eiffel-tower", "new-york-city"]
                    if (placesId.includes(id)){
                        placesContainer.setAttribute("tour", {state: "view", selectedCard: id})
                    }
                }
                if(state == "view" || state == "sideView"){
                    this.handleViewState()
                }
            })
        },
        handleViewState: function(){
            const el = this.el;
            const id = el.getAttribute("id")
            const placeContainer = document.querySelector("#places-container");
            const {selectedItemId} = placeContainer.getAttribute("click_events");
            const sideViewPlacesId = ["place-1", "place-2", "place-3", "place-4"]
            console.log(selectedItemId,id)
            if(sideViewPlacesId.includes(id)){
                placeContainer.setAttribute("tour", {state: "sideView"})
                const skyEl = document.querySelector("#main-container");
                skyEl.setAttribute("material",{
                    src: `./assets/360_images/${selectedItemId}/${id}.jpg`,
                    color:"white"
                })  
            }
        }
    })