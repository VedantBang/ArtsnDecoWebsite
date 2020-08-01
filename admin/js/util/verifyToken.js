// Check if user is logged in or not
fetch(`${url}/user/verifytoken`, {
    method: 'GET',
    headers: {
        token: `${localStorage.getItem('token')}`,
    },
})
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        if (!res.ok) {
            window.location.href = '/login.html';
        }
    })
    .catch((err) => {
        console.log(err);
    });