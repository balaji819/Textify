const countries =
{
    "am-ET": "Amharic", "ar-SA": "Arabic", "be-BY": "Bielarus", "bem-ZM": "Bemba", "bi-VU": "Bislama", "bjs-BB": "Bajan", "bn-IN": "Bengali", "bo-CN": "Tibetan", "br-FR": "Breton", "bs-BA": "Bosnian", "ca-ES": "Catalan", "cop-EG": "Coptic", "cs-CZ": "Czech", "cy-GB": "Welsh", "da-DK": "Danish", "dz-BT": "Dzongkha", "de-DE": "German", "dv-MV": "Maldivian", "el-GR": "Greek", "en-GB": "English", "es-ES": "Spanish", "et-EE": "Estonian", "eu-ES": "Basque", "fa-IR": "Persian", "fi-FI": "Finnish", "fn-FNG": "Fanagalo", "fo-FO": "Faroese", "fr-FR": "French", "gl-ES": "Galician", "gu-IN": "Gujarati", "ha-NE": "Hausa", "he-IL": "Hebrew", "hi-IN": "Hindi", "hr-HR": "Croatian", "hu-HU": "Hungarian", "id-ID": "Indonesian", "is-IS": "Icelandic", "it-IT": "Italian", "ja-JP": "Japanese", "kk-KZ": "Kazakh", "km-KM": "Khmer", "kn-IN": "Kannada", "ko-KR": "Korean", "ku-TR": "Kurdish", "ky-KG": "Kyrgyz", "la-VA": "Latin", "lo-LA": "Lao", "lv-LV": "Latvian", "men-SL": "Mende", "mg-MG": "Malagasy", "mi-NZ": "Maori", "ms-MY": "Malay", "mt-MT": "Maltese", "my-MM": "Burmese", "ne-NP": "Nepali", "niu-NU": "Niuean", "nl-NL": "Dutch", "no-NO": "Norwegian", "ny-MW": "Nyanja", "ur-PK": "Pakistani", "pau-PW": "Palauan", "pa-IN": "Panjabi", "ps-PK": "Pashto", "pis-SB": "Pijin", "pl-PL": "Polish", "pt-PT": "Portuguese", "rn-BI": "Kirundi", "ro-RO": "Romanian", "ru-RU": "Russian", "sg-CF": "Sango", "si-LK": "Sinhala", "sk-SK": "Slovak", "sm-WS": "Samoan", "sn-ZW": "Shona", "so-SO": "Somali", "sq-AL": "Albanian", "sr-RS": "Serbian", "sv-SE": "Swedish", "sw-SZ": "Swahili", "ta-LK": "Tamil", "te-IN": "Telugu", "tet-TL": "Tetum", "tg-TJ": "Tajik", "th-TH": "Thai", "ti-TI": "Tigrinya", "tk-TM": "Turkmen", "tl-PH": "Tagalog", "tn-BW": "Tswana", "to-TO": "Tongan", "tr-TR": "Turkish", "uk-UA": "Ukrainian", "uz-UZ": "Uzbek", "vi-VN": "Vietnamese", "wo-SN": "Wolof", "xh-ZA": "Xhosa", "yi-YD": "Yiddish", "zu-ZA": "Zulu"
}

const selecTag = document.querySelectorAll("select"), 
fromTxt = document.querySelector(".from-txt"), 
toTxt = document.querySelector(".to-text"), 
exchange = document.querySelector(".exchange"), 
transltebtn = document.querySelector("button"), 
icons = document.querySelectorAll(".row i");

selecTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        }
        else if (id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag
    }
});

exchange.addEventListener("click", () => {
    let temp = fromTxt.value;
    fromTxt.value = toTxt.value;
    toTxt.value = temp;
    let templang = selecTag[0].value;
    selecTag[0].value = selecTag[1].value;
    selecTag[1].value = templang;
});

transltebtn.addEventListener("click", () => {
    let text = fromTxt.value, translateFrom = selecTag[0].value,//getting fromselect tag value
        translateTo = selecTag[1].value; // getting toSelect tag value
    // console.log(text,translateFrom,translateTo);
    if (!text) return;
    toTxt.setAttribute("placeholder", "Translating....");
    let apiURL =
        `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;/* fetching api response and returning it with parsing into js obj
and in another then method receiving that obj */
    fetch(apiURL).then(res => res.json()).then(data => {
        //console.log(data);
        toTxt.value = data.responseData.translatedText;
        toTxt.setAttribute("placeholder", "Translation");
    });
});

/*icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-clipboard")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromTxt.value)
            }
            else {
                navigator.clipboard.writeText(toTxt.value)
            }
        }
    });
})*/

copy = (id)=>{
    if(id == 'from'){
        navigator.clipboard.writeText(fromTxt.value);
    }
    else {
        navigator.clipboard.writeText(toTxt.value);
    }
}