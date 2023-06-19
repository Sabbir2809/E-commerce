export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/cart?user=${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/cart/${update.id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/cart/${itemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}
