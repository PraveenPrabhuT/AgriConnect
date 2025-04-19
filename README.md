# AgriConnect - Seed & Fertilizer Marketplace
# Software Requirements Specification

**Prepared for:** Continuous Assessment 2
**Date:** April 19, 2025 (Spring 2025)

## 1. Introduction

This Introduction provides a comprehensive overview of the Software Requirement Specification (SRS) for the AgriConnect Marketplace project (Version 1.0). This document meticulously details the functional and non-functional requirements, constraints, interfaces, and operational context of the system. It serves as the definitive baseline for the development team during the design, implementation, verification, and validation phases. Furthermore, it provides stakeholders, including course instructors and potentially the client, with a clear, unambiguous understanding of the intended software product, its capabilities, and its limitations in this initial version.

### 1.1 Purpose

The primary purpose of this SRS is to formally define and document the requirements for the **AgriConnect Marketplace**. This web-based platform directly addresses critical challenges within the agricultural supply chain, particularly for farmers in regions like Punjab, India. These challenges often include inflated costs due to multiple intermediaries, difficulty verifying the quality and authenticity of inputs like seeds and fertilizers, and limited access to a diverse market of suppliers. AgriConnect aims to mitigate these issues by providing a digital platform fostering direct farmer-supplier interaction, thereby enhancing **price transparency**, **product visibility**, and **accessibility**. This document serves as a contractual agreement on the system's scope and functionality for Version 1.0, guiding development efforts and forming the basis for acceptance testing. It is intended for developers, testers, project managers, system architects, and evaluating instructors.

### 1.2 Scope

**(1) Product Identification:** The software product specified is the **AgriConnect Marketplace** web application, Version 1.0.

**(2) Product Capabilities:** The AgriConnect Marketplace (v1.0) **shall** provide the following capabilities:
    * **Public Product Catalog Viewing:** Any user accessing the platform via a web browser shall be able to view a list of agricultural products. Information displayed per product shall include: Name (String), Type (String: 'seed', 'fertilizer', 'pesticide', 'equipment'), Price (Number, formatted as INR), Supplier Name (String), Description (String), and an Image (rendered from a URL String or a default placeholder).
    * **Product Addition Interface:** The system shall provide an HTML form at the `/add-product` URL endpoint. Any user accessing this form shall be able to input data for a new product listing. The system shall enforce mandatory input for Name, Type, Price, and Supplier fields. Upon submission, the data shall be sent to the backend API for processing.
    * **Product Removal Capability:** Any user viewing the product list shall see a "Remove" button associated with each product. Activating this button shall trigger a confirmation dialog. Upon user confirmation, the system shall initiate a request to the backend API to permanently delete the specified product listing from the database. The UI shall dynamically update to reflect the removal.
    * **Responsive Web Interface:** The web interface shall be designed using responsive techniques (leveraging Tailwind CSS) to ensure usability and readability across a range of device viewports, including common desktop, tablet, and smartphone screen resolutions.

    The software product **shall not**, in Version 1.0, provide the following capabilities:
    * **User Management:** No user registration, login, authentication, authorization, or distinct user roles (e.g., Farmer, Supplier, Admin). All actions (view, add, delete) are currently open.
    * **Product Modification:** No functionality to edit or update product details once created.
    * **Advanced Catalog Features:** No searching, filtering (by type, price, supplier), sorting, or pagination of the product list.
    * **E-commerce Functions:** No shopping cart, wishlist, order placement, inventory tracking, or payment processing features.
    * **Media Handling:** No direct image file uploading or processing; relies solely on user-provided image URLs.
    * **Communication Features:** No direct messaging between farmers and suppliers.
    * **Reviews & Ratings:** No system for users to rate products or suppliers.
    * **Localization/Internationalization:** The interface is provided only in English.
    * **Analytics/Reporting:** No built-in analytics for suppliers or administrators.

