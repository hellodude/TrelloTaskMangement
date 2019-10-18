
let Boardid = "5d95b7fade237616f3e5cd1a"
let Listid = "5d95b7fade237616f3e5cd1b"
let cardid = "5d95c4fdce71ba6f5c823c8c"




document.body.style.backgroundColor = "lightgreen"

function showChekListItems(){
    
    fetch(`https://api.trello.com/1/cards/5d95c4fdce71ba6f5c823c8c/checklists?checkItems=all&checkItem_fields=name%2CnameData%2Cpos%2Cstate&filter=all&fields=all&key=9f149d15f153d53681302c25383f4daa&token=ce64125f487029996796e4c1954c143f4f26516b8dee958dede385fb2cb25dab`)

    .then(resp => resp.json())
    .then(post => {

        display(post)
    })
}
showChekListItems()






function display(post){
var divItemBox;
var newItemPara;


    post.forEach(checkList => {
        checkListFunction(checkList);
        

        checkList["checkItems"].forEach(item => {

            checkItemFunction(item);
        });

    });
}

var btn = document.querySelector('#AddCheckList')
var textField = document.querySelector('input')
document.body.appendChild(textField)
btn.addEventListener('click',newCheckList)



function newCheckList(){
    fetch(`https://api.trello.com/1/cards/5d95c4fdce71ba6f5c823c8c/checklists?name=${textField.value}&key=${key}&token=${token}`,{
        method:'POST'
    })
    .then(resp=>resp.json())
    .then(newCheck =>{

        var arr = []
        arr.push(newCheck)
        display(arr)
        
    
    })

}
var divBox;
var divItemBox;
function checkListFunction(checkList){
    divBox = document.createElement('div')
    divBox.setAttribute('id',checkList['id'] )
    let para = document.createElement('p')
    para.innerHTML = checkList['name']
    divBox.appendChild(para)
    document.body.appendChild(divBox);

    var deleteChecklistBtn = document.createElement('button')
    deleteChecklistBtn.setAttribute('class','btnDelete')
    deleteChecklistBtn.textContent = 'Delete CheckList'
    divBox.appendChild(deleteChecklistBtn)

    deleteChecklistBtn.addEventListener('click',event =>{
        console.log(event)
        var id = event.target.parentNode.id
        console.log(id)
        fetch(`https://api.trello.com/1/cards/${cardid}/checklists/${id}?key=${key}&token=${token}`,{method:"DELETE"})
        .then(resp => resp.json())
        .then(deleteList => {
                event.target.parentNode.remove();
        })
        
    
    });

    var addItemBtn = document.createElement('button')
    addItemBtn.textContent = 'Add Item'
    divBox.appendChild(addItemBtn)

    var inputItem = document.createElement('input')
    divBox.appendChild(inputItem)

    addItemBtn.addEventListener('click',event=>{
        var id = event.target.parentNode.id
        console.log(id)

        fetch(`https://api.trello.com/1/checklists/${id}/checkItems?name=${inputItem.value}&pos=bottom&checked=false&key=${key}&token=${token}`,{method:'POST'})
        .then(resp => resp.json())
        .then(newItem =>{
            
            const a=checkItemFunction(newItem);
            event.target.parentNode.appendChild(a)

           
        })
    })

}



function checkItemFunction(item){
    divItemBox = document.createElement('div')
    divItemBox.setAttribute('id',item['id'])

    var checkItemField = document.createElement('input')
    checkItemField.type = 'checkbox'
    //checkItemField.checked = false
    let para = document.createElement('p')
    para.appendChild(checkItemField)
    para.innerHTML = item['name']

    para.appendChild(checkItemField)
    divItemBox.appendChild(para)
    divBox.appendChild(divItemBox)
    document.body.appendChild(divBox);
    
    checkItemField.addEventListener('change',event=>{
        
        if(checkItemField.checked){
        para.innerHTML = item['name'].strike()
        para.appendChild(checkItemField)
        
        }else{
        para.innerHTML = item['name']
        para.appendChild(checkItemField)
        
        }
    
        
    })


    let itemDel = document.createElement('button')
    itemDel.textContent = 'Delete Item'
    
    divItemBox.appendChild(itemDel)
    
    itemDel.addEventListener('click',(event) =>{
                
        var checkListId=  event.target.parentNode.parentNode.id
        var itemId = event.target.parentNode.id
        console.log(checkListId)
        console.log(itemId)

        fetch(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${itemId}?key=${key}&token=${token}`,{method:'DELETE'})
        .then(resp => resp.json())
        .then(checkItem =>{
            event.target.parentNode.remove()
        })
        
    })

  return divItemBox
}

