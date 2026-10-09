/* =====================================================
   CAMPUS MARKETPLACE
   HTML + CSS + JAVASCRIPT ONLY
===================================================== */
/* =========================
   AUTHENTICATION SYSTEM
========================= */

let users = JSON.parse(localStorage.getItem("campusMarketUsers")) || [];

let currentUser = JSON.parse(
    localStorage.getItem("campusMarketCurrentUser")
);


/* AUTH ELEMENTS */

const authScreen = document.getElementById("authScreen");

const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const logoutBtn = document.getElementById("logoutBtn");
const userNameDisplay = document.getElementById("userNameDisplay");


/* SWITCH TO SIGN UP */

showSignup.addEventListener("click", () => {

    loginBox.classList.add("hidden");
    signupBox.classList.remove("hidden");

});


/* SWITCH TO LOGIN */

showLogin.addEventListener("click", () => {

    signupBox.classList.add("hidden");
    loginBox.classList.remove("hidden");

});


/* SIGN UP */

signupForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    /* CHECK PASSWORD */

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    /* CHECK EXISTING ACCOUNT */

    const existingUser = users.find(
        user => user.email === email
    );


    if (existingUser) {

        alert("An account with this email already exists.");

        return;
    }


    /* CREATE USER */

    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password

    };


    users.push(newUser);


    /* SAVE USERS */

    localStorage.setItem(
        "campusMarketUsers",
        JSON.stringify(users)
    );


    alert("Account created successfully!");


    /* AUTO LOGIN */

    currentUser = {

        id: newUser.id,

        name: newUser.name,

        email: newUser.email

    };


    localStorage.setItem(
        "campusMarketCurrentUser",
        JSON.stringify(currentUser)
    );


    showMarketplace();

});


/* LOGIN */

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.getElementById("loginEmail")
        .value
        .trim()
        .toLowerCase();

    const password = document.getElementById("loginPassword")
        .value;


    const user = users.find(

        user =>
            user.email === email &&
            user.password === password

    );


    if (!user) {

        alert("Incorrect email or password.");

        return;
    }


    /* SAVE CURRENT USER */

    currentUser = {

        id: user.id,

        name: user.name,

        email: user.email

    };


    localStorage.setItem(

        "campusMarketCurrentUser",

        JSON.stringify(currentUser)

    );


    showMarketplace();

});


/* SHOW MARKETPLACE */

function showMarketplace() {

    authScreen.classList.add("hidden");


    if (userNameDisplay && currentUser) {

        userNameDisplay.textContent =
            `Hi, ${currentUser.name}`;

    }


    if (logoutBtn) {

        logoutBtn.style.display = "inline-flex";

    }

}


/* LOGOUT */

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem(
        "campusMarketCurrentUser"
    );

    currentUser = null;


    authScreen.classList.remove("hidden");


    signupBox.classList.add("hidden");
    loginBox.classList.remove("hidden");


    loginForm.reset();

});


/* CHECK LOGIN WHEN PAGE LOADS */

if (currentUser) {

    showMarketplace();

} else {

    authScreen.classList.remove("hidden");

    if (logoutBtn) {

        logoutBtn.style.display = "none";

    }

}

/* =========================
   SAMPLE PRODUCTS
========================= */

