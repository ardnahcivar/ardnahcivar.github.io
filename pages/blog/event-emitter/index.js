import BlogContainer from "../../../components/blog-container/blog-container";
import BlogHeader from "../../../components/blog-header/blog-header";
import BlogContent from "../../../components/blog-content/blog-content";
import CodeWrapper from "../../../components/code-wrapper/code-wrapper";
import Comments from "../../../components/comments/comments";
import styles from "./../../index.module.css";
import ActiveLink from "../../../components/active-link";

const title = `Event emitter`;
const date = `1719506289147`;

const JS = "javascript";

const eventEmitterCode = `
function EventEmitter() {
    // will be map with eventName as key, and value is array with objects
    // having id and cb function
    this.subscriptions = new Map();
    //unique identifier generator
    let id = 0;
  
    this.subscribe = function (eName, fn) {
      const newId = id++;
  
      if (this.subscriptions.has(eName)) {
        let existingSubs = this.subscriptions.get(eName);
        let newSubs = existingSubs.concat({
          id: newId,
          fn,
        });
        this.subscriptions.set(eName, newSubs);
      } else {
        this.subscriptions.set(eName, [
          {
            id: newId,
            fn,
          },
        ]);
      }
  
      function release() {
        if (this.subscriptions.has(eName)) {
          const subTobeRemoveIndex = this.subscriptions
            .get(eName)
            .findIndex((sb) => sb.id === newId);
          if (subTobeRemoveIndex === -1) {
            throw new Error(
              "can't release, you must have already released event",
            );
          }
  
          let oldSubsFn = this.subscriptions.get(eName);
          let newSubsFn = oldSubsFn.filter((sb) => sb.id !== newId);
          this.subscriptions.set(eName, newSubsFn);
        } else {
          throw new Error("you are no longer subscribed to event");
        }
      }
  
      const obj = {};
      obj.release = release.bind(this);
      return obj;
    };
  
    this.emit = function (eName, ...args) {
      if (!this.subscriptions.has(eName)) {
        throw new Error("this eventName doesn't exist");
      }
  
      let subscribedFns = this.subscriptions.get(eName);
  
      for (let i = 0; i < subscribedFns.length; i++) {
        subscribedFns[i].fn.apply(this, args);
      }
    };
  }
  
  let ee = new EventEmitter();
  
  let A = ee.subscribe("A", function (...args) {
    console.log("A");
    console.log(args);
  });
  
  let A1 = ee.subscribe("A", function (...args) {
    console.log("A1");
    console.log(args);
  });
  
  let B = ee.subscribe("B", () => {
    console.log("B");
  });
  
  ee.emit("A", 44, "one");
  ee.emit("A", 1, 2, 3, "one");
  
  A1.release();
  
  ee.emit("A", "lights out and away we go");
  ee.emit("B");
`;
const EventEmitter = () => {
  return (
    <div>
      <BlogContainer>
        <BlogHeader title={title} date={date} />
        <BlogContent>
          <div>
            <p>
              In this blog we are creating custom event emitter, which is
              similar to
              <code className={styles.codeHighlight}>
                {" "}
                Node.js Event emitter
              </code>
              , but with basic functionalities
            </p>
            <ActiveLink
              href={`https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter`}
            >
              Reference[Click on it]
            </ActiveLink>
            <p>where</p>
            <p>-we can subscribe to particular events</p>
            <p>
              -can emit an event and trigger the subscribed function with
              appropriate passed arguments
            </p>
            <p>
              -we can unsubscribe/release to particular event, when we no longer
              needed
            </p>

            <p>
              We are creating a function
              <code className={styles.codeHighlight}> EventEmitter</code>
              , which has property like
              <code className={styles.codeHighlight}> subscriptions </code>
              and functions like
              <code className={styles.codeHighlight}> subscribe </code>
              and
              <code className={styles.codeHighlight}> emit</code>, where
              <code className={styles.codeHighlight}> subscriptions </code>
              is an Map, which has key as an event name, and array as its value,
              which contains objects having id and the callback function are
              stored in it, here we are using ids, because we want some
              identifier, so that when we want to release/unsubscribe from
              event, we can use that id, and remove it from the array of
              subscribed functions, and whenever we are subscribing, we are
              incrementing the id, to keep it as unique as possible.
            </p>

            <CodeWrapper code={eventEmitterCode} lang={JS} />

            <p>
              In the subscribe function, we are taking event name and callback
              function as parameters and checking if it already exists in the
              subscriptions map, if it exists we are updating the existing event
              name subscriptions, and appending the new callback function and
              updating the the map's value, if particular event doesn't exist,
              we create a new one in map, and store it, with new event name, and
              its value with an array of callback function.
            </p>
            <p>
              In the emit function, we are taking an event name, and passed
              parameters, and extracting that particular event subscribed
              functions, and also checking if the event doesn't exist and
              throwing error for it. if it exists we are iterating over the
              subscribed functions and calling it via 
              <code className={styles.codeHighlight}>
               apply 
              </code>
               method with passed
              arguments.
            </p>

            <p>
              As we also want to unsubscribe/release from particular event name,
              and we can do that only when we have subscribed to it, we can do
              that by calling the
              <code className={styles.codeHighlight}> release </code>
              function, upon calling it, all the subscribed functions will
              removed from the map, and its callback functions won't be
              triggered eventually
            </p>

            <p>
              In the subscribe function, we are returning a object which has a
              method
              <code className={styles.codeHighlight}> release </code>
              on it, so that we can release/unsubscribe it, as you can see in
              the code, we are not just just attaching function release to the
              object, we are also binding that function to the current execution
              context, so that when it is invoked it has access to the
              subscriptions map and it can remove the callback function which
              are no longer needed, if we don't bind it then we won't be able to
              access the subscriptions object when invoked, and as the 
              <code className={styles.codeHighlight}> release </code>
              function is defined within the 
              
              <code className={styles.codeHighlight}> subscribe </code> 
               function, it can access
              <code className={styles.codeHighlight}> eName </code>
              and the
              <code className={styles.codeHighlight}> newId </code>
              variables as it is forming a closure, and we are able to access
              it, and when we are calling the release function later so that we
              can unsubscribe/release using the
              <code className={styles.codeHighlight}> eName </code>
              and
              <code className={styles.codeHighlight}> newId</code>
            </p>
            <p>
              you can also find the code here{" "}
              <ActiveLink
                href={`https://github.com/ardnahcivar/interactive-shape/blob/main/src/event-emitter.js`}
              >
                Code[click on it]
              </ActiveLink>
            </p>
          </div>
        </BlogContent>
      </BlogContainer>
      <Comments />
    </div>
  );
};

export default EventEmitter;
