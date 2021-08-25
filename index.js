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
                const swCharacter = normalizeData(json, newUrl)
                renderNormalizedSearch(swCharacter)                                
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
        likes: eachChar.likes || 0,
        id: eachChar.id,
        image: imageURL
    }
    return charObject
}
//AUTOMATICALLY RENDER FAVORITES
function renderFavoritesAuto() {
    fetch("http://localhost:3000/characters")
    .then(res => res.json())
    .then(characters => characters.forEach(eachFav => renderCard(eachFav, "#favoritesContainer")))
}

// RENDER PROCESS FOR SEARCHED CHARS
function renderNormalizedSearch(charObject) {
console.log(charObject)
fetch("http://localhost:3000/characters", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
},
body: JSON.stringify(charObject)
})
    .then(res => res.json())
    .then(temptStoreData => {
        renderCard(temptStoreData, "#favoritesContainer")
        deleteCard(temptStoreData)
    })
}

function renderInitChars(charObject) {
    charObject.likes = 0
    renderCard(charObject, "#initialRenderContainer")
}

/*
// RENDER PROCESS PLACES IN INITIAL CHARACTER RENDER DIV
function renderInitChars(charObject) {
    console.log(charObject)
    fetch("http://localhost:3000/characters", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(charObject)
    })
        .then(res => res.json())
        .then(temptStoreData => {
            renderCard(temptStoreData, "#initialRenderContainer")
            deleteCard(temptStoreData)
        })
}
*/
function renderCard(object, renderLocale) {
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
    favoriteButton.textContent = `\u2661: ${object.likes}`
    favoriteButton.addEventListener('click', () => {
        favoriteCard(favoriteButton, object)
    })
    charCard.append(favoriteButton)

    let deleteButton = document.createElement('button')
    deleteButton.className = "DeleteButton"
    deleteButton.textContent = "X"
    deleteButton.addEventListener('click', () => {
        deleteCard(object)
        charCard.remove()
    })
    charCard.append(deleteButton)

    document.querySelector(renderLocale).append(charCard)
}

function favoriteCard(button, object) {
    button.textContent = `\u2665: ${parseInt(object.likes)+1}`
    
    if (object.likes === 0){
        ++object.likes
        fetch("http://localhost:3000/characters", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(object)
    })
    }
    else {
        ++object.likes
        fetch(`http://localhost:3000/characters/${object.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",            
            },
            body: JSON.stringify({likes: object.likes})

        })
    }

}

function deleteCard(object) {
    let deleteId = object.id
    fetch(`http://localhost:3000/characters/${deleteId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
}

function renderPopChar() {
    const initialLoadChar = [
        {
            name: "luke skywalker",
            image: "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png"
        }, 
        {
            name: "han solo", 
            image: "https://upload.wikimedia.org/wikipedia/en/b/be/Han_Solo_depicted_in_promotional_image_for_Star_Wars_%281977%29.jpg"
        },
        {
            name: "leia", 
            image: "https://upload.wikimedia.org/wikipedia/en/1/1b/Princess_Leia%27s_characteristic_hairstyle.jpg"
        },
        {
            name: "chewbacca", 
            image: "https://cdn.europosters.eu/image/750/posters/star-wars-the-last-jedi-chewbacca-bowcaster-i50096.jpg"
        },
        {
            name: "darth maul",
            image: "https://i.pinimg.com/originals/5e/e0/de/5ee0de9ac416870fb7da5e384da4b323.jpg"
        },
        {
            name: "palpatine",
            image: "https://qph.fs.quoracdn.net/main-qimg-631a20284188008603ec6a4a82ad643d"
        },
        {
            name: "lando",
            image: "https://bamfstyle.com/wp-content/uploads/2019/05/lando-main1.jpg"
        },
        {
            name: "obi wan",
            image: "https://static.wikia.nocookie.net/starwars/images/4/4e/ObiWanHS-SWE.jpg/revision/latest?cb=20111115052816"
        }
    ]
    initialLoadChar.forEach(character => {
        fetch(`https://swapi.dev/api/people/?search=${character.name}`)
            .then(res => res.json())
            .then(json => {
                console.log(json, character.image)
                const initChars = normalizeData(json, character.image)
                renderInitChars(initChars)
            })
    })
    
}

function giveSeperatorsText(){
    document.querySelector("#myFavoritesDescrip").textContent = "My Favorited StarWars Characters: "
    document.querySelector("#myFavoritesDescrip").className = "descriptorPanel"


    document.querySelector("#popularCharactersDescrip").textContent = "Popular StarWars Characters: "
    document.querySelector("#popularCharactersDescrip").className = "descriptorPanel"

}


function init() {
    giveSeperatorsText()
    renderForm()
    renderFavoritesAuto()
    renderPopChar()
}

init()
