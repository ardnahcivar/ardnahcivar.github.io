{/*

---HTML---
 <div class="otp-container">
  <div>
    <input class="otp" size="1" maxlength="1" />
  </div>
  <div>
    <input class="otp" size="1" maxlength="1" />
  </div>
  <div>
    <input class="otp" size="1" maxlength="1" />
  </div>
  <div>
    <input class="otp" size="1" maxlength="1" />
  </div>
</div>

---JAVASCRIPT---
let container = document.querySelector('.otp-container');

function checkIsAlpha(c){
	if(c === "") return true;
	let code = c.charCodeAt();
  if((code >= 65 && code <= 90) || (code >=97 && code <= 122)){
 		return true;
  }
  
  return false;
}

container.addEventListener('input', function(event) {
  const inputKey = "input"; 
  const value = event.target.value;
      
  	if(checkIsAlpha(value)){
 	    event.preventDefault();
      event.target.value = "";
}else if (event.target.tagName === inputKey.toUpperCase()) {    
    let isLast = false;
    let currElem = event.target.parentElement;
    let nextElem = currElem.nextElementSibling;

    if (nextElem === null) {
      isLast = true;
    }
	
    if (!isLast) {
        let input = nextElem.querySelector('input');
            input.focus();
        }
  }
})

---CSS---
.otp-container{
    display: flex;
  }
  
  .otp{
    width: 50px;
    height: 50px;
    font-size: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    text-align: center;
  } 

*/}