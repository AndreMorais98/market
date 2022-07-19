import React, { useEffect } from 'react';
import "./filter.css";

function Filter() {
  React.useEffect(() => {
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
  });

  return (
  <>
    <form action="">
      <div className="search-bar">
        <input type="text" placeholder="Search.." name="search" />
        <button className="btn" type="submit">
          <i className="fa fa-search"></i>
        </button>
        
        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapsedFilters" role="button" aria-expanded="false" aria-controls="collapsedFilters">
          <span>Filters</span>
          <i className="idd-icon idd-icon-sliders" aria-hidden="true"></i>
        </a>
      </div>

      <div className="collapse filters-market" id="collapsedFilters">
        <div className="filter-info">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Type of Product:</label>
                <select className="form-control" id="exampleFormControlSelect1" name="type_cloth" data-select="data-select">
                  <option></option>
                  <option>Watch</option>
                  <option>Jewellery</option>
                  <option>Clothes</option>
                  <option>Shoes</option>
                  <option>Bags</option>
                </select>
              </div>
            </div>

            <div className="col-6">
              <div className="form-group d-none select-clothes" data-show-clothes="data-show-clothes" data-show="data-show">
                <label htmlFor="exampleFormControlSelect2">Down or Upper Body?</label>
                <select className="form-control" id="exampleFormControlSelect2" name="type_cloth" data-select-clothes="data-select-clothes" disabled="disabled">
                  <option>Shirt/Coat</option>
                  <option>Trousers/Shorts</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-6">
              <div className="form-group range-form-group">
                <h5>Price Range (MATIC):</h5>
                <div style={{"display": "flex"}}>
                  <div className="range-group">
                    <label htmlFor="maxRange">Max</label>
                    <input className="form-control" id="maxRange" type="text" name="max" style={{"marginBottom": "10px"}} />
                  </div>
                  <div className="range-group">
                    <label htmlFor="minRange">Min</label>
                    <input className="form-control" id="minRange" type="text" name="min" />
                  </div>
                </div>
              </div>
            </div>
          
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1" style={{"marginBottom": "20px"}} >Sorted by:</label>
                <select className="form-control" id="exampleFormControlSelect1" name="order" data-select="data-select">
                  <option>Price low to high</option>
                  <option>Price high to low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </>
  );
}

export default Filter;
