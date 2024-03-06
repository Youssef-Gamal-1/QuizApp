// Select Elements
const countSpan = document.querySelector('.quiz-info .count span');
const bulletSpanContainer = document.querySelector('.spans');
function getData(){
    let myRequest = new XMLHttpRequest();

    myRequest.addEventListener('readystatechange',function(){
        if(this.readyState === 4 && this.status === 200) {
            let questionsObj = JSON.parse(this.responseText);
            let questionsCount = questionsObj.length;

            // create bullets + set questions count
            createBullets(questionsCount);
        }
    })

    myRequest.open("GET","data/questions.json",true);
    myRequest.send();
}
getData();

function createBullets(num) {
    countSpan.textContent = num;

    for(let i = 0;i < num;i++){
        let bullet = document.createElement('span');
        i === 0 ? bullet.className = 'on' : '';
        bulletSpanContainer.appendChild(bullet);
    }
}