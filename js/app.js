const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
document.getElementById("search-btn").addEventListener("click", () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  //toggling spinner on
  toggleSpinner("block");

  //Calling LoadBook function
  loadBooks(searchText);
  searchField.value = "";
});

/* Load Book Data */

const loadBooks = async (searchText) => {
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  // console.log(url);
  const res = await fetch(url);
  const data = await res.json();

  const bookDetailsDiv = document.getElementById("book-details");

  // Clearing previous search data;
  bookDetailsDiv.textContent = "";

  const resultNumber = document.getElementById("result-found");

  if (data.numFound !== 0) {
    resultNumber.innerText = `Total Result Found: ${data.numFound}`;
  } else {
    resultNumber.innerText = `No Result Found.`;
  }

  // data.doc is an array;

  const information = data.docs;
  console.log(information);
  information.forEach((info) => {
    bookDetail(info);
  });
};

/* Book Detail */

const bookDetail = (info) => {
  function authorName(info) {
    if (info.author_name?.length > 0) {
      return info?.author_name[0].slice(0, 20);
    } else {
      return "Not found";
    }
  }

  function publisherName(info) {
    if (info.publisher?.length > 0) {
      return info?.publisher[0].slice(0, 20);
    } else {
      return "Not found";
    }
  }

  const bookCover = (info) => {
    if (info.cover_i !== undefined) {
      return info.cover_i;
    } else {
      // this id will return 'no image available' on the cover;
      return 11525585;
    }
  };

  const bookDetailsDiv = document.getElementById("book-details");

  const div = document.createElement("div");

  const bookTitle = info.title.slice(0, 40);

  div.innerHTML = `
    <div class="col">
        <div class="card h-100">
            <img style="height:310px;" src="https://covers.openlibrary.org/b/id/${bookCover(
              info
            )}-M.jpg" class="card-img-top " alt="..." />
            <div class="card-body">
                <h5 class="card-title">${bookTitle}</h5>
                <h6 class="card-text">
                  <strong>Author:</strong> '${authorName(info)}' 
                </h6>
                <h6 class="card-text">
                <strong>Publisher:</strong> ${publisherName(info)}
                </h6>
                <h6 class="card-text">
                <strong>First Publish Year:</strong> ${info.first_publish_year}
                </h6>
                
            </div>
        </div>
    </div>
  `;

  bookDetailsDiv.appendChild(div);
  // Toggling spinner off
  toggleSpinner("none");
};
