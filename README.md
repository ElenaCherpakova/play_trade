# Playtrade

Welcome to the Playtrade repository — a card trading platform designed to enhance your collecting experience.

## Table of Contents
- [Running the Project](#running-the-project)
- [Technologies Used](#technologies-used)
- [Schemas & Data Structures](#schemas--data-structures)
    - [User Schema](#user-schema)
    - [Market Schema](#market-schema)
        - [MarketItem Subdocument](#marketitem-subdocument)
    - [Card Schema](#card-schema)
    - [Order History Schema](#order-history-schema)
    - [Seller Schema](#seller-schema)
    - [Seller Listing Schema](#seller-listing-schema)
    - [Buyer Schema](#buyer-schema)
- [Authors](#authors)
- [Contributing & Improvements](#contributing--improvements)
- [License](#license)

## Getting Started

1. Clone the repository onto your local device (following steps):
```
git@github.com:Code-the-Dream-School/ffprac-team6.git
cd ffprac-team6
npm install
```

2. Set up Mongo database by installing [MongoDB](https://www.mongodb.com/)
3. Obtain the following API Keys:
   - [Cloudinary](https://cloudinary.com/)
   - [GoogleAPIs](https://console.cloud.google.com/)
   - [Stripe](https://docs.stripe.com/)
4. Copy the `.env.example` file and rename it to `.env`:

```
cp .env.example .env
```
5. Replace the placeholders with your specific values:
```MONGODB_URI= <your_mongodb_connection_url>
JWT_SECRET= <your_unique_jwt_secret_key>
JWT_LIFETIME= <your_desired_jwt_lifetime> 
NEXTAUTH_URL= <your_desired_port_number>
NEXTAUTH_SECRET= <your_nextauth_secret_key>
MAIL_USERNAME= <your_desired_email_address>
GOOGLE_CLIENT_ID= <your_client_id>
GOOGLE_CLIENT_SECRET=  <your_client_secret>
GOOGLE_CLIENT_REFRESH_TOKEN=  <your_refresh_token>
REDIRECT_URI= <your_redirect_uri>
NEXT_PUBLIC_CLOUDINARY_NAME= <your_cloud_name>
CLOUDINARY_API_KEY= <your_api_key>
CLOUDINARY_API_SECRET= <your_api_secret>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= <your_stripe_publishable_key>
NEXT_PUBLIC_STRIPE_SECRET_KEY= <your_stripe_secret_key>
```
6. Run `npm run start` to start the development server
7. The app will be served at <http://localhost:3000/>.

## Schemas & Data Structures

### User Schema
**Purpose**: Defines the data structure for user accounts.
**Fields**:
- `username`: The user's chosen username.
- `email`: The user's email address.
- `password`: The user's hashed password for secure storage.

**Features**:
- **Password Management**: Methods included for setting, updating, and verifying passwords.
- **JWT Token Creation**: Supports the generation of JSON Web Tokens for secure user authentication.

### Market Schema
**Purpose**: Manages listings in the market, linking cards and sellers.
**Fields**:
- `items`: An array of `MarketItem` subdocuments, each representing a unique listing in the marketplace.

### MarketItem Subdocument
**Purpose**: Represents an individual listing in the market.
**Fields**:
- `cardId`: Reference to the `Card` schema, indicating the card being sold.
- `sellerId`: Reference to the `User` schema, identifying the seller.

### Card Schema
**Purpose**: Defines the details of trading cards available for sale.
**Fields**:
- `name`: The name of the card.
- `set`: The set or series to which the card belongs.
- `price`: The sale price of the card.
- `currency`: The currency in which the price is denoted.
- `shippingCost`: The cost of shipping the card.
- `description`: A description of the card.
- `conditions`: The condition of the card.
- `category`: The category of the card (e.g., Magic, Pokemon).
- `imageURL`: A URL link to an image of the card.
- `quantity`: The number of such cards available.
- `available`: The availability status of the card (e.g., available, sold).
- `createdBy`: The user who listed the card.
- `createdAt`: The timestamp when the card was listed.

### Order History Schema
**Purpose**: Tracks each transaction, providing a history of card purchases.
**Fields**:
- `buyerId`: Reference to the buyer's user profile.
- `cardId`: Reference to the purchased card.
- `sellerId`: Reference to the seller's user profile.
- `purchaseDate`: The date on which the purchase was made.

### Seller Schema
**Purpose**: Profiles for users who sell on the platform, tracking their sales and feedback.
**Fields**:
- `userId`: Link to the user's profile.
- `rating`: The seller's overall rating.
- `feedback`: Array of feedback comments from buyers.
- `numberOfSales`: Total number of sales completed.
- `isRequestedAt`: The date when the user requested to become a seller.

### Seller Listing Schema
**Purpose**: Details the card listings managed by a seller.
**Fields**:
- `sellerId`: Reference to the seller's user profile.
- `cardId`: Reference to the card being listed.
- `cardsForSaleId`: Array of card IDs that are available for sale from the seller.

### Buyer Schema
**Purpose**: Profiles for users who purchase cards, tracking their buying history.
**Fields**:
- `userId`: Link to the user's profile.
- `cardsPurchasedId`: Array of card IDs that the user has purchased.

## Functionality


## Technologies Used

- [NextJS](https://nextjs.org/docs)
- [Mui](https://mui.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [jsonwebtoken](https://jwt.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Stripe](https://docs.stripe.com/)
- [Cloudinary](https://cloudinary.com/)
- [GoogleAPIs](https://console.cloud.google.com/)

## Authors

- [Anna Pestova](https://github.com/AnnaPestova1)
- [Anna Solovykh](https://github.com/AnnaSolovykh)
- [Elena Cherpakova](https://github.com/ElenaCherpakova)
- [Oksana Feterovskaya](https://github.com/ofeterovskaya)
- [Victoria Taiwo](https://github.com/Victoria240)
- [Liubov Rodin](https://github.com/LiubovCass)
- [Cesar Lopez](https://github.com/wowgr8)

## Contributing & Improvements

We're always looking to improve and enhance our project. If you have suggestions, improvements, or find any bugs, please feel free to open a pull request or an issue on our GitHub repository.

Before submitting a pull request, please ensure the following:

1. Your code is well-documented and follows the project's coding style.
2. Your changes are well-tested and do not introduce new bugs.
3. Include a detailed description of the changes you are proposing.

We appreciate all contributions and look forward to collaborating with you!

## License

This project is available for use under the MIT License.