window.onload = function()
{
    const API_KEY = "022e0e22";
    const APPLICATION_KEY = "8b4191361075197f3a2bc207900f2a47";
    const submit = this.document.querySelector('.container-form>form');

    submit.addEventListener('submit',(e)=>{
        e.preventDefault();
        let keyword = this.document.querySelector('.container-form>form>input[type="search"]').value;
        var URL = `https://api.edamam.com/search?q=${keyword}&app_id=${API_KEY}&app_key=${APPLICATION_KEY}`;
        http = new this.XMLHttpRequest();
        http.onreadystatechange = function(){
            if(http.readyState == 4 && http.status == 200){
                if(http.responseText!==null){
                    if(JSON.parse(http.responseText).hits.length ===0){
                        document.querySelector('.responseDiv').innerHTML = '<h3>No Search Results</h3>';
                    } 
                    else{

                        document.querySelector('.responseDiv').innerHTML = createTemplate(http.responseText);
                    }
                }
            }
        }
        http.open('GET', URL);
        http.send();
    });

    function createTemplate(json){
        json = JSON.parse(http.responseText);
        let div1 = document.createElement('div');

        for(let x=0;x<json.hits.length;x++){
            let div2 = document.createElement('div');
            div2.classList.add('responseSpan');
            div2.innerHTML+=`<h3>${json.hits[x].recipe.label}</h3><img src=${json.hits[x].recipe.image}></img>`;
            div2.innerHTML+= `<p><b>Diet Label : </b>${json.hits[x].recipe.dietLabels}</p>`;
            div2.innerHTML+=`<p><b>Health Label : </b>${json.hits[x].recipe.healthLabels}</p>`;
            div2.innerHTML+=`<p><b>Number of Servings : </b>${json.hits[x].recipe.yield}</p>`;
            div2.innerHTML+= `<p><b>Energy : </b>${json.hits[x].recipe.calories} KCAL</p>`;
            div2.innerHTML+=`<p><b>Fats : </b>${json.hits[x].recipe.totalNutrients.FAT.quantity} grams</p>`;
            div2.innerHTML+=`<p><b>Sugar : </b>${json.hits[x].recipe.totalNutrients.SUGAR.quantity} grams</p>`;
            div2.innerHTML+=`<p><b>Cholestrol : </b>${json.hits[x].recipe.totalNutrients.CHOLE.quantity} miligrams</p>`;
            div2.innerHTML+=`<p><b>Protein : </b>${json.hits[x].recipe.totalNutrients.PROCNT.quantity} grams</p>`;
            let ingredients='';

            for(let y=0;y<json.hits[x].recipe.ingredientLines.length;y++){
                ingredients+=`<li>${json.hits[x].recipe.ingredientLines[y]}</li>`;
            }
            div2.innerHTML+=`<p><b>Ingredients : </b><ul>${ingredients}</ul></p>`;
            div2.innerHTML+=`<a href="${json.hits[x].recipe.url}" target="_blank"><button><i class="fa fa-external-link" aria-hidden="true"></i>  Read Full Article</button></a>`;
            div1.append(div2);
        }
        return div1.outerHTML;
    }
}