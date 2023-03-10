const postsContainer = document.querySelector('.posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetching Data from API

async function getData() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
}

// Add posts to DOM

async function showPosts() {
    const posts = await getData();

    posts.forEach(post => {
        const postEle = document.createElement('div')
        postEle.setAttribute('class', 'post');
        postEle.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-container">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
            ${post.body}
          </p>
        </div>
        `
        postsContainer.appendChild(postEle);
    });
}

// Show Loader and fetch Posts

function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);

    }, 1000);
}

// Filter Functionality
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach((post) => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })

}


// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
        showLoading();
    }
})


filter.addEventListener('input', filterPosts)