let store = {};

function loadData() {
    let promise = d3.csv("routes.csv");
    return promise.then(routes => {
        store.routes = routes;
        return store;
    })
}

function groupByAirline(data) {
    let result = data.reduce((result, d) => {
        let currentData = result[d.AirlineID] || {
            "AirlineID": d.AirlineID,
            "AirlineName": d.AirlineName,
            "Count": 0
        };

        currentData.Count += 1;

        result[d.AirlineID] = currentData;

        return result;
    }, {});

    //We use this to convert the dictionary produced by the code above, into a list, that will make it easier to create the visualization.
    result = Object.keys(result).map(key => result[key]);
    result = result.sort((x, y) => {
        return d3.ascending(x.Count, y.Count);
    });

    return result
}

function showData() {
    let routes = store.routes;
    let airlines = groupByAirline(store.routes);
    console.log(airlines)
}
loadData().then(showData);
