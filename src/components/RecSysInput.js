//create comoonent called browserInput which will contain autocomplete input
import React, { useCallback, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { Typeahead } from "react-bootstrap-typeahead";
import reddit from "../assets/reddit-logo128.png";
import { LocalStorage } from "../utils/LocalStorage";
// import { SearchResults } from './SearchResults';
// import "/node_modules/react-bootstrap-typeahead/css/Typeahead.css";

const defaultOptions = [
  `Underrated spoof movies?
  I love spoof movies, but there arent that many great ones. I wonder maybe someone know some hidden gems and could recommend them?
  I seen some I consider underrated like Walk Hard, MacGruber, etc`,
  `I'm looking for really grimy type films like Se7en or 8MM
  It's a vibe that's hard to explain but that very grimy, industrial type feel, almost as if Nine Inch Nails made films instead of music.
  And yes, I've seen Fight Club`,
  `Vampire/Monsters movies. Would like some reccomendations of a good creature movie. Preference to vampires.`,
  `when harry met sally, you've got mail, sleepless in seattle romcom vibes.
  I am looking for romantic comedies along the same vein as When Harry Met Sally, You've Got Mail and Sleepless in Seattle.
  Suggestions can certainly be more modern than those listed but all suggestions welcome!`,
  `Suggestions for a supernatural / alien movie

  Something like Arrival or The Vast of Night. Not along the lines of Alien, Predator etc. Less action and Hollywood, more wtf?`,
];

function createDefaultOptions() {
  const ac = new LocalStorage();
  const allOptions = [...ac.getAllResults(), ...defaultOptions];
  if (allOptions.length) {
    return Array.from(new Set(allOptions)); //.map((o) => ({ id: o, label: o }));
  }
  return [];
}

const RecAutocomplete = ({ value, onChange, onSearchResults, className }) => {
  const [options, setOptions] = useState(createDefaultOptions());

  const handleSelect = useCallback(
    (ev) => {
      const txt = ev.target.outerText;
      onChange(txt);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (ev) => {
      const txt = ev.target.value;
      if (txt !== 0) onChange(txt);
    },
    [onChange]
  );

  const onClickButton = useCallback(() => {
    console.log(`Searching for ${value}`);
    new LocalStorage().addResult(value);
    onSearchResults(value);
    setOptions(createDefaultOptions());
  }, [value, onSearchResults]);

  return (
    <Form.Group className={"browser-input " + className}>
      <InputGroup>
        <Autocomplete
          freeSolo
          options={options}
          onChange={handleSelect}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              multiline
              {...params}
              value={value}
              label=""
              InputProps={{
                ...params.InputProps,
                placeholder: "🍿 What kind of movie are you looking for?",
                type: "search",
              }}
            />
          )}
        />

        <Button
          id="go-search-button"
          className="search-button"
          onClick={onClickButton}
          disabled={!value || value.length < 3}
          variant="outline-secondary">
          <img src={reddit} width={32} height={32} />
          <span style={{ paddingLeft: "5px" }}>Search</span>
        </Button>
      </InputGroup>
    </Form.Group>
  );
};

export const RecSysInput = ({
  className,
  value,
  onChange,
  onSearchResults,
}) => {
  return (
    <>
      <RecAutocomplete
        value={value}
        onChange={onChange}
        onSearchResults={onSearchResults}
        className={className}
      />
    </>
  );
};
