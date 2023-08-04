const fetch = require("node-fetch");
const qs = require("querystring");

//the params I want to find in listings
const searchWord = 'pokemon emerald';
const lat = 41.860985;
const lon = -88.124168;
const radKm = 10;
const minPrice = 1; //in cents
const maxPrice = 30000; //in cents

//number of pages of results you want to get
let numResultPages = 1;


async function setup(keyWord){

    const body = 
    "av=0&__user=0&__a=1&__req=l&__hs=19573.HYP%3Acomet_loggedout_pkg.2.1..0.0&dpr=1.5&__ccg=UNKNOWN&__rev=1007977210&__s=2d9341%3Axz1g5w%3A6uzywe&__hsi=7263527458611341281&__dyn=7xeUmwlE7ibwKBWo2vwAxu13wvoKewSwMwNw9G2S0im3y4o0B-q1ew65xO2O1Vw8G1Qw5Mx62G3i0Bo7O2l0Fwqo31wnEfovwRwlEjw8W58jwGzEao4236222SUbElxm0zK5o4q0GpovU1aUbodEGdw46wbS1LwTwNwLwFg661pwr86C16w&__csr=hIlahuBiuHFZbGhK4Hnj9QpnGviybyqmUyh2tenBJutCCDheQq9jF2QXUF7GayrBCzqUy5Wm4bgzyFrwKGawJDyp99pHwxx69wHyUryA26qu7e9yEhK3i3KE4abw0XH-02vm0ary8GO00cSahPw66y80z204hUx1i0uyt045zE5q687nxe09bwdW0VUy0O9EyE3Vo3Vw1oB0aO0z82Oxe2-024q0GoshJ0dut2AGwho7505SwSgb80dUU0k0w4Ko1qE2-o0NC0bXw1b0E0D-08_wjk1fwbW&__comet_req=15&lsd=AVoptpn6rRY&jazoest=21051&__spin_r=1007977210&__spin_b=trunk&__spin_t=1691171773&qpl_active_flow_ids=931594241&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=CometMarketplaceSearchContentContainerQuery&variables=%7B%22buyLocation%22%3A%7B%22latitude%22%3A37.7793%2C%22longitude%22%3A-122.419%7D%2C%22contextual_data%22%3Anull%2C%22count%22%3A24%2C%22cursor%22%3Anull%2C%22flashSaleEventID%22%3A%22%22%2C%22hasFlashSaleEventID%22%3Afalse%2C%22marketplaceSearchMetadataCardEnabled%22%3Atrue%2C%22params%22%3A%7B%22bqf%22%3A%7B%22callsite%22%3A%22COMMERCE_MKTPLACE_WWW%22%2C%22query%22%3A%22video%20games%22%7D%2C%22browse_request_params%22%3A%7B%22commerce_enable_local_pickup%22%3Atrue%2C%22commerce_enable_shipping%22%3Atrue%2C%22commerce_search_and_rp_available%22%3Atrue%2C%22commerce_search_and_rp_category_id%22%3A%5B%5D%2C%22commerce_search_and_rp_condition%22%3Anull%2C%22commerce_search_and_rp_ctime_days%22%3Anull%2C%22filter_location_latitude%22%3A37.7793%2C%22filter_location_longitude%22%3A-122.419%2C%22filter_price_lower_bound%22%3A0%2C%22filter_price_upper_bound%22%3A214748364700%2C%22filter_radius_km%22%3A65%7D%2C%22custom_request_params%22%3A%7B%22browse_context%22%3Anull%2C%22contextual_filters%22%3A%5B%5D%2C%22referral_code%22%3Anull%2C%22saved_search_strid%22%3Anull%2C%22search_vertical%22%3A%22C2C%22%2C%22seo_url%22%3Anull%2C%22surface%22%3A%22SEARCH%22%2C%22virtual_contextual_filters%22%3A%5B%5D%7D%7D%2C%22savedSearchID%22%3Anull%2C%22savedSearchQuery%22%3A%22video%20games%22%2C%22scale%22%3A1.5%2C%22shouldIncludePopularSearches%22%3Atrue%2C%22topicPageParams%22%3A%7B%22location_id%22%3A%22sanfrancisco%22%2C%22url%22%3Anull%7D%7D&server_timestamps=true&doc_id=6327377654025526";

    //parsing as a query string, then parsing the variables block as a json
    const parsed = qs.parse(body);
    const variables = JSON.parse(parsed.variables);
;
    //modifying to allow me to search selected parameters
    variables.params.bqf.query = searchWord;
    variables.buyLocation.latitude = lat;
    variables.buyLocation.longitude = lon;
    variables.params.browse_request_params.filter_location_latitude = lat;
    variables.params.browse_request_params.filter_location_longitude = lon;
    variables.params.browse_request_params.filter_radius_km = radKm;
    variables.params.browse_request_params.filter_price_lower_bound = minPrice;
    variables.params.browse_request_params.filter_price_upper_bound = maxPrice;
    //variables.params.browse_request_params.commerce_search_and_rp_ctime_days = 1;
    //console.log(variables);

    //converting my modified data into a payload
    parsed.variables = JSON.stringify(variables);
    const newBody = qs.stringify(parsed);
    
    //returns the payload
    return newBody;
}

async function getOnePageOfData(yourBody, pageNum){
    const parsed = qs.parse(await yourBody);
    const variables = await JSON.parse(parsed.variables);
    
    variables.cursor = pageNum;

    parsed.variables = JSON.stringify(variables);

    const newBody = qs.stringify(parsed);

  4
        const response = await fetch("https://www.facebook.com/api/graphql/", {
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: newBody,
            method: "POST"
            });  
 
    const { data } = await response.json();

    for(const edge of data.marketplace_search.feed_units.edges) {
        if (edge.node){
            //console.log(data.marketplace_search.feed_units.edges.tracking);
            const { id, marketplace_listing_title, listing_price} = edge.node.listing;   
            console.log("www.facebook.com/marketplace/item/" + id + " " + listing_price.formatted_amount + " " + marketplace_listing_title);
        }
    }
    return(data.marketplace_search.feed_units.page_info.end_cursor);
};


//function that get the first 'numResultPages' of results by calling getData for each page
async function getMyData(){

    //setup payload for first page
    const body = setup(searchWord);

    //the null cursor indicates the first page of results
    let pageCursor = null;

    //for loop that calls the 'getOnePageOfData' 'numResultPages' times
    for (let i = 0; i < numResultPages; i++) {
        const tempCursor = await getOnePageOfData(body, pageCursor);
        pageCursor = tempCursor;
    }
}

getMyData();
