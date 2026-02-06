export const callApi = async ({url, accessToken}) => {
  try {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });
    if (!resp.ok) {
      console.warn("API call failed with status:", resp.status);
      console.warn("Response body:", await resp.text());
      return null;
    }
    const data = await resp.json();
    console.log("API response data:", data);
    return null;
  } catch (error) {
    console.error("Error calling API:", error);
    return null;
  }
}