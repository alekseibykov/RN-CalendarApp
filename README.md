# RN-CalendarApp
npm i

Generate the debug keystore by running this command in the android/app/ directory: keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

react-native link

Go to node_modules/react-native/Libraries/Core/Timer/JSTimers.js

Look for the variable MAX_TIMER_DURATION_MS

Change 60 * 1000 to 10000 * 1000 , needed for firebase

Save the changes and re-build your app.
