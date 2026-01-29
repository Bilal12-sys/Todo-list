    let input = document.getElementById("inp");
let ul = document.getElementById("ul");

function addTodo() {
    let value = input.value.trim();
    if (value === "") return;

    let li = document.createElement("li");
    li.textContent = value;


    let delBtn = document.createElement("button");
    delBtn.textContent = "x";
    delBtn.onclick = function() {
        ul.removeChild(li);
    };

    li.appendChild(delBtn);
    ul.appendChild(li);
    input.value = "";
  
    after()
    
}

function deleteAll() {
    ul.innerHTML = "";
}
