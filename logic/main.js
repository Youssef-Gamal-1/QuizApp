function getData(){
    let myRequest = new XMLHttpRequest();

    myRequest.addEventListener('readystatechange',function(){
        if(this.readyState === 4 && this.status === 200) {
            let questionsObj = JSON.parse(this.responseText);
            console.log(questionsObj);
        }
    })

    myRequest.open("GET","data/questions.json",true);
    myRequest.send();
}
getData();