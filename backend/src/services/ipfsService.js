import axios from "axios";
import FormData from "form-data";

export async function uploadToIPFS(fileBuffer, fileName) {
  try {
    const formData = new FormData();
    formData.append("file", fileBuffer, fileName);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
          ...formData.getHeaders(),
        },
      }
    );

    return response.data.IpfsHash;
  } catch (err) {
    console.error("Pinata upload failed:", err.response?.data || err.message);
    throw new Error("Failed to upload file to IPFS");
  }
}
