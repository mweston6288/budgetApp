# Budget Tracker
Purpose: Allows users to track their current balance by tracking income and expenses.
This app is able to be used offline.

The app will give a list of income and expenses and graph your current balance over time.

If you wish to reset the app, open your window console, go to the Application tab, select IndexedDB, select budget, then choose drop database.


# Note
Most elements of this application were already made. The following changes were made so the app could run offline:
* Removed routing files. The app now stores all data in IndexedDB rather than an external database.
* Added service-worker and webpack-config
* edited db.js and index.js to refer to indexedDB instead of the previously removed router.