function handleOp(curId){
    let prevVal = document.getElementById("inputId").value;
    let curVal = document.getElementById(curId).value;
    document.getElementById("inputId").value = prevVal + curVal;
}
function clear(){
    document.getElementById("inputId").value = '';
}
function calculate(){
    const inputStr = document.getElementById("inputId").value;
    const mainInput = inputStr.split(" ").join(""); 
    const postfixExp = calPostFix(mainInput);
    //alert(postfixExp);
    const ans = evalPostFix(postfixExp);
    //alert(ans);
    document.getElementById("inputId").value = ans;
}
function evalPostFix(str){
    let stack = [];
    let temp = 0;
    for(let i = 0; i < str.length; i++){
        if(isNum(str[i])){
            stack.push(str[i]);
        }
        else{
            const secondNum = stack.pop();
            const firstNum = stack.pop();
            if(str[i] == '+'){
                temp = parseInt(firstNum) + parseInt(secondNum);
            }
            if(str[i] == '/'){
                temp = parseInt(firstNum) / parseInt(secondNum);
            }
            if(str[i] == '*'){
                temp = parseInt(firstNum) * parseInt(secondNum);
            }
            if(str[i] == '-'){
                temp = parseInt(firstNum) - parseInt(secondNum);
            }
            stack.push(temp);
        }
    }
    return temp;
}
function getPrecedence(chr){
    if(chr == '-' || chr == '+'){
        return 1;
    }
    if(chr == '*' || chr == '/'){
        return 2;
    }
    return 0;
}
function isNum(cur){
    if(cur != '+' && cur != '-' && cur != '*' && cur != '/'){
        return true;
    }
    return false;
}
function calPostFix(str){
    let stack = [];
    let ans = "";
    for(let i = 0; i < str.length; i++){
        if(isNum(str[i])){
            ans += str[i];
        }
        else{
            if(stack.length == 0){
                stack.push(str[i]);
            }
            else{
                if(getPrecedence(stack[stack.length-1]) >= getPrecedence(str[i])){
                    ans += stack.pop();
                }
                stack.push(str[i]);
            }
        }
    }
    while(stack.length > 0) {
        ans += stack.pop();
    }
    return ans;
}
