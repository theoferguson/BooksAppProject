function renderForm() {
    const inputForm = document.createElement("form")
    inputForm.innerHTML =
        '<label for="searchByCharName">Search for SW Characters</label> ' +
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
    cardName.textContent = object.name
    charCard.append(cardName)

    let cardHeight = document.createElement('div')
    cardHeight.textContent = object.height
    charCard.append(cardHeight)

    let cardMass = document.createElement('div')
    cardMass.textContent = object.mass
    charCard.append(cardMass)

    let cardHairColor = document.createElement('div')
    cardHairColor.textContent = object.hairColor
    charCard.append(cardHairColor)

    let cardSkinColor = document.createElement('div')
    cardSkinColor.textContent = object.skinColor
    charCard.append(cardSkinColor)

    let cardEyeColor = document.createElement('div')
    cardEyeColor.textContent = object.eyeColor
    charCard.append(cardEyeColor)

    let cardBirthYear = document.createElement('div')
    cardBirthYear.textContent = object.birthYear
    charCard.append(cardBirthYear)

    let cardGender = document.createElement('div')
    cardGender.textContent = object.gender
    charCard.append(cardGender)

    let cardImage = document.createElement('img')
    cardImage.src = object.image
    charCard.append(cardImage)

    document.querySelector("#container").append(charCard)
}

function init() {
    renderForm()

}

init()