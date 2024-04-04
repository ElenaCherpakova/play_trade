export async function fetchAllCardsData(searchTerm = "") {
  const url = searchTerm.trim()
    ? `/api/cards?name=${encodeURIComponent(searchTerm)}`
    : `/api/cards`;

  const response = await fetch(url);
  if (!response.ok) {
    console.log(data.errors);
    const detailedErrorMessage = data.errors ? data.errors.join(", ") : data.message;
    throw new Error(detailedErrorMessage || "Unknown error occurred.");
  }
  const data = await response.json();
  return data.data;
}

export async function fetchCardData(id) {
  const response = await fetch(`/api/cards/${id}`);
  if (!response.ok) {
    console.log(data.errors);
    const detailedErrorMessage = data.errors ? data.errors.join(", ") : data.message;
    throw new Error(detailedErrorMessage || "Unknown error occurred.");
  }
  const data = await response.json();
  return data.data;
}

export async function editCardData(id, editCardData) {
  const response = await fetch(`/api/cards/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editCardData)
  });
  if (!response.ok) {
    console.log(data.errors);
    const detailedErrorMessage = data.errors ? data.errors.join(", ") : data.message;
    throw new Error(detailedErrorMessage || "Unknown error occurred.");
  }
  const data = await response.json();
  return data.data;
}

export async function createCardData(formData) {
  const response = await fetch("/api/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });
  if (!response.ok) {
    console.log(data.errors);
    const detailedErrorMessage = data.errors ? data.errors.join(", ") : data.message;
    throw new Error(detailedErrorMessage || "Unknown error occurred.");
  }
  const data = await response.json();
  return data.data;
}

export async function fetchSellerCards(sellerId) {
  const response = await fetch(`/api/cards/seller/${sellerId}`);
  if (!response.ok) {
    console.log(data.errors);
    const detailedErrorMessage = data.errors ? data.errors.join(", ") : data.message;
    throw new Error(detailedErrorMessage || "Unknown error occurred.");
  }
  const data = await response.json();
  return data.data;
}



