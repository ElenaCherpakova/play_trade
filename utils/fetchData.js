//export async function fetchAllCardsData(searchTerm = "") {
export async function fetchAllCardsData({ searchTerm, filters = {} }) {
  let url = `/api/cards`;

  // Convert searchParams object to URLSearchParams to handle encoding and query string construction
  const params = new URLSearchParams();
  //if a search term is provided, encode and append it to the query parameters
  if (searchTerm.trim()) {
    params.append("name", encodeURIComponent(searchTerm.trim()));
  }
  //append filter parameters (condition, price, category) if provided
  ["conditions", "price", "category"].forEach(filterKey => {
    if (filters[filterKey]) {
      params.append(filterKey, filters[filterKey]);
    }
  });

  //construct the final URL with query parameters
  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    const data = await response.json();
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
