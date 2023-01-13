const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentsContainer = document.querySelector("#comments-container");
const commentForm = document.querySelector("#comment-form");
const emailInput = document.querySelector("#email");
const bodyInput = document.querySelector("#body");

// Get id from URL
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");

const url = "https://jsonplaceholder.typicode.com/posts";

getPost(postId);

// Add event comment form
commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let comment = {
        email: emailInput.value,
        body: bodyInput.value
    }

    comment = JSON.stringify(comment);
    console.log(comment);

    postComment(comment);
});

// Get individual post
async function getPost(id) {
    const responsePost = await fetch(`${url}/${id}`);
    const dataPost = await responsePost.json();
    console.log(dataPost);

    const responseComments = await fetch(`${url}/${id}/comments`);
    const dataComments = await responseComments.json();

    const title = document.createElement("h1");
    const body = document.createElement("p");

    title.innerText = dataPost.title;
    body.innerText = dataPost.body;

    postContainer.appendChild(title);
    postContainer.appendChild(body);

    console.log(dataComments);
    dataComments.map((comment) => {
        createComment(comment);
    });
}

function createComment(comment) {
    console.log(comment);
    const div = document.createElement("div");
    const email = document.createElement("h3");
    const commentBody = document.createElement("p");

    email.innerText = comment.email;
    commentBody.innerText = comment.body;

    div.appendChild(email);
    div.appendChild(commentBody);

    console.log(div);
    commentsContainer.appendChild(div);
}

// Post a comment
async function postComment(comment) {
    console.log("entrou no postComment()");

    // Requisições diferente de GET
    const response = await fetch(`${url}/${postId}/comments`, {
        method: "POST",
        body: comment,
        headers: {
            "Content-type": "application/json"
        } 
    });

    const data = await response.json();
    console.log(response);

    createComment(data);
}
