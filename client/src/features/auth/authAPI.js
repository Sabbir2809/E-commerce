export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch(`http://localhost:8000/users?email=${email}`);
    const data = await response.json();
    console.log({ data });
    // TODO: on server it will only return some info of user (not password)
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: 'Wrong Credentials' });
      }
    } else {
      reject({ message: 'User Not Found' });
    }
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/users/${update.id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}
