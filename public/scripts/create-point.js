function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(res => res.json())
    .then(states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city")
    const stateInput = document.querySelector("[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Collect items
const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    // add or remove class
    const itemId = itemLi.dataset.id

    // verify if exists selected items
    // if yes, get them
    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    // if already selected
    if (alreadySelected >= 0) {
        // remove from selection
        const filteredItems = selectedItems.filter(item => item != itemId)
        selectedItems = filteredItems
    } else {
        // if not selected, add to
        selectedItems.push(itemId)
    }
    
    // add to hidden field the selected items (to send to backend)
    collectedItems.value = selectedItems
}