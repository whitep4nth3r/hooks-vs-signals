import { createSignal } from "solid-js";
import { Chord } from "tonal";

const notes = ["A", "B", "C", "D", "E", "F", "G"];

function doChordThing(note) {
  console.log("DOING SOLID CHORD THING");
  return Chord.getChord("maj", note, note);
}

// solid's compiler creates REAL dom nodes at the beginning
// then adds reactivity to individual dom nodes
// no virtual dom
// works more like plain JS compared to react
// closer to plain JS than svelte...
// solid treats each state as its own thing
// doesn't do grouping like svelte
export function Things() {
  const [getCurrentNote, setCurrentNote] = createSignal("A");
  const [getClicks, setClicks] = createSignal(0);

  // useMemo in react is optional
  // not with solid

  // if a thing is a function, Solid will rerun that
  // function any time a dependency changes
  // e.g. when getCurrentNote changes, it will run getChord
  // and update the DOM node that uses it

  // so react runs EVERYTHING by default
  // Solid runs NOTHING by default

  // if getChord is NOT a function, nothing will update
  const getChord = () => doChordThing(getCurrentNote());

  function setClicksHandler() {
    const newValue = getClicks() + 1;
    setClicks(newValue);
  }

  function noteClickHandler(root) {
    setCurrentNote(root);
  }

  return (
    <>
      <section>
        {notes.map((note, index) => (
          <button key={`note-${index}`} onClick={() => noteClickHandler(note)}>
            {note}
          </button>
        ))}
      </section>

      <button onClick={setClicksHandler}>CLICKED {getClicks()} TIMES</button>

      <section>
        <h3>See the major triad of {getCurrentNote()}</h3>
        {getChord().notes.map((note, index) => (
          <span key={`chord-note-${index}`}>{note}</span>
        ))}
      </section>
    </>
  );
}
