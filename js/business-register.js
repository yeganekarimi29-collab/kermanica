const productInput = document.getElementById("productInput");
const addProductButton = document.getElementById("addProduct");
const productList = document.getElementById("productList");
const businessForm = document.getElementById("businessForm");
const formMessage = document.getElementById("formMessage");

// اضافه‌کردن محصول
addProductButton.addEventListener("click", function () {
    const productName = productInput.value.trim();

    if (productName === "") {
        productInput.focus();
        productInput.classList.add("is-invalid");
        return;
    }

    productInput.classList.remove("is-invalid");

    const productTag = document.createElement("div");
    productTag.className = "product-tag";

    const productText = document.createElement("span");
    productText.textContent = productName;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-product";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", "حذف " + productName);

    removeButton.addEventListener("click", function () {
        productTag.remove();
    });

    productTag.appendChild(productText);
    productTag.appendChild(removeButton);

    productList.appendChild(productTag);

    productInput.value = "";
    productInput.focus();
});

// اضافه‌کردن محصول با کلید Enter
productInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addProductButton.click();
    }
});

// بررسی فرم
businessForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!businessForm.checkValidity()) {
        businessForm.reportValidity();
        return;
    }

    const products = Array.from(
        productList.querySelectorAll(".product-tag span")
    ).map(function (item) {
        return item.textContent;
    });

    const formData = {
        businessType: document.getElementById("businessType").value,
        businessField: document.getElementById("businessField").value,
        employeeCount: document.getElementById("employeeCount").value,
        brandName: document.getElementById("brandName").value.trim(),
        managerName: document.getElementById("managerName").value.trim(),
        website: document.getElementById("website").value.trim(),
        products: products
    };

    console.log("اطلاعات فرم:", formData);

    formMessage.className = "alert alert-success mt-3";
    formMessage.textContent =
        "اطلاعات فرم بررسی شد. برای ذخیره نهایی، باید بک‌اند متصل شود.";
});
