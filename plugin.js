(async function() {
	if (
		document.getElementById("idward-plugin").getAttribute("isRunning") != "true"
	)
		return;

	// import helper functions
	let { disableScroll, enableScroll } = await import("./utils/helpers.js");

	// create triangle
	let divTriangle = document.createElement("div");
	divTriangle.innerHTML = `
        <svg viewBox="0 0 90 90">
            <polygon id="pol" points="0,0,0,90,90,90" fill="#3f47cc" stroke="#3f47cc"/>
        </svg>
    `;
	divTriangle.style = `
        z-index:99999;
        height:90px;
        width:90px;
        position:fixed;
        bottom:0;
    `;

	//create modal

	let modal = document.createElement("div");

	modal.id = "pluginModal";
	modal.style = "z-index:100000;";
	modal.classList.add("w3-modal");

	modal.innerHTML = `
        <div class="w3-modal-content">
            <div class="w3-container" style="display: flex; justify-content:center; flex-wrap:wrap;">
                <button class="w3-button w3-black w3-padding-large w3-large w3-margin" id="pluginAcceptBtn">Accept</button>
                <button class="w3-button w3-black w3-padding-large w3-large w3-margin" id="pluginRejectBtn">Reject</button>
            </div>
        </div>
    `;

	document.documentElement.append(divTriangle);
	document.documentElement.append(modal);

    // create script element
    let CollectScript = document.createElement("script");
    CollectScript.setAttribute("src", "./collect.js");
    
    // implement functions

	document.getElementById("pol").onclick = () => {
		modal.classList.add("w3-show");
		disableScroll();
	};
    
    document.getElementById("pluginRejectBtn").onclick = () => {
        enableScroll();
        modal.classList.remove("w3-show");
    };

	document.getElementById("pluginAcceptBtn").onclick = () => {
		document.getElementById("pluginRejectBtn").onclick();
        // because it same element created earlier it will load and will be called only once
        // and no matter how many times append child will be called
        document.body.appendChild(CollectScript);
	};

})();
