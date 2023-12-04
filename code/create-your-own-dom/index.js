function VDocument() {
  this.dom = createElementObj("html");

  function createElementObj(type) {
    let elemObj = {
      type: type,
      children: [],
      appendChild: function (elem) {
        this.children.push(elem);
      },
      set innerHTML(val) {
        this.content = val;
      },
    };

    return elemObj;
  }

  this.createElement = function (type) {
    let elem = createElementObj(type);
    return elem;
  };

  this.appendChild = function (elem) {
    this.dom.children.push(elem);
  };

  this.render = function () {
    return convertDomToString(this.dom, "");
  };

  function convertDomToString(domNode) {
    let childNodes = domNode.children;
    if (childNodes && childNodes.length > 0) {
      let temp = [];
      for (let i = 0; i < childNodes.length; i++) {
        let currNode = childNodes[i];

        let r = convertDomToString(currNode);
        console.log(r);
        temp.push(r);
      }

      return `<${domNode.type}>${temp.join("")}</${domNode.type}>`;
    } else {
      let temp = `<${domNode.type}>${domNode.content || ""}</${domNode.type}>`;

      return temp;
    }
  }
}

let vDoc = new VDocument();
console.log(vDoc);

let body = vDoc.createElement("body");
let div = vDoc.createElement("div");

div.innerHTML = "Hello, I am div Element";

let div1 = vDoc.createElement("div");

div1.innerHTML = "Hello, I am div Element 2";

let div1Child = vDoc.createElement("div");

div1Child.innerHTML = "Hello, I am div Element 2 Child";

let footer = vDoc.createElement("footer");

let span1 = vDoc.createElement("span");
span1.innerHTML = "span1";
let span2 = vDoc.createElement("span");
span2.innerHTML = "span2";
let span3 = vDoc.createElement("span");
span3.innerHTML = "span3";

footer.appendChild(span1);
footer.appendChild(span2);
footer.appendChild(span3);

body.appendChild(div);

vDoc.appendChild(body);

div1.appendChild(div1Child);

body.appendChild(div1);
body.appendChild(footer);

console.log(vDoc.render());
