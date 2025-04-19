# AgriConnect - Seed & Fertilizer Marketplace

AgriConnect is a web-based marketplace designed to connect farmers directly with suppliers of agricultural inputs like seeds, fertilizers, pesticides, and equipment. This platform aims to enhance transparency, accessibility, and affordability within the agricultural supply chain, particularly targeting challenges faced by farmers in regions like Punjab, India.

This project (Version 1.0) serves as a foundational prototype demonstrating core marketplace functionalities.

## Key Features (v1.0)

* **View Products:** Browse a catalog of available agricultural products with details (name, type, price, supplier, description, image).
* **Add Products:** A simple interface (`/add-product`) for suppliers (or administrators) to add new product listings to the marketplace.
* **Remove Products:** Functionality to delete product listings directly from the catalog view (includes confirmation).
* **Responsive Design:** User interface adapts to various screen sizes (desktop, tablet, mobile).

## Technology Stack

* **Backend:**
    * Runtime: Node.js (v14+ recommended)
    * Framework: Express.js
    * Database: MongoDB (v5+ recommended)
    * ODM: Mongoose
    * Environment Variables: `dotenv`
* **Frontend:**
    * HTML5
    * Styling: Tailwind CSS (via CDN)
    * JavaScript: Vanilla JS (ES6+) for DOM manipulation and API calls (`fetch`)

## Project Structure

seed-fertilizer-marketplace/├── models/                # Mongoose models (Product.js)├── public/                # Static assets (js/products.js)├── routes/                # Express routes (productRoutes.js)├── views/                 # HTML files (index.html, products.html, add-product.html)├── .env                   # Environment variables (Needs creation)├── package.json           # Dependencies and project info└── server.js              # Main application entry point
## Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (includes npm) - Version 14 or higher recommended.
* [MongoDB](https://www.mongodb.com/try/download/community) - A running MongoDB instance (local or cloud-based like MongoDB Atlas).

## Installation

1.  **Clone the repository** (if applicable, otherwise skip):
    ```bash
    git clone https://github.com/nishannn07/AgriConnect
    cd seed-fertilizer-marketplace
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Configuration

1.  **Create Environment File:** Create a file named `.env` in the root directory of the project.
2.  **Add Variables:** Add the following environment variables to the `.env` file, replacing the placeholder values with your actual configuration:

    ```dotenv
    # Server Port
    PORT=3000

    # MongoDB Connection URI
    # Example for local MongoDB:
    MONGO_URI=mongodb://localhost:27017/farmMarketplace
    # Example for MongoDB Atlas (replace <username>, <password>, <cluster-url>):
    # MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/farmMarketplace?retryWrites=true&w=majority

    # MongoDB Database Name (ensure this matches the DB name in your URI if specified there)
    DB_NAME=farmMarketplace
    ```

    * Make sure your MongoDB server is running and accessible from the application.
    * Ensure the database name (`farmMarketplace` in the example) exists or MongoDB has permissions to create it.

## Running the Application

1.  **Start the server:**
    ```bash
    node server.js
    ```
2.  **Access the application:** Open your web browser and navigate to `http://localhost:3000` (or the port number you specified in your `.env` file).

## API Endpoints (v1.0)

The application exposes the following RESTful API endpoints:

* `GET /api/products`: Retrieves a list of all products.
* `POST /api/products`: Adds a new product to the database (expects `x-www-form-urlencoded` data).
* `DELETE /api/products/:id`: Deletes a product specified by its MongoDB `_id`.

## Future Enhancements (Potential)

* User Authentication & Authorization (Farmers, Suppliers, Admin roles)
* Product Editing (Update functionality)
* Search, Filtering, Sorting, Pagination
* Product Detail Pages
* Shopping Cart & Ordering System
* Direct Image Uploads
* Supplier/Farmer Profiles
* Testing (Unit, Integration, E2E)
* Deployment to a cloud platform

---
