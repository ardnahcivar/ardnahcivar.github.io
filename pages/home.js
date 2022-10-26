import Image from "next/image";

import styles from "./home.module.css";

const Home = () => {
  return (
    <section className={styles.main}>
      <div className={styles.intro}>
        <h1>Hello, I&apos;m Ravichandra</h1>
        <h4>
          I am a Software Engineer with an expertise in building Frontend
          applications.
        </h4>

        <section className={styles.socialProfiles}>
          <div className={styles.profileLink}>
            <a
              href="https://www.linkedin.com/in/ravichandra-bhanage/"
              title="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={"/images/linkedin-28.png"}
                width={"28px"}
                height={"28px"}
                alt={"go to Linkedin profile"}
              />
            </a>
          </div>
          <div className={styles.profileLink}>
            <a
              href="https://github.com/ardnahcivar"
              title="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={"/images/GitHub-Mark-32px.png"}
                srcSet="/images/GitHub-Mark-32px.png 300w,
  /images/GitHub-Mark-64px.png 600w, /images/GitHub-Mark-120px-plus.png 1200w"
                width={"28px"}
                height={"28px"}
                alt={"go to GitHub profile"}
              />
            </a>
          </div>
          <div className={styles.profileLink}>
            <a
              href="https://stackoverflow.com/users/9211592/ravi?tab=profile"
              title="StackOverflow"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={"/images/stackoverflow-32.png"}
                width={"28px"}
                height={"28px"}
                alt={"go to Stack overlfow profile"}
              />
            </a>
          </div>
          <div className={styles.profileLink}>
            <a
              href="mailto:ravichandra.bhanage@gmail.com"
              title="Mail to ravichandra.bhanage@gmail.com"
            >
              <Image
                src={"/images/gmail-28.png"}
                width={"28px"}
                height={"28px"}
                alt={"send mail"}
              />
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Home;
