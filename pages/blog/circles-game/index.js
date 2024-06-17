import BlogContainer from "../../../components/blog-container/blog-container";
import BlogHeader from "../../../components/blog-header/blog-header";
import BlogContent from "../../../components/blog-content/blog-content";
import CodeWrapper from "../../../components/code-wrapper/code-wrapper";
import Comments from "../../../components/comments/comments";
import styles from "./../../index.module.css";
import ActiveLink from "../../../components/active-link";

const title = `Circles Game`;
const date = `1718613890134`;
const srcProblemLink = `https://devtools.tech/questions/s/how-to-build-circles-game-in-react-js-frontend-coding-challenge---qid---Y8acly7B5CmIVAaT5knP`

const CircleGame = () => {
  return (
    <div>
      <BlogContainer>
        <BlogHeader title={title} date={date} />
        <BlogContent>
          <div>
            <p>
                Its a circles game where a circles appears whenever you click on the screen and supports the undo, redo and reset operations, it s a solution to the problem which was posted on
                <ActiveLink href={srcProblemLink}> Demo[click on it]</ActiveLink>
            </p>
            <p>
              you can check it out here <ActiveLink href={`https://ravii.xyz/circles-game/index.html`}>
                 Demo[click on it]
              </ActiveLink>
            </p>
            <p>you can also find the code here  <ActiveLink href={`https://github.com/ardnahcivar/interactive-shape/blob/main/src/App.tsx`}>
                 Code[click on it]
              </ActiveLink></p>
          </div>
        </BlogContent>
      </BlogContainer>
      <Comments />
    </div>
  );
};

export default CircleGame;
