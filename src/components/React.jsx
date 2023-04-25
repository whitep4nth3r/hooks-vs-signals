import { useState, useMemo } from "react";
import { Chord } from "tonal";

const notes = ["A", "B", "C", "D", "E", "F", "G"];

function doChordThing(note) {
  // this runs every time you click the clicker button
  // without useMemo to control state variable updates
  console.log("DOING REACT CHORD THING");
  return Chord.getChord("maj", note, note);
}

// each time state changes, everything is recreated inside Stuff
// every single time

// recreates FAKE virtual dom nodes
// but we're running lots of code we don't need to be run
export function Stuff() {
  const [currentNote, setCurrentNote] = useState("A");
  const [clicks, setClicks] = useState(0);

  // any time any piece of state changes, React runs the entire function
  // top to bottom
  // each component is basically the old render function from the Class way of doing it

  // useMemo LOCKED THE CHORD VALUE
  // so when you click the clicker, this doesn't update

  // pass in empty deps array, so the code runs ONCE and doesn't udpate again
  // pass in state variable to deps array to update the chord value
  // when the currentNote changes
  const chord = useMemo(() => doChordThing(currentNote), [currentNote]);

  // if you don't know what useMemo does, code just works
  // even though there are lots of unnecessary rerenderings

  function setClicksHandler() {
    const newValue = clicks + 1;
    setClicks(newValue);
  }

  function getTriads(root) {
    setCurrentNote(root);
  }

  return (
    <>
      <section>
        {notes.map((note, index) => (
          <button key={`note-${index}`} onClick={() => getTriads(note)}>
            {note}
          </button>
        ))}
      </section>

      <button onClick={setClicksHandler}>CLICKED {clicks} TIMES</button>

      <section>
        <h3>See the major triad of {currentNote}</h3>
        {chord.notes.map((note, index) => (
          <span key={`chord-note-${index}`}>{note}</span>
        ))}
      </section>
    </>
  );
}
