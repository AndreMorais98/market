const select = document.querySelector("[data-select]");
const elems = document.querySelectorAll("[data-show]");

const select_clothes = document.querySelector("[data-select-clothes]");
const elems_clothes = document.querySelectorAll("[data-show-c]");


const updown = {
    "Shirt/Coat" : "[data-show-shirt]",
    "Trousers/Shorts" : "[data-show-trousers]",
};

const dic = {
    "Watch" : "[data-show-watch]",
    "Jewellery" : "[data-show-jewellery]",
    "Clothes" : "[data-show-clothes]",
    "Shoes" : "[data-show-shoes]",
    "Bags" : "[data-show-bags]",
}; 

const onSelectChange = () => {
    elems.forEach((elem) => {elem.classList.add("d-none"); elem.querySelector("input,select").disabled = true});
    document.querySelectorAll(dic[select.value]).forEach((elem) => {
        elem.classList.remove("d-none"); 
        const input = elem.querySelector("input,select");
        input.disabled=false;
        input.dispatchEvent(new Event('change'))
    });
}

const onSelectClothesChange = () => {
    elems_clothes.forEach((elem) => {elem.classList.add("d-none"); elem.querySelector("input,select").disabled = true});
    document.querySelectorAll(updown[select_clothes.value]).forEach((elem) => {
        elem.classList.remove("d-none"); 
        elem.querySelector("input,select").disabled=false
    })
}

select.addEventListener("change", onSelectChange);
select_clothes.addEventListener("change", onSelectClothesChange);

onSelectChange();


function show_value(x)
{
 document.getElementById("slider_value").innerHTML=x;
}
