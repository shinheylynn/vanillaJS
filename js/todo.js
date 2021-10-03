const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id)); /// 클릭된 li의 id를 제외한 나머지는 유지하고 싶을 때 사용하는 함수
    /// li.id 는 string, toDo.id는 number이기 때문에 타입을 맞춰줘야 위 함수가 정상작동함 (typeof으로 확인 가능)
    saveToDos(); ///얘를 호출해줘야 삭제하고 남은 saveToDos의 localStorage 데이터를 가져와줌. 새로고침해도 삭제된 것을 반영해준다.
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌"
    button.addEventListener("click", deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    }
    toDos.push(newTodoObj); /// 빈 리스트 toDos에 newTodoObj 값들을 리스트 형식으로 추가해줌
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos); /// string을 java가 이해할 수 있는 array 형식으로 변환
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}


/// (1) (item) => console.log("this is the turn of ", item)
/// (2) function sayHello(item){
///         console.log("this is the turn of ", item)
///     }
/// 2가지 방법은 동일한 내용임