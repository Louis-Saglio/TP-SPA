window.onload = () => {

    function appendUl(item, title) {
        const ul = document.createElement('ul')
        if (title !== undefined) {
            ul.appendChild(document.createTextNode(title))
        }
        item.appendChild(ul)
        return ul
    }

    function appendLi(ul, title) {
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(title))
        ul.appendChild(li)
        return li
    }

    function appendOnclick(element, callback) {
        element.addEventListener('click', (e) => {
            if (e.target === element) {
                if (element.clicked === undefined) {
                    element.clicked = true
                } else {
                    element.clicked = !element.clicked
                }
                if (element.clicked) {
                    callback()
                } else {
                    element.removeChild(element.children[0])
                }
            }
        })
    }

    async function addUsers(ul) {
        const users = await (await fetch("https://jsonplaceholder.typicode.com/users")).json()
        for (user of users) {
            const userLi = appendLi(ul, user.name)
            appendOnclick(userLi, () => {addPosts(userLi, user.id)})
        }
    }

    async function addPosts(userLi, userId) {
        const posts = await (await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)).json()
        const postUl = appendUl(userLi)
        for (post of posts) {
            const postLi = appendLi(postUl, post.title)
            appendOnclick(postLi, () => {appendPostData(postLi, post.id, post.body)})
        }
    }

    function appendPostData(postLi, id, body) {
        const ul = appendUl(postLi)
        appendLi(ul, id)
        const bodyLi = appendLi(ul, body)
        appendOnclick(bodyLi, () => {addComments(bodyLi, id)})
    }

    async function addComments(bodyLi, postId) {
        const comments = await (await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)).json()
        const commentUl = appendUl(bodyLi)
        for (let comment of comments) {
            appendLi(commentUl, comment.name)
        }
    }

    const ul = appendUl(document.body)
    addUsers(ul)
}