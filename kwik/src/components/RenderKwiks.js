import up from "../img/up.svg";
import down from "../img/down.svg";
import s from "../App.module.css";
import { Fragment } from "react";
const RenderKwiks = (props) => {
  return (
    <>
      {props.kwikArray.map((kwik) => (
        <Fragment key={kwik.id} >
          <div className={s.displayMeme} >
            <div className={s.titleName}>{kwik.data.title}</div>
            <img className={s.image} src={kwik.data.url} />
            <p className={s.votesNumber}>{kwik.data.votesUp}up</p>
            <p className={s.votesNumber}>{-kwik.data.votesDown}down</p>
            <div className={s.likes}>
              <img
                className={s.thumbUp}
                src={up}
                onClick={() =>
                  props.changeVotes(
                    kwik.id,
                    1,
                    props.kwikArray,
                    props.setKwikMainPageArray,
                  )
                }
              />
              <img
                className={s.thumbDown}
                src={down}
                onClick={() =>
                  props.changeVotes(
                    kwik.id,
                    -1,
                    props.kwikArray,
                    props.setKwikMainPageArray,
                  )
                }
              />
            </div>
          </div>
          <hr />
        </Fragment>
      ))}
    </>
  );
};

export default RenderKwiks;
