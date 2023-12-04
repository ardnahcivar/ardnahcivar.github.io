import BlogContainer from "../../../components/blog-container/blog-container";
import BlogContent from "../../../components/blog-content/blog-content";
import BlogHeader from "../../../components/blog-header/blog-header";
import CodeWrapper from "../../../components/code-wrapper/code-wrapper";

import styles from "./../../index.module.css";

const title = "Create your own DOM API implementation";
const date = "1701585924844";
const JS = "javascript";
const HTML = "html";
const codeRefUrl = `https://github.com/ardnahcivar/ardnahcivar.github.io/blob/master/code/create-your-own-dom/index.js`;
const vDomExampleCode = `   let vDoc = new VDocument()

    let body = vDoc.createElement('body');
    let div = vDoc.createElement('div');

    div.innerHTML = 'Hello, I am Custom Element';

    body.appendChild(div)

    vDoc.appendChild(body);

    vDoc.render()
`;

const vDomExampleCodeOutput = `<html><body><div>Hello, I am Custom Element</div></body></html>`;

const vDomFunctionStructure = `function VDocument(){
  this.dom = {};

  this.createElement = function(type){
     //TODO
  }

  this.appendChild = function(elem){
      //TODO
  }

  this.render = function(){
     //TODO
  }
}
`;

const vDomCreateElement = `this.dom = createElementObj('html');

function createElementObj(type){
    
    let elemObj = {
        'type': type,
        'children': [],
        appendChild: function(elem){
            this.children.push(elem)
        },
        set innerHTML(val){
            this.content = val;
        }
    }

    return elemObj;
`;

const vDomFunctions = `
this.createElement = function(type){
  let elem = createElementObj(type)
  return elem;
}

this.appendChild = function(elem){
  this.dom.children.push(elem)
}

this.render = function(){
  return convertDomToString(this.dom,'')
}

function convertDomToString(domNode){
  let childNodes = domNode.children;

  if(childNodes && childNodes.length > 0){
      let temp = [];
      for(let i = 0; i < childNodes.length; i++){
          let currNode = childNodes[i];

          let r = convertDomToString(currNode);
          temp.push(r)
      }
      
      return @<#{domNode.type}>#{temp.join('')}</#{domNode.type}>@;
  }else{
      let temp = @<#{domNode.type}>#{domNode.content || ''}</#{domNode.type}>@;
      return temp;
  }
}
`
  .replaceAll("@", "`")
  .replaceAll("#", "$");

const vDomExample = `
let vDoc = new VDocument()

let body = vDoc.createElement('body');
let div = vDoc.createElement('div');

div.innerHTML = 'Hello, I am div Element';

let div1 = vDoc.createElement('div');

div1.innerHTML = 'Hello, I am div Element 1';

let div1Child = vDoc.createElement('div');

div1Child.innerHTML = 'Hello, I am div Element 1 Child';

let footer = vDoc.createElement('footer')

let span1 = vDoc.createElement('span')
span1.innerHTML = 'span1'
let span2 = vDoc.createElement('span')
span2.innerHTML = 'span2'
let span3 = vDoc.createElement('span')
span3.innerHTML = 'span3'

footer.appendChild(span1)
footer.appendChild(span2)
footer.appendChild(span3)


body.appendChild(div)

vDoc.appendChild(body);

div1.appendChild(div1Child)

body.appendChild(div1)
body.appendChild(footer)

vDoc.render()
`;

