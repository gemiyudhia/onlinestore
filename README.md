# Online Store

This is an e-commerce web application built with modern technologies to provide a seamless shopping experience. The application supports product browsing, user authentication.

## Features

- User authentication (sign up, login, and logout)
- Product listing with categories and filters
- Shopping cart functionality
- Order history for authenticated users
- Responsive design for mobile and desktop

## Tech Stack

### Frontend

- **Next.js**: Framework for building the frontend and server-side rendering.
- **React**: For building reusable UI components.
- **Tailwind CSS**: For styling.

### Backend

- **Next.js API Routes**: For handling server-side logic.
- **Firebase**: Used for authentication and database.
- **Nextauth**: 

### State Management

- **Zustand**: Lightweight state management for cart and other features.

### Other Tools

- **Lucide Icons**: For icons in the UI.
- **Vercel**: For deployment.

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/gemiyudhia/toko-online.git
   cd toko-online
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-api-key>
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-firebase-project-id>
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-sender-id>
   NEXT_PUBLIC_FIREBASE_APP_ID=<your-firebase-app-id>
   NEXTAUTH_SECRET=<your-nextauth-secret>
   NEXT_PUBLIC_FAKESTORE_API_URL=<url_public_api>
   ```

4. **Run the Application**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch.
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes.
   ```bash
   git commit -m "Add some feature"
   ```
4. Push the branch and open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any questions or support, please open an issue or contact the repository owner.
email: [gemiyudhiaa@gmail.com](mailto\:gemiyudhiaa@gmail.com)

