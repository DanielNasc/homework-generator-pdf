function showgif(){
    const sectionGif = document.querySelector('.gif')
    const gifClassList = sectionGif.classList
    
    if(gifClassList.contains('hidden')){
        gifClassList.remove('hidden')
    }
}