import BlogContainer from "../../../components/blog-container/blog-container";
import BlogHeader from "../../../components/blog-header/blog-header";
import BlogContent from "../../../components/blog-content/blog-content";
import CodeWrapper from "../../../components/code-wrapper/code-wrapper";
import Comments from "../../../components/comments/comments";
import styles from "./../../index.module.css";
import ActiveLink from "../../../components/active-link";

const title = `Exploring Golang - Receipt processor`;
const date = `1723384985915`;
const srcProblemLink = `https://github.com/fetch-rewards/receipt-processor-challenge`;
const soureCodeUrl = `https://github.com/ardnahcivar/exploring-go/tree/main/receipt-processor`;

const goLang = `go`;
const receiptRequestPayload = `{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "16:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "16.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    }
  ],
  "total": "35.35"
  }`;

const receiptRequestPayloadResponse = `{
    "id": "ba7eaa2e-ffe1-4280-93be-38e0b5021a2c"
}`;

const receiptStructType = `
type Receipt struct {
	Id           uuid.UUID
	Retailer     string  json:"retailer"
	PurchaseDate string  json:"purchaseDate"
	PurchaseTime string  json:"purchaseTime"
	Total        float64 json:"total,string,omitempty"
	Items        []Item  json:"items"
}`;
const receiptItemStructType = `type Item struct {
	ShortDescription string  json:"shortDescription"
	Price            float64 json:"price,string,omitempty"
}`;

const receiptDBMap = `var receiptsDB map[uuid.UUID]Receipt`;
const processReceiptFunc = `func processReceipts(rcpt *Receipt, store map[uuid.UUID]Receipt) (string, error) {
		mu.Lock()
		id := uuid.New()
		*&rcpt.Id = id
		store[id] = *rcpt
		mu.Unlock()
		return success, nil
}`;
const retrieveReceiptFunc = `func retrieveReceipt(id string, store map[uuid.UUID]Receipt) (Receipt, error) {
	parsedId, err := uuid.Parse(id)
	if err != nil {
		return Receipt{}, errors.New("failed to parse id of receipt")
	}
	rcpt, exists := store[parsedId]

	if !exists {
		return Receipt{}, errors.New("receipt with given id doesn't exist")
	}

	return rcpt, nil
}`;

const applyPointsRuleFunc = `	func applyPointsRule(rcpt *Receipt) int64 {
	retailerName := rcpt.Retailer
	currPoints := 0

	//check for alphanumeric characters in retailer name
	for _, ch := range retailerName {
		if unicode.IsDigit(ch) || unicode.IsLetter(ch) {
			currPoints += 1
		}
	}
	//checking total price if it contains cents
	price := strconv.FormatFloat(rcpt.Total, 'f', -1, 64)
	priceSplit := strings.Split(price, ".")

	if len(priceSplit) == 1 {
		//if total price doesnt have any fraction  part
		currPoints += 50
	}
	//check if total is multiple of 0.25
	if math.Mod(rcpt.Total, 0.25) == 0 {
		currPoints += 25
	}
	//checking items of the receipt, adding 5 points pers 2 items
	nosItem := (len(rcpt.Items) / 2)
	currPoints += int(math.Floor(float64(nosItem))) * 5
	//If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer.
	items := rcpt.Items
	for _, item := range items {
		if len(strings.TrimSpace(item.ShortDescription))%3 == 0 {
			currPoints += int(math.Round(item.Price * 0.2))
		}

	}
	//6 points if the day in the purchase date is odd.
	layout := "2006-01-02"
	parsedDate, err := time.Parse(layout, rcpt.PurchaseDate)

	if err != nil {
		fmt.Printf("failed to parse the date")
		// http.Error(w, "failed to parse date", http.StatusInternalServerError)
		// return
	}

	if parsedDate.Day()%2 == 1 {
		currPoints += 6
	}
	//10 points if the time of purchase is after 2:00pm and before 4:00pm.
	parsedTime := strings.Split(rcpt.PurchaseTime, ":")
	hr, err := strconv.ParseInt(parsedTime[0], 10, 64)

	if err != nil {
		fmt.Printf("failed to parse time %v", err)
	}

	if hr > 13 && hr < 16 {
		currPoints += 10
	}
	return int64(currPoints)
}`;


