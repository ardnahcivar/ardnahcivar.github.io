import Image from "next/image";

import BlogContainer from "../../../components/blog-container/blog-container";
import BlogHeader from "../../../components/blog-header/blog-header";
import BlogContent from "../../../components/blog-content/blog-content";
import CodeWrapper from "../../../components/code-wrapper/code-wrapper";
import styles from './../../index.module.css';

const title = `Creating a OTP Input component using Javascript, HTML and CSS`;
const date = `1698690600000`;
const codeRefUrl = `https://github.com/ardnahcivar/ardnahcivar.github.io/blob/master/code/otp-input/index.js`;

const code =                 
`<div class="otp-container">
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
`

const checkIsAlpha = 
`function checkIsAlpha(c){
    if(c === "") return true;
    
    let code = c.charCodeAt();
    
    if((code >= 65 && code <= 90) || (code >=97 && code <= 122)){
      return true;
    }
    
    return false;
  }
`

const eventListenerCode = 
`container.addEventListener('input', function(event) {
  const inputKey = "input"; 
  const value = event.target.value;
      
  if(checkIsAlpha(value)){
    event.preventDefault();
    event.target.value = "";
  }else if (event.target.tagName === inputKey.toUpperCase()){    
    let isLast = false;
    let currElem = event.target.parentElement;
    let nextElem = currElem.nextElementSibling;

    if(nextElem === null){
      isLast = true;
    }
	
    if(!isLast){
      let input = nextElem.querySelector('input');
        input.focus();
    }
  }
})
`

const cssStylingCode = 
`.otp-container{
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
`

const OtpInput = (props) => {
  return (
    <div>
      <BlogContainer>
        <BlogHeader title={title} date={date} />
        <BlogContent>
        <div>
          <p>
            Hello, you might have seen this input OTP component, which is used for
            SMS multifactor authentication whenever you login on various
            websites/applications.
            In this post, you will see how to create a basic OTP component using
            vanilla Javascript and HTML
          </p>
          
          <div>
            <Image
                  src={"/images/otp-component.png"}
                  width={"300px"}
                  height={"150px"}
                  alt={"First OTP input component picture"}
            />
            <Image
                  src={"/images/otp-component-1.png"}
                  width={"300px"}
                  height={"150px"}
                  alt={"Second OTP input component picture"}
            />
          </div>

          <p>
            We will be handling the following cases for the OTP input component.
          </p>
          <p>-It should accept only numerical values from 0 to 9.</p>
          <p>
            -Upon entering the number on the input box, the cursor should move on
            to the next input element.
          </p>
          <p>
            -Basic keyboard navigation should work, like moving back and forth via shift for forwards
            and moving back shift+tab.
          </p>
          <p>
            -We would be creating a basic OTP input component with focus on
            functionality rather than on the appearance i.e will use minimal
            css.
          </p>

          <br></br>
          <div>
            <p>The HTML markup that will be required will contain a container and will include four input boxes, and I will look like this</p>
            <CodeWrapper 
                code={code}
                lang={'html'}
            />
            <p>
              As you can see in the markup, we have create a container with class <code className={styles.codeHighlight}>otp-container</code>, which has four input elements
              which are responsible for accepting the numbers, since we want to enter only one number for individual input
              we have used property <code className={styles.codeHighlight}>size</code> and <code className={styles.codeHighlight}>maxlength</code> with its value as 1
            </p>

            <p>
              Here, as you can see , we haven't mentioned input <code className={styles.codeHighlight}>type</code> property, so by default input type value would be <code className={styles.codeHighlight}>text</code>
              But as we are going to input only numbers, we will be ignoring/removing the alphabet characters entered by the user, which 
              will be handled by the Javascript code. 
            </p>
          </div>

          <div>
            <p>
              As we want to accept the numbers from the users, we will be creating an event listener on the container
              which will listen/check for input events, and perform the required logic
            </p>
            <p>
              In this case we want to consider only valid numbers as an input, and ignore the alphabet characters,
              so we will write a function called <code className={styles.codeHighlight}>checkIsAlpha</code> which will take parameter which will be entered by user and return <code className={styles.codeHighlight}>true</code>
              if it is alphabet and <code className={styles.codeHighlight}>false</code>if its a number
            </p>
            <CodeWrapper 
              code={checkIsAlpha}
              lang={'javascript'}
            />
            <p>
              here in this function we are extracting the unicode value of the character entered, and checking whether its a alphabet 
              or not
            </p>
          </div>

          <div>
            <p>
              The Event Listener handler code for the input, would look like this
            </p>
            <CodeWrapper 
              code={eventListenerCode}
              lang={'javascript'}
            />
            <p>
              in this event listener handler code, we are using the entered text, and checking if its a alphabet or number
              if it is a alphabet, we are are ignoring it, and setting the input value as <code className={styles.codeHighlight}>""</code> empty string,
              and also if its a number, we are checking/confirming that the event that is triggered is from the input element
              and we are checking it via the <code className={styles.codeHighlight}>tagName</code> attribute
            </p>
            <p>
              Upon entering the number into the input box, we want to move the cursor to the next input element,
              for this we have created two variables <code className={styles.codeHighlight}>currElem</code> and <code className={styles.codeHighlight}>nextElem</code>, which are keeping track of the next input element
              and current one, if there exists an input elem, then we are moving the cursor to the next element via the <code className={styles.codeHighlight}>focus</code>method,
              if nextElem doesn't exists we have added a null check for that, and we can't move the cursor to the next input element
            </p>
          </div>
          <div>
            <p>We also added the basic styling which is required for the input element, which is mentioned below
              and upong adding the styling it looks like the OTP component which was shown at the begining

            </p>
            <CodeWrapper 
              code={cssStylingCode}
              lang={'css'}
            />
          </div>

          <br />
          <div>
            <p>you can find the whole code here below for reference <a href={codeRefUrl}>click here</a></p>
          </div>
        </div>
        </BlogContent>
      </BlogContainer>
    </div>
  );
};

export default OtpInput;
