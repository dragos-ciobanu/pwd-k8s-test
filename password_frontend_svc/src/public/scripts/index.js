
document.addEventListener('click', function (event) {
    event.preventDefault();
    const ele = event.target;
    if (ele.matches('#check-password-btn')) {
        checkPassword();
    }
}, false)

function checkPassword() {
    const passwordValue = document.getElementById("password-input").value;
    if (passwordValue.length < 1) {
        return;
    }
    getPasswordScore(passwordValue);
    getPasswordIsCommon(passwordValue);
    getPasswordIsReused(passwordValue);
}

function getPasswordScore(passwordValue) {
    httpPost('/api/password/score', {password: passwordValue})
        .then(response => response.json())
        .then((response) => {
            document.getElementById('password-score-container').innerText = response.score;
        });
}

function getPasswordIsCommon(passwordValue) {
    httpPost('/api/password/common', {password: passwordValue})
        .then(response => response.json())
        .then((response) => {
            document.getElementById('password-score-common').innerText = response.isCommon ? "YES" : "NO";
        });
}

function getPasswordIsReused(passwordValue) {
    httpPost('/api/password/reuse', {password: passwordValue})
        .then(response => response.json())
        .then((response) => {
            document.getElementById('password-score-reuse').innerText = response.isReused ? "YES" : "NO";
        });
}

function httpGet(path) {
    return fetch(path, getOptions('GET'))
}

function httpPost(path, data) {
    return fetch(path, getOptions('POST', data));
}

function httpPut(path, data) {
    return fetch(path, getOptions('PUT', data));
}

function httpDelete(path) {
    return fetch(path, getOptions('DELETE'));
}

function getOptions(verb, data) {
    const options = {
        method: verb,
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (data) {
        options.body = new URLSearchParams(data);
    }
    return options;
}
