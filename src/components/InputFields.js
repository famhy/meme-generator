import { useEffect, useState } from "react";

// Helper function for escaping not allowed Character in the URL for the api call
function escapingCharacters(item) {
  if (item === " ") {
    return "_";
  } else if (item === "_") {
    return "__";
  } else if (item === "-") {
    return "--";
  } else if (item === "?") {
    return "~q";
  } else if (item === "&") {
    return "~a";
  } else if (item === "%") {
    return "~p";
  } else if (item === "#") {
    return "~h";
  } else if (item === "/") {
    return "~s";
  } else if (item === "\\") {
    return "~b";
  } else if (item === '"') {
    return "''";
  } else {
    return item;
  }
}

// Helper function to download the created meme
function download(downloadUrl, fileText) {
  fetch(downloadUrl.split(".").slice(0, 3).join(".") + ".png", {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileText + ".png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function linkGen(inputTab) {
  console.log(inputTab);
  let url = "";

  inputTab.forEach((item) => {
    url = url + "/" + item;
  });
  return url;
}

export default function InputFields(props) {
  // Save the top text
  const [topText, setTopText] = useState("");
  // Save the bottom text
  const [bottomText, setBottomText] = useState("");
  let nb = props.inputNb;
  const [inputTab, setInputTab] = useState([]);

  useEffect(() => {
    setInputTab(Array(nb).fill(""));
  }, [nb]);

  return (
    <div className="inputFields">
      {console.log(inputTab, props.inputNb, nb)}

      {/* <div>
        <label htmlFor="bottomText">Bottom Text</label>
        <input
          id="bottomText"
          type="text"
          onChange={({ target }) => {
            const urlText = target.value
              .split("")
              .map((item) => escapingCharacters(item));
            props.setBottomText(urlText.join(""));
            setBottomText(urlText.join(""));
            console.log(
              `api.memegen.link/images/${
                props.chosenMeme
              }/${topText}/${urlText.join("")}.jpg?width=450&height=450`
            );
            props.setMemeUrl(
              `https://api.memegen.link/images/${
                props.chosenMeme
              }/${topText}/${urlText.join("")}.jpg?width=450&height=450`
            );
          }}
        />
      </div> */}
      <button
        onClick={() => {
          props.setOverlayHidden(false);
        }}
      >
        Choose Meme
      </button>
      <button
        onClick={() => {
          console.log(linkGen(inputTab));
          props.setMemeUrl(
            `https://api.memegen.link/images/${props.chosenMeme}/${linkGen(
              inputTab
            ).slice(1)}.jpg?width=450&height=450`
          );
        }}
      >
        Create Meme
      </button>
      <button onClick={() => download(props.memeUrl, props.chosenMeme)}>
        Download
      </button>
      {inputTab.map((item, key) => {
        return (
          <div key={key}>
            {console.log(key)}
            <label htmlFor="bottomText">Text</label>
            <input
              id="bottomText"
              type="text"
              onChange={({ target }) => {
                const urlText = target.value
                  .split("")
                  .map((item) => escapingCharacters(item));
                // props.setBottomText(urlText.join(""));

                inputTab[key] = urlText.join("");
                setInputTab(inputTab);
                // setBottomText(urlText.join(""));
                // console.log(
                //   `api.memegen.link/images/${
                //     props.chosenMeme
                //   }/${topText}/${urlText.join("")}.jpg?width=450&height=450`
                // );
                // props.setMemeUrl(
                //   `https://api.memegen.link/images/${
                //     props.chosenMeme
                //   }/${topText}/${urlText.join("")}.jpg?width=450&height=450`
                // );
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
