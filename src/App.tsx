
import "./App.css";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petsAllowed: boolean;
  organizer: string;
}

async function getApi() {
  const url =
    "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error.message);
  }
}

function App() {
  const [events, updateEvents] = useState([]);
  const [isfiltered, updateFiltered] = useState(false);
  const [searchText, chgSearchText] = useState("");
  

  useEffect(() => {
    getApi().then((results) => {
      let main = results;

      if (searchText) {
        const updatedArray = searchFunction(results, searchText);
        main = updatedArray;
      }

      if (isfiltered) {
        const updatedArray = filterFunction(main);
        main = updatedArray;
      }

      updateEvents(main);
    });
  }, [isfiltered, searchText]);

  return (
    <>
      <div id="tools">
        <input
          placeholder="search by name"
          onChange={(e) => {
            chgSearchText(e.target.value);
          }}
          type="search"
        />

        <button
          className={isfiltered ? "filtered" : ""}
          onClick={() => {
           
            updateFiltered(!isfiltered);
          }}>
          Filter by pets
        </button>
      </div>

      <div className="events">
        {events.length !== 0 ? (
          events.map((event: Event) => (
            <div key={event.id} className="event-card">
              <div className="header">
                <h1>{event.title}</h1>
                <p>{event.location}</p>
                <p>{event.time}</p>
                <p>{event.date}</p>
              </div>
              <div className="footer">
                <p>{event.description}</p>
                <p>
                  <span>Organizer: ${event.organizer}</span>
                </p>
                <p>{event.petsAllowed ? "PETS ALLOWED" : "NO PETS"}</p>
                <p>ANIMAL WELFARE</p>
              </div>
            </div>
          ))
        ) : (
          <h1>NO EVENTS</h1>
        )}
      </div>
    </>
  );
}

function searchFunction(list: Event[], text: string) {
  const result = list.filter((element: Event) => {
    if (element.title.toLowerCase().includes(text.toLowerCase())) {
      return element;
    }
  });

  return result;
}

function filterFunction(list: Event[]) {
  const result = list.filter((element: Event) => {
    if (element.petsAllowed) {
      return element;
    }
  });

  return result;
}
export default App;
