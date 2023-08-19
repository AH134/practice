function Card(props: Job) {
  const { title, image, company, requirements } = props;

  return (
    <div className="card" style={{ width: "18rem", margin: "1rem" }}>
      <img
        className="card-img-top"
        src={image}
        alt="Card image cap"
        width={"286px"}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6>{company}</h6>
        <p className="card-text">{requirements.map((req) => `${req} `)}</p>
        <a href="#" className="btn btn-primary">
          More Info
        </a>
      </div>
    </div>
  );
}

export default Card;
