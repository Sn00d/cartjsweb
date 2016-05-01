/**
 * Created by Sn00d on 28/4/2016.
 */


$(function(){
    function basket() {
        //Array for the items in the basket
        var itemInBasket = [];

		//product object, takes a name and a price
        var products = function(productName, price){
            this.productName = productName;
            this.price = price;
        }

		//Adding our 3 object products
        var butter = new products("Butter", 0.80);
        var milk = new products("Milk", 1.15);
        var bread = new products("Bread", 1.00);

		//Initialization
		var Totalprice=0;
		var pointer=0;
		var ButterCounter=0;
		var MilkCounter=0;
		var BreadCounter=0;
		
		var BreadDiscountCounter=0;
		var ButterBreadOffer=0;
		var Butterneeded=2;
		
		var Milkneeded=3;
		var Milkoffer=0;
		var MilkDiscountCounter=0;

		var DiscountTrack=0;


        //This function checks if there is an offer available to the customer and sums up the total price.
        function calculate(){

			//Give offer for discount by comparing the counter with how many numbers of the product we need
			if (ButterCounter==Butterneeded){
				ButterBreadOffer++;
				Butterneeded=Butterneeded+2;
			}

            /*Logic: Check if there is offer for the bread, if not; check if the item added last to the cart
            is milk and there is an offer, or finally at the product with no any discount*/
            if (ButterBreadOffer>0 && BreadDiscountCounter<BreadCounter && BreadCounter!=0){
				Totalprice= Totalprice+itemInBasket[pointer].price;
				Totalprice=Totalprice-(bread.price/2);
				ButterBreadOffer--;
				pointer++
				BreadDiscountCounter++;
				
				DiscountTrack=DiscountTrack+(bread.price/2);
				
			}
			else if (Milkoffer>0 && itemInBasket[pointer].productName=="Milk")
					{
						Milkoffer--;
						pointer++;
						DiscountTrack=DiscountTrack+milk.price;
					}
				
			else{
				
				Totalprice= Totalprice+itemInBasket[pointer].price;
				pointer++;
				}
				

			//Give next milk free when we have 3 in cart
			if (MilkCounter==Milkneeded){

				Milkoffer++;
				Milkneeded=Milkneeded+3;

			}

            //call FUnction to update the UI
            updatetable();

            //Round the number to two decimals *tofixed() sometimes may not work depending on browser
			var roundedNum = (Math.round( Totalprice * 100 ) / 100).toFixed(2);
            //Update the element with the Price
			document.getElementById("price").textContent=roundedNum;

			
		}
			
		//a function to reset all variables, array and visual.
		function reset(){
			
			Totalprice=0;
			pointer=0;
			ButterCounter=0;
			MilkCounter=0;
			BreadCounter=0;
		
			BreadDiscountCounter=0;
			ButterBreadOffer=0;
			Butterneeded=2;
		
			Milkneeded=3;
			Milkoffer=0;
			MilkDiscountCounter=0;
			itemInBasket= [];
			DiscountTrack=0;
			
			//Visual reset
			document.getElementById("price").textContent="";
			document.getElementById("discount").textContent="";
			$("#table").html("");
			$("#pricearea").text("Empty Cart");
			
		}

        /*In this function all the visual updates are handled. When the first item is added in the cart,
        dynamicaly html coded is added for the cart; once for every item.*/
		function updatetable(){

            //When the first item is added the price and discount becomes visual
			if (itemInBasket.length==1){
				$("#pricearea").html("");
				var spanprice = document.createElement("span");
				spanprice.setAttribute("id","pricehere");
				var element = document.getElementById("pricearea");
				element.appendChild(spanprice);
				document.getElementById("pricehere").innerHTML = '<span><b>Total Price: </b><span id=price></span>£</span><div>Discount: <span id=discount></span>£</span></div>'
				
			}

            //When the first bread is added we add html code for the cart, on the 2nd bread we only update the price.
			if(BreadCounter==1){
				//create the 
				var para = document.createElement("p");
				para.setAttribute("id","breaddiv");
				var element = document.getElementById("table");
				element.appendChild(para);
				document.getElementById("breaddiv").innerHTML = 'Bread: <span id="breadquantity"></span>'
				document.getElementById("breadquantity").textContent=BreadCounter;
				

			}else if (BreadCounter>1){
				document.getElementById("breadquantity").textContent=BreadCounter;

			}

            //When the first Butter is added we add html code for the cart, on the 2nd butter we only update the price.
			if (ButterCounter==1){
				var para = document.createElement("p");
				para.setAttribute("id","butterdiv");
				var element = document.getElementById("table");
				element.appendChild(para);
				document.getElementById("butterdiv").innerHTML = 'Butter: <span id="butterquantity"></span>'
				document.getElementById("butterquantity").textContent=ButterCounter;

			}else if (ButterCounter>1){
				document.getElementById("butterquantity").textContent=ButterCounter;

			}

            //When the first Milk is added we add html code for the cart, on the 2nd milk we only update the price.
			if (MilkCounter==1){
				var para = document.createElement("p");
				para.setAttribute("id","milkdiv");
				var element = document.getElementById("table");
				element.appendChild(para);
				document.getElementById("milkdiv").innerHTML = 'Milk: <span id="milkquantity"></span>'
				document.getElementById("milkquantity").textContent=MilkCounter;
				
			}else if (MilkCounter>1){
				document.getElementById("milkquantity").textContent=MilkCounter;
			}

            //Update the discount everytime
			document.getElementById("discount").textContent=DiscountTrack;
						
		}


        //BUTTON CLICK HANDLERS
        $('.addToCart').on('click', function(){

            var id = $(this).closest("div").attr("id");
			//alert(id);
			if (id == "butter"){
				ButterCounter++;
				itemInBasket.push(butter);
			}
			else if (id == "milk"){
				MilkCounter++;
				itemInBasket.push(milk);
			}
			else if ( id == "bread"){
				BreadCounter++;
				itemInBasket.push(bread);
			}
			calculate();

        });
		
		$('#reset').on('click', function(){
			
			reset();
			
		});
    }

    //call to our main function
    basket();

});