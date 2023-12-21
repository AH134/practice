async function getFood() {
  const foodBox = document.getElementById("food-box");
  const data = await fetch("http://localhost:8080");
  const foods = await data.json();

  console.log(foods);
  const ol = document.createElement("ol");
  foods.forEach((food) => {
    const li = document.createElement("li");
    li.innerText = `Food: ${food.name} Type: ${food.food_type}`;
    ol.appendChild(li);
  });
  foodBox.appendChild(ol);
}

getFood();

const form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target[0].value;
  const type = e.target[1].value;
  const orange = {
    name,
    food_type: type,
  };
  const res = await fetch("http://localhost:8080/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orange),
  });
  const data = await res.json();
  console.log(data);
  location.reload();
});
