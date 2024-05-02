import BlogContainer from "../../../components/blog-container/blog-container";
import BlogHeader from "../../../components/blog-header/blog-header";
import BlogContent from "../../../components/blog-content/blog-content";
import CodeWrapper from "../../../components/code-wrapper/code-wrapper";
import Comments from "../../../components/comments/comments";
import styles from "./../../index.module.css";

const title = `Create a UI to show simulation of Lifts`;
const date = `1706634205924`;
const codeRefUrl = `https://github.com/ardnahcivar/ardnahcivar.github.io/blob/master/code/lift-sim/index.html`;

const LiftSimulation = () => {
  return (
    <div>
      <BlogContainer>
        <BlogHeader title={title} date={date} />
        <BlogContent>
          <div>
            <p>
              In this blog, we are going to create user interface which will try
              to simulate the workings of the Lifts, with its functionalities
              actually this was challenge that was put on couple of months ago
              on this twitter handle
              <a href="https://twitter.com/realdevsquad?lang=en">
                Real Dev Squad
              </a>
              , and I have tried to solve it, and will be showing one possible
              approach to implement it
            </p>
            <p>you can check it out here <a href={codeRefUrl}>demo</a></p>
          </div>
        </BlogContent>
      </BlogContainer>
      <Comments />
    </div>
  );
};

export default LiftSimulation;
