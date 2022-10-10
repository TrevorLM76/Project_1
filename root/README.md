# Project_1
 Inventory Management System

About: This application was created for a project in the Skillstorm Training Course</div>
  - It runs off of React and Mongoose for the most part.

In order to actually run this project you will need a .env file in the server folder containing
  - PORT=#### - a port number
  - MONGO_URI=mongodb+srv:// - a MongoDb URI
  - The PORT in the serverPort.js file on the client side will also need to be updated to the same PORT
            
## Instructions: Click either the Warehouses or the Items tabs to begin.
            
  - From these tabs you can create new Warehouse locations or Items to place in them.
    - Just fill in the fields with proper values and click the submission button.
      - The field inputs are just big enough to hold the values that'll be let in.
    - There must be at least one Warehouse made in order to create an Item

  - Double-Clicking on any element in the tables will open up the edit pages.
    - These allow you to update values, move items to other locations, or delete them entirely.
    - Deleting a Warehouse will also delete all items located at that location

  - Warehouses are set with a Max Unit Capacity
    - When you add items to the warehouse, the currentcapacity will be automatically updated.
    - If you overload a warehouse, a warning will be displayed, however, as the admin you have the authority
        to continue overloading the location if you wish. Just don't upset your employees.
    - Deleting items will automatically lower the capacity as well.
    - These units can be whatever size you choose, just stay consistent.