**(3) Application Description:** AgriConnect v1.0 functions as a proof-of-concept and foundational layer for a specialized agricultural e-commerce platform. It focuses on establishing the core data model (Products), the essential backend API for managing this data (Create, Read, Delete), and a basic, dynamic frontend for presentation and interaction.
    * **Benefits:** Demonstrates the feasibility of a digital marketplace for farm inputs. Provides a tangible interface for viewing available products. Offers a simple mechanism for catalog population and basic management (add/delete). Serves as a practical learning tool for full-stack development concepts.
    * **Objectives:** To implement a stable backend API using Node.js, Express, and Mongoose. To persist product data reliably in MongoDB. To develop a responsive frontend using HTML, Tailwind CSS, and Vanilla JS that accurately reflects backend data and allows basic interaction. To ensure clear separation of concerns in the codebase.
    * **Goals:** Deliver a working application that fulfills all requirements specified for v1.0. Ensure the application is runnable in a local development environment. Maintain code quality through structure, comments, and adherence to basic best practices. Achieve intuitive usability for the implemented features.

### 1.3 Definitions, Acronyms, and Abbreviations

* **API:** Application Programming Interface - A contract defining how software components interact, often via HTTP requests for web services.
* **BSON:** Binary JSON - Binary-encoded serialization of JSON-like documents used by MongoDB for storage and network transfer.
* **CDN:** Content Delivery Network - Geographically distributed network of servers used to deliver static content (like CSS, JS) quickly to users.
* **CRUD:** Create, Read, Update, Delete - The four basic functions of persistent storage. (Note: Update is out of scope for v1.0).
* **CSS:** Cascading Style Sheets - Language used to describe the presentation of a document written in HTML.
* **DB:** Database - An organized collection of structured information, or data, typically stored electronically.
* **DFD:** Data Flow Diagram - A graphical representation of the flow of data through an information system.
* **DOM:** Document Object Model - A cross-platform and language-independent interface that treats an HTML or XML document as a tree structure where each node is an object representing a part of the document.
* **ES6+:** ECMAScript 2015 and later versions - Modern standards for the JavaScript language, including features like `async/await`, `let`/`const`, arrow functions.
* **Express.js:** A minimal, unopinionated, and flexible Node.js web application framework.
* **Git:** A distributed version control system for tracking changes in source code during software development.
* **GitHub:** A web-based hosting service for version control using Git, facilitating collaboration.
* **HTML:** HyperText Markup Language - The standard markup language for documents designed to be displayed in a web browser.
* **HTTP:** Hypertext Transfer Protocol - The application-layer protocol for transmitting hypermedia documents, such as HTML.
* **HTTPS:** HTTP Secure - HTTP over TLS/SSL, providing encrypted communication.
* **IaaS:** Infrastructure-as-a-Service - Cloud computing model providing virtualized computing resources over the internet.
* **INR:** Indian Rupee - Official currency of India.
* **JS:** JavaScript - High-level programming language, conforming to the ECMAScript specification, commonly used for web development.
* **JSON:** JavaScript Object Notation - Lightweight, text-based, human-readable data interchange format.
* **Marketplace:** An online platform facilitating transactions between multiple buyers and sellers.
* **Middleware:** Software functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application's request-response cycle (common in Express.js).
* **MVC:** Model-View-Controller - A software architectural pattern separating application logic into three interconnected components (Model: data & logic, View: UI presentation, Controller: handles input). This project loosely follows this pattern.
* **MongoDB:** A source-available cross-platform document-oriented database program, classified as a NoSQL database.
* **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js, managing relationships between data, providing schema validation, and translating between objects in code and representations of those objects in MongoDB.
* **Node.js:** An open-source, cross-platform, back-end JavaScript runtime environment that executes JavaScript code outside a web browser.
* **npm:** Node Package Manager - Default package manager for Node.js; maintains project dependencies.
* **ODM:** Object Data Modeling - Programming technique for converting data between incompatible type systems using object-oriented programming languages.
* **PaaS:** Platform-as-a-Service - Cloud computing model providing a platform allowing customers to develop, run, and manage applications without the complexity of building and maintaining the infrastructure.
* **RBAC:** Role-Based Access Control - A method of restricting system access to authorized users based on roles.
* **RESTful:** Representational State Transfer - An architectural style for distributed hypermedia systems, commonly used for designing web APIs.
* **SRS:** Software Requirements Specification - This document.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom user interfaces.
* **TCP/IP:** Transmission Control Protocol/Internet Protocol - The foundational suite of communication protocols used for the Internet.
* **UI:** User Interface - The means by which a user interacts with a machine or software.
* **UX:** User Experience - A person's perceptions and responses resulting from the use or anticipated use of a product, system or service.
* **XSS:** Cross-Site Scripting - A type of security vulnerability typically found in web applications, allowing attackers to inject client-side scripts into web pages viewed by other users.

