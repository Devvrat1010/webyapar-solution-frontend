
const backend=fetch('./data.json').then((response)=>{
    return response.json()
}).then((data)=>{
    window.localStorage.setItem('backend',data.backend)
    window.localStorage.setItem('root',data.root)
}).catch((err)=>{
    console.log(err)
})

const backendURL=window.localStorage.getItem('backend')
const root=window.localStorage.getItem('root')

const jwtToken = document.cookie.split('; ').find(row => row.startsWith('LOGIN_INFO')).split('=')[1];

const loggedIn = document.getElementsByClassName('loginRoute')[0]
const signUp = document.querySelector('.signUpRoute')

signUp.addEventListener('click',()=>{
    window.location.href = root+"library.html";
})

const loggedInFunctions=()=>{
    loggedIn.addEventListener('click',()=>{
        document.cookie=`LOGIN_INFO=; path=/; max-age=0;secure=true;`;
        window.location.href = root+"login.html";
    })

}

if (jwtToken){
    signUp.href="library.html"
    loggedIn.innerText="Logout"
    signUp.childNodes[1].innerText="Library"
    loggedInFunctions()
}

fetch(backendURL+'checkUser', {
    method: 'GET',
    headers: {
        'Authorization': jwtToken , 
        'Content-Type': 'application/json',
    },
}).then((response)=>{
    return response.json()
}).then((data)=>{
    const username=document.getElementById('username')
    username.innerText=data.data[0].username
    localStorage.setItem('username',data.data[0].username)
}).catch((err)=>{
    loggedIn.innerText="Login"
    console.log(err,"not logged in i guess")
})