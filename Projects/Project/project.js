async function getData(link) {
    const res = await fetch(link);
    return res.json();
}
const params = new URLSearchParams(window.location.search);
const jsonData = await getData(`${params.get("name")}.json`);
console.log(Object.keys(jsonData["versions"][0]));

document.querySelector("#name").textContent = jsonData["title"];