### 1.4 References

*(Update with specific URLs, access dates, and versions where applicable)*

1.  IEEE. *IEEE Guide for Software Requirements Specifications - IEEE Std 830-1998*. 1998. (Source: IEEE Xplore or library resources)
2.  Mongoose v6+ Documentation: [https://mongoosejs.com/docs/](https://mongoosejs.com/docs/) (Accessed: April 2025)
3.  Express.js v4+ Documentation: [https://expressjs.com/](https://expressjs.com/) (Accessed: April 2025)
4.  Node.js v18+ Documentation: [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/) (Accessed: April 2025)
5.  Tailwind CSS v3+ Documentation: [https://tailwindcss.com/docs](https://tailwindcss.com/docs) (Accessed: April 2025)
6.  MongoDB v6+ Documentation: [https://docs.mongodb.com/](https://docs.mongodb.com/) (Accessed: April 2025)
7.  MDN Web Docs (HTML, CSS, JS): [https://developer.mozilla.org/](https://developer.mozilla.org/) (Accessed: April 2025)

### 1.5 Overview

This SRS document systematically details the requirements for the AgriConnect Marketplace v1.0.
* **Section 1 (Introduction):** Establishes the context, outlining the project's purpose, defining the precise scope of Version 1.0, clarifying terminology, listing references, and providing this overview of the document's organization.
* **Section 2 (General Description):** Provides a higher-level perspective, describing the product's relationship to other systems, its core functions, the characteristics of its intended users, overarching constraints influencing development, and key assumptions and dependencies.
* **Section 3 (Specific Requirements):** Forms the core technical specification. It details all necessary external interfaces (UI, Software, Hardware, Communication), enumerates and describes each functional requirement (feature) with inputs, processing steps, outputs, and error handling, lists vital non-functional qualities (performance, security, etc.), and outlines specific design constraints.
* **Section 4 (Analysis Models):** Describes the conceptual data flow within the application, serving as a placeholder for more formal analysis models like DFDs or UML diagrams if they were created.
* **Sections 5-11:** Reserved sections for administrative and project-specific information, including repository links, deployment status, and client/course-related verification details (placeholders).
* **Appendix:** Contains supplementary information that supports the main body of the SRS but is not part of the core requirements (placeholder).

---

## 2. General Description

This section provides background information to facilitate a better understanding of the specific requirements outlined in Section 3. It describes the product's context, overall functionality, user base, and influencing factors without stating specific, testable requirements.

### 2.1 Product Perspective

The AgriConnect Marketplace is positioned as a specialized, vertical e-commerce platform within the agricultural technology (AgriTech) domain. It differentiates itself from generic e-commerce giants (like Amazon, Flipkart) or broad B2B platforms by focusing exclusively on the needs of farmers and suppliers for core agricultural inputs. It can be seen as a digital facilitator aiming to modernize aspects of the local agricultural supply chain, potentially competing with or complementing traditional local dealers and distributors' websites (if they exist and offer online catalogs). Its value proposition lies in consolidating product information from various suppliers into a single, accessible interface, promoting transparency, and potentially offering wider choice compared to geographically limited traditional sourcing methods. For v1.0, it's a standalone prototype, but its architecture permits future expansion and integration.

### 2.2 Product Functions

The AgriConnect Marketplace (v1.0) software shall perform the following primary functions:

* **Product Information Retrieval and Display:** The system shall retrieve product data (name, type, price, supplier, description, image URL) from the database and present it to the user in a structured, browseable format on the `/products` page. *Input:* User navigation. *Output:* Rendered HTML product catalog.
* **Product Data Persistence (Addition):** The system shall accept new product data submitted via the `/add-product` web form, validate it against predefined rules (schema), and store it permanently in the product database. *Input:* User-submitted form data. *Output:* New record in the database; redirect response.
* **Product Data Removal:** The system shall accept a request, identified by a unique product ID, to permanently remove a specific product record from the database, following user confirmation. *Input:* User-confirmed delete request with product ID. *Output:* Record removed from database; success/error message to client.
* **Web Navigation:** The system shall provide standard hyperlink-based navigation allowing users to move between the main application pages (Home, Products, Add Product). *Input:* User clicks on navigation links. *Output:* Rendering of the requested HTML page.

### 2.3 User Characteristics

The system design considers the following characteristics of its intended users:

1.  **Farmers:**
    * **Technical Proficiency:** Varies widely. Assumed familiarity with basic web browsing on smartphones or desktops is necessary. UI must be simple, with clear visual cues. Minimal technical jargon.
    * **Goals:** Information gathering, price awareness (implicit), identifying local or accessible suppliers.
    * **Environment:** Access likely via mobile devices (Android common in India) using mobile data (potentially slow or intermittent connectivity - implies frontend should be reasonably lightweight) or shared/personal computers.
    * **Language/Literacy:** Initial UI is English. High potential need for localization (Punjabi, Hindi) and considerations for varying literacy levels (iconography, clear visual layout) in future versions.
2.  **Suppliers (or Admins in v1.0):**
    * **Technical Proficiency:** Assumed to possess basic computer literacy sufficient for operating a web browser and performing data entry via forms. Likely using desktop or laptop computers.
    * **Goals:** List products accurately, manage inventory representation (add/delete in v1.0), reach farmer audience.
    * **Environment:** Likely access via more stable broadband connections.

### 2.4 General Constraints

* **Technology Stack Lock-in:** The mandatory use of Node.js, Express, MongoDB, Mongoose, Vanilla JS, and Tailwind CDN restricts architectural choices and library selection. Alternative stacks were not evaluated.
* **Deployment Platform:** No specific platform is mandated, but the choice will impose its own constraints (cost, scalability, ease of use, geographical region). The application is developed assuming a standard Linux-like deployment environment for Node.js.
* **Security Model Limitation:** The lack of authentication/authorization in v1.0 severely constrains its real-world deployment potential and necessitates significant future work before handling sensitive or multi-supplier data. All data modification endpoints are currently unprotected.
* **Functionality Scope:** The strict limitation to View, Add, Delete for products means many expected e-commerce features are absent, constraining the immediate utility for complex transactions.
* **Styling Dependency (CDN):** Requires constant internet access for users to fetch Tailwind CSS styles, preventing offline usage or use in environments without CDN access. It also introduces a dependency on the CDN provider's availability.
* **Database Model:** While MongoDB allows flexibility, the defined Mongoose schema introduces a degree of rigidity that application logic must adhere to. Changes to the data structure require schema migration considerations (though not formally addressed in v1.0).
* **Development Resources:** Time and resource constraints inherent in a course project limit the depth of implementation, testing, and documentation.

### 2.5 Assumptions and Dependencies

* **Network Availability:** Assumes users and the server (if deployed) have continuous and reasonably stable internet connectivity.
* **Browser Standards Compliance:** Assumes target browsers correctly implement relevant HTML5, CSS3, and ES6+ JavaScript standards. Functionality on non-compliant or outdated browsers is not guaranteed.
* **Database Service:** Critically dependent on the availability, performance, and integrity of the MongoDB database service (local instance or cloud service like Atlas).
* **Node.js/npm Environment:** Backend execution depends on a correctly installed and configured Node.js runtime (v14+ recommended) and the availability of dependencies installed via npm. Assumes npm registry is accessible during installation.
* **External Services:** Depends on the availability of the Tailwind CSS CDN and the `placehold.co` service (for default images). Downtime in these services will impact UI rendering or image display.
* **Data Integrity Assumption:** Assumes suppliers/admins entering data will generally provide valid and non-malicious information within the constraints of the input fields. The system does not perform external verification of product claims or supplier identity.
* **Client-Side JavaScript Execution:** Assumes users have JavaScript enabled in their browsers, as core functionality (product listing rendering, deletion) relies on it.

---

## 3. Specific Requirements

This section provides the detailed, verifiable requirements for the AgriConnect Marketplace v1.0.

### 3.1 External Interface Requirements

#### 3.1.1 User Interfaces

The application shall provide a responsive, graphical web interface adhering to the following:
* **FR-UI-1 (Layout Consistency):** All pages shall share a common layout structure comprising a header (with title/logo and navigation), a main content area, and a footer.
* **FR-UI-2 (Navigation):** A navigation bar shall be persistently displayed in the header, providing clear, clickable links to "Home" (`/`), "View Products" (`/products`), and "Add Product" (`/add-product`). The currently active page link may be visually distinct.
* **FR-UI-3 (Homepage):** The homepage (`/`) shall display introductory text, key value propositions or features, and clear calls-to-action linking to other sections (e.g., "Browse Products").
* **FR-UI-4 (Product Listing):** The `/products` page shall display products using visually distinct cards arranged in a responsive grid (adapting column count based on screen width). Each card shall display the product's image (or placeholder), name, type (via badge), price (INR), supplier name, description, and action buttons.
* **FR-UI-5 (Add Product Form):** The `/add-product` page shall present an HTML form with standard input elements (`<input>`, `<select>`, `<textarea>`, `<button>`) for all fields defined in the Product schema (Section 3.3). Labels shall clearly identify each field. Required fields shall be visually indicated.
* **FR-UI-6 (Feedback Mechanisms):**
    * Loading State: A visual indicator (e.g., spinner and text) shall be displayed on the `/products` page while data is being fetched from the API.
    * Empty State: A clear message (e.g., "No products found.") shall be displayed on the `/products` page if the product fetch returns an empty list.
    * Confirmation: Standard browser `window.confirm()` dialogs shall be used before executing the product deletion action.
    * Error State (Client-side): If frontend API calls fail, an informative error message shall be displayed within the relevant UI section (e.g., replacing the product list).
* **FR-UI-7 (Responsiveness):** All user interfaces shall utilize responsive design principles (via Tailwind CSS utilities) to ensure readability and usability across screen widths ranging from small mobile devices (~360px) to large desktops (>1280px). Elements shall reflow, resize, or stack appropriately.

#### 3.1.2 Hardware Interfaces

The application shall not interface directly with any specific hardware beyond the standard devices (computers, tablets, smartphones) used to access web applications. It relies on the hardware's browser and network capabilities.

#### 3.1.3 Software Interfaces

* **FR-SI-1 (MongoDB Interface):** The backend application shall interface with a MongoDB database instance (v5+ recommended). All interactions shall occur through the Mongoose ODM (v6+ recommended) library using its API methods (e.g., `connect`, `model`, `find`, `create`, `findByIdAndDelete`).
* **FR-SI-2 (Node.js Runtime):** The backend application shall execute within the Node.js runtime environment (v14+ recommended) and utilize its core APIs as needed.
* **FR-SI-3 (Web Browser):** The frontend application shall execute within user web browsers supporting HTML5, CSS3, and JavaScript ES6+. It shall utilize standard Web APIs, including the Fetch API for HTTP requests and the DOM API for UI manipulation. Compatibility target: Latest stable versions of Chrome, Firefox, Safari, Edge.

#### 3.1.4 Communications Interfaces

* **FR-CI-1 (HTTP/HTTPS):** Client-server communication shall use HTTP/1.1. Deployment should utilize HTTPS for secure data transmission (requires SSL/TLS certificate configuration on the server). Standard ports (80/443) shall be used.
* **FR-CI-2 (RESTful API):** Backend API endpoints (`/api/products/*`) shall adhere to RESTful principles using standard HTTP methods (`GET`, `POST`, `DELETE`) and status codes (2xx, 3xx, 4xx, 5xx) to indicate operation outcomes.
* **FR-CI-3 (JSON Data Format):** Data exchanged between the client-side JavaScript and the backend API shall use the `application/json` content type format.
* **FR-CI-4 (Form Data Format):** Data submitted from the Add Product form shall use the `application/x-www-form-urlencoded` content type.
* **FR-CI-5 (MongoDB Protocol):** Communication between the backend server (Mongoose driver) and the MongoDB database shall use the MongoDB wire protocol over TCP/IP (default port 27017).

### 3.2 Functional Requirements

#### 3.2.1 Feature #1: View Products

* **FR-FN-1.1 (Introduction):** To allow any user to view the complete list of products available in the marketplace, sorted with the most recently added items first.
* **FR-FN-1.2 (Inputs):**
    * User Action: HTTP `GET` request to `/products`.
    * System Action (Internal): Asynchronous HTTP `GET` request from client-side JS to `/api/products`.
* **FR-FN-1.3 (Processing):**
    1.  Server receives `GET /api/products`.
    2.  Route handler validates request (no specific validation needed for basic GET).
    3.  Mongoose `Product.find({})` is executed to retrieve all documents.
    4.  `.sort({ createdAt: -1 })` is chained to order by descending creation date.
    5.  Mongoose driver sends query via MongoDB wire protocol.
    6.  MongoDB executes query and returns matching documents (BSON).
    7.  Mongoose driver deserializes BSON to JavaScript objects.
    8.  Route handler receives array of product objects.
    9.  Handler sends HTTP `200 OK` response with `Content-Type: application/json` and the product array in the response body.
    10. Client-side JS receives the response.
    11. If response status is 200, JS parses the JSON body.
    12. JS clears any existing content in `#productList` and hides loading/error messages.
    13. If the array is empty, JS displays the `#noProductsMessage`.
    14. If the array has products, JS iterates through it:
        * For each product, creates `div` (card) element.
        * Populates card HTML with product data (name, price, type, supplier, description, image URL), escaping text content via `escapeHTML`.
        * Appends the card to `#productList`.
* **FR-FN-1.4 (Outputs):**
    * *UI:* Rendered `/products` page displaying product cards or appropriate state messages (loading/empty).
    * *API (`GET /api/products`):* HTTP `200 OK` response with JSON array of product objects.
* **FR-FN-1.5 (Error Handling):**
    * *Backend:* If DB query fails, log error, `next(err)` triggers global handler, responds with `500 Internal Server Error` (JSON or HTML error page).
    * *Frontend:* If `fetch` fails (network error) or response status is not `ok` (e.g., 500), log error, display user-friendly error message within `#productList`.

#### 3.2.2 Feature #2: Add Product

* **FR-FN-2.1 (Introduction):** To allow a user to add a new product listing to the marketplace database via the `/add-product` form.
* **FR-FN-2.2 (Inputs):**
    * User Action: Filling and submitting the HTML form at `/add-product`.
    * System Action: Browser sends HTTP `POST` request to `/api/products` with form data (`application/x-www-form-urlencoded`). Expected fields: `name` (String), `type` (String), `price` (String/Number), `description` (String, optional), `supplier` (String), `imageUrl` (String, optional).
* **FR-FN-2.3 (Processing):**
    1.  Server receives `POST /api/products`.
    2.  `express.urlencoded` middleware parses form data into `req.body`.
    3.  Route handler accesses fields from `req.body`.
    4.  Basic backend check for presence of required fields (`name`, `type`, `price`, `supplier`). If missing, respond early with `400 Bad Request`.
    5.  Check if `price` is a valid non-negative number. If not, respond with `400 Bad Request`.
    6.  Determine `imageUrl`: use provided `req.body.imageUrl` if present and non-empty, otherwise construct a default `placehold.co` URL.
    7.  Construct `productData` object containing validated and processed fields.
    8.  Call `Product.create(productData)`.
    9.  Mongoose attempts document creation:
        * Applies schema type casting.
        * Runs schema validations (`required`, `enum`, `min`, etc.). Throws `ValidationError` on failure.
        * If valid, sends `insertOne` command to MongoDB.
    10. MongoDB inserts the document.
    11. `Product.create` resolves successfully.
    12. Handler logs success.
* **FR-FN-2.4 (Outputs):**
    * *Backend:* HTTP `302 Found` redirect response with `Location: /products` header.
* **FR-FN-2.5 (Error Handling):**
    * *Backend:* If initial backend validation (missing fields, invalid price) fails, respond with `400 Bad Request` JSON. If Mongoose `ValidationError` occurs, `next(err)` passes it to the global handler, which responds with `400 Bad Request` JSON detailing errors. If database insertion fails for other reasons, `next(err)` leads to a `500 Internal Server Error` response.

#### 3.2.3 Feature #3: Remove Product

* **FR-FN-3.1 (Introduction):** To allow a user to permanently delete a specific product listing from the marketplace after confirmation.
* **FR-FN-3.2 (Inputs):**
    * User Action: Clicking the "Remove" button on a product card.
    * System Action: Browser displays `window.confirm()` dialog.
    * User Action: Clicking "OK" on the dialog.
    * System Action: Client-side JS sends HTTP `DELETE` request to `/api/products/:id` (where `:id` is the product's `_id`).
* **FR-FN-3.3 (Processing):**
    1.  Server receives `DELETE /api/products/:id`.
    2.  Route handler extracts `productId` from `req.params.id`.
    3.  Call `Product.findByIdAndDelete(productId)`.
    4.  Mongoose validates `productId` format. Throws `CastError` if invalid.
    5.  If valid, Mongoose sends `deleteOne({ _id: ObjectId(productId) })` command to MongoDB.
    6.  MongoDB attempts to find and delete the document.
    7.  `findByIdAndDelete` resolves with the deleted document (if found) or `null` (if not found).
    8.  Handler checks the result.
* **FR-FN-3.4 (Outputs):**
    * *Backend (Success):* Responds with `200 OK` status and JSON `{ message: 'Product deleted successfully', id: productId }`.
    * *Frontend (Success):* Receives 200 OK, parses JSON, removes the corresponding `#product-card-${productId}` element from the DOM.
* **FR-FN-3.5 (Error Handling:**
    * *Backend:* Invalid ID format (`CastError`) -> `next(err)` -> Global handler -> `400 Bad Request`. Product not found (`deletedProduct` is null) -> Handler responds directly with `404 Not Found`. Database deletion error -> `next(err)` -> Global handler -> `500 Internal Server Error`.
    * *Frontend:* Network error or non-2xx response -> `alert` message shown, error logged, button re-enabled.

### 3.5 Non-Functional Requirements

* **FR-NF-1 (Performance):** The system shall exhibit responsiveness adequate for a positive user experience.
    * **FR-NF-1.1:** Server-side API response time for `GET /api/products` (reading all products) shall be less than 800ms for the 95th percentile under simulated load of 1000 products and 50 concurrent requests. (Verification: Load testing tools like k6, JMeter - future phase).
    * **FR-NF-1.2:** Client-side rendering time for the `/products` page after receiving API data shall be visually instantaneous (target < 500ms) for up to 100 products displayed. (Verification: Browser developer tools profiling).
    * **FR-NF-1.3:** API response time for `POST /api/products` and `DELETE /api/products/:id` shall be less than 1 second for the 95th percentile under normal load. (Verification: Load testing).
    * *Note:* Current implementation lacks database indexing and pagination, which will be critical for maintaining performance as data grows.
* **FR-NF-2 (Reliability):** The system shall function consistently and recover gracefully from common errors.
    * **FR-NF-2.1:** Unhandled exceptions in backend route handlers shall be caught by the global error handler and logged, preventing server crashes.
    * **FR-NF-2.2:** Database connection issues shall be logged, and Mongoose's default reconnection strategies will be relied upon. Persistent connection failure will render the application unusable but should not cause unhandled crashes.
    * **FR-NF-2.3:** Client-side JavaScript errors shall be logged to the browser console and should not prevent other parts of the UI from functioning where possible. User feedback shall be provided for failed operations.
* **FR-NF-3 (Availability):** The system shall be accessible to users during expected operational periods.
    * **FR-NF-3.1:** Target availability: 99.0% uptime (excluding planned maintenance). (Verification: Monitoring tools in production environment - future phase).
    * *Note:* Actual availability is heavily dependent on the chosen hosting infrastructure for the Node.js application and the MongoDB database.
* **FR-NF-4 (Security):** The system shall incorporate basic security measures, acknowledging significant limitations in v1.0.
    * **FR-NF-4.1:** Data submitted by users shall be validated on the server-side against the Mongoose schema (`required`, `enum`, `type`, `min`) to prevent fundamentally invalid data persistence.
    * **FR-NF-4.2:** User-provided text data displayed on the frontend shall be escaped using the `escapeHTML` function to mitigate basic reflected XSS risks.
    * **FR-NF-4.3:** **CRITICAL DEFICIENCY:** Version 1.0 lacks any authentication or authorization mechanisms. All API endpoints for data modification (`POST`, `DELETE`) are unprotected. This requirement is **NOT MET** for production readiness.
    * **FR-NF-4.4:** Sensitive configuration (e.g., `MONGO_URI`) shall be managed via environment variables and not hardcoded in source code.
* **FR-NF-5 (Maintainability):** The codebase shall be structured to facilitate understanding, modification, and debugging.
    * **FR-NF-5.1:** Code is organized into distinct modules/layers (models, views, routes, server logic, public assets).
    * **FR-NF-5.2:** Mongoose schemas serve as clear contracts for data structures.
    * **FR-NF-5.3:** Comments are included for non-obvious code sections.
    * **FR-NF-5.4:** Consistent naming conventions and formatting (though not enforced by a linter in this phase) are aimed for.
* **FR-NF-6 (Portability):** The application shall be reasonably portable across different environments.
    * **FR-NF-6.1:** The Node.js backend shall run on any OS supporting the target Node.js version (Windows, macOS, Linux).
    * **FR-NF-6.2:** The frontend shall run on any major modern web browser implementing standard web technologies.
    * **FR-NF-6.3:** All backend dependencies are managed via `npm` and listed in `package.json`, facilitating installation in new environments. Database dependency (MongoDB) must also be met in the target environment.

### 3.7 Design Constraints

* **V1.0 Scope Constraint:** Development must focus solely on implementing the View, Add, and Remove product features. Features like user accounts, editing, search, cart, etc., are explicitly excluded, impacting the design by simplifying data models and workflows.
* **Technology Stack Constraint:** The mandatory use of Node.js, Express, MongoDB, Mongoose, Vanilla JS, and Tailwind CDN dictates the available tools, libraries, performance characteristics, and development patterns. For instance, the choice of Vanilla JS precludes using component-based frameworks like React/Vue for UI structure.
* **No Authentication Constraint:** The design explicitly omits user authentication and authorization. This constraint simplifies API endpoint implementation (no need for token validation, session checks, or permission logic) but severely limits security and real-world applicability.
* **CDN Styling Constraint:** Using Tailwind via CDN means the application's visual styling depends on external network access to the CDN provider. This prevents offline use and introduces an external point of failure. It also avoids the need for a frontend build process in this phase.

### 3.9 Other Requirements

* **FR-OR-1 (Localization Consideration):** While v1.0 is English-only, the design should ideally not preclude future localization efforts (e.g., avoiding hardcoding text directly in complex logic where possible). Given the Amritsar, Punjab context, future support for Punjabi and Hindi would be highly desirable.

---

## 4. Analysis Models

*(Formal, detailed analysis models like UML diagrams or comprehensive DFDs were not created during this development phase. The following provides expanded conceptual descriptions.)*

### 4.1 Data Flow Diagrams (DFD) - Conceptual Overview

* **Context Diagram (Level 0):**
    * **External Entities:** `User` (interacting via Browser), `Product Database` (MongoDB).
    * **Process:** `AgriConnect Web Application` (Process 0).
    * **Data Flows:** `User Request` (URL navigation, form submission, button clicks) -> Process 0; `Web Page Response` (HTML, CSS, JS), `API Response` (JSON data, status codes) -> User; `DB Query` (Find, Insert, Delete commands) -> Product Database; `DB Result` (Documents, status) -> Process 0.

* **Level 1 Conceptual Flows:**
    * **Process 1: Handle Product Viewing:**
        * *Input:* `View Products Request` (from User via Browser, GET /products or GET /api/products).
        * *Processing:* Receives request, queries `Product Database` for all products (via Mongoose `find`), sorts results, formats as JSON (for API) or prepares data for rendering (for page).
        * *Output:* `Product List Data` (JSON to client JS) or `Rendered Product Page` (HTML to Browser). `DB Query` -> `Product Database`, `DB Result` <- `Product Database`.
    * **Process 2: Handle Product Addition:**
        * *Input:* `Add Product Request` (from User via Browser Form, POST /api/products with `Product Details`).
        * *Processing:* Receives request, parses form data, validates data against schema rules (via Mongoose `create`), assigns default image URL if needed, constructs `DB Insert Command`.
        * *Output:* `DB Insert Command` -> `Product Database`. Receives `DB Insert Confirmation` <- `Product Database`. Sends `Redirect Response` (HTTP 302 to /products) -> Browser. Sends `Validation Error Response` (HTTP 400 JSON) -> Browser if validation fails.
    * **Process 3: Handle Product Removal:**
        * *Input:* `Delete Product Request` (from User via Browser Click/Confirm, DELETE /api/products/:id with `ProductID`).
        * *Processing:* Receives request, extracts `ProductID`, validates ID format, constructs `DB Delete Command` (via Mongoose `findByIdAndDelete`).
        * *Output:* `DB Delete Command` -> `Product Database`. Receives `DB Delete Result` (deleted doc or null) <- `Product Database`. Sends `Success Response` (HTTP 200 JSON) or `Not Found Response` (HTTP 404 JSON) or `Error Response` (HTTP 400/500 JSON) -> Browser.

