import { Job } from "../types";

function Card(props: Job) {
  const { title, image, company, requirements } = props;

  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img className="card-img-top" src={image} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-title">{company}</h6>
        <p className="card-text">{requirements.map((req) => `${req} `)}</p>
        <a href="#" className="btn btn-primary">
          More Info
        </a>
      </div>
    </div>
  );
}

export default Card;
