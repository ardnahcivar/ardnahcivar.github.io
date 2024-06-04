import BlogContainer from "../../../components/blog-container/blog-container";
import BlogHeader from "../../../components/blog-header/blog-header";
import BlogContent from "../../../components/blog-content/blog-content";
import CodeWrapper from "../../../components/code-wrapper/code-wrapper";
import Comments from "../../../components/comments/comments";
import styles from "./../../index.module.css";
import ActiveLink from "./../../../components/active-link";

const title = `Interactive shape`;
const date = `1717483387629`;

const F1RaceFloodLights = () => {
  return (
    <div>
      <BlogContainer>
        <BlogHeader title={title} date={date} />
        <BlogContent>
          <div>
            <p>
                Its a visualizer, where in the matrix, upon interactions remembers the user inputs, and re-traces it back
            </p>
            <p>
              you can check it out here <ActiveLink href={`https://ravii.xyz/interactive-shape/index.html`}>
                 Demo[click on it]
              </ActiveLink>
            </p>
            <p>you can also find the code here  <ActiveLink href={`https://github.com/ardnahcivar/interactive-shape`}>
                 Code[click on it]
              </ActiveLink></p>
          </div>
        </BlogContent>
      </BlogContainer>
      <Comments />
    </div>
  );
};

export default F1RaceFloodLights;
