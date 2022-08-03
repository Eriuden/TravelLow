export const dateParser = (num) => {
    let options = {hour: "2-digit", minute:"2-digit", second:"2-digit", 
    weekday: "long", year:"numeric", month:"short", day:"numeric"}

    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

    return date.toString()
}

//Ces éléments nous serviront dès qu'on aura besoin de mettre une date au format habituel
//Pour isEmpty, c'est dès lors qu'une valeur potentiel est vide, comme un post sans vidéo ou image

export const timeStampParser = (num) => {
    let options = {
    hour: "2-digit", 
    minute:"2-digit", 
    second:"2-digit", 
    weekday: "long", 
    year:"numeric", 
    month:"short", 
    day:"numeric"
}

    let date = new Date(num).toLocaleDateString("fr-FR", options)

    return date.toString()
}

export const isEmpty = (value) => {
    return value === undefined ||
     value === null || 
     (typeof value === "object" && Object.keys(value).length ===0) || 
     (typeof value === "string" && value.trim().length === 0)
}