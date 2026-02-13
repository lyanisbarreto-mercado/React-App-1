import { useState, useCallback } from "react"
/**
 * Renders an array of strings passed in that can be filtered and added to as an
 * unordered list.
 * @returns Component
 */
export default function Sidebar({initialMenuItems = []}) { //uses initialMenuItems as a prop, or if nothing is passed, an empty array
  let [newMenuItem, setNewMenuItem] = useState("") //lets the current "new menu item" be blank, so that it can be inputted

  let [menuItems, setMenuItems] = useState(initialMenuItems) //sets the current set of menuitems as the original list 

  let [filter, setFilter] = useState("") //lets the filter be blank to be inputted
  // Adds a single string passed in as a parameter to the state element "menuItems" that holds the set of current menu items.

  let addMenuItem = useCallback((item) => { //adds an individual item as a parameter, this is what we insert within the addMenuItem input
    if (!item.trim()) return  //if the item is blank or there is nothing, then reset to previous state
    setMenuItems([...menuItems, newMenuItem]) //takes the menuItems, and adds the newMenuItem
    console.log("Added menu item")
    }, [menuItems, newMenuItem]) //dependency array, if any one of those values changes, it rerenders
  
    
  let regex = new RegExp(filter, "i") //"i" means "case-insensitive" without having to make everything lowercase. so using the "filter" input, it searches it and makes it disregard the difference between 
  const filteredName = menuItems.filter((item) => 
     regex.test(item)) //for each item, it each one using the regex, and tests it against the filter input (which is part of the regex)

  return (
    <div>
      <ul>
        {filteredName.map((item, index) => ( //takes the filtered array (since it'll update based on the filter), and for each item...
          <li key={index}>{item}</li> //it renders each item!
        ))}
      </ul>
    
      <input
        type="text"
        id="newMenuItemValue"
        value={newMenuItem}
        onChange={(event) => setNewMenuItem(event.target.value)}
        //event - takes the change 
        //target - looks to the property the change happened to (which is the menuItem list)
        //the value of the change
        //This happens at every change of the value as it is inputted. More obvious in filtering, as it updates the list that is rendered
      ></input>
      <br />
      <button
        onClick={() => {
          addMenuItem(newMenuItem) //it adds the newMenuItem input into the array and renders it to the list
        }}
      >
        Add Item
      </button>
      <br />
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Filter by..." 
      ></input>
    </div>
  )
}
