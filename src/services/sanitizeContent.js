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
        //ORGANIZE SECTIONS
        const organizedContent = fetchSentences(withoutBlankLines, '== ')

        //ORGANIZE SUB_SECTIONS
        organizedContent.forEach(element => {

            if(element.sentences.find(s => s != undefined && s.startsWith('=') )){
                const sectionsWithH2 = {}
                sectionsWithH2.sentences = fetchSentences(element.sentences, '===')
                const subSections = sectionsWithH2.sentences
        
                element.sentences = subSections
            }
        })

        function fetchSentences(array, startsWith){

            let indexTitles = []
            let allSentences = []
        
            //INSERT TITLE INDICES INTO indexTitles========================================
            array.forEach(e=>{
                if( e != undefined && e.startsWith(startsWith) ){
                    indexTitles.push(array.indexOf(e))
                }
            })
        

            //ORGANIZE CONTENT=============================================================
            indexTitles.forEach(t =>{
                const actualIndex = indexTitles.indexOf(t)
                const actualProperty = array[t]
                const nextIndex = actualIndex + 1
                let sentences = []
        
                //OBJECT OF THIS SECTION====================================================
                const obj = {}
                obj.title = actualProperty
                
                //INSERT SETENCES BETWEEN THE TWO TITLES INTO sentences array===============
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
        
                //INSERT sentences INTO obj
                obj.sentences = sentences

                allSentences.push(obj)
            })
        
            return allSentences
        }

        return organizedContent
    }
}