const mainFunc =`func main() {
	fmt.Println("running the main function with reload")
	receiptsDB := make(map[uuid.UUID]Receipt)

	http.HandleFunc("/receipts/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Method is  ", r.Method)

		body, err := io.ReadAll(r.Body)

		defer r.Body.Close()

		if err != nil {
			http.Error(w, "error in reading body", http.StatusInternalServerError)
			return
		}

		passedPath := r.URL.Path

		urlParts := strings.Split(passedPath, "/")

		if len(urlParts) < 2 {
			fmt.Fprintf(w, "invalid url path for receipts")
			return
		}

		for p, pval := range urlParts {
			fmt.Printf("path value is %v -> %v \n", p, pval)
		}

		if len(urlParts) == 3 && urlParts[2] == "process" {
			if len(body) == 0 {
				fmt.Fprintf(w, "missing body", http.StatusInternalServerError)
				return
			}
			var rcpt Receipt
			err := json.Unmarshal([]byte(body), &rcpt)
			if err != nil {
				fmt.Println("error in unmarshalling")
				fmt.Println(err)
				return
			}

			_, processErr := processReceipts(&rcpt, receiptsDB)

			if processErr != nil {
				http.Error(w, "failed to process the receipt", http.StatusInternalServerError)
				return
			}

			response := ReceiptProcessResponse{
				Id: rcpt.Id,
			}

			w.Header().Set("Content-Type", "application/json")

			jsonResponse, err := json.Marshal(response)

			if err != nil {
				http.Error(w, "Unable to marhal json response while receipt processing", http.StatusInternalServerError)
				return
			}
			w.Write(jsonResponse)
			return
		} else if len(urlParts) == 4 && urlParts[3] == "points" {
			id := urlParts[2]
			rcpt, err := retrieveReceipt(id, receiptsDB)

			if err != nil {
				http.Error(w, "failed to retreive points", http.StatusInternalServerError)
				return
			}

			points := applyPointsRule(&rcpt)

			pts := ReceiptPointsResponse{
				Points: points,
			}

			ptsJson, err := json.Marshal(pts)
			if err != nil {
				http.Error(w, "failed to marshal json for points", http.StatusInternalServerError)
				return
			}

			w.Write(ptsJson)
			return

		}
	})
`

