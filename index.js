let createButton = document.getElementById("createButton")
let modalOverlay = document.getElementById("modalOverlay")
let closeModalIcon = document.getElementById("closeModalIcon")
let nameOfWebsite = document.getElementById("nameOfWebsite")
let resourceForm = document.getElementById("resourceForm")
let linkOfWebsite = document.getElementById("linkOfWebsite")
let descriptionOfWebsite = document.getElementById("descriptionOfWebsite")
let resourcesSection = document.getElementById("resources-section")


function revealModalOverlay(){
    modalOverlay.classList.remove("modal-overlay")
    modalOverlay.classList.add("modal-overlay-visible")
    nameOfWebsite.focus()
}

createButton.addEventListener("click", revealModalOverlay)

function closeBackModalOverlay(){
    if(modalOverlay.classList.contains("modal-overlay-visible")){
        modalOverlay.classList.remove("modal-overlay-visible")
        modalOverlay.classList.add("modal-overlay")

    }
}

closeModalIcon.addEventListener("click", closeBackModalOverlay)

let resources = []

function printResourcesOnUI(){
    resourcesSection.innerText = ""

    resources.forEach(function(allresourcesFromArray){
        let printSiteName = allresourcesFromArray.siteName
        let printSiteLink = allresourcesFromArray.siteLink
        let printSiteDescription = allresourcesFromArray.siteDescription

        let resourceDiv = document.createElement("div")
        resourceDiv.classList.add("resource")
    
        let nameOfWebsiteDiv = document.createElement("div")
        nameOfWebsiteDiv.classList.add("name-of-website")
    
        let nameOfWebsiteText = document.createElement("a")
        nameOfWebsiteText.setAttribute("href", `${printSiteLink}`)
        nameOfWebsiteText.setAttribute("target", "_blank")
        nameOfWebsiteText.textContent = printSiteName

        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid", "fa-trash")
        deleteIcon.setAttribute(`onclick`, `deleteResource('${printSiteLink}')`)

        let descriptionOfWebsiteDiv = document.createElement("div")
        descriptionOfWebsiteDiv.classList.add("description-div")
        let descriptionText = document.createElement("p")
        descriptionText.textContent = printSiteDescription

        descriptionOfWebsiteDiv.append(descriptionText)
        nameOfWebsiteDiv.append(nameOfWebsiteText, deleteIcon)

        resourceDiv.append(nameOfWebsiteDiv, descriptionOfWebsiteDiv)

        resourcesSection.append(resourceDiv)


    })

   
}

function deleteResource(printSiteLink){
    resources.forEach(function(resource, index){
        if(resource.siteLink === printSiteLink){
            resources.splice(index, 1)
        }
    })

    localStorage.setItem("resources", JSON.stringify(resources))
    fetchResources()
}

function fetchResources(){
    if(localStorage.getItem("resources")){
        resources = JSON.parse(localStorage.getItem("resources"))
    }

    printResourcesOnUI()
}
fetchResources()


resourceForm.addEventListener("submit", handleForm)
function handleForm(event){
    event.preventDefault()
    let websiteName = nameOfWebsite.value
    let websiteLink = linkOfWebsite.value
    let websiteDescription = descriptionOfWebsite.value

    if(nameOfWebsite.value.trim() === ""){
        nameOfWebsite.style.border = "1px solid red"
    }
    if(linkOfWebsite.value.trim() === ""){
        linkOfWebsite.style.border = "1px solid red"
    }
    if(descriptionOfWebsite.value.trim() === ""){
        descriptionOfWebsite.style.border = "1px solid red"
    }

    const createdResource ={
        siteName : websiteName,
        siteLink : websiteLink,
        siteDescription : websiteDescription
    }

    resources.push(createdResource)
    localStorage.setItem("resources", JSON.stringify(resources))
    fetchResources()

    resourceForm.reset()
    closeBackModalOverlay()
}