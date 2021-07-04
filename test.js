const array = [
    '== title ==',
    '=== title2 ===',
    'lorem',
    '== title1 2 ==',
    '=== title2 2 ===',
    '======= ddd ========',
    'lorem2',
    '== title1 3 ==',
    '=== title2 3 ===',
    'lorem3',
    'lorem32',
    'lorem33'
]

function fetchSentences(array, startsWith){

    let indexTitles = []
    let allSentences = []

    array.forEach(e=>{
        if(e.startsWith(startsWith)){
            indexTitles.push(array.indexOf(e))
        }
    })

    indexTitles.forEach(t =>{
        const actualIndex = indexTitles.indexOf(t)
        const actualProperty = array[t]
        const nextIndex = actualIndex + 1
        let sentences = []

        const obj = {}
        obj.title = actualProperty
        
        if(indexTitles[nextIndex]){
            const nextProperty = array[indexTitles[nextIndex]]
            const nextPropertyIndexInArray = array.indexOf(nextProperty)
    
            for(let i = (t + 1); i < nextPropertyIndexInArray; i++){
                sentences.push(array[i])
            }
    
        }else{
            for(let i = (t + 1); i < array.length; i++){
                sentences.push(array[i])
            }
        }

        obj.sentences = sentences
        allSentences.push(obj)
        
    })

    return allSentences
}

const sectionsWithH1Only = fetchSentences(array, '== ')

sectionsWithH1Only.forEach(element => {
    const sectionsWithH2 = {}
    sectionsWithH2.sentences = fetchSentences(element.sentences, '===')
    const subSections = sectionsWithH2.sentences

    element.sentences = subSections
})

console.dir(sectionsWithH1Only, {depth: null})