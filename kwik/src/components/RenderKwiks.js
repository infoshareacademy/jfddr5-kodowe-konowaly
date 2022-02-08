import up from "../img/up.svg";
import down from "../img/down.svg";
import s from "../App.module.css";
const RenderKwiks = (props) => {
  return (
    <>
      {props.kwikArray.map((kwik) => (
        <>
          <div className={s.displayMeme} key={kwik.id}>
            <div className={s.titleName}>{kwik.data.title}</div>
            <img className={s.image} src={kwik.data.url} />
            <p className={s.votesNumber}>{kwik.data.votes}</p>
            <div className={s.likes}>
              <img
                className={s.thumbUp}
                src={up}
                onClick={() => props.changeVotes(kwik.id, 1)}
              />
              <img
                className={s.thumbDown}
                src={down}
                onClick={() => props.changeVotes(kwik.id, -1)}
              />
            </div>
          </div>
          <hr />
        </>
      ))}
    </>
  );
};

export default RenderKwiks;
