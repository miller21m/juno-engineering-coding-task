////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

export const fetchAllOrders = async () => {
    const ids = allIds;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
    var arrayOfOrders= [];
    var i=0;

    for(i=0; i< ids.length; i++){
        const order = await fetchOrderById(ids[i]);
        arrayOfOrders.push(order);
    }

    return arrayOfOrders; 
};

const bucketOrdersByUsers = async () => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    
    const orders =await fetchAllOrders();

    orders.forEach(order =>{
        ordersByUsers[order.userId] = orders.filter(obj => obj.userId == order.userId ).map(obj => obj.id);
    });

    return ordersByUsers;
};

const getLast2WeeksOrders = async () => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
    const orders =await fetchAllOrders();
    let lastTwoWeeksOrders = [];
    var today_date = new Date();
    var twoWeeksAgo_date =new Date(today_date);

    twoWeeksAgo_date.setDate(twoWeeksAgo_date.getDate() - 14);

    orders.forEach(order =>{
        lastTwoWeeksOrders = orders.filter(obj => obj.timestamp <= today_date &&  obj.timestamp  >= twoWeeksAgo_date)
        .map(obj => obj);
    });

    return lastTwoWeeksOrders;
};

const bucketOrdersByDate = async () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.

    let lastTwoWeeksOrders = await getLast2WeeksOrders();

    lastTwoWeeksOrders.forEach(order =>{
        var date = new Date(order.timestamp);
        ordersByDate[date.getDate()] = 
        lastTwoWeeksOrders.filter(obj => new Date(obj.timestamp).getDate() == new Date(order.timestamp).getDate()).map(obj=>obj);
    })

    return ordersByDate;
};

fetchAllOrders();
//.then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
