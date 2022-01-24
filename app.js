function operate(operator, a, b) {
    let result = 0;
    switch (operator) {
        case '+': 
            result = a + b;
            break;
        case '-': 
            result = a-b; 
            break;
        case '/':
            result = a/b;
            break;
        case '*': 
            result =  a*b;
            break;
        default: 
            break;
    }

    if(operator=="/" && b==0) return "Error - Division by 0";
    return String(Number(result.toFixed(2))).replace('-','~');

}


function operateScreen(screenText) {
    const symbol = screenText.match(/[^\d\.~]/);
    const numbers = screenText.split(symbol);
    const isValidOperation = symbol && numbers.length==2;
    if(isValidOperation) {
        return operate(symbol[0],Number(numbers[0].replace('~','-')),Number(numbers[1].replace('~','-')));
    }
    
}

function backHandler() {
    display.textContent = display.textContent.substring(0, display.textContent.length-1); 
}

function numbersHandler(event) {
    
    display.textContent += event.type=='click'?event.target.textContent:event.key;
}

function eraseHandler() {
    display.textContent = "";
}


function operatorsHandler(event) {
    if(!/[^\d\.~]/.test(display.textContent) && display.textContent) {
        numbersHandler(event);
    } else if (display.textContent){
        const oper = event.type=='click'?event.target.textContent:event.key;
        display.textContent = operateScreen(display.textContent) + oper;
    }
}

function equalsHandler() {
    const result = operateScreen(display.textContent);
    if(result) display.textContent = result;
}

function pointHandler(event) {
    const symbol = display.textContent.match(/[^\d\.~]/);
    const numbers = display.textContent.split(symbol);
    if(!numbers[numbers.length-1].includes('.') && numbers[numbers.length-1]) numbersHandler(event);
}

function minusHandler(event) {
    const symbol = display.textContent.match(/[^\d\.~]/);
    const numbers = display.textContent.split(symbol);
    if(!numbers[numbers.length-1].includes('~')) numbersHandler(event);
}


const display = document.querySelector('#display');
const btns = document.querySelectorAll('.btn');


btns.forEach(btn=>{
    if(/\d/.test(btn.textContent)) {
        btn.addEventListener('click',numbersHandler);
    } else if(btn.textContent==".") {
        btn.addEventListener('click',pointHandler);
    } else if(btn.textContent=="ca") {
        btn.addEventListener('click',eraseHandler);
    } else if(btn.textContent=="c") {
        btn.addEventListener('click',backHandler);
    } else if(btn.textContent=="=") {
        btn.addEventListener('click',equalsHandler);
    }else if(btn.textContent=='~') {
        btn.addEventListener('click',minusHandler);
    } else {
        btn.addEventListener('click',operatorsHandler);
    }
});

document.addEventListener('keydown', (e) => {
        if(/\d/.test(e.key)) {
            numbersHandler(e);
            document.querySelector('button[data-text="'+e.key+'"]').className="btn btn-clicked"
        } else if(e.key==".") {
            pointHandler(e);
            document.querySelector('button[data-text="'+e.key+'"]').className="btn btn-clicked"
        } else if(e.key=="c") {
            eraseHandler();
            document.querySelector('button[data-text="'+e.key+'"]').className="btn btn-clicked"
        } else if(e.key=="Backspace") {
            backHandler();
            document.querySelector('button[data-text="ca"]').className="btn btn-clicked"
        } else if(e.key=="Enter") {
            equalsHandler();
            document.querySelector('button[data-text="="]').className="btn btn-clicked"
        } else if(e.key=='+'||e.key=='-'||e.key=='/'||e.key=='*') {
            operatorsHandler(e);
            document.querySelector('button[data-text="'+e.key+'"]').className="btn btn-clicked"
        }
    }
)

document.addEventListener('keyup', (e) => {

    if(/\d/.test(e.key)) {
        document.querySelector('button[data-text="'+e.key+'"]').className="btn"
    } else if(e.key==".") {
        document.querySelector('button[data-text="'+e.key+'"]').className="btn"
    } else if(e.key=="c") {
        document.querySelector('button[data-text="'+e.key+'"]').className="btn"
    } else if(e.key=="Backspace") {
        document.querySelector('button[data-text="ca"]').className="btn"
    } else if(e.key=="Enter") {
        document.querySelector('button[data-text="="]').className="btn"
    } else if(e.key=='+'||e.key=='-'||e.key=='/'||e.key=='*') {
        document.querySelector('button[data-text="'+e.key+'"]').className="btn"
    }
}
)