const clientFunc = `package main
import (
	"bytes"
	"fmt"
	"net/http"
	"sync"
)

const (
	numGoroutines = 800
	workers       = 50
)

func main() {
	var wg sync.WaitGroup
	jobs := make(chan int, numGoroutines)

	client := &http.Client{}

	for i := 0; i < workers; i++ {
		wg.Add(1)
		go makeRequest(i, client, &wg, jobs)
	}

	for j := 0; j < numGoroutines; j++ {
		jobs <- j
	}

	close(jobs)

	wg.Wait()
}

func makeRequest(id int, client *http.Client, wg *sync.WaitGroup, jobs <-chan int) {
	hostUrl := "http://localhost:8080/receipts/process"

	payload := []byte("{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
  }")

	defer wg.Done()

	for job := range jobs {
		req, err := http.NewRequest(http.MethodPost, hostUrl, bytes.NewBuffer(payload))
		req.Header.Set("Content-Type", "application/json")
		if err != nil {
			fmt.Println("Error is creating request")
			return
		}
		fmt.Println("sending req with worker", id, job)
		resp, err := client.Do(req)

		if err != nil {
			fmt.Println("Error in sending request")
			fmt.Println(err)
			return
		}

		defer resp.Body.Close()
		fmt.Println("resp Status", resp.Status, resp.StatusCode)
	}

}
`
const ReceiptProcessor = () => {
  return (
    <div>
      <BlogContainer>
        <BlogHeader title={title} date={date} />
        <BlogContent>
          <div>
            <p>Hello, I hope you are doing good</p>
            <p>
              In this post, we are exploring Go language, and trying to built
              the receipt processor api service, you can find details here,
              which was posted on
              <a
                href={srcProblemLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Receipt-Processor challenge[click on it].{" "}
              </a>
              The intent of the post for me is to learn the Go language by
              building things with it.
            </p>
            <p>
              For building this, we are not using any specific frameworks, we
              will be using the built-in features of golang like "net/http"
              package for building the endpoints.
            </p>
            <ul>
              So there are two main things this receipt processor api service
              handles
              <li>
                An api end point("/receipts/process") for accepting the
                processed receipt as request payload, and should store them
                in-memory.
              </li>
              <li>
                Another endpoint("/receipts/id/points") that should be able to
                calculate points for a processed receipt, based on criteria.
              </li>
            </ul>
            <p>
              We will be using "/receipts/process" api endpoint which will be a
              post method, and will be having a json payload,
            </p>
            <CodeWrapper code={receiptRequestPayload} lang={goLang} />
            <p>
              And after successfully storing it , will return a id as a key, and
              its value will be UUID, which can further be used, to query for
              the points.
            </p>
            <CodeWrapper code={receiptRequestPayloadResponse} lang={goLang} />

            <p>
              For handling the receipts, we are creating a Receipt struct, which
              will be having its own properties, and it will look like this
            </p>
            <CodeWrapper code={receiptStructType} lang={goLang} />
            <span>
              please note, there are backtick(``) which are not added to the
              struct type before the json keyword and closing after the ".
            </span>

            <p>
              We are also added its respective json value fields which we are
              sending as a payload, which will be further parsed and converted
              to struct by using json marshalling/unmarshalling.
            </p>

            <p>We have also created a struct type Item.</p>
            <CodeWrapper code={receiptItemStructType} lang={goLang} />
            <p>
              In order to store the receipts, as we are not using persistent
              data storage, we will be uisng the Map, whose key will be a unique
              identifier,here we are using UUID for unique indentifier and its
              value will a receipt.
            </p>
            <CodeWrapper code={receiptDBMap} lang={goLang} />

            <p>In main function</p>
            <p>
              We are initializing `receiptsDB` with a map and are creating a
              endpoint "/receipts" via the http.Handle function, and we checking
              the path and handling it appropriately whether it is a
              "/receipts/process" or "/receipts/id/points" in the if condition,
              and extracting the passed body which will be passed, we are also
              doing checks like if the "body" is passed or not, and handling
              errors while reading the body, since the body is passed as a json,
              we are converting it to struct via json marshalling and vice
              versa.
            </p>
            <p>
              We have created three functions
              `processReceipts`,`applyPointsRule` and `retrieveReceipt` to
              handle the processing of the receipts, for calculating the points
              rewarded for that processed receipt and `retrieveReceipt` which is
              responsible for reading receipt from `receiptsDB` and returning
              it.
            </p>

            <p>
              In the `processReceipts` we are storing the passed receipt in the
              `store`, by creating a `UUID`, and assigning the passed receipt,
              as we are writing data to the `store`, we are not allowing data to
              be written to it concurrently, data is written to it in a sequence
              manner, one at a time, as we can get multiple http requests, we
              don't want to write data to it concurrently, in order to do this,
              we are using `sync.Mutex` which locks and prevents concurrent
              writing, and allows writing to it , one at a time.
            </p>

            <CodeWrapper code={processReceiptFunc} lang={goLang} />

            <p>
              In this case, since we are creating a unique `UUID` every time for
              each request it will not cause any issue if we don't lock the
              `store` while writing to it, but if we consider a scenario where
              we have a counter which is initialized to zero, and upon each
              request we are incrementing it and using it as a key to store the
              receipt then it will cause issue because if we get like 1000
              simulataneous reqeust to it, it wont read correct counter value
              and we will get duplicates keys, and we will be using the same key
              multiple times, and re-writing the receipt value.
            </p>

            <p>
              In the `retrieveReceipt` function we are accepting id as
              parameter, and for a valid id, we are extracting the respective
              receipt from the store, and returning it.
            </p>

            <CodeWrapper code={retrieveReceiptFunc} lang={goLang} />
            <ul>
              In the `applyPointsRule` function, we have certain criteria to
              reward points to the processed receipt like
              <li>for alphanumeric characters in retailer name, 1 point.</li>
              <li>for total price if it does not contains cents, 50 points.</li>
              <li>for total price if is multiple of 0.25, 25 points.</li>
              <li>for every 2 items, 5 points.</li>
              <li>
                for item description, if lengh is multiple of 3, add points by
                muliplying each item price by 0.2 and round off to nearest
                integer.
              </li>
              <li>for purchaseDate, if its odd, 6 points.</li>
              <l>
                for purchaseTime, if its between 2:00 to 4:00 PM, 10 points.
              </l>
            </ul>

            <CodeWrapper code={applyPointsRuleFunc} lang={goLang} />
            <p>
              We are checking the receipts struct data, and rewarding points
              according to the criteria mentioned.
            </p>
            <p>
                This is the main function, which is handling the api endpoints as per the http request send.
            </p>
            <CodeWrapper code={mainFunc} lang={goLang}/>

            <p>you can find the whole source code here</p>
            <a href={soureCodeUrl}       target="_blank"
                rel="noopener noreferrer">source code[click on it]</a>

            <p>I have also created a client program which is responsible for hitting the receipt processor api endpoints , just to check how its works when we make many concurrent requests</p>
            <CodeWrapper code={clientFunc} lang={goLang}/>
          </div>
        </BlogContent>
      </BlogContainer>
      <Comments />
    </div>
  );
};

export default ReceiptProcessor;
