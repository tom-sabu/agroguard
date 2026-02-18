# Cloudinary Setup Guide (for AgriLocal)

You do **NOT** need to install the React SDK or follow the "Get Started" wizard in the Cloudinary console. Our backend handles the image uploads directly using the Python SDK, which is already set up.

## 1. Get Your Credentials
1.  Log in to [console.cloudinary.com](https://console.cloudinary.com).
2.  If you see a "Welcome" or "Get Started" wizard asking you to choose a framework, look for a **"Skip"** button or click on **"Dashboard"** (or the Cloudinary logo) in the sidebar/top menu to go to the main dashboard.
3.  On the **Dashboard** (Programmable Media), look for the **Product Environment Credentials** section (usually at the top left).
4.  You will see:
    -   **Cloud Name**
    -   **API Key**
    -   **API Secret** (Click "Copy" or the eye icon to reveal)

## 2. Update Your Environment Variables
1.  Open the `.env` file in your project root (`d:/agroguard/.env`).
2.  Paste the values you copied:

```env
CLOUDINARY_CLOUD_NAME="paste_cloud_name_here"
CLOUDINARY_API_KEY="paste_api_key_here"
CLOUDINARY_API_SECRET="paste_api_secret_here"
```

## 3. Verify
Once you save the file, the backend will automatically use these credentials to upload images when a seller posts a product. No frontend SDK installation is required for this MVP.
