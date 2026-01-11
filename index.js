let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0] && tabs[0].url) {
            myLeads.push(tabs[0].url)
            saveAndRender()
        }
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                <span class="delete-item" data-index="${i}">&times;</span>
            </li>
        `
    }
    ulEl.innerHTML = listItems

    // Add event listeners to each delete icon
    const deleteIcons = document.querySelectorAll(".delete-item")
    deleteIcons.forEach(icon => {
        icon.addEventListener("click", function (e) {
            const index = e.target.getAttribute("data-index")
            deleteLead(index)
        })
    })
}

function deleteLead(index) {
    myLeads.splice(index, 1)
    saveAndRender()
}

function saveAndRender() {
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    if (inputEl.value) {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        saveAndRender()
    }
})