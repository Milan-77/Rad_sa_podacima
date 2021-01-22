fetch('quiz.json').then(function (response) {
    if (!response.ok) {
        throw Error("Error while reading file.");
    }
    return response.json();
    }).then(function (quiz) {
    var quiz =quiz.quiz;

    const quizEl = document.getElementById('quiz');
    let quizStr = '';
    let answerStr= '';
    for (var i in quiz) {

      //$counter = 0; 

        quiz[i].options.forEach(function(answer1, aIndex){  
         
          answerStr += `
            <li>
                <label>
                    <input
                      type="radio" 
                      name="answer-${[i]}"
                      data-correct=${quiz[i].answer === answer1}
                      value= ${aIndex}
                      >
                    ${answer1}
               
            </li>
           
           ` 
          
        })   
      
        quizStr += `
          <form>
              <h1>${quiz[i].question}</h1>
              <div class="alert"></div>
              <ul style="list-style: none">
              ${answerStr}
              </ul>
              <button type="submit">Submit</button>
              </form>
             `
       answerStr = ''; 
       
  }
     quizEl.innerHTML = quizStr;
     
     
     //localStorage.clear(); //clearing localstorage
     quizEl.addEventListener('submit', function(e) {
        e.preventDefault()
        const selectedInput = e.target.querySelector('input[type=radio]:checked');
        const alert = e.target.querySelector('div.alert');
        if (selectedInput === null) {
          alert.innerHTML = "Izaberite odgovor!!!"
        } else if (selectedInput.dataset.correct === "true") {
          alert.innerHTML = "Tačan odgovor"
        } else {
          alert.innerHTML = "Pogrešan odgovor,pokušajte ponovo"
        }
    
/****************** loadtoLocalStore ***************/
       const listaBtn = document.querySelectorAll('input');
       for (var x = 0; x < listaBtn.length; x++) {
       if (listaBtn[x] == selectedInput) {
         localStorage.setItem(x,x);                                                     
        
        }
       }
       
    })     
/****************** loadfromLocalStore ***************/
     //window.location.reload();
     function loadfromLocalStore() {
      const listaBtn1 = document.querySelectorAll('input');
      for (var j = 0; j < listaBtn1.length; j++) {
      for(var i = 0; i < localStorage.length; i++){

      var key = localStorage.key(i);
     
          if ([j] == key ){
          listaBtn1[j].checked = true;
          }
        }
      }
    }
     loadfromLocalStore();
   
}).catch(function (err) {
    console.log('Fetch problem: ' + err.message);
});



