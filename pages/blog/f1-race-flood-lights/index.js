import BlogContainer from "../../../components/blog-container/blog-container";
import BlogHeader from "../../../components/blog-header/blog-header";
import BlogContent from "../../../components/blog-content/blog-content";
import CodeWrapper from "../../../components/code-wrapper/code-wrapper";
import Comments from "../../../components/comments/comments";
import styles from "./../../index.module.css";
import ActiveLink from "./../../../components/active-link";

const title = `F1 race flood lights`;
const date = `1715016849555`;
const codeRefUrl = ``;

const F1RaceFloodLights = () => {
  return (
    <div>
      <BlogContainer>
        <BlogHeader title={title} date={date} />
        <BlogContent>
          <div>
            <p>
            its a formula one flood lights simulation, where you can check your reaction time
            </p>
            <p>
              you can check it out here <ActiveLink href={`https://ravii.xyz/f1-race-flood-lights/index.html`}>
                 Demo[click on it]
              </ActiveLink>
            </p>
          </div>
        </BlogContent>
      </BlogContainer>
      <Comments />
    </div>
  );
};

export default F1RaceFloodLights;
