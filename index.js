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
        console.log(event)
        inputForm.reset();

    })
}



function getCharsFromSwapi(){
    fetch('https://swapi.dev/api/people/1')
    .then((resp) => resp.json())
    .then(swapiChar => normalizeData(swapiChar, "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png"))
}

function normalizeData(eachChar, imageURL){
    let charObject = {
        name: eachChar.name,
        height: eachChar.height,
        mass: eachChar.mass,
        hairColor: eachChar.hair_color,
        skinColor: eachChar.skin_color,
        eyeColor: eachChar.eye_color,
        birthYear: eachChar.birth_year,
        gender: eachChar.gender,
        image: imageURL

    }
    console.log(charObject)

}

getCharsFromSwapi();

function init() {
    renderForm()

}

init()