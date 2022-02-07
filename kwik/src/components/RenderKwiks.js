import up from "../img/up.png";
import down from "../img/down.png";

const RenderKwik = (props) => {
  console.log(props.kwikArray);
  return (
    <div>
      {props.kwikArray.map((kwik) => (
        <div key={kwik.id}>
          <div>{kwik.data.title}</div>
          <img style={{ width: "400px" }} src={kwik.data.url} />
          <p>{kwik.data.votes}</p>
          <img
            style={{ width: "30px" }}
            src={up}
            // onClick={() => incrementVotes(kwik.id)}
          ></img>
          <img
            style={{ width: "30px" }}
            src={down}
            // onClick={() => decrementVotes(kwikElement.id)}
          ></img>
        </div>
      ))}
    </div>
  );
};

export default RenderKwik;
