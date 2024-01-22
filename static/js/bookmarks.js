function tryParse(x) {
    try {
        return JSON.parse(x);
    } catch (er) {
        console.error("Error parsing JSON:", er);
        return null;
    }
}

async function getIcon(url) {
    try {
        const response = await fetch(`/fetch/b64/${url}`);
        const blob = await response.blob();

        if (!blob) {
            console.error("Error: Received empty blob.");
            return null;
        }

        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Error fetching or creating icon:", error);
        return null;
    }
}

document.head.insertAdjacentHTML(
    "beforebegin",
    `<style>.bookmarks {background: #be5960; height: 29.2px; position: absolute; left: 0; right: 0; top: 0;}</style>`
);

async function initBookmarks(dep = 0) {
    if (dep > 5) return;

    let bookmarksLocal = localStorage.getItem("bookmarks");
    console.log("Bookmarks from Local Storage:", bookmarksLocal);

    let bookmarks = document.querySelector(".bookmarks");

    if (bookmarksLocal !== null && Array.isArray(tryParse(bookmarksLocal))) {
        let json = JSON.parse(bookmarksLocal);
        console.log("Parsed Bookmarks:", json);

        json.forEach(async (bookmark) => {
            console.log("Adding Bookmark:", bookmark);

            let [site, ico, title] = bookmark;
            let elem = document.createElement("a");
            elem.textContent = title;
            elem.setAttribute("id", "bookmarka");

            // Fetch icon with error handling
            let iconUrl = await getIcon(ico);
            if (iconUrl !== null) {
                elem.style.backgroundImage = "url(" + iconUrl + ")";
            } else {
                console.error("Error getting icon. Using default background.");
            }

            elem.style.color = localStorage.getItem("tabacttit");
            elem.href = site;

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
                ul.style.color = "#be5960";
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

            bookmarks.appendChild(elem);
        });
    } else if (bookmarksLocal === null) {
        localStorage.setItem("bookmarks", "[]");
        initBookmarks(dep + 1);
    } else {
        // Proceed with parsing and displaying existing bookmarks
        let json = JSON.parse(bookmarksLocal);
        console.log("Parsed Bookmarks:", json);

        // Rest of your code to display bookmarks
        // ...
    }
}

window.addEventListener("DOMContentLoaded", initBookmarks);
document.body.style.backgroundColor = localStorage.getItem("tabact");

function removeBookmark(a) {
    let data = JSON.parse(localStorage.getItem("bookmarks"));
    index = data.indexOf(a);
    console.log("Removing Bookmark:", a);
    data.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(data));
}
