import Image from "next/image";

import BlogContainer from "../../../components/blog-container/blog-container";
import BlogHeader from "../../../components/blog-header/blog-header";
import BlogContent from "../../../components/blog-content/blog-content";
import CodeWrapper from "../../../components/code-wrapper/code-wrapper";
import Comments from "../../../components/comments/comments";
import styles from './../../index.module.css';

const title = 'Different for loops, which to use when ?';
const date = '1705854242078';

const arrayDefn = 
`const teams = ['Mercedes', 'RedBull', 'Scuderia Ferrari', 'McLaren', 'Alpine']
const sparseArray = [,'Hass', 'Williams',, 'Sauber']  //Notice the "," which represents empty slots'
const drivers = [
                    ['Lewis Hamilton', 'George Russel'],
                    ['Max Vestappen', 'Sergio Perez'],
                    ['Charles Leclerc', 'Carlos Sainz Jr'],
                    ['Lando Norris', 'Oscar Piastri'],
                    ['Esteban Ocon', 'Piere Gasly']
                ]`


const basicForLoopCode = 
`for(let i = 0; i < teams.length; i++){
    console.log(teams[i]) //logs Mercedes RedBull Scuderia Ferrari McLaren Alpine
}`

const forInLoopCode = 
`const teamsObj = {
    'Mercedes': 1,
    'RedBull': 2,
    'Scuderia Ferrari': 3,
    'McLaren': 5,
    'Alpine': 6
}

for(let team in teamsObj){
    console.log(team) //logs Mercedes RedBull Scuderia Ferrari McLaren Alpine
}

for(let team in teams){
    console.log(team) //logs 0 1 2 3 4 on newline
}

Object.defineProperty(teamsObj, 'Haas', {enumerable: false, value: 10}

for(let team in teamsObj){
    console.log(team) //logs Mercedes RedBull Scuderia Ferrari McLaren Alpine and doesn't log Haas as it not enumerable
}

for(let team in sparseArray){
    console.log(team) //logs 1 2 4 on newline
}
`

const forOfLoopCode = 
`for(const team of teams){
    console.log(team)
}
teams[Symbol.iterator] = null

for(const team of teams){
    console.log(team) // this will throw error TypeError: teams is not iterable
}

for(const team of sparseArray){
    console.log(team) // logs undefined Haas Williams undeined Sauber undefined
}
`

const forEachLoopCode = 
`teams.forEach((v) => console.log(v)) // logs Mercedes RedBull Scuderia Ferrari McLaren Alpine
sparseArray.forEach((v) => console.log(v)) // logs Hass Williams Sauber

teams.forEach((team, i) => {
    console.log(team, i) // logs Mercedes 0 RedBull 1 Scuderia Ferrari 2 McLaren 3 Alpine 4
    if(team === teams[2]){
        return; // return statement doesn't stop the iteration
    }
})
`

const ForLoops  = () => {
    return (
        <div>
            <BlogContainer>
                <BlogHeader title={title} date={date} />
                <BlogContent>
                    <div>
                        <p>You might have came across various variations of the for loop, and wondering why they have been added to
                            the Javascript, they have been added, and each one of them serves it own purpose, we are going through each 
                            of them, and see how they differ from each other.
                        </p>
                        <p>These are the various variations you might have came across</p>
                        <ul>
                            <li>basic for </li>
                            <li>for in</li>
                            <li>for of</li>
                            <li>forEach</li>
                        </ul>
                        <p>In order to understand it better, let us create a array, which we will be operating on using the various for loops</p>
                        <CodeWrapper
                            code={arrayDefn}
                            lang={'javascript'}
                        />

                    </div>
                    <div>
                        <h3>basic for</h3>
                        <p>This is the loop, which is simple and we use it most of the time, to iterate of the arrays and strings.
                        </p>
                        <CodeWrapper
                            code={basicForLoopCode}
                            lang={'javascript'}
                        />
                        <p>we can't use this loop, to iterate over the objects directly, we can do it by extracting keys of the Object and then iterating over the keys</p>
                        <p>as you can see, we are iterating over the array, and accessing its elements via the array index notation</p>
                        <p>if you have used other array methods, and want to access the values, it may look tedious as we are using the index to access element, which can be done directly as well</p>
                        <p>Things to note here is that we can stop the iteration of the array by using 
                        <code className={styles.codeHighlight}>return</code> and 
                        <code className={styles.codeHighlight}>break</code> statements, and also can do it by throwing an Error and handling the error exception gracefully</p>
                    </div>
                    <div>
                        <h3>for in</h3>
                        <p>This for loop is basically used for iterating over the objects, which will iterate over the enumerable properties, which can be its own or can be the inherited properties which are shared via the prototype</p>
                        <p>Whenever we create a object with the object literal syntax as shown in the example below , by default all properties are enumerable, this method is suitable to iterate over the objects, rather than the arrays, if we use it on arrays, it will give us the array indices</p>
                        <CodeWrapper 
                            code={forInLoopCode}
                            lang={'javascript'}
                        />
                        <p><i>What are sparse arrays ?</i>
                            <p> so whenever we create an array, and omit a value in an array, then the resulting array is a sparse array
                        </p>
                        </p>
                        <p>If we try and iterate over the sparse array, the for in loop ignores/skips the 
                        <code className={styles.codeHighlight}>undefined</code>,<code className={styles.codeHighlight}>empty</code> values while iterating over the sparse arrays
                        </p>
                    </div>
                    <div>
                        <h3>for of</h3>
                        <p>This loop uses the builtin iterator method  <code className={styles.codeHighlight}>[@@iterator]()</code> to generate the sequence of values, which is an iterable object</p>
                        <p>It is most suitable for iterating over the Arrays, Maps, Sets etc, you can also define your own custom iterator function, or overide the existing default behavior</p>
                        <p>You can also  prevent/ remove the iteration behavior by modifiying the 
                            <code className={styles.codeHighlight}>[Symbol.iterator]</code> to null
                        </p>
                        <CodeWrapper 
                            code={forOfLoopCode}
                            lang={'javascript'}
                        />
                        <p>For of loop iterates over the sparse array, and doesn't skip/ignore the undefined/ empty values</p>

                    </div>
                    <div>
                        <h3>forEach</h3>
                        <p>This forEach loop can only be used over the arrays only, as we are using the builtin method <code className={styles.codeHighlight}>forEach</code> which is available on Arrays</p>
                        <CodeWrapper 
                            code={forEachLoopCode}
                            lang={'javascript'}
                        />
                        <p>forEach loop also ignores the empty/undefined values when iterated over the sparse Arrays</p>
                        <p>One thing to note here is that we can't stop the iteration of the loop via 
                            <code className={styles.codeHighlight}>return</code> statement, as the forEach takes a callback function, and return value  from callback function isn't considered while iterating,
                            In order to break it, we will have to throw and Error and handle it gracefully
                        </p>
                    </div>
                    <div>
                        <h3>Here you can see the comparison </h3>
                        <div>
                            <Image
                                src={"/images/for-loops-summary.png"}
                                width={'700'}
                                height={'120'}
                                alt={"For loops summary"}
                            />
                        </div>
                    </div>
                </BlogContent>
            </BlogContainer>
        </div>
    )
}

export default ForLoops;