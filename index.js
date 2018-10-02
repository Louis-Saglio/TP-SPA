window.onload = async() => {
    const users = await (await fetch("https://jsonplaceholder.typicode.com/users")).json()
    const userList = document.getElementById('user-list')
    for (user of users) {
        const userLi = document.createElement('li')
        userLi.appendChild(document.createTextNode(user.name))
        const userUl = document.createElement('ul')
        userUl.className = 'userUl'
        userLi.appendChild(userUl)
        userList.appendChild(userLi)
        userLi.onclick = async function (e) {
            if (e.target == userLi) {
                const posts = await (await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)).json()
                for (let post of posts) {
                    const postLi = document.createElement('li')
                    postLi.appendChild(document.createTextNode(post.title))
                    const postUl = document.createElement('ul')
                    postLi.appendChild(postUl)
                    userUl.appendChild(postLi)
                    postLi.onclick = async function (e) {
                        if (e.target == postLi) {
                            const postDataUl = document.createElement('ul')
                            postUl.appendChild(postDataUl)
                            const postIdLi = document.createElement('li')
                            postIdLi.appendChild(document.createTextNode(`id : ${post.id}`))
                            postDataUl.appendChild(postIdLi)
                            const postBodyLi = document.createElement('li')
                            postBodyLi.appendChild(document.createTextNode(post.body))
                            postDataUl.appendChild(postBodyLi)
                            const buttonLi = document.createElement('li')
                            postDataUl.appendChild(buttonLi)
                            const button = document.createElement('button')
                            button.innerText = 'Commentaires'
                            buttonLi.appendChild(button)
                            buttonLi.onclick = async function (e) {
                                const comments = await (await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)).json()
                                button.style.visibility = 'collapse';
                                for (let comment of comments) {
                                    const commentUl = document.createElement('ul')
                                    const h4 = document.createElement('h5')
                                    h4.appendChild(document.createTextNode(comment.id))
                                    commentUl.appendChild(h4)
                                    const commentNameLi = document.createElement('li')
                                    commentNameLi.appendChild(document.createTextNode(comment.name))
                                    commentUl.appendChild(commentNameLi)
                                    const commentEmailLi = document.createElement('li')
                                    commentEmailLi.appendChild(document.createTextNode(comment.email))
                                    commentUl.appendChild(commentEmailLi)
                                    buttonLi.appendChild(commentUl)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}