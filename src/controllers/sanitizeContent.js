module.exports = {
    async sanitize(content){
        const withoutBlankLines = removeBlankLines(content.content)

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
    }
}