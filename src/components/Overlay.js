export default function Overlay(props) {
  return (
    <div
      className={props.overlayHidden ? "overlay hidden" : "overlay visible"}
      onClick={() => props.setOverlayHidden(true)}
      onKeyDown={() => props.setOverlayHidden(true)}
      role="button"
      tabIndex={0}
    >
      <div>
        <div
          className="close"
          onClick={() => props.setOverlayHidden(true)}
          onKeyDown={() => props.setOverlayHidden(true)}
          role="button"
          tabIndex={0}
        />
        <div className="overflow">
          {props.templateNames.map((item) => {
            return (
              <div
                key={item}
                onClick={async () => {
                  props.setChosenMeme(item);
                  props.setMemeUrl(
                    `https://api.memegen.link/images/${item}.jpg?width=450&height=450`
                  );
                  try {
                    const response = await fetch(
                      `https://api.memegen.link/templates/${item}`
                    );
                    const body = await response.json();
                    console.log(body.lines);
                    props.setInputNb(body.lines);
                    // setter(body.map((item) => item.blank.split(".png")[0].split("/")[4]));
                  } catch (error) {
                    console.log(error);
                  }
                }}
                onKeyDown={() => {
                  props.setChosenMeme(item);
                  props.setMemeUrl(
                    `https://api.memegen.link/images/${item}.jpg?width=450&height=450`
                  );
                }}
                role="button"
                tabIndex={0}
              >
                <img
                  key={item}
                  src={`https://api.memegen.link/images/${item}.jpg?width=180&height=180`}
                  alt={item}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
