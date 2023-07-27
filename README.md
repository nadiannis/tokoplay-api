<div align="center">
  <br>
  <h1>Tokoplay API</h1>
  <p>Promote products through videos</p>
  <br>
</div>

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Run Locally](#run-locally)
- [Database Design](#database-design)
- [API Structure](#api-structure)
- [API Endpoints](#api-endpoints)

## Description

**Tokoplay** is a platform where seller can promote products through videos to potential buyers. It is a simple clone of Tokopedia Play. This repo is the API of the app. It is built with [Express](https://expressjs.com). The data is stored in [MongoDB](https://www.mongodb.com) database.

## Features

- [Get list of videos](#get-apivideos)
- [Sort videos by the most recent](#get-apivideos)
- [Add a video](#post-apivideos)
- [Get video details](##get-apivideosvideoid)
- [Update a video](#patch-apivideosvideoid)
- [Delete a video](#delete-apivideosvideoid)
- [Get list of products](#get-apiproducts)
- [Add a product](#post-apiproducts)
- [Update a product](#patch-apiproductsproductid)
- [Delete a product](#delete-apiproductsproductid)
- [Get products of a video](#get-apivideosvideoidproducts)
- [Add product(s) to a video](#post-apivideosvideoidproducts)
- [Delete a product from a video](#delete-apivideosvideoidproductsproductid)
- [Get comments of a video](#get-apivideosvideoidcomments)
- [Sort comments by the most recent](#get-apivideosvideoidcomments)
- [Post a comment to a video](#post-apivideosvideoidcomments)

## Tech Stack

- Language: [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- Web Framework: [Express](https://expressjs.com)
- Database: [MongoDB](https://www.mongodb.com)
- ODM: [Mongoose](https://mongoosejs.com)
- Linter: [ESLint](https://eslint.org)
- Code Formatter: [Prettier](https://prettier.io)

## Run Locally

### Getting Started

- Make sure you have [Node.js](https://nodejs.org) & [Yarn](https://yarnpkg.com) installed on your computer.

- I also use MongoDB database in local. If you want to create the database on your local, make sure you have [MongoDB Community Server](https://www.mongodb.com/docs/manual/administration/install-community) & [MongoDB Shell](https://www.mongodb.com/try/download/shell) installed on your computer.

- Clone the repo.

  ```bash
  git clone https://github.com/nadiannis/tokoplay-api.git
  ```

  ```bash
  cd tokoplay-api
  ```

- Make a copy of `env.example` file & rename it to `.env`.

  Write a MongoDB URI to connect the API to a database. I use MongoDB database in local.

  ```bash
  # example

  MONGODB_URI=mongodb://localhost:27017/tokoplay
  ```

- Install the dependencies.

  ```bash
  yarn
  ```

### Development

Run the development server.

```bash
yarn dev
```

## Database Design

## API Structure

## API Endpoints

**Video**

- Video object

```
{
  "id": string,
  "title": string,
  "thumbnailUrl": string,
  "videoUrl": string,
  "createdAt": datetime,
  "updatedAt": datetime
  "products": [<product_id>, <product_id>, ...],
}
```

- Simpler video object (not full)

```
{
  "id": string,
  "title": string,
  "thumbnailUrl": string,
  "createdAt": datetime,
}
```

### GET /api/videos

Returns all videos.

- **URL Params**

  None

- **Data Params**

  None

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 200**

    Content:

    ```
    {
      "status": "success",
      "message": "Videos retrieved successfully",
      "data": [
        {<simpler_video_object>},
        {<simpler_video_object>},
        {<simpler_video_object>},
        {<simpler_video_object>},
        {<simpler_video_object>},
        {<simpler_video_object>},
        {<simpler_video_object>},
        {<simpler_video_object>},
        {<simpler_video_object>},
        {<simpler_video_object>},
        {<simpler_video_object>},
        {<simpler_video_object>},
      ],
      "page": integer,
      "totalPages": integer,
      "count": integer
    }
    ```

    OR

    Content:

    ```
    {
      "status": "success",
      "message": "There are no videos available",
      "data": [],
      "page": 1,
      "totalPages": 0,
      "count": 0
    }
    ```

- **Error Response**

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

### POST /api/videos

Creates a new video & returns the new object.

- **URL Params**

  None

- **Data Params**

  ```
  {
    "title": string,
    "thumbnailUrl": string,
    "videoUrl": string
  }
  ```

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 201**

    Content:

    ```
    {
      "status": "success",
      "message": "Video created successfully",
      "data": {<video_object>}
    }
    ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Invalid request body"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

### GET /api/videos/:videoId

Returns the specified video.

- **URL Params**

  _Required:_ `videoId=[string]`

- **Data Params**

  None

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 200**

    Content:

    ```
    {
      "status": "success",
      "message": "Video retrieved successfully",
      "data": {<video_object>}
    }
    ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Video ID is not valid"
    }
    ```

    OR

  - **Code: 404**

    Content:

    ```
    {
      "status": "error",
      "message": "Video not found"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

### PATCH /api/videos/:videoId

Updates fields on the specified video & returns the updated object.

- **URL Params**

  _Required:_ `videoId=[string]`

- **Data Params**

  ```
  {
    "title": string,
    "thumbnailUrl": string,
    "videoUrl": string
  }
  ```

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 200**

    Content:

    ```
    {
      "status": "success",
      "message": "Video updated successfully",
      "data": {<video_object>}
    }
    ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Video ID is not valid"
    }
    ```

    OR

  - **Code: 404**

    Content:

    ```
    {
      "status": "error",
      "message": "Video not found"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

### DELETE /api/videos/:videoId

Deletes the specified video.

- **URL Params**

  _Required:_ `videoId=[string]`

- **Data Params**

  None

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 200**

  Content:

  ```
  {
    "status": "success",
    "message": "Video deleted successfully"
  }
  ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Video ID is not valid"
    }
    ```

    OR

  - **Code: 404**

    Content:

    ```
    {
      "status": "error",
      "message": "Video not found"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

---

**Product**

- Product object

```
{
  "id": string,
  "title": string,
  "price": integer,
  "pageUrl": string
}
```

### GET /api/products

Returns all products.

- **URL Params**

  None

- **Data Params**

  None

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 200**

    Content:

    ```
    {
      "status": "success",
      "message": "Products retrieved successfully",
      "data": [
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
      ]
    }
    ```

    OR

    Content:

    ```
    {
      "status": "success",
      "message": "There are no products available",
      "data": []
    }
    ```

- **Error Response**

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

### POST /api/products

Creates a new product & returns the new object.

- **URL Params**

  None

- **Data Params**

  ```
  {
    "title": string,
    "price": integer,
    "pageUrl": string
  }
  ```

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 201**

    Content:

    ```
    {
      "status": "success",
      "message": "Product created successfully",
      "data": {<product_object>}
    }
    ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Invalid request body"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

### PATCH /api/products/:productId

Updates fields on the specified product & returns the updated object.

- **URL Params**

  _Required:_ `productId=[string]`

- **Data Params**

  ```
  {
    "title": string,
    "price": integer,
    "pageUrl": string
  }
  ```

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 200**

    Content:

    ```
    {
      "status": "success",
      "message": "Product updated successfully",
      "data": {<product_object>}
    }
    ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Product ID is not valid"
    }
    ```

    OR

  - **Code: 404**

    Content:

    ```
    {
      "status": "error",
      "message": "Product not found"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

### DELETE /api/products/:productId

Deletes the specified product.

- **URL Params**

  _Required:_ `productId=[string]`

- **Data Params**

  None

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 200**

  Content:

  ```
  {
    "status": "success",
    "message": "Product deleted successfully"
  }
  ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Product ID is not valid"
    }
    ```

    OR

  - **Code: 404**

    Content:

    ```
    {
      "status": "error",
      "message": "Product not found"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

### GET /api/videos/:videoId/products

Returns all products associated with the specified video.

- **URL Params**

  _Required:_ `videoId=[string]`

- **Data Params**

  None

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 200**

    Content:

    ```
    {
      "status": "success",
      "message": "Products of the video retrieved successfully",
      "data": [
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
        {<product_object>},
      ]
    }
    ```

    OR

    Content:

    ```
    {
      "status": "success",
      "message": "There are no products in the video",
      "data": []
    }
    ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Video ID is not valid"
    }
    ```

    OR

  - **Code: 404**

    Content:

    ```
    {
      "status": "error",
      "message": "Video not found"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

### POST /api/videos/:videoId/products

Adds product(s) to the specified video & returns the updated specified video with the products.

- **URL Params**

  _Required:_ `videoId=[string]`

- **Data Params**

  ```
  {
    "productIds": [<product_id>, <product_id>, ...]
  }
  ```

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 201**

    Content:

    ```
    {
      "status": "success":
      "message": "Products added to the video successfully",
      "data": {<video_object>}
    }
    ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Video ID is not valid"
    }
    ```

    OR

    Content:

    ```
    {
      "status": "error",
      "message": "Invalid request body"
    }
    ```

    OR

    Content:

    ```
    {
      "status": "error",
      "message": "productIds should be an array"
    }
    ```

    OR

    Content:

    ```
    {
      "status": "error",
      "message": "There is something wrong with the product ID. Product may not be found in the database. Make sure the product ID is correct."
    }
    ```

    OR

  - **Code: 404**

    Content:

    ```
    {
      "status": "error",
      "message": "Video not found"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

### DELETE /api/videos/:videoId/products/:productId

Deletes a product from a specified video & returns the updated specified video with the products.

- **URL Params**

  _Required:_ `videoId=[string]` & _Required:_ `productId=[string]`

- **Data Params**

  None

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 200**

    Content:

    ```
    {
      "status": "success":
      "message": "Product removed from the video successfully",
      "data": {<video_object>}
    }
    ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Video ID is not valid"
    }
    ```

    OR

    Content:

    ```
    {
      "status": "error",
      "message": "productIds should be an array"
    }
    ```

    OR

  - **Code: 404**

    Content:

    ```
    {
      "status": "error",
      "message": "Video not found"
    }
    ```

    OR

    Content:

    ```
    {
      "status": "error",
      "message": "Product not found in the video"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

---

**Comment**

- Comment object

```
{
  "id": string,
  "username": string,
  "content": string,
  "createdAt": datetime,
  "videoId": <video_id>
}
```

### GET /api/videos/:videoId/comments

Returns all comments associated with the specified video.

- **URL Params**

  _Required:_ `videoId=[string]`

- **Data Params**

  None

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 200**

    Content:

    ```
    {
      "status": "success",
      "message": "Comments of the video retrieved successfully",
      "data": [
        {<comment_object>},
        {<comment_object>},
        {<comment_object>},
        {<comment_object>},
        {<comment_object>},
        {<comment_object>},
        {<comment_object>},
        {<comment_object>},
        {<comment_object>},
        {<comment_object>},
        {<comment_object>},
        {<comment_object>},
      ],
      "page": integer,
      "totalPages": integer,
      "count": integer
    }
    ```

    OR

    Content:

    ```
    {
      "status": "success",
      "message": "There are no comments in the video",
      "data": [],
      "page": 1,
      "totalPages": 0,
      "count": 0
    }
    ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Video ID is not valid"
    }
    ```

    OR

  - **Code: 404**

    Content:

    ```
    {
      "status": "error",
      "message": "Video not found"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```

### POST /api/videos/:videoId/comments

Creates a new comment associated with the specified video & returns the new object.

- **URL Params**

  _Required:_ `videoId=[string]`

- **Data Params**

  ```
  {
    "username": string,
    "content": string
  }
  ```

- **Headers**

  Content-Type: application/json

- **Success Response**

  - **Code: 201**

    Content:

    ```
    {
      "status": "success":
      "message": "Comment created successfully",
      "data": {<comment_object>}
    }
    ```

- **Error Response**

  - **Code: 400**

    Content:

    ```
    {
      "status": "error",
      "message": "Video ID is not valid"
    }
    ```

    OR

    Content:

    ```
    {
      "status": "error",
      "message": "Invalid request body"
    }
    ```

    OR

  - **Code: 404**

    Content:

    ```
    {
      "status": "error",
      "message": "Video not found"
    }
    ```

    OR

  - **Code: 500**

    Content:

    ```
    {
      "status": "error",
      "message": <error_message>
    }
    ```
