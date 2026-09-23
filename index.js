const container = document.getElementById("container");

const btn = document.createElement("button");
btn.textContent = "Change grid";
btn.setAttribute("style", "border: none; border-radius: 3px; padding: 10px 20px; background-color: blue; color: white; margin: 20px auto; display: block")
document.body.append(btn)
document.body.insertBefore(container, null);
let opacity = 0;

createGrids(16);

container.addEventListener("mouseover", (e) => {
  const target = e.target;
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  if(opacity >= 1)
  {
    opacity = 0;
  }
  const rgba = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  target != container ? target.style.backgroundColor = rgba : "";
  opacity += 0.1;
});

btn.addEventListener("click", () => 
{
  let numberOfGrid = parseInt(prompt("Enter the number of grid you'd like to have:"));
  
  while(numberOfGrid > 100)
  {
    numberOfGrid = parseInt(prompt("Re-enter a number between 0 and 100, please:"));
  }
  createGrids(numberOfGrid);
})

function createGrids(n)
{
  const childs = document.querySelectorAll(".grid-item");
  childs != null ? childs.forEach(c => c.remove()) : "";
  if(!n) n = 16.
  for(let i = 0; i < n * n; i++)
  {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    const basis = 100/n;
    gridItem.style.flex = `0 0 ${basis}%`;
    gridItem.style.height = `${basis}%`;
    gridItem.style.border = "0.5px solid black";
    container.append(gridItem);
  }
}