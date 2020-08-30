/* In this section the search function is defined. */
let search = document.querySelector("input#search");
let searchArray = [];

// on input in the search bar, the input gets saved and is available for processing.
// then the entries get filtered
search.addEventListener("change", () => {
  // get the search term and remove junk
  let searchTerm = search.value.toLowerCase().trim();
  searchTerm = searchTerm.replaceAll(/[^A-Za-z\s]*/g, "");
  searchTerm = searchTerm.replaceAll(/\s{2,}/g, " ");
  // create a new array of tags
  searchArray = searchTerm.split(" ");

  // remove focus from searchbar
  search.blur();
  // empty search bar
  search.value = "";

  // filter based on searchArray
  filterEntries();
});

// filter the blog entries according to searchArray: The blog entry tags get compared to the searchArray and if no match is found, it will get hidden from the website, unless the searchArray is empty, then every entry will be displayed.
function filterEntries() {
  let entries;
  let searchTags;

  // no search tags --> user wants all entries
  if (searchArray.length <= 1 && (searchArray[0] === null || searchArray[0] === "")) {
    // query for all hidden entries
    entries = document.querySelectorAll("article[class~='hidden']");
    // go through every hidden entry
    for (const entry in entries) {
      // remove the hidden attribute
      entry.classList.remove("hidden");
    }
    // end method here
    return;
  }

  // create one string with all tags
  searchTags = searchArray.toString();
  // get all entries
  entries = document.querySelectorAll("article");
  // go through every entry
  for (let i = 0; i < entries.length; i++) {
    let tagMatch = false;
    // get the list of tag items for this entry
    let tagItems = entries[i].lastElementChild.children
    // go through every tag item
    for (let j = 0; j < tagItems.length; j++) {
      // the tag is in the list of searchTags, at the start, at the end or is the only item
      if (searchTags.includes(`,${tagItems[j].textContent.toLowerCase()},`)
        || searchTags.startsWith(tagItems[j].textContent.toLowerCase() + ",")
        || searchTags.endsWith("," + tagItems[j].textContent.toLowerCase())
        || searchTags === tagItems[j].textContent.toLowerCase()) {
        // at least on tag matches no need to search further
        tagMatch = true;
        break;
      }
    }

    // if the entry does not match the search
    if (!tagMatch) {
      // hide it
      entries[i].classList.add("hidden");
    } else {
      // if it was previously hidden, the class gets removed
      entries[i].classList.remove("hidden");
    }
  }
}