const sampleListings = [

    {
        id: 1,
        name: "iPhone 12",
        category: "Electronics",
        price: 350000,
        condition: "Used - Good",
        location: "Ojo Campus",
        description:
            "128GB iPhone 12 in good condition. Face ID and cameras work properly.",
        seller: "Samuel",
        phone: "08012345678",
        image: "",
        status: "Available",
        date: Date.now() - 100000
    },

    {
        id: 2,
        name: "Business Administration Textbook",
        category: "Books",
        price: 8000,
        condition: "Used - Good",
        location: "Faculty of Business",
        description:
            "Useful textbook for Business Administration students. Clean pages and no missing sections.",
        seller: "David",
        phone: "08023456789",
        image: "",
        status: "Available",
        date: Date.now() - 200000
    },

    {
        id: 3,
        name: "Nike Sneakers",
        category: "Fashion",
        price: 25000,
        condition: "Like New",
        location: "Student Hostel",
        description:
            "Clean Nike sneakers. Worn only a few times.",
        seller: "Daniel",
        phone: "08034567890",
        image: "",
        status: "Available",
        date: Date.now() - 300000
    },

    {
        id: 4,
        name: "HP EliteBook Laptop",
        category: "Electronics",
        price: 280000,
        condition: "Used - Good",
        location: "Ojo",
        description:
            "HP EliteBook laptop suitable for school work, coding and browsing.",
        seller: "Michael",
        phone: "08045678901",
        image: "",
        status: "Available",
        date: Date.now() - 400000
    },

    {
        id: 5,
        name: "Study Table",
        category: "Furniture",
        price: 30000,
        condition: "Used - Good",
        location: "Student Hostel",
        description:
            "Strong wooden study table suitable for hostel rooms.",
        seller: "John",
        phone: "08056789012",
        image: "",
        status: "Available",
        date: Date.now() - 500000
    },

    {
        id: 6,
        name: "Graphic Design Service",
        category: "Services",
        price: 5000,
        condition: "New",
        location: "Online / Campus",
        description:
            "Affordable flyer, poster and social media graphic design service.",
        seller: "Alex",
        phone: "08067890123",
        image: "",
        status: "Available",
        date: Date.now() - 600000
    }

];


/* =========================
   GET DATA FROM LOCAL STORAGE
========================= */

let listings =
    JSON.parse(localStorage.getItem("campusListings"));

let favorites =
    JSON.parse(localStorage.getItem("campusFavorites")) || [];

let currentCategory = "All";

let selectedImage = "";


/* If there is no saved data,
   use sample listings */

if (!listings) {

    listings = sampleListings;

    saveListings();

}


/* =========================
   DOM ELEMENTS
========================= */

const listingGrid =
    document.getElementById("listingGrid");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const sellModal =
    document.getElementById("sellModal");

const detailsModal =
    document.getElementById("detailsModal");

const favoritesModal =
    document.getElementById("favoritesModal");

const listingForm =
    document.getElementById("listingForm");

const itemImage =
    document.getElementById("itemImage");

const imagePreview =
    document.getElementById("imagePreview");

const themeBtn =
    document.getElementById("themeBtn");


/* =========================
   SAVE DATA
========================= */

function saveListings() {

    localStorage.setItem(
        "campusListings",
        JSON.stringify(listings)
    );

}


function saveFavorites() {

    localStorage.setItem(
        "campusFavorites",
        JSON.stringify(favorites)
    );

}


/* =========================
   FORMAT PRICE
========================= */

function formatPrice(price) {

    return "₦" +
        Number(price).toLocaleString("en-NG");

}


/* =========================
   CATEGORY ICON
========================= */

function getCategoryIcon(category) {

    const icons = {

        Electronics:
            "fa-solid fa-mobile-screen",

        Books:
            "fa-solid fa-book",

        Fashion:
            "fa-solid fa-shirt",

        Furniture:
            "fa-solid fa-couch",

        Services:
            "fa-solid fa-handshake",

        Others:
            "fa-solid fa-box"

    };

    return icons[category] ||
        "fa-solid fa-box";

}


/* =========================
   DISPLAY LISTINGS
========================= */

