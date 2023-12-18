import { useEffect, createRef } from 'react';

const UTTERANCE_URL = 'https://utteranc.es/client.js';
const REPO_NAME = 'ardnahcivar/ardnahcivar.github.io';

const Comments = () => {

    const commentRef = createRef();

    useEffect(() => {
        const scriptElem = document.createElement('script');
        scriptElem.setAttribute('src', UTTERANCE_URL);
        scriptElem.setAttribute("crossorigin","anonymous");
        scriptElem.setAttribute("async", true);
        scriptElem.setAttribute("repo", REPO_NAME);
        scriptElem.setAttribute("issue-term", "title");
        scriptElem.setAttribute( "theme", "github-light");
        commentRef.current.appendChild(scriptElem)
    },[])

    return(
        <div>
            <div ref={commentRef}></div>
        </div>
    )
}

export default Comments