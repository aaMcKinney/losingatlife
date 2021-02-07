const list_items = [
    
];

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let currentPage = 1;
let rows = 5;

function search(items, wrapper) {
    wrapper.innerHTML = "";

    let searched = document.getElementById('searchbar').value;
    let results = items.find(element => element == searched);

    let items_element = document.createElement('div');
    items_element.classList.add('item');
    items_element.innerText = results;

    wrapper.appendChild(items_element);

    if (results == undefined) {
        items_element.innerText = 'No matching results';
    }
}



function displayList_after_click(items, wrapper, rows_per_page, page) {
    
    const displayText = `${document.getElementById('text-box').value} \n\n\n- Shared by losingatlife.com user.`;
    list_items.unshift(displayText);
    document.getElementById('text-box').value = null;

    wrapper.innerHTML = "";
    page--;
    
    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);
    for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];

        let item_element = document.createElement('div');
        item_element.classList.add('item');
        item_element.innerText = item;

        let upvote = document.createElement('div');
        let vote = document.createElement('div');
        
        vote.classList.add('votetext');
        upvote.classList.add('upvoteIcon');
        upvote.addEventListener('click', function () {
            vote.innerText++;
        })

        upvote.appendChild(vote);
        item_element.appendChild(upvote);
        wrapper.appendChild(item_element);
    }
} 


function setupPagination(items, wrapper, rows_per_page) {

    wrapper.innerHTML = "";
    let page_count = Math.ceil(items.length / rows_per_page);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

function paginationButton(page, items) {

    let button = document.createElement('button');
    button.innerText = page;

    if (currentPage == page) button.classList.add('active');

    button.addEventListener('click', function () {
        currentPage = page;
        displayList(items, list_element, rows, currentPage);

        let currentBtn = document.querySelector('.pagenumbers button.active');
        currentBtn.classList.remove('active');
        button.classList.add('active');
        smoothScroll(document.getElementById('adspace'));
    })
    
    return button;
}


window.smoothScroll = function (target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function (c, a, b, i) {
        i++; if (i > 22) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function () { scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}


function handlers() {
    setupPagination(list_items, pagination_element, rows);
    displayList_after_click(list_items, list_element, rows, currentPage);
}

setupPagination(list_items, pagination_element, rows);


    
