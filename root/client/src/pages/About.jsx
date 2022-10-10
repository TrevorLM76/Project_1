export const About = () => {
    return (<>
        <div className="about">
            <div>About: This application was created for a project in the Skillstorm Training Course</div>
            <div>&emsp;- It runs off of React and Mongoose for the most part.</div>
            <br/>
            <div>Instructions: Click either the Warehouses or the Items tabs to begin.</div>
            <br/>
            <div>- From these tabs you can create new Warehouse locations or Items to place in them.</div>
            <div>&emsp;- Just fill in the fields with proper values and click the submission button.</div>
            <div>&emsp;&emsp;- The field inputs are just big enough to hold the values that'll be let in.</div>
            <div>&emsp;- There must be at least one Warehouse made in order to create an Item</div>
            <br/>
            <div>- Double-Clicking on any element in the tables will open up the edit pages.</div>
            <div>&emsp;- These allow you to update values, move items to other locations, or delete them entirely.</div>
            <div>&emsp;- Deleting a Warehouse will also delete all items located at that location</div>
            <br/>
            <div>Warehouses are set with a Max Unit Capacity</div>
            <div>&emsp;- When you add items to the warehouse, the currentcapacity will be automatically updated.</div>
            <div>&emsp;- If you overload a warehouse, a warning will be displayed, however, as the admin you have the authority</div>
            <div>&emsp;&emsp;to continue overloading the location if you wish. Just don't upset your employees.</div>
            <div>&emsp;- Deleting items will automatically lower the capacity as well.</div>
            <div>&emsp;- These units can be whatever size you choose, just stay consistent.</div>
        </div>
    </>);
};