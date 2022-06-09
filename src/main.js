//data.json 에서 data 가져오기
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((data) => data.items);
}

//받아온 items 들을 보여주는 함수
function displayItems(items) {
  const container = document.querySelector(".list");

  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  return `
  <li>
    <img src=${item.image} alt="" class="item_img" />
    <span class="item_text">${item.sex}, ${item.size}</span>
  </li>`;
}

// 각 버튼 클릭 시 보여지는 리스트 다르게 하기
function buttonEventLister(item) {
  const logo = document.querySelector(".logo");
  const Buttons = document.querySelector(".btnList");

  logo.addEventListener("click", () => {
    displayItems(item);
  });

  Buttons.addEventListener("click", (event) =>
    onClickEventListener(event, item)
  );
}

function onClickEventListener(event, items) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;

  if (key == null || value === null) {
    return;
  }

  const updateItems = items.filter((item) => item[key] === value);
  console.log(updateItems);

  displayItems(updateItems);
}
loadItems().then((item) => {
  displayItems(item);
  buttonEventLister(item);
});
