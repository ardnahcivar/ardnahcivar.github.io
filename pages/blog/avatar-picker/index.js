import BlogContainer from "../../../components/blog-container/blog-container";
import BlogHeader from "../../../components/blog-header/blog-header";
import BlogContent from "../../../components/blog-content/blog-content";
import CodeWrapper from "../../../components/code-wrapper/code-wrapper";
import Comments from "../../../components/comments/comments";
import styles from "./../../index.module.css";
import ActiveLink from "../../../components/active-link";

const title = `Avatar picker`;
const date = `1721292676572`;
const srcProblemLink = `https://devtools.tech/questions/s/how-to-build-an-avatar-picker-frontend-ui-coding-challenge---qid---HuqxD3sw8pTmDfz3NvCi`;

const AvatarPicker = () => {
  return (
    <div>
      <BlogContainer>
        <BlogHeader title={title} date={date} />
        <BlogContent>
          <div>
            <p>
               It's a Avatar picker component, where you can select different avatar, it s my solution to the problem which was posted on
                <ActiveLink href={srcProblemLink}> Demo[click on it]</ActiveLink>
            </p>
            <p>
              you can check it out here <ActiveLink href={`https://ravii.xyz/avatar-picker/index.html`}>
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

export default AvatarPicker;
