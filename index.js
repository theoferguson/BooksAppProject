function renderForm() {
    const inputForm = document.createElement("form")
    inputForm.innerHTML =
        '<label for="searchByCharName">Search for SW Characters: </label> ' +
        '<input id="searchByCharName" type="text" placeholder="Enter SW Character Name here"/> ' +
        '<input id="imageInput" type="text" placeholder="Enter image URL here"/> ' +
        '<input type="submit" />';
    document.querySelector("#header").append(inputForm)

    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let searchName = inputForm.querySelector("#searchByCharName").value
        let newUrl = inputForm.querySelector("#imageInput").value


        fetch(`https://swapi.dev/api/people/?search=${searchName}`)
            .then(res => res.json())
            .then(json => {
                console.log(json, newUrl)
                normalizeData(json, newUrl)
            })

        inputForm.reset();

    })
}

function normalizeData(eachChar, imageURL){
    let charObject = {
        name: eachChar.results[0].name,
        height: eachChar.results[0].height,
        mass: eachChar.results[0].mass,
        hairColor: eachChar.results[0].hair_color,
        skinColor: eachChar.results[0].skin_color,
        eyeColor: eachChar.results[0].eye_color,
        birthYear: eachChar.results[0].birth_year,
        gender: eachChar.results[0].gender,
        image: imageURL
    }
    console.log(charObject)
    renderCard(charObject)
}

function renderCard(object) {
    let charCard = document.createElement('div')
    charCard.className = "SW character card"

    let cardName = document.createElement('div')
    cardName.className = "CardName"
    cardName.textContent = object.name
    charCard.append(cardName)

    let cardHeight = document.createElement('div')
    cardHeight.className = "CardHeight"
    cardHeight.textContent = `Height: ${object.height}`
    charCard.append(cardHeight)

    let cardMass = document.createElement('div')
    cardMass.className = "CardMass"
    cardMass.textContent = `Mass: ${object.mass}`
    charCard.append(cardMass)

    let cardHairColor = document.createElement('div')
    cardHairColor.className = "CardHairColor"
    cardHairColor.textContent = `Hair Color: ${object.hairColor}`
    charCard.append(cardHairColor)

    let cardSkinColor = document.createElement('div')
    cardSkinColor.className = "CardSkinColor"
    cardSkinColor.textContent = `Skin Color:   ${object.skinColor}`
    charCard.append(cardSkinColor)

    let cardEyeColor = document.createElement('div')
    cardEyeColor.className = "CardEyeColor"
    cardEyeColor.textContent = `Eye Color:   ${object.eyeColor}`
    charCard.append(cardEyeColor)

    let cardBirthYear = document.createElement('div')
    cardBirthYear.className = "CardBirthYear"
    cardBirthYear.textContent = `Birth Year:   ${object.birthYear}`
    charCard.append(cardBirthYear)

    let cardGender = document.createElement('div')
    cardGender.className = "CardGender"
    cardGender.textContent = `Gender:   ${object.gender}`
    charCard.append(cardGender)

    let cardImage = document.createElement('img')
    cardImage.className = "CardImage"
    cardImage.src = object.image
    charCard.append(cardImage)

    let favoriteButton = document.createElement('button')
    favoriteButton.className = "FavButton"
    favoriteButton.textContent = '\u2661'
    favoriteButton.addEventListener('click', () => {
        favoriteCard(favoriteButton, object)
    })
    charCard.append(favoriteButton)

    let deleteButton = document.createElement('button')
    deleteButton.className = "DeleteButton"
    deleteButton.textContent = "X"
    deleteButton.addEventListener('click', () => {
        deleteCard(charCard)
        charCard.remove()
    })
    charCard.append(deleteButton)

    document.querySelector("#container").append(charCard)
}

function favoriteCard(button, object) {
    button.textContent = '\u2665'

    fetch("http://localhost:3000/characters", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(object)
    })
        .then(res => res.json())
        .then(json => {
            console.log(object)
            object.id = json.id
            console.log(object)
        })
}

function deleteCard(object) {
    let deleteId = object.id
    console.log(deleteId)
    fetch(`http://localhost:3000/characters/${deleteId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
}

function init() {
    renderForm()

}

init()