## NestJS Bookmark Manager

Simple RESTful API built with NestJS and TypeScript to manage bookmarks in memory. It demonstrates how to structure a NestJS backend using modules, controllers, services, DTOs, and models while exposing clean CRUD-style endpoints for creating, listing, searching, updating, and deleting bookmarks.

### Features

- **Create bookmarks**: Store a bookmark with `url` and `description`.
- **List bookmarks**: Get all bookmarks or filter them using query parameters.
- **Search**: Filter bookmarks by `url` or `description` (case-insensitive partial match).
- **Get by ID**: Retrieve a single bookmark by its unique ID.
- **Update description**: Update only the `description` field of an existing bookmark.
- **Delete**: Remove a bookmark by its ID.
- **In-memory storage**: Uses an in-memory array and UUIDs (no database) for simplicity and learning.

### Tech Stack

- **Backend framework**: NestJS (Node.js, TypeScript)
- **Language**: TypeScript
- **UUID generation**: `uuid` package

---

## Architecture Overview

### Bookmarks Module

The core logic of the app lives in the `bookmarks` module under `src/bookmarks`.

- **`bookmarks.controller.ts`**: Exposes HTTP endpoints and handles incoming requests.
- **`bookmarks.service.ts`**: Contains business logic and in-memory data manipulation.
- **`bookmark.model.ts`**: Defines the `Bookmark` TypeScript interface.
- **DTOs (`dto/`)**:
  - `create-bookmark.dto.ts` – shape of data when creating a bookmark.
  - `get-bookmark.dto.ts` – shape of query parameters when searching/filtering.

### Controller (HTTP Layer)

`BookmarksController` is mapped to the `bookmarks` route:

- **`GET /bookmarks`**: List or search bookmarks using query params `url` and/or `description`.
- **`GET /bookmarks/:id`**: Get a single bookmark by ID.
- **`POST /bookmarks`**: Create a new bookmark (body: `url`, `description`).
- **`DELETE /bookmarks/:id`**: Delete a bookmark by ID.
- **`PATCH /bookmarks/:id/description`**: Update only the `description` for a bookmark.

The controller delegates all business operations to `BookmarksService`.

### Service (Business Logic Layer)

`BookmarksService` manages an in-memory array of `Bookmark` objects:

- Initializes with one sample bookmark (NestJS docs).
- **`findAll()`**: Returns all bookmarks.
- **`findById(id)`**: Finds a single bookmark by its ID.
- **`find(getBookmarkDto)`**: Applies optional filtering by `url` and `description`.
- **`createBookmark(createBookmarkDto)`**: Creates a new bookmark with a generated UUID.
- **`deleteBookmark(id)`**: Removes a bookmark from the in-memory list.
- **`updateBookmarkDescription(id, description)`**: Updates only the description field.

---

## Getting Started

### Prerequisites

- **Node.js** (recommended LTS version)
- **Yarn** (or you can adapt commands to `npm` if preferred)

### Installation

```bash
# install dependencies
yarn install
```

### Running the Application

```bash
# development
yarn start

# watch mode (recommended while developing)
yarn start:dev

# production build & run
yarn build
yarn start:prod
```

By default, the app runs on `http://localhost:3000`.

---

## API Endpoints

Base URL: `http://localhost:3000`

### List & Search Bookmarks

- **Endpoint**: `GET /bookmarks`
- **Query params (optional)**:
  - `url` – partial URL to match.
  - `description` – partial description to match.

**Example:**

```bash
curl "http://localhost:3000/bookmarks"

curl "http://localhost:3000/bookmarks?url=google"

curl "http://localhost:3000/bookmarks?description=nest"
```

### Get Bookmark by ID

- **Endpoint**: `GET /bookmarks/:id`

```bash
curl "http://localhost:3000/bookmarks/<BOOKMARK_ID>"
```

### Create a Bookmark

- **Endpoint**: `POST /bookmarks`
- **Body (JSON)**:

```json
{
  "url": "https://google.com",
  "description": "Google Search"
}
```

**Example:**

```bash
curl -X POST "http://localhost:3000/bookmarks" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com","description":"Google Search"}'
```

### Update Bookmark Description

- **Endpoint**: `PATCH /bookmarks/:id/description`
- **Body (JSON)**:

```json
{
  "description": "Updated description"
}
```

**Example:**

```bash
curl -X PATCH "http://localhost:3000/bookmarks/<BOOKMARK_ID>/description" \
  -H "Content-Type: application/json" \
  -d '{"description":"Updated description"}'
```

### Delete a Bookmark

- **Endpoint**: `DELETE /bookmarks/:id`

```bash
curl -X DELETE "http://localhost:3000/bookmarks/<BOOKMARK_ID>"
```

---

## Step-by-Step Tutorial

### 1. Clone and Install

- **Clone the project** and move into the folder, then:

```bash
yarn install
```

### 2. Run the Server

```bash
yarn start:dev
```

The API will be available at `http://localhost:3000`.

### 3. Create Your First Bookmark

Send a `POST` request:

```bash
curl -X POST "http://localhost:3000/bookmarks" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://docs.nestjs.com","description":"NestJS Docs"}'
```

Copy the returned `id` from the response.

### 4. List and Search

- **List all**:

```bash
curl "http://localhost:3000/bookmarks"
```

- **Search by URL or description**:

```bash
curl "http://localhost:3000/bookmarks?description=docs"
```

### 5. Update Description

Use the `id` from earlier:

```bash
curl -X PATCH "http://localhost:3000/bookmarks/<BOOKMARK_ID>/description" \
  -H "Content-Type: application/json" \
  -d '{"description":"My favorite documentation"}'
```

### 6. Delete a Bookmark

```bash
curl -X DELETE "http://localhost:3000/bookmarks/<BOOKMARK_ID>"
```

Now you have a small but complete NestJS backend that demonstrates how controllers and services work together to manage resources using a clean REST API.

## 👤 Author

**Taha Hamedani**  
📧 [taha.hamedani8@gmail.com](mailto:taha.hamedani8@gmail.com)  

