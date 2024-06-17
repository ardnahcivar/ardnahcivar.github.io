import BlogContainer from "../../../components/blog-container/blog-container";
import BlogHeader from "../../../components/blog-header/blog-header";
import BlogContent from "../../../components/blog-content/blog-content";
import CodeWrapper from "../../../components/code-wrapper/code-wrapper";
import Comments from "../../../components/comments/comments";
import styles from "./../../index.module.css";
import ActiveLink from "./../../../components/active-link";

const title = `Interactive Velocity chart`;
const date = `1718211820229`;
const srcProblemLink = `https://devtools.tech/questions/s/how-to-build-an-interactive-jira-velocity-bar-chart-atlassian-browser-coding-round-interview-question---qid---H24LHAOpjxtuol41iGn8`

const VelocityChart = () => {
  return (
    <div>
      <BlogContainer>
        <BlogHeader title={title} date={date} />
        <BlogContent>
          <div>
            <p>
                Its a interactive velocity bar chart, similar to what we see on the Jira board, it s a solution to the problem which was posted on
                <ActiveLink href={srcProblemLink}> Demo[click on it]</ActiveLink>
            </p>
            <p>
              you can check it out here <ActiveLink href={`https://ravii.xyz/interactive-velocity-chart/index.html`}>
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

export default VelocityChart;
