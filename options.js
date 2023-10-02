//we manage options selection

const activeCellElement = document.getElementById("active-cell");
const textAlignElements = document.getElementsByClassName("text-align");
const boldBtn = document.getElementById("bold");
const italicBtn = document.getElementById("italic");
const underlinedBtn = document.getElementById("underlined");


//activeCell defines which cell is selected / active
let activeCell = null; //initially null because no cell is selected


const defaultOptionsState = {
    fontFamily: "",
    isBoldSelected: false,
    isItalicSelected: false,
    isUnderLineSelected: false,
    textAlign: 'start',
    textColor: "#000",
    backgroundColor: "#fff",
    fontSize: 14,
};

let activeOptionsState ;
function toggleButtonStyle(button,isSelected) {
    if(isSelected){
        button.classList.add("active-option");
    }else{
        button.classList.remove("active-option");
    }
    
}

function highlightOptionBtnOnFocus() {
    //check if the cell is bold state or not
   /* if(activeOptionsState.isBoldSelected && !boldBtn.classList.contains("active-option")){
        //currently in the bold state
        
            boldBtn.classList.add("active-option");
        
    }else{
        boldBtn.classList.remove("active-option");
    }*/

    toggleButtonStyle(boldBtn,activeOptionsState.isBoldSelected);
    //check if the italic is selected
    /*if(activeOptionsState.isItalicSelected && !italicBtn.classList.contains("active-option")){
        italicBtn.classList.add("active-option");
    }else{
        italicBtn.classList.remove("active-option");
    }*/
    toggleButtonStyle(italicBtn,activeOptionsState.isItalicSelected);
    //for underline
    /*if(activeOptionsState.isUnderLineSelected && !underlinedBtn.classList.contains("active-option")){
        underlinedBtn.classList.add("active-option");
    }else{
        underlinedBtn.classList.remove("active-option");
    }*/
    toggleButtonStyle(underlinedBtn,activeOptionsState.isUnderLineSelected);
    //get text align value
    highlightTextAlignBtns(activeOptionsState.textAlign);
    
}
//below function is triggered whenever the cell is focused
function onCellFocus(e){
    //whenever a cell is focused change the activeCell value = id of cell
    if(activeCell && activeCell.id===e.target.id){
        return;
    }
    activeCell= e.target;
    activeCellElement.innerText = activeCell.id;
    const computedStyle = getComputedStyle(activeCell);
    activeOptionsState = {
      fontFamily: computedStyle.fontFamily,
      isBoldSelected: computedStyle.fontWeight === "600",
      isItalicSelected: computedStyle.fontStyle === "italic",
      isUnderLineSelected: computedStyle.textDecoration.includes("underline"),
      textAlign: computedStyle.textAlign,
      textColor: computedStyle.color,
      backgroundColor: computedStyle.backgroundColor,
      fontSize: computedStyle.fontSize,
    };
    highlightOptionBtnOnFocus();
}

function onClickBold(boldButton){
    //this function will be triggered when click on blod btn
boldButton.classList.toggle("active-option");//toggle active-option class for btn

if(activeCell){
activeOptionsState
    if(activeOptionsState.isBoldSelected=== false){
        //make bold
        activeCell.style.fontWeight ="600";
       

    }else{
        //make normal
        activeCell.style.fontWeight ="400";
        
    }
    activeOptionsState.isBoldSelected = !activeOptionsState.isBoldSelected;
}

}

function onClickItalic(italicButton){
    italicButton.classList.toggle("active-option");//toggle active-option class for btn

    if(activeCell){
    activeOptionsState
        if(activeOptionsState.isItalicSelected){
    //text already italic
            activeCell.style.fontStyle ="normal";
    
        }else{
           
            activeCell.style.fontStyle ="italic";
           
        }
        activeOptionsState.isItalicSelected = !activeOptionsState.isItalicSelected;
    }
}

function onClickUnderlined(underlinedButton){
    underlinedButton.classList.toggle("active-option");//toggle active-option class for btn

    if(activeCell){
    activeOptionsState
        if(activeOptionsState.isUnderLineSelected){
    //text already underline
            activeCell.style.textDecoration ="none";
            
    
        }else{
            
            activeCell.style.textDecoration ="underline";
           
        }
        activeOptionsState.isUnderLineSelected=!activeOptionsState.isUnderLineSelected
    }
}

