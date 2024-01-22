function tryParse(x) {
  try {
    return JSON.parse(x);
  } catch (er) {
    return null;
  }
}

document.head.insertAdjacentHTML(
  "beforebegin",
  `<style>
    .bookmarks {
      background: ${localStorage.getItem("tabact")};
      height: 29.2px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      display: flex;
    }
  </style>`
);

function initBookmarks(dep = 0) {
  if (dep > 5) return;

  // Locally saved bookmarks as Stringified 2D Array
  let bookmarksLocal = localStorage.getItem("bookmarks");

  // Where to add these elements
  let bookmarksContainer = document.querySelector(".bookmarks");

  if (bookmarksLocal !== null && Array.isArray(tryParse(bookmarksLocal))) {
    let json = JSON.parse(bookmarksLocal);
    json.forEach((bookmark) => {
      let [site, ico, title] = bookmark;

      // Create the element using regular div
      let elem = document.createElement("div");
      elem.setAttribute("id", "bookmarkDiv");
      elem.style.display = "inline-block"; // Set display to inline-block
      elem.style.marginRight = "10px"; // Add margin between bookmarks

      // Use regular image tag instead of background image
      let img = document.createElement("img");
      img.src = ico;
      img.style.width = "16px"; // Set the width of the image (adjust as needed)
      img.style.height = "16px"; // Set the height of the image (adjust as needed)
      elem.appendChild(img);

      // Create a span for the text
      let textSpan = document.createElement("span");
      textSpan.textContent = title;
      elem.appendChild(textSpan);

      // Add a space between icon and text
      textSpan.style.marginLeft = "5px"; // Adjust margin as needed

      elem.style.color = localStorage.getItem("tabacttit");
      elem.style.marginBottom = "5px"; // Add margin between bookmarks

      elem.addEventListener("contextmenu", function (e) {
        [0].forEach.call(document.getElementsByClassName("bkmks"), (a) => {
          a.parentElement.removeChild(a);
        });
        e.preventDefault();
        let { pageX, pageY } = e;
        let menu = document.createElement("div");
        menu.style.position = "fixed";
        menu.style.left = pageX + "px";
        menu.style.top = pageY + "px";
        menu.style.backgroundColor = localStorage.getItem("tabbkg");
        menu.setAttribute("id", "bmenu");
        let ul = document.createElement("ul");
        ul.setAttribute("id", "bul");
        ul.style.color = localStorage.getItem("nt");
        [
          {
            name: "Delete",
            func: () => {
              elem.parentElement.removeChild(elem);
              removeBookmark(bookmark);
            },
          },
        ].forEach((i) => {
          let li = document.createElement("li");
          li.style.color = localStorage.getItem("nt");
          ul.appendChild(li);
          li.setAttribute("id", "bul");
          li.setAttribute("class", "bkmks");
          li.textContent = i.name;
          li.addEventListener("click", (e) => {
            e.preventDefault();
            i.func();
          });
        });
        menu.appendChild(ul);

        let a = function () {
          if (menu.parentElement) menu.parentElement.removeChild(menu);
          window.removeEventListener("input", a);
        };
        document.body.appendChild(menu);
        window.addEventListener("click", a);
      });

      bookmarksContainer.appendChild(elem);
    });
  } else {
    // Initialize new locally stored bookmark
    localStorage.setItem("bookmarks", "[ ]");
    initBookmarks(dep + 1);
  }
}

window.addEventListener("DOMContentLoaded", initBookmarks);
document.body.style.backgroundColor = localStorage.getItem("tabact");

function removeBookmark(a) {
  let data = JSON.parse(localStorage.getItem("bookmarks"));
  index = data.indexOf(a);
  console.log(a);
  data.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(data));
}
