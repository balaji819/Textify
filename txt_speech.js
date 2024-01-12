let speech = new SpeechSynthesisUtterance();
let voices = [],content;
let voiceselect = document.querySelector('select');

document.querySelector('button').addEventListener('click',() => {
    speech.text = content;
    window.speechSynthesis.speak(speech)
}) 

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];
    voices.forEach((voice, i)=>{
        voiceselect.options[i]= new Option(voice.name,i)
    })
}

voiceselect.addEventListener('change',()=>{
    speech.voice=voices[voiceselect.value];
})

uploadimage = () => {
    let input = document.getElementById('upload');
    document.getElementById('upload-label').innerHTML = input.files[0]['name'];
    let filereader = new FileReader();
    filereader.readAsText(input.files[0]);
    filereader.onload = function(){
        content = filereader.result;
        document.querySelector('textarea').innerHTML = filereader.result;
    }
}