const vDomExampleOuput = `<html>
  <body>
    <div>Hello, I am div Element</div><div><div>Hello, I am div Element 2 Child</div>
    </div>
    <footer><span>span1</span><span>span2</span><span>span3</span></footer>
  </body>
</html>
`;
const CreateYourOwnDom = () => {
  return (
    <div>
      <BlogContainer>
        <BlogHeader title={title} date={date} />
        <BlogContent>
          <div>
            <div>
              <p>Hello, I hope you are doing good</p>
              <p>
                In this post, we are going to implement a simple implementation
                of the DOM api
              </p>
              <p>
                As we are aware that the visual elements that we see on the UI,
                is represented by DOM nodes in tree structure, and the browser
                provides the capability to manipulate the DOM tree via api
                through a object called as{" "}
                <code className={styles.codeHighlight}>document</code>
                this object contains multiple methods and properties which helps
                us do various things like dynamically adding elements, updating
                the styles etc.
              </p>
              <p>
                Here we are going to create our own implementation of DOM API
                with couple of methods like{" "}
                <code className={styles.codeHighlight}>createElement</code>,
                <code className={styles.codeHighlight}>appendChild</code>,
                <code className={styles.codeHighlight}>render</code> and a
                property called as{" "}
                <code className={styles.codeHighlight}>innerHTML</code>
              </p>
              <p>It will look like this</p>
              <CodeWrapper code={vDomExampleCode} lang={JS} />
              <p>
                and upon executing the{" "}
                <code className={styles.codeHighlight}>render</code> method it
                should generate a string that woud look like
                <CodeWrapper code={vDomExampleCodeOutput} lang={HTML} />
              </p>
              <p>which resembles the DOM tree structure</p>
            </div>
            <div>
              <p>
                In order to implement this behavior, we would create a function{" "}
                <code className={styles.codeHighlight}>VDocument</code>
                which would be responsible for creating the document object
                similar to what we have on the browser, and will be having
                methods{" "}
                <code className={styles.codeHighlight}>createElement</code>,
                <code className={styles.codeHighlight}>appendChild</code>,
                <code className={styles.codeHighlight}>render</code> and a
                property called as{" "}
                <code className={styles.codeHighlight}>innerHTML</code>
              </p>
              <CodeWrapper code={vDomFunctionStructure} lang={JS} />
              <p>
                we are storing the DOM nodes, in a variable called{" "}
                <code className={styles.codeHighlight}>dom</code>
                which is currently initialized to empty object, but will later
                update it with new value, and have defined methods on it, where
                the createElement will be responsible for createing a DOM node
                of a given type, appendChild function will enable us to insert
                multiple node as child nodes as required to a node, whereas the
                render method will take the DOM tree and will return a string
                representation which will look like HTML markup.
              </p>
              <p>
                On every DOM node, there are multiple properties and methods are
                present , depending on the type of DOM node, for simplicity we
                will create a node which will have property like{" "}
                <code className={styles.codeHighlight}>type</code>
                which will tell us what kind of node it is, whether it is span,
                div, section, footer etc, as each node can have multiple child
                nodes, we will create a property called{" "}
                <code className={styles.codeHighlight}>children</code> for it
                ,and its value will be an array, and final property would be{" "}
                <code className={styles.codeHighlight}>innerHTML</code> which
                will have its content as a text value and for creating a node
                element, we will create a function{" "}
                <code className={styles.codeHighlight}>createElementObj</code>
                which will look like this, also since our end result, which will
                be generated via the{" "}
                <code className={styles.codeHighlight}>render</code>
                method will html markup in string representation, we know that
                the first node of the markup will be the{" "}
                <code className={styles.codeHighlight}>html</code>
                tag, and it will have other nodes like body, head etc as it
                child nodes, so will update the initial value of{" "}
                <code className={styles.codeHighlight}>dom</code>
                to the <code className={styles.codeHighlight}>html</code> node,
                so that later new nodes can be appended to it, and the code will
                look like this
              </p>
              <CodeWrapper code={vDomCreateElement} lang={JS} />
              <p>
                here in this code block we have defined{" "}
                <code className={styles.codeHighlight}>appendChild</code> method
                as well, which will be appending new child nodes to nodes, and
                will be stored in children array, and we have added a setter
                method <code className={styles.codeHighlight}>innerHTML</code>{" "}
                which will store the value passed into the content variable
              </p>
              <p>
                Now we are going to the complete the functions that we have
                defined earlier,
                <code className={styles.codeHighlight}>createElement</code>{" "}
                function will create a node of a given type by calling the
                function that we have created{" "}
                <code className={styles.codeHighlight}>createElementObj</code>
                and will return the newly created dom node, the{" "}
                <code className={styles.codeHighlight}>appendChild</code>{" "}
                function will append the passed element to a dom element, and
                the <code className={styles.codeHighlight}>render</code>{" "}
                function will convert the dom tree into string, for doing we
                create a utility function{" "}
                <code className={styles.codeHighlight}>convertDomToString</code>
                which will take parent dom node as a parameter and will
                recursively iterate over the nodes and its children and will
                given us the string
              </p>
              <CodeWrapper code={vDomFunctions} lang={JS} />
            </div>
            <p>
              this is the code, that we will require to create our own simple
              implementation of dom apis, upon running the code, which was shown
              first, you will find that I generates a string representation of
              the markup, you can even try some complex structure like
            </p>
            <CodeWrapper code={vDomExample} lang={JS} />
            <p>you will find that I generates output in string</p>
            <CodeWrapper code={vDomExampleOuput} lang={HTML} />
            <div>
              <p>
                you can find the whole code here below for reference{" "}
                <a href={codeRefUrl}>click here</a>
              </p>
            </div>
          </div>
        </BlogContent>
      </BlogContainer>
    </div>
  );
};

export default CreateYourOwnDom;
