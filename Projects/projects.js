const projects_div = document.querySelector(".all-projects");

async function getData(link) {
    const res = await fetch(link);
    return res.json();
}

const jsonData = await getData("projects.json");
console.log(jsonData);
jsonData.forEach(data => {
    const d1 = document.createElement("div");
    d1.classList.add("proj");
    d1.addEventListener("click", () => {
        window.location.href = `Project${data.link}`;
    });

    const d2 = document.createElement("div");
    d2.classList.add("top-div");

    const p1 = document.createElement("p");
    p1.textContent = data.name;
    p1.classList.add("p-title");
    d2.appendChild(p1);

    const img = document.createElement("img");
    img.src = data.file;
    img.classList.add("preview-img");
    d2.appendChild(img);

    const d3 = document.createElement("div");
    d3.classList.add("bottom-div");

    const p2 = document.createElement("p");
    p2.textContent = data.description;
    p2.classList.add("p-desc");
    d3.appendChild(p2);

    const p3 = document.createElement("p");
    p3.textContent = data.lang.join(" • ");
    p3.classList.add("p-lang");
    d3.appendChild(p3);

    d1.appendChild(d2);
    d1.appendChild(d3);
    projects_div.appendChild(d1);
});