import {  CodeBlock, dracula,  } from "react-code-blocks";

import styles from './code-wrapper.module.css';

const CodeWrapper = props => {
    const {code, lang} = props;

    return(
        <div className={styles.codeWrapper}>
            <CodeBlock
                text={code}
                language={lang}
                showLineNumbers={true}
                startingLineNumber={true}
                theme={dracula}
            />
        </div>

    )
}

export default CodeWrapper;