function highlightTextAlignBtns(textAlignValue){
    //textAlignVAlue==="left" ->highlight left btn
    //textAlignVAlue==="center" ->highlight center btn
    //textAlignVAlue==="right" ->highlight right btn
  

    for(let i=0;i<textAlignElements.length;i++){
        if(textAlignElements[i].getAttribute("data-value")=== textAlignValue){
            textAlignElements[i].classList.add("active-option");
        }else{
            textAlignElements[i].classList.remove("active-option");
        }
    }
}

function onClickTextAlign(textAlignBtn){
   let selectedValue = textAlignBtn.getAttribute("data-value");
    highlightTextAlignBtns(selectedValue);

    if(activeCell){
        activeCell.style.textAlign = selectedValue;
        activeOptionsState.textAlign = selectedValue;
    }
}

function onChangeTextColor(textCOlorInput){
    let selectedColor = textCOlorInput.value;
    if(activeCell){
        activeCell.style.color = selectedColor;
        activeOptionsState.color= selectedColor;
    }
}

function onChangeBackgroundColor(backgroundColorInput){
    let selectedColor = backgroundColorInput.value;
    if(activeCell){
        activeCell.style.backgroundColor = selectedColor;
        activeOptionsState.backgroundColor= selectedColor;
    }
}

// Add Font Size Functionality
function onChangeFontSize(fontSizeInput) {
    let selectedSize = fontSizeInput.value;
    if (activeCell) {
        activeCell.style.fontSize = selectedSize;
        activeOptionsState.fontSize = selectedSize;
    }
}

// Add Copy Functionality
function onCopy() {
    if (activeCell) {
        const textToCopy = activeCell.innerText;
        navigator.clipboard.writeText(textToCopy).then(function () {
            console.log('Text copied to clipboard');
        }).catch(function (err) {
            console.error('Unable to copy text: ', err);
        });
    }
}

// Add Cut Functionality
function onCut() {
    if (activeCell) {
        const textToCut = activeCell.innerText;
        navigator.clipboard.writeText(textToCut).then(function () {
            activeCell.innerText = '';
            console.log('Text cut and copied to clipboard');
        }).catch(function (err) {
            console.error('Unable to cut text: ', err);
        });
    }
}

// Add Paste Functionality
function onPaste() {
    if (activeCell) {
        navigator.clipboard.readText().then(function(text) {
            activeCell.innerText = text;
            console.log('Text pasted from clipboard');
        }).catch(function(err) {
            console.error('Unable to paste text: ', err);
        });
    }
}

// Initialize default font style and font size
let defaultFontStyle = "Monospace";
let defaultFontSize = "14px";

function applyFontStyleAndSize(cell, fontStyle, fontSize) {
    cell.style.fontFamily = fontStyle;
    cell.style.fontSize = fontSize;
}

function onChangeFontSize(fontSizeInput) {
    let selectedFontSize = fontSizeInput.value;
    if (activeCell) {
        applyFontStyleAndSize(activeCell, activeOptionsState.fontFamily, selectedFontSize);
        activeOptionsState.fontSize = selectedFontSize;
    }
}

function loadGoogleFonts(fontName, fontStyle) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css?family=${fontName.replace(
        /\s+/g,
        "+"
    )}:${fontStyle}`;
    document.head.appendChild(link);
}

function onChangeFontStyle(fontDropdown) {
    const selectedFont = fontDropdown.value;

    if (activeCell) {
        activeCell.style.fontFamily = selectedFont;
        activeOptionsState.fontFamily = selectedFont;

        // Load the selected Google Font dynamically with a default font style of "regular"
        loadGoogleFonts(selectedFont, "regular");
    }
}

// Add event listeners for font size, copy, cut, and paste
document.getElementById("font-size").addEventListener("change", function() {
    onChangeFontSize(this);
});

document.getElementById("copy-btn").addEventListener("click", onCopy);
document.getElementById("cut-btn").addEventListener("click", onCut);
document.getElementById("paste-btn").addEventListener("click", onPaste);