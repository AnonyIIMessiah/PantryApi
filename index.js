const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const JSONPLACEHOLDER_API = "https://getpantry.cloud/apiv1/pantry";

// https://getpantry.cloud/apiv1/pantry/YOUR_PANTRY_ID/basket/YOUR_BASKET_NAME
// Function to create a new post
// {
//     key,
//     value,
//   }
app.post("/add-item", async (req, res) => {
  const { pantryID, basketKey, key, value } = req.body;
  try {
    const response = await axios.post(
      `${JSONPLACEHOLDER_API}/${pantryID}/basket/${basketKey}`,
      {
        key: key,
        value: value,
      }
    );
    console.log(key);
    console.log(value);
    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// {
//     "pantryID":"d06af273-18af-47db-990b-d73b62fed600",
//     "basketKey":"basket",
//     "key":"Abc",
//     "value":"3"
// }

//Get Single

app.get("/get-item", async (req, res) => {
  const { pantryID, basketKey } = req.body;
  try {
    const response = await axios.get(
      `${JSONPLACEHOLDER_API}/${pantryID}/basket/${basketKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

//get all

app.get("/list-baskets", async (req, res) => {
  const { pantryID } = req.body;
  try {
    const response = await axios.get(`${JSONPLACEHOLDER_API}/${pantryID}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// https://getpantry.cloud/apiv1/pantry/YOUR_PANTRY_ID/basket/YOUR_BASKET_NAME

app.put("/update-item", async (req, res) => {
  const { pantryID, basketKey, key, value } = req.body;
  try {
    const response = await axios.put(
      `${JSONPLACEHOLDER_API}/${pantryID}/basket/${basketKey}`,
      {
        key: value,
      }
    );

    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to updating post" });
  }
});

// https://getpantry.cloud/apiv1/pantry/YOUR_PANTRY_ID/basket/YOUR_BASKET_NAME
app.delete("/delete-item", async (req, res) => {
  try {
    const response = await axios.delete(
      `${JSONPLACEHOLDER_API}/${pantryID}/basket/${basketKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to delete posts" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
