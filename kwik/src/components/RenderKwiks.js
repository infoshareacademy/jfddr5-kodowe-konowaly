import up from "../img/up.svg";
import down from "../img/down.svg";
import s from "../RenderKwiks.module.css";
import { Fragment } from "react";
const RenderKwiks = (props) => {
  return (
    <>
      {props.kwikArray.map((kwik) => (
        <Fragment key={kwik.id}>
          <div className={s.displayMeme}>
            <div className={s.titleName}>{kwik.data.title}</div>
            <div className={s.wrapper}><img className={s.image} src={kwik.data.url} />
              <div className={s.votesNumber}>
                <p>{kwik.data.votesUp}</p>
                <p>{-kwik.data.votesDown}</p></div>
            </div>
            <div className={s.likes}>
              <img
                className={s.thumbUp}
                src={up}
                onClick={() =>
                  props.changeVotes(
                    kwik.id,
                    1,
                    props.kwikArray,
                    props.setKwikMainPageArray
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
                    props.setKwikMainPageArray
                  )
                }
              />
            </div>
          </div>

        </Fragment>
      ))}
    </>
  );
};

export default RenderKwiks;
