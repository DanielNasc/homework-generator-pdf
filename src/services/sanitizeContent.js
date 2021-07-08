module.exports = {
    async removeBlankLines(content){
        const withoutBlankLines = removeBlankLines(content)

        function removeBlankLines(text){
            const lines = text.split('\n')

            const withoutBlankLines = lines.filter(line => {

                if(line.trim().length == 0){
                    return false
                }
                return true
            })
            
            return withoutBlankLines
        }

        return withoutBlankLines
        
    },
    organizeInArray(withoutBlankLines){
        const organizedContent = fetchSentences(withoutBlankLines, '== ')

        organizedContent.forEach(element => {

            if(element.sentences.find(s => s.startsWith('='))){
                const sectionsWithH2 = {}
                sectionsWithH2.sentences = fetchSentences(element.sentences, '===')
                const subSections = sectionsWithH2.sentences
        
                element.sentences = subSections
            }else{
                element.sentences = element.sentences
            }
            
        })

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
                    const nextPropertyIndexInMainArray = indexTitles[nextIndex]
            
                    for(let i = (t + 1); i < nextPropertyIndexInMainArray; i++){
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

        return organizedContent
    }
}