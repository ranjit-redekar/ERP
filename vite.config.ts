import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ERP/",
  plugins: [react()],
})

//https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:1441|country:PH&key=YOUR_API_KEY