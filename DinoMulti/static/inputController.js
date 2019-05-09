var keyStates = {
    "w": false,
};

function setState(key, toSet){
    if(keyStates[key] !== toSet){
        keyStates[key] = toSet;
    }
}

function handleEvent(event, toSet){
    if(event.key === "w" || event.key === "ArrowUp"){
        setState("w", toSet);
    }else if(event.key === "Space"){
        setState("w", toSet);
    }
}

document.addEventListener("keydown", function (event) {
    handleEvent(event, true);
});

document.addEventListener("keyup", function (event) {
    handleEvent(event, false);
});
