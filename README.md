# Playtrade

Welcome to the Playtrade repository — a card trading platform designed to enhance your collecting experience.

## Table of Contents
- [Running the project](#getting-started)
- [Technologies Used](#technologies-used)
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