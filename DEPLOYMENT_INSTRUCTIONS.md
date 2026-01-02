# Deployment Instructions for Render

## Single Service Deployment

This application is configured to deploy both frontend and backend as a single web service on Render.

## Environment Variables

Set the following environment variables in the Render Dashboard:

1. **MONGO_URL**: 
   ```
   mongodb+srv://santoshsantu92067_db_user:santu123@cluster1.j98wqmk.mongodb.net/?appName=Cluster1
   ```

2. **NODE_ENV**: `production` (automatically set in render.yaml)

3. **PORT**: `10000` (automatically set in render.yaml)

4. **JWT_SECRET**: (automatically generated in render.yaml)

## Deployment Steps

1. **Push your code to GitHub** (if not already done)

2. **Connect to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure the service**:
   - **Name**: `smart-health` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: (automatically set from render.yaml)
     ```
     cd smart_health/server && npm install && cd ../web && npm install && npm run build
     ```
   - **Start Command**: (automatically set from render.yaml)
     ```
     cd smart_health/server && npm start
     ```

4. **Set Environment Variables**:
   - Click on "Environment" tab
   - Add `MONGO_URL` with your MongoDB Atlas connection string
   - Other variables (NODE_ENV, PORT, JWT_SECRET) are set automatically via render.yaml

5. **Deploy**:
   - Click "Create Web Service"
   - Render will build and deploy your application
   - The service will be available at: `https://smart-health.onrender.com` (or your custom name)

## How It Works

- **Build Phase**: 
  - Installs backend dependencies
  - Installs frontend dependencies
  - Builds the React frontend (creates `dist` folder)

- **Runtime**:
  - Backend Express server starts on the specified PORT
  - Server serves API routes at `/api/*`
  - Server serves static frontend files from `web/dist`
  - All requests go through the same service

## API Endpoints

All API endpoints are available at:
- `https://your-service.onrender.com/api/*`

## Frontend

The frontend is automatically served at:
- `https://your-service.onrender.com/`

## Troubleshooting

1. **MongoDB Connection Issues**:
   - Verify your MONGO_URL is correct
   - Check MongoDB Atlas IP whitelist (should allow all IPs: 0.0.0.0/0)
   - Verify database user credentials

2. **Build Failures**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

3. **Static Files Not Loading**:
   - Verify frontend build completed successfully
   - Check that `web/dist` folder exists after build
   - Verify path in server/index.js is correct

## Notes

- The application uses a single service, so CORS is configured for same-origin requests
- Socket.IO connections use the same origin in production
- All API calls use relative paths (`/api/*`) in production

