function getCharsFromSwapi(){
    fetch('https://swapi.dev/api/people/1')
    .then((resp) => resp.json())
    .then(swapiChar => normalizeData(swapiChar))
}

function normalizeData(eachChar){
    let charObject = {
        name: eachChar.name,
        height: eachChar.height,
        mass: eachChar.mass,
        hairColor: eachChar.hair_color,
        skinColor: eachChar.skin_color,
        eyeColor: eachChar.eye_color,
        birthYear: eachChar.birth_year,
        gender: eachChar.gender

    }
    console.log(charObject)

}

getCharsFromSwapi();