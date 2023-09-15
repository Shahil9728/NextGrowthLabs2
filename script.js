const resultsContainer = document.getElementById("results-container");
const loader = document.getElementById("loader");
let page = 1;

const fetchData = async () => {
    loader.style.display = "block";

    const resp = await fetch('https://dummyjson.com/products');
    const data1 = await resp.json();
    const maindata = data1.products;
    loader.style.display = "none";
    // console.log(maindata);


    if (data1.length === 0) {
        window.removeEventListener("scroll", lazyLoad);
        return;
    }

    maindata.forEach(item => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.innerHTML =
            `<img src=${item.thumbnail}>
            <p>${item.title}</p>
            <div class="price">
                <h3>${item.price}$</h3>
                <p style="color: #50ae5b; font-weight: 600;">${item.discountPercentage}$% off</p>
            </div>
            <div class="reviwes">
                <p class="review">${item.rating} ⭐</p>
                <p>(${item.stock})</p>
            </div>`;
        resultsContainer.appendChild(resultItem);
    });
    page++;
};


const lazyLoad = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        fetchData();
    }
};

fetchData();

window.addEventListener("scroll", lazyLoad);
