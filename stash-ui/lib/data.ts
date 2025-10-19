
export const createItem = async (itemData: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });
  return response.json();
};

export const fetchItems = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/items`);
  return response.json();
};

export const updateItem = async (itemId: string, itemData: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/items/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });
  return response.json();
};

export const deleteItem = async (itemId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/items/${itemId}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const fetchItemById = async (itemId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/items/${itemId}`);
  return response.json();
};