function displayListings() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    let filtered =
        listings.filter(item => {

            const matchesSearch =
                item.name
                    .toLowerCase()
                    .includes(searchTerm) ||

                item.description
                    .toLowerCase()
                    .includes(searchTerm) ||

                item.location
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesCategory =
                currentCategory === "All" ||
                item.category === currentCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    /* SORT */

    if (sortSelect.value === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    }

    else if (sortSelect.value === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    }

    else {

        filtered.sort(
            (a, b) => b.date - a.date
        );

    }


    /* CLEAR */

    listingGrid.innerHTML = "";


    /* EMPTY */

    if (filtered.length === 0) {

        listingGrid.style.display = "none";

        emptyState.style.display = "block";

        return;

    }


    listingGrid.style.display = "grid";

    emptyState.style.display = "none";


    /* CREATE CARDS */

    filtered.forEach(item => {

        const isFavorite =
            favorites.includes(item.id);


        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">

                ${
                    item.image
                    ?
                    `<img
                        src="${item.image}"
                        alt="${item.name}"
                    >`
                    :
                    `
                    <div class="image-placeholder">
                        <i class="${getCategoryIcon(item.category)}"></i>
                    </div>
                    `
                }


                <span
                    class="status-badge
                    ${item.status === "Sold" ? "sold" : ""}"
                >
                    ${item.status}
                </span>


                <button
                    class="favorite-btn
                    ${isFavorite ? "active" : ""}"
                    onclick="toggleFavorite(${item.id})"
                >
                    <i class="fa-${
                        isFavorite ? "solid" : "regular"
                    } fa-heart"></i>
                </button>

            </div>


            <div class="product-content">

                <span class="product-category">
                    ${item.category}
                </span>


                <h3 class="product-name">
                    ${item.name}
                </h3>


                <div class="product-price">
                    ${formatPrice(item.price)}
                </div>


                <div class="product-meta">

                    <i class="fa-solid fa-location-dot"></i>

                    ${item.location}

                </div>


                <button
                    class="view-btn"
                    onclick="openDetails(${item.id})"
                >
                    View Details
                </button>

            </div>

        `;


        listingGrid.appendChild(card);

    });

}


/* =========================
   UPDATE DASHBOARD STATS
========================= */

function updateStats() {

    document.getElementById(
        "totalListings"
    ).textContent =
        listings.length;


    document.getElementById(
        "electronicsCount"
    ).textContent =
        listings.filter(
            item =>
                item.category === "Electronics"
        ).length;


    document.getElementById(
        "booksCount"
    ).textContent =
        listings.filter(
            item =>
                item.category === "Books"
        ).length;


    document.getElementById(
        "availableCount"
    ).textContent =
        listings.filter(
            item =>
                item.status === "Available"
        ).length;


    document.getElementById(
        "favoriteCount"
    ).textContent =
        favorites.length;

}


/* =========================
   CATEGORY FILTER
========================= */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                button.classList.add("active");


                currentCategory =
                    button.dataset.category;


                displayListings();

            }
        );

    });


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    displayListings
);


/* =========================
   SORT
========================= */

sortSelect.addEventListener(
    "change",
    displayListings
);


/* =========================
   OPEN SELL MODAL
========================= */

function openSellModal() {

    sellModal.classList.add("active");

}

document
    .getElementById("openSellBtn")
    .addEventListener(
        "click",
        openSellModal
    );

document
    .getElementById("heroSellBtn")
    .addEventListener(
        "click",
        openSellModal
    );

document
    .getElementById("emptySellBtn")
    .addEventListener(
        "click",
        openSellModal
    );


/* =========================
   CLOSE SELL MODAL
========================= */

document
    .getElementById("closeSellModal")
    .addEventListener(
        "click",
        () => {

            sellModal.classList.remove(
                "active"
            );

        }
    );


/* =========================
   IMAGE UPLOAD
========================= */

itemImage.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];


        if (!file) return;


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                selectedImage =
                    event.target.result;


                imagePreview.src =
                    selectedImage;


                imagePreview.style.display =
                    "block";

            };


        reader.readAsDataURL(file);

    }
);


/* =========================
   ADD NEW LISTING
========================= */

listingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const newListing = {

            id:
                Date.now(),

            name:
                document.getElementById(
                    "itemName"
                ).value.trim(),

            category:
                document.getElementById(
                    "itemCategory"
                ).value,

            price:
                Number(
                    document.getElementById(
                        "itemPrice"
                    ).value
                ),

            condition:
                document.getElementById(
                    "itemCondition"
                ).value,

            location:
                document.getElementById(
                    "itemLocation"
                ).value.trim(),

            description:
                document.getElementById(
                    "itemDescription"
                ).value.trim(),

            seller:
                document.getElementById(
                    "sellerName"
                ).value.trim(),

            phone:
                document.getElementById(
                    "sellerPhone"
                ).value.trim(),

            image:
                selectedImage,

            status:
                "Available",

            date:
                Date.now()

        };


        listings.unshift(
            newListing
        );


        saveListings();


        listingForm.reset();


        selectedImage = "";

        imagePreview.src = "";

        imagePreview.style.display =
            "none";


        sellModal.classList.remove(
            "active"
        );


        displayListings();

        updateStats();


        showToast(
            "Your listing has been published!"
        );

    }
);


/* =========================
   OPEN PRODUCT DETAILS
========================= */

function openDetails(id) {

    const item =
        listings.find(
            product =>
                product.id === id
        );


    if (!item) return;


    const imageHTML =
        item.image
        ?
        `<img
            class="details-image"
            src="${item.image}"
            alt="${item.name}"
        >`
        :
        `
        <div
            class="details-image
            image-placeholder"
        >
            <i class="${getCategoryIcon(
                item.category
            )}"></i>
        </div>
        `;


    document.getElementById(
        "detailsContent"
    ).innerHTML = `

        <div class="details-layout">

            <div>
                ${imageHTML}
            </div>


            <div class="details-info">

                <span class="product-category">
                    ${item.category}
                </span>


                <h2>
                    ${item.name}
                </h2>


                <div class="details-price">
                    ${formatPrice(item.price)}
                </div>


                <div class="detail-row">
                    <i class="fa-solid fa-star"></i>
                    Condition:
                    ${item.condition}
                </div>


                <div class="detail-row">
                    <i class="fa-solid fa-location-dot"></i>
                    ${item.location}
                </div>


                <div class="detail-row">
                    <i class="fa-solid fa-user"></i>
                    ${item.seller}
                </div>


                <div class="detail-row">
                    <i class="fa-solid fa-circle"></i>
                    Status:
                    ${item.status}
                </div>


                <div class="description">
                    ${item.description}
                </div>


                ${
                    item.status === "Available"
                    ?
                    `
                    <button
                        class="contact-btn"
                       onclick="contactSeller(${item.id})"
                    >
                        <i class="fa-solid fa-phone"></i>
                        Contact Seller
                    </button>
                    `
                    :
                    `
                    <button
                        class="contact-btn"
                        disabled
                    >
                        Item Sold
                    </button>
                    `
                }


                <button
                    class="secondary-btn"
                    onclick="toggleFavorite(${item.id})"
                >
                    <i class="fa-solid fa-heart"></i>
                    ${
                        favorites.includes(item.id)
                        ?
                        "Remove from Favorites"
                        :
                        "Add to Favorites"
                    }
                </button>


                <button
                    class="secondary-btn"
                    onclick="markAsSold(${item.id})"
                >
                    <i class="fa-solid fa-check"></i>
                    Mark as Sold
                </button>


                <button
                    class="secondary-btn"
                    onclick="deleteListing(${item.id})"
                >
                    <i class="fa-solid fa-trash"></i>
                    Delete Listing
                </button>

                <button
                    class="secondary-btn report-btn"
                    onclick="reportListing(${item.id})"
                >
                    <i class="fa-solid fa-flag"></i>
                    Report Listing
                </button>
                


            </div>

        </div>

    `;


    detailsModal.classList.add(
        "active"
    );

}


/* =========================
   CLOSE DETAILS
========================= */

document
    .getElementById("closeDetailsModal")
    .addEventListener(
        "click",
        () => {

            detailsModal.classList.remove(
                "active"
            );

        }
    );


/* =========================
   FAVORITES
========================= */

function toggleFavorite(id) {

    const index =
        favorites.indexOf(id);


    if (index === -1) {

        favorites.push(id);

        showToast(
            "Added to favorites!"
        );

    }

    else {

        favorites.splice(
            index,
            1
        );

        showToast(
            "Removed from favorites."
        );

    }


    saveFavorites();

    displayListings();

    updateStats();

}


/* =========================
   FAVORITES MODAL
========================= */

document
    .getElementById("favoritesBtn")
    .addEventListener(
        "click",
        openFavorites
    );


function openFavorites() {

    const favoriteListings =
        listings.filter(
            item =>
                favorites.includes(item.id)
        );


    const content =
        document.getElementById(
            "favoritesContent"
        );


    if (
        favoriteListings.length === 0
    ) {

        content.innerHTML = `

            <div class="empty-state"
                 style="display:block">

                <i class="fa-regular fa-heart"></i>

                <h3>
                    No favorites yet
                </h3>

                <p>
                    Save products you like
                    and find them here.
                </p>

            </div>

        `;

    }

    else {

        content.innerHTML =
            favoriteListings.map(
                item => `

                <div class="favorite-item">

                    ${
                        item.image
                        ?
                        `<img
                            src="${item.image}"
                            alt="${item.name}"
                        >`
                        :
                        `
                        <div
                            class="image-placeholder"
                            style="
                            width:65px;
                            height:65px;
                            font-size:20px;
                            "
                        >
                            <i class="${getCategoryIcon(
                                item.category
                            )}"></i>
                        </div>
                        `
                    }


                    <div class="favorite-info">

                        <strong>
                            ${item.name}
                        </strong>

                        <span>
                            ${formatPrice(
                                item.price
                            )}
                        </span>

                    </div>


                    <button
                        class="remove-favorite"
                        onclick="toggleFavorite(${item.id})"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            `
            ).join("");

    }


    favoritesModal.classList.add(
        "active"
    );

}


document
    .getElementById(
        "closeFavoritesModal"
    )
    .addEventListener(
        "click",
        () => {

            favoritesModal.classList.remove(
                "active"
            );

        }
    );


/* =========================
   MARK AS SOLD
========================= */

function markAsSold(id) {

    const item =
        listings.find(
            product =>
                product.id === id
        );


    if (!item) return;


    if (item.status === "Sold") {

        showToast(
            "This item is already sold."
        );

        return;

    }


    item.status = "Sold";


    saveListings();


    displayListings();

    updateStats();


    detailsModal.classList.remove(
        "active"
    );


    showToast(
        "Item marked as sold."
    );

}


/* =========================
   DELETE LISTING
========================= */

function deleteListing(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this listing?"
        );


    if (!confirmDelete) return;


    listings =
        listings.filter(
            item =>
                item.id !== id
        );


    favorites =
        favorites.filter(
            favoriteId =>
                favoriteId !== id
        );


    saveListings();

    saveFavorites();


    displayListings();

    updateStats();
    
    detailsModal.classList.remove(
        "active"
    );
    showToast(
        "Listing deleted."
    );
}

//    CONTACT SELLER
let currentChat = null;

let chats =
    JSON.parse(
        localStorage.getItem("campusHubChats")
    ) || {};

const chatModal =
    document.getElementById("chatModal");

const chatMessages =
    document.getElementById("chatMessages");

const chatForm =
    document.getElementById("chatForm");

const chatInput =
    document.getElementById("chatInput");

const chatSellerName =
    document.getElementById("chatSellerName");

const chatItemName =
    document.getElementById("chatItemName");

const closeChat =
    document.getElementById("closeChat");


function contactSeller(listingId) {

    const item =
        listings.find(
            product => product.id === listingId
        );

    if (!item) return;

    currentChat = listingId;

    chatSellerName.textContent =
        item.seller;

    chatItemName.textContent =
        item.name;

    displayChat();

    detailsModal.classList.remove("active");

    chatModal.classList.add("active");
}


function displayChat() {

    const messages =
        chats[currentChat] || [];

    if (messages.length === 0) {

        chatMessages.innerHTML = `
            <div class="chat-empty">
                <i class="fa-solid fa-comments"></i>
                <p>Start a conversation with ${chatSellerName.textContent}</p>
            </div>
        `;

        return;
    }

    chatMessages.innerHTML =
        messages.map(message => `
            <div class="chat-message ${message.sender}">
                <div class="message-bubble">
                    ${message.text}
                </div>
                <small>${message.time}</small>
            </div>
        `).join("");

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


chatForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const text =
        chatInput.value.trim();

    if (!text || !currentChat)
        return;

    if (!chats[currentChat])
        chats[currentChat] = [];

    chats[currentChat].push({

        sender: "buyer",

        text: text,

        time:
            new Date()
                .toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })

    });

    localStorage.setItem(
        "campusHubChats",
        JSON.stringify(chats)
    );

    chatInput.value = "";

    displayChat();

});


closeChat.addEventListener("click", () => {

    chatModal.classList.remove("active");

});

//    TOAST
let toastTimer;

function showToast(message) {
    const toast =
        document.getElementById(
            "toast"
        );

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );

    toastMessage.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(
            () => {
                toast.classList.remove(
                    "show"
                );
            },
            2500
        );
}

//    DARK MODE

function updateThemeIcon() {
    const icon =
        themeBtn.querySelector("i");
    if (
        document.body.classList.contains(
            "dark"
        )
    ) {
        icon.className =
            "fa-solid fa-sun";
    }
    else {
        icon.className =
            "fa-solid fa-moon";
    }
}
themeBtn.addEventListener(
    "click",
    () => {
        document.body.classList.toggle(
            "dark"
        );

        const isDark =
            document.body.classList.contains(
                "dark"
            );

        localStorage.setItem(
            "campusTheme",
            isDark
                ? "dark"
                : "light"
        );
        updateThemeIcon();
    }
);
//    LOAD SAVED THEME

const savedTheme =
    localStorage.getItem(
        "campusTheme"
    );

if (savedTheme === "dark") {
    document.body.classList.add(
        "dark"
    );
}
updateThemeIcon();

//    CLOSE MODALS WHEN
//    CLICKING OUTSIDE

document
    .querySelectorAll(".modal-overlay")
    .forEach(modal => {
        modal.addEventListener(
            "click",
            event => {
                if (
                    event.target === modal
                ) {
                    modal.classList.remove(
                        "active"
                    );
                }
            }
        );
    });
//    INITIALIZE APP
displayListings();
updateStats();
/* =========================
   REPORT LISTING
========================= */

let reports =
    JSON.parse(localStorage.getItem("campusReports")) || [];

function reportListing(id) {

    const item = listings.find(x => x.id === id);

    if (!item) return;

    const reason = prompt(
        "Why are you reporting this listing?\n\n" +
        "1. Suspected scam\n" +
        "2. Fake product\n" +
        "3. Wrong information\n" +
        "4. Spam"
    );

    if (!reason) return;

    reports.push({
        id: Date.now(),
        listingId: id,
        item: item.name,
        reason: reason,
        reporter: currentUser?.name || "User",
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "campusReports",
        JSON.stringify(reports)
    );

    showToast("Report submitted successfully.");

    detailsModal.classList.remove("active");
}
/* =========================
   ADMIN REPORTS
========================= */

const adminModal =
    document.getElementById("adminModal");

const adminBtn =
    document.getElementById("adminBtn");

const closeAdmin =
    document.getElementById("closeAdmin");

adminBtn.addEventListener("click", () => {

    const box =
        document.getElementById("reportsContent");

    if (reports.length === 0) {

        box.innerHTML =
            "<p>No reports yet.</p>";

    } else {

        box.innerHTML = reports.map(r => `

            <div class="report-card">

                <h3>${r.item}</h3>

                <p>
                    <b>Reason:</b> ${r.reason}
                </p>

                <p>
                    <b>Reported by:</b> ${r.reporter}
                </p>

                <small>${r.date}</small>

                <button
                    class="danger-btn"
                    onclick="removeReport(${r.id})"
                >
                    Remove Report
                </button>

            </div>

        `).join("");

    }

    adminModal.classList.add("active");

});


closeAdmin.addEventListener("click", () => {

    adminModal.classList.remove("active");

});


function removeReport(id) {

    reports =
        reports.filter(r => r.id !== id);

    localStorage.setItem(
        "campusReports",
        JSON.stringify(reports)
    );

    showToast("Report removed.");

    adminBtn.click();

}